# Project Tasks — Short Term

This file collects high-priority, actionable tasks extracted from the project docs.

- [ ] Implement `sync-reviews` Edge Function — call Google Business Profile API, support pagination with `pageToken`, and perform idempotent upserts into `reviews` table.
- [ ] Implement `generate-response` workflow — integrate Lovable/Gemini, require `LOVABLE_API_KEY`, and add human approval flow for responses.
- [ ] Add pricing configuration (`src/lib/plans.ts`) — KES-only tiers: Starter / Growth / Agency (pricing values TBD).
- [ ] Integrate M-Pesa STK Push (Daraja) for payments (Agency tier) and add tests for payment flows.
- [ ] Create new Supabase migrations for any DB schema changes; do **not** edit existing migration files.
- [ ] Deploy Supabase Edge Functions and ensure `supabase/.env` contains required secrets.
- [ ] Add unit tests (Vitest) for pure functions and hooks; add Playwright e2e tests for OAuth → Dashboard flows.
- [ ] Fill `Redesign Auth Page/guidelines/Guidelines.md` with design guidelines and contribution instructions.
- [ ] Create `tasks/lessons.md` after major milestones to capture lessons learned and fixes.

Notes:
- Keep changes small and surgical; follow the repo `CLAUDE.md` rules.
- Prioritize security: never commit secrets; use env vars and RLS on tables.
