// App — design canvas with two artboards (isolated menu + overlay over site mock).
// Wires the Tweaks panel for live tuning.

const { useState, useEffect } = React;

// ── Subtle backdrop for the "isolated" artboard (hint of a site behind) ───
function IsolatedBackdrop({ inverted, accent }) {
  const bg = inverted ? '#e8e2d4' : '#0e0d0c';
  const fg = inverted ? 'rgba(10,10,10,0.55)' : 'rgba(245,245,243,0.55)';
  const line = inverted ? 'rgba(0,0,0,0.05)' : 'rgba(255,255,255,0.04)';
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: `
        ${bg}
        linear-gradient(${line} 1px, transparent 1px),
        linear-gradient(90deg, ${line} 1px, transparent 1px)
      `,
      backgroundSize: '100% 100%, 60px 60px, 60px 60px',
      fontFamily: '"JetBrains Mono", monospace',
    }}>
      {/* corner marks on the artboard itself */}
      <div style={{
        position: 'absolute', top: 16, right: 16, color: fg,
        fontSize: 10, letterSpacing: '0.16em', opacity: 0.6,
      }}>NO BG — MENU ISOLATED</div>
    </div>
  );
}

// ── Mock afpisso.com background (visible to right of the menu panel) ─────
function AfpissoMock({ inverted, accent }) {
  const fg = inverted ? '#0a0a0a' : '#f5f5f3';
  const bg = inverted ? '#f0ebde' : '#0c0c0b';
  const dim = inverted ? 'rgba(10,10,10,0.4)' : 'rgba(245,245,243,0.4)';
  const ln  = inverted ? 'rgba(0,0,0,.08)' : 'rgba(255,255,255,.07)';
  return (
    <div style={{
      position: 'absolute', inset: 0, background: bg, color: fg, overflow: 'hidden',
      fontFamily: '"JetBrains Mono", ui-monospace, monospace',
    }}>
      {/* faint grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(${ln} 1px, transparent 1px), linear-gradient(90deg, ${ln} 1px, transparent 1px)`,
        backgroundSize: '64px 64px',
        opacity: 0.6,
      }}/>

      {/* nav strip */}
      <div style={{
        position: 'relative',
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '22px 36px', fontSize: 12, letterSpacing: '0.12em',
        borderBottom: `1px solid ${ln}`,
      }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ width: 10, height: 10, background: accent }}/>
          AFPISSO<span style={{ opacity: 0.45 }}>·CC</span>
        </span>
        <span style={{ opacity: 0.5 }}>PORTFOLIO INDEX — 2026 / Q3</span>
        <span style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
          <span style={{ opacity: 0.55 }}>EN / ES</span>
          <span style={{
            padding: '6px 14px', border: `1px solid ${fg}`, opacity: 0.95,
            clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))',
          }}>MENU +</span>
        </span>
      </div>

      {/* hero — big text positioned right-half so it remains visible behind the menu */}
      <div style={{ position: 'relative', padding: '64px 36px 0', height: 'calc(100% - 110px)' }}>
        <div style={{ opacity: 0.55, fontSize: 11, letterSpacing: '0.14em', marginBottom: 24 }}>
          ▮ {' '}FEATURED &nbsp; · &nbsp; 003 / 012 &nbsp; · &nbsp; CASA HALO
        </div>

        <div style={{
          position: 'absolute', right: 36, top: 70,
          textAlign: 'right',
          fontFamily: '"Bebas Neue", sans-serif',
          fontSize: 220, lineHeight: 0.85, letterSpacing: '0.005em',
        }}>
          DESIGN.<br/>
          <span style={{ color: dim }}>BUILD.</span><br/>
          IMAGINE.
        </div>

        {/* placeholder work tile */}
        <div style={{
          position: 'absolute', right: 36, bottom: 70,
          width: 260, height: 160,
          background: `repeating-linear-gradient(45deg, ${inverted ? 'rgba(0,0,0,0.08)' : 'rgba(255,255,255,0.05)'} 0 6px, transparent 6px 14px)`,
          border: `1px solid ${ln}`,
          display: 'grid', placeItems: 'center', fontSize: 10, letterSpacing: '0.14em', opacity: 0.6,
          clipPath: 'polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px))',
        }}>PROJECT 003 — WIP</div>
      </div>

      {/* ticker */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '14px 36px', borderTop: `1px solid ${ln}`,
        display: 'flex', justifyContent: 'space-between', fontSize: 11, opacity: 0.55,
      }}>
        <span>CURRENTLY OPEN FOR PROJECTS — Q3 2026</span>
        <span>SCROLL ↓</span>
      </div>
    </div>
  );
}

