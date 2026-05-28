/**
 * CaseTOC — desktop (xl+) case study index panel.
 *
 * Design:
 *   Glass panel with chamfered corners — consistent with GhostRail and SectionStamp.
 *   Header shows // index label + progress counter + collapse toggle.
 *   List reveals/hides via clipPath (layout-free, Emil props-clip-path-performant).
 *   Rail + scaleY progress fill inside the panel (same as before).
 *
 * Emil Kowalski compliance:
 *   - clipPath for open/close: no layout reflow (props-clip-path-performant)
 *   - enter ease-out, exit ease-in (ease-out-default, timing-asymmetric)
 *   - 260ms enter / 180ms exit (timing-300ms-max)
 *   - marker transitions: transform + opacity only (props-transform-opacity)
 *   - backdrop-blur on fixed glass only — this panel is sticky, not fixed.
 *     Using a non-blurred glass (solid dark tint) to stay Emil-compliant.
 *   - useReducedMotion: opacity fallback, no clip-path animation
 */

import { useState, useEffect } from 'react';
import { useLenis } from '../contexts/LenisContext';
import { m, AnimatePresence, useReducedMotion } from 'framer-motion';

const MONO   = '"JetBrains Mono", monospace';
const ACCENT = 'var(--color-accent)';
const RULE   = 'var(--color-rule)';
const FG     = 'var(--color-fg)';
const MUTE   = 'var(--color-fg-mute)';
const DIM    = 'var(--color-fg-dim)';

const EASE_OUT = [0.16, 1, 0.3, 1];
const EASE_IN  = [0.4, 0, 1, 1];

const MARKER_H  = 16;
const MARKER_W  = 2;
const DOT_SCALE = 3 / MARKER_H;

// Sticky panel uses a solid tinted glass (no backdrop-blur — Emil: blur only on fixed elements)
const PANEL = {
  background: 'rgba(10,10,10,0.92)',
  border: '1px solid rgba(255,255,255,0.07)',
  boxShadow: '0 16px 40px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.04)',
};

function chamferClip(n) {
  return `polygon(0 0, calc(100% - ${n}px) 0, 100% ${n}px, 100% 100%, ${n}px 100%, 0 calc(100% - ${n}px))`;
}

