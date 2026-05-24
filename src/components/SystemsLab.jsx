import { useState } from 'react';
import { useLang } from '../contexts/LangContext';
import SectionHeading from './SectionHeading';
import SpotlightCard from './SpotlightCard';
import { IconHUD, IconNetwork, IconLayers, IconEye, IconOnboard, IconLiveOps, IconFigma, IconUnreal, IconDoc } from './CyberIcons';
import { m } from 'framer-motion';

// SVG icon per module — thin-line cyberpunk aesthetic
const MODULE_ICONS = {
  'HUD Reviews':          IconHUD,
  'UX Systems':           IconNetwork,
  'UI Components & States': IconLayers,
  'Accessibility Reviews': IconEye,
  'Player Onboarding':    IconOnboard,
  'LiveOps UX':           IconLiveOps,
  'Figma Workflows':      IconFigma,
  'UEFN Workflows':       IconUnreal,
  'Documentation':        IconDoc,
};

function PrincipleRow({ p, i }) {
  const [hovered, setHovered] = useState(false);
  return (
    <m.div
      className="relative flex items-start gap-6 py-7 border-t transition-colors duration-200"
      style={{ borderColor: hovered ? 'rgba(255,37,64,0.35)' : 'var(--color-rule)' }}
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: i * 0.05 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Left accent — grows in on hover */}
      <div
        className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-300"
        style={{
          backgroundColor: 'var(--color-accent)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'scaleY(1)' : 'scaleY(0)',
          transformOrigin: 'top',
        }}
      />

      {/* Number */}
      <div className="flex-shrink-0 w-10 pt-1.5">
        <div
          className="text-[10px] tracking-widest transition-colors duration-200"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: hovered ? 'var(--color-accent)' : 'rgba(255,37,64,0.4)',
          }}
        >
          {p.id}
        </div>
      </div>

      {/* Content */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-[2fr_3fr] gap-4 items-start pl-2">
        <h3
          className="uppercase transition-colors duration-200"
          style={{
            fontFamily: '"Bebas Neue", sans-serif',
            fontSize: 'clamp(22px, 2vw, 28px)',
            lineHeight: 1.05,
            letterSpacing: '0.02em',
            color: hovered ? 'var(--color-fg)' : 'rgba(240,238,234,0.85)',
          }}
        >
          {p.title}
        </h3>
        <p
          className="text-[13px] leading-relaxed transition-colors duration-200"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: hovered ? 'var(--color-fg-dim)' : 'var(--color-fg-mute)',
          }}
        >
          {p.body}
        </p>
      </div>
    </m.div>
  );
}

// Small glyph per module to add visual identity
const MODULE_GLYPHS = {
  'HUD Review':            '⊡',
  'UI Systems':            '⊞',
  'UI Components':         '⊟',
  'Accessibility':         '◎',
  'Player Onboarding':     '▷',
  'LiveOps UX':            '◈',
  'Figma Workflows':       '⊕',
  'UEFN Workflows':        '◆',
  'Documentation':         '≡',
  'UX Components':         '⊠',
  'UX Systems':            '⊞',
  'Accessibility Reviews': '◎',
  'LiveOps UX':            '◈',
};

function ModuleCard({ mod, i }) {
  const [hovered, setHovered] = useState(false);
  const Icon = MODULE_ICONS[mod.label] || null;
  return (
    <SpotlightCard>
    <m.div
      className="relative p-5 flex flex-col gap-3 cursor-default overflow-hidden"
      style={{
        backgroundColor: hovered ? 'rgba(20,4,8,0.7)' : 'rgba(8,8,8,0.42)',
        minHeight: '90px',
        boxShadow: hovered
          ? 'inset 0 1px 0 rgba(255,255,255,0.09), 0 4px 16px rgba(0,0,0,0.4)'
          : 'inset 0 1px 0 rgba(255,255,255,0.04)',
        transition: 'background-color 0.2s, box-shadow 0.2s',
      }}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.04 }}
      whileTap={{ scale: 0.97 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icon + Tag row */}
      <div className="flex items-center justify-between">
        {/* Icon */}
        <div
          style={{
            color: hovered ? 'var(--color-accent)' : 'rgba(255,37,64,0.4)',
            transition: 'color 0.2s',
          }}
        >
          {Icon && <Icon size={18} />}
        </div>

        {/* Tag */}
        <div
          className="text-[9px] font-bold tracking-widest uppercase transition-colors duration-200"
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            color: hovered ? 'var(--color-accent)' : 'rgba(255,37,64,0.4)',
          }}
        >
          {mod.tag}
        </div>
      </div>

      {/* Label */}
      <div
        className="text-[11px] transition-colors duration-200"
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          color: hovered ? 'var(--color-fg)' : 'var(--color-fg-dim)',
          lineHeight: 1.4,
          letterSpacing: '0.01em',
        }}
      >
        {mod.label}
      </div>
    </m.div>
    </SpotlightCard>
  );
}

export default function SystemsLab() {
  const { t } = useLang();
  const sl = t.systemsLab;

  return (
    <section id="systems" className="py-28" style={{ borderTop: '1px solid var(--color-rule)', backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Header */}
        <div className="mb-16">
          <SectionHeading
            label={sl.label.split('/')[0].trim()}
            title={sl.sectionTitle}
            page="006"
          />
          <m.p
            className="text-base mt-10"
            style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', lineHeight: 1.8, maxWidth: '520px' }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            {sl.description}
          </m.p>
        </div>

        {/* Principles */}
        <div className="mb-20">
          {sl.principles.map((p, i) => (
            <PrincipleRow key={p.id} p={p} i={i} />
          ))}
          <div className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
        </div>

        {/* Modules grid */}
        <div>
          <m.div
            className="flex items-center gap-4 mb-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="h-[1px] w-8" style={{ backgroundColor: 'var(--color-rule)' }} />
            <span className="sys-label">{sl.modulesLabel}</span>
          </m.div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-px" style={{ backgroundColor: 'var(--color-rule)' }}>
            {sl.modules.map((mod, i) => (
              <ModuleCard key={mod.label} mod={mod} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