// ── Open-menu button (floating top-right; shown when menu is closed) ─────
function OpenButton({ open, onOpen, inverted, accent }) {
  if (open) return null;
  const fg = inverted ? '#0a0a0a' : '#f5f5f3';
  return (
    <button
      onClick={onOpen}
      style={{
        position: 'absolute', top: 22, right: 36,
        zIndex: 50,
        padding: '10px 18px',
        background: 'transparent', color: fg, cursor: 'pointer',
        fontFamily: '"JetBrains Mono", monospace',
        fontSize: 12, letterSpacing: '0.16em',
        border: `1.5px solid ${fg}`,
        clipPath: 'polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))',
        display: 'flex', alignItems: 'center', gap: 10,
      }}
    >
      <span style={{ width: 8, height: 8, background: accent, display: 'inline-block' }} />
      MENU&nbsp;+
    </button>
  );
}

// ── Tweaks defaults (parseable JSON for host edit-mode) ───────────────────
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "#ff2540",
  "lang": "en",
  "hoverStyle": "block",
  "entryAnim": "glitch",
  "animSpeed": 1,
  "typeScale": 124,
  "inverted": false,
  "activeSection": "WORK"
}/*EDITMODE-END*/;

function App() {
  const [tweaks, setTweak] = useTweaks(TWEAK_DEFAULTS);
  const [lang, setLang] = useState(tweaks.lang || 'en');

  useEffect(() => { setTweak('lang', lang); /* eslint-disable-next-line */ }, [lang]);
  useEffect(() => { if (tweaks.lang !== lang) setLang(tweaks.lang); /* eslint-disable-next-line */ }, [tweaks.lang]);

  // Open/close state. Replay = close then open again.
  const [open, setOpen] = useState(true);
  const replay = () => {
    setOpen(false);
    setTimeout(() => setOpen(true), 700);
  };
  // Also re-fire when entry-relevant tweaks change
  useEffect(() => { replay(); /* eslint-disable-next-line */ }, [tweaks.entryAnim, tweaks.animSpeed, tweaks.inverted, tweaks.accent]);

  const menuProps = {
    inverted: tweaks.inverted,
    accent: tweaks.accent,
    lang,
    setLang,
    hoverStyle: tweaks.hoverStyle,
    entryAnim: tweaks.entryAnim,
    animSpeed: tweaks.animSpeed,
    typeScale: tweaks.typeScale,
    activeSection: tweaks.activeSection,
    onClose: () => setOpen(false),
  };

  return (
    <>
      <DesignCanvas>
        <DCSection id="isolated" title="Menú aislado" subtitle="El panel solo, sobre un fondo cuadriculado. Pasa el cursor sobre los ítems.">
          <DCArtboard id="iso-a" label="A · Menú · 1440 × 900" width={1440} height={900}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <MenuOverlay
                open={open}
                scope="A"
                accent={tweaks.accent}
                animSpeed={tweaks.animSpeed}
                inverted={tweaks.inverted}
                lang={lang}
                menuProps={menuProps}
              >
                <IsolatedBackdrop inverted={tweaks.inverted} accent={tweaks.accent} />
              </MenuOverlay>
              <OpenButton open={open} onOpen={() => setOpen(true)} inverted={tweaks.inverted} accent={tweaks.accent} />
            </div>
          </DCArtboard>
        </DCSection>

        <DCSection id="overlay" title="Sobre afpisso.com" subtitle="Apertura completa: blur en el fondo → sheet rojo → menú revelado.">
          <DCArtboard id="ovr-a" label="B · Overlay · 1440 × 900" width={1440} height={900}>
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
              <MenuOverlay
                open={open}
                scope="B"
                accent={tweaks.accent}
                animSpeed={tweaks.animSpeed}
                inverted={tweaks.inverted}
                lang={lang}
                menuProps={menuProps}
              >
                <AfpissoMock inverted={tweaks.inverted} accent={tweaks.accent} />
              </MenuOverlay>
              <OpenButton open={open} onOpen={() => setOpen(true)} inverted={tweaks.inverted} accent={tweaks.accent} />
            </div>
          </DCArtboard>
        </DCSection>
      </DesignCanvas>

      <TweaksPanel title="Tweaks">
        <TweakSection label="Color">
          <TweakColor
            label="Acento"
            value={tweaks.accent}
            options={['#ff2540', '#c6ff3d', '#ff5b1f', '#3d7bff', '#ffffff', '#ff3da8']}
            onChange={v => setTweak('accent', v)}
          />
          <TweakToggle
            label="Invertir (claro)"
            value={tweaks.inverted}
            onChange={v => setTweak('inverted', v)}
          />
        </TweakSection>

        <TweakSection label="Animación">
          <TweakSelect
            label="Entrada"
            value={tweaks.entryAnim}
            options={[
              { value: 'glitch',    label: 'Glitch + scramble' },
              { value: 'curtain-v', label: 'Cortina vertical' },
              { value: 'curtain-h', label: 'Cortina horizontal' },
              { value: 'mask',      label: 'Mask reveal' },
            ]}
            onChange={v => setTweak('entryAnim', v)}
          />
          <TweakSlider
            label="Velocidad"
            value={tweaks.animSpeed}
            min={0.5} max={2.5} step={0.1}
            unit="×"
            onChange={v => setTweak('animSpeed', v)}
          />
          <TweakButton label="Repetir animación" onClick={replay} />
          <TweakButton label={open ? 'Cerrar menú' : 'Abrir menú'} onClick={() => setOpen(o => !o)} />
        </TweakSection>

        <TweakSection label="Hover">
          <TweakRadio
            label="Estilo"
            value={tweaks.hoverStyle}
            options={[
              { value: 'block',     label: 'Bloque' },
              { value: 'underline', label: 'Línea' },
              { value: 'shift',     label: 'Shift' },
            ]}
            onChange={v => setTweak('hoverStyle', v)}
          />
        </TweakSection>

        <TweakSection label="Tipografía">
          <TweakSlider
            label="Tamaño títulos"
            value={tweaks.typeScale}
            min={72} max={180} step={2}
            unit="px"
            onChange={v => setTweak('typeScale', v)}
          />
        </TweakSection>

        <TweakSection label="Idioma">
          <TweakRadio
            label="Idioma"
            value={tweaks.lang}
            options={[
              { value: 'en', label: 'EN' },
              { value: 'es', label: 'ES' },
            ]}
            onChange={v => setTweak('lang', v)}
          />
        </TweakSection>

        <TweakSection label="Estado">
          <TweakSelect
            label="Sección activa"
            value={tweaks.activeSection}
            options={[
              { value: 'WORK',    label: 'Work / Trabajo' },
              { value: 'ABOUT',   label: 'About / Sobre mí' },
              { value: 'JOURNAL', label: 'Journal / Diario' },
              { value: 'CONTACT', label: 'Contact / Contacto' },
            ]}
            onChange={v => setTweak('activeSection', v)}
          />
        </TweakSection>
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
