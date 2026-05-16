import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Credentials": "false",
};

async function refreshAccessTokenIfNeeded(supabaseAdmin: any, business: any) {
  const expiresAt = business?.token_expires_at ? new Date(business.token_expires_at).getTime() : 0;
  const now = Date.now();

  if (!business?.google_refresh_token) {
    throw new Error("No refresh token available for business");
  }

  if (expiresAt && expiresAt > now + 60_000) {
    // Still valid (with 60s buffer)
    return business.google_access_token;
  }

  const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
  const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) throw new Error("Google OAuth credentials not configured on server");

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      refresh_token: business.google_refresh_token,
      client_id: GOOGLE_CLIENT_ID,
      client_secret: GOOGLE_CLIENT_SECRET,
      grant_type: "refresh_token",
    }),
  });

  const tokenData = await tokenRes.json();
  if (!tokenRes.ok) {
    console.error("Failed to refresh Google token:", tokenData);
    throw new Error("Failed to refresh Google access token");
  }

  const accessToken = tokenData.access_token;
  const expiresIn = tokenData.expires_in || 3600;
  const newExpiresAt = new Date(Date.now() + expiresIn * 1000).toISOString();

  await supabaseAdmin
    .from("businesses")
    .update({ google_access_token: accessToken, token_expires_at: newExpiresAt })
    .eq("id", business.id);

  return accessToken;
}

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing Authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Verify caller's identity (non-blocking if desired) by creating a user-scoped client
    const supabaseUser = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const { data: userData, error: userError } = await supabaseUser.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userError || !userData?.user) throw new Error("Unauthorized");

    const { business_id } = await req.json();
    if (!business_id) throw new Error("Missing business_id in request body");

    // Fetch business row including tokens and GBP identifiers
    const { data: businesses, error: fetchBizError } = await supabaseAdmin
      .from("businesses")
      .select("*")
      .eq("id", business_id)
      .limit(1);

    if (fetchBizError) throw new Error(fetchBizError.message);
    const business = businesses?.[0];
    if (!business) throw new Error("Business not found");

    // Resolve accountId and locationId fields with common fallbacks
    const accountId = business.gbp_account_id || business.google_account_id || business.account_id;
    const locationId = business.location_id || business.google_location_id || business.place_id;
    if (!accountId || !locationId) throw new Error("Business is missing GBP account_id or location_id");

    // Ensure access token is valid (refresh if expired)
    const accessToken = await refreshAccessTokenIfNeeded(supabaseAdmin, business);

    // Google Business Profile reviews endpoint (v1)
    const reviews: any[] = [];
    let pageToken: string | undefined = undefined;
    do {
      const url = new URL(`https://businessprofile.googleapis.com/v1/accounts/${accountId}/locations/${locationId}/reviews`);
      url.searchParams.set("pageSize", "50");
      if (pageToken) url.searchParams.set("pageToken", pageToken);

      const res = await fetch(url.toString(), {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      if (!res.ok) {
        const body = await res.text();
        console.error("GBP API error", res.status, body);
        throw new Error(`GBP API error: ${res.status}`);
      }

      const data = await res.json();
      const items = data.reviews || [];
      for (const r of items) {
        try {
          // Use mapping helper for robust normalization
          // Import path is relative to this function folder
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore - dynamic import for Deno compatibility
          const { mapGoogleReview } = await import('./mapping.ts');
          const mapped = mapGoogleReview(r, business.id);
          reviews.push(mapped);
        } catch (mapErr) {
          console.warn('Mapping failed for review, falling back to raw shape', mapErr);
          reviews.push({
            id: r.name || r.reviewId || r.review_id || (r.review && r.review.reviewId) || `${business.id}-${Math.random().toString(36).slice(2,9)}`,
            business_id: business.id,
            reviewer_name: r.reviewer?.displayName || r.reviewer?.name || r.author || '',
            rating: r.starRating || r.rating || r.review?.starRating || null,
            review_text: r.comment || r.text || r.review?.comment || r.review?.text || '',
            review_time: r.createTime || r.create_time || r.review?.createTime || new Date().toISOString(),
            source: 'google',
            raw: r,
          });
        }
      }

      pageToken = data.nextPageToken;
    } while (pageToken);

    if (reviews.length === 0) {
      return new Response(JSON.stringify({ message: "No new reviews found", count: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Upsert reviews idempotently by `id`
    // Break into chunks to avoid very large payloads
    const chunkSize = 50;
    for (let i = 0; i < reviews.length; i += chunkSize) {
      const chunk = reviews.slice(i, i + chunkSize);
      const { error: upsertError } = await supabaseAdmin.from("reviews").upsert(chunk, { onConflict: "id" });
      if (upsertError) console.error("Upsert error:", upsertError.message);
    }

    return new Response(JSON.stringify({ message: "Sync complete", count: reviews.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("sync-reviews error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
