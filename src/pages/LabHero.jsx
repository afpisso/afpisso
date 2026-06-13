/**
 * LabHero v3
 *
 * ASSETS — drop into /public/lab/ before testing:
 *   face.png          → portrait, white/transparent bg, red-lit
 *   face-helmet.png   → face + holographic red helmet overlay (semi-transparent bg)
 *   helmet.png        → full dark helmet, no face visible
 *
 * Interactions:
 *   Boot: BOOT → SCAN → REVEAL (face) → TITLE → ACTIVE
 *   Portrait: three-layer spotlight reveal driven by mouse proximity
 *     · Layer 0 (base):   face.png — always visible
 *     · Layer 1 (mid):    face-helmet.png — radial mask, ~200px radius, follows mouse
 *     · Layer 2 (top):    helmet.png — tight spotlight, ~90px radius, follows cursor exactly
 *   All mask radii spring-animated; no clip-path layout reflow.
 *
 * Background: canvas — particle drift + scanline sweep + dot grid + mouse parallax
 */

import { useState, useEffect, useRef, useCallback } from 'react'
import { m, useReducedMotion, useSpring, useTransform, useMotionValue, animate } from 'framer-motion'
import { useScramble } from '../hooks/useScramble'

// Scroll progress for hero section: 0 at top, 1 when fully scrolled past
function useHeroScrollProgress(ref) {
  const progress = useMotionValue(0)
  useEffect(() => {
    const update = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const p = Math.min(Math.max(-rect.top / rect.height, 0), 1)
      progress.set(p)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [ref, progress])
  return progress
}
import GeometryGrid from '../components/GeometryGrid'
import { useLang } from '../contexts/LangContext'
import CyberBtn from '../components/CyberBtn'

// ── Asset paths ────────────────────────────────────────────────────────────────
const FACE_SRC        = '/lab/face.webp'
const FACE_HELMET_SRC = '/lab/face-helmet.webp'
const HELMET_SRC      = '/lab/helmet.webp'

// ── Motion tokens ──────────────────────────────────────────────────────────────
const EASE_OUT     = [0.16, 1, 0.3, 1]
const EASE_OUT_EXP = [0.19, 1, 0.22, 1]   // expo-style, Emil's preferred enter curve

// ── Boot phases ────────────────────────────────────────────────────────────────
const P = { BOOT: 0, SCAN: 1, REVEAL: 2, TITLE: 3, ACTIVE: 4 }

// ── Terminal boot lines ────────────────────────────────────────────────────────
const BOOT_LINES = [
  'BYANDRESFE.SYS v2.6 — ONLINE',
  'LOADING: game ux/ui systems...',
  'SIGNAL: READY.',
]

function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([])
  const [done, setDone]   = useState(false)

  const skip = () => {
    setDone(true)
    sessionStorage.setItem('booted', '1')
    setTimeout(onComplete, 300)
  }

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      setLines(prev => [...prev, BOOT_LINES[i]])
      i++
      if (i >= BOOT_LINES.length) {
        clearInterval(interval)
        setTimeout(() => {
          setDone(true)
          sessionStorage.setItem('booted', '1')
          setTimeout(onComplete, 400)
        }, 150)
      }
    }, 150)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <m.div
      role="status"
      aria-label="System initializing"
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        backgroundColor: 'var(--color-bg)',
        pointerEvents: done ? 'none' : 'auto',
      }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div style={{ width: '100%', maxWidth: 360, padding: '0 32px' }}>
        {/* Logo mark */}
        <div style={{
          width: 56, height: 56, margin: '0 auto 24px',
          border: '1px solid rgba(255,255,255,0.12)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <img
            src="/logo-mark.png"
            alt=""
            aria-hidden="true"
            width="56"
            height="56"
            style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 8 }}
            onError={e => {
              e.currentTarget.style.display = 'none'
              e.currentTarget.nextElementSibling.style.display = 'flex'
            }}
          />
          <div aria-hidden="true" style={{ display: 'none', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="28" height="28" viewBox="0 0 30 30" fill="none">
              <path fillRule="evenodd" clipRule="evenodd"
                d="M15 1 L30 29 L24 29 L21 22.5 H9 L6 29 L0 29 L15 1 Z M15 8 L20 22 H10 Z"
                fill="white"
              />
              <rect x="8.5" y="20" width="13" height="3" fill="#ff2540" />
            </svg>
          </div>
        </div>

        {/* Terminal lines */}
        <div aria-live="polite" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span aria-hidden="true" style={{ color: 'var(--color-accent)', fontSize: 10, fontFamily: "'Play', sans-serif" }}>{'>'}</span>
              <span style={{
                color: i === lines.length - 1 ? 'var(--color-fg)' : 'rgba(240,238,234,0.45)',
                fontSize: 12, fontFamily: "'Play', sans-serif", letterSpacing: '0.08em',
              }}>
                {line}
              </span>
            </div>
          ))}
        </div>

        {/* Skip button */}
        {!done && (
          <m.button
            onClick={skip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            style={{
              marginTop: 28, display: 'block', marginLeft: 'auto',
              fontFamily: "'Play', sans-serif", fontSize: 10,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: 'rgba(240,238,234,0.4)',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '6px 14px', cursor: 'pointer',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(240,238,234,0.4)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
            aria-label="Skip intro animation"
          >
            Skip →
          </m.button>
        )}
      </div>
    </m.div>
  )
}

// ── Scramble chars ────────────────────────────────────────────────────────────
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&'

// ── Discipline data for arc gauges ───────────────────────────────────────────
const SKILL_DATA = [
  { value: 0.92, tag: 'LEAD · UX',    metric: '11Y' },
  { value: 0.78, tag: 'SENIOR · GX',  metric: '8Y'  },
  { value: 0.84, tag: 'DIRECTOR · PD', metric: '9Y' },
]

// ══════════════════════════════════════════════════════════════════════════════
// SCRAMBLE LABEL — characters shuffle before settling on the real text
// ══════════════════════════════════════════════════════════════════════════════

function ScrambleLabel({ text, active, style: s, className }) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!active) { setDisplay(text); return }
    let step = 0
    const total = 26   // frames to run scramble
    const run = () => {
      step++
      setDisplay(
        text.split('').map((ch, i) => {
          if (ch === ' ') return ' '
          // characters resolve left-to-right as frames progress
          const resolved = step / total > i / text.length
          return resolved ? ch : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
        }).join('')
      )
      if (step < total) frameRef.current = requestAnimationFrame(run)
      else setDisplay(text)
    }
    // Small initial delay so it fires after mount transition
    const t = setTimeout(() => { frameRef.current = requestAnimationFrame(run) }, 80)
    return () => { clearTimeout(t); cancelAnimationFrame(frameRef.current) }
  }, [active, text])

  return <span style={s} className={className}>{display}</span>
}

// ══════════════════════════════════════════════════════════════════════════════
// TICK COUNTER — number increments from 00 to target
// ══════════════════════════════════════════════════════════════════════════════

