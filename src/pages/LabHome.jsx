/**
 * LabHome — ISOLATED PROTOTYPE  /lab
 *
 * Beat 1 — line-mask text reveal
 * Beat 2 — Robin Noguier scroll-driven showcase
 *   · full-width image stack, text overlay left
 *   · rotateX + rotateY (cards tilt back into screen, not diagonal-Z)
 *   · background color per case transitions smoothly
 *   · named sidebar nav — dots at rest, names on hover (fast 120ms)
 *   · spring per card (Emil: stiffness 300, damping 30, mass 0.5)
 * Beat 3 — CTA closer
 */

import { useRef, useState, useCallback } from 'react'
import LabHero from './LabHero'
import {
  m,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion'
import { Link } from 'react-router-dom'
import { cases, CASE_ORDER } from '../data/cases'

// ── Motion tokens (Emil Kowalski) ─────────────────────────────────────────────
const SPRING   = { type: 'spring', stiffness: 300, damping: 30, mass: 0.5 }
const EASE_OUT = [0.16, 1, 0.3, 1]
const EASE_IN  = [0.4, 0, 1, 1]

// ── Data ──────────────────────────────────────────────────────────────────────
// Subtle dark bg tint per case — keeps dark identity, adds per-case color
const CASE_BG = {
  'star-wars-roguelike-one':       '#0c0a14',
  'orcs-must-die-by-the-blade':    '#0f0b09',
  'zombie-dragon-adventure':        '#080f09',
  'raptor-heist':                   '#100a0a',
  'courtyard-king':                 '#090c0f',
  'zomvilles':                      '#0b0f0a',
}

const ORDERED = CASE_ORDER
  .map(slug => cases.find(c => c.slug === slug))
  .filter(Boolean)
  .slice(0, 6)

// ── Stack geometry ────────────────────────────────────────────────────────────
// Each card lives at a y-offset from centre. The active card is at 0.
// rotateX + rotateY stays constant (the physical tilt) — only y/scale/opacity animate.
function stackTarget(offset) {
  const abs  = Math.abs(offset)
  const sign = Math.sign(offset) || 1
  return {
    y:       offset === 0 ? 0   : sign * (abs === 1 ? 260 : abs === 2 ? 450 : 580),
    scale:   abs === 0   ? 1    : abs === 1 ? 0.75 : abs === 2 ? 0.57 : 0.42,
    opacity: abs === 0   ? 1    : abs === 1 ? 0.32 : abs === 2 ? 0.12 : 0,
    zIndex:  20 - abs,
  }
}

// ── Beat 2 — Showcase ─────────────────────────────────────────────────────────

// Single card — position driven by spring, base 3D tilt is CSS (no animation)
function StackCard({ caseData, offset }) {
  const t = stackTarget(offset)
  const isActive = offset === 0

  return (
    <m.div
      animate={{ y: t.y, scale: t.scale, opacity: t.opacity, zIndex: t.zIndex }}
      transition={SPRING}
      style={{
        position: 'absolute',
        width: 'clamp(420px, 58vw, 900px)',
        aspectRatio: '16/10',
        overflow: 'hidden',
        willChange: 'transform, opacity',
        // The physical tilt: top tilts away (rotateX), right side tilts back (rotateY)
        // rotateZ: tiny clockwise roll for the slight diagonal feel
        transform: 'perspective(1200px) rotateX(-7deg) rotateY(9deg) rotateZ(1.5deg)',
        boxShadow: isActive
          ? '0 60px 140px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.06)'
          : '0 20px 60px rgba(0,0,0,0.6)',
        // desaturation on non-active (CSS transition, not spring — avoids jitter)
        filter: isActive ? 'saturate(1) brightness(1)' : 'saturate(0) brightness(0.5)',
        transition: 'filter 0.5s ease, box-shadow 0.5s ease',
      }}
    >
      <img
        src={`/thumbnails/${caseData.slug}.jpg`}
        alt={caseData.title}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
      />
      {/* accent line top edge on active */}
      {isActive && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0,
          height: 2, background: 'var(--color-accent)',
        }} />
      )}
    </m.div>
  )
}

