---
name: Kinetic Syntax
colors:
  surface: '#13131a'
  surface-dim: '#13131a'
  surface-bright: '#393841'
  surface-container-lowest: '#0e0e15'
  surface-container-low: '#1b1b22'
  surface-container: '#1f1f26'
  surface-container-high: '#2a2931'
  surface-container-highest: '#34343c'
  on-surface: '#e4e1ec'
  on-surface-variant: '#cbc3d7'
  inverse-surface: '#e4e1ec'
  inverse-on-surface: '#303038'
  outline: '#958ea0'
  outline-variant: '#494454'
  surface-tint: '#d0bcff'
  primary: '#d0bcff'
  on-primary: '#3c0091'
  primary-container: '#a078ff'
  on-primary-container: '#340080'
  inverse-primary: '#6d3bd7'
  secondary: '#bec2ff'
  on-secondary: '#000da4'
  secondary-container: '#2532c4'
  on-secondary-container: '#acb3ff'
  tertiary: '#cbc1e5'
  on-tertiary: '#322c49'
  tertiary-container: '#948cae'
  on-tertiary-container: '#2c2641'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#e9ddff'
  primary-fixed-dim: '#d0bcff'
  on-primary-fixed: '#23005c'
  on-primary-fixed-variant: '#5516be'
  secondary-fixed: '#e0e0ff'
  secondary-fixed-dim: '#bec2ff'
  on-secondary-fixed: '#000569'
  on-secondary-fixed-variant: '#222fc2'
  tertiary-fixed: '#e7deff'
  tertiary-fixed-dim: '#cbc1e5'
  on-tertiary-fixed: '#1d1732'
  on-tertiary-fixed-variant: '#494360'
  background: '#13131a'
  on-background: '#e4e1ec'
  surface-variant: '#34343c'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 26px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 18px
  code-lg:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 22px
  code-md:
    fontFamily: JetBrains Mono
    fontSize: 13px
    fontWeight: '400'
    lineHeight: 20px
  code-sm:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-badge:
    fontFamily: JetBrains Mono
    fontSize: 11px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.5rem
  margin: 1.5rem
  margin-sm: 1rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system establishes a high-precision, playful-yet-technical workspace for an AI code review partner. It balances rigorous developer-tool utility with expressive, modular energy. The interface rejects generic enterprise minimalism in favor of a structural bento-box philosophy, where every diagnostic metric, code diff, and AI suggestion feels like an intentional, snap-fit physical module.

### Aesthetic Pillars
- **Engineered Whimsy:** Mathematical density grounded in JetBrains Mono and strict 8px alignments, contrasted with playful four-point micro-sparkles and pill badges.
- **Tectonic Modularity:** A relentless visual grid composed of self-contained, high-density tiles defined by crisp wireframe boundaries.
- **Deep Void Contrast:** A true-black infinite canvas punctuated by deep cosmic violet panels and radiant electric accents, completely devoid of blurred glassmorphism or diffused atmospheric glow.

## Colors

The palette relies on structural darkness, precise boundary lines, and surgical application of violet and periwinkle signals. 

### Canvas & Architecture
- **Root Canvas:** `#000000` (Pitch Black) — Used as the structural negative space and the underlying gap color for the grid.
- **Panel Surface:** `#0B0B12` (Void Layer) — Primary background for bento tiles, inspection drawers, and diff viewers.
- **Sub-surface / Inset:** `#141420` — Used for nested panels, terminal shells, code snippet blocks, and input surfaces.
- **Structural Outlines:** `rgba(255, 255, 255, 0.2)` — Crisp 1px division between surfaces. Hover states step up to `rgba(255, 255, 255, 0.35)`.

### Accents & Signifiers
- **Primary Accent (Electric Violet):** `#8B5CF6` — AI suggestions, active toggles, focus outlines, and primary action fills.
- **Secondary Accent (Periwinkle Blue):** `#5865F2` — Integration indicators, secondary branches, and structural metadata.
- **Soft Light Accent (Pale Lavender):** `#E4DAFF` — Callout sticker badges, high-contrast prompt chips, and critical insight tags. Paired strictly with dark ink `#0B0B12` for typography.
- **Gradient Element (Orb Focus):** Linear or Radial blend from `#3B6BFF` to `#8B3DFF`. Reserved strictly for the single AI coach status indicator/orb; never to be used as widespread background wallpaper.

### Semantic Triage
- **Low Risk / Approved:** `#34D399` (Emerald Mint)
- **Medium Risk / Warning:** `#FBBF24` (Amber Gold)
- **High / Critical Risk:** `#F87171` (Coral Crimson)

### Typography & Ink
- **Text Primary:** `#FFFFFF` — Code, major headers, actionable titles.
- **Text Secondary:** `#A9A7BD` — Descriptions, secondary labels, structural comments.
- **Text Muted:** `#636275` — Line numbers, gutter dividers, disabled states.

## Typography

Typography establishes an intentional dualism: **Inter** handles narrative clarity, contextual critique, and structural navigation, while **JetBrains Mono** powers syntax rendering, diagnostic tokens, and inline metadata.

### Guidelines
- **Zero Ambiguity:** Use `JetBrains Mono` for any data-driven value (git hashes, line references, file sizes, performance counters).
- **Proportional Tracking:** Apply slight negative letter spacing (`-0.02em`) to large Inter headers to tighten visual density against dark backgrounds.
- **Label Discipline:** Badge and tag text must use `label-badge` with uppercase transformation and explicit optical centering.

