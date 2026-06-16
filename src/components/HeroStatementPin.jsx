/**
 * HeroStatementPin — scroll-driven hero → portrait card transition.
 * Used on both the main page (/) and /lab.
 */
import { useRef, useEffect } from 'react'
import { m, useTransform, useMotionValue } from 'framer-motion'
import LabHero from '../pages/LabHero'
import { useLenis } from '../contexts/LenisContext'

// Section scroll progress, measured manually from the element's rect.
// framer's useScroll mis-measures against the whole document under Lenis;
// this reads the real section position each scroll frame instead.
// Uses Lenis event bus when available; falls back to native scroll on touch devices.
function useSectionProgress(ref) {
  const progress = useMotionValue(0)
  const lenisRef = useLenis()
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const update = () => {
      const rect = el.getBoundingClientRect()
      const range = rect.height - window.innerHeight
      const p = range > 0 ? Math.min(Math.max(-rect.top / range, 0), 1) : 0
      progress.set(p)
    }
    update()
    const lenis = lenisRef?.current
    if (lenis) {
      lenis.on('scroll', update)
      window.addEventListener('resize', update)
      return () => {
        lenis.off('scroll', update)
        window.removeEventListener('resize', update)
      }
    } else {
      window.addEventListener('scroll', update, { passive: true })
      window.addEventListener('resize', update)
      return () => {
        window.removeEventListener('scroll', update)
        window.removeEventListener('resize', update)
      }
    }
  }, [ref, progress, lenisRef])
  return progress
}

const MARQUEE_SERVICES = [
  'Game UX/UI Design', 'HUD Clarity', 'UI Systems', 'Player Decision-Making',
  'UX Lead', 'LiveOps UX', 'UEFN / Fortnite', 'VR Interfaces',
  'Accessibility', '11+ Years', 'Bogotá — Remote', 'Clarity before polish',
]

const IP_LOGOS = [
  '/logos/StarWarsLogo.svg',
  '/logos/OMDLogo.svg',
  '/logos/Fortnite-Logo.wine.svg',
  '/logos/metaLogo.svg',
  '/logos/DnDLogo.svg',
  '/logos/TWDLogo.svg',
]

