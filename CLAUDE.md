# ReviewFlow AI — CLAUDE.md

> Google Business Profile reputation management SaaS
> Targeting Kenyan SMEs and agency resellers
> Built by Bensonn254

---

## Project Overview

ReviewFlow AI connects to a business's Google Business Profile via OAuth, syncs reviews
(GBP API integration is pending; `sync-reviews` is currently a stub), and generates
AI-powered responses via the Lovable AI gateway (Gemini). Businesses and agencies
manage reputation, track metrics, and respond to reviews from one dashboard.

**Live stack:** React + Vite + TypeScript · Tailwind CSS · shadcn/ui · Supabase · Node/npm

---

## Repo Structure

```
gbp-optimizer/
├── src/
│   ├── components/
│   │   ├── ui/                    # shadcn/ui primitives — DO NOT hand-edit
│   │   ├── GBPConnectBanner.tsx
│   │   ├── MetricCard.tsx
│   │   ├── Navbar.tsx
│   │   ├── NavLink.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ReviewCard.tsx
│   │   └── StarRating.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   ├── use-mobile.tsx
│   │   └── use-toast.ts
│   ├── integrations/supabase/
│   │   ├── client.ts              # Supabase client singleton
│   │   └── types.ts               # Generated DB types — DO NOT hand-edit
│   ├── lib/                       # Pure utility functions
│   │   ├── googleAuth.ts
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Auth.tsx
│   │   ├── Dashboard.tsx
│   │   ├── Index.tsx
│   │   ├── NotFound.tsx
│   │   ├── OAuthCallback.tsx      # Handles Google OAuth redirect
│   │   ├── ResetPassword.tsx
│   │   ├── ReviewGateway.tsx
│   │   └── Settings.tsx
│   ├── test/
│   ├── App.tsx
│   └── main.tsx
├── supabase/
│   ├── functions/
│   │   ├── exchange-token/        # Exchanges GBP OAuth code for tokens
│   │   ├── generate-response/     # Lovable AI gateway (Gemini) responses
│   │   └── sync-reviews/          # Pulls reviews from GBP API into DB
│   ├── migrations/                # Never edit old migrations — add new ones only
│   └── config.toml
├── public/
├── playwright-fixture.ts
├── playwright.config.ts           # e2e tests
├── vitest.config.ts               # unit tests
├── tailwind.config.ts
├── postcss.config.js
├── vite.config.ts
├── eslint.config.js
├── tsconfig.json
├── tsconfig.app.json
├── tsconfig.node.json
├── components.json                # shadcn/ui config
├── package.json
├── package-lock.json              # npm lockfile — always commit this
├── index.html
├── README.md
└── CLAUDE.md
```

---

## Tech Stack Rules

| Concern            | Tool                            | Notes                                    |
|--------------------|---------------------------------|------------------------------------------|
| Package manager    | **npm**                         | Use `npm install` (repo uses `package-lock.json`) |
| Frontend           | React + Vite + TypeScript       | Strict mode on                           |
| Styling            | Tailwind CSS + shadcn/ui        | Use shadcn primitives before custom CSS  |
| Auth               | Supabase Auth + Google OAuth    | Token exchange via Edge Function         |
| Database           | Supabase (Postgres)             | RLS policies required on all tables      |
| Edge Functions     | Supabase Edge Functions (Deno)  | One function per Edge Function folder    |
| AI                 | Lovable AI gateway (Gemini)     | `generate-response/` uses Gemini via Lovable |
| Testing (e2e)      | Playwright                      | Fixtures in `playwright-fixture.ts`      |
| Testing (unit)     | Vitest                          | Tests in `src/test/`                     |

---

## File Architecture Rules

### Prefer one main component per file. Small cohesive utilities can export multiple helpers.

**Bad:**
```
src/utils.ts              ← 600 lines of mixed helpers
src/hooks/index.ts        ← all hooks bundled together
```

**Good:**
```
src/hooks/useReviews.ts
src/hooks/useGBPConnect.ts
src/hooks/useMetrics.ts
src/lib/formatStarRating.ts
src/lib/buildReviewPrompt.ts
```

