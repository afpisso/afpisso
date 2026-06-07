import { useRef, useState, useEffect } from 'react';
import { m, useReducedMotion, useMotionValue, animate } from 'framer-motion';
import SectionHeading from './SectionHeading';
import { useLang } from '../contexts/LangContext';

const EASE    = [0.16, 1, 0.3, 1];
const SPEED   = 0.75; // px per frame ~45px/s at 60fps
const IG_PROFILE = 'https://www.instagram.com/byandresfe/';

const POSTS = [
  { webm: '/ig/01.webm', video: '/ig/01.mp4', poster: '/ig/01.webp', category: 'Breakdown Heurístico', title: 'Consistencia y\nestándares',                  href: 'https://www.instagram.com/p/DX9SxLxgMlL/?img_index=1' },
  { webm: '/ig/02.webm', video: '/ig/02.mp4', poster: '/ig/02.webp', category: 'Accesibilidad',        title: 'Decisiones de accesibilidad\npara Game UX/UI', href: 'https://www.instagram.com/p/DYmldS1gCoR/?img_index=1' },
  { webm: '/ig/03.webm', video: '/ig/03.mp4', poster: '/ig/03.webp', category: 'Game UX Breakdown',    title: 'Balatro',                                     href: 'https://www.instagram.com/p/DYXfX_BgI1f/?img_index=1' },
  { webm: '/ig/04.webm', video: '/ig/04.mp4', poster: '/ig/04.webp', category: 'Game UX/UI',           title: 'La complejidad no es mala.\nLa confusión sí.', href: 'https://www.instagram.com/p/DYAciUPlN_2/?img_index=1' },
  { webm: '/ig/05.webm', video: '/ig/05.mp4', poster: '/ig/05.webp', category: 'UX/UI Picks',          title: '5 sitios web para\nreferencias de Game UI',    href: 'https://www.instagram.com/p/DY5pDw0gOrk/?img_index=1' },
  { webm: '/ig/06.webm', video: '/ig/06.mp4', poster: '/ig/06.webp', category: 'Breakdown Heurístico', title: 'Estética y\ndiseño minimalista',               href: 'https://www.instagram.com/p/DZGu4VdgLmd/?img_index=1' },
];

const GAP = 10;

function IGCard({ post, isClone }) {
  const { t } = useLang();
  const [hovered, setHovered] = useState(false);
  const videoRef  = useRef(null);
  const shouldReduce = useReducedMotion();

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid || shouldReduce) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) vid.play().catch(() => {});
        else vid.pause();
      },
      { threshold: 0.25 },
    );
    io.observe(vid);
    return () => io.disconnect();
  }, [shouldReduce]);

  return (
    <a
      href={post.href}
      target="_blank"
      rel="noopener noreferrer"
      // Clones are purely visual — hide from a11y tree and tab order
      aria-hidden={isClone ? 'true' : undefined}
      tabIndex={isClone ? -1 : undefined}
      style={{
        width: 'clamp(220px, 22vw, 300px)',
        height: 'clamp(275px, 27.5vw, 375px)',
        flexShrink: 0, position: 'relative',
        overflow: 'hidden', display: 'block',
        textDecoration: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <video
        ref={videoRef}
        poster={post.poster}
        muted loop playsInline preload="none"
        draggable={false}
        aria-hidden="true"
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', display: 'block',
          filter: 'grayscale(6%) contrast(1.05)',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          transition: 'transform 420ms cubic-bezier(0.16,1,0.3,1)',
          pointerEvents: 'none', userSelect: 'none',
        }}
      >
        {post.webm && <source src={post.webm} type="video/webm" />}
        <source src={post.video} type="video/mp4" />
      </video>

      {/* Bottom vignette */}
      <div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(6,6,6,0.85) 0%, rgba(6,6,6,0.18) 38%, transparent 60%)',
      }} />

      {/* Hover fog */}
      <m.div aria-hidden style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(to top, rgba(6,6,6,0.94) 0%, rgba(6,6,6,0.55) 55%, rgba(6,6,6,0.12) 100%)',
      }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.14, ease: 'easeOut' }}
      />

      {/* Content overlay */}
      <m.div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '18px 16px' }}
        animate={{ y: hovered ? 0 : 10, opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.18, ease: EASE }}
      >
        <div style={{
          display: 'inline-block',
          fontFamily: '"Play", sans-serif', fontSize: 9, fontWeight: 700,
          letterSpacing: '0.16em', textTransform: 'uppercase',
          color: '#0a0a0a', backgroundColor: 'var(--color-accent)',
          padding: '2px 8px', marginBottom: 7,
          clipPath: 'polygon(0 0, calc(100% - 4px) 0, 100% 4px, 100% 100%, 4px 100%, 0 calc(100% - 4px))',
        }}>
          {post.category}
        </div>
        <div style={{
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(1.05rem, 1.6vw, 1.4rem)',
          color: 'var(--color-fg)', lineHeight: 1.1, letterSpacing: '0.01em',
          marginBottom: 10, whiteSpace: 'pre-line',
        }}>
          {post.title}
        </div>
        <div style={{
          fontFamily: '"Play", sans-serif', fontSize: 9, fontWeight: 700,
          letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)',
        }}>
          {t.igStrip.viewPost} →
        </div>
      </m.div>
    </a>
  );
}

