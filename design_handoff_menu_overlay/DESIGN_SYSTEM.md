# Design System — afpisso.com

Extracted from the menu overlay design. All tokens, motion, and primitives are reusable across the site. The menu is the first product surface; the rest of the portfolio should inherit from these tokens.

---

## 1. Color

### Core palette

| Token | Hex | Usage |
|---|---|---|
| `--color-bg` | `#0a0a0a` | Page and panel background (dark mode default). |
| `--color-fg` | `#f5f5f3` | Primary foreground (text, borders, marks). |
| `--color-accent` | `#ff2540` | Brand accent. Used sparingly: PageTag fill, hover highlight, active markers, focus rings. Never as body text color. |
| `--color-rule` | `rgba(255,255,255,0.11)` | Hairline dividers between panel sections. |
| `--color-fg-dim` | `rgba(245,245,243,0.55)` | Secondary text, metadata, ticker copy. |
| `--color-fg-mute` | `rgba(245,245,243,0.35)` | Default state of inactive `PAGE 00X` labels and disabled affordances. |

### Inverted (light) variant

| Token | Hex |
|---|---|
| `--color-bg` | `#f5f1e8` |
| `--color-fg` | `#0a0a0a` |
| `--color-rule` | `rgba(10,10,10,0.16)` |
| `--color-fg-dim` | `rgba(10,10,10,0.55)` |

`--color-accent` is unchanged in inverted mode — red holds against both.

### Glitch chromatic offsets (only used during entry animation flicker)
- Red ghost: `#ff2d55`, translate `(-3px, 1px)`, `mix-blend-mode: screen`.
- Cyan ghost: `#00e0ff`, translate `(3px, -1px)`, `mix-blend-mode: screen`.

### Don't
- Don't introduce more accent hues. If a secondary accent is ever needed, derive it from the same chroma in OKLCH and propose it as a tweak, not a permanent token.
- Don't use accent for body or link text — only for affordances (highlight, marker, fill).
- Don't soften the bg. `#0a0a0a` is intentionally near-black; flattens the dimensional clutter behind the panel chrome.

---

## 2. Typography

Two families. **No third family**. Resist that temptation.

### Display — Bebas Neue
- Source: Google Fonts.
- Weights used: 400 only.
- `letter-spacing: 0.005em` for big titles; `0` for the PageTag.
- `line-height: 0.88` for stacked titles; `0.9` for the PageTag.
- Always uppercase (Bebas Neue ships uppercase-only).

### Mono — JetBrains Mono
- Source: Google Fonts.
- Weights used: 400, 500 (500 for active emphasis only).
- Default tracking: `0.08em`.
- Wide tracking variant: `0.12em` to `0.18em` for ALL-CAPS metadata, chip text, vertical labels.
- Mono is always uppercase in chrome — see "Voice & copy".

### Scale

| Role | Family | Size | Tracking | Line-h |
|---|---|---|---|---|
| Menu title (display) | Bebas | 124px (tweakable 72–180) | 0.005em | 0.88 |
| PageTag (highlight block) | Bebas | 64px | 0.01em | 0.9 |
| Site hero (mock) | Bebas | 220px | 0.005em | 0.85 |
| Section label rail | Mono | 11px | 0.14em | 1.0 |
| Metadata / ticker | Mono | 11px | 0.12em | 1.0 |
| Body chip | Mono | 13px | 0.06em | 1.4 |
| Sub-label under menu item | Mono | 10px | 0.04em | 1.4 |
| Vertical rail label | Mono | 10px | 0.10em (rotated 180°, `writing-mode: vertical-rl`) | — |
| Loading chip | Mono | 14px | 0.28em | 1.0 |

### Voice & copy
- **Chrome is uppercase**, mono: `INDEX`, `CONNECT`, `LIVE`, `PAGE 001`. Use ALL-CAPS in code; don't rely on `text-transform`.
- **Titles are uppercase**, Bebas (Bebas Neue ships uppercase glyphs).
- **Body is mixed-case**, mono, for sub-labels and prose.
- Numbers and codes always padded to 3 digits (`001`, `012`).
- Bilingual: every UI string has an EN and ES form. The component takes `lang` prop. Don't auto-translate — copy is curated.

---

## 3. Spacing

8px base. Multiples used in the design: 4, 8, 14, 18, 24, 28, 36, 40, 64.

