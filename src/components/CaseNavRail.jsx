/**
 * CaseNavRail — responsive case section navigation for tablet (md) and mobile (<md).
 *
 * Breakpoints:
 *   mobile  (<768px)  → SectionStamp: fixed bottom-right chip with tap-to-expand grid
 *   tablet  (768–1279px) → GhostRail: fixed right edge, dots only, hover reveals glass panel
 *   desktop (≥1280px) → nothing (CaseTOC in sidebar handles it)
 *
 * Emil Kowalski compliance:
 *   - All animations: transform + opacity only
 *   - Duration ≤ 300ms for UI transitions
 *   - Interruptible: Framer Motion handles natively
 *   - backdrop-blur only on fixed overlay elements (never scrolling content)
 *
 * Accessibility:
 *   - nav[aria-label] on both sub-components
 *   - button elements with aria-current on active
 *   - Touch targets ≥ 44px (minHeight on buttons)
 */

import { useState, useEffect } from 'react';
import { useLenis } from '../contexts/LenisContext';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';

// ── Design tokens ─────────────────────────────────────────────────────────────
const MONO   = '"JetBrains Mono", monospace';
const BEBAS  = '"Bebas Neue", sans-serif';
const ACCENT = 'var(--color-accent)';
const FG     = 'var(--color-fg)';
const MUTE   = 'var(--color-fg-mute)';
const DIM    = 'var(--color-fg-dim)';
const RULE   = 'var(--color-rule)';

const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_IN  = [0.4, 0, 1, 1];

// Dark glass — purposeful: fixed overlay over scrolling content (blur-purpose ✓)
const GLASS = {
  background: 'rgba(8,8,8,0.92)',
  backdropFilter: 'blur(24px)',
  WebkitBackdropFilter: 'blur(24px)',
  border: '1px solid rgba(255,255,255,0.08)',
  boxShadow: '0 32px 64px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.05)',
};

// Marker geometry — same pattern as CaseTOC
const MARKER_H  = 14;
const DOT_SCALE = 3 / MARKER_H;

function chamferClip(n) {
  return `polygon(0 0, calc(100% - ${n}px) 0, 100% ${n}px, 100% 100%, ${n}px 100%, 0 calc(100% - ${n}px))`;
}

// ── Shared IntersectionObserver hook ─────────────────────────────────────────
function useActiveSectionId(sections) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter(e => e.isIntersecting);
        if (!visible.length) return;
        const topmost = visible.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
        );
        setActiveId(topmost.target.id);
      },
      { rootMargin: '0px 0px -55% 0px', threshold: 0 },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  return [activeId, setActiveId];
}

