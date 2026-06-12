import { useState, useRef, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { useLang } from '../contexts/LangContext';

const STRINGS = {
  en: {
    trigger: 'Ask about Andres',
    title: 'Ask about Andres',
    subtitle: 'AI assistant for HR & recruiters',
    placeholder: 'e.g. What is his experience with VR?',
    send: 'Send',
    welcome: "Hi! I'm an AI assistant that can answer questions about Andrés Felipe Pisso for HR and recruiting purposes. Ask me about his experience, skills, availability, or projects.",
    error: 'Something went wrong. Please try again.',
    disclaimer: 'AI-generated · verify details with Andres directly',
  },
  es: {
    trigger: 'Pregunta sobre Andrés',
    title: 'Pregunta sobre Andrés',
    subtitle: 'Asistente IA para HR y reclutadores',
    placeholder: 'Ej: ¿Cuál es su experiencia en VR?',
    send: 'Enviar',
    welcome: '¡Hola! Soy un asistente IA que puede responder preguntas sobre Andrés Felipe Pisso para procesos de HR y reclutamiento. Pregúntame sobre su experiencia, habilidades, disponibilidad o proyectos.',
    error: 'Algo salió mal. Por favor intenta de nuevo.',
    disclaimer: 'Generado por IA · verifica los detalles directamente con Andrés',
  },
};

function TypingDots() {
  return (
    <span style={{ display: 'inline-flex', gap: 3, alignItems: 'center', padding: '2px 0' }}>
      {[0, 1, 2].map(i => (
        <m.span
          key={i}
          style={{ width: 4, height: 4, borderRadius: '50%', backgroundColor: 'var(--color-accent)', display: 'inline-block' }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </span>
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
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  // Reset welcome message when language changes
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
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    // Append placeholder for streaming
    setMessages(prev => [...prev, { role: 'assistant', content: '' }]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || s.error);
      }

      setMessages(prev => {
        const updated = [...prev];
        updated[updated.length - 1] = { role: 'assistant', content: data.text };
        return updated;
      });
    } catch (err) {
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

  return (
    <>
      {/* Trigger button */}
      <AnimatePresence>
        {!open && (
          <m.button
            key="trigger"
            onClick={() => setOpen(true)}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              bottom: 28,
              right: 28,
              zIndex: 9000,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '10px 16px',
              backgroundColor: 'rgba(8,8,8,0.92)',
              border: '1px solid var(--color-accent)',
              color: 'var(--color-fg)',
              fontFamily: '"Play", sans-serif',
              fontSize: '11px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 0 24px rgba(255,37,64,0.15), 0 4px 16px rgba(0,0,0,0.5)',
            }}
            aria-label="Open AI assistant"
          >
            {/* Pulse dot */}
            <span style={{ position: 'relative', width: 7, height: 7, flexShrink: 0 }}>
              <m.span
                style={{
                  position: 'absolute', inset: 0, borderRadius: '50%',
                  backgroundColor: 'var(--color-accent)',
                }}
                animate={{ scale: [1, 1.8, 1], opacity: [1, 0, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <span style={{
                position: 'absolute', inset: 0, borderRadius: '50%',
                backgroundColor: 'var(--color-accent)',
              }} />
            </span>
            {s.trigger}
          </m.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <m.div
            key="panel"
            initial={{ opacity: 0, y: 20, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
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
              border: '1px solid rgba(255,37,64,0.35)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 0 40px rgba(255,37,64,0.1), 0 24px 64px rgba(0,0,0,0.7)',
            }}
          >
            {/* Accent top line */}
            <div style={{ height: 2, backgroundColor: 'var(--color-accent)', flexShrink: 0 }} />

            {/* Header */}
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'space-between',
              padding: '12px 16px',
              borderBottom: '1px solid rgba(255,255,255,0.06)',
              flexShrink: 0,
            }}>
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
                  color: 'var(--color-accent)', marginTop: 2, opacity: 0.8,
                }}>
                  {s.subtitle}
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'rgba(240,238,234,0.4)', padding: 4, lineHeight: 1,
                  fontSize: 18, fontFamily: 'monospace',
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-fg)'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(240,238,234,0.4)'}
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1, overflowY: 'auto', padding: '16px',
              display: 'flex', flexDirection: 'column', gap: 12,
              scrollbarWidth: 'thin',
              scrollbarColor: 'rgba(255,37,64,0.2) transparent',
            }}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '85%',
                    padding: '9px 13px',
                    fontFamily: '"Play", sans-serif',
                    fontSize: '12.5px',
                    lineHeight: 1.7,
                    letterSpacing: '0.02em',
                    ...(msg.role === 'user' ? {
                      backgroundColor: 'rgba(255,37,64,0.12)',
                      border: '1px solid rgba(255,37,64,0.25)',
                      color: 'var(--color-fg)',
                    } : {
                      backgroundColor: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.07)',
                      color: 'rgba(240,238,234,0.85)',
                    }),
                  }}>
                    {msg.content || (loading && i === messages.length - 1 ? <TypingDots /> : null)}
                  </div>
                </div>
              ))}
              {loading && messages[messages.length - 1]?.content === '' && (
                <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                  <div style={{
                    padding: '9px 13px',
                    backgroundColor: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}>
                    <TypingDots />
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Disclaimer */}
            <div style={{
              padding: '6px 16px',
              fontFamily: '"Play", sans-serif',
              fontSize: '9px',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'rgba(240,238,234,0.2)',
              borderTop: '1px solid rgba(255,255,255,0.04)',
              flexShrink: 0,
            }}>
              {s.disclaimer}
            </div>

            {/* Input */}
            <div style={{
              padding: '12px 16px',
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
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: 'var(--color-fg)',
                  fontFamily: '"Play", sans-serif',
                  fontSize: '12px',
                  padding: '8px 10px',
                  outline: 'none',
                  lineHeight: 1.5,
                  transition: 'border-color 0.15s',
                }}
                onFocus={e => e.currentTarget.style.borderColor = 'rgba(255,37,64,0.4)'}
                onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                onInput={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = Math.min(e.target.scrollHeight, 96) + 'px';
                }}
                disabled={loading}
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                style={{
                  padding: '8px 14px',
                  backgroundColor: input.trim() && !loading ? 'var(--color-accent)' : 'rgba(255,37,64,0.15)',
                  border: '1px solid var(--color-accent)',
                  color: input.trim() && !loading ? '#fff' : 'rgba(255,37,64,0.4)',
                  fontFamily: '"Play", sans-serif',
                  fontSize: '10px',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: input.trim() && !loading ? 'pointer' : 'not-allowed',
                  transition: 'all 0.15s',
                  alignSelf: 'flex-end',
                  flexShrink: 0,
                }}
              >
                {s.send}
              </button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
