import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import { CardCorners, StatusDiamond, CyberChevron } from './CyberIcons';
import { analytics } from '../utils/analytics';

const visibilityStyle = {
  'public': { color: 'var(--color-accent)', border: '1px solid rgba(255,37,64,0.3)' },
  'nda-safe': { color: 'var(--color-accent)', border: '1px solid rgba(255,37,64,0.3)' },
  'password-protected': { color: '#facc15', border: '1px solid rgba(234,179,8,0.3)' },
  'coming-soon': { color: '#facc15', border: '1px solid rgba(234,179,8,0.3)' },
  'legacy': { color: 'var(--color-fg-mute)', border: '1px solid var(--color-rule)' },
};

export default function CaseCard({ caseData, index }) {
  const [hovered, setHovered] = useState(false);
  const { t, lang } = useLang();

  const vstyle = visibilityStyle[caseData.visibility] || visibilityStyle['legacy'];
  const statusLabel = t.caseStatuses[caseData.visibility] || caseData.status;

  return (
    <motion.article
      aria-label={`${caseData.id}: ${caseData.title}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.4, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      className="relative group h-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className="relative h-full p-6 flex flex-col transition-colors duration-200"
        style={{
          border: `1px solid ${hovered ? 'rgba(255,37,64,0.35)' : 'rgba(255,255,255,0.08)'}`,
          backgroundColor: hovered ? 'rgba(18,4,7,0.62)' : 'rgba(8,8,8,0.42)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
        }}
      >
        {/* Top accent line on hover */}
        <div
          aria-hidden="true"
          className="absolute top-0 left-0 right-0 h-[1px] transition-opacity duration-300"
          style={{ backgroundColor: 'var(--color-accent)', opacity: hovered ? 1 : 0 }}
        />
        {/* Corner brackets */}
        <CardCorners
          color={hovered ? 'rgba(255,37,64,0.4)' : 'rgba(255,255,255,0.1)'}
          accentColor="#ff2540"
          accent={hovered}
          arm={10}
          thickness={1}
          inset={0}
        />

        {/* Thumbnail — only render if the file exists; avoids 404 requests */}
        <div
          className="w-full mb-5 overflow-hidden flex items-center justify-center"
          style={{ aspectRatio: '16/7', backgroundColor: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-rule)' }}
          aria-hidden="true"
        >
          {caseData.thumbnail ? (
            <img
              src={caseData.thumbnail}
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          ) : (
            <div
              style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '9px', color: 'var(--color-fg-mute)', letterSpacing: '0.12em' }}
            >
              {caseData.platform?.join(' · ')}
            </div>
          )}
        </div>

        {/* Header */}
        <div className="flex items-start justify-between mb-5">
          <div>
            <div className="sys-label mb-2" style={{ color: 'var(--color-accent)' }}>
              {caseData.id}
            </div>
            <h3
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
                letterSpacing: '0.02em',
                color: 'var(--color-fg)',
                lineHeight: 1,
              }}
            >
              {caseData.title}
            </h3>
          </div>
          <span
            className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 flex-shrink-0 ml-3 mt-1 flex items-center gap-1.5"
            style={{ fontFamily: '"JetBrains Mono", monospace', ...vstyle }}
          >
            <StatusDiamond size={5} color={vstyle.color} filled />
            {statusLabel}
          </span>
        </div>

        {/* Meta */}
        <dl className="grid grid-cols-2 gap-3 mb-5 pb-5" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div>
            <dt className="sys-label mb-1">{t.caseFiles.metaRole}</dt>
            <dd className="text-[12px]" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg)', letterSpacing: '0.02em' }}>
              {caseData.role}
            </dd>
          </div>
          <div>
            <dt className="sys-label mb-1">{t.caseFiles.metaYear}</dt>
            <dd className="text-[12px] tabular" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg)' }}>
              {caseData.year}
            </dd>
          </div>
          <div className="col-span-2">
            <dt className="sys-label mb-1">{t.caseFiles.metaFocus}</dt>
            <dd className="text-[11px] leading-relaxed" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)' }}>
              {lang === 'es' && caseData.focusEs ? caseData.focusEs : caseData.focus}
            </dd>
          </div>
        </dl>

        {/* Description */}
        <p
          className="text-[12px] leading-relaxed mb-6 flex-grow"
          style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', lineHeight: 1.75 }}
        >
          {lang === 'es' && caseData.descriptionEs ? caseData.descriptionEs : caseData.description}
        </p>

        {/* Tags */}
        <ul aria-label="Tags" className="flex flex-wrap gap-1.5 mb-6">
          {caseData.tags.map((tag) => (
            <li
              key={tag}
              className="text-[9px] font-bold tracking-widest uppercase px-2 py-1"
              style={{ fontFamily: '"JetBrains Mono", monospace', border: '1px solid var(--color-rule)', color: 'var(--color-fg-mute)' }}
            >
              {tag}
            </li>
          ))}
        </ul>

        {/* CTA — Link to case page */}
        <Link
          to={`/case/${caseData.slug}`}
          className="flex items-center gap-2 text-[10px] tracking-widest uppercase transition-colors duration-200 mt-auto w-fit"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: hovered ? 'var(--color-accent)' : 'var(--color-fg-mute)',
          }}
          aria-label={`Open case: ${caseData.title}`}
          onClick={() => analytics.caseCardClick(caseData.slug, caseData.title)}
        >
          <span>{t.caseFiles.openCase}</span>
          <CyberChevron size={9} color={hovered ? 'var(--color-accent)' : 'var(--color-fg-mute)'} />
        </Link>

      </div>
    </motion.article>
  );
}
