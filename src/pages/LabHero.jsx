/**
 * LabHero — Hero prototype with boot sequence + glitch portrait
 *
 * PHOTOS: drop two files into /public/lab/ before testing:
 *   /public/lab/face.jpg    — portrait photo (red-lit, dark bg)
 *   /public/lab/helmet.jpg  — helmet photo (red LED, dark bg)
 *
 * Boot sequence (auto, ~6s total):
 *   BOOT  →  SCAN  →  REVEAL (face)  →  TITLE  →  GLITCH  →  ACTIVE (helmet)
 *
 * Hover (once ACTIVE):
 *   mouse over portrait → strips scatter → face shows through → mouse leave → helmet locks back
 */

import { useState, useEffect, useRef } from 'react'
import { m, AnimatePresence, useReducedMotion } from 'framer-motion'

// ── Photo paths ────────────────────────────────────────────────────────────────
const FACE_SRC   = '/lab/face.png'
const HELMET_SRC = '/lab/helmet.png'

// ── Motion tokens (Emil Kowalski) ─────────────────────────────────────────────
const EASE_OUT = [0.16, 1, 0.3, 1]
const EASE_IN  = [0.4, 0, 1, 1]
const SPRING   = { type: 'spring', stiffness: 380, damping: 28, mass: 0.5 }

// ── Boot phases ───────────────────────────────────────────────────────────────
const P = { BOOT: 0, SCAN: 1, REVEAL: 2, TITLE: 3, GLITCH: 4, ACTIVE: 5 }

// ── Glitch strips ─────────────────────────────────────────────────────────────
const STRIPS = 16

function makeOffsets() {
  return Array.from({ length: STRIPS }, (_, i) => {
    // Alternating directions so adjacent strips always create clear gaps
    const direction = i % 2 === 0 ? 1 : -1
    // More displacement in the middle, less at edges — but always large enough to reveal face
    const mid = Math.abs(i / STRIPS - 0.5) * 2
    const magnitude = 90 + mid * 130 + Math.random() * 60   // 90-280px
    return direction * magnitude
  })
}

// The portrait — face underneath, helmet split into animated strips on top
function GlitchPortrait({ phase, isHovered }) {
  const reduced   = useReducedMotion()
  const offsets   = useRef(makeOffsets())
  // Helmet is "assembled" (x=0) when phase>=GLITCH and not hovering
  const showHelmet = phase >= P.GLITCH && !isHovered

  if (reduced) {
    // Skip animation — show helmet static
    return (
      <img src={HELMET_SRC} alt="Andres Pisso"
        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
    )
  }

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      {/* FACE — always below, revealed when strips scatter */}
      <m.img
        src={FACE_SRC}
        alt="Andres Pisso"
        animate={{ opacity: phase >= P.REVEAL ? 1 : 0 }}
        transition={{ duration: 1.2, ease: EASE_OUT }}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center top',
        }}
      />

      {/* HELMET — split into horizontal strips, each springs to/from scattered position */}
      {phase >= P.GLITCH && Array.from({ length: STRIPS }).map((_, i) => {
        const stripPct = 100 / STRIPS
        // Stagger: strips near the scatter extreme move last (Emil: proportional delay)
        const delay = showHelmet
          ? (STRIPS - 1 - i) * 0.022        // assembling: top-first
          : i * 0.020                         // scattering: top-first
        return (
          <m.div
            key={i}
            animate={{ x: showHelmet ? 0 : offsets.current[i], opacity: showHelmet ? 1 : 0.55 }}
            transition={{ ...SPRING, delay }}
            style={{
              position: 'absolute', left: 0, right: 0,
              top: `${i * stripPct}%`,
              height: `${stripPct}%`,
              overflow: 'hidden',
              willChange: 'transform',
            }}
          >
            {/* Each strip shows the correct slice of the helmet image */}
            <img
              src={HELMET_SRC}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: `${-i * 100}%`,           // offset so correct portion shows
                left: 0, width: '100%',
                height: `${STRIPS * 100}%`,    // full image height across all strips
                objectFit: 'cover',
                objectPosition: 'center top',
                pointerEvents: 'none',
              }}
            />
          </m.div>
        )
      })}

      {/* Phase REVEAL→GLITCH: face visible, no helmet strips yet — handled by phase gate above */}
    </div>
  )
}

// ── HUD decoration ────────────────────────────────────────────────────────────

