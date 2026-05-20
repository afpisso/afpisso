import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import { CardCorners, StatusDiamond } from './CyberIcons';
import { analytics } from '../utils/analytics';
import SpotlightCard from './SpotlightCard';

// Emil Kowalski principles:
//   - clip-path for layout-free reveal (props-clip-path-performant)
//   - ease-out for enter, ease-in for exit (ease-out-default)
//   - 260ms enter / 180ms exit asymmetric (timing-asymmetric)
//   - only transform + opacity + clip-path (props-transform-opacity)
//   - interruptible (Framer handles this natively via animate)

const EASE_OUT = [0.16, 1, 0.3, 1];  // custom ease-out (snappy)
const EASE_IN  = [0.4, 0, 1, 1];     // ease-in for exit

const visibilityStyle = {
  'public':             { color: 'var(--color-accent)', border: '1px solid rgba(255,37,64,0.3)' },
  'nda-safe':           { color: 'var(--color-accent)', border: '1px solid rgba(255,37,64,0.3)' },
  'password-protected': { color: '#facc15',             border: '1px solid rgba(234,179,8,0.3)' },
  'coming-soon':        { color: '#facc15',             border: '1px solid rgba(234,179,8,0.3)' },
  'legacy':             { color: 'var(--color-fg-mute)',border: '1px solid var(--color-rule)' },
};