| Token | Value | Usage |
|---|---|---|
| `--space-1` | 4px | Tight gaps (footer audio bars, menu item internal). |
| `--space-2` | 8px | Marker gaps, dot+text. |
| `--space-3` | 14px | Footer cell vertical padding. |
| `--space-4` | 18px | Section row vertical padding, menu item-to-meta gap. |
| `--space-5` | 24px | Section row horizontal padding. |
| `--space-6` | 28px | Header horizontal padding. |
| `--space-7` | 36px | Center column padding, site mock horizontal. |
| `--space-8` | 40px | Big container gap. |
| `--space-9` | 64px | Section breathing room. |

Horizontal panel structure: outer 28–36px padding on the panel itself; inner content respects a 24px rhythm.

---

## 4. Containers — the "cyberpunk geometric" shapes

The most distinctive system element. Every container that holds chrome (panel, buttons, chips, highlight blocks, work tiles) is cut by `clip-path: polygon(...)` to create chamfered corners or stepped notches. Stick to the chamfer sizes below — don't free-style new ones.

### Chamfer recipe (one corner cut)
A square corner cut at 45° by `n` pixels:

```css
/* chamfer top-right corner by n px */
clip-path: polygon(
  0 0,
  calc(100% - n) 0,
  100% n,
  100% 100%,
  0 100%
);
```

### Chamfer sizes (use one of these — don't invent)

| Size | n | Where it's used |
|---|---|---|
| Small (chip) | 8px | Close button, `MENU +` button, loading chip, in-site `MENU +` pill. |
| Medium (block) | 12px | PageTag highlight. |
| Large (text highlight) | 16px | MenuItem hover highlight. |
| Tile | 16px | Work-tile placeholder. |

### Two-corner chamfer (top-right + bottom-left, etc.)
Used on highlights and small buttons:

```css
clip-path: polygon(
  0 0,
  calc(100% - n) 0,
  100% n,
  100% 100%,
  n 100%,
  0 calc(100% - n)
);
```

### Panel shape — chamfer top-right + stepped notch bottom-right
This is the menu panel's signature silhouette. The bottom-right gets a stepped notch (like a tab cut).

```css
clip-path: polygon(
  0 0,
  calc(100% - 60px) 0,
  100% 36px,
  100% calc(100% - 90px),
  calc(100% - 36px) calc(100% - 90px),
  calc(100% - 36px) calc(100% - 60px),
  100% calc(100% - 60px),
  100% 100%,
  0 100%
);
```

### Corner brackets
Each rendered corner of the panel gets a 18×18px L-bracket inset 8px from the edge, 2px thick. The top-left bracket is in `--color-accent`; the other three are `--color-fg`. Plain CSS via two `border-*` declarations per bracket.

```jsx
// Single bracket
<span style={{
  position: 'absolute',
  top: 8, left: 8,
  width: 18, height: 18,
  borderTop: '2px solid var(--color-accent)',
  borderLeft: '2px solid var(--color-accent)',
}} />
```

### Don't
- Don't put chamfers on inline text — they belong on container blocks.
- Don't combine more than two corner cuts on one shape (except the panel itself).
- Don't add drop shadows. The system is shadowless; depth comes from chamfers, rules, and accent contrast.

---

## 5. Motion

Three motion primitives. Every animation in the system is a combination of these.

### Easing curves

| Token | Curve | Use |
|---|---|---|
| `--ease-sweep` | `cubic-bezier(.76, 0, .2, 1)` | Sheet wipes, panel sweep. Decisive, no overshoot. |
| `--ease-snap` | `cubic-bezier(.7, 0, .2, 1)` | Highlight slide, page tag slide-in. |
| `--ease-soft` | `cubic-bezier(.2, .7, .2, 1)` | Hover shifts, scramble-text fade. |

### Duration scale
All durations are divided by `animSpeed` at runtime (1× default; user-tweakable 0.5×–2.5×).

| Token | ms | Use |
|---|---|---|
| `--dur-fast` | 180 | Hover color flips, text opacity. |
| `--dur-base` | 320 | Highlight scaleX, hover state transitions, sheet wipes. |
| `--dur-medium` | 440 | PageTag entrance. |
| `--dur-long` | 700 | Item entry scramble. |
| `--dur-overlay-cycle` | 980 | Total open sequence (stage 1 → stage 5). |

### Patterns

#### A. Scramble text (`useScramble` hook)
- Picks a target string.
- Each character resolves at a staggered time: `t_i = (i / N) * duration * 0.7 + random * duration * 0.3`.
- While unresolved, render a random char from `ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_*<>+#`.
- Driven by `requestAnimationFrame`.
- Used by: every `MenuItem` label on entry and on hover; PageTag label whenever the active section changes.

