---
name: byandresfe.com
description: Game UX/UI portfolio — systematic, precise, built like the work it documents
colors:
  signal-red: "#ff2540"
  void-canvas: "#0a0a0a"
  surface-raised: "#0f0f0f"
  surface-elevated: "#141414"
  parchment: "#f5f5f3"
  warm-white: "#f0eeea"
  muted-ash: "#8a8a8a"
  deep-ash: "#555555"
  rule: "rgba(255,255,255,0.11)"
  fg-dim: "rgba(245,245,243,0.62)"
  fg-mute: "rgba(245,245,243,0.45)"
  signal-red-dim: "rgba(255,37,64,0.12)"
typography:
  display:
    fontFamily: '"Bebas Neue", sans-serif'
    fontSize: "clamp(3rem, 8vw, 7rem)"
    fontWeight: 400
    lineHeight: 0.88
    letterSpacing: "0.005em"
  headline:
    fontFamily: '"Bebas Neue", sans-serif'
    fontSize: "clamp(1.8rem, 3vw, 2.8rem)"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "0.01em"
  title:
    fontFamily: '"Bebas Neue", sans-serif'
    fontSize: "clamp(1.3rem, 2vw, 1.7rem)"
    fontWeight: 400
    lineHeight: 1.0
    letterSpacing: "0.02em"
  body:
    fontFamily: '"JetBrains Mono", monospace'
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.75
    letterSpacing: "0.02em"
  label:
    fontFamily: '"JetBrains Mono", monospace'
    fontSize: "10px"
    fontWeight: 500
    lineHeight: 1.0
    letterSpacing: "0.14em"
rounded:
  none: "0px"
spacing:
  card-internal: "20px"
  section-x: "24px"
  section-y: "112px"
  section-y-compact: "64px"
components:
  button-solid:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.void-canvas}"
    padding: "16px 32px"
  button-solid-hover:
    backgroundColor: "#cc1f34"
    textColor: "{colors.void-canvas}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.fg-dim}"
    padding: "13px 24px"
  button-ghost-hover:
    backgroundColor: "rgba(255,255,255,0.06)"
    textColor: "{colors.parchment}"
  button-accent-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.signal-red}"
    padding: "13px 24px"
  button-accent-ghost-hover:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.void-canvas}"
  section-tag:
    backgroundColor: "{colors.signal-red}"
    textColor: "{colors.void-canvas}"
    padding: "3px 10px"
  filter-pill:
    backgroundColor: "transparent"
    textColor: "{colors.fg-mute}"
    padding: "8px 16px"
  filter-pill-active:
    backgroundColor: "{colors.signal-red-dim}"
    textColor: "{colors.signal-red}"
    padding: "8px 16px"
---

# Design System: byandresfe.com

## 1. Overview

**Creative North Star: "The Design Instrument"**

A calibrated instrument has no unnecessary controls. Every dial, gauge, and readout exists because someone needs it to make a decision. This system works the same way: surfaces that recede into near-black, type that reads cleanly under any screen, and a single red that fires only when something requires attention. Nothing is decorative by default.

The system is built for a professional audience running a quick diagnostic. A hiring manager scanning case studies in a lit office, evaluating whether this designer can solve the UX problems their studio has right now. The interface should accelerate that evaluation, not distract it. Every element earns its presence by carrying information.

The grid background (64px pitch, 2.2% opacity), the scan line, the chamfer polygon cuts — these are functional references to technical UX documentation and game-engine UI, not aesthetic costume. They signal that the person who built this thinks in systems. The grain overlay at 2.8% opacity adds physical weight without atmospheric drama. The system reads as dark, technical, and deliberate — not hacker, not cyberpunk, not neon.

**Key Characteristics:**
- Void-black surfaces with near-zero reflectance; no atmospheric glow or bloom
- Two typefaces only: Bebas Neue for display (tight uppercase, 0.88 line-height), JetBrains Mono for everything else
- Signal Red on ≤10% of any screen surface — status, active state, primary CTA only
- All corners are sharp (0px) or chamfer-cut (8px polygon clip); no circular border-radius on interactive elements
- Spacing varies by section rhythm: 112px vertical for major homepage sections, 64px for compact page sections
- Elevation is flat by default; shadows appear only as a response to interaction or float state

## 2. Colors: The Signal Palette

One accent, earned through restraint. The palette reads as near-monochrome with a precision indicator in red.

