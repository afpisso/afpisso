import { useRef, useState, useEffect } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import WhatIDo from '../components/WhatIDo';
import HowIWork from '../components/HowIWork';
import { useLang } from '../contexts/LangContext';
import { useHunt } from '../contexts/HuntContext';
import SignalTrigger from '../components/SignalTrigger';
import GlitchStrokeText from '../components/GlitchStrokeText';
import SectionHeading from '../components/SectionHeading';
import { usePageMeta } from '../hooks/usePageMeta';
import PhotoGridOverlay from '../components/PhotoGridOverlay';
import GeometryGrid from '../components/GeometryGrid';
import { m, AnimatePresence, useTransform, useScroll, useReducedMotion } from 'framer-motion';
import { ZoomModal } from '../components/ZoomModal';

const SECTION_CONFIG = {
  'about':         { shape: 'tknot32', offsetX:  0.46, spin: true  },
  'about-bio':     { shape: 'dhelix',  offsetX:  0.46, spin: true  },
  'about-skills':  { shape: 'circuit', offsetX:  0.52, spin: true  },
  'about-career':  { shape: 'mobius',  offsetX: -0.46, spin: true  },
  'what-i-do':     { shape: 'mobius',  offsetX: -0.46, spin: true  },
  'how-i-work':    { shape: 'vortex',  offsetX:  0.46, spin: true  },
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
    const update = () => {
      const triggerY = window.innerHeight * 0.35;
      let bestId = ids[0];
      let bestTop = -Infinity;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= triggerY && top > bestTop) { bestTop = top; bestId = id; }
      }
      setActive((prev) => (prev === bestId ? prev : bestId));
    };
    window.addEventListener('scroll', update, { passive: true });
    update();
    const t = setTimeout(update, 600);
    return () => { window.removeEventListener('scroll', update); clearTimeout(t); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return active;
}

const EASE = [0.16, 1, 0.3, 1];
const EASE_IOS = [0.32, 0.72, 0, 1];


