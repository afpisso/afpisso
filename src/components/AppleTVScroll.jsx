/**
 * AppleTVScroll — scroll-driven hero → carousel reveal
 *
 * Phase 1 (0 – 0.22):  Hero — full-bleed, auto-advances with channel-change effect
 * Phase 2 (0.22 – 0.52): Morph — card shrinks, chamfer grows, black BG reveals
 * Phase 3 (0.52 – 1.0):  Carousel — paused, user navigates with directional slide
 */

import { useRef, useState, useCallback, useEffect } from 'react'
import {
  m,
  AnimatePresence,
  LayoutGroup,
  useTransform,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  animate,
} from 'framer-motion'
import { cases, CASE_ORDER } from '../data/cases'
import { useScramble } from '../hooks/useScramble'

const EASE_OUT = [0.16, 1, 0.3, 1]

// letterSpacing system: S=0.12em · M=0.18em · L=0.28em
const LS_S = '0.12em'
const LS_M = '0.18em'
const LS_L = '0.28em'

// Keyword pool — module-scope, never re-created on render
const HERO_WORDS = ['VISCERAL', 'SPATIAL', 'SYSTEMIC', 'HAPTIC', 'INTUITIVE', 'IMMERSIVE']
const HERO_MAX_CHARS = Math.max(...HERO_WORDS.map(w => w.length))

// 2-corner chamfer: top-right + bottom-left (consistent with CaseRail / system-wide style)
const chamferClip = (px) =>
  `polygon(0 0, calc(100% - ${px}px) 0, 100% ${px}px, 100% 100%, ${px}px 100%, 0 calc(100% - ${px}px))`

const SIDE_CLIP = chamferClip(18)
const BTN_CLIP  = chamferClip(6)

const ORCS_FIRST = [
  'orcs-must-die-by-the-blade',
  ...CASE_ORDER.filter(s => s !== 'orcs-must-die-by-the-blade' && s !== 'zomvilles'),
]

const ITEMS = ORCS_FIRST
  .map(slug => cases.find(c => c.slug === slug))
  .filter(Boolean)
  .slice(0, 6)

// ── SVG helpers ────────────────────────────────────────────────────────────────
function ArrowDownIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden>
      <path d="M4.5 1.5v6M2 5.5L4.5 8 7 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

// ── Nav button — SVG chevron, chamfer ghost ───────────────────────────────────
function NavBtn({ dir, onClick, opacity, pointerEvents }) {
  const isLeft = dir === 'left'
  return (
    <m.button
      onClick={onClick}
      whileHover={{ backgroundColor: 'var(--color-accent)', color: '#050505' }}
      whileTap={{ scale: 0.95 }}
      transition={{ duration: 0.15, ease: EASE_OUT }}
      style={{
        position:             'absolute',
        [isLeft ? 'left' : 'right']: 'clamp(12px, 2vw, 20px)',
        top:                  'calc(50% - 20px)',
        zIndex:               10,
        cursor:               'pointer',
        width:                40,
        height:               40,
        clipPath:             BTN_CLIP,
        border:               '1px solid var(--color-accent-30)',
        backgroundColor:      'var(--color-accent-08)',
        color:                'var(--color-accent)',
        display:              'flex',
        alignItems:           'center',
        justifyContent:       'center',
        opacity,
        pointerEvents,
        backdropFilter:       window.matchMedia('(hover: none)').matches ? 'none' : 'blur(8px)',
        WebkitBackdropFilter: window.matchMedia('(hover: none)').matches ? 'none' : 'blur(8px)',
        padding:              0,
      }}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden>
        {isLeft
          ? <path d="M8 2.5L4.5 6.5L8 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          : <path d="M5 2.5L8.5 6.5L5 10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        }
      </svg>
    </m.button>
  )
}

// useScroll mis-measures under Lenis — manual BoundingClientRect approach
function useSectionProgress(ref) {
  const progress = useMotionValue(0)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const rect  = el.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      const p     = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 1) : 0
      progress.set(p)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ref, progress])
  return progress
}

