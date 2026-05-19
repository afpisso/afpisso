// Menu — left-anchored overlay panel (~62% width) with cyberpunk geometric chrome.
// Glitch entry + hover scramble + page-number typewriter. Original copy/marks.

const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ── Scramble helper ────────────────────────────────────────────────────────
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
      (i / Math.max(1, chars.length - 1)) * duration * 0.7 + Math.random() * duration * 0.3
    );
    const start = () => {
      const t0 = performance.now();
      const tick = () => {
        const t = performance.now() - t0;
        const out = chars.map((c, i) => {
          if (c === ' ' || c === '\u00a0') return c;
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

// ── Typewriter (forward type & retract) ────────────────────────────────────
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

// ── Menu items (bilingual) ─────────────────────────────────────────────────
const MENU_ITEMS = [
  { en: 'WORK',    es: 'TRABAJO',  page: '001', sub_en: 'Selected projects, 2019—2026', sub_es: 'Proyectos selectos, 2019—2026' },
  { en: 'ABOUT',   es: 'SOBRE MÍ', page: '002', sub_en: 'Biography & process',          sub_es: 'Biografía y proceso' },
  { en: 'JOURNAL', es: 'DIARIO',   page: '003', sub_en: 'Notes, essays & experiments',  sub_es: 'Notas, ensayos y experimentos' },
  { en: 'CONTACT', es: 'CONTACTO', page: '004', sub_en: 'Inquiries & availability',     sub_es: 'Consultas y disponibilidad' },
];

const SOCIAL = [
  { label: 'LINKEDIN',  handle: 'in/byandresfe' },
  { label: 'INSTAGRAM', handle: '@byandresfe' },
  { label: 'X',         handle: '@byandresfe' },
];

// ── Glitch chromatic copy ──────────────────────────────────────────────────
function GlitchText({ children, active, color, accent }) {
  return (
    <span style={{ position: 'relative', display: 'inline-block' }}>
      {active && (
        <>
          <span aria-hidden style={{
            position: 'absolute', inset: 0, color: '#ff2d55',
            transform: 'translate(-3px, 1px)', mixBlendMode: 'screen',
            pointerEvents: 'none', whiteSpace: 'nowrap'
          }}>{children}</span>
          <span aria-hidden style={{
            position: 'absolute', inset: 0, color: '#00e0ff',
            transform: 'translate(3px, -1px)', mixBlendMode: 'screen',
            pointerEvents: 'none', whiteSpace: 'nowrap'
          }}>{children}</span>
        </>
      )}
      <span style={{ position: 'relative', color, whiteSpace: 'nowrap' }}>{children}</span>
    </span>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────
function Crosshair({ size = 26, color = '#fff', opacity = 1, style }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} style={{ opacity, ...style }}>
      <path d="M16 1v10M16 21v10M1 16h10M21 16h10" stroke={color} strokeWidth="1.4" fill="none"/>
      <circle cx="16" cy="16" r="2" fill={color}/>
    </svg>
  );
}

function AudioBars({ color = '#fff' }) {
  return (
    <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end', height: 14 }}>
      {[0,1,2,3].map(i => (
        <span key={i} style={{
          width: 2, background: color, opacity: 0.85,
          height: '100%',
          animation: `bars 1.1s ease-in-out ${i * 0.12}s infinite alternate`,
        }} />
      ))}
    </div>
  );
}

// Corner brackets — a single corner, rotated for the 4 corners of the panel
function CornerBrackets({ color, accent }) {
  const arm = 18; // px
  const t = 2;    // thickness
  const inset = 8; // px from edge
  const stroke = (top, left, right, bottom, useAccent) => ({
    position: 'absolute',
    width: arm, height: arm,
    [top != null ? 'top' : 'bottom']: inset,
    [left != null ? 'left' : 'right']: inset,
    borderTop:    top    != null ? `${t}px solid ${useAccent ? accent : color}` : 'none',
    borderLeft:   left   != null ? `${t}px solid ${useAccent ? accent : color}` : 'none',
    borderRight:  right  != null ? `${t}px solid ${useAccent ? accent : color}` : 'none',
    borderBottom: bottom != null ? `${t}px solid ${useAccent ? accent : color}` : 'none',
    pointerEvents: 'none',
  });
  return (
    <>
      <span style={stroke(0, 0, null, null, true)}  />
      <span style={stroke(0, null, 0, null, false)} />
      <span style={stroke(null, 0, null, 0, false)} />
      <span style={stroke(null, null, 0, 0, false)} />
    </>
  );
}

// ── Page tag — dynamic; reflects the currently active section ─────────────
function PageTag({ label, page, accent, fg, entered, animSpeed }) {
  const chamfer = 12;
  const clip = `polygon(0 0, calc(100% - ${chamfer}px) 0, 100% ${chamfer}px, 100% 100%, ${chamfer}px 100%, 0 calc(100% - ${chamfer}px))`;
  // Re-scramble whenever the label OR page changes (active section switch)
  const scrambleKey = `${label}-${page}`;
  const txt = useScramble(label, { duration: 420 / animSpeed, trigger: scrambleKey, delay: 0 });
  // re-mount with key so initial-entry transitions also run after section switch
  return (
    <div key={scrambleKey} style={{
      display: 'flex', alignItems: 'flex-end', gap: 22, marginBottom: 18,
      transform: entered ? 'translateX(0)' : 'translateX(-12px)',
      opacity: entered ? 1 : 0,
      transition: `transform ${0.5/animSpeed}s cubic-bezier(.2,.7,.2,1) ${0.1/animSpeed}s, opacity ${0.4/animSpeed}s ${0.1/animSpeed}s`,
    }}>
      <span style={{
        background: accent,
        color: '#0a0a0a',
        fontFamily: '"Bebas Neue", sans-serif',
        fontSize: 64, lineHeight: 0.9,
        padding: '6px 18px 8px',
        clipPath: clip,
        letterSpacing: '0.01em',
        whiteSpace: 'nowrap',
      }}>{entered ? txt : '\u00a0'}</span>
      <span style={{
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 11, letterSpacing: '0.12em',
        color: accent, opacity: 0.95, paddingBottom: 14,
      }}>
        PAGE<br/>{page}
      </span>
    </div>
  );
}

// ── MenuItem row ───────────────────────────────────────────────────────────
function MenuItem({ item, lang, idx, active, onClick, onHover, hoverStyle, accent, fg, bg, entered, entryDelay, anim, animSpeed, typeScale, itemRef }) {
  const [hover, setHover] = useState(false);
  const label = lang === 'es' ? item.es : item.en;
  const sub   = lang === 'es' ? item.sub_es : item.sub_en;

  const entryDur = 700 / animSpeed;
  const hoverDur = 380 / animSpeed;
  const entryScramble = useScramble(label, { duration: entryDur, trigger: entered ? 1 : 0, delay: entered ? entryDelay : 0 });
  const hoverScramble = useScramble(label, { duration: hoverDur, trigger: hover ? 2 : 0 });
  const display = !entered ? '' : (hover ? hoverScramble : entryScramble);

  const pageText = useTypewriter(`PAGE ${item.page}`, hover && entered, { speed: 22 / animSpeed });
  const subText  = useTypewriter(sub, hover && entered, { speed: 14 / animSpeed });

  const [glitching, setGlitching] = useState(false);
  useEffect(() => {
    if (!entered) return;
    const t1 = setTimeout(() => setGlitching(true), entryDelay);
    const t2 = setTimeout(() => setGlitching(false), entryDelay + 320 / animSpeed);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [entered, entryDelay, animSpeed]);

  const showHighlight = hover && (hoverStyle === 'block' || hoverStyle === 'block-scramble');
  const showUnderline = hover && hoverStyle === 'underline';
  const showShift     = hover && hoverStyle === 'shift';

  // Chamfered corner clip for highlight
  const chamfer = 16;
  const highlightClip = `polygon(0 0, calc(100% - ${chamfer}px) 0, 100% ${chamfer}px, 100% 100%, ${chamfer}px 100%, 0 calc(100% - ${chamfer}px))`;

  return (
    <div
      ref={itemRef}
      data-active={active ? '1' : '0'}
      onClick={onClick}
      onMouseEnter={() => { setHover(true); onHover && onHover(idx); }}
      onMouseLeave={() => setHover(false)}
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '2px 0',
        cursor: 'pointer',
        transform: showShift ? 'translateX(18px)' : 'translateX(0)',
        transition: `transform ${0.25/animSpeed}s cubic-bezier(.2,.7,.2,1)`,
      }}
    >
      {/* ACTIVE indicator — small accent square + extending line on the left edge */}
      <span aria-hidden style={{
        position: 'absolute',
        left: -36, top: '50%', transform: 'translateY(-50%)',
        display: 'flex', alignItems: 'center', gap: 4,
        opacity: active ? 1 : 0,
        transition: `opacity ${0.25/animSpeed}s`,
        pointerEvents: 'none',
      }}>
        <span style={{ width: 8, height: 8, background: accent, display: 'inline-block' }} />
        <span style={{ width: 18, height: 2, background: accent, display: 'inline-block' }} />
      </span>
      {/* Text wrapper — sizes to text so the highlight matches the word exactly */}
      <span style={{
        position: 'relative',
        display: 'inline-block',
        padding: '0.04em 0.18em 0.08em',
        lineHeight: 0.88,
      }}>
        {/* Sliding highlight, chamfered */}
        <span
          aria-hidden
          style={{
            position: 'absolute',
            inset: '0.06em -0.04em 0.06em 0',
            background: accent,
            transform: showHighlight ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left center',
            transition: `transform ${0.32/animSpeed}s cubic-bezier(.7,0,.2,1)`,
            clipPath: highlightClip,
            zIndex: 0,
          }}
        />
        <span
          style={{
            position: 'relative',
            zIndex: 1,
            fontFamily: '"Bebas Neue", "Anton", "Arial Narrow", sans-serif',
            fontSize: `${typeScale}px`,
            lineHeight: 0.88,
            letterSpacing: '0.005em',
            color: showHighlight ? '#0a0a0a' : fg,
            transition: `color ${0.18/animSpeed}s`,
            whiteSpace: 'nowrap',
            display: 'inline-block',
          }}
        >
          <GlitchText active={glitching && entered} color={showHighlight ? '#0a0a0a' : fg} accent={accent}>
            {display || '\u00a0'}
          </GlitchText>
        </span>

        {showUnderline && (
          <span aria-hidden style={{
            position: 'absolute', left: '0.18em', right: '0.04em', bottom: '0.08em',
            height: 4, background: accent,
            transformOrigin: 'left',
            animation: `menu-underline ${0.3/animSpeed}s cubic-bezier(.7,0,.2,1) forwards`,
          }} />
        )}
      </span>

      {/* Right side: PAGE 00X (persistent in accent when active, typewriter on hover) + sub-label */}
      <span style={{
        position: 'relative', zIndex: 1, marginLeft: 'auto',
        fontFamily: '"JetBrains Mono", ui-monospace, monospace',
        fontSize: 11, letterSpacing: '0.08em',
        color: fg,
        opacity: (hover || active) ? 1 : 0.35,
        transition: `opacity ${0.2/animSpeed}s`,
        display: 'flex', flexDirection: 'column', alignItems: 'flex-end',
        gap: 4, textAlign: 'right', minWidth: 160,
        paddingTop: 2,
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
        <span style={{ opacity: 0.55, fontSize: 10, maxWidth: 220, textWrap: 'pretty' }}>
          {subText}
        </span>
      </span>
    </div>
  );
}

// ── Section row with label rail on the left ───────────────────────────────
function SectionRow({ label, children, rule, fg, accent, padding = '18px 0', last = false }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '140px 1fr',
      borderTop: `1px solid ${rule}`,
      alignItems: 'stretch',
    }}>
      <div style={{
        padding: '18px 24px',
        borderRight: `1px solid ${rule}`,
        display: 'flex', alignItems: 'center', gap: 10,
        fontSize: 11, letterSpacing: '0.14em',
      }}>
        <span style={{ width: 6, height: 6, background: accent, display: 'inline-block' }} />
        {label}
      </div>
      <div style={{ padding, display: 'flex', alignItems: 'center' }}>
        {children}
      </div>
    </div>
  );
}

// ── Main Menu ──────────────────────────────────────────────────────────────
function Menu({
  open = true,
  inverted = false,
  accent = '#ff2540',
  lang = 'en',
  setLang,
  hoverStyle = 'block',
  entryAnim = 'glitch',
  animSpeed = 1,
  typeScale = 132,
  onClose,
  scope = 'A',
  width = '64%',
  activeSection = 'WORK',     // which menu item is "current" (by .en label)
}) {
  const fg = inverted ? '#0a0a0a' : '#f5f5f3';
  const bg = inverted ? '#f5f1e8' : '#0a0a0a';
  const dim = inverted ? 'rgba(10,10,10,0.55)' : 'rgba(245,245,243,0.55)';
  const rule = inverted ? 'rgba(10,10,10,0.16)' : 'rgba(255,255,255,0.11)';

  // active section index — initialized from prop, then user can click to change locally
  const activeIdxFromProp = Math.max(0, MENU_ITEMS.findIndex(it => it.en === activeSection));
  const [activeIdx, setActiveIdx] = useState(activeIdxFromProp);
  useEffect(() => { setActiveIdx(activeIdxFromProp); }, [activeIdxFromProp]);

  const activeItem = MENU_ITEMS[activeIdx] || MENU_ITEMS[0];
  const activeLabel = lang === 'es' ? activeItem.es : activeItem.en;
  const activePage = activeItem.page;

  const [entered, setEntered] = useState(false);
  useEffect(() => {
    if (!open) { setEntered(false); return; }
    setEntered(false);
    const id = setTimeout(() => setEntered(true), 30);
    return () => clearTimeout(id);
  }, [open]);

  const [clock, setClock] = useState(() => new Date());
  useEffect(() => {
    const id = setInterval(() => setClock(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  const hhmm = clock.toTimeString().slice(0, 5);

  const sessionId = useMemo(() =>
    Array.from({ length: 6 }, () => SCRAMBLE_CHARS[(Math.random() * 26) | 0]).join('')
  , [scope]);

  // Cyberpunk geometric panel clip — chamfer top-right, notch-step bottom-right
  const panelClip = `polygon(
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

  const entryStyle = useMemo(() => {
    if (entryAnim === 'curtain-v') {
      return {
        transform: entered ? 'translateY(0%)' : 'translateY(-100%)',
        transition: `transform ${0.55/animSpeed}s cubic-bezier(.7,0,.2,1)`,
      };
    }
    if (entryAnim === 'curtain-h') {
      return {
        transform: entered ? 'translateX(0%)' : 'translateX(-100%)',
        transition: `transform ${0.55/animSpeed}s cubic-bezier(.7,0,.2,1)`,
      };
    }
    if (entryAnim === 'mask') {
      return {
        clipPath: entered ? 'inset(0 0 0 0)' : 'inset(50% 0 50% 0)',
        transition: `clip-path ${0.6/animSpeed}s cubic-bezier(.7,0,.2,1)`,
      };
    }
    return {
      opacity: entered ? 1 : 0,
      animation: entered ? `panel-glitch-${scope} ${0.45/animSpeed}s steps(8,end) 1` : 'none',
    };
  }, [entered, entryAnim, animSpeed, scope]);

  const t = lang === 'es'
    ? { connect: 'CONECTA', contact: 'CONTACTO', lang: 'IDIOMA', closing: 'AFPISSO · BOGOTÁ → MUNDO', year: '© 2026 AFPISSO. TODOS LOS DERECHOS RESERVADOS.', live: 'EN DIRECTO' }
    : { connect: 'CONNECT', contact: 'CONTACT',  lang: 'LANGUAGE', closing: 'AFPISSO · BOGOTÁ → WORLD', year: '© 2026 AFPISSO. ALL RIGHTS RESERVED.',           live: 'LIVE' };

  return (
    <div style={{
      position: 'absolute',
      left: 0, top: 0, bottom: 0,
      width,
      background: bg,
      color: fg,
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
      overflow: 'hidden',
      isolation: 'isolate',
      clipPath: panelClip,
    }}>
      <style>{`
        @keyframes panel-glitch-${scope} {
          0%   { transform: translate(0,0); filter: none; }
          20%  { transform: translate(-6px,2px); filter: hue-rotate(20deg); }
          35%  { transform: translate(5px,-3px); filter: invert(0.08); }
          50%  { transform: translate(-3px,1px); }
          70%  { transform: translate(2px,0); }
          100% { transform: translate(0,0); filter: none; }
        }
        @keyframes bars {
          0%   { transform: scaleY(0.3); }
          100% { transform: scaleY(1); }
        }
        @keyframes scan-${scope} {
          0%   { transform: translateY(-100%); }
          100% { transform: translateY(110%); }
        }
        @keyframes menu-underline {
          from { transform: scaleX(0); }
          to   { transform: scaleX(1); }
        }
      `}</style>

      {/* Scanline overlay during glitch entry */}
      {entered && entryAnim === 'glitch' && (
        <div aria-hidden style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 20,
          background: `linear-gradient(180deg, transparent 0%, ${accent}1f 50%, transparent 100%)`,
          height: '30%',
          animation: `scan-${scope} ${0.7/animSpeed}s linear 1`,
        }} />
      )}

      {/* Corner brackets — TR/BL accent, others fg */}
      <CornerBrackets color={fg} accent={accent} />

      {/* Content wrapper takes entry transform */}
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column',
        ...entryStyle,
      }}>

        {/* TOP HEADER */}
        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          padding: '20px 28px',
          fontSize: 11, letterSpacing: '0.12em',
        }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 8, height: 8, background: accent, display: 'inline-block' }} />
            {sessionId} · NODE.{hhmm.replace(':','')}
          </span>
          <span style={{ opacity: 0.5, display: 'flex', alignItems: 'center', gap: 8 }}>
            AFPISSO
            <span style={{ opacity: 0.45 }}>/</span>
            {lang === 'es' ? 'ACTIVA' : 'NOW'}
            <span style={{ color: accent, opacity: 1 }}>· {activeLabel}</span>
            <span style={{ opacity: 0.45 }}>· IDX {hhmm}</span>
          </span>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              width: 36, height: 36, border: `1.5px solid ${fg}`,
              background: 'transparent', color: fg, cursor: 'pointer',
              display: 'grid', placeItems: 'center',
              clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
            }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14"><path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6"/></svg>
          </button>
        </div>

        {/* MAIN — index section */}
        <div style={{
          flex: 1, minHeight: 0,
          display: 'grid', gridTemplateColumns: '140px 1fr 80px',
          borderTop: `1px solid ${rule}`,
        }}>
          {/* Left rail */}
          <div style={{
            borderRight: `1px solid ${rule}`,
            padding: '22px 24px',
            display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
            fontSize: 11, letterSpacing: '0.14em',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 6, height: 6, background: accent }} />
              {lang === 'es' ? 'ÍNDICE' : 'INDEX'}
            </div>
            <div style={{ opacity: 0.55, lineHeight: 1.7, fontSize: 10 }}>
              {lang === 'es'
                ? <>04<br/>SECCIONES</>
                : <>04<br/>SECTIONS</>}
            </div>
          </div>

          {/* Center column — page tag + menu items */}
          <div style={{
            padding: '28px 36px 24px',
            display: 'flex', flexDirection: 'column', justifyContent: 'flex-start',
            minWidth: 0,
          }}>
            <PageTag label={activeLabel} page={activePage} accent={accent} fg={fg} entered={entered} animSpeed={animSpeed} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {MENU_ITEMS.map((item, i) => (
                <MenuItem
                  key={`${scope}-${i}-${lang}-${entered}`}
                  item={item}
                  lang={lang}
                  idx={i}
                  active={i === activeIdx}
                  onClick={() => setActiveIdx(i)}
                  hoverStyle={hoverStyle}
                  accent={accent}
                  fg={fg}
                  bg={bg}
                  entered={entered}
                  entryDelay={i * (90 / animSpeed) + 250}
                  anim={entryAnim}
                  animSpeed={animSpeed}
                  typeScale={typeScale}
                />
              ))}
            </div>
          </div>

          {/* Right rail */}
          <div style={{
            borderLeft: `1px solid ${rule}`,
            padding: '20px 0',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div style={{
              fontFamily: '"JetBrains Mono", monospace', fontSize: 10,
              letterSpacing: '0.1em', writingMode: 'vertical-rl',
              transform: 'rotate(180deg)', opacity: 0.55,
            }}>
              v.2.6 / BUILD {sessionId.slice(0,4)}
            </div>
            <Crosshair color={fg} size={26} opacity={0.85} />
            <div style={{ opacity: 0.5, fontSize: 10, letterSpacing: '0.12em' }}>
              ◆
            </div>
          </div>
        </div>

        {/* CONNECT row */}
        <SectionRow label={t.connect} rule={rule} fg={fg} accent={accent}>
          <div style={{ display: 'flex', gap: 32, padding: '0 24px', flexWrap: 'wrap', fontSize: 13, letterSpacing: '0.06em' }}>
            {SOCIAL.map(s => (
              <a key={s.label} href="#" onClick={e => e.preventDefault()}
                style={{ color: fg, textDecoration: 'none', display: 'flex', gap: 10, alignItems: 'baseline' }}
                onMouseEnter={e => { e.currentTarget.style.color = accent; }}
                onMouseLeave={e => { e.currentTarget.style.color = fg; }}
              >
                <span>{s.label}</span>
                <span style={{ opacity: 0.45, fontSize: 11 }}>↗ {s.handle}</span>
              </a>
            ))}
          </div>
        </SectionRow>

        {/* CONTACT row */}
        <SectionRow label={t.contact} rule={rule} fg={fg} accent={accent}>
          <a href="mailto:hola@afpisso.com" onClick={e => e.preventDefault()}
            style={{
              padding: '0 24px', color: fg, textDecoration: 'none',
              fontSize: 13, letterSpacing: '0.06em',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = accent; }}
            onMouseLeave={e => { e.currentTarget.style.color = fg; }}
          >
            HOLA@AFPISSO.COM <span style={{ opacity: 0.45, marginLeft: 10 }}>↗ {lang === 'es' ? 'ESCRÍBEME' : 'WRITE'}</span>
          </a>
        </SectionRow>

        {/* FOOTER — language + © + bars */}
        <div style={{
          display: 'grid', gridTemplateColumns: '140px 1fr 1fr 1fr',
          borderTop: `1px solid ${rule}`,
          fontSize: 11, letterSpacing: '0.1em',
        }}>
          <div style={{
            padding: '14px 24px',
            borderRight: `1px solid ${rule}`,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <button onClick={() => setLang('en')}
              style={{
                border: 'none', background: 'transparent', cursor: 'pointer',
                color: lang === 'en' ? accent : fg,
                opacity: lang === 'en' ? 1 : 0.5,
                fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', padding: 0,
              }}>EN</button>
            <span style={{ opacity: 0.3 }}>/</span>
            <button onClick={() => setLang('es')}
              style={{
                border: 'none', background: 'transparent', cursor: 'pointer',
                color: lang === 'es' ? accent : fg,
                opacity: lang === 'es' ? 1 : 0.5,
                fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', padding: 0,
              }}>ES</button>
          </div>
          <div style={{ padding: '14px 24px', opacity: 0.55 }}>
            {t.year}
          </div>
          <div style={{ padding: '14px 24px', opacity: 0.7, textAlign: 'center' }}>
            {t.closing}
          </div>
          <div style={{ padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 10, justifyContent: 'flex-end', opacity: 0.7 }}>
            <AudioBars color={fg} />
            <span>{t.live}</span>
          </div>
        </div>

      </div>
    </div>
  );
}

window.Menu = Menu;

// ── MenuOverlay — staged opening sequence ─────────────────────────────────
// Wraps a site background + the Menu panel. When `open` flips true, runs:
//   stage 1 (≈0—120ms):  backdrop blur + dim ramps in
//   stage 2 (≈120—440ms): red sheet sweeps in from the right (clip-path)
//   stage 3 (≈440—620ms): sheet holds full-screen with "// LOADING //" overlay,
//                          menu becomes visible underneath
//   stage 4 (≈620—980ms): sheet exits to the left, revealing the menu
//   stage 5: settled, menu fully visible. On close: reverses in fast-forward.
function MenuOverlay({ open, scope, accent, children, menuProps, animSpeed = 1, inverted = false, lang = 'en' }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (!open) {
      // close sequence: red sheet sweeps in from left to cover, then drops out
      setStage(6);
      const c1 = setTimeout(() => setStage(7), 320 / animSpeed); // sheet covers
      const c2 = setTimeout(() => setStage(0), 600 / animSpeed); // closed
      return () => { clearTimeout(c1); clearTimeout(c2); };
    }
    setStage(1);
    const t1 = setTimeout(() => setStage(2), 120 / animSpeed);
    const t2 = setTimeout(() => setStage(3), 440 / animSpeed);
    const t3 = setTimeout(() => setStage(4), 620 / animSpeed);
    const t4 = setTimeout(() => setStage(5), 980 / animSpeed);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, [open, animSpeed]);

  // Background blur + dim active any time the overlay is showing
  const bgVisible = stage >= 1 && stage <= 6;
  const bgFilter = bgVisible ? 'blur(10px) brightness(0.5) saturate(0.7)' : 'none';

  // Red sheet clip-path per stage:
  // stage 1: still hidden right         → inset(0 0 0 100%)
  // stage 2: sweeping in (animates to)  → inset(0 0 0 0)
  // stage 3: full hold                  → inset(0 0 0 0)
  // stage 4: sweeping out left          → inset(0 100% 0 0)
  // stage 5: gone                       → inset(0 100% 0 0)
  // stage 6: close-sweep, comes in left → inset(0 0 0 0)
  // stage 7: drop offscreen right       → inset(0 0 0 100%)
  let sheetClip = 'inset(0 0 0 100%)';
  if (stage === 2 || stage === 3) sheetClip = 'inset(0 0 0 0)';
  if (stage === 4 || stage === 5) sheetClip = 'inset(0 100% 0 0)';
  if (stage === 6)                sheetClip = 'inset(0 0 0 0)';
  if (stage === 7)                sheetClip = 'inset(0 0 0 100%)';

  // The sheet only needs a transition during the sweep stages; instantly snap on hidden states
  const sheetTransition = `clip-path ${0.34/animSpeed}s cubic-bezier(.76,0,.2,1)`;

  // Menu is open from stage 3 onward (until stage 6 starts close)
  const menuOpen = stage >= 3 && stage <= 5;

  // Lighten the centered loading text after exit starts
  const sheetTextOpacity = stage === 3 ? 1 : 0;

  if (stage === 0) {
    // Closed state — just show the bg, no overlay
    return <div style={{position:'absolute', inset:0, overflow:'hidden'}}>{children}</div>;
  }

  return (
    <div style={{position:'absolute', inset:0, overflow:'hidden'}}>
      {/* Site background — blurred while menu is opening/open */}
      <div style={{
        position:'absolute', inset:0,
        filter: bgFilter,
        transition: `filter ${0.45/animSpeed}s ease`,
        transformOrigin: 'center',
        // Slight zoom while open, for a parallax feel
        transform: bgVisible ? 'scale(1.04)' : 'scale(1)',
        transitionProperty: 'filter, transform',
      }}>
        {children}
      </div>

      {/* Dim layer over the background */}
      <div aria-hidden style={{
        position:'absolute', inset:0,
        background: inverted ? 'rgba(245,245,243,0.35)' : 'rgba(0,0,0,0.45)',
        opacity: bgVisible ? 1 : 0,
        transition: `opacity ${0.35/animSpeed}s ease`,
        pointerEvents:'none',
        zIndex: 2,
      }} />

      {/* Menu (revealed once the red sheet is full-coverage) */}
      <div style={{
        position:'absolute', inset:0,
        opacity: menuOpen ? 1 : 0,
        transition: `opacity ${0.18/animSpeed}s ease`,
        zIndex: 4,
      }}>
        <Menu {...menuProps} open={menuOpen} scope={scope} accent={accent} />
      </div>

      {/* Red sheet (sweep wipe) — on top of everything during transition */}
      <div aria-hidden style={{
        position:'absolute', inset:0,
        background: accent,
        clipPath: sheetClip,
        transition: sheetTransition,
        zIndex: 8,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}>
        {/* Sheet decoration — repeated wordmark, very faint */}
        <div style={{
          position:'absolute', inset:0,
          display: 'flex', flexDirection: 'column', justifyContent: 'space-around',
          fontFamily: '"Bebas Neue", sans-serif',
          color: '#0a0a0a', opacity: 0.1,
          fontSize: 240, letterSpacing: '0.04em',
          lineHeight: 0.85,
          whiteSpace: 'nowrap', overflow: 'hidden',
          paddingLeft: 20,
        }}>
          <span>AFPISSO·AFPISSO·AFPISSO</span>
          <span style={{ alignSelf: 'flex-end' }}>·AFPISSO·AFPISSO</span>
          <span>AFPISSO·AFPISSO·AFPISSO</span>
        </div>
        {/* Center "loading" line + corner chips on the sheet */}
        <div style={{
          position:'absolute', inset:0,
          display:'grid', placeItems:'center',
          opacity: sheetTextOpacity,
          transition: `opacity ${0.15/animSpeed}s ease`,
        }}>
          <span style={{
            fontFamily:'"JetBrains Mono", monospace',
            fontSize: 14, letterSpacing: '0.28em',
            color: '#0a0a0a',
            display: 'inline-flex', alignItems: 'center', gap: 14,
            padding: '10px 22px',
            border: '1.5px solid #0a0a0a',
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          }}>
            <span style={{ width: 8, height: 8, background: '#0a0a0a', animation: 'overlay-pulse 0.5s ease-in-out infinite alternate' }}/>
            {lang === 'es' ? '// CARGANDO_ÍNDICE //' : '// LOADING_INDEX //'}
          </span>
        </div>
        {/* Top-left and bottom-right meta on the sheet */}
        <div style={{
          position:'absolute', top: 24, left: 28, color: '#0a0a0a',
          fontFamily:'"JetBrains Mono", monospace', fontSize: 11,
          letterSpacing: '0.16em', opacity: 0.8,
        }}>▢ AFPISSO · OS / {Date.now().toString(36).slice(-6).toUpperCase()}</div>
        <div style={{
          position:'absolute', bottom: 24, right: 28, color: '#0a0a0a',
          fontFamily:'"JetBrains Mono", monospace', fontSize: 11,
          letterSpacing: '0.16em', opacity: 0.8,
        }}>SWEEP · 0.98s · {scope}</div>
        <style>{`@keyframes overlay-pulse { from { opacity: 0.3; } to { opacity: 1; } }`}</style>
      </div>
    </div>
  );
}

window.MenuOverlay = MenuOverlay;
