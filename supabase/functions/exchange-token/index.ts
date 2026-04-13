import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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

    // Create a client scoped to the calling user to verify their identity
    const supabaseUser = createClient(supabaseUrl, supabaseServiceKey, {
      global: { headers: { Authorization: authHeader } },
    });

    const {
      data: { user },
      error: userError,
    } = await supabaseUser.auth.getUser();
    if (userError || !user) throw new Error("Unauthorized");

    // ── 2. Read request body ─────────────────────────────────────────
    const { code, redirectUri } = await req.json();
    if (!code) throw new Error("Missing authorization code");

    // ── 3. Exchange auth code with Google ─────────────────────────────
    const GOOGLE_CLIENT_ID = Deno.env.get("GOOGLE_CLIENT_ID");
    const GOOGLE_CLIENT_SECRET = Deno.env.get("GOOGLE_CLIENT_SECRET");

    if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
      throw new Error("Google OAuth credentials not configured on server");
    }

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    const tokenData = await tokenRes.json();

    if (!tokenRes.ok) {
      // Log everything so you can see in Supabase Function logs exactly what Google said
      console.error("Google token exchange FAILED:", {
        status:      tokenRes.status,
        error:       tokenData.error,
        description: tokenData.error_description,
        redirectUri: redirectUri,
      });
      throw new Error(
        tokenData.error_description || tokenData.error || "Token exchange failed"
      );
    }

    const accessToken = tokenData.access_token;
    const refreshToken = tokenData.refresh_token;
    const expiresAt = Date.now() + tokenData.expires_in * 1000;

    // ── 4. Save tokens to the businesses table ───────────────────────
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    const { data: businesses, error: fetchBizError } = await supabaseAdmin
      .from("businesses")
      .select("id")
      .eq("owner_id", user.id)
      .limit(1);

    if (fetchBizError) {
      console.warn("Business lookup warning:", fetchBizError.message);
    }

    const businessId = businesses?.[0]?.id;
    // Use upsert so tokens are saved even if a business row doesn't exist yet
    const { error: upsertError } = await supabaseAdmin
      .from("businesses")
      .upsert(
        {
          owner_id: user.id,
          name: "",
          google_access_token: accessToken,
          google_refresh_token: refreshToken,
          token_expires_at: new Date(expiresAt).toISOString(),
        },
        { onConflict: "owner_id" }
      );

    if (upsertError) {
      console.warn("Token save warning:", upsertError.message);
      // Non-fatal — tokens are still returned to the frontend
    }

    // ── 5. Return tokens to the frontend ─────────────────────────────
    return new Response(
      JSON.stringify({ accessToken, refreshToken, expiresAt }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (e) {
    console.error("exchange-token error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 400,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
