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

import { useRef, useState, useCallback, useEffect } from 'react'
import {
  m,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
  useInView,
  useReducedMotion,
} from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import HeroStatementPin from '../components/HeroStatementPin'
import { cases, CASE_ORDER } from '../data/cases'
import { useSignalAudio } from '../contexts/SignalAudioContext'

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
function SideNav({ active, cases: list, onHover, visible }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <m.div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      animate={{ opacity: visible ? 1 : 0, pointerEvents: visible ? 'auto' : 'none' }}
      transition={{ duration: 0.4, ease: EASE_OUT }}
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
                fontFamily: "'Play', monospace",
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
    </m.div>
  )
}

function CaseShowcase() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)

  const [navVisible, setNavVisible] = useState(false)

  const { scrollYProgress } = useScroll({
    target:  sectionRef,
    offset: ['start start', 'end end'],
  })

  useMotionValueEvent(scrollYProgress, 'change', v => {
    setActive(Math.min(Math.floor(v * ORDERED.length), ORDERED.length - 1))
    setNavVisible(v > 0.01)
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
            fontFamily: "'Play', monospace",
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
                fontFamily: "'Play', monospace",
                fontSize: 'clamp(11px, 1vw, 13px)', lineHeight: 1.75,
                color: 'var(--color-fg-dim)', maxWidth: '40ch', marginBottom: 28,
              }}>
                {c.headline || c.description?.slice(0, 120) + '…'}
              </p>

              <Link
                to={`/case/${c.slug}`}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: "'Play', monospace",
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
              fontFamily: "'Play', monospace",
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
        <SideNav active={active} cases={ORDERED} onHover={handleNavHover} visible={navVisible} />
      </div>
    </section>
  )
}

// ── Beat 3 — Lab Footer ───────────────────────────────────────────────────────

const SKILL_BAR = [
  'UX SYSTEMS', 'GAME UX', 'PRODUCT STRATEGY', 'INTERACTION', 'PROTOTYPING', 'RESEARCH',
]

const NAV_LINKS = [
  { label: 'HOME',     to: '/'          },
  { label: 'WORK',     to: '/work'      },
  { label: 'ABOUT',    to: '/about'     },
  { label: 'JOURNAL',  to: '/notes'     },
  { label: 'SPEAKING', to: '/speaking'  },
]
const CONTACT_LINK = { label: 'CONTACT', to: '/#contact' }

const CONNECT_LINKS = [
  { label: 'LINKEDIN',  handle: 'in/byandresfe',  href: 'https://linkedin.com/in/byandresfe'  },
  { label: 'INSTAGRAM', handle: '@byandresfe',     href: 'https://instagram.com/byandresfe'    },
  { label: 'X',         handle: '@byandresfe',     href: 'https://x.com/byandresfe'            },
  { label: 'EMAIL',     handle: 'afp.fenrir',      href: 'mailto:afp.fenrir@gmail.com'         },
]

const CLIENT_LOGOS = [
  { id: 'fortnite', name: 'Fortnite',           logo: '/logos/Fortnite-Logo.wine.svg', h: 24, w: 130 },
  { id: 'starwars', name: 'Star Wars',           logo: '/logos/StarWarsLogo.svg',       h: 26, w: 130 },
  { id: 'meta',     name: 'Meta',               logo: '/logos/metaLogo.svg',            h: 18, w: 72  },
  { id: 'omd',      name: 'Orcs Must Die',      logo: '/logos/OMDLogo.svg',             h: 36, w: 100 },
  { id: 'twd',      name: 'The Walking Dead',   logo: '/logos/TWDLogo.svg',             h: 26, w: 120 },
  { id: 'dnd',      name: 'Dungeons & Dragons', logo: '/logos/DnDLogo.svg',             h: 24, w: 130 },
]