// Sidebar nav — dots at rest, labels appear on hover (120ms — intentionally fast)
function SideNav({ active, cases: list, onHover }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      style={{
        position: 'fixed', right: 28, top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex', flexDirection: 'column',
        alignItems: 'flex-end', gap: 14,
      }}
    >
      {list.map((c, i) => {
        const isActive = i === active
        return (
          <div
            key={c.slug}
            onMouseEnter={() => onHover(i)}
            style={{
              display: 'flex', alignItems: 'center', gap: 10,
              cursor: 'pointer',
            }}
          >
            {/* label — visible only when expanded */}
            <m.span
              animate={{ opacity: expanded ? 1 : 0, x: expanded ? 0 : 8 }}
              transition={{ duration: 0.12, ease: EASE_OUT }} // fast, intentional
              style={{
                fontFamily: "'Rajdhani', monospace",
                fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
                color: isActive ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                fontWeight: isActive ? 500 : 400,
                whiteSpace: 'nowrap',
                pointerEvents: 'none',
              }}
            >
              {c.title.split(':')[0].trim()}
            </m.span>

            {/* dot */}
            <m.div
              animate={{
                scale:            isActive ? 1.6 : 1,
                backgroundColor: isActive ? 'var(--color-accent)' : 'rgba(255,255,255,0.3)',
              }}
              transition={SPRING}
              style={{ width: 5, height: 5, borderRadius: '50%', flexShrink: 0 }}
            />
          </div>
        )
      })}
    </div>
  )
}

