import { m } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SectionTag from '../components/SectionTag';
import CyberBtn from '../components/CyberBtn';
import { useLang } from '../contexts/LangContext';
import { usePageMeta } from '../hooks/usePageMeta';

const EASE_OUT = [0.16, 1, 0.3, 1];

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

function MetaChip({ label }) {
  return (
    <span
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '9px',
        letterSpacing: '0.16em',
        textTransform: 'uppercase',
        color: 'var(--color-fg-mute)',
        border: '1px solid var(--color-rule)',
        padding: '3px 8px',
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </span>
  );
}

function TopicTag({ label }) {
  return (
    <span
      style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '11px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-fg-dim)',
        border: '1px solid var(--color-rule)',
        padding: '6px 14px',
        clipPath: CHAMFER_SM,
        display: 'inline-block',
        transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.borderColor = 'var(--color-accent-30)';
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
  );
}

// Asset slot — placeholder until real images are dropped in
function AssetSlot({ src, alt, aspectRatio = '16/9', label }) {
  return (
    <div
      style={{
        position: 'relative',
        aspectRatio,
        overflow: 'hidden',
        border: '1px solid var(--color-rule)',
        backgroundColor: 'rgba(255,255,255,0.02)',
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', filter: 'grayscale(12%) contrast(1.04)' }}
        />
      ) : (
        // Placeholder — remove once assets are added
        <div
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8,
          }}
        >
          <div
            style={{
              width: 32, height: 32, border: '1px solid var(--color-rule)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <div style={{ width: 14, height: 1, backgroundColor: 'var(--color-fg-mute)' }} />
          </div>
          {label && (
            <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--color-fg-mute)', letterSpacing: '0.14em', textTransform: 'uppercase', textAlign: 'center', padding: '0 16px' }}>
              {label}
            </span>
          )}
        </div>
      )}
      {/* Accent corner */}
      <div
        aria-hidden="true"
        style={{ position: 'absolute', bottom: 0, right: 0, width: 10, height: 10, borderBottom: '1px solid var(--color-accent)', borderRight: '1px solid var(--color-accent)' }}
      />
    </div>
  );
}

// Thin horizontal rule that sweeps in on scroll
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

