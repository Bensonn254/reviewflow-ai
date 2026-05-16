---
name: ReviewFlow Light & Violet
colors:
  surface: '#f3fbfe'
  surface-dim: '#d3dbde'
  surface-bright: '#f3fbfe'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#edf5f8'
  surface-container: '#e7eff2'
  surface-container-high: '#e1e9ec'
  surface-container-highest: '#dce4e7'
  on-surface: '#151d1f'
  on-surface-variant: '#4c4355'
  inverse-surface: '#2a3234'
  inverse-on-surface: '#eaf2f5'
  outline: '#7e7386'
  outline-variant: '#cfc2d7'
  surface-tint: '#8322df'
  primary: '#5d00a7'
  on-primary: '#ffffff'
  primary-container: '#7b11d7'
  on-primary-container: '#e0c1ff'
  inverse-primary: '#dbb8ff'
  secondary: '#7241c3'
  on-secondary: '#ffffff'
  secondary-container: '#a979fe'
  on-secondary-container: '#3b0081'
  tertiary: '#32424d'
  on-tertiary: '#ffffff'
  tertiary-container: '#495965'
  on-tertiary-container: '#bfcfdd'
  error: '#B91C1C'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#efdbff'
  primary-fixed-dim: '#dbb8ff'
  on-primary-fixed: '#2b0052'
  on-primary-fixed-variant: '#6600b7'
  secondary-fixed: '#ebdcff'
  secondary-fixed-dim: '#d4bbff'
  on-secondary-fixed: '#260058'
  on-secondary-fixed-variant: '#5923aa'
  tertiary-fixed: '#d4e5f3'
  tertiary-fixed-dim: '#b8c9d7'
  on-tertiary-fixed: '#0d1d28'
  on-tertiary-fixed-variant: '#394954'
  background: '#f3fbfe'
  on-background: '#151d1f'
  surface-variant: '#dce4e7'
  alabaster: '#E0E8EB'
  violet: '#7B11D7'
  indigo: '#49049A'
  slate: '#7C8C99'
  ink: '#171425'
  surface-elevated: '#FFFFFF'
  surface-nested: '#F4F6F8'
  surface-interactive: '#EAECEF'
  success: '#15803D'
  warning: '#B45309'
typography:
  display-1:
    fontFamily: Cabinet Grotesk
    fontSize: 80px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.03em
  display-2:
    fontFamily: Cabinet Grotesk
    fontSize: 54px
    fontWeight: '900'
    lineHeight: '1.1'
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Cabinet Grotesk
    fontSize: 38px
    fontWeight: '900'
    lineHeight: '1.2'
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Cabinet Grotesk
    fontSize: 26px
    fontWeight: '900'
    lineHeight: '1.3'
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Cabinet Grotesk
    fontSize: 19px
    fontWeight: '800'
    lineHeight: '1.4'
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Satoshi
    fontSize: 17px
    fontWeight: '400'
    lineHeight: '1.6'
    letterSpacing: normal
  body-md:
    fontFamily: Satoshi
    fontSize: 14px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: normal
  label-sm:
    fontFamily: Satoshi
    fontSize: 10px
    fontWeight: '700'
    lineHeight: '1'
    letterSpacing: 0.14em
  mono:
    fontFamily: jetbrainsMono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.5'
    letterSpacing: 0.04em
  headline-lg-mobile:
    fontFamily: Cabinet Grotesk
    fontSize: 32px
    fontWeight: '900'
    lineHeight: '1.2'
    letterSpacing: -0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  xxl: 48px
  section: 72px
  hero: 112px
  gutter: 52px
  max-width: 1100px
---

## Brand & Style

The design system embodies a sophisticated, high-end technical aesthetic characterized as **Corporate Modern with a Minimalist touch**. It targets professional environments that require both reliability and a cutting-edge AI feel. The personality is precise and refined, utilizing an "Elevation over Line" philosophy where depth is created through subtle tonal shifts and shadows rather than heavy borders.

The visual narrative is defined by:
- **Gallery Canvas:** The use of a tinted Alabaster background creates a premium, calm environment that makes white components appear to float.
- **Vibrant Precision:** Royal Violet accents provide energetic focal points, signaling intelligence and action.
- **Tactile Digitality:** Subtle glass-like inner shadows on interactive elements provide a physical, high-quality touch to a digital-first interface.

## Colors

The color system is built on a high-contrast relationship between the **Alabaster** canvas and **Royal Violet** brand accents.

