import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

type FacebookPage = {
  id: string;
  name: string;
  access_token: string;
  link?: string;
};

serve(async (req) => {
  if (req.method === "OPTIONS")
    return new Response(null, { headers: corsHeaders });

  try {
    // ── 1. Authenticate the caller via Supabase JWT ──────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Missing Authorization header");

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const supabaseUser = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser(authHeader.replace("Bearer ", ""));
    if (userError || !user) throw new Error("Unauthorized");

    // ── 2. Read request body ─────────────────────────────────────────
    const { code, businessId, redirectUri } = await req.json();
    if (!code) throw new Error("Missing authorization code");
    if (!businessId) throw new Error("Missing businessId");
    if (!redirectUri) throw new Error("Missing redirectUri");

    // ── 3. Exchange auth code with Facebook ─────────────────────────
    const FACEBOOK_APP_ID = Deno.env.get("FACEBOOK_APP_ID");
    const FACEBOOK_APP_SECRET = Deno.env.get("FACEBOOK_APP_SECRET");

    if (!FACEBOOK_APP_ID || !FACEBOOK_APP_SECRET) {
      throw new Error("Facebook OAuth credentials not configured on server");
    }

    const tokenRes = await fetch("https://graph.facebook.com/v19.0/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: FACEBOOK_APP_ID,
        client_secret: FACEBOOK_APP_SECRET,
        code,
        redirect_uri: redirectUri,
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      console.error("Facebook token exchange FAILED:", {
        status: tokenRes.status,
        message: tokenData?.error?.message || tokenData?.error,
      });
      throw new Error(
        tokenData?.error?.message || tokenData?.error || "Facebook token exchange failed"
      );
    }

    const userAccessToken = tokenData.access_token;
    if (!userAccessToken) throw new Error("Facebook access token missing");

    // ── 4. Fetch managed Facebook Pages ──────────────────────────────
    const accountsRes = await fetch(
      `https://graph.facebook.com/v19.0/me/accounts?${new URLSearchParams({
        access_token: userAccessToken,
      }).toString()}`
    );
    const accountsData = await accountsRes.json();

    if (!accountsRes.ok) {
      console.error("Facebook pages lookup FAILED:", {
        status: accountsRes.status,
        message: accountsData?.error?.message || accountsData?.error,
      });
      throw new Error(
        accountsData?.error?.message || accountsData?.error || "Failed to fetch Facebook pages"
      );
    }

    const pages = Array.isArray(accountsData?.data)
      ? (accountsData.data as FacebookPage[])
      : [];

    if (pages.length === 0) {
      throw new Error("No Facebook Pages found for this user");
    }

    // ── 5. Select the first available page ───────────────────────────
    const page = pages[0];

    // ── 6. Upsert into platforms ─────────────────────────────────────
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { error: upsertError } = await supabaseAdmin
      .from("platforms")
      .upsert(
        {
          business_id: businessId,
          platform: "facebook",
          access_token: page.access_token,
          platform_page_id: page.id,
          page_name: page.name,
          page_url: page.link || null,
          is_connected: true,
          connected_at: new Date().toISOString(),
        },
        { onConflict: "business_id,platform" }
      );

    if (upsertError) {
      console.error("Facebook platform upsert failed:", upsertError.message);
      throw new Error("Failed to save Facebook Page connection");
    }

    // ── 7. Return page info ──────────────────────────────────────────
    return new Response(
      JSON.stringify({ pageId: page.id, pageName: page.name, pageUrl: page.link }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("exchange-facebook-token error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
