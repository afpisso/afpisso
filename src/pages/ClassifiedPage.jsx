/**
 * ClassifiedPage — /classified
 *
 * Unlocked when all 6 signals are found. Accessible directly by URL
 * (the hunt is the barrier, not the route), but the page knows if you
 * came the right way or just guessed the path.
 *
 * Content: meta-commentary on the portfolio as a UX problem,
 * design notes on the hunt itself, personal game design manifesto.
 */

import { Link } from 'react-router-dom';
import { m, useReducedMotion } from 'framer-motion';
import { useHunt, SIGNALS } from '../contexts/HuntContext';
import { usePageMeta } from '../hooks/usePageMeta';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useState } from 'react';

const MONO  = '"JetBrains Mono", monospace';
const BEBAS = '"Bebas Neue", sans-serif';
const EASE  = [0.16, 1, 0.3, 1];

function SysLabel({ children, color = 'rgba(255,37,64,0.5)' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 16 }}>
      <div style={{ width: 14, height: 1, backgroundColor: 'var(--color-accent)', opacity: 0.4 }} />
      <span style={{ fontFamily: MONO, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase', color, fontWeight: 700 }}>
        {children}
      </span>
    </div>
  );
}

function Rule() {
  return (
    <div style={{ height: 1, backgroundColor: 'var(--color-rule)', margin: '48px 0' }} />
  );
}

function DataRow({ label, value }) {
  return (
    <div style={{
      display: 'flex',
      gap: 16,
      padding: '10px 0',
      borderBottom: '1px solid rgba(255,255,255,0.04)',
      fontFamily: MONO,
    }}>
      <span style={{ fontSize: '10px', color: 'var(--color-fg-mute)', letterSpacing: '0.1em', width: 160, flexShrink: 0 }}>
        {label}
      </span>
      <span style={{ fontSize: '10px', color: 'var(--color-fg-dim)', letterSpacing: '0.04em', lineHeight: 1.6 }}>
        {value}
      </span>
    </div>
  );
}