- **Primary Canvas:** Use `#E0E8EB` (Alabaster) for the main application background. 
- **Surface Tiering:** Use `#FFFFFF` (Surface 1) for primary cards and containers. Use `#F4F6F8` (Surface 2) for hover states or nested elements within white cards.
- **Typography:** Headings and primary labels utilize **Ink** (`#171425`). Body copy and secondary navigation should use **Slate** (`#7C8C99`).
- **Accent Gradients:** The "Royal Gradient" (`#49049A` to `#7B11D7`) is reserved for primary CTAs and exactly one "accent word" per major heading to maintain visual focus.
- **Semantic States:** Use the defined success, warning, and error colors with an 8% opacity background of the same hue for badges and status indicators.

## Typography

This design system uses a high-contrast typography pairing: **Cabinet Grotesk** for impactful displays and **Satoshi** for clean, functional reading.

- **Display Hierarchy:** Display 1 and 2 are strictly for hero sections. Headlines use heavy weights (800-900) to anchor the page.
- **Reading Experience:** Body text is optimized at 14px for general UI and 17px for lead paragraphs.
- **Labels:** Labels and eyebrows must always be uppercase with the specified 0.14em letter spacing to ensure distinct hierarchy.
- **Technical Data:** Use the Monospace style for metrics, code snippets, or technical ID tokens.
- **Scaling:** On mobile devices, Display 1 and 2 should scale down to the Headline Large Mobile size (32px) to maintain readability and avoid excessive wrapping.

## Layout & Spacing

The layout utilizes a **Fixed Grid** philosophy with a centered maximum width of 1100px.

- **Grid & Gutters:** A generous 52px outer gutter ensures content never feels cramped against the viewport edges.
- **Spacing Rhythm:**
    - Use `lg` (24px) for standard card padding and grid gaps.
    - Use `sm` (8px) for internal button padding and small element grouping.
    - Section-to-section spacing should never be less than `section` (72px).
- **Responsive Behavior:** On mobile, reduce the 52px gutter to 20px. Grid columns should collapse to a single column flow, while maintaining the `md` (16px) or `lg` (24px) spacing for internal card padding.

## Elevation & Depth

Elevation is the primary method of defining hierarchy. Surfaces are distinguished by their "float" distance from the Alabaster background.

- **Level 1 (Standard):** Used for cards, inputs, and the navigation bar. Characterized by a soft, wide-dispersion shadow: `0 2px 12px rgba(23,20,37,0.07)`.
- **Level 2 (Raised):** Used for hovered cards or featured panels. This state increases the blur and opacity to simulate the element lifting closer to the user: `0 8px 28px rgba(23,20,37,0.11)`.
- **Level 3 (Brand):** Reserved exclusively for primary CTA buttons. Uses a tinted shadow to create a "glow" effect: `0 6px 28px rgba(123,17,215,0.22)`.
- **Flat Elements:** Dividers and progress tracks do not use shadows; they use subtle borders or background shifts to remain grounded.

## Shapes

The shape language is modern and approachable, utilizing a tiered rounding system:

- **Buttons & Inputs:** Use `rounded-sm` (10px) to balance friendly aesthetics with functional precision.
- **Cards & Containers:** Use `rounded-lg` (20px) to define the primary content areas.
- **Hero Wrappers:** Use `rounded-xl` (28px) for large, immersive background blocks.
- **Badges & Pills:** Use `rounded-full` (999px) for status indicators and high-contrast pill buttons.

## Components

### Buttons
- **Primary:** Features the Royal Gradient background. Must include an inner "glass" top-edge highlight: `inset 0 1px 0 rgba(255,255,255,0.20)`. Apply the Level 3 (Brand) shadow.
- **Secondary:** White background with a `rgba(23,20,37,0.14)` border. On hover, the border darkens to `rgba(23,20,37,0.24)` and the card lifts by 1px.
- **Ghost:** No background or border. Uses the Primary Text color. Hover state adds a `surface-nested` background.

### Cards
- Standard cards use a white background and Level 1 shadow. 
- On hover, cards transition to the Level 2 shadow and translate -2px on the Y-axis. 
- Border is optional but should be restricted to a subtle `rgba(23,20,37,0.08)` if used.

### Input Fields
- Use white background, Level 1 shadow, and `rounded-sm` corners. 
- Placeholder text uses the Slate color. 
- Active/Focus state uses a 1px Royal Violet border.

### Chips & Badges
- Status badges use the semantic colors with 8% background opacity. 
- Use `rounded-xs` (6px) or `rounded-full` depending on the context of the data.

### Lists
- Use horizontal dividers with the `rgba(23,20,37,0.08)` subtle border style. 
- List items should have a subtle 200ms ease-in-out transition on hover, changing the background to `surface-nested`.