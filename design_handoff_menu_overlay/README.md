# Handoff — afpisso.com Menu Overlay

## Overview
This package documents a brutalist / cyberpunk-mono navigation overlay for **afpisso.com** (Andrés Pisso's portfolio site). It covers a single feature: the full-screen menu that appears when the user clicks "MENU +" in the site header. The menu is bilingual (EN/ES), has a current-section indicator, and ships with a staged 3-act opening animation (background blur → red sheet wipe → reveal).

## About the Design Files
The files in this bundle are **design references created in HTML/JSX**. They are prototypes showing the intended look, feel, and motion — not production code to copy verbatim. The task is to **recreate these designs inside afpisso.com's existing codebase** using its established stack, conventions, and component patterns. If the site has no established stack yet, choose the most appropriate one for a portfolio (Next.js + Tailwind, Astro, or vanilla + a small motion lib like Motion One / GSAP) and implement there.

The JSX in this bundle uses inline styles and a `<DesignCanvas>` host wrapper. Both are conveniences for the prototype — drop them when porting and use the codebase's normal styling solution.

## Fidelity
**High-fidelity.** Colors, typography, spacing, clip-path geometry, and animation timings are final and should be matched precisely. Copy and microcopy are also final (both EN and ES).

---

## Files in this bundle

| File | Purpose |
|---|---|
| `README.md` | This document — feature spec, layout, behavior. |
| `DESIGN_SYSTEM.md` | Reusable design tokens, typography, motion, and component primitives extracted from the menu. Read this first when porting. |
| `index.html` | Entry HTML — loads React + Babel + fonts. |
| `menu.jsx` | The `Menu` and `MenuOverlay` components, all helpers (scramble, typewriter, glitch text, page tag, crosshair, audio bars, corner brackets). |
| `app.jsx` | Demo harness — design canvas with two artboards (isolated, on-site), live Tweaks panel. Reference for prop wiring; not for production. |
| `design-canvas.jsx`, `tweaks-panel.jsx` | Prototype scaffolding only. **Do not port.** |

---

## Feature: Menu Overlay

### What it is
A left-anchored full-height panel (~64% viewport width) that overlays the site, exposes 4 top-level routes, social links, contact, language toggle, and shows which section the user is currently on. It opens via a staged sheet-wipe animation and closes with the reverse.

### Routes exposed
| Page | EN label | ES label | Sub-label (EN) | Sub-label (ES) |
|---|---|---|---|---|
| `001` | WORK | TRABAJO | Selected projects, 2019—2026 | Proyectos selectos, 2019—2026 |
| `002` | ABOUT | SOBRE MÍ | Biography & process | Biografía y proceso |
| `003` | JOURNAL | DIARIO | Notes, essays & experiments | Notas, ensayos y experimentos |
| `004` | CONTACT | CONTACTO | Inquiries & availability | Consultas y disponibilidad |

### Layout (1440 × 900 reference; scales fluidly)

```
┌─────────────────────────────────────────────────────────────┐   chamfer top-right
│ ▮ NODE-CODE · NODE.HHMM    AFPISSO / NOW · WORK · IDX HHMM    [×] │
├──────────┬──────────────────────────────────────────────┬─────┤
│          │  ┌──┐                                         │     │
│ ▪ INDEX  │  │WORK│ PAGE                                  │  │  │  vertical rail
│          │  └──┘  001                                    │ [+] │  (version, crosshair,
│          │                                               │  │  │   diamond)
│          │  WORK         PAGE 001 · ACTIVE               │     │
│          │  ABOUT        PAGE 002                        │     │
│          │  JOURNAL      PAGE 003                        │     │
│   04     │  CONTACT      PAGE 004                        │     │
│ SECTIONS │                                               │     │
├──────────┼──────────────────────────────────────────────┴─────┤
│ ▪ CONNECT│  LINKEDIN ↗ in/byandresfe   INSTAGRAM ↗ @byandresfe  │
│          │  X ↗ @byandresfe                                     │
├──────────┼──────────────────────────────────────────────────────┤
│ ▪ CONTACT│  HOLA@AFPISSO.COM  ↗ WRITE                            │
├──────────┼─────────┬──────────────────┬───────────────────────────┤   notch
│ EN / ES  │ © 2026  │ AFPISSO · BOGOTÁ │           ▮▮▮ LIVE       │   bottom-right
└──────────┴─────────┴──────────────────┴───────────────────────────┘
```

The panel's outer shape uses `clip-path` to cut a diagonal chamfer at top-right and a stepped notch at bottom-right (specifics in DESIGN_SYSTEM.md → "Containers"). Corner brackets sit inset 8px from each corner; the top-left bracket is rendered in the accent color, the other three in foreground.

### Components inside the panel

#### Top header
- 20px top/bottom padding, 28px sides.
- Left: small accent square (8×8px) + session code (`6 random A–Z chars` + `· NODE.HHMM` where HHMM is the live clock with `:` stripped).
- Center: `AFPISSO / NOW · <ACTIVE LABEL> · IDX HH:MM` — the active section name is in accent color.
- Right: a 36×36px close button with chamfered corners (8px) and `×` icon, 1.5px solid border in fg.

#### Left rail (140px)
- Top: small accent square + `INDEX` (or `ÍNDICE` in ES), 11px, letter-spacing 0.14em.
- Bottom: `04` / `SECTIONS` at 10px opacity 0.55.

#### Center column
- `PageTag` block — the highlighted block with the active section's label. Bebas Neue 64px, color: `#0a0a0a` on accent background; chamfered (12px) corners. Re-scrambles when the active section changes.
- Next to it: `PAGE\n00X` in accent, 11px monospace.
- `MenuItem` rows (×4) — see component spec below.

#### Right rail (80px wide)
- Top: vertical-rotated text `v.2.6 / BUILD XXXX` (where XXXX is first 4 chars of session id), 10px opacity 0.55.
- Center: `Crosshair` SVG (26×26), opacity 0.85.
- Bottom: `◆` glyph at opacity 0.5.

#### CONNECT row
- Grid: `140px | 1fr`.
- Left cell: `▪ CONNECT` (or `CONECTA`).
- Right cell: 3 links in a flex row (gap 32px). Each: `LABEL ↗ HANDLE`. Hover → text becomes accent color.

#### CONTACT row
- Same grid pattern as CONNECT. Single anchor: `HOLA@AFPISSO.COM ↗ WRITE` (or `ESCRÍBEME`).

#### Footer (4-column grid: `140px | 1fr | 1fr | 1fr`)
- Cell 1: language toggle (`EN / ES`) — active language in accent color.
- Cell 2: copyright `© 2026 AFPISSO. ALL RIGHTS RESERVED.` / `TODOS LOS DERECHOS RESERVADOS.`
- Cell 3: tagline `AFPISSO · BOGOTÁ → WORLD` / `AFPISSO · BOGOTÁ → MUNDO`, centered, opacity 0.7.
- Cell 4: 4 animated audio bars + `LIVE` / `EN DIRECTO`, right-aligned.

---

## MenuItem (one row)

| State | Visual |
|---|---|
| Default | Word in Bebas Neue, color `#f5f5f3`, letter-spacing 0.005em, line-height 0.88. `PAGE 00X` to the right at opacity 0.35. |
| Default + active | Same word, but left-edge marker visible (8×8 accent square + 18×2 accent line, positioned `left: -36px`); `PAGE 00X · ACTIVE` on the right in accent color, with a small accent dot prefix. |
| Hover | Sliding accent block fills behind the word (`transform: scaleX(0→1)`, transform-origin left, 320ms `cubic-bezier(.7,0,.2,1)`); word color flips to `#0a0a0a`. Right cell shows typewritered `PAGE 00X` in accent + sub-label typing below. |
| Hover + active | Combined — the active marker stays visible behind the highlight (it sits 36px to the left, outside the highlight area). |
| Entry (one-time, after the sheet exits) | Scramble text resolves left-to-right over 700ms / animSpeed. A 320ms RGB-split chromatic flicker. Delay per item = `idx * (90 / animSpeed) + 250ms` from when the menu becomes visible. |

### MenuItem geometry
- Row: `display: flex; align-items: center; gap: 18px; padding: 2px 0; cursor: pointer`.
- Text wrapper: `inline-block; padding: 0.04em 0.18em 0.08em; line-height: 0.88`. **Critical** — the highlight sizes to this wrapper, so the wrapper's padding determines the highlight's bleed around the text.
- Highlight: `position: absolute; inset: 0.06em -0.04em 0.06em 0; transform-origin: left center`. `clip-path` chamfer 16px.
- Right cell: `min-width: 160px`, mono 11px, gap 4px column, text-align right.

### Three hover-style variants (Tweak-exposed)
- `block` — default, the sliding chamfered highlight described above.
- `underline` — 4px accent bar animates `scaleX(0→1)` along the bottom of the text.
- `shift` — the row translates 18px right on hover; no highlight; no underline.

---

## Animation: Opening sequence (`MenuOverlay`)

Timing constants are all `× (1 / animSpeed)`. At `animSpeed = 1×` (default):

| Stage | Time (ms) | What happens |
|---|---|---|
| 0 | — | Closed. Only the site is visible. |
| 1 | 0 → 120 | Background blur ramps to `blur(10px) brightness(0.5) saturate(0.7)` + 1.04× scale; dim layer `rgba(0,0,0,0.45)` fades in. |
| 2 | 120 → 440 | Red sheet **wipes in from the right** via `clip-path: inset(0 0 0 100%) → inset(0 0 0 0)`, 320ms ease `cubic-bezier(.76,0,.2,1)`. |
| 3 | 440 → 620 | Sheet fully covers. Centered `// LOADING_INDEX //` chip fades in (chamfered border, accent fg = black on red, pulsing 8×8 dot). The Menu becomes opacity-1 underneath. |
| 4 | 620 → 980 | Red sheet **wipes out to the left** via `clip-path: inset(0 0 0 0) → inset(0 100% 0 0)`, 340ms. Menu's internal entry animations (item scramble + page tag scramble + corner-bracket-glitch) fire from stage 3 onward. |
| 5 | 980+ | Settled. Background remains blurred + dimmed while open. |

### Closing sequence
Triggered when the close button is clicked or `open` flips false.

| Stage | Time (ms) | What happens |
|---|---|---|
| 6 | 0 → 320 | Sheet sweeps back in from the **left**: `clip-path: inset(0 100% 0 0) → inset(0 0 0 0)`. Menu hides under it. |
| 7 | 320 → 600 | Sheet wipes to the right and disappears: `inset(0 0 0 0) → inset(0 0 0 100%)`. Blur and dim fade out. |
| 0 | 600+ | Closed. |

### Sheet decorations (visible only during stages 2–4 and 6–7)
- Faint repeated wordmark `AFPISSO·AFPISSO·AFPISSO` at 240px Bebas Neue, color `#0a0a0a`, opacity 0.1, three lines stacked.
- Top-left chip: `▢ AFPISSO · OS / <hash>` mono 11px.
- Bottom-right chip: `SWEEP · 0.98s · <scope>` mono 11px.
- Center chip: `// LOADING_INDEX //` (EN) or `// CARGANDO_ÍNDICE //` (ES), 14px mono, 0.28em tracking, with a chamfered 1.5px black border and a pulsing 8×8 black square. Only visible at stage 3.

---

## Interactions

- Hover any `MenuItem` → fires highlight + scramble + typewriter (sub-label + PAGE 00X).
- Click any `MenuItem` → sets it as the active section. In production this should fire route navigation (e.g. `router.push('/work')`).
- Click `×` → triggers the close sequence; emits `onClose`. Production should close the overlay AND return focus to the menu trigger.
- Click EN / ES → switches language.
- Click `MENU +` button (visible when overlay closed) → opens.
- Keyboard: `Esc` should close (not implemented in the prototype — add when porting).
- Focus management: when opened, focus should move to the first menu item; when closed, focus returns to the `MENU +` trigger.

---

## State Management

The component is presentational and accepts:
- `open: boolean`
- `lang: 'en' | 'es'` + `setLang`
- `accent: string` (hex)
- `inverted: boolean` (light/dark inversion)
- `activeSection: 'WORK' | 'ABOUT' | 'JOURNAL' | 'CONTACT'` — comes from the router in production.
- `entryAnim`, `hoverStyle`, `animSpeed`, `typeScale` — exposed in the prototype's Tweaks panel for design experimentation; in production these should be locked to the values listed in DESIGN_SYSTEM.md (`entryAnim: 'glitch'`, `hoverStyle: 'block'`, `animSpeed: 1`, `typeScale: 124`).

Internal state inside `Menu`:
- `entered: boolean` — flipped true 30ms after `open` becomes true; gates the entry animations.
- `activeIdx: number` — derived from `activeSection`; clicking a `MenuItem` overrides it locally (in production, replace with router-driven state).

`MenuOverlay` has its own `stage: 0..7` state machine described above.

---

## Responsive notes

- The prototype is designed at 1440 × 900 and scales linearly. On smaller viewports, the panel should grow to 100% width below ~900px. The right rail collapses (hide vertical text + diamond); keep the close button.
- Mobile (<640px): full-bleed drawer, single column. Stack the left-rail labels on top of their content sections instead of beside them. Reduce the Bebas Neue title scale to ~72–88px so 7-char words like `JOURNAL` still fit one line.
- The opening sheet sweep works as-is at any size.

---

## Accessibility checklist (not in prototype — add when porting)

- `<dialog>` semantics or `role="dialog" aria-modal="true"` on the panel.
- Trap focus inside the panel while open.
- `Esc` closes.
- Background scroll lock while open.
- Reduced-motion: respect `prefers-reduced-motion`. Skip the sheet sweep + scramble entirely and fade the menu in over 150ms. Keep the page tag and active markers visible but not animated.
- All anchors keyboard-accessible.
- Color contrast: foreground `#f5f5f3` on `#0a0a0a` = 19.6:1 (AAA). Accent `#ff2540` on black = 5.3:1 (AA for body text). Black on accent (used inside the highlight + page tag) = 5.3:1 (AA).

---

## Assets

- Fonts: **Bebas Neue** + **JetBrains Mono** (weights 400/500), both via Google Fonts.
- No images. All decoration is CSS / inline SVG (crosshair, X icon, audio bars, corner brackets, clip-path geometry).
- No third-party icon set required.

---

## Out of scope for this handoff

- Routing — the menu doesn't navigate yet, just visually marks active.
- Page templates for WORK / ABOUT / JOURNAL / CONTACT — design those separately.
- Marketing / homepage / hero — the `AfpissoMock` background in `app.jsx` is throwaway scaffolding to show how the menu sits over the site, not a hero design.
