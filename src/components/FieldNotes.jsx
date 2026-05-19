import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fieldNotes } from '../data/fieldNotes';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from './GlitchStrokeText';

const typeColors = {
  'Deep Dive': { color: '#60a5fa', bg: 'rgba(59,130,246,0.08)' },
  'Reference': { color: '#a3a3a3', bg: 'rgba(100,100,100,0.08)' },
  'Framework': { color: '#c084fc', bg: 'rgba(192,132,252,0.08)' },
  'Checklist': { color: '#4ade80', bg: 'rgba(34,197,94,0.08)' },
  'Analysis': { color: '#fb923c', bg: 'rgba(251,146,60,0.08)' },
  'Tools': { color: '#facc15', bg: 'rgba(234,179,8,0.08)' },
};

export default function FieldNotes() {
  const [hovered, setHovered] = useState(null);
  const { t, lang } = useLang();

  return (
    <section id="notes" className="py-28" style={{ borderTop: '1px solid var(--color-rule)', backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-16 flex-wrap gap-6">
          <div>
            <motion.div
              className="flex items-center gap-4 mb-4"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <div className="h-[1px] w-8" style={{ backgroundColor: 'var(--color-accent)' }} />
              <span className="sys-label">{t.fieldNotes.label}</span>
            </motion.div>
            <motion.h2
              className="uppercase"
              style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: 'clamp(3.5rem, 6vw, 5.5rem)', color: 'var(--color-fg)', lineHeight: 0.9, letterSpacing: '0.02em' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {t.fieldNotes.headline.split(' ').slice(0, -1).join(' ')}<br />
              <GlitchStrokeText stroke="1.5px rgba(240,238,234,0.5)">{t.fieldNotes.headline.split(' ').slice(-1)}</GlitchStrokeText>
            </motion.h2>
          </div>
          <motion.p
            className="text-base max-w-xs"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', lineHeight: 1.7 }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t.fieldNotes.description}
          </motion.p>
        </div>

        {/* Notes grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-px" style={{ backgroundColor: 'var(--color-rule)' }}>
          {fieldNotes.map((note, i) => {
            const typeStyle = typeColors[note.type] || typeColors['Reference'];
            const isHovered = hovered === note.id;

            return (
              <motion.article
                key={note.id}
                aria-label={note.title}
                className="group"
                style={{ backgroundColor: 'transparent' }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
                onMouseEnter={() => setHovered(note.id)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className="h-full p-6 flex flex-col transition-all duration-200"
                  style={{
                    backgroundColor: isHovered ? 'rgba(18,4,7,0.62)' : 'rgba(8,8,8,0.42)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                  }}
                >
                  {/* Top row */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="text-[9px] font-bold tracking-widest uppercase px-2 py-1"
                      style={{
                        fontFamily: '"JetBrains Mono", monospace',
                        color: typeStyle.color,
                        backgroundColor: typeStyle.bg,
                        border: `1px solid ${typeStyle.color}30`,
                      }}
                    >
                      {note.type}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="sys-label">{note.readTime}</span>
                      <div className="sys-label">/</div>
                      <span className="sys-label">{note.category}</span>
                    </div>
                  </div>

                  {/* ID + Title */}
                  <div className="mb-1">
                    <span
                      className="text-[10px] font-bold"
                      style={{ color: 'var(--color-accent)', fontFamily: '"JetBrains Mono", monospace', opacity: 0.7, letterSpacing: '0.15em' }}
                    >
                      {note.id}
                    </span>
                  </div>
                  <h3
                    className="font-bold uppercase mb-4 transition-colors duration-200"
                    style={{
                      fontFamily: '"Bebas Neue", sans-serif',
                      fontSize: 'clamp(18px, 2vw, 22px)',
                      lineHeight: 1.2,
                      color: isHovered ? 'var(--color-fg)' : 'rgba(240,238,234,0.85)',
                    }}
                  >
                    {lang === 'es' && note.titleEs ? note.titleEs : note.title}
                  </h3>

                  {/* Summary */}
                  <p
                    className="text-[13px] leading-relaxed flex-grow"
                    style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)' }}
                  >
                    {lang === 'es' && note.summaryEs ? note.summaryEs : note.summary}
                  </p>

                  {/* Read link */}
                  <Link
                    to={`/notes/${note.slug}`}
                    className="flex items-center gap-2 mt-5 text-[10px] font-bold tracking-widest uppercase transition-colors duration-200"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      color: isHovered ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                    }}
                    aria-label={`Read note: ${note.title}`}
                    onFocus={() => setHovered(note.id)}
                    onBlur={() => setHovered(null)}
                  >
                    <span>{t.fieldNotes.readNote}</span>
                    <span aria-hidden="true" className={`transition-transform duration-200 ${isHovered ? 'translate-x-1' : ''}`}>{'>'}</span>
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
