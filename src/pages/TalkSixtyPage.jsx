import { m } from 'framer-motion';
import { Link } from 'react-router-dom';
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

const DECK_URL      = '/speaking/60s/presentacion';
const CHECKLIST_PDF = '/speaking/60s/checklist-primer-minuto.pdf';
const CHECKLIST_WEB = '/speaking/60s/presentacion/checklist.html';
const ARTICLE_URL   = '/notes/primer-minuto-ux-videojuegos';

const COPY = {
  es: {
    tag: 'Charla · Cali Game Jam',
    title: ['60 segundos', 'para que quieran seguir jugando'],
    subtitle: '7 decisiones de UX para convertir un prototipo en una experiencia clara, jugable y memorable.',
    deck: 'Ver presentación',
    pdf: 'Descargar checklist (PDF)',
    web: 'Checklist en la web',
    deckHint: 'La presentación funciona mejor en computador. Tecla F para pantalla completa.',
    whyLabel: 'La idea',
    why: [
      'En un jam, el jurado y el público juegan pocos minutos por juego. El primer minuto es casi toda la experiencia.',
      'El equipo ya conoce el objetivo; quien llega apenas lo está construyendo. No toda dificultad es diseño: el reto se diseña, la barrera se elimina.',
    ],
    decisionsLabel: 'Las 7 decisiones del primer minuto',
    decisions: [
      ['Objetivo', '¿Qué intento conseguir ahora?', 'Verbo + objeto + porqué: “Recoge el cristal para abrir la puerta”.'],
      ['Controles', '¿Con qué acción puedo empezar?', 'Botón + verbo, cerca de la interacción, con el glifo del dispositivo activo.'],
      ['Feedback', '¿Qué acaba de pasar?', 'Primero el estado, después el efecto. El efecto va encima del estado, nunca en su lugar.'],
      ['Jerarquía visual', '¿Qué es lo importante aquí?', 'La primera acción tiene prioridad. Tienda, racha y mapa pueden esperar.'],
      ['Aprendizaje', '¿Qué regla necesito en este momento?', 'Una regla a la vez, con una oportunidad segura de practicarla.'],
      ['Recuperación', '¿Qué pasó y cómo vuelvo a intentar?', '“Falta un cristal. Recógelo en el pedestal.” en lugar de “No disponible”.'],
      ['Accesibilidad', '¿Puedo percibir y ejecutar lo esencial?', 'Color + forma + texto. Prueba sin audio, sin color y con cada dispositivo anunciado.'],
    ],
    toolsLabel: 'Para llevar al jam',
    tools: [
      ['Playtest de 10 minutos', 'Abre la build sin explicar nada, observa y anota cada ayuda que tuviste que dar. Cada ayuda es un bug de UX.'],
      ['Observación ≠ hipótesis', 'Anota hechos (“presionó E tres veces”), no juicios. El cambio es una apuesta que necesita otra prueba.'],
      ['Prioridad con poco tiempo', 'Primero lo que impide jugar, después lo que genera duda, y si sobra, el acabado que puedes verificar.'],
    ],
    articleLabel: 'Para profundizar',
    articleTitle: 'Cómo evaluar los primeros 60 segundos de tu juego',
    articleBody: 'La versión escrita de la charla: qué observar en cada decisión y cómo comprobarla, el caso de Slow Mode en Steal an Egg y un formato de playtest de diez minutos.',
    articleCta: 'Leer el artículo',
    casesLabel: 'Casos de la charla',
    cases: [
      ['Steal an Egg', 'Roblox → Fortnite/UEFN: navegación con gamepad y un Slow Mode que el juego activa por ti.', '/case/steal-an-egg'],
      ['Orcs Must Die! By the Blade', 'Tutorial de VR: una regla a la vez, dentro del mundo.', '/case/orcs-must-die-by-the-blade'],
    ],
    caseCta: 'Ver caso',
    eventLabel: 'Game jam solidario',
    event: 'Esta charla hace parte de Cali Game Jam, un game jam solidario. Si puedes aportar, usa el enlace oficial que comparte la organización.',
    moreLabel: 'Más charlas',
    more: 'Ver todas las charlas y talleres',
  },
  en: {
    tag: 'Talk · Cali Game Jam',
    title: ['60 seconds', 'to make them keep playing'],
    subtitle: '7 UX decisions to turn a prototype into a clear, playable and memorable experience. Talk delivered in Spanish.',
    deck: 'View slides',
    pdf: 'Download checklist (PDF)',
    web: 'Checklist on the web',
    deckHint: 'The slides work best on desktop. Press F for full screen.',
    whyLabel: 'The idea',
    why: [
      'At a jam, judges and players spend a few minutes per game. The first minute is almost the whole experience.',
      'The team already knows the goal; a new player is still building it. Not every difficulty is design: challenges are designed, barriers are removed.',
    ],
    decisionsLabel: 'The 7 first-minute decisions',
    decisions: [
      ['Objective', 'What am I trying to do now?', 'Verb + object + why: “Pick up the crystal to open the door”.'],
      ['Controls', 'Which action can I start with?', 'Button + verb, next to the interaction, with the active device glyph.'],
      ['Feedback', 'What just happened?', 'State first, effects second. Effects sit on top of state, never instead of it.'],
      ['Visual hierarchy', 'What matters here?', 'The first action has priority. Shop, streak and map can wait.'],
      ['Learning', 'Which rule do I need right now?', 'One rule at a time, with a safe chance to practise it.'],
      ['Recovery', 'What happened and how do I retry?', '“Missing a crystal. Pick it up at the pedestal.” instead of “Unavailable”.'],
      ['Accessibility', 'Can I perceive and operate the essentials?', 'Colour + shape + text. Test without audio, without colour and with every advertised device.'],
    ],
    toolsLabel: 'Take it to the jam',
    tools: [
      ['10-minute playtest', 'Open the build without explaining, watch, and log every hint you had to give. Every hint is a UX bug.'],
      ['Observation ≠ hypothesis', 'Log facts (“pressed E three times”), not judgments. A change is a bet that needs another test.'],
      ['Priorities when time is short', 'First what blocks play, then what creates doubt, and if there is time, polish you can verify.'],
    ],
    articleLabel: 'Further reading',
    articleTitle: 'Cómo evaluar los primeros 60 segundos de tu juego',
    articleBody: 'The written version of the talk, in Spanish: what to observe for each decision and how to test it, the Steal an Egg Slow Mode case and a ten-minute playtest format.',
    articleCta: 'Read the article',
    casesLabel: 'Cases in the talk',
    cases: [
      ['Steal an Egg', 'Roblox → Fortnite/UEFN: gamepad navigation and a Slow Mode the game toggles for you.', '/case/steal-an-egg'],
      ['Orcs Must Die! By the Blade', 'VR tutorial: one rule at a time, inside the world.', '/case/orcs-must-die-by-the-blade'],
    ],
    caseCta: 'View case',
    eventLabel: 'Charity game jam',
    event: 'This talk is part of Cali Game Jam, a charity game jam. If you can contribute, use the official link shared by the organisers.',
    moreLabel: 'More talks',
    more: 'See all talks and workshops',
  },
};

