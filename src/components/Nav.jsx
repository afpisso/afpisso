import { useState, useEffect, useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { useLenis } from '../contexts/LenisContext';
import { useSignalAudio } from '../contexts/SignalAudioContext';
import AudioBars from './AudioBars';
import ContactOverlay from './ContactOverlay';
import ScrambleText from './ScrambleText';
import { analytics } from '../utils/analytics';
import { m, AnimatePresence, useMotionValue, useSpring, useTransform, useMotionTemplate, useReducedMotion } from 'framer-motion';

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

function LanguageLabel({ lang, target }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
      <span style={{ color: 'var(--color-fg)' }}>{lang.toUpperCase()}</span>
      <span aria-hidden="true" style={{ color: 'rgba(255,255,255,0.18)' }}>/</span>
      <span>{target}</span>
    </span>
  );
}

function SignalAudioToggle({ compact = false }) {
  const { signalAudioOn, toggleSignalAudio } = useSignalAudio();
  const [hover, setHover] = useState(false);
  const active = signalAudioOn;
  const label = active ? 'Apagar sonido' : 'Prender sonido';

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      aria-pressed={active}
      onClick={toggleSignalAudio}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        width: compact ? 38 : 44,
        minWidth: compact ? 38 : 44,
        height: 44,
        display: 'grid',
        placeItems: 'center',
        padding: 0,
        border: compact
          ? 'none'
          : `1px solid ${active ? 'rgba(255,37,64,0.42)' : hover ? 'rgba(255,255,255,0.22)' : 'transparent'}`,
        background: active
          ? 'rgba(255,37,64,0.075)'
          : hover
            ? 'rgba(255,255,255,0.035)'
            : 'transparent',
        color: active ? 'var(--color-accent)' : hover ? 'var(--color-fg)' : 'var(--color-fg-mute)',
        cursor: 'pointer',
        clipPath: compact
          ? 'none'
          : 'polygon(0 0, calc(100% - 7px) 0, 100% 7px, 100% 100%, 7px 100%, 0 calc(100% - 7px))',
        transition: 'color 0.18s cubic-bezier(0.16,1,0.3,1), background-color 0.18s cubic-bezier(0.16,1,0.3,1), border-color 0.18s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      <AudioBars active={active} color="currentColor" size={compact ? 13 : 14} />
      {active && (
        <span
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            bottom: compact ? 6 : 5,
            width: compact ? 14 : 16,
            height: 1,
            transform: 'translateX(-50%)',
            background: 'currentColor',
            boxShadow: '0 0 12px rgba(255,37,64,0.42)',
            opacity: 0.75,
          }}
        />
      )}
    </button>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