function MarqueeBand({ items, reverse = false, size = '5.8rem', opacity = 0.14 }) {
  const track = [...items, ...items, ...items]
  return (
    <div style={{ overflow: 'hidden', width: '100%', pointerEvents: 'none' }}>
      <div style={{
        display: 'inline-flex', whiteSpace: 'nowrap',
        animationName: reverse ? 'marquee-r' : 'marquee-f',
        animationDuration: `${items.length * 7}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        willChange: 'transform',
      }}>
        {track.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: size, letterSpacing: '0.04em', textTransform: 'uppercase',
            color: `rgba(255,37,64,${opacity})`,
            padding: '0 clamp(20px,2.5vw,44px)', lineHeight: 1, flexShrink: 0,
          }}>
            {item}
            <span style={{ color: 'var(--color-accent)', opacity: 0.5, margin: '0 0.3em' }}>·</span>
          </span>
        ))}
      </div>
    </div>
  )
}

function MarqueeBandIcons({ logos, reverse = false, imgOpacity = 0.22 }) {
  const track = [...logos, ...logos, ...logos]
  return (
    <div style={{ overflow: 'hidden', width: '100%', pointerEvents: 'none' }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', whiteSpace: 'nowrap',
        animationName: reverse ? 'marquee-r' : 'marquee-f',
        animationDuration: `${logos.length * 3.5}s`,
        animationTimingFunction: 'linear',
        animationIterationCount: 'infinite',
        willChange: 'transform',
      }}>
        {track.map((src, i) => (
          <span key={i} style={{
            display: 'inline-flex', alignItems: 'center', flexShrink: 0,
            padding: '0 clamp(20px,3vw,48px)',
          }}>
            <img
              src={src} alt="" aria-hidden
              style={{
                height: 'clamp(28px,3.5vw,52px)', width: 'auto',
                maxWidth: 'clamp(80px,10vw,160px)', objectFit: 'contain',
                opacity: imgOpacity, filter: 'brightness(0) invert(1)', display: 'block',
              }}
            />
          </span>
        ))}
      </div>
    </div>
  )
}

function LogoDraw({ drawProgress }) {
  const dash1 = useTransform(drawProgress, v => 1 - v)
  const dash2 = useTransform(drawProgress, v => Math.max(0, 1 - (v - 0.15) / 0.85))
  return (
    <svg viewBox="0 0 183 201" fill="none" style={{ width: '55%', maxWidth: 160, overflow: 'visible' }} aria-hidden>
      <m.path
        d="M5.11204 159.059H33.9783C35.4947 159.059 36.8946 158.268 37.6542 156.986L111.918 31.3107C112.675 30.0282 112.675 28.45 111.918 27.1704L97.3804 2.49951C95.4158 -0.833169 90.4942 -0.833169 88.5296 2.49951L0.688093 151.583C-1.27067 154.91 1.18579 159.061 5.11204 159.061V159.059Z"
        stroke="white" strokeWidth={3} strokeLinejoin="round"
        pathLength="1" strokeDasharray="1" style={{ strokeDashoffset: dash1 }}
      />
      <m.path
        d="M126.499 61.0914C125.07 61.0914 123.641 61.7824 122.823 63.1644L107.26 89.4959C106.504 90.7784 106.504 92.3537 107.26 93.6362L122.183 118.958C124.141 122.285 121.685 126.437 117.759 126.437H87.8853C86.369 126.437 84.969 127.227 84.2094 128.51L66.3331 158.757C65.591 160.014 65.5735 161.561 66.2924 162.835L86.1041 197.902C87.0762 199.619 88.8254 200.481 90.5746 200.481C92.3238 200.481 94.073 199.622 95.0451 197.902L116.874 159.266C116.9 159.221 116.923 159.172 116.947 159.127H177.886C181.816 159.127 184.272 154.975 182.31 151.648L130.172 63.1644C129.357 61.7795 127.925 61.0857 126.493 61.0857L126.499 61.0914Z"
        stroke="white" strokeWidth={3} strokeLinejoin="round"
        pathLength="1" strokeDasharray="1" style={{ strokeDashoffset: dash2 }}
      />
    </svg>
  )
}

export default function HeroStatementPin({ hideLabHeroTopBar = false }) {
  const ref = useRef(null)
  const scrollYProgress = useSectionProgress(ref)

  const heroOpacity    = useTransform(scrollYProgress, [0, 0.13], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.11], [0, 1])

  const wVW   = useTransform(scrollYProgress, [0.11, 0.55], [42, 20], { clamp: true })
  const hVW   = useTransform(scrollYProgress, [0.11, 0.55], [56, 27], { clamp: true })
  const cardW = useTransform(wVW, v => `clamp(180px, ${v}vw, 630px)`)
  const cardH = useTransform(hVW, v => `clamp(240px, ${v}vw, 840px)`)
  const cardBg = useTransform(scrollYProgress, [0.18, 0.48], ['#080808', '#C60A2A'])

  const mTopOp    = useTransform(scrollYProgress, [0.2, 0.45], [0, 1])
  const mTopY     = useTransform(scrollYProgress, [0.2, 0.5], [-60, 0])
  const mBottomOp = useTransform(scrollYProgress, [0.2, 0.45], [0, 1])
  const mBottomY  = useTransform(scrollYProgress, [0.2, 0.5], [60, 0])

  const helmetOp   = useTransform(scrollYProgress, [0, 0.30, 0.46], [1, 1, 0], { clamp: true })
  const faceHelmOp = useTransform(scrollYProgress, [0.28, 0.38, 0.44, 0.58], [0, 1, 1, 0], { clamp: true })
  const faceOp     = useTransform(scrollYProgress, [0.44, 0.60, 0.78], [0, 0.9, 0.8], { clamp: true })
  const borderOp   = useTransform(scrollYProgress, [0.45, 0.72], [0, 1], { clamp: true })

  const logoOpacity  = useTransform(scrollYProgress, [0.48, 0.65], [0, 1])
  const sigDraw      = useTransform(scrollYProgress, [0.55, 0.85], [0, 1])
  const labelOpacity = useTransform(scrollYProgress, [0.58, 0.75], [0, 1])
  const cueOpacity   = useTransform(scrollYProgress, [0.82, 1], [0, 1])

  return (
    <>
      <style>{`
        @keyframes marquee-f { from { transform: translateX(0) } to { transform: translateX(-33.333%) } }
        @keyframes marquee-r { from { transform: translateX(-33.333%) } to { transform: translateX(0) } }
      `}</style>

      <div ref={ref} style={{ height: '340vh', position: 'relative' }}>
        <div style={{
          position: 'sticky', top: 0, height: '100vh',
          overflow: 'hidden', background: 'var(--color-bg)',
        }}>

          <m.div style={{ position: 'absolute', inset: 0, opacity: heroOpacity, zIndex: 1 }}>
            <LabHero hideTopBar={hideLabHeroTopBar} />
          </m.div>

          <m.div style={{
            position: 'absolute', left: 0, right: 0, top: '46%',
            transform: 'translateY(-50%)',
            opacity: mTopOp, y: mTopY, zIndex: 2,
            pointerEvents: 'none',
          }}>
            <MarqueeBand items={MARQUEE_SERVICES} reverse={false} size='clamp(3rem,6vw,7rem)' />
          </m.div>
          <m.div style={{
            position: 'absolute', left: 0, right: 0, top: '56%',
            transform: 'translateY(-50%)',
            opacity: mBottomOp, y: mBottomY, zIndex: 2,
            pointerEvents: 'none',
          }}>
            <MarqueeBandIcons logos={IP_LOGOS} reverse={true} imgOpacity={0.28} />
          </m.div>

          <m.div style={{
            position: 'absolute', top: '52%', left: '50%',
            x: '-50%', y: '-50%',
            width: cardW, height: cardH,
            opacity: overlayOpacity,
            overflow: 'hidden', zIndex: 5,
            willChange: 'width, height, transform',
            background: cardBg,
            clipPath: 'polygon(0 0, calc(100% - 20px) 0, 100% 20px, 100% 100%, 20px 100%, 0 calc(100% - 20px))',
            boxShadow: '0 40px 120px rgba(0,0,0,0.7)',
            pointerEvents: 'none',
          }}>
            <m.div style={{
              position: 'absolute', inset: 0, zIndex: 10, pointerEvents: 'none',
              border: '1.5px solid rgba(255,37,64,0.75)',
              opacity: borderOp,
            }} />

            <m.img src="/lab/helmet.webp" alt="Andres Pisso"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center top', display: 'block',
                opacity: helmetOp }}
            />
            <m.img src="/lab/face-helmet.webp" alt="" aria-hidden
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center 75%', display: 'block',
                opacity: faceHelmOp, mixBlendMode: 'screen' }}
            />
            <m.img src="/lab/face.webp" alt="" aria-hidden
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center 75%', display: 'block',
                opacity: faceOp, mixBlendMode: 'screen' }}
            />

            <m.div style={{
              position: 'absolute', bottom: 0, left: 0, right: 0,
              padding: 'clamp(10px,1.5vh,18px) clamp(12px,1.5vw,20px)',
              opacity: logoOpacity, zIndex: 3,
              background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 100%)',
            }}>
              <div style={{
                fontFamily: "'Bebas Neue', sans-serif",
                fontSize: 'clamp(0.75rem,1.4vw,1.1rem)',
                letterSpacing: '0.12em', color: '#fff', lineHeight: 1,
              }}>
                ANDRES FELIPE PISSO
              </div>
              <div style={{
                fontFamily: "'Play', sans-serif", fontSize: 'clamp(7px,0.8vw,9px)',
                letterSpacing: '0.24em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.55)', marginTop: 3,
              }}>
                Game UX/UI · Since 2014
              </div>
            </m.div>

            <m.div style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              opacity: logoOpacity, zIndex: 4,
            }}>
              <LogoDraw drawProgress={sigDraw} />
            </m.div>
          </m.div>

          <m.div style={{
            position: 'absolute', top: 'clamp(28px,5vh,56px)', left: 0, right: 0,
            textAlign: 'center', opacity: labelOpacity, zIndex: 6,
            fontFamily: "'Play', sans-serif", fontSize: '10px',
            letterSpacing: '0.32em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.5)',
          }}>
            Selected Work
          </m.div>

          <m.div style={{
            position: 'absolute', bottom: 'clamp(22px,4vh,44px)', left: '50%', x: '-50%',
            display: 'flex', alignItems: 'center', gap: 12, opacity: cueOpacity, zIndex: 6,
          }}>
            <div style={{ width: 36, height: 1, background: 'var(--color-accent)', opacity: 0.5 }} />
            <span style={{
              fontFamily: "'Play', sans-serif", fontSize: '9px',
              letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(240,238,234,0.35)',
            }}>Scroll ↓</span>
            <div style={{ width: 36, height: 1, background: 'var(--color-accent)', opacity: 0.5 }} />
          </m.div>

        </div>
      </div>
    </>
  )
}
