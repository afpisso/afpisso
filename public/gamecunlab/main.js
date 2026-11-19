// GAME CUN LAB — comportamiento de la landing (sin dependencias)

// Formulario oficial de registro. Solo lo abren los botones "Registrar mis códigos" ([data-form-open]);
// los enlaces "Ya tengo mis códigos" van al ancla #registro.
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLSfB2RwsJnDpivFp2RFbHw8AVpbEEniTsscBvyIaEX8haJiBrg/viewform";

// Única fuente de fechas (hora de Colombia, UTC-5).
const START = new Date("2026-11-19T16:00:00-05:00").getTime(); // apertura del juego
const END = new Date("2026-11-20T13:00:00-05:00").getTime();   // cierre del juego
// Cierre del formulario: sin confirmar. Mientras sea null el formulario no se cierra solo.
// Si se confirma una fecha distinta, ponla aquí (p. ej. "2026-11-20T18:00:00-05:00").
const FORM_END = null;

const root = document.documentElement;

// Permite revisar estados: ?now=2026-11-19T18:00:00-05:00
const nowOverride = (() => {
  const v = new URLSearchParams(location.search).get("now");
  const t = v ? new Date(v).getTime() : NaN;
  return Number.isNaN(t) ? null : t - Date.now();
})();
const now = () => Date.now() + (nowOverride ?? 0);

/* ---------- Formulario ---------- */
const formButtons = document.querySelectorAll("[data-form-open]");
formButtons.forEach((a) => {
  if (!FORM_URL) { a.setAttribute("aria-disabled", "true"); return; }
  a.href = FORM_URL;
  a.target = "_blank";
  a.rel = "noopener";
  a.insertAdjacentHTML("beforeend", '<span class="sr-only">(se abre en una pestaña nueva)</span>');
});

/* ---------- Reglas desplegables ---------- */
const terms = document.getElementById("reglas-detalle");
const openTerms = () => { if (terms) terms.open = true; };
document.querySelectorAll("[data-open-rules]").forEach((a) => a.addEventListener("click", openTerms));
if (location.hash === "#reglas-detalle") openTerms();

/* ---------- Estado del concurso + cuenta regresiva ---------- */
const $ = (s) => document.querySelector(s);
const label = $("[data-status-label]");
const sr = $("[data-status-sr]");
const countdown = $("[data-countdown]");
const formClosedMsg = $("[data-form-closed]");
const units = {};
document.querySelectorAll("[data-unit]").forEach((el) => (units[el.dataset.unit] = el));

const LABELS = {
  before: "El concurso comienza el 19 nov a las 4:00 p. m.",
  live: "Concurso abierto. Cierra el 20 nov a la 1:00 p. m.",
  closed: "Concurso finalizado",
};

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
let timer = 0;

function update() {
  const t = now();
  const state = t < START ? "before" : t < END ? "live" : "closed";
  const formOpen = FORM_END === null || t < new Date(FORM_END).getTime();
  const left = Math.max(0, (state === "before" ? START : END) - t);

  if (state !== lastState) {
    root.dataset.state = state;
    label.textContent = LABELS[state];
    countdown.hidden = state === "closed";
    lastState = state;
  }
  root.dataset.form = formOpen ? "open" : "closed";
  if (formClosedMsg) formClosedMsg.hidden = formOpen;

  if (state !== "closed") {
    const s = Math.floor(left / 1000);
    units.d.textContent = pad(Math.floor(s / 86400));
    units.h.textContent = pad(Math.floor((s % 86400) / 3600));
    units.m.textContent = pad(Math.floor((s % 3600) / 60));
    units.s.textContent = pad(s % 60);
  }

  // Lectores de pantalla: se actualiza por minuto, no por segundo
  const minute = Math.floor(left / 60000);
  if (minute !== lastSrMinute || state === "closed") {
    lastSrMinute = minute;
    sr.textContent =
      state === "before" ? `Faltan ${spell(left)} para que comience el concurso.` :
      state === "live" ? `El concurso está abierto. Faltan ${spell(left)} para el cierre.` :
      "El concurso finalizó.";
  }

  // Al terminar, el contador se detiene (salvo que falte cerrar el formulario)
  if (state === "closed" && formOpen && FORM_END === null) clearInterval(timer);
}

update();
timer = setInterval(update, 1000);

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
