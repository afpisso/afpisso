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
    headline: 'Designing UX/UI Systems for a Complex VR Game',
    headlineEs: 'Diseño de sistemas UX/UI para un juego VR complejo',
    description:
      'I joined this project as UX Lead during mid-to-late production. The game had many UI needs but no shared design system. I focused on creating reusable assets, documentation, interaction patterns, and a clearer foundation so the team could design, implement, and review interface work with more consistency.',
    descriptionEs:
      'Entré al proyecto como UX Lead durante una etapa media-avanzada de producción. El juego tenía muchas necesidades de UI pero ningún sistema de diseño compartido. Me enfoqué en crear assets reutilizables, documentación, patrones de interacción y una base más clara para que el equipo pudiera diseñar, implementar y revisar trabajo de interfaz con más consistencia.',
    tags: ['UX/UI Systems', 'Product Design', 'VR Interaction', 'Design Documentation', 'UX Leadership'],
    relatedNotes: ['clean-hud-vs-clear-hud', 'feedback-reduces-guesswork', 'what-is-a-game-ui-system'],
    cta: 'View case study',
    content: {
      summary:
        'I joined this project as UX Lead during mid-to-late production. The game had UI needs across gameplay systems, progression, world interactions, accessibility and multiplayer flows, but no shared design system to guide the work. I focused on creating a UI design system, producing reusable assets, documenting key features, supporting implementation in Unreal and leading a small UX/UI team through design decisions, reviews and production needs.',
      quickFacts: {
        role: 'UX Lead',
        studio: 'Robot Entertainment',
        platform: 'Meta Quest VR',
        type: 'Published VR game',
        duration: '1 year',
        team: 'UX/UI team of 3',
        tools: 'Figma · Unreal · Jira · Confluence · Adobe Suite',
        status: 'Shipped',
        confidentiality: 'NDA-safe. Some details are simplified or omitted. The focus here is the design problem, my role and the type of decisions I helped shape.',
      },
      context:
        'This was a VR product with real platform and production constraints. The interface needed to be readable, lightweight and useful without overwhelming the player\'s field of view. It also had to support physical interaction, in-world feedback, haptic reinforcement and performance limitations specific to the Meta Quest platform.',
      challenge:
        'When I joined the project, the interface already had several needs across gameplay, progression and world interactions, but there was no unified UI design system to guide the work. That created three main risks.',
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
          asset: '/cases/orcs-must-die-by-the-blade/03-inventory-system.gif',
          assetAlt: 'Inventory UI states for a VR game showing player body placement and item status',
          assetCaption: 'Inventory states adapted to different gameplay moments, from readable inspection to compact combat use.',
        },
        {
          id: 'guide-book',
          num: '02',
          title: 'Guide Book',
          body: 'The guide book was created to communicate level objectives without adding more elements to the HUD. The solution was a diegetic book that the player could invoke during gameplay. It included primary objectives, secondary objectives and level progress in a way that felt connected to the game world.\n\nBecause it behaved as a world object, the player could interact with it, close it or throw it. The interaction used a hold action to reduce accidental triggers and make the input feel deliberate.\n\nThis feature shows how a traditional UI need can become a more spatial and diegetic solution in VR.',
          asset: '/cases/orcs-must-die-by-the-blade/04-guide-book-interaction.gif',
          assetAlt: 'Magical guide book UI used to display objectives and level progress in VR',
          assetCaption: 'A diegetic guide book used to communicate objectives without overloading the HUD.',
        },
        {
          id: 'world-interactions',
          num: '03',
          title: 'World Interactions and Diegetic Feedback',
          body: 'The game needed a clear way to communicate which objects were interactive, what state they were in and what action was required. Instead of solving this only with static UI, we created several layers of feedback working together: animated contextual tooltips for different interactable objects, highlight colors to communicate interaction states, haptic feedback as reinforcement and a visual language that supported players with visual accessibility needs.\n\nThis feature shows how multiple feedback systems can work in parallel to reduce confusion and help players understand the world without adding HUD weight.',
          asset: '/cases/orcs-must-die-by-the-blade/05-world-interactions.gif',
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
        asset: '/cases/orcs-must-die-by-the-blade/07-before-after-system-diagram.png',
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
        'The design system helped the team speed up UI asset creation, centralize documentation and reduce delivery friction across areas. Reusable assets and clear naming helped different disciplines understand requirements without extra back-and-forth. The VR-specific decisions, including the contextual interaction language and diegetic guide book, improved the player experience by keeping the interface cleaner and more connected to the world. The leadership work helped organize priorities, coordinate across disciplines and support the team through production until the game shipped.',
      whatILearned:
        'Designing for VR reinforced something I already value in UX: clarity depends on context. A decision that works on a flat screen can become heavy, uncomfortable or unclear inside a headset. In VR, the interface is not just something the player sees. It becomes part of how they move, react, understand space and make decisions. That changed how I thought about feedback, legibility and the balance between UI, world interaction and haptics. The project also reinforced how important it is to build a system foundation early in a complex production, even when the pressure is to ship individual features first.',
    },
    whatThisShows:
      'I do not approach UX/UI as isolated screens. I look for the system behind the interface: the rules, assets, states, documentation and decisions that help a team build with more clarity. In this project, the value was not only making the UI look consistent. It was creating a foundation that helped design, implementation and review move with less friction. That is the kind of product work I care about: clear systems, better decisions and interfaces that help both the user and the team.',
    whatThisShowsEs:
      'No veo UX/UI como pantallas aisladas. Busco el sistema detrás de la interfaz: las reglas, los assets, los estados, la documentación y las decisiones que ayudan a un equipo a construir con más claridad. En este proyecto, el valor no estuvo solo en hacer que la UI se viera consistente. Estuvo en crear una base que ayudó a diseño, implementación y revisión a avanzar con menos fricción. Ese es el tipo de trabajo de producto que me interesa: sistemas claros, mejores decisiones e interfaces que ayuden tanto al usuario como al equipo.',
    contentEs: {
      summary:
        'Entré al proyecto como UX Lead durante una etapa media-avanzada de producción. El juego tenía necesidades de UI en múltiples sistemas, pero no existía un sistema de diseño compartido para guiar el trabajo. Me enfoqué en crear un sistema de diseño de UI, producir assets reutilizables, documentar features clave, apoyar la implementación en Unreal y liderar un equipo pequeño de UX/UI durante decisiones, revisiones y necesidades de producción.',
      quickFacts: {
        role: 'UX Lead',
        studio: 'Robot Entertainment',
        platform: 'Meta Quest VR',
        type: 'Juego VR publicado',
        duration: '1 año',
        team: 'Equipo UX/UI de 3 personas',
        tools: 'Figma · Unreal · Jira · Confluence · Adobe Suite',
        status: 'Lanzado',
        confidentiality: 'NDA-safe. Algunos detalles se simplifican u omiten. El enfoque aquí es el problema de diseño, mi rol y el tipo de decisiones que ayudé a dar forma.',
      },
      context:
        'Este era un producto VR con restricciones reales de plataforma y producción. La interfaz debía ser legible, ligera y útil sin sobrecargar el campo de visión del jugador. También debía soportar interacción física, feedback en el mundo, refuerzo háptico y limitaciones de performance específicas de la plataforma Meta Quest.',
      challenge:
        'Cuando entré al proyecto, la interfaz ya tenía varias necesidades en gameplay, progresión e interacciones con el mundo, pero no existía un sistema de diseño de UI unificado que guiara el trabajo. Eso generaba tres riesgos principales.',
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
          body: 'Creé assets, flujos, documentación, iconografía y copy para varias features. El mayor valor estuvo en los assets reutilizables y la documentación: ayudaron al equipo a alinearse más rápido, reducir inconsistencias visuales y hacer más clara la implementación.',
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
          asset: '/cases/orcs-must-die-by-the-blade/03-inventory-system.gif',
          assetAlt: 'Estados de inventario para un juego VR mostrando ubicación en el cuerpo del jugador y estado de objetos',
          assetCaption: 'Estados de inventario adaptados a distintos momentos de gameplay, desde inspección hasta uso compacto en combate.',
        },
        {
          id: 'guide-book',
          num: '02',
          title: 'Libro Guía',
          body: 'El libro guía fue creado para comunicar objetivos de nivel sin agregar más elementos al HUD. La solución fue un libro diegético que el jugador podía invocar durante el gameplay. Incluía objetivos primarios, secundarios y progreso de nivel de manera conectada con el mundo del juego.\n\nAl comportarse como un objeto del mundo, el jugador podía interactuar con él, cerrarlo o lanzarlo. La interacción usó hold para reducir activaciones accidentales y hacer que la acción se sintiera deliberada.\n\nEsta feature muestra cómo una necesidad tradicional de UI puede convertirse en una solución más espacial y diegética en VR.',
          asset: '/cases/orcs-must-die-by-the-blade/04-guide-book-interaction.gif',
          assetAlt: 'Libro guía mágico usado para mostrar objetivos y progreso de nivel en VR',
          assetCaption: 'Un libro guía diegético usado para comunicar objetivos sin sobrecargar la HUD.',
        },
        {
          id: 'world-interactions',
          num: '03',
          title: 'Interacciones del Mundo y Feedback Diegético',
          body: 'El juego necesitaba comunicar claramente qué objetos eran interactivos, en qué estado estaban y qué acción se requería. En lugar de resolverlo solo con UI estática, creamos varias capas de feedback trabajando en conjunto: tooltips contextuales animados, highlights de color para comunicar estados, respuesta háptica como refuerzo y un lenguaje visual que apoyara necesidades de accesibilidad.\n\nEsta feature muestra cómo múltiples sistemas de feedback pueden trabajar en paralelo para reducir confusión y ayudar al jugador a entender el mundo sin agregar peso al HUD.',
          asset: '/cases/orcs-must-die-by-the-blade/05-world-interactions.gif',
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
        asset: '/cases/orcs-must-die-by-the-blade/07-before-after-system-diagram.png',
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
        'El sistema de diseño ayudó al equipo a agilizar la creación de assets de UI, centralizar la documentación y reducir fricción en los tiempos de entrega. Los assets reutilizables y la nomenclatura clara ayudaron a distintas disciplinas a entender requerimientos sin retrabajo innecesario. Las decisiones específicas para VR, incluyendo el lenguaje de interacción contextual y el libro guía diegético, mejoraron la experiencia del jugador manteniendo la interfaz más limpia y conectada al mundo. El trabajo de liderazgo ayudó a organizar prioridades, coordinar entre disciplinas y acompañar al equipo durante la producción hasta que el juego se lanzó.',
      whatILearned:
        'Diseñar para VR reforzó algo que ya valoro en UX: la claridad depende del contexto. Una decisión que funciona en una pantalla tradicional puede volverse pesada, incómoda o poco clara dentro de un headset. En VR, la interfaz no es solo algo que el jugador ve. También forma parte de cómo se mueve, reacciona, entiende el espacio y toma decisiones. Eso cambió mi manera de pensar el feedback, la legibilidad y el balance entre UI, interacción con el mundo y respuesta háptica. El proyecto también reforzó la importancia de construir una base de sistema desde antes en una producción compleja, incluso cuando la presión es lanzar features individuales primero.',
    },
  },
  {
    id: 'CASE-002',
    slug: 'zombie-dragon-adventure',
    title: 'D&D: Zombie Dragon Adventure',
    thumbnailAlt: 'D&D Zombie Dragon Adventure — UX/UI systems design case study for a UEFN adventure experience inside Fortnite',
    role: 'UX Lead',
    platform: ['Fortnite ecosystem', 'UEFN'],
    focus: 'UX/UI systems, Adventure Menu, FTUX structure, stores, UI assets, copy, accessibility pass, heuristic review, production documentation',
    focusEs: 'Sistemas UX/UI, Adventure Menu, estructura FTUX, tiendas, assets UI, copy, revisión de accesibilidad, revisión heurística, documentación de producción',
    status: 'SELECTED WORK',
    visibility: 'public',
    statusColor: 'accent',
    year: '2025',
    featured: true,
    category: 'games',
    headline: 'Designing UX/UI systems for a fast-moving UEFN adventure — structuring player flows, reusable assets and production-ready documentation for an active D&D experience inside Fortnite.',
    headlineEs: 'Diseño de sistemas UX/UI para una aventura UEFN de producción rápida — estructurando flujos de jugador, assets reutilizables y documentación lista para producción para una experiencia activa de D&D en Fortnite.',
    description:
      'A product design case about structuring player flows, reusable UI assets and production-ready documentation for an active D&D experience in Fortnite. The work covered UX/UI systems, Adventure Menu, FTUX, stores and implementation handoff.',
    descriptionEs:
      'Un caso de diseño de producto sobre la estructuración de flujos, assets reutilizables y documentación lista para producción en una experiencia activa de D&D dentro de Fortnite. El trabajo incluyó sistemas UX/UI, Adventure Menu, FTUX, tiendas y handoff de implementación.',
    tags: ['Product Design', 'UX/UI Systems', 'UEFN', 'Player Onboarding', 'Information Architecture', 'Design Documentation', 'UX Leadership'],
    relatedNotes: ['uefn-ux-lessons', 'game-accessibility-checklist', 'feedback-reduces-guesswork'],
    cta: 'View D&D: Zombie Dragon Adventure case',
    heroVideoSrc: '/cases/zombie-dragon-adventure/01-hero-gameplay.mp4',
    trailerSrc: '/cases/zombie-dragon-adventure/zombie-dragon-adventure-Trailer.mp4',
    content: {
      summary:
        'D&D Zombie Dragon Adventure is an active UEFN experience built for the Fortnite ecosystem. I worked on the project as UX Lead during a 4-month production window, leading the UX/UI process with a team of three designers including myself. The challenge was not only creating screens for a UEFN game. It was helping players understand a complex adventure loop through clearer onboarding, reusable UI assets, structured flows and production-ready documentation. The experience combined a roguelike loop, class selection, lobby progression, stores, upgrades, D20 events, missions, inventory, stats, map systems and a final Dracolich boss encounter. The UX/UI work needed to bring clarity to that complexity while respecting the technical limitations of UEFN and the visual expectations of a recognizable IP.',
      quickFacts: {
        role: 'UX Lead',
        platform: 'Fortnite ecosystem, UEFN',
        team: 'UX/UI team of 3',
        duration: '4 months',
        tools: 'Figma, UEFN, Jira, Confluence, Adobe Suite',
        status: 'Active (shipped)',
        confidentiality: 'Selected details shared. Some assets are NDA-restricted.',
      },
      context:
        'This was a fast-moving UEFN project with real production and platform constraints. The project had a broad scope, a short production window and several implementation dependencies across teams. Because the experience also belonged to a recognizable IP, UI decisions needed to support both player clarity and production alignment. One of the main challenges was keeping the UX/UI work structured enough to move forward even when implementation time became compressed.',
      challenge:
        'The main challenge was keeping the UX/UI work structured enough to support a complex experience inside UEFN. The player needed to understand what to do, how to progress, how to improve their character and how the different systems connected. At the same time, the team needed clear documentation, reusable assets and implementation-ready deliverables to keep production moving.',
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
        asset: '/cases/zombie-dragon-adventure/07-player-loop-diagram.png',
        assetAlt: 'D&D Zombie Dragon Adventure player experience loop diagram',
        assetCaption: 'Player experience loop: from lobby to Dracolich — roguelike structure across sessions.',
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
          decision: 'Designed the Adventure Book as a centralized menu system where players could consult all progression information in one place — stats, inventory, missions, achievements and map.',
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
          asset: '/cases/zombie-dragon-adventure/02-ftux-flow.jpg',
          assetAlt: 'D&D Zombie Dragon Adventure FTUX flow and adventurer guidance onboarding screens',
          assetCaption: 'FTUX flow: staged onboarding for new players entering the adventure.',
        },
        {
          id: 'adventure-menu',
          num: '02',
          title: 'Adventure Menu and Player Progression',
          body: 'The Adventure Book was designed as a system of screens where the player could consult progress and information when needed. The system included sections for stats, inventory, missions, achievements and map. The UX/UI work covered the full flow, information architecture, screen design, UI assets and documentation. This feature is important because it shows both concept and execution: how information was organized, how screens were structured and how progression was made easier to read.',
          asset: '/cases/zombie-dragon-adventure/03-adventure-menu.png',
          assetAlt: 'D&D Zombie Dragon Adventure Adventure Book and player progression screens',
          assetCaption: 'Adventure Book: screen system for player progression, stats, inventory and missions.',
        },
        {
          id: 'stores',
          num: '03',
          title: 'Stores and Camp Upgrade System',
          body: 'The stores supported the progression layer of the experience. Players could buy stat upgrades, improve what rewards they could get from chests, interact with different shop systems and evolve parts of the camp. The UX work focused on defining the flow for each store, documenting the upgrade logic and supporting visual coordination with the art team. This feature shows how complex economy and progression systems can be simplified for players through clearer flows, reusable UI assets and structured documentation.',
          asset: '/cases/zombie-dragon-adventure/04-store-system.png',
          assetAlt: 'D&D Zombie Dragon Adventure store system and camp upgrades UI screens',
          assetCaption: 'Store system: shop UI and camp upgrade flows with reusable asset components.',
        },
      ],
      beforeAfter: {
        context: 'The UX/UI work focused on giving structure to a complex experience — shifting from scattered systems toward a clear, documented, player-readable architecture.',
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
        asset: '/cases/zombie-dragon-adventure/08-before-after-system-diagram.png',
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
        'The system helped the team move faster and maintain consistency across the UI elements of the project. The documentation improved communication between different areas, registered features more clearly and created templates that could support future work. The FTUX improved the clarity and communication of multiple systems for new players. The UI decisions helped preserve the fantasy of the experience while making different systems easier to understand. The optimization of assets helped protect performance. The UX work helped unblock player friction, improve quality-of-life decisions and bring more consistency to the experience.',
      playtests:
        'The project included playtests and internal feedback sessions. Those sessions helped identify navigation issues, critical experience bugs and moments where some features created more friction than value. Some features were removed or reduced because they added complexity without enough player value. The UX review also detected issues around system complexity, economy balance, accessibility and clarity for the target audience. Not every issue could be fully addressed within the production window, but those findings became important learnings for future projects.',
      whatILearned:
        'This project reinforced that production constraints are part of the design problem. A good UX direction needs to work inside the real conditions of the product: platform limits, IP requirements, implementation dependencies, performance needs and time. It also reinforced the importance of reducing complexity early. Some features can be interesting on paper but create more friction than value for the target player. Good product work is not only about adding systems. Sometimes it is about deciding what should be simplified, reduced or removed so the experience becomes clearer.',
    },
    whatThisShows:
      'I do not see UX/UI as isolated screens. I look at how the player understands the product, how the team builds it and where friction appears between design intent and implementation. In this project, the value of UX was not only in the final visuals. It was in the structure behind them: flows, documentation, reusable assets, naming, constraints and decisions that helped production move with more clarity. That is the kind of work I care about: useful systems, clear decisions and design that helps both the player and the team.',
    whatThisShowsEs:
      'No veo UX/UI como pantallas aisladas. Miro cómo el jugador entiende el producto, cómo el equipo lo construye y dónde aparece fricción entre intención de diseño e implementación. En este proyecto, el valor de UX no estuvo solo en los visuales finales. Estuvo en la estructura detrás de ellos: flujos, documentación, assets reutilizables, nomenclatura, restricciones y decisiones que ayudaron a que la producción avanzara con más claridad. Ese es el tipo de trabajo que me interesa: sistemas útiles, decisiones claras y diseño que ayude tanto al jugador como al equipo.',
    contentEs: {
      summary:
        'D&D Zombie Dragon Adventure es una experiencia activa creada en UEFN para el ecosistema de Fortnite. Trabajé en el proyecto como UX Lead durante una ventana de producción de 4 meses, liderando el proceso UX/UI con un equipo de tres diseñadores incluyéndome. El reto no era solo diseñar pantallas para una experiencia en UEFN. Era ayudar al jugador a entender un loop de aventura complejo mediante onboarding claro, assets reutilizables, flujos estructurados y documentación lista para producción. La experiencia combinaba un loop roguelike, selección de clase, progresión en lobby, tiendas, mejoras, eventos D20, misiones, inventario, stats, mapa y una batalla final contra un Dracolich. El trabajo UX/UI debía darle claridad a esa complejidad respetando las limitaciones técnicas de UEFN y las expectativas visuales de una IP reconocible.',
      quickFacts: {
        role: 'UX Lead',
        platform: 'Ecosistema Fortnite, UEFN',
        team: 'Equipo UX/UI de 3 personas',
        duration: '4 meses',
        tools: 'Figma, UEFN, Jira, Confluence, Adobe Suite',
        status: 'Activo (lanzado)',
        confidentiality: 'Detalles seleccionados compartidos. Algunos assets son de uso restringido.',
      },
      context:
        'Este fue un proyecto UEFN con movimiento rápido y restricciones reales de producción y plataforma. El proyecto tenía un alcance amplio, una ventana corta de producción y varias dependencias de implementación entre equipos. Como la experiencia también pertenecía a una IP reconocible, las decisiones de UI debían soportar tanto la claridad del jugador como la alineación de producción. Uno de los principales retos fue mantener el trabajo UX/UI lo suficientemente estructurado para avanzar incluso cuando los tiempos de implementación se comprimieron.',
      challenge:
        'El reto principal era mantener el trabajo UX/UI lo suficientemente estructurado para soportar una experiencia compleja dentro de UEFN. El jugador necesitaba entender qué hacer, cómo progresar, cómo mejorar su personaje y cómo se conectaban los distintos sistemas. Al mismo tiempo, el equipo necesitaba documentación clara, assets reutilizables y entregables listos para implementación para mantener la producción avanzando.',
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
        asset: '/cases/zombie-dragon-adventure/07-player-loop-diagram.png',
        assetAlt: 'Diagrama del loop de experiencia del jugador en D&D Zombie Dragon Adventure',
        assetCaption: 'Loop de experiencia del jugador: del lobby al Dracolich — estructura roguelike entre sesiones.',
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
          body: 'Uno de los sistemas principales fue el Adventure Book, una estructura de menús donde el jugador podía consultar información de progresión cuando la necesitara. Incluía secciones como stats, inventario, misiones, logros y mapa. No todas las secciones permanecieron visibles en la versión live por tiempos de producción, pero el sistema ayudó a definir la arquitectura de información y la dirección UI para la progresión del jugador.',
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
          asset: '/cases/zombie-dragon-adventure/02-ftux-flow.jpg',
          assetAlt: 'Flujo FTUX y sistema de guía del aventurero en D&D Zombie Dragon Adventure',
          assetCaption: 'Flujo FTUX: onboarding por etapas para nuevos jugadores entrando a la aventura.',
        },
        {
          id: 'adventure-menu',
          num: '02',
          title: 'Adventure Menu y progresión del jugador',
          body: 'El Adventure Book fue diseñado como un sistema de pantallas donde el jugador podía consultar progreso e información cuando lo necesitara. El sistema incluía secciones como stats, inventario, misiones, logros y mapa. El trabajo UX/UI incluyó flujo, arquitectura de información, diseño de pantallas, assets UI y documentación. Esta feature es importante porque muestra concepto y ejecución: cómo se organizó la información, cómo se estructuraron las pantallas y cómo se hizo más legible la progresión.',
          asset: '/cases/zombie-dragon-adventure/03-adventure-menu.png',
          assetAlt: 'Adventure Book y pantallas de progresión del jugador en D&D Zombie Dragon Adventure',
          assetCaption: 'Adventure Book: sistema de pantallas para progresión del jugador, stats, inventario y misiones.',
        },
        {
          id: 'stores',
          num: '03',
          title: 'Tiendas y sistema de mejoras del campamento',
          body: 'Las tiendas soportaban la capa de progresión de la experiencia. El jugador podía comprar mejoras de stats, mejorar los premios que podía recibir de cofres, interactuar con distintos sistemas de tienda y evolucionar partes del campamento. El trabajo UX se enfocó en definir el flujo de cada tienda, documentar la lógica de mejoras y apoyar la coordinación visual con el equipo de arte. Esta feature muestra cómo sistemas complejos de economía y progresión pueden simplificarse para el jugador mediante flujos claros, assets reutilizables y documentación estructurada.',
          asset: '/cases/zombie-dragon-adventure/04-store-system.png',
          assetAlt: 'Sistema de tiendas y mejoras del campamento en D&D Zombie Dragon Adventure',
          assetCaption: 'Sistema de tiendas: UI de shop y flujos de mejoras del campamento con componentes reutilizables.',
        },
      ],
      beforeAfter: {
        context: 'El trabajo UX/UI se enfocó en darle estructura a una experiencia compleja — pasando de sistemas dispersos a una arquitectura clara, documentada y legible para el jugador.',
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
        asset: '/cases/zombie-dragon-adventure/08-before-after-system-diagram.png',
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
        'El sistema ayudó al equipo a agilizar procesos y mantener consistencia en todos los elementos de UI del proyecto. La documentación permitió comunicarse con más claridad entre distintas áreas, registrar features y crear templates para futuros proyectos. El FTUX mejoró la claridad y comunicación de los múltiples sistemas para jugadores nuevos. Las decisiones de UI ayudaron al jugador a mantener la fantasía de la experiencia y entender mejor los distintos sistemas del juego. La optimización de assets ayudó a proteger la performance. El trabajo UX ayudó a desbloquear fricción del jugador en distintos momentos, mejorar decisiones de calidad de vida y darle más consistencia a la experiencia.',
      playtests:
        'El proyecto incluyó playtests y feedback interno. Esas sesiones ayudaron a identificar problemas de navegación, bugs críticos de experiencia y momentos donde algunas features generaban más fricción que valor. Algunas features fueron eliminadas o reducidas porque agregaban complejidad sin suficiente valor para el jugador. La revisión UX también detectó temas de complejidad en los sistemas, balance de economía, accesibilidad y claridad para el público objetivo. No todo pudo resolverse dentro de la ventana de producción, pero esos hallazgos se convirtieron en aprendizajes importantes para futuros proyectos.',
      whatILearned:
        'Este proyecto reforzó que las restricciones de producción hacen parte del problema de diseño. Una buena dirección UX necesita funcionar dentro de las condiciones reales del producto: límites de plataforma, requerimientos de IP, dependencias de implementación, necesidades de performance y tiempo. También reforzó la importancia de reducir complejidad temprano. Algunas features pueden sonar interesantes en papel, pero generar más fricción que valor para el jugador objetivo. El buen trabajo de producto no se trata solo de agregar sistemas. A veces se trata de decidir qué debe simplificarse, reducirse o eliminarse para que la experiencia sea más clara.',
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
    headline: 'Designing UX/UI for tension, survival, and readable decisions in a Walking Dead Universe UEFN experience.',
    headlineEs: 'Diseño de UX/UI para tensión, supervivencia y decisiones legibles en una experiencia UEFN del universo The Walking Dead.',
    description:
      'The focus was helping players understand threat, resources, actions, and survival stakes inside UEFN without losing the mood of the IP. Case details are NDA-limited to design decisions and approach.',
    descriptionEs:
      'El enfoque fue ayudar a los jugadores a entender amenazas, recursos, acciones y el riesgo de supervivencia dentro de UEFN sin perder el tono del IP. Los detalles del caso están limitados por NDA a decisiones de diseño y enfoque.',
    tags: ['NDA-Safe', 'UEFN', 'Survival UX', 'HUD Design', 'Feedback Systems'],
    relatedNotes: ['clean-hud-vs-clear-hud', 'feedback-reduces-guesswork', 'what-is-a-game-ui-system'],
    cta: 'View The Walking Dead: Courtyard King case',
    content: {
      summary:
        'The Walking Dead: Courtyard King is a Walking Dead Universe experience built in UEFN inside Fortnite. My work focused on interface logic for threat communication, resource readability, and survival feedback — keeping the IP\'s tension intact while working within Fortnite\'s constraints. Some details are intentionally simplified because of confidentiality. The focus here is the design problem, my role, and the type of decisions I helped shape.',
      quickFacts: {
        role: 'UX/UI Designer',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'In production / NDA',
        confidentiality: 'NDA-safe breakdown. Some details are intentionally redacted. Visual assets not available for public sharing.',
      },
      context:
        'The Walking Dead: Courtyard King brings the Walking Dead Universe into Fortnite via UEFN. Building a survival experience under an established IP creates a dual responsibility: honor the franchise\'s emotional tone (scarcity, tension, danger) while respecting Fortnite\'s existing HUD and UEFN\'s technical constraints. Players arrive as Fortnite-native users who may have no prior context for The Walking Dead.',
      challenge:
        'UEFN imposes real constraints on custom UI: Fortnite\'s native HUD is always visible, font choices are limited, and players arrive without onboarding. On top of that, a Walking Dead experience demands atmosphere preservation. Too much UI and the world loses its danger. Too little and players make uninformed decisions that frustrate rather than challenge. The problem was keeping survival information readable while working inside both the IP tone and the platform constraints.',
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
        'Work contributed to the project\'s UX framework. Specific outcome metrics are not available for public sharing due to NDA.',
      nextSteps:
        'Survival UX benefits from playtest data focused on moments of player confusion versus intended tension. I would want to distinguish between "confused and frustrated" and "tense and engaged" in session observations, then use that to calibrate exactly how much information the interface needs to surface.',
    },
    whatThisShows:
      'This project shows how I approach interface design under NDA constraints and inside a platform with hard limits. The design problem is real and transferable: survival UX requires communicating urgency without generating anxiety, and building within UEFN means solving both the IP fidelity and the platform constraint at the same time. The same challenge exists in any interface where tone, technical limits, and user clarity all have to coexist.',
    whatThisShowsEs:
      'Este proyecto muestra cómo abordo el diseño de interfaz bajo restricciones de NDA y dentro de una plataforma con límites duros. El problema de diseño es real y transferible: el UX de supervivencia requiere comunicar urgencia sin generar ansiedad, y construir dentro de UEFN significa resolver tanto la fidelidad al IP como la restricción de plataforma al mismo tiempo. El mismo desafío existe en cualquier interfaz donde el tono, los límites técnicos y la claridad del usuario tienen que coexistir.',
    contentEs: {
      summary:
        'The Walking Dead: Courtyard King es una experiencia del universo The Walking Dead construida en UEFN dentro de Fortnite. Mi trabajo se centró en la lógica de interfaz para comunicación de amenazas, legibilidad de recursos y retroalimentación de supervivencia — manteniendo la tensión del IP intacta mientras se trabajaba dentro de las restricciones de Fortnite. Algunos detalles se simplifican intencionalmente por confidencialidad. El enfoque aquí es el problema de diseño, mi rol y el tipo de decisiones que ayudé a dar forma.',
      quickFacts: {
        role: 'UX/UI Designer',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'En producción / NDA',
        confidentiality: 'Análisis NDA-safe. Algunos detalles se omiten intencionalmente. Assets visuales no disponibles para compartir públicamente.',
      },
      context:
        'The Walking Dead: Courtyard King lleva el universo The Walking Dead a Fortnite a través de UEFN. Construir una experiencia de supervivencia bajo un IP establecido crea una doble responsabilidad: honrar el tono emocional de la franquicia (escasez, tensión, peligro) mientras se respetan el HUD existente de Fortnite y las restricciones técnicas de UEFN. Los jugadores llegan como usuarios nativos de Fortnite que pueden no tener contexto previo de The Walking Dead.',
      challenge:
        'UEFN impone restricciones reales en la UI personalizada: el HUD nativo de Fortnite siempre está visible, las opciones de fuente son limitadas y los jugadores llegan sin onboarding. Además, una experiencia de The Walking Dead exige preservar la atmósfera. Demasiada UI y el mundo pierde su peligro. Muy poca y los jugadores toman decisiones desinformadas que frustran en lugar de desafiar. El problema fue mantener la información de supervivencia legible mientras se trabajaba dentro del tono del IP y las restricciones de la plataforma.',
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
        'El trabajo contribuyó al marco UX del proyecto. Las métricas de resultado específicas no están disponibles para compartir públicamente debido al NDA.',
      nextSteps:
        'El UX de supervivencia se beneficia de datos de prueba de usuario enfocados en momentos de confusión versus tensión intencional. Querría distinguir entre "confundido y frustrado" y "tenso y comprometido" en observaciones de sesión, luego usar eso para calibrar exactamente cuánta información necesita mostrar la interfaz.',
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
    headline: 'Designing the UX/UI layer for a heist roguelike inside the Havoc Hotel universe.',
    headlineEs: 'Diseño de la capa UX/UI para un roguelike de atraco en el universo de Havoc Hotel.',
    description:
      'My priority was making the risk, reward, and progression loop readable from run to run. The interface needed to support fast decisions, clear rewards, and repeated play.',
    descriptionEs:
      'Mi prioridad fue hacer que el loop de riesgo, recompensa y progresión fuera legible de partida en partida. La interfaz necesitaba soportar decisiones rápidas, recompensas claras y juego repetido.',
    tags: ['UEFN', 'Roguelike', 'Heist', 'Progression', 'Reward Clarity'],
    relatedNotes: ['uefn-ux-lessons', 'feedback-reduces-guesswork', 'clean-hud-vs-clear-hud'],
    cta: 'View Raptor Heist case',
    content: {
      summary:
        'Raptor Heist is a heist roguelike built in UEFN inside the Havoc Hotel franchise. My focus was UX/UI systems for orientation, rewards, progression, and pacing across repeatable runs.',
      quickFacts: {
        role: 'Game UX/UI Designer',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'Shipped',
        confidentiality: 'Selected details shared.',
      },
      context:
        'Roguelike experiences depend on a specific kind of player understanding: each run must feel readable enough that the player can make meaningful decisions, but varied enough that repeated play is still worth it. Inside UEFN, building this kind of run-by-run legibility requires clear UX/UI hierarchy for risk, reward, and progression state.',
      challenge:
        'Heist games add a layer of planning and timing on top of the run structure. Players need to understand their objective, their resources, their current risk level, and available exits at each decision point. Too much information slows the heist momentum. Too little and players make blind decisions that break the fantasy of being a skilled thief.',
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
        'Raptor Heist shipped inside Fortnite. The alert escalation system was cited in team reviews as a key clarity improvement over the initial prototype. The post-run flow structure was carried forward into subsequent experiences in the franchise.',
      nextSteps:
        'I would instrument the exact moment players trigger detection versus the moment they first see the alert signal, and look at whether players who see the proactive signal respond differently than those who miss it. Run-length data would tell us whether earlier alert awareness changes player strategy in a meaningful way.',
    },
    whatThisShows:
      'This project shows how I design repeatable systems that stay clear across many sessions. Roguelikes require players to re-evaluate risk and reward in every run. An interface that feels readable on run one needs to stay fast and unambiguous on run twenty. The same challenge appears in any product with loops: onboarding flows, dashboards, notifications, or any feature a user returns to repeatedly.',
    whatThisShowsEs:
      'Este proyecto muestra cómo diseño sistemas repetibles que permanecen claros a lo largo de muchas sesiones. Los roguelikes requieren que los jugadores reevalúen riesgo y recompensa en cada partida. Una interfaz que se siente legible en la partida uno necesita mantenerse rápida y sin ambigüedad en la partida veinte. El mismo desafío aparece en cualquier producto con loops: flujos de onboarding, dashboards, notificaciones, o cualquier función a la que un usuario regresa repetidamente.',
    contentEs: {
      summary:
        'Raptor Heist es un roguelike de atraco construido en UEFN dentro de la franquicia Havoc Hotel. Mi enfoque fue en sistemas UX/UI para orientación, recompensas, progresión y ritmo a través de partidas repetibles.',
      quickFacts: {
        role: 'Game UX/UI Designer',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'Lanzado',
        confidentiality: 'Detalles seleccionados compartidos.',
      },
      context:
        'Las experiencias roguelike dependen de un tipo específico de comprensión del jugador: cada partida debe ser suficientemente legible para que el jugador tome decisiones significativas, pero lo suficientemente variada para que jugar de nuevo valga la pena. Dentro de UEFN, construir este tipo de legibilidad partida a partida requiere jerarquía clara de UX/UI para el estado de riesgo, recompensa y progresión.',
      challenge:
        'Los juegos de atraco añaden una capa de planificación y temporización encima de la estructura de partidas. Los jugadores necesitan entender su objetivo, sus recursos, su nivel de riesgo actual y las salidas disponibles en cada punto de decisión. Demasiada información ralentiza el impulso del atraco. Muy poca y los jugadores toman decisiones ciegas que rompen la fantasía de ser un ladrón habilidoso.',
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
    visibility: 'public',
    statusColor: 'accent',
    year: '2025',
    featured: true,
    category: 'games',
    headline: 'Designing UX/UI systems for a co-op roguelike franchise in Fortnite focused on progression, readability, and replayability.',
    headlineEs: 'Diseño de sistemas UX/UI para una franquicia roguelike cooperativo en Fortnite centrada en progresión, legibilidad y rejugabilidad.',
    description:
      'The work focused on clarifying rewards, upgrades, difficulty scaling, and player choices across fast, repeatable runs inside the Havoc Hotel franchise.',
    descriptionEs:
      'El trabajo se centró en clarificar recompensas, mejoras, escalado de dificultad y elecciones del jugador en partidas rápidas y repetibles dentro de la franquicia Havoc Hotel.',
    tags: ['UEFN', 'Co-op', 'Roguelike', 'Reward Systems', 'Progression'],
    relatedNotes: ['uefn-ux-lessons', 'what-is-a-game-ui-system', 'feedback-reduces-guesswork'],
    cta: 'View Havoc Hotel 3 case',
    content: {
      summary:
        'Havoc Hotel 3 is part of a co-op roguelike franchise built in UEFN. My work focused on interface systems for visible economy, reward clarity, combat readability, and replayability across the franchise.',
      quickFacts: {
        role: 'UX/UI Systems Designer',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'Shipped (franchise, multiple releases)',
        confidentiality: 'Selected details shared.',
      },
      context:
        'Havoc Hotel is a franchise with multiple releases inside Fortnite. The co-op roguelike format creates a specific UX/UI challenge: the interface must serve individual players and cooperative groups simultaneously, communicate progression across runs, and stay readable during fast combat without creating information overload.',
      challenge:
        'Co-op roguelikes have a player attention split problem. Each player manages their own resources, decisions, and position while also tracking group objectives and teammate state. This creates two competing UI requirements: individual clarity and group awareness. Solving one at the expense of the other breaks either the personal loop or the cooperative layer.',
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
        'Multiple Havoc Hotel releases shipped inside Fortnite. The franchise UI component library reduced design-to-implementation time on subsequent releases. The co-op state communication system received positive feedback in community playtests, with players specifically citing clarity of group state as a strength.',
      nextSteps:
        'Long-term franchise UX work benefits from cross-release player behavior analysis. I would want to understand how players who have played multiple releases navigate the UI versus first-time players, and whether the component library is creating meaningful consistency from the player\'s perspective.',
    },
    whatThisShows:
      'This project shows how I design UI systems for shared states in co-op contexts. Each player needs individual clarity plus awareness of team state, without either interfering with the other. Solving that without visual noise is a systems problem more than a visual one. The same thinking applies to any collaborative tool or multi-user product where shared context matters.',
    whatThisShowsEs:
      'Este proyecto muestra cómo diseño sistemas de UI para estados compartidos en contextos cooperativos. Cada jugador necesita claridad individual más consciencia del estado del equipo, sin que ninguno interfiera con el otro. Resolver eso sin ruido visual es un problema de sistemas más que visual. El mismo pensamiento aplica a cualquier herramienta colaborativa o producto multiusuario donde el contexto compartido importa.',
    contentEs: {
      summary:
        'Havoc Hotel 3 es parte de una franquicia roguelike cooperativo construida en UEFN. Mi trabajo se centró en sistemas de interfaz para economía visible, claridad de recompensas, legibilidad de combate y rejugabilidad a través de la franquicia.',
      quickFacts: {
        role: 'UX/UI Systems Designer',
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
        'Múltiples lanzamientos de Havoc Hotel se publicaron dentro de Fortnite. La biblioteca de componentes de UI de la franquicia redujo el tiempo de diseño a implementación en los lanzamientos posteriores. El sistema de comunicación de estado cooperativo recibió retroalimentación positiva en las pruebas de usuario de la comunidad, con los jugadores citando específicamente la claridad del estado del grupo como una fortaleza.',
      nextSteps:
        'El trabajo de UX de franquicia a largo plazo se beneficia del análisis de comportamiento del jugador entre lanzamientos. Querría entender cómo los jugadores que han jugado múltiples lanzamientos navegan la UI versus los jugadores por primera vez, y si la biblioteca de componentes está creando consistencia significativa desde la perspectiva del jugador.',
    },
  },
  {
    id: 'CASE-006',
    slug: 'zomvilles',
    title: 'Zomvilles',
    thumbnailAlt: 'Zomvilles — mobile city-builder game design and UX case study',
    role: 'Lead Game Designer',
    platform: ['Mobile'],
    focus: 'Game systems, progression architecture, UX flows, wireframes, documentation',
    focusEs: 'Sistemas de juego, arquitectura de progresión, flujos UX, wireframes, documentación',
    status: 'LEGACY',
    visibility: 'legacy',
    statusColor: 'default',
    year: '2024',
    featured: false,
    category: 'games',
    headline: 'Leading game and UX design for a mobile city-builder with zombie survival mechanics.',
    headlineEs: 'Liderazgo de diseño de juego y UX para un constructor de ciudades móvil con mecánicas de supervivencia zombie.',
    description:
      'Full design lead on Zomvilles for Pixiemeta. Responsible for game systems, progression loops, UX flows, wireframes, and design documentation across the development cycle.',
    descriptionEs:
      'Lead de diseño en Zomvilles para Pixiemeta. Responsable de sistemas de juego, loops de progresión, flujos UX, wireframes y documentación de diseño a lo largo del ciclo de desarrollo.',
    tags: ['Mobile', 'Game Design', 'Progression', 'City Builder', 'UX Flows'],
    relatedNotes: ['feedback-reduces-guesswork', 'player-decision-making-ux'],
    cta: 'View Zomvilles case',
    content: {
      summary:
        'Zomvilles is a mobile city-builder with zombie survival mechanics developed by Pixiemeta. As Lead Game Designer, I was responsible for the full design scope: game systems architecture, progression loops, UX flows, wireframes, and documentation handed to development.',
      quickFacts: {
        role: 'Lead Game Designer',
        studio: 'Pixiemeta',
        platform: 'Mobile',
        status: 'Shipped',
        confidentiality: 'Legacy project shared as part of career history. Some assets are no longer available.',
      },
      context:
        'Zomvilles combined city-building resource management with zombie survival pressure. Players built and defended settlements while managing resource scarcity and threat cycles. The design challenge was keeping the city-building loop engaging without the threat mechanic becoming overwhelming, and ensuring progression felt meaningful across sessions.',
      challenge:
        'Mobile city-builders require session-length design: players return at different intervals, and the game needs to feel like something meaningful happened while they were away. Adding survival pressure to that format creates a tension between the slow satisfaction of building and the urgency of defending. Balancing those two loops without one cancelling the other was the primary systems design problem.',
      role:
        'I owned game design end-to-end: systems design, progression architecture, UX flow documentation, and wireframes for all major player-facing interfaces. I worked closely with development to ensure what was designed was feasible within mobile production constraints.',
      constraints: [
        'Mobile session design: game had to be meaningful in 2-5 minute visits',
        'Resource-constrained production: design had to prioritize highest-impact features',
        'Retention mechanics needed to feel fair rather than exploitative',
        'Threat system had to create urgency without blocking progress',
        'New player experience had to be functional with minimal tutorial',
      ],
      approach: [
        {
          heading: 'Session rhythm design',
          body: 'Designed the core loop to reward short sessions: every visit had a clear action to take, a visible result, and a reason to return. Building queues, threat cooldowns, and resource generation rates were calibrated to 2-5 minute engagement windows.',
        },
        {
          heading: 'Progression architecture',
          body: 'Mapped the full progression path from new player to late game, identifying every decision point where the player chose between expansion and defense. Documented transition moments where the threat model changed and the player needed new information to adapt.',
        },
        {
          heading: 'UX flow documentation',
          body: 'Created wireframes and flow documentation for all major interfaces: base management, threat response, resource allocation, and progression milestones. Documentation was structured for direct handoff to development, with state definitions and edge case coverage.',
        },
        {
          heading: 'Threat pressure calibration',
          body: 'Worked iteratively on the threat cycle timing to find the balance where players felt urgency without feeling helpless. Early builds made threats too frequent and eroded the building satisfaction. Later iterations found a rhythm where the threat created anticipation rather than dread.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Early builds showed players focusing exclusively on defense and ignoring the city-building loop, because threats felt too immediate and punishing.',
          decision: 'Restructured the threat cycle to give players a clear preparation window before escalation. Added visible countdown indicators so players could make deliberate build decisions during calm phases.',
          why: 'Players make better decisions when they have time to decide. Unpredictable threats create anxiety, not engagement. A predictable cycle creates planning opportunities, which is what city-builders are built around.',
        },
        {
          problem: 'New players were not understanding the resource dependency chain, leading to dead ends where they could not progress without knowing why.',
          decision: 'Redesigned early progression to surface one dependency at a time, with contextual prompts that appeared only when a player reached a block rather than front-loading tutorial content.',
          why: 'Progressive disclosure works better than comprehensive tutorials in mobile games. Players learn by doing. Surface the information when the player needs it, not before.',
        },
      ],
      deliverables: [
        'Full game design document (GDD)',
        'Progression path architecture and milestone map',
        'UX flow wireframes for all major interfaces',
        'Threat system design and calibration documentation',
        'State definitions for all player-facing UI elements',
        'Resource balance spreadsheets',
      ],
      outcome:
        'Zomvilles shipped on mobile. The progression architecture established during this project supported the full release content. The session rhythm design held across multiple content updates.',
      nextSteps:
        'Mobile city-builders benefit from retention data beyond D1/D7/D30 — specifically session frequency distribution and where players stall in the progression path. I would want to identify the exact moment where the city-building and survival loops either reinforce or work against each other, and use that to inform future balancing.',
    },
    whatThisShows:
      'This project shows how I approach full-scope game design when the role requires systems thinking, UX clarity, and production-ready documentation. City-builders with survival mechanics are complex because two different player motivations (creation versus protection) have to coexist in the same session loop. Making that coexistence feel natural rather than conflicted is a systems problem with UX consequences.',
    whatThisShowsEs:
      'Este proyecto muestra cómo abordo el diseño de juego de alcance completo cuando el rol requiere pensamiento sistémico, claridad UX y documentación lista para producción. Los constructores de ciudades con mecánicas de supervivencia son complejos porque dos motivaciones de jugador distintas (creación versus protección) tienen que coexistir en el mismo loop de sesión. Hacer que esa coexistencia se sienta natural en lugar de conflictiva es un problema de sistemas con consecuencias de UX.',
    contentEs: {
      summary:
        'Zomvilles es un constructor de ciudades móvil con mecánicas de supervivencia zombie desarrollado por Pixiemeta. Como Lead Game Designer, fui responsable del alcance de diseño completo: arquitectura de sistemas de juego, loops de progresión, flujos UX, wireframes y documentación entregada al equipo de desarrollo.',
      quickFacts: {
        role: 'Lead Game Designer',
        studio: 'Pixiemeta',
        platform: 'Mobile',
        status: 'Lanzado',
        confidentiality: 'Proyecto legacy compartido como parte de la historia profesional. Algunos assets ya no están disponibles.',
      },
      context:
        'Zomvilles combinaba la gestión de recursos de los constructores de ciudades con la presión de supervivencia zombie. Los jugadores construían y defendían asentamientos mientras gestionaban la escasez de recursos y los ciclos de amenazas. El desafío de diseño fue mantener el loop de construcción de ciudades atractivo sin que la mecánica de amenaza se volviera abrumadora, y asegurar que la progresión se sintiera significativa entre sesiones.',
      challenge:
        'Los constructores de ciudades móviles requieren diseño de duración de sesión: los jugadores regresan en intervalos distintos y el juego necesita sentirse como que algo significativo sucedió mientras estaban ausentes. Añadir presión de supervivencia a ese formato crea una tensión entre la satisfacción lenta de construir y la urgencia de defender. Equilibrar esos dos loops sin que uno cancele al otro fue el problema principal de diseño de sistemas.',
      role:
        'Tuve a cargo el diseño de juego de principio a fin: diseño de sistemas, arquitectura de progresión, documentación de flujos UX y wireframes para todas las interfaces principales orientadas al jugador. Trabajé estrechamente con el equipo de desarrollo para asegurar que lo diseñado fuera factible dentro de las restricciones de producción móvil.',
      constraints: [
        'Diseño de sesión móvil: el juego tenía que ser significativo en visitas de 2 a 5 minutos',
        'Producción con recursos limitados: el diseño tenía que priorizar las funciones de mayor impacto',
        'Las mecánicas de retención debían sentirse justas en lugar de exploradoras',
        'El sistema de amenazas tenía que crear urgencia sin bloquear el progreso',
        'La experiencia de nuevos jugadores tenía que ser funcional con tutorial mínimo',
      ],
      approach: [
        {
          heading: 'Diseño del ritmo de sesión',
          body: 'Diseñé el loop central para recompensar sesiones cortas: cada visita tenía una acción clara que realizar, un resultado visible y una razón para volver. Las colas de construcción, los tiempos de recuperación de amenazas y las tasas de generación de recursos se calibraron para ventanas de engagement de 2 a 5 minutos.',
        },
        {
          heading: 'Arquitectura de progresión',
          body: 'Mapeé el camino de progresión completo desde el nuevo jugador hasta el juego avanzado, identificando cada punto de decisión donde el jugador elegía entre expansión y defensa. Documenté los momentos de transición donde el modelo de amenaza cambiaba y el jugador necesitaba nueva información para adaptarse.',
        },
        {
          heading: 'Documentación de flujos UX',
          body: 'Creé wireframes y documentación de flujos para todas las interfaces principales: gestión de base, respuesta a amenazas, asignación de recursos e hitos de progresión. La documentación se estructuró para entrega directa al equipo de desarrollo, con definiciones de estado y cobertura de casos extremos.',
        },
        {
          heading: 'Calibración de la presión de amenaza',
          body: 'Trabajé iterativamente en el tiempo del ciclo de amenaza para encontrar el equilibrio donde los jugadores sintieran urgencia sin sentirse impotentes. Las primeras versiones hacían las amenazas demasiado frecuentes y erosionaban la satisfacción de construir. Las iteraciones posteriores encontraron un ritmo donde la amenaza creaba anticipación en lugar de miedo.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Las primeras versiones mostraban que los jugadores se enfocaban exclusivamente en la defensa e ignoraban el loop de construcción de ciudades, porque las amenazas se sentían demasiado inmediatas y punitivas.',
          decision: 'Reestructuré el ciclo de amenaza para dar a los jugadores una ventana de preparación clara antes de la escalada. Agregué indicadores de cuenta regresiva visibles para que los jugadores pudieran tomar decisiones de construcción deliberadas durante las fases de calma.',
          why: 'Los jugadores toman mejores decisiones cuando tienen tiempo para decidir. Las amenazas impredecibles crean ansiedad, no engagement. Un ciclo predecible crea oportunidades de planificación, que es lo que los constructores de ciudades tienen como base.',
        },
        {
          problem: 'Los nuevos jugadores no entendían la cadena de dependencia de recursos, lo que llevaba a puntos muertos donde no podían progresar sin saber por qué.',
          decision: 'Rediseñé la progresión inicial para mostrar una dependencia a la vez, con indicaciones contextuales que aparecían solo cuando un jugador llegaba a un bloqueo, en lugar de cargar el contenido del tutorial por adelantado.',
          why: 'La divulgación progresiva funciona mejor que los tutoriales completos en los juegos móviles. Los jugadores aprenden haciendo. Muestra la información cuando el jugador la necesita, no antes.',
        },
      ],
      deliverables: [
        'Documento de diseño de juego completo (GDD)',
        'Arquitectura del camino de progresión y mapa de hitos',
        'Wireframes de flujos UX para todas las interfaces principales',
        'Documentación de diseño y calibración del sistema de amenazas',
        'Definiciones de estado para todos los elementos de UI orientados al jugador',
        'Hojas de cálculo de balance de recursos',
      ],
      outcome:
        'Zomvilles se lanzó en mobile. La arquitectura de progresión establecida durante este proyecto soportó el contenido completo del lanzamiento. El diseño del ritmo de sesión se mantuvo a través de múltiples actualizaciones de contenido.',
      nextSteps:
        'Los constructores de ciudades móviles se benefician de datos de retención más allá de D1/D7/D30, específicamente la distribución de frecuencia de sesión y dónde se detienen los jugadores en el camino de progresión. Querría identificar el momento exacto donde los loops de construcción de ciudades y supervivencia se refuerzan o trabajan en contra entre sí, y usar eso para informar el balanceo futuro.',
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
    status: 'LEGACY — AWARD',
    visibility: 'legacy',
    statusColor: 'default',
    year: null,
    featured: false,
    category: 'games',
    headline: 'Designing an educational web game for Diversoft that earned industry recognition.',
    headlineEs: 'Diseño de un juego web educativo para Diversoft que obtuvo reconocimiento de la industria.',
    description:
      'Game design and UX/UI work for Kodety, an educational web game by Diversoft. The project received an industry award. Focus: game mechanics, interaction design, user flows, and visual interface.',
    descriptionEs:
      'Diseño de juego y UX/UI para Kodety, un juego web educativo de Diversoft. El proyecto recibió un premio de la industria. Enfoque: mecánicas de juego, diseño de interacción, flujos de usuario e interfaz visual.',
    tags: ['Web', 'Educational', 'Game Design', 'UX/UI', 'Award'],
    relatedNotes: ['player-decision-making-ux', 'feedback-reduces-guesswork'],
    cta: 'View Kodety case',
    content: {
      summary:
        'Kodety is an educational web game developed by Diversoft. My work covered game design and UX/UI: mechanics definition, interaction flows, visual interface design, and the overall player experience. The project received industry recognition for its design approach.',
      quickFacts: {
        role: 'Game Designer / UX/UI',
        studio: 'Diversoft',
        platform: 'Web',
        status: 'Shipped / Award',
        confidentiality: 'Legacy project shared as part of career history.',
      },
      context:
        'Educational games carry a design tension that most entertainment games do not: the learning objective and the play objective have to feel like the same thing to the player. If the player perceives the educational content as separate from the fun, engagement collapses. For a web-based platform, this challenge was compounded by the expectation of instant access and short session tolerance.',
      challenge:
        'Designing game mechanics that teach without feeling like lessons. The interaction had to create genuine challenge and reward while embedding the educational content naturally into the core loop. Web game constraints added another layer: no installation, fast load, cross-browser compatibility, and a UI that worked without a gaming controller.',
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
          body: 'Designed game mechanics where the correct action to progress was also the action that reinforced the learning objective. The player was not being tested — they were practicing. The distinction matters for engagement: testing feels like evaluation, practice feels like play.',
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
        'Kodety shipped on web and received an industry award for its design approach. The project demonstrated that educational game design succeeds when learning and play objectives are aligned at the mechanics level rather than layered on top of each other.',
      nextSteps:
        'Educational game design benefits from learning outcome measurement alongside engagement data. I would want to run assessments comparing what players know before and after sessions, correlated with where they engaged longest in the game. That data would tell us which mechanics are doing the educational work most effectively.',
    },
    whatThisShows:
      'This project shows how I approach design problems where the player objective and the product objective are different things that have to feel like the same thing. Educational games are an extreme version of that challenge, but the principle applies broadly: when a product has an outcome it wants the user to reach, the UX has to make that outcome feel like the user\'s own goal, not a requirement.',
    whatThisShowsEs:
      'Este proyecto muestra cómo abordo problemas de diseño donde el objetivo del jugador y el objetivo del producto son cosas distintas que tienen que sentirse como la misma cosa. Los juegos educativos son una versión extrema de ese desafío, pero el principio aplica ampliamente: cuando un producto tiene un resultado que quiere que el usuario alcance, el UX tiene que hacer que ese resultado se sienta como el objetivo propio del usuario, no como un requisito.',
    contentEs: {
      summary:
        'Kodety es un juego web educativo desarrollado por Diversoft. Mi trabajo cubrió diseño de juego y UX/UI: definición de mecánicas, flujos de interacción, diseño de interfaz visual y la experiencia general del jugador. El proyecto recibió reconocimiento de la industria por su enfoque de diseño.',
      quickFacts: {
        role: 'Game Designer / UX/UI',
        studio: 'Diversoft',
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
          body: 'Diseñé el sistema de retroalimentación para hacer el trabajo instruccional. En lugar de explicar las reglas por adelantado, la interfaz respondía a las acciones del jugador de maneras que hacían que el enfoque correcto fuera descubrible. Los caminos incorrectos tenían consecuencias visuales claras; los correctos tenían recompensa inmediata.',
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
        'Kodety se lanzó en web y recibió un premio de la industria por su enfoque de diseño. El proyecto demostró que el diseño de juegos educativos tiene éxito cuando los objetivos de aprendizaje y juego están alineados a nivel de mecánicas en lugar de superpuestos uno encima del otro.',
      nextSteps:
        'El diseño de juegos educativos se beneficia significativamente de la medición de resultados de aprendizaje junto con los datos de engagement. Querría ejecutar evaluaciones comparando qué saben los jugadores antes y después de las sesiones, correlacionadas con dónde se comprometieron más tiempo en el juego. Esos datos informarían qué mecánicas están haciendo el trabajo educativo de manera más efectiva.',
    },
  },
];