// Corner bracket — chamfer style matching the portfolio
function Corner({ pos }) {
  const SIZE = 24
  const T = 2
  const C = 'var(--color-accent)'
  const style = {
    position: 'absolute',
    width: SIZE, height: SIZE,
    ...(pos.includes('top')    ? { top: 0 }    : { bottom: 0 }),
    ...(pos.includes('left')   ? { left: 0 }   : { right: 0 }),
  }
  return (
    <div style={style}>
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
        {pos === 'top-left'     && <>
          <line x1="0" y1={T/2} x2={SIZE} y2={T/2} stroke={C} strokeWidth={T}/>
          <line x1={T/2} y1="0" x2={T/2} y2={SIZE} stroke={C} strokeWidth={T}/>
        </>}
        {pos === 'top-right'    && <>
          <line x1="0" y1={T/2} x2={SIZE} y2={T/2} stroke={C} strokeWidth={T}/>
          <line x1={SIZE-T/2} y1="0" x2={SIZE-T/2} y2={SIZE} stroke={C} strokeWidth={T}/>
        </>}
        {pos === 'bottom-left'  && <>
          <line x1="0" y1={SIZE-T/2} x2={SIZE} y2={SIZE-T/2} stroke={C} strokeWidth={T}/>
          <line x1={T/2} y1="0" x2={T/2} y2={SIZE} stroke={C} strokeWidth={T}/>
        </>}
        {pos === 'bottom-right' && <>
          <line x1="0" y1={SIZE-T/2} x2={SIZE} y2={SIZE-T/2} stroke={C} strokeWidth={T}/>
          <line x1={SIZE-T/2} y1="0" x2={SIZE-T/2} y2={SIZE} stroke={C} strokeWidth={T}/>
        </>}
      </svg>
    </div>
  )
}