#### B. Typewriter (`useTypewriter` hook)
- Adds one character every `speed` ms (default 28) when active.
- When `active` flips false, retracts character by character.
- Show a `▮` cursor while typing in.
- Used by: `PAGE 00X` and the sub-label that appear on hover of a `MenuItem`.

#### C. Chromatic glitch flicker
- For 320ms after a row's entry delay, two duplicates of the text render at `translate(-3px,1px)` color `#ff2d55` and `translate(3px,-1px)` color `#00e0ff`, both `mix-blend-mode: screen`.
- Combined with a brief panel-level keyframe that translates the menu container by up to 6px on X/Y with hue-rotate filter for 450ms.

#### D. Sheet wipe (composite — the open/close sequence)
See README section "Animation: Opening sequence".

### Don't
- Don't ease anything with the default `ease`. Always use one of the three named curves.
- Don't animate the accent color or the foreground color directly. Animate state (active/hover) — colors swap discretely on state change with a 180ms transition.
- Don't extend the open sequence past 1s without lengthening the close to match. They're a pair.

### Reduced motion (port requirement)
Respect `prefers-reduced-motion: reduce`:
- Skip stages 1–4 entirely. Set `stage = 5` immediately.
- Disable the chromatic glitch.
- Replace scramble with a 150ms cross-fade.
- Highlight still fills on hover but `transform: none; opacity: 0 → 1` instead of scaleX.

---

## 6. Components — primitive inventory

These are the parts pulled out of the menu that should live in the site's shared component library.

### `<Chip>`
Mono 11–13px label inside a 1.5px-bordered chamfered container.
- Variants: `outlined` (transparent bg, border in fg), `filled` (accent bg, fg `#0a0a0a`).
- Sizes: `sm` (chamfer 8px, 6px/12px padding), `md` (chamfer 12px, 8px/16px padding).
- Used for: `MENU +` button, loading chip, language pills, `LIVE` indicator.

### `<SectionRow>`
Grid `140px | 1fr`. Left cell holds a label rail (`▪ LABEL`), right cell holds content. Top border `--color-rule`.

### `<RailLabel>`
A label rail prefix: a 6×6 accent square, 10px gap, then uppercase mono text 11px tracking 0.14em.

### `<PageTag>`
Bebas 64px on accent fill, chamfer 12px, paired with right-side `PAGE\n00X` in 11px mono accent. Re-scrambles on label change.

### `<CornerBrackets>`
4-piece L-bracket overlay for a parent container. Top-left in accent, others in fg.

### `<Crosshair>` (SVG)
24×24 viewBox: 4 outward-pointing strokes + center dot. Used as a target marker.

### `<AudioBars>`
4 vertical 2px bars at 0.85 opacity, animated independently with staggered `bars` keyframe (scaleY 0.3 → 1, 1.1s alternate). Used for "LIVE" / "EN DIRECTO" status.

### `<GlitchText>`
Wraps any text node. Adds the two chromatic ghosts behind it when `active` is true. Always pair with the panel-level keyframe `panel-glitch-*` for 320ms.

### `<MenuItem>`
The headline row spec (see README for full prop list). The most complex component; everything else in this library is in service of it.

### Hooks
- `useScramble(target, { duration, trigger, delay })`
- `useTypewriter(target, active, { speed })`

---

## 7. Iconography

Two icon styles only:

1. **Geometric SVG** — strokes 1.4–1.6px, no fill except dots. Crosshair, close X, `↗` (use the Unicode arrow, not custom).
2. **Symbol glyphs** — `◆`, `▮`, `▢`, `▪` for marks. Use sparingly; never more than one type per surface.

No icon font. No third-party set.

---

## 8. Sound (optional, future)

If the site adds audio cues:
- Open sequence: a single short "thunk" at stage 3 (sheet covers).
- Close sequence: a softer "click" at stage 7.
- Hover: nothing — the visual scramble is enough.

The `LIVE` indicator suggests this is in the brand vocabulary; spec it before shipping audio.

---

## 9. Files & cross-references

- `menu.jsx` → all motion patterns implemented.
- `app.jsx` → token defaults in the `TWEAK_DEFAULTS` block.
- README "Animation: Opening sequence" → stage timings.
- README "Routes exposed" → bilingual copy reference.
