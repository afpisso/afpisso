import { useState, useRef, useEffect, useCallback } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLang } from '../contexts/LangContext';

const STRINGS = {
  en: {
    title: 'Ask about Andres',
    subtitle: 'AI assistant · HR & recruiters',
    placeholder: 'e.g. What is his experience with VR?',
    send: 'Send',
    welcome: "Hi! I'm an AI assistant that can answer questions about Andrés Felipe Pisso for HR and recruiting purposes. Ask me about his experience, skills, availability, or projects.",
    error: 'Something went wrong. Please try again.',
    disclaimer: 'AI-generated · verify details with Andres directly',
  },
  es: {
    title: 'Pregunta sobre Andrés',
    subtitle: 'Asistente IA · HR y reclutadores',
    placeholder: 'Ej: ¿Cuál es su experiencia en VR?',
    send: 'Enviar',
    welcome: '¡Hola! Soy un asistente IA que puede responder preguntas sobre Andrés Felipe Pisso para procesos de HR y reclutamiento. Pregúntame sobre su experiencia, habilidades, disponibilidad o proyectos.',
    error: 'Algo salió mal. Por favor intenta de nuevo.',
    disclaimer: 'Generado por IA · verifica los detalles directamente con Andrés',
  },
};

// Kowalski tooltip-delay rule:
// first hover → 400ms delay; if re-hovered within 600ms → instant
function useTooltipDelay() {
  const [visible, setVisible] = useState(false);
  const lastHideTime = useRef(null);
  const showTimer = useRef(null);

  const show = useCallback(() => {
    const instant = lastHideTime.current && Date.now() - lastHideTime.current < 600;
    if (instant) {
      setVisible(true);
    } else {
      showTimer.current = setTimeout(() => setVisible(true), 400);
    }
  }, []);

  const hide = useCallback(() => {
    clearTimeout(showTimer.current);
    lastHideTime.current = Date.now();
    setVisible(false);
  }, []);

  return { visible, show, hide };
}

