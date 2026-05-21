import { useState } from 'react';
import { useLang } from '../contexts/LangContext';
import GlitchStrokeText from './GlitchStrokeText';
import SweepFill from './SweepFill';
import { CyberChevron, StatusDiamond } from './CyberIcons';
import { analytics } from '../utils/analytics';
import SectionTag from './SectionTag';
import { m } from 'framer-motion';

const MONO = '"JetBrains Mono", monospace';
const BEBAS = '"Bebas Neue", sans-serif';

export default function Contact() {
  const { t } = useLang();
  const ct = t.contact;
  const [ctaHover, setCtaHover] = useState(false);

  const links = [
    { label: 'Email', value: ct.email, href: `mailto:${ct.email}`, tag: 'Direct', ariaLabel: 'Send email' },
    { label: 'LinkedIn', value: ct.linkedin, href: `https://${ct.linkedin}`, tag: 'Professional', ariaLabel: 'LinkedIn (opens in new tab)' },
    { label: 'Instagram', value: ct.instagram, href: `https://instagram.com/byandresfe`, tag: 'Creative', ariaLabel: 'Instagram (opens in new tab)' },
    { label: 'X / Twitter', value: ct.x, href: `https://x.com/byandresfe`, tag: 'Signal', ariaLabel: 'X (opens in new tab)' },
  ];

  return (
    <section id="contact" className="py-28 relative" style={{ borderTop: '1px solid var(--color-rule)' }}>
      {/* Mobile: solid bg */}
      <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
      {/* Desktop: content right, particles left */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to left, #0a0a0a 0%, #0a0a0a 60%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.15) 78%, transparent 85%)',
      }} />
      <div className="relative z-10 lg:max-w-[62%] lg:ml-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">

          {/* Left */}
          <div>
            <m.div
              className="mb-8"
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <SectionTag label={ct.label} page="008" />
            </m.div>

            <m.h2
              className="uppercase mb-10"
              style={{ fontFamily: BEBAS, fontSize: 'clamp(2.5rem, 6vw, 5rem)', color: 'var(--color-fg)', lineHeight: 0.92, letterSpacing: '0.02em' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <GlitchStrokeText>{ct.ctaLine1}</GlitchStrokeText><br />
              <GlitchStrokeText>{ct.ctaStroke}</GlitchStrokeText><br />
              <GlitchStrokeText>{ct.ctaLine3}</GlitchStrokeText>
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
            <m.a
              href={`https://${ct.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Connect on LinkedIn"
              className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase mb-4"
              style={{ fontFamily: MONO, color: 'var(--color-fg-mute)', textDecoration: 'none' }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.2 }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--color-fg)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--color-fg-mute)'}
              onClick={() => analytics.linkedinClick('contact-section-cta')}
            >
              <span>{t.contact.linkedinCta}</span>
              <span aria-hidden="true">↗</span>
            </m.a>

            <m.a
              href={`mailto:${ct.email}`}
              aria-label={ct.cta}
              className="inline-flex items-center text-[11px] tracking-widest uppercase"
              style={{
                position: 'relative', overflow: 'hidden',
                fontFamily: MONO, backgroundColor: 'var(--color-accent)', color: '#0a0a0a',
                clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
              }}
              onMouseEnter={() => setCtaHover(true)}
              onMouseLeave={() => setCtaHover(false)}
              onClick={() => { analytics.contactCtaClick(); analytics.emailClick('contact-section'); analytics.generateLead('contact-section'); }}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              whileTap={{ scale: 0.97 }}
            >
              <SweepFill active={ctaHover} fillColor="#cc1f34" activeTextColor="#0a0a0a">
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '16px 32px' }}>
                  {ct.cta}
                  <span aria-hidden="true">→</span>
                </span>
              </SweepFill>
            </m.a>
          </div>

          {/* Right: links */}
          <m.div
            className="glass p-8 relative"
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
              {links.map((link, i) => (
                <m.a
                  key={link.label}
                  href={link.href}
                  aria-label={link.ariaLabel}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-5 border-t transition-all duration-200"
                  style={{ borderColor: 'var(--color-rule)', color: 'var(--color-fg)', textDecoration: 'none' }}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.05 }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(255,37,64,0.3)')}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--color-rule)')}
                  onClick={() => {
                    if (link.label === 'Email') analytics.emailClick('contact-channels');
                    else if (link.label === 'LinkedIn') analytics.linkedinClick('contact-channels');
                    else analytics.externalLinkClick(link.href, link.label);
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="text-[9px] tracking-widest uppercase px-2 py-1 flex items-center gap-1.5"
                      style={{ fontFamily: MONO, border: '1px solid var(--color-rule)', color: 'var(--color-fg-mute)' }}
                    >
                      <StatusDiamond size={4} color="var(--color-fg-mute)" filled />
                      {link.tag}
                    </span>
                    <div>
                      <div className="sys-label">{link.label}</div>
                      <div style={{ fontFamily: MONO, fontSize: 13, color: 'var(--color-fg)' }}>{link.value}</div>
                    </div>
                  </div>
                  <CyberChevron size={9} color="var(--color-accent)" className="opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                </m.a>
              ))}
              <div className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
            </nav>
          </m.div>
        </div>
      </div>
    </section>
  );
}
