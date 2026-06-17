/**
 * CaseTOC — Focal Window TOC (desktop xl+)
 *
 * The active section stays centered in a fixed-height container.
 * Neighboring sections fade progressively (dist-based opacity).
 * A gradient vignette top + bottom creates the lens/spotlight effect.
 * The list repositions on active change; per-item opacity transitions
 * carry the motion — no layout animation at all.
 *
 * Emil Kowalski compliance:
 *   - Animate: opacity + transform only (marker dot↔bar via Framer Motion)
 *   - Ease-out enter [0.16,1,0.3,1] 260ms · ease-in exit [0.4,0,1,1] 180ms
 *   - useReducedMotion: transitions off, static opacity
 *   - No backdrop-blur (sticky panel — solid dark tint)
 */

import { useState, useEffect, useRef } from 'react';
import { useLenis } from '../contexts/LenisContext';
import { m, useReducedMotion } from 'framer-motion';

const MONO    = '"Play", sans-serif';
const ACCENT  = 'var(--color-accent)';
const FG      = 'var(--color-fg)';
const DIM     = 'var(--color-fg-dim)';
const MUTE    = 'var(--color-fg-mute)';

const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_IN  = [0.4, 0, 1, 1];

// Marker constants (same as original — dot morphs to bar for active)
const MARKER_H  = 16;
const MARKER_W  = 2;
const DOT_SCALE = 3 / MARKER_H;

// Focal window: each row height, container height, edge padding
const ITEM_H      = 36;   // px — each row
const CONTAINER_H = 252;  // ~7 rows visible
const EDGE_PAD    = CONTAINER_H / 2 - ITEM_H / 2; // centers first/last item

function chamferClip(n) {
  return `polygon(0 0, calc(100% - ${n}px) 0, 100% ${n}px, 100% 100%, ${n}px 100%, 0 calc(100% - ${n}px))`;
}

// Progressive opacity falloff from the active section
// browse=true lifts all values so more items are legible while manually scrolling
function focalOpacity(dist, browse) {
  if (dist === 0) return 1;
  if (browse) {
    if (dist === 1) return 0.92;
    if (dist === 2) return 0.78;
    if (dist === 3) return 0.62;
    return 0.46;
  }
  if (dist === 1) return 0.58;
  if (dist === 2) return 0.28;
  if (dist === 3) return 0.12;
  return 0.05;
}

