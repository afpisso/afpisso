// GAME CUN LAB — comportamiento de la landing (sin dependencias)

// Pega aquí el enlace del formulario oficial de registro (Google Forms, Microsoft Forms, etc.).
// Mientras esté vacío, los botones de registro llevan a la sección #registro y muestran un aviso.
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfB2RwsJnDpivFp2RFbHw8AVpbEEniTsscBvyIaEX8haJiBrg/viewform";

// Horario oficial (hora de Colombia, UTC-5)
const START = new Date("2026-11-19T16:00:00-05:00").getTime();
const END = new Date("2026-11-20T13:00:00-05:00").getTime();

const root = document.documentElement;

// Permite revisar estados: ?now=2026-11-19T18:00:00-05:00
const nowOverride = (() => {
  const v = new URLSearchParams(location.search).get("now");
  const t = v ? new Date(v).getTime() : NaN;
  return Number.isNaN(t) ? null : t - Date.now();
})();
const now = () => Date.now() + (nowOverride ?? 0);

/* ---------- Formulario ---------- */
if (FORM_URL) {
  document.querySelectorAll("[data-form-link]").forEach((a) => {
    a.href = FORM_URL;
    a.target = "_blank";
    a.rel = "noopener";
    if (!a.querySelector(".sr-only")) {
      a.insertAdjacentHTML("beforeend", '<span class="sr-only">(se abre en una pestaña nueva)</span>');
    }
  });
} else {
  const primary = document.querySelector("[data-form-primary]");
  const pending = document.querySelector("[data-form-pending]");
  if (primary) primary.setAttribute("aria-disabled", "true");
  if (primary) primary.addEventListener("click", (e) => { e.preventDefault(); pending?.focus(); });
  if (pending) { pending.hidden = false; pending.tabIndex = -1; }
}

/* ---------- Estado del concurso + cuenta regresiva ---------- */
const $ = (s) => document.querySelector(s);
const label = $("[data-status-label]");
const sr = $("[data-status-sr]");
const countdown = $("[data-countdown]");
const closedMsg = $("[data-status-closed]");
const units = {};
document.querySelectorAll("[data-unit]").forEach((el) => (units[el.dataset.unit] = el));
const trackBar = $("[data-track]");
const trackText = $("[data-track-text]");

const pad = (n) => String(n).padStart(2, "0");
const plural = (n, one, many) => `${n} ${n === 1 ? one : many}`;

function spell(ms) {
  const m = Math.floor(ms / 60000);
  const d = Math.floor(m / 1440), h = Math.floor((m % 1440) / 60), mm = m % 60;
  const parts = [];
  if (d) parts.push(plural(d, "día", "días"));
  if (h) parts.push(plural(h, "hora", "horas"));
  parts.push(plural(mm, "minuto", "minutos"));
  return parts.join(", ");
}

let lastState = "";
let lastSrMinute = -1;

function update() {
  const t = now();
  const state = t < START ? "before" : t < END ? "live" : "closed";
  const target = state === "before" ? START : END;
  const left = Math.max(0, target - t);

  if (state !== lastState) {
    root.dataset.state = state;
    label.textContent =
      state === "before" ? "El concurso abre en" :
      state === "live" ? "En vivo · el concurso cierra en" :
      "Concurso cerrado";
    countdown.hidden = state === "closed";
    closedMsg.hidden = state !== "closed";
    lastState = state;
  }

  if (state !== "closed") {
    const s = Math.floor(left / 1000);
    units.d.textContent = pad(Math.floor(s / 86400));
    units.h.textContent = pad(Math.floor((s % 86400) / 3600));
    units.m.textContent = pad(Math.floor((s % 3600) / 60));
    units.s.textContent = pad(s % 60);
  }

  // Texto para lectores de pantalla: se actualiza por minuto, no por segundo
  const minute = Math.floor(left / 60000);
  if (minute !== lastSrMinute) {
    lastSrMinute = minute;
    sr.textContent =
      state === "before" ? `El concurso abre en ${spell(left)}.` :
      state === "live" ? `El concurso está en curso y cierra en ${spell(left)}.` :
      "El concurso cerró. Se están verificando los resultados.";
  }

  // Línea de tiempo
  const p = Math.min(1, Math.max(0, (t - START) / (END - START)));
  trackBar.style.setProperty("--p", p.toFixed(4));
  const txt =
    state === "before" ? "Aún no empieza" :
    state === "live" ? `En curso · quedan ${spell(left)}` :
    "Finalizado";
  if (trackText.textContent !== txt) trackText.textContent = txt;
  trackBar.setAttribute("aria-label",
    state === "live" ? `Línea de tiempo: ${Math.round(p * 100)} % del concurso transcurrido.` :
    state === "before" ? "Línea de tiempo: el concurso aún no empieza." :
    "Línea de tiempo: el concurso terminó.");
}