export default function CaseCard({ caseData, index }) {
  const [hovered, setHovered] = useState(false);
  const { t, lang } = useLang();
  const shouldReduce = useReducedMotion();

  const vstyle = visibilityStyle[caseData.visibility] || visibilityStyle['legacy'];
  const statusLabel = t.caseStatuses[caseData.visibility] || caseData.status;

  return (
    <motion.article
      aria-label={`${caseData.id}: ${caseData.title}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: EASE_OUT }}
      className="relative group h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <SpotlightCard className="h-full">
      <div
        className="relative h-full flex flex-col"
        style={{
          border: `1px solid ${hovered ? 'rgba(255,37,64,0.35)' : 'rgba(255,255,255,0.08)'}`,
          backgroundColor: hovered ? 'rgba(18,4,7,0.62)' : 'rgba(8,8,8,0.42)',
          transition: 'border-color 0.3s, background-color 0.3s, box-shadow 0.3s',
          // Liquid glass: inner top highlight + tinted shadow
          boxShadow: hovered
            ? 'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.2), 0 12px 40px rgba(0,0,0,0.5)'
            : 'inset 0 1px 0 rgba(255,255,255,0.06), 0 4px 16px rgba(0,0,0,0.35)',
        }}
      >
        {/* Top accent line on hover */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
          style={{ backgroundColor: 'var(--color-accent)', opacity: hovered ? 1 : 0 }}
        />
        <CardCorners
          color={hovered ? 'rgba(255,37,64,0.4)' : 'rgba(255,255,255,0.1)'}
          accentColor="#ff2540"
          accent={hovered}
          arm={10}
          thickness={1}
          inset={0}
        />

        {/* ── Thumbnail with overlay reveal ── */}
        <div
          className="relative w-full overflow-hidden"
          style={{ aspectRatio: '16/9', flexShrink: 0 }}
          aria-hidden="true"
        >
          {/* Thumbnail image or placeholder */}
          {caseData.thumbnail ? (
            <img
              src={caseData.thumbnail}
              alt=""
              className="w-full h-full object-cover"
              style={{
                transform: hovered ? 'scale(1.04)' : 'scale(1)',
                transition: shouldReduce ? 'none' : 'transform 600ms cubic-bezier(0.16,1,0.3,1)',
              }}
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              className="w-full h-full flex flex-col items-start justify-end p-3"
              style={{ backgroundColor: 'rgba(255,255,255,0.02)', border: '1px solid var(--color-rule)' }}
            >
              {/* Large ID as texture */}
              <div
                className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(4rem, 10vw, 7rem)',
                  color: hovered ? 'rgba(255,37,64,0.07)' : 'rgba(255,255,255,0.04)',
                  transition: 'color 0.3s',
                  letterSpacing: '-0.02em',
                }}
              >
                {caseData.id}
              </div>
              {/* Platform tags */}
              <div className="relative flex items-center gap-1.5 flex-wrap">
                {caseData.platform?.map(p => (
                  <span
                    key={p}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '8px',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      color: 'var(--color-fg-mute)',
                      border: '1px solid var(--color-rule)',
                      padding: '2px 6px',
                    }}
                  >
                    {p}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* ── Hover overlay — clip-path sweep from bottom ── */}
          {/* Emil: clip-path is layout-free (no reflow). Enter ease-out, exit ease-in. */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-4"
            style={{
              background: 'linear-gradient(to top, rgba(8,8,8,0.97) 0%, rgba(10,10,10,0.82) 60%, rgba(20,4,8,0.55) 100%)',
              pointerEvents: shouldReduce ? 'none' : 'auto',
            }}
            initial={false}
            animate={shouldReduce
              ? { opacity: hovered ? 1 : 0 }
              : { clipPath: hovered ? 'inset(0% 0% 0% 0%)' : 'inset(100% 0% 0% 0%)' }
            }
            transition={hovered
              ? { duration: 0.26, ease: EASE_OUT }
              : { duration: 0.18, ease: EASE_IN }
            }
          >
            {/* Case ID */}
            <div
              className="text-[10px] tracking-widest mb-1"
              style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-accent)' }}
            >
              {caseData.id}
            </div>

            {/* Title large */}
            <div
              className="uppercase mb-3 leading-none"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                color: 'var(--color-fg)',
                letterSpacing: '0.02em',
              }}
            >
              {caseData.title}
            </div>

            {/* Meta row */}
            <div className="flex items-center gap-2 mb-4">
              <span className="sys-label">{caseData.role}</span>
              <span className="sys-label" aria-hidden>·</span>
              <span className="sys-label">{caseData.year}</span>
            </div>

            {/* CTA */}
            <Link
              to={`/case/${caseData.slug}`}
              className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase w-fit"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                color: '#0a0a0a',
                backgroundColor: 'var(--color-accent)',
                padding: '6px 12px',
                clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))',
                textDecoration: 'none',
              }}
              tabIndex={hovered ? 0 : -1}
              aria-label={`Open case: ${caseData.title}`}
              onClick={() => analytics.caseCardClick(caseData.slug, caseData.title)}
            >
              {t.caseFiles.openCase}
              <span aria-hidden>→</span>
            </Link>
          </motion.div>
        </div>

        {/* ── Card body (always visible) ── */}
        <div className="p-5 flex flex-col flex-grow">
          {/* Header row */}
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="sys-label mb-1" style={{ color: 'var(--color-accent)' }}>
                {caseData.id}
              </div>
              <h3
                className="uppercase"
                style={{
                  fontFamily: '"Bebas Neue", sans-serif',
                  fontSize: 'clamp(1.3rem, 2vw, 1.7rem)',
                  letterSpacing: '0.02em',
                  color: 'var(--color-fg)',
                  lineHeight: 1,
                }}
              >
                {caseData.title}
              </h3>
            </div>
            <span
              className="flex-shrink-0 flex items-center gap-1.5 text-[9px] font-bold tracking-widest uppercase px-2 py-1 ml-3 mt-1"
              style={{ fontFamily: '"JetBrains Mono", monospace', ...vstyle }}
            >
              <StatusDiamond size={5} color={vstyle.color} filled />
              {statusLabel}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-[12px] leading-relaxed flex-grow mb-4"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', lineHeight: 1.75 }}
          >
            {lang === 'es' && caseData.descriptionEs ? caseData.descriptionEs : caseData.description}
          </p>

          {/* Tags */}
          <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
            {caseData.tags.map((tag) => (
              <li
                key={tag}
                className="text-[9px] font-bold tracking-widest uppercase px-2 py-1"
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  border: '1px solid var(--color-rule)',
                  color: 'var(--color-fg-mute)',
                  transition: 'border-color 0.2s, color 0.2s',
                  ...(hovered ? { borderColor: 'rgba(255,37,64,0.2)', color: 'var(--color-fg-dim)' } : {}),
                }}
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
      </SpotlightCard>
    </motion.article>
  );
}
