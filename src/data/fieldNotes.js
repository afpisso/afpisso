export const fieldNotes = [
  {
    id: 'FN-001',
    slug: 'what-is-a-game-ui-system',
    title: 'What is a Game UI System?',
    titleEs: '¿Qué es un sistema de UI para juegos?',
    category: 'Systems',
    date: '2026-04-10',
    summary:
      'A game UI system is not a style guide. It is a set of rules, components, states, and documented decisions that let a team build consistent interface pieces faster and with less ambiguity.',
    summaryEs:
      'Un sistema de UI para juegos no es una guía de estilos. Es un conjunto de reglas, componentes, estados y decisiones documentadas que permiten a un equipo construir piezas de interfaz consistentes más rápido y con menos ambigüedad.',
    readTime: '8 min',
    type: 'Deep Dive',
    relatedCases: ['courtyard-king', 'havoc-hotel-3'],
  },
  {
    id: 'FN-002',
    slug: 'clean-hud-vs-clear-hud',
    title: 'A Clean HUD is Not Always a Clear HUD',
    titleEs: 'Un HUD limpio no siempre es un HUD claro',
    category: 'HUD Design',
    date: '2026-04-17',
    summary:
      'Removing elements makes a HUD look cleaner. Removing the right elements makes it clearer. The difference is understanding what information the player actually needs to act, and when.',
    summaryEs:
      'Eliminar elementos hace que un HUD se vea más limpio. Eliminar los elementos correctos lo hace más claro. La diferencia está en entender qué información necesita realmente el jugador para actuar, y cuándo.',
    readTime: '6 min',
    type: 'Analysis',
    relatedCases: ['orcs-must-die-by-the-blade', 'courtyard-king'],
  },
  {
    id: 'FN-003',
    slug: 'feedback-reduces-guesswork',
    title: 'Why Feedback Reduces Guesswork',
    titleEs: 'Por qué la retroalimentación reduce la ambigüedad',
    category: 'Feedback Systems',
    date: '2026-04-24',
    summary:
      'When feedback is weak, players start guessing. When players guess, they slow down, make avoidable mistakes, or disengage. Strong feedback is not about noise. It is about confirmation at the right moment.',
    summaryEs:
      'Cuando la retroalimentación es débil, los jugadores empiezan a adivinar. Cuando los jugadores adivinan, se frenan, cometen errores evitables o se desenganchan. La buena retroalimentación no es ruido. Es confirmación en el momento correcto.',
    readTime: '7 min',
    type: 'Framework',
    relatedCases: ['orcs-must-die-by-the-blade', 'raptor-heist'],
  },
  {
    id: 'FN-004',
    slug: 'ui-terminology-for-game-teams',
    title: 'UI Terminology for Game Teams',
    titleEs: 'Terminología de UI para equipos de juego',
    category: 'Reference',
    date: '2026-05-01',
    summary:
      'Shared language makes better products. A working glossary of game UI terms: HUD, diegetic versus non-diegetic UI, spatial UI, stacking states, feedback layers, and how using the same words reduces handoff friction.',
    summaryEs:
      'Un lenguaje compartido produce mejores productos. Un glosario funcional de términos de UI para juegos: HUD, UI diegética versus no diegética, UI espacial, estados apilados, capas de retroalimentación, y cómo usar las mismas palabras reduce la fricción en el handoff.',
    readTime: '5 min',
    type: 'Reference',
    relatedCases: [],
  },
  {
    id: 'FN-005',
    slug: 'game-accessibility-checklist',
    title: 'What Game Teams Can Learn from Accessibility Settings',
    titleEs: 'Qué pueden aprender los equipos de juego de las opciones de accesibilidad',
    category: 'Accessibility',
    date: '2026-05-08',
    summary:
      'Accessibility settings are often treated as a compliance requirement. They are actually one of the best tools for understanding whether your interface works under real constraints, and how to make it better for every player.',
    summaryEs:
      'Las opciones de accesibilidad suelen tratarse como un requisito de cumplimiento. Son en realidad una de las mejores herramientas para entender si tu interfaz funciona bajo restricciones reales, y cómo mejorarla para cada jugador.',
    readTime: '6 min',
    type: 'Checklist',
    relatedCases: ['zombie-dragon-adventure'],
  },
  {
    id: 'FN-006',
    slug: 'vr-ux-interface-clarity',
    title: 'VR Interface Clarity: What Changes in Spatial UI',
    titleEs: 'Claridad de interfaz en VR: qué cambia en la UI espacial',
    category: 'VR UX',
    date: '2026-05-15',
    summary:
      'Spatial UI follows different rules than flat screen UI. Text must be legible at distance. Information must be placed where the player is already looking. And every floating element competes with the physical environment for attention.',
    summaryEs:
      'La UI espacial sigue reglas distintas a la UI de pantalla plana. El texto debe ser legible a distancia. La información debe colocarse donde el jugador ya está mirando. Y cada elemento flotante compite con el entorno físico por la atención.',
    readTime: '9 min',
    type: 'Deep Dive',
    relatedCases: ['orcs-must-die-by-the-blade'],
  },
  {
    id: 'FN-008',
    slug: 'liveops-ux-for-games',
    title: 'LiveOps UX: Designing for Players Who Already Know the Game',
    titleEs: 'LiveOps UX: diseñar para jugadores que ya conocen el juego',
    category: 'LiveOps',
    date: '2026-05-29',
    summary:
      'LiveOps UX is not onboarding. It targets players who are already engaged and need to understand what is new, what is limited, and whether it is worth their time. The interface has to communicate value fast, without breaking the loop they are already in.',
    summaryEs:
      'El LiveOps UX no es onboarding. Se dirige a jugadores que ya están comprometidos y necesitan entender qué es nuevo, qué es limitado y si vale su tiempo. La interfaz tiene que comunicar valor rápido, sin romper el loop en el que ya están.',
    readTime: '7 min',
    type: 'Framework',
    relatedCases: ['havoc-hotel-3', 'raptor-heist'],
  },
  {
    id: 'FN-009',
    slug: 'player-decision-making-ux',
    title: 'How Game UX Shapes Player Decisions',
    titleEs: 'Cómo el UX del juego moldea las decisiones del jugador',
    category: 'Decision UX',
    date: '2026-06-05',
    summary:
      'Every interface choice the player makes is also a UX problem. Which path to take, which upgrade to buy, when to use a resource. When players make bad decisions, the game often blames their skill. The real question is whether the interface gave them enough to decide well.',
    summaryEs:
      'Cada elección de interfaz que hace el jugador también es un problema de UX. Qué ruta tomar, qué mejora comprar, cuándo usar un recurso. Cuando los jugadores toman malas decisiones, el juego suele culpar a su habilidad. La pregunta real es si la interfaz les dio suficiente para decidir bien.',
    readTime: '8 min',
    type: 'Analysis',
    relatedCases: ['zombie-dragon-adventure', 'courtyard-king'],
  },
  {
    id: 'FN-007',
    slug: 'uefn-ux-lessons',
    title: 'UEFN UX Lessons: Designing Inside Fortnite',
    titleEs: 'Lecciones de UX en UEFN: diseñar dentro de Fortnite',
    category: 'UEFN',
    date: '2026-05-22',
    summary:
      'UEFN gives creators significant UI flexibility inside Fortnite, but it also imposes hard constraints. Understanding what you can control, what you cannot, and how to design around the platform\'s limitations is the real UEFN UX skill.',
    summaryEs:
      'UEFN ofrece flexibilidad de UI significativa dentro de Fortnite, pero también impone restricciones duras. Entender qué puedes controlar, qué no, y cómo diseñar alrededor de las limitaciones de la plataforma es la verdadera habilidad UX en UEFN.',
    readTime: '8 min',
    type: 'Analysis',
    relatedCases: ['zombie-dragon-adventure', 'raptor-heist', 'havoc-hotel-3'],
  },
];
