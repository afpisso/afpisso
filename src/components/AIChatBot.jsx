import { useState, useRef, useEffect, useCallback } from 'react';
import { m, AnimatePresence, useAnimation, useMotionValue } from 'framer-motion';
import { useLang } from '../contexts/LangContext';

// ─── i18n ─────────────────────────────────────────────────────────────────────
const STRINGS = {
  en: {
    title: 'PixBot',
    subtitle: 'Portfolio AI · byandresfe.com',
    placeholder: 'Ask me anything about Andres…',
    send: 'Send',
    welcome: "Hey! I'm PixBot — the AI living inside this portfolio. I know Andres's work inside out. Got questions about what he's built, how he works, or whether he's available? Ask away.",
    error: "Something went wrong on my end. For anything important, reach Andres directly at afpisso@gmail.com — he responds fast.",
    disclaimer: 'AI-generated · verify details directly with Andrés',
    chips: [
      'What has he shipped in VR?',
      'Is he available right now?',
      'Show me his best work',
    ],
    tooltipLabel: 'Chat with PixBot',
  },
  es: {
    title: 'PixBot',
    subtitle: 'IA del portafolio · byandresfe.com',
    placeholder: 'Pregúntame lo que quieras sobre Andrés…',
    send: 'Enviar',
    welcome: '¡Hola! Soy PixBot — la IA que vive dentro de este portafolio. Conozco el trabajo de Andrés al detalle. ¿Tienes preguntas sobre lo que ha construido, cómo trabaja o si está disponible? Adelante.',
    error: 'Algo salió mal de mi lado. Para cualquier cosa importante, escríbele directamente a Andrés — afpisso@gmail.com. Responde rápido.',
    disclaimer: 'Generado por IA · verifica detalles directamente con Andrés',
    chips: [
      '¿Qué ha hecho en VR?',
      '¿Está disponible ahora?',
      'Su mejor trabajo',
    ],
    tooltipLabel: 'Habla con PixBot',
  },
};

// ─── Kowalski tooltip delay: 400ms first hover, instant if re-hovered < 600ms ─
function useTooltipDelay() {
  const [visible, setVisible] = useState(false);
  const lastHideTime = useRef(null);
  const showTimer = useRef(null);
  const show = useCallback(() => {
    const instant = lastHideTime.current && Date.now() - lastHideTime.current < 600;
    if (instant) { setVisible(true); }
    else { showTimer.current = setTimeout(() => setVisible(true), 400); }
  }, []);
  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    lastHideTime.current = Date.now();
    setVisible(false);
  }, []);
  return { visible, show, hide };
}

// ─── Tooltip: instant position (no spring), only opacity animates ──────────────
function MouseTooltip({ visible, label }) {
  const x = useMotionValue(-999);
  const y = useMotionValue(-999);
  useEffect(() => {
    function onMove(e) { x.set(e.clientX); y.set(e.clientY); }
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, [x, y]);
  return (
    <AnimatePresence>
      {visible && (
        <m.span
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 0.12, ease: 'easeOut' }}
          style={{
            position: 'fixed', top: 0, left: 0, x, y,
            translateX: '-50%', translateY: 'calc(-100% - 12px)',
            pointerEvents: 'none', zIndex: 9999, whiteSpace: 'nowrap',
            fontFamily: '"Play", sans-serif', fontSize: '9px', fontWeight: 700,
            letterSpacing: '0.14em', textTransform: 'uppercase',
            color: 'var(--color-fg)', backgroundColor: 'rgba(8,8,8,0.95)',
            border: '1px solid rgba(255,37,64,0.45)', padding: '5px 10px',
            boxShadow: '0 0 12px rgba(255,37,64,0.12), 0 4px 10px rgba(0,0,0,0.5)',
          }}
        >
          <span style={{
            position: 'absolute', left: 0, top: 0, bottom: 0,
            width: 2, backgroundColor: 'var(--color-accent)',
          }} />
          {label}
        </m.span>
      )}
    </AnimatePresence>
  );
}

