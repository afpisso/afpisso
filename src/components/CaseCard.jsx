import { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { CardCorners, StatusDiamond } from './CyberIcons';
import { analytics } from '../utils/analytics';
import SpotlightCard from './SpotlightCard';
import { m, useReducedMotion } from 'framer-motion';

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
  const videoRef = useRef(null);

  const vstyle = visibilityStyle[caseData.visibility] || visibilityStyle['legacy'];
  const statusLabel = t.caseStatuses[caseData.visibility] || caseData.status;

  return (
    <m.article
      aria-label={`${caseData.id}: ${caseData.title}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: EASE_OUT }}
      className="relative group h-full"
      onMouseEnter={() => {
        setHovered(true);
        if (!shouldReduce && videoRef.current) videoRef.current.play().catch(() => {});
      }}
      onMouseLeave={() => {
        setHovered(false);
        if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; }
      }}
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
              alt={caseData.thumbnailAlt || caseData.title}
              className="w-full h-full object-cover"
              style={{
                transform: hovered && !caseData.trailerSrc ? 'scale(1.04)' : 'scale(1)',
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

          {/* ── Trailer preview — fades over thumbnail on hover ── */}
          {caseData.trailerSrc && (
            <video
              ref={videoRef}
              className="absolute inset-0 w-full h-full object-cover"
              style={{
                opacity: hovered ? 1 : 0,
                transition: shouldReduce ? 'none' : 'opacity 400ms cubic-bezier(0.16,1,0.3,1)',
              }}
              muted
              loop
              playsInline
              preload="none"
              aria-hidden="true"
            >
              <source src={caseData.trailerSrc} type="video/mp4" />
            </video>
          )}

          {/* ── Hover overlay — clip-path sweep from bottom ── */}
          {/* Reveals headline (editorial hook) — NOT visible in card body below. */}
          {/* Emil: clip-path is layout-free (no reflow). Enter ease-out, exit ease-in. */}
          <m.div
            className="absolute inset-0 flex flex-col justify-end p-4"
            style={{
              background: 'linear-gradient(to top, rgba(8,8,8,0.98) 0%, rgba(10,10,10,0.88) 55%, rgba(20,4,8,0.45) 100%)',
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
            {/* Editorial hook — what this case is actually about */}
            <div className="mb-4">
              <div
                className="flex items-center gap-1.5 mb-2"
                style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', letterSpacing: '0.18em', color: 'rgba(255,37,64,0.6)', textTransform: 'uppercase' }}
              >
                <span>// case hook</span>
              </div>
              <p
                style={{
                  fontFamily: '"JetBrains Mono", monospace',
                  fontSize: '12px',
                  color: 'rgba(240,238,234,0.88)',
                  lineHeight: 1.7,
                  fontStyle: 'italic',
                  letterSpacing: '0.01em',
                }}
              >
                {caseData.headline || caseData.focus}
              </p>
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
          </m.div>
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
              className="flex-shrink-0 flex items-center gap-1.5 text-[10px] font-bold tracking-widest uppercase px-2 py-1 ml-3 mt-1"
              style={{ fontFamily: '"JetBrains Mono", monospace', ...vstyle }}
            >
              <StatusDiamond size={5} color={vstyle.color} filled />
              {statusLabel}
            </span>
          </div>

          {/* Description */}
          <p
            className="text-[13px] leading-relaxed flex-grow mb-4"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', lineHeight: 1.75 }}
          >
            {lang === 'es' && caseData.descriptionEs ? caseData.descriptionEs : caseData.description}
          </p>

          {/* Tags */}
          <ul aria-label="Tags" className="flex flex-wrap gap-1.5">
            {caseData.tags.map((tag) => (
              <li
                key={tag}
                className="text-[10px] font-bold tracking-widest uppercase px-2 py-1"
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
    </m.article>
  );
}