// ── Shared scroll handler ────────────────────────────────────────────────────
function useScrollTo() {
  const lenisRef = useLenis();
  return (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -100, duration: 0.9 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// GHOST RAIL — tablet (md to xl)
// Fixed right edge. Collapsed: 1px rail + scaleY dots.
// Hover: glass panel slides in from right with all sections labeled.
// ═══════════════════════════════════════════════════════════════════════════════
function GhostRail({ sections, activeId, scrollTo }) {
  const [panelOpen, setPanelOpen] = useState(false);
  const shouldReduce = useReducedMotion();

  const activeIndex = Math.max(0, sections.findIndex(s => s.id === activeId));

  return (
    <nav
      aria-label="Case sections — rail navigation"
      className="hidden md:flex xl:hidden"
      style={{
        position: 'fixed',
        right: 0,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        flexDirection: 'row-reverse',  // dots on the right edge, panel grows left
        alignItems: 'center',
        gap: 0,
      }}
      onMouseEnter={() => setPanelOpen(true)}
      onMouseLeave={() => setPanelOpen(false)}
    >
      {/* ── Dot rail (always visible) ── */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 0,
          padding: '16px 12px',
          // Ghost: nearly invisible until hover area is activated
        }}
      >
        {/* Rail line */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: 16,
            bottom: 16,
            width: 1,
            backgroundColor: RULE,
            transform: 'translateX(-50%)',
          }}
        />

        {/* Progress fill */}
        <m.div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '50%',
            top: 16,
            bottom: 16,
            width: 1,
            backgroundColor: ACCENT,
            transformOrigin: 'top',
            opacity: 0.7,
            transform: 'translateX(-50%)',
          }}
          animate={{ scaleY: sections.length > 1 ? activeIndex / (sections.length - 1) : 0 }}
          transition={{ duration: 0.4, ease: EASE_OUT }}
        />

        {/* Dots */}
        {sections.map(({ id }, i) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-current={isActive ? 'true' : undefined}
              aria-label={sections[i].label}
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 24,
                height: 36,         // 36px touch zone per dot
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
              }}
            >
              <m.span
                aria-hidden="true"
                style={{
                  width: 2,
                  height: MARKER_H,
                  display: 'block',
                  flexShrink: 0,
                  transformOrigin: 'center',
                }}
                animate={{
                  scaleY:          isActive ? 1 : DOT_SCALE,
                  scaleX:          isActive ? 1 : 1.8,
                  backgroundColor: isActive ? ACCENT : 'rgba(255,255,255,0.25)',
                  borderRadius:    isActive ? 1 : 99,
                }}
                transition={{ duration: 0.2, ease: EASE_OUT }}
              />
            </button>
          );
        })}
      </div>

      {/* ── Glass panel (hover reveal) ── */}
      <AnimatePresence>
        {panelOpen && (
          <m.div
            key="ghost-panel"
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 12 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            style={{
              ...GLASS,
              clipPath: chamferClip(8),
              padding: '12px 0',
              minWidth: 200,
              maxWidth: 240,
            }}
          >
            {/* Eyebrow */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                padding: '0 16px 10px',
                borderBottom: `1px solid rgba(255,255,255,0.06)`,
              }}
            >
              <div style={{ width: 8, height: 1, backgroundColor: ACCENT, opacity: 0.5 }} />
              <span
                style={{
                  fontFamily: MONO,
                  fontSize: '8px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(255,37,64,0.45)',
                  fontWeight: 700,
                }}
              >
                // sections
              </span>
            </div>

            {/* Section list */}
            <div style={{ padding: '8px 0' }}>
              {sections.map(({ id, label }, i) => {
                const isActive = activeId === id;
                const rowNum = String(i + 1).padStart(2, '0');
                return (
                  <m.button
                    key={id}
                    onClick={() => { scrollTo(id); setPanelOpen(false); }}
                    aria-current={isActive ? 'true' : undefined}
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.18,
                      ease: EASE_OUT,
                      delay: shouldReduce ? 0 : i * 0.025,
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      width: '100%',
                      background: isActive ? 'rgba(255,37,64,0.06)' : 'none',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '8px 16px',
                      minHeight: 44,
                      textAlign: 'left',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={e => { if (!isActive) e.currentTarget.style.background = 'rgba(255,255,255,0.03)'; }}
                    onMouseLeave={e => { if (!isActive) e.currentTarget.style.background = 'none'; }}
                  >
                    {/* Dot marker */}
                    <m.span
                      aria-hidden="true"
                      style={{
                        width: 2,
                        height: MARKER_H,
                        display: 'block',
                        flexShrink: 0,
                        transformOrigin: 'center',
                      }}
                      animate={{
                        scaleY:          isActive ? 1 : DOT_SCALE,
                        backgroundColor: isActive ? ACCENT : 'rgba(255,255,255,0.2)',
                        borderRadius:    isActive ? 1 : 99,
                      }}
                      transition={{ duration: 0.18, ease: EASE_OUT }}
                    />

                    {/* Row number */}
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: '8px',
                        letterSpacing: '0.12em',
                        color: isActive ? 'rgba(255,37,64,0.6)' : 'rgba(255,255,255,0.14)',
                        flexShrink: 0,
                        fontWeight: 700,
                      }}
                    >
                      {rowNum}
                    </span>

                    {/* Label */}
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: '10px',
                        letterSpacing: '0.08em',
                        textTransform: 'uppercase',
                        color: isActive ? FG : MUTE,
                        fontWeight: isActive ? 700 : 400,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {label}
                    </span>
                  </m.button>
                );
              })}
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// SECTION STAMP — mobile (<md)
// Fixed bottom-right compact chip. Section name flips via rotateX on change.
// Tap chip to expand 2-column section grid above it.
// ═══════════════════════════════════════════════════════════════════════════════
function SectionStamp({ sections, activeId, scrollTo }) {
  const [expanded, setExpanded] = useState(false);
  const shouldReduce = useReducedMotion();

  const activeIndex = Math.max(0, sections.findIndex(s => s.id === activeId));
  const activeSection = sections[activeIndex];
  const total = sections.length;
  const counter = `${String(activeIndex + 1).padStart(2, '0')}/${String(total).padStart(2, '0')}`;

  return (
    <div
      className="flex md:hidden"
      style={{
        position: 'fixed',
        bottom: 24,
        right: 16,
        zIndex: 50,
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 8,
      }}
    >
      {/* ── Expanded grid (tap to close) ── */}
      <AnimatePresence>
        {expanded && (
          <m.nav
            key="stamp-grid"
            aria-label="Case sections — expanded grid"
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.97 }}
            transition={{ duration: 0.22, ease: EASE_OUT }}
            style={{
              ...GLASS,
              clipPath: chamferClip(10),
              padding: '12px 0 8px',
              width: 'min(calc(100vw - 32px), 280px)',
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 14px 10px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 8, height: 1, backgroundColor: ACCENT, opacity: 0.5 }} />
                <span
                  style={{
                    fontFamily: MONO,
                    fontSize: '8px',
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,37,64,0.45)',
                    fontWeight: 700,
                  }}
                >
                  // nav
                </span>
              </div>
              <button
                onClick={() => setExpanded(false)}
                aria-label="Close navigation"
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: MONO,
                  fontSize: '10px',
                  color: MUTE,
                  padding: '2px 4px',
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            {/* 2-column grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 0,
                padding: '8px 0',
              }}
            >
              {sections.map(({ id, label }, i) => {
                const isActive = activeId === id;
                const rowNum = String(i + 1).padStart(2, '0');
                return (
                  <m.button
                    key={id}
                    onClick={() => { scrollTo(id); setExpanded(false); }}
                    aria-current={isActive ? 'true' : undefined}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.15,
                      ease: EASE_OUT,
                      delay: shouldReduce ? 0 : i * 0.02,
                    }}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: 4,
                      padding: '10px 14px',
                      background: isActive ? 'rgba(255,37,64,0.07)' : 'none',
                      border: 'none',
                      borderTop: i >= 2 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      borderLeft: i % 2 !== 0 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      cursor: 'pointer',
                      textAlign: 'left',
                      minHeight: 52,
                    }}
                  >
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: '7px',
                        letterSpacing: '0.14em',
                        color: isActive ? 'rgba(255,37,64,0.6)' : 'rgba(255,255,255,0.2)',
                        fontWeight: 700,
                      }}
                    >
                      {rowNum}
                    </span>
                    <span
                      style={{
                        fontFamily: MONO,
                        fontSize: '9px',
                        letterSpacing: '0.06em',
                        textTransform: 'uppercase',
                        color: isActive ? FG : MUTE,
                        fontWeight: isActive ? 700 : 400,
                        lineHeight: 1.35,
                      }}
                    >
                      {label}
                    </span>
                    {isActive && (
                      <div
                        aria-hidden="true"
                        style={{
                          width: 16,
                          height: 1,
                          backgroundColor: ACCENT,
                          opacity: 0.7,
                          marginTop: 2,
                        }}
                      />
                    )}
                  </m.button>
                );
              })}
            </div>
          </m.nav>
        )}
      </AnimatePresence>

      {/* ── Compact chip (always visible) ── */}
      <button
        onClick={() => setExpanded(prev => !prev)}
        aria-expanded={expanded}
        aria-label={`Case navigation: ${activeSection?.label || 'sections'}`}
        style={{
          ...GLASS,
          clipPath: chamferClip(6),
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          padding: 0,
          border: 'none',
          cursor: 'pointer',
          height: 36,
          minWidth: 0,
          overflow: 'hidden',
        }}
      >
        {/* Counter */}
        <div
          style={{
            padding: '0 10px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            borderRight: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: MONO,
              fontSize: '9px',
              letterSpacing: '0.12em',
              color: ACCENT,
              fontWeight: 700,
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {counter}
          </span>
        </div>

        {/* Active section name — rotateX flip on change */}
        <div
          style={{
            padding: '0 10px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            overflow: 'hidden',
            maxWidth: 160,
          }}
        >
          <AnimatePresence mode="wait" initial={false}>
            <m.span
              key={activeId}
              initial={shouldReduce ? { opacity: 0 } : { opacity: 0, rotateX: 90 }}
              animate={shouldReduce ? { opacity: 1 } : { opacity: 1, rotateX: 0 }}
              exit={shouldReduce ? { opacity: 0 } : { opacity: 0, rotateX: -90 }}
              transition={{ duration: 0.18, ease: EASE_OUT }}
              style={{
                fontFamily: MONO,
                fontSize: '9px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: FG,
                fontWeight: 600,
                whiteSpace: 'nowrap',
                display: 'block',
                transformOrigin: 'center',
                perspective: 400,
              }}
            >
              {activeSection?.label || '—'}
            </m.span>
          </AnimatePresence>
        </div>

        {/* Toggle indicator */}
        <div
          style={{
            padding: '0 10px',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            flexShrink: 0,
          }}
        >
          <m.span
            aria-hidden="true"
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: 0.2, ease: EASE_OUT }}
            style={{
              display: 'block',
              fontFamily: MONO,
              fontSize: '9px',
              color: MUTE,
              lineHeight: 1,
            }}
          >
            ↑
          </m.span>
        </div>
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CASE NAV RAIL — orchestrator
// Renders both sub-components; each shows only at its breakpoint via CSS.
// Single IntersectionObserver drives both via shared activeId state.
// ═══════════════════════════════════════════════════════════════════════════════
export default function CaseNavRail({ sections }) {
  const [activeId] = useActiveSectionId(sections);
  const scrollTo = useScrollTo();

  if (!sections.length) return null;

  return (
    <>
      <GhostRail sections={sections} activeId={activeId} scrollTo={scrollTo} />
      <SectionStamp sections={sections} activeId={activeId} scrollTo={scrollTo} />
    </>
  );
}
