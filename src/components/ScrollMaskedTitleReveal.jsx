import { useEffect, useRef, useCallback } from 'react'

/**
 * ScrollMaskedTitleReveal
 *
 * Hero animado por scroll: título gigante → composición con máscara de bloques
 * → imagen revelada por ventanas → regreso al título limpio.
 *
 * Props:
 *   title        — texto del título (default "SHOGUN PIZZA")
 *   imageSrc     — URL de la imagen de fondo
 *   imageAlt     — alt text de la imagen
 *   scrollHeight — altura del wrapper de scroll (default "500vh")
 *   blockColor   — color de los bloques máscara (default "#0a0a0a")
 *   bgColor      — color de fondo (default "#0a0a0a")
 */
export default function ScrollMaskedTitleReveal({
  title       = 'SHOGUN PIZZA',
  imageSrc    = 'https://picsum.photos/seed/shogun/1800/900',
  imageAlt    = '',
  scrollHeight = '500vh',
  blockColor  = '#0a0a0a',
  bgColor     = '#0a0a0a',
}) {
  const sectionRef    = useRef(null)
  const stripRef      = useRef(null)
  const imgRef        = useRef(null)
  const titleRef      = useRef(null)
  const blockElsRef   = useRef([])
  const rafRef        = useRef(null)
  const stateRef      = useRef({ target: 0, current: 0 })

  // ─── Block definitions ──────────────────────────────────────────
  const BLOCKS = [
    // Top row
    { rect: { l:  0, t:  0, w: 44, h: 35 }, from: 'top',    enterAt: 0.12, peakAt: 0.28, exitAt: 0.70 },
    { rect: { l: 46, t:  0, w: 54, h: 30 }, from: 'top',    enterAt: 0.15, peakAt: 0.30, exitAt: 0.72 },
    { rect: { l: 36, t:  0, w: 12, h: 12 }, from: 'top',    enterAt: 0.20, peakAt: 0.35, exitAt: 0.66 },
    // Flanks
    { rect: { l:  0, t: 33, w:  5, h: 34 }, from: 'left',   enterAt: 0.16, peakAt: 0.32, exitAt: 0.68 },
    { rect: { l: 95, t: 30, w:  5, h: 40 }, from: 'right',  enterAt: 0.17, peakAt: 0.31, exitAt: 0.70 },
    // Bottom row
    { rect: { l:  0, t: 66, w: 40, h: 34 }, from: 'bottom', enterAt: 0.13, peakAt: 0.27, exitAt: 0.73 },
    { rect: { l: 44, t: 70, w: 24, h: 30 }, from: 'bottom', enterAt: 0.18, peakAt: 0.32, exitAt: 0.68 },
    { rect: { l: 70, t: 67, w: 30, h: 33 }, from: 'bottom', enterAt: 0.14, peakAt: 0.29, exitAt: 0.71 },
    // Small accents
    { rect: { l: 80, t:  0, w: 14, h:  8 }, from: 'top',    enterAt: 0.24, peakAt: 0.38, exitAt: 0.62 },
    { rect: { l:  0, t: 88, w: 22, h: 12 }, from: 'bottom', enterAt: 0.22, peakAt: 0.36, exitAt: 0.64 },
    { rect: { l: 36, t: 62, w: 10, h:  8 }, from: 'bottom', enterAt: 0.26, peakAt: 0.40, exitAt: 0.60 },
  ]

  // ─── Helpers ─────────────────────────────────────────────────────
  const ease = t => t < 0.5 ? 2*t*t : -1 + (4 - 2*t)*t

  function remap(v, i0, i1, o0, o1) {
    const t = Math.max(0, Math.min(1, (v - i0) / (i1 - i0)))
    return o0 + (o1 - o0) * ease(t)
  }

  function blockOffset(b) {
    const K = 1.1
    switch (b.from) {
      case 'top':    return { x: 0, y: -(b.rect.t + b.rect.h) * K }
      case 'bottom': return { x: 0, y:  (100 - b.rect.t) * K }
      case 'left':   return { x: -(b.rect.l + b.rect.w) * K, y: 0 }
      case 'right':  return { x:  (100 - b.rect.l) * K, y: 0 }
    }
  }

  // ─── Animate ─────────────────────────────────────────────────────
  const animate = useCallback(() => {
    const s = stateRef.current
    s.current += (s.target - s.current) * 0.08
    const p = s.current

    // Visual strip: fade in → hold → fade out
    if (stripRef.current) {
      const opacity = Math.min(
        remap(p, 0.00, 0.14, 0, 1),
        remap(p, 0.68, 0.88, 1, 0),
      )
      stripRef.current.style.opacity = opacity
    }

    // Image horizontal parallax
    if (imgRef.current) {
      const imgX = remap(p, 0.10, 0.90, 0, -30)
      imgRef.current.style.transform = `translate3d(${imgX}%, 0, 0)`
    }

    // Mask blocks
    BLOCKS.forEach((b, i) => {
      const el = blockElsRef.current[i]
      if (!el) return
      const off    = blockOffset(b)
      const enterT = remap(p, b.enterAt, b.peakAt, 0, 1)
      const exitT  = remap(p, b.exitAt, b.exitAt + 0.14, 0, 1)
      const tx = off.x * (1 - enterT) + off.x * exitT
      const ty = off.y * (1 - enterT) + off.y * exitT
      el.style.transform = `translate3d(${tx}vw, ${ty}vh, 0)`
    })

    // Title: subtle fade + scale at peak
    if (titleRef.current) {
      const fade  = 1 - remap(p, 0.28, 0.50, 0, 0.55) + remap(p, 0.62, 0.78, 0, 0.55)
      const scale = 1 - remap(p, 0.28, 0.52, 0, 0.05) + remap(p, 0.62, 0.78, 0, 0.05)
      titleRef.current.style.opacity   = Math.max(0.35, Math.min(1, fade))
      titleRef.current.style.transform = `scale(${scale})`
    }

    rafRef.current = requestAnimationFrame(animate)
  }, []) // eslint-disable-line

  // ─── Scroll listener ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current
      if (!el) return
      const rect   = el.getBoundingClientRect()
      const travel = el.offsetHeight - window.innerHeight
      stateRef.current.target = Math.max(0, Math.min(1, -rect.top / travel))
    }

    // Respect reduced-motion
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      // Static final state: show title only
      if (stripRef.current) stripRef.current.style.opacity = 0
      return
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('scroll', onScroll)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [animate])

  // ─── Render ──────────────────────────────────────────────────────
  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', height: scrollHeight }}
    >
      {/* Sticky stage */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100dvh',
        overflow: 'hidden',
        background: bgColor,
      }}>

        {/* Visual strip (image + grid) */}
        <div
          ref={stripRef}
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            opacity: 0,
            willChange: 'opacity',
          }}
        >
          <img
            ref={imgRef}
            src={imageSrc}
            alt={imageAlt}
            crossOrigin="anonymous"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '160%',
              height: '100%',
              objectFit: 'cover',
              willChange: 'transform',
            }}
          />
          {/* Grid overlay */}
          <div style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            pointerEvents: 'none',
            backgroundImage: `
              repeating-linear-gradient(to right, rgba(255,255,255,0.07) 0 1px, transparent 1px 10px),
              repeating-linear-gradient(to bottom, rgba(255,255,255,0.07) 0 1px, transparent 1px 10px)
            `,
          }} />
        </div>

        {/* Mask blocks */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 20, pointerEvents: 'none' }}>
          {BLOCKS.map((b, i) => (
            <div
              key={i}
              ref={el => blockElsRef.current[i] = el}
              style={{
                position: 'absolute',
                left:   b.rect.l + 'vw',
                top:    b.rect.t + 'vh',
                width:  b.rect.w + 'vw',
                height: b.rect.h + 'vh',
                background: blockColor,
                willChange: 'transform',
              }}
            />
          ))}
        </div>

        {/* Title */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 30,
          pointerEvents: 'none',
        }}>
          <span
            ref={titleRef}
            style={{
              fontFamily: "'Barlow Condensed', Impact, 'Arial Black', sans-serif",
              fontWeight: 900,
              fontSize: 'clamp(3rem, 16vw, 18vw)',
              color: '#f0ede8',
              textTransform: 'uppercase',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.02em',
              lineHeight: 1,
              willChange: 'transform, opacity',
              textShadow: '0 0 80px rgba(0,0,0,0.4)',
            }}
          >
            {title}
          </span>
        </div>

      </div>
    </section>
  )
}
