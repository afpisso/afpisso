import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { fieldNotes } from '../data/fieldNotes';
import { useLang } from '../contexts/LangContext';
import SectionTag from '../components/SectionTag';
import { usePageMeta } from '../hooks/usePageMeta';
import SignalTrigger from '../components/SignalTrigger';
import CyberBtn from '../components/CyberBtn';
import { m } from 'framer-motion';

const TYPE_GLYPHS = {
  'Deep Dive': '◈',
  'Reference':  '◇',
  'Framework':  '◆',
  'Checklist':  '◉',
  'Analysis':   '◎',
  'Tools':      '⊕',
};

const EASE_OUT = [0.16, 1, 0.3, 1];
const BASE_URL = 'https://byandresfe.com';

// ── NoteCard — grid cell for secondary notes ───────────────────────────────
function NoteCard({ note, index, lang, readNoteLabel }) {
  const [hov, setHov] = useState(false);
  const glyph = TYPE_GLYPHS[note.type] || '◇';
  const title   = lang === 'es' && note.titleEs   ? note.titleEs   : note.title;
  const summary = lang === 'es' && note.summaryEs ? note.summaryEs : note.summary;

  return (
    <m.article
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.38, ease: EASE_OUT, delay: 0.3 + index * 0.05 }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <Link
        to={`/notes/${note.slug}`}
        style={{
          display:         'block',
          padding:         0,
          position:        'relative',
          overflow:        'hidden',
          backgroundColor: hov ? 'rgba(255,37,64,0.05)' : 'var(--color-bg)',
          borderTop:       `2px solid ${hov ? 'var(--color-accent)' : 'transparent'}`,
          transition:      'background-color 180ms ease-out, border-color 200ms ease-out',
          textDecoration:  'none',
          height:          '100%',
          boxSizing:       'border-box',
        }}
        onFocus={() => setHov(true)}
        onBlur={() => setHov(false)}
        aria-label={title}
      >
        {/* Cover image strip */}
        {note.cover && (
          <div
            aria-hidden="true"
            style={{ height: '158px', overflow: 'hidden', position: 'relative' }}
          >
            <img
              src={note.cover}
              alt=""
              style={{
                width: '100%', height: '100%',
                objectFit: 'cover', objectPosition: 'center',
                transition: 'transform 420ms cubic-bezier(0.16,1,0.3,1)',
                transform: hov ? 'scale(1.04)' : 'scale(1)',
              }}
            />
            <div
              aria-hidden="true"
              style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(to bottom, rgba(10,10,10,0.08) 0%, rgba(10,10,10,0.6) 100%)',
              }}
            />
          </div>
        )}

        <div style={{ padding: note.cover ? '1.5rem 2rem 1.75rem' : '2rem 2rem 1.75rem', position: 'relative' }}>
        {/* Watermark ID — large Bebas at 4% opacity */}
        <div
          aria-hidden="true"
          style={{
            position:    'absolute',
            top:         '0.5rem',
            right:       '1rem',
            fontFamily:  '"Bebas Neue", sans-serif',
            fontSize:    'clamp(4rem, 5.5vw, 6rem)',
            lineHeight:  1,
            color:       'var(--color-fg)',
            opacity:     0.045,
            userSelect:  'none',
            pointerEvents: 'none',
            letterSpacing: '0.01em',
          }}
        >
          {note.id}
        </div>

        {/* Type + category label */}
        <div
          style={{
            fontFamily:    '"Play", sans-serif',
            fontSize:      '10px',
            letterSpacing: '0.13em',
            textTransform: 'uppercase',
            color:          hov ? 'var(--color-accent)' : 'var(--color-fg-mute)',
            transition:    'color 180ms ease-out',
            marginBottom:  '1.25rem',
            display:       'flex',
            alignItems:    'center',
            gap:           '0.4rem',
          }}
        >
          <span aria-hidden="true">{glyph}</span>
          {note.type}
          <span style={{ opacity: 0.35 }}>·</span>
          {note.category}
        </div>

        {/* Title */}
        <h2
          style={{
            fontFamily:   '"Bebas Neue", sans-serif',
            fontSize:     'clamp(1.45rem, 2.4vw, 2.1rem)',
            lineHeight:   1.04,
            letterSpacing:'0.02em',
            color:         hov ? 'var(--color-fg)' : 'rgba(240,238,234,0.78)',
            transition:   'color 180ms ease-out',
            marginBottom: '0.8rem',
            maxWidth:     '90%',
          }}
        >
          {title}
        </h2>

        {/* Summary */}
        <p
          style={{
            fontFamily:          '"Play", sans-serif',
            fontSize:            '11px',
            lineHeight:          1.82,
            color:                hov ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)',
            transition:          'color 180ms ease-out',
            display:             '-webkit-box',
            WebkitLineClamp:     3,
            WebkitBoxOrient:     'vertical',
            overflow:            'hidden',
            marginBottom:        '1.5rem',
          }}
        >
          {summary}
        </p>

        {/* Footer meta row */}
        <div
          style={{
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'space-between',
            paddingTop:     '0.9rem',
            borderTop:      '1px solid var(--color-rule)',
          }}
        >
          <div
            style={{
              fontFamily:    '"Play", sans-serif',
              fontSize:      '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:          'var(--color-fg-mute)',
            }}
          >
            {note.readTime}
            <span style={{ margin: '0 0.4rem', opacity: 0.4 }}>·</span>
            {note.date.slice(0, 7)}
          </div>
          <div
            style={{
              fontFamily:    '"Play", sans-serif',
              fontSize:      '9px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color:          hov ? 'var(--color-accent)' : 'var(--color-fg-mute)',
              transform:      hov ? 'translateX(3px)' : 'translateX(0)',
              transition:    'color 180ms ease-out, transform 220ms cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            {readNoteLabel} ›
          </div>
        </div>
        </div>
      </Link>
    </m.article>
  );
}