// ── Signal status row ──────────────────────────────────────────────────────────
function SignalStatus({ onMenuOpen }) {
  const { found } = useHunt();
  return (
    <div style={{
      background: 'rgba(255,37,64,0.04)',
      border: '1px solid rgba(255,37,64,0.12)',
      padding: '16px 20px',
      marginBottom: 40,
      fontFamily: MONO,
    }}>
      <SysLabel>// signal acquisition log</SysLabel>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
        {SIGNALS.map(sig => {
          const isFound = found.has(sig.id);
          return (
            <div key={sig.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: '9px', color: isFound ? 'var(--color-accent)' : 'rgba(255,255,255,0.12)', fontWeight: 700 }}>
                {isFound ? '◈' : '○'}
              </span>
              <span style={{ fontSize: '9px', letterSpacing: '0.1em', textTransform: 'uppercase', color: isFound ? 'var(--color-fg-dim)' : 'rgba(255,255,255,0.18)' }}>
                {isFound ? sig.label : '████ ████'}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ── Main page ──────────────────────────────────────────────────────────────────
export default function ClassifiedPage({ onMenuOpen }) {
  const { allFound, found } = useHunt();
  const shouldReduce = useReducedMotion();
  const remaining = SIGNALS.length - found.size;

  usePageMeta({
    title: 'Classified — AFPISSO',
    description: 'Restricted access.',
  });

  const enter = shouldReduce
    ? {}
    : { initial: { opacity: 0, y: 18 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.55, ease: EASE } };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-bg)', position: 'relative' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />

      <main>
        {/* ── Header ── */}
        <m.div
          className="max-w-[900px] mx-auto px-6 pt-32 pb-16"
          {...enter}
        >
          {/* Eyebrow */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
            <span style={{
              fontFamily: MONO, fontSize: '8px', letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'rgba(255,37,64,0.5)', fontWeight: 700,
            }}>
              // CLEARANCE LEVEL — OPERATOR
            </span>
            <div style={{ flex: 1, height: 1, backgroundColor: 'var(--color-rule)' }} />
            <span style={{
              fontFamily: MONO, fontSize: '8px', letterSpacing: '0.14em', textTransform: 'uppercase',
              color: allFound ? 'var(--color-accent)' : 'rgba(255,255,255,0.2)', fontWeight: 700,
            }}>
              {allFound ? 'ACCESS GRANTED' : `${found.size}/${SIGNALS.length} SIGNALS`}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontFamily: BEBAS,
            fontSize: 'clamp(3.5rem, 8vw, 7.5rem)',
            lineHeight: 0.92,
            letterSpacing: '0.02em',
            color: 'var(--color-fg)',
            marginBottom: 24,
          }}>
            CLASSIFIED<br />
            <span style={{ color: 'var(--color-accent)', opacity: 0.9 }}>BRIEFING</span>
          </h1>

          {/* Subhead */}
          <p style={{
            fontFamily: MONO, fontSize: '13px', color: 'var(--color-fg-dim)',
            letterSpacing: '0.04em', lineHeight: 1.8, maxWidth: 540,
          }}>
            {allFound
              ? 'You found all 6 signals. You played the site the way it was designed to be played. This page is the reward — and the design document.'
              : `You accessed this page directly. ${remaining} signal${remaining !== 1 ? 's' : ''} remain${remaining === 1 ? 's' : ''} undetected. The full briefing is here regardless — but you should go back and find them.`
            }
          </p>
        </m.div>

        <div className="max-w-[900px] mx-auto px-6 pb-32" style={{ borderTop: '1px solid var(--color-rule)', paddingTop: 40 }}>

          {/* Signal status */}
          <SignalStatus />

          {/* ── Section 1: Why this exists ── */}
          <m.section {...(shouldReduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: EASE } })}>
            <SysLabel>// document 01 — why this exists</SysLabel>
            <h2 style={{ fontFamily: BEBAS, fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--color-fg)', lineHeight: 0.95, marginBottom: 24 }}>
              THE PORTFOLIO<br />IS THE PRODUCT
            </h2>
            <div style={{ fontFamily: MONO, fontSize: '13px', color: 'var(--color-fg-dim)', lineHeight: 1.85, maxWidth: 640 }}>
              <p style={{ marginBottom: 16 }}>
                A portfolio is a UX problem. The designer is simultaneously the author, the product, and the system. The question I ask every game: "Where is the player guessing?" applied directly to this site.
              </p>
              <p style={{ marginBottom: 16 }}>
                Most portfolios are optimised for recruiters scanning at 30 seconds. That's a real constraint. But a recruiter at a game studio is also someone who plays games. Someone who respects the layers. Someone who will notice when something is designed with intent rather than assembled.
              </p>
              <p>
                The signal hunt exists to demonstrate a specific skill without declaring it. Not "I understand gamification and game design" — but a system you can walk through, a loop with stakes and rewards, a set of rules that are never explained and still feel fair. That's game UX.
              </p>
            </div>
          </m.section>

          <Rule />

          {/* ── Section 2: Design notes on the hunt ── */}
          <m.section {...(shouldReduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: EASE } })}>
            <SysLabel>// document 02 — design notes</SysLabel>
            <h2 style={{ fontFamily: BEBAS, fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--color-fg)', lineHeight: 0.95, marginBottom: 28 }}>
              HOW THE<br />HUNT WAS BUILT
            </h2>

            <div style={{ fontFamily: MONO, fontSize: '12px', color: 'var(--color-fg-dim)', lineHeight: 1.8, maxWidth: 640, marginBottom: 32 }}>
              Each signal was placed to reward a specific behavior: exploring the hero instead of scrolling past it, reading about the designer instead of the work, finishing the case files section, remembering a 30-year-old code. Each one is calibrated to be findable by accident — but not by accident alone.
            </div>

            {/* Signal design notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {[
                {
                  id: 'GRID ANOMALY',
                  loc: 'Hero',
                  note: 'The hero has a GeometryGrid background that most visitors register as decoration and scroll past. A nearly invisible element sits in the corner — opacity 5%. The signal rewards visitors who treat the page as an environment rather than a document.',
                },
                {
                  id: 'LEGACY PROTOCOL',
                  loc: 'System-wide',
                  note: 'The Konami code (↑↑↓↓←→←→BA) is a 40-year-old convention. Any game designer worth hiring knows it. Any developer worth trusting has tried it on at least one site. It signals "I think about things from a player perspective" without a single word of copy.',
                },
                {
                  id: 'CLASSIFIED RECORD',
                  loc: 'Case Files',
                  note: 'The case files section has a public record and a classified one. Most visitors read the cards and move on. The signal appears at the boundary — after the visible work ends. It rewards people who look past what is presented.',
                },
                {
                  id: 'OPERATOR QUERY',
                  loc: 'About',
                  note: '"Where is the player guessing?" is the central question of the portfolio. Triple-clicking it is thematically exact — the player guesses, then guesses again, then guesses once more, and the system responds. No tutorial. No prompt. Either you try it or you don\'t.',
                },
                {
                  id: 'DEAD FREQUENCY',
                  loc: 'Field Notes',
                  note: 'One note card in Field Notes carries a hidden marker. The choice of which card was deliberate — it\'s one that would attract someone who reads rather than scans. The signal rewards depth over breadth.',
                },
                {
                  id: 'TERMINAL ECHO',
                  loc: 'Footer',
                  note: 'The footer says "// transmission complete". Clicking that line completes a loop — you find the signal at the end, after reading everything. It\'s placed where only people who reach the bottom of the page will find it.',
                },
              ].map(({ id, loc, note }) => (
                <div key={id} style={{
                  padding: '18px 0',
                  borderTop: '1px solid rgba(255,255,255,0.05)',
                }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 8 }}>
                    <span style={{ fontFamily: MONO, fontSize: '8px', color: 'var(--color-accent)', fontWeight: 700, letterSpacing: '0.1em' }}>◈</span>
                    <span style={{ fontFamily: MONO, fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-fg)' }}>{id}</span>
                    <span style={{ fontFamily: MONO, fontSize: '8px', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em' }}>{loc}</span>
                  </div>
                  <p style={{ fontFamily: MONO, fontSize: '11px', color: 'var(--color-fg-dim)', lineHeight: 1.75, paddingLeft: 20, maxWidth: 580 }}>
                    {note}
                  </p>
                </div>
              ))}
            </div>
          </m.section>

          <Rule />

          {/* ── Section 3: Game design manifesto ── */}
          <m.section {...(shouldReduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: EASE } })}>
            <SysLabel>// document 03 — unfiltered</SysLabel>
            <h2 style={{ fontFamily: BEBAS, fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--color-fg)', lineHeight: 0.95, marginBottom: 24 }}>
              WHAT I ACTUALLY<br />THINK ABOUT GAME UX
            </h2>
            <div style={{ fontFamily: MONO, fontSize: '13px', color: 'var(--color-fg-dim)', lineHeight: 1.85, maxWidth: 640 }}>
              <p style={{ marginBottom: 20 }}>
                The HUD is not the interface. The HUD is what happens when the interface fails. A player who never looks at their health bar is a player whose survival instincts are being fed by the environment itself. That's the target state.
              </p>
              <p style={{ marginBottom: 20 }}>
                Most game UI is designed by people who are trying to communicate. The best game UI is designed by people who are trying to eliminate the need to communicate. The player should feel the feedback loop before they see it.
              </p>
              <p style={{ marginBottom: 20 }}>
                Tutorial design is the discipline that reveals the most about a studio's relationship with its own game. If you need five screens to explain a mechanic, the mechanic is not done. If you can't onboard without text, the environment is not teaching.
              </p>
              <p style={{ marginBottom: 20 }}>
                Accessibility in games is not about making things easier. It's about removing barriers that have nothing to do with intended difficulty. A player who can't read a tooltip because of color contrast didn't lose — they were excluded. Those are different things and they require different responses.
              </p>
              <p>
                LiveOps UX is the most underrated discipline in the industry. The event, the reward, the timer, the store — all of these have a feedback loop that operates on a week-by-week timescale. Most studios treat them as marketing surfaces. The good ones treat them as game mechanics that happen to live outside the core loop.
              </p>
            </div>
          </m.section>

          <Rule />

          {/* ── Section 4: System spec ── */}
          <m.section {...(shouldReduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: EASE } })}>
            <SysLabel>// document 04 — system spec</SysLabel>
            <h2 style={{ fontFamily: BEBAS, fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-fg)', lineHeight: 0.95, marginBottom: 24 }}>
              PORTFOLIO SYSTEM NOTES
            </h2>
            <DataRow label="STACK" value="React 19 + Vite + Tailwind CSS v4 + Framer Motion v12" />
            <DataRow label="SCROLL ENGINE" value="Lenis (smooth scroll, Framer Motion integration)" />
            <DataRow label="RENDERING" value="SPA + SSG prerender via scripts/prerender.mjs" />
            <DataRow label="LANGUAGE" value="EN / ES bilingual — full content parity" />
            <DataRow label="HUNT STORAGE" value="localStorage — persists across sessions, no backend" />
            <DataRow label="HUNT TRIGGERS" value="5 DOM events + 1 keyboard sequence (Konami)" />
            <DataRow label="DESIGN SYSTEM" value="Bebas Neue (display) + JetBrains Mono (mono)" />
            <DataRow label="COLOR" value="#080808 bg · #ff2540 accent · CSS custom properties" />
            <DataRow label="MOTION" value="Emil Kowalski rules — transform + opacity only, ≤300ms" />
            <DataRow label="DEPLOYED" value="Vercel — preview + production on push" />
          </m.section>

          <Rule />

          {/* ── Section 5: Priority contact ── */}
          <m.section {...(shouldReduce ? {} : { initial: { opacity: 0, y: 14 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, ease: EASE } })}>
            <SysLabel>// document 05 — direct line</SysLabel>
            <h2 style={{ fontFamily: BEBAS, fontSize: 'clamp(2rem, 5vw, 4rem)', color: 'var(--color-fg)', lineHeight: 0.95, marginBottom: 16 }}>
              REACH OUT
            </h2>
            <p style={{ fontFamily: MONO, fontSize: '12px', color: 'var(--color-fg-dim)', lineHeight: 1.8, maxWidth: 480, marginBottom: 28 }}>
              You reached this page. You read this far. If you're building something that needs this kind of thinking, let's talk.
            </p>
            <a
              href="mailto:afp.fenrir@gmail.com?subject=[CLASSIFIED] Direct contact — Signal Hunt"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: MONO,
                fontSize: '10px',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color: 'var(--color-accent)',
                textDecoration: 'none',
                border: '1px solid rgba(255,37,64,0.3)',
                padding: '12px 20px',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,37,64,0.06)'; e.currentTarget.style.borderColor = 'rgba(255,37,64,0.5)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(255,37,64,0.3)'; }}
            >
              <span>◈</span>
              <span>OPEN DIRECT LINE</span>
            </a>

            <div style={{ marginTop: 40 }}>
              <Link
                to="/"
                style={{
                  fontFamily: MONO, fontSize: '10px', letterSpacing: '0.12em', textTransform: 'uppercase',
                  color: 'var(--color-fg-mute)', textDecoration: 'none',
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-fg)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-fg-mute)')}
              >
                <span>←</span>
                <span>Return to system</span>
              </Link>
            </div>
          </m.section>

        </div>
      </main>

      <Footer />
    </div>
  );
}