update();
setInterval(update, 1000);

/* ---------- Revelado al hacer scroll ---------- */
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
const reveals = document.querySelectorAll("[data-reveal]");
if (reduce || !("IntersectionObserver" in window)) {
  reveals.forEach((el) => el.classList.add("is-in"));
} else {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
  reveals.forEach((el) => io.observe(el));
}

/* ---------- Barra superior, dock móvil y sección activa ---------- */
const topbar = $("[data-topbar]");
const dock = $("[data-dock]");
const hero = $("#inicio");

addEventListener("scroll", () => topbar.classList.toggle("is-scrolled", scrollY > 8), { passive: true });

// El dock móvil se muestra siempre, salvo cuando los botones del hero ya están en pantalla
const heroCtas = hero.querySelector(".cta-row");
const setDock = (visible) => { dock.classList.toggle("is-visible", visible); dock.inert = !visible; };
setDock(true);
new IntersectionObserver(([e]) => setDock(!e.isIntersecting), { threshold: 0.5 }).observe(heroCtas);

const navLinks = [...document.querySelectorAll(".nav a")];
const byId = new Map(navLinks.map((a) => [a.getAttribute("href").slice(1), a]));
const spy = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    navLinks.forEach((a) => a.removeAttribute("aria-current"));
    byId.get(e.target.id)?.setAttribute("aria-current", "true");
  });
}, { rootMargin: "-45% 0px -50% 0px" });
byId.forEach((_, id) => { const s = document.getElementById(id); if (s) spy.observe(s); });

/* ---------- Parallax del hero ----------
   Fondo y personaje se mueven a velocidades distintas al hacer scroll y, con mouse, siguen
   levemente al puntero. Solo en dispositivos con puntero fino: en táctiles la escena queda
   estática (el scroll con inercia hace que el movimiento por JS se vea a saltos y gasta batería).
   Con movimiento reducido no se activa. */
(() => {
  const scene = document.querySelector("[data-scene]");
  if (!scene) return;
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  const calm = matchMedia("(prefers-reduced-motion: reduce)");
  const bg = scene.querySelector("[data-depth-bg]");
  const agent = scene.querySelector("[data-depth-agent]");

  let heroH = hero.offsetHeight, visible = true, raf = 0;
  let px = 0, py = 0, cx = 0, cy = 0;
  const enabled = () => fine.matches && !calm.matches;

  function frame() {
    raf = 0;
    if (!enabled()) { bg.style.transform = agent.style.transform = ""; return; }
    cx += (px - cx) * 0.08;
    cy += (py - cy) * 0.08;
    const y = Math.min(Math.max(scrollY, 0), heroH);
    // El fondo baja más lento que la página (lejos); el personaje, menos todavía (cerca).
    bg.style.transform = `translate3d(${(-cx * 14).toFixed(2)}px, ${(y * 0.14 - cy * 8).toFixed(2)}px, 0)`;
    agent.style.transform = `translate3d(${(cx * 10).toFixed(2)}px, ${(y * 0.06 + Math.max(cy, 0) * 6).toFixed(2)}px, 0)`;
    if (Math.abs(px - cx) > 0.002 || Math.abs(py - cy) > 0.002) request();
  }
  const request = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };

  addEventListener("scroll", request, { passive: true });
  addEventListener("resize", () => { heroH = hero.offsetHeight; request(); }, { passive: true });
  hero.addEventListener("pointermove", (e) => {
    if (e.pointerType !== "mouse") return;
    px = e.clientX / innerWidth - 0.5;
    py = e.clientY / innerHeight - 0.5;
    request();
  });
  hero.addEventListener("pointerleave", () => { px = py = 0; request(); });
  fine.addEventListener("change", request);
  calm.addEventListener("change", request);
  new IntersectionObserver(([e]) => { visible = e.isIntersecting; request(); }).observe(hero);
  request();
})();
