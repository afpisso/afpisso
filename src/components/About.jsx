import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLang } from '../contexts/LangContext';
import PhotoGridOverlay from './PhotoGridOverlay';
import SectionHeading from './SectionHeading';
import { m, useTransform, useScroll } from 'framer-motion';

export default function About() {
  const photoRef = useRef(null);
  const photoMouseRef = useRef({ x: -1, y: -1 });
  const [photoHovered, setPhotoHovered] = useState(false);
  const { t } = useLang();
  const about = t.about;

  const { scrollYProgress: photoScroll } = useScroll({
    target: photoRef,
    offset: ['start end', 'end start'],
  });
  const photoY = useTransform(photoScroll, [0, 1], ['-6%', '6%']);

  return (
    <section id="about" className="py-40 relative" style={{ borderTop: '1px solid var(--color-rule)' }}>
      {/* Mobile: solid bg */}
      <div className="lg:hidden absolute inset-0 pointer-events-none" style={{ backgroundColor: 'var(--color-bg)' }} />
      {/* Desktop: content left, particles right */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none" style={{
        background: 'linear-gradient(to right, #0a0a0a 0%, #0a0a0a 60%, rgba(10,10,10,0.92) 64%, rgba(10,10,10,0.55) 70%, rgba(10,10,10,0.15) 78%, transparent 85%)',
      }} />
      <div className="relative z-10 lg:max-w-[62%] lg:mr-auto px-6">
        {/* Section heading */}
        <div className="mb-16">
          <SectionHeading
            label={about.label.split('/')[0].trim()}
            title={about.sectionTitle}
            page="004"
          />
        </div>

        {/* ── Core question — typographic statement ── */}
        {/* This is the single question that drives every design decision on this portfolio. */}
        {/* Full-bleed Bebas at ~15vw: the jury screenshot moment. */}
        <m.div
          className="mb-20 overflow-hidden"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              marginBottom: 16,
            }}
          >
            <div style={{ width: 18, height: 1, backgroundColor: 'var(--color-accent)', opacity: 0.5 }} />
            <span
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                fontSize: '9px',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,37,64,0.45)',
                fontWeight: 700,
              }}
            >
              // core question
            </span>
          </div>
          <p
            style={{
              fontFamily: '"Bebas Neue", sans-serif',
              fontSize: 'clamp(2.8rem, 10vw, 9rem)',
              lineHeight: 0.92,
              letterSpacing: '0.01em',
              color: 'var(--color-fg)',
            }}
          >
            Where is the<br />
            <span style={{ color: 'var(--color-accent)' }}>player</span> guessing?
          </p>
          <p
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              color: 'var(--color-fg-mute)',
              letterSpacing: '0.06em',
              marginTop: 20,
              maxWidth: 420,
              lineHeight: 1.75,
            }}
          >
            {about.philosophy}
          </p>
        </m.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          {/* Left: photo + bio */}
          <div>
            {/* Photo with red sweep reveal */}
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
              {/* Parallax photo */}
              <m.div
                className="absolute inset-[-6%] w-[112%] h-[112%]"
                style={{ y: photoY }}
              >
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

              {/* Dark gradient overlay */}
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ background: 'linear-gradient(to top, rgba(8,8,8,0.55) 0%, transparent 55%)' }}
              />
              {/* Corner mark */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2"
                style={{ borderColor: 'var(--color-accent)' }}
              />

              {/* Red sweep reveal overlay */}
              <m.div
                aria-hidden="true"
                className="absolute inset-0"
                style={{ backgroundColor: 'var(--color-accent)', transformOrigin: 'left' }}
                initial={{ scaleX: 1 }}
                whileInView={{ scaleX: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1], delay: 0.15 }}
              />

              {/* Interactive dot-grid hover overlay */}
              <PhotoGridOverlay active={photoHovered} mousePosRef={photoMouseRef} />
            </m.div>

            {/* Core question */}
            <m.div
              className="mb-10 p-6 relative glass"
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(8,8,8,0.42)',
                boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.4)',
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div
                aria-hidden="true"
                className="absolute top-0 left-0 right-0 h-[1px]"
                style={{ backgroundColor: 'var(--color-accent)' }}
              />
              <p
                className="mb-3"
                style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase' }}
              >
                {about.coreQuestionLabel}
              </p>
              <p
                className="font-black uppercase"
                style={{ fontFamily: '"Bebas Neue", sans-serif', color: 'var(--color-fg)', fontSize: '24px', lineHeight: 1.2 }}
              >
                {about.coreQuestion}
              </p>
            </m.div>

            <m.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p
                className="mb-5 leading-relaxed"
                style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(240,238,234,0.75)', fontSize: '15px', lineHeight: 1.8 }}
              >
                {about.bio1}
              </p>
              <p
                className="mb-5 leading-relaxed"
                style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(240,238,234,0.6)', fontSize: '14px', lineHeight: 1.85 }}
              >
                {about.bio2}
              </p>
              <p
                className="mb-8 leading-relaxed"
                style={{ fontFamily: '"JetBrains Mono", monospace', color: 'rgba(240,238,234,0.6)', fontSize: '14px', lineHeight: 1.85 }}
              >
                {about.bio3}
              </p>

              <Link
                to="/about"
                className="flex items-center gap-2 text-[10px] tracking-widest uppercase transition-colors duration-200 w-fit"
                style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-mute)' }}
                onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
                onMouseLeave={e => e.currentTarget.style.color = 'var(--color-fg-mute)'}
              >
                <span>{t.about.fullProfile}</span>
                <span aria-hidden="true">→</span>
              </Link>
            </m.div>
          </div>

          {/* Right: skill groups + timeline */}
          <div>
            {/* Skill groups */}
            <m.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="sys-label mb-5" id="expertise-label">{about.expertiseLabel}</div>
              <div className="space-y-6">
                {about.skillGroups.map((group, gi) => (
                  <m.div
                    key={group.title}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1], delay: 0.2 + gi * 0.06 }}
                  >
                    <div
                      className="text-[10px] font-bold tracking-widest uppercase mb-2"
                      style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-accent)' }}
                    >
                      {group.title}
                    </div>
                    <ul className="flex flex-wrap gap-1.5" aria-label={group.title}>
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className="text-[11px] tracking-wider px-2 py-1 transition-all duration-200"
                          style={{
                            fontFamily: '"JetBrains Mono", monospace',
                            border: '1px solid var(--color-rule)',
                            color: 'var(--color-fg-dim)',
                          }}
                          onMouseEnter={e => {
                            e.currentTarget.style.borderColor = 'rgba(255,37,64,0.3)';
                            e.currentTarget.style.color = 'var(--color-fg)';
                            e.currentTarget.style.backgroundColor = 'rgba(255,37,64,0.05)';
                          }}
                          onMouseLeave={e => {
                            e.currentTarget.style.borderColor = 'var(--color-rule)';
                            e.currentTarget.style.color = 'var(--color-fg-dim)';
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </m.div>
                ))}
              </div>
            </m.div>

            {/* Timeline */}
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
                    <dt
                      className="text-[11px] font-semibold flex-shrink-0 w-32 pt-0.5"
                      style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-mute)', letterSpacing: '0.05em' }}
                    >
                      {item.period}
                    </dt>
                    <dd>
                      <div
                        className="text-[14px] font-bold uppercase mb-1"
                        style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg)' }}
                      >
                        {item.role}
                      </div>
                      <div className="text-[12px]" style={{ fontFamily: '"JetBrains Mono", monospace', color: 'var(--color-fg-dim)' }}>
                        {item.context}
                      </div>
                    </dd>
                  </m.div>
                ))}
                <div className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
              </dl>
            </div>
          </div>
        </div>

        {/* Philosophy block */}
        <m.div
          className="p-8 md:p-12 relative glass"
          style={{
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(8,8,8,0.42)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.07), inset 0 -1px 0 rgba(0,0,0,0.15), 0 8px 32px rgba(0,0,0,0.4)',
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            aria-hidden="true"
            className="absolute top-0 left-12 w-24 h-[2px]"
            style={{ backgroundColor: 'var(--color-accent)' }}
          />
          <div className="sys-label mb-4">{about.philosophyLabel}</div>
          <p
            className="font-bold uppercase leading-tight"
            style={{ fontFamily: '"Bebas Neue", sans-serif', color: 'var(--color-fg)', fontSize: '22px', maxWidth: '700px' }}
          >
            {about.philosophy}
          </p>
        </m.div>
      </div>
    </section>
  );
}
