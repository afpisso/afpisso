/**
 * CASE_ORDER — explicit display order for project lists (CaseFiles, WorkPage).
 * Edit this array to reorder cases without touching the data below.
 */
export const CASE_ORDER = [
  'orcs-must-die-by-the-blade',   // Strongest: VR UX, UI Systems, Lead role, shipped studio game
  'zombie-dragon-adventure',       // UEFN complex systems, D&D IP, FTUX, documentation
  'star-wars-roguelike-one',       // Licensed IP, roguelike, live UEFN, combat UX
  'courtyard-king',                // TWD IP, survival UX, NDA-safe
  'zomvilles',                     // Broadest scope: systems thinking, documentation
  'raptor-heist',
  // legacy — lower priority, shown last
  'havoc-hotel-3',
  'kodety',
];

export const cases = [
  {
    id: 'CASE-001',
    slug: 'orcs-must-die-by-the-blade',
    title: 'Orcs Must Die: By the Blade',
    thumbnailAlt: 'Orcs Must Die: By the Blade — VR UX/UI systems and product design case study',
    role: 'UX Lead',
    platform: ['VR', 'Meta Quest'],
    focus: 'UI design system, reusable assets, documentation, VR interaction patterns, UX leadership',
    focusEs: 'Sistema de diseño UI, assets reutilizables, documentación, patrones de interacción VR, liderazgo UX',
    status: 'NDA-SAFE',
    visibility: 'nda-safe',
    statusColor: 'accent',
    year: '2025 – 2026',
    featured: true,
    category: 'games',
    trailerSrc: '/cases/orcs-must-die-by-the-blade/orcs-must-die-by-the-blade-Trailer.mp4',
    headline: 'No design system, mid-production on a shipped VR game — and a team that needed one.',
    headlineEs: 'Sin sistema de diseño, en producción avanzada de un juego VR ya lanzado — y un equipo que lo necesitaba.',
    description:
      'When I joined Orcs Must Die: By the Blade as UX Lead, the game already had months of work behind it — and no shared design system. Every feature had been built in isolation. I came in during mid-to-late production and built the foundation the team needed to design, implement, and review interface work consistently for the rest of the project. We shipped.',
    descriptionEs:
      'Cuando llegué a Orcs Must Die: By the Blade como UX Lead, el juego tenía meses de trabajo encima y ningún sistema de diseño compartido. Cada feature se había construido de forma aislada. Entré en etapa media-avanzada de producción y construí la base que el equipo necesitaba para diseñar, implementar y revisar interfaces de forma consistente hasta el final del proyecto. Lo lanzamos.',
    tags: ['UX/UI Systems', 'Product Design', 'VR Interaction', 'Design Documentation', 'UX Leadership'],
    relatedNotes: ['clean-hud-vs-clear-hud', 'feedback-reduces-guesswork', 'what-is-a-game-ui-system'],
    cta: 'View Orcs Must Die: By the Blade case',
    content: {
      summary:
        'I joined Orcs Must Die: By the Blade at Teravision Games during mid-to-late production. There was a lot of interface work ahead — gameplay systems, inventory, world interactions, multiplayer, accessibility — and no design system to work from. Every new screen meant starting from scratch.\n\nMy job was to change that. I built the UI design system, created reusable assets, documented the key features, and led a team of two designers through the rest of production. We shipped.',
      quickFacts: {
        role: 'UX Lead',
        studio: 'Teravision Games',
        client: 'Robot Entertainment · Meta',
        platform: 'Meta Quest VR',
        type: 'Published VR game',
        duration: '1 year',
        team: 'UX/UI team of 3',
        tools: 'Figma · Unreal · Jira · Confluence · Adobe Suite',
        status: 'Shipped',
        confidentiality: 'NDA-safe. Some details are simplified or omitted. The focus here is the design problem, my role and the type of decisions I helped shape.',
      },
      context:
        'Designing for VR changes every assumption you bring from flat-screen work. You are not placing a screen inside an environment — you are placing something inside someone\'s physical space. On Meta Quest, every UI decision competes with the player\'s field of view, their hands, their sense of comfort, and the platform\'s performance budget. The interface had to earn every pixel it used.',
      challenge:
        'The real problem was not the list of features we needed to design. It was that without a shared system, every feature was a separate production problem. No shared naming. No shared components. No shared criteria for what "done" looked like. That created three compounding risks.',
      challengeRisks: [
        'Slower implementation: each new feature needed UI support without shared criteria to reference',
        'Inconsistent visual criteria: without a system, every screen could drift from the rest',
        'More rework: design, implementation and review became harder to align across areas',
      ],
      role:
        'As UX Lead, I led the UX/UI direction for the project and coordinated the work of two designers. My responsibilities included:',
      roleResponsibilities: [
        'Creating the UI design system in Figma',
        'Designing reusable UI assets including containers, iconography and 2D animations',
        'Documenting features and interaction flows in Confluence',
        'Supporting Unreal implementation and QA review',
        'Writing UI copy for different systems',
        'Creating and supporting UXR artifacts such as player personas',
        'Participating in an external UXR process with Meta',
        'Prioritizing UX/UI work using product needs, game design requirements and RICE criteria',
        'Reviewing implementation quality, visual consistency, accessibility and heuristic alignment',
      ],
      constraints: [
        'Meta Quest platform limitations: performance budget, rendering constraints, comfort zones',
        'Small UX/UI team: three people covering multiple responsibilities simultaneously',
        'Recognizable IP style: system had to respect the franchise\'s established visual language',
        'Mid-to-late production timing: no opportunity to rebuild from scratch',
        'Implementation in Unreal: every Figma decision had to translate cleanly into the engine',
        'NDA-safe public presentation: detailed internals cannot be shown publicly',
      ],
      approach: [
        {
          heading: '1. Understanding the product and the medium',
          body: 'I started by reviewing the IP style, the current UI direction, the player needs and the constraints of designing for VR. In VR, every interface decision affects comfort, readability, attention, interaction and immersion differently than on a flat screen.',
        },
        {
          heading: '2. Mapping interface needs',
          body: 'I mapped the main UI needs across different systems: inventory, guide book, world interactions, level objectives, accessibility, multiplayer flows, weapon upgrades, trap upgrades and smooth turning. This helped identify where the team needed reusable criteria instead of isolated decisions.',
        },
        {
          heading: '3. Creating the UI system foundation',
          body: 'The system included buttons, containers, iconography, colors, typography, states, modals, notifications, feedback patterns, templates, variables and tokens. The first goal was a stronger Figma foundation. As production advanced, the system incorporated implementation notes to make the work easier to translate into Unreal.',
        },
        {
          heading: '4. Designing and documenting key systems',
          body: 'I created assets, flows, documentation, iconography and copy for several features. The most important value came from reusable assets and documentation: these helped the team align faster, reduce visual inconsistency and make implementation clearer across the different areas involved.',
        },
        {
          heading: '5. Supporting implementation and review',
          body: 'The work did not stop at Figma. I supported implementation review, QA passes, weekly playtests and feedback filtering from internal and external players. This helped connect design intent with what players actually experienced inside the headset.',
        },
      ],
      keyDecisions: [
        {
          problem: 'The project needed UI support for many systems, but without shared criteria every new feature could become a separate production problem.',
          decision: 'Built a reusable UI system with assets, states, containers, iconography, naming logic and Confluence documentation before scaling new feature work.',
          why: 'A system built early reduces friction later. Each new screen, component or review has a reference point instead of starting from scratch. The operational value is as important as the visual value.',
        },
        {
          problem: 'Assets and documentation were being created in isolation, which slowed down implementation and created ambiguity across areas.',
          decision: 'Structured Figma files with clear naming, correct dimensions and layered documentation so different areas could understand requirements without needing to ask.',
          why: 'The most valuable part of a design system is not the visual design. It is the way assets and documentation help a team work faster with less ambiguity.',
        },
        {
          problem: 'In VR, a heavy or poorly placed HUD creates discomfort and distracts from the physical environment.',
          decision: 'Kept the VR HUD light and intentional. For world objects and contextual actions, moved toward in-world feedback, contextual tooltips and haptic reinforcement instead of relying only on flat UI.',
          why: 'VR is not a flat screen. Interface elements compete with physical space for attention. A HUD that only shows what the player needs, when they need it, improves both clarity and immersion.',
        },
        {
          problem: 'The game needed to communicate which objects were interactive, what state they were in and what action was required, without adding more weight to the HUD.',
          decision: 'Created a contextual interaction language using animated tooltips, highlight color states and haptic feedback, all working together to communicate interaction affordance and state.',
          why: 'Multiple feedback channels working in parallel reduce the cognitive load on any single channel. Players with visual accessibility needs also benefit when feedback is not carried by color alone.',
        },
        {
          problem: 'Player feedback from UXR sessions identified friction in inventory behavior, FTUX communication and control comfort that was not visible from design review alone.',
          decision: 'Used UXR findings to prioritize real improvements: inventory behavior iterations, clearer FTUX communication, feature clarity fixes and smooth turning as a comfort and accessibility improvement.',
          why: 'UXR findings change the priority of what you fix. Smooth turning went from a nice-to-have to a real accessibility and comfort need based on what players reported in sessions.',
        },
      ],
      featuredSystems: [
        {
          id: 'inventory',
          num: '01',
          title: 'Inventory',
          body: 'The inventory managed weapons and trinkets inside the VR experience. It needed to be accessible during combat, communicate the state of each object and represent the player\'s body placement across three slots: left shoulder, right shoulder and chest.\n\nAfter several iterations and user research sessions, the inventory evolved into a more flexible system with different states: a full silhouette for inspection moments, a compact version for active combat, an option to turn the UI off completely and haptic reinforcement for players who wanted a cleaner VR experience.\n\nThis feature shows how design decisions were shaped by player needs, iteration and the specific conditions of VR.',
          assetAlt: 'Inventory UI states for a VR game showing player body placement and item status',
          assetCaption: 'Inventory states adapted to different gameplay moments, from readable inspection to compact combat use.',
        },
        {
          id: 'guide-book',
          num: '02',
          title: 'Guide Book',
          body: 'The guide book was created to communicate level objectives without adding more elements to the HUD. The solution was a diegetic book that the player could invoke during gameplay. It included primary objectives, secondary objectives and level progress in a way that felt connected to the game world.\n\nBecause it behaved as a world object, the player could interact with it, close it or throw it. The interaction used a hold action to reduce accidental triggers and make the input feel deliberate.\n\nThis feature shows how a traditional UI need can become a more spatial and diegetic solution in VR.',
          assetAlt: 'Magical guide book UI used to display objectives and level progress in VR',
          assetCaption: 'A diegetic guide book used to communicate objectives without overloading the HUD.',
        },
        {
          id: 'world-interactions',
          num: '03',
          title: 'World Interactions and Diegetic Feedback',
          body: 'The game needed a clear way to communicate which objects were interactive, what state they were in and what action was required. Instead of solving this only with static UI, we created several layers of feedback working together: animated contextual tooltips for different interactable objects, highlight colors to communicate interaction states, haptic feedback as reinforcement and a visual language that supported players with visual accessibility needs.\n\nThis feature shows how multiple feedback systems can work in parallel to reduce confusion and help players understand the world without adding HUD weight.',
          assetAlt: 'VR interaction feedback showing tooltip, highlight and object interaction state',
          assetCaption: 'Contextual feedback helped players understand what they could interact with and how.',
        },
      ],
      beforeAfter: {
        context: 'The original interface direction had elements inspired by previous games in the franchise, but it did not yet have a clear system identity. There were problems with consistency, accessibility, legibility and implementation clarity. Because the original material should not be shown publicly, the comparison below describes the shift from a systems perspective.',
        before: [
          'Scattered UI decisions with no shared reference',
          'No unified design system in Figma',
          'Slower implementation: each feature required starting fresh',
          'More visual inconsistency across screens',
          'Harder alignment between design, engineering and production',
        ],
        after: [
          'Reusable assets with clear naming and correct dimensions',
          'Shared design system with components, states and tokens',
          'Faster asset production and implementation',
          'Stronger visual consistency across features',
          'Better alignment between design, engineering and production areas',
        ],
        assetAlt: 'Conceptual diagram comparing scattered UI decisions with a shared design system approach',
        assetCaption: 'From scattered UI decisions to a shared system for design, documentation and implementation.',
      },
      deliverables: [
        'UI design system in Figma with components, states, tokens and variables',
        'Reusable UI assets: containers, iconography, 2D animations',
        'Feature documentation in Confluence for all key systems',
        'Interaction flows for inventory, guide book, world interactions and onboarding',
        'UI copy for multiple game systems',
        'Player personas and UXR artifacts',
        'Implementation review and QA support inside Unreal',
        'Accessibility review and VR comfort guidelines',
      ],
      outcome:
        'The system did what systems are supposed to do: it made the team faster. Asset creation went from starting-from-scratch to working from a shared reference. Documentation meant engineering and QA could move without waiting for a designer to explain intent.\n\nThe VR-specific decisions — the diegetic guide book, the contextual interaction language, the light HUD — gave players a cleaner experience without removing the information they needed. We shipped the game.',
      whatILearned:
        'VR made concrete something I already believed: clarity depends on context. A decision that works on a flat screen can become uncomfortable or misleading inside a headset. The interface is not just something the player sees — it becomes part of how they move through space and respond to the world. That changed how I thought about feedback, legibility, and the balance between UI and haptic reinforcement.\n\nThe other thing I came away with: a system foundation matters more than I expected, and the cost of not having one shows up three months later. The pressure is always to ship individual features first. But every feature built without a shared reference creates rework down the line.',
      projectSnapshot: {
        role: 'UX Lead',
        context: 'Mid-to-late production on a shipped VR game',
        platform: 'Meta Quest (VR)',
        team: 'UX/UI team of 3',
        tools: 'Figma · Unreal Engine · Jira · Confluence · Adobe Suite',
        mainChallenge: 'No shared UI design system existed. Each new feature required starting from scratch, creating inconsistency and slowing implementation.',
        keyDeliverables: 'UI design system, reusable assets, interaction flows, feature documentation, accessibility review, UXR artifacts, QA support',
        status: 'Shipped',
        constraints: 'Meta Quest performance budget · small team · mid-to-late production entry · NDA restrictions on specific visual assets',
      },
      impact: {
        productionClarity: 'Built a reusable UI system with shared naming, components, states and documentation so every new feature had a reference point instead of starting from scratch.',
        playerClarity: 'Applied VR-specific readability, comfort and accessibility considerations — including contextual interaction language, haptic reinforcement and a diegetic guide book — to reduce confusion without increasing HUD weight.',
        systemValue: 'Defined reusable UI patterns and component logic that could be applied across gameplay, progression, world interactions and multiplayer flows.',
        documentationValue: 'Documented features, interaction logic, visual states, and implementation notes in Confluence so design intent was available to engineering, QA and production without additional back-and-forth.',
        implementationValue: 'Supported Unreal implementation review, QA passes and weekly playtests to connect design decisions with what players actually experienced inside the headset.',
        validation: 'External UXR process with Meta · internal playtest feedback · QA review cycles · RICE-based prioritization to focus on highest-impact clarity improvements first.',
      },
      myOwnership: 'I owned the UX/UI direction, system structure, player flows, interface logic, documentation strategy and design-system decisions for this project. I led a team of two designers, coordinated with game design, art, engineering, QA and production, and was responsible for translating gameplay needs into reusable UI components, interaction patterns and implementation-ready specifications. My role included not just creating assets, but making sure the team had a shared foundation to design, implement and review from.',
      researchValidation: 'This work was informed by player clarity goals, platform-specific VR comfort requirements, UXR sessions conducted with Meta, internal playtest feedback and production feasibility. In VR, interface decisions affect comfort, attention and immersion differently than on a flat screen — so every design choice was evaluated against both player clarity and physical experience. UXR findings directly shaped iteration priorities: inventory behavior, FTUX communication, smooth turning and control comfort were all improved based on what players reported in sessions, not from assumptions.',
      implementationHandoff: 'The handoff focused on reducing ambiguity for implementation inside Unreal Engine. Each flow, component and screen state was documented with naming conventions, layout behavior, interaction logic, visual states, VR-specific notes and production constraints. Assets were structured in Figma with correct dimensions and clear layer organization so engineering and art could move from design intent to implementation with fewer interpretation gaps. I supported this process through direct implementation review and QA passes rather than treating it as a hand-off-and-forget step.',
    },
    whatThisShows:
      'The most valuable thing I built on this project was not a screen — it was a shared reference point. A design system that let the team design, implement, and review from the same foundation. When that exists, decisions get faster, rework goes down, and disciplines can work in parallel without constant check-ins.\n\nI care about building the layer under the visuals: the rules, assets, states, and documented decisions that give a team something to build from. That is the work that makes everything else easier.',
    whatThisShowsEs:
      'Lo más valioso que construí en este proyecto no fue una pantalla. Fue un punto de referencia compartido. Un sistema de diseño que le permitió al equipo diseñar, implementar y revisar desde la misma base. Cuando eso existe, las decisiones se aceleran, el retrabajo baja y las disciplinas pueden avanzar en paralelo sin chequeos constantes.\n\nMe interesa construir la capa que está debajo de los visuales: las reglas, los assets, los estados y las decisiones documentadas que le dan al equipo algo desde lo cual construir. Ese es el trabajo que hace que todo lo demás sea más fácil.',
    contentEs: {
      summary:
        'Entré a Orcs Must Die: By the Blade en Teravision Games durante una etapa media-avanzada de producción. Había mucho trabajo de interfaz por delante: sistemas de gameplay, inventario, interacciones con el mundo, multijugador, accesibilidad. Y ningún sistema de diseño desde el cual trabajar. Cada pantalla nueva significaba empezar desde cero.\n\nMi trabajo era cambiar eso. Construí el sistema de diseño UI, creé assets reutilizables, documenté las features clave y lideré un equipo de dos diseñadores hasta el final de la producción. Lo lanzamos.',
      quickFacts: {
        role: 'UX Lead',
        studio: 'Teravision Games',
        client: 'Robot Entertainment · Meta',
        platform: 'Meta Quest VR',
        type: 'Juego VR publicado',
        duration: '1 año',
        team: 'Equipo UX/UI de 3 personas',
        tools: 'Figma · Unreal · Jira · Confluence · Adobe Suite',
        status: 'Lanzado',
        confidentiality: 'NDA-safe. Algunos detalles se simplifican u omiten. El enfoque aquí es el problema de diseño, mi rol y el tipo de decisiones que ayudé a dar forma.',
      },
      context:
        'Diseñar para VR cambia cada supuesto que traes del trabajo en pantallas planas. No estás ubicando una pantalla dentro de un entorno: estás colocando algo dentro del espacio físico de alguien. En Meta Quest, cada decisión de UI compite con el campo visual del jugador, sus manos, su comodidad y el presupuesto de performance de la plataforma. La interfaz tenía que ganarse cada píxel que usaba.',
      challenge:
        'El problema real no era la lista de features que necesitábamos diseñar. Era que sin un sistema compartido, cada feature era un problema de producción separado. Sin nomenclatura común. Sin componentes compartidos. Sin criterios claros de cuándo algo estaba listo. Eso generaba tres riesgos que se acumulaban.',
      challengeRisks: [
        'Implementación más lenta: cada nueva feature necesitaba soporte de UI sin criterios compartidos',
        'Criterios visuales inconsistentes: sin un sistema, cada pantalla podía alejarse del resto',
        'Más retrabajo: diseño, implementación y revisión se volvían más difíciles de alinear',
      ],
      role:
        'Como UX Lead, lideré la dirección UX/UI del proyecto y coordiné el trabajo de dos diseñadores. Mis responsabilidades incluyeron:',
      roleResponsibilities: [
        'Crear el sistema de diseño de UI en Figma',
        'Diseñar assets reutilizables: contenedores, iconografía y animaciones 2D',
        'Documentar features y flujos de interacción en Confluence',
        'Apoyar la implementación en Unreal y la revisión QA',
        'Escribir copy de UI para distintos sistemas',
        'Crear y apoyar artefactos de UXR como player personas',
        'Participar en un proceso externo de UXR con Meta',
        'Priorizar trabajo UX/UI usando necesidades de producto, game design y criterios RICE',
        'Revisar calidad de implementación, consistencia visual, accesibilidad y alineación heurística',
      ],
      constraints: [
        'Limitaciones de Meta Quest: presupuesto de performance, restricciones de renderizado, zonas de confort',
        'Equipo UX/UI pequeño: tres personas cubriendo múltiples responsabilidades',
        'Estilo visual de IP reconocible: el sistema debía respetar el lenguaje visual de la franquicia',
        'Entrada en etapa media-avanzada: no había posibilidad de reconstruir desde cero',
        'Implementación en Unreal: cada decisión en Figma debía trasladarse limpiamente al motor',
        'Presentación pública NDA-safe: detalles internos no pueden mostrarse públicamente',
      ],
      approach: [
        {
          heading: '1. Entender el producto y el medio',
          body: 'Empecé revisando el estilo de la IP, la dirección actual de UI, las necesidades del jugador y las restricciones de diseñar para VR. En VR, cada decisión de interfaz afecta comodidad, legibilidad, atención, interacción e inmersión de manera diferente a una pantalla tradicional.',
        },
        {
          heading: '2. Mapear necesidades de interfaz',
          body: 'Mapeé las principales necesidades de UI en distintos sistemas: inventario, libro guía, interacciones con el mundo, objetivos de nivel, accesibilidad, flujos multijugador, mejoras de armas, mejoras de trampas y smooth turning. Esto ayudó a identificar dónde el equipo necesitaba criterios reutilizables en lugar de decisiones aisladas.',
        },
        {
          heading: '3. Crear la base del sistema UI',
          body: 'El sistema incluía botones, contenedores, iconografía, colores, tipografía, estados, modales, notificaciones, patrones de feedback, templates, variables y tokens. El primer objetivo fue una base más sólida en Figma. A medida que avanzó la producción, el sistema incorporó notas de implementación para facilitar su traslado a Unreal.',
        },
        {
          heading: '4. Diseñar y documentar sistemas clave',
          body: 'Creé assets, flujos, documentación, iconografía y copy para varias features. El mayor valor estuvo en los assets reutilizables y la documentación: le dieron al equipo un punto de referencia compartido, redujeron inconsistencias visuales e hicieron más clara la implementación.',
        },
        {
          heading: '5. Apoyar implementación y revisión',
          body: 'El trabajo no se quedó en Figma. Apoyé revisión de implementación, QA passes, playtests semanales y filtro de feedback de jugadores. Esto ayudó a conectar la intención de diseño con lo que los jugadores realmente experimentaban dentro del headset.',
        },
      ],
      keyDecisions: [
        {
          problem: 'El proyecto necesitaba soporte de UI para muchos sistemas, pero sin criterios compartidos cada nueva feature podía convertirse en un problema separado de producción.',
          decision: 'Construí un sistema reutilizable con assets, estados, contenedores, iconografía, lógica de nomenclatura y documentación en Confluence antes de escalar trabajo de nuevas features.',
          why: 'Un sistema construido desde antes reduce fricción después. Cada nueva pantalla, componente o revisión tiene un punto de referencia en lugar de empezar desde cero. El valor operativo es tan importante como el visual.',
        },
        {
          problem: 'Los assets y la documentación se estaban creando de manera aislada, lo que ralentizaba la implementación y generaba ambigüedad entre áreas.',
          decision: 'Estructuré archivos de Figma con nomenclatura clara, dimensiones correctas y documentación en capas para que distintas áreas pudieran entender los requerimientos sin necesidad de preguntar.',
          why: 'La parte más valiosa de un sistema de diseño no es el diseño visual. Es la manera en que los assets y la documentación ayudan a un equipo a trabajar más rápido con menos ambigüedad.',
        },
        {
          problem: 'En VR, una HUD pesada o mal posicionada genera incomodidad y distrae del entorno físico.',
          decision: 'Mantuve la HUD VR ligera e intencional. Para objetos del mundo y acciones contextuales, me moví hacia feedback en el mundo, tooltips contextuales y refuerzo háptico en lugar de depender solo de UI plana.',
          why: 'VR no es una pantalla plana. Los elementos de interfaz compiten con el espacio físico por la atención. Una HUD que solo muestra lo que el jugador necesita, cuando lo necesita, mejora tanto la claridad como la inmersión.',
        },
        {
          problem: 'El juego necesitaba comunicar qué objetos eran interactivos, en qué estado estaban y qué acción se requería, sin agregar más peso a la HUD.',
          decision: 'Creé un lenguaje de interacción contextual usando tooltips animados, estados de color de highlight y respuesta háptica, trabajando en conjunto para comunicar affordance e estado de interacción.',
          why: 'Múltiples canales de feedback trabajando en paralelo reducen la carga cognitiva en cualquier canal individual. Los jugadores con necesidades de accesibilidad visual también se benefician cuando el feedback no se transmite solo por color.',
        },
        {
          problem: 'El feedback de jugadores en sesiones de UXR identificó fricción en el inventario, la comunicación del FTUX y la comodidad de controles que no era visible desde la revisión de diseño.',
          decision: 'Usé hallazgos de UXR para priorizar mejoras reales: iteraciones de inventario, comunicación de FTUX más clara, correcciones de claridad de features y smooth turning como mejora de comodidad y accesibilidad.',
          why: 'Los hallazgos de UXR cambian la prioridad de qué arreglar. Smooth turning pasó de ser un nice-to-have a una necesidad real de accesibilidad y confort basada en lo que los jugadores reportaron.',
        },
      ],
      featuredSystems: [
        {
          id: 'inventory',
          num: '01',
          title: 'Inventario',
          body: 'El inventario administraba armas y trinkets dentro de la experiencia VR. Necesitaba ser accesible durante el combate, comunicar el estado de cada objeto y representar la ubicación en el cuerpo del jugador: hombro izquierdo, hombro derecho y pecho.\n\nDespués de varias iteraciones y sesiones de UXR, el inventario evolucionó hacia un sistema más flexible con diferentes estados: silueta completa para momentos de inspección, versión compacta para combate activo, opción de apagar la UI completamente y refuerzo háptico para una experiencia VR más limpia.\n\nEsta feature muestra cómo las decisiones de diseño se construyeron desde la necesidad, la iteración y las condiciones específicas de VR.',
          assetAlt: 'Estados de inventario para un juego VR mostrando ubicación en el cuerpo del jugador y estado de objetos',
          assetCaption: 'Estados de inventario adaptados a distintos momentos de gameplay, desde inspección hasta uso compacto en combate.',
        },
        {
          id: 'guide-book',
          num: '02',
          title: 'Libro Guía',
          body: 'El libro guía fue creado para comunicar objetivos de nivel sin agregar más elementos al HUD. La solución fue un libro diegético que el jugador podía invocar durante el gameplay. Incluía objetivos primarios, secundarios y progreso de nivel de manera conectada con el mundo del juego.\n\nAl comportarse como un objeto del mundo, el jugador podía interactuar con él, cerrarlo o lanzarlo. La interacción usó hold para reducir activaciones accidentales y hacer que la acción se sintiera deliberada.\n\nEsta feature muestra cómo una necesidad tradicional de UI puede convertirse en una solución más espacial y diegética en VR.',
          assetAlt: 'Libro guía mágico usado para mostrar objetivos y progreso de nivel en VR',
          assetCaption: 'Un libro guía diegético usado para comunicar objetivos sin sobrecargar la HUD.',
        },
        {
          id: 'world-interactions',
          num: '03',
          title: 'Interacciones del Mundo y Feedback Diegético',
          body: 'El juego necesitaba comunicar claramente qué objetos eran interactivos, en qué estado estaban y qué acción se requería. En lugar de resolverlo solo con UI estática, creamos varias capas de feedback trabajando en conjunto: tooltips contextuales animados, highlights de color para comunicar estados, respuesta háptica como refuerzo y un lenguaje visual que apoyara necesidades de accesibilidad.\n\nEsta feature muestra cómo múltiples sistemas de feedback pueden trabajar en paralelo para reducir confusión y ayudar al jugador a entender el mundo sin agregar peso al HUD.',
          assetAlt: 'Feedback de interacción VR mostrando tooltip contextual, highlight y estado de objeto',
          assetCaption: 'El feedback contextual ayudaba al jugador a entender con qué podía interactuar y cómo hacerlo.',
        },
      ],
      beforeAfter: {
        context: 'La dirección inicial de interfaz tenía elementos inspirados en juegos anteriores de la franquicia, pero todavía no tenía una identidad de sistema clara. Había problemas de consistencia, accesibilidad, legibilidad y claridad de implementación. Como el material original no debería mostrarse públicamente, la comparación describe el cambio desde una perspectiva de sistemas.',
        before: [
          'Decisiones de UI dispersas sin punto de referencia compartido',
          'Sin sistema de diseño unificado en Figma',
          'Implementación más lenta: cada feature requería empezar desde cero',
          'Más inconsistencia visual entre pantallas',
          'Alineación más difícil entre diseño, ingeniería y producción',
        ],
        after: [
          'Assets reutilizables con nomenclatura clara y dimensiones correctas',
          'Sistema de diseño compartido con componentes, estados y tokens',
          'Producción de assets e implementación más rápidas',
          'Mayor consistencia visual entre features',
          'Mejor alineación entre diseño, ingeniería y producción',
        ],
        assetAlt: 'Diagrama conceptual comparando decisiones de UI dispersas con un enfoque de sistema de diseño compartido',
        assetCaption: 'De decisiones de UI dispersas a un sistema compartido para diseño, documentación e implementación.',
      },
      deliverables: [
        'Sistema de diseño UI en Figma con componentes, estados, tokens y variables',
        'Assets reutilizables: contenedores, iconografía, animaciones 2D',
        'Documentación de features en Confluence para todos los sistemas clave',
        'Flujos de interacción para inventario, libro guía, interacciones y onboarding',
        'Copy de UI para múltiples sistemas del juego',
        'Player personas y artefactos de UXR',
        'Soporte de implementación y revisión QA en Unreal',
        'Revisión de accesibilidad y guías de confort VR',
      ],
      outcome:
        'El sistema hizo lo que un sistema tiene que hacer: hizo al equipo más rápido. La creación de assets pasó de empezar desde cero a trabajar desde una referencia compartida. La documentación significó que ingeniería y QA podían avanzar sin tener que esperar a que un diseñador explicara la intención.\n\nLas decisiones específicas para VR, el libro guía diegético, el lenguaje de interacción contextual y la HUD liviana, le dieron a los jugadores una experiencia más limpia sin sacrificar la información que necesitaban. Lanzamos el juego.',
      whatILearned:
        'VR volvió concreto algo que ya creía: la claridad depende del contexto. Una decisión que funciona en una pantalla plana puede volverse incómoda o confusa dentro de un headset. La interfaz no es solo algo que el jugador ve. Se convierte en parte de cómo se mueve por el espacio y reacciona al mundo. Eso cambió cómo ponderé el feedback, la legibilidad y el balance entre UI y refuerzo háptico.\n\nLo otro que me quedó: una base de sistema importa más de lo que se anticipa, y el costo de no tenerla aparece tres meses después. La presión siempre es lanzar features individuales primero. Pero cada feature construida sin una referencia compartida genera retrabajo más adelante.',
      projectSnapshot: {
        role: 'UX Lead',
        context: 'Producción media-avanzada en un juego VR ya lanzado',
        platform: 'Meta Quest (VR)',
        team: 'Equipo UX/UI de 3 personas',
        tools: 'Figma · Unreal Engine · Jira · Confluence · Adobe Suite',
        mainChallenge: 'No existía un sistema de diseño UI compartido. Cada nueva feature requería empezar desde cero. Eso generaba inconsistencias y ralentizaba la implementación.',
        keyDeliverables: 'Sistema de diseño UI, assets reutilizables, flujos de interacción, documentación de features, revisión de accesibilidad, artefactos de UXR, soporte de QA',
        status: 'Lanzado',
        constraints: 'Presupuesto de performance de Meta Quest · equipo pequeño · entrada en producción media-avanzada · restricciones NDA en assets visuales específicos',
      },
      impact: {
        productionClarity: 'Construí un sistema reutilizable con nomenclatura, componentes, estados y documentación compartidos para que cada nueva feature tuviera un punto de referencia en lugar de empezar desde cero.',
        playerClarity: 'Apliqué consideraciones de legibilidad, confort y accesibilidad específicas para VR, incluyendo lenguaje de interacción contextual, refuerzo háptico y un libro guía diegético, para reducir confusión sin aumentar el peso del HUD.',
        systemValue: 'Definí patrones de UI reutilizables y lógica de componentes aplicable a gameplay, progresión, interacciones del mundo y flujos multijugador.',
        documentationValue: 'Documenté features, lógica de interacción, estados visuales y notas de implementación en Confluence para que la intención de diseño estuviera disponible para ingeniería, QA y producción sin reuniones adicionales.',
        implementationValue: 'Apoyé revisión de implementación en Unreal, QA passes y playtests semanales para conectar las decisiones de diseño con lo que los jugadores realmente experimentaban dentro del headset.',
        validation: 'Proceso externo de UXR con Meta · feedback de playtests internos · ciclos de revisión QA · priorización basada en RICE para enfocarse en las mejoras de mayor impacto primero.',
      },
      myOwnership: 'Fui responsable de la dirección UX/UI, la estructura del sistema, los flujos del jugador, la lógica de interfaz, la estrategia de documentación y las decisiones de sistema de diseño del proyecto. Lideré un equipo de dos diseñadores, coordiné con game design, arte, ingeniería, QA y producción, y fui responsable de traducir las necesidades de gameplay en componentes UI reutilizables, patrones de interacción y especificaciones listas para implementación. Mi rol no fue solo crear assets: el equipo tenía que tener una base compartida desde la cual diseñar, implementar y revisar, y yo me encargué de construirla.',
      researchValidation: 'Este trabajo estuvo informado por objetivos de claridad del jugador, requisitos de confort VR específicos de la plataforma, sesiones de UXR realizadas con Meta, feedback de playtests internos y factibilidad de producción. En VR, las decisiones de interfaz afectan el confort, la atención y la inmersión de manera diferente a una pantalla plana. Por eso evalué cada decisión de diseño contra la claridad del jugador y la experiencia física al mismo tiempo. Los hallazgos de UXR moldearon directamente las prioridades de iteración: el inventario, la comunicación del FTUX, el smooth turning y el confort de controles se mejoraron según lo que los jugadores reportaron en sesiones, no según supuestos.',
      implementationHandoff: 'El handoff se centró en reducir ambigüedad para la implementación en Unreal Engine. Documenté cada flujo, componente y estado de pantalla con nomenclatura, comportamiento de layout, lógica de interacción, estados visuales, notas específicas de VR y restricciones de producción. Estructuré los assets en Figma con dimensiones correctas y capas claras para que ingeniería y arte pudieran pasar de la intención de diseño a la implementación con menos brechas de interpretación. Apoyé este proceso con revisión directa de implementación y QA passes, no como un paso de entrega y olvido.',
    },
  },
  {
    id: 'CASE-002',
    slug: 'zombie-dragon-adventure',
    title: 'D&D: Zombie Dragon Adventure',
    thumbnailAlt: 'D&D Zombie Dragon Adventure — UX/UI systems design case study for a UEFN adventure experience inside Fortnite',
    role: 'UX Lead',
    platform: ['UEFN', 'Fortnite'],
    focus: 'UX/UI systems, Adventure Menu, FTUX structure, stores, UI assets, copy, accessibility pass, heuristic review, production documentation',
    focusEs: 'Sistemas UX/UI, Adventure Menu, estructura FTUX, tiendas, assets UI, copy, revisión de accesibilidad, revisión heurística, documentación de producción',
    status: 'SELECTED WORK',
    visibility: 'public',
    statusColor: 'accent',
    year: '2025',
    featured: true,
    category: 'games',
    headline: 'Building the UX architecture for a D&D roguelike inside Fortnite — from first-time player flow to production handoff.',
    headlineEs: 'Construyendo la arquitectura UX para un roguelike de D&D dentro de Fortnite — desde el flujo del primer jugador hasta el handoff de producción.',
    description:
      'Four months, three designers, one D&D roguelike inside Fortnite. My job was to turn a system-heavy experience into something a new player could understand in their first session — class selection, stores, D20 events, upgrades, and a Dracolich boss — without losing the Fortnite pace. That meant building the UX architecture from scratch: onboarding, menus, stores, documentation, and a tight UEFN handoff.',
    descriptionEs:
      'Cuatro meses, tres diseñadores, un roguelike de D&D dentro de Fortnite. Mi trabajo fue convertir una experiencia con muchos sistemas en algo que un jugador nuevo pudiera entender en su primera sesión: selección de clase, tiendas, eventos D20, mejoras y un Dracolich al final, sin perder el ritmo de Fortnite. Eso significó construir la arquitectura UX desde cero: onboarding, menús, tiendas, documentación y un handoff ajustado a las restricciones reales de UEFN.',
    tags: ['Product Design', 'UX/UI Systems', 'UEFN', 'Player Onboarding', 'Information Architecture', 'Design Documentation', 'UX Leadership'],
    relatedNotes: ['uefn-ux-lessons', 'game-accessibility-checklist', 'feedback-reduces-guesswork'],
    cta: 'View D&D: Zombie Dragon Adventure case',
    trailerSrc: '/cases/zombie-dragon-adventure/zombie-dragon-adventure-Trailer.mp4',
    gallery: [
      '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-01.webp',
      '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-02.webp',
      '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-03.webp',
      '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-04.webp',
      '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-05.webp',
      '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-06.webp',
    ],
    content: {
      summary:
        'D&D Zombie Dragon Adventure is a live roguelike experience inside Fortnite. Class selection, shared lobby, stores, D20 events, missions, upgrades, and a Dracolich boss at the end. On paper, it sounds like a lot. For a new player, it could easily feel like too much.\n\nI led a team of three over a four-month production window. We defined the FTUX, built the Adventure Book menu system, documented the store flows, and shipped implementation-ready deliverables within UEFN\'s real technical constraints — including the ones that were not obvious until we hit them.',
      quickFacts: {
        role: 'UX Lead',
        studio: 'Teravision Games',
        IP: 'Wizards of the Coast',
        platform: 'Fortnite ecosystem, UEFN',
        team: 'UX/UI team of 3',
        duration: '4 months',
        tools: 'Figma, UEFN, Jira, Confluence, Adobe Suite',
        status: 'Active (shipped)',
        confidentiality: 'Selected details shared. Some assets are NDA-restricted.',
      },
      context:
        'UEFN is not a blank canvas. You get a fixed Fortnite HUD, limited widget behavior, constrained font options, and a player base that arrived to play Fortnite — not to learn a new game. Any complex system you design has to work inside those limits, or it does not ship as designed.\n\nAdd a recognizable D&D IP with visual expectations, a four-month window, and multiple implementation dependencies across teams. That was the starting condition for everything we built.',
      challenge:
        'The experience had eleven interconnected systems. A player needed to understand the roguelike loop, how to improve between runs, what D20 events do, and how class selection shapes the experience — ideally in their first session, without a tutorial that kills the Fortnite pace.\n\nAt the same time, the production window was tight. The UX work had to move fast enough to stay ahead of implementation without losing the structure the player experience needed.',
      challengeRisks: [
        'Player clarity: helping new players understand the adventure loop, upgrades, D20 events and progression.',
        'Production clarity: documenting flows, assets and requirements for multiple areas.',
        'Technical clarity: designing UI that could work within UEFN limitations, including screen sizing, fonts, textures, Verse and widget constraints.',
      ],
      role:
        'As UX Lead, I led both the process and the people involved in UX/UI work.',
      roleResponsibilities: [
        'Leading the UX/UI process for the project',
        'Coordinating a team of three designers including myself',
        'Defining flows, priorities and documentation needs',
        'Creating UI assets such as iconography and store banners',
        'Designing the Adventure Book screen system',
        'Supporting copy for UI and player-facing systems',
        'Creating documentation for features and implementation',
        'Reviewing accessibility and heuristic issues',
        'Preparing wireframes, HiFi screens, WBP references and optimized assets for implementation',
        'Working with design, engineering, art and production to align the experience',
      ],
      constraints: [
        'UEFN did not provide the same flexibility as a fully custom responsive UI system.',
        'The interface needed to work across different screen sizes and support split-screen considerations.',
        'Font options were limited to platform-supported typography.',
        'Several systems depended on a mix of Verse and widgets.',
        'Some store functionality could not use widgets in the expected way at the time.',
        'Textures and assets needed to be optimized carefully to protect performance.',
        'The project had a recognizable IP, which meant UI decisions needed to respect visual direction and approval needs.',
        'The production window was short and the scope was high.',
      ],
      playerLoop: {
        intro: 'The main loop was roguelike: kill, die, improve and try again. Players started in a shared lobby with personalized progression. From there they could buy upgrades in stores, interact socially and prepare for the next run. Before entering the adventure, players selected one of three classes. During the run they explored routes, fought enemies, completed rooms, opened chests, interacted with D20 events and progressed toward the final boss.',
        steps: [
          { label: 'Shared Lobby', desc: 'Personalized progression space. Players check stats, interact socially and prepare before the next run.' },
          { label: 'Stores and Upgrades', desc: 'Buy stat upgrades, improve chest rewards and unlock gameplay options. The camp upgrades build over time.' },
          { label: 'Class Selection', desc: 'Before entering the adventure, players pick one of three classes. This shapes the run.' },
          { label: 'Adventure Entry', desc: 'Players explore branching routes, fight enemies and complete rooms across the world.' },
          { label: 'Chests and D20 Events', desc: 'Rewards and random events add unpredictability. Smart engagement pays off.' },
          { label: 'Defeat the Dracolich', desc: 'The final goal: explore every route and take down the boss. Then start again, stronger.' },
        ],
        asset: '/cases/zombie-dragon-adventure/dnd-player-flow.webp',
        assetAlt: 'D&D Zombie Dragon Adventure player experience loop diagram',
        assetCaption: 'Player experience loop: from lobby to Dracolich. Roguelike structure across sessions.',
      },
      approach: [
        {
          heading: 'Understanding the loop',
          body: 'The first step was mapping how the player moved through the experience: lobby, class selection, adventure entry, rooms, enemies, rewards, upgrades, missions, D20 events and boss progression. The experience had many systems, so the UX work needed to help players understand the loop without slowing down the Fortnite rhythm.',
        },
        {
          heading: 'Structuring the FTUX',
          body: 'The FTUX needed to teach the basic roguelike flow, how to improve stats and how to interact with D20 events in the world. The goal was to make the first experience clear, quick and dynamic enough for the ecosystem. This required defining the base player flow, the order of information and the way each stage should be presented.',
        },
        {
          heading: 'Designing the Adventure Menu',
          body: 'One of the main systems was the Adventure Book, a menu structure where players could consult progression information when needed. It included sections for stats, inventory, missions, achievements and map. Not every section remained visible in the live version due to production timing, but the system helped define the information architecture and UI direction for player progression.',
        },
        {
          heading: 'Documenting stores and upgrades',
          body: 'The stores and camp upgrade system needed to support a tycoon-style progression layer. Players could upgrade shops, improve what they obtained from chests, buy attribute upgrades and unlock different gameplay opportunities. The UX work helped document each store flow, define the upgrade logic and support alignment with the art team around the visual identity of the experience.',
        },
        {
          heading: 'Preparing implementation-ready deliverables',
          body: 'The work included wireframes, HiFi screens, WBP references, UI assets, naming, export considerations and documentation. Because UEFN implementation had technical restrictions, the design system and handoff had to consider screen sizing, performance, asset optimization and implementation limits from the beginning.',
        },
      ],
      keyDecisions: [
        {
          problem: 'The experience had several systems competing for player attention: classes, stats, inventory, missions, achievements, map, stores, upgrades, chests, D20 events and boss progression. The UI needed to make those systems feel connected rather than scattered.',
          decision: 'Designed the Adventure Book as a centralized menu system where players could consult all progression information in one place: stats, inventory, missions, achievements and map.',
          why: 'Giving the player a single place to check what they had, what they needed and where they were going reduced confusion across systems without removing depth.',
        },
        {
          problem: 'UEFN created specific limitations around responsiveness, typography, widgets, Verse and performance. Treating these as late technical issues would have resulted in screens that were impossible to implement as designed.',
          decision: 'Incorporated sizing rules, export naming, asset optimization and implementation constraints into the design system from the start of production.',
          why: 'Designing with real constraints from day one kept the work closer to what could actually be shipped. It reduced late-stage friction and handoff rework.',
        },
        {
          problem: 'The FTUX had to teach the basic roguelike flow, how to improve stats and how to interact with D20 events without slowing down the Fortnite rhythm. Too much information too early would push players out.',
          decision: 'Structured the onboarding around staged information: give players enough to move forward at each step, then introduce the next layer when they reached it.',
          why: 'Sequencing information by action rather than explanation made the first session feel clear and quick without turning it into a long tutorial.',
        },
        {
          problem: 'The project had high scope and multiple implementation dependencies. Not every design proposal could be fully implemented within the production window, and some design intent risked getting lost in handoff.',
          decision: 'Treated documentation as a primary deliverable: feature docs, templates, naming conventions, UI requirements and implementation references were built in parallel with design work.',
          why: 'Structured documentation preserved design intent across areas and created reusable references for future projects in the same ecosystem.',
        },
        {
          problem: 'The store and camp upgrade systems needed to communicate several decisions without overwhelming the player. Multiple upgrade types, chest rewards and unlock paths created real risk of decision fatigue.',
          decision: 'Designed clear visual flows for each store type, defined the upgrade logic with structured documentation and created reusable UI assets to keep visual consistency across different shop interactions.',
          why: 'Players should be able to understand what they can buy, upgrade or unlock without needing a manual. Clear flows and consistent assets reduce the cognitive load of economic systems.',
        },
      ],
      featuredSystems: [
        {
          id: 'ftux',
          num: '01',
          title: 'FTUX and Adventurer Guidance',
          body: 'The FTUX needed to help new players understand the basic structure of the experience: the roguelike loop, how to improve stats, how to interact with D20 events and how progression worked between runs. The decision was to define a clear player flow with staged information. Each step needed to support one action, not just explain it. This feature shows how UX helped translate a complex experience into a first session that could be understood quickly.',
          asset: '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-02.webp',
          assetAlt: 'D&D Zombie Dragon Adventure FTUX flow and adventurer guidance onboarding screens',
          assetCaption: 'FTUX flow: staged onboarding for new players entering the adventure.',
          flowDiagram: '/cases/zombie-dragon-adventure/dnd-player-flow.webp',
          flowDiagramAlt: 'D&D Zombie Dragon Adventure complete player flow diagram',
          flowDiagramCaption: 'Player flow: full decision map from first session to end-game loop.',
        },
        {
          id: 'adventure-menu',
          num: '02',
          title: 'Adventure Menu and Player Progression',
          body: 'The Adventure Book was designed as a system of screens where the player could consult progress and information when needed. The system included sections for stats, inventory, missions, achievements and map. The UX/UI work covered the full flow, information architecture, screen design, UI assets and documentation. This feature is important because it shows both concept and execution: how information was organized, how screens were structured and how progression was made easier to read.',
          asset: '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-03.webp',
          assetAlt: 'D&D Zombie Dragon Adventure Adventure Book and player progression screens',
          assetCaption: 'Adventure Book: screen system for player progression, stats, inventory and missions.',
        },
        {
          id: 'stores',
          num: '03',
          title: 'Stores and Camp Upgrade System',
          body: 'The stores supported the progression layer of the experience. Players could buy stat upgrades, improve what rewards they could get from chests, interact with different shop systems and evolve parts of the camp. The UX work focused on defining the flow for each store, documenting the upgrade logic and supporting visual coordination with the art team. This feature shows how complex economy and progression systems can be simplified for players through clearer flows, reusable UI assets and structured documentation.',
          asset: '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-04.webp',
          assetAlt: 'D&D Zombie Dragon Adventure store system and camp upgrades UI screens',
          assetCaption: 'Store system: shop UI and camp upgrade flows with reusable asset components.',
        },
      ],
      beforeAfter: {
        context: 'The UX/UI work focused on giving structure to a complex experience: shifting from scattered systems toward a clear, documented, player-readable architecture.',
        before: [
          'Player-facing systems designed without a shared information architecture',
          'Progression information spread across multiple disconnected screens',
          'Platform constraints treated as implementation problems, not design inputs',
          'Store flows and upgrade logic undocumented and inconsistent',
          'Onboarding left players to discover systems on their own',
        ],
        after: [
          'Adventure Book centralized all player-facing progression into one navigable system',
          'FTUX structured to guide players through the loop with staged, actionable information',
          'Design system built around UEFN constraints from the start of production',
          'Store flows, upgrade logic and naming documented with reusable templates',
          'Consistent assets and clear hierarchies reduced player confusion across systems',
        ],
        assetAlt: 'Before and after system architecture for D&D Zombie Dragon Adventure UX work',
        assetCaption: 'System architecture: before and after the UX/UI structuring work.',
      },
      deliverables: [
        'Wireframes and HiFi screens for all player-facing UI systems',
        'Adventure Book screen system with IA, flow and UI documentation',
        'FTUX flow definition and staged onboarding structure',
        'Store flow documentation and upgrade logic reference',
        'Iconography and store banner UI assets',
        'WBP references and implementation handoff documentation',
        'Naming conventions, export guidelines and asset optimization rules',
        'Accessibility and heuristic review documentation',
        'Reusable design templates for future UEFN projects',
      ],
      outcome:
        'The Adventure Book gave players a single place to check everything that mattered — stats, missions, inventory, progress. The FTUX got new players through the roguelike loop without stopping the Fortnite pace. Store documentation removed ambiguity during implementation.\n\nSome features were cut or simplified based on playtest findings. That was the right call — complexity that does not serve the player is a bug, not a feature. The experience shipped live.',
      playtests:
        'The project included playtests and internal feedback sessions. Those sessions helped identify navigation issues, critical experience bugs and moments where some features created more friction than value. Some features were removed or reduced because they added complexity without enough player value. The UX review also detected issues around system complexity, economy balance, accessibility and clarity for the target audience. Not every issue could be fully addressed within the production window, but those findings became important learnings for future projects.',
      whatILearned:
        'UEFN constraints are design inputs, not implementation problems. If you treat them as something to solve at the end, you end up with screens that look right in Figma and cannot ship. I started incorporating sizing rules, font limitations, and widget behavior into the system early. That made the handoff cleaner and saved cycles late in production.\n\nThe other thing I took away: complexity costs more than you think at the feature level. Some systems looked interesting during design and created confusion for actual players in playtests. Knowing when to cut is as much part of the job as knowing what to build.',
      projectSnapshot: {
        role: 'UX Lead',
        context: 'Active UEFN production inside the Fortnite ecosystem',
        platform: 'Fortnite / UEFN',
        team: 'UX/UI team of 3',
        tools: 'Figma · UEFN · Jira · Confluence · Adobe Suite',
        mainChallenge: 'Complex roguelike system with no shared UX architecture. Players needed to understand class selection, stores, upgrades, D20 events, missions and progression — all without slowing down the Fortnite rhythm.',
        keyDeliverables: 'FTUX flow, Adventure Book screen system, store flows, UI assets, WBP references, naming conventions, export guidelines, accessibility and heuristic documentation',
        status: 'Shipped (active)',
        constraints: 'UEFN platform limits on UI responsiveness, fonts and widget behavior · short production window · high scope · recognizable IP visual requirements',
      },
      impact: {
        productionClarity: 'Structured the FTUX and Adventure Book experience around player goals, progression and clarity. Translated complex game systems into readable, documented player-facing interfaces.',
        playerClarity: 'Helped players navigate a roguelike loop with class selection, D20 events, stores, upgrades, missions and boss progression through staged onboarding and a centralized Adventure Book.',
        systemValue: 'Created reusable UI assets, naming conventions and documentation templates that could support future projects in the same UEFN ecosystem.',
        documentationValue: 'Documented UI flows, WBP references, naming rules, export behavior and implementation notes — creating handoff material designed to reduce interpretation gaps between UX, UI and implementation.',
        implementationValue: 'Designed with UEFN constraints embedded from day one: screen sizing rules, performance-safe asset optimization, font limitations and widget behavior were design inputs, not late surprises.',
        validation: 'Internal playtests · stakeholder feedback · QA review · UX and heuristic review for accessibility and clarity issues. Some features were reduced or removed based on playtest findings.',
      },
      myOwnership: 'I owned the UX process, player flows, information architecture, documentation strategy and design-system decisions for this experience. I led a team of three designers, defined the structure for the FTUX, Adventure Book, stores and upgrade systems, and was responsible for producing implementation-ready deliverables. My role included defining what needed to be designed, how it needed to be documented, and how the work should be handed off — not just executing individual screens.',
      researchValidation: 'This work was informed by player clarity goals, UEFN platform constraints, IP visual requirements and internal playtest findings. Playtests and feedback sessions helped identify where players struggled to understand the loop, where systems created unnecessary friction and where some features added complexity without enough value. The UX review process included heuristic evaluation, accessibility checks and readability analysis. Not every finding could be addressed within the production window, but they shaped iteration priorities and informed future decisions.',
      implementationHandoff: 'The handoff was built into the process from the start, not treated as a final step. Each screen, flow and asset was produced with WBP references, naming conventions, export guidelines and asset optimization rules. Because UEFN has specific technical constraints around responsiveness, fonts and widget behavior, the design system was built to account for those limits rather than assuming they could be handled later. Documentation in Confluence preserved design intent across areas and created reusable references for future projects.',
    },
    whatThisShows:
      'The UX work that mattered most on this project was not visible in the final screens. It was the information architecture that made the Adventure Book navigable, the FTUX structure that sequenced onboarding by action instead of explanation, and the documentation that kept implementation moving without constant back-and-forth.\n\nPlayer flows that account for how people actually enter an experience. Assets that hold up across different UI states. Documentation that engineering can work from. That is what I care about building.',
    whatThisShowsEs:
      'El trabajo UX que más importó en este proyecto no era visible en las pantallas finales. Era la arquitectura de información que hizo navegable el Adventure Book, la estructura de FTUX que secuenció el onboarding por acción y no por explicación, y la documentación que mantuvo la implementación avanzando sin retrabajo constante.\n\nFlujos de jugador que contemplan cómo la gente realmente entra a una experiencia. Assets que aguantan distintos estados de UI. Documentación desde la que ingeniería pueda trabajar. Eso es lo que me importa construir.',
    contentEs: {
      summary:
        'D&D Zombie Dragon Adventure es una experiencia roguelike activa dentro de Fortnite. Selección de clase, lobby compartido, tiendas, eventos D20, misiones, mejoras y un Dracolich al final. En papel suena a mucho. Para un jugador nuevo, fácilmente puede sentirse como demasiado.\n\nLideré un equipo de tres durante cuatro meses de producción. Definimos el FTUX, construimos el sistema de pantallas del Adventure Book, documentamos los flujos de tiendas y entregamos materiales listos para implementación dentro de las restricciones técnicas reales de UEFN, incluyendo las que no eran obvias hasta que las encontramos.',
      quickFacts: {
        role: 'UX Lead',
        studio: 'Teravision Games',
        IP: 'Wizards of the Coast',
        platform: 'Ecosistema Fortnite, UEFN',
        team: 'Equipo UX/UI de 3 personas',
        duration: '4 meses',
        tools: 'Figma, UEFN, Jira, Confluence, Adobe Suite',
        status: 'Activo (lanzado)',
        confidentiality: 'Detalles seleccionados compartidos. Algunos assets son de uso restringido.',
      },
      context:
        'UEFN no es un lienzo en blanco. Tienes una HUD fija de Fortnite, comportamiento limitado de widgets, opciones tipográficas restringidas y una base de jugadores que llegó a jugar Fortnite, no a aprender un juego nuevo. Cualquier sistema complejo que diseñes tiene que funcionar dentro de esos límites, o no se lanza como fue diseñado.\n\nSuma una IP reconocible de D&D con expectativas visuales, cuatro meses de ventana y múltiples dependencias de implementación entre equipos. Esa era la condición de partida para todo lo que construimos.',
      challenge:
        'La experiencia tenía once sistemas interconectados. Un jugador necesitaba entender el loop roguelike, cómo mejorar entre runs, qué hacen los eventos D20 y cómo la selección de clase cambia la experiencia, idealmente en su primera sesión, sin un tutorial que matara el ritmo de Fortnite.\n\nAl mismo tiempo, la ventana de producción era corta. El trabajo UX tenía que moverse lo suficientemente rápido para ir por delante de la implementación sin perder la estructura que la experiencia del jugador necesitaba.',
      challengeRisks: [
        'Claridad para el jugador: ayudar a nuevos jugadores a entender el loop de aventura, las mejoras, los eventos D20 y la progresión.',
        'Claridad de producción: documentar flujos, assets y requerimientos para múltiples áreas.',
        'Claridad técnica: diseñar UI funcional dentro de las limitaciones de UEFN, incluyendo tamaños de pantalla, tipografías, texturas, Verse y widgets.',
      ],
      role:
        'Como UX Lead, lideré tanto el proceso como las personas involucradas en UX/UI.',
      roleResponsibilities: [
        'Liderar el proceso UX/UI del proyecto',
        'Coordinar un equipo de tres diseñadores incluyéndome',
        'Definir flujos, prioridades y necesidades de documentación',
        'Crear assets de UI como iconografía y banners de tiendas',
        'Diseñar el sistema de pantallas del Adventure Book',
        'Apoyar copy para UI y sistemas visibles para el jugador',
        'Crear documentación de features e implementación',
        'Revisar temas de accesibilidad y heurísticas',
        'Preparar wireframes, pantallas HiFi, referencias WBP y assets optimizados para implementación',
        'Trabajar con diseño, ingeniería, arte y producción para alinear la experiencia',
      ],
      constraints: [
        'UEFN no ofrecía la misma flexibilidad de un sistema UI completamente responsive.',
        'La interfaz debía funcionar en distintos tamaños de pantalla y considerar split-screen.',
        'Las opciones tipográficas estaban limitadas a las disponibles en la plataforma.',
        'Varios sistemas dependían de una mezcla entre Verse y widgets.',
        'Algunas funcionalidades de tiendas no podían funcionar como UI tradicional basada en widgets en ese momento.',
        'Las texturas y assets debían optimizarse con cuidado para proteger performance.',
        'El proyecto trabajaba con una IP reconocible, así que las decisiones de UI debían respetar dirección visual y necesidades de aprobación.',
        'La ventana de producción era corta y el alcance era alto.',
      ],
      playerLoop: {
        intro: 'El loop principal era roguelike: matar, morir, mejorar y volver a empezar. Los jugadores empezaban en un lobby común con progresión personalizada. Desde ahí podían comprar mejoras en tiendas, tener interacciones sociales y prepararse para la siguiente partida. Antes de entrar a la aventura, el jugador seleccionaba una de tres clases. Durante la run, exploraba rutas, enfrentaba enemigos, completaba cuartos, abría cofres, interactuaba con eventos D20 y avanzaba hacia el jefe final.',
        steps: [
          { label: 'Lobby compartido', desc: 'Espacio de progresión personalizada. Los jugadores revisan stats, interactúan y se preparan antes de la siguiente run.' },
          { label: 'Tiendas y mejoras', desc: 'Comprar mejoras de stats, mejorar los premios de cofres y desbloquear opciones de gameplay. Las mejoras del campamento se acumulan.' },
          { label: 'Selección de clase', desc: 'Antes de entrar a la aventura, el jugador elige una de tres clases. Esto da forma a la run.' },
          { label: 'Entrada a la aventura', desc: 'Los jugadores exploran rutas con bifurcaciones, enfrentan enemigos y completan cuartos a través del mundo.' },
          { label: 'Cofres y eventos D20', desc: 'Recompensas y eventos aleatorios agregan imprevisibilidad. El buen engagement tiene recompensa.' },
          { label: 'Derrotar al Dracolich', desc: 'El objetivo final: explorar todas las rutas y vencer al jefe. Luego empezar de nuevo, más fuerte.' },
        ],
        asset: '/cases/zombie-dragon-adventure/dnd-player-flow.webp',
        assetAlt: 'Diagrama del loop de experiencia del jugador en D&D Zombie Dragon Adventure',
        assetCaption: 'Loop de experiencia del jugador: del lobby al Dracolich. Estructura roguelike entre sesiones.',
      },
      approach: [
        {
          heading: 'Entender el loop',
          body: 'El primer paso fue entender cómo se movía el jugador dentro de la experiencia: lobby, selección de clase, entrada a la aventura, cuartos, enemigos, recompensas, mejoras, misiones, eventos D20 y progresión hacia el jefe. La experiencia tenía muchos sistemas, así que el trabajo UX debía ayudar al jugador a entender el loop sin romper el ritmo de Fortnite.',
        },
        {
          heading: 'Estructurar el FTUX',
          body: 'El FTUX debía enseñar el flujo básico roguelike, cómo mejorar stats y cómo interactuar con los eventos D20 en el mundo. El objetivo era que la primera experiencia fuera clara, rápida y lo suficientemente dinámica para el ecosistema. Esto implicó definir el flujo base del jugador, el orden de la información y la manera de presentar cada etapa.',
        },
        {
          heading: 'Diseñar el Adventure Menu',
          body: 'Uno de los sistemas principales fue el Adventure Book, una estructura de menús donde el jugador podía consultar información de progresión cuando la necesitara. Incluía secciones como stats, inventario, misiones, logros y mapa. No todas las secciones permanecieron visibles en la versión live por restricciones de timeline, pero el sistema ayudó a definir la arquitectura de información y la dirección UI para la progresión del jugador.',
        },
        {
          heading: 'Documentar tiendas y mejoras',
          body: 'Las tiendas y el sistema de mejoras del campamento debían soportar una capa de progresión tipo tycoon. El jugador podía mejorar tiendas, mejorar los premios obtenidos en cofres, comprar mejoras de atributos y desbloquear distintas oportunidades de gameplay. El trabajo UX ayudó a documentar el flujo de cada tienda, definir la lógica de mejoras y apoyar la alineación con arte alrededor de la identidad visual de la experiencia.',
        },
        {
          heading: 'Preparar entregables listos para implementación',
          body: 'El trabajo incluyó wireframes, pantallas HiFi, referencias WBP, assets UI, nomenclatura, consideraciones de exportación y documentación. Como la implementación en UEFN tenía restricciones técnicas, el sistema de diseño y el handoff debían considerar desde el inicio tamaños de pantalla, performance, optimización de assets y límites de implementación.',
        },
      ],
      keyDecisions: [
        {
          problem: 'La experiencia tenía varios sistemas compitiendo por la atención del jugador: clases, stats, inventario, misiones, logros, mapa, tiendas, mejoras, cofres, eventos D20 y progresión hacia el jefe. La UI debía hacer que esos sistemas se sintieran conectados, no dispersos.',
          decision: 'Diseñé el Adventure Book como un sistema de menús centralizado donde el jugador podía consultar toda la información de progresión en un solo lugar: stats, inventario, misiones, logros y mapa.',
          why: 'Darle al jugador un solo lugar para revisar qué tenía, qué necesitaba y hacia dónde iba redujo la confusión entre sistemas sin quitar profundidad.',
        },
        {
          problem: 'UEFN generaba limitaciones específicas alrededor de responsividad, tipografías, widgets, Verse y performance. Tratar estos temas como problemas técnicos al final habría resultado en pantallas imposibles de implementar como se diseñaron.',
          decision: 'Incorporé reglas de tamaño, nomenclatura de exportación, optimización de assets y restricciones de implementación al sistema de diseño desde el inicio de la producción.',
          why: 'Diseñar con las restricciones reales desde el primer día mantuvo el trabajo más cerca de lo que podía lanzarse realmente. Redujo fricción tardía y retrabajo en el handoff.',
        },
        {
          problem: 'El FTUX debía enseñar el flujo roguelike básico, cómo mejorar stats y cómo interactuar con eventos D20 sin frenar el ritmo de Fortnite. Demasiada información demasiado pronto aleja al jugador.',
          decision: 'Estructuré el onboarding alrededor de información por etapas: darle al jugador lo suficiente para avanzar en cada paso, e introducir la siguiente capa cuando la alcanzara.',
          why: 'Secuenciar la información por acción en lugar de por explicación hizo que la primera sesión se sintiera clara y rápida sin convertirla en un tutorial largo.',
        },
        {
          problem: 'El proyecto tenía un alcance alto y múltiples dependencias de implementación. No todas las propuestas podían implementarse completamente dentro de la ventana de producción, y parte de la intención de diseño corría el riesgo de perderse en el handoff.',
          decision: 'Traté la documentación como un entregable principal: docs de features, templates, nomenclatura, requerimientos de UI y referencias de implementación se construyeron en paralelo al trabajo de diseño.',
          why: 'La documentación estructurada preservó la intención de diseño entre áreas y creó referencias reutilizables para futuros proyectos en el mismo ecosistema.',
        },
        {
          problem: 'Los sistemas de tiendas y mejoras del campamento debían comunicar varias decisiones sin abrumar al jugador. Múltiples tipos de mejoras, premios de cofres y rutas de desbloqueo generaban riesgo real de fatiga de decisión.',
          decision: 'Diseñé flujos visuales claros para cada tipo de tienda, definí la lógica de mejoras con documentación estructurada y creé assets UI reutilizables para mantener consistencia visual entre las distintas interacciones de tienda.',
          why: 'El jugador debe poder entender qué puede comprar, mejorar o desbloquear sin necesitar un manual. Flujos claros y assets consistentes reducen la carga cognitiva de los sistemas económicos.',
        },
      ],
      featuredSystems: [
        {
          id: 'ftux',
          num: '01',
          title: 'FTUX y guía del aventurero',
          body: 'El FTUX debía ayudar a los nuevos jugadores a entender la estructura base de la experiencia: el loop roguelike, cómo mejorar stats, cómo interactuar con eventos D20 y cómo funcionaba la progresión entre runs. La decisión fue definir un flujo claro con información por etapas. Cada paso debía apoyar una acción, no solo explicar. Esta feature muestra cómo UX ayudó a traducir una experiencia compleja en una primera sesión que pudiera entenderse rápido.',
          asset: '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-02.webp',
          assetAlt: 'Flujo FTUX y sistema de guía del aventurero en D&D Zombie Dragon Adventure',
          assetCaption: 'Flujo FTUX: onboarding por etapas para nuevos jugadores entrando a la aventura.',
          flowDiagram: '/cases/zombie-dragon-adventure/dnd-player-flow.webp',
          flowDiagramAlt: 'Diagrama completo del flujo del jugador en D&D Zombie Dragon Adventure',
          flowDiagramCaption: 'Flujo del jugador: mapa de decisiones desde la primera sesión hasta el loop final.',
        },
        {
          id: 'adventure-menu',
          num: '02',
          title: 'Adventure Menu y progresión del jugador',
          body: 'El Adventure Book fue diseñado como un sistema de pantallas donde el jugador podía consultar progreso e información cuando lo necesitara. El sistema incluía secciones como stats, inventario, misiones, logros y mapa. El trabajo UX/UI incluyó flujo, arquitectura de información, diseño de pantallas, assets UI y documentación. Esta feature es importante porque muestra concepto y ejecución: cómo se organizó la información, cómo se estructuraron las pantallas y cómo se hizo más legible la progresión.',
          asset: '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-03.webp',
          assetAlt: 'Adventure Book y pantallas de progresión del jugador en D&D Zombie Dragon Adventure',
          assetCaption: 'Adventure Book: sistema de pantallas para progresión del jugador, stats, inventario y misiones.',
        },
        {
          id: 'stores',
          num: '03',
          title: 'Tiendas y sistema de mejoras del campamento',
          body: 'Las tiendas soportaban la capa de progresión de la experiencia. El jugador podía comprar mejoras de stats, mejorar los premios que podía recibir de cofres, interactuar con distintos sistemas de tienda y evolucionar partes del campamento. El trabajo UX se enfocó en definir el flujo de cada tienda, documentar la lógica de mejoras y apoyar la coordinación visual con el equipo de arte. Esta feature muestra cómo sistemas complejos de economía y progresión pueden simplificarse para el jugador mediante flujos claros, assets reutilizables y documentación estructurada.',
          asset: '/cases/zombie-dragon-adventure/dungeons-and-dragons-fortnite-04.webp',
          assetAlt: 'Sistema de tiendas y mejoras del campamento en D&D Zombie Dragon Adventure',
          assetCaption: 'Sistema de tiendas: UI de shop y flujos de mejoras del campamento con componentes reutilizables.',
        },
      ],
      beforeAfter: {
        context: 'El trabajo UX/UI se enfocó en darle estructura a una experiencia compleja: pasando de sistemas dispersos a una arquitectura clara, documentada y legible para el jugador.',
        before: [
          'Sistemas visibles para el jugador diseñados sin una arquitectura de información compartida',
          'Información de progresión distribuida en múltiples pantallas desconectadas',
          'Restricciones de plataforma tratadas como problemas de implementación, no como inputs de diseño',
          'Flujos de tiendas y lógica de mejoras sin documentar e inconsistentes',
          'El onboarding dejaba a los jugadores descubrir los sistemas por su cuenta',
        ],
        after: [
          'El Adventure Book centralizó toda la progresión visible para el jugador en un sistema navegable',
          'El FTUX estructurado guía a los jugadores a través del loop con información por etapas y orientada a la acción',
          'Sistema de diseño construido alrededor de las restricciones de UEFN desde el inicio de la producción',
          'Flujos de tiendas, lógica de mejoras y nomenclatura documentados con templates reutilizables',
          'Assets consistentes y jerarquías claras redujeron la confusión del jugador entre sistemas',
        ],
        assetAlt: 'Diagrama de arquitectura de sistemas antes y después del trabajo UX en D&D Zombie Dragon Adventure',
        assetCaption: 'Arquitectura de sistemas: antes y después del trabajo de estructuración UX/UI.',
      },
      deliverables: [
        'Wireframes y pantallas HiFi para todos los sistemas UI visibles para el jugador',
        'Sistema de pantallas del Adventure Book con AI, flujo y documentación de UI',
        'Definición del flujo FTUX y estructura de onboarding por etapas',
        'Documentación de flujos de tiendas y referencia de lógica de mejoras',
        'Iconografía y assets de banners de tiendas',
        'Referencias WBP y documentación de handoff de implementación',
        'Nomenclatura, guías de exportación y reglas de optimización de assets',
        'Documentación de revisión de accesibilidad y heurísticas',
        'Templates de diseño reutilizables para futuros proyectos UEFN',
      ],
      outcome:
        'El Adventure Book le dio a los jugadores un solo lugar para consultar todo lo que importaba: stats, misiones, inventario, progreso. El FTUX llevó a los jugadores nuevos a través del loop roguelike sin detener el ritmo de Fortnite. La documentación de tiendas eliminó ambigüedad durante la implementación.\n\nAlgunas features fueron cortadas o simplificadas a partir de los playtests. Esa fue la decisión correcta: la complejidad que no sirve al jugador es un bug, no una feature. La experiencia se lanzó live.',
      playtests:
        'El proyecto incluyó playtests y feedback interno. Esas sesiones ayudaron a identificar problemas de navegación, bugs críticos de experiencia y momentos donde algunas features generaban más fricción que valor. Algunas features fueron eliminadas o reducidas porque agregaban complejidad sin suficiente valor para el jugador. La revisión UX también detectó temas de complejidad en los sistemas, balance de economía, accesibilidad y claridad para el público objetivo. No todo pudo resolverse dentro de la ventana de producción, pero esos hallazgos se convirtieron en aprendizajes importantes para futuros proyectos.',
      whatILearned:
        'Las restricciones de UEFN son inputs de diseño, no problemas de implementación. Si las tratas como algo que resolver al final, terminas con pantallas que se ven bien en Figma y no pueden lanzarse. Empecé a incorporar reglas de tamaño, limitaciones de fuentes y comportamiento de widgets al sistema desde temprano. Eso hizo el handoff más limpio y ahorró ciclos al final de la producción.\n\nLo otro que me quedé: la complejidad cuesta más de lo que parece, feature por feature. Algunos sistemas se veían interesantes durante el diseño y generaban confusión en jugadores reales en los playtests. Saber cuándo cortar es igual de importante que saber qué construir.',
      projectSnapshot: {
        role: 'UX Lead',
        context: 'Producción activa en UEFN dentro del ecosistema Fortnite',
        platform: 'Fortnite / UEFN',
        team: 'Equipo UX/UI de 3 personas',
        duration: '4 meses',
        tools: 'Figma · UEFN · Jira · Confluence · Adobe Suite',
        mainChallenge: 'Once sistemas interconectados con una ventana de producción corta, un flujo de primer jugador que tenía que funcionar dentro de Fortnite, y assets que debían estar listos para implementación desde el inicio.',
        keyDeliverables: 'Flujo FTUX, sistema de pantallas del Adventure Book, flujos de tiendas, assets UI, referencias WBP, nomenclatura, guías de exportación, documentación de accesibilidad y revisión heurística',
        status: 'Lanzado (activo)',
        constraints: 'Limitaciones de UEFN en responsividad de UI, fuentes y comportamiento de widgets · ventana corta de producción · alcance alto · requisitos visuales de un IP reconocible',
      },
      impact: {
        productionClarity: 'Estructuré la experiencia del FTUX y el Adventure Book alrededor de los objetivos del jugador, la progresión y la claridad. Traduje sistemas de juego complejos en interfaces documentadas y legibles para el jugador.',
        playerClarity: 'Ayudé a los jugadores a navegar un loop roguelike con selección de clase, eventos D20, tiendas, mejoras, misiones y progresión de jefes, a través de un onboarding por etapas y un Adventure Book centralizado.',
        systemValue: 'Creé assets UI reutilizables, nomenclatura y plantillas de documentación que pueden apoyar proyectos futuros en el mismo ecosistema UEFN.',
        documentationValue: 'Documenté flujos UI, referencias WBP, reglas de nomenclatura, comportamiento de exportación y notas de implementación. El objetivo era reducir las brechas de interpretación entre UX, UI e implementación.',
        implementationValue: 'Diseñé con las restricciones de UEFN integradas desde el día uno: reglas de tamaño de pantalla, optimización de assets segura para performance, limitaciones de fuentes y comportamiento de widgets fueron inputs de diseño, no sorpresas tardías.',
        validation: 'Playtests internos · feedback de stakeholders · revisión QA · revisión UX y heurística para accesibilidad y claridad. Algunas features se redujeron o eliminaron según lo que mostraron los playtests.',
      },
      myOwnership: 'Fui responsable del proceso UX, los flujos del jugador, la arquitectura de información, la estrategia de documentación y las decisiones de sistema de diseño para esta experiencia. Lideré un equipo de tres diseñadores, definí la estructura del FTUX, el Adventure Book, las tiendas y los sistemas de mejoras, y fui responsable de producir entregables listos para implementación. Mi rol incluyó definir qué debía diseñarse, cómo documentarse y cómo debía hacerse el handoff. No solo ejecutar pantallas individuales.',
      researchValidation: 'Este trabajo estuvo informado por objetivos de claridad del jugador, restricciones de la plataforma UEFN, requisitos visuales del IP y hallazgos de playtests internos. Los playtests y sesiones de feedback ayudaron a identificar dónde los jugadores tenían dificultades para entender el loop, dónde los sistemas generaban fricción innecesaria y dónde algunas features agregaban complejidad sin suficiente valor. El proceso de revisión UX incluyó evaluación heurística, revisión de accesibilidad y análisis de legibilidad. No todos los hallazgos pudieron abordarse dentro de la ventana de producción, pero dieron forma a las prioridades de iteración e informaron decisiones futuras.',
      implementationHandoff: 'El handoff estuvo integrado en el proceso desde el inicio, no como un paso final. Produje cada pantalla, flujo y asset con referencias WBP, nomenclatura, guías de exportación y reglas de optimización. Como UEFN tiene restricciones técnicas específicas en responsividad, fuentes y comportamiento de widgets, construí el sistema de diseño para contemplar esos límites en lugar de asumir que podrían resolverse después. La documentación en Confluence preservó la intención de diseño y creó referencias reutilizables para proyectos futuros.',
    },
  },
  {
    id: 'CASE-003',
    slug: 'courtyard-king',
    title: 'The Walking Dead: Courtyard King',
    thumbnailAlt: 'The Walking Dead: Courtyard King — UEFN survival UX and interface design case study',
    role: 'UX/UI Designer',
    platform: ['UEFN', 'Fortnite'],
    focus: 'Tension UX, survival feedback, HUD logic, risk communication',
    focusEs: 'UX de tensión, retroalimentación de supervivencia, lógica de HUD, comunicación de riesgo',
    status: 'NDA-SAFE',
    visibility: 'nda-safe',
    statusColor: 'accent',
    year: '2025',
    featured: true,
    category: 'games',
    trailerSrc: '/cases/courtyard-king/courtyard-king-trailer.mp4',
    headline: 'Designing survival feedback that preserves The Walking Dead\'s tension — inside Fortnite\'s technical constraints.',
    headlineEs: 'Diseñando feedback de supervivencia que preserve la tensión de The Walking Dead — dentro de las restricciones técnicas de Fortnite.',
    description:
      'The Walking Dead has a specific emotional contract: danger should feel real, not managed. My job was to design a survival interface that communicated threat and resource state without making the experience feel like a conventional game — all within UEFN\'s hard constraints and Fortnite\'s fixed HUD zones. Details are NDA-limited, but the design thinking is here.',
    descriptionEs:
      'The Walking Dead tiene un contrato emocional específico: el peligro debe sentirse real, no gestionado. Mi trabajo fue diseñar una interfaz de supervivencia que comunicara amenazas y estado de recursos sin hacer que la experiencia se sintiera como un juego convencional, todo dentro de las restricciones duras de UEFN y las zonas fijas de la HUD de Fortnite. Los detalles son NDA, pero el razonamiento de diseño está aquí.',
    tags: ['NDA-Safe', 'UEFN', 'Survival UX', 'HUD Design', 'Feedback Systems'],
    relatedNotes: ['clean-hud-vs-clear-hud', 'feedback-reduces-guesswork', 'what-is-a-game-ui-system'],
    cta: 'View The Walking Dead: Courtyard King case',
    content: {
      summary:
        'The Walking Dead: Courtyard King puts players inside a survival experience where tension is the point — not the kind that comes from difficult mechanics, but the kind that comes from not knowing if you will make it through the next moment.\n\nMy work was the interface layer: how players read threat, understand their resources, and stay aware of their teammates — all without the game stopping to explain itself, and without breaking the IP\'s atmosphere. Some details are NDA-limited. The design thinking is here.',
      quickFacts: {
        role: 'UX/UI Designer',
        studio: 'Teravision Games',
        IP: 'Skybound',
        platform: 'UEFN / Fortnite',
        year: '2025',
        status: 'In production / NDA',
        confidentiality: 'NDA-safe breakdown. Some details are intentionally redacted. Visual assets not available for public sharing.',
      },
      context:
        'Players who enter a Walking Dead experience bring expectations built over years of the franchise: scarcity matters, danger is real, numbers on a screen break the mood. The interface either honors that emotional contract or it works against it.\n\nOn top of that, UEFN means Fortnite\'s native HUD is always there. You cannot remove it. You design around it — which means every custom UI element has to justify itself against what is already occupying the screen.',
      challenge:
        'Too much UI and the world loses its danger. Too little and players make uninformed decisions that frustrate rather than challenge. The line between those two outcomes is the design problem — and it is a narrow line.\n\nWorking inside UEFN meant I also had hard limits on what custom UI could actually do: placement zones, font rendering, the screen real estate that Fortnite\'s native HUD already occupies. The solution had to fit inside all of that while still feeling native to The Walking Dead.',
      role:
        'I designed the HUD logic and feedback systems for the player-facing interface. My work covered threat indicators, resource communication, and the visual hierarchy for cooperative actions. I collaborated with art and engineering on what could be executed within the production timeline.',
      constraints: [
        'The Walking Dead IP tone requirements: the interface could not feel "gamey" or break the tension',
        'UEFN limitations on custom UI placement and font rendering',
        'Fortnite native HUD occupies fixed screen zones',
        'NDA restrictions on specific mechanic and asset details',
        'Cooperative experience design: UI had to communicate individual and group state simultaneously',
      ],
      approach: [
        {
          heading: 'Atmosphere-safe feedback design',
          body: 'Established a principle that every interface element had to earn its presence. If a piece of information could be understood through environment or sound design, it did not need a UI layer. This kept the screen surface clean while preserving survival tension.',
        },
        {
          heading: 'Threat communication without noise',
          body: 'Designed a threat feedback system that used position, intensity, and timing rather than explicit numeric displays. Players received directional indicators and state signals without being pulled out of the experience by a traditional health bar.',
        },
        {
          heading: 'Resource legibility under pressure',
          body: 'Resource state needed to be readable in under a second during high-stress moments. Simplified the visual language to essential states: sufficient, low, critical. Each state had a distinct visual treatment that worked in both lit and dark environments.',
        },
        {
          heading: 'Cooperative action clarity',
          body: 'Designed visual communication for cooperative moments: shared objectives, support actions, and teammate state. Balanced showing enough information to coordinate without creating information overlap between individual and group needs.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Traditional health and resource displays broke the survival tension and made the experience feel like a conventional game rather than a survival narrative.',
          decision: 'Replaced explicit health displays with physical and environmental indicators calibrated to the IP\'s tone. Resource states communicated through scarcity signals rather than numeric values.',
          why: 'The emotional contract of The Walking Dead is about felt danger, not managed numbers. UI that surfaces statistics removes the player from that emotional frame.',
        },
        {
          problem: 'In cooperative scenarios, players were missing teammate distress signals because individual threat was consuming their full attention.',
          decision: 'Designed a peripheral awareness system that created distinct visual signatures for teammate critical states, positioned outside the primary threat zone.',
          why: 'Peripheral placement respects the player\'s primary attention zone while ensuring cooperative-critical information is visible without requiring active monitoring.',
        },
      ],
      deliverables: [
        'HUD logic documentation and safe zone rules',
        'Threat feedback system specifications',
        'Resource state visual language',
        'Cooperative action UI framework',
        'Implementation notes for engineering',
      ],
      outcome:
        'The interface communicated survival state without breaking atmosphere. Threat read through position and intensity — not health bar numbers. Resources showed as essential states: sufficient, low, critical. Teammate awareness lived in the peripheral zone, away from the player\'s primary threat focus.\n\nSpecific metrics are NDA-restricted. What I can share is the design problem, the constraints I navigated, and the decisions I made under a three-way tension between IP tone, platform limits, and player clarity.',
      nextSteps:
        'Survival UX benefits from playtest data focused on moments of player confusion versus intended tension. I would want to distinguish between "confused and frustrated" and "tense and engaged" in session observations, then use that to calibrate exactly how much information the interface needs to surface.',
      projectSnapshot: {
        role: 'UX/UI Designer',
        context: 'UEFN experience inside Fortnite — Walking Dead IP',
        platform: 'UEFN / Fortnite',
        team: 'Cross-functional: design, art, engineering',
        tools: 'Figma · UEFN',
        mainChallenge: 'Communicating survival stakes under IP tone constraints and UEFN technical limits simultaneously',
        keyDeliverables: 'HUD logic documentation, threat feedback system, resource state visual language, cooperative action UI framework, implementation notes',
        status: 'In production / NDA-safe',
        constraints: 'UEFN UI layer restrictions, Fortnite native HUD zones, Walking Dead IP tone requirements, NDA restrictions on mechanic details',
      },
      impact: {
        productionClarity: 'Delivered complete HUD logic documentation, safe zone rules and feedback system specifications within the production timeline, giving engineering a clear implementation reference',
        playerClarity: 'Replaced explicit numeric health and resource displays with atmospheric indicators calibrated to Walking Dead tone — communicating survival state without pulling players out of the tension',
        systemValue: 'Established IP-consistent interface principles: every UI element had to earn its screen presence. That filter reduced visual noise while preserving the emotional contract of the franchise',
        documentationValue: 'Delivered HUD logic docs, threat specs, resource state visual language and cooperative UI framework — each with implementation context for engineering and notes on UEFN-specific constraints',
        implementationValue: 'Aligned design decisions to what UEFN technically permitted before committing to specs, avoiding revision cycles caused by platform limitations discovered late',
        validation: 'NDA-limited. Outcome metrics are not available for public sharing. The evidence here is the design problem, the constraint navigation, and the type of decisions made under a three-way tension between IP tone, platform limits, and player clarity.',
      },
      myOwnership:
        'I owned the HUD logic and feedback system design end-to-end. This included defining threat communication rules, resource state visual language, cooperative action clarity, and the documentation that translated those decisions into engineering-ready specifications. I was the primary interface designer navigating the triple constraint of Walking Dead IP tone, Fortnite native HUD zones, and UEFN technical limitations. Design decisions were not made in isolation — I collaborated with art and engineering at each step to confirm what could be built before committing to a direction.',
      researchValidation:
        'Research for this project was primarily competitive and constraint-driven. I analyzed how survival games communicate threat and resource state without explicit numeric displays, reviewed the Walking Dead franchise visual and tone conventions, and assessed what UEFN technically allowed within its UI layer. I worked closely with art and engineering to validate which design directions could be executed within the platform constraints before finalizing specifications. The research goal was not aesthetic — it was understanding which interface signals work under stress, in the dark, with limited screen real estate, and without breaking the IP mood.',
      implementationHandoff:
        'Handoff consisted of HUD logic documentation with explicit safe zone rules, threat feedback system specifications, resource state visual definitions, and cooperative action UI notes. Each deliverable included implementation context: what the design intended, what alternatives existed if a UEFN constraint blocked the primary approach, and what behavior to validate during QA. Engineering notes were written to work within the platform limitations — not to describe an ideal that could not be built.',
    },
    whatThisShows:
      'Survival UX is about calibration. Communicate too much and you break tension. Communicate too little and players feel cheated. The right amount is the amount that keeps players making informed decisions while still feeling like every choice carries weight.\n\nThis project also shows how I work when constraints do not have obvious solutions — IP tone, UEFN technical limits, and Fortnite\'s native HUD all pulling in different directions at once. Those constraints did not cancel each other out. They shaped the solution.',
    whatThisShowsEs:
      'El UX de supervivencia es calibración. Comunicar demasiado rompe la tensión. Comunicar muy poco hace que los jugadores se sientan estafados. La cantidad correcta es la que mantiene al jugador tomando decisiones informadas mientras cada elección sigue sintiéndose importante.\n\nEste proyecto también muestra cómo trabajo cuando las restricciones no tienen soluciones obvias: tono del IP, límites técnicos de UEFN y zonas de HUD nativa de Fortnite jalando en diferentes direcciones al mismo tiempo. Esas restricciones no se cancelaron entre sí. Le dieron forma a la solución.',
    contentEs: {
      summary:
        'The Walking Dead: Courtyard King pone a los jugadores dentro de una experiencia de supervivencia donde la tensión es el punto, no el tipo que viene de mecánicas difíciles, sino el que viene de no saber si lograrás sobrevivir el siguiente momento.\n\nMi trabajo fue la capa de interfaz: cómo los jugadores leen las amenazas, entienden sus recursos y se mantienen al tanto de sus compañeros, todo sin que el juego se detenga a explicarse, y sin romper la atmósfera del IP. Algunos detalles son NDA. El razonamiento de diseño está aquí.',
      quickFacts: {
        role: 'UX/UI Designer',
        studio: 'Teravision Games',
        IP: 'Skybound',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'En producción / NDA',
        confidentiality: 'Análisis NDA-safe. Algunos detalles se omiten intencionalmente. Assets visuales no disponibles para compartir públicamente.',
      },
      context:
        'Los jugadores que entran a una experiencia de The Walking Dead traen expectativas construidas durante años con la franquicia: la escasez importa, el peligro es real, los números en pantalla rompen el ambiente. La interfaz o honra ese contrato emocional o trabaja en su contra.\n\nEncima de eso, UEFN: la HUD nativa de Fortnite siempre está ahí. No puedes quitarla. Diseñas alrededor de ella, lo que significa que cada elemento de UI personalizado tiene que justificar su presencia frente a lo que ya ocupa la pantalla.',
      challenge:
        'Demasiada UI y el mundo pierde su peligro. Muy poca y los jugadores toman decisiones desinformadas que frustran en lugar de desafiar. La línea entre esos dos resultados es el problema de diseño, y es una línea estrecha.\n\nTrabajar dentro de UEFN significó que también tenía límites duros sobre lo que la UI personalizada podía hacer: zonas de colocación, renderizado de fuentes, el espacio que la HUD nativa de Fortnite ya ocupa. La solución tenía que caber dentro de todo eso y aún sentirse nativa a The Walking Dead.',
      role:
        'Diseñé la lógica del HUD y los sistemas de retroalimentación para la interfaz orientada al jugador. Mi trabajo cubrió indicadores de amenazas, comunicación de recursos y la jerarquía visual para acciones cooperativas. Colaboré con arte e ingeniería en lo que era ejecutable dentro del cronograma de producción.',
      constraints: [
        'Requisitos de tono del IP de The Walking Dead: la interfaz no podía sentirse "gamey" ni romper la tensión',
        'Limitaciones de UEFN en posicionamiento de UI personalizada y renderizado de fuentes',
        'El HUD nativo de Fortnite ocupa zonas fijas de pantalla',
        'Restricciones NDA sobre detalles específicos de mecánicas y assets',
        'Diseño de experiencia cooperativa: la UI tenía que comunicar el estado individual y de grupo simultáneamente',
      ],
      approach: [
        {
          heading: 'Diseño de retroalimentación que preserva la atmósfera',
          body: 'Establecí un principio de que cada elemento de interfaz tenía que ganar su presencia. Si una pieza de información podía entenderse a través del entorno o el diseño de sonido, no necesitaba una capa de UI. Esto mantuvo la superficie de pantalla limpia mientras preservaba la tensión de supervivencia.',
        },
        {
          heading: 'Comunicación de amenazas sin ruido',
          body: 'Diseñé un sistema de retroalimentación de amenazas que usaba posición, intensidad y temporización en lugar de displays numéricos explícitos. Los jugadores recibían indicadores direccionales y señales de estado sin ser sacados de la experiencia por una barra de salud tradicional.',
        },
        {
          heading: 'Legibilidad de recursos bajo presión',
          body: 'El estado de los recursos necesitaba ser legible en menos de un segundo durante momentos de alto estrés. Simplifiqué el lenguaje visual a estados esenciales: suficiente, bajo, crítico. Cada estado tenía un tratamiento visual distinto que funcionaba en entornos tanto iluminados como oscuros.',
        },
        {
          heading: 'Claridad de acciones cooperativas',
          body: 'Diseñé comunicación visual para los momentos cooperativos: objetivos compartidos, acciones de soporte y estado de compañeros. Equilibré mostrar suficiente información para coordinar sin crear superposición de información entre las necesidades individuales y grupales.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Los displays tradicionales de salud y recursos rompían la tensión de supervivencia y hacían que la experiencia se sintiera como un juego convencional en lugar de una narrativa de supervivencia.',
          decision: 'Reemplacé los displays explícitos de salud con indicadores físicos y ambientales calibrados al tono del IP. Los estados de recursos se comunicaban a través de señales de escasez en lugar de valores numéricos.',
          why: 'El contrato emocional de The Walking Dead es sobre el peligro sentido, no sobre números gestionados. La UI que muestra estadísticas saca al jugador de ese marco emocional.',
        },
        {
          problem: 'En escenarios cooperativos, los jugadores estaban perdiendo las señales de angustia de sus compañeros porque la amenaza individual consumía su atención completa.',
          decision: 'Diseñé un sistema de consciencia periférica que creaba firmas visuales distintas para los estados críticos de los compañeros, posicionadas fuera de la zona de amenaza principal.',
          why: 'La colocación periférica respeta la zona de atención principal del jugador mientras asegura que la información crítica para la cooperación sea visible sin requerir monitoreo activo.',
        },
      ],
      deliverables: [
        'Documentación de lógica de HUD y reglas de zonas seguras',
        'Especificaciones del sistema de retroalimentación de amenazas',
        'Lenguaje visual para estados de recursos',
        'Marco de UI para acciones cooperativas',
        'Notas de implementación para ingeniería',
      ],
      outcome:
        'La interfaz comunicó el estado de supervivencia sin romper la atmósfera. Las amenazas se leían a través de posición e intensidad, no con números de barra de salud. Los recursos se mostraban como estados esenciales: suficiente, bajo, crítico. La consciencia de compañeros vivía en la zona periférica, lejos del foco principal de amenaza del jugador.\n\nLas métricas específicas son NDA. Lo que puedo compartir es el problema de diseño, las restricciones que navegué y las decisiones que tomé bajo una tensión triple entre tono del IP, límites de plataforma y claridad del jugador.',
      nextSteps:
        'El UX de supervivencia se beneficia de datos de prueba de usuario enfocados en momentos de confusión versus tensión intencional. Querría distinguir entre "confundido y frustrado" y "tenso y comprometido" en observaciones de sesión, luego usar eso para calibrar exactamente cuánta información necesita mostrar la interfaz.',
      projectSnapshot: {
        role: 'UX/UI Designer',
        context: 'Experiencia UEFN dentro de Fortnite, IP The Walking Dead',
        platform: 'UEFN / Fortnite',
        team: 'UX/UI Designer',
        tools: 'Figma · UEFN · Jira · Confluence',
        mainChallenge: 'Diseñar feedback de supervivencia que preservara el tono emocional de The Walking Dead sin depender de indicadores numéricos explícitos, dentro de las zonas de HUD de Fortnite y las restricciones técnicas de UEFN.',
        keyDeliverables: 'Documentación de lógica de HUD, sistema de feedback de amenazas, lenguaje visual de estados de recursos, UI de acciones cooperativas, notas de implementación para ingeniería',
        status: 'En producción / NDA',
        constraints: 'Requisitos de tono del IP de The Walking Dead · zonas de HUD nativo de Fortnite · limitaciones técnicas de UI de UEFN · presentación pública NDA-safe',
      },
      impact: {
        productionClarity: 'Entregué documentación completa de lógica de HUD, reglas de zonas seguras y especificaciones del sistema de feedback dentro del timeline de producción. Ingeniería tuvo una referencia clara de implementación desde el inicio.',
        playerClarity: 'Reemplacé indicadores numéricos explícitos de salud y recursos con indicadores atmosféricos calibrados al tono de The Walking Dead. El estado de supervivencia se leía sin sacar a los jugadores de la tensión.',
        systemValue: 'Establecí principios de interfaz consistentes con el IP: cada elemento de UI tenía que ganarse su presencia en pantalla. Ese filtro redujo el ruido visual mientras preservaba el contrato emocional de la franquicia.',
        documentationValue: 'Entregué documentación de lógica de HUD, especificaciones de amenazas, lenguaje visual de estados de recursos y framework de UI cooperativa. Cada entregable incluía contexto de implementación para ingeniería y notas sobre restricciones específicas de UEFN.',
        implementationValue: 'Alineé las decisiones de diseño con lo que UEFN permitía técnicamente antes de comprometer las especificaciones, evitando ciclos de revisión causados por limitaciones de plataforma descubiertas tarde.',
        validation: 'Limitado por NDA. Las métricas de resultado no están disponibles para compartir públicamente. La evidencia está en el problema de diseño, la navegación de restricciones y el tipo de decisiones tomadas bajo la tensión triple entre el tono del IP, los límites de la plataforma y la claridad del jugador.',
      },
      myOwnership: 'Fui responsable del diseño de lógica de HUD y sistema de feedback de extremo a extremo. Esto incluyó definir reglas de comunicación de amenazas, lenguaje visual de estados de recursos, claridad de acciones cooperativas y la documentación que tradujo esas decisiones en especificaciones listas para ingeniería. Fui el diseñador de interfaz principal navegando la restricción triple entre el tono del IP de The Walking Dead, las zonas de HUD nativo de Fortnite y las limitaciones técnicas de UEFN. Las decisiones de diseño no se tomaron en aislamiento: en cada paso colaboré con arte e ingeniería para confirmar qué podía construirse antes de comprometer una dirección.',
      researchValidation: 'La investigación para este proyecto fue principalmente comparativa y orientada por restricciones. Analicé cómo los juegos de supervivencia comunican amenaza y estado de recursos sin indicadores numéricos explícitos, revisé las convenciones visuales y de tono de la franquicia The Walking Dead, y evalué qué permitía técnicamente UEFN dentro de su capa de UI. Trabajé de cerca con arte e ingeniería para validar qué direcciones de diseño podían ejecutarse dentro de las restricciones de plataforma antes de finalizar las especificaciones. El objetivo de investigación no fue estético: fue entender qué señales de interfaz funcionan bajo presión, en la oscuridad, con espacio de pantalla limitado y sin romper el tono del IP.',
      implementationHandoff: 'El handoff consistió en documentación de lógica de HUD con reglas explícitas de zonas seguras, especificaciones del sistema de feedback de amenazas, definiciones visuales de estados de recursos y notas de UI para acciones cooperativas. Cada entregable incluyó contexto de implementación: qué pretendía el diseño, qué alternativas existían si una restricción de UEFN bloqueaba el enfoque principal, y qué comportamiento validar durante QA. Las notas de ingeniería se escribieron para funcionar dentro de las limitaciones de la plataforma. No para describir un ideal que no podía construirse.',
    },
  },
  {
    id: 'CASE-004',
    slug: 'raptor-heist',
    title: 'Raptor Heist',
    thumbnailAlt: 'Raptor Heist — UEFN roguelike clarity and repeatable loop UX case study',
    role: 'Game UX/UI Designer',
    platform: ['UEFN', 'Fortnite'],
    focus: 'Risk/reward clarity, progression loop, run readability, replayability',
    focusEs: 'Claridad riesgo/recompensa, loop de progresión, legibilidad por partida, rejugabilidad',
    status: 'SELECTED WORK',
    visibility: 'public',
    statusColor: 'accent',
    year: '2025',
    featured: true,
    category: 'games',
    trailerSrc: '/cases/raptor-heist/raptor-heist-Trailer.mp4',
    headline: 'Designing run clarity and heist tension for a roguelike inside the Havoc Hotel universe.',
    headlineEs: 'Diseñando claridad de partidas y tensión de atraco para un roguelike dentro del universo Havoc Hotel.',
    description:
      'Raptor Heist layers heist structure on top of a roguelike loop. My priority was keeping the run readable at the pace Fortnite players expect: risk, reward, and progression legible at a glance — without menus, tutorials, or interruptions that break the thief fantasy.',
    descriptionEs:
      'Raptor Heist apila una estructura de atraco sobre un loop roguelike. Mi prioridad fue mantener la partida legible al ritmo que esperan los jugadores de Fortnite: riesgo, recompensa y progresión de un vistazo, sin menús, sin tutoriales ni interrupciones que rompan la fantasía del ladrón.',
    tags: ['UEFN', 'Roguelike', 'Heist', 'Progression', 'Reward Clarity'],
    relatedNotes: ['uefn-ux-lessons', 'feedback-reduces-guesswork', 'clean-hud-vs-clear-hud'],
    cta: 'View Raptor Heist case',
    content: {
      summary:
        'Raptor Heist stacks a heist structure on top of a roguelike loop. Players plan, execute, get caught or escape, come back stronger. The tension depends on the player always knowing their risk level — and the game never having to stop to explain it.\n\nMy work was the UX/UI layer: orientation, reward feedback, alert escalation, and the post-run screen that keeps players coming back. The challenge was keeping all of that readable at Fortnite pace, inside UEFN constraints.',
      quickFacts: {
        role: 'Game UX/UI Designer',
        studio: 'Teravision Games',
        platform: 'UEFN / Fortnite',
        year: '2025',
        status: 'Shipped',
        confidentiality: 'Selected details shared.',
      },
      context:
        'Roguelikes work because players feel in control even when they fail. Every run is a decision tree: go here, take this upgrade, avoid that risk. When the interface is unclear, that feeling breaks — the player does not feel like they made a bad decision, they feel like the game did not tell them something it should have.\n\nHeist adds a planning and timing layer on top of that. The interface has more to communicate, and less screen space and player patience to communicate it with.',
      challenge:
        'At any decision point in Raptor Heist, a player needs to know their objective, their resources, their current alert level, and their exit options. Add a Fortnite-native audience that expects fast reads — not menus, not tutorials — and you have a real information hierarchy problem.\n\nToo much visible information slows the heist momentum. Too little and players make blind decisions that break the skilled-thief fantasy. The game should feel like skill, not like guessing.',
      role:
        'I designed UX/UI systems for orientation, reward communication, progression tracking, and pacing clarity. I worked within UEFN constraints and collaborated with the design and art teams on implementation feasibility.',
      constraints: [
        'UEFN device system limitations on custom UI placement',
        'Fortnite native HUD occupies core screen zones',
        'Roguelike run structure requires persistent state communication without UI overload',
        'Heist pacing requires tension-aware feedback design',
        'Player base is Fortnite-native: expects fast reads, not deep menus',
      ],
      approach: [
        {
          heading: 'Run state visibility',
          body: 'Designed a persistent run status panel that showed the three most critical variables at all times: objective progress, resource level, and alert status. Everything else was accessible on demand. This reduced cognitive load while keeping players oriented during fast-paced heist sequences.',
        },
        {
          heading: 'Reward clarity at collection',
          body: 'Designed the reward feedback system for each heist loot collection: immediate visual confirmation, brief state update, and a post-run summary that helped players understand what they had accumulated and what it unlocked. Clear reward feedback is the core of roguelike retention.',
        },
        {
          heading: 'Alert escalation as readable tension',
          body: 'Built an alert escalation system where the visual feedback changed in response to how close the player was to being detected. Three distinct states with clear visual separation made the heist risk legible without requiring players to watch a hidden meter.',
        },
        {
          heading: 'Run-to-run progression communication',
          body: 'Designed the post-run screen to show what changed, what was unlocked, and what the next objective was. Roguelike retention depends on the player feeling momentum between runs. The post-run screen needed to make that momentum visible.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Alert state was changing during sequences but players did not realize the change until they were already caught, which created frustration rather than tension.',
          decision: 'Added a proactive alert signal that communicated escalation before the threshold was crossed, giving players a decision window to change behavior.',
          why: 'Frustration in games usually comes from unclear consequence, not from difficulty. If the player understands that the alert is rising, they can choose to act. If they do not understand until they fail, the UX carries the blame.',
        },
        {
          problem: 'The post-run summary was showing all progression data at once, which caused players to skim and miss meaningful unlocks.',
          decision: 'Restructured the post-run flow to reveal information in sequence: run result, then key achievements, then progression update, then next objective. Each beat had a brief pause.',
          why: 'Staged reveals give players time to process each piece of information and feel the reward properly. Dumping all data at once treats the post-run screen as a receipt rather than a moment.',
        },
      ],
      deliverables: [
        'Run state UI system with component states',
        'Reward feedback sequences and timing specs',
        'Alert escalation visual language',
        'Post-run screen flow and information architecture',
        'UEFN implementation notes and zone maps',
      ],
      outcome:
        'Raptor Heist shipped. The alert escalation system — which signaled rising risk before the threshold hit — got called out specifically in team reviews as a clarity improvement over the prototype. Players could choose to act on the warning instead of reacting to getting caught.\n\nThe post-run screen structure carried forward into later experiences in the franchise.',
      nextSteps:
        'I would instrument the exact moment players trigger detection versus the moment they first see the alert signal, and look at whether players who see the proactive signal respond differently than those who miss it. Run-length data would tell us whether earlier alert awareness changes player strategy in a meaningful way.',
    },
    whatThisShows:
      'Run-based games put the interface under a specific kind of stress. Something that reads clearly on run one has to read just as fast on run twenty — after the player has learned enough to skim. Designing for that repetition means getting the information hierarchy right from the start, not just making the first session feel good.\n\nThe same challenge shows up anywhere a user returns to a feature repeatedly: dashboards, onboarding flows, notification systems. The question is always whether the system stays readable when the novelty is gone.',
    whatThisShowsEs:
      'Este proyecto muestra cómo diseño sistemas repetibles que permanecen claros a lo largo de muchas sesiones. Los roguelikes requieren que los jugadores reevalúen riesgo y recompensa en cada partida. Una interfaz que se siente legible en la partida uno necesita mantenerse rápida y sin ambigüedad en la partida veinte. El mismo desafío aparece en cualquier producto con loops: flujos de onboarding, dashboards, notificaciones, o cualquier función a la que un usuario regresa repetidamente.',
    contentEs: {
      summary:
        'Raptor Heist apila una estructura de atraco sobre un loop roguelike. Los jugadores planean, ejecutan, los agarran o escapan, vuelven más fuertes. La tensión depende de que el jugador siempre sepa su nivel de riesgo, y de que el juego nunca tenga que detenerse a explicarlo.\n\nMi trabajo fue la capa UX/UI: orientación, feedback de recompensas, escalada de alertas y la pantalla post-partida que hace que los jugadores vuelvan. El reto fue mantener todo eso legible al ritmo de Fortnite, dentro de las restricciones de UEFN.',
      quickFacts: {
        role: 'Game UX/UI Designer',
        studio: 'Teravision Games',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'Lanzado',
        confidentiality: 'Detalles seleccionados compartidos.',
      },
      context:
        'Los roguelikes funcionan porque los jugadores se sienten en control incluso cuando fallan. Cada partida es un árbol de decisiones: ve aquí, toma esta mejora, evita ese riesgo. Cuando la interfaz no es clara, esa sensación se rompe. El jugador no siente que tomó una mala decisión, siente que el juego no le dijo algo que debía decirle.\n\nEl atraco agrega una capa de planificación y timing sobre eso. La interfaz tiene más que comunicar, y menos espacio en pantalla y menos paciencia del jugador para comunicarlo.',
      challenge:
        'En cualquier punto de decisión dentro de Raptor Heist, un jugador necesita saber su objetivo, sus recursos, su nivel de alerta actual y sus opciones de salida. Súmale una base de jugadores nativa de Fortnite que espera lecturas rápidas, sin menús ni tutoriales, y tienes un problema real de jerarquía de información.\n\nDemasiada información visible frena el ritmo del atraco. Muy poca y los jugadores toman decisiones ciegas que rompen la fantasía del ladrón habilidoso. El juego debe sentirse como habilidad, no como adivinanza.',
      role:
        'Diseñé sistemas UX/UI para orientación, comunicación de recompensas, seguimiento de progresión y claridad de ritmo. Trabajé dentro de las restricciones de UEFN y colaboré con los equipos de diseño y arte sobre la viabilidad de implementación.',
      constraints: [
        'Limitaciones del sistema de dispositivos UEFN en la colocación de UI personalizada',
        'El HUD nativo de Fortnite ocupa las zonas centrales de pantalla',
        'La estructura de partidas roguelike requiere comunicación de estado persistente sin sobrecarga de UI',
        'El ritmo del atraco requiere diseño de retroalimentación consciente de la tensión',
        'La base de jugadores es nativa de Fortnite: espera lecturas rápidas, no menús profundos',
      ],
      approach: [
        {
          heading: 'Visibilidad del estado de la partida',
          body: 'Diseñé un panel de estado de partida persistente que mostraba las tres variables más críticas en todo momento: progreso del objetivo, nivel de recursos y estado de alerta. Todo lo demás era accesible bajo demanda. Esto redujo la carga cognitiva mientras mantenía a los jugadores orientados durante las secuencias de atraco a ritmo rápido.',
        },
        {
          heading: 'Claridad de recompensa en la recolección',
          body: 'Diseñé el sistema de retroalimentación de recompensas para cada recolección de botín del atraco: confirmación visual inmediata, breve actualización de estado y un resumen al final de la partida que ayudaba a los jugadores a entender qué habían acumulado y qué desbloqueaba. La retroalimentación clara de recompensas es el núcleo de la retención en roguelikes.',
        },
        {
          heading: 'Escalada de alerta como tensión legible',
          body: 'Construí un sistema de escalada de alerta donde la retroalimentación visual cambiaba en respuesta a qué tan cerca estaba el jugador de ser detectado. Tres estados distintos con clara separación visual hicieron el riesgo del atraco legible sin requerir que los jugadores vigilaran un medidor oculto.',
        },
        {
          heading: 'Comunicación de progresión partida a partida',
          body: 'Diseñé la pantalla al final de la partida para mostrar qué cambió, qué se desbloqueó y cuál era el próximo objetivo. La retención en roguelikes depende de que el jugador sienta impulso entre partidas. La pantalla de fin de partida necesitaba hacer ese impulso visible.',
        },
      ],
      keyDecisions: [
        {
          problem: 'El estado de alerta cambiaba durante las secuencias pero los jugadores no se daban cuenta del cambio hasta que ya habían sido atrapados, lo que creaba frustración en lugar de tensión.',
          decision: 'Agregué una señal proactiva de alerta que comunicaba la escalada antes de que se cruzara el umbral, dando a los jugadores una ventana de decisión para cambiar su comportamiento.',
          why: 'La frustración en los juegos generalmente viene de la consecuencia poco clara, no de la dificultad. Si el jugador entiende que la alerta está subiendo, puede elegir actuar. Si no lo entiende hasta que falla, el UX carga la culpa.',
        },
        {
          problem: 'El resumen al final de la partida mostraba todos los datos de progresión a la vez, lo que hacía que los jugadores lo escanearan y se perdieran desbloqueos significativos.',
          decision: 'Reestructuré el flujo del fin de partida para revelar información en secuencia: resultado de la partida, luego logros clave, luego actualización de progresión, luego siguiente objetivo. Cada momento tenía una breve pausa.',
          why: 'Las revelaciones por etapas dan a los jugadores tiempo para procesar cada pieza de información y sentir la recompensa correctamente. Volcar todos los datos a la vez trata la pantalla de fin de partida como un recibo en lugar de un momento.',
        },
      ],
      deliverables: [
        'Sistema de UI de estado de partida con estados de componente',
        'Secuencias de retroalimentación de recompensas y especificaciones de tiempo',
        'Lenguaje visual de escalada de alerta',
        'Flujo de pantalla post-partida y arquitectura de información',
        'Notas de implementación UEFN y mapas de zonas',
      ],
      outcome:
        'Raptor Heist se lanzó dentro de Fortnite. El sistema de escalada de alerta fue citado en revisiones del equipo como una mejora clave de claridad sobre el prototipo inicial. La estructura del flujo post-partida se llevó adelante a experiencias posteriores en la franquicia.',
      nextSteps:
        'Instrumentaría el momento exacto en que los jugadores activan la detección versus el momento en que ven por primera vez la señal de alerta, y miraría si los jugadores que ven la señal proactiva responden diferente a los que la pierden. Los datos de duración de partida nos dirían si una mayor consciencia de alerta cambia la estrategia del jugador de manera significativa.',
    },
  },
  {
    id: 'CASE-005',
    slug: 'havoc-hotel-3',
    title: 'Havoc Hotel 3',
    thumbnailAlt: 'Havoc Hotel 3 — co-op UI systems and shared state design in UEFN case study',
    role: 'UX/UI Systems Designer',
    platform: ['UEFN', 'Fortnite'],
    focus: 'Co-op UX, progression, reward clarity, replayability, combat readability',
    focusEs: 'UX cooperativo, progresión, claridad de recompensas, rejugabilidad, legibilidad de combate',
    status: 'SELECTED WORK',
    visibility: 'legacy',
    statusColor: 'accent',
    year: '2025',
    featured: false,
    category: 'games',
    trailerSrc: '/cases/havoc-hotel-3/havoc-hoterl-3-Trailer.mp4',
    headline: 'Building shared-state UI systems for a co-op roguelike franchise across multiple Fortnite releases.',
    headlineEs: 'Sistemas de UI para estado compartido en una franquicia roguelike cooperativa, diseñados para funcionar en múltiples lanzamientos de Fortnite.',
    description:
      'Havoc Hotel is a co-op roguelike franchise with multiple releases inside Fortnite. My work covered the interface systems that kept players oriented during fast combat, understood what they were upgrading, and stayed aware of their teammates — all at the same time, without any layer interfering with the others.',
    descriptionEs:
      'Havoc Hotel es una franquicia roguelike cooperativa con múltiples lanzamientos dentro de Fortnite. Mi trabajo fue construir los sistemas de interfaz que conectaban esos lanzamientos: economía visible, comunicación del estado en co-op, jerarquía de retroalimentación de combate y una biblioteca de componentes que redujo el tiempo de diseño a implementación en cada nueva entrega.',
    tags: ['UEFN', 'Co-op', 'Roguelike', 'Reward Systems', 'Progression'],
    relatedNotes: ['uefn-ux-lessons', 'what-is-a-game-ui-system', 'feedback-reduces-guesswork'],
    cta: 'View Havoc Hotel 3 case',
    content: {
      summary:
        'Havoc Hotel is a franchise — multiple releases, same universe, players who return already knowing the layout. My work was building the UI systems that connected those releases: visible economy, co-op state communication, combat feedback hierarchy, and a component library that reduced design-to-implementation time on each new entry.\n\nThe challenge of franchise UI work is designing for two audiences at once: first-time players who need clarity, and returning players who need speed.',
      quickFacts: {
        role: 'UX/UI Systems Designer',
        studio: 'Teravision Games',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'Shipped (franchise, multiple releases)',
        confidentiality: 'Selected details shared.',
      },
      context:
        'Co-op roguelikes create a split-attention problem by design. Each player manages their own resources, decisions, and position — while also staying aware of what the group needs. The interface has to serve both layers simultaneously, without one interfering with the other.\n\nInside a franchise, there is an additional layer: each new release starts from a player expectation shaped by the previous one. The UI has to feel consistent enough that returning players are oriented, and clear enough that new players are not lost.',
      challenge:
        'Solve individual clarity at the expense of group awareness and players stop rescuing teammates in time. Solve group awareness at the expense of individual clarity and players lose track of their own survival. Both outcomes break the co-op experience — just in different moments.\n\nThe design problem was finding a visual grammar that served both layers without them competing for the same attention at the same time.',
      role:
        'I owned interface systems for visible economy, reward communication, and combat readability. I worked across multiple releases in the franchise, contributing to component architecture, state definitions, and design documentation that the team used across releases.',
      constraints: [
        'UEFN UI constraints: limited custom overlays without impacting performance',
        'Co-op sessions require simultaneous individual and group information',
        'Roguelike structure demands run-persistent state communication',
        'Fortnite player base expects fast reads with minimal tutorial dependency',
        'Franchise continuity: UI decisions needed to hold across releases',
      ],
      approach: [
        {
          heading: 'Visible economy design',
          body: 'Designed the upgrade and reward economy to be legible before purchase decisions were made. Players could see the consequence of a choice before committing. This reduced buyer\'s remorse mechanics and kept the session pace high.',
        },
        {
          heading: 'Co-op state communication',
          body: 'Designed a layered approach to group information: a persistent group health indicator in the peripheral zone, individual resource indicators in the primary zone, and a shared objective tracker at the top edge. Each layer had a distinct visual grammar so players could parse group state without losing individual context.',
        },
        {
          heading: 'Combat readability at speed',
          body: 'Established feedback hierarchy for combat: critical threat signals, ability state, resource level, and group distress in order of urgency. Each level had a distinct visual intensity so players could triage information at the pace of combat.',
        },
        {
          heading: 'Difficulty scaling feedback',
          body: 'Designed visual communication for how difficulty changed between runs. Players who understand the scaling system make better upgrade decisions and re-engage more readily. Making the curve legible reduced disorientation in later-stage runs.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Upgrade choices were being made quickly without players understanding the consequence, leading to post-choice confusion and disengagement from the progression system.',
          decision: 'Designed upgrade cards to surface the most actionable information first: what changes, how immediately, and at what cost. Buried secondary stats behind an expandable detail state for players who wanted depth.',
          why: 'Speed and depth are both valid player approaches to upgrade systems. The interface should serve the fast player by default and the deep player on demand. Surfacing everything at once serves neither.',
        },
        {
          problem: 'Group distress signals were being missed during intense combat because players were focused on their own survival.',
          decision: 'Added a distinct audio-visual cue for teammate critical state, positioned in the far peripheral zone with a brief animation that did not compete with combat-critical information.',
          why: 'Co-op games fail when players cannot rescue teammates in time because they did not see the signal. The cue needed to be noticeable without being so loud that it created false urgency during normal play.',
        },
        {
          problem: 'Across multiple releases, small UI inconsistencies were creating player confusion as the franchise grew.',
          decision: 'Established a UI component library and state documentation system that defined shared patterns for the franchise, with clear guidelines for when elements could vary per release.',
          why: 'Franchise continuity is a form of player trust. Players who know where to look in one Havoc Hotel release should be oriented in the next. Shared patterns reduce re-learning time and reinforce brand coherence.',
        },
      ],
      deliverables: [
        'Co-op UI system with individual and group state layers',
        'Visible economy component design and specs',
        'Combat feedback hierarchy documentation',
        'Upgrade card component with state definitions',
        'Franchise UI component library (cross-release)',
        'UEFN implementation guides',
        'QA notes for UI state coverage',
      ],
      outcome:
        'Multiple Havoc Hotel releases shipped. The franchise component library meant each new release started from a shared reference instead of from scratch — that is directly measurable in design-to-implementation time.\n\nThe co-op state communication system got called out in community playtests: players specifically mentioned knowing their teammates\' state as a strength of the experience.',
      nextSteps:
        'Long-term franchise UX work benefits from cross-release player behavior analysis. I would want to understand how players who have played multiple releases navigate the UI versus first-time players, and whether the component library is creating meaningful consistency from the player\'s perspective.',
    },
    whatThisShows:
      'Co-op UI is a shared-state problem before it is a visual one. Each player needs individual clarity and group awareness, and neither layer should require active monitoring — it should just be there, readable without looking for it.\n\nDesigning that across multiple franchise releases adds a continuity dimension: the solution has to hold up not just in one game, but as a system that players can rely on each time they come back. That is a different kind of design constraint than a single-product problem, and it is one I found genuinely interesting to work through.',
    whatThisShowsEs:
      'La UI cooperativa es un problema de estado compartido antes de ser un problema visual. Cada jugador necesita claridad individual y consciencia del grupo, y ninguna capa debería requerir atención activa. Tiene que estar ahí, legible sin buscarlo.\n\nDiseñar eso en múltiples lanzamientos de una franquicia agrega una dimensión de continuidad: la solución tiene que sostenerse no solo en un juego, sino como un sistema en el que los jugadores puedan confiar cada vez que vuelven. Eso es un tipo de restricción de diseño diferente al de un producto único, y uno que encontré genuinamente interesante de resolver.',
    contentEs: {
      summary:
        'Havoc Hotel 3 es parte de una franquicia roguelike cooperativo construida en UEFN. Mi trabajo se centró en sistemas de interfaz para economía visible, claridad de recompensas, legibilidad de combate y rejugabilidad a través de la franquicia.',
      quickFacts: {
        role: 'UX/UI Systems Designer',
        studio: 'Teravision Games',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'Lanzado (franquicia, múltiples versiones)',
        confidentiality: 'Detalles seleccionados compartidos.',
      },
      context:
        'Havoc Hotel es una franquicia con múltiples lanzamientos dentro de Fortnite. El formato roguelike cooperativo crea un desafío UX/UI específico: la interfaz debe servir a jugadores individuales y grupos cooperativos simultáneamente, comunicar la progresión a través de las partidas y mantenerse legible durante el combate rápido sin crear sobrecarga de información.',
      challenge:
        'Los roguelikes cooperativos tienen un problema de división de atención del jugador. Cada jugador gestiona sus propios recursos, decisiones y posición mientras también rastrea objetivos del grupo y estado de los compañeros. Esto crea dos requisitos de UI que compiten: claridad individual y consciencia del grupo. Resolver uno a expensas del otro rompe ya sea el loop personal o la capa cooperativa.',
      role:
        'Tuve a cargo los sistemas de interfaz para economía visible, comunicación de recompensas y legibilidad de combate. Trabajé a través de múltiples lanzamientos de la franquicia, contribuyendo a la arquitectura de componentes, definiciones de estado y documentación de diseño que el equipo usó a través de los lanzamientos.',
      constraints: [
        'Restricciones de UI de UEFN: superposiciones personalizadas limitadas sin impactar el rendimiento',
        'Las sesiones cooperativas requieren información individual y grupal simultánea',
        'La estructura roguelike demanda comunicación de estado persistente entre partidas',
        'La base de jugadores de Fortnite espera lecturas rápidas con dependencia mínima de tutorial',
        'Continuidad de franquicia: las decisiones de UI debían mantenerse a través de los lanzamientos',
      ],
      approach: [
        {
          heading: 'Diseño de economía visible',
          body: 'Diseñé la economía de mejoras y recompensas para ser legible antes de tomar decisiones de compra. Los jugadores podían ver la consecuencia de una elección antes de comprometerse. Esto redujo las mecánicas de arrepentimiento del comprador y mantuvo el ritmo de la sesión alto.',
        },
        {
          heading: 'Comunicación del estado cooperativo',
          body: 'Diseñé un enfoque en capas para la información de grupo: un indicador de salud de grupo persistente en la zona periférica, indicadores de recursos individuales en la zona principal y un rastreador de objetivo compartido en el borde superior. Cada capa tenía una gramática visual distinta para que los jugadores pudieran interpretar el estado del grupo sin perder el contexto individual.',
        },
        {
          heading: 'Legibilidad de combate a velocidad',
          body: 'Establecí una jerarquía de retroalimentación para el combate: señales de amenaza crítica, estado de habilidad, nivel de recursos y angustia del grupo en orden de urgencia. Cada nivel tenía una intensidad visual distinta para que los jugadores pudieran priorizar información al ritmo del combate.',
        },
        {
          heading: 'Retroalimentación de escalado de dificultad',
          body: 'Diseñé comunicación visual de cómo cambiaba la dificultad entre partidas. Los jugadores que entienden el sistema de escalado toman mejores decisiones de mejora y se re-enganchan más fácilmente. Hacer la curva legible redujo la desorientación en las partidas de etapas posteriores.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Las elecciones de mejora se hacían rápidamente sin que los jugadores entendieran la consecuencia, llevando a confusión post-elección y desenganche del sistema de progresión.',
          decision: 'Diseñé las tarjetas de mejora para mostrar primero la información más accionable: qué cambia, con qué rapidez y a qué costo. Las estadísticas secundarias se ocultaron detrás de un estado de detalle expandible para los jugadores que querían profundidad.',
          why: 'La velocidad y la profundidad son ambos enfoques válidos de los jugadores para los sistemas de mejora. La interfaz debería servir al jugador rápido por defecto y al jugador profundo bajo demanda. Mostrar todo a la vez no sirve a ninguno.',
        },
        {
          problem: 'Las señales de angustia del grupo se estaban perdiendo durante el combate intenso porque los jugadores estaban enfocados en su propia supervivencia.',
          decision: 'Agregué una señal audiovisual distinta para el estado crítico de los compañeros, posicionada en la zona periférica lejana con una animación breve que no competía con la información crítica de combate.',
          why: 'Los juegos cooperativos fallan cuando los jugadores no pueden rescatar a sus compañeros a tiempo porque no vieron la señal. La señal necesitaba ser notable sin ser tan ruidosa que creara urgencia falsa durante el juego normal.',
        },
        {
          problem: 'A través de múltiples lanzamientos, pequeñas inconsistencias de UI estaban creando confusión en los jugadores a medida que la franquicia crecía.',
          decision: 'Establecí una biblioteca de componentes de UI y un sistema de documentación de estados que definía patrones compartidos para la franquicia, con guías claras sobre cuándo los elementos podían variar por lanzamiento.',
          why: 'La continuidad de franquicia es una forma de confianza del jugador. Los jugadores que saben dónde mirar en un lanzamiento de Havoc Hotel deberían estar orientados en el siguiente. Los patrones compartidos reducen el tiempo de re-aprendizaje y refuerzan la coherencia de marca.',
        },
      ],
      deliverables: [
        'Sistema de UI cooperativa con capas de estado individual y grupal',
        'Diseño de componente de economía visible y especificaciones',
        'Documentación de jerarquía de retroalimentación de combate',
        'Componente de tarjeta de mejora con definiciones de estado',
        'Biblioteca de componentes de UI de franquicia (entre lanzamientos)',
        'Guías de implementación UEFN',
        'Notas de QA para cobertura de estado de UI',
      ],
      outcome:
        'Múltiples lanzamientos de Havoc Hotel se publicaron dentro de Fortnite. La biblioteca de componentes de la franquicia hizo que cada nuevo lanzamiento partiera de una referencia compartida en lugar de cero. Eso se mide directamente en tiempo de diseño a implementación.\n\nEl sistema de comunicación del estado en co-op fue mencionado específicamente en playtests de la comunidad: los jugadores citaron saber el estado de sus compañeros como una fortaleza de la experiencia.',
      nextSteps:
        'El trabajo de UX de franquicia a largo plazo se beneficia del análisis de comportamiento del jugador entre lanzamientos. Querría entender cómo los jugadores que han jugado múltiples lanzamientos navegan la UI versus los jugadores por primera vez, y si la biblioteca de componentes está creando consistencia significativa desde la perspectiva del jugador.',
    },
  },
  {
    id: 'CASE-006',
    slug: 'zomvilles',
    title: 'Zomvilles',
    thumbnailAlt: 'Zomvilles — mobile roguelite game design and product design case study',
    role: 'Lead Game Designer',
    platform: ['Mobile'],
    focus: 'Game Design, Product Design, systems, progression, UX flows, combat balance, documentation, stakeholder communication',
    focusEs: 'Game Design, Product Design, sistemas, progresión, flujos UX, balance de combate, documentación, comunicación con stakeholders',
    status: 'SELECTED WORK',
    visibility: 'public',
    statusColor: 'accent',
    year: '2024',
    featured: true,
    category: 'games',
    headline: 'A year building a mobile roguelite from concept to prototype — core loop, systems, UX, and everything in between.',
    headlineEs: 'Un año construyendo un roguelite mobile de cero a prototipo — loop central, sistemas, UX y todo lo que hubo en el camino.',
    description:
      'Zomvilles was a mobile hybrid-casual roguelite at Piximeta — zombie survival, rural Americana setting, the fast upgrade loop of Survivor.io. I spent a year as Lead Game Designer turning an early idea into a playable prototype with defined systems, documented flows, and a nine-person team that understood what it was building.',
    descriptionEs:
      'Zomvilles fue el take de Piximeta en el género roguelite híbrido casual: supervivencia zombi, ambientación rural americana, el loop rápido de mejoras de Survivor.io. Pasé un año como Lead Game Designer convirtiendo una idea inicial en un prototipo jugable: loop central, sistemas de habilidades, progresión, flujos UX, balance de combate y documentación. Todo eso con un equipo de nueve personas.',
    tags: ['Game Design', 'Product Design', 'Mobile Games', 'Systems Design', 'Progression Design', 'UX Flows', 'Documentation', 'Prototype Design'],
    relatedNotes: ['feedback-reduces-guesswork', 'player-decision-making-ux'],
    cta: 'View Zomvilles case',
    gallery: [
      '/cases/zomvilles/zomvilles-01.webp',
      '/cases/zomvilles/zomvilles-02.webp',
      '/cases/zomvilles/zomvilles-03.webp',
      '/cases/zomvilles/zomvilles-04.webp',
      '/cases/zomvilles/zomvilles-05.webp',
      '/cases/zomvilles/zomvilles-06.webp',
      '/cases/zomvilles/zomvilles-07.webp',
      '/cases/zomvilles/zomvilles-08.webp',
      '/cases/zomvilles/zomvilles-09.webp',
    ],
    content: {
      summary:
        'Zomvilles was Piximeta\'s take on the hybrid-casual roguelite genre — zombie survival meets upgrade-and-survive loop, inspired by Survivor.io and Vampire Survivors. I joined as Lead Game Designer and spent a year turning an early idea into a playable prototype: core loop, skill systems, progression, UX flows, combat balance, and documentation.\n\nThe launch was paused before we got live data. So this case is about the product work itself — how we structured a multi-system mobile game from the ground up, and what I learned from doing it.',
      quickFacts: {
        role: 'Lead Game Designer',
        studio: 'Piximeta',
        platform: 'Mobile',
        type: 'Hybrid-casual roguelite prototype',
        duration: '1 year',
        team: '9 people',
        tools: 'Jira · Wiki · Figma · Unity · Excel · Machinations · Adobe Suite',
        status: 'Prototype (launch paused)',
        confidentiality: 'Selected details shared. The case focuses on product structure, systems design and documentation. Some assets and internal materials are not shown publicly.',
      },
      context:
        'The fantasy was simple: survive waves of enemies, pick upgrades, get stronger, face harder enemies, pick more upgrades, survive longer. The design problem was making that loop feel different every run — different characters, skills, upgrade combinations — without making the product feel complex for a hybrid-casual mobile audience.\n\nSimple loop. Layered depth. Readable on a small screen under fast combat. That was the product brief.',
      challenge:
        'A roguelite can collect a lot of systems without any of them connecting. Skills, enemies, chests, bosses, inventory, upgrades, characters, missions, economy. Without a clear core loop as the anchor, features multiply and the player has nothing to return to.\n\nThe second challenge was communication. Nine people, many concurrent systems, short-notice decisions. Without structure, different disciplines end up building from different assumptions about how things connect.',
      challengeRisks: [
        'Product clarity: defining how the game worked as a repeatable mobile roguelite experience.',
        'Player clarity: helping players understand progression, skills, inventory, character selection and in-run decisions.',
        'Team clarity: documenting systems well enough for design, art, development and stakeholders to stay aligned.',
      ],
      role:
        'As Lead Game Designer, I worked across the product structure and design documentation of the prototype. My responsibilities included:',
      roleResponsibilities: [
        'Designing and documenting core mechanics',
        'Structuring the main game loop and progression systems',
        'Designing skills, combat logic and balance foundations',
        'Supporting UX flows and interface structure',
        'Creating and reviewing wireframes and HiFi UI screens',
        'Working on character selection, inventory, random card systems, HUD and progression screens',
        'Supporting narrative systems, missions, events, dialogue and localization',
        'Creating documentation through Wiki and GDD structures',
        'Preparing presentations for stakeholders',
        'Supporting monetization and product direction discussions',
        'Aligning design decisions with a multidisciplinary team',
      ],
      constraints: [
        'Mobile-first design: the experience had to be readable and actionable on a small screen under fast combat conditions',
        'Hybrid-casual audience: mechanics needed depth for engaged players without overwhelming new ones',
        'Prototype scope: design had to prioritize what made the core loop playable and communicable',
        'Team of nine: documentation had to be clear enough for design, art, development and stakeholders to stay aligned without constant back-and-forth',
        'Many concurrent systems: core loop, skills, progression, inventory, narrative, events and monetization all needed to connect without collapsing into complexity',
      ],
      approach: [
        {
          heading: '1. Defining the product foundation',
          body: 'The first layer was defining what the game was at its core: a mobile roguelite with short sessions, repeated runs, upgrades, character variety, combat escalation and progression over time. That meant designing how players enter a run, survive, choose random upgrades, use skills, manage resources, unlock content and return stronger.',
        },
        {
          heading: '2. Structuring systems and progression',
          body: 'The game needed systems that could scale beyond a first prototype. This included character progression, skill options, inventory, random card rewards, enemy escalation, boss encounters and economy considerations. The goal was to create systems that supported variety without making the product hard to understand.',
        },
        {
          heading: '3. Translating systems into UX flows',
          body: 'Once the systems were defined, they needed to become usable flows. I worked on flows for different parts of the experience, including character selection, inventory, in-run choices, rewards, HUD states and progression screens. The project included more than 30 user flows and more than 100 wireframes, which helped turn abstract systems into concrete player-facing interactions.',
        },
        {
          heading: '4. Documenting for team alignment',
          body: 'Documentation was one of the strongest parts of the project. The Wiki/GDD grew into a large product knowledge base with more than 117 subsites and more than 650 documents. This helped the team keep track of mechanics, features, balance decisions, UX flows, narrative elements, missions and stakeholder-facing materials.',
        },
        {
          heading: '5. Communicating the product vision',
          body: 'The project required frequent communication with stakeholders. More than 60 presentations and 600 slides were created to explain features, direction, progress and decisions. The goal was not just to document work, but to make the product understandable for everyone involved.',
        },
      ],
      keyDecisions: [
        {
          problem: 'A roguelite can quickly become a collection of systems: skills, enemies, rewards, upgrades, bosses, inventory and progression. Without a clear loop as the anchor, features multiply and the player has no center to return to.',
          decision: 'Made the core loop the first design priority before adding more systems. The sequence needed to work first: start a run, survive, choose upgrades, grow stronger, face harder enemies, collect rewards and return with a sense of progress.',
          why: 'Every new feature needed to be evaluated against the loop. If it supported that rhythm, it belonged. If it added complexity without supporting the rhythm, it waited. That filter helped the team decide faster and kept the prototype focused.',
        },
        {
          problem: 'Random card choices are central to this type of game, but they can slow players down if the information is hard to compare quickly on mobile.',
          decision: 'The UX direction focused on helping players understand upgrade options fast: what the card does, why it matters and how it changes the run.',
          why: 'Decision-making should be part of the rhythm, not an interruption. In a fast-paced mobile game, every second of confusion pulls the player out of flow. The card system needed to feel like a power moment, not a reading exercise.',
        },
        {
          problem: 'With a team of nine and many moving systems, there was a real risk of different disciplines working from different assumptions about how features connected.',
          decision: 'Treated documentation as product infrastructure rather than administrative output. The Wiki, flows, wireframes and presentations became shared references that helped every discipline stay oriented.',
          why: 'A prototype with many moving parts is harder to align through conversation alone. Written structure reduces the cost of keeping everyone on the same page, especially when the product is still being defined.',
        },
        {
          problem: 'Game design decisions and UX decisions were sometimes being made independently, creating features that worked on paper but created friction when players tried to use them on a small screen.',
          decision: 'Connected Game Design and UX work deliberately throughout the process, treating player-facing clarity as part of the design brief rather than a separate pass at the end.',
          why: 'A mechanic only works when the player can understand it, act on it and feel why it matters. In mobile, that connection has to be built in from the start, not added after the system is already defined.',
        },
      ],
      featuredSystems: [
        {
          id: 'core-loop',
          num: '01',
          title: 'Core Loop and Progression',
          body: 'The core loop was the foundation of the product. Players needed a reason to start another run, try a different character, choose new upgrades and keep improving.\n\nThe loop connected combat, random upgrades, character selection, inventory, rewards, skill growth, boss challenges and long-term progression. Designing that structure required more than listing features. It required deciding what each element contributed to the player\'s motivation to return.\n\nThis area shows the product side of the work: how the game was structured to create repetition with purpose, not just repeated action.',
          asset: '/cases/zomvilles/zomvilles-03.webp',
          assetAlt: 'Mobile game progression screens from the Zomvilles roguelite prototype',
          assetCaption: 'Progression screens helped turn system logic into readable player decisions.',
        },
        {
          id: 'skill-combat',
          num: '02',
          title: 'Skill System and Combat Balance',
          body: 'The skill system needed to make each run feel different while keeping combat readable and fair. This required designing skills, upgrade logic, enemy pressure, bosses and balance rules for a hybrid-casual mobile audience.\n\nRandom card choices are central to this type of game, but they can create friction if the information is hard to compare quickly. The UX direction focused on making upgrade decisions fast to read: what the option does, why it matters and how it changes the current run.\n\nThis area shows systems thinking: how individual mechanics connect with player decisions, difficulty, pacing and replay value.',
          asset: '/cases/zomvilles/zomvilles-05.webp',
          assetAlt: 'Random upgrade card selection screen from the Zomvilles mobile roguelite prototype',
          assetCaption: 'Random cards needed to be fast to compare and easy to understand during the run.',
        },
        {
          id: 'documentation',
          num: '03',
          title: 'Documentation, UX Flows and Team Alignment',
          body: 'The project generated a large documentation system: more than 117 Wiki/GDD subsites, more than 650 documents, more than 30 user flows, more than 100 wireframes, more than 60 stakeholder presentations and more than 600 slides.\n\nThe point is not the volume. The point is that the product needed structure. Documentation helped align a team of nine people around systems, flows, mechanics, screens and stakeholder decisions. It became the infrastructure that made the prototype understandable, buildable and easier to discuss.\n\nThis area shows how I work with complexity: by turning scattered product ideas into shared references the team can use.',
          asset: '/cases/zomvilles/zomvilles-08.webp',
          assetAlt: 'UX flow diagram from Zomvilles showing player interactions and progression paths',
          assetCaption: 'UX flows helped translate systems into concrete player-facing interactions.',
        },
      ],
      deliverables: [
        'Core loop design and documentation',
        'Progression system architecture',
        'Skill system design and balance foundations',
        'Character selection, inventory, HUD and progression screen design',
        'Random card system UX design',
        'More than 30 user flows',
        'More than 100 wireframes',
        'Wiki/GDD with more than 117 subsites and more than 650 documents',
        'More than 60 stakeholder presentations and 600 slides',
        'Narrative systems, missions, events, dialogue and localization support',
      ],
      playtests:
        'The project included internal playtests and feedback sessions throughout the prototype phase. Those sessions helped identify where the core loop was unclear, where upgrade decisions created confusion and where progression felt disconnected from player effort. Some systems were simplified or restructured based on what playtesters encountered. Not everything could be fully resolved before the launch was paused, but those findings shaped the documentation and informed the priorities for continued work.',
      outcome:
        'The prototype reached a state where nine people were aligned on what they were building, why each system existed, and how the player experience was supposed to feel. That does not happen by accident on a multi-system project with a short runway.\n\nThe main output was structural: a working core loop, defined progression systems, 30+ UX flows, 100+ wireframes, and a documentation system with 117+ Wiki subsites the team could work from without constant alignment meetings. Launch was paused before live data. The foundation was real.',
      whatILearned:
        'The biggest risk in a multi-system project is not a lack of ideas. It is unclear priority. When you do not have a filter, features multiply, team energy splits, and the prototype becomes something nobody can fully describe.\n\nMaking the core loop the first design priority — and evaluating everything else against it — was what kept this project moving. If a system did not support the loop\'s rhythm, it waited. That filter helped the team decide faster and kept the scope honest.\n\nGame Design and UX are the same job on mobile. A mechanic only works if the player can understand it, act on it, and feel why it matters in under two seconds. That connection has to be built in from the start, not added after the system already exists.',
      projectSnapshot: {
        role: 'Lead Game Designer',
        context: 'Mobile hybrid-casual roguelite prototype — Piximeta',
        platform: 'Mobile (Unity)',
        team: '9 people — design, art, development, stakeholders',
        tools: 'Figma · Jira · Wiki/GDD · Unity · Excel · Machinations · Adobe Suite',
        mainChallenge: 'Turning a complex multi-system roguelite into a structured, buildable, and player-readable mobile product for a team of nine',
        keyDeliverables: '30+ UX flows, 100+ wireframes, 117+ wiki subsites, 650+ documents, 60+ stakeholder presentations, 600+ slides',
        status: 'Prototype stage — launch paused before live data',
        duration: '1 year',
      },
      impact: {
        productionClarity: '117+ Wiki/GDD subsites and 650+ documents kept a 9-person team aligned across systems, mechanics, flows, narrative, and stakeholder decisions throughout the prototype phase — reducing the back-and-forth cost of a multi-system build',
        playerClarity: '30+ UX flows and 100+ wireframes translated abstract systems into concrete player-facing interactions, making character selection, upgrade decisions, combat logic, and progression readable before screens were finalized',
        systemValue: 'Defined the full product structure: core loop, skill system, progression, combat balance, inventory, economy, and narrative systems. That structure gave the team a shared vocabulary and a priority filter — if a feature did not serve the loop, it waited',
        documentationValue: '60+ stakeholder presentations and 600+ slides turned a complex multi-system prototype into a communicable product vision, enabling faster alignment and clearer iteration decisions at each production stage',
        implementationValue: 'Internal playtests and a deliberate design-to-dev flow identified friction in the core loop and card choice system early — allowing structural corrections before scope expanded further',
        validation: 'No live performance data: launch was paused before public release. Evidence is structural — the prototype reached a playable, team-aligned state with all primary systems defined, documented, and playtested internally.',
      },
      myOwnership:
        'I was the Lead Game Designer for the full prototype. My ownership covered the core loop definition, system architecture, individual screen design, GDD/Wiki documentation structure, and the stakeholder presentation cycle. I ran the UX flow work and the wireframe system. This was not a supporting design role — I was the primary design voice for how the product worked, how it communicated with players, and how it was understood by the team. Every major system decision, documentation structure, and product direction discussion ran through my design work.',
      researchValidation:
        'Research drew heavily from the genre leaders: Survivor.io and Vampire Survivors were the primary references for core loop structure, upgrade pacing, and player feedback rhythm. I studied how competing titles handled the tension between mechanical depth and mobile session length, random upgrade readability, and progression clarity for hybrid-casual audiences. Internal playtests ran throughout the prototype phase and fed directly into structural adjustments to the core loop, upgrade card UX, and progression screen hierarchy. Playtest findings shaped the wireframe priorities and informed which system complexity was player-readable versus designer-only logic.',
      implementationHandoff:
        'The documentation system was the handoff. The Wiki/GDD with 117+ subsites and 650+ documents served as a persistent design record for design, development, art, and stakeholders. Individual feature documents included design intent, system rules, edge cases, UX flows, and implementation notes. The 30+ user flows and 100+ wireframes provided the visual and structural specification for every major player-facing interaction. Stakeholder presentations — 60+ decks, 600+ slides — kept the product direction legible at every phase of the prototype. The goal was not volume. The goal was that any team member could open a document and understand what was being built, why, and how.',
    },
    whatThisShows:
      'This case shows how I approach product work at the system level — not individual mechanics or screens, but the structure that makes everything connect and a team understand what it is building.\n\nDocumentation here was not a deliverable at the end of the project. It was how the work moved forward. 117+ Wiki subsites, 650+ documents, 60+ stakeholder presentations — that is not volume for its own sake. It is what it takes to keep a nine-person team building from the same vision over twelve months.',
    whatThisShowsEs:
      'Este caso muestra cómo abordo el trabajo de producto desde los sistemas: no mecánicas o pantallas individuales, sino la estructura que hace que todo conecte y que un equipo entienda lo que está construyendo.\n\nLa documentación aquí no fue un entregable al final del proyecto. Fue cómo el trabajo avanzó. Más de 117 subsitios en la Wiki, 650 documentos, 60 presentaciones para stakeholders. Eso no es volumen por el volumen. Es lo que se necesita para mantener a nueve personas construyendo desde la misma visión durante doce meses.',
    contentEs: {
      summary:
        'Zomvilles fue un prototipo roguelite mobile híbrido casual inspirado en el loop rápido de supervivencia de juegos como Survivor.io y Vampire Survivors. Trabajé en el proyecto durante un año como Lead Game Designer, ayudando a estructurar el producto desde sus mecánicas base hasta flujos UX, documentación, balance de combate, progresión y comunicación con stakeholders.\n\nEl proyecto llegó a etapa de prototipo y su lanzamiento fue pausado antes de recoger data en vivo. Por eso, este caso se enfoca en la estructura de producto, los sistemas, los flujos UX y las decisiones que ayudaron a convertir una idea inicial en un prototipo mobile jugable.',
      quickFacts: {
        role: 'Lead Game Designer',
        studio: 'Piximeta',
        platform: 'Mobile',
        type: 'Prototipo roguelite híbrido casual',
        stage: 'Prototipo, lanzamiento pausado',
        duration: '1 año',
        team: '9 personas',
        tools: 'Jira · Wiki · Figma · Unity · Excel · Machinations · Adobe Suite',
        status: 'Prototipo (lanzamiento pausado)',
        confidentiality: 'Detalles seleccionados compartidos. El caso se enfoca en estructura de producto, diseño de sistemas y documentación. Algunos assets y materiales internos no se muestran públicamente.',
      },
      context:
        'Zomvilles estaba diseñado alrededor de una fantasía simple pero escalable: sobrevivir oleadas de enemigos, tomar decisiones rápidas de mejora, volverse más fuerte entre runs y usar distintos personajes y habilidades para mantener fresco el loop. El contexto mezclaba supervivencia zombi, folclore rural estadounidense y acción postapocalíptica exagerada. Eso le daba al juego una personalidad reconocible. El producto necesitaba una estructura sólida debajo. El trabajo de diseño se enfocó en convertir esa fantasía en sistemas que el equipo pudiera construir y que los jugadores pudieran entender.',
      challenge:
        'El proyecto necesitaba convertirse en algo más que una buena temática o un conjunto de mecánicas separadas. Necesitaba una estructura clara de producto: loop principal, lógica de progresión, sistema de habilidades, reglas de combate, flujos UX, pantallas, documentación y suficiente lenguaje común para que el equipo pudiera construir desde la misma visión.',
      challengeRisks: [
        'Claridad de producto: definir cómo funcionaba el juego como experiencia roguelite mobile repetible.',
        'Claridad para el jugador: ayudar a entender progresión, habilidades, inventario, selección de personaje y decisiones durante la run.',
        'Claridad para el equipo: documentar los sistemas lo suficiente para mantener alineados a diseño, arte, desarrollo y stakeholders.',
      ],
      role:
        'Como Lead Game Designer, trabajé en la estructura de producto y la documentación de diseño del prototipo. Mis responsabilidades incluyeron:',
      roleResponsibilities: [
        'Diseñar y documentar mecánicas base',
        'Estructurar el loop principal y los sistemas de progresión',
        'Diseñar habilidades, lógica de combate y bases de balance',
        'Apoyar flujos UX y estructura de interfaz',
        'Crear y revisar wireframes y pantallas HiFi',
        'Trabajar en selección de personaje, inventario, sistema de cartas aleatorias, HUD y pantallas de progresión',
        'Apoyar sistemas narrativos, misiones, eventos, diálogos y localización',
        'Crear documentación mediante Wiki y estructuras de GDD',
        'Preparar presentaciones para stakeholders',
        'Apoyar conversaciones de monetización y dirección de producto',
        'Alinear decisiones de diseño con un equipo multidisciplinario',
      ],
      constraints: [
        'Diseño mobile: la experiencia tenía que ser legible y accionable en pantalla pequeña durante combate rápido',
        'Audiencia híbrida casual: las mecánicas necesitaban profundidad sin abrumar a nuevos jugadores',
        'Alcance de prototipo: el diseño debía priorizar lo que hacía jugable y comunicable el loop principal',
        'Equipo de nueve personas: la documentación tenía que ser clara para que diseño, arte, desarrollo y stakeholders se mantuvieran alineados',
        'Muchos sistemas simultáneos: loop, habilidades, progresión, inventario, narrativa, eventos y monetización debían conectar sin colapsar en complejidad',
      ],
      approach: [
        {
          heading: '1. Definir la base del producto',
          body: 'La primera capa fue definir qué era el juego en su núcleo: un roguelite mobile con sesiones cortas, runs repetibles, mejoras, variedad de personajes, escalamiento de combate y progresión a largo plazo. Eso implicaba diseñar cómo el jugador entra a una run, sobrevive, elige mejoras aleatorias, usa habilidades, gestiona recursos, desbloquea contenido y vuelve más fuerte.',
        },
        {
          heading: '2. Estructurar sistemas y progresión',
          body: 'El juego necesitaba sistemas capaces de crecer más allá del primer prototipo. Esto incluía progresión de personajes, opciones de habilidades, inventario, recompensas por cartas aleatorias, escalamiento de enemigos, jefes y consideraciones de economía. El objetivo era crear sistemas que dieran variedad sin hacer que el producto fuera difícil de entender.',
        },
        {
          heading: '3. Traducir sistemas en flujos UX',
          body: 'Una vez definidos los sistemas, había que convertirlos en flujos utilizables. Trabajé en flujos para distintas partes de la experiencia, incluyendo selección de personaje, inventario, decisiones durante la run, recompensas, estados del HUD y pantallas de progresión. El proyecto incluyó más de 30 flujos de usuario y más de 100 wireframes.',
        },
        {
          heading: '4. Documentar para alinear al equipo',
          body: 'La documentación fue una de las partes más fuertes del proyecto. La Wiki/GDD creció hasta convertirse en una base de conocimiento de producto con más de 117 subsitios y más de 650 documentos. Esto ayudó al equipo a llevar control de mecánicas, features, decisiones de balance, flujos UX, elementos narrativos, misiones y materiales para stakeholders.',
        },
        {
          heading: '5. Comunicar la visión del producto',
          body: 'El proyecto requería comunicación frecuente con stakeholders. Se crearon más de 60 presentaciones y 600 diapositivas para explicar features, dirección, progreso y decisiones. El objetivo no era solo documentar trabajo, sino hacer que el producto fuera entendible para todas las personas involucradas.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Un roguelite puede convertirse rápidamente en una colección de sistemas: habilidades, enemigos, recompensas, mejoras, jefes, inventario y progresión. Sin un loop claro como ancla, las features se multiplican y el jugador no tiene un centro al que volver.',
          decision: 'El loop principal fue la primera prioridad de diseño antes de agregar más sistemas. La secuencia tenía que funcionar primero: empezar una run, sobrevivir, elegir mejoras, volverse más fuerte, enfrentar enemigos más difíciles, recoger recompensas y volver con sensación de avance.',
          why: 'Cada feature nueva debía evaluarse contra el loop. Si lo apoyaba, pertenecía. Si solo sumaba complejidad sin apoyar el ritmo, esperaba. Ese filtro ayudó al equipo a decidir más rápido y mantuvo el prototipo enfocado.',
        },
        {
          problem: 'Las decisiones de cartas aleatorias son centrales en este tipo de juegos, pero pueden frenar al jugador si la información es difícil de comparar rápidamente en mobile.',
          decision: 'La dirección UX se enfocó en ayudar al jugador a entender opciones rápido: qué hace la carta, por qué importa y cómo cambia la run.',
          why: 'La toma de decisión debe ser parte del ritmo, no una interrupción. En un juego mobile de ritmo rápido, cada segundo de confusión saca al jugador del flujo. El sistema de cartas tenía que sentirse como un momento de poder, no como un ejercicio de lectura.',
        },
        {
          problem: 'Con un equipo de nueve personas y muchos sistemas en movimiento, había riesgo real de que distintas disciplinas trabajaran desde supuestos distintos sobre cómo se conectaban las features.',
          decision: 'Se trató la documentación como infraestructura de producto, no como output administrativo. La Wiki, los flujos, los wireframes y las presentaciones se convirtieron en referencias compartidas que ayudaban a cada disciplina a mantenerse orientada.',
          why: 'Un prototipo con muchas piezas móviles es difícil de alinear solo mediante conversaciones. La estructura escrita reduce el costo de mantener a todos en la misma página, especialmente cuando el producto todavía se está definiendo.',
        },
        {
          problem: 'Las decisiones de Game Design y UX a veces se tomaban de forma independiente, creando features que funcionaban en papel pero generaban fricción cuando los jugadores las usaban en pantalla pequeña.',
          decision: 'Se conectó el trabajo de Game Design y UX de manera deliberada a lo largo del proceso, tratando la claridad para el jugador como parte del brief de diseño, no como una revisión separada al final.',
          why: 'Una mecánica solo funciona cuando el jugador puede entenderla, actuar sobre ella y sentir por qué importa. En mobile, esa conexión tiene que construirse desde el inicio, no agregarse después de que el sistema ya está definido.',
        },
      ],
      featuredSystems: [
        {
          id: 'core-loop',
          num: '01',
          title: 'Core Loop y progresión',
          body: 'El loop principal era la base del producto. El jugador necesitaba una razón para empezar otra run, probar otro personaje, elegir nuevas mejoras y seguir avanzando.\n\nEl loop conectaba combate, mejoras aleatorias, selección de personaje, inventario, recompensas, crecimiento de habilidades, retos de jefes y progresión a largo plazo. Diseñar esa estructura requería más que listar features. Requería decidir qué aportaba cada elemento a la motivación del jugador para volver.\n\nEsta área muestra el lado de producto del trabajo: cómo se estructuró el juego para crear repetición con propósito, no solo acción repetida.',
          asset: '/cases/zomvilles/zomvilles-03.webp',
          assetAlt: 'Pantallas de progresión del prototipo roguelite mobile Zomvilles',
          assetCaption: 'Las pantallas de progresión ayudaban a convertir la lógica del sistema en decisiones legibles para el jugador.',
        },
        {
          id: 'skill-combat',
          num: '02',
          title: 'Sistema de habilidades y balance de combate',
          body: 'El sistema de habilidades debía hacer que cada run se sintiera distinta sin perder claridad ni justicia en el combate. Esto requería diseñar habilidades, lógica de mejoras, presión de enemigos, jefes y reglas de balance para una audiencia mobile híbrida casual.\n\nLas decisiones de cartas aleatorias son centrales en este tipo de juegos, pero pueden crear fricción si la información es difícil de comparar rápido. La dirección UX se enfocó en hacer que las opciones de mejora fueran rápidas de leer: qué hace la opción, por qué importa y cómo cambia la run actual.\n\nEsta área muestra pensamiento de sistemas: cómo las mecánicas individuales se conectan con decisiones del jugador, dificultad, ritmo y rejugabilidad.',
          asset: '/cases/zomvilles/zomvilles-05.webp',
          assetAlt: 'Pantalla del sistema de cartas aleatorias del prototipo roguelite mobile Zomvilles',
          assetCaption: 'Las cartas aleatorias debían ser rápidas de comparar y fáciles de entender durante la run.',
        },
        {
          id: 'documentation',
          num: '03',
          title: 'Documentación, flujos UX y alineación del equipo',
          body: 'El proyecto generó un sistema amplio de documentación: más de 117 subsitios en la Wiki/GDD, más de 650 documentos, más de 30 flujos de usuario, más de 100 wireframes, más de 60 presentaciones para stakeholders y más de 600 diapositivas.\n\nEl punto no es el volumen. El punto es que el producto necesitaba estructura. La documentación ayudó a alinear a un equipo de nueve personas alrededor de sistemas, flujos, mecánicas, pantallas y decisiones con stakeholders. Se convirtió en la infraestructura que hizo que el prototipo fuera más fácil de entender, construir y discutir.\n\nEsta área muestra cómo trabajo con complejidad: convirtiendo ideas dispersas de producto en referencias compartidas que el equipo puede usar.',
          asset: '/cases/zomvilles/zomvilles-08.webp',
          assetAlt: 'Diagrama de flujos UX de Zomvilles mostrando interacciones del jugador y rutas de progresión',
          assetCaption: 'Los flujos UX ayudaron a traducir sistemas en interacciones concretas para el jugador.',
        },
      ],
      deliverables: [
        'Diseño y documentación del core loop',
        'Arquitectura del sistema de progresión',
        'Diseño del sistema de habilidades y bases de balance',
        'Diseño de pantallas de selección de personaje, inventario, HUD y progresión',
        'Diseño UX del sistema de cartas aleatorias',
        'Más de 30 flujos de usuario',
        'Más de 100 wireframes',
        'Wiki/GDD con más de 117 subsitios y más de 650 documentos',
        'Más de 60 presentaciones para stakeholders y 600 diapositivas',
        'Apoyo en sistemas narrativos, misiones, eventos, diálogos y localización',
      ],
      playtests:
        'El proyecto incluyó playtests internos y sesiones de feedback durante la fase de prototipo. Esas sesiones ayudaron a identificar dónde el loop principal era poco claro, dónde las decisiones de mejora generaban confusión y dónde la progresión se sentía desconectada del esfuerzo del jugador. Algunos sistemas fueron simplificados o reestructurados a partir de lo que los testers encontraron. No todo pudo resolverse antes de que el lanzamiento fuera pausado, pero esos hallazgos dieron forma a la documentación y orientaron las prioridades para el trabajo continuado.',
      outcome:
        'El prototipo llegó a un estado donde nueve personas estaban alineadas en lo que estaban construyendo, por qué existía cada sistema y cómo se suponía que debía sentirse la experiencia del jugador. Eso no pasa por accidente en un proyecto de múltiples sistemas con poco tiempo.\n\nEl resultado principal fue estructural: un loop central funcionando, sistemas de progresión definidos, más de 30 flujos UX, más de 100 wireframes y un sistema de documentación con más de 117 subsitios en la Wiki desde el que el equipo podía trabajar sin reuniones constantes de alineación. El lanzamiento fue pausado antes de tener data en vivo. La base era real.',
      whatILearned:
        'Este proyecto reforzó que un prototipo necesita estructura fuerte antes que más features. Cuando un producto tiene muchos sistemas posibles, el riesgo no es la falta de ideas. El riesgo es una prioridad poco clara. Un loop fuerte, una progresión clara y documentación útil pueden ayudar al equipo a decidir qué pertenece al producto, qué necesita más trabajo y qué debería esperar.\n\nTambién reforzó que Game Design y UX están profundamente conectados. Una mecánica solo funciona cuando el jugador puede entenderla, actuar sobre ella y sentir por qué importa. En mobile, esa conexión tiene que construirse desde el inicio.',
      projectSnapshot: {
        role: 'Lead Game Designer',
        context: 'Prototipo roguelite híbrido casual mobile, Piximeta',
        platform: 'Mobile (Unity)',
        team: '9 personas: diseño, arte, desarrollo, stakeholders',
        tools: 'Figma · Jira · Wiki/GDD · Unity · Excel · Machinations · Adobe Suite',
        mainChallenge: 'Convertir un roguelite de múltiples sistemas en un producto mobile estructurado, construible y legible para el jugador, con un equipo de nueve personas',
        keyDeliverables: 'Más de 30 flujos UX, más de 100 wireframes, más de 117 subsitios en la Wiki, más de 650 documentos, más de 60 presentaciones para stakeholders, más de 600 diapositivas',
        status: 'Prototipo, lanzamiento pausado antes de recoger data en vivo',
        duration: '1 año',
      },
      impact: {
        productionClarity: 'Más de 117 subsitios en la Wiki/GDD y 650 documentos mantuvieron a un equipo de 9 personas alineado en sistemas, mecánicas, flujos, narrativa y decisiones de stakeholders durante toda la fase de prototipo. Eso redujo el costo de sincronización de un build con múltiples sistemas.',
        playerClarity: 'Más de 30 flujos UX y 100 wireframes tradujeron sistemas abstractos en interacciones concretas para el jugador. La selección de personaje, las decisiones de mejora, la lógica de combate y la progresión se volvieron legibles antes de que las pantallas estuvieran finalizadas.',
        systemValue: 'Definí la estructura completa del producto: loop central, sistema de habilidades, progresión, balance de combate, inventario, economía y sistemas narrativos. Esa estructura le dio al equipo un vocabulario compartido y un filtro de prioridad: si una feature no apoyaba el loop, esperaba.',
        documentationValue: 'Más de 60 presentaciones para stakeholders y 600 diapositivas convirtieron un prototipo complejo en una visión de producto comunicable. La alineación fue más rápida y las decisiones de iteración más claras en cada etapa de producción.',
        implementationValue: 'Los playtests internos y un flujo deliberado de diseño a desarrollo identificaron fricción en el loop central y el sistema de cartas desde temprano. Eso permitió correcciones estructurales antes de que el alcance se expandiera.',
        validation: 'Sin datos de performance en vivo: el lanzamiento fue pausado antes del lanzamiento público. La evidencia es estructural. El prototipo llegó a un estado jugable, con el equipo en la misma página y todos los sistemas primarios definidos, documentados y probados internamente.',
      },
      myOwnership: 'Fui el Lead Game Designer durante todo el prototipo. Mi responsabilidad cubrió la definición del loop central, la arquitectura de sistemas, el diseño de pantallas individuales, la estructura de documentación GDD/Wiki y el ciclo de presentaciones para stakeholders. Lideré el trabajo de flujos UX y el sistema de wireframes. No fue un rol de diseño de apoyo: fui la voz principal de diseño sobre cómo funcionaba el producto, cómo se comunicaba con los jugadores y cómo lo entendía el equipo. Cada decisión de sistema importante, estructura de documentación y discusión de dirección de producto pasó por mi trabajo de diseño.',
      researchValidation: 'La investigación se basó principalmente en los líderes del género: Survivor.io y Vampire Survivors fueron las referencias principales para la estructura del loop central, el ritmo de mejoras y el ritmo de feedback al jugador. Estudié cómo los títulos competidores manejaron la tensión entre profundidad mecánica y duración de sesión mobile, legibilidad de mejoras aleatorias y claridad de progresión para audiencias híbridas casuales. Los playtests internos corrieron durante toda la fase de prototipo e impactaron directamente los ajustes estructurales al loop central, el UX de cartas de mejora y la jerarquía de pantallas de progresión. Los hallazgos de playtests dieron forma a las prioridades de wireframes e informaron qué complejidad de sistema era legible para el jugador versus lógica solo para diseñadores.',
      implementationHandoff: 'El sistema de documentación fue el handoff. La Wiki/GDD con más de 117 subsitios y 650 documentos sirvió como registro de diseño persistente para diseño, desarrollo, arte y stakeholders. Los documentos individuales de features incluían intención de diseño, reglas del sistema, casos borde, flujos UX y notas de implementación. Los más de 30 flujos de usuario y 100 wireframes proporcionaron la especificación visual y estructural para cada interacción principal del jugador. Las presentaciones para stakeholders, más de 60 decks y 600 diapositivas, mantuvieron la dirección del producto legible en cada fase del prototipo. El objetivo no era el volumen. Era que cualquier miembro del equipo pudiera abrir un documento y entender qué se estaba construyendo, por qué y cómo.',
    },
  },
  {
    id: 'CASE-007',
    slug: 'kodety',
    title: 'Kodety',
    thumbnailAlt: 'Kodety — educational web game design and UX/UI case study',
    role: 'Game Designer / UX/UI',
    platform: ['Web'],
    focus: 'Educational game design, interaction design, product UX, feedback systems',
    focusEs: 'Diseño de juego educativo, diseño de interacción, UX de producto, sistemas de retroalimentación',
    status: 'LEGACY · AWARD',
    visibility: 'legacy',
    statusColor: 'default',
    year: null,
    featured: false,
    category: 'games',
    trailerSrc: '/cases/kodety/Kodety-trailer.mp4',
    headline: 'Designing an award-winning educational web game where learning and play feel like the same thing.',
    headlineEs: 'Diseñando un juego web educativo premiado donde aprender y jugar se sienten como la misma cosa.',
    description:
      'Kodety is an educational web game developed at the Universidad Cooperativa de Colombia that earned industry recognition. My work covered game design and UX/UI: mechanics, feedback systems, interaction flows, and the visual interface. The core challenge was making the educational content part of the game — not something players read before it starts.',
    descriptionEs:
      'Kodety es un juego web educativo desarrollado en la Universidad Cooperativa de Colombia que recibió reconocimiento de la industria. Mi trabajo cubrió diseño de juego y UX/UI: mecánicas, sistemas de retroalimentación, flujos de interacción e interfaz visual. El reto central fue hacer que el contenido educativo fuera parte del juego, no algo que el jugador lee antes de que empiece.',
    tags: ['Web', 'Educational', 'Game Design', 'UX/UI', 'Award'],
    relatedNotes: ['player-decision-making-ux', 'feedback-reduces-guesswork'],
    cta: 'View Kodety case',
    content: {
      summary:
        'Kodety is an educational web game developed at the Universidad Cooperativa de Colombia. It won an industry award. My work covered game design and UX/UI: mechanics, feedback systems, interaction flows, and visual interface.\n\nThe central design challenge was making the learning content part of the experience — embedded in the challenge structure, not explained before it. When players encounter educational material as instructions, they skip it. When it lives inside the game, they engage with it.',
      quickFacts: {
        role: 'Game Designer / UX/UI',
        studio: 'Universidad Cooperativa de Colombia',
        platform: 'Web',
        status: 'Shipped / Award',
        confidentiality: 'Legacy project shared as part of career history.',
      },
      context:
        'Educational games carry a design tension that most entertainment games do not: the learning objective and the play objective have to feel like the same thing. If a player perceives the educational content as separate from the fun — something to get through before the game starts — engagement collapses fast.\n\nFor a web game, the drop-off risk is even higher. No installation means no commitment. Players make entry and exit decisions within seconds.',
      challenge:
        'The mechanics had to teach without feeling like lessons. The interaction needed to create genuine challenge and reward while the educational content lived naturally inside the loop — not as a gate the player had to pass through.\n\nWeb constraints added a second layer: no installation, fast load times, cross-browser compatibility, and a UI that worked for users with no gaming background. Nothing could require extended reading to understand.',
      role:
        'I worked on game mechanics design, UX flows, and UI design. My focus was on how players interacted with the learning content through the game: the feedback systems, progression indicators, and interface clarity that made the educational loop feel like play rather than instruction.',
      constraints: [
        'Web platform: browser-based interaction model, no native game engine',
        'Educational content requirements: mechanics had to align with learning objectives',
        'Short session tolerance: web users are more likely to drop off than dedicated game players',
        'Broad age range in target audience: UI had to be clear without prior game literacy assumptions',
        'Fast load requirement: no heavy assets or long initialization',
      ],
      approach: [
        {
          heading: 'Mechanics as learning vehicles',
          body: 'Designed game mechanics where the correct action to progress was also the action that reinforced the learning objective. The player was not being tested; they were practicing. The distinction matters for engagement: testing feels like evaluation, practice feels like play.',
        },
        {
          heading: 'Feedback as the teacher',
          body: 'Designed the feedback system to do the instructional work. Rather than explaining rules upfront, the interface responded to player actions in ways that made the correct approach discoverable. Wrong paths had clear visual consequence; correct paths had immediate reward.',
        },
        {
          heading: 'Interface clarity for a broad audience',
          body: 'Designed the visual interface to be legible for users with varying levels of game literacy. Interaction affordances were explicit, state changes were clear, and nothing required reading extended text to understand.',
        },
        {
          heading: 'Session design for web',
          body: 'Structured the experience so each session had a complete arc: a challenge, an attempt, a result, and a sense of progression. Web users make quick entry and exit decisions. Each visit needed to feel worthwhile in under three minutes.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Early prototypes showed players reading the educational content as instructions rather than engaging with it as part of the game, and then skipping it.',
          decision: 'Redesigned the content integration so the educational material was embedded in the challenge structure rather than presented before it. Players encountered the content through play, not through a pre-game explanation.',
          why: 'Instructions that appear before the game are a cognitive cost. Players skip them and then fail, or read them and forget. Content that appears in context is encountered when the player has a reason to care about it.',
        },
        {
          problem: 'Feedback timing was rewarding correct answers too slowly, which reduced the sense of responsiveness and made the game feel unengaging.',
          decision: 'Moved reward feedback to immediate visual confirmation on correct interaction, with the reinforcing educational element surfacing in a secondary beat.',
          why: 'Fast feedback loops are fundamental to game engagement. The reward has to feel immediate. Secondary information can follow once the player has felt the win.',
        },
      ],
      deliverables: [
        'Game mechanics design documentation',
        'UX flow wireframes and interaction specs',
        'Visual interface design for all game states',
        'Feedback system design and state definitions',
        'Design handoff documentation for development',
      ],
      outcome:
        'Kodety shipped on web and received an industry award. The recognition was specifically for the design approach — which, to me, validates the core decision: embedding the learning inside the challenge structure rather than presenting it as a prerequisite.\n\nWhen learning and play objectives are aligned at the mechanics level, players engage with both at the same time without noticing the distinction.',
      nextSteps:
        'Educational game design benefits from learning outcome measurement alongside engagement data. I would want to run assessments comparing what players know before and after sessions, correlated with where they engaged longest in the game. That data would tell us which mechanics are doing the educational work most effectively.',
    },
    whatThisShows:
      'The most interesting design problems are the ones where the product has a goal and the user has a different goal — and your job is making them feel like the same goal. Educational games are an extreme version of that. But the principle shows up everywhere: onboarding flows that teach through doing, products that want users to build a habit, dashboards that guide behavior without directing it.\n\nIn all of those cases, the UX job is the same: make the product\'s intended outcome feel like the user\'s own intention.',
    whatThisShowsEs:
      'Este proyecto muestra cómo abordo problemas de diseño donde el objetivo del jugador y el objetivo del producto son cosas distintas que tienen que sentirse como la misma cosa. Los juegos educativos son una versión extrema de ese desafío, pero el principio aplica ampliamente: cuando un producto tiene un resultado que quiere que el usuario alcance, el UX tiene que hacer que ese resultado se sienta como el objetivo propio del usuario, no como un requisito.',
    contentEs: {
      summary:
        'Kodety es un juego web educativo desarrollado en la Universidad Cooperativa de Colombia. Mi trabajo cubrió diseño de juego y UX/UI: definición de mecánicas, flujos de interacción, diseño de interfaz visual y la experiencia general del jugador. El proyecto recibió reconocimiento de la industria por su enfoque de diseño.',
      quickFacts: {
        role: 'Game Designer / UX/UI',
        studio: 'Universidad Cooperativa de Colombia',
        platform: 'Web',
        status: 'Lanzado / Premio',
        confidentiality: 'Proyecto legacy compartido como parte de la historia profesional.',
      },
      context:
        'Los juegos educativos llevan una tensión de diseño que la mayoría de los juegos de entretenimiento no tienen: el objetivo de aprendizaje y el objetivo de juego tienen que sentirse como la misma cosa para el jugador. Si el jugador percibe el contenido educativo como separado de la diversión, el engagement colapsa. Para una plataforma basada en web, este desafío se agravó por la expectativa de acceso instantáneo y la baja tolerancia a sesiones largas.',
      challenge:
        'Diseñar mecánicas de juego que enseñen sin sentirse como lecciones. La interacción tenía que crear un desafío y una recompensa genuinos mientras integraba el contenido educativo de forma natural en el loop central. Las restricciones de los juegos web añadieron otra capa: sin instalación, carga rápida, compatibilidad entre navegadores y una UI que funcionara sin un controlador de juego.',
      role:
        'Trabajé en diseño de mecánicas de juego, flujos UX y diseño de UI. Mi enfoque fue cómo los jugadores interactuaban con el contenido de aprendizaje a través del juego: los sistemas de retroalimentación, los indicadores de progresión y la claridad de interfaz que hacían que el loop educativo se sintiera como juego en lugar de instrucción.',
      constraints: [
        'Plataforma web: modelo de interacción basado en navegador, sin motor de juego nativo',
        'Requisitos de contenido educativo: las mecánicas tenían que alinearse con los objetivos de aprendizaje',
        'Baja tolerancia a sesiones largas: los usuarios web son más propensos a abandonar que los jugadores dedicados',
        'Amplio rango de edad en el público objetivo: la UI debía ser clara sin asumir conocimiento previo de juegos',
        'Requisito de carga rápida: sin assets pesados ni inicialización larga',
      ],
      approach: [
        {
          heading: 'Mecánicas como vehículos de aprendizaje',
          body: 'Diseñé mecánicas de juego donde la acción correcta para progresar era también la acción que reforzaba el objetivo de aprendizaje. El jugador no estaba siendo evaluado, estaba practicando. La distinción importa para el engagement: los exámenes se sienten como evaluación, la práctica se siente como juego.',
        },
        {
          heading: 'La retroalimentación como instructor',
          body: 'Diseñé el sistema de retroalimentación para hacer el trabajo instruccional. En lugar de explicar las reglas de antemano, la interfaz respondía a las acciones del jugador de formas que le permitían descubrir el enfoque correcto por sí mismo. Los caminos incorrectos tenían consecuencias visuales claras; los correctos tenían recompensa inmediata.',
        },
        {
          heading: 'Claridad de interfaz para una audiencia amplia',
          body: 'Diseñé la interfaz visual para ser legible para usuarios con distintos niveles de conocimiento de juegos. Los indicadores de interacción eran explícitos, los cambios de estado eran claros, y nada requería leer texto extenso para entender.',
        },
        {
          heading: 'Diseño de sesión para web',
          body: 'Estructuré la experiencia para que cada sesión tuviera un arco completo: un desafío, un intento, un resultado y una sensación de progresión. Los usuarios web toman decisiones rápidas de entrada y salida. Cada visita necesitaba sentirse valiosa en menos de tres minutos.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Los prototipos iniciales mostraban que los jugadores leían el contenido educativo como instrucciones en lugar de comprometerse con él como parte del juego, y luego lo omitían.',
          decision: 'Rediseñé la integración del contenido para que el material educativo estuviera integrado en la estructura del desafío en lugar de presentarse antes de él. Los jugadores encontraban el contenido a través del juego, no a través de una explicación previa.',
          why: 'Las instrucciones que aparecen antes del juego son un costo cognitivo. Los jugadores las omiten y luego fallan, o las leen y las olvidan. El contenido que aparece en contexto se encuentra cuando el jugador tiene una razón para interesarse.',
        },
        {
          problem: 'El tiempo de retroalimentación recompensaba las respuestas correctas demasiado lentamente, lo que reducía la sensación de capacidad de respuesta y hacía que el juego se sintiera poco atractivo.',
          decision: 'Moví la retroalimentación de recompensa a confirmación visual inmediata en la interacción correcta, con el elemento educativo de refuerzo apareciendo en un beat secundario.',
          why: 'Los ciclos de retroalimentación rápida son fundamentales para el engagement en los juegos. La recompensa tiene que sentirse inmediata. La información secundaria puede seguir una vez que el jugador ha sentido la victoria.',
        },
      ],
      deliverables: [
        'Documentación de diseño de mecánicas de juego',
        'Wireframes de flujos UX y especificaciones de interacción',
        'Diseño de interfaz visual para todos los estados del juego',
        'Diseño del sistema de retroalimentación y definiciones de estado',
        'Documentación de entrega de diseño para desarrollo',
      ],
      outcome:
        'Kodety se lanzó en web y recibió un premio de la industria. El reconocimiento fue específicamente por el enfoque de diseño, que para mí valida la decisión central: integrar el aprendizaje dentro de la estructura del desafío en lugar de presentarlo como prerequisito.\n\nCuando los objetivos de aprendizaje y los objetivos de juego están integrados en las mismas mecánicas, los jugadores se enganchan con ambos al mismo tiempo sin notar la distinción.',
      nextSteps:
        'El diseño de juegos educativos se beneficia significativamente de la medición de resultados de aprendizaje junto con los datos de engagement. Querría ejecutar evaluaciones comparando qué saben los jugadores antes y después de las sesiones, correlacionadas con dónde se comprometieron más tiempo en el juego. Esos datos informarían qué mecánicas están haciendo el trabajo educativo de manera más efectiva.',
    },
  },
  {
    id: 'CASE-008',
    slug: 'star-wars-roguelike-one',
    title: 'Star Wars: Roguelike One',
    thumbnailAlt: 'Star Wars: Roguelike One — UEFN roguelike UX/UI design case study',
    role: 'Game UX/UI Designer',
    platform: ['UEFN', 'Fortnite'],
    focus: 'IP-faithful UX, roguelike loop clarity, run readability, Star Wars feedback systems',
    focusEs: 'UX fiel al IP, claridad del loop roguelike, legibilidad por partida, sistemas de retroalimentación Star Wars',
    status: 'SELECTED WORK',
    visibility: 'public',
    statusColor: 'accent',
    year: '2026',
    featured: true,
    category: 'games',
    thumbnail: '/cases/star-wars-roguelike-one/hero.webp',
    trailerSrc: '/cases/star-wars-roguelike-one/roguelike-one-trailer.mp4',
    gallery: [
      '/cases/star-wars-roguelike-one/starwars-fortnite-01.webp',
      '/cases/star-wars-roguelike-one/starwars-fortnite-02.webp',
      '/cases/star-wars-roguelike-one/starwars-fortnite-03.webp',
      '/cases/star-wars-roguelike-one/starwars-fortnite-04.webp',
      '/cases/star-wars-roguelike-one/starwars-fortnite-05.webp',
      '/cases/star-wars-roguelike-one/starwars-fortnite-06.webp',
    ],
    headline: 'Making roguelike run clarity and Star Wars IP fidelity work as a single design problem.',
    headlineEs: 'Hacer que la claridad del loop roguelike y la fidelidad al IP de Star Wars funcionen como un solo problema de diseño.',
    description:
      'Star Wars: Roguelike One is a live roguelike inside Fortnite. My focus was on two things that had to work together: making the run loop readable at Fortnite pace, and making every interface element feel native to the Star Wars universe. When those two goals conflict, generic solutions break the IP. When they align, the game disappears and the experience takes over.',
    descriptionEs:
      'Star Wars: Roguelike One es un roguelike activo dentro de Fortnite. Mi trabajo se centró en dos cosas que tenían que funcionar juntas: hacer el loop de partidas legible al ritmo de Fortnite, y hacer que cada elemento de interfaz se sintiera nativo al universo Star Wars. Cuando esos dos objetivos entran en conflicto, las soluciones genéricas rompen el IP. Cuando se alinean, el juego desaparece y la experiencia toma el control.',
    tags: ['UEFN', 'Roguelike', 'Star Wars', 'IP Design', 'Run Clarity'],
    relatedNotes: ['uefn-ux-lessons', 'feedback-reduces-guesswork', 'clean-hud-vs-clear-hud'],
    cta: 'View Star Wars: Roguelike One case',
    content: {
      summary:
        'Star Wars: Roguelike One is a live UEFN experience that brings players into the Star Wars universe as a roguelike. The challenge is not just making it play well — it is making the interface feel like it was designed for this universe, not adapted from a generic template.\n\nMy work covered run state visibility, combat feedback, progression communication, and the post-run screen. Everything went through two filters: does this communicate what the player needs, and does this feel like Star Wars.',
      quickFacts: {
        role: 'Game UX/UI Designer',
        studio: 'Teravision Games',
        IP: 'Star Wars / Lucasfilm',
        platform: 'UEFN / Fortnite',
        year: '2026',
        status: 'Shipped',
        confidentiality: 'Selected details shared.',
      },
      context:
        'Star Wars is one of the most tonally consistent universes in entertainment. Decades of films, games, and media have built player expectations about how this universe looks, sounds, and communicates. An interface that ignores those expectations does not just look wrong — it reminds the player they are in a Fortnite mini-game.\n\nOn top of that, UEFN: limited custom UI, Fortnite\'s native HUD always in the frame, a player base that reads information fast and skips everything else.',
      challenge:
        'Roguelike clarity requires fast, predictable feedback: current state, current risk, outcome of action. The IP requirement adds a second rule on top of that: every feedback element has to feel native to Star Wars, not borrowed from generic game UI.\n\nGeneric HUD elements communicate clearly. They also break the fantasy instantly. Too much custom UI breaks UEFN constraints. The problem was finding the overlap — feedback that is readable AND that reads as part of the universe.',
      role:
        'I designed UX/UI systems for run orientation, combat feedback, progression communication, and the post-run flow. I worked within UEFN constraints and collaborated with the design and art teams to align implementation with IP fidelity requirements.',
      constraints: [
        'Star Wars IP requirements: interface had to be visually consistent with established franchise language',
        'UEFN limitations on custom UI placement and rendering',
        'Fortnite native HUD occupies core screen zones and cannot be removed',
        'Roguelike run structure requires persistent state communication without cognitive overload',
        'Player base is Fortnite-native: expects fast reads, not deep onboarding',
      ],
      approach: [
        {
          heading: 'IP-faithful feedback language',
          body: 'Established a visual vocabulary grounded in Star Wars iconography rather than generic game UI. Feedback signals drew from established franchise cues — color temperature, typography weight, and motion patterns consistent with how the universe has communicated information in other media. Players could read state without needing to learn a new system from scratch.',
        },
        {
          heading: 'Run state at a glance',
          body: 'Designed a persistent run status layer that communicated the three most critical variables without dominating the screen: objective progress, available resources, and current threat level. Information outside those three was accessible on demand. This reduced cognitive load while keeping players oriented across fast combat sequences.',
        },
        {
          heading: 'Combat feedback within UEFN constraints',
          body: 'Worked within UEFN device system constraints to design feedback that felt responsive and IP-appropriate. Focused on timing, position, and visual intensity rather than complex animations that would exceed platform limits. The result was feedback that reads clearly without requiring custom solutions that UEFN cannot support reliably.',
        },
        {
          heading: 'Post-run momentum design',
          body: 'Designed the end-of-run screen to make progression tangible and re-entry easy. The flow revealed results, unlocks, and next objective in sequence rather than all at once — giving players a moment with each beat before moving to the next. Roguelike retention depends on the player feeling forward momentum between runs.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Early prototypes used generic UEFN UI components that communicated game state clearly but read as completely disconnected from the Star Wars universe, weakening IP immersion on every interaction.',
          decision: 'Replaced generic UI treatments with solutions grounded in Star Wars visual language — color assignments, typographic hierarchy, and motion timing calibrated to franchise precedent rather than game UI defaults.',
          why: 'IP experiences live or die by tone consistency. A player inside Star Wars who sees a generic health bar is reminded they are playing a Fortnite mini-game. A player who sees interface language that feels native to the universe stays in the experience. The UX job is to make the seams invisible.',
        },
        {
          problem: 'Run-end was causing drop-off: players were seeing the results screen and leaving before re-entering, which broke the roguelike retention loop.',
          decision: 'Redesigned the post-run flow to lead with progress made rather than run result, and to surface the next unlock or objective immediately after. Changed the primary action from "return to lobby" to "run again" with the reward state visible.',
          why: 'Roguelike retention is an emotional loop, not a data presentation. Players re-enter when they feel forward momentum, not when they understand their score. The screen needed to answer "what changes if I play again" before it answered anything else.',
        },
      ],
      deliverables: [
        'Run state UI system and component states documentation',
        'IP feedback language guide and application examples',
        'Combat feedback timing specifications',
        'Post-run flow and information architecture',
        'UEFN implementation notes and screen zone maps',
      ],
      outcome:
        'Star Wars: Roguelike One shipped in 2026 and is currently live inside Fortnite. The post-run flow redesign — leading with progress made rather than run result, and surfacing the next unlock immediately — addressed observable drop-off behavior at the results screen. Combat feedback and run state used IP-grounded visual language instead of UEFN defaults.\n\nSpecific engagement metrics are not yet available publicly.',
      nextSteps:
        'I would track the drop-off rate at the post-run screen and compare it to run-again rate across first-session and returning players. That delta tells you whether the re-entry hook is working or whether players are extracting a single session of value and leaving. I would also look at moments where players die without appearing to understand why — those are the places where the combat feedback system still has work to do.',
      projectSnapshot: {
        role: 'Game UX/UI Designer',
        context: 'Live UEFN experience inside Fortnite, licensed IP',
        platform: 'Fortnite / UEFN',
        team: 'Cross-functional: design, art, engineering',
        tools: 'Figma · UEFN · Jira · Confluence',
        mainChallenge: 'Build roguelike readability inside a live UEFN experience while maintaining Star Wars IP tone across all interface decisions.',
        keyDeliverables: 'Run state UI system, IP feedback language guide, combat feedback specs, post-run flow, UEFN implementation notes',
        status: 'Shipped (live)',
        constraints: 'Star Wars IP requirements · UEFN UI limits · Fortnite native HUD · Fortnite-native player expectations',
      },
      impact: {
        productionClarity: 'Designed player-facing UX around fast combat readability and roguelike decision-making within UEFN technical constraints.',
        playerClarity: 'Helped players understand run state, combat feedback and progression without breaking Star Wars immersion — using IP-grounded visual language instead of generic game UI.',
        systemValue: 'Defined interface patterns grounded in franchise precedent that could support consistent communication across different run states, feedback moments and progression beats.',
        documentationValue: 'Documented IP feedback language, component states and UEFN implementation notes to support alignment between design intent and what engineering could deliver on platform.',
        implementationValue: 'Combat feedback and post-run flow were designed to work within UEFN device system constraints — timing, position and intensity calibrated to what the platform could support reliably.',
        validation: 'Public engagement metrics are not available to share. This case emphasizes UX structure, production constraints, IP alignment and player clarity decisions across a live shipped experience.',
      },
      myOwnership: 'I owned the UX/UI systems for run orientation, combat feedback, progression communication and the post-run flow. I worked within UEFN constraints and collaborated with design and art on implementation feasibility and IP alignment. My responsibility was making the roguelike loop legible and the Star Wars tone consistent — not as separate goals, but as a single design problem.',
      researchValidation: 'This work was informed by player clarity goals, IP fidelity requirements and UEFN platform constraints. The interface decisions were validated through design review and IP alignment checks. The post-run flow redesign was driven by observed behavior patterns: players were dropping off at the results screen, indicating the re-entry hook was not working as designed. Addressing that required rethinking what the screen led with, not just how it looked.',
      implementationHandoff: 'Handoff included run state UI documentation, IP feedback language specifications, combat feedback timing notes and UEFN screen zone maps. Because UEFN has real constraints on what custom UI can do reliably, implementation notes were built into the design specs rather than separated as an afterthought. Each decision was cross-checked against what the platform could actually support.',
    },
    whatThisShows:
      'IP fidelity and UX clarity are not competing constraints — they are the same problem approached from two directions. When they are treated as one, the solution gets better at both.\n\nA player inside Star Wars who sees a generic health bar is reminded they are playing a Fortnite mini-game. A player who sees interface language that feels native to the universe stays in the experience. Making those seams invisible — that is the UX work. The same challenge shows up in any licensed product or tightly governed design system: the answer is always in the overlap between what the brand demands and what the user needs.',
    whatThisShowsEs:
      'Este proyecto muestra cómo trabajo en la intersección de la fidelidad al IP y la claridad de game UX. La restricción es real: la interfaz tiene que comunicar el estado del juego claramente mientras habla el lenguaje visual de una de las franquicias más reconocibles del entretenimiento. Ese equilibrio, útil y fiel a la marca al mismo tiempo, es el mismo desafío en cualquier producto licenciado o sistema de diseño con gobernanza estricta. La respuesta está en encontrar donde lo que el IP exige y lo que el jugador necesita se superponen.',
    contentEs: {
      summary:
        'Star Wars: Roguelike One es una experiencia de Star Wars construida en UEFN dentro de Fortnite. Mi trabajo se centró en sistemas UX/UI para la estructura de partidas, retroalimentación fiel al IP y orientación del jugador a través de loops repetibles. El desafío fue mantener la claridad roguelike intacta mientras se respetaba el lenguaje visual y emocional del universo Star Wars.',
      quickFacts: {
        role: 'Game UX/UI Designer',
        studio: 'Teravision Games',
        IP: 'Star Wars / Lucasfilm',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        type: 'Experiencia roguelike',
        year: '2026',
        status: 'Lanzado',
      },
      context:
        'Construir dentro de un IP como Star Wars crea una restricción de UX que la mayoría de los proyectos UEFN no enfrentan: cada elemento de interfaz tiene que ganarse su lugar frente a uno de los universos más reconocibles visualmente en el entretenimiento. Los jugadores no solo juegan el juego. Traen décadas de expectativas sobre cómo se ve, suena y se siente Star Wars. La interfaz no puede ser genérica. Al mismo tiempo, UEFN impone límites técnicos reales sobre lo que la UI personalizada puede hacer dentro de Fortnite.',
      challenge:
        'Los roguelikes requieren que los jugadores interioricen el loop de partidas rápidamente: entender su estado actual, evaluar el riesgo, actuar y repetir. Esa estructura depende de retroalimentación clara y jerarquía de información predecible. El requisito del IP añade una segunda restricción: esa claridad debe entregarse a través de un lente Star Wars. El lenguaje genérico de HUD rompe la fantasía. Demasiada UI personalizada rompe las restricciones de UEFN. El problema fue construir un loop legible que se sintiera nativo al universo Star Wars.',
      role:
        'Diseñé sistemas UX/UI para orientación de partidas, retroalimentación de combate, comunicación de progresión y el flujo post-partida. Trabajé dentro de las restricciones de UEFN y colaboré con los equipos de diseño y arte para alinear la implementación con los requisitos de fidelidad al IP.',
      constraints: [
        'Requisitos del IP de Star Wars: la interfaz tenía que ser visualmente consistente con el lenguaje establecido de la franquicia',
        'Limitaciones de UEFN en posicionamiento y renderizado de UI personalizada',
        'El HUD nativo de Fortnite ocupa zonas centrales de pantalla y no puede eliminarse',
        'La estructura de partidas roguelike requiere comunicación de estado persistente sin sobrecarga cognitiva',
        'La base de jugadores es nativa de Fortnite: espera lecturas rápidas, no onboarding profundo',
      ],
      approach: [
        {
          heading: 'Lenguaje de retroalimentación fiel al IP',
          body: 'Establecí un vocabulario visual fundamentado en la iconografía de Star Wars en lugar de UI de juego genérica. Las señales de retroalimentación se derivaron de pistas establecidas de la franquicia: temperatura de color, peso tipográfico y patrones de movimiento consistentes con cómo el universo ha comunicado información en otros medios. Los jugadores podían leer el estado sin necesidad de aprender un sistema nuevo desde cero.',
        },
        {
          heading: 'Estado de partida de un vistazo',
          body: 'Diseñé una capa de estado de partida persistente que comunicaba las tres variables más críticas sin dominar la pantalla: progreso del objetivo, recursos disponibles y nivel de amenaza actual. La información fuera de esas tres era accesible bajo demanda. Esto redujo la carga cognitiva mientras mantenía a los jugadores orientados durante secuencias de combate rápidas.',
        },
        {
          heading: 'Retroalimentación de combate dentro de las restricciones de UEFN',
          body: 'Trabajé dentro de las restricciones del sistema de dispositivos UEFN para diseñar retroalimentación que se sintiera receptiva y apropiada para el IP. Me centré en temporización, posición e intensidad visual en lugar de animaciones complejas que excederían los límites de la plataforma. El resultado fue retroalimentación que se lee claramente sin requerir soluciones personalizadas que UEFN no puede soportar de manera confiable.',
        },
        {
          heading: 'Diseño de impulso post-partida',
          body: 'Diseñé la pantalla de fin de partida para hacer la progresión tangible y la re-entrada fácil. El flujo revelaba resultados, desbloqueos y próximo objetivo en secuencia, no todo a la vez. Cada beat tenía su momento antes de pasar al siguiente. La retención en roguelikes depende de que el jugador sienta impulso hacia adelante entre partidas.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Los prototipos iniciales usaban componentes UI genéricos de UEFN que comunicaban el estado del juego claramente pero se leían como completamente desconectados del universo Star Wars, debilitando la inmersión del IP en cada interacción.',
          decision: 'Reemplacé los tratamientos UI genéricos con soluciones fundamentadas en el lenguaje visual de Star Wars: asignaciones de color, jerarquía tipográfica y temporización de movimiento calibrados a los precedentes de la franquicia en lugar de los valores predeterminados de UI de juego.',
          why: 'Las experiencias de IP viven o mueren por la consistencia de tono. Un jugador dentro de Star Wars que ve una barra de salud genérica recuerda que está jugando un mini-juego de Fortnite. Un jugador que ve un lenguaje de interfaz que se siente nativo al universo se mantiene en la experiencia. El trabajo de UX es hacer las costuras invisibles.',
        },
        {
          problem: 'El fin de partida estaba causando abandono: los jugadores veían la pantalla de resultados y se iban antes de volver a entrar, lo que rompía el loop de retención roguelike.',
          decision: 'Rediseñé el flujo post-partida para liderar con el progreso logrado en lugar del resultado de la partida, y para mostrar el próximo desbloqueo u objetivo inmediatamente después. Cambié la acción primaria de "volver al lobby" a "jugar de nuevo" con el estado de recompensa visible.',
          why: 'La retención en roguelikes es un loop emocional, no una presentación de datos. Los jugadores vuelven a entrar cuando sienten impulso hacia adelante, no cuando entienden su puntuación. La pantalla necesitaba responder "qué cambia si juego de nuevo" antes de responder cualquier otra cosa.',
        },
      ],
      deliverables: [
        'Sistema UI de estado de partida y documentación de estados de componentes',
        'Guía de lenguaje de retroalimentación del IP y ejemplos de aplicación',
        'Especificaciones de temporización de retroalimentación de combate',
        'Flujo post-partida y arquitectura de información',
        'Notas de implementación UEFN y mapas de zonas de pantalla',
      ],
      outcome:
        'Star Wars: Roguelike One se lanzó dentro de Fortnite en 2026 y está activo. El rediseño del flujo post-partida, que priorizó el progreso logrado sobre el resultado de la partida y puso el próximo desbloqueo al frente, atendió el abandono observable en la pantalla de resultados. La retroalimentación de combate y el estado de partida usaron lenguaje visual propio del IP en lugar de los defaults de UEFN.\n\nMétricas específicas de engagement no están disponibles públicamente aún.',
      nextSteps:
        'Haría seguimiento de la tasa de abandono en la pantalla post-partida y la compararía con la tasa de volver a jugar entre jugadores de primera sesión y jugadores que regresan. Ese delta indica si el gancho de re-entrada está funcionando o si los jugadores están extrayendo una sola sesión de valor y saliendo. También observaría los momentos en que los jugadores mueren sin aparentemente entender por qué. Esos son los lugares donde el sistema de retroalimentación de combate todavía tiene trabajo por hacer.',
      projectSnapshot: {
        role: 'Game UX/UI Designer',
        context: 'Experiencia UEFN activa dentro de Fortnite, IP licenciado',
        platform: 'Fortnite / UEFN',
        team: 'Equipo multifuncional: diseño, arte, ingeniería',
        tools: 'Figma · UEFN · Jira · Confluence',
        mainChallenge: 'Construir legibilidad roguelike dentro de una experiencia UEFN activa mientras se mantiene el tono del IP de Star Wars en todas las decisiones de interfaz.',
        keyDeliverables: 'Sistema UI de estado de partida, guía de lenguaje de feedback del IP, especificaciones de feedback de combate, flujo post-partida, notas de implementación UEFN',
        status: 'Lanzado (activo)',
        constraints: 'Requisitos del IP de Star Wars · límites de UI en UEFN · HUD nativo de Fortnite · expectativas de jugadores nativos de Fortnite',
      },
      impact: {
        productionClarity: 'Diseñé el UX orientado al jugador alrededor de la legibilidad de combate rápido y la toma de decisiones roguelike dentro de las restricciones técnicas de UEFN.',
        playerClarity: 'Ayudé a los jugadores a entender el estado de partida, el feedback de combate y la progresión sin romper la inmersión de Star Wars. Usé lenguaje visual propio del IP en lugar de UI de juego genérica.',
        systemValue: 'Definí patrones de interfaz basados en el precedente de la franquicia que pueden apoyar comunicación consistente en distintos estados de partida, momentos de feedback y beats de progresión.',
        documentationValue: 'Documenté el lenguaje de feedback del IP, estados de componentes y notas de implementación UEFN para apoyar la alineación entre la intención de diseño y lo que ingeniería podía entregar en la plataforma.',
        implementationValue: 'El feedback de combate y el flujo post-partida se diseñaron para funcionar dentro de las restricciones del sistema de dispositivos UEFN: timing, posición e intensidad calibrados a lo que la plataforma puede soportar de forma confiable.',
        validation: 'Las métricas de engagement público no están disponibles para compartir. Este caso enfatiza la estructura UX, las restricciones de producción, la alineación con el IP y las decisiones de claridad del jugador en una experiencia activa lanzada.',
      },
      myOwnership: 'Fui responsable de los sistemas UX/UI para orientación de partidas, feedback de combate, comunicación de progresión y el flujo post-partida. Trabajé dentro de las restricciones de UEFN y colaboré con diseño y arte en la factibilidad de implementación y la alineación con el IP. Mi responsabilidad fue hacer legible el loop roguelike y consistente el tono de Star Wars. No como objetivos separados, sino como un único problema de diseño.',
      researchValidation: 'Este trabajo estuvo informado por objetivos de claridad del jugador, requisitos de fidelidad al IP y restricciones de la plataforma UEFN. Las decisiones de interfaz se validaron mediante revisión de diseño y verificaciones de alineación con el IP. El rediseño del flujo post-partida estuvo impulsado por patrones de comportamiento observados: los jugadores estaban abandonando en la pantalla de resultados, lo que indicaba que el gancho de re-entrada no estaba funcionando como se diseñó. Abordar eso requirió repensar con qué lideraba la pantalla, no solo cómo se veía.',
      implementationHandoff: 'El handoff incluyó documentación del sistema UI de estado de partida, especificaciones del lenguaje de feedback del IP, notas de timing de feedback de combate y mapas de zonas de pantalla UEFN. Como UEFN tiene restricciones reales sobre lo que la UI personalizada puede hacer de forma confiable, las notas de implementación se integraron en las especificaciones de diseño en lugar de separarse como una nota final. Cada decisión se verificó contra lo que la plataforma podía realmente soportar.',
    },
  },
];
