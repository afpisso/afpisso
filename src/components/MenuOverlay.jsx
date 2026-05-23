import { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import { useLenis } from '../contexts/LenisContext';

// ── Scramble hook ──────────────────────────────────────────────────────────
const SCRAMBLE_CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789/_*<>+#';

function useScramble(target, { duration = 600, trigger = 0, delay = 0 } = {}) {
  const [text, setText] = useState(target);
  const rafRef = useRef(0);
  const toRef = useRef(0);

  useEffect(() => {
    cancelAnimationFrame(rafRef.current);
    clearTimeout(toRef.current);
    const chars = target.split('');
    const resolveAt = chars.map((_, i) =>
      (i / Math.max(1, chars.length - 1)) * duration * 0.7 +
      Math.random() * duration * 0.3
    );
    const start = () => {
      const t0 = performance.now();
      const tick = () => {
        const t = performance.now() - t0;
        const out = chars.map((c, i) => {
          if (c === ' ' || c === ' ') return c;
          if (t > resolveAt[i]) return c;
          return SCRAMBLE_CHARS[(Math.random() * SCRAMBLE_CHARS.length) | 0];
        });
        setText(out.join(''));
        if (t < duration) rafRef.current = requestAnimationFrame(tick);
        else setText(target);
      };
      tick();
    };
    if (delay) toRef.current = setTimeout(start, delay);
    else start();
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(toRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger, target]);

  return text;
}

// ── Typewriter hook ────────────────────────────────────────────────────────
function useTypewriter(target, active, { speed = 28 } = {}) {
  const [text, setText] = useState('');
  useEffect(() => {
    let i = active ? 0 : text.length;
    let cancelled = false;
    const id = setInterval(() => {
      if (cancelled) return;
      if (active) {
        i++;
        setText(target.slice(0, i));
        if (i >= target.length) clearInterval(id);
      } else {
        i--;
        setText(target.slice(0, Math.max(0, i)));
        if (i <= 0) clearInterval(id);
      }
    }, speed);
    return () => { cancelled = true; clearInterval(id); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, target]);
  return text;
}

// ── Menu data ──────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { en: 'HOME',    es: 'INICIO',   page: '000', href: '/',        sub_en: 'Back to home base',               sub_es: 'Volver al inicio'               },
  { en: 'WORK',    es: 'TRABAJO',  page: '001', href: '/work',    sub_en: 'Selected projects, 2019—2026',   sub_es: 'Proyectos selectos, 2019—2026'  },
  { en: 'ABOUT',   es: 'SOBRE MÍ', page: '002', href: '/about',   sub_en: 'Biography & process',             sub_es: 'Biografía y proceso'            },
  { en: 'JOURNAL', es: 'DIARIO',   page: '003', href: '/notes',   sub_en: 'Notes, essays & experiments',     sub_es: 'Notas, ensayos y experimentos'  },
  { en: 'CONTACT', es: 'CONTACTO', page: '004', href: '/#contact', sub_en: 'Inquiries & availability',       sub_es: 'Consultas y disponibilidad'     },
];

const SOCIAL = [
  { label: 'LINKEDIN',  handle: 'in/byandresfe',  href: 'https://linkedin.com/in/byandresfe'       },
  { label: 'INSTAGRAM', handle: '@byandresfe',     href: 'https://instagram.com/byandresfe'         },
  { label: 'X',         handle: '@byandresfe',     href: 'https://x.com/byandresfe'                 },
];

// ── GlitchText ─────────────────────────────────────────────────────────────
function GlitchText({ children, active, color }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {active && (
        <>
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, color: '#ff2d55',
            transform: 'translate(-3px, 1px)', mixBlendMode: 'screen',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>{children}</span>
          <span aria-hidden="true" style={{
            position: 'absolute', inset: 0, color: '#00e0ff',
            transform: 'translate(3px, -1px)', mixBlendMode: 'screen',
            pointerEvents: 'none', whiteSpace: 'nowrap',
          }}>{children}</span>
        </>
      )}
      <span style={{ position: 'relative', color, whiteSpace: 'nowrap' }}>{children}</span>
    </span>
  );
}

// ── Crosshair SVG ──────────────────────────────────────────────────────────
function Crosshair({ size = 26, color = '#f5f5f3', opacity = 1 }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden="true" style={{ opacity }}>
      <path d="M16 1v10M16 21v10M1 16h10M21 16h10" stroke={color} strokeWidth="1.4" fill="none" />
      <circle cx="16" cy="16" r="2" fill={color} />
    </svg>
  );
}

