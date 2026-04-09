<p align="center">
  <img src="public/favicon.svg" alt="ReviewFlow AI Logo" width="80" />
</p>

<h1 align="center">ReviewFlow AI</h1>

<p align="center">
  <strong>AI-Powered Google Business Profile Review Management</strong>
</p>

<p align="center">
  Automate review collection, generate intelligent AI responses, and protect your online reputation — all from a single dashboard.
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#environment-variables">Environment Variables</a> •
  <a href="#deployment">Deployment</a> •
  <a href="#license">License</a>
</p>

---

## Overview

**ReviewFlow AI** helps businesses streamline their Google Business Profile (GBP) review management. It uses smart review routing — happy customers are directed to leave public Google reviews, while unhappy customers are privately routed to WhatsApp for resolution. The platform also generates AI-powered response drafts for every incoming review, saving hours of manual work.

---

## Features

### 🎯 Smart Review Gateway
- **QR Code Generation** — Generate a unique QR code for your business. Customers scan it and rate their experience.
- **Intelligent Routing** — Customers rating ≥ 4 stars are automatically redirected to your Google Reviews page. Lower ratings are captured privately.
- **Private Feedback Capture** — Negative feedback is collected with optional contact info and forwarded to your WhatsApp for direct follow-up.

### 🤖 AI-Powered Responses
- **Auto-Generated Replies** — Every review gets a professional AI-drafted response tailored to your business type & location.
- **Edit & Approve Workflow** — Review, edit, approve, or reject AI responses before they go live.
- **Contextual Intelligence** — AI responses factor in your service type, location, and the specific review content.

### 📊 Dashboard & Analytics
- **Review Pipeline** — Track reviews across four stages: Needs Review → Publishing → Published → Rejected.
- **Metric Cards** — Real-time counts for each review status at a glance.
- **One-Click Sync** — Pull the latest reviews from Google with a single click.

### 🔗 Google Business Profile Integration
- **OAuth 2.0 Connection** — Securely connect your Google Business Profile via OAuth.
- **Token Exchange** — Server-side token exchange handled via Supabase Edge Functions for security.
- **Review Syncing** — Automatically fetch and sync reviews from the Google Business Profile API.

### ⚙️ Business Settings
- **Complete Profile Management** — Configure your business name, Place ID, GBP Account ID, Location ID, service type, and area.
- **Guided Setup** — Contextual help tooltips guide you through finding each Google ID.
- **WhatsApp Integration** — Set your WhatsApp number for instant negative feedback alerts.

### 🔐 Authentication
- **Supabase Auth** — Secure email/password authentication with Supabase.
- **Password Reset** — Full password reset flow via email.
- **Protected Routes** — Dashboard and settings are protected behind authentication.

---

## Tech Stack

