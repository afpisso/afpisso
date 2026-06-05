import { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SectionTag from '../components/SectionTag';
import CyberBtn from '../components/CyberBtn';
import { useLang } from '../contexts/LangContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { ZoomModal, ScanSweep } from '../components/ZoomModal';

const EASE_OUT = [0.16, 1, 0.3, 1];

const ACCENT = '#ff2540';
const MONO   = '"Rajdhani", sans-serif';
const BEBAS  = '"Bebas Neue", sans-serif';

const CORNER_STYLES = [
  { top: 0,    left: 0,    borderTop:    `1px solid ${ACCENT}`, borderLeft:   `1px solid ${ACCENT}` },
  { top: 0,    right: 0,   borderTop:    `1px solid ${ACCENT}`, borderRight:  `1px solid ${ACCENT}` },
  { bottom: 0, left: 0,    borderBottom: `1px solid ${ACCENT}`, borderLeft:   `1px solid ${ACCENT}` },
  { bottom: 0, right: 0,   borderBottom: `1px solid ${ACCENT}`, borderRight:  `1px solid ${ACCENT}` },
];

const KEY_TOPICS = [
  'Game UI Systems',
  'Design systems for games',
  'Reusable UI in Figma',
  'Component structure',
  'States & variants',
  'Production-ready UI',
  'Player-side clarity',
  'Team-side handoff',
];

// Chamfer clip — matches CyberBtn / SectionTag pattern
const CHAMFER_SM = `polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))`;

// ── MetaChip ───────────────────────────────────────────────────────────────────
function MetaChip({ label }) {
  return (
    <span style={{
      fontFamily: MONO, fontSize: '9px', letterSpacing: '0.16em',
      textTransform: 'uppercase', color: 'var(--color-fg-mute)',
      border: '1px solid var(--color-rule)', padding: '3px 8px', whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  );
}

// ── TopicTag — animate: whileHover scale + CSS color transitions ───────────────
function TopicTag({ label, delay = 0 }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, ease: EASE_OUT, delay }}
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.97 }}
      style={{ display: 'inline-block' }}
    >
      <span
        style={{
          fontFamily: MONO, fontSize: '11px', letterSpacing: '0.1em',
          textTransform: 'uppercase', color: 'var(--color-fg-dim)',
          border: '1px solid var(--color-rule)', padding: '6px 14px',
          clipPath: CHAMFER_SM, display: 'inline-block',
          transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
          cursor: 'default',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.borderColor = 'rgba(255,37,64,0.3)';
          e.currentTarget.style.color = 'var(--color-fg)';
          e.currentTarget.style.backgroundColor = 'rgba(255,37,64,0.04)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.borderColor = 'var(--color-rule)';
          e.currentTarget.style.color = 'var(--color-fg-dim)';
          e.currentTarget.style.backgroundColor = 'transparent';
        }}
      >
        {label}
      </span>
    </m.div>
  );
}