### Primary
- **Signal Red** (`#ff2540`): The active-state indicator. Status badges, CTA buttons, hover accent lines, section tags, focus rings (`outline: 2px solid`), the scanline overlay gradient. Not used for body text on dark backgrounds. Not used as a background fill unless the surface IS a CTA. Its presence means something is active or requires the user's attention.
- **Signal Red Dim** (`rgba(255,37,64,0.12)`): The hover tint for interactive containers. Row background on hover, card hover fill. Keeps the red association without the full signal intensity.

### Neutral
- **Void Canvas** (`#0a0a0a`): Primary background, `--color-bg`. Almost-black with just enough separation from pure black to show layered surfaces.
- **Surface Raised** (`#0f0f0f`): First elevation layer, `--bg-2`. Nav background when scrolled, glass card base tint.
- **Surface Elevated** (`#141414`): Second elevation layer, `--bg-3`. Deep glass container fills.
- **Parchment** (`#f5f5f3`): Primary foreground, `--color-fg`. Very slightly warm; not pure white.
- **Warm White** (`#f0eeea`): Warmer near-white for general text elements (`--white`). The warmth of dried paper, not the cold of a monitor.
- **Muted Ash** (`#8a8a8a`): Mid-gray for secondary chrome and de-emphasized metadata.
- **Rule Line** (`rgba(255,255,255,0.11)`): All horizontal and vertical dividers, `--color-rule`. At 11% white it reads on dark surfaces without competing with content.
- **Dim Text** (`rgba(245,245,243,0.62)`): Body copy, descriptions, secondary content, `--color-fg-dim`.
- **Muted Text** (`rgba(245,245,243,0.45)`): Labels, metadata, tertiary UI chrome, `--color-fg-mute`.

### Named Rules

**The Rarity Rule.** Signal Red appears on ≤10% of any given screen. The moment it stops being rare, it stops being a signal. If a new element wants red, an existing one loses it first. Hover states may use it; resting states use it only on primary CTAs and status-carrying elements.

**The Warm Tint Rule.** No neutral is fully achromatic. Every near-black is slightly warm (`#0a0a0a`, `#080808`), every near-white is parchment-tinted (`#f5f5f3`, `#f0eeea`). Pure `#000000` and `#ffffff` are forbidden.

**The Transparency Rule.** Semi-transparent tokens (`--color-rule`, `--color-fg-dim`, `--color-fg-mute`) are contextual by design. They blend with the surface underneath, which means they adapt automatically to layered surfaces. Never convert them to opaque equivalents.

## 3. Typography

**Display Font:** Bebas Neue (sans-serif fallback)
**Body / Label / Code Font:** JetBrains Mono (monospace fallback)

**Character:** An unlikely pairing with complete internal logic. Bebas Neue is brute-force uppercase condensed type — the typeface of film titles and game credits, massive and authoritative at display sizes, architectural at text sizes. JetBrains Mono is precise, ligature-rich, built for reading code in low-light environments. Together: built by someone who thinks in systems and ships in production. No intermediate weight serif, no humanist sans, no "creative" tertiary face.

### Hierarchy

- **Display** (400 weight, `clamp(3rem, 8vw, 7rem)`, line-height 0.88): Section heroes and page H1s only. Always uppercase, always Bebas Neue. Tight 0.88 line-height creates deliberate text massing at large sizes. Never used for body content.
- **Headline** (400, `clamp(1.8rem, 3vw, 2.8rem)`, line-height 1.0): Card titles in featured grids, section subheadings, case study titles on the work page.
- **Title** (400, `clamp(1.3rem, 2vw, 1.7rem)`, line-height 1.0): Card titles in dense grids, secondary headings. The Bebas size that reads as prominent without dominating.
- **Body** (400, 13px, line-height 1.75, letter-spacing 0.02em): All prose — case study descriptions, field note summaries, about bio, contact copy. Max container width 520px (~65ch at 13px). Mono body reads as documentation: authoritative, not marketing.
- **Label** (500–700, 10px, letter-spacing 0.14–0.18em, uppercase, `--color-fg-dim`): All system metadata — IDs, tags, status indicators, section page numbers, read-time, metadata rows. The `.sys-label` utility class. Floor is 10px; nothing drops below this.

### Named Rules

**The Two-Font Rule.** Bebas Neue and JetBrains Mono only. No fallback to system-ui, no decorative third face, no weight variations outside 400/500/700. New screens inherit this pair.

**The Uppercase-Display Rule.** Bebas Neue is always `text-transform: uppercase`. Mixed case breaks its character and reads as a rendering error. If a display element needs mixed case, it changes typographic level — it does not override the case rule.

**The 10px Floor Rule.** No text element drops below 10px. Labels at 9px are illegible on high-DPI monitors under dim ambient light, which is the target viewing context. Enforce with `.sys-label` and `.micro-label` utilities.