## Layout & Spacing

The layout is built around a structured Bento-Grid system that balances density with modular division.

### Spatial Rhythm
- **Base Grid:** Strictly calculated on an 8px grid (0.5rem = 8px, 1rem = 16px, 1.5rem = 24px, 2rem = 32px).
- **The Bento Architecture:** Screens are organized as matrices of self-contained modules. Gaps between grid cells reveal the canvas underneath, mirroring a physical sheet of developer stickers.
- **Grid Layout Rules:**
  - **Desktop (1200px+):** 12-column modular bento with `1rem` (16px) gutters. Complex tiles span 4, 6, 8, or 12 units.
  - **Tablet (768px - 1199px):** 6-column grid with `1rem` gutters. Reflows multi-column views into 3-column pairs or full-width blocks.
  - **Mobile (<768px):** 1-column vertical stack with `0.5rem` (8px) gutters and `1rem` page margins. Bento tiles stack linearly.

## Elevation & Depth

This system intentionally excludes heavy drop shadows, diffused lighting, and frosted glass. Visual separation is achieved strictly through sharp borders and tonal layering.

### Depth Mechanics
1. **Level 0 (Infinite Canvas):** Pure `#000000`. Acts as the negative space between grid boundaries.
2. **Level 1 (Bento Tile Surface):** Solid `#0B0B12` framed by a 1px border of `rgba(255, 255, 255, 0.20)`. No box shadows.
3. **Level 2 (Internal Recess / Code Diffs):** Inset `#141420` surface with a 1px border of `rgba(255, 255, 255, 0.10)`. Gives an embedded, tool-like feel.
4. **Level 3 (Overlay Drawers & Popovers):** Solid `#0B0B12` surface with an elevated 1px border of `rgba(255, 255, 255, 0.30)` and an offset 2px solid drop shadow of `#000000` (`box-shadow: 0 0 0 1px rgba(255,255,255,0.2), 0 8px 0 0 #000000`).

### Optical Borders & Hover Reactions
- Default idle tiles feature `1px solid rgba(255, 255, 255, 0.2)`.
- Interactive hover triggers an outline shift to `1px solid rgba(255, 255, 255, 0.35)` or a branded border highlight of `1px solid #8B5CF6`.

## Shapes

The geometric balance pairs curved module corners with pill-shaped control elements.

### Radius Rules
- **Modules & Tiles:** Fixed `12px` to `16px` border-radius (`rounded-lg` to `rounded-xl`).
- **Inner Controls (Inputs, Diff Blocks):** `8px` (`rounded`).
- **Badges, Status Tags, & Avatars:** Fully rounded `9999px` (Pill shape / `rounded-full`).
- **Square Badges:** `8px` corner radius when holding operational tools or language identifiers.

## Components

### Buttons
- **Primary:** Solid `#8B5CF6` background, `#FFFFFF` text (`Inter`, 14px, semi-bold), 8px corner radius, zero shadow. Hover: `#7C3AED`. Active: scale `0.98`.
- **Secondary:** Surface `#0B0B12`, 1px border `rgba(255, 255, 255, 0.2)`, `#FFFFFF` text. Hover: border `rgba(255, 255, 255, 0.4)`, background `#141420`.
- **Soft Sticker Button:** Solid `#E4DAFF` surface, `#0B0B12` text, 9999px radius. Hover: `#D8CAFF`.

### Badges & Chips
- **Status Pills:** Height 24px, 9999px radius, padding 2px 10px. 
  - *Low Risk:* Background `rgba(52, 211, 153, 0.1)`, border `1px solid #34D399`, text `#34D399`.
  - *Medium Risk:* Background `rgba(251, 191, 36, 0.1)`, border `1px solid #FBBF24`, text `#FBBF24`.
  - *High Risk:* Background `rgba(248, 113, 113, 0.1)`, border `1px solid #F87171`, text `#F87171`.
- **Sparkle Badges:** Micro-decorations utilizing a crisp four-point geometric sparkle icon (`✦`) placed alongside metric values or AI review prompts.

### Bento Cards
- Panels render on `#0B0B12` with a uniform 1px `rgba(255, 255, 255, 0.2)` border.
- Inner padding strictly adheres to `1.5rem` (24px) for major modules and `1rem` (16px) for compact tiles.
- Headers within cards contain an icon badge (circle or square) adjacent to an Inter semi-bold title, right-aligned with JetBrains Mono metadata.

### Inputs & Editors
- **Text Inputs:** Surface `#141420`, 1px border `rgba(255, 255, 255, 0.2)`, 8px radius, padding 8px 12px. Focus: 1px border `#8B5CF6`, zero glow.
- **Code Diff Blocks:** Surface `#050508`, JetBrains Mono 13px. Lines added use green tinting (`rgba(52, 211, 153, 0.12)`), lines removed use red tinting (`rgba(248, 113, 113, 0.12)`).

### AI Coach Orb Element
- A solitary visual centerpiece formatted as an organic gradient sphere (`linear-gradient(135deg, #3B6BFF 0%, #8B3DFF 100%)`). 
- Embedded cleanly into an inspection header or floating review bar, flanked by high-contrast pill status labels.