// ─── Pixel-art orb trigger ─────────────────────────────────────────────────────
function OrbTrigger({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const tooltip = useTooltipDelay();
  const { lang } = useLang();
  const label = (STRINGS[lang] ?? STRINGS.en).tooltipLabel;
  const eyeControls = [useAnimation(), useAnimation()];
  const SIZE = 34;
  const EYE_W = 4, EYE_H = 6, EYE_GAP = 5;

  useEffect(() => {
    eyeControls.forEach((ctrl, i) => {
      ctrl.stop();
      if (hovered) {
        ctrl.start({
          scaleY: [1, 0.1, 1],
          transition: { duration: 0.22, repeat: Infinity, repeatDelay: 1.1, delay: i * 0.06, ease: 'easeInOut' },
        });
      } else {
        ctrl.set({ scaleY: 1, opacity: 1 });
        ctrl.start({
          opacity: [1, 0.65, 1],
          transition: { duration: 2.4, repeat: Infinity, delay: i * 0.2, ease: 'easeInOut' },
        });
      }
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered]);

  return (
    <>
      <MouseTooltip visible={tooltip.visible} label={label} />
      <m.div
        style={{
          position: 'fixed', bottom: 28, right: 28, zIndex: 9000,
          width: SIZE, height: SIZE + 8,
          display: 'flex', flexDirection: 'column', alignItems: 'center',
        }}
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
      >
        <m.span
          style={{
            position: 'absolute', top: -3, left: -3,
            width: SIZE + 6, height: SIZE + 6,
            border: '1px solid rgba(255,37,64,0.2)',
            borderRadius: 2, pointerEvents: 'none',
          }}
          animate={{ scale: [1, 1.28, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
        />
        <m.button
          onClick={onClick}
          onHoverStart={() => { setHovered(true); tooltip.show(); }}
          onHoverEnd={() => { setHovered(false); tooltip.hide(); }}
          whileTap={{ scale: 0.94 }}
          style={{
            width: SIZE, height: SIZE, borderRadius: 2,
            border: 'none', cursor: 'pointer', background: 'none', padding: 0,
            position: 'relative', flexShrink: 0,
          }}
          aria-label="Open AI assistant"
        >
          <m.span
            style={{
              position: 'absolute', inset: 0, borderRadius: 2,
              backgroundColor: '#0e0608',
              border: `2px solid ${hovered ? '#ff2540' : 'rgba(255,37,64,0.6)'}`,
              backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.18) 2px, rgba(0,0,0,0.18) 3px)',
            }}
            animate={{
              boxShadow: hovered
                ? '0 0 10px rgba(255,37,64,0.55), inset 0 0 6px rgba(255,37,64,0.08)'
                : '0 0 6px rgba(255,37,64,0.2)',
            }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
          />
          <m.span
            style={{
              position: 'absolute', inset: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: 3,
            }}
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span style={{ display: 'flex', gap: EYE_GAP, alignItems: 'center' }}>
              {[0, 1].map(i => (
                <m.span key={i} animate={eyeControls[i]} style={{
                  width: EYE_W, height: EYE_H, borderRadius: 0,
                  backgroundColor: '#ffffff', display: 'block', imageRendering: 'pixelated',
                }} />
              ))}
            </span>
          </m.span>
        </m.button>
        <m.span
          style={{
            width: SIZE * 0.55, height: 4, borderRadius: '50%',
            backgroundColor: 'rgba(255,37,64,0.18)', filter: 'blur(3px)',
            marginTop: 2, flexShrink: 0,
          }}
          animate={{ scaleX: [1, 0.6, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
      </m.div>
    </>
  );
}

// ─── Typing indicator ──────────────────────────────────────────────────────────
function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', padding: '3px 0' }}>
      {[0, 1, 2].map(i => (
        <m.span key={i}
          style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--color-accent)', display: 'inline-block' }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </span>
  );
}

// ─── Markdown link parser → React elements ─────────────────────────────────────
function renderContent(text) {
  const result = [];
  let last = 0;
  const linkRe = /\[([^\]]+)\]\(([^)]+)\)/g;
  let match;
  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > last) {
      result.push(...splitLines(text.slice(last, match.index), `t${last}`));
    }
    const href = match[2];
    const isInternal = href.startsWith('/');
    result.push(
      <a
        key={`a${match.index}`}
        href={href}
        {...(isInternal ? {} : { target: '_blank', rel: 'noopener noreferrer' })}
        style={{
          color: 'var(--color-accent)',
          textDecoration: 'underline',
          textDecorationColor: 'rgba(255,37,64,0.4)',
          textUnderlineOffset: '3px',
        }}
      >
        {match[1]}
      </a>
    );
    last = match.index + match[0].length;
  }
  if (last < text.length) result.push(...splitLines(text.slice(last), `t${last}`));
  return result;
}

function splitLines(text, keyPrefix) {
  return text.split('\n').flatMap((line, i, arr) =>
    i < arr.length - 1 ? [line, <br key={`${keyPrefix}-br${i}`} />] : [line]
  );
}

// ─── Word-reveal for new AI messages ──────────────────────────────────────────
function AnimatedText({ text, active }) {
  const [count, setCount] = useState(active ? 0 : Infinity);
  const words = text.split(' ');

  useEffect(() => {
    if (!active) { setCount(Infinity); return; }
    setCount(0);
    let i = 0;
    const speed = text.length > 300 ? 18 : 26;
    const id = setInterval(() => {
      i++;
      setCount(i);
      if (i >= words.length) clearInterval(id);
    }, speed);
    return () => clearInterval(id);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, active]);

  const shown = count >= words.length ? text : words.slice(0, count).join(' ');
  return <>{renderContent(shown)}</>;
}

// ─── Message bubble ────────────────────────────────────────────────────────────
function Message({ msg, isLast, loading, animate: shouldAnimate }) {
  const isUser = msg.role === 'user';
  return (
    <m.div
      style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
    >
      <div style={{
        maxWidth: '88%',
        padding: isUser ? '8px 12px' : '10px 14px',
        fontFamily: '"Play", sans-serif',
        fontSize: '12px',
        lineHeight: 1.75,
        letterSpacing: '0.02em',
        ...(isUser ? {
          background: 'rgba(255,37,64,0.1)',
          border: '1px solid rgba(255,37,64,0.22)',
          color: 'rgba(240,238,234,0.9)',
          clipPath: 'polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)',
        } : {
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
          borderLeft: '2px solid rgba(255,37,64,0.35)',
          color: 'rgba(240,238,234,0.82)',
        }),
      }}>
        {loading && isLast && !msg.content
          ? <TypingDots />
          : <AnimatedText text={msg.content} active={shouldAnimate && !isUser && isLast} />
        }
      </div>
    </m.div>
  );
}

// ─── Quick-reply chips ─────────────────────────────────────────────────────────
function Chips({ chips, onSend }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1] }}
      style={{ display: 'flex', flexWrap: 'wrap', gap: 6, padding: '0 16px 12px' }}
    >
      {chips.map((chip) => (
        <m.button
          key={chip}
          onClick={() => onSend(chip)}
          whileHover={{ scale: 1.02, borderColor: 'rgba(255,37,64,0.55)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            background: 'rgba(255,37,64,0.06)',
            border: '1px solid rgba(255,37,64,0.22)',
            color: 'rgba(240,238,234,0.65)',
            fontFamily: '"Play", sans-serif',
            fontSize: '10px',
            letterSpacing: '0.08em',
            padding: '5px 10px',
            cursor: 'pointer',
            transition: 'color 0.15s',
            clipPath: 'polygon(5px 0%,100% 0%,100% calc(100% - 5px),calc(100% - 5px) 100%,0% 100%,0% 5px)',
          }}
          onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,238,234,0.9)'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,234,0.65)'}
        >
          {chip}
        </m.button>
      ))}
    </m.div>
  );
}