const FOOTER_FRAME_PATH = "M742.366 13.4284L874.077 13.5099C893.238 13.5018 914.913 12.8668 933.895 14.1077C949.105 15.1021 957.146 38.66 973.58 38.8624C991.901 39.0881 1010.22 39.0445 1028.49 39.0443L1132.31 39.0292L1447.72 39.0203L1543.29 38.9595C1559.68 38.939 1576.65 38.1711 1592.91 39.9471C1603.41 40.7617 1613.51 50.1157 1617.35 59.6383C1621.06 68.8323 1619.86 84.4523 1619.86 94.738L1619.84 144.395L1619.8 306.989L1619.94 839.318C1619.97 852.123 1619.78 862.708 1609.75 872.575C1604.78 877.407 1598.43 880.573 1591.57 881.651C1584.93 882.638 1569.39 882.238 1562.21 882.214L1513.31 882.157L1335.22 882.14C1313.85 882.206 1316.21 882.72 1300.6 898.357C1296.96 902.005 1290.62 907.008 1285.36 907.261C1274.36 907.8 1262.2 907.571 1251.19 907.571L1178.39 907.555L921.828 907.579L565.743 907.538L448.603 907.571C428.641 907.579 408.43 907.702 388.465 907.424C369.89 907.171 365.16 882.402 346.616 882.271C324.266 882.116 301.827 882.157 279.487 882.157L151.717 882.108L108.042 882.271C99.2673 882.304 88.5177 883.038 80.455 881.602C53.9174 876.893 49.2346 855.836 50.9349 832.658C51.4039 826.268 50.9485 816.866 50.9584 810.475L51.0049 735.243L51.065 485.317L50.9854 208.32L51.115 119.631C51.1268 103.583 50.9369 87.3912 51.3965 71.3422C51.7053 60.5555 57.564 50.7054 66.3322 44.5069C76.5427 37.2885 88.0001 39.3337 99.7522 38.948C110.005 38.778 120.465 38.9473 130.77 38.9621L234.256 39.004L544.251 39.008L643.517 39.0387C660.673 39.0529 681.146 39.28 697.937 38.8528C715.47 38.4066 718.081 15.3567 742.366 13.4284Z"

function PlusMarker({ style: s, size = 16, opacity = 0.7 }) {
  return (
    <div style={{ position: 'absolute', ...s, pointerEvents: 'none', zIndex: 30 }}>
      <svg width={size} height={size} viewBox="0 0 18 18" fill="none">
        <line x1="9" y1="0" x2="9" y2="18" stroke="var(--color-accent)" strokeWidth="1.2" opacity={opacity}/>
        <line x1="0" y1="9" x2="18" y2="9" stroke="var(--color-accent)" strokeWidth="1.2" opacity={opacity}/>
      </svg>
    </div>
  )
}

// Vertical column of measurement-rule ticks on a panel edge
function EdgeTicks({ side }) {
  const isLeft = side === 'left'
  return (
    <div style={{
      position: 'absolute', top: '14%', bottom: '14%',
      [isLeft ? 'left' : 'right']: 10,
      width: 12, zIndex: 25, pointerEvents: 'none',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      alignItems: isLeft ? 'flex-start' : 'flex-end',
    }}>
      {Array.from({ length: 9 }).map((_, i) => (
        <div key={i} style={{
          width: i % 4 === 2 ? 10 : 5,
          height: 1,
          background: 'rgba(255,37,64,0.35)',
        }} />
      ))}
    </div>
  )
}

// Faint topographic contour texture
function TopoBackground() {
  return (
    <svg
      aria-hidden
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
      preserveAspectRatio="xMidYMid slice"
      viewBox="0 0 1400 800"
      fill="none"
    >
      {Array.from({ length: 9 }).map((_, i) => {
        const k = i * 36
        return (
          <path
            key={i}
            d={`M ${-50 + k} 820
                C ${250 + k} ${640 - k}, ${520 - k} ${760 - k}, ${760} ${560 - k}
                S ${1200 + k} ${420 - k}, ${1480 - k} ${300 - k}`}
            stroke="rgba(255,37,64,0.05)"
            strokeWidth="1"
            fill="none"
          />
        )
      })}
    </svg>
  )
}