// ── Main component ─────────────────────────────────────────────────────────────
export default function AppleTVScroll() {
  const sectionRef = useRef(null)
  const flashRef   = useRef(null)
  const dirRef     = useRef(1)

  const [activeIdx,  setActiveIdx]  = useState(0)
  const [ctrHovered, setCtrHovered] = useState(false)
  const [inHero,     setInHero]     = useState(true)
  const [wordIdx,    setWordIdx]    = useState(0)
  const [scrambleTrigger, setScrambleTrigger] = useState(0)
  const [showScrollCue, setShowScrollCue]     = useState(false)

  const shouldReduce   = useReducedMotion()
  const scrollYProgress = useSectionProgress(sectionRef)

  // ── Card geometry (morph phase) ──
  const cardWVW  = useTransform(scrollYProgress, [0.22, 0.52], [100, 40], { clamp: true })
  const cardHVH  = useTransform(scrollYProgress, [0.22, 0.52], [100, 62], { clamp: true })
  const chamfer  = useTransform(scrollYProgress, [0.22, 0.52], [0, 36],   { clamp: true })
  const cardWidth  = useMotionTemplate`${cardWVW}vw`
  const cardHeight = useMotionTemplate`${cardHVH}vh`
  const cardClip   = useMotionTemplate`polygon(0 0, calc(100% - ${chamfer}px) 0, 100% ${chamfer}px, 100% 100%, ${chamfer}px 100%, 0 calc(100% - ${chamfer}px))`

  // ── Scroll-driven opacity / position ──
  const bgOpacity    = useTransform(scrollYProgress, [0.14, 0.44], [0, 1])
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18, 0.44, 0.52], [1, 0.96, 0, 0], { clamp: true })
  const titleY       = useTransform(scrollYProgress, [0.14, 0.56], [0, 28])
  const sidePrevX    = useTransform(scrollYProgress, [0.48, 0.68], [60, 0])
  const sideNextX    = useTransform(scrollYProgress, [0.48, 0.68], [-60, 0])
  const ctrlOpacity  = useTransform(scrollYProgress, [0.44, 0.62], [0, 1])
  const labelY       = useTransform(scrollYProgress, [0.58, 0.74], [16, 0])
  // Disable nav button pointer-events while invisible to prevent phantom clicks
  const ctrlPointerEvents = useTransform(ctrlOpacity, v => v > 0.1 ? 'auto' : 'none')

  // ── Phase tracking — compare before setState to avoid over-triggering re-renders ──
  useEffect(() => scrollYProgress.on('change', v => {
    setInHero(prev => {
      const next = v < 0.22
      return prev === next ? prev : next
    })
  }), [scrollYProgress])

  // ── Scroll cue — fixed timer cleanup (previous version leaked setTimeout) ──
  useEffect(() => {
    let timer = null
    const unsub = scrollYProgress.on('change', v => {
      if (v > 0.65) {
        if (!timer) timer = setTimeout(() => setShowScrollCue(true), 4000)
      } else {
        clearTimeout(timer)
        timer = null
        setShowScrollCue(false)
      }
    })
    return () => { unsub(); clearTimeout(timer) }
  }, [scrollYProgress])

  // ── Navigation ──
  const goNext    = useCallback(() => { dirRef.current =  1; setActiveIdx(i => (i + 1) % ITEMS.length) }, [])
  const goPrev    = useCallback(() => { dirRef.current = -1; setActiveIdx(i => (i - 1 + ITEMS.length) % ITEMS.length) }, [])
  const handleNav = useCallback((fn) => { setShowScrollCue(false); fn() }, [])

  // ── Keyboard navigation (WCAG 2.1.1) ──
  const handleKeyDown = useCallback((e) => {
    if (e.key === 'ArrowLeft')  handleNav(goPrev)
    if (e.key === 'ArrowRight') handleNav(goNext)
  }, [handleNav, goPrev, goNext])

  // ── Channel-change advance (hero phase only) ──
  const heroAdvance = useCallback(() => {
    if (flashRef.current) {
      animate(
        flashRef.current,
        { opacity: [0, 0.55, 0] },
        { duration: 0.18, ease: [0.4, 0, 0.6, 1], times: [0, 0.3, 1] },
      )
    }
    setTimeout(() => {
      dirRef.current = 1
      setActiveIdx(i => (i + 1) % ITEMS.length)
    }, 70)
  }, [])

  useEffect(() => {
    if (!inHero) return
    const tick = setInterval(heroAdvance, 5000)
    return () => clearInterval(tick)
  }, [inHero, heroAdvance])

  // ── Hero keyword cycling ──
  useEffect(() => {
    if (!inHero) return
    const t = setInterval(() => {
      setWordIdx(i => (i + 1) % HERO_WORDS.length)
      setScrambleTrigger(n => n + 1)
    }, 2400)
    return () => clearInterval(t)
  }, [inHero])

  const scrambledWord = useScramble(HERO_WORDS[wordIdx], {
    duration: 340,
    trigger:  scrambleTrigger,
    enabled:  !shouldReduce,
  })

  return (
    <section
      ref={sectionRef}
      aria-label="Case studies carousel"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ height: '420vh', position: 'relative', outline: 'none' }}
    >
      <div style={{
        position: 'sticky', top: 0, height: '100vh',
        overflow: 'hidden', background: '#000',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>

        {/* Dark background */}
        <m.div style={{
          position: 'absolute', inset: 0,
          background: 'var(--color-bg)',
          opacity: bgOpacity, zIndex: 0, pointerEvents: 'none',
        }} />

        {/* Ambient blur — thumbnail of active case, crossfades on slide */}
        <m.div style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden', opacity: bgOpacity }}>
          <AnimatePresence mode="popLayout">
            <m.div
              key={`amb-${ITEMS[activeIdx]?.slug}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: EASE_OUT }}
              style={{ position: 'absolute', inset: 0 }}
            >
              <img
                src={`/thumbnails/${ITEMS[activeIdx]?.slug}.jpg`}
                alt="" aria-hidden
                style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'blur(70px)', transform: 'scale(1.25)', opacity: 0.18 }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, var(--color-bg) 0%, transparent 28%, transparent 70%, var(--color-bg) 100%)' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 22%, transparent 78%, var(--color-bg) 100%)' }} />
            </m.div>
          </AnimatePresence>
        </m.div>

        {/* Carousel — layoutId FLIP physically moves each card between slots */}
        <LayoutGroup id="carousel-track">
          <AnimatePresence>
            {[-1, 0, 1].map(offset => {
              const idx   = (activeIdx + offset + ITEMS.length) % ITEMS.length
              const item  = ITEMS[idx]
              const isCtr = offset === 0
              const isLft = offset === -1

              return (
                <m.div
                  key={item.slug}
                  layoutId={item.slug}
                  layout
                  animate={{
                    opacity: 1,
                    filter: isCtr
                      ? 'saturate(1) brightness(1)'
                      : 'saturate(0.4) brightness(0.45)',
                  }}
                  initial={{ opacity: 0 }}
                  exit={{ opacity: 0, transition: { duration: 0.2 } }}
                  transition={{
                    layout:  { type: 'spring', stiffness: 350, damping: 35, mass: 0.8 },
                    filter:  { duration: 0.35, ease: EASE_OUT },
                    opacity: { duration: 0.25 },
                  }}
                  style={isCtr ? {
                    position:   'relative',
                    width:       cardWidth,
                    height:      cardHeight,
                    clipPath:    cardClip,
                    overflow:    'hidden',
                    zIndex:      2,
                    flexShrink:  0,
                    // GPU-composited shadow — box-shadow triggers paint on scroll-animated elements
                    filter: 'drop-shadow(0 48px 80px rgba(0,0,0,0.85))',
                  } : {
                    position:   'absolute',
                    ...(isLft
                      ? { right: 'calc(50% + 20vw + 10px)' }
                      : { left:  'calc(50% + 20vw + 10px)' }
                    ),
                    top:        '50%',
                    translateY: '-50%',
                    width:      'clamp(180px, 28vw, 420px)',
                    height:     '62vh',
                    clipPath:   SIDE_CLIP,
                    overflow:   'hidden',
                    zIndex:     1,
                    x:          isLft ? sidePrevX : sideNextX,
                    cursor:     'pointer',
                  }}
                  onClick={!isCtr ? (() => handleNav(isLft ? goPrev : goNext)) : undefined}
                  onHoverStart={() => { if (isCtr) setCtrHovered(true) }}
                  onHoverEnd={()   => { if (isCtr) setCtrHovered(false) }}
                  whileHover={!isCtr ? { filter: 'saturate(0.55) brightness(0.65)' } : undefined}
                  whileTap={!isCtr ? { scale: 0.97 } : undefined}
                >
                  <video
                    autoPlay={!window.matchMedia('(hover: none)').matches}
                    muted loop playsInline
                    preload="metadata"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                    onError={e => { e.currentTarget.style.display = 'none'; e.currentTarget.nextSibling.style.display = 'block' }}>
                    <source src={`/clips/${item.slug}-clip.webm`} type="video/webm" />
                    <source src={`/clips/${item.slug}-clip.mp4`}  type="video/mp4" />
                  </video>
                  <img src={`/thumbnails/${item.slug}.jpg`} alt="" aria-hidden
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'none', position: 'absolute', inset: 0 }} />

                  {/* Accent inset border — separate from filter:drop-shadow (inset not GPU-compositable) */}
                  {isCtr && (
                    <div aria-hidden style={{
                      position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none',
                      boxShadow: 'inset 0 0 0 1px var(--color-accent-15)',
                    }} />
                  )}

                  {/* Case ID — top-left (LS_M = 0.18em, up from 0.16em, min 9px) */}
                  <div style={{
                    position: 'absolute', top: 10, left: 12, zIndex: 6,
                    fontFamily: '"Play", sans-serif', fontSize: '9px',
                    letterSpacing: LS_M, textTransform: 'uppercase',
                    color: isCtr ? 'var(--color-accent)' : 'var(--color-accent-40)',
                    pointerEvents: 'none',
                  }}>
                    {item.id}
                  </div>

                  {isCtr && (
                    <>
                      {/* HUD bevel — top + left accent lines */}
                      <div aria-hidden style={{
                        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                        backgroundColor: ctrHovered ? 'rgba(255,37,64,0.95)' : 'rgba(255,37,64,0.55)',
                        zIndex: 6, pointerEvents: 'none',
                        transition: 'background-color 0.22s ease',
                      }} />
                      <div aria-hidden style={{
                        position: 'absolute', top: 0, left: 0, bottom: 0, width: 1,
                        backgroundColor: ctrHovered ? 'rgba(255,37,64,0.65)' : 'rgba(255,37,64,0.28)',
                        zIndex: 6, pointerEvents: 'none',
                        transition: 'background-color 0.22s ease',
                      }} />

                      {/* Channel-change flash overlay */}
                      <div ref={flashRef} aria-hidden style={{
                        position: 'absolute', inset: 0, zIndex: 20,
                        background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, var(--color-accent-30) 100%)',
                        opacity: 0, pointerEvents: 'none',
                      }} />

                      {/* Gradient vignette */}
                      <div style={{
                        position: 'absolute', bottom: 0, left: 0, right: 0, height: '45%',
                        background: 'linear-gradient(to top, rgba(0,0,0,0.82) 0%, transparent 100%)',
                        pointerEvents: 'none',
                      }} />

                      {/* Case label + platform tags */}
                      <m.div style={{ position: 'absolute', bottom: 'clamp(14px,2.8vh,26px)', left: 'clamp(14px,2.8vw,28px)', right: 'clamp(14px,2.8vw,28px)', opacity: ctrlOpacity, y: labelY, pointerEvents: 'none' }}>
                        {/* Counter row — LS_L (display weight) */}
                        <div style={{ fontFamily: '"Play", sans-serif', fontSize: '9px', letterSpacing: LS_L, textTransform: 'uppercase', color: 'var(--color-accent)', marginBottom: 4, display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span>{String(activeIdx + 1).padStart(2, '0')}&nbsp;/&nbsp;{String(ITEMS.length).padStart(2, '0')}</span>
                          {item.title.includes(':') && (
                            <span style={{ color: 'rgba(240,238,234,0.38)', borderLeft: '1px solid var(--color-accent-30)', paddingLeft: 8, letterSpacing: LS_M }}>
                              {item.title.split(':')[0].trim().toUpperCase()}
                            </span>
                          )}
                        </div>
                        <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.1rem,2.4vw,2.2rem)', color: 'var(--color-fg)', lineHeight: 1, letterSpacing: '0.04em', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {item.title.includes(':') ? item.title.split(':')[1].trim() : item.title}
                        </div>
                        {/* Platform tags — LS_S (micro weight, paddingLeft 6px) */}
                        {item.platform?.length > 0 && (
                          <div style={{ marginTop: 6, display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                            {item.platform.slice(0, 2).map(p => (
                              <span key={p} style={{
                                fontFamily: '"Play", sans-serif',
                                fontSize: '7px', letterSpacing: LS_S, textTransform: 'uppercase',
                                color: 'var(--color-fg-mute)',
                                borderLeft: '1px solid var(--color-accent-30)',
                                paddingLeft: 6,
                              }}>
                                {p}
                              </span>
                            ))}
                          </div>
                        )}
                      </m.div>

                      {/* Navigation — pointerEvents derived from ctrlOpacity to prevent phantom clicks */}
                      <NavBtn dir="left"  onClick={() => handleNav(goPrev)} opacity={ctrlOpacity} pointerEvents={ctrlPointerEvents} />
                      <NavBtn dir="right" onClick={() => handleNav(goNext)} opacity={ctrlOpacity} pointerEvents={ctrlPointerEvents} />
                    </>
                  )}
                </m.div>
              )
            })}
          </AnimatePresence>
        </LayoutGroup>

        {/* Title overlay — "Designed for" dimmed so the keyword is the loudest element */}
        <m.div style={{
          position: 'absolute', bottom: '11%', left: 0, right: 0,
          textAlign: 'center', opacity: titleOpacity, y: titleY,
          zIndex: 5, pointerEvents: 'none', userSelect: 'none',
        }}>
          <div style={{
            position: 'absolute', inset: '-48px -60px',
            background: 'radial-gradient(ellipse 70% 100% at 50% 60%, rgba(0,0,0,0.62) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          <span style={{ position: 'relative', fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(3rem, 9vw, 8.5rem)', color: 'var(--color-fg-dim)', lineHeight: 0.9, display: 'block', letterSpacing: '0.015em' }}>
            Designed for
          </span>
          <span style={{ position: 'relative', fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(3rem, 9vw, 8.5rem)', lineHeight: 0.9, display: 'block', letterSpacing: '0.015em' }}>
            <span style={{ color: 'var(--color-fg-dim)' }}>the </span>
            {/* inline-block + minWidth prevents layout jitter as Bebas Neue is not monospace */}
            <span
              aria-live="polite"
              aria-label={HERO_WORDS[wordIdx]}
              style={{
                color: 'var(--color-accent)',
                display: 'inline-block',
                minWidth: `${HERO_MAX_CHARS * 0.56}ch`,
                textAlign: 'left',
              }}
            >
              {scrambledWord}
            </span>
            <span style={{ color: 'var(--color-fg-dim)' }}>.</span>
          </span>
        </m.div>

        {/* Edge fade — side cards dissolve into black at viewport edges */}
        <div aria-hidden style={{
          position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none',
          background: 'linear-gradient(to right, var(--color-bg) 0%, transparent 12%, transparent 88%, var(--color-bg) 100%)',
        }} />

        {/* Scroll cue — timer is correctly cleaned up (was leaking in prior version) */}
        <AnimatePresence>
          {showScrollCue && (
            <m.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
              style={{
                position: 'absolute', bottom: 'clamp(18px, 3vh, 32px)', left: 0, right: 0,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                zIndex: 4, pointerEvents: 'none',
              }}
            >
              <div style={{ width: 28, height: 1, background: 'var(--color-accent)', opacity: 0.4 }} />
              <span style={{
                fontFamily: '"Play", sans-serif', fontSize: '9px',
                letterSpacing: LS_L, textTransform: 'uppercase',
                color: 'rgba(240,238,234,0.35)',
                display: 'flex', alignItems: 'center', gap: 5,
              }}>
                Scroll <ArrowDownIcon />
              </span>
              <div style={{ width: 28, height: 1, background: 'var(--color-accent)', opacity: 0.4 }} />
            </m.div>
          )}
        </AnimatePresence>

        {/* CTA on last item */}
        <AnimatePresence>
          {activeIdx === ITEMS.length - 1 && (
            <m.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }}
              transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.3 }}
              style={{
                position: 'absolute', top: 'clamp(18px, 3vh, 30px)', left: 0, right: 0,
                display: 'flex', justifyContent: 'center',
                zIndex: 4, pointerEvents: 'none',
              }}
            >
              <span style={{
                fontFamily: '"Play", sans-serif', fontSize: '9px',
                letterSpacing: LS_L, textTransform: 'uppercase',
                color: 'rgba(240,238,234,0.38)',
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                06 / 06 — Ver trabajo completo <ArrowDownIcon />
              </span>
            </m.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}
