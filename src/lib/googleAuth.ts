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
    const friendlyMessage = await buildExchangeTokenErrorMessage(error);
    console.error("DEBUG: exchange-token returned error:", {
      message: error.message,
      friendlyMessage,
    });
    throw new Error(friendlyMessage);
  }

  return data; // { accessToken, refreshToken, expiresAt }
}

async function buildExchangeTokenErrorMessage(error: unknown) {
  const fallback = "Token exchange failed. Please try again.";
  if (!error || typeof error !== "object") return fallback;

  const err = error as { message?: string; context?: Response };
  let rawMessage = err.message || "";

  if (err.context && typeof err.context.text === "function") {
    try {
      const raw = await err.context.text();
      if (raw) {
        try {
          const parsed = JSON.parse(raw) as { error?: string; message?: string };
          rawMessage = parsed.error || parsed.message || rawMessage;
        } catch {
          rawMessage = raw;
        }
      }
    } catch {
      // Ignore context parsing issues and fall back to existing message
    }
  }

  const normalized = (rawMessage || "").toLowerCase();

  if (normalized.includes("client secret is invalid") || normalized.includes("invalid_client")) {
    return "Google OAuth failed: invalid client secret. Update GOOGLE_CLIENT_SECRET in Supabase Edge Function secrets to match GOOGLE_CLIENT_ID.";
  }

  if (normalized.includes("redirect_uri_mismatch")) {
    return "Google OAuth failed: redirect URI mismatch. Ensure VITE_OAUTH_REDIRECT_URI matches the Authorized redirect URI in Google Cloud Console.";
  }

  if (normalized.includes("invalid_grant")) {
    return "Google OAuth failed: the authorization code expired or was already used. Please try connecting again.";
  }

  return rawMessage || fallback;
}