export default function CaseTOC({ sections }) {
  const [activeId,  setActiveId]  = useState(sections[0]?.id ?? null);
  const [hoveredId, setHoveredId] = useState(null);
  const [browse,    setBrowse]    = useState(false);
  const browseRef = useRef(false); // ref mirror — used inside effect to avoid deps size change
  const listRef   = useRef(null);
  const lenisRef  = useLenis();
  const shouldReduce = useReducedMotion();

  const activeIndex  = Math.max(0, sections.findIndex(s => s.id === activeId));
  const railProgress = sections.length > 1 ? activeIndex / (sections.length - 1) : 0;
  const counter      = `${String(activeIndex + 1).padStart(2, '0')}/${String(sections.length).padStart(2, '0')}`;

  // Scroll tracking — last section whose top has crossed 40% viewport
  useEffect(() => {
    if (!sections.length) return;
    function update() {
      const threshold = window.innerHeight * 0.4;
      let current = sections[0].id;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) current = id;
      }
      setActiveId(current);
    }
    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [sections]);

  // Keep active item centered — suspended while user is browsing.
  // browseRef (not browse state) used here to keep deps array at [activeIndex].
  useEffect(() => {
    const container = listRef.current;
    if (!container || browseRef.current) return;
    container.scrollTop = activeIndex * ITEM_H;
  }, [activeIndex]);

  function enterBrowse() { browseRef.current = true; setBrowse(true); }
  function exitBrowse() {
    browseRef.current = false;
    setBrowse(false);
    const container = listRef.current;
    if (!container) return;
    container.scrollTo({ top: activeIndex * ITEM_H, behavior: 'smooth' });
  }

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -100, duration: 0.9 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  if (!sections.length) return null;

  // Asymmetric opacity transition per item: items gaining opacity (entering focus)
  // use ease-out 260ms; items losing opacity (exiting focus) use ease-in 180ms.
  // Since CSS transitions can't differentiate direction per-element, we compute
  // the curve from comparing to previous active index via a ref.
  const prevActiveRef = useRef(activeIndex);
  function itemTransition(i) {
    if (shouldReduce) return 'none';
    const wasActive = prevActiveRef.current === i;
    const becomesActive = activeIndex === i;
    // Item entering focus (opacity increasing) → ease-out
    const entering = becomesActive || Math.abs(i - activeIndex) < Math.abs(i - prevActiveRef.current);
    return entering
      ? `opacity 0.26s cubic-bezier(${EASE_OUT})`
      : `opacity 0.18s cubic-bezier(${EASE_IN})`;
  }
  prevActiveRef.current = activeIndex;

  return (
    <nav aria-label="Case study sections" style={{ marginTop: 20 }}>
      <div style={{
        background: 'rgba(10,10,10,0.92)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: '0 16px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
        clipPath: chamferClip(8),
      }}>

        {/* ── Header ─────────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '10px 14px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div aria-hidden="true" style={{ width: 8, height: 1, background: ACCENT, opacity: 0.5 }} />
            <span style={{
              fontFamily: MONO, fontSize: '8px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'var(--color-accent-45)', fontWeight: 700,
            }}>// index</span>
          </div>
          <span
            aria-live="polite"
            aria-label={`Section ${activeIndex + 1} of ${sections.length}`}
            style={{
              fontFamily: MONO, fontSize: '8px',
              letterSpacing: '0.1em', color: 'var(--color-accent-45)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >{counter}</span>
        </div>

        {/* ── Focal window ────────────────────────────────────────────────── */}
        {/*
          onWheel stopPropagation: prevents Lenis from intercepting wheel
          events while the user scrolls inside the panel (browse mode).
        */}
        <div
          style={{ position: 'relative' }}
          onMouseEnter={enterBrowse}
          onMouseLeave={exitBrowse}
          onWheel={e => e.stopPropagation()}
        >

          {/* Vertical rail — sits outside the scroll container so it doesn't move */}
          <div aria-hidden="true" style={{
            position: 'absolute', left: 14, top: 0, bottom: 0,
            width: 1, background: 'var(--color-rule)', zIndex: 0,
          }} />
          {/* Progress fill */}
          <m.div
            aria-hidden="true"
            style={{
              position: 'absolute', left: 14, top: 0, bottom: 0,
              width: 1, background: ACCENT,
              transformOrigin: 'top', opacity: 0.6, zIndex: 0,
            }}
            animate={{ scaleY: railProgress }}
            transition={{ duration: 0.4, ease: EASE_OUT }}
          />

          {/*
            Gradient vignette — two overlapping divs, each transitioning only
            opacity. Emil: background transitions cause paint; opacity is
            GPU-composited. Asymmetric timing: enter ease-out 260ms / exit ease-in 180ms.
          */}
          {/* Normal (focal) vignette — exits when browse starts */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.96) 0%, rgba(10,10,10,0.72) 14%, transparent 30%, transparent 70%, rgba(10,10,10,0.72) 86%, rgba(10,10,10,0.96) 100%)',
            opacity: browse ? 0 : 1,
            transition: shouldReduce ? 'none'
              : browse
                ? `opacity 0.18s cubic-bezier(${EASE_IN})`   /* exit ease-in */
                : `opacity 0.26s cubic-bezier(${EASE_OUT})`,  /* enter ease-out */
          }} />
          {/* Browse vignette — enters when browse starts */}
          <div aria-hidden="true" style={{
            position: 'absolute', inset: 0, zIndex: 2, pointerEvents: 'none',
            background: 'linear-gradient(to bottom, rgba(10,10,10,0.65) 0%, rgba(10,10,10,0.18) 8%, transparent 18%, transparent 82%, rgba(10,10,10,0.18) 92%, rgba(10,10,10,0.65) 100%)',
            opacity: browse ? 1 : 0,
            transition: shouldReduce ? 'none'
              : browse
                ? `opacity 0.26s cubic-bezier(${EASE_OUT})`  /* enter ease-out */
                : `opacity 0.18s cubic-bezier(${EASE_IN})`,  /* exit ease-in */
          }} />

          {/* Scrollable list — scrollbar hidden, driven programmatically */}
          <div
            ref={listRef}
            id="toc-list"
            style={{
              height: CONTAINER_H,
              overflowY: 'scroll',
              scrollbarWidth: 'none',  /* Firefox */
              position: 'relative', zIndex: 1,
            }}
          >
            {/* Top pad — lets first item scroll to vertical center */}
            <div aria-hidden="true" style={{ height: EDGE_PAD }} />

            {sections.map(({ id, label }, i) => {
              const isActive  = id === activeId;
              const isHovered = id === hoveredId;
              const dist      = Math.abs(i - activeIndex);
              const base      = focalOpacity(dist, browse);
              // Individual item hover lifts opacity further for clear affordance
              const opacity   = isHovered && !isActive ? Math.min(base * 1.7, 0.88) : base;

              return (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  onMouseEnter={() => setHoveredId(id)}
                  onMouseLeave={() => setHoveredId(null)}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    display: 'flex', alignItems: 'center', gap: 10,
                    width: '100%', background: 'none', border: 'none',
                    cursor: 'pointer', padding: 0,
                    height: ITEM_H, textAlign: 'left',
                    paddingLeft: 8, paddingRight: 12,
                    opacity,
                    transition: itemTransition(i),
                  }}
                >
                  {/* Marker: dot → bar morph for active section */}
                  <m.span
                    aria-hidden="true"
                    style={{
                      width: MARKER_W, height: MARKER_H,
                      flexShrink: 0, transformOrigin: 'center', display: 'block',
                    }}
                    animate={{
                      scaleY:          isActive ? 1 : DOT_SCALE,
                      scaleX:          isActive ? 1 : 1.5,
                      backgroundColor: isActive ? ACCENT : 'rgba(255,255,255,0.3)',
                      borderRadius:    isActive ? 1 : 99,
                    }}
                    transition={{ duration: 0.22, ease: EASE_OUT }}
                  />

                  {/* Index + label */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 5, minWidth: 0, flex: 1 }}>
                    <span style={{
                      fontFamily: MONO, fontSize: '7px',
                      letterSpacing: '0.12em',
                      color: isActive ? 'var(--color-accent-60)' : 'rgba(255,255,255,0.18)',
                      flexShrink: 0, fontWeight: 700,
                      transition: shouldReduce ? 'none' : 'color 0.22s cubic-bezier(0.16,1,0.3,1)',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: MONO, fontSize: '9px',
                      letterSpacing: '0.06em', textTransform: 'uppercase',
                      lineHeight: 1.3,
                      color: isActive ? FG : DIM,
                      fontWeight: 400,
                      transition: shouldReduce ? 'none' : 'color 0.22s cubic-bezier(0.16,1,0.3,1)',
                      display: '-webkit-box',
                      WebkitLineClamp: 2, WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}>
                      {label}
                    </span>
                  </div>
                </button>
              );
            })}

            {/* Bottom pad — lets last item scroll to vertical center */}
            <div aria-hidden="true" style={{ height: EDGE_PAD }} />
          </div>
        </div>

      </div>
    </nav>
  );
}