export default function SpeakingPage({ onMenuOpen }) {
  const { t, lang } = useLang();
  const s = t.speaking;

  usePageMeta({
    title: lang === 'es' ? 'Speaking — Colombia 5.0 Talk' : 'Speaking — Colombia 5.0 Talk',
    description: lang === 'es'
      ? 'Charla en Colombia 5.0 sobre Game UX/UI, claridad de interfaz y experiencia de jugador. Andres Felipe Pisso.'
      : 'Talk at Colombia 5.0 on Game UX/UI, interface clarity and player experience. Andres Felipe Pisso.',
  });

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main id="main-content">

        {/* ── HERO ─────────────────────────────────────────────────────────── */}
        <section
          className="pt-40 pb-20"
          style={{ borderBottom: '1px solid var(--color-rule)' }}
        >
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
                    fontFamily: '"Bebas Neue", sans-serif',
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
                  <span style={{ color: 'var(--color-fg-dim)', opacity: 0.72 }}>Talk</span>
                </m.h1>

                <m.p
                  className="mt-5"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
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

              {/* Metadata chips — stacked right on desktop, below on mobile */}
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

        {/* ── BODY COPY + CONTEXT ──────────────────────────────────────────── */}
        <section className="py-24" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-16 lg:gap-24">

              {/* Left column — body copy */}
              <m.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                <div
                  className="sys-label mb-5"
                  style={{ color: 'var(--color-accent)' }}
                >
                  {s.contextLabel}
                </div>
                <p
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 'clamp(13px, 1.6vw, 15px)',
                    color: 'rgba(240,238,234,0.78)',
                    lineHeight: 1.85,
                    marginBottom: '1.25rem',
                  }}
                >
                  {s.bodyP1}
                </p>
                <p
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 'clamp(12px, 1.5vw, 14px)',
                    color: 'rgba(240,238,234,0.6)',
                    lineHeight: 1.85,
                  }}
                >
                  {s.bodyP2}
                </p>
              </m.div>

              {/* Right column — "Why this belongs" panel */}
              <m.div
                className="p-7 md:p-10 relative"
                style={{
                  border: '1px solid var(--color-rule)',
                  backgroundColor: 'rgba(8,8,8,0.48)',
                }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.08 }}
              >
                {/* Accent top bar */}
                <div
                  className="absolute top-0 left-0 w-16 h-[2px]"
                  style={{ backgroundColor: 'var(--color-accent)' }}
                  aria-hidden="true"
                />
                <div className="sys-label mb-4">{s.whyBelongsLabel}</div>
                <p
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    fontSize: 'clamp(13px, 1.5vw, 14px)',
                    color: 'rgba(240,238,234,0.72)',
                    lineHeight: 1.85,
                  }}
                >
                  {s.whyBelongs}
                </p>
              </m.div>
            </div>
          </div>
        </section>

        {/* ── KEY TOPICS ───────────────────────────────────────────────────── */}
        <section className="py-24" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <RevealRule />
            <div className="mt-12 mb-10 flex items-center justify-between">
              <m.div
                className="sys-label"
                style={{ color: 'var(--color-accent)' }}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, ease: EASE_OUT }}
              >
                {s.topicsLabel}
              </m.div>
              <m.span
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '9px',
                  color: 'var(--color-fg-mute)',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 }}
              >
                {KEY_TOPICS.length} topics
              </m.span>
            </div>

            <div className="flex flex-wrap gap-3">
              {KEY_TOPICS.map((topic, i) => (
                <m.div
                  key={topic}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, ease: EASE_OUT, delay: 0.04 * i }}
                >
                  <TopicTag label={topic} />
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── EDITORIAL VISUALS ────────────────────────────────────────────── */}
        <section className="py-24" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <m.div
              className="sys-label mb-10"
              style={{ color: 'var(--color-accent)' }}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE_OUT }}
            >
              {s.visualsLabel}
            </m.div>

            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 mb-4">
              {/* Primary — speaker on stage */}
              <m.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.55, ease: EASE_OUT }}
              >
                <AssetSlot
                  src="/speaking/stage.webp"
                  alt="Andres Felipe Pisso speaking at Colombia 5.0"
                  aspectRatio="16/9"
                />
              </m.div>

              {/* Secondary stack */}
              <div className="flex flex-col gap-4">
                <m.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.06 }}
                >
                  <AssetSlot
                    src="/speaking/poster.jpg"
                    alt="Colombia 5.0 — official event poster"
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
                    alt="Colombia 5.0 — event scene"
                    aspectRatio="4/3"
                  />
                </m.div>
              </div>
            </div>

            {/* Slides row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { src: '/speaking/slide-01.webp', alt: 'Talk slide — Game UX/UI clarity' },
                { src: '/speaking/slide-02.webp', alt: 'Talk slide — interface feedback' },
                { src: '/speaking/slide-04.webp', alt: 'Talk slide — player decision making' },
                { src: '/speaking/slide-07.webp', alt: 'Talk slide — systems thinking' },
              ].map(({ src, alt }, i) => (
                <m.div
                  key={src}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.06 * i }}
                >
                  <AssetSlot src={src} alt={alt} aspectRatio="16/9" />
                </m.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── CLOSING STATEMENT ────────────────────────────────────────────── */}
        <section className="py-24">
          <div className="max-w-[1400px] mx-auto px-6">
            <m.div
              className="relative p-8 md:p-14"
              style={{
                border: '1px solid var(--color-rule)',
                backgroundColor: 'rgba(8,8,8,0.42)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, ease: EASE_OUT }}
            >
              {/* Accent top bar */}
              <div
                className="absolute top-0 left-0 w-24 h-[2px]"
                style={{ backgroundColor: 'var(--color-accent)' }}
                aria-hidden="true"
              />
              {/* Watermark number */}
              <div
                aria-hidden="true"
                style={{
                  position: 'absolute', top: '1rem', right: '1.5rem',
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(4rem, 10vw, 9rem)',
                  color: 'var(--color-fg)',
                  opacity: 0.03,
                  lineHeight: 1,
                  userSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                06
              </div>

              <div className="sys-label mb-6">{s.closingLabel}</div>

              <h2
                className="uppercase mb-6"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(2rem, 5vw, 4.5rem)',
                  color: 'var(--color-fg)',
                  lineHeight: 1.0,
                  letterSpacing: '0.01em',
                  maxWidth: '800px',
                }}
              >
                {s.closingHeadline}
              </h2>

              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: 'clamp(13px, 1.6vw, 15px)',
                  color: 'rgba(240,238,234,0.68)',
                  lineHeight: 1.85,
                  maxWidth: '640px',
                  marginBottom: '2rem',
                }}
              >
                {s.closingBody}
              </p>

              <CyberBtn
                href="mailto:andres@byandresfe.com"
                variant="accent-ghost"
                size="md"
              >
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