function inView(delay = 0, reduced = false) {
  return {
    initial: { opacity: 0, y: reduced ? 0 : 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-100px' },
    transition: { duration: 0.5, ease: EASE, delay },
  };
}

export default function AboutPage({ onMenuOpen }) {
  const { t, lang } = useLang();
  const about = t.about;
  const shouldReduce = useReducedMotion();

  usePageMeta({
    title: lang === 'es' ? 'Sobre mí' : 'About',
    description: lang === 'es'
      ? 'Sobre Andrés Felipe Pisso — UX Lead y Diseñador Game UX/UI enfocado en claridad, retroalimentación y mejores decisiones.'
      : 'About Andrés Felipe Pisso — UX Lead and Game UX/UI Designer focused on clarity, feedback, and better decisions.',
  });

  const mouseRef = useMousePos();
  const activeSection = useActiveSection(Object.keys(SECTION_CONFIG));
  const sectionCfg = SECTION_CONFIG[activeSection] ?? SECTION_CONFIG['about'];

  const photoRef = useRef(null);
  const photoMouseRef = useRef({ x: -1, y: -1 });
  const [photoHovered, setPhotoHovered] = useState(false);
  const [photoZoomOpen, setPhotoZoomOpen] = useState(false);
  const { acquireSignal } = useHunt();

  const cqClickCount = useRef(0);
  const cqClickTimer = useRef(null);
  function handleCoreQuestionClick() {
    cqClickCount.current++;
    clearTimeout(cqClickTimer.current);
    cqClickTimer.current = setTimeout(() => { cqClickCount.current = 0; }, 700);
    if (cqClickCount.current >= 3) {
      acquireSignal('sig-about');
      cqClickCount.current = 0;
    }
  }

  const { scrollYProgress: photoScroll } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(photoScroll, [0, 1], ['-7%', '7%']);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main id="main-content" style={{ position: 'relative' }}>

        {/* ── Persistent GeometryGrid — fixed behind all sections ── */}
        {!shouldReduce && (
          <>
            <GeometryGrid
              mouseRef={mouseRef}
              shape={sectionCfg.shape}
              intensity={7}
              offsetX={sectionCfg.offsetX}
              offsetY={0}
              rotX={0.20}
              spin={sectionCfg.spin !== false}
              paused={false}
              particleCount={1200}
            />
          </>
        )}

        {/* ── Hero ── */}
        <section id="about" style={{ borderBottom: '1px solid var(--color-rule)', overflow: 'hidden', position: 'relative' }}>
          {/* Mobile: solid bg */}
          <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
          {/* Desktop: particles right, text protected on left */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to right, var(--color-bg) 0%, var(--color-bg) 30%, rgba(8,8,8,0.88) 52%, rgba(8,8,8,0.4) 68%, transparent 82%)',
          }} />
          {/* Page-number watermark */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              bottom: '-2rem',
              right: '-1rem',
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(12rem, 26vw, 32rem)',
              lineHeight: 0.82,
              color: 'var(--color-fg)',
              opacity: 0.025,
              letterSpacing: '-0.02em',
              pointerEvents: 'none',
              userSelect: 'none',
            }}
          >005</div>

          <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-40">
            <div className="flex flex-col lg:flex-row lg:items-end gap-0">

              {/* Left — statement */}
              <div className="flex-1 pb-20 lg:pr-16">
                <div className="mb-10">
                  <SectionHeading label={about.label} page="005" />
                </div>

                {/* Section title as opening statement */}
                <m.p
                  className="uppercase"
                  style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: 'clamp(3.5rem, 8.5vw, 9rem)',
                    color: 'var(--color-fg)',
                    lineHeight: 0.88,
                    letterSpacing: '0.015em',
                    whiteSpace: 'pre-line',
                  }}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 36 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.65, ease: EASE, delay: 0.07 }}
                >
                  {about.sectionTitle}
                </m.p>

                {/* Name + role */}
                <m.div
                  className="mt-10 flex items-start gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.24 }}
                >
                  <div
                    aria-hidden="true"
                    style={{ width: 2, height: 44, backgroundColor: 'var(--color-accent)', flexShrink: 0, marginTop: 2 }}
                  />
                  <div>
                    <div
                      style={{
                        fontFamily: '"Bebas Neue", sans-serif',
                        fontSize: 'clamp(1.4rem, 2.6vw, 2.5rem)',
                        color: 'var(--color-fg)',
                        letterSpacing: '0.02em',
                        lineHeight: 1.05,
                      }}
                    >
                      <GlitchStrokeText>Andrés Felipe Pisso</GlitchStrokeText>
                    </div>
                    <div className="mt-1.5 sys-label" style={{ color: 'var(--color-fg-dim)' }}>
                      {t.aboutPage.subheadline}
                    </div>
                  </div>
                </m.div>

                {/* Quick-fact chips */}
                <m.div
                  className="mt-10 flex flex-wrap items-center gap-2.5"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.34 }}
                >
                  {[
                    { label: lang === 'es' ? '11+ años' : '11+ years' },
                    { label: lang === 'es' ? 'ES · EN' : 'ES · EN' },
                    { label: lang === 'es' ? 'Juegos · Producto · Conferencias' : 'Games · Product · Speaking', accent: true },
                    { label: about.availabilityLabel || 'Available', pulse: true },
                  ].map((fact, i) => (
                    <span
                      key={i}
                      style={{
                        fontFamily: '"Play", sans-serif',
                        fontSize: 10,
                        fontWeight: 700,
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        padding: '5px 12px',
                        border: `1px solid ${fact.accent ? 'var(--color-accent-35)' : 'var(--color-rule)'}`,
                        color: fact.accent ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 7,
                        clipPath: 'polygon(0 0, calc(100% - 5px) 0, 100% 5px, 100% 100%, 5px 100%, 0 calc(100% - 5px))',
                      }}
                    >
                      {fact.pulse && (
                        <span className="relative flex-shrink-0" style={{ width: 6, height: 6 }} aria-hidden="true">
                          <span className="pulse-dot" />
                        </span>
                      )}
                      {fact.label}
                    </span>
                  ))}
                </m.div>
              </div>

              {/* Right — portrait photo, bottom-aligned */}
              <m.div
                ref={photoRef}
                className="relative overflow-hidden self-end flex-shrink-0"
                style={{
                  width: 'clamp(240px, 34vw, 400px)',
                  aspectRatio: '3 / 4',
                  cursor: 'zoom-in',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.01, delay: 0.1 }}
                onMouseEnter={() => setPhotoHovered(true)}
                onMouseLeave={() => { setPhotoHovered(false); photoMouseRef.current = { x: -1, y: -1 }; }}
                onMouseMove={e => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  photoMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
                }}
                onClick={() => setPhotoZoomOpen(true)}
              >
                <m.div className="absolute inset-[-7%] w-[114%] h-[114%]" style={{ y: photoY }}>
                  <img
                    src="/photo.webp"
                    alt="Andrés Felipe Pisso — Game UX/UI Designer"
                    className="w-full h-full object-cover object-center"
                    width="400"
                    height="533"
                    loading="eager"
                    decoding="async"
                    style={{ filter: 'grayscale(12%) contrast(1.06)' }}
                  />
                </m.div>
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.5) 0%, transparent 50%)' }}
                  aria-hidden="true"
                />
                <div
                  className="absolute bottom-0 right-0 w-10 h-10 border-b-2 border-r-2"
                  style={{ borderColor: 'var(--color-accent)' }}
                  aria-hidden="true"
                />
                {/* Vertical wipe reveal */}
                <m.div
                  className="absolute inset-0"
                  style={{ backgroundColor: 'var(--color-accent)', transformOrigin: 'top' }}
                  initial={{ scaleY: 1 }}
                  animate={{ scaleY: 0 }}
                  transition={{ duration: 0.7, ease: EASE_IOS, delay: 0.18 }}
                  aria-hidden="true"
                />
                <PhotoGridOverlay active={photoHovered} mousePosRef={photoMouseRef} />
              </m.div>
            </div>
          </div>
        </section>

        {/* ── Core question + Bio ── */}
        <section id="about-bio" style={{ borderBottom: '1px solid var(--color-rule)', position: 'relative' }}>
          {/* Mobile: solid bg */}
          <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
          {/* Desktop: both cols have text — particles only peek at far right edge */}
          <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to right, var(--color-bg) 0%, var(--color-bg) 70%, rgba(8,8,8,0.92) 82%, rgba(8,8,8,0.55) 92%, transparent 100%)',
          }} />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-24">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.48fr)_minmax(0,1fr)] gap-16 lg:gap-28">

              {/* Core question */}
              <m.div
                {...inView(0, shouldReduce)}
                onClick={handleCoreQuestionClick}
                style={{ cursor: 'default', userSelect: 'none' }}
              >
                <div style={{ borderLeft: '2px solid var(--color-accent)', paddingLeft: '1.5rem' }}>
                  <p className="sys-label mb-5" style={{ color: 'var(--color-fg-mute)' }}>
                    {about.coreQuestionLabel}
                  </p>
                  <p
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: 'clamp(1.6rem, 3vw, 2.9rem)',
                      color: 'var(--color-fg)',
                      lineHeight: 1.06,
                      letterSpacing: '0.01em',
                    }}
                  >
                    {about.coreQuestion}
                  </p>
                  <SignalTrigger id="sig-about" prominence="low" />
                </div>
              </m.div>

              {/* Bio */}
              <m.div {...inView(0.08, shouldReduce)}>
                <p
                  className="mb-7"
                  style={{
                    fontFamily: '"Play", sans-serif',
                    color: 'var(--color-fg)',
                    fontSize: 'clamp(14px, 1.55vw, 17px)',
                    lineHeight: 1.88,
                    maxWidth: '68ch',
                  }}
                >
                  {about.bio1}
                </p>
                <p
                  className="mb-7"
                  style={{
                    fontFamily: '"Play", sans-serif',
                    color: 'var(--color-fg-dim)',
                    fontSize: 'clamp(13px, 1.45vw, 15px)',
                    lineHeight: 1.92,
                    maxWidth: '68ch',
                  }}
                >
                  {about.bio2}
                </p>
                <p
                  style={{
                    fontFamily: '"Play", sans-serif',
                    color: 'var(--color-fg-dim)',
                    fontSize: 'clamp(13px, 1.45vw, 15px)',
                    lineHeight: 1.92,
                    maxWidth: '68ch',
                  }}
                >
                  {about.bio3}
                </p>
              </m.div>
            </div>
          </div>
        </section>

        {/* ── Expertise: 4-column full-width grid ── */}
        <section id="about-skills" style={{ borderBottom: '1px solid var(--color-rule)', position: 'relative' }}>
          <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
          <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to right, var(--color-bg) 0%, var(--color-bg) 70%, rgba(8,8,8,0.92) 82%, rgba(8,8,8,0.5) 92%, transparent 100%)',
          }} />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20">
            <div className="mb-14">
              <SectionHeading label={about.expertiseLabel} page="005b" />
            </div>

            {/* 4-col skill groups — all visible simultaneously */}
            <div className="grid grid-cols-2 lg:grid-cols-4">
              {about.skillGroups.map((group, gi) => (
                <m.div
                  key={group.title}
                  className="pb-10 lg:pb-0"
                  style={{
                    borderRight: gi < about.skillGroups.length - 1 ? '1px solid var(--color-rule)' : 'none',
                    paddingLeft: gi === 0 ? 0 : 'clamp(1rem, 2.5vw, 2.5rem)',
                    paddingRight: gi < about.skillGroups.length - 1 ? 'clamp(1rem, 2.5vw, 2.5rem)' : 0,
                  }}
                  initial={{ opacity: 0, y: shouldReduce ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.45, ease: EASE, delay: gi * 0.08 }}
                >
                  {/* Category header */}
                  <div style={{
                    fontFamily: '"Bebas Neue", sans-serif',
                    fontSize: 'clamp(1.05rem, 1.7vw, 1.5rem)',
                    letterSpacing: '0.02em',
                    color: 'var(--color-fg)',
                    lineHeight: 1.1,
                    marginBottom: '1.25rem',
                    paddingBottom: '0.75rem',
                    borderBottom: '1px solid var(--color-accent-15, rgba(255,37,64,0.15))',
                  }}>
                    {group.title}
                  </div>

                  {/* Items */}
                  <ul>
                    {group.items.map((item, ii) => (
                      <m.li
                        key={item}
                        style={{
                          fontFamily: '"Play", sans-serif',
                          fontSize: 13,
                          letterSpacing: '0.04em',
                          color: 'var(--color-fg-dim)',
                          padding: '7px 0',
                          borderBottom: '1px solid var(--color-rule)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 8,
                          transition: 'color 150ms ease-out',
                          cursor: 'default',
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.2, delay: gi * 0.08 + ii * 0.022 }}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; }}
                        onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-dim)'; }}
                      >
                        <span aria-hidden style={{ fontFamily: '"Play", sans-serif', fontSize: 9, color: 'var(--color-accent)', opacity: 0.4, flexShrink: 0, width: '1.4rem', letterSpacing: 0 }}>
                          {String(ii + 1).padStart(2, '0')}
                        </span>
                        {item}
                      </m.li>
                    ))}
                  </ul>
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Career path + Education ── */}
        <section id="about-career" style={{ borderBottom: '1px solid var(--color-rule)', position: 'relative' }}>
          <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
          <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
            background: 'linear-gradient(to left, var(--color-bg) 0%, var(--color-bg) 30%, rgba(8,8,8,0.88) 50%, rgba(8,8,8,0.4) 66%, transparent 80%)',
          }} />
          <div className="relative z-10 max-w-[1400px] mx-auto px-6 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-16 lg:gap-24">

              {/* Left — Career timeline */}
              <div>
                <div className="mb-10">
                  <SectionHeading label={about.timelineLabel} page="005c" />
                </div>
                <dl>
                  {about.timeline.map((item, i) => (
                    <m.div
                      key={i}
                      className="flex gap-0 py-7"
                      style={{ borderTop: '1px solid var(--color-rule)' }}
                      initial={{ opacity: 0, x: shouldReduce ? 0 : -18 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-100px' }}
                      transition={{ duration: 0.4, ease: EASE, delay: i * 0.06 }}
                    >
                      <dt style={{ fontFamily: '"Play", sans-serif', fontSize: 11, letterSpacing: '0.07em', color: 'var(--color-accent)', flexShrink: 0, width: '8.5rem', paddingRight: '1.5rem', paddingTop: 3, lineHeight: 1.4 }}>
                        {item.period}
                      </dt>
                      <dd>
                        <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.15rem, 1.9vw, 1.65rem)', letterSpacing: '0.02em', color: 'var(--color-fg)', lineHeight: 1.1, marginBottom: '0.35rem' }}>
                          {item.role}
                        </div>
                        <div style={{ fontFamily: '"Play", sans-serif', fontSize: 13, color: 'var(--color-fg-dim)', letterSpacing: '0.03em', lineHeight: 1.5 }}>
                          {item.context}
                        </div>
                      </dd>
                    </m.div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--color-rule)' }} />
                </dl>

              </div>

              {/* Right — Education + Languages */}
              <div>
                <div className="mb-10">
                  <SectionHeading label={about.educationLabel} page="005d" />
                </div>

                {/* Degree rows */}
                <div>
                  {about.education.map((item, i) => (
                    <m.div
                      key={i}
                      className="flex gap-0 py-5"
                      style={{ borderTop: '1px solid var(--color-rule)' }}
                      initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{ duration: 0.35, ease: EASE, delay: i * 0.06 }}
                    >
                      <div style={{ fontFamily: '"Play", sans-serif', fontSize: 11, letterSpacing: '0.07em', color: 'var(--color-accent)', flexShrink: 0, width: '4.5rem', paddingRight: '1rem', paddingTop: 2, lineHeight: 1.4 }}>
                        {item.year}
                      </div>
                      <div>
                        <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.05rem, 1.7vw, 1.5rem)', letterSpacing: '0.02em', color: 'var(--color-fg)', lineHeight: 1.1, marginBottom: 4 }}>
                          {item.degree}
                        </div>
                        <div style={{ fontFamily: '"Play", sans-serif', fontSize: 12, color: 'var(--color-fg-mute)', letterSpacing: '0.04em', lineHeight: 1.4 }}>
                          {item.institution}
                        </div>
                      </div>
                    </m.div>
                  ))}
                  <div style={{ borderTop: '1px solid var(--color-rule)' }} />
                </div>

                {/* Languages */}
                <div className="mt-14">
                  <div className="mb-8">
                    <SectionHeading label={about.languagesLabel} page="005e" />
                  </div>
                  <div>
                    {about.languages.map((l, i) => (
                      <m.div
                        key={l}
                        className="flex items-center py-4"
                        style={{ borderTop: '1px solid var(--color-rule)' }}
                        initial={{ opacity: 0, y: shouldReduce ? 0 : 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.35, ease: EASE, delay: i * 0.06 }}
                      >
                        <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(1.05rem, 1.7vw, 1.5rem)', letterSpacing: '0.02em', color: 'var(--color-fg)', lineHeight: 1.1 }}>
                          {l}
                        </div>
                      </m.div>
                    ))}
                    <div style={{ borderTop: '1px solid var(--color-rule)' }} />
                  </div>
                </div>

              </div>
            </div>
          </div>
        </section>

        {/* ── Hiring Snapshot ── */}
        {about.hiringSnapshot && (
          <section style={{ borderBottom: '1px solid var(--color-rule)', position: 'relative' }}>
            <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
            <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
              background: 'linear-gradient(to right, var(--color-bg) 0%, var(--color-bg) 70%, rgba(8,8,8,0.92) 82%, rgba(8,8,8,0.55) 92%, transparent 100%)',
            }} />
            <m.div
              className="relative z-10 max-w-[1400px] mx-auto px-6 py-16"
              {...inView(0, shouldReduce)}
            >
              <div className="mb-8">
                <SectionHeading label={about.hiringSnapshotLabel || 'Hiring Snapshot'} page="005f" />
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] gap-10 lg:gap-20">
                {/* Left — snapshot copy */}
                <div>
                  <p style={{
                    fontFamily: '"Play", sans-serif',
                    fontSize: 'clamp(14px, 1.5vw, 16px)',
                    color: 'var(--color-fg)',
                    lineHeight: 1.85,
                    maxWidth: '62ch',
                    marginBottom: '1.5rem',
                  }}>
                    {about.hiringSnapshot}
                  </p>
                  <p style={{
                    fontFamily: '"Play", sans-serif',
                    fontSize: 'clamp(13px, 1.3vw, 14px)',
                    color: 'var(--color-fg-dim)',
                    lineHeight: 1.75,
                    maxWidth: '58ch',
                    borderLeft: '2px solid var(--color-accent-35)',
                    paddingLeft: '1rem',
                  }}>
                    {about.hiringSnapshotRoles}
                  </p>
                </div>
                {/* Right — recruiter strengths */}
                {about.recruiterSummaryStrengths && (
                  <div>
                    <div style={{
                      fontFamily: '"Play", sans-serif',
                      fontSize: '9px',
                      letterSpacing: '0.18em',
                      color: 'var(--color-accent)',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      marginBottom: '1rem',
                    }}>
                      {about.recruiterSummaryStrengthsLabel || 'Core strengths'}
                    </div>
                    <ul>
                      {about.recruiterSummaryStrengths.map((s, i) => (
                        <li key={i} style={{
                          fontFamily: '"Play", sans-serif',
                          fontSize: 13,
                          color: 'var(--color-fg-dim)',
                          padding: '7px 0',
                          borderBottom: '1px solid var(--color-rule)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 10,
                        }}>
                          <span aria-hidden style={{ color: 'var(--color-accent)', fontSize: 10, opacity: 0.5, flexShrink: 0 }}>→</span>
                          {s}
                        </li>
                      ))}
                    </ul>
                    {about.seniorValue && (
                      <div style={{
                        marginTop: '1.5rem',
                        padding: '1rem',
                        border: '1px solid var(--color-accent-20, rgba(255,37,64,0.20))',
                        backgroundColor: 'rgba(255,37,64,0.04)',
                      }}>
                        <div style={{ fontFamily: '"Play", sans-serif', fontSize: '9px', letterSpacing: '0.18em', color: 'var(--color-accent)', textTransform: 'uppercase', fontWeight: 700, marginBottom: 8 }}>
                          {about.seniorValueLabel || 'Why this matters for senior roles'}
                        </div>
                        <p style={{ fontFamily: '"Play", sans-serif', fontSize: 13, color: 'var(--color-fg-dim)', lineHeight: 1.75 }}>
                          {about.seniorValue}
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </m.div>
          </section>
        )}

        {/* ── About CTA ── */}
        <section style={{ borderBottom: '1px solid var(--color-rule)', position: 'relative' }}>
          <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
          <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(to right, var(--color-bg) 0%, var(--color-bg) 55%, rgba(8,8,8,0.7) 75%, transparent 100%)' }} />
          <m.div
            className="relative z-10 max-w-[1400px] mx-auto px-6 py-24 flex flex-col lg:flex-row lg:items-end justify-between gap-10"
            {...inView(0, shouldReduce)}
          >
            <div>
              <p style={{ fontFamily: '"Play", sans-serif', fontSize: 'clamp(1rem, 1.6vw, 1.3rem)', color: 'var(--color-fg-dim)', lineHeight: 1.6, maxWidth: '52ch', marginBottom: '0.5rem' }}>
                {about.aboutCtaHeadline}
              </p>
              <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(2.2rem, 4.5vw, 5rem)', color: 'var(--color-fg)', lineHeight: 0.95, letterSpacing: '0.01em' }}>
                {about.aboutCtaAccent}
              </p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0 flex-wrap">
              <a
                href="/Andres_Pisso_CV_UXUI_Designer_Games_EN.pdf"
                download
                aria-label={about.resumeBtn || 'Download Resume'}
                style={{ fontFamily: '"Play", sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-fg-mute)', padding: '12px 20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, border: '1px solid var(--color-rule)', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))', transition: 'color 150ms ease-out, border-color 150ms ease-out' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-accent-35)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; e.currentTarget.style.borderColor = 'var(--color-rule)'; }}
              >
                {about.resumeBtn || 'Download Resume'}
                <span aria-hidden style={{ opacity: 0.5 }}>↓</span>
              </a>
              <a
                href={`https://${t.contact.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontFamily: '"Play", sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-fg-mute)', padding: '12px 20px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', border: '1px solid var(--color-rule)', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))', transition: 'color 150ms ease-out, border-color 150ms ease-out' }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-accent-35)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; e.currentTarget.style.borderColor = 'var(--color-rule)'; }}
              >
                {about.aboutCtaLinkedIn}
              </a>
              <a
                href={`mailto:${t.contact.email}`}
                style={{ fontFamily: '"Play", sans-serif', fontSize: 10, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#050505', backgroundColor: 'var(--color-accent)', padding: '12px 24px', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))', transition: 'opacity 150ms ease-out' }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.85'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; }}
              >
                {about.aboutCtaEmail}
                <span aria-hidden>→</span>
              </a>
            </div>
          </m.div>
        </section>

        <WhatIDo />
        <HowIWork />
      </main>
      <Footer />

      {/* Photo zoom modal */}
      <AnimatePresence>
        {photoZoomOpen && (
          <ZoomModal
            items={['/photo.webp']}
            activeIndex={0}
            onClose={() => setPhotoZoomOpen(false)}
            onNav={() => {}}
            title="Andrés Felipe Pisso — Game UX/UI Designer"
          />
        )}
      </AnimatePresence>
    </div>
  );
}
