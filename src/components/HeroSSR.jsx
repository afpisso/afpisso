/**
 * HeroSSR — crawler-facing homepage hero.
 *
 * NOT rendered to users. The interactive hero is HeroStatementPin -> LabHero.
 * This exists because HeroStatementPin lazy-imports LabHero, so it renders to
 * nothing under renderToStaticMarkup during the SSG pre-render. This component
 * is what Google, LinkedIn previews and AI crawlers actually read.
 *
 * Consumed by exactly one place: src/entry-server.jsx.
 *
 * If you change the hero messaging in LabHero, change it here too — otherwise
 * what gets indexed drifts from what users see.
 */
import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import SignalTrigger from './SignalTrigger';
import { analytics } from '../utils/analytics';
import ClientLogos from './ClientLogos';
import GeometryGrid from './GeometryGrid';
import { useScramble } from '../hooks/useScramble';
import AudioBars from './AudioBars';
import SectionTag from './SectionTag';
import GlitchStrokeText from './GlitchStrokeText';
import { m, useReducedMotion, useInView, useScroll, useTransform } from 'framer-motion';
import CyberBtn from './CyberBtn';


const bootLines = [
  'BYANDRESFE.SYS v2.6 — ONLINE',
  'LOADING: game ux/ui systems...',
  'SIGNAL: READY.',
];

function CountUp({ target, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const shouldReduce = useReducedMotion();
  const numeric = parseInt(target, 10);
  // Preserve any non-numeric trailing characters (e.g. '+') from the target string
  const trailMatch = String(target).match(/[^0-9]+$/);
  const trail = trailMatch ? trailMatch[0] : suffix;
  // Start at the real value so SSG/no-JS HTML is correct (avoids "0+" in prerendered output)
  const [count, setCount] = useState(isNaN(numeric) ? 0 : numeric);

  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    // Skip animation entirely for reduced-motion users
    if (shouldReduce) { setCount(numeric); return; }
    // Small delay so entry animations finish before counter fires
    const delay = setTimeout(() => {
      setCount(0); // reset — parent opacity:0 hides the brief flash
      const duration = 900;
      const startTime = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - (1 - progress) ** 3;
        setCount(Math.round(eased * numeric));
        if (progress < 1) requestAnimationFrame(tick);
        else setCount(numeric);
      };
      requestAnimationFrame(tick);
    }, 300);
    return () => clearTimeout(delay);
  }, [inView, numeric, shouldReduce]);

  return (
    <span ref={ref}>
      {isNaN(numeric) ? target : (
        <>
          {count}
          <span style={{ color: 'var(--color-accent)' }}>{trail}</span>
        </>
      )}
    </span>
  );
}

function StatReadout({ stat, index }) {
  return (
    <m.div
      className="relative flex flex-col justify-center py-5 md:py-6"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.07 }}
    >
      {index > 0 && (
        <div
          className="hidden md:block absolute left-0 top-4 bottom-4 w-px"
          style={{ backgroundColor: 'var(--color-rule)' }}
          aria-hidden="true"
        />
      )}
      {/* Label row */}
      <div
        className="sys-label mb-2"
        style={{ color: 'var(--color-fg-mute)', letterSpacing: '0.18em' }}
      >
        {stat.label}
      </div>
      {/* Value + guide line */}
      <div className="flex items-baseline gap-2">
        <div
          className="flex-1 h-px self-center"
          style={{ backgroundColor: 'var(--color-rule)', opacity: 0.5 }}
          aria-hidden="true"
        />
        <div
          className="tabular"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 3.8vw, 3.2rem)',
            color: 'var(--color-accent)',
            letterSpacing: '0.04em',
            lineHeight: 1,
          }}
        >
          <CountUp target={stat.value} suffix="" />
        </div>
      </div>
    </m.div>
  );
}

