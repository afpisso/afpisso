import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
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
  'BYANDRESFE SYSTEM v2.6',
  'Loading case files...',
  'Initializing UX console...',
  'Signal active.',
];

function CountUp({ target, suffix = '' }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '0px' });
  const [count, setCount] = useState(0);
  const shouldReduce = useReducedMotion();
  const numeric = parseInt(target, 10);
  // Preserve any non-numeric trailing characters (e.g. '+') from the target string
  const trailMatch = String(target).match(/[^0-9]+$/);
  const trail = trailMatch ? trailMatch[0] : suffix;

  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    // Skip animation entirely for reduced-motion users
    if (shouldReduce) { setCount(numeric); return; }
    // Small delay so entry animations finish before counter fires
    const delay = setTimeout(() => {
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

  return <span ref={ref}>{isNaN(numeric) ? target : `${count}${trail}`}</span>;
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
          setTimeout(onComplete, 400);
        }, 300);
      }
    }, 280);
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
            src="/logo-mark.png"
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
              <span aria-hidden="true" style={{ color: 'var(--color-accent)', fontSize: '10px', fontFamily: '"JetBrains Mono", monospace' }}>{'>'}</span>
              <span style={{
                color: i === lines.length - 1 ? 'var(--color-fg)' : 'var(--color-fg-dim)',
                fontSize: '12px', fontFamily: '"JetBrains Mono", monospace', letterSpacing: '0.08em',
              }}>
                {line}
              </span>
              {i === lines.length - 1 && !done && (
                <span aria-hidden="true" className="blink" style={{ color: 'var(--color-accent)' }}>_</span>
              )}
            </div>
          ))}
        </div>
        {/* Skip button — appears after first line */}
        {lines.length >= 1 && !done && (
          <m.button
            onClick={skip}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.4 }}
            style={{
              marginTop: '28px',
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-fg-mute)',
              background: 'transparent',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '6px 14px',
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
const SECTION_CONFIG = {
  'home':      { shape: 'logo',  offsetX:  0.46 },
  'cases':     { shape: 'cube',  offsetX:  0.46 },  // content left  → particles right
  'what-i-do': { shape: 'torus', offsetX: -0.46 },  // content right → particles left
  'how-i-work':{ shape: 'helix', offsetX:  0.46 },  // content left  → particles right
  'notes':     { shape: 'wave',  offsetX: -0.46 },  // content right → particles left
  'about':     { shape: 'logo',  offsetX:  0.46 },  // content left  → particles right
  'contact':   { shape: 'logo',  offsetX: -0.46 },  // content right → particles left
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

    window.addEventListener('scroll', update, { passive: true });
    update(); // Immediate check on mount
    // Retry after lazy sections have had time to load
    const t = setTimeout(update, 600);
    return () => {
      window.removeEventListener('scroll', update);
      clearTimeout(t);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return active;
}


export default function Hero() {
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
  const activeSection = useActiveSection(Object.keys(SECTION_CONFIG));
  const sectionCfg    = SECTION_CONFIG[activeSection] ?? SECTION_CONFIG['home'];
  const currentShape  = sectionCfg.shape;
  const currentOffsetX = sectionCfg.offsetX;

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
  const contentOpacity = useTransform(scrollYProgress, [0.35, 0.9], [1, 0]);

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
  const scrambleHandle = useScramble('@byandresfe',                { duration: 700,  trigger: booted ? 1 : 0, delay: 1000, enabled: !shouldReduce });

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
            spin={true}
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
              aria-label="Andres Felipe Pisso"
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
                  initial={{ y: '110%', opacity: 0 }}
                  animate={booted ? { y: 0, opacity: 1 } : { y: '110%', opacity: 0 }}
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

          {/* Subtitle */}
          <m.div
            className="flex items-start gap-5 mb-6 md:mb-10"
            initial={{ opacity: 0, y: 10 }}
            animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.72 }}
          >
            <div
              aria-hidden="true"
              style={{ width: '2px', minHeight: '100%', alignSelf: 'stretch', backgroundColor: 'var(--color-accent)', flexShrink: 0, marginTop: '4px' }}
            />
            <p style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: 'clamp(13px, 1.5vw, 16px)',
              color: 'var(--color-fg-dim)',
              lineHeight: 1.65,
              maxWidth: '600px',
              letterSpacing: '0.01em',
            }}>
              {t.hero.subtitle}
            </p>
          </m.div>

          {/* Handle / separator */}
          <m.div
            className="flex items-center gap-4 mb-6 md:mb-10"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.88 }}
          >
            <m.div
              style={{ backgroundColor: 'var(--color-rule)', height: '1px', transformOrigin: 'left' }}
              className="max-w-[180px] w-full"
              initial={{ scaleX: 0 }}
              animate={booted ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            />
            <span className="sys-label whitespace-nowrap" aria-label="@byandresfe">{scrambleHandle}</span>
          </m.div>

          {/* Copy + CTAs + Focus tags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 items-end">
            <m.div
              initial={{ opacity: 0, y: 24 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            >
              <p
                className="mb-6 md:mb-10"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '11px',
                  color: 'var(--color-fg-dim)',
                  letterSpacing: '0.05em',
                  maxWidth: '520px',
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
                  href="/resume.pdf"
                  target="_blank"
                  onClick={() => { analytics.heroCta(t.hero.cta2); analytics.resumeDownload(); }}
                >
                  {t.hero.cta2}
                </CyberBtn>
              </div>
            </m.div>

            {/* Focus tags */}
            <div>
              <m.div
                className="sys-label mb-5"
                id="focus-label"
                initial={{ opacity: 0 }}
                animate={booted ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                {t.hero.focusAreasLabel}
              </m.div>
              <ul className="flex flex-wrap gap-2" aria-labelledby="focus-label">
                {t.hero.tags.map((tag, i) => (
                  <m.li
                    key={tag}
                    className="px-3 py-1.5 text-[10px] tracking-widest uppercase"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      border: '1px solid var(--color-rule)',
                      color: 'var(--color-fg-mute)',
                    }}
                    initial={{ opacity: 0, y: 8 }}
                    animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 1.1 + i * 0.04 }}
                  >
                    {tag}
                  </m.li>
                ))}
              </ul>
            </div>
          </div>

        </m.div>
      </section>

      {/* Stats strip — outside hero section so it doesn't push CTAs below the fold */}
      <div className="relative z-10" style={{ borderTop: '1px solid var(--color-rule)', borderBottom: '1px solid var(--color-rule)' }}>
        <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
          background: 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 60%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.15) 78%, transparent 85%)',
        }} />
        <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
        <m.div
          className="relative z-10 lg:max-w-[62%] px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {t.trust.stats.map((stat, i) => (
            <m.div
              key={stat.label}
              className="relative pl-4"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.07 }}
            >
              <div
                aria-hidden="true"
                className="absolute left-0 top-0 bottom-0 w-[2px]"
                style={{ backgroundColor: 'var(--color-accent)', opacity: 0.5 }}
              />
              <div
                className="tabular mb-1.5"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
                  color: 'var(--color-fg)',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                }}
              >
                <CountUp target={stat.value} suffix="" />
              </div>
              <div className="sys-label">{stat.label}</div>
            </m.div>
          ))}
        </m.div>
      </div>

      {/* Client logo marquee — below stats */}
      <ClientLogos />
    </>
  );
}
