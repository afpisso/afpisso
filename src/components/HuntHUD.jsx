/**
 * HuntHUD — Signal Hunt progress indicator + proximity tracker.
 *
 * Responsibilities:
 *   1. Tracks cursor distance to all [data-hunt-signal] elements → updates
 *      HuntContext.proximity so Cursor.jsx can glitch accordingly.
 *   2. Renders a fixed bottom-left chip (invisible until first signal found).
 *      Hover expands to a glass panel listing signal status + hint copy.
 *   3. Renders the acquisition toast (top-center, auto-dismiss).
 */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { m, AnimatePresence } from 'framer-motion';
import { useHunt, HuntIcon, SIGNALS } from '../contexts/HuntContext';

const MONO    = '"JetBrains Mono", monospace';
const EASE    = [0.16, 1, 0.3, 1];
const ACCENT  = 'var(--color-accent)';

// Proximity detection radius — 220px  → proximity 0→1
const PROX_RADIUS = 220;

const GLASS = {
  background:           'rgba(6,6,6,0.94)',
  backdropFilter:       'blur(20px)',
  WebkitBackdropFilter: 'blur(20px)',
  border:               '1px solid rgba(255,255,255,0.08)',
  boxShadow:            '0 24px 48px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.05)',
};

function chamfer(n = 6) {
  return `polygon(0 0, calc(100% - ${n}px) 0, 100% ${n}px, 100% 100%, ${n}px 100%, 0 calc(100% - ${n}px))`;
}

// ── Proximity tracker — measures cursor distance to unfound signal elements ────
// Runs as a pointermove listener and writes HuntContext.proximity (0–1).
// Elements must have data-hunt-signal="[id]" attribute to be detected.
function ProximityTracker() {
  const { found, setProximity } = useHunt();

  useEffect(() => {
    let rafId = null;
    let lastX = -999, lastY = -999;

    const onMove = (e) => {
      lastX = e.clientX;
      lastY = e.clientY;

      if (rafId) return; // throttle to one RAF per frame
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const signals = document.querySelectorAll('[data-hunt-signal]');
        let minDist = Infinity;

        signals.forEach((el) => {
          const id = el.dataset.huntSignal;
          if (found.has(id)) return; // already found — skip
          const rect = el.getBoundingClientRect();
          if (rect.width === 0 && rect.height === 0) return; // not in viewport
          const cx = rect.left + rect.width  / 2;
          const cy = rect.top  + rect.height / 2;
          const dist = Math.hypot(lastX - cx, lastY - cy);
          if (dist < minDist) minDist = dist;
        });

        const prox = minDist === Infinity
          ? 0
          : Math.max(0, 1 - minDist / PROX_RADIUS);
        setProximity(prox);
      });
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      window.removeEventListener('pointermove', onMove);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [found, setProximity]);

  return null; // purely behavioral
}

// ── Toast shell ───────────────────────────────────────────────────────────────
function Toast({ toastKey, children }) {
  return (
    <m.div
      key={toastKey}
      initial={{ opacity: 0, y: -18, scale: 0.96 }}
      animate={{ opacity: 1,  y: 0,   scale: 1     }}
      exit={{    opacity: 0,  y: -12, scale: 0.97  }}
      transition={{ duration: 0.28, ease: EASE }}
      style={{
        position:      'fixed',
        top:           20,
        left:          '50%',
        transform:     'translateX(-50%)',
        zIndex:        200,
        pointerEvents: 'none',
      }}
    >
      <div style={{ ...GLASS, clipPath: chamfer(7), padding: '10px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
        {children}
      </div>
    </m.div>
  );
}

// ── Acquisition toast (new signal) ─────────────────────────────────────────────
function AcquireToast() {
  const { lastAcquired, reacquired, found, signals } = useHunt();

  const newSig  = signals.find(s => s.id === lastAcquired);
  const dupSig  = signals.find(s => s.id === reacquired);
  // Only one toast at a time — new acquisition takes priority
  const active  = lastAcquired ? 'new' : reacquired ? 'dup' : null;

  return (
    <AnimatePresence mode="wait">
      {active === 'new' && newSig && (
        <Toast key={`new-${lastAcquired}`} toastKey={`new-${lastAcquired}`}>
          <HuntIcon size={14} />
          <div>
            <div style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,37,64,0.6)', fontWeight: 700, marginBottom: 3 }}>
              // SIGNAL ACQUIRED
            </div>
            <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-fg)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}>
              {newSig.label}
              <span style={{ color: 'var(--color-fg-mute)', fontWeight: 400 }}>{found.size}/{signals.length}</span>
            </div>
          </div>
        </Toast>
      )}

      {active === 'dup' && dupSig && (
        <Toast key={`dup-${reacquired}`} toastKey={`dup-${reacquired}`}>
          {/* Dimmed icon to signal "not new" */}
          <HuntIcon size={14} opacity={0.35} />
          <div>
            <div style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)', fontWeight: 700, marginBottom: 3 }}>
              // DUPLICATE SIGNAL
            </div>
            <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-fg-dim)', fontWeight: 400, display: 'flex', alignItems: 'center', gap: 8 }}>
              {dupSig.label}
              <span style={{ color: 'rgba(255,255,255,0.18)' }}>already logged</span>
            </div>
          </div>
        </Toast>
      )}
    </AnimatePresence>
  );
}