function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  const skip = () => {
    setDone(true);
    sessionStorage.setItem('booted', '1');
    setTimeout(onComplete, 300);
  };

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setLines((prev) => [...prev, bootLines[i]]);
      i++;
      if (i >= bootLines.length) {
        clearInterval(interval);
        setTimeout(() => {
          setDone(true);
          sessionStorage.setItem('booted', '1');
          setTimeout(onComplete, 300);
        }, 150);
      }
    }, 150);
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <m.div
      role="status"
      aria-label="System initializing"
      className="fixed inset-0 z-[200] flex items-center justify-center"
      style={{ backgroundColor: 'var(--color-bg)', pointerEvents: done ? 'none' : 'auto' }}
      animate={{ opacity: done ? 0 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-sm px-8">
        <div
          className="mb-6 flex items-center justify-center w-14 h-14 mx-auto"
          style={{ border: '1px solid rgba(255,255,255,0.12)' }}
        >
          <img
            src="/logo-mark.svg"
            alt=""
            aria-hidden="true"
            width="56"
            height="56"
            className="w-full h-full object-contain p-2"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.nextElementSibling.style.display = 'flex';
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
        <div aria-live="polite" className="space-y-2">
          {lines.map((line, i) => (
            <div key={i} className="flex items-center gap-3">
              <span aria-hidden="true" style={{ color: 'var(--color-accent)', fontSize: '10px', fontFamily: '"Play", sans-serif' }}>{'>'}</span>
              <span style={{
                color: i === lines.length - 1 ? 'var(--color-fg)' : 'var(--color-fg-dim)',
                fontSize: '12px', fontFamily: '"Play", sans-serif', letterSpacing: '0.08em',
              }}>
                {line}
              </span>
              {i === lines.length - 1 && !done && (
                <span aria-hidden="true" className="blink" style={{ color: 'var(--color-accent)' }}>_</span>
              )}
            </div>
          ))}
        </div>
        {/* Progress bar — width synced to lines loaded / total */}
        {lines.length > 0 && (
          <div
            aria-hidden="true"
            style={{
              marginTop: 20,
              height: 1,
              backgroundColor: 'var(--color-accent-15)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                backgroundColor: 'var(--color-accent)',
                width: `${(lines.length / bootLines.length) * 100}%`,
                transition: 'width 0.28s cubic-bezier(0.16,1,0.3,1)',
                opacity: done ? 0 : 1,
              }}
            />
          </div>
        )}
        {/* Skip button — appears after first line */}
        {!done && (
          <m.button
            onClick={skip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            style={{
              marginTop: '28px',
              fontFamily: '"Play", sans-serif',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-fg-mute)',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '6px 14px',
              minHeight: '44px',
              cursor: 'pointer',
              display: 'block',
              marginLeft: 'auto',
              transition: 'color 0.2s, border-color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'; }}
            aria-label="Skip intro animation"
          >
            Skip →
          </m.button>
        )}
      </div>
    </m.div>
  );
}

// Shape + particle cloud offset per section.
// offsetX: fraction of viewport width; positive = right, negative = left.
// Section IDs must match the actual `id` attributes in each component.
// Shape + particle cloud offset per section.
// offsetX fraction of viewport: ±0.46 puts the cloud center at ~27%/73% of viewport,
// squarely in the transparent zone created by the 62%→82% gradient in each section.
// Semantic shape-per-section: the particle entity adapts to reflect the content it frames.
// tknot53 = interlocked systems · lorenz  = emergent thinking · circuit = process
// mobius  = design iteration    · vortex  = converging process · tknot32 = identity
// dhelix  = transmission signal · scanline = CRT power-off (footer fallback)
const SECTION_CONFIG = {
  'home':      { shape: 'logo',     offsetX:  0.46, spin: true  },  // AFP logo mark
  'cases':     { shape: 'tknot53',  offsetX:  0.46, spin: true  },  // (5,3) knot — layered game systems
  'what-i-do': { shape: 'mobius',   offsetX: -0.46, spin: true  },  // möbius loop — design iteration
  'how-i-work':{ shape: 'vortex',   offsetX:  0.46, spin: true  },  // funnel — wide input → focused output
  'notes':     { shape: 'lorenz',   offsetX: -0.46, spin: true  },  // chaos butterfly — emergent thinking
  'about':     { shape: 'tknot32',  offsetX:  0.46, spin: true  },  // trefoil — three-lobed identity
  'contact':   { shape: 'sphere',   offsetX:  0.46, spin: true  },  // sphere — open signal / contact point
  'footer-tx': { shape: 'scanline', offsetX:  0.00, spin: false },  // CRT power-off — end transmission
};