// ── AssetSlot — zoom on click, corner marks on hover, scan sweep ───────────────
// delight: images now feel consistent with the rest of the site's gallery treatment
function AssetSlot({ src, alt, aspectRatio = '16/9', label }) {
  const [open,    setOpen]    = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scanKey, setScanKey] = useState(0);

  return (
    <>
      <m.div
        style={{
          position: 'relative', aspectRatio, overflow: 'hidden',
          border: `1px solid ${hovered && src ? 'rgba(255,37,64,0.35)' : 'var(--color-rule)'}`,
          backgroundColor: 'rgba(255,255,255,0.02)',
          cursor: src ? 'zoom-in' : 'default',
          transition: 'border-color 0.2s ease',
        }}
        onMouseEnter={() => { if (src) { setHovered(true); setScanKey(k => k + 1); } }}
        onMouseLeave={() => setHovered(false)}
        onClick={() => src && setOpen(true)}
      >
        {src ? (
          <>
            <m.img
              src={src}
              alt={alt}
              loading="lazy"
              decoding="async"
              style={{
                width: '100%', height: '100%', objectFit: 'cover', display: 'block',
                filter: 'grayscale(12%) contrast(1.04)',
              }}
              animate={{
                scale: hovered ? 1.03 : 1,
                filter: hovered
                  ? 'grayscale(0%) contrast(1.06) brightness(1.04)'
                  : 'grayscale(12%) contrast(1.04)',
              }}
              transition={{ duration: 0.55, ease: EASE_OUT }}
            />

            {/* Corner marks on hover */}
            <m.div
              aria-hidden="true"
              style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 4 }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.18 }}
            >
              {CORNER_STYLES.map((s, i) => (
                <div key={i} style={{ position: 'absolute', width: 20, height: 20, ...s }} />
              ))}
            </m.div>

            {/* Zoom hint */}
            <m.div
              aria-hidden="true"
              style={{
                position: 'absolute', bottom: 10, right: 12, zIndex: 5,
                fontFamily: MONO, fontSize: '9px', letterSpacing: '0.14em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                pointerEvents: 'none',
              }}
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.18 }}
            >
              [ zoom ]
            </m.div>

            <ScanSweep active={hovered} scanKey={scanKey} />
          </>
        ) : (
          // Placeholder — remove once assets are added
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <div style={{
              width: 32, height: 32, border: '1px solid var(--color-rule)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: 14, height: 1, backgroundColor: 'var(--color-fg-mute)' }} />
            </div>
            {label && (
              <span style={{
                fontFamily: MONO, fontSize: '9px', color: 'var(--color-fg-mute)',
                letterSpacing: '0.14em', textTransform: 'uppercase',
                textAlign: 'center', padding: '0 16px',
              }}>
                {label}
              </span>
            )}
          </div>
        )}
      </m.div>

      {/* Fullscreen zoom modal */}
      <AnimatePresence>
        {open && (
          <ZoomModal
            items={[src]}
            activeIndex={0}
            onClose={() => setOpen(false)}
            onNav={() => {}}
            title={alt}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// ── RevealRule — sweeps in from left on scroll ─────────────────────────────────
function RevealRule({ delay = 0 }) {
  return (
    <m.div
      style={{ height: 1, backgroundColor: 'var(--color-rule)', transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: EASE_OUT, delay }}
    />
  );
}

// ── SpeakingPage ───────────────────────────────────────────────────────────────
export default function SpeakingPage({ onMenuOpen }) {
  const { t, lang } = useLang();
  const s = t.speaking;

  usePageMeta({
    title: lang === 'es'
      ? 'Speaking · Colombia 5.0 Workshop'
      : 'Speaking · Colombia 5.0 Workshop',
    description: lang === 'es'
      ? 'Taller en Colombia 5.0 sobre Game UI Systems: cómo construir sistemas de UI reutilizables y funcionales para videojuegos. Andres Felipe Pisso.'
      : 'Workshop at Colombia 5.0 on Game UI Systems: how to build reusable, functional UI systems for video games. Andres Felipe Pisso.',
  });

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main id="main-content">

        {/* ── HERO ──────────────────────────────────────────────────────────── */}
        <section className="pt-40 pb-20" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <m.div
              className="mb-8"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <SectionTag label={s.sectionLabel} page="006" />
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-10 items-end">
              <div>
                <m.h1
                  className="uppercase"
                  style={{
                    fontFamily: BEBAS,
                    fontSize: 'clamp(3.2rem, 9vw, 8.5rem)',
                    color: 'var(--color-fg)',
                    lineHeight: 0.92,
                    letterSpacing: '0.01em',
                  }}
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.06 }}
                >
                  Colombia 5.0<br />
                  <span style={{ color: 'var(--color-fg-dim)', opacity: 0.72 }}>Workshop</span>
                </m.h1>

                <m.p
                  className="mt-5"
                  style={{
                    fontFamily: MONO,
                    fontSize: 'clamp(12px, 1.6vw, 14px)',
                    color: 'var(--color-fg-dim)',
                    letterSpacing: '0.04em',
                    maxWidth: '520px',
                    lineHeight: 1.7,
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: 0.18 }}
                >
                  {s.heroSubtitle}
                </m.p>
              </div>

              {/* Metadata chips */}
              <m.div
                className="flex flex-row lg:flex-col flex-wrap gap-2 lg:items-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.28 }}
              >
                {['Workshop', 'Colombia 5.0', 'Game UI Systems', 'Figma'].map(c => (
                  <MetaChip key={c} label={c} />
                ))}
              </m.div>
            </div>
          </div>
        </section>

        {/* ── BODY COPY + CONTEXT ───────────────────────────────────────────── */}
        <section className="py-24" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24">

              {/* Left — body copy */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                <div className="sys-label mb-5" style={{ color: 'var(--color-accent)' }}>
                  {s.contextLabel}
                </div>
                <p style={{
                  fontFamily: MONO, fontSize: 'clamp(13px, 1.6vw, 15px)',
                  color: 'rgba(240,238,234,0.78)', lineHeight: 1.85, marginBottom: '1.25rem',
                  maxWidth: '540px',
                }}>
                  {s.bodyP1}
                </p>
                <p style={{
                  fontFamily: MONO, fontSize: 'clamp(12px, 1.5vw, 14px)',
                  color: 'rgba(240,238,234,0.6)', lineHeight: 1.85,
                  maxWidth: '540px',
                }}>
                  {s.bodyP2}
                </p>
              </m.div>

              {/* Right — "Why this belongs" panel */}
              <m.div
                className="p-7 md:p-10 relative"
                style={{ border: '1px solid var(--color-rule)', backgroundColor: 'rgba(8,8,8,0.48)' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
              >
                <div className="absolute top-0 left-0 w-16 h-[2px]" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                <div className="sys-label mb-4">{s.whyBelongsLabel}</div>
                <p style={{
                  fontFamily: MONO, fontSize: 'clamp(13px, 1.5vw, 14px)',
                  color: 'rgba(240,238,234,0.72)', lineHeight: 1.85,
                }}>
                  {s.whyBelongs}
                </p>
              </m.div>
            </div>
          </div>
        </section>

        {/* ── KEY TOPICS ────────────────────────────────────────────────────── */}
        <section className="py-24" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="mb-10 flex items-center justify-between">
              <m.div
                className="sys-label"
                style={{ color: ACCENT }}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                {s.topicsLabel}
              </m.div>
              <m.span
                style={{ fontFamily: MONO, fontSize: '9px', color: 'var(--color-fg-mute)', letterSpacing: '0.14em', textTransform: 'uppercase' }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {KEY_TOPICS.length} topics
              </m.span>
            </div>
            <RevealRule />

            <div className="flex flex-wrap gap-3 mt-8">
              {KEY_TOPICS.map((topic, i) => (
                <TopicTag key={topic} label={topic} delay={0.04 * i} />
              ))}
            </div>
          </div>
        </section>

        {/* ── EDITORIAL VISUALS ─────────────────────────────────────────────── */}
        <section className="py-24" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <m.div
              className="sys-label mb-10"
              style={{ color: ACCENT }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              {s.visualsLabel}
            </m.div>

            {/* Primary editorial grid — 2px gap matching CaseGallery */}
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-[2px] mb-[2px]">
              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                <AssetSlot
                  src="/speaking/stage.webp"
                  alt="Andres Felipe Pisso presenting at Colombia 5.0"
                  aspectRatio="16/9"
                />
              </m.div>

              <div className="flex flex-col gap-[2px]">
                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.06 }}
                >
                  <AssetSlot
                    src="/speaking/poster.jpg"
                    alt="Colombia 5.0 official event poster"
                    aspectRatio="4/3"
                  />
                </m.div>
                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.1 }}
                >
                  <AssetSlot
                    src="/speaking/stage2.webp"
                    alt="Colombia 5.0 event scene"
                    aspectRatio="4/3"
                  />
                </m.div>
              </div>
            </div>

            {/* Slides row — 2px gap, clip-path entrances staggered */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[2px]">
              {[
                { src: '/speaking/slide-01.webp', alt: 'Workshop slide: Game UX/UI clarity' },
                { src: '/speaking/slide-02.webp', alt: 'Workshop slide: interface feedback systems' },
                { src: '/speaking/slide-04.webp', alt: 'Workshop slide: player decision making' },
                { src: '/speaking/slide-07.webp', alt: 'Workshop slide: systems thinking in UI' },
              ].map(({ src, alt }, i) => (
                <m.div
                  key={src}
                  initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
                  whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.07 * i }}
                >
                  <AssetSlot src={src} alt={alt} aspectRatio="16/9" />
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING STATEMENT ─────────────────────────────────────────────── */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-6">
            <m.div
              className="relative p-8 md:p-14"
              style={{ border: '1px solid var(--color-rule)', backgroundColor: 'rgba(8,8,8,0.42)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              <div className="absolute top-0 left-0 w-24 h-[2px]" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
              {/* Watermark */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', top: '1rem', right: '1.5rem',
                  fontFamily: BEBAS, fontSize: 'clamp(4rem, 10vw, 9rem)',
                  color: 'var(--color-fg)', opacity: 0.03,
                  lineHeight: 1, userSelect: 'none', pointerEvents: 'none',
                }}
              >
                06
              </div>

              <div className="sys-label mb-6">{s.closingLabel}</div>

              <h2
                className="uppercase mb-6"
                style={{
                  fontFamily: BEBAS,
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  color: 'var(--color-fg)',
                  lineHeight: 1.0,
                  letterSpacing: '0.01em',
                  maxWidth: '800px',
                }}
              >
                {s.closingHeadline}
              </h2>

              <p style={{
                fontFamily: MONO,
                fontSize: 'clamp(13px, 1.6vw, 15px)',
                color: 'rgba(240,238,234,0.68)',
                lineHeight: 1.85,
                maxWidth: '640px',
                marginBottom: '2rem',
              }}>
                {s.closingBody}
              </p>

              <CyberBtn href="mailto:andres@byandresfe.com" variant="accent-ghost" size="md">
                {s.closingCta}
              </CyberBtn>
            </m.div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
