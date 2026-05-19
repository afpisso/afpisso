import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion, useScroll, useTransform, useInView } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import { analytics } from '../utils/analytics';
import ClientLogos from './ClientLogos';
import GeometryGrid from './GeometryGrid';

const EASE = 'cubic-bezier(0.32, 0.72, 0, 1)';
const DUR  = '0.3s';

/**
 * Block-level stroke line with full-width red sweep on hover.
 * Used for hero outlined lines — avoids inline-block overflow issues
 * while covering the entire line text with the effect.
 */
function StrokeLine({ children, stroke = '1.5px rgba(245,245,243,0.5)' }) {
  const [active, setActive] = useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'block', overflow: 'hidden' }}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
    >
      {/* z0 — stroke text, wraps naturally within container */}
      <span style={{ display: 'block', WebkitTextStroke: stroke, color: 'transparent' }}>
        {children}
      </span>
      {/* z1 — red fill sweeps left→right across full line width */}
      <span aria-hidden="true" style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--color-accent)',
        transform: active ? 'scaleX(1)' : 'scaleX(0)',
        transformOrigin: 'left center',
        transition: `transform ${DUR} ${EASE}`,
        zIndex: 1,
        pointerEvents: 'none',
      }} />
      {/* z2 — dark solid text, clip-path reveals in sync with red */}
      <span aria-hidden="true" style={{
        position: 'absolute',
        top: 0, left: 0, right: 0, bottom: 0,
        display: 'block',
        color: '#0a0a0a',
        zIndex: 2,
        pointerEvents: 'none',
        clipPath: active ? 'inset(0 -1% 0 -1%)' : 'inset(0 101% 0 -1%)',
        transition: `clip-path ${DUR} ${EASE}`,
      }}>
        {children}
      </span>
    </span>
  );
}

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
  const numeric = parseInt(target, 10);
  // Preserve any non-numeric trailing characters (e.g. '+') from the target string
  const trailMatch = String(target).match(/[^0-9]+$/);
  const trail = trailMatch ? trailMatch[0] : suffix;

  useEffect(() => {
    if (!inView || isNaN(numeric)) return;
    // Small delay so entry animations finish before counter fires
    const delay = setTimeout(() => {
      const duration = 1800;
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
  }, [inView, numeric]);

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
    <motion.div
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
          <motion.button
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
          </motion.button>
        )}
      </div>
    </motion.div>
  );
}

// Shape mapped to each homepage section by id
const SECTION_SHAPES = {
  home:    'logo',
  cases:   'cube',
  whatido: 'torus',
  howiwork:'helix',
  notes:   'wave',
  about:   'logo',
  contact: 'logo',
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
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, [ids.join(',')]); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

