import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { fieldNotes } from '../data/fieldNotes';
import { noteArticles } from '../data/noteArticles';
import { useLang } from '../contexts/LangContext';
import { usePageMeta } from '../hooks/usePageMeta';

// ─── Block renderers ──────────────────────────────────────────────────────

function Paragraph({ text }) {
  return (
    <p style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '14px',
      lineHeight: 1.9,
      color: 'rgba(245,245,243,0.72)',
      marginBottom: '1.5rem',
    }}>
      {text}
    </p>
  );
}

function Heading({ text }) {
  return (
    <h2 style={{
      fontFamily: '"Bebas Neue", sans-serif',
      fontSize: 'clamp(22px, 3vw, 32px)',
      letterSpacing: '0.03em',
      color: 'var(--color-fg)',
      textTransform: 'uppercase',
      marginTop: '2.5rem',
      marginBottom: '1rem',
      lineHeight: 1,
    }}>
      {text}
    </h2>
  );
}

function Subheading({ text }) {
  return (
    <h3 style={{
      fontFamily: '"JetBrains Mono", monospace',
      fontSize: '11px',
      letterSpacing: '0.18em',
      color: 'var(--color-accent)',
      textTransform: 'uppercase',
      marginTop: '2rem',
      marginBottom: '0.75rem',
    }}>
      {text}
    </h3>
  );
}

function List({ items }) {
  return (
    <ul style={{ marginBottom: '1.5rem', paddingLeft: 0, listStyle: 'none' }}>
      {items.map((item, i) => (
        <li key={i} style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '13px',
          lineHeight: 1.85,
          color: 'rgba(245,245,243,0.65)',
          paddingLeft: '1.5rem',
          marginBottom: '0.6rem',
          position: 'relative',
        }}>
          <span style={{
            position: 'absolute', left: 0,
            color: 'var(--color-accent)',
            fontSize: '10px', top: '4px',
          }}>◆</span>
          {item}
        </li>
      ))}
    </ul>
  );
}

function Callout({ text }) {
  return (
    <div style={{
      margin: '2rem 0',
      padding: '20px 24px',
      borderLeft: '2px solid var(--color-accent)',
      backgroundColor: 'rgba(255,37,64,0.05)',
    }}>
      <p style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: '13px',
        lineHeight: 1.85,
        color: 'rgba(245,245,243,0.85)',
        margin: 0,
        fontStyle: 'italic',
      }}>
        {text}
      </p>
    </div>
  );
}

function renderBlock(block, i) {
  switch (block.type) {
    case 'paragraph':  return <Paragraph  key={i} text={block.text} />;
    case 'heading':    return <Heading    key={i} text={block.text} />;
    case 'subheading': return <Subheading key={i} text={block.text} />;
    case 'list':       return <List       key={i} items={block.items} />;
    case 'callout':    return <Callout    key={i} text={block.text} />;
    default:           return null;
  }
}

// ─── Type badge colors ────────────────────────────────────────────────────

const typeColors = {
  'Deep Dive':  { color: '#60a5fa', bg: 'rgba(59,130,246,0.08)' },
  'Reference':  { color: '#a3a3a3', bg: 'rgba(100,100,100,0.08)' },
  'Framework':  { color: '#c084fc', bg: 'rgba(192,132,252,0.08)' },
  'Checklist':  { color: '#4ade80', bg: 'rgba(34,197,94,0.08)' },
  'Analysis':   { color: '#fb923c', bg: 'rgba(251,146,60,0.08)' },
  'Tools':      { color: '#facc15', bg: 'rgba(234,179,8,0.08)' },
};

// ─── Page ─────────────────────────────────────────────────────────────────