// ── HUD chip + panel ───────────────────────────────────────────────────────────
export default function HuntHUD() {
  const { found, allFound, signals } = useHunt();
  const [open, setOpen] = useState(false);

  return (
    <>
      <ProximityTracker />
      <AcquireToast />

      {/* Invisible until first signal found */}
      {found.size > 0 && (
        <div
          style={{
            position:   'fixed',
            bottom:     20,
            left:       14,
            zIndex:     55,
            fontFamily: MONO,
          }}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* ── Expanded panel ── */}
          <AnimatePresence>
            {open && (
              <m.div
                key="hud-panel"
                initial={{ opacity: 0, y: 10, scale: 0.97 }}
                animate={{ opacity: 1, y: 0,  scale: 1    }}
                exit={{    opacity: 0, y: 8,  scale: 0.98 }}
                transition={{ duration: 0.2, ease: EASE }}
                style={{
                  ...GLASS,
                  clipPath:    chamfer(8),
                  padding:     '12px 0 8px',
                  marginBottom: 8,
                  minWidth:    250,
                }}
              >
                {/* Panel header */}
                <div style={{
                  display:      'flex',
                  alignItems:   'center',
                  gap:          8,
                  padding:      '0 14px 10px',
                  borderBottom: '1px solid rgba(255,255,255,0.06)',
                }}>
                  <HuntIcon size={10} />
                  <span style={{
                    fontSize:      '8px',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    color:         'rgba(255,37,64,0.5)',
                    fontWeight:    700,
                  }}>
                    // SIGNAL HUNT
                  </span>
                  <span style={{
                    marginLeft:    'auto',
                    fontSize:      '8px',
                    letterSpacing: '0.1em',
                    color:         allFound ? ACCENT : 'rgba(255,255,255,0.2)',
                    fontWeight:    700,
                  }}>
                    {found.size}/{signals.length}
                  </span>
                </div>

                {/* Signal list */}
                <div style={{ padding: '8px 0 4px' }}>
                  {signals.map((sig, i) => {
                    const isFound = found.has(sig.id);
                    return (
                      <m.div
                        key={sig.id}
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0  }}
                        transition={{ duration: 0.16, ease: EASE, delay: i * 0.03 }}
                        style={{
                          padding:    '6px 14px',
                          background: isFound ? 'rgba(255,37,64,0.04)' : 'none',
                        }}
                      >
                        {/* Status row */}
                        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: isFound ? 0 : 3 }}>
                          {isFound
                            ? <HuntIcon size={9} />
                            : <span style={{ width: 9, height: 9, display: 'block', flexShrink: 0, border: '1px solid rgba(255,255,255,0.15)', borderRadius: 1 }} />
                          }
                          <span style={{
                            fontSize:      '9px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color:         isFound ? 'var(--color-fg-dim)' : 'rgba(255,255,255,0.2)',
                            fontWeight:    isFound ? 600 : 400,
                          }}>
                            {isFound ? sig.label : '█████ ██████'}
                          </span>
                          {isFound && (
                            <span style={{
                              marginLeft:    'auto',
                              fontSize:      '7px',
                              letterSpacing: '0.12em',
                              color:         'rgba(255,255,255,0.18)',
                              textTransform: 'uppercase',
                              flexShrink:    0,
                            }}>
                              {sig.page}
                            </span>
                          )}
                        </div>

                        {/* Hint — only for unfound signals */}
                        {!isFound && (
                          <div style={{
                            paddingLeft:   18,
                            fontFamily:    MONO,
                            fontSize:      '8px',
                            letterSpacing: '0.12em',
                            color:         'rgba(255,37,64,0.3)',
                            fontStyle:     'normal',
                            lineHeight:    1.5,
                          }}>
                            {sig.hint}
                          </div>
                        )}
                      </m.div>
                    );
                  })}
                </div>

                {/* All found — access link */}
                {allFound && (
                  <div style={{
                    padding:      '8px 14px 0',
                    borderTop:    '1px solid rgba(255,37,64,0.15)',
                    marginTop:    4,
                  }}>
                    <Link
                      to="/classified"
                      style={{
                        display:       'flex',
                        alignItems:    'center',
                        gap:           8,
                        color:         ACCENT,
                        fontSize:      '9px',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        textDecoration:'none',
                        fontWeight:    700,
                        paddingTop:    8,
                      }}
                      onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                      onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                    >
                      <HuntIcon size={10} />
                      <span>ACCESS CLASSIFIED</span>
                      <span style={{ marginLeft: 'auto' }}>→</span>
                    </Link>
                  </div>
                )}
              </m.div>
            )}
          </AnimatePresence>

          {/* ── Compact chip ── */}
          <div
            style={{
              ...GLASS,
              clipPath:    chamfer(5),
              display:     'flex',
              alignItems:  'center',
              gap:         7,
              padding:     '6px 11px',
              cursor:      'default',
              borderColor: allFound ? 'rgba(255,37,64,0.35)' : 'rgba(255,255,255,0.08)',
            }}
          >
            <HuntIcon size={10} opacity={allFound ? 1 : 0.5} />
            <span style={{
              fontSize:      '8px',
              letterSpacing: '0.16em',
              fontWeight:    700,
              color:         allFound ? ACCENT : 'rgba(255,37,64,0.55)',
              textTransform: 'uppercase',
              whiteSpace:    'nowrap',
            }}>
              {allFound ? 'CLASSIFIED' : `SIG · ${found.size}/${signals.length}`}
            </span>
          </div>
        </div>
      )}
    </>
  );
}