// ── AudioBars ──────────────────────────────────────────────────────────────
function AudioBars({ color = '#f5f5f3' }) {
  return (
    <div aria-hidden="true" style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
      {[0, 1, 2, 3].map(i => (
        <span key={i} style={{
          width: 2, background: color, opacity: 0.85, height: '100%',
          animation: `bars 1.1s ease-in-out ${i * 0.12}s infinite alternate`,
          transformOrigin: 'bottom',
        }} />
      ))}
    </div>
  );
}

// ── CornerBrackets ─────────────────────────────────────────────────────────
function CornerBrackets({ color, accent }) {
  const arm = 18;
  const t = 2;
  const inset = 8;
  const make = (top, left, right, bottom, useAccent) => ({
    position: 'absolute',
    width: arm, height: arm,
    ...(top    != null ? { top: inset }    : { bottom: inset }),
    ...(left   != null ? { left: inset }   : { right: inset }),
    borderTop:    top    != null ? `${t}px solid ${useAccent ? accent : color}` : 'none',
    borderLeft:   left   != null ? `${t}px solid ${useAccent ? accent : color}` : 'none',
    borderRight:  right  != null ? `${t}px solid ${useAccent ? accent : color}` : 'none',
    borderBottom: bottom != null ? `${t}px solid ${useAccent ? accent : color}` : 'none',
    pointerEvents: 'none',
  });
  return (
    <>
      <span aria-hidden="true" style={make(0, 0, null, null, true)}  />  {/* TL accent */}
      <span aria-hidden="true" style={make(0, null, 0, null, false)} />  {/* TR fg */}
      <span aria-hidden="true" style={make(null, 0, null, 0, false)} />  {/* BL fg */}
      <span aria-hidden="true" style={make(null, null, 0, 0, false)} />  {/* BR fg */}
    </>
  );
}

// ── PageTag ────────────────────────────────────────────────────────────────
function PageTag({ label, page, accent, fg, entered }) {
  const chamfer = 12;
  const clip = `polygon(0 0, calc(100% - ${chamfer}px) 0, 100% ${chamfer}px, 100% 100%, ${chamfer}px 100%, 0 calc(100% - ${chamfer}px))`;
  const scrambleKey = `${label}-${page}`;
  const txt = useScramble(label, { duration: 420, trigger: scrambleKey });

  return (
    <div key={scrambleKey} style={{
      display: 'flex', alignItems: 'flex-end', gap: 14, marginBottom: 8,
      transform: entered ? 'translateX(0)' : 'translateX(-12px)',
      opacity: entered ? 1 : 0,
      transition: 'transform 0.5s cubic-bezier(.2,.7,.2,1) 0.1s, opacity 0.4s 0.1s',
    }}>
      <span style={{
        background: accent, color: '#0a0a0a',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: 46, lineHeight: 0.9,
        padding: '5px 14px 6px',
        clipPath: clip,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
        display: 'block',
      }}>
        {entered ? txt : ' '}
      </span>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11, letterSpacing: '0.12em',
        color: accent, opacity: 0.95, paddingBottom: 14,
      }}>
        PAGE<br />{page}
      </span>
    </div>
  );
}

