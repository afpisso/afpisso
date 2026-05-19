import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import PhotoGridOverlay from './PhotoGridOverlay';

function RevealLine({ delay = 0 }) {
  return (
    <motion.div
      style={{ height: '1px', backgroundColor: 'var(--color-accent)', transformOrigin: 'left' }}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1], delay }}
    />
  );
}

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
    <section id="about" className="py-28" style={{ borderTop: '1px solid var(--color-rule)', backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-[1400px] mx-auto px-6">
        {/* Section label */}
        <motion.div
          className="flex items-center gap-4 mb-16"
          aria-hidden="true"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <RevealLine />
          <span className="sys-label whitespace-nowrap">{about.label}</span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-20">
          {/* Left: photo + bio */}
          <div>
            {/* Photo with red sweep reveal */}
            <motion.div
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
              <motion.div
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
              </motion.div>

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
              <motion.div
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
            </motion.div>

            {/* Core question */}
            <motion.div
              className="mb-10 p-6 relative"
              style={{ border: '1px solid var(--color-rule)', backgroundColor: 'rgba(8,8,8,0.42)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
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
            </motion.div>

            <motion.div
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
            </motion.div>
          </div>

          {/* Right: skill groups + timeline */}
          <div>
            {/* Skill groups */}
            <motion.div
              className="mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              <div className="sys-label mb-5" id="expertise-label">{about.expertiseLabel}</div>
              <div className="space-y-6">
                {about.skillGroups.map((group, gi) => (
                  <motion.div
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
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <div>
              <div className="sys-label mb-5">{about.timelineLabel}</div>
              <dl className="space-y-0">
                {about.timeline.map((item, i) => (
                  <motion.div
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
                  </motion.div>
                ))}
                <div className="border-t" style={{ borderColor: 'var(--color-rule)' }} />
              </dl>
            </div>
          </div>
        </div>

        {/* Philosophy block */}
        <motion.div
          className="p-8 md:p-12 relative"
          style={{ border: '1px solid var(--color-rule)', backgroundColor: 'rgba(8,8,8,0.42)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}
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
        </motion.div>
      </div>
    </section>
  );
}
