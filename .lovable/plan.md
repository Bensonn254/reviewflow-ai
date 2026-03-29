

# ReviewFlow AI — Full MVP Build Plan

## Design System

Dark mode with blue accents. Primary: `#3B82F6` (blue-500). Background: `#0F172A` (slate-900). Cards: `#1E293B` (slate-800) with subtle borders. Glassmorphism on auth pages with backdrop-blur and semi-transparent cards. Inter font throughout.

## Architecture Overview

```text
Pages & Routes
├── /auth              → Sign in / Sign up (Google OAuth + email/password)
├── /auth/reset        → Password reset page
├── /review/:businessId → Customer-facing review gateway (public)
├── /dashboard         → Owner dashboard (protected)
└── /settings          → Business config & QR code (protected)

Supabase Tables
├── profiles           → user_id, full_name, avatar_url
├── businesses         → owner_id, name, place_id, gbp_account_id, location_id,
│                        service_type, location_area, whatsapp_number,
│                        google_review_url, qr_code_url
├── reviews            → business_id, reviewer_name, rating, review_text,
│                        ai_response, status (pending/publishing/published/rejected),
│                        google_review_id, created_at
└── feedback           → business_id, rating, message, customer_contact, created_at
```

## Implementation Steps

### 1. Design System & Theme
Update `index.css` with dark mode HSL variables (slate-900 bg, blue-500 primary). Update `tailwind.config.ts` with custom colors, glassmorphism utilities, and animations (fade-in, slide-up, glow pulse).

### 2. Authentication Pages
- **Sign-in/Sign-up page** (`/auth`): Split layout — left panel with branding/illustration, right panel with glassmorphic card containing email/password form, Google OAuth button, and toggle between sign-in/sign-up modes.
- **Password reset** (`/auth/reset`): Simple form to set new password after email link click.
- **Auth context** with Supabase `onAuthStateChange`, protected route wrapper, email verification check.

### 3. Supabase Schema (Migrations)
- `profiles` table with trigger on `auth.users` insert.
- `businesses` table linked to profile.
- `reviews` table with status enum.
- `feedback` table for intercepted negative reviews.
- RLS policies: owners see only their own data; public insert on feedback.

### 4. Settings Page (`/settings`)
- Form fields: Business name, Place ID, GBP Account/Location IDs, service type, location/area, WhatsApp number, Google Review URL.
- QR code generation using `qrcode.react` — dynamically builds URL like `/review/{businessId}`.
- Download QR as image button.

### 5. Customer Review Gateway (`/review/:businessId`)
- Mobile-optimized, public page. Star rating selector (1-5 stars with animation).
- **4-5 stars**: Thank-you message + auto-redirect to the business's Google Review URL.
- **1-3 stars**: Show private feedback form (message + optional contact info) → saves to `feedback` table → sends WhatsApp notification via `https://wa.me/{number}?text=...` deep link.

### 6. Dashboard (`/dashboard`)
- **Top bar**: Business name, settings gear icon, sign-out.
- **4 metric cards**: Pending, Publishing, Published, Rejected counts with icons and color-coded borders.
- **Tabbed review list** (Tabs component): Needs Review | Publishing | Published | Rejected.
- Each review card shows: reviewer name, rating (stars), review text, AI-suggested response.
- Action buttons per tab: Approve / Edit / Reject (Needs Review), status indicator (Publishing), view-only (Published/Rejected).

### 7. AI Response Generation
- Supabase Edge Function (`generate-response`) using Lovable AI gateway.
- System prompt incorporates business context (service type, location) for tailored responses.
- Called when new reviews are fetched; draft stored in `reviews.ai_response`.

### 8. Review Sync Edge Function
- `sync-reviews` edge function that fetches reviews from Google Business Profile API using stored credentials.
- Inserts new reviews into the `reviews` table with `pending` status.
- Can be triggered manually from dashboard or on a schedule.

### 9. Shared Components
- `ProtectedRoute` — redirects to `/auth` if not authenticated, checks email verification.
- `Navbar` — dashboard navigation with business switcher.
- `StarRating` — reusable animated star selector.
- `MetricCard` — glassmorphic stat card with icon, count, label.
- `ReviewCard` — review display with AI response and action buttons.

### Files Created/Modified
~15 new files (pages, components, hooks, edge functions, migrations), plus updates to `App.tsx`, `index.css`, `tailwind.config.ts`.

