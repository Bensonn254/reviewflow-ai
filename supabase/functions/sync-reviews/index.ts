import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Credentials": "false",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    // Reply with explicit CORS headers and an OK status for preflight requests
    return new Response(null, { status: 204, headers: corsHeaders });
  }

  try {
    const { business_id } = await req.json();

    // Placeholder: In production, this would call the Google Business Profile API
    // using the business's place_id, gbp_account_id, and location_id
    // to fetch new reviews and insert them into the reviews table.
    // For now, return a message indicating the sync endpoint is ready.

    return new Response(
      JSON.stringify({
        message: "Sync endpoint ready. Connect your Google Business Profile API credentials to enable automatic review syncing.",
        business_id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    console.error("sync-reviews error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
