import { createContext, useContext, useState, useEffect, useMemo } from 'react';

const translations = {
  en: {
    nav: {
      status: 'Available',
      statusSub: 'Freelance · Remote contracts',
      menu: 'MENU +',
      logoLabel: 'ByAndresFe — back to home',
      logoSub: 'Game UX / UI',
      work: 'Work',
      about: 'About',
      resume: 'Resume',
      notes: 'Notes',
      contact: 'Contact',
      lang: 'ES',
    },
    hero: {
      label: 'UX Lead / Game UX/UI Designer',
      focusAreasLabel: 'Current focus areas',
      subtitle: 'Game UX/UI and interface systems for clearer decisions and better player experiences.',
      body: 'I design interfaces, flows, and UX systems for games, digital products, and interactive experiences. My work sits between clarity, feedback, production, and player decision-making.',
      cta1: 'View selected work',
      cta2: 'Download resume',
      proof: 'UX Lead · Game UX/UI Designer · 11+ years across games, products, and interactive experiences.',
      tags: ['VR UX', 'UEFN', 'HUD Systems', 'Fortnite', 'Player Clarity'],
    },
    trust: {
      label: 'Track record',
      stats: [
        { value: '11+', label: 'Years of experience' },
        { value: '80+', label: 'Projects shipped' },
        { value: '20+', label: 'Clients and studios' },
        { value: 'VR · UEFN · Mobile · Product', label: 'Platforms' },
      ],
    },
    whatIDo: {
      label: 'What I do',
      headline: 'Design across three domains.',
      items: [
        {
          title: 'Game UX/UI',
          body: 'HUDs, menus, onboarding, feedback systems, player flows, readability, and progression clarity.',
          tags: ['VR', 'UEFN', 'HUD', 'Onboarding', 'Fortnite'],
        },
        {
          title: 'UX Systems',
          body: 'Reusable UI patterns, states, components, interaction rules, documentation, and handoff.',
          tags: ['Components', 'Design Systems', 'Handoff', 'Documentation'],
        },
        {
          title: 'Digital Product',
          body: 'Information architecture, flows, prototypes, interface design, usability, and product clarity.',
          tags: ['IA', 'Wireframes', 'Prototyping', 'Usability'],
        },
      ],
    },
    howIWork: {
      label: 'How I work',
      headline: 'From hesitation to signal.',
      body: 'Every project starts with a loop, a gap, and a signal. The process is systematic, not decorative.',
      steps: [
        { num: '01', title: 'Understand the loop', body: 'Map the player or user journey. Identify where actions, consequences, and feedback happen.' },
        { num: '02', title: 'Find where hesitation starts', body: 'Locate the friction points. What forces a guess? What creates doubt or confusion?' },
        { num: '03', title: 'Design the signal', body: 'Build the interface response that removes the guesswork. Clear feedback, better hierarchy, faster decisions.' },
        { num: '04', title: 'Test the decision', body: 'Validate the design against the problem. Does it reduce hesitation? Does the player or user move forward with confidence?' },
        { num: '05', title: 'Document the system', body: 'Turn decisions into reusable rules. Components, states, handoff specs, and edge case notes the team can act on.' },
      ],
    },
    caseFiles: {
      label: 'Selected Work',
      headline: 'Case files.',
      viewAll: 'View all work',
      openCase: 'Open case',
      metaRole: 'Role',
      metaYear: 'Year',
      metaFocus: 'Focus',
    },
    systemsLab: {
      label: 'Systems Lab / Process',
      principlesLabel: 'Design principles',
      modulesLabel: 'Active work modules',
      description: 'These are not aspirational values. They are practical constraints applied to every design decision. They exist because game UX fails in predictable ways, and these principles address the most common failure modes.',
      principles: [
        { id: '01', title: 'Clarity before polish', body: 'If a player has to read something twice to understand it, the visual finish does not matter. Clarity ships first.' },
        { id: '02', title: 'Feedback before guesswork', body: 'The player should always know what happened, what is happening and what will happen next. If they are guessing, the interface has failed.' },
        { id: '03', title: 'Systems before isolated screens', body: 'Designing a single screen without understanding its connected states produces interfaces that work in demos and break in production.' },
        { id: '04', title: 'Useful before decorative', body: 'Motion, color and visual detail earn their place by communicating something. Decoration that carries no signal is noise.' },
        { id: '05', title: 'Better signals, better decisions', body: 'The output of good UX is not a beautiful screen. It is a player who made the right decision with less friction than before.' },
      ],
      modules: [
        { label: 'HUD Reviews', tag: 'Analysis' },
        { label: 'UX Systems', tag: 'Architecture' },
        { label: 'UI Components & States', tag: 'Systems' },
        { label: 'Accessibility Reviews', tag: 'Compliance' },
        { label: 'Player Onboarding', tag: 'Flows' },
        { label: 'LiveOps UX', tag: 'Product' },
        { label: 'Figma Workflows', tag: 'Tools' },
        { label: 'UEFN Workflows', tag: 'Platform' },
        { label: 'Documentation', tag: 'Handoff' },
      ],
    },
    fieldNotes: {
      label: 'Field Notes / Thinking',
      headline: 'Notes and frameworks.',
      description: 'Breakdowns, frameworks, and reference material built from working on real game UX problems. Not theory. Things that have been used or tested.',
      readNote: 'Read note',
      viewAll: 'View all notes',
    },
    about: {
      label: 'Operator Profile / About',
      fullProfile: 'Full profile',
      headline: 'Where does clarity break?',
      bio1: 'I am Andres Felipe Pisso, a UX Lead and Game UX/UI Designer working across games, digital products, and interactive experiences.',
      bio2: 'My work usually starts with one question: where does clarity break? In games, that can show up as a HUD that pulls attention away from the action, a reward flow that creates hesitation, or a progression system that makes players guess what changed. In product, it often appears as unclear navigation, weak feedback, or screens that look clean but do not help people decide.',
      bio3: 'I care about interfaces that reduce doubt. Clear signals. Useful feedback. Systems that help teams move faster without losing consistency.',
      coreQuestion: '"Where is the player guessing?"',
      coreQuestionLabel: 'Core question',
      philosophy: 'Good game UX is not invisible. It is present and clear enough that the player never has to think about the interface.',
      philosophyLabel: 'Design philosophy',
      expertiseLabel: 'Expertise areas',
      timelineLabel: 'Career path',
      timeline: [
        { period: '2023 – Now', role: 'UX Lead', context: 'Game UX, LiveOps, UEFN, VR experiences' },
        { period: '2022 – 2023', role: 'Senior Game UX/UI Designer', context: 'UI systems, HUD, player flows' },
        { period: '2020 – 2022', role: 'Game Designer / UX/UI', context: 'Mobile games, educational products' },
      ],
      expertise: [
        'Game UX/UI', 'UX Leadership', 'UI Systems', 'Product Thinking',
        'Game Design', 'Documentation', 'Accessibility', 'UEFN / Unreal',
        'Cross-functional collaboration', 'Player Onboarding', 'HUD Design', 'LiveOps UX', 'VR UX',
      ],
      skillGroups: [
        { title: 'Game UX/UI', items: ['HUD', 'Menus', 'Onboarding', 'Progression', 'Reward flows', 'Feedback', 'Readability', 'Player loops', 'VR UX', 'UEFN UX'] },
        { title: 'UX Systems', items: ['Design systems', 'Components', 'States', 'Patterns', 'Documentation', 'Handoff', 'QA support', 'Accessibility checks'] },
        { title: 'Product UX/UI', items: ['Information architecture', 'Flows', 'Wireframes', 'Prototypes', 'Usability', 'Interface design', 'Stakeholder alignment'] },
        { title: 'Tools', items: ['Figma', 'FigJam', 'UEFN', 'Unreal context', 'Jira', 'Confluence', 'Adobe tools', 'Prototyping tools'] },
      ],
    },
    contact: {
      label: 'Signal Contact',
      channelsLabel: 'Contact channels',
      linkedinCta: 'Schedule a call on LinkedIn',
      contactMe: 'Contact me →',
      headline: 'If my work fits your team or project, reaching out should take less than a minute.',
      ctaLine1: 'If the work',
      ctaStroke: 'fits your team,',
      ctaLine3: 'reach out.',
      cta: 'Send a signal',
      email: 'afpisso@gmail.com',
      linkedin: 'linkedin.com/in/byandresfe',
      instagram: '@byandresfe',
      x: '@byandresfe',
      location: 'Colombia — remote & international',
      formLabels: {
        name: 'Name',
        email: 'Email',
        company: 'Company or studio',
        type: 'Type of opportunity',
        message: 'Message',
        send: 'Send message',
        sending: 'Sending...',
        success: 'Message sent. I will get back to you.',
      },
      opportunityTypes: ['Studio role', 'Product role', 'Freelance project', 'Consulting', 'Speaking or workshop', 'Other'],
    },
    footer: {
      tagline: 'Game UX/UI and product design focused on clarity, feedback, and better decisions.',
      links: ['Work', 'About', 'Resume', 'Notes', 'Contact'],
      copy: '© 2026 Andres Felipe Pisso',
      handle: '@byandresfe',
    },
    resume: {
      label: 'Resume',
      headline: 'Andres Felipe Pisso',
      subheadline: 'UX Lead · Game UX/UI Designer',
      download: 'Download PDF',
      sections: {
        summary: 'Summary',
        experience: 'Selected experience',
        projects: 'Selected projects',
        skills: 'Skills',
        tools: 'Tools',
        education: 'Education',
        languages: 'Languages',
        contact: 'Contact',
      },
      summary: '11+ years designing UX/UI systems for games, digital products, and interactive experiences. Focused on clarity, feedback, player decision-making, and production-ready interfaces. Experience across VR, UEFN, mobile, and digital product.',
      languageList: ['Spanish — Native', 'English — Professional'],
      locationRemote: 'Colombia — Remote',
    },
    casePage: {
      notFound: 'Case not found.',
      backToWork: '← Back to work',
      metaRole: 'Role',
      metaPlatform: 'Platform',
      metaYear: 'Year',
      quickFacts: 'Quick facts',
      prev: '← Prev',
      next: 'Next →',
      sections: {
        executiveSummary: 'Executive summary',
        context: 'Context',
        challenge: 'The challenge',
        myRole: 'My role',
        constraints: 'Constraints',
        uxApproach: 'UX approach',
        keyDecisions: 'Key decisions',
        keyDecisionsIntro: 'These are the design choices that shaped the most important UX outcomes of the project.',
        problem: 'Problem',
        decision: 'Decision',
        whyItMattered: 'Why it mattered',
        deliverables: 'Deliverables',
        outcome: 'Outcome',
        nextSteps: 'What I would check next',
      },
    },
    notFound: {
      headline: 'Page not found.',
      body: 'The page you are looking for does not exist or has been moved.',
      cta: 'Back to home',
    },
    caseStatuses: {
      'public': 'Public Case Study',
      'nda-safe': 'NDA-Safe Breakdown',
      'password-protected': 'Password Protected',
      'coming-soon': 'Coming Soon',
      'legacy': 'Legacy Work',
    },
  },
  es: {
    nav: {
      status: 'Disponible',
      statusSub: 'Freelance · Contratos remotos',
      menu: 'MENU +',
      logoLabel: 'ByAndresFe — volver al inicio',
      logoSub: 'Game UX / UI',
      work: 'Trabajo',
      about: 'Sobre mí',
      resume: 'CV',
      notes: 'Notas',
      contact: 'Contacto',
      lang: 'EN',
    },
    hero: {
      label: 'UX Lead / Diseñador Game UX/UI',
      focusAreasLabel: 'Áreas de enfoque actuales',
      subtitle: 'UX/UI y sistemas de interfaz para decisiones más claras y mejores experiencias de jugador.',
      body: 'Diseño interfaces, flujos y sistemas UX para juegos, productos digitales y experiencias interactivas. Mi trabajo conecta claridad, retroalimentación, producción y toma de decisiones del jugador.',
      cta1: 'Ver trabajo seleccionado',
      cta2: 'Descargar CV',
      proof: 'UX Lead · Diseñador Game UX/UI · 11+ años en juegos, productos y experiencias interactivas.',
      tags: ['VR UX', 'UEFN', 'Sistemas HUD', 'Fortnite', 'Claridad del jugador'],
    },
    trust: {
      label: 'Historial',
      stats: [
        { value: '11+', label: 'Años de experiencia' },
        { value: '80+', label: 'Proyectos entregados' },
        { value: '20+', label: 'Clientes y estudios' },
        { value: 'VR · UEFN · Mobile · Producto', label: 'Plataformas' },
      ],
    },
    whatIDo: {
      label: 'Qué hago',
      headline: 'Diseño en tres dominios.',
      items: [
        {
          title: 'Game UX/UI',
          body: 'HUDs, menús, onboarding, sistemas de retroalimentación, flujos de jugador, legibilidad y claridad de progresión.',
          tags: ['VR', 'UEFN', 'HUD', 'Onboarding', 'Fortnite'],
        },
        {
          title: 'Sistemas UX',
          body: 'Patrones de UI reutilizables, estados, componentes, reglas de interacción, documentación y handoff.',
          tags: ['Componentes', 'Design Systems', 'Handoff', 'Documentación'],
        },
        {
          title: 'Producto Digital',
          body: 'Arquitectura de información, flujos, prototipos, diseño de interfaz, usabilidad y claridad de producto.',
          tags: ['IA', 'Wireframes', 'Prototipado', 'Usabilidad'],
        },
      ],
    },
    howIWork: {
      label: 'Cómo trabajo',
      headline: 'De la duda a la señal.',
      body: 'Cada proyecto empieza con un loop, una brecha y una señal. El proceso es sistemático, no decorativo.',
      steps: [
        { num: '01', title: 'Entender el loop', body: 'Mapear el recorrido del jugador o usuario. Identificar dónde ocurren acciones, consecuencias y retroalimentación.' },
        { num: '02', title: 'Encontrar dónde empieza la hesitación', body: 'Localizar los puntos de fricción. ¿Qué obliga a adivinar? ¿Qué genera duda o confusión?' },
        { num: '03', title: 'Diseñar la señal', body: 'Construir la respuesta de interfaz que elimina la ambigüedad. Retroalimentación clara, mejor jerarquía, decisiones más rápidas.' },
        { num: '04', title: 'Testear la decisión', body: 'Validar el diseño contra el problema. ¿Reduce la hesitación? ¿El jugador o usuario avanza con confianza?' },
        { num: '05', title: 'Documentar el sistema', body: 'Convertir decisiones en reglas reutilizables. Componentes, estados, specs de handoff y notas de casos borde.' },
      ],
    },
    caseFiles: {
      label: 'Trabajo seleccionado',
      headline: 'Casos de estudio.',
      viewAll: 'Ver todo el trabajo',
      openCase: 'Abrir caso',
      metaRole: 'Rol',
      metaYear: 'Año',
      metaFocus: 'Enfoque',
    },
    systemsLab: {
      label: 'Systems Lab / Proceso',
      principlesLabel: 'Principios de diseño',
      modulesLabel: 'Módulos de trabajo activo',
      description: 'Estos no son valores aspiracionales. Son restricciones prácticas aplicadas a cada decisión de diseño. Existen porque el UX en juegos falla de maneras predecibles, y estos principios abordan los modos de falla más comunes.',
      principles: [
        { id: '01', title: 'Claridad antes que pulido', body: 'Si un jugador tiene que leer algo dos veces para entenderlo, el acabado visual no importa. La claridad va primero.' },
        { id: '02', title: 'Retroalimentación antes que suposición', body: 'El jugador siempre debe saber qué pasó, qué está pasando y qué pasará después. Si está adivinando, la interfaz ha fallado.' },
        { id: '03', title: 'Sistemas antes que pantallas aisladas', body: 'Diseñar una pantalla sin entender sus estados conectados produce interfaces que funcionan en demos y se rompen en producción.' },
        { id: '04', title: 'Útil antes que decorativo', body: 'El movimiento, el color y el detalle visual se ganan su lugar comunicando algo. La decoración que no transmite señal es ruido.' },
        { id: '05', title: 'Mejores señales, mejores decisiones', body: 'El resultado del buen UX no es una pantalla bonita. Es un jugador que tomó la decisión correcta con menos fricción que antes.' },
      ],
      modules: [
        { label: 'Revisiones de HUD', tag: 'Análisis' },
        { label: 'Sistemas UX', tag: 'Arquitectura' },
        { label: 'Componentes y estados UI', tag: 'Sistemas' },
        { label: 'Revisiones de accesibilidad', tag: 'Cumplimiento' },
        { label: 'Onboarding del jugador', tag: 'Flujos' },
        { label: 'LiveOps UX', tag: 'Producto' },
        { label: 'Workflows en Figma', tag: 'Herramientas' },
        { label: 'Workflows en UEFN', tag: 'Plataforma' },
        { label: 'Documentación', tag: 'Handoff' },
      ],
    },
    fieldNotes: {
      label: 'Field Notes / Pensamiento',
      headline: 'Notas y frameworks.',
      description: 'Análisis, frameworks y material de referencia construido a partir de problemas reales de UX en juegos. No teoría. Cosas que han sido usadas o probadas.',
      readNote: 'Leer nota',
      viewAll: 'Ver todas las notas',
    },
    about: {
      label: 'Perfil del operador / Sobre mí',
      fullProfile: 'Perfil completo',
      headline: '¿Dónde se rompe la claridad?',
      bio1: 'Soy Andres Felipe Pisso, UX Lead y Diseñador Game UX/UI. Trabajo en juegos, productos digitales y experiencias interactivas.',
      bio2: 'Mi trabajo generalmente empieza con una pregunta: ¿dónde se rompe la claridad? En juegos, puede aparecer como un HUD que distrae de la acción, un flujo de recompensas que genera hesitación, o un sistema de progresión que hace que los jugadores adivinen qué cambió. En producto, suele aparecer como navegación poco clara, retroalimentación débil o pantallas que parecen limpias pero no ayudan a decidir.',
      bio3: 'Me importan las interfaces que reducen la duda. Señales claras. Retroalimentación útil. Sistemas que ayudan a los equipos a moverse más rápido sin perder consistencia.',
      coreQuestion: '"¿Dónde está adivinando el jugador?"',
      coreQuestionLabel: 'Pregunta central',
      philosophy: 'El buen UX para juegos no es invisible. Es suficientemente presente y claro para que el jugador nunca tenga que pensar en la interfaz.',
      philosophyLabel: 'Filosofía de diseño',
      expertiseLabel: 'Áreas de expertise',
      timelineLabel: 'Trayectoria',
      timeline: [
        { period: '2023 – Hoy', role: 'UX Lead', context: 'Game UX, LiveOps, UEFN, experiencias VR' },
        { period: '2022 – 2023', role: 'Senior Game UX/UI Designer', context: 'Sistemas UI, HUD, flujos de jugador' },
        { period: '2020 – 2022', role: 'Game Designer / UX/UI', context: 'Juegos móviles, productos educativos' },
      ],
      expertise: [
        'Game UX/UI', 'Liderazgo UX', 'Sistemas UI', 'Product Thinking',
        'Game Design', 'Documentación', 'Accesibilidad', 'UEFN / Unreal',
        'Colaboración cross-funcional', 'Player Onboarding', 'HUD Design', 'LiveOps UX', 'VR UX',
      ],
      skillGroups: [
        { title: 'Game UX/UI', items: ['HUD', 'Menús', 'Onboarding', 'Progresión', 'Flujos de recompensa', 'Retroalimentación', 'Legibilidad', 'Player loops', 'VR UX', 'UEFN UX'] },
        { title: 'Sistemas UX', items: ['Design systems', 'Componentes', 'Estados', 'Patrones', 'Documentación', 'Handoff', 'Soporte QA', 'Revisiones de accesibilidad'] },
        { title: 'Producto UX/UI', items: ['Arquitectura de información', 'Flujos', 'Wireframes', 'Prototipos', 'Usabilidad', 'Diseño de interfaz', 'Alineación de stakeholders'] },
        { title: 'Herramientas', items: ['Figma', 'FigJam', 'UEFN', 'Contexto Unreal', 'Jira', 'Confluence', 'Adobe tools', 'Herramientas de prototipado'] },
      ],
    },
    contact: {
      label: 'Contacto / Señal',
      channelsLabel: 'Canales de contacto',
      linkedinCta: 'Agendar llamada en LinkedIn',
      contactMe: 'Contáctame →',
      headline: 'Si mi trabajo encaja con tu equipo o proyecto, contactarme debería tomar menos de un minuto.',
      ctaLine1: 'Si el trabajo',
      ctaStroke: 'encaja en tu equipo,',
      ctaLine3: 'escríbeme.',
      cta: 'Enviar señal',
      email: 'afpisso@gmail.com',
      linkedin: 'linkedin.com/in/byandresfe',
      instagram: '@byandresfe',
      x: '@byandresfe',
      location: 'Colombia — remoto e internacional',
      formLabels: {
        name: 'Nombre',
        email: 'Email',
        company: 'Empresa o estudio',
        type: 'Tipo de oportunidad',
        message: 'Mensaje',
        send: 'Enviar mensaje',
        sending: 'Enviando...',
        success: 'Mensaje enviado. Te respondo pronto.',
      },
      opportunityTypes: ['Rol en estudio', 'Rol en producto', 'Proyecto freelance', 'Consultoría', 'Charla o taller', 'Otro'],
    },
    footer: {
      tagline: 'UX/UI para juegos y producto digital enfocado en claridad, retroalimentación y mejores decisiones.',
      links: ['Trabajo', 'Sobre mí', 'CV', 'Notas', 'Contacto'],
      copy: '© 2026 Andres Felipe Pisso',
      handle: '@byandresfe',
    },
    resume: {
      label: 'CV',
      headline: 'Andres Felipe Pisso',
      subheadline: 'UX Lead · Diseñador Game UX/UI',
      download: 'Descargar PDF',
      sections: {
        summary: 'Resumen',
        experience: 'Experiencia seleccionada',
        projects: 'Proyectos seleccionados',
        skills: 'Habilidades',
        tools: 'Herramientas',
        education: 'Educación',
        languages: 'Idiomas',
        contact: 'Contacto',
      },
      summary: '11+ años diseñando sistemas UX/UI para juegos, productos digitales y experiencias interactivas. Enfocado en claridad, retroalimentación, toma de decisiones del jugador e interfaces listas para producción. Experiencia en VR, UEFN, mobile y producto digital.',
      languageList: ['Español — Nativo', 'Inglés — Profesional'],
      locationRemote: 'Colombia — Remoto',
    },
    casePage: {
      notFound: 'Caso no encontrado.',
      backToWork: '← Volver al trabajo',
      metaRole: 'Rol',
      metaPlatform: 'Plataforma',
      metaYear: 'Año',
      quickFacts: 'Datos rápidos',
      prev: '← Anterior',
      next: 'Siguiente →',
      sections: {
        executiveSummary: 'Resumen ejecutivo',
        context: 'Contexto',
        challenge: 'El desafío',
        myRole: 'Mi rol',
        constraints: 'Restricciones',
        uxApproach: 'Enfoque UX',
        keyDecisions: 'Decisiones clave',
        keyDecisionsIntro: 'Estas son las decisiones de diseño que definieron los resultados UX más importantes del proyecto.',
        problem: 'Problema',
        decision: 'Decisión',
        whyItMattered: 'Por qué importó',
        deliverables: 'Entregables',
        outcome: 'Resultado',
        nextSteps: 'Lo que revisaría después',
      },
    },
    notFound: {
      headline: 'Página no encontrada.',
      body: 'La página que buscas no existe o ha sido movida.',
      cta: 'Volver al inicio',
    },
    caseStatuses: {
      'public': 'Caso de estudio público',
      'nda-safe': 'Análisis NDA-Safe',
      'password-protected': 'Protegido con contraseña',
      'coming-soon': 'Próximamente',
      'legacy': 'Trabajo pasado',
    },
  },
};

const LangContext = createContext(null);

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('lang');
    if (stored === 'en' || stored === 'es') return stored;
    const browser = navigator.language.slice(0, 2).toLowerCase();
    return browser === 'es' ? 'es' : 'en';
  });

  // Keep <html lang="…"> in sync with the active language
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  function toggleLang() {
    const next = lang === 'en' ? 'es' : 'en';
    setLang(next);
    localStorage.setItem('lang', next);
  }

  function changeLang(l) {
    if (l !== 'en' && l !== 'es') return;
    setLang(l);
    localStorage.setItem('lang', l);
  }

  const value = useMemo(
    () => ({ lang, toggleLang, setLang: changeLang, t: translations[lang] }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [lang]
  );

  return (
    <LangContext.Provider value={value}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used inside LangProvider');
  return ctx;
}