function Reveal({ children, delay = 0, className }) {
  return (
    <m.div
      className={className}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.45, ease: EASE_OUT, delay }}
    >
      {children}
    </m.div>
  );
}

const h2Style = { fontFamily: BEBAS, fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--color-fg)', lineHeight: 1.02, letterSpacing: '0.01em' };
const bodyStyle = { fontFamily: MONO, fontSize: 'clamp(13px, 1.6vw, 15px)', color: 'var(--color-fg-dim)', lineHeight: 1.8 };

export default function TalkSixtyPage({ onMenuOpen }) {
  const { lang } = useLang();
  const c = COPY[lang] || COPY.es;

  usePageMeta({
    fullTitle: pageMeta['/speaking/60s'][lang].title,
    description: pageMeta['/speaking/60s'][lang].description,
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
              <CyberBtn href={CHECKLIST_PDF} target="_blank" rel="noopener" variant="solid" size="lg">{c.pdf}</CyberBtn>
              <CyberBtn href={DECK_URL} variant="accent-ghost" size="lg">{c.deck}</CyberBtn>
              <CyberBtn href={CHECKLIST_WEB} variant="ghost" size="lg">{c.web}</CyberBtn>
            </m.div>
            <p className="mt-4" style={{ fontFamily: MONO, fontSize: '12px', color: 'var(--color-fg-mute)', letterSpacing: '0.04em' }}>{c.deckHint}</p>
          </div>
        </section>

        {/* ── IDEA ── */}
        <section className="py-20" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-24">
            <Reveal><div className="sys-label">{c.whyLabel}</div></Reveal>
            <div className="space-y-5">
              {c.why.map((p, i) => (
                <Reveal key={i} delay={0.06 * i}><p style={{ ...bodyStyle, color: i ? 'var(--color-fg-dim)' : 'var(--color-fg)' }}>{p}</p></Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── 7 DECISIONES ── */}
        <section className="py-24" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <Reveal><h2 className="uppercase mb-12" style={h2Style}>{c.decisionsLabel}</h2></Reveal>
            <ol className="grid grid-cols-1 md:grid-cols-2 gap-[2px]">
              {c.decisions.map(([name, q, rule], i) => (
                <Reveal key={name} delay={0.04 * i}>
                  <li className="h-full p-6 md:p-8" style={{ listStyle: 'none', border: '1px solid var(--color-rule)', backgroundColor: 'rgba(8,8,8,0.42)' }}>
                    <div className="flex items-baseline gap-4 mb-3">
                      <span style={{ fontFamily: BEBAS, fontSize: '2.4rem', color: ACCENT, lineHeight: 1 }}>{String(i + 1).padStart(2, '0')}</span>
                      <span className="sys-label">{name}</span>
                    </div>
                    <p style={{ fontFamily: MONO, fontSize: 'clamp(16px, 2vw, 20px)', color: 'var(--color-fg)', lineHeight: 1.35, marginBottom: '0.6rem' }}>{q}</p>
                    <p style={{ ...bodyStyle, fontSize: '14px' }}>{rule}</p>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
        </section>

        {/* ── HERRAMIENTAS ── */}
        <section className="py-24" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <Reveal><h2 className="uppercase mb-12" style={h2Style}>{c.toolsLabel}</h2></Reveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
              {c.tools.map(([name, body], i) => (
                <Reveal key={name} delay={0.06 * i}>
                  <div className="w-10 h-[2px] mb-5" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                  <h3 className="mb-3" style={{ fontFamily: MONO, fontSize: '18px', color: 'var(--color-fg)', fontWeight: 700 }}>{name}</h3>
                  <p style={bodyStyle}>{body}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── ARTÍCULO ── */}
        <section className="py-20" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-24">
            <Reveal><div className="sys-label">{c.articleLabel}</div></Reveal>
            <Reveal delay={0.06}>
              <h2 className="uppercase mb-4" style={{ ...h2Style, fontSize: 'clamp(1.8rem, 4vw, 3rem)' }}>{c.articleTitle}</h2>
              <p className="mb-8" style={bodyStyle}>{c.articleBody}</p>
              <CyberBtn to={ARTICLE_URL} variant="solid" size="md">{c.articleCta}</CyberBtn>
            </Reveal>
          </div>
        </section>

        {/* ── CASOS + EVENTO ── */}
        <section className="py-24" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div>
              <Reveal><div className="sys-label mb-8">{c.casesLabel}</div></Reveal>
              <div className="space-y-8">
                {c.cases.map(([name, body, to], i) => (
                  <Reveal key={name} delay={0.06 * i}>
                    <h3 className="uppercase mb-2" style={{ fontFamily: BEBAS, fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', color: 'var(--color-fg)', lineHeight: 1.05 }}>{name}</h3>
                    <p style={bodyStyle}>{body}</p>
                    {to && (
                      <Link to={to} className="inline-block mt-3 underline underline-offset-4" style={{ fontFamily: MONO, fontSize: '13px', color: ACCENT }}>{c.caseCta} →</Link>
                    )}
                  </Reveal>
                ))}
              </div>
            </div>
            <Reveal>
              <div className="relative p-8 md:p-10" style={{ border: '1px solid var(--color-rule)', backgroundColor: 'rgba(8,8,8,0.42)' }}>
                <div className="absolute top-0 left-0 w-24 h-[2px]" style={{ backgroundColor: ACCENT }} aria-hidden="true" />
                <div className="sys-label mb-5">{c.eventLabel}</div>
                <p style={{ ...bodyStyle, color: 'var(--color-fg)' }}>{c.event}</p>
              </div>
            </Reveal>
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
