# Project Tasks — Short Term

This file collects high-priority, actionable tasks extracted from the project docs.

- [x] Implement `sync-reviews` Edge Function — call Google Business Profile API, support pagination with `pageToken`, and perform idempotent upserts into `reviews` table.
- [ ] Implement `generate-response` workflow — integrate Lovable/Gemini, require `LOVABLE_API_KEY`, and add human approval flow for responses.
- [ ] Add pricing configuration (`src/lib/plans.ts`) — KES-only tiers: Starter / Growth / Agency (pricing values TBD).
- [ ] Integrate M-Pesa STK Push (Daraja) for payments (Agency tier) and add tests for payment flows.
- [ ] Create new Supabase migrations for any DB schema changes; do **not** edit existing migration files.
- [ ] Deploy Supabase Edge Functions and ensure `supabase/.env` contains required secrets.
- [ ] Add unit tests (Vitest) for pure functions and hooks; add Playwright e2e tests for OAuth → Dashboard flows.
- [ ] Fill `Redesign Auth Page/guidelines/Guidelines.md` with design guidelines and contribution instructions.
- [ ] Create `tasks/lessons.md` after major milestones to capture lessons learned and fixes.

## Phase 2 — Multi-Platform Expansion (Facebook + Roadmap)

- [ ] Apply migration `20260410120000_add_platforms.sql` in Supabase.
- [ ] Set Supabase Edge Function secrets: `FACEBOOK_APP_ID`, `FACEBOOK_APP_SECRET`.
- [ ] Deploy Edge Function `exchange-facebook-token`.
- [ ] Update frontend `.env` with `VITE_FACEBOOK_APP_ID` and `VITE_FACEBOOK_REDIRECT_URI`.
- [ ] Configure Meta app: Facebook Login, valid OAuth redirects, permissions.
- [ ] Submit App Review and switch Meta app to **Live** for real users.
- [ ] Test Facebook OAuth end-to-end (connect → platforms row created).
- [ ] Verify Reviews platform filter with real data.

Notes:
- Keep changes small and surgical; follow the repo `CLAUDE.md` rules.
- Prioritize security: never commit secrets; use env vars and RLS on tables.