// ── NotesPage ──────────────────────────────────────────────────────────────
export default function NotesPage({ onMenuOpen }) {
  const { t, lang } = useLang();

  usePageMeta({
    title: 'Field Notes',
    description: lang === 'es'
      ? 'Frameworks, análisis y notas de Andrés Felipe Pisso sobre UX/UI para juegos, sistemas de interfaz, HUD, accesibilidad, UEFN, VR y diseño de producto digital.'
      : 'Field notes, frameworks and breakdowns by Andrés Felipe Pisso on UX clarity, UI systems, HUD design, feedback, accessibility, UEFN, VR UX and digital product thinking.',
  });

  useEffect(() => {
    const schemaId = 'ld-json-notes';
    let el = document.getElementById(schemaId);
    const schema = [
      {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        'itemListElement': [
          { '@type': 'ListItem', 'position': 1, 'name': 'Home',        'item': BASE_URL + '/' },
          { '@type': 'ListItem', 'position': 2, 'name': 'Field Notes', 'item': BASE_URL + '/notes' },
        ],
      },
      {
        '@context':    'https://schema.org',
        '@type':       'Blog',
        '@id':         BASE_URL + '/notes#blog',
        'name':        'Field Notes',
        'description': 'Field notes, frameworks and breakdowns by Andrés Felipe Pisso on UX clarity, UI systems, HUD design, feedback, accessibility, UEFN, VR UX and digital product thinking.',
        'url':         BASE_URL + '/notes',
        'author':      { '@id': BASE_URL + '/#person' },
        'isPartOf':    { '@id': BASE_URL + '/#website' },
        'blogPost':    fieldNotes.map(n => ({
          '@type':         'BlogPosting',
          'url':           `${BASE_URL}/notes/${n.slug}`,
          'headline':      n.title,
          'description':   n.summary,
          'keywords':      n.category,
          'datePublished': n.date,
          'author':        { '@id': BASE_URL + '/#person' },
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

  const featured   = fieldNotes[0];
  const rest       = fieldNotes.slice(1);
  const ftTitle   = lang === 'es' && featured.titleEs   ? featured.titleEs   : featured.title;
  const ftSummary = lang === 'es' && featured.summaryEs ? featured.summaryEs : featured.summary;
  const ftGlyph   = TYPE_GLYPHS[featured.type] || '◇';

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main id="main-content">

        {/* ── Page hero ──────────────────────────────────────────────────── */}
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
              <SectionTag label={t.fieldNotes.label} page="003" />
            </m.div>
            <m.h1
              className="uppercase"
              style={{
                fontFamily:   '"Bebas Neue", sans-serif',
                fontSize:     'clamp(4rem, 8vw, 7rem)',
                color:        'var(--color-fg)',
                lineHeight:   0.9,
                letterSpacing:'0.02em',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.05 }}
            >
              {t.fieldNotes.headline.split(' ').slice(0, -1).join(' ')}<br />
              <span style={{ WebkitTextStroke: '1.5px rgba(245,245,243,0.5)', color: 'transparent' }}>
                {t.fieldNotes.headline.split(' ').slice(-1)}
              </span>
            </m.h1>
            <m.p
              className="mt-6"
              style={{
                fontFamily: '"Play", sans-serif',
                fontSize:   '12px',
                color:      'var(--color-fg-dim)',
                lineHeight: 1.85,
                maxWidth:   '480px',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {t.fieldNotes.description}
            </m.p>
          </div>
        </section>

        {/* ── Featured note ─────────────────────────────────────────────── */}
        <section className="py-16" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <m.article
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE_OUT, delay: 0.2 }}
              style={{ position: 'relative', overflow: 'hidden' }}
            >
              {/* Cover image — bleeds from the right */}
              {featured.cover && (
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    top: 0, right: 0, bottom: 0,
                    width: '46%',
                    pointerEvents: 'none',
                  }}
                >
                  <img
                    src={featured.cover}
                    alt=""
                    style={{
                      width: '100%', height: '100%',
                      objectFit: 'cover', objectPosition: 'center',
                      opacity: 0.2,
                      maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.65) 38%, black 100%)',
                      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.65) 38%, black 100%)',
                    }}
                  />
                </div>
              )}
              {/* Accent top rule + header labels */}
              <div style={{ borderTop: '2px solid var(--color-accent)', paddingTop: '1.75rem', position: 'relative', zIndex: 1 }}>
                <div
                  style={{
                    display:       'flex',
                    alignItems:    'center',
                    gap:           '1.25rem',
                    marginBottom:  '2rem',
                    flexWrap:      'wrap',
                  }}
                >
                  <span
                    style={{
                      fontFamily:    '"Play", sans-serif',
                      fontSize:      '10px',
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      color:          'var(--color-accent)',
                    }}
                  >
                    // featured
                  </span>
                  <span
                    style={{
                      fontFamily:    '"Play", sans-serif',
                      fontSize:      '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:          'var(--color-fg-mute)',
                    }}
                  >
                    {featured.id}
                  </span>
                  <span
                    style={{
                      display:       'flex',
                      alignItems:    'center',
                      gap:           '0.35rem',
                      fontFamily:    '"Play", sans-serif',
                      fontSize:      '10px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color:          'var(--color-fg-mute)',
                    }}
                  >
                    <span aria-hidden="true">{ftGlyph}</span>
                    {featured.type}
                  </span>
                </div>

                {/* Big title */}
                <h2
                  style={{
                    fontFamily:   '"Bebas Neue", sans-serif',
                    fontSize:     'clamp(2.8rem, 8vw, 6.5rem)',
                    lineHeight:   0.92,
                    letterSpacing:'0.015em',
                    color:        'var(--color-fg)',
                    marginBottom: '2.5rem',
                  }}
                >
                  {ftTitle}
                </h2>

                {/* 2-col: summary left / meta+CTA right */}
                <div
                  className="flex flex-col md:flex-row md:items-end justify-between gap-8"
                >
                  <p
                    style={{
                      fontFamily: '"Play", sans-serif',
                      fontSize:   '12px',
                      lineHeight: 1.9,
                      color:      'var(--color-fg-dim)',
                      maxWidth:   '540px',
                    }}
                  >
                    {ftSummary}
                  </p>
                  <div
                    className="flex-shrink-0 flex flex-col items-start md:items-end gap-4"
                  >
                    <div
                      style={{
                        fontFamily:    '"Play", sans-serif',
                        fontSize:      '10px',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        color:          'var(--color-fg-mute)',
                      }}
                    >
                      {featured.category}
                      <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
                      {featured.readTime}
                      <span style={{ margin: '0 0.5rem', opacity: 0.4 }}>·</span>
                      {featured.date.slice(0, 7)}
                    </div>
                    <CyberBtn to={`/notes/${featured.slug}`} size="sm">
                      {t.fieldNotes.readNote} →
                    </CyberBtn>
                  </div>
                </div>
              </div>
            </m.article>
          </div>
        </section>

        {/* ── Notes grid ────────────────────────────────────────────────── */}
        <section className="py-0">
          <div className="max-w-[1400px] mx-auto px-6">
            {/*
              gap-px + bg-[color-rule] creates editorial table rules between cells.
              Each cell resets its own bg so only the 1px gap shows the rule color.
            */}
            <div
              style={{
                display:             'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                gap:                 '1px',
                backgroundColor:    'var(--color-rule)',
                borderBottom:       '1px solid var(--color-rule)',
              }}
            >
              {rest.map((note, i) => (
                <NoteCard
                  key={note.id}
                  note={note}
                  index={i}
                  lang={lang}
                  readNoteLabel={t.fieldNotes.readNote}
                />
              ))}
            </div>

            {/* Signal trigger */}
            <div style={{ paddingTop: 4 }}>
              <SignalTrigger id="sig-notes" prominence="medium" style={{ padding: '6px 0' }} />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