function useMousePos() {
  const ref = useRef({ x: -1000, y: -1000 });
  useEffect(() => {
    const onMove = (e) => { ref.current.x = e.clientX; ref.current.y = e.clientY; };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);
  return ref;
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);

  useEffect(() => {
    // Scroll-based detection: works with lazy-loaded sections that may not
    // exist in the DOM when this effect first runs (IntersectionObserver
    // can't observe elements that don't exist yet).
    // Finds the last section whose top edge has crossed 35% down the viewport.
    const update = () => {
      const triggerY = window.innerHeight * 0.35;
      let bestId = ids[0];
      let bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= triggerY && top > bestTop) {
          bestTop = top;
          bestId = id;
        }
      }
      setActive((prev) => (prev === bestId ? prev : bestId));
    };

    let rafId;
    const throttled = () => { cancelAnimationFrame(rafId); rafId = requestAnimationFrame(update); };

    window.addEventListener('scroll', throttled, { passive: true });
    update(); // Immediate check on mount
    // Retry after lazy sections have had time to load
    const t = setTimeout(update, 600);
    return () => {
      window.removeEventListener('scroll', throttled);
      cancelAnimationFrame(rafId);
      clearTimeout(t);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}


export default function HeroSSR() {
  const shouldReduce = useReducedMotion();
  const [booted, setBooted] = useState(
    () => shouldReduce || sessionStorage.getItem('booted') === '1'
  );
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== 'undefined' && window.innerWidth < 768
  );
  // Responsive canvas size — 65% of viewport width, capped at 280px.
  // Stored as state so GeometryGrid re-runs its effect when it changes.
  const [mobileGeoSize, setMobileGeoSize] = useState(
    () => typeof window !== 'undefined'
      ? Math.min(Math.floor(window.innerWidth * 0.65), 280)
      : 240
  );
  const sectionRef = useRef(null);
  const { t } = useLang();
  const mouseRef = useMousePos();
  const activeSection  = useActiveSection(Object.keys(SECTION_CONFIG));
  const sectionCfg     = SECTION_CONFIG[activeSection] ?? SECTION_CONFIG['home'];
  const currentShape   = sectionCfg.shape;
  const currentOffsetX = sectionCfg.offsetX;
  const currentSpin    = sectionCfg.spin !== false;

  // Mobile detection + responsive geo size — both update on resize/orientation change
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 767px)');
    const onMq = (e) => setIsMobile(e.matches);
    mq.addEventListener('change', onMq);

    const onResize = () => {
      const vw = window.innerWidth;
      if (vw < 768) setMobileGeoSize(Math.min(Math.floor(vw * 0.65), 280));
    };
    window.addEventListener('resize', onResize, { passive: true });

    return () => {
      mq.removeEventListener('change', onMq);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  // On mobile: position:absolute canvas inside the hero so it scrolls with content.
  //
  // Vertical alignment math (phones, font clamped at 4.5rem = 72px):
  //   section.paddingTop(80) + m.div.pt-5(20) + label+mb(~52px) = name starts at y≈152px
  //   3 lines × 72px × 0.88 lh = 190px tall → name center at y≈247px
  //   grid top = nameCenter − mobileGeoSize/2 ≈ 247 − 130 = 117px → use 115px
  //
  // right:-20px crops 20px off the right for a composed edge effect via overflow:hidden.
  const geoOffsetX   = isMobile ? 0 : currentOffsetX;
  const geoOffsetY   = 0;
  const geoIntensity = isMobile ? 3 : 7;
  const geoCount     = isMobile ? 260 : 1200;
  const geoMobileStyle = isMobile
    ? { position: 'absolute', top: '115px', right: '-20px', bottom: 'auto', left: 'auto' }
    : {};

  // reducedMotion fallback handled in useState initializer above

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const contentOpacity = useTransform(scrollYProgress, [0.45, 0.95], [1, 0]);

  // Particles are visible in every section (transparent backgrounds) — never pause
  // based on scroll position. The canvas pauses automatically on document.hidden.

  // Staircase layout: each line shifts right + last line in accent red
  const nameLines = [
    { text: 'Andres', delay: 0.18, indent: '0',                              color: 'var(--color-fg)' },
    { text: 'Felipe', delay: 0.30, indent: 'clamp(32px, 5vw, 96px)',         color: 'var(--color-fg)' },
    { text: 'Pisso',  delay: 0.42, indent: 'clamp(64px, 10vw, 192px)',       color: 'var(--color-accent)' },
  ];

  // Scramble effects — trigger once booted
  const scrambleLabel  = useScramble(t.hero.label.toUpperCase(),  { duration: 900,  trigger: booted ? 1 : 0, delay: 400,  enabled: !shouldReduce });

  return (
    <>
      {!booted && !shouldReduce && <BootSequence onComplete={() => setBooted(true)} />}

      <section
        ref={sectionRef}
        id="home"
        className="relative min-h-[100dvh] flex flex-col justify-start md:justify-center overflow-hidden"
        style={{ paddingTop: '80px' }}
      >
        {/* Background — GeometryGrid is absolute within this section only */}
        {!shouldReduce && (
          <GeometryGrid
            mouseRef={mouseRef}
            shape={currentShape}
            intensity={geoIntensity}
            offsetX={geoOffsetX}
            offsetY={geoOffsetY}
            rotX={0.20}
            spin={currentSpin}
            paused={false}
            particleCount={geoCount}
            mobileCanvas={isMobile}
            mobileSize={mobileGeoSize}
            mobileStyle={geoMobileStyle}
          />
        )}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,37,64,0.04) 0%, transparent 70%)' }} />
          {/* Bottom fade — prevents particles overlapping stats */}
          <div className="absolute bottom-0 left-0 right-0 h-48" style={{ background: 'linear-gradient(transparent, var(--color-bg))' }} />
          {/* Left fade — desktop only. On mobile, particles are clipped to the
              bottom-right corner so text protection via gradient is not needed. */}
          <div className="hidden md:block absolute inset-y-0 left-0 w-[68%]" style={{ background: 'linear-gradient(to right, var(--color-bg) 0%, var(--color-bg) 20%, rgba(8,8,8,0.75) 50%, rgba(8,8,8,0.3) 80%, transparent 100%)' }} />
        </div>

        {/* Corner marks */}
        <div aria-hidden="true" className="absolute top-[80px] left-0 w-16 h-16 border-l border-t" style={{ borderColor: 'var(--color-rule)' }} />
        <div aria-hidden="true" className="absolute top-[80px] right-0 w-16 h-16 border-r border-t" style={{ borderColor: 'var(--color-rule)' }} />

        <m.div
          className="relative z-10 max-w-[1400px] mx-auto px-6 pt-5 pb-10 md:py-24"
          style={shouldReduce ? {} : { y: contentY, opacity: contentOpacity }}
        >
          {/* System label */}
          <m.div
            className="flex items-center gap-4 mb-6 md:mb-12 flex-wrap"
            initial={{ opacity: 0, x: -16 }}
            animate={booted ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <SectionTag label={scrambleLabel} page="001" />
            <div className="flex items-center gap-2 ml-2">
              <AudioBars active={booted} color="var(--color-accent)" size={10} />
              <span className="sys-label" style={{ color: 'var(--color-accent)' }}>{t.hero.signalActive}</span>
            </div>
          </m.div>

          {/* H1 — Name: staggered line reveal + scramble/chromatic on hover */}
          <div className="mb-6">
            <h1
              className="uppercase"
              aria-label="Andrés Felipe Pisso"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(4.5rem, 14vw, 13rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.01em',
              }}
            >
              {nameLines.map((line, lineIdx) => (
                <m.div
                  key={lineIdx}
                  style={{
                    overflow: 'hidden',
                    paddingBottom: '0.04em',
                    display: 'block',
                    paddingLeft: line.indent,
                  }}
                  initial={{ y: 10, opacity: 1 }}
                  animate={{ opacity: 1, y: booted ? 0 : 10 }}
                  transition={{
                    duration: 0.72,
                    ease: [0.16, 1, 0.3, 1],
                    delay: line.delay,
                  }}
                >
                  {/* Color wrapper — GlitchStrokeText inherits color from parent */}
                  <span style={{ color: line.color, display: 'block' }}>
                    <GlitchStrokeText>{line.text}</GlitchStrokeText>
                  </span>
                </m.div>
              ))}
            </h1>
          </div>

          {/* Subtitle — opacity always 1 so Lighthouse measures it as LCP;
              boot overlay covers it visually, only y needs to animate */}
          <m.div
            className="mb-6 md:mb-10"
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: booted ? 0 : 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.72 }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 6,
                marginBottom: 8,
              }}
            >
              <div style={{ width: 14, height: 1, backgroundColor: 'var(--color-accent)', opacity: 0.5 }} />
              <span
                aria-hidden="true"
                style={{
                  fontFamily: '"Play", sans-serif',
                  fontSize: '11px',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                  color: 'var(--color-accent-55)',
                  fontWeight: 700,
                }}
              >
                // game ux/ui · ux lead
              </span>
            </div>
            <p style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(1.6rem, 3.5vw, 3rem)',
              color: 'var(--color-fg)',
              lineHeight: 1.1,
              maxWidth: '600px',
              letterSpacing: '0.02em',
              whiteSpace: 'pre-line',
            }}>
              {t.hero.subtitle}
            </p>
          </m.div>

          {/* Copy + CTAs + Focus tags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-start">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            >
              <p
                className="mb-6 md:mb-10"
                style={{
                  fontFamily: '"Play", sans-serif',
                  fontSize: '14px',
                  color: 'var(--color-fg-dim)',
                  letterSpacing: '0.02em',
                  maxWidth: '560px',
                }}
              >
                {t.hero.proof}
              </p>

              <div className="flex flex-wrap gap-3">
                <CyberBtn
                  href="#cases"
                  magnetic={!shouldReduce}
                  onClick={() => analytics.heroCta(t.hero.cta1)}
                >
                  {t.hero.cta1}
                </CyberBtn>
                <CyberBtn
                  href="/about"
                  variant="ghost"
                  size="sm"
                >
                  {t.hero.cta2}
                </CyberBtn>
              </div>
            </m.div>

            {/* Focus tags — single animation group, stagger via CSS */}
            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 1.05 }}
            >
              <div
                className="sys-label mb-5"
                id="focus-label"
                style={{ color: 'var(--color-fg-mute)' }}
              >
                {t.hero.focusAreasLabel}
              </div>
              <ul className="flex flex-col gap-1.5" aria-labelledby="focus-label">
                {t.hero.tags.map((tag, i) => (
                  <li
                    key={tag}
                    className="flex items-center gap-3"
                    style={{ animationDelay: `${i * 30}ms` }}
                  >
                    <span style={{
                      fontFamily: '"Play", sans-serif',
                      fontSize: '9px',
                      color: 'var(--color-accent)',
                      letterSpacing: '0.12em',
                      minWidth: '1.6em',
                      opacity: 0.7,
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{
                      fontFamily: '"Play", sans-serif',
                      fontSize: '10px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-fg-mute)',
                    }}>
                      {tag}
                    </span>
                  </li>
                ))}
              </ul>
            </m.div>
          </div>

        </m.div>

        {/* SIG-HERO — Grid Anomaly hunt trigger.
            Opacity 0.04 at rest, 0.28 on hover. Cursor becomes crosshair.
            Positioned at bottom-right, overlaps the corner mark area.
            aria-hidden + tabIndex=-1 so it never appears in the a11y tree or tab order. */}
        {/* SIG-HERO — high prominence (tutorial signal, intentionally obvious).
            Pulsing [!] near the corner mark. Teaches players the mechanic. */}
        <div style={{ position: 'absolute', bottom: 88, right: 14, zIndex: 5 }}>
          <SignalTrigger id="sig-hero" prominence="high" />
        </div>

      </section>

      {/* Stats strip — outside hero section so it doesn't push CTAs below the fold */}
      <div
        className="relative z-10 overflow-hidden"
        style={{
          borderTop: '1px solid rgba(255,255,255,0.12)',
          borderBottom: '1px solid rgba(255,255,255,0.12)',
          background: 'linear-gradient(100deg, rgba(12,15,18,0.97) 0%, rgba(10,10,10,0.96) 54%, rgba(18,8,10,0.97) 100%)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(255,255,255,0.04)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 0%, transparent 24%, rgba(255,37,64,0.08) 70%, transparent 100%)',
            opacity: 0.65,
          }}
        />
        <m.div
          className="relative z-10 w-full px-6 md:px-10 lg:px-14 grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-10 gap-y-0"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.trust.stats.map((stat, i) => <StatReadout key={stat.label} stat={stat} index={i} />)}
        </m.div>
      </div>

      {/* Client logo marquee — below stats */}
      <ClientLogos />
    </>
  );
}
