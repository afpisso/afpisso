export const cases = [
  {
    id: 'CASE-001',
    slug: 'orcs-must-die-by-the-blade',
    title: 'Orcs Must Die: By the Blade',
    role: 'UX/UI Designer',
    platform: ['VR'],
    focus: 'VR interface systems, spatial feedback, HUD clarity, player confidence',
    focusEs: 'Sistemas de interfaz VR, retroalimentación espacial, claridad de HUD, confianza del jugador',
    status: 'NDA-SAFE',
    visibility: 'nda-safe',
    statusColor: 'accent',
    year: '2024',
    featured: true,
    category: 'games',
    headline: 'Designing clarity, spatial feedback, and interface systems for a tactical VR experience.',
    description:
      'I worked on UX/UI systems, flows, and interface decisions for a VR adaptation of a trap-and-combat franchise. The focus was helping players read tactical information, understand what changed, and act without breaking immersion.',
    descriptionEs:
      'Trabajé en sistemas UX/UI, flujos y decisiones de interfaz para una adaptación VR de una franquicia de trampas y combate. El enfoque fue ayudar a los jugadores a leer información táctica, entender qué cambió y actuar sin romper la inmersión.',
    tags: ['VR UX', 'HUD', 'UI Systems', 'Spatial Feedback', 'Figma'],
    cta: 'View VR UX/UI case',
    content: {
      summary:
        'Orcs Must Die: By the Blade is a tactical VR combat experience. My work focused on UX/UI systems, interface decisions, and spatial feedback design to help players read critical information and act without hesitation.',
      quickFacts: {
        role: 'UX/UI Designer',
        studio: 'Robot Entertainment',
        platform: 'VR',
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
  },
  {
    id: 'CASE-002',
    slug: 'dungeons-and-dragons-fortnite',
    title: 'D&D in Fortnite',
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
    description:
      'The challenge was balancing fantasy, combat, progression, and clarity inside the UEFN ecosystem. My focus was making choices, routes, rewards, and player feedback easier to understand during a fast-paced experience.',
    descriptionEs:
      'El desafío fue equilibrar fantasía, combate, progresión y claridad dentro del ecosistema UEFN. Mi enfoque fue hacer que las elecciones, rutas, recompensas y retroalimentación del jugador fueran más fáciles de entender durante una experiencia de ritmo rápido.',
    tags: ['UEFN', 'Fortnite', 'Progression', 'D&D', 'Player Decisions'],
    cta: 'View D&D Fortnite case',
    content: {
      summary:
        'A Dungeons & Dragons experience built inside Fortnite via UEFN. My work focused on making the D&D progression model readable and actionable for players who entered from Fortnite, with no prior context for the experience.',
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
        'The experience shipped inside Fortnite\'s featured island catalog. The class selection redesign reduced early-session drop-off. The progression tracking system was reused in subsequent experiences in the same IP context.',
      nextSteps:
        'I would explore session replay data to understand exactly where players look during choice moments and whether the class preview is being read or skipped. For RPG-in-platform contexts, there is always a tension between depth and speed that requires iteration past the first release.',
    },
  },
  {
    id: 'CASE-003',
    slug: 'the-walking-dead',
    title: 'The Walking Dead',
    role: 'UX/UI Designer',
    platform: ['TBD'],
    focus: 'Tension UX, survival feedback, HUD logic, risk communication',
    focusEs: 'UX de tensión, retroalimentación de supervivencia, lógica de HUD, comunicación de riesgo',
    status: 'NDA-SAFE',
    visibility: 'nda-safe',
    statusColor: 'accent',
    year: '2024',
    featured: true,
    category: 'games',
    headline: 'Designing UX/UI for tension, survival, and readable decisions under pressure.',
    description:
      'The focus was helping players understand threat, resources, actions, and cooperation without losing the mood of the experience. Exact public title and publishable material TBD.',
    descriptionEs:
      'El enfoque fue ayudar a los jugadores a entender amenazas, recursos, acciones y cooperación sin perder el tono de la experiencia. Título público exacto y material publicable por definir.',
    tags: ['NDA-Safe', 'HUD Design', 'Survival UX', 'Tension', 'Feedback Systems'],
    cta: 'View NDA-safe breakdown',
    content: {
      summary:
        'A survival experience connected to The Walking Dead IP. My work focused on interface logic for threat communication, resource readability, and cooperative action feedback. Some details are intentionally simplified because of confidentiality. The focus here is the design problem, my role, and the type of decisions I helped shape.',
      quickFacts: {
        role: 'UX/UI Designer',
        platform: 'TBD',
        status: 'In production / NDA',
        confidentiality: 'NDA-safe breakdown. Some details are intentionally redacted. Visual assets not available for public sharing.',
      },
      context:
        'Survival games built on licensed IP carry a dual responsibility: maintain the emotional tone of the franchise while ensuring the player has enough information to survive. The Walking Dead is defined by tension, limited resources, and cooperative (or competitive) human dynamics. The UX had to carry that weight without breaking the atmosphere.',
      challenge:
        'Survival UX presents a specific design problem: the player needs real-time information about threats, resources, and available actions, but information density often works against immersion. Too much UI and the world loses its danger. Too little and players make uninformed decisions that frustrate rather than challenge.',
      role:
        'I designed the HUD logic and feedback systems for the player-facing interface. My work covered threat indicators, resource communication, and the visual hierarchy for cooperative actions. I collaborated with art and engineering on what could be executed within the production timeline.',
      constraints: [
        'The Walking Dead IP tone requirements: the interface could not feel "gamey" or break the tension',
        'NDA restrictions on specific mechanic and asset details',
        'Performance constraints for the target platform',
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
  },
  {
    id: 'CASE-004',
    slug: 'raptor-heist',
    title: 'Raptor Heist',
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
    description:
      'My priority was making the risk, reward, and progression loop readable from run to run. The interface needed to support fast decisions, clear rewards, and repeated play.',
    descriptionEs:
      'Mi prioridad fue hacer que el loop de riesgo, recompensa y progresión fuera legible de partida en partida. La interfaz necesitaba soportar decisiones rápidas, recompensas claras y juego repetido.',
    tags: ['UEFN', 'Roguelike', 'Heist', 'Progression', 'Reward Clarity'],
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
  },
  {
    id: 'CASE-005',
    slug: 'havoc-hotel',
    title: 'Havoc Hotel',
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
    headline: 'Designing UX/UI for a co-op roguelike in Fortnite focused on progression, readability, and replayability.',
    description:
      'The work focused on clarifying rewards, upgrades, difficulty scaling, and player choices across fast, repeatable runs.',
    descriptionEs:
      'El trabajo se centró en clarificar recompensas, mejoras, escalado de dificultad y elecciones del jugador en partidas rápidas y repetibles.',
    tags: ['UEFN', 'Co-op', 'Roguelike', 'Reward Systems', 'Progression'],
    cta: 'View Havoc Hotel case',
    content: {
      summary:
        'Havoc Hotel is a co-op roguelike franchise built in UEFN. My work focused on interface systems for visible economy, reward clarity, combat readability, and replayability across the franchise.',
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
  },
];
