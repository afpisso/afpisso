/**
 * CaseTOC — sticky table of contents for case study pages.
 *
 * Renders only sections that exist in the current case (caller filters).
 * Tracks active section via IntersectionObserver — highlights as you scroll.
 * Navigates via Lenis (smooth, offset-corrected for fixed nav).
 *
 * Props:
 *   sections  { id: string, label: string }[]  — ordered list of present sections
 */

import { useState, useEffect } from 'react';
import { useLenis } from '../contexts/LenisContext';

const MONO   = '"JetBrains Mono", monospace';
const ACCENT = 'var(--color-accent)';
const RULE   = 'var(--color-rule)';
const DIM    = 'var(--color-fg-dim)';
const MUTE   = 'var(--color-fg-mute)';

export default function CaseTOC({ sections }) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? null);
  const lenisRef = useLenis();

  useEffect(() => {
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Among all currently intersecting entries, pick the one
        // closest to the top of the viewport (the "reading" section).
        const intersecting = entries.filter(e => e.isIntersecting);
        if (!intersecting.length) return;

        const topmost = intersecting.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
        );
        setActiveId(topmost.target.id);
      },
      {
        // Fire when the top of a section enters the top ~45% of the viewport
        rootMargin: '0px 0px -55% 0px',
        threshold: 0,
      },
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef?.current) {
      lenisRef.current.scrollTo(el, { offset: -100, duration: 0.9 });
    } else {
      el.scrollIntoView({ behavior: 'instant' });
    }
  }

  if (!sections.length) return null;

  return (
    <div
      style={{
        border:          `1px solid ${RULE}`,
        backgroundColor: 'rgba(255,255,255,0.01)',
        marginTop:       16,
      }}
    >
      {/* Header — red top accent matches Quick Facts style */}
      <div className="relative">
        <div
          className="absolute top-0 left-0 right-0 h-[1px]"
          style={{ backgroundColor: ACCENT }}
          aria-hidden="true"
        />
        <div className="px-5 pt-5 pb-2">
          <div
            className="sys-label"
            style={{ color: ACCENT }}
            id="case-toc-label"
          >
            SECTIONS
          </div>
        </div>
      </div>

      {/* Section list */}
      <nav aria-labelledby="case-toc-label">
        {sections.map(({ id, label }) => {
          const isActive = activeId === id;
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="w-full text-left border-t"
              style={{
                borderColor:    RULE,
                padding:        '10px 20px',
                display:        'flex',
                alignItems:     'center',
                gap:            10,
                fontFamily:     MONO,
                fontSize:       '10px',
                letterSpacing:  '0.1em',
                textTransform:  'uppercase',
                color:          isActive ? ACCENT : MUTE,
                background:     'none',
                cursor:         'pointer',
                transition:     'color 0.18s',
                lineHeight:     1.4,
              }}
              onMouseEnter={e => { if (!isActive) e.currentTarget.style.color = DIM; }}
              onMouseLeave={e => { if (!isActive) e.currentTarget.style.color = MUTE; }}
            >
              {/* Active pip */}
              <span
                aria-hidden="true"
                style={{
                  width:           3,
                  height:          isActive ? 14 : 3,
                  borderRadius:    isActive ? 2 : '50%',
                  backgroundColor: isActive
                    ? ACCENT
                    : 'rgba(255,255,255,0.18)',
                  flexShrink:      0,
                  transition:      'height 0.2s, background-color 0.18s',
                }}
              />
              {label}
            </button>
          );
        })}
      </nav>
    </div>
  );
}