// ── Client logos ticker — behind the helmet ───────────────────────────────────
function ClientTicker() {
  const group = [...CLIENT_LOGOS, ...CLIENT_LOGOS]
  const groups = [group, group]
  return (
    <div style={{
      overflow: 'hidden',
      width: '100%',
      pointerEvents: 'none',
      WebkitMaskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
      maskImage: 'linear-gradient(90deg, transparent 0%, black 8%, black 92%, transparent 100%)',
    }}>
      <div style={{
        display: 'flex', width: 'max-content',
        animation: 'marquee 42s linear infinite',
        willChange: 'transform',
      }}>
        {groups.map((items, groupIndex) => (
          <div
            key={`ticker-group-${groupIndex}`}
            aria-hidden={groupIndex > 0}
            style={{ display: 'flex', flexShrink: 0, minWidth: 'max-content' }}
          >
            {items.map((c, i) => (
              <div key={`${c.id}-${groupIndex}-${i}`} style={{
                flexShrink: 0,
                minWidth: 'clamp(138px, 13vw, 190px)',
                padding: '0 clamp(18px, 2.4vw, 34px)',
                borderLeft: '1px solid rgba(255,37,64,0.1)',
                height: 48,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <img
                  src={c.logo} alt={c.name}
                  style={{
                    height: c.h, width: 'auto', maxWidth: c.w,
                    objectFit: 'contain',
                    filter: 'brightness(0) invert(1)',
                    opacity: 0.24,
                  }}
                  onError={e => {
                    e.currentTarget.style.display = 'none'
                    if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'block'
                  }}
                />
                <span style={{
                  display: 'none',
                  fontFamily: "'Bebas Neue', sans-serif",
                  fontSize: 13, letterSpacing: '0.08em',
                  color: 'rgba(255,255,255,0.2)',
                }}>{c.name}</span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}

// ── FooterNavItem — sliding red highlight on hover (matches MenuOverlay) ──────
function FooterNavItem({ label, to, accent = false }) {
  const [hover, setHover] = useState(false)
  const chamfer = 14
  const clip = `polygon(0 0, calc(100% - ${chamfer}px) 0, 100% ${chamfer}px, 100% 100%, ${chamfer}px 100%, 0 calc(100% - ${chamfer}px))`
  return (
    <m.div variants={navItem}>
      <m.div whileHover={{ x: accent ? 0 : 4 }} transition={SPRING}>
        <Link
          to={to}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: 'inline-flex', alignItems: 'center',
            position: 'relative',
            padding: '0.04em 0.2em 0.06em',
            lineHeight: 0.9,
            textDecoration: 'none',
            marginBottom: 'clamp(8px, 1.3vh, 12px)',
          }}
        >
          {/* Sliding red fill */}
          <span aria-hidden style={{
            position: 'absolute',
            inset: '0.04em 0 0.04em 0',
            background: 'var(--color-accent)',
            transform: hover ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: 'transform 0.26s cubic-bezier(0.32,0.72,0,1)',
            clipPath: clip,
            zIndex: 0,
          }} />
          <span style={{
            position: 'relative', zIndex: 1,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1.45rem, 2vw, 2.1rem)',
            letterSpacing: '0.06em',
            color: hover ? '#0a0a0a' : (accent ? 'var(--color-accent)' : 'rgba(240,238,234,0.82)'),
            transition: 'color 0.18s',
            whiteSpace: 'nowrap',
          }}>
            {label}{accent && <span style={{ marginLeft: 8, fontSize: '0.85em' }}>→</span>}
          </span>
        </Link>
      </m.div>
    </m.div>
  )
}

// ── FooterConnectItem — sweep from right (mirror of FooterNavItem) ────────────
function FooterConnectItem({ label, handle, href }) {
  const [hover, setHover] = useState(false)
  const chamfer = 14
  const clip = `polygon(0 0, calc(100% - ${chamfer}px) 0, 100% ${chamfer}px, 100% 100%, ${chamfer}px 100%, 0 calc(100% - ${chamfer}px))`
  return (
    <m.div variants={connectItem}>
      <m.div whileHover={{ x: -5 }} transition={SPRING}>
        <a
          href={href}
          target={href.startsWith('mailto') ? undefined : '_blank'}
          rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
          style={{
            display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-end',
            position: 'relative',
            width: 'min(100%, 210px)',
            padding: '0.12em 0.26em 0.34em',
            textDecoration: 'none',
            marginBottom: 'clamp(10px, 1.35vh, 15px)',
          }}
        >
          {/* Sliding red fill — from right */}
          <span aria-hidden style={{
            position: 'absolute',
            inset: '0.04em 0 0.1em 0',
            background: 'var(--color-accent)',
            transform: hover ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right center',
            transition: 'transform 0.26s cubic-bezier(0.32,0.72,0,1)',
            clipPath: clip,
            zIndex: 0,
          }} />
          <span aria-hidden style={{
            position: 'absolute',
            right: 0,
            top: '42%',
            width: hover ? '100%' : 20,
            height: 1,
            background: hover ? 'rgba(10,10,10,0.22)' : 'rgba(255,37,64,0.62)',
            transform: 'translateY(-50%)',
            transition: 'width 0.24s cubic-bezier(0.32,0.72,0,1), background-color 0.18s',
            zIndex: 1,
          }} />
          <span style={{
            position: 'relative', zIndex: 1,
            fontFamily: "'Bebas Neue', sans-serif",
            fontSize: 'clamp(1.65rem, 2.22vw, 2.35rem)',
            letterSpacing: '0.06em', lineHeight: 0.92,
            color: hover ? '#0a0a0a' : 'rgba(240,238,234,0.9)',
            transition: 'color 0.18s', whiteSpace: 'nowrap',
          }}>{label}</span>
          <span style={{
            position: 'relative', zIndex: 1,
            fontFamily: "'Play', monospace",
            fontSize: 'clamp(10px, 0.88vw, 13px)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            lineHeight: 1,
            color: hover ? 'rgba(10,10,10,0.82)' : 'rgba(255,37,64,0.86)',
            background: hover ? 'rgba(10,10,10,0.08)' : 'rgba(255,37,64,0.075)',
            border: hover ? '1px solid rgba(10,10,10,0.18)' : '1px solid rgba(255,37,64,0.2)',
            padding: '0.42em 0.56em 0.38em',
            clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
            opacity: 1,
            transition: 'color 0.18s, background-color 0.18s, border-color 0.18s',
            whiteSpace: 'nowrap',
            textShadow: hover ? 'none' : '0 0 14px rgba(255,37,64,0.16)',
          }}>{handle}</span>
        </a>
      </m.div>
    </m.div>
  )
}

// ── Nav item variants (Kowalski stagger) ──────────────────────────────────────
const navContainer = { hidden: {}, show: { transition: { staggerChildren: 0.055 } } }
const navItem = {
  hidden: { opacity: 0, x: -14 },
  show:   { opacity: 1, x: 0,  transition: { type: 'spring', stiffness: 340, damping: 28 } },
}
const connectContainer = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const connectItem = {
  hidden: { opacity: 0, x: 14 },
  show:   { opacity: 1, x: 0,  transition: { type: 'spring', stiffness: 340, damping: 28 } },
}

function SignalDancePlayer({ active }) {
  const videoRef = useRef(null)
  const reduceMotion = useReducedMotion()
  const { signalAudioOn, toggleSignalAudio } = useSignalAudio()
  const signalOn = active && signalAudioOn

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    if (!signalOn) {
      video.pause()
      video.currentTime = 0
      return
    }

    video.loop = true
    video.muted = true
    video.playsInline = true

    if (!reduceMotion) {
      video.play().catch(() => {})
    }
  }, [signalOn, reduceMotion])

  const label = signalAudioOn ? 'Pause signal' : 'Play signal'
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 76%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 7%, black 76%, transparent 100%)',
      }}>
        <picture>
          <source srcSet="/lab/footer.webp" type="image/webp" />
          <img
            src="/lab/footer.png"
            alt=""
            aria-hidden
            style={{
              width: '100%',
              height: 'auto',
              display: 'block',
              opacity: signalOn ? 0 : 1,
              transition: 'opacity 0.24s cubic-bezier(0.32,0.72,0,1)',
            }}
          />
        </picture>
        <video
          ref={videoRef}
          preload="metadata"
          muted
          playsInline
          loop
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            display: 'block',
            opacity: signalOn ? 1 : 0,
            filter: signalOn ? 'saturate(1.08) contrast(1.04)' : 'saturate(0.82) contrast(0.96)',
            transition: 'opacity 0.24s cubic-bezier(0.32,0.72,0,1), filter 0.24s cubic-bezier(0.32,0.72,0,1)',
          }}
        >
          <source src="/lab/footervid.webm" type="video/webm" />
          <source src="/lab/footervid.mp4" type="video/mp4" />
        </video>
        <div aria-hidden style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, #080808 0%, #080808 20%, transparent 54%)',
          pointerEvents: 'none',
        }} />
      </div>

      <div style={{
        position: 'absolute',
        left: '50%',
        top: 'clamp(155px, 14.5vw, 218px)',
        transform: 'translateX(-50%)',
        zIndex: 12,
        pointerEvents: 'auto',
      }}>
        <button
          type="button"
          aria-label={label}
          title={label}
          aria-pressed={signalAudioOn}
          onClick={toggleSignalAudio}
          style={{
            position: 'relative',
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: '1px solid rgba(255,37,64,0.5)',
            background: signalOn ? 'rgba(255,37,64,0.2)' : 'rgba(8,8,8,0.56)',
            color: 'var(--color-accent)',
            padding: 0,
            cursor: 'pointer',
            display: 'grid',
            placeItems: 'center',
            boxShadow: signalOn
              ? '0 0 0 4px rgba(255,37,64,0.08), 0 0 22px rgba(255,37,64,0.28)'
              : '0 0 0 1px rgba(8,8,8,0.7), 0 0 14px rgba(255,37,64,0.12)',
            transition: 'background-color 0.18s cubic-bezier(0.32,0.72,0,1), border-color 0.18s cubic-bezier(0.32,0.72,0,1), box-shadow 0.18s cubic-bezier(0.32,0.72,0,1)',
          }}
        >
          <span aria-hidden style={{
            display: 'block',
            width: signalOn ? 12 : 0,
            height: signalOn ? 12 : 0,
            borderLeft: signalOn ? '4px solid var(--color-accent)' : '9px solid var(--color-accent)',
            borderRight: signalOn ? '4px solid var(--color-accent)' : 0,
            borderTop: signalOn ? 0 : '6px solid transparent',
            borderBottom: signalOn ? 0 : '6px solid transparent',
            transform: signalOn ? 'none' : 'translateX(1px)',
          }} />
        </button>
      </div>
    </div>
  )
}