export default function CaseTOC({ sections }) {
  const [activeId, setActiveId]   = useState(sections[0]?.id ?? null);
  const [collapsed, setCollapsed] = useState(false);
  const lenisRef      = useLenis();
  const shouldReduce  = useReducedMotion();

  const activeIndex  = Math.max(0, sections.findIndex(s => s.id === activeId));
  const railProgress = sections.length > 1 ? activeIndex / (sections.length - 1) : 0;
  const counter      = `${String(activeIndex + 1).padStart(2, '0')}/${String(sections.length).padStart(2, '0')}`;

  // Same scroll-tracking strategy as CaseNavRail: last section whose top
  // edge has crossed 40% viewport height is the one the reader is in.
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
      <div style={{ ...PANEL, clipPath: chamferClip(8) }}>

        {/* ── Header — always visible ────────────────────────────────────── */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 14px',
            borderBottom: collapsed ? 'none' : '1px solid rgba(255,255,255,0.06)',
          }}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <div aria-hidden="true" style={{ width: 8, height: 1, backgroundColor: ACCENT, opacity: 0.5 }} />
            <span style={{
              fontFamily: MONO, fontSize: '8px',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,37,64,0.45)', fontWeight: 700,
            }}>
              // index
            </span>
          </div>

          {/* Right: progress + toggle */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span
              aria-live="polite"
              aria-label={`Section ${activeIndex + 1} of ${sections.length}`}
              style={{
                fontFamily: MONO, fontSize: '8px',
                letterSpacing: '0.1em', color: 'rgba(255,37,64,0.45)',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {counter}
            </span>

            <button
              onClick={() => setCollapsed(v => !v)}
              aria-expanded={!collapsed}
              aria-controls="toc-list"
              aria-label={collapsed ? 'Expand section index' : 'Collapse section index'}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '4px 6px', display: 'flex', alignItems: 'center',
                justifyContent: 'center', color: MUTE, minHeight: 28, minWidth: 28,
                transition: 'color 0.15s cubic-bezier(0.16,1,0.3,1)',
              }}
              onMouseEnter={e => { e.currentTarget.style.color = FG; }}
              onMouseLeave={e => { e.currentTarget.style.color = MUTE; }}
            >
              <m.span
                aria-hidden="true"
                animate={{ rotate: collapsed ? 180 : 0 }}
                transition={{ duration: 0.22, ease: EASE_OUT }}
                style={{ display: 'block', fontFamily: MONO, fontSize: '10px', lineHeight: 1 }}
              >
                ↑
              </m.span>
            </button>
          </div>
        </div>

        {/* ── Collapsible section list ────────────────────────────────────── */}
        {/*
          clipPath reveal: Emil props-clip-path-performant — layout-free, no reflow.
          Enter: inset(100% → 0%) ease-out 260ms
          Exit:  inset(0% → 100%) ease-in 180ms (exit faster than enter)
        */}
        <AnimatePresence initial={false}>
          {!collapsed && (
            <m.div
              id="toc-list"
              key="toc-list"
              initial={shouldReduce
                ? { opacity: 0 }
                : { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0.6 }}
              animate={shouldReduce
                ? { opacity: 1 }
                : { clipPath: 'inset(0% 0% 0% 0%)', opacity: 1 }}
              exit={shouldReduce
                ? { opacity: 0, transition: { duration: 0.1 } }
                : { clipPath: 'inset(0% 0% 100% 0%)', opacity: 0,
                    transition: { duration: 0.18, ease: EASE_IN } }}
              transition={{ duration: 0.26, ease: EASE_OUT }}
              style={{ overflow: 'hidden' }}
            >
              {/* Rail + items */}
              <div style={{ position: 'relative', paddingLeft: 20, paddingRight: 12, paddingTop: 8, paddingBottom: 10 }}>

                {/* Background rail */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', left: 20, top: 0, bottom: 0,
                    width: 1, backgroundColor: RULE,
                  }}
                />

                {/* Progress fill — scaleY from top, transform only */}
                <m.div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', left: 20, top: 0, bottom: 0,
                    width: 1, backgroundColor: ACCENT,
                    transformOrigin: 'top', opacity: 0.65,
                  }}
                  animate={{ scaleY: railProgress }}
                  transition={{ duration: 0.4, ease: EASE_OUT }}
                />

                {/* Section buttons */}
                {sections.map(({ id, label }, i) => {
                  const isActive = activeId === id;
                  const rowNum   = String(i + 1).padStart(2, '0');

                  return (
                    <button
                      key={id}
                      onClick={() => scrollTo(id)}
                      aria-current={isActive ? 'true' : undefined}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 10,
                        width: '100%', background: 'none', border: 'none',
                        cursor: 'pointer', padding: 0,
                        minHeight: 44, textAlign: 'left',
                        transition: 'background 0.12s cubic-bezier(0.16,1,0.3,1)',
                        paddingRight: 4,
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = isActive ? 'rgba(255,37,64,0.05)' : 'rgba(255,255,255,0.03)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
                    >
                      {/* Marker — fixed DOM height, scaleY controls visual size */}
                      <m.span
                        aria-hidden="true"
                        style={{
                          width: MARKER_W, height: MARKER_H,
                          flexShrink: 0, transformOrigin: 'center', display: 'block',
                        }}
                        animate={{
                          scaleY:          isActive ? 1 : DOT_SCALE,
                          scaleX:          isActive ? 1 : 1.5,
                          backgroundColor: isActive ? ACCENT : 'rgba(255,255,255,0.22)',
                          borderRadius:    isActive ? 1 : 99,
                        }}
                        transition={{ duration: 0.22, ease: EASE_OUT }}
                      />

                      {/* Row number + label */}
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, minWidth: 0, flex: 1 }}>
                        <span style={{
                          fontFamily: MONO, fontSize: '8px',
                          letterSpacing: '0.12em',
                          color: isActive ? 'rgba(255,37,64,0.6)' : 'rgba(255,255,255,0.14)',
                          flexShrink: 0, fontWeight: 700,
                          transition: 'color 0.15s cubic-bezier(0.16,1,0.3,1)',
                        }}>
                          {rowNum}
                        </span>
                        <span
                          style={{
                            fontFamily: MONO, fontSize: '10px',
                            letterSpacing: '0.08em', textTransform: 'uppercase',
                            lineHeight: 1.4,
                            color: isActive ? FG : MUTE,
                            fontWeight: isActive ? 700 : 400,
                            transition: 'color 0.15s cubic-bezier(0.16,1,0.3,1)',
                            whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
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
            </m.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}
