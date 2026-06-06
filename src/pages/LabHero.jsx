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
import GeometryGrid from '../components/GeometryGrid'
import { useLang } from '../contexts/LangContext'

// ── Asset paths ────────────────────────────────────────────────────────────────
const FACE_SRC        = '/lab/face.png'
const FACE_HELMET_SRC = '/lab/face-helmet.png'
const HELMET_SRC      = '/lab/helmet.png'

// ── Motion tokens ──────────────────────────────────────────────────────────────
const EASE_OUT     = [0.16, 1, 0.3, 1]
const EASE_OUT_EXP = [0.19, 1, 0.22, 1]   // expo-style, Emil's preferred enter curve

// ── Boot phases ────────────────────────────────────────────────────────────────
const P = { BOOT: 0, SCAN: 1, REVEAL: 2, TITLE: 3, ACTIVE: 4 }

// ── Scramble chars ────────────────────────────────────────────────────────────
const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@$%&'

// ══════════════════════════════════════════════════════════════════════════════
// SCRAMBLE LABEL — characters shuffle before settling on the real text
// ══════════════════════════════════════════════════════════════════════════════

function ScrambleLabel({ text, active, style: s, className }) {
  const [display, setDisplay] = useState(text)
  const frameRef = useRef(null)

  useEffect(() => {
    if (!active) { setDisplay(text); return }
    let step = 0
    const total = 18   // frames to run scramble
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

function DynamicBackground({ phase, mouseX, mouseY }) {
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
    const N = 55
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
      ctx.fillStyle = 'rgba(255,37,64,0.06)'
      for (let gx = 0; gx < W; gx += GRID) {
        for (let gy = 0; gy < H; gy += GRID) {
          // subtle parallax: dots drift toward mouse
          const ox = (mx / W - 0.5) * 6 * paralFactor
          const oy = (my / H - 0.5) * 6 * paralFactor
          const dist = Math.hypot(gx + ox - mx, gy + oy - my)
          const proximity = Math.max(0, 1 - dist / 340)
          const radius = 1.1 + proximity * 1.8
          ctx.globalAlpha = 0.06 + proximity * 0.22
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
        ctx.fillStyle = `rgba(255,37,64,${p.a + pglow * 0.5})`
        ctx.fill()
      })

      // ── Draw connection lines between nearby particles ───────────────────
      ctx.strokeStyle = 'rgba(255,37,64,0.04)'
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
  }, [phase])

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
      fontFamily: "'Rajdhani', monospace",
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
  const [glitching, setGlitching] = useState(false)
  const text = typeof children === 'string' ? children : ''

  useEffect(() => {
    if (!scramble || !text) return
    const t1 = setTimeout(() => setGlitching(true), Math.max(0, delay * 1000 + 120))
    const t2 = setTimeout(() => setGlitching(false), Math.max(0, delay * 1000 + 520))
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [delay, scramble, text])

  return (
    <span style={{ display: 'inline-block', overflow: 'hidden', paddingBottom: '0.03em', ...s }}>
      <m.span
        style={{
          display: 'inline-block',
          color: accent ? 'var(--color-accent)' : 'var(--color-fg)',
          position: 'relative',
          willChange: 'transform',
        }}
        initial={{ y: '108%' }}
        animate={{ y: '0%' }}
        transition={{ duration: 0.8, ease: EASE_OUT, delay }}
      >
        {scramble && text && glitching && (
          <>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                color: '#ff2540',
                transform: 'translate(-5px, 1px)',
                mixBlendMode: 'screen',
                opacity: 0.55,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {text}
            </span>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                color: '#7dd3fc',
                transform: 'translate(5px, -1px)',
                mixBlendMode: 'screen',
                opacity: 0.35,
                pointerEvents: 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {text}
            </span>
          </>
        )}
        {scramble && text ? <ScrambleLabel text={text} active /> : children}
      </m.span>
    </span>
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

  // GeometryGrid: sphere on boot → halo (orbital ring) once revealed
  const gridShape = phase >= P.REVEAL ? 'halo' : 'sphere'

  // Portrait sits at vertical centre-top; title overlaps its lower third.
  // All centre elements are absolutely positioned so text can float over photo.
  // Fixed aspect ratio (3:4) — objectFit:cover always crops identically across viewports
  const PORTRAIT_W = 'clamp(260px,28vw,420px)'
  const PORTRAIT_H = 'unset'   // driven by aspectRatio below

  return (
    <section
      onMouseMove={handleSectionMouseMove}
      style={{
        position: 'relative', width: '100%', height: '100vh',
        overflow: 'hidden', background: '#080808',
      }}
    >
      {/* ── SVG orbital rings ── */}
      <SvgRings phase={phase} parallaxX={parallaxX} parallaxY={parallaxY} reduced={!!reduced} />

      {/* ── Dynamic canvas background ── */}
      <DynamicBackground phase={phase} mouseX={globalMouseX} mouseY={globalMouseY} />

      {/* ── Data connectors ── */}
      <DataConnectors phase={phase} mouseX={globalMouseX} mouseY={globalMouseY} />

      {/* ── Top HUD bar ── */}
      {!hideTopBar && <HeroTopBar visible={hudVisible} />}

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
      <div style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%, -50%)', zIndex: 4, pointerEvents: 'none' }}>
        <m.div style={{ x: portraitPX, y: portraitPY }}>
          <m.div
            animate={{ opacity: phase >= P.SCAN ? 1 : 0 }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            <PortraitOrbit phase={phase} />
          </m.div>
        </m.div>
      </div>

      {/* ══ PORTRAIT — parallax driven, upper portion ══ */}
      <div style={{ position: 'absolute', left: '50%', top: '52%', transform: 'translate(-50%, -50%)', zIndex: 5 }}>
      <m.div style={{
        x: portraitPX, y: portraitPY,
        width: PORTRAIT_W, aspectRatio: '3/4',
        willChange: 'transform',
      }}>
        {['top-left','top-right','bottom-left','bottom-right'].map(pos => (
          <m.div key={pos}
            animate={{ opacity: phase >= P.REVEAL ? 1 : 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Corner pos={pos} size={20} thickness={1.5} />
          </m.div>
        ))}
        <SpotlightPortrait phase={phase} />
      </m.div>
      </div>

      {/* ══ BIG TITLE + nameplate + roles — single anchored block ══ */}
      {titleVisible && (
        <div style={{
          position: 'absolute',
          bottom: 'clamp(88px,12vh,140px)',
          left: 0, right: 0,
          textAlign: 'center',
          zIndex: 10,
          filter: 'drop-shadow(0 2px 24px rgba(8,8,8,0.9))',
          pointerEvents: 'none',
        }}>
          {/* nameplate */}
          <div style={{
            marginBottom: 'clamp(10px,1.4vh,18px)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          }}>
            <TitleWord delay={0} style={{
              fontFamily: "'Rajdhani', monospace",
              fontSize: 'clamp(11px,1vw,14px)',
              letterSpacing: '0.32em', textTransform: 'uppercase',
              color: 'rgba(240,238,234,0.7)', fontWeight: 500,
            }}>{lh.nameplate}</TitleWord>
            <img src="/logo-mark.png" alt="" aria-hidden
              style={{ width: 22, height: 22, objectFit: 'contain', opacity: 0.5 }}
              onError={e => { e.currentTarget.style.display = 'none' }}
            />
          </div>

          {/* title lines — lineHeight 0.78 compresses vertical footprint */}
          <div style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(2.6rem,5.6vw,6.2rem)',
            lineHeight: 0.78, letterSpacing: '0.06em', textTransform: 'uppercase',
          }}>
            <div><TitleWord delay={0.09} scramble>{lh.titleLines[0]}</TitleWord></div>
            <div><TitleWord delay={0.18} accent scramble>{lh.titleLines[1]}</TitleWord></div>
            <div><TitleWord delay={0.27} scramble>{lh.titleLines[2]}</TitleWord></div>
          </div>

          {/* roles — flows directly below title, no separate absolute positioning */}
          <TitleWord delay={0.42} style={{
            display: 'block',
            marginTop: 'clamp(14px,2vh,22px)',
            fontFamily: "'Rajdhani', monospace",
            fontSize: 'clamp(11px,1.05vw,14px)',
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(240,238,234,0.65)', fontWeight: 400,
          }}>
            {lh.roles[0]}
            <span style={{ color: 'var(--color-accent)', opacity: 0.6, margin: '0 clamp(8px,1.5vw,20px)' }}>/</span>
            {lh.roles[1]}
            <span style={{ color: 'var(--color-accent)', opacity: 0.6, margin: '0 clamp(8px,1.5vw,20px)' }}>/</span>
            {lh.roles[2]}
          </TitleWord>
        </div>
      )}

      <HudPanel visible={isActive} delay={0.2} style={{
        position: 'absolute',
        bottom: 'clamp(22px,4vh,50px)',
        left: 0, right: 0,
        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 24,
        zIndex: 10,
        pointerEvents: 'none',
      }}>
        <button
          style={{
            fontFamily: "'Rajdhani', monospace",
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--color-accent)', background: 'transparent',
            border: '1px solid var(--color-accent)',
            padding: '12px 32px', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
            transition: 'background-color 0.2s',
            pointerEvents: 'auto',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,37,64,0.1)' }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
        >
          {lh.cta} <span style={{ fontSize: 14 }}>→</span>
        </button>

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
      <HudPanel visible={isActive} delay={0.4} style={{
        position: 'absolute',
        left: '50%', top: 'calc(42% + clamp(170px,26vh,330px))',
        transform: 'translateX(-50%)',
        zIndex: 10, textAlign: 'center', pointerEvents: 'none',
      }}>
        <HudLabel dim style={{ fontSize: '9px', letterSpacing: '0.24em' }}>
          {lh.revealHint}
        </HudLabel>
      </HudPanel>

      {/* ══ LEFT HUD ══ */}
      <div style={{ position: 'absolute', left: 'clamp(24px,3vw,52px)', top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
        <m.div style={{ x: leftPX, y: leftPY }}>
          <HudPanel visible={hudVisible} delay={0.2} style={{}}>
            {lh.skills.map((label, i) => (
              <div key={label} style={{ marginBottom: i < 2 ? 28 : 0 }}>
                <div style={{ fontFamily: "'Bebas Neue', sans-serif", fontSize: '1.7rem', color: 'var(--color-accent)', lineHeight: 1 }}>
                  <TickCounter target={i + 1} active={hudVisible} />
                </div>
                <div style={{ fontFamily: "'Rajdhani', monospace", fontSize: 'clamp(11px,1vw,13px)', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.65)', marginTop: 4 }}>
                  <ScrambleLabel text={label} active={hudVisible} />
                </div>
              </div>
            ))}
          </HudPanel>
        </m.div>
      </div>

      {/* ══ RIGHT HUD ══ */}
      <div style={{ position: 'absolute', right: 'clamp(24px,3vw,52px)', top: '50%', transform: 'translateY(-50%)', zIndex: 10, pointerEvents: 'none' }}>
      <m.div style={{ x: rightPX, y: rightPY }}>
      <HudPanel visible={hudVisible} delay={0.2} style={{
        maxWidth: 190, textAlign: 'right',
      }}>
        <HudLabel style={{ lineHeight: 1.7, marginBottom: 18 }}>
          {lh.rightCopy.map((line) => (
            <span key={line}>{line}<br /></span>
          ))}
        </HudLabel>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, marginBottom: 14 }}>
          <HudLabel dim>{lh.basedInLabel}</HudLabel>
          <HudLabel style={{ color: 'rgba(240,238,234,0.35)', marginTop: 2 }}>{lh.coordinates}</HudLabel>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14, marginBottom: 14 }}>
          <HudLabel dim>{lh.systemsLabel}</HudLabel>
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 3, marginTop: 5 }}>
            {Array.from({ length: 7 }).map((_, i) => (
              <m.span key={i}
                animate={{ scaleY: [0.3, 1, 0.3] }}
                transition={{ duration: 0.65 + i * 0.08, repeat: Infinity, delay: i * 0.1 }}
                style={{ display: 'inline-block', width: 3, height: 14, background: 'var(--color-accent)', transformOrigin: 'bottom' }}
              />
            ))}
          </div>
          <HudLabel accent style={{ marginTop: 3 }}>{lh.systemsStatus}</HudLabel>
        </div>
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.07)', paddingTop: 14 }}>
          <HudLabel dim>{lh.responseLabel}</HudLabel>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 8, marginTop: 5 }}>
            <Waveform />
            <HudLabel accent>0.01ms</HudLabel>
          </div>
        </div>
      </HudPanel>
      </m.div>
      </div>

      {/* ══ TOP-LEFT HUD ══ */}
      <HudPanel visible={hudVisible} delay={0.1} style={{
        position: 'absolute', top: 'clamp(60px,11vh,100px)', left: 'clamp(24px,3vw,52px)', zIndex: 10, pointerEvents: 'none',
      }}>
        <HudLabel dim><ScrambleLabel text={lh.interfaceMode} active={hudVisible} /></HudLabel>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6, marginTop: 3,
          fontFamily: "'Rajdhani', monospace", fontSize: '11px',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)',
        }}>
          <PulseDot />
          {phase >= P.ACTIVE ? lh.phaseActive : phase >= P.REVEAL ? lh.phaseScanning : lh.phaseBoot}
        </div>
      </HudPanel>

      {/* ══ TOP-RIGHT HUD ══ */}
      <HudPanel visible={hudVisible} delay={0.15} style={{
        position: 'absolute', top: 'clamp(60px,11vh,100px)', right: 'clamp(24px,3vw,52px)',
        textAlign: 'right', zIndex: 10, pointerEvents: 'none',
      }}>
        <HudLabel dim>{lh.statusLabel}</HudLabel>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 6, marginTop: 3,
          fontFamily: "'Rajdhani', monospace", fontSize: '11px',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--color-accent)',
        }}>
          {lh.online} <PulseDot />
        </div>
      </HudPanel>

      {/* ══ BOTTOM-LEFT ══ */}
      <HudPanel visible={hudVisible} delay={0.3} style={{
        position: 'absolute', bottom: 'clamp(16px,3vh,36px)', left: 'clamp(24px,3vw,52px)', zIndex: 10, pointerEvents: 'none',
      }}>
        <HudLabel dim style={{ marginBottom: 6 }}>{lh.locationLabel}</HudLabel>
        <HudLabel accent style={{ marginBottom: 8 }}>{lh.locationValue}</HudLabel>
        <WorldMapMini />
      </HudPanel>

      {/* ══ BOTTOM-RIGHT ══ */}
      <HudPanel visible={isActive} delay={0.4} style={{
        position: 'absolute', bottom: 'clamp(16px,3vh,36px)', right: 'clamp(24px,3vw,52px)', zIndex: 10, textAlign: 'right', pointerEvents: 'none',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          fontFamily: "'Rajdhani', monospace", fontSize: '9px',
          letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.35)',
        }}>
          <span style={{ color: 'var(--color-accent)', fontSize: 11 }}>●</span>
          {lh.availableForWork}
        </div>
      </HudPanel>
    </section>
  )
}
