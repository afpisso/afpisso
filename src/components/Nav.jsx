import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import ContactOverlay from './ContactOverlay';
import CyberBtn from './CyberBtn';
import AudioBars from './AudioBars';
import ScrambleText from './ScrambleText';
import { analytics } from '../utils/analytics';
import { m, AnimatePresence } from 'framer-motion';

const EASE_OUT = [0.16, 1, 0.3, 1];

// ── Shared sub-components ─────────────────────────────────────────────────────
// Defined outside Nav so React doesn't remount them on every Nav render.

function LogoMark({ size = 40 }) {
  return (
    <div
      style={{
        width: size, height: size, flexShrink: 0,
        border: '1px solid rgba(255,255,255,0.15)',
        position: 'relative',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <img
        src="/logo-mark.png"
        alt=""
        aria-hidden="true"
        style={{ width: '100%', height: '100%', objectFit: 'contain', padding: size > 34 ? 4 : 3 }}
        onError={e => {
          e.currentTarget.style.display = 'none';
          if (e.currentTarget.nextElementSibling) e.currentTarget.nextElementSibling.style.display = 'flex';
        }}
      />
      {/* SVG fallback — hidden unless img errors */}
      <div aria-hidden="true" style={{
        display: 'none', width: '100%', height: '100%',
        alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width={size > 34 ? 18 : 14} height={size > 34 ? 18 : 14} viewBox="0 0 30 30" fill="none">
          <path fillRule="evenodd" clipRule="evenodd"
            d="M15 1 L30 29 L24 29 L21 22.5 H9 L6 29 L0 29 L15 1 Z M15 8 L20 22 H10 Z"
            fill="white"
          />
          <rect x="8.5" y="20" width="13" height="3" fill="#ff2540" />
        </svg>
      </div>
      {/* Accent corner dot */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: -1, right: -1,
        width: size > 34 ? 6 : 5, height: size > 34 ? 6 : 5,
        backgroundColor: 'var(--color-accent)',
      }} />
    </div>
  );
}

// Thin vertical divider for the pill
function PillDivider() {
  return (
    <div aria-hidden="true" style={{
      width: 1, height: 16, flexShrink: 0,
      backgroundColor: 'rgba(255,255,255,0.08)',
    }} />
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
export default function Nav({ onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { t, lang, toggleLang } = useLang();

  useEffect(() => {
    // Trigger pill after 80px — gives the hero enough room before switching
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Skip-to-content — keyboard a11y */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:text-[11px] focus:uppercase focus:tracking-widest"
        style={{ fontFamily: '"JetBrains Mono", monospace', backgroundColor: 'var(--color-accent)', color: '#0a0a0a' }}
      >
        Skip to content
      </a>

      {/*
        Outer shell: fixed, full-width, pointer-events-none so it doesn't block
        page interaction around the floating pill. Children opt back into
        pointer-events via pointer-events-auto.
        flex + justify-center centers the pill; absolute children (full bar)
        ignore this and span the viewport independently.
      */}
      <div
        className="fixed top-0 left-0 right-0 z-50 flex justify-center pointer-events-none"
        style={{ overflow: 'visible' }}
      >
        <AnimatePresence mode="wait">
          {!scrolled ? (
            // ── Full-width transparent bar ──────────────────────────────────
            <m.nav
              key="full-bar"
              aria-label="Site navigation"
              className="absolute top-0 left-0 right-0 pointer-events-auto"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
              transition={{ duration: 0.3, ease: EASE_OUT, delay: 0.4 }}
            >
              <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                  to="/"
                  className="flex items-center gap-3"
                  aria-label={t.nav.logoLabel}
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                >
                  <LogoMark size={40} />
                  <div>
                    <ScrambleText
                      style={{ fontFamily: '"Bebas Neue", sans-serif', fontSize: '14px', letterSpacing: '0.22em', color: 'var(--color-fg)', lineHeight: 1, display: 'block' }}
                      duration={400}
                    >
                      ByAndresFe
                    </ScrambleText>
                    <div className="sys-label" style={{ marginTop: '2px' }}>{t.nav.logoSub}</div>
                  </div>
                </Link>

                {/* Right cluster */}
                <div className="flex items-center gap-3">

                  {/* Desktop nav links */}
                  <div className="hidden lg:flex items-center gap-1">
                    {[
                      { to: '/work', label: t.nav.work },
                      { to: '/notes', label: t.nav.notes },
                    ].map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        style={({ isActive }) => ({
                          fontFamily: '"JetBrains Mono", monospace',
                          fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
                          color: isActive ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                          textDecoration: 'none', padding: '6px 12px',
                          border: `1px solid ${isActive ? 'rgba(255,37,64,0.35)' : 'transparent'}`,
                          transition: 'color 0.2s, border-color 0.2s',
                        })}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-rule)'; }}
                        onMouseLeave={e => {
                          const active = e.currentTarget.getAttribute('aria-current') === 'page';
                          e.currentTarget.style.color = active ? 'var(--color-accent)' : 'var(--color-fg-mute)';
                          e.currentTarget.style.borderColor = active ? 'rgba(255,37,64,0.35)' : 'transparent';
                        }}
                      >
                        <ScrambleText duration={300}>{label}</ScrambleText>
                      </NavLink>
                    ))}
                  </div>

                  {/* Status pill */}
                  <div
                    aria-label={`Status: ${t.nav.status} — ${t.nav.statusSub}`}
                    className="hidden md:flex flex-col justify-center px-3 py-1.5"
                    style={{ border: '1px solid var(--color-rule)' }}
                  >
                    <div className="flex items-center gap-2">
                      <AudioBars active={true} color="var(--color-accent)" size={10} />
                      <span className="sys-label">{t.nav.status}</span>
                    </div>
                    <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '10px', letterSpacing: '0.1em', color: 'var(--color-fg-mute)', marginTop: '2px', paddingLeft: '16px' }}>
                      {t.nav.statusSub}
                    </span>
                  </div>

                  {/* Language */}
                  <button
                    onClick={() => { analytics.languageSwitch(lang === 'en' ? 'es' : 'en'); toggleLang(); }}
                    aria-label={`Switch language to ${t.nav.lang}`}
                    className="hidden sm:flex items-center justify-center"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      border: '1px solid rgba(255,255,255,0.15)', background: 'transparent',
                      color: 'var(--color-fg-mute)', padding: '6px 10px',
                      cursor: 'pointer', minHeight: 44, transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'; e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
                  >
                    {t.nav.lang}
                  </button>

                  {/* Contact */}
                  <CyberBtn
                    variant="accent-ghost" size="sm" showArrow={false}
                    onClick={() => setContactOpen(true)}
                    aria-label={t.nav.contact}
                    style={{ minHeight: 44 }}
                  >
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <ScrambleText className="hidden sm:inline" duration={280}>{t.nav.contact}</ScrambleText>
                      <span aria-hidden="true" style={{ fontSize: 13, lineHeight: 1 }}>◉</span>
                    </span>
                  </CyberBtn>

                  {/* MENU+ */}
                  <button
                    onClick={onMenuOpen}
                    aria-label="Open navigation menu"
                    style={{
                      fontFamily: '"JetBrains Mono", monospace', fontSize: 11, letterSpacing: '0.14em',
                      border: '1px solid rgba(255,255,255,0.2)', background: 'transparent',
                      color: 'var(--color-fg)', padding: '8px 16px', cursor: 'pointer',
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      transition: 'border-color 0.2s, color 0.2s',
                      minHeight: 44, display: 'flex', alignItems: 'center',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-accent)'; e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'var(--color-fg)'; }}
                  >
                    <ScrambleText duration={260}>{t.nav.menu}</ScrambleText>
                  </button>
                </div>
              </div>
            </m.nav>

          ) : (
            // ── Floating glass pill ─────────────────────────────────────────
            // Glass: filter on nav element itself (fixed/sticky = safe for backdrop-filter).
            // Pill is pointer-events-auto; the outer shell remains pointer-events-none.
            <m.nav
              key="pill"
              aria-label="Site navigation"
              className="pointer-events-auto flex items-center gap-0.5"
              style={{
                marginTop: 10,
                borderRadius: 9999,
                padding: '6px 8px',
                background: 'rgba(8,8,8,0.52)',
                backdropFilter: 'blur(22px) saturate(160%)',
                WebkitBackdropFilter: 'blur(22px) saturate(160%)',
                border: '1px solid rgba(255,255,255,0.07)',
                boxShadow: '0 8px 32px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.04)',
              }}
              initial={{ y: -20, opacity: 0, scale: 0.90 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: -12, opacity: 0, scale: 0.94, transition: { duration: 0.15, ease: [0.4, 0, 1, 1] } }}
              transition={{ duration: 0.32, ease: EASE_OUT }}
            >
              {/* Logo mark */}
              <Link
                to="/"
                aria-label={t.nav.logoLabel}
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                style={{ display: 'flex', alignItems: 'center', padding: '2px 4px' }}
              >
                <LogoMark size={30} />
              </Link>

              <PillDivider />

              {/* Nav links — sm and up */}
              <div className="hidden sm:flex items-center">
                {[
                  { to: '/work', label: t.nav.work },
                  { to: '/notes', label: t.nav.notes },
                ].map(({ to, label }) => (
                  <NavLink
                    key={to}
                    to={to}
                    style={({ isActive }) => ({
                      fontFamily: '"JetBrains Mono", monospace',
                      fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                      color: isActive ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                      textDecoration: 'none', padding: '8px 10px',
                      transition: 'color 0.2s',
                    })}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; }}
                    onMouseLeave={e => {
                      const active = e.currentTarget.getAttribute('aria-current') === 'page';
                      e.currentTarget.style.color = active ? 'var(--color-accent)' : 'var(--color-fg-mute)';
                    }}
                  >
                    {label}
                  </NavLink>
                ))}
              </div>

              <div className="hidden sm:block"><PillDivider /></div>

              {/* Language toggle */}
              <button
                onClick={() => { analytics.languageSwitch(lang === 'en' ? 'es' : 'en'); toggleLang(); }}
                aria-label={`Switch language to ${t.nav.lang}`}
                style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  background: 'transparent', border: 'none',
                  color: 'var(--color-fg-mute)', padding: '8px 10px',
                  cursor: 'pointer', minHeight: 44,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
              >
                {t.nav.lang}
              </button>

              <PillDivider />

              {/* Contact — ◉ icon only */}
              <button
                onClick={() => setContactOpen(true)}
                aria-label={t.nav.contact}
                style={{
                  background: 'transparent', border: 'none', cursor: 'pointer',
                  color: 'var(--color-fg-mute)', padding: '8px 10px',
                  minHeight: 44, display: 'flex', alignItems: 'center',
                  fontSize: 13, lineHeight: 1,
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
              >
                ◉
              </button>

              <PillDivider />

              {/* MENU — no clip-path in pill context */}
              <button
                onClick={onMenuOpen}
                aria-label="Open navigation menu"
                style={{
                  fontFamily: '"JetBrains Mono", monospace', fontSize: 9,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  background: 'transparent', border: 'none',
                  color: 'var(--color-fg)', padding: '8px 12px',
                  cursor: 'pointer', minHeight: 44,
                  display: 'flex', alignItems: 'center',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg)'; }}
              >
                {t.nav.menu}
              </button>
            </m.nav>
          )}
        </AnimatePresence>
      </div>

      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
