/**
 * CaseTOC — vertical progress rail for case study navigation.
 *
 * Design:
 *   A 1px vertical rail connects all section markers.
 *   An accent fill line grows via scaleY (transform only — Emil rule props-transform-opacity).
 *   Each marker animates between dot and bar via scaleY + borderRadius, no height/width change.
 *   No outer border box — the rail IS the visual container.
 *
 * Emil Kowalski compliance:
 *   - All animations: transform + opacity only (no height, width, top, left)
 *   - Duration ≤ 300ms for markers, ≤ 400ms for fill
 *   - Interruptible: IntersectionObserver updates drive state, Lenis handles scroll
 *
 * Accessibility:
 *   - nav[aria-label] + button elements
 *   - Touch targets min 44px via minHeight
 *   - aria-current="true" on active item
 */

import { useState, useEffect } from 'react';
import { useLenis } from '../contexts/LenisContext';
import { m } from 'framer-motion';

const MONO   = '"JetBrains Mono", monospace';
const ACCENT = 'var(--color-accent)';
const RULE   = 'var(--color-rule)';
const FG     = 'var(--color-fg)';
const MUTE   = 'var(--color-fg-mute)';
const DIM    = 'var(--color-fg-dim)';

const EASE_OUT = [0.16, 1, 0.3, 1];

// Marker geometry — height fixed at MAX, visual size controlled by scaleY
const MARKER_H     = 16;  // px — max height (active bar)
const MARKER_W     = 2;   // px
const DOT_SCALE    = 3 / MARKER_H; // ≈ 0.1875 — makes it appear 3px tall

export default function CaseTOC({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);
  const lenisRef = useLenis();

  const activeIndex = Math.max(0, sections.findIndex(s => s.id === activeId));
  // Progress 0→1 from first to last section
  const railProgress = sections.length > 1 ? activeIndex / (sections.length - 1) : 0;

  // ── Scroll-based active section — reliable across fast scroll and Lenis ──────
  // Strategy: on every scroll tick, iterate sections in DOM order and mark the
  // LAST one whose top edge has crossed 40% of the viewport height. That section
  // is definitionally "in view" and is what the reader is looking at.
  //
  // Why not IntersectionObserver: the previous Math.abs reduction incorrectly
  // favoured sections that had just scrolled *above* the viewport (top ≈ −5px)
  // over ones clearly in view (top ≈ +80px) because |−5| < |80|.
  useEffect(() => {
    if (!sections.length) return;

    function update() {
      const threshold = window.innerHeight * 0.4;
      let currentId = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) {
          currentId = id;
        }
      }
      setActiveId(currentId);
    }

    window.addEventListener('scroll', update, { passive: true });
    update(); // initial paint
    return () => window.removeEventListener('scroll', update);
  }, [sections]);

  // ── Scroll to section via Lenis ─────────────────────────────────────────────
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -100, duration: 0.9 });
    } else {
      el.scrollIntoView({ behavior: 'instant' });
    }
  }

  if (!sections.length) return null;

  return (
    <nav aria-label="Case study sections" style={{ marginTop: 20 }}>

      {/* Tiny eyebrow — same // language as site markers */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          marginBottom: 14,
          paddingLeft: 20,
        }}
      >
        <div style={{ width: 10, height: 1, backgroundColor: ACCENT, opacity: 0.5 }} />
        <span
          style={{
            fontFamily: MONO,
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,37,64,0.45)',
            fontWeight: 700,
          }}
        >
          // nav
        </span>
      </div>

      {/* Rail + items */}
      <div style={{ position: 'relative', paddingLeft: 20 }}>

        {/* Background rail — 1px vertical line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 20,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: RULE,
          }}
        />

        {/*
          Progress fill — scaleY from top, Emil-compliant (transform only).
          Grows to cover the fraction of sections completed.
        */}
        <m.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: 20,
            top: 0,
            bottom: 0,
            width: 1,
            backgroundColor: ACCENT,
            transformOrigin: 'top',
            opacity: 0.65,
          }}
          animate={{ scaleY: railProgress }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />

        {/* Section buttons */}
        {sections.map(({ id, label }, i) => {
          const isActive = activeId === id;
          const rowNum = String(i + 1).padStart(2, '0');

          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-current={isActive ? 'true' : undefined}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                minHeight: 44,          // UI/UX Pro Max: touch target
                textAlign: 'left',
                paddingLeft: 0,
              }}
            >
              {/*
                Marker on the rail.
                Fixed DOM height (MARKER_H px). Visual size controlled by scaleY.
                Inactive: scaleY ≈ 0.19 → appears 3px tall (dot)
                Active: scaleY 1 → appears 16px tall (bar)
                transformOrigin: center keeps it vertically centered on the rail point.
                Emil: only transform + backgroundColor animate — zero layout reflow.
              */}
              <m.span
                aria-hidden="true"
                style={{
                  width: MARKER_W,
                  height: MARKER_H,
                  flexShrink: 0,
                  transformOrigin: 'center',
                  display: 'block',
                }}
                animate={{
                  scaleY:          isActive ? 1 : DOT_SCALE,
                  scaleX:          isActive ? 1 : 1.5,  // slightly wider dot when inactive
                  backgroundColor: isActive ? ACCENT : 'rgba(255,255,255,0.22)',
                  borderRadius:    isActive ? 1 : 99,
                }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
              />

              {/* Row number + label */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: '8px',
                    letterSpacing: '0.12em',
                    color: isActive ? 'rgba(255,37,64,0.6)' : 'rgba(255,255,255,0.14)',
                    flexShrink: 0,
                    fontWeight: 700,
                    transition: 'color 0.2s',
                  }}
                >
                  {rowNum}
                </span>
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: '10px',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    lineHeight: 1.4,
                    color: isActive ? FG : MUTE,
                    fontWeight: isActive ? 700 : 400,
                    transition: 'color 0.2s, font-weight 0.1s',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                  onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = DIM; }}
                  onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = MUTE; }}
                >
                  {label}
                </span>
              </div>
            </button>
          );
        })}

      </div>
    </nav>
  );
}