Exceptions:
- `src/components/ui/` (shadcn) often exports multiple related primitives in one file
- Small, focused utility modules (e.g. `src/lib/googleAuth.ts`) can export a few helpers

### Where new code goes

| What you're creating          | Where it lives                                      |
|-------------------------------|-----------------------------------------------------|
| Reusable UI component         | `src/components/ComponentName.tsx`                  |
| shadcn primitive              | `src/components/ui/` via CLI only                   |
| Page / route                  | `src/pages/PageName.tsx`                            |
| Custom React hook             | `src/hooks/useHookName.ts`                          |
| Pure utility / helper         | `src/lib/helperName.ts`                             |
| Global state / context        | `src/contexts/ContextName.tsx`                      |
| Supabase Edge Function        | `supabase/functions/function-name/index.ts`         |
| DB schema change              | New file in `supabase/migrations/`                  |

---

## Code Editing Rules

- **NEVER use `sed` or `awk`** to make code changes — they match all occurrences globally
- Always use the file editor (`str_replace`) for surgical, targeted edits
- Read the exact block first, then replace only what needs changing
- Never rewrite an entire file when a single function needs updating

---

## Supabase Edge Functions

Each Edge Function lives in its own folder under `supabase/functions/`:

### `exchange-token/`
- Receives the Google OAuth authorization code from `OAuthCallback.tsx`
- Exchanges it for GBP access + refresh tokens via Google's token endpoint
- Stores tokens securely in Supabase — never expose in client

### `sync-reviews/`
- Currently a stub that returns a "ready" message (no GBP API calls yet)
- Planned: call GBP API, paginate via `pageToken`, upsert reviews (idempotent)

### `generate-response/`
- Calls Lovable AI gateway: `https://ai.gateway.lovable.dev/v1/chat/completions`
- Uses `LOVABLE_API_KEY`
- Prompt uses `service_type`, `location_area`, `review_text`, `rating`, `reviewer_name`
- Returns generated text — human approves before it is posted
- Model: `google/gemini-3-flash-preview`
- If `review_id` is provided, updates `reviews.ai_response` server-side

### `support-chat/`
- Operational FlowBot powered by **Groq** (`llama-3.3-70b-versatile`)
- Uses `GROQ_API_KEY`
- Provides contextual help about ReviewFlow features and pricing
- Deployed with `--no-verify-jwt` to allow public lead generation

---

## Google OAuth Flow

```
User clicks "Connect GBP"
  → Redirect to Google OAuth consent (GBP scope)
  → Google redirects to /oauth/callback (OAuthCallback.tsx)
  → OAuthCallback calls exchange-token Edge Function
  → Tokens stored in Supabase
  → User redirected to Dashboard
```

Required scope: `https://www.googleapis.com/auth/business.manage`

---

## Database Rules

- **Never edit existing migration files** — always add a new migration file
- All tables must have **Row Level Security (RLS) enabled**
- `src/integrations/supabase/types.ts` is generated — regenerate via CLI, never hand-edit:
  ```bash
  npx supabase gen types typescript --local > src/integrations/supabase/types.ts
  ```
- Supabase client singleton is `src/integrations/supabase/client.ts` — import only from here

---

## shadcn/ui Rules

- Add new components via CLI only:
  ```bash
  npx shadcn@latest add <component>
  ```
- Never hand-edit files inside `src/components/ui/` — they get overwritten by the CLI
- Build custom components on top of shadcn primitives, not from scratch

---

## Environment Variables

**Client (`.env`):**
```
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_GOOGLE_CLIENT_ID=
VITE_OAUTH_REDIRECT_URI=
```

**Supabase Edge Functions (`supabase/.env`):**
```
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
LOVABLE_API_KEY=
GROQ_API_KEY=
```

`SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are provided by the Supabase runtime for Edge Functions.

Never hardcode secrets. Never log tokens or keys. Never commit `.env` files.

---

## Testing

**Unit tests (Vitest):**
```bash
npm run test
```
- Tests live in `src/test/`
- Cover pure functions in `src/lib/` and custom hooks in `src/hooks/`

**e2e tests (Playwright):**
```bash
npx playwright test
```
- Fixtures defined in `playwright-fixture.ts`
- Cover the full OAuth → Dashboard → Review response flow

---

## Workflow

### 1. Plan Before Coding
- For any new feature, API integration, or DB change — write a plan first
- List every affected file explicitly before touching anything
- If something breaks unexpectedly: STOP, re-plan, then continue

### 2. Verification Before Done
- Never mark a task complete without testing actual behavior
- For Edge Functions: check Supabase Function logs, not just local console
- For OAuth / GBP API: log real response shapes — never assume structure
- Ask: "Would a senior engineer approve this?" before presenting

### 3. Autonomous Bug Fixing
- Investigate logs → reproduce → fix. No hand-holding needed.
- Find root causes, not symptoms

### 4. Demand Elegance
- Pause on non-trivial changes: "Is there a more elegant way?"
- Don't over-engineer obvious fixes

---

## UI Revamp Plan (Living Checklist)

1. System Baseline: Lock tokens, type scale, spacing rhythm, and 4-5 reusable primitives (nav, section header, card, CTA, form field).
2. Landing Page: Refine hero value prop, add social proof strip, and structure sections in a clear narrative.
3. Auth Pages: Unify layout, tighten microcopy, and ensure a visible "Back to site" link.
4. App Shell: [Done] Standardized sidebar and topbar styles, fixed horizontal overflows, and refined icons.
5. Dashboard: [Done] Rebalanced layout for clarity (KPIs → reviews → actions); implemented reactive Chat Widget.
6. My GBPs: Add branded empty state, business cards, and a single dominant "Add Business" CTA.
7. Reviews: Align filters and cards to the new card system; rank actions by importance.
8. AI Insights: Standardize chart cards, add clear legends, and highlight one key takeaway per panel.
9. Settings: Group fields into short sections; use clear status chips and a single primary action cluster.
10. Review Gateway: Keep the QR flow minimal, fast, and fully mobile-first.
11. Mobile Pass: Test 360/390/430 widths; fix overflow and reduce heavy copy blocks.
12. Performance & Polish: Tighten assets, remove unused icons, and keep motion subtle.

---

## Business Context

- Pricing in **KES only** on Kenyan-facing UI — no USD display
- Subscription tiers: Starter / Growth / Agency — pricing config TBD (no `src/lib/plans.ts` yet)
- Agency tier supports multiple GBP locations under one login
- Payments: M-Pesa STK Push via Daraja API (planned)
- Target market: Kenyan SMEs + marketing agency resellers

---

## Brand

| Token          | Value                                 |
|----------------|---------------------------------------|
| Brand Primary  | `hsl(220 69% 40%)` (Brand Blue)       |
| Brand Active   | `hsl(217 64% 33%)`                    |
| Accent Yellow  | `hsl(45 100% 64.5%)`                  |
| Accent Hover   | `hsl(45 85% 52%)`                     |
| Background     | `hsl(220 20% 97%)` (Light mode)       |
| Surface        | `hsl(0 0% 100%)` (White)              |
| Font           | Inter                                 |
| Product name   | **ReviewFlow AI**                     |
| Parent brand   | **Bensonn254**                        |
| Voice          | Professional, Kenya-first, direct     |

---

## Task Management

Optional (not yet in repo). If we want lightweight tracking, create:

- `tasks/todo.md` — active checklist, checked off as work progresses
- `tasks/lessons.md` — mistakes made + how they were fixed (self-improvement log)

---

## Core Principles

- **Simplicity First** — minimal code impact per change
- **No Laziness** — root causes only, no temporary patches
- **Minimal Impact** — touch only what's necessary, no side effects
- **Kenya-First** — M-Pesa, KES, local compliance before global defaults
- **Security Always** — RLS on all tables, secrets in env only, never log tokens
