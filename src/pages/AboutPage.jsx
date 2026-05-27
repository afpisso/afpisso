import { useRef, useState } from 'react';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import { useLang } from '../contexts/LangContext';
import { useHunt } from '../contexts/HuntContext';
import SignalTrigger from '../components/SignalTrigger';
import GlitchStrokeText from '../components/GlitchStrokeText';
import SectionTag from '../components/SectionTag';
import { usePageMeta } from '../hooks/usePageMeta';
import PhotoGridOverlay from '../components/PhotoGridOverlay';
import { m, useTransform, useScroll } from 'framer-motion';

function RevealLine({ delay = 0 }) {
  return (
    <m.div
      style={{ height: '1px', backgroundColor: 'var(--color-accent)', transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    />
  );
}

export default function AboutPage({ onMenuOpen }) {
  const { t, lang } = useLang();
  const about = t.about;

  usePageMeta({
    title: lang === 'es' ? 'Sobre mí' : 'About',
    description: lang === 'es'
      ? 'Sobre Andres Felipe Pisso — UX Lead y Diseñador Game UX/UI enfocado en claridad, retroalimentación y mejores decisiones.'
      : 'About Andres Felipe Pisso — UX Lead and Game UX/UI Designer focused on clarity, feedback, and better decisions.',
  });
  const photoRef = useRef(null);
  const photoMouseRef = useRef({ x: -1, y: -1 });
  const [photoHovered, setPhotoHovered] = useState(false);
  const { acquireSignal } = useHunt();

  // SIG-ABOUT: triple-click on the core question fires the signal (mirrors About.jsx)
  const cqClickCount = useRef(0);
  const cqClickTimer = useRef(null);
  function handleCoreQuestionClick() {
    cqClickCount.current++;
    clearTimeout(cqClickTimer.current);
    cqClickTimer.current = setTimeout(() => { cqClickCount.current = 0; }, 700);
    if (cqClickCount.current >= 3) {
      acquireSignal('sig-about');
      cqClickCount.current = 0;
    }
  }

  const { scrollYProgress: photoScroll } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(photoScroll, [0, 1], ['-6%', '6%']);

  return (
    <div style={{ minHeight: '100vh', position: 'relative', zIndex: 1, backgroundColor: 'var(--color-bg)' }}>
      <div className="scan-line" aria-hidden="true" />
      <Nav onMenuOpen={onMenuOpen} />
      <main>
        {/* Hero */}
        <section className="pt-40 pb-20" style={{ borderBottom: '1px solid var(--color-rule)' }}>
          <div className="max-w-[1400px] mx-auto px-6">
            <m.div
              className="mb-8"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <SectionTag label={about.label} page="005" />
            </m.div>
            <m.h1
              className="uppercase"
              style={{
                fontFamily: '"Bebas Neue", sans-serif',
                fontSize: 'clamp(3rem, 8vw, 7rem)',
                color: 'var(--color-fg)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
              }}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
            >
              Andres Felipe<br />
              <GlitchStrokeText stroke="1.5px rgba(245,245,243,0.5)">Pisso</GlitchStrokeText>
            </m.h1>
            <m.p
              className="mt-6"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '13px',
                color: 'var(--color-fg-dim)',
                letterSpacing: '0.05em',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.15 }}
            >
              {t.aboutPage.subheadline}
            </m.p>
          </div>
        </section>

        {/* Bio */}
        <section className="py-28">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
              {/* Left: photo + bio */}
              <div>
                <m.div
                  ref={photoRef}
                  className="relative overflow-hidden mb-10"
                  style={{ aspectRatio: '1/1', maxWidth: '520px' }}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.01, delay: 0.1 }}
                  onMouseEnter={() => setPhotoHovered(true)}
                  onMouseLeave={() => { setPhotoHovered(false); photoMouseRef.current = { x: -1, y: -1 }; }}
                  onMouseMove={e => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    photoMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
                  }}
                >
                  <m.div className="absolute inset-[-6%] w-[112%] h-[112%]" style={{ y: photoY }}>
                    <img
                      src="/photo.webp"
                      alt="Andres Felipe Pisso — Game UX/UI Designer"
                      className="w-full h-full object-cover object-center"
                      width="520"
                      height="520"
                      loading="lazy"
                      decoding="async"
                      style={{ filter: 'grayscale(15%) contrast(1.05)' }}
                    />
                  </m.div>
                  <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 55%)' }} aria-hidden="true" />
                  <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2" style={{ borderColor: 'var(--color-accent)' }} aria-hidden="true" />
                  <m.div
                    className="absolute inset-0"
                    style={{ backgroundColor: 'var(--color-accent)', transformOrigin: 'left' }}
                    initial={{ scaleX: 1 }}
                    whileInView={{ scaleX: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
                    aria-hidden="true"
                  />
                  {/* Interactive dot-grid hover overlay */}
                  <PhotoGridOverlay active={photoHovered} mousePosRef={photoMouseRef} />
                </m.div>

                {/* Core question */}
                <m.div
                  className="p-6 relative mb-8"
                  style={{ border: '1px solid var(--color-rule)', backgroundColor: 'rgba(8,8,8,0.42)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)', cursor: 'default', userSelect: 'none' }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  onClick={handleCoreQuestionClick}
                >
                  <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
                  <p className="mb-3" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                    {about.coreQuestionLabel}
                  </p>
                  <div className="flex items-center gap-3">
                    <p className="font-black uppercase" style={{ fontFamily: '"Bebas Neue", sans-serif', color: 'var(--color-fg)', fontSize: '24px', lineHeight: 1.2 }}>
                      {about.coreQuestion}
                    </p>
                    {/* SIG-ABOUT — also discoverable from /about page */}
                    <SignalTrigger id="sig-about" prominence="low" />
                  </div>
                </m.div>

                <m.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <p className="mb-5 leading-relaxed" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(240,238,234,0.75)', fontSize: '15px', lineHeight: 1.8 }}>
                    {about.bio1}
                  </p>
                  <p className="mb-5 leading-relaxed" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(240,238,234,0.6)', fontSize: '14px', lineHeight: 1.85 }}>
                    {about.bio2}
                  </p>
                  <p className="leading-relaxed" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(240,238,234,0.6)', fontSize: '14px', lineHeight: 1.85 }}>
                    {about.bio3}
                  </p>
                </m.div>
              </div>

              {/* Right: skills + timeline */}
              <div>
                <m.div
                  className="mb-12"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                >
                  <div className="sys-label mb-5">{about.expertiseLabel}</div>
                  <div className="space-y-6">
                    {about.skillGroups.map((group, gi) => (
                      <m.div
                        key={group.title}
                        initial={{ opacity: 0, y: 12 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.2 + gi * 0.06 }}
                      >
                        <div className="text-[10px] font-bold tracking-widest uppercase mb-2" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-accent)' }}>
                          {group.title}
                        </div>
                        <ul className="flex flex-wrap gap-1.5">
                          {group.items.map((item) => (
                            <li
                              key={item}
                              className="text-[11px] tracking-wider px-2 py-1 transition-all duration-200"
                              style={{ fontFamily: '"JetBrains Mono", monospace', border: '1px solid var(--color-rule)', color: 'var(--color-fg-dim)' }}
                              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,37,64,0.3)'; e.currentTarget.style.color = 'var(--color-fg)'; e.currentTarget.style.backgroundColor = 'rgba(255,37,64,0.05)'; }}
                              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--color-rule)'; e.currentTarget.style.color = 'var(--color-fg-dim)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                            >
                              {item}
                            </li>
                          ))}
                        </ul>
                      </m.div>
                    ))}
                  </div>
                </m.div>

                <div>
                  <div className="sys-label mb-5">{about.timelineLabel}</div>
                  <dl className="space-y-0">
                    {about.timeline.map((item, i) => (
                      <m.div
                        key={i}
                        className="flex gap-6 py-5 border-t"
                        style={{ borderColor: 'var(--color-rule)' }}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: 0.2 + i * 0.07 }}
                      >
                        <dt className="text-[11px] font-semibold flex-shrink-0 w-32 pt-0.5" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-mute)', letterSpacing: '0.05em' }}>
                          {item.period}
                        </dt>
                        <dd>
                          <div className="text-[14px] font-bold uppercase mb-1" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg)' }}>{item.role}</div>
                          <div className="text-[12px]" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)' }}>{item.context}</div>
                        </dd>
                      </m.div>
                    ))}
                    <div className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
                  </dl>
                </div>
              </div>
            </div>

            {/* Philosophy */}
            <m.div
              className="p-8 md:p-12 relative"
              style={{ border: '1px solid var(--color-rule)', backgroundColor: 'rgba(8,8,8,0.42)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute top-0 left-12 w-24 h-[2px]" style={{ backgroundColor: 'var(--color-accent)' }} aria-hidden="true" />
              <div className="sys-label mb-4">{about.philosophyLabel}</div>
              <p className="font-bold uppercase leading-tight" style={{ fontFamily: '"Bebas Neue", sans-serif', color: 'var(--color-fg)', fontSize: '22px', maxWidth: '700px' }}>
                {about.philosophy}
              </p>
            </m.div>

            {/* Availability signal */}
            <m.div
              className="mt-12 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
              style={{ border: '1px solid rgba(255,37,64,0.2)', backgroundColor: 'rgba(255,37,64,0.03)' }}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="absolute top-0 left-0 right-0 h-[1px]" style={{ backgroundColor: 'var(--color-accent)', opacity: 0.4 }} aria-hidden="true" />
              <div className="flex items-center gap-3">
                <span className="relative flex h-2 w-2 flex-shrink-0" aria-hidden="true">
                  <span className="pulse-dot" />
                </span>
                <div>
                  <div className="text-[10px] tracking-widest uppercase mb-0.5" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-accent)' }}>
                    {about.availabilityLabel || 'Availability'}
                  </div>
                  <div style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '13px', color: 'var(--color-fg)' }}>
                    {about.availabilityStatus || 'Available for freelance and remote contracts'}
                  </div>
                  <div className="mt-0.5" style={{ fontFamily: '"JetBrains Mono", monospace', fontSize: '11px', color: 'var(--color-fg-dim)' }}>
                    {about.availabilityContext || 'Game UX/UI design, UX leadership, UI systems — remote, global'}
                  </div>
                </div>
              </div>
              <a
                href="mailto:andres@byandresfe.com"
                className="inline-flex items-center gap-2 text-[10px] tracking-widest uppercase flex-shrink-0"
                style={{ fontFamily: '"JetBrains Mono", monospace', color: '#0a0a0a', backgroundColor: 'var(--color-accent)', padding: '8px 16px', textDecoration: 'none', clipPath: 'polygon(0 0, calc(100% - 6px) 0, 100% 6px, 100% 100%, 6px 100%, 0 calc(100% - 6px))' }}
              >
                {about.availabilityCta || 'Get in touch'}
                <span aria-hidden>→</span>
              </a>
            </m.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