// ── MenuItem ───────────────────────────────────────────────────────────────
function MenuItem({ item, lang, idx, active, onClick, onNavigate, entered, entryDelay, accent, fg, narrow }) {
  const [hover, setHover] = useState(false);
  const label = lang === 'es' ? item.es : item.en;
  const sub   = lang === 'es' ? item.sub_es : item.sub_en;

  const entryScramble = useScramble(label, { duration: 700, trigger: entered ? 1 : 0, delay: entered ? entryDelay : 0 });
  const hoverScramble = useScramble(label, { duration: 380, trigger: hover ? 2 : 0 });
  const display = !entered ? '' : (hover ? hoverScramble : entryScramble);

  const pageText = useTypewriter(`PAGE ${item.page}`, hover && entered, { speed: 22 });
  const subText  = useTypewriter(sub, hover && entered, { speed: 14 });

  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    if (!entered) return;
    const t1 = setTimeout(() => setGlitching(true),  entryDelay);
    const t2 = setTimeout(() => setGlitching(false), entryDelay + 320);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [entered, entryDelay]);

  const chamfer = 16;
  const highlightClip = `polygon(0 0, calc(100% - ${chamfer}px) 0, 100% ${chamfer}px, 100% 100%, ${chamfer}px 100%, 0 calc(100% - ${chamfer}px))`;

  return (
    <div
      role="menuitem"
      tabIndex={0}
      onClick={() => { onClick?.(); onNavigate?.(item.href); }}
      onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && (onClick?.(), onNavigate?.(item.href))}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-current={active ? 'page' : undefined}
      style={{
        position: 'relative',
        display: 'flex', alignItems: 'center', gap: 18,
        padding: narrow ? '6px 0' : '2px 0', cursor: 'pointer',
        minHeight: narrow ? 52 : 'auto',
      }}
    >
      {/* Active left-edge marker */}
      <span aria-hidden="true" style={{
        position: 'absolute', left: -36, top: '50%',
        transform: 'translateY(-50%)',
        display: 'flex', alignItems: 'center', gap: 4,
        opacity: active ? 1 : 0,
        transition: 'opacity 0.25s',
        pointerEvents: 'none',
      }}>
        <span style={{ width: 8, height: 8, background: accent, display: 'inline-block' }} />
        <span style={{ width: 18, height: 2, background: accent, display: 'inline-block' }} />
      </span>

      {/* Text + sliding highlight */}
      <span style={{
        position: 'relative', display: 'inline-block',
        padding: '0.04em 0.18em 0.08em', lineHeight: 0.88,
      }}>
        <span aria-hidden="true" style={{
          position: 'absolute',
          inset: '0.06em -0.04em 0.06em 0',
          background: accent,
          transform: hover ? 'scaleX(1)' : 'scaleX(0)',
          transformOrigin: 'left center',
          transition: 'transform 0.28s cubic-bezier(0.32, 0.72, 0, 1)',
          clipPath: highlightClip,
          zIndex: 0,
        }} />
        <span style={{
          position: 'relative', zIndex: 1,
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 'clamp(36px, 5vw, 80px)', lineHeight: 0.9, letterSpacing: '0.005em',
          color: hover ? '#0a0a0a' : fg,
          transition: 'color 0.18s',
          whiteSpace: 'nowrap', display: 'inline-block',
        }}>
          <GlitchText active={glitching && entered} color={hover ? '#0a0a0a' : fg}>
            {display || ' '}
          </GlitchText>
        </span>
      </span>

      {/* Right: PAGE + sub-label — desktop only */}
      {!narrow && (
        <span style={{
          position: 'relative', zIndex: 1, marginLeft: 'auto',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11, letterSpacing: '0.08em',
          color: fg,
          opacity: (hover || active) ? 1 : 0.35,
          transition: 'opacity 0.2s',
          display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
          gap: 3, textAlign: 'right', minWidth: 120, paddingTop: 2,
        }}>
          <span style={{
            whiteSpace: 'nowrap',
            color: (hover || active) ? accent : fg,
            fontWeight: active ? 500 : 400,
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            {active && <span style={{ width: 6, height: 6, background: accent, display: 'inline-block' }} />}
            {hover ? pageText : `PAGE ${item.page}`}
            {active && !hover && <span>· ACTIVE</span>}
            <span style={{ opacity: hover && pageText.length < `PAGE ${item.page}`.length ? 1 : 0 }}>▮</span>
          </span>
          <span style={{ opacity: 0.55, fontSize: 10, maxWidth: 220 }}>
            {subText}
          </span>
        </span>
      )}
    </div>
  );
}

