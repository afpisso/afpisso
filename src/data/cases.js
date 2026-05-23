export const cases = [
  {
    id: 'CASE-001',
    slug: 'orcs-must-die-by-the-blade',
    title: 'Orcs Must Die: By the Blade',
    thumbnailAlt: 'Orcs Must Die: By the Blade — VR HUD design and spatial feedback systems case study',
    role: 'UX/UI Designer',
    platform: ['VR', 'MetaQuest'],
    focus: 'VR interface systems, spatial feedback, HUD clarity, player confidence',
    focusEs: 'Sistemas de interfaz VR, retroalimentación espacial, claridad de HUD, confianza del jugador',
    status: 'NDA-SAFE',
    visibility: 'nda-safe',
    statusColor: 'accent',
    year: '2024',
    featured: true,
    category: 'games',
    headline: 'Designing clarity, spatial feedback, and interface systems for a tactical VR experience.',
    headlineEs: 'Diseño de claridad, retroalimentación espacial y sistemas de interfaz para una experiencia VR táctica.',
    description:
      'I worked on UX/UI systems, flows, and interface decisions for a VR adaptation of a trap-and-combat franchise. The focus was helping players read tactical information, understand what changed, and act without breaking immersion.',
    descriptionEs:
      'Trabajé en sistemas UX/UI, flujos y decisiones de interfaz para una adaptación VR de una franquicia de trampas y combate. El enfoque fue ayudar a los jugadores a leer información táctica, entender qué cambió y actuar sin romper la inmersión.',
    tags: ['VR UX', 'HUD', 'UI Systems', 'Spatial Feedback', 'Figma'],
    relatedNotes: ['vr-ux-interface-clarity', 'clean-hud-vs-clear-hud', 'feedback-reduces-guesswork'],
    cta: 'View VR UX/UI case',
    content: {
      summary:
        'Orcs Must Die: By the Blade is a tactical VR combat experience. My work focused on UX/UI systems, interface decisions, and spatial feedback design to help players read critical information and act without hesitation.',
      quickFacts: {
        role: 'UX/UI Designer',
        studio: 'Robot Entertainment',
        platform: 'VR / MetaQuest',
        engine: 'Unreal Engine',
        status: 'Shipped',
        confidentiality: 'NDA-safe. Some details are intentionally simplified or redacted. The focus here is the design problem, my role, and the type of decisions I helped shape.',
      },
      context:
        'Orcs Must Die: By the Blade adapts the core trap-and-combat loop of the franchise into a VR environment. VR adds spatial complexity: players look around, reach for objects, and read feedback from multiple directions simultaneously. Interface elements that work on a flat screen often fail in VR because they compete with the physical environment for attention.',
      challenge:
        'The main challenge was keeping tactical information readable without disrupting immersion. VR creates specific constraints: text must be large enough to read at distance, UI anchored to the player\'s view causes motion discomfort, and information that appears in the wrong visual zone gets ignored during combat.',
      role:
        'I owned UX/UI systems design, flow documentation, and cross-discipline collaboration on interface decisions. I worked with engineering and art to validate what was feasible within the engine\'s VR rendering constraints.',
      constraints: [
        'VR comfort requirements: minimal UI attached to the player\'s view',
        'IP consistency: system had to respect Orcs Must Die visual language',
        'Performance budget: UI elements had to be lightweight for target hardware',
        'Input method: controller-based interaction with limited precision',
        'Production schedule: tight iteration window between prototype and submission',
      ],
      approach: [
        {
          heading: 'Spatial information architecture',
          body: 'Mapped what information the player needed at each phase: preparation, combat, and post-encounter. Determined which information needed to be world-anchored, controller-anchored, or in the peripheral field. This separation reduced cognitive load during high-intensity moments.',
        },
        {
          heading: 'Feedback hierarchy',
          body: 'Established a clear priority order for visual feedback: critical threats, resource status, objectives, contextual hints. Designed each feedback layer with a distinct visual treatment so players could recognize urgency without reading text.',
        },
        {
          heading: 'HUD clarity rules',
          body: 'Created layout rules for every HUD element: safe viewing zones per VR comfort guidelines, minimum text size, contrast requirements against both dark and bright environments, and motion constraints to prevent disorientation.',
        },
        {
          heading: 'Documentation for production',
          body: 'Produced handoff documentation that went beyond Figma specs. Included placement logic for world-anchored UI, controller interaction zones, edge cases for different player heights, and implementation notes for engineering.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Critical combat information was being missed because players were focused on physical threats in front of them.',
          decision: 'Moved key feedback signals to the player\'s near-peripheral field and world-anchored critical indicators to in-game geometry rather than a floating HUD overlay.',
          why: 'World-anchored UI is less disruptive to immersion and more likely to be seen when the player is physically engaged with combat. Peripheral placement respects VR comfort zones.',
        },
        {
          problem: 'Text labels were too small to read at typical VR viewing distances and caused players to break their posture to get closer.',
          decision: 'Established a minimum text size standard calibrated to the target headset\'s field of view, and replaced text labels with iconographic feedback wherever the meaning could be conveyed without language.',
          why: 'Accessibility and comfort. Players who have to lean forward to read a UI label will miss a threat. Icon-first reduces language dependency and reading time.',
        },
        {
          problem: 'Players were losing track of which trap slots were active during fast-paced encounters.',
          decision: 'Redesigned the trap inventory indicator to use spatial position and color contrast rather than text, with a distinct visual state for active versus available slots.',
          why: 'In VR, the hands and their physical context are part of the interface. Connecting inventory state to spatial position made the information feel grounded rather than overlaid.',
        },
      ],
      deliverables: [
        'VR HUD layout rules and safe zone documentation',
        'Feedback hierarchy framework for combat states',
        'Component states for all primary UI elements',
        'Interaction flows for preparation and combat phases',
        'Engineering handoff specs with VR-specific placement notes',
        'Accessibility checklist for VR UI',
      ],
      outcome:
        'The experience shipped. My UX/UI documentation was used by engineering as the primary implementation reference. The feedback hierarchy established during this project was applied to subsequent UI work on the title.',
      nextSteps:
        'I would want to run structured playtests specifically targeting information drop-off moments: where do players miss a critical signal, and at what point in the session does their spatial reading improve? VR UX benefits significantly from session-length data that shows how players adapt to spatial information over time.',
    },
    whatThisShows:
      'This project shows how I approach interface clarity when attention, motion, comfort, and physical space all affect the experience. VR is spatial UX at its most constrained. The same principles that made this work — reduce ambiguity, anchor feedback where players already look, and remove anything that does not earn its place — apply to any complex interface, regardless of platform.',
    whatThisShowsEs:
      'Este proyecto muestra cómo abordo la claridad de interfaz cuando la atención, el movimiento, el confort y el espacio físico afectan la experiencia. VR es UX espacial en su forma más restringida. Los mismos principios que hicieron funcionar esto — reducir la ambigüedad, anclar la retroalimentación donde los jugadores ya miran, y eliminar todo lo que no gana su lugar — aplican a cualquier interfaz compleja, independientemente de la plataforma.',
    contentEs: {
      summary:
        'Orcs Must Die: By the Blade es una experiencia de combate táctico en VR. Mi trabajo se centró en sistemas UX/UI, decisiones de interfaz y diseño de retroalimentación espacial para ayudar a los jugadores a leer información crítica y actuar sin hesitación.',
      quickFacts: {
        role: 'UX/UI Designer',
        studio: 'Robot Entertainment',
        platform: 'VR / MetaQuest',
        engine: 'Unreal Engine',
        status: 'Lanzado',
        confidentiality: 'NDA-safe. Algunos detalles se simplifican u omiten intencionalmente. El enfoque aquí es el problema de diseño, mi rol y el tipo de decisiones que ayudé a dar forma.',
      },
      context:
        'Orcs Must Die: By the Blade adapta el loop central de trampas y combate de la franquicia a un entorno VR. VR añade complejidad espacial: los jugadores miran alrededor, alcanzan objetos y leen retroalimentación desde múltiples direcciones simultáneamente. Los elementos de interfaz que funcionan en una pantalla plana a menudo fallan en VR porque compiten con el entorno físico por la atención.',
      challenge:
        'El desafío principal fue mantener la información táctica legible sin interrumpir la inmersión. VR crea restricciones específicas: el texto debe ser lo suficientemente grande para leerlo a distancia, la UI anclada a la vista del jugador genera incomodidad por el movimiento, y la información que aparece en la zona visual incorrecta se ignora durante el combate.',
      role:
        'Tuve a cargo el diseño de sistemas UX/UI, documentación de flujos y colaboración multidisciplinar en decisiones de interfaz. Trabajé con ingeniería y arte para validar qué era factible dentro de las restricciones de renderizado VR del motor.',
      constraints: [
        'Requisitos de confort VR: UI mínima anclada a la vista del jugador',
        'Consistencia de IP: el sistema tenía que respetar el lenguaje visual de Orcs Must Die',
        'Presupuesto de rendimiento: los elementos de UI debían ser ligeros para el hardware objetivo',
        'Método de entrada: interacción basada en controladores con precisión limitada',
        'Cronograma de producción: ventana de iteración ajustada entre prototipo y entrega',
      ],
      approach: [
        {
          heading: 'Arquitectura de información espacial',
          body: 'Mapeé qué información necesitaba el jugador en cada fase: preparación, combate y post-encuentro. Determiné qué información debía estar anclada al mundo, al controlador o en el campo periférico. Esta separación redujo la carga cognitiva durante los momentos de alta intensidad.',
        },
        {
          heading: 'Jerarquía de retroalimentación',
          body: 'Establecí un orden de prioridad claro para la retroalimentación visual: amenazas críticas, estado de recursos, objetivos, pistas contextuales. Diseñé cada capa de retroalimentación con un tratamiento visual distinto para que los jugadores reconocieran la urgencia sin necesidad de leer texto.',
        },
        {
          heading: 'Reglas de claridad del HUD',
          body: 'Creé reglas de diseño para cada elemento del HUD: zonas de visión seguras según las guías de confort VR, tamaño mínimo de texto, requisitos de contraste contra entornos oscuros y brillantes, y restricciones de movimiento para evitar desorientación.',
        },
        {
          heading: 'Documentación para producción',
          body: 'Produje documentación de entrega que fue más allá de las especificaciones de Figma. Incluía lógica de posicionamiento para UI anclada al mundo, zonas de interacción del controlador, casos extremos para diferentes alturas de jugador y notas de implementación para ingeniería.',
        },
      ],
      keyDecisions: [
        {
          problem: 'La información crítica de combate se estaba perdiendo porque los jugadores estaban enfocados en las amenazas físicas frente a ellos.',
          decision: 'Moví las señales clave de retroalimentación al campo periférico cercano del jugador y anclé los indicadores críticos a la geometría del juego en lugar de una superposición flotante de HUD.',
          why: 'La UI anclada al mundo es menos disruptiva para la inmersión y tiene más probabilidades de ser vista cuando el jugador está físicamente comprometido con el combate. La colocación periférica respeta las zonas de confort VR.',
        },
        {
          problem: 'Las etiquetas de texto eran demasiado pequeñas para leerlas a las distancias de visión típicas en VR y obligaban a los jugadores a romper su postura para acercarse.',
          decision: 'Establecí un estándar de tamaño mínimo de texto calibrado al campo de visión del headset objetivo, y reemplacé etiquetas de texto con retroalimentación iconográfica donde el significado podía transmitirse sin lenguaje.',
          why: 'Accesibilidad y confort. Los jugadores que tienen que inclinarse hacia adelante para leer una etiqueta de UI perderán una amenaza. El enfoque en iconos reduce la dependencia del idioma y el tiempo de lectura.',
        },
        {
          problem: 'Los jugadores perdían la cuenta de qué ranuras de trampa estaban activas durante los encuentros a ritmo rápido.',
          decision: 'Rediseñé el indicador de inventario de trampas para usar posición espacial y contraste de color en lugar de texto, con un estado visual distinto para las ranuras activas versus disponibles.',
          why: 'En VR, las manos y su contexto físico son parte de la interfaz. Conectar el estado del inventario a la posición espacial hizo que la información se sintiera integrada en lugar de superpuesta.',
        },
      ],
      deliverables: [
        'Reglas de diseño del HUD VR y documentación de zonas seguras',
        'Marco de jerarquía de retroalimentación para estados de combate',
        'Estados de componente para todos los elementos de UI principales',
        'Flujos de interacción para las fases de preparación y combate',
        'Especificaciones de entrega a ingeniería con notas de posicionamiento VR',
        'Checklist de accesibilidad para UI en VR',
      ],
      outcome:
        'La experiencia se lanzó. Mi documentación UX/UI fue utilizada por ingeniería como referencia principal de implementación. La jerarquía de retroalimentación establecida durante este proyecto se aplicó al trabajo de UI posterior en el título.',
      nextSteps:
        'Quisiera ejecutar pruebas de usuario estructuradas dirigidas específicamente a los momentos de pérdida de información: ¿dónde pierden los jugadores una señal crítica, y en qué momento de la sesión mejora su lectura espacial? El UX de VR se beneficia significativamente de datos por duración de sesión que muestran cómo los jugadores se adaptan a la información espacial con el tiempo.',
    },
  },
  {
    id: 'CASE-002',
    slug: 'zombie-dragon-adventure',
    title: 'D&D: Zombie Dragon Adventure',
    thumbnailAlt: 'D&D: Zombie Dragon Adventure — UEFN progression clarity and player decision UX case study',
    role: 'Game UX/UI Designer',
    platform: ['UEFN', 'Fortnite'],
    focus: 'Progression clarity, player decisions, onboarding, combat feedback',
    focusEs: 'Claridad de progresión, decisiones del jugador, onboarding, retroalimentación de combate',
    status: 'SELECTED WORK',
    visibility: 'public',
    statusColor: 'accent',
    year: '2024',
    featured: true,
    category: 'games',
    headline: 'Designing readable progression and player decisions for a Dungeons & Dragons experience inside Fortnite.',
    headlineEs: 'Diseño de progresión legible y decisiones del jugador para una experiencia de Dungeons & Dragons en Fortnite.',
    description:
      'The challenge was balancing fantasy, combat, progression, and clarity inside the UEFN ecosystem. My focus was making choices, routes, rewards, and player feedback easier to understand during a fast-paced experience.',
    descriptionEs:
      'El desafío fue equilibrar fantasía, combate, progresión y claridad dentro del ecosistema UEFN. Mi enfoque fue hacer que las elecciones, rutas, recompensas y retroalimentación del jugador fueran más fáciles de entender durante una experiencia de ritmo rápido.',
    tags: ['UEFN', 'Fortnite', 'Progression', 'D&D', 'Player Decisions'],
    relatedNotes: ['uefn-ux-lessons', 'game-accessibility-checklist', 'feedback-reduces-guesswork'],
    cta: 'View D&D: Zombie Dragon Adventure case',
    content: {
      summary:
        'D&D: Zombie Dragon Adventure is a Dungeons & Dragons experience built inside Fortnite via UEFN. My work focused on making the D&D progression model readable and actionable for players who entered from Fortnite, with no prior context for the experience.',
      quickFacts: {
        role: 'Game UX/UI Designer',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'Shipped',
        confidentiality: 'Selected details shared. Some assets are not publicly available.',
      },
      context:
        'Dungeons & Dragons is a franchise built on complex progression, choice, and narrative. Fortnite is a fast-paced platform where players expect immediate clarity and short feedback loops. Bridging those two design languages was the core UX challenge.',
      challenge:
        'UEFN imposes constraints on custom UI: Fortnite\'s native HUD is always present, font choices are limited, and players arrive without onboarding. The D&D framework includes class selection, progression paths, ability choices, and combat states. Making that complexity legible inside a platform not designed for RPG depth required deliberate hierarchy decisions.',
      role:
        'I designed the UX/UI layer for player-facing systems: onboarding flow, progression UI, combat feedback, and the visual hierarchy for choice moments. I worked within UEFN\'s device system and Fortnite\'s UI grid constraints.',
      constraints: [
        'UEFN limitations on custom font rendering and UI positioning',
        'Fortnite native HUD occupies fixed screen zones',
        'D&D IP visual language requirements',
        'Players arrive with zero context — no tutorial outside the experience',
        'Fast-paced Fortnite sessions conflict with traditional RPG pacing',
      ],
      approach: [
        {
          heading: 'Stripping D&D to its readable core',
          body: 'Identified what a Fortnite player needed to understand to play successfully: which class they had selected, what ability was available, how their progress was tracked, and what the next objective was. Non-essential D&D lore was deprioritized in the interface until the player had completed a loop.',
        },
        {
          heading: 'Choice moments as UI events',
          body: 'Designed class selection and ability choice screens as clear decision points with distinct visual hierarchy. Each choice had a visible consequence described in plain language before the player committed. This reduced post-choice confusion and re-engagement drop-off.',
        },
        {
          heading: 'Combat feedback inside UEFN constraints',
          body: 'Worked within UEFN\'s device system to build indicator patterns for damage, ability cooldowns, and objective state. Used color and spatial position rather than text-heavy labels to keep combat readable at speed.',
        },
        {
          heading: 'Progression legibility',
          body: 'Designed the progression tracker to show the player\'s current position, next milestone, and available paths at a glance. Avoided the common RPG mistake of showing too much progression data at once, which causes players to ignore the tracker entirely.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Players were selecting classes without understanding the gameplay implications, then disengaging after the first encounter when the class behavior didn\'t match expectations.',
          decision: 'Added a brief class ability preview in the selection UI that showed one key mechanic per class using in-engine assets rather than text description.',
          why: 'Players make better choices when they can preview the consequence. Showing a mechanic is faster and more reliable than describing it in a tooltip.',
        },
        {
          problem: 'The UEFN device system limited how much custom UI could overlay the native Fortnite HUD without creating visual conflict.',
          decision: 'Mapped all custom UI to the corners and mid-edges that Fortnite\'s native HUD does not occupy, and established a contrast rule so custom elements were visually distinct from native elements.',
          why: 'Players build spatial habits for where information lives. Putting D&D UI in the same zone as a Fortnite element creates misreads. Zone separation reduces conflict.',
        },
        {
          problem: 'Objective tracking was getting lost during combat because players were focused on immediate threats.',
          decision: 'Created a persistent minimal indicator at the top edge showing current objective state, and added a brief directional pulse when the objective changed state.',
          why: 'Persistent minimal indicators are easier to parse at the edge of attention than popups that require active reading. The state-change pulse drew attention only when an update was needed.',
        },
      ],
      deliverables: [
        'Class selection UX flow and UI specs',
        'Progression tracker component with state definitions',
        'Combat feedback system documentation',
        'UEFN device placement rules and zone map',
        'Onboarding flow wireframes',
        'Figma components for all player-facing UI elements',
      ],
      outcome:
        'D&D: Zombie Dragon Adventure shipped inside Fortnite\'s featured island catalog. The class selection redesign reduced early-session drop-off. The progression tracking system was reused in subsequent experiences in the same IP context.',
      nextSteps:
        'I would explore session replay data to understand exactly where players look during choice moments and whether the class preview is being read or skipped. For RPG-in-platform contexts, there is always a tension between depth and speed that requires iteration past the first release.',
    },
    whatThisShows:
      'This project shows how I design inside platform constraints. UEFN gives creators flexibility but also imposes hard limits: native HUD always visible, limited font control, no built-in onboarding. Making a D&D-style progression system readable within those constraints is the same problem as any product that needs to add depth to a constrained system. The skill is making complexity legible without adding noise.',
    whatThisShowsEs:
      'Este proyecto muestra cómo diseño dentro de las restricciones de la plataforma. UEFN da flexibilidad a los creadores pero también impone límites duros: HUD nativo siempre visible, control limitado de fuentes, sin onboarding integrado. Hacer que un sistema de progresión al estilo D&D sea legible dentro de esas restricciones es el mismo problema que cualquier producto que necesita añadir profundidad a un sistema restringido. La habilidad es hacer que la complejidad sea legible sin añadir ruido.',
    contentEs: {
      summary:
        'D&D: Zombie Dragon Adventure es una experiencia de Dungeons & Dragons construida dentro de Fortnite a través de UEFN. Mi trabajo se centró en hacer que el modelo de progresión de D&D fuera legible y accionable para los jugadores que llegaban desde Fortnite, sin contexto previo de la experiencia.',
      quickFacts: {
        role: 'Game UX/UI Designer',
        platform: 'UEFN / Fortnite',
        engine: 'UEFN',
        status: 'Lanzado',
        confidentiality: 'Detalles seleccionados compartidos. Algunos assets no están disponibles públicamente.',
      },
      context:
        'Dungeons & Dragons es una franquicia construida sobre progresión compleja, elección y narrativa. Fortnite es una plataforma de ritmo rápido donde los jugadores esperan claridad inmediata y ciclos de retroalimentación cortos. Unir esos dos lenguajes de diseño fue el desafío central de UX.',
      challenge:
        'UEFN impone restricciones en la UI personalizada: el HUD nativo de Fortnite siempre está presente, las opciones de fuente son limitadas, y los jugadores llegan sin onboarding. El marco de D&D incluye selección de clase, rutas de progresión, opciones de habilidad y estados de combate. Hacer esa complejidad legible dentro de una plataforma no diseñada para la profundidad de RPG requirió decisiones de jerarquía deliberadas.',
      role:
        'Diseñé la capa UX/UI para los sistemas orientados al jugador: flujo de onboarding, UI de progresión, retroalimentación de combate y la jerarquía visual para los momentos de elección. Trabajé dentro del sistema de dispositivos de UEFN y las restricciones de cuadrícula de UI de Fortnite.',
      constraints: [
        'Limitaciones de UEFN en renderizado de fuentes personalizadas y posicionamiento de UI',
        'El HUD nativo de Fortnite ocupa zonas fijas de pantalla',
        'Requisitos del lenguaje visual del IP de D&D',
        'Los jugadores llegan sin contexto — sin tutorial fuera de la experiencia',
        'Las sesiones de Fortnite a ritmo rápido entran en conflicto con el ritmo tradicional de RPG',
      ],
      approach: [
        {
          heading: 'Reducir D&D a su núcleo legible',
          body: 'Identifiqué qué necesitaba entender un jugador de Fortnite para jugar con éxito: qué clase había seleccionado, qué habilidad estaba disponible, cómo se rastreaba su progreso y cuál era el siguiente objetivo. El lore no esencial de D&D fue deprioritizado en la interfaz hasta que el jugador completó un loop.',
        },
        {
          heading: 'Momentos de elección como eventos de UI',
          body: 'Diseñé las pantallas de selección de clase y elección de habilidad como puntos de decisión claros con jerarquía visual distinta. Cada elección tenía una consecuencia visible descrita en lenguaje simple antes de que el jugador confirmara. Esto redujo la confusión post-elección y el abandono por re-engagement.',
        },
        {
          heading: 'Retroalimentación de combate dentro de las restricciones de UEFN',
          body: 'Trabajé dentro del sistema de dispositivos de UEFN para construir patrones de indicadores para daño, tiempos de recarga de habilidades y estado de objetivos. Usé color y posición espacial en lugar de etiquetas con mucho texto para mantener el combate legible a velocidad.',
        },
        {
          heading: 'Legibilidad de la progresión',
          body: 'Diseñé el rastreador de progresión para mostrar la posición actual del jugador, el próximo hito y los caminos disponibles de un vistazo. Evité el error común de RPG de mostrar demasiados datos de progresión a la vez, lo que hace que los jugadores ignoren el rastreador por completo.',
        },
      ],
      keyDecisions: [
        {
          problem: 'Los jugadores seleccionaban clases sin entender las implicaciones de jugabilidad, luego se desenganchaban después del primer encuentro cuando el comportamiento de la clase no coincidía con las expectativas.',
          decision: 'Agregué una vista previa breve de la habilidad de clase en la UI de selección que mostraba una mecánica clave por clase usando assets del motor en lugar de descripción de texto.',
          why: 'Los jugadores toman mejores decisiones cuando pueden previsualizar la consecuencia. Mostrar una mecánica es más rápido y confiable que describirla en un tooltip.',
        },
        {
          problem: 'El sistema de dispositivos de UEFN limitaba cuánta UI personalizada podía superponerse al HUD nativo de Fortnite sin crear conflicto visual.',
          decision: 'Mapeé toda la UI personalizada a las esquinas y bordes centrales que el HUD nativo de Fortnite no ocupa, y establecí una regla de contraste para que los elementos personalizados fueran visualmente distintos de los elementos nativos.',
          why: 'Los jugadores construyen hábitos espaciales sobre dónde vive la información. Poner UI de D&D en la misma zona que un elemento de Fortnite crea lecturas erróneas. La separación de zonas reduce el conflicto.',
        },
        {
          problem: 'El seguimiento de objetivos se perdía durante el combate porque los jugadores estaban enfocados en amenazas inmediatas.',
          decision: 'Creé un indicador mínimo persistente en el borde superior que mostraba el estado del objetivo actual, y agregué un pulso direccional breve cuando el objetivo cambiaba de estado.',
          why: 'Los indicadores mínimos persistentes son más fáciles de interpretar en el borde de la atención que los popups que requieren lectura activa. El pulso de cambio de estado atraía la atención solo cuando se necesitaba una actualización.',
        },
      ],
      deliverables: [
        'Flujo UX de selección de clase y especificaciones de UI',
        'Componente de rastreador de progresión con definiciones de estado',
        'Documentación del sistema de retroalimentación de combate',
        'Reglas de posicionamiento de dispositivos UEFN y mapa de zonas',
        'Wireframes del flujo de onboarding',
        'Componentes de Figma para todos los elementos de UI orientados al jugador',
      ],
      outcome:
        'D&D: Zombie Dragon Adventure se lanzó dentro del catálogo de islas destacadas de Fortnite. El rediseño de la selección de clase redujo el abandono en la sesión inicial. El sistema de seguimiento de progresión fue reutilizado en experiencias posteriores en el mismo contexto de IP.',
      nextSteps:
        'Exploraría datos de reproducción de sesión para entender exactamente dónde miran los jugadores durante los momentos de elección y si la vista previa de clase está siendo leída u omitida. Para contextos de RPG-en-plataforma, siempre hay una tensión entre profundidad y velocidad que requiere iteración más allá del primer lanzamiento.',
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
    year: '2024',
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
    year: '2024',
    featured: true,
    category: 'games',
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
    year: '2023 – 2024',
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
    year: '2021',
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
    year: '2020',
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
