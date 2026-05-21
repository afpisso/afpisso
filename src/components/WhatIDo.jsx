import { useState } from 'react';
import { useLang } from '../contexts/LangContext';
import SectionHeading from './SectionHeading';
import { m } from 'framer-motion';

// taste-skill §3 Rule 3: 3-column equal card grid is BANNED at DESIGN_VARIANCE 8.
// Replaced with asymmetric numbered rows — editorial split layout.
// Left: number + title (40%) / Right: body + tags (60%)

const EASE_OUT = [0.16, 1, 0.3, 1];

function ServiceRow({ item, index }) {
  const [hovered, setHovered] = useState(false);

  return (
    <m.div
      className="relative grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-6 md:gap-12 py-10 border-t group"
      style={{ borderColor: hovered ? 'rgba(255,37,64,0.35)' : 'var(--color-rule)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, ease: EASE_OUT, delay: index * 0.07 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent bar */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-0 bottom-0 w-[2px]"
        style={{
          backgroundColor: 'var(--color-accent)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
          transition: 'opacity 0.25s, transform 0.32s cubic-bezier(0.16,1,0.3,1)',
        }}
      />

      {/* Left col — number + title */}
      <div className="pl-6 md:pl-8">
        <div
          className="mb-3 transition-colors duration-200"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '11px',
            letterSpacing: '0.12em',
            color: hovered ? 'var(--color-accent)' : 'rgba(255,37,64,0.35)',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </div>
        <h3
          className="uppercase transition-colors duration-200"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(1.8rem, 3vw, 2.8rem)',
            lineHeight: 1,
            letterSpacing: '0.01em',
            color: hovered ? 'var(--color-fg)' : 'rgba(240,238,234,0.82)',
          }}
        >
          {item.title}
        </h3>
      </div>

      {/* Right col — body + tags */}
      <div>
        <p
          className="mb-6 leading-relaxed transition-colors duration-200"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '13px',
            color: hovered ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)',
            lineHeight: 1.85,
            maxWidth: '560px',
          }}
        >
          {item.body}
        </p>

        <ul className="flex flex-wrap gap-1.5" aria-label={`${item.title} areas`}>
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 transition-all duration-200"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                border: '1px solid var(--color-rule)',
                color: 'var(--color-fg-mute)',
                ...(hovered ? { borderColor: 'rgba(255,37,64,0.2)', color: 'var(--color-fg-dim)' } : {}),
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </m.div>
  );
}

export default function WhatIDo() {
  const { t } = useLang();
  const { label, headline, items } = t.whatIDo;

  return (
    <section
      id="what-i-do"
      className="py-28 relative"
      style={{ borderTop: '1px solid var(--color-rule)' }}
    >
      {/* Mobile: solid bg */}
      <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
      {/* Desktop: content right, particles left — gradient fades to transparent on the left */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to left, #0a0a0a 0%, #0a0a0a 60%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.15) 78%, transparent 85%)',
      }} />
      <div className="relative z-10 lg:max-w-[62%] lg:ml-auto px-6">

        {/* Header */}
        <div className="mb-16">
          <SectionHeading label={label} page="002" />
        </div>

        {/* Service rows */}
        <div>
          {items.map((item, i) => (
            <ServiceRow key={item.title} item={item} index={i} />
          ))}
          <div className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
        </div>

      </div>
    </section>
  );
}
