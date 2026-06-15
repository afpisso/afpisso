import { useState } from 'react';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from './GlitchStrokeText';
import ScrambleText from './ScrambleText';
import CyberBtn from './CyberBtn';
import { CyberChevron } from './CyberIcons';
import { analytics } from '../utils/analytics';
import SectionHeading from './SectionHeading';
import { m } from 'framer-motion';

const MONO = '"Play", sans-serif';
const BEBAS = '"Bebas Neue", sans-serif';

function ContactChannelIcon({ type, size = 18, color = 'var(--color-accent)' }) {
  const common = {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    'aria-hidden': 'true',
    style: { display: 'block', flexShrink: 0 },
  };

  if (type === 'email') {
    return (
      <svg {...common}>
        <path d="M3.5 6.5H20.5V18H3.5V6.5Z" stroke={color} strokeWidth="1.35" />
        <path d="M4.5 7.5L12 13.2L19.5 7.5" stroke={color} strokeWidth="1.35" strokeLinejoin="round" />
        <path d="M4.5 17L9.2 12.7M19.5 17L14.8 12.7" stroke={color} strokeWidth="1" opacity="0.45" />
      </svg>
    );
  }

  if (type === 'linkedin') {
    return (
      <svg {...common}>
        <path d="M5.5 9.5V18" stroke={color} strokeWidth="1.8" strokeLinecap="square" />
        <path d="M5.5 6.2V6.4" stroke={color} strokeWidth="2.2" strokeLinecap="square" />
        <path d="M10.2 18V9.5" stroke={color} strokeWidth="1.8" strokeLinecap="square" />
        <path d="M10.2 12.1C10.9 10.8 12 9.4 14.2 9.4C16.6 9.4 18.5 10.8 18.5 14.3V18" stroke={color} strokeWidth="1.8" strokeLinecap="square" />
      </svg>
    );
  }

  if (type === 'instagram') {
    return (
      <svg {...common}>
        <rect x="4.5" y="4.5" width="15" height="15" rx="3" stroke={color} strokeWidth="1.35" />
        <circle cx="12" cy="12" r="3.4" stroke={color} strokeWidth="1.35" />
        <circle cx="16.4" cy="7.6" r="0.9" fill={color} />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M5 5L19 19M19 5L5 19" stroke={color} strokeWidth="1.7" strokeLinecap="square" />
      <path d="M7.2 5H11.3L16.8 19H12.7L7.2 5Z" stroke={color} strokeWidth="1" opacity="0.42" />
    </svg>
  );
}

export default function Contact() {
  const { t } = useLang();
  const ct = t.contact;
  const [hoveredChannel, setHoveredChannel] = useState(null);

  const links = [
    { label: 'Email', value: ct.email, href: `mailto:${ct.email}`, icon: 'email', ariaLabel: 'Send email' },
    { label: 'LinkedIn', value: ct.linkedin, href: `https://${ct.linkedin}`, icon: 'linkedin', ariaLabel: 'LinkedIn (opens in new tab)' },
    { label: 'Instagram', value: ct.instagram, href: `https://instagram.com/byandresfe`, icon: 'instagram', ariaLabel: 'Instagram (opens in new tab)' },
    { label: 'X / Twitter', value: ct.x, href: `https://x.com/byandresfe`, icon: 'x', ariaLabel: 'X (opens in new tab)' },
  ];

  return (
    <section id="contact" className="py-20 relative" style={{ borderTop: '1px solid var(--color-rule)' }}>
      {/* Mobile: solid bg */}
      <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
      {/* Desktop: content left, particles right */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 60%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.15) 78%, transparent 85%)',
      }} />
      <div className="relative z-10 lg:max-w-[68%] lg:mr-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(360px,1fr)] gap-12 xl:gap-16 items-start">

          {/* Left */}
          <div>
            <m.div
              className="mb-8"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionHeading label={ct.label} page="008" />
            </m.div>

            <m.h2
              className="uppercase mb-10"
              style={{ fontFamily: BEBAS, fontSize: 'clamp(2.5rem, 5.3vw, 4.7rem)', color: 'var(--color-fg)', lineHeight: 0.92, letterSpacing: '0.02em' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <GlitchStrokeText style={{ display: 'block', whiteSpace: 'nowrap' }}>{ct.ctaLine1}</GlitchStrokeText>
              <ScrambleText duration={500} style={{ display: 'block', whiteSpace: 'nowrap', minWidth: `${ct.ctaStroke.length + 1}ch` }}>{ct.ctaStroke}</ScrambleText>
              <ScrambleText duration={500} style={{ display: 'block', whiteSpace: 'nowrap', minWidth: `${ct.ctaLine3.length + 1}ch` }}>{ct.ctaLine3}</ScrambleText>
            </m.h2>

            <m.p
              className="mb-10"
              style={{ fontFamily: MONO, fontSize: 'clamp(12px, 1.2vw, 14px)', color: 'var(--color-fg-dim)', lineHeight: 1.9, maxWidth: '400px' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
            >
              {ct.headline}
            </m.p>

            {/* Secondary CTA — LinkedIn */}
            <CyberBtn
              variant="ghost"
              size="sm"
              href={`https://${ct.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              showArrow={false}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onClick={() => analytics.linkedinClick('contact-section-cta')}
              style={{ marginBottom: 16 }}
            >
              {t.contact.linkedinCta} ↗
            </CyberBtn>

            {/* Resume download */}
            <m.a
              href="/Andres_Pisso_CV_UXUI_Designer_Games_EN.pdf"
              download
              aria-label={t.about?.resumeBtn || 'Download Resume — Senior Game UX/UI / UX Lead'}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: MONO, fontSize: 10, fontWeight: 700,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                color: 'var(--color-fg-mute)',
                border: '1px solid var(--color-rule)',
                padding: '10px 18px', textDecoration: 'none',
                clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
                transition: 'color 150ms ease-out, border-color 150ms ease-out',
                marginBottom: 16,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-accent-35)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; e.currentTarget.style.borderColor = 'var(--color-rule)'; }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.22 }}
            >
              {t.about?.resumeBtn || 'Download Resume — Senior Game UX/UI / UX Lead'}
              <span aria-hidden style={{ opacity: 0.45 }}>↓</span>
            </m.a>

            <CyberBtn
              href={`mailto:${ct.email}`}
              aria-label={ct.cta}
              size="lg"
              onClick={() => { analytics.contactCtaClick(); analytics.emailClick('contact-section'); analytics.generateLead('contact-section'); }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
            >
              {ct.cta}
            </CyberBtn>
          </div>

          {/* Right: links */}
          <m.div
            className="glass p-8 relative self-start"
            style={{
              border: '1px solid rgba(255,255,255,0.08)',
              backgroundColor: 'rgba(8,8,8,0.38)',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.4)',
            }}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          >
            {/* Top accent */}
            <div aria-hidden="true" className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.5 }} />
            <div className="sys-label mb-6" id="contact-channels-label">{t.contact.channelsLabel}</div>
            <nav aria-labelledby="contact-channels-label">
              {links.map((link, i) => {
                const isChannelHovered = hoveredChannel === link.label;

                return (
                  <m.a
                    key={link.label}
                    href={link.href}
                    aria-label={link.ariaLabel}
                    target={link.href.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group grid items-center py-5 border-t transition-all duration-200 relative overflow-hidden"
                    style={{
                      borderColor: 'var(--color-rule)',
                      color: 'var(--color-fg)',
                      textDecoration: 'none',
                      gridTemplateColumns: '44px minmax(0, 1fr) 12px',
                      columnGap: '16px',
                      backgroundColor: isChannelHovered ? 'rgba(255, 37, 64, 0.025)' : 'transparent',
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.05 }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderTopColor = 'var(--color-accent-30)';
                      setHoveredChannel(link.label);
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderTopColor = 'var(--color-rule)';
                      setHoveredChannel(null);
                    }}
                    onClick={() => {
                      if (link.label === 'Email') analytics.emailClick('contact-channels');
                      else if (link.label === 'LinkedIn') analytics.linkedinClick('contact-channels');
                      else analytics.externalLinkClick(link.href, link.label);
                    }}
                  >
                    <m.span
                      aria-hidden="true"
                      className="absolute left-0 bottom-0 h-px w-full"
                      style={{
                        backgroundColor: 'var(--color-accent)',
                        transformOrigin: 'left',
                      }}
                      animate={{ scaleX: isChannelHovered ? 1 : 0, opacity: isChannelHovered ? 0.75 : 0 }}
                      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                    />
                    <m.span
                      className="inline-flex items-center justify-center"
                      style={{
                        width: 36,
                        height: 36,
                        border: `1px solid ${isChannelHovered ? 'var(--color-accent)' : 'var(--color-accent-30)'}`,
                        backgroundColor: isChannelHovered ? 'var(--color-accent-15)' : 'var(--color-accent-08)',
                        color: 'var(--color-accent)',
                        willChange: 'transform',
                      }}
                      animate={{ x: isChannelHovered ? 2 : 0, scale: isChannelHovered ? 1.04 : 1 }}
                      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    >
                      <ContactChannelIcon type={link.icon} />
                    </m.span>
                    <div style={{ minWidth: 0 }}>
                      <div className="sys-label">{link.label}</div>
                      <div style={{ fontFamily: MONO, fontSize: 13, color: 'var(--color-fg)', lineHeight: 1.45, overflowWrap: 'anywhere' }}>
                        {link.value}
                      </div>
                    </div>
                    <CyberChevron size={9} color="var(--color-accent)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                  </m.a>
                );
              })}
              <div className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
            </nav>
          </m.div>
        </div>
      </div>
    </section>
  );
}