export default function NotePage({ onMenuOpen }) {
  const { slug }    = useParams();
  const { t, lang } = useLang();

  const meta    = fieldNotes.find((n) => n.slug === slug);
  const article = noteArticles?.[slug];
  const blocks  = article?.[lang] ?? article?.en ?? [];

  const title = meta
    ? (lang === 'es' && meta.titleEs ? meta.titleEs : meta.title)
    : 'Field Note';

  usePageMeta({
    title,
    description: meta
      ? (lang === 'es' && meta.summaryEs ? meta.summaryEs : meta.summary)
      : '',
  });

  // Next note in the list (circular)
  const idx      = fieldNotes.findIndex((n) => n.slug === slug);
  const nextNote = fieldNotes[(idx + 1) % fieldNotes.length];

  // ── Not found or no content yet ──
  if (!meta || blocks.length === 0) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', zIndex: 1 }}>
        <Nav onMenuOpen={onMenuOpen} />
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '4rem', color: 'rgba(255,37,64,0.15)', lineHeight: 1 }}>
              {meta ? 'COMING SOON' : '404'}
            </div>
            <p style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-dim)', margin: '16px 0 24px' }}>
              {meta
                ? (lang === 'es' ? 'Esta nota estará disponible pronto.' : 'This note will be available soon.')
                : 'Note not found.'}
            </p>
            <Link to="/notes" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--color-accent)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
              ← {lang === 'es' ? 'Volver a Field Notes' : 'Back to Field Notes'}
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const typeStyle = typeColors[meta.type] || typeColors['Reference'];

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main>

        {/* ── Hero ─────────────────────────────────────────── */}
        <section className="pt-40 pb-16" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[860px] mx-auto px-6">

            {/* Breadcrumb */}
            <motion.div
              className="flex items-center gap-3 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <Link
                to="/notes"
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.16em', textTransform: 'uppercase', color: 'var(--color-fg-mute)', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-accent)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg-mute)')}
              >
                ← Field Notes
              </Link>
              <span style={{ color: 'var(--color-rule)', fontSize: '10px' }}>/</span>
              <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.7 }}>
                {meta.id}
              </span>
            </motion.div>

            {/* Type + meta row */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.05 }}
            >
              <span style={{
                fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', fontWeight: 700,
                letterSpacing: '0.18em', textTransform: 'uppercase', padding: '4px 10px',
                color: typeStyle.color, backgroundColor: typeStyle.bg, border: `1px solid ${typeStyle.color}30`,
              }}>
                {meta.type}
              </span>
              <span className="sys-label">{meta.readTime}</span>
              <span className="sys-label">·</span>
              <span className="sys-label">{meta.category}</span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="uppercase"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(2.5rem, 7vw, 5rem)',
                lineHeight: 0.9, letterSpacing: '0.02em',
                color: 'var(--color-fg)', marginBottom: '1.5rem',
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            >
              {title}
            </motion.h1>

            {/* Lead summary */}
            <motion.p
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '14px', lineHeight: 1.85, color: 'var(--color-fg-dim)', maxWidth: '620px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {lang === 'es' && meta.summaryEs ? meta.summaryEs : meta.summary}
            </motion.p>
          </div>
        </section>

        {/* ── Article body ─────────────────────────────────── */}
        <section className="py-16">
          <div className="max-w-[1100px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_240px] gap-16 items-start">

              {/* Main content */}
              <motion.article
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              >
                {blocks.map((block, i) => renderBlock(block, i))}
              </motion.article>

              {/* Sidebar */}
              <motion.aside
                className="hidden lg:block"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: 0.35 }}
              >
                <div style={{ position: 'sticky', top: '96px', display: 'flex', flexDirection: 'column', gap: '20px' }}>

                  {/* Meta panel */}
                  <div style={{ border: '1px solid var(--color-rule)', padding: '18px', position: 'relative' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '1px', backgroundColor: 'var(--color-accent)' }} />
                    <div className="sys-label mb-4" style={{ color: 'var(--color-accent)' }}>
                      {lang === 'es' ? 'Sobre esta nota' : 'About this note'}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                      {[
                        { label: 'ID',                                             value: meta.id },
                        { label: lang === 'es' ? 'Tipo' : 'Type',                 value: meta.type },
                        { label: lang === 'es' ? 'Lectura' : 'Read time',         value: meta.readTime },
                        { label: lang === 'es' ? 'Categoría' : 'Category',        value: meta.category },
                      ].map(({ label, value }) => (
                        <div key={label} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-fg-mute)' }}>{label}</span>
                          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', color: 'var(--color-fg-dim)', textAlign: 'right' }}>{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Next note */}
                  {nextNote && nextNote.slug !== slug && (
                    <div>
                      <div className="sys-label mb-3">{lang === 'es' ? 'Siguiente nota' : 'Next note'}</div>
                      <Link to={`/notes/${nextNote.slug}`} style={{ textDecoration: 'none', display: 'block' }}>
                        <div
                          style={{ border: '1px solid var(--color-rule)', padding: '14px', transition: 'border-color 0.2s, background-color 0.2s' }}
                          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,37,64,0.3)'; e.currentTarget.style.backgroundColor = 'rgba(255,37,64,0.03)'; }}
                          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-rule)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                        >
                          <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)', opacity: 0.7 }}>
                            {nextNote.id}
                          </span>
                          <p style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '17px', letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--color-fg)', margin: '5px 0 0', lineHeight: 1.1 }}>
                            {lang === 'es' && nextNote.titleEs ? nextNote.titleEs : nextNote.title}
                          </p>
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </motion.aside>
            </div>
          </div>
        </section>

        {/* ── Footer nav ───────────────────────────────────── */}
        <section style={{ borderTop: '1px solid var(--color-rule)' }} className="py-12">
          <div className="max-w-[1100px] mx-auto px-6 flex items-center justify-between flex-wrap gap-4">
            <Link
              to="/notes"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-fg-mute)', textDecoration: 'none', transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-fg)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-fg-mute)')}
            >
              ← {lang === 'es' ? 'Todas las notas' : 'All field notes'}
            </Link>
            {nextNote && nextNote.slug !== slug && (
              <Link
                to={`/notes/${nextNote.slug}`}
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--color-accent)', textDecoration: 'none' }}
              >
                {lang === 'es' ? 'Siguiente' : 'Next note'} →
              </Link>
            )}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
