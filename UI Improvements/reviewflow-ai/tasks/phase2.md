# Phase 2 — Multi-Platform Expansion (Facebook + Roadmap)

This doc captures the remaining operational steps for Phase 2 so work can be resumed later.

## What’s Already Implemented in Code

- `platform_type` enum + `platforms` table migration.
- `reviews.platform` column.
- Facebook OAuth URL helper + callback page.
- Supabase Edge Function: `exchange-facebook-token`.
- Platform connection chips on **My Locations**.
- Platform filter buttons on **Reviews**.

## Remaining Ops Steps (Run In This Order)

1. **Apply the migration**
   - `supabase db push`
2. **Set Supabase secrets**
   - `supabase secrets set FACEBOOK_APP_ID=... FACEBOOK_APP_SECRET=...`
3. **Deploy Edge Function**
   - `supabase functions deploy exchange-facebook-token`
4. **Configure frontend env**
   - Add to `.env`:
     - `VITE_FACEBOOK_APP_ID=...`
     - `VITE_FACEBOOK_REDIRECT_URI=http://localhost:5173/oauth/facebook/callback`
5. **Test OAuth end-to-end**
   - Go to **My Locations** → click **Facebook → Connect**.
   - Confirm redirect completes and you’re sent back to `/my-gbps`.
   - Verify `platforms` row created with `platform='facebook'`.

## Facebook API Setup (Meta Developer Console)

1. **Create Meta Developer App**
2. **Add Facebook Login product**
3. **Enable OAuth**
   - Client OAuth Login: ON
   - Web OAuth Login: ON
4. **Add Redirect URIs**
   - `http://localhost:5173/oauth/facebook/callback`
   - `https://your-domain.com/oauth/facebook/callback`
5. **Request Permissions**
   - `pages_show_list`
   - `pages_read_engagement`
   - `pages_read_user_content`
   - `pages_manage_posts`
6. **App Review + Live Mode**
   - Submit App Review for those permissions
   - Switch app to **Live** for real customer usage

## Post-Deploy Validation Checklist

- Can connect Google and Facebook from **My Locations**
- `platforms` table rows update correctly
- Reviews filter by platform works with real data
- No secrets or tokens stored client-side

## Deploy Commands (Quick Reference)

```bash
npm run lint
npm run build

supabase db push
supabase secrets set FACEBOOK_APP_ID=... FACEBOOK_APP_SECRET=...
supabase functions deploy exchange-facebook-token

firebase deploy --only hosting:reviewflowai --project bensonn254-portfolio
```