function OrbTrigger({ onClick }) {
  const [hovered, setHovered] = useState(false);
  const tooltip = useTooltipDelay();
  const { lang } = useLang();
  const label = lang === 'es' ? 'Pregunta sobre AndresFe' : 'Ask about AndresFe';

  // Orb size matching the reference proportions
  const SIZE = 68;
  // Eye proportions from reference: wide pill, white, centered upper half
  const EYE_W = 7, EYE_H = 13, EYE_GAP = 10, EYE_R = 4;

  return (
    <m.div
      style={{
        position: 'fixed',
        bottom: 28,
        right: 28,
        zIndex: 9000,
        width: SIZE,
        // extra height for ground shadow
        height: SIZE + 16,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      // Enter from scale(0.95), never 0 — Kowalski rule
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 8 }}
      transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
    >
      {/* Tooltip pill — left of orb, ease-out, Kowalski delay */}
      <AnimatePresence>
        {tooltip.visible && (
          <m.span
            initial={{ opacity: 0, x: 6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 4 }}
            // ease-out for user-initiated interaction — Kowalski rule
            transition={{ duration: 0.18, ease: [0.32, 0.72, 0, 1] }}
            style={{
              position: 'absolute',
              right: SIZE + 12,
              top: '50%',
              transform: 'translateY(-50%)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
              // Site aesthetic: Play font, red border, glass bg
              fontFamily: '"Play", sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-fg)',
              backgroundColor: 'rgba(8,8,8,0.92)',
              border: '1px solid rgba(255,37,64,0.4)',
              padding: '6px 12px',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 16px rgba(255,37,64,0.1), 0 4px 12px rgba(0,0,0,0.5)',
            }}
          >
            {/* Left accent line */}
            <span style={{
              position: 'absolute', left: 0, top: 0, bottom: 0,
              width: 2, backgroundColor: 'var(--color-accent)',
            }} />
            {label}
          </m.span>
        )}
      </AnimatePresence>

      {/* Pulse ring */}
      <m.span
        style={{
          position: 'absolute',
          top: 0, left: 0,
          width: SIZE, height: SIZE,
          borderRadius: '50%',
          border: '1px solid rgba(255,37,64,0.2)',
          pointerEvents: 'none',
        }}
        animate={{ scale: [1, 1.22, 1], opacity: [0.6, 0, 0.6] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Orb button */}
      <m.button
        onClick={onClick}
        onHoverStart={() => { setHovered(true); tooltip.show(); }}
        onHoverEnd={() => { setHovered(false); tooltip.hide(); }}
        whileTap={{ scale: 0.97 }} // Kowalski press feedback
        style={{
          width: SIZE, height: SIZE,
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          background: 'none',
          padding: 0,
          position: 'relative',
          flexShrink: 0,
        }}
        aria-label="Open AI assistant"
      >
        {/* Orb body — radial gradient with highlight at top-left */}
        <m.span
          style={{
            position: 'absolute', inset: 0, borderRadius: '50%',
            background: 'radial-gradient(circle at 35% 30%, rgba(255,80,100,0.55) 0%, rgba(180,10,30,0.85) 42%, rgba(8,8,8,0.97) 75%)',
            border: '1px solid rgba(255,37,64,0.5)',
            backdropFilter: 'blur(12px)',
          }}
          animate={{
            boxShadow: hovered
              ? '0 0 36px rgba(255,37,64,0.5), inset 0 1px 0 rgba(255,120,120,0.15)'
              : '0 0 22px rgba(255,37,64,0.25), inset 0 1px 0 rgba(255,120,120,0.08)',
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        />

        {/* Float + eyes container */}
        <m.span
          style={{
            position: 'absolute', inset: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            // Eyes sit slightly above center, matching reference
            paddingBottom: 6,
          }}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span style={{ display: 'flex', gap: EYE_GAP, alignItems: 'center' }}>
            {[0, 1].map(i => (
              <m.span
                key={i}
                style={{
                  width: EYE_W, height: EYE_H,
                  borderRadius: EYE_R,
                  backgroundColor: 'rgba(255,255,255,0.92)',
                  display: 'block',
                }}
                // Blink on hover, slow pulse at rest
                animate={hovered
                  ? { scaleY: [1, 0.15, 1], opacity: [1, 0.7, 1] }
                  : { opacity: [0.8, 1, 0.8] }
                }
                transition={{
                  duration: hovered ? 0.28 : 2.2,
                  repeat: Infinity,
                  delay: i * 0.08,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </span>
        </m.span>
      </m.button>

      {/* Ground shadow — breathes with the float */}
      <m.span
        style={{
          width: SIZE * 0.5,
          height: 7,
          borderRadius: '50%',
          backgroundColor: 'rgba(255,37,64,0.2)',
          filter: 'blur(5px)',
          marginTop: 2,
          flexShrink: 0,
        }}
        animate={{ scaleX: [1, 0.65, 1], opacity: [0.45, 0.15, 0.45] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
      />
    </m.div>
  );
}

function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 4, alignItems: 'center', padding: '3px 0' }}>
      {[0, 1, 2].map(i => (
        <m.span
          key={i}
          style={{
            width: 4, height: 4, borderRadius: '50%',
            backgroundColor: 'var(--color-accent)', display: 'inline-block',
          }}
          animate={{ y: [0, -4, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}
        />
      ))}
    </span>
  );
}

function Message({ msg, index, isLast, loading }) {
  const isUser = msg.role === 'user';
  return (
    <m.div
      style={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start' }}
      // Stagger children (Kowalski rule) — animate only transform+opacity
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: [0.32, 0.72, 0, 1], delay: 0.03 * Math.min(index, 4) }}
    >
      <div style={{
        maxWidth: '85%',
        padding: '9px 13px',
        fontFamily: '"Play", sans-serif',
        fontSize: '12.5px',
        lineHeight: 1.7,
        letterSpacing: '0.02em',
        ...(isUser ? {
          backgroundColor: 'rgba(255,37,64,0.12)',
          border: '1px solid rgba(255,37,64,0.25)',
          color: 'var(--color-fg)',
        } : {
          backgroundColor: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.07)',
          color: 'rgba(240,238,234,0.85)',
        }),
      }}>
        {msg.content || (loading && isLast ? <TypingDots /> : null)}
      </div>
    </m.div>
  );
}

export default function AIChatBot() {
  const { lang } = useLang();
  const s = STRINGS[lang] ?? STRINGS.en;

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([{ role: 'assistant', content: s.welcome }]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

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

  async function send() {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg = { role: 'user', content: text };
    const nextMessages = [...messages, userMsg];
    setMessages([...nextMessages, { role: 'assistant', content: '' }]);
    setInput('');
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  }

  const canSend = input.trim().length > 0 && !loading;

  return (
    <>
      <AnimatePresence>
        {!open && <OrbTrigger key="orb" onClick={() => setOpen(true)} />}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <m.div
            key="panel"
            // Spring physics for natural panel entrance (Kowalski drawer rule)
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{
              type: 'spring',
              stiffness: 420,
              damping: 36,
              mass: 0.8,
            }}
            style={{
              position: 'fixed',
              bottom: 24,
              right: 24,
              zIndex: 9000,
              width: 'min(420px, calc(100vw - 32px))',
              height: 'min(560px, calc(100dvh - 80px))',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'rgba(8,8,8,0.97)',
              border: '1px solid rgba(255,37,64,0.3)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px rgba(255,37,64,0.08), 0 24px 64px rgba(0,0,0,0.7)',
              transformOrigin: 'bottom right',
            }}
          >
            {/* Accent top line */}
            <m.div
              style={{ height: 2, backgroundColor: 'var(--color-accent)', flexShrink: 0 }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1], delay: 0.1 }}
              // clip-path reveal (Kowalski rule)
              style={{ height: 2, backgroundColor: 'var(--color-accent)', flexShrink: 0, transformOrigin: 'left' }}
            />

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              flexShrink: 0,
              gap: 10,
            }}>
              {/* Mini orb in header */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{
                  width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                  background: 'radial-gradient(circle at 35% 35%, rgba(255,37,64,0.3) 0%, rgba(8,8,8,0.9) 70%)',
                  border: '1px solid rgba(255,37,64,0.4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ display: 'flex', gap: 3 }}>
                    {[0, 1].map(i => (
                      <m.span key={i} style={{
                        width: 2.5, height: 4, borderRadius: 2,
                        backgroundColor: 'var(--color-accent)',
                      }}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </span>
                </span>
                <div>
                  <div style={{
                    fontFamily: '"Play", sans-serif', fontSize: '11px',
                    fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: 'var(--color-fg)',
                  }}>
                    {s.title}
                  </div>
                  <div style={{
                    fontFamily: '"Play", sans-serif', fontSize: '9px',
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    color: 'var(--color-accent)', marginTop: 1, opacity: 0.7,
                  }}>
                    {s.subtitle}
                  </div>
                </div>
              </div>

              <m.button
                onClick={() => setOpen(false)}
                whileHover={{ opacity: 1 }}
                whileTap={{ scale: 0.93 }}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(240,238,234,0.35)', padding: 4, lineHeight: 1,
                  fontSize: 18, fontFamily: 'monospace', opacity: 0.35,
                  transition: 'opacity 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.opacity = 1}
                onMouseLeave={e => e.currentTarget.style.opacity = 0.35}
                aria-label="Close"
              >
                ×
              </m.button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: 10,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,37,64,0.15) transparent',
            }}>
              {messages.map((msg, i) => (
                <Message
                  key={i}
                  msg={msg}
                  index={i}
                  isLast={i === messages.length - 1}
                  loading={loading}
                />
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '5px 16px',
              fontFamily: '"Play", sans-serif',
              fontSize: '9px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(240,238,234,0.18)',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              flexShrink: 0,
            }}>
              {s.disclaimer}
            </div>

            {/* Input row */}
            <div style={{
              padding: '10px 14px',
              borderTop: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', gap: 8, flexShrink: 0,
            }}>
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKey}
                placeholder={s.placeholder}
                rows={1}
                style={{
                  flex: 1, resize: 'none', overflow: 'hidden',
                  backgroundColor: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.09)',
                  color: 'var(--color-fg)',
                  fontFamily: '"Play", sans-serif',
                  fontSize: '12px',
                  padding: '8px 10px',
                  outline: 'none',
                  lineHeight: 1.5,
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,37,64,0.4)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.09)'}
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
                }}
                disabled={loading}
              />
              <m.button
                onClick={send}
                disabled={!canSend}
                // Press scale feedback (Kowalski rule) — only when enabled
                whileTap={canSend ? { scale: 0.97 } : {}}
                style={{
                  padding: '8px 14px',
                  backgroundColor: canSend ? 'var(--color-accent)' : 'rgba(255,37,64,0.1)',
                  border: '1px solid rgba(255,37,64,0.4)',
                  color: canSend ? '#fff' : 'rgba(255,37,64,0.3)',
                  fontFamily: '"Play", sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: canSend ? 'pointer' : 'not-allowed',
                  transition: 'background-color 0.15s, color 0.15s',
                  alignSelf: 'flex-end',
                  flexShrink: 0,
                }}
              >
                {s.send}
              </m.button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
