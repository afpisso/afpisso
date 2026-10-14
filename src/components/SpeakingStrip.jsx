import { m } from 'framer-motion';
import { useLang } from '../contexts/LangContext';
import { talks } from '../data/talks';
import SectionHeading from './SectionHeading';
import CyberBtn from './CyberBtn';
import TalkCard from './TalkCard';

// Home strip — latest talks and workshops, linking to /speaking
export default function SpeakingStrip() {
  const { lang } = useLang();
  const es = lang === 'es';

  return (
    <section
      id="speaking"
      className="py-20 md:py-24 relative"
      style={{ borderTop: '1px solid var(--color-rule)', backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="mb-12">
          <SectionHeading label="Speaking" title={es ? 'Charlas\ny talleres' : 'Talks &\nworkshops'} page="006" />
          <div className="flex items-start gap-12 mt-10 flex-wrap">
            <m.p
              className="max-w-sm"
              style={{ fontFamily: '"Play", sans-serif', fontSize: 12, color: 'var(--color-fg-dim)', lineHeight: 1.85 }}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.35 }}
            >
              {es
                ? 'Lo que aprendo en producción, compartido en eventos y comunidades. Con presentaciones y material para descargar.'
                : 'What I learn in production, shared at events and communities. With slides and downloadable material.'}
            </m.p>
            <CyberBtn to="/speaking" variant="ghost" size="sm">
              {es ? 'Ver todas las charlas' : 'View all talks'}
            </CyberBtn>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {talks.map((talk, i) => (
            <TalkCard key={talk.id} talk={talk} lang={lang} index={i} compact />
          ))}
        </div>
      </div>
    </section>
  );
}
