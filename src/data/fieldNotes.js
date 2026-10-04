export const fieldNotes = [
  {
    id: 'FN-001',
    slug: 'what-is-a-game-ui-system',
    title: 'What is a Game UI System?',
    titleEs: '¿Qué es un sistema de UI para juegos?',
    category: 'Systems',
    categoryEs: 'Sistemas',
    date: '2026-04-10',
    summary:
      'A game UI system is the shared structure that keeps the interface understandable when features grow, states multiply, and players need to make decisions fast.',
    summaryEs:
      'Un sistema de UI para juegos es la estructura que mantiene la interfaz entendible cuando las funciones crecen, los estados se multiplican y el jugador necesita decidir rápido.',
    readTime: '8 min',
    type: 'Deep Dive',
    typeEs: 'Análisis profundo',
    cover: '/notes/fn001-cover.webp',
    relatedCases: ['courtyard-king', 'havoc-hotel-3'],
  },
  {
    id: 'FN-002',
    slug: 'clean-hud-vs-clear-hud',
    title: 'A Clean HUD is Not Always a Clear HUD',
    titleEs: 'Un HUD limpio no siempre es un HUD claro',
    category: 'HUD Design',
    categoryEs: 'Diseño de HUD',
    date: '2026-04-17',
    summary:
      'A HUD can look elegant and minimal, but if the player has to guess what changed or what matters next, the interface is only quiet. It is not clear.',
    summaryEs:
      'Un HUD puede verse elegante y mínimo, pero si el jugador tiene que adivinar qué cambió o qué importa después, la interfaz solo está silenciosa. No está clara.',
    readTime: '6 min',
    type: 'Analysis',
    typeEs: 'Análisis',
    cover: '/notes/fn002-cover.webp',
    relatedCases: ['orcs-must-die-by-the-blade', 'courtyard-king'],
  },
  {
    id: 'FN-003',
    slug: 'feedback-reduces-guesswork',
    title: 'Why Feedback Reduces Guesswork',
    titleEs: 'Por qué la retroalimentación reduce la ambigüedad',
    category: 'Feedback Systems',
    categoryEs: 'Sistemas de retroalimentación',
    date: '2026-04-24',
    summary:
      'Feedback is the system answering back. When that answer is weak, players start filling the gaps themselves, and doubt enters the loop.',
    summaryEs:
      'La retroalimentación es el sistema respondiendo. Cuando esa respuesta es débil, el jugador empieza a llenar los vacíos por su cuenta y la duda entra al loop.',
    readTime: '7 min',
    type: 'Framework',
    typeEs: 'Marco',
    cover: '/notes/fn003-cover.webp',
    relatedCases: ['orcs-must-die-by-the-blade', 'raptor-heist'],
  },
  {
    id: 'FN-004',
    slug: 'ui-terminology-for-game-teams',
    title: 'UI Terminology for Game Teams',
    titleEs: 'Terminología de UI para equipos de juego',
    category: 'Reference',
    categoryEs: 'Referencia',
    date: '2026-05-01',
    summary:
      'A lot of UI problems start before anyone opens Figma. They start in language: when HUD, menu, modal, overlay, tooltip, inventory, and loadout mean different things to different people.',
    summaryEs:
      'Muchos problemas de UI empiezan antes de abrir Figma. Empiezan en el lenguaje: cuando HUD, menú, modal, overlay, tooltip, inventario o loadout significan cosas distintas para cada persona.',
    readTime: '5 min',
    type: 'Reference',
    typeEs: 'Referencia',
    cover: '/notes/fn004-cover.webp',
    relatedCases: [],
  },
  {
    id: 'FN-005',
    slug: 'game-accessibility-checklist',
    title: 'What Game Teams Can Learn from Accessibility Settings',
    titleEs: 'Qué pueden aprender los equipos de juego de las opciones de accesibilidad',
    category: 'Accessibility',
    categoryEs: 'Accesibilidad',
    date: '2026-05-08',
    summary:
      'Accessibility settings are a good way to pressure-test the base design. They show what the interface assumes, and what breaks when player conditions change.',
    summaryEs:
      'Las opciones de accesibilidad son una buena forma de poner a prueba el diseño base. Muestran qué asume la interfaz y qué se rompe cuando cambian las condiciones del jugador.',
    readTime: '6 min',
    type: 'Checklist',
    typeEs: 'Lista de chequeo',
    cover: '/notes/fn005-cover.webp',
    relatedCases: ['zombie-dragon-adventure'],
  },
  {
    id: 'FN-006',
    slug: 'vr-ux-interface-clarity',
    title: 'VR Interface Clarity: What Changes in Spatial UI',
    titleEs: 'Claridad de interfaz en VR: qué cambia en la UI espacial',
    category: 'VR UX',
    categoryEs: 'VR UX',
    date: '2026-05-15',
    summary:
      'Designing UI for VR is not placing a flat screen inside a headset. In VR, the interface has distance, body cost, timing, and comfort attached to every decision.',
    summaryEs:
      'Diseñar UI para VR no es poner una pantalla plana dentro de un visor. En VR, cada decisión de interfaz tiene distancia, costo corporal, tiempo y comodidad encima.',
    readTime: '9 min',
    type: 'Deep Dive',
    typeEs: 'Análisis profundo',
    cover: '/notes/fn006-cover.webp',
    relatedCases: ['orcs-must-die-by-the-blade'],
  },
];

