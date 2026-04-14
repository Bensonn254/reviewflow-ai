# ReviewFlowAI — Premium Frontend Elevation Prompt

## Prompt

Build a single-page React + Tailwind CSS landing page for **ReviewFlowAI** — an AI-powered platform that automates review collection and management for businesses. The current site lives at `reviewflowai.web.app`. Keep the same general structure and content but elevate the visual quality to a premium, polished level. Use **Framer Motion** for all animations. Do NOT add a testimonials section.

## Global Design Rules

- **Color palette:** Keep the current brand colors (blue/indigo primary, dark navy backgrounds for contrast sections, white/light gray for alternating sections). Elevate by adding subtle gradient accents and glow effects.
- **Typography:** Use tight letter-spacing on headings (`tracking-tight`). Headings should be large and bold (`text-4xl md:text-5xl lg:text-6xl font-bold`). Body text should be `text-lg text-muted-foreground` with generous line-height.
- **Spacing:** Use generous vertical padding between sections (`py-24 md:py-32`). Add more whitespace — the page should breathe.
- **Cards:** All cards should have soft shadows (`shadow-md`), rounded corners (`rounded-2xl`), a subtle border, and a hover effect that lifts the card (`hover:-translate-y-1 hover:shadow-xl transition-all duration-300`).
- **Buttons:** Primary buttons should have a subtle gradient background, smooth hover transitions, and a slight scale-up on hover (`hover:scale-105`). Add a gentle press effect (`active:scale-95`).
- **Section transitions:** Add curved SVG dividers or soft gradient separators between sections instead of hard edges.

## Section-by-Section Spec

### 1. Navigation Bar

- Fixed/sticky at top with `backdrop-blur-lg bg-white/80` (transparent glass effect).
- Logo on left, nav links center, CTA button on right.
- On scroll, add a subtle bottom border/shadow.
- Mobile: hamburger menu with smooth slide-in drawer.

### 2. Hero Section

- **Background:** Subtle animated mesh gradient (soft blue/purple/indigo hues moving slowly) behind the content. Use CSS or a lightweight canvas animation.
- **Star rating:** Display an animated 5-star rating with a shimmer/glow sweep effect.
- **Heading:** Large, bold. Apply a gradient text effect (`bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent`) on the key phrase (e.g., "Happy Customers" or "5-Star Reviews").
- **Subtext:** Below heading, 1-2 lines of description in `text-lg text-muted-foreground`.
- **CTA buttons:** Two buttons — primary (gradient, bold) and secondary (outlined). Both with hover scale effects.
- **Animation:** Staggered fade-in + slide-up for each element (stars → heading → subtext → buttons), 0.15s delay between each.
- **Optional:** Add a floating dashboard/app mockup preview image to the right (or below on mobile) with a soft shadow and gentle float animation (animate-bounce but much slower, ~6s).

### 3. Trusted By / Integration Logos

- Heading: "Works With Your Favorite Platforms"
- Row of platform logos (Google, Facebook, Yelp, Tripadvisor, etc.) in a horizontal scroll or grid.
- Logos should be slightly desaturated/gray by default and colorize on hover with a subtle scale effect.
- Animate the row in on scroll (fade-up, staggered).

### 4. How It Works (Process Steps)

- 3 steps displayed as numbered cards in a horizontal row (stack vertically on mobile).
- Each card: large step number (gradient-colored), icon, title, description.
- Cards should animate in with staggered fade-up on scroll.
- Add a connecting line/arrow between steps (horizontal on desktop, vertical on mobile).

### 5. Comparison Table

- Section heading: "See How We Compare" or similar.
- Clean table with columns: Feature | Other Platforms | ReviewFlowAI.
- **Highlight the "ReviewFlowAI" column** with a colored background/header and a subtle glow/border to draw attention.
- Use checkmarks (✓) and crosses (✗) with green/red coloring.
- Rows should have alternating subtle background tints.
- Animate rows in on scroll (staggered fade-up).
- On mobile, make the table horizontally scrollable or convert to stacked cards.

### 6. Features Grid

- Section heading: "Everything You Need to Grow"
- 2x3 or 3x2 grid of feature cards.
- Each card: icon (use Lucide icons), title, short description.
- Cards should have the hover lift effect described in Global Design Rules.

### 7. Pricing Section

- Section heading: "Simple, Transparent Pricing"
- 3 pricing tiers: Free, Pro ($29/mo), Business ($79/mo).
- Highlight the "Pro" plan as the most popular (subtle badge, border glow, or scale-up).
- Cards: title, price (large), billing period, feature list with checkmarks, CTA button.
- Animate cards in on scroll (staggered).
- Use soft gradient backgrounds for the cards (subtle, not loud).

### 8. FAQ Section

- Section heading: "Frequently Asked Questions"
- Accordion-style FAQ items (expandable/collapsible).
- Clean styling: minimal borders, subtle hover states, smooth expand/collapse animations.
- Use the standard shadcn Accordion component if available.

### 9. Final CTA Section

- Section heading: "Ready to Grow Your Reviews?"
- Subheading: Short persuasive line.
- One large, bold CTA button with a gradient background and subtle glow/pulse effect.
- Background: Consider a dark navy or gradient section to make it stand out from the rest of the page.

### 10. Footer

- Simple footer with links: Product, Pricing, Contact, Privacy, Terms.
- Social icons (optional).
- Copyright line at the bottom.
- Minimal, clean design matching the overall aesthetic.

## Animation Guidelines

- **Scroll-triggered animations:** Use Framer Motion's `whileInView` to trigger animations as sections enter the viewport.
- **Easing:** Use `ease-out` or `[0.25, 0.1, 0.25, 1]` for smooth, premium feel.
- **Stagger children:** When animating groups (cards, steps, features), stagger children by 0.1s–0.15s.
- **Performance:** Use `will-change-transform` on animated elements to optimize performance.
- **Reduced motion:** Respect `prefers-reduced-motion` media query and disable animations for users who prefer reduced motion.

## Technical Context & Constraints (CRITICAL)

- We are using `react-router-dom`. You MUST use `<Link to="...">` instead of standard `<a>` tags for internal links (e.g., `/login`, `/signup`).
- Do NOT rewrite or remove the existing `<PublicNav />` and `<PublicFooter />` component imports. Only build the body sections between them.
- We already use Shadcn UI. Use `import { Button } from "@/components/ui/button"` instead of raw HTML buttons where possible.
- If using `framer-motion`, ensure you import it correctly. If it's not available, fallback to `tailwindcss-animate` utility classes.

## Deliverables

- A single file (or updated existing file) containing the full landing page component.
- Ensure all images are referenced with valid URLs or placeholders.
- Ensure the design is responsive (mobile, tablet, desktop).
- All animations should be smooth and professional.