// ── SectionRow ─────────────────────────────────────────────────────────────
function SectionRow({ label, children, rule, fg, accent, narrow }) {
  if (narrow) {
    return (
      <div style={{ borderTop: `1px solid ${rule}` }}>
        <div style={{ padding: '14px 20px', display: 'flex', alignItems: 'center' }}>
          {children}
        </div>
      </div>
    );
  }
  return (
    <div style={{
      display: 'grid', gridTemplateColumns: '120px 1fr',
      borderTop: `1px solid ${rule}`,
      alignItems: 'stretch',
    }}>
      <div style={{
        padding: '16px 20px',
        borderRight: `1px solid ${rule}`,
        display: 'flex', alignItems: 'center', gap: 10,
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11, letterSpacing: '0.14em', color: fg,
      }}>
        <span style={{ width: 6, height: 6, background: accent, display: 'inline-block', flexShrink: 0 }} />
        {label}
      </div>
      <div style={{ padding: '16px 0', display: 'flex', alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}

// ── useNarrow ──────────────────────────────────────────────────────────────
function useNarrow(bp = 600) {
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' ? window.innerWidth < bp : false);
  useEffect(() => {
    const check = () => setNarrow(window.innerWidth < bp);
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, [bp]);
  return narrow;
}

// ── Menu (the panel) ───────────────────────────────────────────────────────
function Menu({ open, onClose, activeSection = 'WORK' }) {
  const { lang, setLang } = useLang();
  const navigate = useNavigate();
  const narrow = useNarrow(600);
  const accent = '#ff2540';
  const fg     = '#f5f5f3';
  const bg     = '#0a0a0a';
  const rule   = 'rgba(255,255,255,0.11)';

  const activeIdxFromProp = Math.max(0, MENU_ITEMS.findIndex(it => it.en === activeSection));
  const [activeIdx, setActiveIdx] = useState(activeIdxFromProp);
  useEffect(() => setActiveIdx(activeIdxFromProp), [activeIdxFromProp]);

  function handleNavigate(href) {
    if (!href) return;
    onClose?.();
    if (href.startsWith('/#')) {
      navigate('/');
      // Wait for the route render, then scroll to section via Lenis
      // (native scrollIntoView conflicts with Lenis's RAF loop)
      setTimeout(() => {
        const id = href.slice(2);
        const el = document.getElementById(id);
        if (el && lenisRef?.current) {
          lenisRef.current.scrollTo(el, { offset: -80, duration: 1.0 });
        } else if (el) {
          el.scrollIntoView({ behavior: 'instant' });
        }
      }, 120);
    } else {
      navigate(href);
    }
  }

  const activeItem  = MENU_ITEMS[activeIdx] || MENU_ITEMS[0];
  const activeLabel = lang === 'es' ? activeItem.es : activeItem.en;
  const activePage  = activeItem.page;

  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!open) { setEntered(false); return; }
    const id = setTimeout(() => setEntered(true), 30);
    return () => clearTimeout(id);
  }, [open]);

  const [clock, setClock] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hhmm = clock.toTimeString().slice(0, 5);

  const sessionId = useMemo(
    () => Array.from({ length: 6 }, () => SCRAMBLE_CHARS[(Math.random() * 26) | 0]).join(''),
    []
  );

  const panelClip = narrow
    ? 'none'
    : `polygon(
        0 0,
        calc(100% - 60px) 0,
        100% 36px,
        100% calc(100% - 90px),
        calc(100% - 36px) calc(100% - 90px),
        calc(100% - 36px) calc(100% - 60px),
        100% calc(100% - 60px),
        100% 100%,
        0 100%
      )`;

  const t = lang === 'es'
    ? { connect: 'CONECTA', contact: 'CONTACTO', year: '© 2026 BYANDRESFE. TODOS LOS DERECHOS RESERVADOS.', closing: 'BYANDRESFE · BOGOTÁ → MUNDO', live: 'EN DIRECTO' }
    : { connect: 'CONNECT', contact: 'CONTACT',  year: '© 2026 BYANDRESFE. ALL RIGHTS RESERVED.',           closing: 'BYANDRESFE · BOGOTÁ → WORLD', live: 'LIVE'       };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Site navigation"
      style={{
        position: 'absolute', left: 0, top: 0, bottom: 0,
        width: narrow ? '100%' : 'min(72%, 960px)',
        background: bg, color: fg,
        fontFamily: '"JetBrains Mono", monospace',
        overflow: 'hidden', isolation: 'isolate',
        clipPath: panelClip,
        opacity: entered ? 1 : 0,
        animation: entered ? 'panel-glitch-A 0.45s steps(8, end) 1' : 'none',
      }}
    >
      {/* Scanline during glitch entry */}
      {entered && (
        <div aria-hidden="true" style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20,
          background: `linear-gradient(180deg, transparent 0%, ${accent}1f 50%, transparent 100%)`,
          height: '30%',
          animation: 'scan-A 0.7s linear 1',
        }} />
      )}

      <CornerBrackets color={fg} accent={accent} />

      {/* Content wrapper */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 28px',
          fontSize: 11, letterSpacing: '0.12em',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, background: accent, display: 'inline-block' }} />
            {sessionId} · NODE.{hhmm.replace(':', '')}
          </span>
          <span style={{ opacity: 0.5, display: 'flex', alignItems: 'center', gap: 8 }}>
            BYANDRESFE
            <span style={{ opacity: 0.45 }}>/</span>
            {lang === 'es' ? 'ACTIVA' : 'NOW'}
            <span style={{ color: accent, opacity: 1 }}>· {activeLabel}</span>
            <span style={{ opacity: 0.45 }}>· IDX {hhmm}</span>
          </span>
          <button
            onClick={onClose}
            aria-label="Close navigation"
            style={{
              width: 36, height: 36,
              border: `1.5px solid ${fg}`,
              background: 'transparent', color: fg,
              cursor: 'pointer', display: 'grid', placeItems: 'center',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
              <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" />
            </svg>
          </button>
        </div>

        {/* Main index grid */}
        <div style={{
          flex: 1, minHeight: 0,
          display: 'grid',
          gridTemplateColumns: narrow ? '1fr' : '120px 1fr 72px',
          borderTop: `1px solid ${rule}`,
          overflow: 'hidden',
        }}>
          {/* Left rail — desktop only */}
          {!narrow && (
            <div style={{
              borderRight: `1px solid ${rule}`,
              padding: '22px 20px',
              display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
              fontSize: 11, letterSpacing: '0.14em',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 6, height: 6, background: accent, display: 'inline-block' }} />
                {lang === 'es' ? 'ÍNDICE' : 'INDEX'}
              </div>
              <div style={{ opacity: 0.55, lineHeight: 1.7, fontSize: 10 }}>
                {lang === 'es' ? <>05<br />SECCIONES</> : <>05<br />SECTIONS</>}
              </div>
            </div>
          )}

          {/* Center column */}
          <div style={{
            padding: narrow ? '16px 20px 12px' : '16px 24px 12px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            minWidth: 0, overflowX: 'hidden', overflowY: 'auto',
          }}>
            {!narrow && (
              <PageTag
                label={activeLabel}
                page={activePage}
                accent={accent}
                fg={fg}
                entered={entered}
              />
            )}
            {narrow && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16,
                opacity: entered ? 1 : 0, transition: 'opacity 0.3s',
              }}>
                <span style={{ width: 6, height: 6, background: accent, display: 'inline-block' }} />
                <span style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: 10, letterSpacing: '0.16em', color: accent }}>
                  {lang === 'es' ? 'NAVEGACIÓN' : 'NAVIGATION'}
                </span>
              </div>
            )}
            <nav aria-label="Primary navigation">
              <div style={{ display: 'flex', flexDirection: 'column', gap: narrow ? 2 : 1 }}>
                {MENU_ITEMS.map((item, i) => (
                  <MenuItem
                    key={`${i}-${lang}`}
                    item={item}
                    lang={lang}
                    idx={i}
                    active={i === activeIdx}
                    onClick={() => setActiveIdx(i)}
                    onNavigate={handleNavigate}
                    entered={entered}
                    entryDelay={i * 90 + 250}
                    accent={accent}
                    fg={fg}
                    narrow={narrow}
                  />
                ))}
              </div>
            </nav>
          </div>

          {/* Right rail — desktop only */}
          {!narrow && (
            <div style={{
              borderLeft: `1px solid ${rule}`,
              padding: '20px 0',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'space-between',
            }}>
              <div style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: 10, letterSpacing: '0.1em',
                writingMode: 'vertical-rl',
                transform: 'rotate(180deg)',
                opacity: 0.55,
              }}>
                v.2.6 / BUILD {sessionId.slice(0, 4)}
              </div>
              <Crosshair color={fg} size={26} opacity={0.85} />
              <div style={{ opacity: 0.5, fontSize: 10, letterSpacing: '0.12em' }}>◆</div>
            </div>
          )}
        </div>

        {/* CONNECT row */}
        <SectionRow label={t.connect} rule={rule} fg={fg} accent={accent} narrow={narrow}>
          <div style={{
            display: 'flex', gap: narrow ? 20 : 28, padding: `0 ${narrow ? 20 : 24}px`,
            flexWrap: 'wrap', fontSize: 13, letterSpacing: '0.06em',
          }}>
            {SOCIAL.map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: fg, textDecoration: 'none', display: 'flex', gap: 8, alignItems: 'baseline' }}
                onMouseEnter={e => { e.currentTarget.style.color = accent; }}
                onMouseLeave={e => { e.currentTarget.style.color = fg; }}
              >
                <span>{s.label}</span>
                {!narrow && <span style={{ opacity: 0.45, fontSize: 11 }}>↗ {s.handle}</span>}
              </a>
            ))}
          </div>
        </SectionRow>

        {/* CONTACT row */}
        <SectionRow label={t.contact} rule={rule} fg={fg} accent={accent} narrow={narrow}>
          <a
            href="mailto:afpisso@gmail.com"
            style={{ padding: `0 ${narrow ? 20 : 24}px`, color: fg, textDecoration: 'none', fontSize: 13, letterSpacing: '0.06em' }}
            onMouseEnter={e => { e.currentTarget.style.color = accent; }}
            onMouseLeave={e => { e.currentTarget.style.color = fg; }}
          >
            afpisso@gmail.com
            <span style={{ opacity: 0.45, marginLeft: 10, fontSize: 11 }}>
              ↗ {lang === 'es' ? 'ESCRIBIR' : 'WRITE'}
            </span>
          </a>
        </SectionRow>

        {/* Footer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: narrow ? '1fr 1fr' : '120px 1fr 1fr 1fr',
          borderTop: `1px solid ${rule}`,
          fontSize: 11, letterSpacing: '0.1em',
        }}>
          {/* Language toggle */}
          <div style={{
            padding: narrow ? '12px 20px' : '14px 20px',
            borderRight: `1px solid ${rule}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            {['en', 'es'].map((l, i) => (
              <span key={l} style={{ display: 'inline-flex', alignItems: 'center', gap: 12 }}>
                {i > 0 && <span style={{ opacity: 0.3 }}>/</span>}
                <button
                  onClick={() => setLang(l)}
                  style={{
                    border: 'none', background: 'transparent', cursor: 'pointer',
                    color: lang === l ? accent : fg,
                    opacity: lang === l ? 1 : 0.5,
                    fontFamily: 'inherit', fontSize: 'inherit',
                    letterSpacing: 'inherit', padding: 0,
                    minHeight: 36,
                  }}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          {narrow ? (
            <div style={{
              padding: '12px 20px',
              display: 'flex', alignItems: 'center', gap: 8,
              justifyContent: 'flex-end', opacity: 0.7,
            }}>
              <AudioBars color={fg} />
              <span>{t.live}</span>
            </div>
          ) : (
            <>
              <div style={{ padding: '14px 20px', opacity: 0.55, fontSize: 10 }}>{t.year}</div>
              <div style={{ padding: '14px 20px', opacity: 0.7, textAlign: 'center' }}>{t.closing}</div>
              <div style={{
                padding: '14px 20px',
                display: 'flex', alignItems: 'center', gap: 10,
                justifyContent: 'flex-end', opacity: 0.7,
              }}>
                <AudioBars color={fg} />
                <span>{t.live}</span>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

// ── MenuOverlay — 7-stage state machine ────────────────────────────────────
export default function MenuOverlay({ open, onClose, activeSection }) {
  const { lang } = useLang();
  const lenisRef = useLenis();
  const accent = '#ff2540';
  const [stage, setStage] = useState(0);

  // Stage machine
  useEffect(() => {
    if (!open) {
      if (stage === 0) return;
      setStage(6);
      const c1 = setTimeout(() => setStage(7), 320);
      const c2 = setTimeout(() => setStage(0), 600);
      return () => { clearTimeout(c1); clearTimeout(c2); };
    }
    setStage(1);
    const t1 = setTimeout(() => setStage(2), 120);
    const t2 = setTimeout(() => setStage(3), 440);
    const t3 = setTimeout(() => setStage(4), 620);
    const t4 = setTimeout(() => setStage(5), 980);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  // Scroll lock
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Esc key closes
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose?.(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  // Nothing to render when fully closed
  if (stage === 0 && !open) return null;

  const bgVisible   = stage >= 1 && stage <= 6;
  const menuOpen    = stage >= 3 && stage <= 5;
  const sheetActive = stage === 2 || stage === 3 || stage === 6;

  // Sheet clip-path per stage
  let sheetClip = 'inset(0 0 0 100%)'; // hidden right (default / stage 1)
  if (stage === 2 || stage === 3)  sheetClip = 'inset(0 0 0 0)';      // full cover
  if (stage === 4 || stage === 5)  sheetClip = 'inset(0 100% 0 0)';   // exited left
  if (stage === 6)                 sheetClip = 'inset(0 0 0 0)';      // close: sweep in
  if (stage === 7)                 sheetClip = 'inset(0 0 0 100%)';   // close: exit right

  const sheetTextOpacity = stage === 3 ? 1 : 0;

  const hashId = Date.now().toString(36).slice(-6).toUpperCase();

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        pointerEvents: stage === 0 ? 'none' : 'auto',
      }}
    >
      {/* Backdrop blur + dim (blurs the site content behind this overlay) */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backdropFilter: bgVisible ? 'blur(10px) brightness(0.5) saturate(0.7)' : 'none',
        background: bgVisible ? 'rgba(0,0,0,0.45)' : 'transparent',
        transition: 'backdrop-filter 0.35s ease-out, background 0.25s ease-out',
        pointerEvents: 'none',
      }} />

      {/* Menu panel */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 4,
        opacity: menuOpen ? 1 : 0,
        transition: 'opacity 0.18s ease',
        pointerEvents: menuOpen ? 'auto' : 'none',
      }}>
        <Menu
          open={menuOpen}
          onClose={onClose}
          activeSection={activeSection}
        />
      </div>

      {/* Red sweep sheet */}
      <div aria-hidden="true" style={{
        position: 'absolute', inset: 0, zIndex: 8,
        background: accent,
        clipPath: sheetClip,
        transition: 'clip-path 0.5s cubic-bezier(0.32, 0.72, 0, 1)',
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {/* Faint wordmark */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
          fontFamily: '"Bebas Neue", sans-serif',
          color: '#0a0a0a', opacity: 0.1,
          fontSize: 240, letterSpacing: '0.04em', lineHeight: 0.85,
          whiteSpace: 'nowrap', overflow: 'hidden', paddingLeft: 20,
          userSelect: 'none',
        }}>
          <span>BYANDRESFE·BYANDRESFE</span>
          <span style={{ alignSelf: 'flex-end' }}>·BYANDRESFE·</span>
          <span>BYANDRESFE·BYANDRESFE</span>
        </div>

        {/* Center loading chip — visible only at stage 3 */}
        <div style={{
          position: 'absolute', inset: 0, display: 'grid', placeItems: 'center',
          opacity: sheetTextOpacity,
          transition: 'opacity 0.15s ease',
        }}>
          <span style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 14, letterSpacing: '0.28em', color: '#0a0a0a',
            display: 'inline-flex', alignItems: 'center', gap: 14,
            padding: '10px 22px',
            border: '1.5px solid #0a0a0a',
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          }}>
            <span style={{
              width: 8, height: 8, background: '#0a0a0a', display: 'inline-block',
              animation: 'overlay-pulse 0.5s ease-in-out infinite alternate',
            }} />
            {lang === 'es' ? '// CARGANDO_ÍNDICE //' : '// LOADING_INDEX //'}
          </span>
        </div>

        {/* Sheet corner labels */}
        <div style={{
          position: 'absolute', top: 24, left: 28,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11, letterSpacing: '0.16em', color: '#0a0a0a', opacity: 0.8,
        }}>
          ▢ BYANDRESFE · OS / {hashId}
        </div>
        <div style={{
          position: 'absolute', bottom: 24, right: 28,
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: 11, letterSpacing: '0.16em', color: '#0a0a0a', opacity: 0.8,
        }}>
          SWEEP · 0.98s · A
        </div>
      </div>
    </div>
  );
}
