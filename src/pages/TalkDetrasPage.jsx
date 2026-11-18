import { m } from 'framer-motion';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import SectionTag from '../components/SectionTag';
import CyberBtn from '../components/CyberBtn';
import { useLang } from '../contexts/LangContext';
import { usePageMeta } from '../hooks/usePageMeta';
import { pageMeta } from '../data/pageMeta.js';

const EASE_OUT = [0.16, 1, 0.3, 1];
const ACCENT = '#ff2540';
const MONO   = '"Play", sans-serif';
const BEBAS  = '"Bebas Neue", sans-serif';

// Presentación independiente (HTML + three.js) servida desde public/
const DECK_URL = '/speaking/detras-del-juego/presentacion';

const COPY = {
  es: {
    tag: 'Charla · CUN',
    title: ['El juego', 'detrás del juego'],
    subtitle: 'Qué hay detrás de un videojuego: una isla 3D que se construye capa a capa, del boceto al juego, con sus oficios y el mercado colombiano.',
    deck: 'Ver presentación',
    deckHint: 'La presentación funciona mejor en computador. Flechas para avanzar, F para pantalla completa y G para el menú de pasos.',
    whyLabel: 'La idea',
    why: [
      'Un videojuego no aparece de golpe: se construye por capas. En la charla, una isla 3D pasa del boceto a un juego jugable y cada capa muestra quién la hace y qué decide.',
      'También recorre el mercado de juegos en Colombia, compara lo genérico con lo hecho con criterio y cierra con misiones concretas para empezar.',
    ],
    moreLabel: 'Más charlas',
    more: 'Ver todas las charlas y talleres',
  },
  en: {
    tag: 'Talk · CUN',
    title: ['The game', 'behind the game'],
    subtitle: 'What lies behind a video game: a 3D island built layer by layer, from sketch to game, with its roles and the Colombian market. Talk delivered in Spanish.',
    deck: 'View slides',
    deckHint: 'The slides work best on desktop. Arrow keys to advance, F for full screen and G for the step menu.',
    whyLabel: 'The idea',
    why: [
      'A video game does not appear all at once: it is built in layers. In the talk, a 3D island goes from sketch to playable game, and each layer shows who builds it and what they decide.',
      'It also covers the Colombian games market, compares generic work with work made with judgement, and ends with concrete missions to get started.',
    ],
    moreLabel: 'More talks',
    more: 'See all talks and workshops',
  },
};

const bodyStyle = { fontFamily: MONO, fontSize: 'clamp(13px, 1.6vw, 15px)', color: 'var(--color-fg-dim)', lineHeight: 1.8 };

export default function TalkDetrasPage({ onMenuOpen }) {
  const { lang } = useLang();
  const c = COPY[lang] || COPY.es;

  usePageMeta({
    fullTitle: pageMeta['/speaking/detras-del-juego'][lang].title,
    description: pageMeta['/speaking/detras-del-juego'][lang].description,
  });

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main id="main-content">

        {/* ── HERO ── */}
        <section className="pt-40 pb-20" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <m.div className="mb-8" initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, ease: EASE_OUT }}>
              <SectionTag label={c.tag} page="006" />
            </m.div>
            <m.h1
              className="uppercase"
              style={{ fontFamily: BEBAS, fontSize: 'clamp(3.2rem, 9vw, 8.5rem)', color: 'var(--color-fg)', lineHeight: 0.92, letterSpacing: '0.01em' }}
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE_OUT, delay: 0.06 }}
            >
              <span style={{ color: ACCENT }}>{c.title[0]}</span><br />
              <span>{c.title[1]}</span>
            </m.h1>
            <m.p
              className="mt-6"
              style={{ ...bodyStyle, maxWidth: '620px' }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.18 }}
            >
              {c.subtitle}
            </m.p>
            <m.div
              className="mt-10 flex flex-wrap gap-3"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE_OUT, delay: 0.26 }}
            >
              <CyberBtn href={DECK_URL} variant="solid" size="lg">{c.deck}</CyberBtn>
            </m.div>
            <p className="mt-4" style={{ fontFamily: MONO, fontSize: '12px', color: 'var(--color-fg-mute)', letterSpacing: '0.04em' }}>{c.deckHint}</p>
          </div>
        </section>

        {/* ── IDEA ── */}
        <section className="py-20" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-24">
            <div className="sys-label">{c.whyLabel}</div>
            <div className="space-y-5">
              {c.why.map((p, i) => (
                <p key={i} style={{ ...bodyStyle, color: i ? 'var(--color-fg-dim)' : 'var(--color-fg)' }}>{p}</p>
              ))}
            </div>
          </div>
        </section>

        {/* ── MÁS CHARLAS ── */}
        <section className="py-20">
          <div className="max-w-[1400px] mx-auto px-6 flex flex-wrap items-center justify-between gap-6">
            <div className="sys-label">{c.moreLabel}</div>
            <CyberBtn to="/speaking" variant="accent-ghost" size="md">{c.more}</CyberBtn>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