export const getNoteTitle = (note, lang) =>
  lang === 'es' && note.titleEs ? note.titleEs : note.title;

export const getNoteSummary = (note, lang) =>
  lang === 'es' && note.summaryEs ? note.summaryEs : note.summary;

export const getNoteType = (note, lang) =>
  lang === 'es' && note.typeEs ? note.typeEs : note.type;

export const getNoteCategory = (note, lang) =>
  lang === 'es' && note.categoryEs ? note.categoryEs : note.category;

fieldNotes.push(...[
  {
    "id": "FN-007",
    "slug": "uefn-ux-lessons",
    "title": "UEFN UX Lessons: Designing Inside Fortnite",
    "titleEs": "Lecciones de UX en UEFN: diseñar dentro de Fortnite",
    "category": "UEFN",
    "categoryEs": "UEFN",
    "date": "2026-05-22",
    "dateModified": "2026-10-04",
    "summary": "UEFN UX lessons on onboarding, player feedback and interface constraints. Review the first useful action and the boundaries of the platform in a real build.",
    "summaryEs": "Lecciones de UX en UEFN sobre onboarding, feedback y restricciones de interfaz. Cómo revisar la primera acción útil y los límites de plataforma en una versión real.",
    "readTime": "3 min",
    "type": "Analysis",
    "typeEs": "Análisis",
    "relatedCases": [
      "zombie-dragon-adventure",
      "raptor-heist",
      "havoc-hotel-3"
    ]
  },
  {
    "id": "FN-009",
    "slug": "player-decision-making-ux",
    "title": "How Game UX Shapes Player Decisions",
    "titleEs": "Cómo el UX del juego moldea las decisiones del jugador",
    "category": "Decision UX",
    "categoryEs": "Decisiones del jugador",
    "date": "2026-06-05",
    "dateModified": "2026-10-04",
    "summary": "Game UX shapes how players compare upgrades, costs and consequences. Review what the interface shows at the decision moment before blaming player skill.",
    "summaryEs": "Game UX cambia cómo el jugador compara mejoras, costos y consecuencias. Revisa qué muestra la interfaz al decidir antes de atribuir el problema a su habilidad.",
    "readTime": "3 min",
    "type": "Analysis",
    "typeEs": "Análisis",
    "relatedCases": [
      "zombie-dragon-adventure",
      "courtyard-king"
    ]
  }
]);