## 4. Elevation

This system is flat by default. Surfaces are dark planes at zero elevation; they do not cast ambient shadows at rest. Depth is read through tonal differentiation — three explicit surface levels (`#0a0a0a`, `#0f0f0f`, `#141414`) — not through shadow stacking.

Shadows are structurally earned: they appear only when an element responds to user interaction (hover, focus) or genuinely floats above the canvas (cursor preview thumbnail, glass containers). A resting card has no shadow. A hovered card earns one.

The `.glass` utility (`backdrop-filter: blur(20px)` + inner highlight `inset 0 1px 0 rgba(255,255,255,0.07)` + ambient `0 8px 32px rgba(0,0,0,0.4)`) is reserved for containers that overlap layered content: the About quote card, the Contact right panel. Glass is not a visual style applied broadly. Applying it to arbitrary containers is prohibited.

### Shadow Vocabulary

- **State-hover card** (`0 4px 12px rgba(0,0,0,0.6), 0 2px 4px rgba(0,0,0,0.4)`): Appears on hover. Confirms interactivity.
- **Floating element** (`0 12px 32px rgba(0,0,0,0.7), 0 4px 8px rgba(0,0,0,0.5)`): Elements that genuinely float above the canvas — nav overlay when open, glass containers.
- **Cursor preview** (`0 40px 80px rgba(0,0,0,0.65)`): The 400px thumbnail panel that follows the cursor in CaseFiles. Extra-deep shadow because it appears over a live page surface.
- **Glass ambient** (`0 8px 32px rgba(0,0,0,0.4)`): The `.glass` utility's outer shadow. Diffuse, low-contrast, contextual.

### Named Rules

**The Flat-By-Default Rule.** If an element is at rest and not floating above other content, it has no shadow. Resting shadows are design debt: they spend depth vocabulary without communicating a state change.

## 5. Components

### Buttons (CyberBtn)

Three variants, one shape. All buttons use an 8px chamfer polygon: `clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))`. Zero CSS `border-radius`. On hover: a `SweepFill` component sweeps the fill color from left to right (horizontal translate, 200ms). Arrow nudges 3px right on hover (Framer Motion animate, 180ms). `whileTap: { scale: 0.97 }` on press. Optional magnetic cursor attraction via spring physics.

- **Solid**: Signal red fill, near-black text. Hover sweep to `#cc1f34`. Sizes: sm (8/14px), md (13/24px), lg (16/32px).
- **Ghost**: Transparent, rule-border, dim text. Hover sweep to 6% white, border to 28% white.
- **Accent Ghost** (default variant): Transparent, signal-red border and text. Hover sweep fills to full signal red, text to near-black.

All buttons: 11px JetBrains Mono, `letter-spacing: 0.12em`, uppercase.

### Section Tags (SectionTag)

Chamfer-clipped chip (8px, top-right + bottom-left cuts) with signal red fill and near-black text. Followed by a mono page number at `--color-fg-mute`. Used to identify major sections at the start of each area. Label scrambles character-by-character on hover (320ms). This is the primary "red as container fill" exception — it works because the tag IS a section identifier, not decoration.

### Filter Pills (WorkPage)

Rectangular (no radius), 1px rule-line border. Inactive: muted text. Active: `rgba(255,37,64,0.05)` fill, signal-red border, signal-red text. Used exclusively for filtering the work grid. Tag chips on cards are display-only — never interactive, never styled like filter pills.

### Tag Chips (Card bodies)

Display-only. 10px JetBrains Mono bold uppercase, `1px solid --color-rule`, `--color-fg-mute` text. On card container hover: border shifts to `rgba(255,37,64,0.2)`, text to dim. No click handler, no hover state of their own.

### Cards (CaseCard)

Glass-tinted container (`rgba(8,8,8,0.42)` at rest, `rgba(18,4,7,0.62)` on hover). No CSS border-radius. Top accent line (signal red, 1px, full width) appears on hover. Corner marks (10px L-bracket SVGs, `CardCorners`) shift to red on hover. `SpotlightCard` wrapper draws a `280px radial-gradient(rgba(255,37,64,0.22))` at the cursor position via CSS custom properties — zero React re-renders.

Thumbnail overlay: clip-path sweeps in from bottom (`inset(100%→0%)`) on hover enter (260ms `[0.16,1,0.3,1]`), sweeps back out on leave (180ms `[0.4,0,1,1]`). `initial={false}` prevents flash on mount. `useReducedMotion()` falls back to opacity crossfade.

