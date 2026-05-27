import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { fieldNotes } from '../data/fieldNotes';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from '../components/GlitchStrokeText';
import SectionTag from '../components/SectionTag';
import { usePageMeta } from '../hooks/usePageMeta';
import SignalTrigger from '../components/SignalTrigger';
import { m } from 'framer-motion';

const TYPE_GLYPHS = {
  'Deep Dive': '◈',
  'Reference':  '◇',
  'Framework':  '◆',
  'Checklist':  '◉',
  'Analysis':   '◎',
  'Tools':      '⊕',
};

const BASE_URL = 'https://byandresfe.com';

export default function NotesPage({ onMenuOpen }) {
  const [hovered, setHovered] = useState(null);
  const { t, lang } = useLang();

  usePageMeta({
    title: lang === 'es' ? 'Field Notes' : 'Field Notes',
    description: lang === 'es'
      ? 'Frameworks, análisis y notas de Andres Felipe Pisso sobre UX/UI para juegos, sistemas de interfaz, HUD, accesibilidad, UEFN, VR y diseño de producto digital.'
      : 'Field notes, frameworks and breakdowns by Andres Felipe Pisso on UX clarity, UI systems, HUD design, feedback, accessibility, UEFN, VR UX and digital product thinking.',
  });

  // Inject Blog + BreadcrumbList schema for this route
  useEffect(() => {
    const schemaId = 'ld-json-notes';
    let el = document.getElementById(schemaId);
    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home', 'item': BASE_URL + '/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Field Notes', 'item': BASE_URL + '/notes' },
        ],
      },
      {
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': BASE_URL + '/notes#blog',
        'name': 'Field Notes',
        'description': 'Field notes, frameworks and breakdowns by Andres Felipe Pisso on UX clarity, UI systems, HUD design, feedback, accessibility, UEFN, VR UX and digital product thinking.',
        'url': BASE_URL + '/notes',
        'author': { '@id': BASE_URL + '/#person' },
        'isPartOf': { '@id': BASE_URL + '/#website' },
        'blogPost': fieldNotes.map(n => ({
          '@type': 'BlogPosting',
          'url': `${BASE_URL}/notes/${n.slug}`,
          'headline': n.title,
          'description': n.summary,
          'keywords': n.category,
          'datePublished': n.date,
          'author': { '@id': BASE_URL + '/#person' },
        })),
      },
    ];
    if (!el) {
      el = document.createElement('script');
      el.type = 'application/ld+json';
      el.id = schemaId;
      document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(schema);
    return () => { const s = document.getElementById(schemaId); if (s) s.remove(); };
  }, []);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main>
        <section className="pt-40 pb-20" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <m.div
              className="mb-8"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionTag label={t.fieldNotes.label} page="004" />
            </m.div>
            <m.h1
              className="uppercase"
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(4rem, 8vw, 7rem)', color: 'var(--color-fg)', lineHeight: 0.9, letterSpacing: '0.02em' }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              {t.fieldNotes.headline.split(' ').slice(0, -1).join(' ')}<br />
              <GlitchStrokeText stroke="1.5px rgba(245,245,243,0.5)">{t.fieldNotes.headline.split(' ').slice(-1)}</GlitchStrokeText>
            </m.h1>
            <m.p
              className="mt-6"
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg-dim)', lineHeight: 1.85, maxWidth: '520px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {t.fieldNotes.description}
            </m.p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-[1400px] mx-auto px-6">
            {/* Editorial list — each note is a horizontal row */}
            <div>
              {fieldNotes.map((note, i) => {
                const isHov = hovered === note.id;
                const glyph = TYPE_GLYPHS[note.type] || '◇';

                return (
                  <m.article
                    key={note.id}
                    aria-label={note.title}
                    className="relative"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
                    onMouseEnter={() => setHovered(note.id)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    {/* Top rule */}
                    <div
                      className="absolute top-0 left-0 right-0 h-[1px] transition-colors duration-300"
                      style={{ backgroundColor: isHov ? 'rgba(255,37,64,0.4)' : 'var(--color-rule)' }}
                    />

                    {/* Left accent pulse */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-[2px]"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        opacity: isHov ? 1 : 0,
                        transform: isHov ? 'scaleY(1)' : 'scaleY(0)',
                        transformOrigin: 'top',
                        transition: 'opacity 0.25s, transform 0.32s cubic-bezier(0.16,1,0.3,1)',
                      }}
                    />

                    <Link
                      to={`/notes/${note.slug}`}
                      className="flex items-center gap-0 py-6 pl-5 pr-0 transition-colors duration-200"
                      style={{
                        textDecoration: 'none',
                        backgroundColor: isHov ? 'rgba(255,37,64,0.025)' : 'transparent',
                      }}
                      aria-label={`Read note: ${note.title}`}
                      onFocus={() => setHovered(note.id)}
                      onBlur={() => setHovered(null)}
                    >
                      {/* ID + glyph column */}
                      <div
                        className="flex-shrink-0 w-28 hidden sm:block"
                        style={{ fontFamily: '"JetBrains Mono", monospace' }}
                      >
                        <div
                          className="text-[10px] tracking-widest transition-colors duration-200"
                          style={{ color: isHov ? 'var(--color-accent)' : 'var(--color-fg-mute)' }}
                        >
                          {note.id}
                        </div>
                        <div
                          className="text-[14px] mt-0.5 transition-colors duration-200"
                          style={{ color: isHov ? 'var(--color-accent)' : 'var(--color-rule)' }}
                          aria-hidden="true"
                        >
                          {glyph}
                        </div>
                      </div>

                      {/* Title + type + summary */}
                      <div className="flex-grow min-w-0 pr-6">
                        <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                          <h2
                            className="uppercase transition-colors duration-200"
                            style={{
                              fontFamily: '"Bebas Neue", sans-serif',
                              fontSize: 'clamp(20px, 2.5vw, 30px)',
                              lineHeight: 1.05,
                              letterSpacing: '0.02em',
                              color: isHov ? 'var(--color-fg)' : 'rgba(240,238,234,0.82)',
                            }}
                          >
                            {lang === 'es' && note.titleEs ? note.titleEs : note.title}
                          </h2>
                          <span
                            className="flex-shrink-0 text-[10px] font-bold tracking-widest uppercase px-2 py-0.5 transition-colors duration-200"
                            style={{
                              fontFamily: '"JetBrains Mono", monospace',
                              border: `1px solid ${isHov ? 'rgba(255,37,64,0.35)' : 'var(--color-rule)'}`,
                              color: isHov ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                            }}
                          >
                            {note.type}
                          </span>
                        </div>
                        <p
                          className="text-[12px] leading-relaxed line-clamp-2 transition-colors duration-200"
                          style={{
                            fontFamily: '"JetBrains Mono", monospace',
                            color: isHov ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)',
                            maxWidth: '680px',
                          }}
                        >
                          {lang === 'es' && note.summaryEs ? note.summaryEs : note.summary}
                        </p>
                      </div>

                      {/* Meta + CTA right */}
                      <div
                        className="flex-shrink-0 flex flex-col items-end gap-2 pl-4 border-l ml-4 transition-colors duration-200"
                        style={{ borderColor: isHov ? 'rgba(255,37,64,0.2)' : 'var(--color-rule)', minWidth: '120px' }}
                      >
                        <div className="text-right">
                          <div className="sys-label">{note.readTime}</div>
                          <div className="sys-label mt-0.5" style={{ color: 'var(--color-fg-mute)' }}>{note.category}</div>
                        </div>
                        <div
                          className="flex items-center gap-1.5 text-[10px] tracking-widest uppercase transition-all duration-200"
                          style={{
                            fontFamily: '"JetBrains Mono", monospace',
                            color: isHov ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                            transform: isHov ? 'translateX(2px)' : 'translateX(0)',
                          }}
                          aria-hidden="true"
                        >
                          <span>{t.fieldNotes.readNote}</span>
                          <span>›</span>
                        </div>
                      </div>
                    </Link>

                    {/* Bottom rule for last item */}
                    {i === fieldNotes.length - 1 && (
                      <div className="h-[1px]" style={{ backgroundColor: 'var(--color-rule)' }} />
                    )}
                  </m.article>
                );
              })}

              {/* SIG-NOTES — also discoverable from the full /notes index */}
              <div style={{ paddingTop: 4 }}>
                <SignalTrigger id="sig-notes" prominence="medium" style={{ padding: '6px 0' }} />
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