// Chamfer control button
function CtrlBtn({ onClick, label, children }) {
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      aria-label={label}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: 'none', border: '1px solid',
        borderColor: hov ? 'var(--color-accent-35)' : 'var(--color-rule)',
        color: hov ? 'var(--color-fg)' : 'var(--color-fg-mute)',
        width: 32, height: 32, display: 'inline-flex',
        alignItems: 'center', justifyContent: 'center',
        cursor: 'pointer', flexShrink: 0,
        clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
        transition: 'color 150ms ease-out, border-color 150ms ease-out',
      }}
    >
      {children}
    </button>
  );
}

export default function IGStrip() {
  const { t } = useLang();
  const ig = t.igStrip;
  const x            = useMotionValue(0);
  const trackRef     = useRef(null);
  const firstCardRef = useRef(null);
  const rafRef       = useRef(null);
  const [playing, setPlaying] = useState(true);
  const shouldReduce = useReducedMotion();

  function getStep() {
    if (!firstCardRef.current) return 310;
    return firstCardRef.current.offsetWidth + GAP;
  }

  function getHalf() {
    if (!trackRef.current) return POSTS.length * 310;
    return trackRef.current.scrollWidth / 2;
  }

  // RAF auto-scroll
  useEffect(() => {
    if (!playing || shouldReduce) return;
    function tick() {
      const half = getHalf();
      if (half <= 0) { rafRef.current = requestAnimationFrame(tick); return; }
      const next = x.get() - SPEED;
      // Seamless reset at halfway point
      x.set(Math.abs(next) >= half ? next + half : next);
      rafRef.current = requestAnimationFrame(tick);
    }
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [playing, shouldReduce]); // eslint-disable-line react-hooks/exhaustive-deps

  function prev() {
    cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    animate(x, x.get() + getStep(), { duration: 0.45, ease: EASE });
  }

  function next() {
    cancelAnimationFrame(rafRef.current);
    setPlaying(false);
    animate(x, x.get() - getStep(), { duration: 0.45, ease: EASE });
  }

  function togglePlay() {
    setPlaying(p => !p);
  }

  return (
    <section
      aria-label="Feed de Instagram — En el campo"
      style={{ borderBottom: '1px solid var(--color-rule)', position: 'relative', overflow: 'hidden' }}
      // Pause when keyboard focus enters the strip
      onFocus={() => setPlaying(false)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget)) setPlaying(true); }}
      // Pause on mouse hover
      onMouseEnter={() => setPlaying(false)}
      onMouseLeave={() => setPlaying(true)}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />

      <div className="relative z-10 py-20">

        {/* Header */}
        <div className="max-w-[1400px] mx-auto px-6 mb-12 flex items-end justify-between gap-6">
          <m.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <SectionHeading label={ig.label} page="009" />
          </m.div>

          {/* Controls + link */}
          <m.div
            className="flex items-center gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <CtrlBtn onClick={prev} label="Post anterior">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                <path d="M7 1L3 5l4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </CtrlBtn>
            <CtrlBtn onClick={togglePlay} label={playing ? 'Pausar carrusel' : 'Reproducir carrusel'}>
              {playing ? (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                  <rect x="1.5" y="1" width="3" height="8" rx="0.5"/>
                  <rect x="5.5" y="1" width="3" height="8" rx="0.5"/>
                </svg>
              ) : (
                <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                  <path d="M2 1.5l7 3.5-7 3.5V1.5z"/>
                </svg>
              )}
            </CtrlBtn>
            <CtrlBtn onClick={next} label="Post siguiente">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden>
                <path d="M3 1l4 4-4 4" stroke="currentColor" strokeWidth="1.4" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </CtrlBtn>
            <a
              href={IG_PROFILE}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Ver todo en Instagram — @byandresfe"
              style={{
                fontFamily: '"Play", sans-serif', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--color-fg-mute)', textDecoration: 'none',
                transition: 'color 150ms ease-out', paddingBottom: 2, marginLeft: 4,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
            >
              @byandresfe · {ig.viewProfile} →
            </a>
          </m.div>
        </div>

        {/* Strip */}
        <div style={{ overflow: 'hidden' }}>
          <m.div
            ref={trackRef}
            style={{ x, display: 'flex', gap: GAP, width: 'max-content', paddingLeft: GAP }}
          >
            {/* Real items — in a11y tree, focusable */}
            {POSTS.map((post, i) => (
              <div key={i} ref={i === 0 ? firstCardRef : undefined}>
                <IGCard post={post} isClone={false} />
              </div>
            ))}
            {/* Clone set — hidden from a11y tree, not focusable */}
            {POSTS.map((post, i) => (
              <IGCard key={`clone-${i}`} post={post} isClone />
            ))}
          </m.div>
        </div>

      </div>
    </section>
  );
}
