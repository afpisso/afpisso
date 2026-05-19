import { motion } from 'framer-motion';
import { useLang } from '../contexts/LangContext';

function RevealLine({ delay = 0 }) {
  return (
    <motion.div
      style={{ height: '1px', backgroundColor: 'var(--color-accent)', transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    />
  );
}

export default function WhatIDo() {
  const { t } = useLang();
  const { label, headline, items } = t.whatIDo;

  return (
    <section id="what-i-do" className="py-28" style={{ borderTop: '1px solid var(--color-rule)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <RevealLine />
          <span className="sys-label whitespace-nowrap">{label}</span>
        </motion.div>

        <motion.h2
          className="uppercase mb-16"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(2rem, 4vw, 3.5rem)',
            color: 'var(--color-fg)',
            letterSpacing: '0.02em',
            lineHeight: 1,
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {headline}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className="relative p-8 group"
              style={{
                borderLeft: i === 0 ? '1px solid var(--color-rule)' : 'none',
                borderRight: '1px solid var(--color-rule)',
                borderTop: '1px solid var(--color-rule)',
                borderBottom: '1px solid var(--color-rule)',
                backgroundColor: 'rgba(8,8,8,0.42)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: i * 0.08 }}
            >
              {/* Top accent on hover */}
              <motion.div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ backgroundColor: 'var(--color-accent)', transformOrigin: 'left', scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              />

              <div
                className="sys-label mb-2"
                style={{ color: 'var(--color-accent)' }}
              >
                {String(i + 1).padStart(2, '0')}
              </div>

              <h3
                className="uppercase mb-5"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(1.5rem, 2.5vw, 2rem)',
                  color: 'var(--color-fg)',
                  letterSpacing: '0.02em',
                  lineHeight: 1,
                }}
              >
                {item.title}
              </h3>

              <p
                className="mb-6 leading-relaxed"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '13px',
                  color: 'var(--color-fg-dim)',
                  lineHeight: 1.8,
                }}
              >
                {item.body}
              </p>

              <ul className="flex flex-wrap gap-1.5" aria-label={`${item.title} areas`}>
                {item.tags.map((tag) => (
                  <li
                    key={tag}
                    className="text-[9px] font-bold tracking-widest uppercase px-2 py-1"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      border: '1px solid var(--color-rule)',
                      color: 'var(--color-fg-mute)',
                    }}
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