| Layer              | Technology                                                      |
| ------------------ | --------------------------------------------------------------- |
| **Framework**      | [React 18](https://react.dev) + [TypeScript](https://www.typescriptlang.org) |
| **Build Tool**     | [Vite](https://vitejs.dev)                                      |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com) + [shadcn/ui](https://ui.shadcn.com) |
| **State**          | [TanStack Query](https://tanstack.com/query)                    |
| **Routing**        | [React Router v6](https://reactrouter.com)                      |
| **Backend**        | [Supabase](https://supabase.com) (Auth, Database, Edge Functions) |
| **AI**             | Google Gemini via Lovable / Llama 3 (Groq) via Supabase Edge Functions |
| **Charts**         | [Recharts](https://recharts.org)                                |
| **QR Codes**       | [qrcode.react](https://github.com/zpao/qrcode.react)           |
| **Forms**          | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| **Testing**        | [Vitest](https://vitest.dev) + [Playwright](https://playwright.dev) |

---

## Architecture

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (Vite + React)           │
│  ┌──────────┐  ┌───────────┐  ┌──────────────────┐  │
│  │   Auth    │  │ Dashboard │  │  Review Gateway  │  │
│  │  Pages    │  │ + Settings│  │  (Public QR)     │  │
│  └────┬─────┘  └─────┬─────┘  └────────┬─────────┘  │
│       │               │                 │            │
└───────┼───────────────┼─────────────────┼────────────┘
        │               │                 │
        ▼               ▼                 ▼
┌─────────────────────────────────────────────────────┐
│                  Supabase Backend                    │
│  ┌──────────┐  ┌──────────────┐  ┌───────────────┐  │
│  │   Auth   │  │  PostgreSQL  │  │ Edge Functions │  │
│  │ (Email)  │  │  (RLS)       │  │ • exchange-    │  │
│  │          │  │  • businesses│  │   token        │  │
│  │          │  │  • reviews   │  │ • generate-    │  │
│  │          │  │  • feedback  │  │   response     │  │
│  │          │  │              │  │ • sync-reviews │  │
│  └──────────┘  └──────────────┘  └───────────────┘  │
└─────────────────────────────────────────────────────┘
```

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9
- A [Supabase](https://supabase.com) project
- A [Google Cloud](https://console.cloud.google.com) project with the Business Profile API enabled

### Installation

```bash
# Clone the repository
git clone https://github.com/Bensonn254/reviewflow-ai.git
cd reviewflow-ai

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your actual values

# Start the development server
npm run dev
```

The app will be available at `http://localhost:8080` (or the port Vite prints in your terminal).

---

## Environment Variables

Create a `.env` file in the project root. See [`.env.example`](.env.example) for the template.

| Variable                        | Description                              |
| ------------------------------- | ---------------------------------------- |
| `VITE_SUPABASE_PROJECT_ID`      | Your Supabase project ID                 |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Supabase anon/public key                 |
| `VITE_SUPABASE_URL`             | Full Supabase project URL                |
| `VITE_GOOGLE_CLIENT_ID`         | Google OAuth 2.0 client ID               |
| `VITE_OAUTH_REDIRECT_URI`       | OAuth callback URL (e.g. `http://localhost:8080/oauth/callback`) |

> **⚠️ Important:** Never commit `.env` to version control. The `.gitignore` is configured to exclude it.

---

## Supabase Setup

### Database Tables

The app expects the following tables (managed via migrations in `supabase/migrations/`):

- **`businesses`** — Business profile, Google tokens, QR code URL, WhatsApp number
- **`reviews`** — Synced Google reviews with AI responses and status tracking
- **`feedback`** — Private negative feedback submitted via the review gateway

### Edge Functions

Located in `supabase/functions/`:

| Function             | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| `exchange-token`     | Exchanges Google OAuth authorization codes for access/refresh tokens |
| `generate-response`  | Generates AI-powered review response drafts       |
| `sync-reviews`       | Pulls latest reviews from the Google Business Profile API |
| `support-chat`       | FlowBot AI support assistant powered by Groq             |

### Deploy Edge Functions

```bash
supabase functions deploy exchange-token
supabase functions deploy generate-response
supabase functions deploy sync-reviews
supabase functions deploy support-chat --no-verify-jwt
```

---

## Scripts

| Command           | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Start development server           |
| `npm run build`   | Build for production               |
| `npm run preview` | Preview production build           |
| `npm run lint`    | Run ESLint                         |
| `npm run test`    | Run unit tests (Vitest)            |
| `npm run test:watch` | Run tests in watch mode         |

---

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/              # shadcn/ui primitives
│   ├── GBPConnectBanner # Google connection prompt
│   ├── MetricCard       # Dashboard stat cards
│   ├── Navbar           # App navigation
│   ├── ReviewCard       # Review display + actions
│   └── StarRating       # Interactive star rating
├── contexts/            # React context providers (Auth)
├── hooks/               # Custom React hooks
├── integrations/        # Supabase client & types
├── lib/                 # Utilities (Google OAuth helpers)
├── pages/               # Route-level page components
│   ├── Auth             # Sign in / Sign up
│   ├── Dashboard        # Review management dashboard
│   ├── OAuthCallback    # Google OAuth redirect handler
│   ├── ResetPassword    # Password reset flow
│   ├── ReviewGateway    # Public QR-code landing page
│   └── Settings         # Business configuration
└── test/                # Test utilities & setup
```

---

## Routes

Primary routes:
- `/` — Landing page
- `/login` — Auth (sign in / sign up)
- `/login/reset` — Password reset
- `/dashboard` — Protected dashboard
- `/settings` — Protected business settings
- `/review/:businessId` — Public review gateway

Legacy aliases (kept for compatibility):
- `/auth` → `/login`
- `/auth/reset` → `/login/reset`

---

## Deployment

Build the production bundle:

```bash
npm run build
```

The output will be in the `dist/` directory, ready to deploy to any static hosting provider (Vercel, Netlify, Cloudflare Pages, etc.).

---

## Screenshot Pipeline

The landing page preview image lives at:

- `public/dashboard-preview.png`

Quick update flow:

1. Open the app dashboard locally.
2. Take a clean screenshot (hide personal data).
3. Save/replace the file as `public/dashboard-preview.png`.
4. Refresh the landing page to verify the image.

---

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/Bensonn254">Bensonn254</a>
</p>
