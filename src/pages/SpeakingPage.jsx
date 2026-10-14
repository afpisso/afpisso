import { m } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SectionTag from '../components/SectionTag';
import CyberBtn from '../components/CyberBtn';
import { useLang } from '../contexts/LangContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { pageMeta } from '../data/pageMeta.js';
import TalkCard from '../components/TalkCard';
import { talks } from '../data/talks';

const EASE_OUT = [0.16, 1, 0.3, 1];

const ACCENT = '#ff2540';
const MONO   = '"Play", sans-serif';
const BEBAS  = '"Bebas Neue", sans-serif';

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

// ── Page ────────────────────────────────────────────────────────────
export default function SpeakingPage({ onMenuOpen }) {
  const { t, lang } = useLang();
  const s = t.speaking;

  usePageMeta({
    fullTitle: pageMeta['/speaking'][lang].title,
    description: pageMeta['/speaking'][lang].description,
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
                  Game UX/UI<br />
                  <span style={{ color: 'var(--color-fg-dim)', opacity: 0.72 }}>{lang === 'es' ? 'Charlas y talleres' : 'Talks & workshops'}</span>
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
                  {lang === 'es'
                    ? 'Charlas y talleres sobre claridad de interfaz, sistemas de UI y lo que Game UX le aporta a Product UX.'
                    : 'Talks and workshops on interface clarity, UI systems and what Game UX brings to Product UX.'}
                </m.p>
              </div>

              {/* Metadata chips */}
              <m.div
                className="flex flex-row lg:flex-col flex-wrap gap-2 lg:items-end"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.28 }}
              >
                {['Cali Game Jam', 'IxDF Colombia', 'Colombia 5.0'].map(c => (
                  <MetaChip key={c} label={c} />
                ))}
              </m.div>
            </div>
          </div>
        </section>

        {/* ── TALKS ──────────────────────────────────────────────────────────── */}
        <section className="py-20 md:py-24" aria-label={lang === 'es' ? 'Charlas y talleres' : 'Talks & workshops'} style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
              {talks.map((talk, i) => (
                <TalkCard key={talk.id} talk={talk} lang={lang} featured={i === 0} index={i} />
              ))}
            </div>
          </div>
        </section>




        <section id="ixdf" className="py-20" aria-labelledby="ixdf-talk" style={{ borderBottom: '1px solid var(--color-rule)', scrollMarginTop: '6rem' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <SectionTag label="IxDF Colombia · 09.09.2026 · Online" page="006" />
            <h2 id="ixdf-talk" className="uppercase mt-8 mb-5" style={{ fontFamily: BEBAS, fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 1.05 }}>
              La fricción correcta
            </h2>
            <p className="max-w-[680px] mb-6" style={{ fontFamily: MONO, color: 'var(--color-fg-dim)', lineHeight: 1.8 }}>
              {lang === 'es'
                ? 'Una charla sobre lo que Game UX puede aportar a Product UX: cómo distinguir un reto que permite aprender de una interfaz que dificulta entender qué hacer. Dificultad, feedback y motivación vistos desde decisiones de diseño.'
                : 'A talk on what Game UX can bring to Product UX: distinguishing a challenge that supports learning from an interface that makes the next action hard to understand. Difficulty, feedback and motivation through design decisions.'}
            </p>
            <div className="flex flex-wrap items-center gap-6 mb-2">
              <CyberBtn href="/speaking/ixdf/la-friccion-correcta.pdf" target="_blank" rel="noopener" variant="accent-ghost" size="md">
                {lang === 'es' ? 'Descargar slides (PDF)' : 'Download slides (PDF)'}
              </CyberBtn>
            <a href="https://ixdf.org/meetups/la-friccion-correcta-lo-que-game-ux-le-ensena-a-product-ux-sobre-dificultad-feedback-y-motivacion-sep-9th-2026" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4" style={{ fontFamily: MONO }}>
              {lang === 'es' ? 'Ver la ficha de la charla en IxDF' : 'View the talk details at IxDF'}
            </a>
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