// Circular scan SVG — animates in during SCAN phase
function ScanCircle({ phase }) {
  const R = 200
  const CIRC = 2 * Math.PI * R
  return (
    <m.svg
      width={R*2+4} height={R*2+4}
      viewBox={`0 0 ${R*2+4} ${R*2+4}`}
      animate={{ opacity: phase >= P.SCAN ? 0.18 : 0 }}
      transition={{ duration: 1, ease: EASE_OUT }}
      style={{ position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%,-50%)', pointerEvents: 'none' }}
    >
      {/* Static outer ring */}
      <circle cx={R+2} cy={R+2} r={R} stroke="var(--color-accent)"
        strokeWidth={1} fill="none" opacity={0.4}/>
      {/* Animated sweep */}
      <m.circle cx={R+2} cy={R+2} r={R}
        stroke="var(--color-accent)" strokeWidth={1.5} fill="none"
        strokeDasharray={CIRC}
        initial={{ strokeDashoffset: CIRC, rotate: -90 }}
        animate={phase >= P.SCAN
          ? { strokeDashoffset: 0, rotate: -90 }
          : { strokeDashoffset: CIRC, rotate: -90 }}
        transition={{ duration: 1.8, ease: EASE_OUT, delay: 0.3 }}
        style={{ transformOrigin: `${R+2}px ${R+2}px` }}
      />
      {/* Inner ring, counter-rotate */}
      <m.circle cx={R+2} cy={R+2} r={R * 0.72}
        stroke="var(--color-accent)" strokeWidth={0.5} fill="none"
        strokeDasharray="6 10"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${R+2}px ${R+2}px` }}
      />
    </m.svg>
  )
}

// Small pulsing status dot
function PulseDot({ active = true }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: 7, height: 7 }}>
      <m.span
        animate={active ? { scale: [1, 1.8, 1], opacity: [1, 0, 1] } : {}}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        style={{
          display: 'block', width: 7, height: 7, borderRadius: '50%',
          background: 'var(--color-accent)', position: 'absolute',
        }}
      />
    </span>
  )
}

// HUD label (mono uppercase)
function HudLabel({ children, dim, style }) {
  return (
    <div style={{
      fontFamily: "'Rajdhani', monospace",
      fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
      color: dim ? 'var(--color-fg-mute)' : 'var(--color-fg-dim)',
      lineHeight: 1.6, ...style,
    }}>
      {children}
    </div>
  )
}

// ── Title assembly ─────────────────────────────────────────────────────────────
// Each word enters from behind a mask, staggered
function TitleWord({ children, delay, accent }) {
  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.04em' }}>
      <m.span
        style={{
          display: 'inline-block',
          color: accent ? 'var(--color-accent)' : 'var(--color-fg)',
          willChange: 'transform',
        }}
        initial={{ y: '105%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      >
        {children}
      </m.span>
    </span>
  )
}

// ── HUD panel fade wrapper ─────────────────────────────────────────────────────
function HudPanel({ visible, delay = 0, style, children }) {
  return (
    <m.div
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 8 }}
      transition={{ duration: 0.6, ease: EASE_OUT, delay }}
      style={style}
    >
      {children}
    </m.div>
  )
}

// ── Main hero ──────────────────────────────────────────────────────────────────
export default function LabHero() {
  const [phase, setPhase]     = useState(P.BOOT)
  const [hovered, setHovered] = useState(false)
  const reduced = useReducedMotion()

  // Boot sequence — auto advance through phases
  useEffect(() => {
    if (reduced) { setPhase(P.ACTIVE); return }
    const ids = [
      setTimeout(() => setPhase(P.SCAN),   800),
      setTimeout(() => setPhase(P.REVEAL), 2000),
      setTimeout(() => setPhase(P.TITLE),  3400),
      setTimeout(() => setPhase(P.GLITCH), 5000),  // face→helmet auto-glitch
      setTimeout(() => setPhase(P.ACTIVE), 6400),  // helmet locked, hover enabled
    ]
    return () => ids.forEach(clearTimeout)
  }, [reduced])

  const hudVisible    = phase >= P.SCAN
  const titleVisible  = phase >= P.TITLE
  const isActive      = phase >= P.ACTIVE

  return (
    <section style={{
      position: 'relative',
      width: '100vw', height: '100vh',
      overflow: 'hidden',
      background: 'var(--color-bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>

      {/* ── Scan circle — behind portrait ── */}
      <ScanCircle phase={phase} />

      {/* ── Portrait container — centre-right like reference ── */}
      <div style={{
        position: 'absolute',
        // slightly right of center, vertically centred
        left: '50%', top: '50%',
        transform: 'translate(-18%, -50%)',
        width: 'clamp(260px, 28vw, 420px)',
        height: 'clamp(380px, 56vh, 660px)',
        zIndex: 5,
      }}>
        {/* Corner brackets on the portrait frame */}
        {['top-left','top-right','bottom-left','bottom-right'].map(pos => (
          <m.div key={pos}
            animate={{ opacity: phase >= P.REVEAL ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Corner pos={pos} />
          </m.div>
        ))}

        {/* The portrait itself — hover enabled once ACTIVE */}
        <div
          onMouseEnter={() => isActive && setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          style={{ width: '100%', height: '100%', overflow: 'hidden' }}
        >
          <GlitchPortrait phase={phase} isHovered={hovered} />
        </div>

        {/* Hover hint — appears once active */}
        <m.div
          animate={{ opacity: isActive && !hovered ? 0.5 : 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute', bottom: -24, left: 0, right: 0,
            textAlign: 'center',
            fontFamily: "'Rajdhani', monospace",
            fontSize: '9px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-fg-mute)',
          }}
        >
          hover to reveal
        </m.div>
      </div>

      {/* ── "HELLO, I'M ANDRES PISSO" — above portrait ── */}
      <HudPanel visible={phase >= P.REVEAL} delay={0.6} style={{
        position: 'absolute',
        left: '50%', transform: 'translateX(-18%)',
        top: 'calc(50% - clamp(200px, 30vh, 350px))',
        zIndex: 6,
      }}>
        <HudLabel style={{ color: 'var(--color-fg-dim)', letterSpacing: '0.3em' }}>
          Hello, I'm Andres Pisso
        </HudLabel>
      </HudPanel>

      {/* ── TITLE — bottom-centre, overlapping portrait ── */}
      {titleVisible && (
        <div style={{
          position: 'absolute',
          bottom: 'clamp(60px, 10vh, 120px)',
          left: 0, right: 0,
          textAlign: 'center',
          zIndex: 10,
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(2.8rem, 7.5vw, 8rem)',
          lineHeight: 0.88,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}>
          <div>
            <TitleWord delay={0.0}>Designing&nbsp;</TitleWord>
            <TitleWord delay={0.08}>experiences</TitleWord>
          </div>
          <div>
            <TitleWord delay={0.16} accent>that&nbsp;</TitleWord>
            <TitleWord delay={0.24}>matter</TitleWord>
          </div>
        </div>
      )}

      {/* ══════ HUD PANELS — all fade in during SCAN ══════ */}

      {/* ── Top-left: interface mode ── */}
      <HudPanel visible={hudVisible} delay={0.1} style={{
        position: 'absolute', top: 'clamp(24px,4vh,48px)', left: 'clamp(24px,3vw,48px)',
        zIndex: 10,
      }}>
        <HudLabel dim>// Interface_mode</HudLabel>
        <div style={{
          fontFamily: "'Rajdhani', monospace",
          fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--color-accent)', marginTop: 2,
          display: 'flex', alignItems: 'center', gap: 6,
        }}>
          <PulseDot />
          {phase >= P.ACTIVE ? 'HELMET MODE ACTIVE' : phase >= P.REVEAL ? 'SCANNING' : 'BOOT'}
        </div>
      </HudPanel>

      {/* ── Top-right: status ── */}
      <HudPanel visible={hudVisible} delay={0.15} style={{
        position: 'absolute', top: 'clamp(24px,4vh,48px)', right: 'clamp(24px,3vw,48px)',
        textAlign: 'right', zIndex: 10,
      }}>
        <HudLabel dim>Status</HudLabel>
        <div style={{
          fontFamily: "'Rajdhani', monospace",
          fontSize: '11px', letterSpacing: '0.18em', textTransform: 'uppercase',
          color: 'var(--color-accent)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6,
          marginTop: 2,
        }}>
          Online <PulseDot />
        </div>
        <div style={{
          marginTop: 8,
          fontFamily: "'Rajdhani', monospace",
          fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase',
          color: 'var(--color-fg-mute)',
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6,
        }}>
          <span style={{ color: phase >= P.ACTIVE ? 'var(--color-accent)' : 'inherit' }}>
            {phase >= P.ACTIVE ? '● Available for work' : '○ Initializing...'}
          </span>
        </div>
      </HudPanel>

      {/* ── Left: skills ── */}
      <HudPanel visible={hudVisible} delay={0.2} style={{
        position: 'absolute', left: 'clamp(24px,3vw,48px)', top: '50%',
        transform: 'translateY(-50%)', zIndex: 10,
      }}>
        {[
          ['01', 'UX / UI Design'],
          ['02', 'Game Design'],
          ['03', 'Product Design'],
        ].map(([num, label], i) => (
          <div key={num} style={{ marginBottom: i < 2 ? 20 : 0 }}>
            <div style={{
              fontFamily: "'Bebas Neue', sans-serif",
              fontSize: '1.1rem', color: 'var(--color-accent)', lineHeight: 1,
            }}>{num}</div>
            <div style={{
              fontFamily: "'Rajdhani', monospace",
              fontSize: '11px', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'var(--color-fg-dim)', marginTop: 2,
            }}>{label}</div>
          </div>
        ))}
      </HudPanel>

      {/* ── Right: info panel ── */}
      <HudPanel visible={hudVisible} delay={0.2} style={{
        position: 'absolute', right: 'clamp(24px,3vw,48px)', top: '50%',
        transform: 'translateY(-50%)', zIndex: 10,
        maxWidth: 180, textAlign: 'right',
      }}>
        <HudLabel style={{ color: 'var(--color-fg-dim)', marginBottom: 20 }}>
          I create intuitive<br/>
          interfaces, immersive<br/>
          games, and scalable<br/>
          products.
        </HudLabel>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14 }}>
          <HudLabel dim>Based in Earth</HudLabel>
          <HudLabel style={{ color: 'var(--color-fg-mute)', marginTop: 2 }}>
            Bogotá — Remote
          </HudLabel>
        </div>
        <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, marginTop: 14 }}>
          <HudLabel dim>Systems</HudLabel>
          <div style={{
            fontFamily: "'Rajdhani', monospace",
            fontSize: '10px', letterSpacing: '0.16em',
            color: 'var(--color-accent)', marginTop: 2,
            display: 'flex', justifyContent: 'flex-end', gap: 3,
          }}>
            {Array.from({length: 7}).map((_, i) => (
              <m.span
                key={i}
                animate={{ scaleY: [0.4, 1, 0.4] }}
                transition={{ duration: 0.8 + i * 0.1, repeat: Infinity, delay: i * 0.12 }}
                style={{ display: 'inline-block', width: 3, height: 14, background: 'var(--color-accent)', transformOrigin: 'bottom' }}
              />
            ))}
          </div>
          <HudLabel dim style={{ marginTop: 2 }}>All green</HudLabel>
        </div>
      </HudPanel>

      {/* ── Bottom-centre: scroll cue ── */}
      <HudPanel visible={phase >= P.ACTIVE} delay={0.5} style={{
        position: 'absolute', bottom: 'clamp(14px,2.5vh,28px)',
        left: 0, right: 0, textAlign: 'center', zIndex: 10,
      }}>
        <m.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            fontFamily: "'Rajdhani', monospace",
            fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-fg-mute)',
          }}
        >
          ↓ Scroll to explore
        </m.div>
      </HudPanel>

      {/* ── Global corner brackets on viewport ── */}
      {['top-left','top-right','bottom-left','bottom-right'].map(pos => (
        <m.div
          key={`vp-${pos}`}
          animate={{ opacity: hudVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            position: 'absolute', zIndex: 2,
            ...(pos.includes('top')    ? { top: 12 }    : { bottom: 12 }),
            ...(pos.includes('left')   ? { left: 12 }   : { right: 12 }),
          }}
        >
          <Corner pos={pos} />
        </m.div>
      ))}

    </section>
  )
}