export default function Nav({ onMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const { t, lang, toggleLang } = useLang();
  const lenisRef = useLenis();
  const shouldReduceMotion = useReducedMotion();

  // ── Rubber pill animation ─────────────────────────────────────────────────
  // Three states: idle (center-bottom glow + thin accent border),
  // scroll-down (pill springs up, squashes, glow pulses),
  // scroll-up (pill springs down, squashes, glow pulses).
  //
  // Technique: transform + opacity only (compositor-safe, Emil principles).
  // bendMV: -1 = scroll down (pill bends up), 0 = idle, +1 = scroll up.
  // glowMV: 0 = rest intensity, 1 = scroll intensity.
  const bendMV = useMotionValue(0);
  const glowMV = useMotionValue(0);
  const decayTimer = useRef(null);

  // Controlled single-overshoot rubber — damping ratio ≈ 0.90
  // One clean snap with a brief tail; no multi-bounce toy feel.
  // (ratio = 22 / (2 × √(300 × 0.5)) ≈ 0.90 → barely underdamped)
  const bendSpring = useSpring(bendMV, { stiffness: 300, damping: 22, mass: 0.5 });
  const glowSpring = useSpring(glowMV, { stiffness: 120, damping: 22 });

  // Derived transforms: nudge + SVG path bezier bowing + glow opacity
  const pillY       = useTransform(bendSpring, v => v * 2);
  const glowOpacity = useTransform(glowSpring, [0, 1], [0.10, 0.42]);
  const ringOpacity = useTransform(glowSpring, [0, 1], [0, 1]);

  // SVG rubber border: directional pressing — 50% deformation depth.
  // Scroll DOWN → top edge bows INWARD; bottom barely moves.
  // Scroll UP   → bottom edge bows INWARD; top barely moves.
  //
  //   scroll down (bend=-1): topBow=+5 (inward), bottomBow=45 (barely outward)
  //   scroll up   (bend=+1): topBow=-2 (barely outward), bottomBow=40 (inward)
  const topBow    = useTransform(bendSpring, [-1, 0, 1], [5, 0, -2]);
  const bottomBow = useTransform(bendSpring, [-1, 0, 1], [45, 44, 40]);
  // Chamfered octagon — 10px diagonal cuts at all 4 corners.
  // Straight top/bottom edges carry rubber deformation via Q bezier.
  const pillPath  = useMotionTemplate`M 10 0 Q 150 ${topBow} 290 0 L 300 10 L 300 34 L 290 44 Q 150 ${bottomBow} 10 44 L 0 34 L 0 10 Z`;

  useEffect(() => {
    let prevScrollY = window.scrollY;

    const onScroll = () => {
      const currentY = window.scrollY;
      const delta    = currentY - prevScrollY;
      prevScrollY    = currentY;

      setScrolled(currentY > 80);

      clearTimeout(decayTimer.current);
      if (delta > 2) {
        if (!shouldReduceMotion) bendMV.set(-1);  // scroll down: top edge bows inward
        glowMV.set(1);
      } else if (delta < -2) {
        if (!shouldReduceMotion) bendMV.set(1);   // scroll up: bottom edge bows inward
        glowMV.set(1);
      }
      // 200ms window — rubber needs time to overshoot and settle before returning to idle
      decayTimer.current = setTimeout(() => {
        bendMV.set(0);
        glowMV.set(0);
      }, 200);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      clearTimeout(decayTimer.current);
    };
  }, [bendMV, glowMV, shouldReduceMotion]);

  return (
    <>
      {/* Skip-to-content — keyboard a11y */}
      <a
        href="#home"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[300] focus:px-4 focus:py-2 focus:text-[11px] focus:uppercase focus:tracking-widest"
        style={{ fontFamily: '"Play", sans-serif', backgroundColor: 'var(--color-accent)', color: '#0a0a0a' }}
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
              initial={shouldReduceMotion ? { opacity: 0 } : { y: -20, opacity: 0 }}
              animate={shouldReduceMotion ? { opacity: 1 } : { y: 0, opacity: 1 }}
              exit={shouldReduceMotion
                ? { opacity: 0, transition: { duration: 0.1 } }
                : { y: -16, opacity: 0, transition: { duration: 0.18, ease: [0.4, 0, 1, 1] } }}
              transition={shouldReduceMotion
                ? { duration: 0.15 }
                : { duration: 0.3, ease: EASE_OUT, delay: 0.4 }}
            >
              <div className="w-full px-4 sm:px-6 lg:px-10 xl:px-16 py-4 flex items-center justify-between">

                {/* Logo */}
                <Link
                  to="/"
                  className="flex items-center gap-3"
                  aria-label={t.nav.logoLabel}
                  onClick={() => lenisRef?.current ? lenisRef.current.scrollTo(0, { duration: 0.9 }) : window.scrollTo({ top: 0, behavior: 'instant' })}
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
                <div className="flex items-center gap-2">

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
                          fontFamily: '"Play", sans-serif',
                          fontSize: '10px', letterSpacing: '0.14em', textTransform: 'uppercase',
                          color: isActive ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                          textDecoration: 'none', padding: '6px 12px',
                          border: `1px solid ${isActive ? 'var(--color-accent-35)' : 'transparent'}`,
                          transition: 'color 0.2s, border-color 0.2s',
                        })}
                        onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.borderColor = 'var(--color-rule)'; }}
                        onMouseLeave={e => {
                          const active = e.currentTarget.getAttribute('aria-current') === 'page';
                          e.currentTarget.style.color = active ? 'var(--color-accent)' : 'var(--color-fg-mute)';
                          e.currentTarget.style.borderColor = active ? 'var(--color-accent-35)' : 'transparent';
                        }}
                      >
                        <ScrambleText duration={300}>{label}</ScrambleText>
                      </NavLink>
                    ))}
                  </div>

                  {/* Language */}
                  <button
                    onClick={() => { analytics.languageSwitch(lang === 'en' ? 'es' : 'en'); toggleLang(); }}
                    aria-label={`Switch language to ${t.nav.lang}`}
                    className="hidden sm:flex items-center justify-center"
                    style={{
                      fontFamily: '"Play", sans-serif', fontSize: 10,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      border: '1px solid transparent', background: 'transparent',
                      color: 'var(--color-fg-mute)', padding: '6px 12px',
                      cursor: 'pointer', minHeight: 44, transition: 'border-color 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--color-rule)'; e.currentTarget.style.color = 'var(--color-fg)'; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'transparent'; e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
                  >
                    <LanguageLabel lang={lang} target={t.nav.lang} />
                  </button>

                  {/* Signal audio */}
                  <SignalAudioToggle />

                  {/* Contact */}
                  <button
                    onClick={() => setContactOpen(true)}
                    aria-label={t.nav.contact}
                    style={{
                      fontFamily: '"Play", sans-serif',
                      fontSize: 10,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      border: '1px solid rgba(255,255,255,0.18)',
                      background: 'rgba(255,255,255,0.015)',
                      color: 'var(--color-fg)',
                      padding: '8px 18px',
                      cursor: 'pointer',
                      minHeight: 44,
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 8,
                      clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
                      transition: 'border-color 0.2s, color 0.2s, background-color 0.2s',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = 'var(--color-accent-45)';
                      e.currentTarget.style.backgroundColor = 'var(--color-accent-08)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                      e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.015)';
                    }}
                  >
                    <span aria-hidden="true" style={{ width: 5, height: 5, backgroundColor: 'var(--color-accent)', display: 'inline-block' }} />
                    <ScrambleText className="hidden sm:inline" duration={280}>{t.nav.contact}</ScrambleText>
                  </button>

                  {/* MENU+ */}
                  <button
                    onClick={onMenuOpen}
                    aria-label="Open navigation menu"
                    style={{
                      fontFamily: '"Play", sans-serif', fontSize: 11, letterSpacing: '0.14em',
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
            // ── Floating glass pill — rubber animation architecture ──────────
            // Outer m.div: handles enter/exit opacity+scale only.
            // Inner m.div: continuous rubber physics (y nudge + squash-stretch).
            // Idle: thin accent border + soft center-bottom halo.
            // Scroll: spring overshoots in direction → rubber feel; glow pulses.
            <m.div
              key="pill"
              className="pointer-events-none"
              style={{ position: 'relative', marginTop: 10 }}
              initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.92, filter: 'blur(5px)' }}
              animate={shouldReduceMotion ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
              exit={shouldReduceMotion
                ? { opacity: 0, transition: { duration: 0.1 } }
                : { opacity: 0, scale: 0.95, y: -8, filter: 'blur(4px)', transition: { duration: 0.13, ease: [0.4, 0, 1, 1] } }}
              transition={shouldReduceMotion
                ? { duration: 0.15 }
                : { duration: 0.26, ease: EASE_OUT }}
            >
              {/* Inner rubber wrapper — y nudge only; shape deformation is on the SVG border */}
              <m.div style={{ position: 'relative', y: pillY }}>

                {/* Idle bottom-center glow — soft point anchored to base of pill */}
                <div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', bottom: -8, left: '50%',
                    transform: 'translateX(-50%)',
                    width: '44%', height: 1,
                    boxShadow: '0 0 14px 5px rgba(255,37,64,0.16)',
                    pointerEvents: 'none',
                  }}
                />

                {/* Scroll glow — same anchor, intensity scales with motion */}
                <m.div
                  aria-hidden="true"
                  style={{
                    position: 'absolute', bottom: -10, left: '50%',
                    transform: 'translateX(-50%)',
                    width: '54%', height: 1,
                    boxShadow: '0 0 22px 8px rgba(255,37,64,0.28)',
                    opacity: ringOpacity,
                    pointerEvents: 'none',
                  }}
                />

                {/*
                  SVG rubber border — the actual deforming pill outline.
                  Two overlaid paths: idle (faint) + active (bright, scales with ringOpacity).
                  ViewBox 300×44 scaled to fill via preserveAspectRatio="none".
                  Top edge Q control point bows in direction of travel;
                  bottom edge Q trails the opposite way → visible S-curve rubber feel.
                */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 300 44"
                  preserveAspectRatio="none"
                  style={{
                    position: 'absolute', inset: 0,
                    width: '100%', height: '100%',
                    overflow: 'visible',
                    pointerEvents: 'none',
                    zIndex: 2,
                  }}
                >
                  {/* Idle border */}
                  <m.path
                    d={pillPath}
                    fill="none"
                    stroke="rgba(255,37,64,0.24)"
                    strokeWidth="1"
                  />
                  {/* Active border — brighter on scroll */}
                  <m.path
                    d={pillPath}
                    fill="none"
                    stroke="rgba(255,37,64,0.58)"
                    strokeWidth="1.5"
                    style={{ opacity: ringOpacity }}
                  />
                </svg>

                {/* Glass pill — no CSS border; SVG provides the outline */}
                <nav
                  aria-label="Site navigation"
                  className="pointer-events-auto flex items-center gap-0.5"
                  style={{
                    position: 'relative', zIndex: 1,
                    borderRadius: 0,
                    clipPath: 'polygon(10px 0px, calc(100% - 10px) 0px, 100% 10px, 100% calc(100% - 10px), calc(100% - 10px) 100%, 10px 100%, 0px calc(100% - 10px), 0px 10px)',
                    padding: '6px 8px',
                    background: 'rgba(6,6,6,0.78)',
                    backdropFilter: 'blur(80px) saturate(120%) brightness(0.65)',
                    WebkitBackdropFilter: 'blur(80px) saturate(120%) brightness(0.65)',
                    border: 'none',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                  }}
                >
                  {/* Logo mark */}
                  <Link
                    to="/"
                    aria-label={t.nav.logoLabel}
                    onClick={() => lenisRef?.current ? lenisRef.current.scrollTo(0, { duration: 0.9 }) : window.scrollTo({ top: 0, behavior: 'instant' })}
                    style={{ display: 'flex', alignItems: 'center', padding: '2px 4px' }}
                  >
                    <LogoMark size={30} />
                  </Link>

                  <PillDivider />

                  {/* Nav links */}
                  <div className="hidden sm:flex items-center">
                    {[
                      { to: '/work', label: t.nav.work },
                      { to: '/notes', label: t.nav.notes },
                    ].map(({ to, label }) => (
                      <NavLink
                        key={to}
                        to={to}
                        style={({ isActive }) => ({
                          fontFamily: '"Play", sans-serif',
                          fontSize: '9px', letterSpacing: '0.12em', textTransform: 'uppercase',
                          color: isActive ? 'var(--color-accent)' : 'var(--color-fg-mute)',
                          textDecoration: 'none', padding: '8px 10px',
                          transition: 'color 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
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
                      fontFamily: '"Play", sans-serif', fontSize: 9,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      background: 'transparent', border: 'none',
                      color: 'var(--color-fg-mute)', padding: '8px 10px',
                      cursor: 'pointer', minHeight: 44,
                      transition: 'color 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
                  >
                    <LanguageLabel lang={lang} target={t.nav.lang} />
                  </button>

                  <PillDivider />

                  {/* Signal audio */}
                  <SignalAudioToggle compact />

                  <PillDivider />

                  {/* Contact */}
                  <button
                    onClick={() => setContactOpen(true)}
                    aria-label={t.nav.contact}
                    style={{
                      background: 'transparent', border: 'none', cursor: 'pointer',
                      color: 'var(--color-fg-mute)', padding: '8px 10px',
                      minHeight: 44, display: 'flex', alignItems: 'center',
                      fontSize: 13, lineHeight: 1,
                      transition: 'color 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg-mute)'; }}
                  >
                    ◉
                  </button>

                  <PillDivider />

                  {/* MENU */}
                  <button
                    onClick={onMenuOpen}
                    aria-label="Open navigation menu"
                    style={{
                      fontFamily: '"Play", sans-serif', fontSize: 9,
                      letterSpacing: '0.14em', textTransform: 'uppercase',
                      background: 'transparent', border: 'none',
                      color: 'var(--color-fg)', padding: '8px 12px',
                      cursor: 'pointer', minHeight: 44,
                      display: 'flex', alignItems: 'center',
                      transition: 'color 0.15s cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-accent)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-fg)'; }}
                  >
                    {t.nav.menu}
                  </button>

                  {/* Bottom-center fill — tight ellipse at base, clipped to pill shape */}
                  <m.div
                    aria-hidden="true"
                    style={{
                      position: 'absolute', inset: 0,
                      background: 'radial-gradient(ellipse 50% 60% at 50% 120%, var(--color-accent-45) 0%, transparent 65%)',
                      opacity: glowOpacity,
                      pointerEvents: 'none',
                    }}
                  />
                </nav>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>
      </div>

      <ContactOverlay open={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}