function CtaCloser() {
  const year = new Date().getFullYear()

  // Single whileInView anchor — everything hangs off this ref
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-6%' })

  const panelV   = { hidden: { opacity: 0, y: 18 },        show: { opacity: 1, y: 0,  transition: { duration: 0.7, ease: EASE_OUT } } }
  const borderV  = { hidden: { pathLength: 0, opacity: 0 }, show: { pathLength: 1, opacity: 1, transition: { pathLength: { duration: 1.4, ease: EASE_OUT, delay: 0.08 }, opacity: { duration: 0.2 } } } }
  const ruleV    = { hidden: { scaleY: 0 },                 show: { scaleY: 1, transition: { duration: 0.7, ease: EASE_OUT, delay: 0.22 } } }
  const logoV    = { hidden: { opacity: 0, scale: 0.7 },    show: { opacity: 1, scale: 1, transition: { ...SPRING, delay: 0.18 } } }
  const line1V   = { hidden: { opacity: 0, y: 26 },         show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE_OUT, delay: 0.26 } } }
  const line2V   = { hidden: { opacity: 0, y: 26 },         show: { opacity: 1, y: 0, transition: { duration: 0.72, ease: EASE_OUT, delay: 0.34 } } }
  const helmetV  = { hidden: { opacity: 0, y: 44 },         show: { opacity: 1, y: 0, transition: { ...SPRING, delay: 0.55 } } }
  const tickerV  = { hidden: { opacity: 0 },                show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.62 } } }
  const skillV   = { hidden: {}, show: { transition: { staggerChildren: 0.045, delayChildren: 0.68 } } }
  const skillItem = { hidden: { opacity: 0, y: 5 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: EASE_OUT } } }
  const copyV    = { hidden: { opacity: 0 },                show: { opacity: 1, transition: { duration: 0.5, ease: EASE_OUT, delay: 0.82 } } }

  // Nav/connect keep their own whileInView — propagation is more reliable than animate={string}
  const navC  = { hidden: {}, show: { transition: { staggerChildren: 0.055 } } }
  const connC = { hidden: {}, show: { transition: { staggerChildren: 0.07  } } }

  const animate = inView ? 'show' : 'hidden'

  return (
    <section id="lab-footer" className="lab-footer-section" style={{
      position: 'relative',
      overflow: 'hidden',
      background: `
        radial-gradient(ellipse at 50% 30%, rgba(255,37,64,0.14) 0%, rgba(85,0,6,0.22) 36%, transparent 62%),
        radial-gradient(ellipse at 0% 55%, rgba(255,37,64,0.22) 0%, rgba(86,0,8,0.16) 38%, transparent 64%),
        radial-gradient(ellipse at 100% 55%, rgba(255,37,64,0.20) 0%, rgba(86,0,8,0.16) 38%, transparent 64%),
        linear-gradient(180deg, #090707 0%, #0f0404 6%, #180203 18%, #090707 44%, #090707 66%, #2e0206 100%)
      `,
      padding: 'clamp(16px, 3vw, 52px) clamp(14px, 3.2vw, 54px) clamp(12px, 2vw, 26px)',
    }}>
      {/* Top-edge fade */}
      <div aria-hidden style={{
        position: 'absolute', top: 0, left: 0, right: 0,
        height: 'clamp(60px, 8vw, 110px)',
        background: 'linear-gradient(180deg, #090707 0%, transparent 100%)',
        zIndex: 0, pointerEvents: 'none',
      }} />

      {/* ══ FRAMED PANEL ══ */}
      <m.div
        ref={ref}
        className="lab-footer-shell"
        variants={panelV}
        initial="hidden"
        animate={animate}
        style={{ position: 'relative', width: '100%', height: 'clamp(560px, 80vh, 860px)', filter: 'drop-shadow(0 0 34px rgba(255,37,64,0.18))' }}
      >
        {/* SVG fill */}
        <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}
          viewBox="0 0 1672 941" preserveAspectRatio="none">
          <path d={FOOTER_FRAME_PATH} fill="#080808" vectorEffect="non-scaling-stroke" />
        </svg>

        {/* Topographic texture */}
        <TopoBackground />

        {/* SVG border — animated draw + glow */}
        <svg aria-hidden style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 31, pointerEvents: 'none' }}
          viewBox="0 0 1672 941" preserveAspectRatio="none" fill="none">
          <defs>
            <filter id="border-glow" x="-5%" y="-5%" width="110%" height="110%">
              <feGaussianBlur stdDeviation="3.5" result="blur"/>
              <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>
          <m.path
            d={FOOTER_FRAME_PATH}
            stroke="rgba(255,37,64,0.7)"
            strokeWidth="2"
            fill="none"
            filter="url(#border-glow)"
            vectorEffect="non-scaling-stroke"
            variants={borderV}
            initial="hidden"
            animate={animate}
          />
        </svg>

        {/* Content grid */}
        <div style={{
          position: 'absolute',
          inset: '0 3.8% 8% 3.8%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr)',
          gridTemplateRows: '1fr auto auto',
          alignItems: 'stretch',
          minWidth: 0,
          overflow: 'hidden',
        }}>

          {/* Vertical rules — draw down */}
          <m.div variants={ruleV} initial="hidden" animate={animate} style={{
            position: 'absolute', top: 0, bottom: 0,
            left: 'clamp(120px, 24%, 300px)',
            width: 1, background: 'rgba(255,37,64,0.10)',
            transformOrigin: 'top', pointerEvents: 'none', zIndex: 1,
          }} />
          <m.div variants={ruleV} initial="hidden" animate={animate} style={{
            position: 'absolute', top: 0, bottom: 0,
            right: 'clamp(120px, 24%, 300px)',
            width: 1, background: 'rgba(255,37,64,0.10)',
            transformOrigin: 'top', pointerEvents: 'none', zIndex: 1,
          }} />

          <EdgeTicks side="left" />
          <EdgeTicks side="right" />

          {/* ── MAIN BODY ── */}
          <div className="lab-footer-body" style={{
            position: 'relative',
            display: 'grid',
            gridTemplateColumns: 'minmax(136px, 0.34fr) minmax(260px, 1fr) minmax(136px, 0.34fr)',
            alignItems: 'center',
            height: '100%', minHeight: 0,
            width: '100%', maxWidth: '100%', minWidth: 0,
            paddingTop: 'clamp(24px, 3vw, 48px)',
            paddingBottom: 'clamp(16px, 2vw, 32px)',
            overflow: 'hidden',
          }}>

            {/* ── LEFT: Navigation ── */}
            <m.nav
              className="lab-footer-nav"
              variants={navC}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              style={{
                gridColumn: 1,
                minWidth: 0,
                padding: 'clamp(36px, 5vh, 68px) clamp(12px, 1.4vw, 22px) clamp(22px, 3vw, 40px) clamp(28px, 4vw, 64px)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'center',
              }}
            >
              <m.div variants={navItem} style={{
                fontFamily: "'Play', monospace", fontSize: '9px', letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'var(--color-accent)',
                marginBottom: 'clamp(16px, 2.4vh, 26px)', opacity: 0.75,
              }}>NAVIGATION</m.div>
              {NAV_LINKS.map(({ label, to }) => <FooterNavItem key={label} label={label} to={to} />)}
              <FooterNavItem label={CONTACT_LINK.label} to={CONTACT_LINK.to} accent />
            </m.nav>

            {/* ── CENTER ── */}
            <div className="lab-footer-center" style={{ gridColumn: 2, position: 'relative', height: '100%', alignSelf: 'stretch', minWidth: 0 }}>

              {/* Logo mark */}
              <m.div
                initial={{ opacity: 0, scale: 0.7 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ ...SPRING, delay: 0.18 }}
                style={{ position: 'absolute', top: 'clamp(14px, 1.8vw, 28px)', left: 0, right: 0, display: 'flex', justifyContent: 'center', zIndex: 4, pointerEvents: 'none' }}
              >
                <m.img
                  src="/logo-mark.svg" alt="" aria-hidden
                  animate={{ filter: [
                    'brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,37,64,0.35))',
                    'brightness(0) invert(1) drop-shadow(0 0 26px rgba(255,37,64,0.75))',
                    'brightness(0) invert(1) drop-shadow(0 0 12px rgba(255,37,64,0.35))',
                  ]}}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  style={{ width: 'clamp(40px, 4vw, 58px)', height: 'auto', display: 'block' }}
                  onError={e => { e.currentTarget.style.display = 'none' }}
                />
              </m.div>

              {/* Headline — per-line slide up */}
              <div style={{
                position: 'absolute', top: 'clamp(72px, 8vw, 118px)', left: 0, right: 0,
                zIndex: 3, textAlign: 'center',
                fontFamily: "'Bebas Neue', sans-serif",
                lineHeight: 0.96, letterSpacing: '0.015em',
                fontSize: 'clamp(2.8rem, 5.2vw, 6.4rem)',
                userSelect: 'none', textShadow: '0 16px 40px rgba(0,0,0,0.7)',
              }}>
                <div style={{ overflow: 'hidden', paddingTop: '0.16em', marginTop: '-0.16em', paddingBottom: '0.02em' }}>
                  <m.div
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{ duration: 0.72, ease: EASE_OUT, delay: 0.26 }}
                  >
                    <span style={{ color: 'var(--color-fg)' }}>ALWAYS </span>
                    <span style={{ color: 'var(--color-accent)' }}>DESIGNING</span>
                  </m.div>
                </div>
                <div style={{ overflow: 'hidden', paddingTop: '0.16em', marginTop: '-0.16em', paddingBottom: '0.02em' }}>
                  <m.div
                    initial={{ opacity: 0, y: 26 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-8%' }}
                    transition={{ duration: 0.72, ease: EASE_OUT, delay: 0.34 }}
                  >
                    <span style={{ color: 'var(--color-fg)' }}>THE </span>
                    <span style={{ color: 'var(--color-accent)' }}>FUTURE.</span>
                  </m.div>
                </div>
              </div>

            </div>

            {/* ── RIGHT: Connect ── */}
            <m.div
              className="lab-footer-connect"
              variants={connC}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              style={{
                gridColumn: 3,
                minWidth: 0,
                padding: 'clamp(36px, 5vh, 68px) clamp(12px, 1.4vw, 22px) clamp(22px, 3vw, 40px) clamp(16px, 1.6vw, 28px)',
                display: 'flex', flexDirection: 'column', alignItems: 'flex-end', alignSelf: 'center',
              }}
            >
              <m.div variants={connectItem} style={{
                fontFamily: "'Play', monospace", fontSize: '9px', letterSpacing: '0.28em',
                textTransform: 'uppercase', color: 'var(--color-accent)',
                marginBottom: 'clamp(20px, 3vh, 32px)', opacity: 0.8, alignSelf: 'flex-end',
              }}>CONNECT</m.div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                {CONNECT_LINKS.map(({ label, handle, href }) => (
                  <FooterConnectItem key={label} label={label} handle={handle} href={href} />
                ))}
              </div>
            </m.div>
          </div>

          {/* ── TICKER — row 2 — CSS opacity so Framer doesn't touch the marquee transform ── */}
          <div style={{
            borderTop: '1px solid rgba(255,37,64,0.07)', zIndex: 6,
            opacity: 1,
          }}>
            <ClientTicker />
          </div>

          {/* ── SKILL BAR — row 3 ── */}
          <div style={{ position: 'relative', zIndex: 10, borderTop: '1px solid rgba(255,37,64,0.12)', overflow: 'hidden' }}>
            <div aria-hidden style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: '8%', background: 'linear-gradient(90deg, #080808 30%, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div aria-hidden style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '8%', background: 'linear-gradient(270deg, #080808 30%, transparent)', zIndex: 2, pointerEvents: 'none' }} />
            <div className="lab-footer-skillbar" style={{
              padding: 'clamp(10px, 1.4vh, 18px) 10%',
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              gap: 'clamp(4px, 0.8vw, 12px)', flexWrap: 'wrap', rowGap: 8,
              minWidth: 0,
            }}>
              {SKILL_BAR.map((skill, i) => (
                <m.div
                  key={skill}
                  initial={{ opacity: 0, y: 5 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-4%' }}
                  transition={{ duration: 0.4, ease: EASE_OUT, delay: 0.68 + i * 0.045 }}
                  style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 1.5vw, 20px)' }}
                >
                  {i > 0 && (
                    i === 1
                      ? <PlusMarker style={{ position: 'static' }} size={12} opacity={0.6} />
                      : <span style={{ width: 1, height: 10, background: 'rgba(255,37,64,0.25)', display: 'inline-block', flexShrink: 0 }} />
                  )}
                  <span style={{
                    fontFamily: "'Play', monospace",
                    fontSize: 'clamp(8px, 0.62vw, 10px)', letterSpacing: '0.14em',
                    textTransform: 'uppercase', color: 'rgba(240,238,234,0.55)', whiteSpace: 'nowrap',
                  }}>{skill}</span>
                </m.div>
              ))}
            </div>
          </div>

          {/* Helmet — outer div handles centering, inner m.div handles animation */}
          <div
            className="lab-footer-figure"
            style={{
              position: 'absolute', bottom: 0, left: '50%',
              transform: 'translateX(-50%) translateY(10%)',
              width: 'clamp(220px, 26%, 380px)', zIndex: 8, pointerEvents: 'auto',
            }}
          >
          <m.div variants={helmetV} initial="hidden" animate={animate}>
            <SignalDancePlayer active={inView} />
          </m.div>
          </div>

        </div>
      </m.div>

      {/* ── COPYRIGHT BAR ── */}
      <m.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: '-4%' }}
        transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.3 }}
        style={{
          borderTop: '1px solid rgba(255,37,64,0.08)',
          padding: 'clamp(12px, 1.6vh, 18px) clamp(20px, 3vw, 44px) clamp(2px, 0.5vh, 6px)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 8,
        }}
      >
        <span style={{ fontFamily: "'Play', monospace", fontSize: '10px', letterSpacing: '0.14em', color: 'rgba(240,238,234,0.3)' }}>
          © {year} Andres Pisso. All rights reserved
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          {['PRIVACY POLICY', 'TERMS'].map((item, i) => (
            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              {i > 0 && <span style={{ color: 'rgba(255,37,64,0.25)', fontSize: 12 }}>|</span>}
              <span style={{ fontFamily: "'Play', monospace", fontSize: '10px', letterSpacing: '0.14em', color: 'rgba(240,238,234,0.3)', cursor: 'pointer', transition: 'color 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(240,238,234,0.7)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(240,238,234,0.3)')}
              >{item}</span>
            </span>
          ))}
        </div>
      </m.div>
    </section>
  )
}

// ── Root ──────────────────────────────────────────────────────────────────────
export default function LabHome() {
  const location = useLocation()
  const footerOnly = new URLSearchParams(location.search).get('footer') === '1'

  if (footerOnly) {
    return (
      <div style={{ background: 'var(--color-bg)', minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <CtaCloser />
      </div>
    )
  }

  return (
    <div style={{ background: 'var(--color-bg)', position: 'relative', zIndex: 1 }}>
      <HeroStatementPin />
      <CaseShowcase />
      <CtaCloser />
    </div>
  )
}