function TickCounter({ target, active, style: s }) {
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!active) return
    let cur = 0
    const step = () => {
      cur++
      setVal(cur)
      if (cur < target) setTimeout(step, 55 + Math.random() * 30)
    }
    const t = setTimeout(step, 200)
    return () => clearTimeout(t)
  }, [active, target])

  return (
    <span style={s}>{String(val).padStart(2, '0')}</span>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// DYNAMIC BACKGROUND CANVAS
// ══════════════════════════════════════════════════════════════════════════════

function DynamicBackground({ phase, mouseX, mouseY, mobile = false }) {
  const canvasRef  = useRef(null)
  const rafRef     = useRef(null)
  const stateRef   = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    const resize = () => {
      canvas.width  = document.documentElement.clientWidth || window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    // ── Particles ──────────────────────────────────────────────────────────
    const N = mobile ? 28 : 55
    const particles = Array.from({ length: N }, () => ({
      x:  Math.random() * window.innerWidth,
      y:  Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 0.18,
      vy: (Math.random() - 0.5) * 0.18,
      r:  Math.random() * 1.2 + 0.3,
      a:  Math.random() * 0.35 + 0.05,
    }))

    // ── Scanline state ─────────────────────────────────────────────────────
    let scanY      = -60
    let scanDir    = 1
    let scanPause  = 0

    stateRef.current = { scanY, scanDir, scanPause }

    let t = 0

    const draw = () => {
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)

      const mx = mouseX.get()
      const my = mouseY.get()
      const paralFactor = phase >= P.ACTIVE ? 1 : 0.3

      // ── Dot grid ────────────────────────────────────────────────────────
      const GRID = 42
      ctx.fillStyle = mobile ? 'rgba(255,37,64,0.028)' : 'rgba(255,37,64,0.06)'
      for (let gx = 0; gx < W; gx += GRID) {
        for (let gy = 0; gy < H; gy += GRID) {
          // subtle parallax: dots drift toward mouse
          const ox = (mx / W - 0.5) * 6 * paralFactor
          const oy = (my / H - 0.5) * 6 * paralFactor
          const dist = Math.hypot(gx + ox - mx, gy + oy - my)
          const proximity = Math.max(0, 1 - dist / 340)
          const radius = 1.1 + proximity * 1.8
          ctx.globalAlpha = mobile ? 0.035 + proximity * 0.09 : 0.06 + proximity * 0.22
          ctx.beginPath()
          ctx.arc(gx + ox, gy + oy, radius, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      ctx.globalAlpha = 1

      // ── Particles ───────────────────────────────────────────────────────
      particles.forEach(p => {
        // mouse attraction (very soft)
        const dx = mx - p.x, dy = my - p.y
        const d  = Math.hypot(dx, dy)
        if (d < 220 && phase >= P.ACTIVE) {
          p.vx += (dx / d) * 0.004
          p.vy += (dy / d) * 0.004
        }
        // friction
        p.vx *= 0.994; p.vy *= 0.994
        p.x  += p.vx;  p.y  += p.vy
        // wrap
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0

        // proximity glow
        const pdist = Math.hypot(p.x - mx, p.y - my)
        const pglow = phase >= P.ACTIVE ? Math.max(0, 1 - pdist / 200) : 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r + pglow * 1.6, 0, Math.PI * 2)
        const alphaScale = mobile ? 0.45 : 1
        ctx.fillStyle = `rgba(255,37,64,${(p.a + pglow * 0.5) * alphaScale})`
        ctx.fill()
      })

      // ── Draw connection lines between nearby particles ───────────────────
      ctx.strokeStyle = mobile ? 'rgba(255,37,64,0.018)' : 'rgba(255,37,64,0.04)'
      ctx.lineWidth = 0.5
      for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
          const d = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (d < 90) {
            ctx.globalAlpha = (1 - d / 90) * 0.18
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
      ctx.globalAlpha = 1

      // ── Scanline sweep ──────────────────────────────────────────────────
      if (phase >= P.SCAN) {
        const s  = stateRef.current
        s.scanY += s.scanDir * 1.4
        if (s.scanY > H + 60) { s.scanDir = -1 }
        if (s.scanY < -60)    { s.scanDir =  1 }

        // The sweep line
        const grad = ctx.createLinearGradient(0, s.scanY - 40, 0, s.scanY + 40)
        grad.addColorStop(0, 'rgba(255,37,64,0)')
        grad.addColorStop(0.5, 'rgba(255,37,64,0.06)')
        grad.addColorStop(1, 'rgba(255,37,64,0)')
        ctx.fillStyle = grad
        ctx.fillRect(0, s.scanY - 40, W, 80)

        // Hard accent line
        ctx.strokeStyle = 'rgba(255,37,64,0.14)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(0, s.scanY)
        ctx.lineTo(W, s.scanY)
        ctx.stroke()
      }

      // ── Radial vignette from mouse position ─────────────────────────────
      if (phase >= P.ACTIVE) {
        const vg = ctx.createRadialGradient(mx, my, 0, mx, my, Math.max(W, H) * 0.7)
        vg.addColorStop(0, 'rgba(255,37,64,0.03)')
        vg.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = vg
        ctx.fillRect(0, 0, W, H)
      }

      t++
      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(rafRef.current)
    }
  }, [phase, mobile])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0, zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// SPOTLIGHT PORTRAIT
// Three image layers; helmet layers revealed by mouse-proximity radial mask.
// mask-image uses radial-gradient → compositor-only, no layout reflow.
// ══════════════════════════════════════════════════════════════════════════════

function SpotlightPortrait({ phase }) {
  const reduced      = useReducedMotion()
  const containerRef = useRef(null)

  // Mouse-driven position + radii
  const springCfg = { stiffness: 160, damping: 22, mass: 0.6 }
  const smoothX = useSpring(useMotionValue(-200), springCfg)
  const smoothY = useSpring(useMotionValue(-200), springCfg)
  const outerR  = useSpring(useMotionValue(0), { stiffness: 90,  damping: 18, mass: 0.8 })
  const innerR  = useSpring(useMotionValue(0), { stiffness: 140, damping: 22, mass: 0.5 })

  // Auto-sweep — slow horizontal band that scans top→bottom as a tease
  const sweepY = useMotionValue(-300)
  const sweepMask = useTransform(sweepY, y =>
    `linear-gradient(to bottom, transparent ${y - 130}px, black ${y - 28}px, black ${y + 28}px, transparent ${y + 130}px)`
  )

  useEffect(() => {
    if (phase < P.ACTIVE || reduced) return
    const run = () => {
      const h = containerRef.current?.getBoundingClientRect().height ?? 600
      sweepY.set(-160)
      animate(sweepY, h + 160, {
        duration: 3.8,
        ease: [0.25, 0.1, 0.25, 1],   // slow-in slow-out, deliberate
        onComplete: () => sweepY.set(-300),
      })
    }
    const t0 = setTimeout(run, 1200)
    const id = setInterval(run, 10000)
    return () => { clearTimeout(t0); clearInterval(id) }
  }, [phase, reduced])

  // Mouse mask strings
  const midMask = useTransform(
    [smoothX, smoothY, outerR],
    ([x, y, r]) => `radial-gradient(circle ${r}px at ${x}px ${y}px, black 60%, transparent 100%)`
  )
  const topMask = useTransform(
    [smoothX, smoothY, innerR],
    ([x, y, r]) => `radial-gradient(circle ${r}px at ${x}px ${y}px, black 40%, transparent 100%)`
  )

  // Cursor dot position

  const firstMoveRef = useRef(true)

  const handleMouseMove = useCallback((e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    if (firstMoveRef.current) {
      smoothX.jump(x); smoothY.jump(y)
      firstMoveRef.current = false
    } else {
      smoothX.set(x); smoothY.set(y)
    }
    const cx = rect.width / 2, cy = rect.height / 2
    const proximity = Math.max(0, 1 - Math.hypot(x - cx, y - cy) / Math.hypot(cx, cy))
    outerR.set(120 + proximity * 110)
    innerR.set(50  + proximity * 65)
  }, [smoothX, smoothY, outerR, innerR])

  const handleMouseLeave = useCallback(() => {
    outerR.set(0); innerR.set(0)
    // position stays at last cursor location so the mask collapses in-place
    firstMoveRef.current = true
  }, [outerR, innerR])

  // Shared base — all layers fill the container identically
  const imgBase = {
    position: 'absolute', inset: 0,
    width: '100%', height: '100%',
    objectFit: 'cover',
  }
  // helmet.png: head is in the upper portion of the image
  const imgStyle      = { ...imgBase, objectPosition: 'center top' }
  // face.png / face-helmet.png: face is lower in the canvas; 'center bottom'
  // shifts the image up so the face aligns with the helmet head position.
  // Percentage locks crop point stably across viewport sizes; tune if needed
  const FACE_POS      = 'center 75%'
  const imgFaceStyle  = { ...imgBase, objectPosition: FACE_POS }

  if (reduced) {
    return <img src={HELMET_SRC} alt="Andres Pisso" style={imgStyle} />
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ position: 'relative', width: '100%', height: '100%', cursor: 'none', overflow: 'hidden' }}
    >
      {/* Glow pulse — contained within the portrait bounds */}
      <m.div
        animate={phase >= P.REVEAL ? {
          opacity: [0.35, 0.75, 0.35],
          scale:   [1, 1.08, 1],
        } : { opacity: 0 }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
        style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse 80% 60% at 50% 65%, rgba(255,37,64,0.5) 0%, rgba(255,37,64,0.08) 55%, transparent 80%)',
          pointerEvents: 'none', willChange: 'transform, opacity',
          zIndex: 0,
        }}
      />

      {/* Layer 0 — Helmet (base, always visible after REVEAL) */}
      <m.img src={HELMET_SRC} alt="Andres Pisso"
        animate={{ opacity: phase >= P.REVEAL ? 1 : 0 }}
        transition={{ duration: 1.4, ease: EASE_OUT }}
        style={{ ...imgStyle, willChange: 'opacity', zIndex: 1 }}
      />

      {/* Layer 1a — Holographic overlay at cursor (mid radius) */}
      {phase >= P.REVEAL && (
        <m.img src={FACE_HELMET_SRC} alt="" aria-hidden
          onError={e => { e.currentTarget.style.display = 'none' }}
          style={{ ...imgFaceStyle, maskImage: midMask, WebkitMaskImage: midMask, zIndex: 2 }}
        />
      )}

      {/* Layer 1b — Holographic face-helmet, auto sweep teaser band */}
      {phase >= P.ACTIVE && (
        <m.img src={FACE_HELMET_SRC} alt="" aria-hidden
          onError={e => { e.currentTarget.style.display = 'none' }}
          style={{ ...imgFaceStyle, maskImage: sweepMask, WebkitMaskImage: sweepMask, zIndex: 3 }}
        />
      )}

      {/* Layer 2 — Face tight spotlight at cursor */}
      {phase >= P.ACTIVE && (
        <m.img src={FACE_SRC} alt="" aria-hidden
          style={{ ...imgFaceStyle, maskImage: topMask, WebkitMaskImage: topMask, zIndex: 4 }}
        />
      )}

    </div>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// REUSABLE HUD PRIMITIVES
// ══════════════════════════════════════════════════════════════════════════════

function Corner({ pos, size = 20, color = 'var(--color-accent)', thickness = 1.5 }) {
  const S = size, T = thickness
  const style = {
    position: 'absolute', width: S, height: S,
    ...(pos.includes('top')   ? { top: 0 }    : { bottom: 0 }),
    ...(pos.includes('left')  ? { left: 0 }   : { right: 0 }),
  }
  return (
    <div style={style}>
      <svg width={S} height={S} viewBox={`0 0 ${S} ${S}`} fill="none">
        {pos === 'top-left'     && <><line x1="0" y1={T/2} x2={S} y2={T/2} stroke={color} strokeWidth={T}/><line x1={T/2} y1="0" x2={T/2} y2={S} stroke={color} strokeWidth={T}/></>}
        {pos === 'top-right'    && <><line x1="0" y1={T/2} x2={S} y2={T/2} stroke={color} strokeWidth={T}/><line x1={S-T/2} y1="0" x2={S-T/2} y2={S} stroke={color} strokeWidth={T}/></>}
        {pos === 'bottom-left'  && <><line x1="0" y1={S-T/2} x2={S} y2={S-T/2} stroke={color} strokeWidth={T}/><line x1={T/2} y1="0" x2={T/2} y2={S} stroke={color} strokeWidth={T}/></>}
        {pos === 'bottom-right' && <><line x1="0" y1={S-T/2} x2={S} y2={S-T/2} stroke={color} strokeWidth={T}/><line x1={S-T/2} y1="0" x2={S-T/2} y2={S} stroke={color} strokeWidth={T}/></>}
      </svg>
    </div>
  )
}

// ── SvgRings — SVG ring assets, colored with accent, rotating at different speeds
// Emil rules applied:
//   props-transform-opacity  → only rotate (transform) + opacity animated; blend-mode static
//   props-will-change        → willChange:'transform' on every rotating element
//   polish-stagger-children  → each ring staggered +200ms on reveal entrance
//   polish-blur-bridge       → blur(0.8px) static, softens hard SVG edges
//   strategy-marketing-exception → long durations (35–80s) ok for hero of infrequent visits
//   polish-reduced-motion    → rotation paused if reduced; rings still visible (opacity only)
// Sizes tied to portrait width (clamp 260-420px) × factor — rings scale with portrait, not viewport
// Five rings — largest to smallest, alternating CW/CCW, staggered enter
// Sizes relative to portrait width (clamp 260-420px) to scale coherently across viewports
const RING_SIZE = 'clamp(460px,50vw,700px)'
const RING_CFG = [
  { src: '/lab/ring1.svg', size: RING_SIZE, duration: 90, dir:  1, opacity: 0.22, enterDelay: 0.0 },
  { src: '/lab/ring4.svg', size: RING_SIZE, duration: 68, dir: -1, opacity: 0.26, enterDelay: 0.2 },
  { src: '/lab/ring2.svg', size: RING_SIZE, duration: 48, dir:  1, opacity: 0.30, enterDelay: 0.35 },
  { src: '/lab/ring3.svg', size: RING_SIZE, duration: 30, dir: -1, opacity: 0.24, enterDelay: 0.5 },
  { src: '/lab/ring5.svg', size: RING_SIZE, duration: 20, dir:  1, opacity: 0.18, enterDelay: 0.65 },
]

function SvgRings({ phase, parallaxX, parallaxY, reduced }) {
  const visible = phase >= P.SCAN
  const px = useTransform(parallaxX, v => v * 0.45)
  const py = useTransform(parallaxY, v => v * 0.45)

  return (
    <>
      {/* CSS keyframes injected once — most reliable infinite rotation */}
      <style>{`
        @keyframes ring-cw  { from { transform: rotate(0deg) } to { transform: rotate(360deg) } }
        @keyframes ring-ccw { from { transform: rotate(0deg) } to { transform: rotate(-360deg) } }
      `}</style>

      <div style={{
        position: 'absolute', left: '50%', top: '52%',
        transform: 'translate(-50%, -50%)',
        zIndex: 3, pointerEvents: 'none',
      }}>
        <m.div style={{ x: px, y: py }}>
          {RING_CFG.map(({ src, size, duration, dir, opacity, enterDelay }, i) => (
            <div key={i} style={{
              position: 'absolute',
              width: size, height: size,
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
            }}>
              {/* FM handles entrance only (opacity + scale) */}
              <m.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={visible ? { opacity, scale: 1 } : { opacity: 0, scale: 0.94 }}
                transition={{ duration: 1.4, ease: EASE_OUT, delay: enterDelay }}
                style={{ width: '100%', height: '100%' }}
              >
                {/* CSS animation handles rotation — immune to FM reconciliation issues */}
                <div style={{
                  width: '100%', height: '100%',
                  animation: reduced
                    ? 'none'
                    : `${dir > 0 ? 'ring-cw' : 'ring-ccw'} ${duration}s linear infinite`,
                  willChange: 'transform',
                  filter: 'blur(0.8px)',
                  maskImage: `url(${src})`,
                  WebkitMaskImage: `url(${src})`,
                  maskSize: 'contain',
                  WebkitMaskSize: 'contain',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: 'center',
                  WebkitMaskPosition: 'center',
                  background: 'var(--color-accent)',
                  mixBlendMode: 'screen',
                }} />
              </m.div>
            </div>
          ))}
        </m.div>
      </div>
    </>
  )
}

// ── PortraitOrbit — multi-ring system + orbital dots ──────────────────────────
function PortraitOrbit({ phase }) {
  const visible = phase >= P.SCAN
  const SIZE = 500, CX = 250, CY = 250

  // Three ring radii
  const R1 = 230  // outer — slow CW, sparse dashes
  const R2 = 185  // mid   — CCW, bright radar sweep arc
  const R3 = 140  // inner — fast CW, tick marks

  const C1 = 2 * Math.PI * R1
  const C2 = 2 * Math.PI * R2

  // Radar arc for R2: short bright dash that spins fast
  const ARC_LEN = 55

  return (
    <m.svg
      width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`}
      animate={{ opacity: visible ? 1 : 0 }}
      transition={{ duration: 1.2, ease: EASE_OUT }}
      style={{ display: 'block', pointerEvents: 'none', overflow: 'visible' }}
    >
      {/* Ring 1 — outer, slow CW, sparse dashes */}
      <circle cx={CX} cy={CY} r={R1} stroke="var(--color-accent)"
        strokeWidth={0.5} fill="none" opacity={0.18} strokeDasharray="3 18" />
      <m.circle cx={CX} cy={CY} r={R1}
        stroke="var(--color-accent)" strokeWidth={0.8} fill="none"
        strokeDasharray={`${C1 * 0.25} ${C1 * 0.75}`} opacity={0.4}
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 28, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* Ring 2 — mid, CCW full ring + radar sweep */}
      <circle cx={CX} cy={CY} r={R2} stroke="var(--color-accent)"
        strokeWidth={0.4} fill="none" opacity={0.12} />
      {/* Radar sweep — short bright arc that spins CCW */}
      <m.circle cx={CX} cy={CY} r={R2}
        stroke="var(--color-accent)" strokeWidth={2} fill="none"
        strokeDasharray={`${ARC_LEN} ${C2 - ARC_LEN}`}
        strokeLinecap="round"
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${CX}px ${CY}px`, filter: 'drop-shadow(0 0 4px rgba(255,37,64,0.7))' }}
      />
      {/* Trailing fade arc */}
      <m.circle cx={CX} cy={CY} r={R2}
        stroke="var(--color-accent)" strokeWidth={1} fill="none" opacity={0.25}
        strokeDasharray={`${ARC_LEN * 2.5} ${C2 - ARC_LEN * 2.5}`}
        animate={{ rotate: [360, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'linear', delay: 0 }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />

      {/* Ring 3 — inner, fast CW, 4 tick marks */}
      <m.circle cx={CX} cy={CY} r={R3}
        stroke="var(--color-accent)" strokeWidth={0.6} fill="none" opacity={0.3}
        strokeDasharray="2 14"
        animate={{ rotate: [0, 360] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        style={{ transformOrigin: `${CX}px ${CY}px` }}
      />
      {/* 4 tick marks on ring 3, co-rotating */}
      {[0, 90, 180, 270].map(deg => (
        <m.line key={deg}
          x1={CX + R3 - 8} y1={CY}
          x2={CX + R3 + 2} y2={CY}
          stroke="var(--color-accent)" strokeWidth={1.5} opacity={0.7}
          animate={{ rotate: [deg, deg + 360] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: `${CX}px ${CY}px` }}
        />
      ))}

      {/* Orbital dots — 3 dots on R=245, staggered 120° apart */}
      {[0, 120, 240].map((startDeg, i) => (
        <m.circle key={i}
          cx={CX + 245} cy={CY} r={i === 0 ? 3 : 2}
          fill="var(--color-accent)"
          opacity={i === 0 ? 0.9 : 0.5}
          animate={{ rotate: [startDeg, startDeg + 360] }}
          transition={{ duration: 8 + i * 3, repeat: Infinity, ease: 'linear' }}
          style={{
            transformOrigin: `${CX}px ${CY}px`,
            filter: i === 0 ? 'drop-shadow(0 0 5px rgba(255,37,64,0.9))' : 'none',
          }}
        />
      ))}

      {/* Boot-in sweep arc on ring 1 */}
      <m.circle cx={CX} cy={CY} r={R1}
        stroke="var(--color-accent)" strokeWidth={1.2} fill="none"
        strokeDasharray={C1}
        initial={{ strokeDashoffset: C1 }}
        animate={phase >= P.SCAN ? { strokeDashoffset: 0 } : { strokeDashoffset: C1 }}
        transition={{ duration: 2.4, ease: EASE_OUT, delay: 0.2 }}
        style={{ transformOrigin: `${CX}px ${CY}px`, rotate: '-90deg', opacity: 0.35 }}
      />
    </m.svg>
  )
}

function PulseDot() {
  return (
    <span style={{ position: 'relative', display: 'inline-block', width: 6, height: 6, flexShrink: 0 }}>
      <m.span
        animate={{ scale: [1, 2, 1], opacity: [1, 0, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
        style={{ display: 'block', width: 6, height: 6, borderRadius: '50%', background: 'var(--color-accent)', position: 'absolute' }}
      />
    </span>
  )
}

function HudLabel({ children, dim, accent, style: s }) {
  return (
    <div style={{
      fontFamily: "'Play', monospace",
      fontSize: '10px', letterSpacing: '0.18em', textTransform: 'uppercase',
      color: accent ? 'var(--color-accent)' : dim ? 'rgba(240,238,234,0.28)' : 'rgba(240,238,234,0.5)',
      lineHeight: 1.6, ...s,
    }}>
      {children}
    </div>
  )
}

function HudPanel({ visible, delay = 0, style: s, children }) {
  return (
    <m.div
      animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 10 }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
      style={s}
    >
      {children}
    </m.div>
  )
}

function TitleWord({ children, delay, accent, scramble = false, style: s }) {
  const [trigger, setTrigger] = useState(0)
  const [glitching, setGlitching] = useState(false)
  const glitchTimer = useRef(null)
  const text = typeof children === 'string' ? children : ''

  const displayed = useScramble(text, {
    duration: 480,
    trigger,
    delay: scramble ? delay * 1000 : 0,
    enabled: scramble && !!text,
  })

  // Fire once on mount
  useEffect(() => {
    if (!scramble || !text) return
    setTrigger(1)
    const t1 = setTimeout(() => setGlitching(true),  Math.max(0, delay * 1000 + 80))
    const t2 = setTimeout(() => setGlitching(false), Math.max(0, delay * 1000 + 580))
    return () => { clearTimeout(t1); clearTimeout(t2) }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleHover = () => {
    if (!scramble || !text) return
    setTrigger(t => t + 1)
    setGlitching(true)
    clearTimeout(glitchTimer.current)
    glitchTimer.current = setTimeout(() => setGlitching(false), 520)
  }

  return (
    <span
      style={{ display: 'inline-block', overflow: 'hidden', paddingTop: '0.14em', paddingBottom: '0.03em', ...s }}
      onMouseEnter={handleHover}
    >
      <m.span
        style={{
          display: 'inline-block',
          color: accent ? 'var(--color-accent)' : 'var(--color-fg)',
          position: 'relative',
          willChange: 'transform',
          pointerEvents: 'none',
        }}
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      >
        {scramble && text && glitching && (
          <>
            <span aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              color: '#ff2540', transform: 'translate(-7px, 2px)',
              mixBlendMode: 'screen', opacity: 0.55,
              pointerEvents: 'none', whiteSpace: 'nowrap',
            }}>{displayed}</span>
            <span aria-hidden="true" style={{
              position: 'absolute', inset: 0,
              color: '#00f0ff', transform: 'translate(7px, -2px)',
              mixBlendMode: 'screen', opacity: 0.35,
              pointerEvents: 'none', whiteSpace: 'nowrap',
            }}>{displayed}</span>
          </>
        )}
        {scramble && text ? displayed : children}
      </m.span>
    </span>
  )
}

// ── Arc gauge — reads as "system utilization", not "skill level" ─────────────
function ArcGauge({ value, active, delay, metric }) {
  const SIZE = 34, R = 13, CX = SIZE / 2, CY = SIZE / 2
  const C    = 2 * Math.PI * R
  const ARC  = C * (240 / 360)   // 240° sweep
  const GAP  = C - ARC
  const filled = value * ARC

  return (
    <m.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={active ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, delay }}
      style={{ width: SIZE, height: SIZE, flexShrink: 0 }}
    >
      <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} fill="none">
        {/* bg track */}
        <circle cx={CX} cy={CY} r={R}
          stroke="rgba(255,255,255,0.07)" strokeWidth={1.8}
          strokeDasharray={`${ARC} ${GAP}`}
          style={{ transform: 'rotate(150deg)', transformOrigin: `${CX}px ${CY}px` }}
        />
        {/* fill arc */}
        <m.circle cx={CX} cy={CY} r={R}
          stroke="var(--color-accent)" strokeWidth={1.8}
          strokeDasharray={`${ARC} ${GAP}`}
          initial={{ strokeDashoffset: ARC }}
          animate={active ? { strokeDashoffset: ARC - filled } : { strokeDashoffset: ARC }}
          transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: delay + 0.2 }}
          style={{ transform: 'rotate(150deg)', transformOrigin: `${CX}px ${CY}px`,
            filter: 'drop-shadow(0 0 3px rgba(255,37,64,0.6))' }}
        />
        {/* tip dot at arc end */}
        <m.circle cx={CX + R} cy={CY} r={1.5}
          fill="var(--color-accent)"
          initial={{ opacity: 0 }}
          animate={active ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3, delay: delay + 1.5 }}
          style={{ transform: 'rotate(150deg)', transformOrigin: `${CX}px ${CY}px` }}
        />
        {/* inner metric */}
        <text x={CX} y={CY + 1} textAnchor="middle" dominantBaseline="middle"
          style={{ fontFamily: "'Play', monospace", fontSize: '7.5px',
            fill: 'rgba(255,37,64,0.8)', letterSpacing: '0.06em', fontWeight: 600 }}
        >
          {metric}
        </text>
      </svg>
    </m.div>
  )
}