export default function Hero() {
  const shouldReduce = useReducedMotion();
  const [booted, setBooted] = useState(
    () => shouldReduce || sessionStorage.getItem('booted') === '1'
  );
  const sectionRef = useRef(null);
  const { t } = useLang();
  const mouseRef = useMousePos();
  const activeSection = useActiveSection(Object.keys(SECTION_SHAPES));
  const currentShape = SECTION_SHAPES[activeSection] || 'sphere';

  // reducedMotion fallback handled in useState initializer above

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);

  const nameLines = [
    { text: 'Andres', outlined: false, delay: 0.2 },
    { text: 'Felipe', outlined: true,  delay: 0.36 },
    { text: 'Pisso',  outlined: false, delay: 0.52 },
  ];

  return (
    <>
      {!booted && !shouldReduce && <BootSequence onComplete={() => setBooted(true)} />}

      <section
        ref={sectionRef}
        id="home"
        className="relative min-h-[100dvh] flex flex-col justify-center overflow-hidden"
        style={{ paddingTop: '80px' }}
      >
        {/* Background — GeometryGrid is fixed so it spans all sections */}
        {!shouldReduce && (
          <GeometryGrid
            mouseRef={mouseRef}
            shape={currentShape}
            intensity={7}
            offsetX={0.18}
            offsetY={0}
            rotX={0.20}
            spin={true}
            paused={false}
          />
        )}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute inset-0" style={{ background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(255,37,64,0.04) 0%, transparent 70%)' }} />
          {/* Bottom fade — prevents particles overlapping CTAs */}
          <div className="absolute bottom-0 left-0 right-0 h-64" style={{ background: 'linear-gradient(transparent, var(--color-bg))' }} />
          {/* Left fade — protects text column from particle overlap */}
          <div className="absolute inset-y-0 left-0 w-[55%]" style={{ background: 'linear-gradient(to right, var(--color-bg) 0%, rgba(8,8,8,0.75) 35%, transparent 100%)' }} />
        </div>

        {/* Corner marks */}
        <div aria-hidden="true" className="absolute top-[80px] left-0 w-16 h-16 border-l border-t" style={{ borderColor: 'var(--color-rule)' }} />
        <div aria-hidden="true" className="absolute top-[80px] right-0 w-16 h-16 border-r border-t" style={{ borderColor: 'var(--color-rule)' }} />

        <motion.div
          className="relative z-10 max-w-[1400px] mx-auto px-6 py-24"
          style={shouldReduce ? {} : { y: contentY, opacity: contentOpacity }}
        >
          {/* System label */}
          <motion.div
            className="flex items-center gap-4 mb-12"
            aria-hidden="true"
            initial={{ opacity: 0, x: -16 }}
            animate={booted ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          >
            <motion.div
              style={{ backgroundColor: 'var(--color-accent)', height: '1px' }}
              initial={{ width: 0 }}
              animate={booted ? { width: 48 } : { width: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            />
            <span className="sys-label">{t.hero.label}</span>
            <div className="flex items-center gap-2 ml-4">
              <div className="pulse-dot w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="sys-label" style={{ color: 'var(--color-accent)' }}>SIGNAL ACTIVE</span>
            </div>
          </motion.div>

          {/* H1 — Name as protagonist */}
          <div className="mb-6">
            <h1
              className="uppercase"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(4.5rem, 14vw, 13rem)',
                lineHeight: 0.88,
                letterSpacing: '-0.01em',
              }}
            >
              {nameLines.map((line, i) => (
                <div key={i} style={{ overflow: 'hidden', paddingBottom: '0.04em' }}>
                  <motion.span
                    style={{
                      display: 'block',
                      color: line.outlined ? 'transparent' : 'var(--color-fg)',
                    }}
                    initial={{ y: '110%' }}
                    animate={booted ? { y: 0 } : { y: '110%' }}
                    transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: line.delay }}
                  >
                    {line.outlined
                      ? <StrokeLine>{line.text}</StrokeLine>
                      : line.text
                    }
                  </motion.span>
                </div>
              ))}
            </h1>
          </div>

          {/* Subtitle */}
          <motion.div
            className="flex items-start gap-5 mb-10"
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
          </motion.div>

          {/* Handle / separator */}
          <motion.div
            className="flex items-center gap-4 mb-10"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={booted ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.88 }}
          >
            <motion.div
              style={{ backgroundColor: 'var(--color-rule)', height: '1px', transformOrigin: 'left' }}
              className="max-w-[180px] w-full"
              initial={{ scaleX: 0 }}
              animate={booted ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.9 }}
            />
            <span className="sys-label whitespace-nowrap">@byandresfe</span>
          </motion.div>

          {/* Copy + CTAs + Focus tags */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.0 }}
            >
              <p
                className="mb-10"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '11px',
                  color: 'var(--color-fg-mute)',
                  letterSpacing: '0.05em',
                  maxWidth: '520px',
                }}
              >
                {t.hero.proof}
              </p>

              <div className="flex flex-wrap gap-3">
                <motion.a
                  href="#cases"
                  className="flex items-center gap-3 px-6 py-3 text-[11px] tracking-widest uppercase transition-colors duration-200"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    backgroundColor: 'var(--color-accent)', color: '#0a0a0a',
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#cc1f34')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-accent)')}
                  onClick={() => analytics.heroCta(t.hero.cta1)}
                  whileTap={{ scale: 0.97 }}
                >
                  {t.hero.cta1}
                  <span aria-hidden="true">→</span>
                </motion.a>
                <motion.a
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-6 py-3 text-[11px] tracking-widest uppercase transition-all duration-200"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    border: '1px solid var(--color-rule)', color: 'var(--color-fg-dim)',
                    clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.28)'; e.currentTarget.style.color = 'var(--color-fg)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-rule)'; e.currentTarget.style.color = 'var(--color-fg-dim)'; }}
                  onClick={() => { analytics.heroCta(t.hero.cta2); analytics.resumeDownload(); }}
                  whileTap={{ scale: 0.97 }}
                >
                  {t.hero.cta2}
                </motion.a>
              </div>
            </motion.div>

            {/* Focus tags */}
            <div>
              <motion.div
                className="sys-label mb-5"
                id="focus-label"
                initial={{ opacity: 0 }}
                animate={booted ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.5, delay: 1.1 }}
              >
                Current focus areas
              </motion.div>
              <ul className="flex flex-wrap gap-2" aria-labelledby="focus-label">
                {t.hero.tags.map((tag, i) => (
                  <motion.li
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
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <motion.div
            className="mt-20 pt-8 border-t grid grid-cols-2 md:grid-cols-4 gap-8"
            style={{ borderColor: 'var(--color-rule)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={booted ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 1.25 }}
          >
            {t.trust.stats.map((stat) => (
              <div key={stat.label}>
                <div
                  className="tabular mb-2"
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
              </div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Client logo marquee — below hero */}
      <ClientLogos />
    </>
  );
}
