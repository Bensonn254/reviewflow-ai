// googleAuth.ts
// Handles the server-side Authorization Code flow for Google Business Profile.
// Token exchange is done via a Supabase Edge Function (not a Firebase Cloud Function).

import { supabase } from "@/integrations/supabase/client";

const CLIENT_ID    = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_OAUTH_REDIRECT_URI;

const GBP_SCOPES = [
  "https://www.googleapis.com/auth/business.manage",
].join(" ");

export function buildGBPAuthUrl() {
  const params = new URLSearchParams({
    client_id:     CLIENT_ID,
    redirect_uri:  REDIRECT_URI,
    response_type: "code",
    scope:         GBP_SCOPES,
    access_type:   "offline",
    prompt:        "consent",
  });

  return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
}

export async function exchangeCodeForTokens(code: string) {
  // ── Wait for session to be available after the Google redirect ──────
  // supabase.functions.invoke auto-attaches the JWT, but on a fresh page
  // load (post-redirect) the session may not have hydrated from storage yet.
  const { data: { session }, error: sessionError } = await supabase.auth.getSession();

  if (sessionError || !session) {
    throw new Error("No active Supabase session — please sign in before connecting Google.");
  }

  const { data, error } = await supabase.functions.invoke("exchange-token", {
    body: { code, redirectUri: REDIRECT_URI },
    headers: {
      // Explicitly pass the token instead of relying on auto-attach
      Authorization: `Bearer ${session.access_token}`,
    },
  });

  if (error) {
    console.error("DEBUG: exchange-token returned error:", error);
    // Supposed to be FunctionsHttpError:
    if (error.context) {
      console.error("DEBUG: error context:", await error.context.text());
    }
    throw new Error(error.message || "Token exchange failed");
  }

  return data; // { accessToken, refreshToken, expiresAt }
}
