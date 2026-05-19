import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import SweepFill from './SweepFill';
import { analytics } from '../utils/analytics';

const MONO  = '"JetBrains Mono", monospace';
const BEBAS = '"Bebas Neue", sans-serif';
const EASE  = [0.32, 0.72, 0, 1];

export default function ContactOverlay({ open, onClose }) {
  const { t, lang } = useLang();
  const ct = t.contact;
  const co = t.contactOverlay;
  const [emailHover, setEmailHover] = useState(false); // kept for SweepFill active state

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const channels = [
    {
      label: 'LinkedIn',
      value: ct.linkedin,
      href: `https://${ct.linkedin}`,
      tag: co.tagProfessional,
    },
    {
      label: 'Instagram',
      value: ct.instagram,
      href: `https://instagram.com/byandresfe`,
      tag: co.tagCreative,
    },
    {
      label: 'X / Twitter',
      value: ct.x,
      href: `https://x.com/byandresfe`,
      tag: co.tagSignal,
    },
  ];

  return (
    <AnimatePresence>
      {open && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 300 }}>

          {/* Backdrop */}
          <motion.div
            key="co-backdrop"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
            style={{
              position: 'absolute', inset: 0,
              background: 'rgba(0,0,0,0.62)',
              backdropFilter: 'blur(8px) brightness(0.55)',
            }}
          />

          {/* Panel */}
          <motion.aside
            key="co-panel"
            role="dialog"
            aria-modal="true"
            aria-label="Contact panel"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: EASE }}
            style={{
              position: 'absolute', top: 0, right: 0, bottom: 0,
              width: 'min(460px, 100vw)',
              background: '#0a0a0a',
              borderLeft: '1px solid rgba(255,255,255,0.11)',
              display: 'flex', flexDirection: 'column',
              fontFamily: MONO,
              overflowY: 'auto',
            }}
          >
            {/* Corner brackets */}
            <span aria-hidden="true" style={{ position: 'absolute', top: 10, left: 10, width: 18, height: 18, borderTop: '2px solid #ff2540', borderLeft: '2px solid #ff2540', pointerEvents: 'none' }} />
            <span aria-hidden="true" style={{ position: 'absolute', bottom: 10, right: 10, width: 18, height: 18, borderBottom: '1px solid rgba(255,255,255,0.18)', borderRight: '1px solid rgba(255,255,255,0.18)', pointerEvents: 'none' }} />

            {/* Header */}
            <div style={{
              padding: '20px 28px',
              borderBottom: '1px solid rgba(255,255,255,0.11)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexShrink: 0,
            }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
                  <span style={{ width: 6, height: 6, background: '#ff2540', display: 'inline-block', flexShrink: 0 }} />
                  <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.16em', color: '#ff2540', textTransform: 'uppercase' }}>
                    {co.signalContact}
                  </span>
                </div>
                <div style={{ fontFamily: BEBAS, fontSize: 22, letterSpacing: '0.06em', color: '#f5f5f3', lineHeight: 1 }}>
                  {co.directChannel}
                </div>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  width: 38, height: 38, flexShrink: 0,
                  border: '1.5px solid rgba(255,255,255,0.18)',
                  background: 'transparent', color: 'rgba(245,245,243,0.7)',
                  cursor: 'pointer', display: 'grid', placeItems: 'center',
                  clipPath: 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
                  transition: 'border-color 0.2s, color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#ff2540'; e.currentTarget.style.color = '#ff2540'; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; e.currentTarget.style.color = 'rgba(245,245,243,0.7)'; }}
              >
                <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true">
                  <path d="M1 1l10 10M11 1L1 11" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </button>
            </div>

            {/* Primary CTA: email */}
            <div style={{ padding: '28px 28px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', flexShrink: 0 }}>
              <div style={{ fontSize: 10, letterSpacing: '0.14em', color: 'rgba(245,245,243,0.4)', textTransform: 'uppercase', marginBottom: 12 }}>
                {co.primaryChannel}
              </div>
              <a
                href={`mailto:${ct.email}`}
                aria-label={`Send email to ${ct.email}`}
                style={{
                  position: 'relative', overflow: 'hidden',
                  display: 'block',
                  background: '#ff2540', color: '#0a0a0a',
                  textDecoration: 'none',
                  fontFamily: MONO, fontSize: 13, letterSpacing: '0.06em',
                  clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setEmailHover(true)}
                onMouseLeave={() => setEmailHover(false)}
                onClick={() => { analytics.emailClick('contact-overlay'); analytics.generateLead('contact-overlay'); }}
              >
                <SweepFill active={emailHover} fillColor="#cc1f34" activeTextColor="#0a0a0a">
                  <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px' }}>
                    <span>{ct.email}</span>
                    <span style={{ fontSize: 10, letterSpacing: '0.16em', opacity: 0.75, textTransform: 'uppercase' }}>
                      {co.writeCta}
                    </span>
                  </span>
                </SweepFill>
              </a>
            </div>

            {/* Other channels */}
            <div style={{ flex: 1 }}>
              {channels.map((ch) => (
                <ChannelRow key={ch.label} channel={ch} />
              ))}
            </div>

            {/* Footer */}
            <div style={{
              padding: '14px 28px',
              borderTop: '1px solid rgba(255,255,255,0.08)',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              flexShrink: 0,
            }}>
              <span style={{ fontSize: 10, letterSpacing: '0.1em', color: 'rgba(245,245,243,0.35)', textTransform: 'uppercase' }}>
                {ct.location}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span className="pulse-dot" style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff2540', display: 'inline-block' }} />
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: '0.12em', color: '#ff2540', textTransform: 'uppercase' }}>
                  {t.nav.status}
                </span>
              </div>
            </div>
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

function ChannelRow({ channel }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={channel.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '16px 28px',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        color: hover ? '#ff2540' : '#f5f5f3',
        textDecoration: 'none',
        fontFamily: '"JetBrains Mono", monospace',
        transition: 'color 0.18s, border-color 0.18s',
        borderLeft: `2px solid ${hover ? '#ff2540' : 'transparent'}`,
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={() => {
        if (channel.label === 'LinkedIn') analytics.linkedinClick('contact-overlay');
        else analytics.externalLinkClick(channel.href, channel.label);
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <span style={{
          fontSize: 9, letterSpacing: '0.14em', textTransform: 'uppercase',
          border: '1px solid rgba(255,255,255,0.12)', padding: '3px 8px',
          color: hover ? '#ff2540' : 'rgba(245,245,243,0.45)',
          transition: 'color 0.18s, border-color 0.18s',
          borderColor: hover ? 'rgba(255,37,64,0.35)' : 'rgba(255,255,255,0.12)',
          flexShrink: 0,
        }}>
          {channel.tag}
        </span>
        <div>
          <div style={{ fontSize: 10, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(245,245,243,0.45)', marginBottom: 2 }}>
            {channel.label}
          </div>
          <div style={{ fontSize: 12 }}>{channel.value}</div>
        </div>
      </div>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true" style={{ opacity: hover ? 0.8 : 0.25, transition: 'opacity 0.18s', flexShrink: 0 }}>
        <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.4" />
      </svg>
    </a>
  );
}