// ─── Panel ─────────────────────────────────────────────────────────────────────
const CORNER = 14;
const clipOuter = `polygon(${CORNER}px 0%,100% 0%,100% calc(100% - ${CORNER}px),calc(100% - ${CORNER}px) 100%,0% 100%,0% ${CORNER}px)`;
const clipInner = `polygon(${CORNER - 1}px 0%,100% 0%,100% calc(100% - ${CORNER - 1}px),calc(100% - ${CORNER - 1}px) 100%,0% 100%,0% ${CORNER - 1}px)`;

export default function AIChatBot() {
  const { lang } = useLang();
  const s = STRINGS[lang] ?? STRINGS.en;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', content: s.welcome }]);
  const [loading, setLoading] = useState(false);
  const [revealKey, setRevealKey] = useState(0); // increments on each new AI reply
  const bottomRef = useRef(null);
  const inputRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 350);
  }, [open]);

  useEffect(() => {
    setMessages(prev => {
      if (prev.length === 1 && prev[0].role === 'assistant') {
        return [{ role: 'assistant', content: STRINGS[lang]?.welcome ?? STRINGS.en.welcome }];
      }
      return prev;
    });
  }, [lang]);

  async function send(text) {
    const trimmed = (text ?? input).trim();
    if (!trimmed || loading) return;

    const userMsg = { role: 'user', content: trimmed };
    const nextMessages = [...messages, userMsg];
    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    setInput('');
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
    setLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });
      const data = await res.json();
      if (!res.ok || data.error) throw new Error(data.error || s.error);
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: data.text };
        return updated;
      });
      setRevealKey(k => k + 1);
    } catch {
      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: s.error };
        return updated;
      });
    } finally {
      setLoading(false);
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send(); }
  }

  const canSend = input.trim().length > 0 && !loading;
  const showChips = messages.length <= 1 && !loading;

  return (
    <>
      <AnimatePresence>
        {!open && <OrbTrigger key="orb" onClick={() => setOpen(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <>
          {/* Click-outside dismiss — transparent, no visual overlay */}
          <m.div
            key="backdrop"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={() => setOpen(false)}
            style={{ position: 'fixed', inset: 0, zIndex: 8999, cursor: 'default' }}
          />
          <m.div
            key="panel"
            initial={{ opacity: 0, y: 28, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: 'spring', stiffness: 420, damping: 36, mass: 0.8 }}
            style={{
              position: 'fixed', bottom: 24, right: 24, zIndex: 9000,
              width: 'min(400px, calc(100vw - 32px))',
              height: 'min(540px, calc(100dvh - 80px))',
              filter: 'drop-shadow(0 28px 48px rgba(0,0,0,0.65)) drop-shadow(0 0 32px rgba(255,37,64,0.06))',
              transformOrigin: 'bottom right',
            }}
          >
            {/* Cut-corner border layer */}
            <div style={{
              width: '100%', height: '100%',
              clipPath: clipOuter,
              background: 'rgba(255,37,64,0.28)',
              padding: 1,
              display: 'flex', flexDirection: 'column',
            }}>
              {/* Glass inner */}
              <div style={{
                flex: 1,
                clipPath: clipInner,
                background: 'rgba(9,7,9,0.78)',
                backdropFilter: 'blur(28px) saturate(140%)',
                display: 'flex', flexDirection: 'column',
                overflow: 'hidden',
              }}>

                {/* Accent top bar — reveal left to right */}
                <m.div
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                  transition={{ duration: 0.38, ease: [0.32, 0.72, 0, 1], delay: 0.08 }}
                  style={{ height: 2, backgroundColor: 'var(--color-accent)', flexShrink: 0, transformOrigin: 'left' }}
                />

                {/* Header */}
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '11px 16px',
                  borderBottom: '1px solid rgba(255,255,255,0.05)',
                  flexShrink: 0, gap: 10,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {/* Status dot */}
                    <m.span
                      style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: 'var(--color-accent)', flexShrink: 0 }}
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    />
                    <div>
                      <div style={{
                        fontFamily: '"Play", sans-serif', fontSize: '10px',
                        fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase',
                        color: 'var(--color-fg)',
                      }}>
                        {s.title}
                      </div>
                      <div style={{
                        fontFamily: '"Play", sans-serif', fontSize: '8.5px',
                        letterSpacing: '0.1em', textTransform: 'uppercase',
                        color: 'rgba(255,37,64,0.55)', marginTop: 1,
                      }}>
                        {s.subtitle}
                      </div>
                    </div>
                  </div>

                  <m.button
                    onClick={() => setOpen(false)}
                    whileTap={{ scale: 0.9 }}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      color: 'rgba(240,238,234,0.3)', padding: 4, lineHeight: 1,
                      fontSize: 18, fontFamily: 'monospace', transition: 'color 0.15s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.color = 'rgba(240,238,234,0.8)'}
                    onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,234,0.3)'}
                    aria-label="Close"
                  >
                    ×
                  </m.button>
                </div>

                {/* Messages */}
                <div style={{
                  flex: 1, overflowY: 'auto', padding: '14px 16px',
                  display: 'flex', flexDirection: 'column', gap: 8,
                  scrollbarWidth: 'thin',
                  scrollbarColor: 'rgba(255,37,64,0.12) transparent',
                }}>
                  {messages.map((msg, i) => (
                    <Message
                      key={i}
                      msg={msg}
                      isLast={i === messages.length - 1}
                      loading={loading}
                      // only animate the last assistant msg when it's freshly received
                      animate={i === messages.length - 1 && msg.role === 'assistant' && revealKey > 0}
                    />
                  ))}
                  <div ref={bottomRef} />
                </div>

                {/* Suggested chips — visible only on fresh state */}
                <AnimatePresence>
                  {showChips && (
                    <Chips key="chips" chips={s.chips} onSend={(chip) => send(chip)} />
                  )}
                </AnimatePresence>

                {/* Disclaimer */}
                <div style={{
                  padding: '4px 16px 5px',
                  fontFamily: '"Play", sans-serif', fontSize: '8.5px',
                  letterSpacing: '0.08em', textTransform: 'uppercase',
                  color: 'rgba(240,238,234,0.15)',
                  borderTop: '1px solid rgba(255,255,255,0.04)',
                  flexShrink: 0,
                }}>
                  {s.disclaimer}
                </div>

                {/* Input row */}
                <div style={{
                  padding: '10px 14px 12px',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                  display: 'flex', gap: 8, flexShrink: 0, alignItems: 'flex-end',
                }}>
                  <textarea
                    ref={(el) => { inputRef.current = el; textareaRef.current = el; }}
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={handleKey}
                    placeholder={s.placeholder}
                    rows={1}
                    style={{
                      flex: 1, resize: 'none', overflow: 'hidden',
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      color: 'var(--color-fg)',
                      fontFamily: '"Play", sans-serif', fontSize: '12px',
                      padding: '8px 10px', outline: 'none', lineHeight: 1.5,
                      transition: 'border-color 0.15s',
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,37,64,0.4)'}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                    onInput={e => {
                      e.target.style.height = 'auto';
                      e.target.style.height = Math.min(e.target.scrollHeight, 88) + 'px';
                    }}
                    disabled={loading}
                  />
                  <m.button
                    onClick={() => send()}
                    disabled={!canSend}
                    whileTap={canSend ? { scale: 0.96 } : {}}
                    style={{
                      padding: '8px 14px', flexShrink: 0,
                      background: canSend ? 'var(--color-accent)' : 'rgba(255,37,64,0.08)',
                      border: '1px solid rgba(255,37,64,0.35)',
                      color: canSend ? '#fff' : 'rgba(255,37,64,0.28)',
                      fontFamily: '"Play", sans-serif', fontSize: '10px',
                      fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase',
                      cursor: canSend ? 'pointer' : 'not-allowed',
                      transition: 'background 0.15s, color 0.15s',
                      clipPath: 'polygon(6px 0%,100% 0%,100% calc(100% - 6px),calc(100% - 6px) 100%,0% 100%,0% 6px)',
                    }}
                  >
                    {s.send}
                  </m.button>
                </div>

              </div>
            </div>
          </m.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
