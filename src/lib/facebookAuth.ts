import { supabase } from "@/integrations/supabase/client";

const FB_APP_ID = import.meta.env.VITE_FACEBOOK_APP_ID;
const REDIRECT_URI = import.meta.env.VITE_FACEBOOK_REDIRECT_URI;

// Scopes needed to read and reply to Facebook Page reviews/recommendations
const FB_SCOPES = [
  "pages_show_list",
  "pages_read_engagement",
  "pages_read_user_content",
  "pages_manage_posts",
].join(",");

export function buildFacebookAuthUrl(businessId: string): string {
  // Pass businessId in state param so we know which business
  // to associate the connection with after redirect
  const state = btoa(JSON.stringify({ businessId }));
  const params = new URLSearchParams({
    client_id: FB_APP_ID,
    redirect_uri: REDIRECT_URI,
    scope: FB_SCOPES,
    response_type: "code",
    state,
  });
  return `https://www.facebook.com/v19.0/dialog/oauth?${params.toString()}`;
}

export async function exchangeFacebookCode(
  code: string,
  businessId: string
): Promise<{ pageId: string; pageName: string; pageUrl?: string }> {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error("No active session");

  const { data, error } = await supabase.functions.invoke("exchange-facebook-token", {
    body: { code, businessId, redirectUri: REDIRECT_URI },
    headers: { Authorization: `Bearer ${session.access_token}` },
  });

  if (error) throw new Error(error.message || "Facebook token exchange failed");
  return data; // { pageId, pageName, pageUrl }
}