### Editorial Rows (CaseFiles, FieldNotes, WhatIDo)

The anti-card pattern. Horizontal bands, not grid cells. Structure:
- Full-width top border: shifts from rule to `rgba(255,37,64,0.45)` on hover (CSS transition 300ms)
- Left accent bar: 2px signal red, `scaleY: 0→1` from `transform-origin: top` on hover (CSS transition 320ms ease-out). **At rest this element is invisible** (`scaleY(0)`). It is a state indicator, not a resting stripe.
- Index number: `rgba(255,37,64,0.3)` → full signal red on hover
- Title (Bebas Neue): `rgba(240,238,234,0.75)` → full parchment on hover

Use editorial rows for ordered lists of work, notes, and services. Use cards only for showcase grids where visual hierarchy across items matters independently.

### Navigation (Nav)

Floating top bar. Entrance: `y: -20 → 0`, `opacity: 0 → 1`, 300ms, `cubic-bezier(0.32,0.72,0,1)`, 400ms page-load delay. On scroll past 20px: `background: rgba(10,10,10,0.88)` + `backdrop-blur(12px)` + bottom rule-line border. 10px JetBrains Mono links, uppercase, letter-spacing 0.14em. Active route: signal red. Hover: parchment (CSS transition 200ms). Status pill in signal red with pulsing dot. Never dim or hide the availability signal without updating the copy.

## 6. Do's and Don'ts

### Do:

- **Do** use Signal Red (`#ff2540`) only on elements that carry status or activation: CTAs, hover state transitions, status badges, focus rings, section identifiers. Rarity is the mechanism.
- **Do** use JetBrains Mono for all body copy, labels, metadata, and UI chrome. Bebas Neue for display headlines only. No exceptions, no third face.
- **Do** apply the 8px chamfer polygon to all interactive button-shaped elements. Circular border-radius on buttons or chips is a deviation from the system.
- **Do** use editorial row patterns (horizontal bands with rule border + animated left accent) over card grids for ordered lists of work, notes, or services.
- **Do** keep the grain overlay (`body::before`, 0.028 opacity, `position: fixed`) and scan line on every page. They are identity, not decoration. Their reduced-motion counterparts hide automatically via the `@media (prefers-reduced-motion: reduce)` block in `index.css`.
- **Do** write interface copy in the PRODUCT.md voice: senior, specific, problems over aesthetics, no hype language, no em dashes.
- **Do** vary section vertical spacing. Major homepage sections: 112px. Compact page sections: 64px. Don't apply a single padding value everywhere.

### Don't:

- **Don't** use Signal Red as ambient atmosphere (background gradient, section tint, decorative glow). It is a precision indicator, not a mood color. If it reads as "neon" or "atmospheric," remove it.
- **Don't** apply `backdrop-filter: blur()` to scrolling content containers. Glass is for fixed or genuinely floating elements only. Blur on scroll triggers continuous GPU repaints.
- **Don't** build identical card grids (icon + heading + text, same size, repeated). Use editorial rows for lists. Use the asymmetric 62%-content / 38%-particle split for homepage sections.
- **Don't** use gradient text (`background-clip: text` on a gradient fill). All text is a single solid color. Emphasis comes from size, weight, or signal red.
- **Don't** add neon glow, bloom effects, or atmospheric light halos. The aesthetic is controlled and technical. If an effect reads as cyberpunk or crypto, remove it.
- **Don't** write copy using "passionate about," "innovative solutions," "seamless experience," "game-changing," or "revolutionary." These are prohibited by PRODUCT.md and banned from all interface copy, labels, and placeholder text.
- **Don't** apply resting shadows to cards or containers. `--shadow-sm` and higher are state-only. Flat surfaces at rest.
- **Don't** introduce a second accent color. The system has one. A second accent dilutes what the first one signals. If a state needs differentiation, use opacity levels of Signal Red (`rgba(255,37,64,0.45)`, `rgba(255,37,64,0.12)`) rather than a new hue.
- **Don't** build SaaS-style metric hero blocks (big number, small label, gradient accent bar). The Hero trust strip is the only numerical showcase and uses tightly constrained mono counters — it is not a template to repeat.
- **Don't** use modals as first response to any interaction. The system has no modals. Full-screen overlays (MenuOverlay) are deliberate takeovers with explicit choreography, not general-purpose modal containers.
- **Don't** produce portfolios, agency sites, or game studio websites that read as the inspiration. Per PRODUCT.md: generic creative-agency portfolios, Dribbble shot dumps, SaaS landing templates, and game-studio player-facing sites are all anti-references. The target register is editorial-technical, not any of those.