function CaseShowcase() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', v => {
    setActive(Math.min(Math.floor(v * ORDERED.length), ORDERED.length - 1))
  })

  const c = ORDERED[active]
  const bgColor = CASE_BG[c.slug] || '#080808'

  // Nav hover jumps to that case visually (preview only — scroll stays)
  const handleNavHover = useCallback(() => {}, [])

  return (
    <section
      ref={sectionRef}
      style={{ height: `${ORDERED.length * 100}vh`, position: 'relative' }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh', overflow: 'hidden',
      }}>
        {/* ── Background colour per case ── */}
        <m.div
          key={bgColor}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: EASE_OUT }}
          style={{
            position: 'absolute', inset: 0,
            background: bgColor,
            zIndex: 0,
          }}
        />

        {/* ── Image stack — centred right ── */}
        <div style={{
          position: 'absolute',
          // offset toward the right side like Robin's layout
          right: '5vw', top: 0, bottom: 0,
          width: '65vw',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          zIndex: 1,
          // parent perspective so all cards share one vanishing point
          perspective: '1200px',
          perspectiveOrigin: '40% 50%',
        }}>
          {ORDERED.map((item, i) => (
            <StackCard key={item.slug} caseData={item} offset={i - active} />
          ))}
        </div>

        {/* ── Left text overlay ── */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0,
          width: 'clamp(280px, 38vw, 560px)',
          padding: 'clamp(40px, 6vw, 100px)',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          zIndex: 10,
          // subtle left-side gradient so text is always readable
          background: `linear-gradient(to right, ${bgColor}f2 60%, transparent)`,
        }}>
          {/* counter */}
          <div style={{
            fontFamily: "'Rajdhani', monospace",
            fontSize: '10px', letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--color-fg-mute)', marginBottom: 24,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <span style={{ color: 'var(--color-accent)', opacity: 0.6 }}>// </span>
            <span>
              <span style={{ color: 'var(--color-accent)' }}>
                {String(active + 1).padStart(2, '0')}
              </span>
              <span style={{ color: 'var(--color-fg-mute)' }}>
                /{String(ORDERED.length).padStart(2, '0')}
              </span>
            </span>
          </div>

          {/* animated text block */}
          <AnimatePresence mode="wait">
            <m.div
              key={c.slug}
              initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0,  filter: 'blur(0px)' }}
              exit={{    opacity: 0, y: -16, filter: 'blur(6px)',
                transition: { duration: 0.22, ease: EASE_IN } }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <h2 style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(2rem, 4.5vw, 4.4rem)',
                lineHeight: 0.9, textTransform: 'uppercase',
                color: 'var(--color-fg)', margin: '0 0 16px',
              }}>
                {c.title}
              </h2>

              <p style={{
                fontFamily: "'Rajdhani', monospace",
                fontSize: 'clamp(11px, 1vw, 13px)', lineHeight: 1.75,
                color: 'var(--color-fg-dim)', maxWidth: '40ch', marginBottom: 28,
              }}>
                {c.headline || c.description?.slice(0, 120) + '…'}
              </p>

              <Link
                to={`/case/${c.slug}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'Rajdhani', monospace",
                  fontSize: '11px', letterSpacing: '0.16em', textTransform: 'uppercase',
                  color: 'var(--color-fg-dim)',
                  textDecoration: 'none',
                }}
              >
                <span style={{
                  display: 'inline-block',
                  width: 28, height: 1,
                  background: 'var(--color-accent)',
                  flexShrink: 0,
                }} />
                Open case study
              </Link>
            </m.div>
          </AnimatePresence>

          {/* scroll hint */}
          <m.div
            animate={{ opacity: active === ORDERED.length - 1 ? 0 : 0.5 }}
            transition={{ duration: 0.4 }}
            style={{
              marginTop: 'auto', paddingTop: 32,
              fontFamily: "'Rajdhani', monospace",
              fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
              color: 'var(--color-fg-mute)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <m.span
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ display: 'inline-block' }}
            >↓</m.span>
            Scroll
          </m.div>
        </div>

        {/* ── Sidebar nav ── */}
        <SideNav active={active} cases={ORDERED} onHover={handleNavHover} />
      </div>
    </section>
  )
}

// ── Beat 3 — CTA closer ───────────────────────────────────────────────────────
function CtaCloser() {
  return (
    <section style={{
      minHeight: '80vh',
      display: 'flex', flexDirection: 'column', justifyContent: 'center',
      padding: 'clamp(24px, 6vw, 96px)',
      borderTop: '1px solid var(--border)',
    }}>
      <m.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-20%' }}
        transition={{ duration: 0.8, ease: EASE_OUT }}
        style={{
          fontFamily: "'Bebas Neue', sans-serif",
          fontSize: 'clamp(2.4rem, 7vw, 7rem)',
          lineHeight: 0.95, textTransform: 'uppercase',
          color: 'var(--color-fg)', maxWidth: '16ch', margin: 0,
        }}
      >
        Let's make the interface
        <span style={{ color: 'var(--color-accent)' }}> disappear.</span>
      </m.h2>

      <m.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}
      >
        <a
          href="mailto:afp.fenrir@gmail.com"
          style={{
            fontFamily: "'Rajdhani', monospace",
            fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--color-bg)', background: 'var(--color-accent)',
            padding: '14px 28px', textDecoration: 'none',
          }}
        >
          Start a conversation →
        </a>
        <Link
          to="/"
          style={{
            fontFamily: "'Rajdhani', monospace",
            fontSize: '12px', letterSpacing: '0.16em', textTransform: 'uppercase',
            color: 'var(--color-fg-dim)', border: '1px solid var(--border)',
            padding: '14px 28px', textDecoration: 'none',
          }}
        >
          ← Back to current site
        </Link>
      </m.div>
    </section>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function LabHome() {
  return (
    <div style={{ background: 'var(--color-bg)', position: 'relative', zIndex: 1 }}>
      <LabHero />
      <CaseShowcase />
      <CtaCloser />
    </div>
  )
}
