import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { cases } from '../data/cases';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from '../components/GlitchStrokeText';
import { usePageMeta } from '../hooks/usePageMeta';
import { analytics } from '../utils/analytics';

const filters = ['All', 'Games', 'UEFN', 'VR', 'NDA-Safe', 'Legacy'];

function ImagePlaceholder({ slug, platform }) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{ aspectRatio: '16/9', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-rule)' }}
      aria-hidden="true"
    >
      <img
        src={`/thumbnails/${slug}.jpg`}
        alt=""
        className="w-full h-full object-cover"
        onError={e => { e.currentTarget.style.display = 'none'; }}
      />
      <div
        className="w-full h-full flex items-center justify-center"
        style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--color-fg-mute)', letterSpacing: '0.12em' }}
      >
        {platform?.join(' · ')}
      </div>
    </div>
  );
}

const visibilityStyle = {
  'public': { color: 'var(--color-accent)', border: '1px solid rgba(255,37,64,0.3)' },
  'nda-safe': { color: 'var(--color-accent)', border: '1px solid rgba(255,37,64,0.3)' },
  'password-protected': { color: '#facc15', border: '1px solid rgba(234,179,8,0.3)' },
  'coming-soon': { color: '#facc15', border: '1px solid rgba(234,179,8,0.3)' },
  'legacy': { color: 'var(--color-fg-mute)', border: '1px solid var(--color-rule)' },
};

function matchFilter(filter, c) {
  if (filter === 'All') return true;
  if (filter === 'Games') return c.category === 'games';
  if (filter === 'UEFN') return c.platform?.includes('UEFN') || c.platform?.includes('Fortnite');
  if (filter === 'VR') return c.platform?.includes('VR');
  if (filter === 'NDA-Safe') return c.visibility === 'nda-safe';
  if (filter === 'Legacy') return c.visibility === 'legacy' || c.category === 'legacy';
  return true;
}

export default function WorkPage({ onMenuOpen }) {
  const [active, setActive] = useState('All');
  const { t, lang } = useLang();

  usePageMeta({
    title: lang === 'es' ? 'Trabajo seleccionado' : 'Selected Work',
    description: lang === 'es'
      ? 'Casos de estudio de Game UX/UI, diseño de producto y UEFN por Andres Felipe Pisso.'
      : 'Game UX/UI, product design, and UEFN case studies by Andres Felipe Pisso.',
  });

  const visible = cases.filter(c => matchFilter(active, c));

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main>
        <section className="pt-40 pb-20" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <motion.div
              className="flex items-center gap-4 mb-8"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="h-[1px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="sys-label">{t.caseFiles.label}</span>
            </motion.div>
            <motion.h1
              className="uppercase mb-6"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: 'var(--color-fg)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              {t.caseFiles.label.split(' ').slice(0, -1).join(' ')}<br />
              <GlitchStrokeText stroke="1.5px rgba(245,245,243,0.5)">{t.caseFiles.label.split(' ').slice(-1)}</GlitchStrokeText>
            </motion.h1>
            <motion.p
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '13px',
                color: 'var(--color-fg-dim)',
                lineHeight: 1.85,
                maxWidth: '520px',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              {t.caseFiles.description}
            </motion.p>
          </div>
        </section>

        <section className="py-12">
          <div className="max-w-[1400px] mx-auto px-6">
            {/* Filters */}
            <motion.div
              className="flex flex-wrap gap-2 mb-12"
              role="group"
              aria-label="Filter projects"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {filters.map((f) => (
                <button
                  key={f}
                  onClick={() => { setActive(f); analytics.filterUse(f); }}
                  aria-pressed={active === f}
                  className="text-[10px] font-bold tracking-widest uppercase px-4 py-2 transition-all duration-200"
                  style={{
                    fontFamily: '"JetBrains Mono", monospace',
                    border: active === f ? '1px solid var(--color-accent)' : '1px solid var(--color-rule)',
                    color: active === f ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                    backgroundColor: active === f ? 'rgba(255,37,64,0.05)' : 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {f}
                </button>
              ))}
              <span className="sys-label self-center ml-2">{visible.length} {visible.length !== 1 ? t.caseFiles.projects : t.caseFiles.project}</span>
            </motion.div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-rule)' }}>
              {visible.map((c, i) => {
                const vstyle = visibilityStyle[c.visibility] || visibilityStyle['legacy'];
                const statusLabel = t.caseStatuses[c.visibility] || c.status;
                return (
                  <motion.div
                    key={c.id}
                    style={{ backgroundColor: 'transparent' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                    layout
                  >
                    <Link
                      to={`/case/${c.slug}`}
                      className="group block h-full p-6 transition-colors duration-200 relative"
                      style={{ textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'rgba(255,37,64,0.03)'; }}
                      onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; }}
                    >
                      <ImagePlaceholder slug={c.slug} platform={c.platform} />
                      <div className="mt-5">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="sys-label mb-1" style={{ color: 'var(--color-accent)' }}>{c.id}</div>
                            <h2
                              className="uppercase"
                              style={{
                                fontFamily: '"Bebas Neue", sans-serif',
                                fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                                color: 'var(--color-fg)',
                                letterSpacing: '0.02em',
                                lineHeight: 1,
                              }}
                            >
                              {c.title}
                            </h2>
                          </div>
                          <span
                            className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 flex-shrink-0 ml-3 mt-1"
                            style={{ fontFamily: '"JetBrains Mono", monospace', ...vstyle }}
                          >
                            {statusLabel}
                          </span>
                        </div>
                        <p
                          className="text-[12px] leading-relaxed mb-4"
                          style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)' }}
                        >
                          {c.description}
                        </p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="sys-label">{c.role}</span>
                          <span className="sys-label">·</span>
                          <span className="sys-label">{c.year}</span>
                          <span className="sys-label">·</span>
                          <span className="sys-label">{c.platform?.join(' / ')}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {visible.length === 0 && (
              <div className="py-24 text-center">
                <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-mute)' }}>
                  {t.caseFiles.noProjects}
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