function SpinningGlobe({ size = 40 }) {
  return (
    <>
      <style>{`
        @keyframes globe-lon  { from { transform: rotateY(0deg)   } to { transform: rotateY(360deg)  } }
        @keyframes globe-lon2 { from { transform: rotateY(90deg)  } to { transform: rotateY(450deg)  } }
        @keyframes globe-pulse { 0%,100% { opacity:.9 } 50% { opacity:.4 } }
      `}</style>
      <div style={{ width: size, height: size, position: 'relative', flexShrink: 0 }}>
        {/* static base — outer circle + latitudes + location dot */}
        <svg viewBox="0 0 44 44" fill="none" width={size} height={size}
          style={{ position: 'absolute', inset: 0 }}>
          <circle cx="22" cy="22" r="19" stroke="rgba(255,37,64,0.5)" strokeWidth="0.8" />
          {/* latitude lines */}
          <ellipse cx="22" cy="15" rx="17" ry="4" stroke="rgba(255,37,64,0.18)" strokeWidth="0.6" />
          <ellipse cx="22" cy="22" rx="19" ry="6" stroke="rgba(255,37,64,0.18)" strokeWidth="0.6" />
          <ellipse cx="22" cy="29" rx="17" ry="4" stroke="rgba(255,37,64,0.18)" strokeWidth="0.6" />
          {/* equator crosshair ticks */}
          <line x1="3" y1="22" x2="8"  y2="22" stroke="rgba(255,37,64,0.22)" strokeWidth="0.6" />
          <line x1="36" y1="22" x2="41" y2="22" stroke="rgba(255,37,64,0.22)" strokeWidth="0.6" />
          {/* Bogotá dot */}
          <circle cx="17" cy="25" r="1.6" fill="var(--color-accent)"
            style={{ animation: 'globe-pulse 2.4s ease-in-out infinite' }} />
          <circle cx="17" cy="25" r="3.5" fill="none"
            stroke="var(--color-accent)" strokeWidth="0.5" opacity="0.4" />
        </svg>
        {/* spinning longitude 1 */}
        <div style={{
          position: 'absolute', inset: 0,
          perspective: '80px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: size, height: size, animation: 'globe-lon 7s linear infinite', transformStyle: 'preserve-3d' }}>
            <svg viewBox="0 0 44 44" fill="none" width={size} height={size}>
              <ellipse cx="22" cy="22" rx="9" ry="19" stroke="rgba(255,37,64,0.28)" strokeWidth="0.7" />
            </svg>
          </div>
        </div>
        {/* spinning longitude 2 (90° offset) */}
        <div style={{
          position: 'absolute', inset: 0,
          perspective: '80px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{ width: size, height: size, animation: 'globe-lon2 7s linear infinite', transformStyle: 'preserve-3d' }}>
            <svg viewBox="0 0 44 44" fill="none" width={size} height={size}>
              <ellipse cx="22" cy="22" rx="9" ry="19" stroke="rgba(255,37,64,0.18)" strokeWidth="0.7" />
            </svg>
          </div>
        </div>
      </div>
    </>
  )
}

// ── Live canvas EQ bars ───────────────────────────────────────────────────────
// RAF-based, targets drift randomly each frame, current lerps toward target.
// Uses canvas so Framer Motion reconciliation never causes jitter.
function LiveEQ({ active, width = 80, height = 24, bars = 11 }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const targets   = useRef(Array.from({ length: bars }, () => 0.3 + Math.random() * 0.5))
  const current   = useRef(targets.current.map(v => v * 0.2))

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    const gap = 2
    const bw  = (W - gap * (bars - 1)) / bars

    const tick = () => {
      targets.current = targets.current.map(t => {
        const n = t + (Math.random() - 0.5) * 0.18
        return Math.min(Math.max(n, 0.12), 1)
      })
      current.current = current.current.map((c, i) =>
        c + (targets.current[i] - c) * 0.14
      )
      ctx.clearRect(0, 0, W, H)
      current.current.forEach((v, i) => {
        const x = i * (bw + gap)
        const h = Math.max(2, v * H)
        const g = ctx.createLinearGradient(0, H - h, 0, H)
        g.addColorStop(0, `rgba(255,37,64,${0.45 + v * 0.55})`)
        g.addColorStop(1, `rgba(255,37,64,0.15)`)
        ctx.fillStyle = g
        ctx.fillRect(x, H - h, bw, h)
      })
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active, bars])

  return (
    <canvas ref={canvasRef} width={width} height={height}
      style={{ display: 'block', imageRendering: 'pixelated' }} />
  )
}

// ── Live oscilloscope waveform ────────────────────────────────────────────────
function LiveOscilloscope({ active, width = 56, height = 20 }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const phase     = useRef(0)
  const amp       = useRef({ a: 1, b: 0.6, c: 0.3 })

  useEffect(() => {
    if (!active) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = canvas.width, H = canvas.height
    const MID = H / 2

    const tick = () => {
      phase.current += 0.055
      // amplitudes drift slowly for organic feel
      amp.current.a += (0.85 + Math.random() * 0.3 - amp.current.a) * 0.02
      amp.current.b += (0.45 + Math.random() * 0.3 - amp.current.b) * 0.02
      amp.current.c += (0.2  + Math.random() * 0.2 - amp.current.c) * 0.02

      ctx.clearRect(0, 0, W, H)
      const g = ctx.createLinearGradient(0, 0, W, 0)
      g.addColorStop(0, 'rgba(255,37,64,0)')
      g.addColorStop(0.15, 'rgba(255,37,64,0.75)')
      g.addColorStop(0.85, 'rgba(255,37,64,0.75)')
      g.addColorStop(1, 'rgba(255,37,64,0)')
      ctx.strokeStyle = g
      ctx.lineWidth = 1
      ctx.beginPath()
      const p = phase.current
      for (let x = 0; x <= W; x++) {
        const t = (x / W) * Math.PI * 2
        const y = MID
          + Math.sin(t * 3.1 + p)         * MID * 0.5  * amp.current.a
          + Math.sin(t * 5.7 + p * 1.6)   * MID * 0.3  * amp.current.b
          + Math.sin(t * 11  + p * 2.4)   * MID * 0.18 * amp.current.c
        x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
      }
      ctx.stroke()
      rafRef.current = requestAnimationFrame(tick)
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [active])

  return (
    <canvas ref={canvasRef} width={width} height={height}
      style={{ display: 'block' }} />
  )
}

// ── Bogotá live clock (COT = UTC-5, no DST) ──────────────────────────────────
// Kowalski: purposeful motion only — seconds updating = system is live.
// Crosshair draws in once on mount (strokeDashoffset), then holds.
function BogotaClock({ active }) {
  const [time, setTime] = useState(() => {
    const d = new Date()
    const cot = new Date(d.toLocaleString('en-US', { timeZone: 'America/Bogota' }))
    return cot
  })

  useEffect(() => {
    const id = setInterval(() => {
      const d = new Date()
      setTime(new Date(d.toLocaleString('en-US', { timeZone: 'America/Bogota' })))
    }, 1000)
    return () => clearInterval(id)
  }, [])

  const hh = String(time.getHours()).padStart(2, '0')
  const mm = String(time.getMinutes()).padStart(2, '0')
  const ss = String(time.getSeconds()).padStart(2, '0')

  // Crosshair line lengths for dash animation
  const LINE = 28

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={active ? { opacity: 1 } : { opacity: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 2 }}
    >
      {/* Crosshair — draws in once */}
      <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0 }}>
        <svg width={36} height={36} viewBox="0 0 36 36" fill="none"
          style={{ position: 'absolute', inset: 0 }}>
          {/* outer circle */}
          <m.circle cx={18} cy={18} r={14}
            stroke="rgba(255,37,64,0.2)" strokeWidth={0.6}
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          />
          {/* inner circle */}
          <m.circle cx={18} cy={18} r={5}
            stroke="rgba(255,37,64,0.35)" strokeWidth={0.6}
            initial={{ pathLength: 0 }}
            animate={active ? { pathLength: 1 } : { pathLength: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
          />
          {/* crosshair lines — H */}
          <m.line x1={1} y1={18} x2={10} y2={18}
            stroke="rgba(255,37,64,0.45)" strokeWidth={0.7}
            initial={{ scaleX: 0 }} animate={active ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
            style={{ transformOrigin: '1px 18px' }}
          />
          <m.line x1={26} y1={18} x2={35} y2={18}
            stroke="rgba(255,37,64,0.45)" strokeWidth={0.7}
            initial={{ scaleX: 0 }} animate={active ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 1.1 }}
            style={{ transformOrigin: '35px 18px' }}
          />
          {/* crosshair lines — V */}
          <m.line x1={18} y1={1} x2={18} y2={10}
            stroke="rgba(255,37,64,0.45)" strokeWidth={0.7}
            initial={{ scaleY: 0 }} animate={active ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
            style={{ transformOrigin: '18px 1px' }}
          />
          <m.line x1={18} y1={26} x2={18} y2={35}
            stroke="rgba(255,37,64,0.45)" strokeWidth={0.7}
            initial={{ scaleY: 0 }} animate={active ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 1.15 }}
            style={{ transformOrigin: '18px 35px' }}
          />
          {/* center dot */}
          <m.circle cx={18} cy={18} r={1.4}
            fill="var(--color-accent)"
            initial={{ scale: 0 }} animate={active ? { scale: 1 } : { scale: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 1.3 }}
            style={{ transformOrigin: '18px 18px' }}
          />
        </svg>
      </div>

      {/* Time readout */}
      <div>
        <div style={{
          fontFamily: "'Play', monospace",
          fontSize: '16px', letterSpacing: '0.08em',
          color: 'var(--color-fg)', lineHeight: 1, fontWeight: 700,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {hh}<span style={{ color: 'rgba(255,37,64,0.6)', margin: '0 1px' }}>:</span>
          {mm}<span style={{ color: 'rgba(255,37,64,0.6)', margin: '0 1px' }}>:</span>
          <m.span
            key={ss}
            initial={{ opacity: 0.3, y: -3 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
            style={{ display: 'inline-block' }}
          >
            {ss}
          </m.span>
        </div>
        <div style={{
          fontFamily: "'Play', monospace",
          fontSize: '8px', letterSpacing: '0.26em',
          color: 'rgba(255,37,64,0.5)', marginTop: 3,
          textTransform: 'uppercase',
        }}>
          COT · UTC−5
        </div>
      </div>
    </m.div>
  )
}

// ── Radar ping for location ───────────────────────────────────────────────────
function RadarPing() {
  return (
    <>
      <style>{`
        @keyframes radar-sweep { from { transform:rotate(0deg) } to { transform:rotate(360deg) } }
        @keyframes blip-fade   { 0%,18% { opacity:1 } 100% { opacity:0 } }
      `}</style>
      <div style={{ position: 'relative', width: 76, height: 76 }}>
        {/* static: rings + crosshair + blip */}
        <svg width={76} height={76} viewBox="0 0 76 76" fill="none"
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}>
          <circle cx="38" cy="38" r="34" stroke="rgba(255,37,64,0.14)" strokeWidth="0.6" />
          <circle cx="38" cy="38" r="22" stroke="rgba(255,37,64,0.09)" strokeWidth="0.5" />
          <circle cx="38" cy="38" r="11" stroke="rgba(255,37,64,0.06)" strokeWidth="0.5" />
          <line x1="4"  y1="38" x2="72" y2="38" stroke="rgba(255,37,64,0.08)" strokeWidth="0.5" />
          <line x1="38" y1="4"  x2="38" y2="72" stroke="rgba(255,37,64,0.08)" strokeWidth="0.5" />
          {/* diagonal guides */}
          <line x1="14" y1="14" x2="62" y2="62" stroke="rgba(255,37,64,0.04)" strokeWidth="0.5" />
          <line x1="62" y1="14" x2="14" y2="62" stroke="rgba(255,37,64,0.04)" strokeWidth="0.5" />
          {/* Bogotá blip */}
          <circle cx="29" cy="44" r="2" fill="var(--color-accent)"
            style={{ animation: 'blip-fade 3.8s ease-out infinite 0.4s' }} />
          <circle cx="29" cy="44" r="5.5" fill="none" stroke="var(--color-accent)" strokeWidth="0.5"
            style={{ animation: 'blip-fade 3.8s ease-out infinite 0.55s' }} />
          <circle cx="38" cy="38" r="1.2" fill="rgba(255,37,64,0.55)" />
          {/* tick marks on outer ring */}
          {[0,45,90,135,180,225,270,315].map(deg => {
            const r = deg % 90 === 0 ? 30 : 32
            const rad = (deg * Math.PI) / 180
            const x1 = 38 + Math.cos(rad) * r, y1 = 38 + Math.sin(rad) * r
            const x2 = 38 + Math.cos(rad) * 34, y2 = 38 + Math.sin(rad) * 34
            return <line key={deg} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="rgba(255,37,64,0.25)" strokeWidth="0.6" />
          })}
        </svg>

        {/* conic sweep trail */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '50%', zIndex: 0, overflow: 'hidden',
          background: 'conic-gradient(from 270deg, rgba(255,37,64,0.28) 0deg, rgba(255,37,64,0.06) 50deg, transparent 90deg)',
          animation: 'radar-sweep 3.8s linear infinite',
          mixBlendMode: 'screen',
        }} />

        {/* sweep line */}
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          animation: 'radar-sweep 3.8s linear infinite',
          transformOrigin: 'center',
        }}>
          <svg width={76} height={76} viewBox="0 0 76 76" fill="none">
            <line x1="38" y1="38" x2="72" y2="38"
              stroke="rgba(255,37,64,0.9)" strokeWidth="0.8"
              style={{ filter: 'drop-shadow(0 0 3px rgba(255,37,64,0.7))' }} />
          </svg>
        </div>
      </div>
    </>
  )
}

function Waveform() {
  const pts = [0,3,7,2,9,4,1,6,8,3,5,2,7,4,1,5]
  const max = Math.max(...pts), w = 40, h = 16
  const step = w / (pts.length - 1)
  const d = pts.map((v, i) => `${i === 0 ? 'M' : 'L'} ${i * step} ${h - (v / max) * h}`).join(' ')
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
      <path d={d} stroke="var(--color-accent)" strokeWidth={1} opacity={0.7}/>
    </svg>
  )
}

function WorldMapMini() {
  return (
    <svg width={80} height={46} viewBox="0 0 80 46" fill="none" opacity={0.3}>
      <path d="M8 16 Q10 10 16 12 Q18 8 22 10 Q24 14 20 18 Q16 20 12 18 Z" fill="rgba(240,238,234,0.4)"/>
      <path d="M10 22 Q12 20 16 22 Q18 26 14 28 Q10 26 10 22 Z" fill="rgba(240,238,234,0.4)"/>
      <path d="M26 8 Q32 4 40 6 Q46 8 48 14 Q50 20 44 24 Q38 26 32 22 Q26 18 26 14 Z" fill="rgba(240,238,234,0.4)"/>
      <path d="M30 26 Q34 24 38 28 Q36 34 32 32 Z" fill="rgba(240,238,234,0.4)"/>
      <path d="M52 12 Q58 10 62 14 Q64 20 60 24 Q56 22 52 18 Z" fill="rgba(240,238,234,0.4)"/>
      <path d="M56 26 Q60 24 64 28 Q62 34 58 32 Q54 30 56 26 Z" fill="rgba(240,238,234,0.4)"/>
      <circle cx={34} cy={22} r={2.5} fill="var(--color-accent)" opacity={0.9}/>
      <line x1={34} y1={17} x2={34} y2={27} stroke="var(--color-accent)" strokeWidth={0.6} opacity={0.5}/>
      <line x1={29} y1={22} x2={39} y2={22} stroke="var(--color-accent)" strokeWidth={0.6} opacity={0.5}/>
    </svg>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// DATA CONNECTORS — SVG lines from portrait edges to left/right HUD panels
// ══════════════════════════════════════════════════════════════════════════════

function DataConnectors({ phase, mouseX, mouseY }) {
  const visible = phase >= P.REVEAL
  // Connector line coordinates (% of viewport)
  // Portrait left edge ≈ 32vw, right edge ≈ 68vw, vertical centre ≈ 43vh
  // Left HUD ≈ x=52px, Right HUD ≈ x=calc(100vw - 52px)

  const strokeDash = 140
  const variants = {
    hidden: { strokeDashoffset: strokeDash, opacity: 0 },
    visible: { strokeDashoffset: 0, opacity: 1 },
  }

  return (
    <svg
      style={{
        position: 'absolute', inset: 0, width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 3, overflow: 'visible',
      }}
    >
      <defs>
        {/* Gradient: accent at portrait end, fades out toward HUD */}
        <linearGradient id="conn-left" x1="1" y1="0" x2="0" y2="0">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.7}/>
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.12}/>
        </linearGradient>
        <linearGradient id="conn-right" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.7}/>
          <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0.12}/>
        </linearGradient>
      </defs>

      {/* Left connector */}
      <m.line
        x1="32%" y1="43%" x2="5%" y2="50%"
        stroke="url(#conn-left)" strokeWidth={0.8}
        strokeDasharray={`4 5`}
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1.0, ease: EASE_OUT, delay: 0.6 }}
      />
      {/* Left terminal dot at portrait edge */}
      <m.circle
        cx="32%" cy="43%" r={3}
        fill="var(--color-accent)"
        initial={{ scale: 0, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 1.5 }}
        style={{ transformOrigin: '32% 43%' }}
      />
      {/* Left HUD terminal dot */}
      <m.circle
        cx="5%" cy="50%" r={2}
        fill="var(--color-accent)"
        initial={{ scale: 0, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 0.5 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 1.6 }}
        style={{ transformOrigin: '5% 50%' }}
      />

      {/* Right connector */}
      <m.line
        x1="68%" y1="43%" x2="95%" y2="50%"
        stroke="url(#conn-right)" strokeWidth={0.8}
        strokeDasharray={`4 5`}
        initial="hidden"
        animate={visible ? 'visible' : 'hidden'}
        variants={variants}
        transition={{ duration: 1.0, ease: EASE_OUT, delay: 0.7 }}
      />
      {/* Right terminal dot at portrait edge */}
      <m.circle
        cx="68%" cy="43%" r={3}
        fill="var(--color-accent)"
        initial={{ scale: 0, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 0.8 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 1.6 }}
        style={{ transformOrigin: '68% 43%' }}
      />
      {/* Right HUD terminal dot */}
      <m.circle
        cx="95%" cy="50%" r={2}
        fill="var(--color-accent)"
        initial={{ scale: 0, opacity: 0 }}
        animate={visible ? { scale: 1, opacity: 0.5 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.4, ease: EASE_OUT, delay: 1.7 }}
        style={{ transformOrigin: '95% 50%' }}
      />
    </svg>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// TOP HUD BAR
// ══════════════════════════════════════════════════════════════════════════════

function HeroTopBar({ visible }) {
  const { t } = useLang()
  const lh = t.labHero

  return (
    <HudPanel visible={visible} delay={0.05} style={{
      position: 'absolute', top: 0, left: 0, right: 0, zIndex: 20,
      padding: 'clamp(14px,2.5vh,28px) clamp(20px,3vw,40px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    }}>
      {/* Logo A */}
      <div style={{ position: 'relative', width: 44, height: 44, flexShrink: 0 }}>
        {['top-left','top-right','bottom-left','bottom-right'].map(p => (
          <Corner key={p} pos={p} size={10} thickness={1.5} />
        ))}
        <div style={{
          width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.6rem', color: 'var(--color-accent)',
        }}>A</div>
      </div>

      <nav style={{ display: 'flex', gap: 'clamp(12px,2.5vw,36px)', alignItems: 'center' }}>
        {lh.navLinks.map((label, i) => (
          <div key={label} style={{ position: 'relative' }}>
            <HudLabel style={{ cursor: 'pointer', letterSpacing: '0.22em', color: 'rgba(240,238,234,0.55)' }}>
              {label}
            </HudLabel>
            {i === 0 && (
              <div style={{
                position: 'absolute', bottom: -5, left: '50%', transform: 'translateX(-50%)',
                width: 4, height: 4, borderRadius: '50%', background: 'var(--color-accent)',
              }}/>
            )}
          </div>
        ))}
      </nav>

      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <HudLabel style={{ letterSpacing: '0.2em' }}>{lh.availability}</HudLabel>
        <PulseDot />
      </div>
    </HudPanel>
  )
}

// ══════════════════════════════════════════════════════════════════════════════
// MAIN HERO
// ══════════════════════════════════════════════════════════════════════════════

export default function LabHero({ hideTopBar = false }) {
  const [phase, setPhase] = useState(P.BOOT)
  const reduced = useReducedMotion()
  const [booted, setBooted] = useState(
    () => (typeof window !== 'undefined' && sessionStorage.getItem('booted') === '1')
  )
  const [viewport, setViewport] = useState(
    () => {
      const width = typeof window !== 'undefined' ? window.innerWidth : 1440
      return { mobile: width <= 680, tablet: width > 680 && width <= 1023 }
    }
  )
  const isMobile = viewport.mobile
  const isTablet = viewport.tablet
  const isCompact = isMobile || isTablet
  const { t } = useLang()
  const lh = t.labHero

  // Global mouse MotionValues for background canvas
  const globalMouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth  / 2 : 760)
  const globalMouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 400)

  // mouseRef for GeometryGrid (expects { x, y } plain object ref)
  const gridMouseRef = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })

  // Portrait parallax — slower, heavier spring than HUD panels (depth illusion)
  const portraitSpringCfg = { stiffness: 35, damping: 18, mass: 1.2 }
  const portraitPX = useSpring(useMotionValue(0), portraitSpringCfg)
  const portraitPY = useSpring(useMotionValue(0), portraitSpringCfg)

  useEffect(() => {
    const mobileMq = window.matchMedia('(max-width: 680px)')
    const tabletMq = window.matchMedia('(min-width: 681px) and (max-width: 1023px)')
    const sync = () => setViewport({ mobile: mobileMq.matches, tablet: tabletMq.matches })
    sync()
    mobileMq.addEventListener('change', sync)
    tabletMq.addEventListener('change', sync)
    return () => {
      mobileMq.removeEventListener('change', sync)
      tabletMq.removeEventListener('change', sync)
    }
  }, [])

  useEffect(() => {
    if (reduced) { setPhase(P.ACTIVE); return }
    const ids = [
      setTimeout(() => setPhase(P.SCAN),   700),
      setTimeout(() => setPhase(P.REVEAL), 1900),
      setTimeout(() => setPhase(P.TITLE),  3100),
      setTimeout(() => setPhase(P.ACTIVE), 4400),
    ]
    return () => ids.forEach(clearTimeout)
  }, [reduced])

  // Parallax offsets — HUD panels shift opposite to mouse for depth
  const parallaxCfg = { stiffness: 60, damping: 20, mass: 0.8 }
  const parallaxX = useSpring(useMotionValue(0), parallaxCfg)
  const parallaxY = useSpring(useMotionValue(0), parallaxCfg)
  // Left HUD shifts opposite X (mouse right → panel drifts left), right HUD mirror
  const leftPX  = useTransform(parallaxX, v => -v)
  const leftPY  = useTransform(parallaxY, v => -v * 0.6)
  const rightPX = useTransform(parallaxX, v =>  v)
  const rightPY = useTransform(parallaxY, v => -v * 0.6)

  const handleSectionMouseMove = useCallback((e) => {
    globalMouseX.set(e.clientX)
    globalMouseY.set(e.clientY)
    gridMouseRef.current.x = e.clientX
    gridMouseRef.current.y = e.clientY
    const nx = (e.clientX / window.innerWidth  - 0.5) * 2
    const ny = (e.clientY / window.innerHeight - 0.5) * 2
    parallaxX.set(nx * 8)
    parallaxY.set(ny * 5)
    portraitPX.set(nx * 14)
    portraitPY.set(ny * 8)
  }, [globalMouseX, globalMouseY, parallaxX, parallaxY, portraitPX, portraitPY])

  const hudVisible   = phase >= P.SCAN
  const titleVisible = phase >= P.TITLE
  const isActive     = phase >= P.ACTIVE

  const titleLines = isMobile
    ? [
        lh.titleLines[0].replace(/\s+/g, ' ').split(' ')[0],
        lh.titleLines[0].replace(/\s+/g, ' ').split(' ').slice(1).join(' '),
        lh.titleLines[1].replace(/\s+/g, ' ').split(' ').slice(0, 2).join(' '),
        lh.titleLines[1].replace(/\s+/g, ' ').split(' ').slice(2).join(' '),
        lh.titleLines[2],
      ].filter(Boolean)
    : lh.titleLines

  // Portrait sits at vertical centre-top; title overlaps its lower third.
  // All centre elements are absolutely positioned so text can float over photo.
  // Fixed aspect ratio (3:4) — objectFit:cover always crops identically across viewports
  const PORTRAIT_W = isMobile
    ? 'min(76vw,310px)'
    : isTablet
      ? 'clamp(340px,44vw,470px)'
      : 'clamp(390px,42vw,630px)'

  return (
    <section
      onMouseMove={handleSectionMouseMove}
      style={{
        position: 'relative', width: '100%', height: '100svh',
        overflow: 'hidden', background: '#080808',
      }}
    >
      {/* ── SVG orbital rings ── */}
      {!isMobile && <SvgRings phase={phase} parallaxX={parallaxX} parallaxY={parallaxY} reduced={!!reduced} />}

      {/* ── Dynamic canvas background ── */}
      <DynamicBackground phase={phase} mouseX={globalMouseX} mouseY={globalMouseY} mobile={isMobile} />

      {/* ── Data connectors ── */}
      {!isCompact && <DataConnectors phase={phase} mouseX={globalMouseX} mouseY={globalMouseY} />}

      {/* ── Top HUD bar ── */}
      {!hideTopBar && !isCompact && <HeroTopBar visible={hudVisible} />}

      {/* ── Viewport corner brackets ── */}
      {['top-left','top-right','bottom-left','bottom-right'].map(pos => (
        <m.div key={`vp-${pos}`}
          animate={{ opacity: hudVisible ? 1 : 0 }}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            position: 'absolute', zIndex: 2,
            ...(pos.includes('top')   ? { top: 10 }    : { bottom: 10 }),
            ...(pos.includes('left')  ? { left: 10 }   : { right: 10 }),
          }}
        >
          <Corner pos={pos} size={22} thickness={1} />
        </m.div>
      ))}

      {/* ══ Portrait + orbit — shared parallax wrapper ══ */}
      <div style={{ position: 'absolute', left: '50%', top: isMobile ? '49.5%' : isTablet ? '51%' : '52%', transform: 'translate(-50%, -50%)', zIndex: 4, pointerEvents: 'none' }}>
        <m.div style={{ x: portraitPX, y: portraitPY }}>
          <m.div
            animate={{ opacity: phase >= P.SCAN ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            {!isMobile && <PortraitOrbit phase={phase} />}
          </m.div>
        </m.div>
      </div>

      {/* ══ PORTRAIT — parallax driven, upper portion ══ */}
      <div style={{ position: 'absolute', left: '50%', top: isMobile ? '49.5%' : isTablet ? '51%' : '52%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
      <m.div style={{
        x: portraitPX, y: portraitPY,
        width: PORTRAIT_W, aspectRatio: '3/4',
        willChange: 'transform',
      }}>
        <SpotlightPortrait phase={phase} />
      </m.div>
      </div>

      {/* ══ BIG TITLE + nameplate + roles — single anchored block ══ */}
      {titleVisible && (
        <div style={{
          position: 'absolute',
          bottom: isMobile ? 'clamp(150px,18svh,178px)' : isTablet ? 'clamp(108px,13svh,150px)' : 'clamp(88px,12vh,140px)',
          left: 0, right: 0,
          textAlign: 'center',
          zIndex: 10,
          filter: isCompact ? 'drop-shadow(0 2px 16px rgba(8,8,8,0.88))' : 'drop-shadow(0 2px 24px rgba(8,8,8,0.9))',
          pointerEvents: 'auto',
        }}>
          {/* nameplate + decorative separator */}
          <m.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.05 }}
            style={{
              marginBottom: isMobile ? 6 : isTablet ? 8 : 'clamp(12px,1.8vh,22px)',
              display: 'flex', flexDirection: 'column', alignItems: 'center', gap: isCompact ? 8 : 10,
            }}
          >
            {/* Thin rule with logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <div style={{ width: 'clamp(28px,4vw,56px)', height: 1, background: 'rgba(255,37,64,0.35)' }} />
              <img src="/logo-mark.png" alt="" aria-hidden
                style={{ width: 18, height: 18, objectFit: 'contain', opacity: 0.45 }}
                onError={e => { e.currentTarget.style.display = 'none' }}
              />
              <div style={{ width: 'clamp(28px,4vw,56px)', height: 1, background: 'rgba(255,37,64,0.35)' }} />
            </div>
            {/* Nameplate */}
            <TitleWord delay={0} style={{
              fontFamily: "'Play', monospace",
              fontSize: isMobile ? '9px' : isTablet ? '10px' : 'clamp(10px,0.9vw,13px)',
              letterSpacing: isCompact ? '0.18em' : '0.38em', textTransform: 'uppercase',
              color: 'rgba(240,238,234,0.55)', fontWeight: 500,
              maxWidth: isCompact ? '30ch' : undefined,
              lineHeight: isCompact ? 1.35 : undefined,
            }}>{lh.nameplate}</TitleWord>
          </m.div>

          {/* title lines — lineHeight 0.78 compresses vertical footprint */}
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: isMobile ? 'clamp(2.06rem,9.8vw,2.72rem)' : isTablet ? 'clamp(2.45rem,6.1vw,4.3rem)' : 'clamp(2.6rem,5.6vw,6.2rem)',
            lineHeight: isCompact ? 0.76 : 0.78,
            letterSpacing: isCompact ? '0.018em' : '0.06em',
            textTransform: 'uppercase',
            padding: isCompact ? '0 18px' : undefined,
            overflowWrap: 'normal',
          }}>
            {titleLines.map((line, i) => (
              <div key={line}>
                <TitleWord
                  delay={0.09 + i * 0.08}
                  accent={isMobile ? i === 2 || i === 3 : i === 1}
                  scramble
                  periodic={isMobile ? i === 2 || i === 3 : i === 1}
                >
                  {line}
                </TitleWord>
              </div>
            ))}
          </div>

          {/* roles */}
          {isMobile ? (
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.42 }}
              style={{
                marginTop: 8,
                padding: '0 24px',
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px 9px',
                fontFamily: "'Play', monospace",
                fontSize: '10px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'rgba(240,238,234,0.65)',
                lineHeight: 1.35,
              }}
            >
              {lh.roles.map((role, i) => (
                <span key={role} style={{ display: 'inline-flex', alignItems: 'center', gap: 9 }}>
                  <span>{role}</span>
                  {i < lh.roles.length - 1 && <span style={{ color: 'var(--color-accent)', opacity: 0.55 }}>/</span>}
                </span>
              ))}
            </m.div>
          ) : (
            <TitleWord delay={0.42} style={{
              display: 'block',
              marginTop: 'clamp(14px,2vh,22px)',
              fontFamily: "'Play', monospace",
              fontSize: 'clamp(11px,1.05vw,14px)',
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(240,238,234,0.65)', fontWeight: 400,
            }}>
              {lh.roles[0]}
              <span style={{ color: 'var(--color-accent)', opacity: 0.5, margin: '0 clamp(8px,1.5vw,20px)' }}>/</span>
              {lh.roles[1]}
              <span style={{ color: 'var(--color-accent)', opacity: 0.5, margin: '0 clamp(8px,1.5vw,20px)' }}>/</span>
              {lh.roles[2]}
            </TitleWord>
          )}
        </div>
      )}

      <HudPanel visible={isActive} delay={0.2} style={{
        position: 'absolute',
        bottom: isMobile ? 'clamp(38px,6svh,54px)' : 'clamp(22px,4vh,50px)',
        left: 0, right: 0,
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: isMobile ? 10 : 24,
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <CyberBtn
          variant="accent-ghost"
          size={isMobile ? 'sm' : 'md'}
          href="#cases"
          style={{ pointerEvents: 'auto', maxWidth: isMobile ? 'min(82vw,300px)' : undefined }}
        >
          {lh.cta}
        </CyberBtn>

        {/* Scroll mouse icon */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5 }}>
          <HudLabel dim style={{ fontSize: '9px', letterSpacing: '0.22em' }}>{lh.scroll}</HudLabel>
          <m.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            style={{
              width: 18, height: 28, border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: 9, display: 'flex', alignItems: 'flex-start',
              justifyContent: 'center', padding: 4,
            }}
          >
            <m.div
              animate={{ y: [0, 9, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ width: 2, height: 5, borderRadius: 2, background: 'rgba(255,255,255,0.4)' }}
            />
          </m.div>
        </div>
      </HudPanel>

      {/* ── "move cursor to reveal" hint ── */}
      <HudPanel visible={isActive && !isCompact} delay={0.4} style={{
        position: 'absolute',
        left: '50%', top: isMobile ? 'auto' : 'calc(42% + clamp(170px,26vh,330px))',
        bottom: isMobile ? 'clamp(78px,10svh,96px)' : undefined,
        transform: 'translateX(-50%)',
        zIndex: 10, textAlign: 'center', pointerEvents: 'none',
      }}>
        <HudLabel dim style={{ fontSize: '9px', letterSpacing: '0.24em' }}>
          {lh.revealHint}
        </HudLabel>
      </HudPanel>

      {/* ══ LEFT HUD ══ */}
      {!isCompact && <div style={{ position: 'absolute', left: 'clamp(24px,3vw,52px)', top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none', minWidth: 140 }}>
        <m.div style={{ x: leftPX, y: leftPY }}>
          {lh.skills.map((label, i) => (
            <m.div
              key={label}
              initial={{ opacity: 0, x: -16 }}
              animate={hudVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.18 + i * 0.09 }}
              style={{ marginBottom: i < lh.skills.length - 1 ? 22 : 0 }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                {/* Arc gauge */}
                <ArcGauge
                  value={SKILL_DATA[i].value}
                  active={isActive}
                  delay={0.7 + i * 0.12}
                  metric={SKILL_DATA[i].metric}
                />

                {/* Text column */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  {/* Index + rule */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    <span style={{
                      fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.2rem',
                      color: 'var(--color-accent)', lineHeight: 1, flexShrink: 0,
                    }}>
                      <TickCounter target={i + 1} active={hudVisible} />
                    </span>
                    <div style={{ flex: 1, height: '1px', background: 'rgba(255,37,64,0.18)' }} />
                  </div>

                  {/* Label */}
                  <div style={{
                    fontFamily: "'Play', monospace",
                    fontSize: 'clamp(9px,0.8vw,11px)', letterSpacing: '0.18em',
                    textTransform: 'uppercase', color: 'rgba(240,238,234,0.75)',
                    lineHeight: 1.2,
                  }}>
                    <ScrambleLabel text={label} active={hudVisible} />
                  </div>

                  {/* Tag */}
                  <m.div
                    initial={{ opacity: 0 }}
                    animate={isActive ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.4, delay: 1.0 + i * 0.12 }}
                    style={{
                      marginTop: 3,
                      fontFamily: "'Play', monospace", fontSize: '8px',
                      letterSpacing: '0.22em', color: 'rgba(255,37,64,0.5)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {SKILL_DATA[i].tag}
                  </m.div>
                </div>
              </div>
            </m.div>
          ))}
        </m.div>
      </div>}

      {/* ══ RIGHT HUD ══ */}
      {!isCompact && <div style={{ position: 'absolute', right: 'clamp(24px,3vw,52px)', top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
      <m.div style={{ x: rightPX, y: rightPY }}>
      <m.div
        initial={{ opacity: 0, x: 16 }}
        animate={hudVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
        transition={{ type: 'spring', stiffness: 260, damping: 28, delay: 0.22 }}
        style={{ maxWidth: 190, textAlign: 'right' }}
      >
        {/* Copy — enter with blur bridge */}
        <m.div
          initial={{ filter: 'blur(6px)', opacity: 0 }}
          animate={hudVisible ? { filter: 'blur(0px)', opacity: 1 } : {}}
          transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.28 }}
          style={{ marginBottom: 20 }}
        >
          <HudLabel style={{ lineHeight: 1.85 }}>
            {lh.rightCopy.map((line) => (
              <span key={line}>{line}<br /></span>
            ))}
          </HudLabel>
        </m.div>

        {/* Location + globe */}
        <m.div
          initial={{ opacity: 0, x: 10 }}
          animate={hudVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 26, delay: 0.34 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 12, marginBottom: 14 }}
        >
          <HudLabel dim>{lh.basedInLabel}</HudLabel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
            <div style={{ textAlign: 'right' }}>
              <HudLabel accent>{lh.locationValue}</HudLabel>
              <HudLabel style={{ color: 'rgba(255,255,255,0.22)', marginTop: 1, fontSize: '9px', letterSpacing: '0.16em' }}>{lh.coordinates}</HudLabel>
            </div>
            <SpinningGlobe size={38} />
          </div>
        </m.div>

        {/* Systems + audio bars */}
        <m.div
          initial={{ opacity: 0, x: 10 }}
          animate={hudVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 26, delay: 0.42 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 12, marginBottom: 14 }}
        >
          <HudLabel dim>{lh.systemsLabel}</HudLabel>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 6 }}>
            <LiveEQ active={hudVisible} width={80} height={22} bars={11} />
          </div>
          <HudLabel accent style={{ marginTop: 4, fontSize: '9px', letterSpacing: '0.2em' }}>{lh.systemsStatus}</HudLabel>
        </m.div>

        {/* Response + waveform */}
        <m.div
          initial={{ opacity: 0, x: 10 }}
          animate={hudVisible ? { opacity: 1, x: 0 } : {}}
          transition={{ type: 'spring', stiffness: 240, damping: 26, delay: 0.50 }}
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 12 }}
        >
          <HudLabel dim>{lh.responseLabel}</HudLabel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 10, marginTop: 6 }}>
            <LiveOscilloscope active={hudVisible} width={56} height={20} />
            <HudLabel accent style={{ fontSize: '11px' }}>0.01ms</HudLabel>
          </div>
        </m.div>
      </m.div>
      </m.div>
      </div>}

      {/* ══ TOP-LEFT HUD ══ */}
      {!isCompact && <HudPanel visible={hudVisible} delay={0.1} style={{
        position: 'absolute', top: 'clamp(60px,11vh,100px)', left: 'clamp(24px,3vw,52px)', zIndex: 10, pointerEvents: 'none',
      }}>
        <HudLabel dim><ScrambleLabel text={lh.interfaceMode} active={hudVisible} /></HudLabel>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginTop: 3,
          fontFamily: "'Play', monospace", fontSize: '11px',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)',
        }}>
          <PulseDot />
          {phase >= P.ACTIVE ? lh.phaseActive : phase >= P.REVEAL ? lh.phaseScanning : lh.phaseBoot}
        </div>
      </HudPanel>}

      {/* ══ TOP-RIGHT HUD ══ */}
      {!isCompact && <HudPanel visible={hudVisible} delay={0.15} style={{
        position: 'absolute', top: 'clamp(60px,11vh,100px)', right: 'clamp(24px,3vw,52px)',
        textAlign: 'right', zIndex: 10, pointerEvents: 'none',
      }}>
        <HudLabel dim>{lh.statusLabel}</HudLabel>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 3,
          fontFamily: "'Play', monospace", fontSize: '11px',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)',
        }}>
          {lh.online} <PulseDot />
        </div>
      </HudPanel>}

      {/* ══ BOTTOM-LEFT ══ */}
      {!isCompact && <HudPanel visible={hudVisible} delay={0.3} style={{
        position: 'absolute', bottom: 'clamp(48px,7vh,80px)', left: 'clamp(24px,3vw,52px)', zIndex: 10, pointerEvents: 'none',
      }}>
        <HudLabel style={{ color: 'rgba(255,255,255,0.22)', fontSize: '8px', letterSpacing: '0.14em', marginBottom: 8 }}>
          4.7110° N · 74.0721° W
        </HudLabel>
        <BogotaClock active={hudVisible} />
      </HudPanel>}

      {/* ══ BOTTOM-RIGHT ══ */}
      {!isCompact && <HudPanel visible={isActive} delay={0.4} style={{
        position: 'absolute', bottom: 'clamp(16px,3vh,36px)', right: 'clamp(24px,3vw,52px)', zIndex: 10, textAlign: 'right', pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: "'Play', monospace", fontSize: '9px',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.35)',
        }}>
          <span style={{ color: 'var(--color-accent)', fontSize: 11 }}>●</span>
          {lh.availableForWork}
        </div>
      </HudPanel>}

      {/* ── Boot sequence overlay — shown once per session ── */}
      {!booted && !reduced && (
        <BootSequence onComplete={() => setBooted(true)} />
      )}
    </section>
  )
}
