export const noteArticles = {
  'what-is-a-game-ui-system': {
    en: [
      {
        type: 'paragraph',
        text: 'Most game teams have a style guide. Fewer have a component library. Almost none have a UI system. These are not the same thing, and treating them as interchangeable is one of the most expensive assumptions a production can make.',
      },
      {
        type: 'paragraph',
        text: 'A style guide tells you what things look like. Colors, fonts, icon sizes. A component library gives you reusable pieces: buttons, panels, health bars. A UI system does both of those things and also tells you why every decision was made, what rules govern how pieces combine, and what happens when something breaks.',
      },
      {
        type: 'heading',
        text: 'What a UI System Actually Contains',
      },
      {
        type: 'paragraph',
        text: 'If you open a real UI system and it only has visual specs, it is incomplete. A complete game UI system contains at minimum:',
      },
      {
        type: 'list',
        items: [
          'Visual tokens: color values, type scales, spacing units, border radii, shadow definitions',
          'Component specs: every interactive and display element with all states documented',
          'Interaction rules: how components behave on hover, press, focus, error, loading, and empty states',
          'Layering and stacking rules: what lives on top of what, and under what conditions',
          'Motion guidelines: timing, easing curves, and what should and should not animate',
          'Decision log: why alternatives were rejected and what constraints drove each major choice',
          'Handoff notes: terminology, naming conventions, and export settings for engineering',
        ],
      },
      {
        type: 'paragraph',
        text: 'That last item is the one that gets dropped first under deadline pressure. It is also the one that costs the most when it is missing.',
      },
      {
        type: 'heading',
        text: 'Why Documented Decisions Matter as Much as the Components',
      },
      {
        type: 'paragraph',
        text: 'Visual components are explicit. A button looks like what it looks like. But decisions are implicit. When someone joins mid-production and changes the button\'s press state because the documentation does not explain why it behaves the way it does, you lose consistency without knowing it.',
      },
      {
        type: 'paragraph',
        text: 'Documented decisions answer questions like: Why is the health bar anchored to the left and not centered? Because player gaze under stress defaults to peripheral left. That is not obvious from the Figma file. Without the note, the next designer has no reason not to move it.',
      },
      {
        type: 'paragraph',
        text: 'This is especially true in games because UI decisions are often entangled with gameplay mechanics, platform constraints, and technical limitations. A component that looks arbitrary usually has a reason. Write the reason down.',
      },
      {
        type: 'heading',
        text: 'The Cost of Missing One Mid-Production',
      },
      {
        type: 'paragraph',
        text: 'Gaps in a UI system do not show up immediately. They compound. The first three months of production feel fine because the original team remembers the implicit rules. Then someone new joins. A second team starts working on DLC. The original designer goes on leave.',
      },
      {
        type: 'paragraph',
        text: 'At that point, every undocumented decision becomes a fork in the road. Teams make different calls on the same edge case. Components drift. Engineers build workarounds because the spec does not cover the situation they are in. QA flags inconsistencies that no one can resolve quickly because the rationale no longer exists anywhere.',
      },
      {
        type: 'paragraph',
        text: 'The average cost of a UI regression in late production is not just the fix time. It is the QA cycle, the localization recheck, the platform compliance re-submission, and the player-facing bugs that ship anyway because something was missed.',
      },
      {
        type: 'callout',
        text: 'The system does not slow you down. Working without one does. You just feel it three patches in, when fixing one thing breaks two others and no one can explain why they were connected.',
      },
      {
        type: 'heading',
        text: 'When to Build One Formally vs. Using a Lighter Process',
      },
      {
        type: 'paragraph',
        text: 'Not every project needs a full system on day one. A solo dev making a jam game in two weeks should not spend a week writing component documentation. But the threshold for investing formally is lower than most teams think.',
      },
      {
        type: 'paragraph',
        text: 'Consider building a formal UI system when:',
      },
      {
        type: 'list',
        items: [
          'More than one designer will touch the UI at any point in production',
          'The project will ship updates, patches, or DLC after launch',
          'Engineering and design are separate roles on the team',
          'The game targets multiple platforms with different input and resolution requirements',
          'The UI is expected to be localized into more than two languages',
        ],
      },
      {
        type: 'paragraph',
        text: 'A lighter process works for small, short-lived, single-author projects. It means: clear naming conventions, one shared component file, and brief comments on non-obvious choices. It is not a full system, but it preserves the critical habit of recording intent.',
      },
      {
        type: 'heading',
        text: 'Starting Without Starting Over',
      },
      {
        type: 'paragraph',
        text: 'If production is already underway and the system does not exist yet, do not try to build the full thing in one sprint. Start by auditing what exists. Catalog components. Identify inconsistencies. Document the decisions you can still reconstruct. Then set a boundary: new components from this point forward get documented at creation.',
      },
      {
        type: 'paragraph',
        text: 'A partial system built incrementally beats a complete system planned but never finished. Start with tokens and the five most-used components. Add the rest as you touch them.',
      },
      {
        type: 'paragraph',
        text: 'The goal is not a perfect document. The goal is a shared understanding that survives personnel changes, scope changes, and the chaos of late production. A UI system is how a team\'s collective knowledge outlasts any individual who carries it.',
      },
    ],
    es: [
      {
        type: 'paragraph',
        text: 'La mayoría de los equipos de videojuegos tienen una guía de estilo. Menos tienen una biblioteca de componentes. Casi ninguno tiene un sistema de UI. Estas no son la misma cosa, y tratarlas como equivalentes es uno de los errores más costosos que puede cometer una producción.',
      },
      {
        type: 'paragraph',
        text: 'Una guía de estilo te dice cómo se ven las cosas. Colores, tipografías, tamaños de iconos. Una biblioteca de componentes te da piezas reutilizables: botones, paneles, barras de vida. Un sistema de UI hace todo eso y además explica por qué se tomó cada decisión, qué reglas gobiernan cómo se combinan las piezas, y qué ocurre cuando algo falla.',
      },
      {
        type: 'heading',
        text: 'Qué contiene realmente un sistema de UI',
      },
      {
        type: 'paragraph',
        text: 'Si abres un sistema de UI y solo contiene especificaciones visuales, está incompleto. Un sistema de UI completo para videojuegos contiene como mínimo:',
      },
      {
        type: 'list',
        items: [
          'Tokens visuales: valores de color, escalas tipográficas, unidades de espaciado, radios de borde, definiciones de sombras',
          'Especificaciones de componentes: cada elemento interactivo y de visualización con todos sus estados documentados',
          'Reglas de interacción: cómo se comportan los componentes en hover, presión, foco, error, carga y estado vacío',
          'Reglas de capas y apilamiento: qué vive encima de qué, y bajo qué condiciones',
          'Directrices de movimiento: tiempos, curvas de easing y qué debe y no debe animarse',
          'Registro de decisiones: por qué se rechazaron las alternativas y qué restricciones motivaron cada elección importante',
          'Notas de entrega: terminología, convenciones de nomenclatura y configuraciones de exportación para ingeniería',
        ],
      },
      {
        type: 'paragraph',
        text: 'Ese último punto es el primero en eliminarse bajo presión de fechas. Y también el que más cuesta cuando falta.',
      },
      {
        type: 'heading',
        text: 'Por qué las decisiones documentadas importan tanto como los componentes',
      },
      {
        type: 'paragraph',
        text: 'Los componentes visuales son explícitos. Un botón se ve como se ve. Pero las decisiones son implícitas. Cuando alguien se incorpora a mitad de producción y modifica el estado de presión de un botón porque la documentación no explica por qué funciona así, se pierde consistencia sin que nadie lo note.',
      },
      {
        type: 'paragraph',
        text: 'Las decisiones documentadas responden preguntas como: ¿Por qué la barra de vida está anclada a la izquierda y no centrada? Porque la mirada del jugador bajo estrés se dirige instintivamente a la periferia izquierda. Eso no se ve en el archivo de Figma. Sin esa nota, el siguiente diseñador no tiene razón para no moverla.',
      },
      {
        type: 'paragraph',
        text: 'Esto es especialmente importante en videojuegos, porque las decisiones de UI suelen estar entrelazadas con mecánicas de juego, restricciones de plataforma y limitaciones técnicas. Un componente que parece arbitrario generalmente tiene una razón. Escríbela.',
      },
      {
        type: 'heading',
        text: 'El costo de que falte algo en plena producción',
      },
      {
        type: 'paragraph',
        text: 'Las brechas en un sistema de UI no aparecen de inmediato. Se acumulan. Los primeros tres meses de producción se sienten bien porque el equipo original recuerda las reglas implícitas. Luego alguien nuevo se une. Un segundo equipo comienza a trabajar en el DLC. El diseñador original toma una licencia.',
      },
      {
        type: 'paragraph',
        text: 'En ese momento, cada decisión no documentada se convierte en un cruce de caminos. Los equipos toman decisiones distintas ante el mismo caso límite. Los componentes divergen. Los ingenieros crean soluciones alternativas porque la especificación no cubre su situación. El equipo de QA detecta inconsistencias que nadie puede resolver rápido porque el razonamiento ya no existe en ningún lado.',
      },
      {
        type: 'paragraph',
        text: 'El costo promedio de una regresión de UI en producción tardía no es solo el tiempo de corrección. Es el ciclo de QA, la revisión de localización, la nueva presentación para cumplimiento de plataforma, y los errores visibles para el jugador que se lanzan de todos modos porque algo se pasó por alto.',
      },
      {
        type: 'callout',
        text: 'El sistema no te ralentiza. Trabajar sin uno sí lo hace. Solo lo sientes tres parches después, cuando arreglar algo rompe dos cosas más y nadie puede explicar por qué estaban conectadas.',
      },
      {
        type: 'heading',
        text: 'Cuándo construirlo formalmente frente a usar un proceso más ligero',
      },
      {
        type: 'paragraph',
        text: 'No todo proyecto necesita un sistema completo desde el primer día. Un desarrollador en solitario haciendo un juego de jam en dos semanas no debería pasar una semana escribiendo documentación de componentes. Pero el umbral para invertir formalmente es más bajo de lo que la mayoría de los equipos cree.',
      },
      {
        type: 'paragraph',
        text: 'Considera construir un sistema de UI formal cuando:',
      },
      {
        type: 'list',
        items: [
          'Más de un diseñador tocará la UI en algún momento de la producción',
          'El proyecto lanzará actualizaciones, parches o DLC después del lanzamiento',
          'Ingeniería y diseño son roles separados en el equipo',
          'El juego apunta a múltiples plataformas con diferentes requisitos de entrada y resolución',
          'Se espera que la UI se localice en más de dos idiomas',
        ],
      },
      {
        type: 'paragraph',
        text: 'Un proceso más ligero funciona para proyectos pequeños, de corta duración y de un solo autor. Significa: convenciones de nomenclatura claras, un archivo de componentes compartido y comentarios breves sobre las elecciones no obvias. No es un sistema completo, pero preserva el hábito crítico de registrar la intención.',
      },
      {
        type: 'heading',
        text: 'Empezar sin empezar de cero',
      },
      {
        type: 'paragraph',
        text: 'Si la producción ya está en marcha y el sistema aún no existe, no intentes construir todo de una sola vez en un sprint. Comienza auditando lo que existe. Cataloga los componentes. Identifica inconsistencias. Documenta las decisiones que aún puedes reconstruir. Luego establece un límite: los nuevos componentes a partir de este punto se documentan al crearlos.',
      },
      {
        type: 'paragraph',
        text: 'Un sistema parcial construido de forma incremental supera a un sistema completo planificado pero nunca terminado. Empieza con los tokens y los cinco componentes más utilizados. Agrega el resto a medida que los vas tocando.',
      },
      {
        type: 'paragraph',
        text: 'El objetivo no es un documento perfecto. El objetivo es un entendimiento compartido que sobreviva a los cambios de personal, los cambios de alcance y el caos de la producción tardía. Un sistema de UI es la manera en que el conocimiento colectivo de un equipo sobrevive a cualquier individuo que lo lleva consigo.',
      },
    ],
  },

  'clean-hud-vs-clear-hud': {
    en: [
      {
        type: 'paragraph',
        text: 'There is a recurring pattern in HUD redesigns: a team removes half the screen elements, calls it minimal, ships it, and then spends the next two patches adding things back. Players reported they could not tell where they were taking damage from. Could not track their cooldowns. Lost awareness of how much time was left.',
      },
      {
        type: 'paragraph',
        text: 'The HUD looked clean. It was not clear. These are different qualities, and confusing them produces interfaces that photograph well and play poorly.',
      },
      {
        type: 'heading',
        text: 'The Minimalism Trap',
      },
      {
        type: 'paragraph',
        text: 'Minimalism became the default aesthetic reference for game UI around the mid-2010s. The influence of flat design, mobile conventions, and screen captures shared on social media all pushed toward reduction. A screenshot of a clean HUD gets more likes than a busy one. That is a real incentive that affects real design decisions.',
      },
      {
        type: 'paragraph',
        text: 'The problem is that screenshots do not represent the experience of play. A player in combat is not looking at the screen calmly. They are tracking multiple inputs simultaneously under cognitive load. The question is not "does this HUD look good at rest?" The question is "does this HUD work under pressure?"',
      },
      {
        type: 'paragraph',
        text: 'Removing elements to achieve visual quiet is not a design strategy. It is a visual choice. It only becomes a strategy when the removal is deliberate, tested, and grounded in what the player actually needs at any given moment.',
      },
      {
        type: 'heading',
        text: 'The Difference Between Visual Noise and Load-Bearing Information',
      },
      {
        type: 'paragraph',
        text: 'Not all screen elements are equal. Some exist because a feature team added them and no one removed them. Some exist because they carry information the player acts on every few seconds. The job of the HUD designer is to know which is which.',
      },
      {
        type: 'paragraph',
        text: 'Visual noise is any element that takes up attention without giving back useful information at the moment it is needed. A crosshair that animates when there is no target nearby. A buff icon that is always active and never changes. A compass that the player does not use because navigation is handled by waypoints.',
      },
      {
        type: 'paragraph',
        text: 'Load-bearing information is anything the player needs to make a decision. Health when in combat. Ammo count before a long engagement. Ability cooldowns when playing a character with timed abilities. The distinction is always contextual. Ammo count is noise in a game without scarcity. It is load-bearing in a survival shooter.',
      },
      {
        type: 'callout',
        text: 'The skill is not removing things. The skill is knowing which noise is doing structural work, and which structural elements only look like noise.',
      },
      {
        type: 'heading',
        text: 'How to Identify What a Player Actually Needs',
      },
      {
        type: 'paragraph',
        text: 'The most reliable method is observation. Watch players play without explaining the HUD first. Note where their eyes go under pressure. Count how many times they pause to read an element versus how many times they act on it instinctively. If an element is read but not acted on, it is probably decorative. If it is acted on but never consciously read, it is working through peripheral vision, and you should not move it.',
      },
      {
        type: 'paragraph',
        text: 'A simpler method for early stages: ask three questions before removing anything from the HUD.',
      },
      {
        type: 'subheading',
        text: 'The 3 Questions Before Removing a HUD Element',
      },
      {
        type: 'list',
        items: [
          'What decision does this element support? If you cannot name a specific player decision, the element is a candidate for removal.',
          'How often is that decision made? If the answer is "rarely," consider contextual display rather than permanent removal.',
          'What is the cost of making that decision without this element? If the cost is frustration or death, the element is load-bearing regardless of how it looks.',
        ],
      },
      {
        type: 'heading',
        text: 'Genre Changes the Answer',
      },
      {
        type: 'paragraph',
        text: 'There is no universal HUD standard because different genres place different cognitive demands on players.',
      },
      {
        type: 'paragraph',
        text: 'In action games with high kinesthetic feedback, players track health through animation cues and sound. The health bar becomes secondary. Reducing it makes sense. In turn-based RPGs, players need to read numbers precisely before committing to an action. Density is appropriate because the cognitive mode is analytical, not reactive.',
      },
      {
        type: 'paragraph',
        text: 'Survival games operate under resource scarcity. Hunger, thirst, temperature, stamina — each is load-bearing because the player must plan around all of them. A minimal HUD in a survival game is a design opinion that the player should manage complexity mentally rather than visually. That is a valid choice, but it is a high-skill demand, not an aesthetic one.',
      },
      {
        type: 'paragraph',
        text: 'Shooters occupy a middle ground. Core combat information — health, ammo, ability state — needs to be readable in under a second. Everything else can be contextual. Kill feed, scoreboard, objective distance: these are secondary and should not compete with primary combat state.',
      },
      {
        type: 'heading',
        text: 'Clarity as an Active Design Goal',
      },
      {
        type: 'paragraph',
        text: 'The HUDs that work best are not the ones with the fewest elements. They are the ones where every element has earned its place. Some of those screens are dense. Some are sparse. What they share is that nothing on the screen is there by accident.',
      },
      {
        type: 'paragraph',
        text: 'Set clarity as an explicit target before the aesthetic discussion starts. Define it as: "every piece of information on screen supports a player decision at the moment they need to make it." Evaluate each element against that definition. Then talk about visual style.',
      },
      {
        type: 'paragraph',
        text: 'A clear HUD that looks busy is a better product than a clean HUD that leaves players guessing. In testing, one produces flow. The other produces error messages and refund requests.',
      },
    ],
    es: [
      {
        type: 'paragraph',
        text: 'Existe un patrón recurrente en los rediseños de HUD: un equipo elimina la mitad de los elementos de pantalla, lo llama minimalista, lo lanza, y luego pasa los siguientes dos parches añadiendo cosas de vuelta. Los jugadores reportaron que no podían saber de dónde recibían daño. No podían rastrear sus tiempos de reutilización. Perdían la noción de cuánto tiempo quedaba.',
      },
      {
        type: 'paragraph',
        text: 'El HUD se veía limpio. No era claro. Son cualidades diferentes, y confundirlas produce interfaces que se ven bien en capturas de pantalla y juegan mal.',
      },
      {
        type: 'heading',
        text: 'La trampa del minimalismo',
      },
      {
        type: 'paragraph',
        text: 'El minimalismo se convirtió en la referencia estética predeterminada para la UI de videojuegos hacia mediados de los años 2010. La influencia del diseño plano, las convenciones móviles y las capturas compartidas en redes sociales empujaron hacia la reducción. Una captura de pantalla de un HUD limpio recibe más likes que uno cargado. Es un incentivo real que afecta decisiones de diseño reales.',
      },
      {
        type: 'paragraph',
        text: 'El problema es que las capturas no representan la experiencia de jugar. Un jugador en combate no está mirando la pantalla con calma. Está procesando múltiples entradas simultáneamente bajo carga cognitiva. La pregunta no es "¿se ve bien este HUD en reposo?" La pregunta es "¿funciona este HUD bajo presión?"',
      },
      {
        type: 'paragraph',
        text: 'Eliminar elementos para lograr silencio visual no es una estrategia de diseño. Es una elección visual. Solo se convierte en estrategia cuando la eliminación es deliberada, probada y fundamentada en lo que el jugador realmente necesita en cada momento.',
      },
      {
        type: 'heading',
        text: 'La diferencia entre ruido visual e información estructural',
      },
      {
        type: 'paragraph',
        text: 'No todos los elementos de pantalla son iguales. Algunos existen porque un equipo de funcionalidades los añadió y nadie los eliminó. Otros existen porque llevan información sobre la que el jugador actúa cada pocos segundos. El trabajo del diseñador de HUD es saber cuál es cuál.',
      },
      {
        type: 'paragraph',
        text: 'El ruido visual es cualquier elemento que consume atención sin devolver información útil en el momento en que se necesita. Un punto de mira que se anima cuando no hay objetivo cercano. Un ícono de mejora que siempre está activo y nunca cambia. Una brújula que el jugador no usa porque la navegación la manejan los marcadores de ruta.',
      },
      {
        type: 'paragraph',
        text: 'La información estructural es todo aquello que el jugador necesita para tomar una decisión. La salud en combate. El conteo de munición antes de un enfrentamiento largo. Los tiempos de reutilización de habilidades cuando se juega con un personaje de habilidades temporizadas. La distinción siempre es contextual. El conteo de munición es ruido en un juego sin escasez. Es información estructural en un shooter de supervivencia.',
      },
      {
        type: 'callout',
        text: 'La habilidad no está en eliminar cosas. Está en saber qué ruido está cumpliendo una función estructural, y qué elementos estructurales solo parecen ruido.',
      },
      {
        type: 'heading',
        text: 'Cómo identificar lo que el jugador realmente necesita',
      },
      {
        type: 'paragraph',
        text: 'El método más confiable es la observación. Mira a los jugadores jugar sin explicarles el HUD primero. Nota hacia dónde van sus ojos bajo presión. Cuenta cuántas veces pausan para leer un elemento versus cuántas veces actúan sobre él de forma instintiva. Si se lee pero no se actúa, probablemente es decorativo. Si se actúa pero nunca se lee conscientemente, está funcionando a través de la visión periférica, y no deberías moverlo.',
      },
      {
        type: 'paragraph',
        text: 'Un método más simple para etapas tempranas: hazte tres preguntas antes de eliminar cualquier cosa del HUD.',
      },
      {
        type: 'subheading',
        text: 'Las 3 preguntas antes de eliminar un elemento del HUD',
      },
      {
        type: 'list',
        items: [
          '¿Qué decisión del jugador apoya este elemento? Si no puedes nombrar una decisión específica del jugador, el elemento es candidato a eliminarse.',
          '¿Con qué frecuencia se toma esa decisión? Si la respuesta es "rara vez", considera mostrar el elemento de forma contextual en lugar de eliminarlo permanentemente.',
          '¿Cuál es el costo de tomar esa decisión sin este elemento? Si el costo es frustración o muerte, el elemento es estructural independientemente de cómo se vea.',
        ],
      },
      {
        type: 'heading',
        text: 'El género cambia la respuesta',
      },
      {
        type: 'paragraph',
        text: 'No existe un estándar universal de HUD porque distintos géneros imponen diferentes demandas cognitivas sobre los jugadores.',
      },
      {
        type: 'paragraph',
        text: 'En los juegos de acción con alta retroalimentación cinestésica, los jugadores rastrean la salud a través de señales de animación y sonido. La barra de vida se vuelve secundaria. Reducirla tiene sentido. En los RPG por turnos, los jugadores necesitan leer números con precisión antes de comprometerse con una acción. La densidad es apropiada porque el modo cognitivo es analítico, no reactivo.',
      },
      {
        type: 'paragraph',
        text: 'Los juegos de supervivencia operan bajo escasez de recursos. Hambre, sed, temperatura, resistencia: cada uno es estructural porque el jugador debe planificar en torno a todos ellos. Un HUD mínimo en un juego de supervivencia es una opinión de diseño de que el jugador debe gestionar la complejidad mentalmente en lugar de visualmente. Es una elección válida, pero es una demanda de alta habilidad, no una elección estética.',
      },
      {
        type: 'paragraph',
        text: 'Los shooters ocupan un punto intermedio. La información de combate central — salud, munición, estado de habilidades — debe ser legible en menos de un segundo. Todo lo demás puede ser contextual. El registro de eliminaciones, el marcador, la distancia al objetivo: son secundarios y no deben competir con el estado primario de combate.',
      },
      {
        type: 'heading',
        text: 'La claridad como objetivo de diseño activo',
      },
      {
        type: 'paragraph',
        text: 'Los HUDs que mejor funcionan no son los que tienen menos elementos. Son aquellos en los que cada elemento ha ganado su lugar. Algunas de esas pantallas son densas. Otras son escasas. Lo que comparten es que nada en la pantalla está ahí por accidente.',
      },
      {
        type: 'paragraph',
        text: 'Establece la claridad como objetivo explícito antes de que comience la discusión estética. Defínela como: "cada pieza de información en pantalla apoya una decisión del jugador en el momento en que necesita tomarla." Evalúa cada elemento frente a esa definición. Luego habla de estilo visual.',
      },
      {
        type: 'paragraph',
        text: 'Un HUD claro que se ve cargado es un mejor producto que un HUD limpio que deja a los jugadores adivinando. En pruebas, uno produce fluidez. El otro produce mensajes de error y solicitudes de reembolso.',
      },
    ],
  },

  'feedback-reduces-guesswork': {
    en: [
      {
        type: 'paragraph',
        text: 'When feedback is weak, players guess. They press a button and wonder if it registered. They activate an ability and are not sure if the cooldown started. They take a hit and cannot tell where it came from. Each of these moments is a small friction. Across a session, they accumulate into something that feels like a poor-quality game, even when the underlying systems are solid.',
      },
      {
        type: 'paragraph',
        text: 'Feedback is not a polish pass. It is a structural element of how a player understands a game. Getting it wrong early means more work to fix it later, because weak feedback produces player behavior that looks like a design problem but is actually a communication problem.',
      },
      {
        type: 'heading',
        text: 'What Feedback Actually Is',
      },
      {
        type: 'paragraph',
        text: 'Feedback in game UI is the system\'s response to player action or state change. It has three distinct functions:',
      },
      {
        type: 'list',
        items: [
          'Action confirmation: telling the player their input was received and is being processed',
          'State change signal: indicating that something in the game world has changed as a result',
          'Consequence acknowledgment: communicating the outcome of that change and its significance',
        ],
      },
      {
        type: 'paragraph',
        text: 'These are not the same thing, and a game can fail at any one of them independently. You can have solid action confirmation with no state change signal. You can have state change signals with no consequence acknowledgment. Each gap creates a different kind of player confusion.',
      },
      {
        type: 'heading',
        text: 'The 3 Confirmation Gaps That Hurt Most',
      },
      {
        type: 'subheading',
        text: 'Gap 1: Action Confirmation',
      },
      {
        type: 'paragraph',
        text: 'The player presses a button. Nothing happens immediately because the action has a cast time, a wind-up, or network latency. The player presses it again. Now they have double-queued or cancelled the action. This is the "did it work?" problem.',
      },
      {
        type: 'paragraph',
        text: 'The fix is not removing the latency. It is acknowledging the input immediately, even before the effect resolves. A visual change in the button, a sound, a brief animation on the character — anything that says "I received this." Players can tolerate delay. They cannot tolerate silence.',
      },
      {
        type: 'subheading',
        text: 'Gap 2: State Change Signal',
      },
      {
        type: 'paragraph',
        text: 'The player activates a buff. They are not sure if it applied. They check the status bar. The icon is there, but it looks identical to three other icons. They do not know which one is the one they just activated, or how long it lasts.',
      },
      {
        type: 'paragraph',
        text: 'State change signals need to be distinct, legible, and positioned where the player\'s attention already is. A new icon appearing in a corner the player is not watching is not a signal. It is information stored in a place no one checks.',
      },
      {
        type: 'subheading',
        text: 'Gap 3: Consequence Acknowledgment',
      },
      {
        type: 'paragraph',
        text: 'The player lands a critical hit. They know because the number is big. But they do not know what changed downstream. Did the enemy\'s behavior change? Did a phase trigger? Did they unlock a window for a follow-up attack? If those consequences are not communicated, the player cannot learn to build strategy around them.',
      },
      {
        type: 'paragraph',
        text: 'Consequence acknowledgment is where tutorial systems most commonly fail. Players are told to do something, they do it, and they never learn what it achieved. They complete the tutorial action without understanding why it mattered.',
      },
      {
        type: 'heading',
        text: 'Latency and the "Did It Work?" Problem',
      },
      {
        type: 'paragraph',
        text: 'Latency makes action confirmation harder in networked games. The server must validate the action before the game world responds. In that gap — 50 milliseconds to 200 milliseconds on a good connection — the player is reading silence.',
      },
      {
        type: 'paragraph',
        text: 'The standard solution is client-side prediction: the client shows the result of the action immediately and corrects it if the server disagrees. The UI corollary is predictive feedback: respond to the input on the client side before the server confirms. This requires coordination between UI and engineering, but it is worth it. Players judge responsiveness on perceived speed, not actual server round-trip time.',
      },
      {
        type: 'callout',
        text: 'Strong feedback is not louder effects or more visual noise. It is the right signal at the right moment, delivered at the right position in the player\'s attention field.',
      },
      {
        type: 'heading',
        text: 'How to Layer Feedback Without Creating Noise',
      },
      {
        type: 'paragraph',
        text: 'Multiple feedback channels reinforce each other without requiring each one to carry the full load. A well-layered feedback system uses:',
      },
      {
        type: 'list',
        items: [
          'Visual: on-screen indicator, color change, animation, particle effect',
          'Audio: confirmation sound, ambient state audio, escalating audio for critical states',
          'Haptic: controller vibration pattern tied to feedback type (available on console and some PC peripherals)',
          'Spatial: world-space indicators for directional information (damage direction, objective distance)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Layering only creates noise when channels conflict or duplicate without purpose. If the sound says one thing and the visual says another, the player is not getting layered feedback — they are getting contradictory signals. Align channels first. Then add layers.',
      },
      {
        type: 'heading',
        text: 'Building a Feedback Audit',
      },
      {
        type: 'paragraph',
        text: 'A feedback audit is a structured review of every player action in a game and the feedback it produces. The process:',
      },
      {
        type: 'list',
        items: [
          'List every primary and secondary player action in the game',
          'For each action, document what feedback exists across all channels',
          'Rate each feedback on three axes: speed (does it arrive in time?), clarity (is it distinct and readable?), completeness (does it cover action confirmation, state change, and consequence?)',
          'Flag any action that scores low on any axis',
          'Prioritize fixes by frequency of action — high-frequency actions with weak feedback affect every session',
        ],
      },
      {
        type: 'paragraph',
        text: 'Run this audit early and repeat it after major feature additions. New features often inherit weak feedback because they were built to satisfy functional requirements, not communication ones. A feature that works correctly but gives no feedback is only half built.',
      },
      {
        type: 'paragraph',
        text: 'Players learn games through feedback loops. Remove the loops and they cannot learn. Give them incomplete loops and they develop incorrect mental models. Strong, complete, layered feedback is not about making a game feel polished. It is about making it possible to play with competence.',
      },
    ],
    es: [
      {
        type: 'paragraph',
        text: 'Cuando la retroalimentación es débil, los jugadores adivinan. Presionan un botón y se preguntan si se registró. Activan una habilidad y no están seguros de si el tiempo de reutilización comenzó. Reciben un golpe y no pueden saber de dónde vino. Cada uno de estos momentos es una pequeña fricción. A lo largo de una sesión, se acumulan en algo que se siente como un juego de baja calidad, incluso cuando los sistemas subyacentes son sólidos.',
      },
      {
        type: 'paragraph',
        text: 'La retroalimentación no es un ajuste de pulido final. Es un elemento estructural de cómo un jugador entiende un juego. Equivocarse en esto desde el principio significa más trabajo para corregirlo después, porque la retroalimentación débil produce comportamientos de jugador que parecen un problema de diseño pero en realidad son un problema de comunicación.',
      },
      {
        type: 'heading',
        text: 'Qué es realmente la retroalimentación',
      },
      {
        type: 'paragraph',
        text: 'La retroalimentación en la UI de videojuegos es la respuesta del sistema a la acción del jugador o al cambio de estado. Tiene tres funciones distintas:',
      },
      {
        type: 'list',
        items: [
          'Confirmación de acción: indicar al jugador que su entrada fue recibida y está siendo procesada',
          'Señal de cambio de estado: indicar que algo en el mundo del juego cambió como resultado',
          'Reconocimiento de consecuencia: comunicar el resultado de ese cambio y su importancia',
        ],
      },
      {
        type: 'paragraph',
        text: 'Estas no son la misma cosa, y un juego puede fallar en cualquiera de ellas de forma independiente. Puedes tener una confirmación de acción sólida sin señal de cambio de estado. Puedes tener señales de cambio de estado sin reconocimiento de consecuencia. Cada brecha crea un tipo diferente de confusión en el jugador.',
      },
      {
        type: 'heading',
        text: 'Las 3 brechas de confirmación que más dañan',
      },
      {
        type: 'subheading',
        text: 'Brecha 1: Confirmación de acción',
      },
      {
        type: 'paragraph',
        text: 'El jugador presiona un botón. Nada sucede inmediatamente porque la acción tiene un tiempo de lanzamiento, una preparación o latencia de red. El jugador lo presiona de nuevo. Ahora ha puesto en cola doble o cancelado la acción. Este es el problema del "¿funcionó?".',
      },
      {
        type: 'paragraph',
        text: 'La solución no es eliminar la latencia. Es reconocer la entrada de inmediato, incluso antes de que el efecto se resuelva. Un cambio visual en el botón, un sonido, una breve animación en el personaje: cualquier cosa que diga "recibí esto." Los jugadores pueden tolerar el retraso. No pueden tolerar el silencio.',
      },
      {
        type: 'subheading',
        text: 'Brecha 2: Señal de cambio de estado',
      },
      {
        type: 'paragraph',
        text: 'El jugador activa una mejora. No está seguro de si se aplicó. Revisa la barra de estado. El ícono está ahí, pero se ve idéntico a otros tres íconos. No sabe cuál es el que acaba de activar ni cuánto dura.',
      },
      {
        type: 'paragraph',
        text: 'Las señales de cambio de estado deben ser distintas, legibles y posicionadas donde la atención del jugador ya está. Un ícono nuevo que aparece en una esquina que el jugador no está mirando no es una señal. Es información almacenada en un lugar que nadie revisa.',
      },
      {
        type: 'subheading',
        text: 'Brecha 3: Reconocimiento de consecuencia',
      },
      {
        type: 'paragraph',
        text: 'El jugador hace un golpe crítico. Lo sabe porque el número es grande. Pero no sabe qué cambió después. ¿Cambió el comportamiento del enemigo? ¿Se activó una fase? ¿Desbloquearon una ventana para un ataque de seguimiento? Si esas consecuencias no se comunican, el jugador no puede aprender a construir estrategia alrededor de ellas.',
      },
      {
        type: 'paragraph',
        text: 'El reconocimiento de consecuencia es donde los sistemas de tutorial fallan con mayor frecuencia. Se indica a los jugadores que hagan algo, lo hacen, y nunca aprenden qué lograron. Completan la acción del tutorial sin entender por qué importaba.',
      },
      {
        type: 'heading',
        text: 'La latencia y el problema del "¿funcionó?"',
      },
      {
        type: 'paragraph',
        text: 'La latencia hace más difícil la confirmación de acción en juegos en red. El servidor debe validar la acción antes de que el mundo del juego responda. En esa brecha — de 50 a 200 milisegundos en una buena conexión — el jugador está leyendo silencio.',
      },
      {
        type: 'paragraph',
        text: 'La solución estándar es la predicción del lado del cliente: el cliente muestra el resultado de la acción de inmediato y lo corrige si el servidor no está de acuerdo. El corolario en UI es la retroalimentación predictiva: responder a la entrada del lado del cliente antes de que el servidor confirme. Esto requiere coordinación entre UI e ingeniería, pero vale la pena. Los jugadores juzgan la capacidad de respuesta por la velocidad percibida, no por el tiempo real de ida y vuelta del servidor.',
      },
      {
        type: 'callout',
        text: 'Una retroalimentación sólida no es efectos más fuertes ni más ruido visual. Es la señal correcta en el momento correcto, entregada en la posición correcta dentro del campo de atención del jugador.',
      },
      {
        type: 'heading',
        text: 'Cómo capas la retroalimentación sin crear ruido',
      },
      {
        type: 'paragraph',
        text: 'Múltiples canales de retroalimentación se refuerzan mutuamente sin requerir que cada uno cargue con todo el peso. Un sistema de retroalimentación bien estructurado usa:',
      },
      {
        type: 'list',
        items: [
          'Visual: indicador en pantalla, cambio de color, animación, efecto de partículas',
          'Audio: sonido de confirmación, audio de estado ambiental, audio escalado para estados críticos',
          'Háptico: patrón de vibración del control vinculado al tipo de retroalimentación (disponible en consola y algunos periféricos de PC)',
          'Espacial: indicadores en el espacio del mundo para información direccional (dirección del daño, distancia al objetivo)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Las capas solo crean ruido cuando los canales entran en conflicto o se duplican sin propósito. Si el sonido dice una cosa y el visual dice otra, el jugador no recibe retroalimentación en capas: recibe señales contradictorias. Alinea los canales primero. Luego añade capas.',
      },
      {
        type: 'heading',
        text: 'Cómo construir una auditoría de retroalimentación',
      },
      {
        type: 'paragraph',
        text: 'Una auditoría de retroalimentación es una revisión estructurada de cada acción del jugador en un juego y la retroalimentación que produce. El proceso:',
      },
      {
        type: 'list',
        items: [
          'Lista cada acción primaria y secundaria del jugador en el juego',
          'Para cada acción, documenta qué retroalimentación existe en todos los canales',
          'Califica cada retroalimentación en tres ejes: velocidad (¿llega a tiempo?), claridad (¿es distintiva y legible?), completitud (¿cubre confirmación de acción, cambio de estado y consecuencia?)',
          'Marca cualquier acción que puntúe bajo en cualquier eje',
          'Prioriza las correcciones por frecuencia de acción: las acciones de alta frecuencia con retroalimentación débil afectan cada sesión',
        ],
      },
      {
        type: 'paragraph',
        text: 'Realiza esta auditoría temprano y repítela después de añadir funcionalidades importantes. Las nuevas funciones a menudo heredan retroalimentación débil porque fueron construidas para satisfacer requisitos funcionales, no de comunicación. Una función que trabaja correctamente pero no da retroalimentación solo está hecha a medias.',
      },
      {
        type: 'paragraph',
        text: 'Los jugadores aprenden los juegos a través de bucles de retroalimentación. Elimina los bucles y no pueden aprender. Dales bucles incompletos y desarrollarán modelos mentales incorrectos. Una retroalimentación sólida, completa y en capas no es cuestión de hacer que un juego se sienta pulido. Es cuestión de hacerlo posible de jugar con competencia.',
      },
    ],
  },

  'ui-terminology-for-game-teams': {
    en: [
      {
        type: 'paragraph',
        text: 'A designer says "HUD element." An engineer hears "any UI that appears on screen during play." They build accordingly. The feature ships. The feature is wrong. Not because either person was incompetent, but because the term was not precise enough to carry the requirement.',
      },
      {
        type: 'paragraph',
        text: 'Shared language is infrastructure. It does not need to be elaborate. It needs to be agreed upon, written down, and consistently used. Here is a working vocabulary for game UI teams.',
      },
      {
        type: 'heading',
        text: 'HUD and Its Subcategories',
      },
      {
        type: 'paragraph',
        text: 'HUD stands for heads-up display. In game UI it refers to the information layer overlaid on the gameplay view. It is not synonymous with all in-game UI. Menus, dialogues, and inventories are UI but not HUD.',
      },
      {
        type: 'paragraph',
        text: 'HUD subcategories that matter in production:',
      },
      {
        type: 'list',
        items: [
          'Persistent HUD: elements always visible during play regardless of game state. Health bar, minimap, ammo counter.',
          'Contextual HUD: elements that appear only under specific conditions. Low health warning, interaction prompt, aim reticle.',
          'Radial HUD: elements arranged radially around a center point, often used for ability selection or quick item access.',
          'World-space HUD: elements anchored to positions in the 3D world, not to the screen. Enemy health bars, waypoint markers.',
        ],
      },
      {
        type: 'heading',
        text: 'Diegetic, Non-Diegetic, Spatial, and Meta UI',
      },
      {
        type: 'paragraph',
        text: 'This classification comes from film theory and describes the relationship between a UI element and the fiction of the game world.',
      },
      {
        type: 'list',
        items: [
          'Diegetic: exists in the game world. The character can see it. A watch on the character\'s wrist showing in-game time, a radar mounted in a vehicle cockpit, a health gauge visible on a weapon.',
          'Non-diegetic: exists outside the game world. The player sees it, the character does not. Traditional HUD overlays: health bars, ammo counts, ability icons.',
          'Spatial: anchored to the world but not part of it. Floating markers above enemies or objectives. The character theoretically cannot see them but they exist in world space.',
          'Meta: communicates through the game\'s fiction metaphorically. Screen blood effects when health is low, screen cracks when taking damage. Not strictly in the world, not strictly outside it.',
        ],
      },
      {
        type: 'callout',
        text: 'When a designer says "HUD element" and an engineer hears "any UI on screen," you have already lost half the precision you need to build the right thing.',
      },
      {
        type: 'heading',
        text: 'Component States',
      },
      {
        type: 'paragraph',
        text: 'Every interactive component has states. Documenting them is not optional. An undocumented state becomes a bug or an inconsistency. The standard states:',
      },
      {
        type: 'list',
        items: [
          'Default: the component at rest, no interaction',
          'Hover: cursor or selection indicator over the component (relevant for mouse and gamepad focus)',
          'Active / Pressed: the moment of interaction',
          'Selected: a persistent chosen state, distinct from active',
          'Disabled: the component exists but cannot be interacted with',
          'Loading: the component is waiting for an async operation to complete',
          'Error: the component is in a failure state, needs player attention or recovery',
          'Empty: the component exists but has no content to display',
        ],
      },
      {
        type: 'paragraph',
        text: 'Not every component needs every state. A static display panel does not have a hover state. But every state the component can reach must be designed and specified.',
      },
      {
        type: 'heading',
        text: 'Stacking and Layering Systems',
      },
      {
        type: 'paragraph',
        text: 'Stacking refers to how UI elements are ordered on the Z-axis relative to each other. Without a documented stacking system, engineers make local decisions that conflict across features.',
      },
      {
        type: 'paragraph',
        text: 'Define stacking layers in a shared document with explicit priority numbers. A minimal game stacking system might look like:',
      },
      {
        type: 'list',
        items: [
          'Layer 0 — Game world',
          'Layer 10 — World-space UI (floating markers)',
          'Layer 20 — Persistent HUD',
          'Layer 30 — Contextual HUD',
          'Layer 40 — Modal overlays (pause menu, inventory)',
          'Layer 50 — Critical alerts (connection lost, session ending)',
          'Layer 60 — System UI (OS notifications, platform overlays)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Any element can then be placed in the correct layer by design decision, not by engineer approximation.',
      },
      {
        type: 'heading',
        text: 'Handoff Language',
      },
      {
        type: 'paragraph',
        text: 'Design specs are only useful if the person reading them understands the terms. Establish standard handoff language at the start of a project and include it in the component documentation.',
      },
      {
        type: 'list',
        items: [
          'Use "panel" for container elements, not "box," "card," "window," or "div"',
          'Use "icon" for small standalone graphics, not "sprite" or "image" unless file format matters',
          'Use "label" for text that describes another element, not "copy" or "text"',
          'Use "indicator" for elements that show status, not "badge," "dot," or "pip" — unless those are defined terms in the system',
          'Use "trigger" for the element that opens another UI, not "button" when the result is non-destructive or navigational',
        ],
      },
      {
        type: 'paragraph',
        text: 'These conventions are not universal — the point is not to use these specific words but to agree on specific words and stick to them. Inconsistent terminology in a spec file forces engineers to interpret rather than implement. Interpretation produces deviation. Deviation produces bugs.',
      },
    ],
    es: [
      {
        type: 'paragraph',
        text: 'Un diseñador dice "elemento del HUD." Un ingeniero escucha "cualquier UI que aparece en pantalla durante el juego." Construye en consecuencia. La función se lanza. La función está mal. No porque ninguno fuera incompetente, sino porque el término no era suficientemente preciso para llevar el requisito.',
      },
      {
        type: 'paragraph',
        text: 'El lenguaje compartido es infraestructura. No necesita ser elaborado. Necesita estar acordado, escrito y usado de forma consistente. Aquí hay un vocabulario de trabajo para equipos de UI en videojuegos.',
      },
      {
        type: 'heading',
        text: 'El HUD y sus subcategorías',
      },
      {
        type: 'paragraph',
        text: 'HUD significa "heads-up display" (pantalla superpuesta). En UI de videojuegos se refiere a la capa de información superpuesta sobre la vista del juego. No es sinónimo de toda la UI del juego. Los menús, los diálogos y los inventarios son UI pero no son HUD.',
      },
      {
        type: 'paragraph',
        text: 'Subcategorías del HUD que importan en producción:',
      },
      {
        type: 'list',
        items: [
          'HUD persistente: elementos siempre visibles durante el juego independientemente del estado. Barra de salud, minimapa, contador de munición.',
          'HUD contextual: elementos que aparecen solo bajo condiciones específicas. Advertencia de salud baja, indicación de interacción, mira de puntería.',
          'HUD radial: elementos dispuestos radialmente alrededor de un punto central, frecuentemente usado para selección de habilidades o acceso rápido a objetos.',
          'HUD en espacio del mundo: elementos anclados a posiciones en el mundo 3D, no a la pantalla. Barras de vida de enemigos, marcadores de ruta.',
        ],
      },
      {
        type: 'heading',
        text: 'UI diegética, no diegética, espacial y meta',
      },
      {
        type: 'paragraph',
        text: 'Esta clasificación viene de la teoría cinematográfica y describe la relación entre un elemento de UI y la ficción del mundo del juego.',
      },
      {
        type: 'list',
        items: [
          'Diegética: existe en el mundo del juego. El personaje puede verla. Un reloj en la muñeca del personaje que muestra la hora del juego, un radar montado en la cabina de un vehículo, un indicador de salud visible en un arma.',
          'No diegética: existe fuera del mundo del juego. El jugador la ve, el personaje no. Los overlays tradicionales del HUD: barras de salud, conteos de munición, íconos de habilidades.',
          'Espacial: anclada al mundo pero no parte de él. Marcadores flotantes sobre enemigos u objetivos. El personaje teóricamente no puede verlos pero existen en el espacio del mundo.',
          'Meta: comunica a través de la ficción del juego de forma metafórica. Efectos de sangre en pantalla cuando la salud es baja, grietas en la pantalla al recibir daño. No está estrictamente en el mundo, ni estrictamente fuera de él.',
        ],
      },
      {
        type: 'callout',
        text: 'Cuando un diseñador dice "elemento del HUD" y un ingeniero escucha "cualquier UI en pantalla," ya has perdido la mitad de la precisión que necesitas para construir lo correcto.',
      },
      {
        type: 'heading',
        text: 'Estados de componentes',
      },
      {
        type: 'paragraph',
        text: 'Todo componente interactivo tiene estados. Documentarlos no es opcional. Un estado no documentado se convierte en un error o una inconsistencia. Los estados estándar:',
      },
      {
        type: 'list',
        items: [
          'Predeterminado: el componente en reposo, sin interacción',
          'Hover: cursor o indicador de selección sobre el componente (relevante para mouse y foco en gamepad)',
          'Activo / Presionado: el momento de la interacción',
          'Seleccionado: un estado elegido persistente, distinto de activo',
          'Deshabilitado: el componente existe pero no puede ser interactuado',
          'Cargando: el componente espera que se complete una operación asíncrona',
          'Error: el componente está en estado de fallo, necesita la atención o recuperación del jugador',
          'Vacío: el componente existe pero no tiene contenido que mostrar',
        ],
      },
      {
        type: 'paragraph',
        text: 'No todo componente necesita todos los estados. Un panel de visualización estático no tiene un estado hover. Pero cada estado al que el componente puede llegar debe ser diseñado y especificado.',
      },
      {
        type: 'heading',
        text: 'Sistemas de apilamiento y capas',
      },
      {
        type: 'paragraph',
        text: 'El apilamiento se refiere a cómo se ordenan los elementos de UI en el eje Z en relación entre sí. Sin un sistema de apilamiento documentado, los ingenieros toman decisiones locales que entran en conflicto entre funcionalidades.',
      },
      {
        type: 'paragraph',
        text: 'Define las capas de apilamiento en un documento compartido con números de prioridad explícitos. Un sistema de apilamiento mínimo para un juego podría verse así:',
      },
      {
        type: 'list',
        items: [
          'Capa 0 — Mundo del juego',
          'Capa 10 — UI en espacio del mundo (marcadores flotantes)',
          'Capa 20 — HUD persistente',
          'Capa 30 — HUD contextual',
          'Capa 40 — Overlays modales (menú de pausa, inventario)',
          'Capa 50 — Alertas críticas (conexión perdida, fin de sesión)',
          'Capa 60 — UI del sistema (notificaciones del SO, overlays de plataforma)',
        ],
      },
      {
        type: 'paragraph',
        text: 'Cualquier elemento puede entonces colocarse en la capa correcta por decisión de diseño, no por aproximación del ingeniero.',
      },
      {
        type: 'heading',
        text: 'Lenguaje de entrega',
      },
      {
        type: 'paragraph',
        text: 'Las especificaciones de diseño solo son útiles si la persona que las lee entiende los términos. Establece un lenguaje estándar de entrega al inicio de un proyecto e inclúyelo en la documentación de componentes.',
      },
      {
        type: 'list',
        items: [
          'Usa "panel" para elementos contenedores, no "caja," "tarjeta," "ventana" o "div"',
          'Usa "ícono" para gráficos independientes pequeños, no "sprite" o "imagen" a menos que el formato de archivo importe',
          'Usa "etiqueta" para el texto que describe otro elemento, no "copy" o "texto"',
          'Usa "indicador" para elementos que muestran estado, no "insignia," "punto" o "pip" a menos que esos sean términos definidos en el sistema',
          'Usa "disparador" para el elemento que abre otra UI, no "botón" cuando el resultado no es destructivo o es navegacional',
        ],
      },
      {
        type: 'paragraph',
        text: 'Estas convenciones no son universales: el punto no es usar estas palabras específicas sino acordar palabras específicas y usarlas de forma consistente. La terminología inconsistente en un archivo de especificaciones obliga a los ingenieros a interpretar en lugar de implementar. La interpretación produce desviación. La desviación produce errores.',
      },
    ],
  },

  'game-accessibility-checklist': {
    en: [
      {
        type: 'paragraph',
        text: 'Accessibility settings are usually added late, assigned to a junior team member, and treated as a checkbox for platform certification. The result is a settings screen that exists but does not function as a system — options that were added without understanding what they should actually do.',
      },
      {
        type: 'paragraph',
        text: 'The teams that treat accessibility seriously end up with better interfaces across the board. Not by accident. Accessible design requires structural clarity. Structural clarity is good design. The relationship is direct.',
      },
      {
        type: 'heading',
        text: 'What Accessibility Settings Actually Reveal',
      },
      {
        type: 'paragraph',
        text: 'Each accessibility setting exposes a different assumption baked into the base design. When a player activates high contrast mode, they are saying they cannot use the design as delivered and need an alternative. When that mode breaks the interface, the interface had a structural problem that the visual design was papering over.',
      },
      {
        type: 'paragraph',
        text: 'Use accessibility settings as diagnostic tools, not just delivery requirements. Turn on every setting you offer and play the game. Note what breaks. Note what becomes clearer. The results will tell you more about your interface quality than a standard design review.',
      },
      {
        type: 'heading',
        text: 'High Contrast Mode as a Clarity Audit',
      },
      {
        type: 'paragraph',
        text: 'High contrast mode strips away decorative color and amplifies structural contrast. When you run it, every element that communicates through color alone becomes invisible or ambiguous. Buttons that rely on a subtle tint to indicate their state. Status icons that are differentiated only by hue. Progress bars where the fill color is the only indicator of progress.',
      },
      {
        type: 'callout',
        text: 'High contrast mode shows you which elements have structure independent of color. If they do not survive it, they are fragile by design. Fix the structure, not just the contrast setting.',
      },
      {
        type: 'paragraph',
        text: 'Every element that fails the high contrast test is a risk to all players under suboptimal display conditions: low-quality monitors, glare, ambient light, small screens. These conditions are common. Accessibility mode reveals them at maximum intensity.',
      },
      {
        type: 'heading',
        text: 'Subtitles and Information Hierarchy',
      },
      {
        type: 'paragraph',
        text: 'Subtitle implementation reveals how well a team understands information hierarchy. Poor subtitle systems display all audio as flat text: dialogue, ambient sound, music cues — everything at the same weight. Players who rely on subtitles cannot distinguish a critical NPC line from a background ambient sound label.',
      },
      {
        type: 'paragraph',
        text: 'Good subtitle systems teach you how to build better text hierarchies everywhere:',
      },
      {
        type: 'list',
        items: [
          'Speaker identification: label who is speaking so context is not lost without vocal cues',
          'Sound description vs. speech: distinguish between transcribed dialogue and described ambient sounds',
          'Priority levels: critical plot or instruction dialogue should be visually distinct from ambient commentary',
          'Timing accuracy: subtitles that lag the audio by more than a few hundred milliseconds break comprehension',
          'Positioning: subtitles should not obscure gameplay-critical screen areas during action sequences',
        ],
      },
      {
        type: 'heading',
        text: 'Colorblind Modes and Color-Independent Design',
      },
      {
        type: 'paragraph',
        text: 'About 8% of male players and 0.5% of female players have some form of color vision deficiency. Deuteranopia (red-green) is the most common type. Any game that uses red and green to communicate opposing states — health vs. damage, friend vs. foe, safe vs. danger — is creating barriers for a significant portion of its audience.',
      },
      {
        type: 'paragraph',
        text: 'The lesson from colorblind modes is not to add filters. It is to design color-independently from the start. This means:',
      },
      {
        type: 'list',
        items: [
          'Use shape and iconography alongside color — never color alone — to distinguish states',
          'Use brightness and saturation contrast as a secondary channel, not hue alone',
          'Test with the most common simulation filters: Deuteranopia, Protanopia, Tritanopia',
          'Define your critical color pairs early and check them against all three simulations before building UI around them',
        ],
      },
      {
        type: 'heading',
        text: 'Button Remapping as a Signal About Defaults',
      },
      {
        type: 'paragraph',
        text: 'Full button remapping is a significant engineering investment. Teams often resist it. But the existence of remapping requests is a signal worth reading: players want to remap controls when the defaults cause them physical discomfort or do not match their motor expectations.',
      },
      {
        type: 'paragraph',
        text: 'Before building a remapping system, audit your defaults. Frequent remapping of the same button combination is direct feedback that the default is wrong. If most players who use remapping all reassign the same three buttons, those three buttons have the wrong default assignments.',
      },
      {
        type: 'paragraph',
        text: 'Fix the defaults first. Then build remapping for the remaining edge cases. The investment in remapping is better spent if the defaults are already good for most players.',
      },
      {
        type: 'heading',
        text: 'Making the Case Internally',
      },
      {
        type: 'paragraph',
        text: 'Accessibility work is routinely deprioritized because the business case is framed incorrectly. It is presented as a cost of compliance rather than an expansion of audience and a quality investment.',
      },
      {
        type: 'paragraph',
        text: 'Better framing for internal advocacy:',
      },
      {
        type: 'list',
        items: [
          'Accessibility settings extend the playable life of a game for players as they age and their visual and motor acuity change',
          'Accessibility improvements often benefit all players — better subtitle systems, clearer UI contrast, and responsive controls are valued broadly',
          'Platform certification requirements are trending toward requiring accessibility features — building them early is cheaper than retrofitting',
          'Reviews and word-of-mouth explicitly mention accessibility quality, and this affects purchase decisions',
        ],
      },
      {
        type: 'paragraph',
        text: 'Accessibility is not a separate track from quality. It is a measure of it. Teams that internalize this ship better interfaces for every player, not just the ones who turn on the accessibility menu.',
      },
    ],
    es: [
      {
        type: 'paragraph',
        text: 'Las opciones de accesibilidad generalmente se añaden tarde, se asignan a un miembro junior del equipo y se tratan como una casilla para la certificación de plataforma. El resultado es una pantalla de configuración que existe pero no funciona como un sistema: opciones que se añadieron sin entender qué deberían hacer realmente.',
      },
      {
        type: 'paragraph',
        text: 'Los equipos que toman la accesibilidad en serio terminan con interfaces mejores en todos los aspectos. No por accidente. El diseño accesible requiere claridad estructural. La claridad estructural es buen diseño. La relación es directa.',
      },
      {
        type: 'heading',
        text: 'Lo que revelan realmente las opciones de accesibilidad',
      },
      {
        type: 'paragraph',
        text: 'Cada configuración de accesibilidad expone un supuesto integrado en el diseño base. Cuando un jugador activa el modo de alto contraste, está diciendo que no puede usar el diseño tal como fue entregado y necesita una alternativa. Cuando ese modo rompe la interfaz, la interfaz tenía un problema estructural que el diseño visual estaba ocultando.',
      },
      {
        type: 'paragraph',
        text: 'Usa las configuraciones de accesibilidad como herramientas de diagnóstico, no solo como requisitos de entrega. Activa cada configuración que ofreces y juega el juego. Nota qué se rompe. Nota qué se vuelve más claro. Los resultados te dirán más sobre la calidad de tu interfaz que una revisión de diseño estándar.',
      },
      {
        type: 'heading',
        text: 'El modo de alto contraste como auditoría de claridad',
      },
      {
        type: 'paragraph',
        text: 'El modo de alto contraste elimina el color decorativo y amplifica el contraste estructural. Cuando lo ejecutas, cada elemento que comunica solo a través del color se vuelve invisible o ambiguo. Botones que dependen de un matiz sutil para indicar su estado. Íconos de estado diferenciados solo por tono. Barras de progreso donde el color de relleno es el único indicador de progreso.',
      },
      {
        type: 'callout',
        text: 'El modo de alto contraste te muestra qué elementos tienen estructura independiente del color. Si no lo superan, son frágiles por diseño. Corrige la estructura, no solo la configuración de contraste.',
      },
      {
        type: 'paragraph',
        text: 'Cada elemento que falla la prueba de alto contraste es un riesgo para todos los jugadores en condiciones de visualización subóptimas: monitores de baja calidad, reflejos, luz ambiental, pantallas pequeñas. Estas condiciones son comunes. El modo de accesibilidad las revela a su máxima intensidad.',
      },
      {
        type: 'heading',
        text: 'Subtítulos y jerarquía de información',
      },
      {
        type: 'paragraph',
        text: 'La implementación de subtítulos revela qué tan bien un equipo entiende la jerarquía de información. Los sistemas de subtítulos deficientes muestran todo el audio como texto plano: diálogos, sonido ambiental, señales musicales, todo con el mismo peso. Los jugadores que dependen de los subtítulos no pueden distinguir una línea crítica de un PNJ de una etiqueta de sonido ambiental de fondo.',
      },
      {
        type: 'paragraph',
        text: 'Los buenos sistemas de subtítulos enseñan cómo construir mejores jerarquías de texto en todas partes:',
      },
      {
        type: 'list',
        items: [
          'Identificación del hablante: etiqueta quién está hablando para que el contexto no se pierda sin señales vocales',
          'Descripción de sonido vs. discurso: distingue entre diálogo transcrito y sonidos ambientales descritos',
          'Niveles de prioridad: el diálogo crítico de trama o instrucción debe ser visualmente distinto del comentario ambiental',
          'Precisión de tiempo: los subtítulos que se retrasan del audio más de unos pocos cientos de milisegundos rompen la comprensión',
          'Posicionamiento: los subtítulos no deben obstruir áreas de pantalla críticas para el juego durante secuencias de acción',
        ],
      },
      {
        type: 'heading',
        text: 'Modos para daltonismo y diseño independiente del color',
      },
      {
        type: 'paragraph',
        text: 'Aproximadamente el 8% de los jugadores masculinos y el 0,5% de los femeninos tienen alguna forma de deficiencia en la visión del color. La deuteranopía (rojo-verde) es el tipo más común. Cualquier juego que use rojo y verde para comunicar estados opuestos — salud frente a daño, amigo frente a enemigo, seguro frente a peligro — está creando barreras para una parte significativa de su audiencia.',
      },
      {
        type: 'paragraph',
        text: 'La lección de los modos para daltonismo no es añadir filtros. Es diseñar de forma independiente del color desde el principio. Esto significa:',
      },
      {
        type: 'list',
        items: [
          'Usa formas e iconografía junto con el color, nunca el color solo, para distinguir estados',
          'Usa el contraste de brillo y saturación como canal secundario, no solo el tono',
          'Prueba con los filtros de simulación más comunes: deuteranopía, protanopía, tritanopía',
          'Define tus pares de colores críticos desde el principio y compruébalos con las tres simulaciones antes de construir la UI alrededor de ellos',
        ],
      },
      {
        type: 'heading',
        text: 'La reasignación de botones como señal sobre los valores predeterminados',
      },
      {
        type: 'paragraph',
        text: 'La reasignación completa de botones es una inversión de ingeniería significativa. Los equipos a menudo se resisten. Pero la existencia de solicitudes de reasignación es una señal que vale la pena leer: los jugadores quieren reasignar controles cuando los predeterminados les causan molestias físicas o no coinciden con sus expectativas motoras.',
      },
      {
        type: 'paragraph',
        text: 'Antes de construir un sistema de reasignación, audita tus valores predeterminados. La reasignación frecuente de la misma combinación de botones es retroalimentación directa de que el predeterminado está mal. Si la mayoría de los jugadores que usan la reasignación todos reasignan los mismos tres botones, esos tres botones tienen las asignaciones predeterminadas incorrectas.',
      },
      {
        type: 'paragraph',
        text: 'Arregla primero los predeterminados. Luego construye la reasignación para los casos límite restantes. La inversión en reasignación es mejor utilizada si los predeterminados ya son buenos para la mayoría de los jugadores.',
      },
      {
        type: 'heading',
        text: 'Cómo defender la accesibilidad internamente',
      },
      {
        type: 'paragraph',
        text: 'El trabajo de accesibilidad se desprioriza sistemáticamente porque el argumento de negocio se enmarca incorrectamente. Se presenta como un costo de cumplimiento en lugar de una expansión de audiencia y una inversión en calidad.',
      },
      {
        type: 'paragraph',
        text: 'Un mejor enfoque para la defensa interna:',
      },
      {
        type: 'list',
        items: [
          'Las configuraciones de accesibilidad extienden la vida útil jugable de un juego a medida que los jugadores envejecen y su agudeza visual y motora cambia',
          'Las mejoras de accesibilidad a menudo benefician a todos los jugadores: mejores sistemas de subtítulos, mayor contraste de UI y controles más reactivos son valorados ampliamente',
          'Los requisitos de certificación de plataforma tienden a requerir funciones de accesibilidad: construirlas temprano es más barato que añadirlas después',
          'Las reseñas y el boca a boca mencionan explícitamente la calidad de accesibilidad, y esto afecta las decisiones de compra',
        ],
      },
      {
        type: 'paragraph',
        text: 'La accesibilidad no es una vía separada de la calidad. Es una medida de ella. Los equipos que internalizan esto lanzan mejores interfaces para todos los jugadores, no solo para los que abren el menú de accesibilidad.',
      },
    ],
  },

  'vr-ux-interface-clarity': {
    en: [
      {
        type: 'paragraph',
        text: 'Designers who move from flat-screen game UI to VR interface design carry significant expertise — and a significant liability. The liability is the assumption that most of what works on a monitor will work in a headset. It does not. The proportion of transferable knowledge is closer to 40% than 90%, and understanding which 40% is the first job.',
      },
      {
        type: 'paragraph',
        text: 'The rules that transfer: visual hierarchy, contrast principles, color theory, feedback timing, information architecture. The rules that do not: standard font sizing, fixed-position UI conventions, mouse-first interaction patterns, flat composition principles. In VR, proximity, angle, depth, and the physical relationship between the player\'s body and the interface all change the design equation.',
      },
      {
        type: 'heading',
        text: 'The 40% Transfer Problem',
      },
      {
        type: 'paragraph',
        text: 'Experienced UI designers entering VR for the first time make predictable mistakes. They size text for monitor reading distances and find it unreadable in headset. They anchor UI to screen positions and discover those positions do not exist in 3D space. They design interactions that assume precise cursor control and run into the limited fine-motor accuracy of hand tracking or controller pointer input.',
      },
      {
        type: 'paragraph',
        text: 'The fastest path to competence is not more theoretical learning. It is time in the headset. Design a prototype. Put it on. Spend 30 minutes using it. Come back to the flat screen with a list of what you misunderstood. Repeat.',
      },
      {
        type: 'callout',
        text: 'The most common VR UI mistake is treating the headset like a curved monitor. The reading distance, the relationship between body and interface, and the perceptual weight of floating elements all change the rules.',
      },
      {
        type: 'heading',
        text: 'Legibility at Distance: Fonts in Headset',
      },
      {
        type: 'paragraph',
        text: 'Font sizing in VR is not measured in pixels. It is measured in degrees of arc in the field of view. A font that reads well on a monitor at 60cm is not the same size as a font that reads well on a VR interface element at virtual 1 meter distance.',
      },
      {
        type: 'paragraph',
        text: 'Practical guidelines for VR text legibility:',
      },
      {
        type: 'list',
        items: [
          'Minimum body text: 3.5 degrees of visual angle. At 1 meter virtual distance this translates to approximately 6cm physical height.',
          'Prefer medium-weight fonts over light or thin weights — thin strokes render poorly in current headset optics at typical resolutions',
          'High contrast is non-negotiable: dark text on light backgrounds or vice versa, with a minimum 4.5:1 contrast ratio',
          'Avoid rendering text on complex backgrounds without a backing panel — legibility drops sharply when text competes with 3D geometry',
          'Test text legibility with the full range of IPD settings your headset supports — inter-pupillary distance variation significantly affects perceived sharpness',
        ],
      },
      {
        type: 'heading',
        text: 'Where Information Should Live in 3D Space',
      },
      {
        type: 'paragraph',
        text: 'There are three primary positions for information in VR, each with different tradeoffs.',
      },
      {
        type: 'paragraph',
        text: 'World-space: attached to the game world, not the player. Enemy health bars, object labels, environmental information. Advantages: natural, diegetic, reduces motion sickness risk because it moves with the world. Disadvantage: it can be obscured by geometry and requires the player to look at it.',
      },
      {
        type: 'paragraph',
        text: 'View-space (head-locked): fixed relative to the player\'s head, always in the same position in their view. Advantages: always visible. Disadvantage: causes significant discomfort because it violates the expected relationship between head movement and visual change. Avoid for extended use.',
      },
      {
        type: 'paragraph',
        text: 'Hybrid: lazily follows the player\'s head but with damping — it drifts toward the player\'s center of view rather than being rigidly locked. This is the practical choice for persistent information that needs to remain accessible: it is findable without being nauseating.',
      },
      {
        type: 'heading',
        text: 'Diegetic Elements and Immersion Constraints',
      },
      {
        type: 'paragraph',
        text: 'VR is the context where diegetic UI delivers the most value. In a flat game, a watch on the character\'s wrist is a visual detail. In VR, the player can look at their wrist to check the time in a way that is physically analogous to real life. The interaction makes sense without instruction.',
      },
      {
        type: 'paragraph',
        text: 'The constraint is development cost. Diegetic UI requires 3D modeling, animation, and interaction systems that non-diegetic overlays do not. Budget diegetic UI for information that is checked frequently and where the physical analogy strengthens the experience. Do not force diegesis on every element — a floating health bar is sometimes the right answer in VR too.',
      },
      {
        type: 'heading',
        text: 'The Physical-Digital Overlap Problem',
      },
      {
        type: 'paragraph',
        text: 'Passthrough headsets and AR modes create a new design problem: UI elements that exist in a space players can also see physically. A floating menu at table height interferes with the physical table that is actually there. An interaction zone on the floor conflicts with where someone\'s feet are.',
      },
      {
        type: 'paragraph',
        text: 'For full VR (no passthrough), the equivalent problem is the relationship between virtual hand position and UI touch targets. Interactions designed for pointer-based input (raycasting from the controller) work differently than interactions designed for direct manipulation (reaching out and touching with tracked hands). They require different target sizes, different feedback, and different error tolerances.',
      },
      {
        type: 'heading',
        text: 'Testing in Headset vs. Designing on Screen',
      },
      {
        type: 'paragraph',
        text: 'VR design has a divergence problem: what looks good on the flat screen design canvas often fails in the headset, and what looks wrong on screen sometimes works well in the headset. The only way to close this gap is to test in the headset at every significant design stage.',
      },
      {
        type: 'paragraph',
        text: 'A workable VR design loop:',
      },
      {
        type: 'list',
        items: [
          'Sketch and rough-layout on screen — fast iteration, low fidelity',
          'Build a basic 3D prototype at actual scale in the engine — do not infer scale from flat previews',
          'Test in headset with multiple people, minimum 20 minutes of use per session',
          'Document what failed and why, then return to design',
          'Defer visual polish until placement, scale, and interaction feel correct in headset',
        ],
      },
      {
        type: 'heading',
        text: 'Comfort Zones and Field of View Constraints',
      },
      {
        type: 'paragraph',
        text: 'The comfortable field of view in most current headsets is roughly 90-110 degrees horizontal. Within that, the comfortable reading zone for text and detailed UI is the central 30-40 degrees. Anything placed in the periphery will be seen but not easily read.',
      },
      {
        type: 'paragraph',
        text: 'This creates a real estate problem. You have less comfortable space for UI than a widescreen monitor provides, and the space you have is curved, depth-layered, and needs to coexist with the main 3D scene. Priority hierarchy matters more in VR, not less. Every element competing for the central field of view costs the player awareness of the game world.',
      },
      {
        type: 'paragraph',
        text: 'Designing for VR is a continuous process of constraint-solving. The designers who produce the best spatial interfaces are the ones who test early, fail specifically, and treat each session in the headset as data collection rather than validation.',
      },
    ],
    es: [
      {
        type: 'paragraph',
        text: 'Los diseñadores que pasan del diseño de UI para juegos en pantalla plana al diseño de interfaces para VR llevan consigo una experiencia significativa y también una responsabilidad significativa. La responsabilidad es asumir que la mayor parte de lo que funciona en un monitor funcionará en un visor. No es así. La proporción de conocimiento transferible se acerca más al 40% que al 90%, y entender cuál es ese 40% es el primer trabajo.',
      },
      {
        type: 'paragraph',
        text: 'Las reglas que se transfieren: jerarquía visual, principios de contraste, teoría del color, temporización de retroalimentación, arquitectura de información. Las reglas que no se transfieren: tamaños de fuente estándar, convenciones de UI en posición fija, patrones de interacción basados en mouse, principios de composición plana. En VR, la proximidad, el ángulo, la profundidad y la relación física entre el cuerpo del jugador y la interfaz cambian la ecuación de diseño.',
      },
      {
        type: 'heading',
        text: 'El problema del 40% de transferencia',
      },
      {
        type: 'paragraph',
        text: 'Los diseñadores de UI con experiencia que entran en VR por primera vez cometen errores predecibles. Dimensionan el texto para distancias de lectura de monitor y lo encuentran ilegible en el visor. Anclan la UI a posiciones de pantalla y descubren que esas posiciones no existen en el espacio 3D. Diseñan interacciones que asumen control preciso del cursor y se encuentran con la limitada precisión motriz del seguimiento de manos o la entrada de puntero del control.',
      },
      {
        type: 'paragraph',
        text: 'El camino más rápido hacia la competencia no es más aprendizaje teórico. Es tiempo en el visor. Diseña un prototipo. Póntelo. Pasa 30 minutos usándolo. Vuelve a la pantalla plana con una lista de lo que entendiste mal. Repite.',
      },
      {
        type: 'callout',
        text: 'El error más común de UI en VR es tratar el visor como un monitor curvo. La distancia de lectura, la relación entre el cuerpo y la interfaz, y el peso perceptual de los elementos flotantes cambian todas las reglas.',
      },
      {
        type: 'heading',
        text: 'Legibilidad a distancia: tipografía en el visor',
      },
      {
        type: 'paragraph',
        text: 'El tamaño de fuente en VR no se mide en píxeles. Se mide en grados de arco en el campo de visión. Una fuente que se lee bien en un monitor a 60 cm no tiene el mismo tamaño que una fuente que se lee bien en un elemento de interfaz VR a 1 metro de distancia virtual.',
      },
      {
        type: 'paragraph',
        text: 'Pautas prácticas para la legibilidad de texto en VR:',
      },
      {
        type: 'list',
        items: [
          'Texto de cuerpo mínimo: 3,5 grados de ángulo visual. A 1 metro de distancia virtual, esto se traduce en aproximadamente 6 cm de altura física.',
          'Prefiere fuentes de peso medio sobre pesos ligeros o delgados: los trazos delgados se renderizan mal en las ópticas actuales de los visores a resoluciones típicas',
          'El alto contraste no es negociable: texto oscuro sobre fondo claro o viceversa, con una relación de contraste mínima de 4,5:1',
          'Evita renderizar texto sobre fondos complejos sin un panel de respaldo: la legibilidad cae drásticamente cuando el texto compite con geometría 3D',
          'Prueba la legibilidad del texto con toda la gama de configuraciones de DIP que admite tu visor: la variación en la distancia interpupilar afecta significativamente la nitidez percibida',
        ],
      },
      {
        type: 'heading',
        text: 'Dónde debe vivir la información en el espacio 3D',
      },
      {
        type: 'paragraph',
        text: 'Hay tres posiciones principales para la información en VR, cada una con diferentes compromisos.',
      },
      {
        type: 'paragraph',
        text: 'Espacio del mundo: adjunto al mundo del juego, no al jugador. Barras de vida de enemigos, etiquetas de objetos, información ambiental. Ventajas: natural, diegético, reduce el riesgo de mareo porque se mueve con el mundo. Desventaja: puede ser obstruido por geometría y requiere que el jugador lo mire.',
      },
      {
        type: 'paragraph',
        text: 'Espacio de vista (vinculado a la cabeza): fijo en relación con la cabeza del jugador, siempre en la misma posición en su campo visual. Ventajas: siempre visible. Desventaja: causa incomodidad significativa porque viola la relación esperada entre el movimiento de la cabeza y el cambio visual. Evitar para uso prolongado.',
      },
      {
        type: 'paragraph',
        text: 'Híbrido: sigue con retardo la cabeza del jugador pero con amortiguación: se desplaza hacia el centro de visión del jugador en lugar de estar rígidamente bloqueado. Esta es la elección práctica para la información persistente que debe permanecer accesible: se puede encontrar sin ser nauseabundo.',
      },
      {
        type: 'heading',
        text: 'Elementos diegéticos y restricciones de inmersión',
      },
      {
        type: 'paragraph',
        text: 'La VR es el contexto donde la UI diegética aporta mayor valor. En un juego plano, un reloj en la muñeca del personaje es un detalle visual. En VR, el jugador puede mirar su muñeca para revisar la hora de una manera físicamente análoga a la vida real. La interacción tiene sentido sin instrucción.',
      },
      {
        type: 'paragraph',
        text: 'La restricción es el costo de desarrollo. La UI diegética requiere modelado 3D, animación y sistemas de interacción que los overlays no diegéticos no necesitan. Presupuesta la UI diegética para información que se revisa con frecuencia y donde la analogía física fortalece la experiencia. No fuerces la diégesis en cada elemento: una barra de vida flotante a veces también es la respuesta correcta en VR.',
      },
      {
        type: 'heading',
        text: 'El problema de superposición físico-digital',
      },
      {
        type: 'paragraph',
        text: 'Los visores de paso a través y los modos de RA crean un nuevo problema de diseño: elementos de UI que existen en un espacio que los jugadores también pueden ver físicamente. Un menú flotante a la altura de una mesa interfiere con la mesa física que realmente está ahí. Una zona de interacción en el suelo entra en conflicto con donde están los pies de alguien.',
      },
      {
        type: 'paragraph',
        text: 'Para VR completa (sin paso a través), el problema equivalente es la relación entre la posición de la mano virtual y los objetivos táctiles de la UI. Las interacciones diseñadas para entrada basada en puntero (raycasting desde el control) funcionan de manera diferente que las interacciones diseñadas para manipulación directa (extender la mano y tocar con manos rastreadas). Requieren diferentes tamaños de objetivo, diferente retroalimentación y diferentes tolerancias de error.',
      },
      {
        type: 'heading',
        text: 'Probar en el visor frente a diseñar en pantalla',
      },
      {
        type: 'paragraph',
        text: 'El diseño de VR tiene un problema de divergencia: lo que se ve bien en el lienzo de diseño plano a menudo falla en el visor, y lo que se ve mal en la pantalla a veces funciona bien en el visor. La única forma de cerrar esta brecha es probar en el visor en cada etapa significativa del diseño.',
      },
      {
        type: 'paragraph',
        text: 'Un ciclo de diseño de VR viable:',
      },
      {
        type: 'list',
        items: [
          'Esbozar y diseñar en pantalla: iteración rápida, baja fidelidad',
          'Construir un prototipo 3D básico a escala real en el motor: no inferir la escala de vistas planas',
          'Probar en el visor con múltiples personas, mínimo 20 minutos de uso por sesión',
          'Documentar qué falló y por qué, luego volver al diseño',
          'Posponer el pulido visual hasta que la colocación, la escala y la sensación de interacción sean correctas en el visor',
        ],
      },
      {
        type: 'heading',
        text: 'Zonas de confort y restricciones del campo de visión',
      },
      {
        type: 'paragraph',
        text: 'El campo de visión cómodo en la mayoría de los visores actuales es de aproximadamente 90-110 grados horizontales. Dentro de eso, la zona de lectura cómoda para texto y UI detallada son los 30-40 grados centrales. Todo lo que se coloque en la periferia se verá pero no se leerá fácilmente.',
      },
      {
        type: 'paragraph',
        text: 'Esto crea un problema de espacio. Tienes menos espacio cómodo para la UI del que proporciona un monitor panorámico, y el espacio que tienes es curvo, tiene capas de profundidad y necesita coexistir con la escena 3D principal. La jerarquía de prioridad importa más en VR, no menos. Cada elemento que compite por el campo de visión central le cuesta al jugador conciencia del mundo del juego.',
      },
      {
        type: 'paragraph',
        text: 'Diseñar para VR es un proceso continuo de resolución de restricciones. Los diseñadores que producen las mejores interfaces espaciales son los que prueban temprano, fallan de forma específica y tratan cada sesión en el visor como recopilación de datos, no como validación.',
      },
    ],
  },

  'uefn-ux-lessons': {
    en: [
      {
        type: 'paragraph',
        text: 'UEFN is not a blank canvas. It is Fortnite\'s canvas with some of your drawings on it. The designers who understand this from the start build better experiences than those who spend half a production fighting constraints they cannot change.',
      },
      {
        type: 'paragraph',
        text: 'Working in UEFN means accepting a specific bargain: you gain access to one of the largest active player communities in games, and in exchange, you design within a system that was built for a different experience than the one you are making. The skill is learning to use that system, not resist it.',
      },
      {
        type: 'heading',
        text: 'What You Control, What You Cannot, and What You Can Influence',
      },
      {
        type: 'paragraph',
        text: 'UEFN gives creators significant control over the game world, player mechanics, and in-island UI. But Fortnite\'s core systems — the main HUD, the lobby interface, the purchase flow, the settings menu, the platform UI layer — remain under Epic\'s control. Understanding the boundary is not limiting. It is clarifying.',
      },
      {
        type: 'list',
        items: [
          'You control: island layout, world-space elements, custom HUD widgets, audio design, onboarding sequences, in-island notifications, game state communication',
          'You cannot control: the core HUD structure, the item shop, the main menu, the platform overlay, player account systems',
          'You can influence: which default HUD elements are visible during your experience, how players first enter your island (lobby configuration), the initial information state players receive',
        ],
      },
      {
        type: 'paragraph',
        text: 'The middle category — influence without control — is where most UEFN UX decisions actually live. Knowing you can show or hide certain HUD elements changes your approach to what information you need to communicate yourself.',
      },
      {
        type: 'heading',
        text: 'Working With Fortnite\'s Established Player Expectations',
      },
      {
        type: 'paragraph',
        text: 'Every player entering your island arrives with years of Fortnite muscle memory. They know the default keybindings. They know where the health bar lives. They know that certain sounds mean certain things. They have expectations about pacing and about what in-game prompts look like.',
      },
      {
        type: 'paragraph',
        text: 'This is an asset, not a liability. A new game requires players to learn everything from nothing. A UEFN experience gives you a pre-trained audience. Use it:',
      },
      {
        type: 'list',
        items: [
          'Design interactions that use established Fortnite input conventions before inventing new ones',
          'When you must deviate from standard behavior, signal the deviation explicitly — a player who expects button A to do X and finds it does Y will blame the game, not their expectation',
          'Use visual language that reads as consistent with Fortnite where it applies, and diverge only when your experience genuinely requires it',
          'Treat familiar patterns as UI shorthand: they communicate faster than any tutorial',
        ],
      },
      {
        type: 'heading',
        text: 'Onboarding Players Who Already Know Fortnite',
      },
      {
        type: 'paragraph',
        text: 'Onboarding in UEFN is not about teaching players how to move, shoot, or navigate a menu. They know all of that. It is about teaching players the specific rules of your island: what is different here, what objectives exist, and what they should do in the first 90 seconds.',
      },
      {
        type: 'paragraph',
        text: 'The temptation is to explain too much. Resist it. A player who knows Fortnite does not need to read a full tutorial. They need one or two clear orientation cues at the start, and then they need to start playing. Trust the foundation. Build on top of it.',
      },
      {
        type: 'paragraph',
        text: 'Effective UEFN onboarding patterns:',
      },
      {
        type: 'list',
        items: [
          'A single clear visual cue pointing to the first objective — arrow, highlighted object, or environmental staging that draws movement',
          'One notification that states the core rule of your experience in plain language, not game jargon',
          'An early moment of success — a reward that confirms the player is doing the right thing within the first 60 seconds',
          'No more than two rules communicated in the first 30 seconds. Everything else can wait.',
        ],
      },
      {
        type: 'heading',
        text: 'Where UEFN UX Actually Happens',
      },
      {
        type: 'paragraph',
        text: 'The lobby is the first real UX moment in a UEFN experience. It is where players decide whether to join, read the island description, and form their first expectations. A lobby with a clear title, an honest one-line description, and a preview that represents the actual experience sets accurate expectations. An over-promised lobby creates churn.',
      },
      {
        type: 'paragraph',
        text: 'The first 90 seconds of play are where retention is won or lost. In this window, the player is answering three questions: What am I doing? Is this fun? Do I want to continue? Your design must answer all three before the player decides to leave. Not through explanation, but through experience.',
      },
      {
        type: 'callout',
        text: 'You do not have a blank slate in UEFN. You have Fortnite\'s slate with some of your drawings on it. The skill is designing around that, not against it.',
      },
      {
        type: 'heading',
        text: 'The Constraints That Are Actually Design Opportunities',
      },
      {
        type: 'paragraph',
        text: 'Every UEFN constraint has a corresponding opportunity. The limitation that Epic controls the core HUD means you do not need to design a core HUD. The limitation that certain interactions are standardized means those interactions are invisible to experienced players — they just work.',
      },
      {
        type: 'paragraph',
        text: 'This is a different relationship with constraints than standalone game development. In a standalone game, every constraint requires a workaround. In UEFN, many constraints are infrastructure — stable ground you can build on without designing the foundation yourself.',
      },
      {
        type: 'paragraph',
        text: 'The constraints worth fighting are the ones that genuinely block your experience. Before fighting one, ask: does this constraint prevent a core experience pillar, or does it prevent a surface-level design choice? If it prevents only the surface choice, find a different surface choice. If it prevents a core pillar, that is a real problem worth solving.',
      },
      {
        type: 'heading',
        text: 'Why Simplicity Wins Harder in UEFN',
      },
      {
        type: 'paragraph',
        text: 'UEFN players are in a competitive environment for attention. They can leave your island and join another in seconds. The player acquisition problem is harder than in a standalone title where the player has made a purchase commitment.',
      },
      {
        type: 'paragraph',
        text: 'Simplicity is not a compromise. In this context it is a competitive advantage. An experience that communicates its core loop in 30 seconds and delivers on it in 90 seconds will retain more players than a complex experience that takes 10 minutes to understand. Complexity can come later, after the player is committed.',
      },
      {
        type: 'paragraph',
        text: 'For UX specifically: every additional input required before the player experiences the core loop is friction. Every additional screen of information before the first moment of play is a barrier. Design the path from island entry to core loop experience to be as short as possible. Measure it in seconds, not screens.',
      },
      {
        type: 'heading',
        text: 'Iterating Within the Platform',
      },
      {
        type: 'paragraph',
        text: 'UEFN offers a faster iteration loop than most game development contexts. You can publish updates without going through a full certification process. Use this. Publish early, gather player data, and iterate on the specific moments where players drop off.',
      },
      {
        type: 'paragraph',
        text: 'Player retention curves in UEFN are visible through creator analytics. The points where players leave tell you where your UX is failing. The first drop is almost always in the first two minutes — which means the onboarding, the orientation cue, or the first objective is unclear. Fix that before adding new content. A better entry experience retains more players than new features for players who never stayed long enough to find them.',
      },
    ],
    es: [
      {
        type: 'paragraph',
        text: 'UEFN no es un lienzo en blanco. Es el lienzo de Fortnite con algunos de tus dibujos encima. Los diseñadores que entienden esto desde el principio construyen mejores experiencias que los que pasan la mitad de la producción luchando contra restricciones que no pueden cambiar.',
      },
      {
        type: 'paragraph',
        text: 'Trabajar en UEFN significa aceptar un trato específico: obtienes acceso a una de las comunidades de jugadores activos más grandes en videojuegos, y a cambio diseñas dentro de un sistema que fue construido para una experiencia diferente a la que estás haciendo. La habilidad está en aprender a usar ese sistema, no en resistirlo.',
      },
      {
        type: 'heading',
        text: 'Qué controlas, qué no puedes controlar, y qué puedes influenciar',
      },
      {
        type: 'paragraph',
        text: 'UEFN le da a los creadores un control significativo sobre el mundo del juego, las mecánicas del jugador y la UI dentro de la isla. Pero los sistemas centrales de Fortnite — el HUD principal, la interfaz del lobby, el flujo de compras, el menú de configuración, la capa de UI de la plataforma — permanecen bajo el control de Epic. Entender el límite no es limitante. Es clarificador.',
      },
      {
        type: 'list',
        items: [
          'Controlas: disposición de la isla, elementos en el espacio del mundo, widgets de HUD personalizados, diseño de audio, secuencias de incorporación, notificaciones dentro de la isla, comunicación del estado del juego',
          'No puedes controlar: la estructura central del HUD, la tienda de artículos, el menú principal, el overlay de la plataforma, los sistemas de cuentas de jugadores',
          'Puedes influir en: qué elementos predeterminados del HUD son visibles durante tu experiencia, cómo los jugadores entran por primera vez a tu isla (configuración del lobby), el estado inicial de información que reciben los jugadores',
        ],
      },
      {
        type: 'paragraph',
        text: 'La categoría intermedia — influencia sin control — es donde viven realmente la mayoría de las decisiones de UX de UEFN. Saber que puedes mostrar u ocultar ciertos elementos del HUD cambia tu enfoque sobre qué información necesitas comunicar tú mismo.',
      },
      {
        type: 'heading',
        text: 'Trabajar con las expectativas establecidas de los jugadores de Fortnite',
      },
      {
        type: 'paragraph',
        text: 'Cada jugador que entra a tu isla llega con años de memoria muscular de Fortnite. Conoce las teclas de acceso rápido predeterminadas. Sabe dónde vive la barra de salud. Sabe que ciertos sonidos significan ciertas cosas. Tienen expectativas sobre el ritmo y sobre cómo se ven los indicadores del juego.',
      },
      {
        type: 'paragraph',
        text: 'Esto es un activo, no una responsabilidad. Un juego nuevo requiere que los jugadores aprendan todo desde cero. Una experiencia UEFN te da una audiencia pre-entrenada. Úsala:',
      },
      {
        type: 'list',
        items: [
          'Diseña interacciones que usen las convenciones de entrada establecidas de Fortnite antes de inventar nuevas',
          'Cuando debes desviarte del comportamiento estándar, señala la desviación explícitamente: un jugador que espera que el botón A haga X y encuentra que hace Y culpará al juego, no a su expectativa',
          'Usa un lenguaje visual que se lea como consistente con Fortnite donde corresponda, y diverge solo cuando tu experiencia realmente lo requiera',
          'Trata los patrones familiares como abreviatura de UI: comunican más rápido que cualquier tutorial',
        ],
      },
      {
        type: 'heading',
        text: 'Incorporar jugadores que ya conocen Fortnite',
      },
      {
        type: 'paragraph',
        text: 'La incorporación en UEFN no se trata de enseñar a los jugadores a moverse, disparar o navegar un menú. Ya saben todo eso. Se trata de enseñarles las reglas específicas de tu isla: qué es diferente aquí, qué objetivos existen y qué deben hacer en los primeros 90 segundos.',
      },
      {
        type: 'paragraph',
        text: 'La tentación es explicar demasiado. Resístela. Un jugador que conoce Fortnite no necesita leer un tutorial completo. Necesita una o dos señales de orientación claras al inicio, y luego necesita comenzar a jugar. Confía en la base. Construye encima de ella.',
      },
      {
        type: 'paragraph',
        text: 'Patrones efectivos de incorporación en UEFN:',
      },
      {
        type: 'list',
        items: [
          'Una sola señal visual clara que apunte al primer objetivo: flecha, objeto resaltado o escenificación ambiental que dirija el movimiento',
          'Una notificación que establezca la regla central de tu experiencia en lenguaje sencillo, no jerga de juego',
          'Un momento temprano de éxito: una recompensa que confirme que el jugador está haciendo lo correcto dentro de los primeros 60 segundos',
          'No más de dos reglas comunicadas en los primeros 30 segundos. Todo lo demás puede esperar.',
        ],
      },
      {
        type: 'heading',
        text: 'Dónde sucede realmente la UX de UEFN',
      },
      {
        type: 'paragraph',
        text: 'El lobby es el primer momento real de UX en una experiencia UEFN. Es donde los jugadores deciden si unirse, leen la descripción de la isla y forman sus primeras expectativas. Un lobby con un título claro, una descripción honesta de una línea y una vista previa que represente la experiencia real establece expectativas precisas. Un lobby que promete demasiado genera abandono.',
      },
      {
        type: 'paragraph',
        text: 'Los primeros 90 segundos de juego son donde se gana o se pierde la retención. En este período, el jugador responde tres preguntas: ¿Qué estoy haciendo? ¿Es esto divertido? ¿Quiero continuar? Tu diseño debe responder las tres antes de que el jugador decida irse. No a través de explicación, sino a través de experiencia.',
      },
      {
        type: 'callout',
        text: 'No tienes un lienzo en blanco en UEFN. Tienes el lienzo de Fortnite con algunos de tus dibujos encima. La habilidad está en diseñar alrededor de eso, no en su contra.',
      },
      {
        type: 'heading',
        text: 'Las restricciones que son en realidad oportunidades de diseño',
      },
      {
        type: 'paragraph',
        text: 'Cada restricción de UEFN tiene una oportunidad correspondiente. La limitación de que Epic controla el HUD central significa que no necesitas diseñar un HUD central. La limitación de que ciertas interacciones están estandarizadas significa que esas interacciones son invisibles para los jugadores experimentados: simplemente funcionan.',
      },
      {
        type: 'paragraph',
        text: 'Esta es una relación diferente con las restricciones que el desarrollo de juegos independiente. En un juego independiente, cada restricción requiere una solución alternativa. En UEFN, muchas restricciones son infraestructura: terreno estable sobre el que puedes construir sin diseñar los cimientos tú mismo.',
      },
      {
        type: 'paragraph',
        text: 'Las restricciones que vale la pena combatir son las que genuinamente bloquean tu experiencia. Antes de combatir una, pregunta: ¿esta restricción impide un pilar central de la experiencia, o impide una elección de diseño superficial? Si solo impide la elección superficial, encuentra una elección superficial diferente. Si impide un pilar central, eso es un problema real que vale la pena resolver.',
      },
      {
        type: 'heading',
        text: 'Por qué la simplicidad gana con más fuerza en UEFN',
      },
      {
        type: 'paragraph',
        text: 'Los jugadores de UEFN están en un entorno competitivo por la atención. Pueden salir de tu isla y unirse a otra en segundos. El problema de adquisición de jugadores es más difícil que en un título independiente donde el jugador ha hecho un compromiso de compra.',
      },
      {
        type: 'paragraph',
        text: 'La simplicidad no es un compromiso. En este contexto es una ventaja competitiva. Una experiencia que comunica su bucle central en 30 segundos y cumple con él en 90 segundos retendrá más jugadores que una experiencia compleja que tarda 10 minutos en entenderse. La complejidad puede venir después, cuando el jugador esté comprometido.',
      },
      {
        type: 'paragraph',
        text: 'Para la UX específicamente: cada entrada adicional requerida antes de que el jugador experimente el bucle central es fricción. Cada pantalla adicional de información antes del primer momento de juego es una barrera. Diseña el camino desde la entrada a la isla hasta la experiencia del bucle central para que sea lo más corto posible. Mídelo en segundos, no en pantallas.',
      },
      {
        type: 'heading',
        text: 'Iterar dentro de la plataforma',
      },
      {
        type: 'paragraph',
        text: 'UEFN ofrece un ciclo de iteración más rápido que la mayoría de los contextos de desarrollo de videojuegos. Puedes publicar actualizaciones sin pasar por un proceso de certificación completo. Úsalo. Publica pronto, recopila datos de jugadores e itera en los momentos específicos donde los jugadores abandonan.',
      },
      {
        type: 'paragraph',
        text: 'Las curvas de retención de jugadores en UEFN son visibles a través del análisis de creadores. Los puntos donde los jugadores se van te dicen dónde está fallando tu UX. La primera caída es casi siempre en los primeros dos minutos, lo que significa que la incorporación, la señal de orientación o el primer objetivo no son claros. Arregla eso antes de agregar contenido nuevo. Una mejor experiencia de entrada retiene más jugadores que nuevas funcionalidades para jugadores que nunca permanecieron el tiempo suficiente para encontrarlas.',
      },
    ],
  },

  'liveops-ux-for-games': {
    en: [
      {
        type: 'paragraph',
        text: 'LiveOps UX is one of the most specific disciplines in game design, and one of the least documented. Most UX writing focuses on onboarding: getting a new player into the experience, reducing the learning curve, building early confidence. LiveOps is the opposite problem. Your audience already knows the game. They have their habits, their preferred play style, their learned expectations about how the interface works. The challenge is not teaching them. It is giving them enough new information to act on an opportunity without breaking the session they are already in.',
      },
      {
        type: 'heading',
        text: 'What LiveOps UX Actually Is',
      },
      {
        type: 'paragraph',
        text: 'LiveOps covers any time-limited or rotating content that appears inside a live game: seasonal events, limited-time offers, battle passes, login rewards, challenges, limited cosmetics, flash sales. Each of these is a communication problem. The player needs to understand: what is available, how long it lasts, what it costs, and whether they care. And they need to understand all of that fast, because they are not in the store to browse. They are in the game to play.',
      },
      {
        type: 'paragraph',
        text: 'The interface that handles this communication sits between the player and their session. If it is too easy to dismiss, they miss the offer and the studio misses the revenue. If it is too aggressive, it interrupts the session and creates friction. The entire design problem is that a business need and a player experience are directly in tension, and the UI is the place where that tension resolves.',
      },
      {
        type: 'callout',
        text: 'LiveOps UX is not about interrupting the player. It is about making offers visible at the moments when seeing them causes the least friction and the most value.',
      },
      {
        type: 'heading',
        text: 'The Information Hierarchy Problem',
      },
      {
        type: 'paragraph',
        text: 'The most common LiveOps UX failure is information overload. Studios that run multiple simultaneous events — a seasonal pass, a weekly challenge set, a rotating shop, a limited cosmetic bundle — often stack all of them in the same notification layer. The player sees five badges on five different menu items, and because they cannot process all of it at once, they process none of it.',
      },
      {
        type: 'paragraph',
        text: 'The solution is hierarchy. Not all LiveOps content has equal urgency. An offer that expires in four hours is more urgent than a battle pass with six weeks remaining. A reward the player has already earned is more actionable than a new cosmetic they have not yet seen. The interface should reflect this, and that means making decisions about what the player sees first, second, and not at all on any given session.',
      },
      {
        type: 'list',
        items: [
          'Expiring soon: high urgency, needs immediate visibility, ideally with a timer',
          'New and unclaimed: medium urgency, should be surfaced without blocking gameplay',
          'Ongoing: low urgency, accessible but not pushed — the player will find it when they are ready',
          'Seen and ignored: no re-push required — respecting this avoids fatigue',
        ],
      },
      {
        type: 'heading',
        text: 'Reward Clarity and Perceived Value',
      },
      {
        type: 'paragraph',
        text: 'One of the most expensive LiveOps UX problems is a reward the player does not understand. This happens when the item is shown as an icon with a number, rather than a preview of what the reward actually is. It happens when currency rewards are not connected to what the currency can buy. It happens when the unlock condition is described in a way that requires math or memory to interpret.',
      },
      {
        type: 'paragraph',
        text: 'Perceived value is not the same as actual value. A player who does not understand what they are earning will not engage with the system, even if the reward is objectively good. The interface has to do the translation work: show the item, not just the icon. Show what it does or looks like. Show the cost and the value together so the comparison is immediate. Remove ambiguity about whether the player has already earned it or still needs to act.',
      },
      {
        type: 'heading',
        text: 'Timing: When to Surface LiveOps Content',
      },
      {
        type: 'paragraph',
        text: 'The best LiveOps UX shows content at the moments when the player is already transitioning — between matches, at the main menu after a session, during a loading screen. These are natural interruption points. The player\'s attention is not committed to gameplay, and they are already in a brief pause state. That is when an event summary, a reward notification, or a new shop item has the best chance of being seen without creating frustration.',
      },
      {
        type: 'paragraph',
        text: 'Surfaces to avoid: mid-match, during a cutscene, immediately after a loss, or during any moment where the player has a primary task. These are moments where any overlay — no matter how well designed — feels like an interruption rather than an offer.',
      },
      {
        type: 'callout',
        text: 'The player is not shopping. They are playing, and sometimes they are willing to pause and evaluate an offer. The interface\'s job is to be there at the moments when that willingness exists.',
      },
      {
        type: 'heading',
        text: 'Store UX and the Decision Cost',
      },
      {
        type: 'paragraph',
        text: 'In-game stores are one of the highest-stakes UX surfaces in a live game. Every extra step the player has to take to understand an item, find the price, or complete a purchase is a point where they can decide it is not worth the effort. The design goal is not to maximize how much content the player sees. It is to minimize the cost of completing a transaction for a player who has already decided they want something.',
      },
      {
        type: 'paragraph',
        text: 'This means clean item previews, prices that are immediately legible, currency balances visible without having to navigate away, and a checkout flow that takes as few taps as possible. It also means not hiding the price behind a multi-step preview flow, and not requiring the player to mentally convert virtual currency to real money to understand what they are spending.',
      },
      {
        type: 'heading',
        text: 'What Makes LiveOps UX Difficult to Get Right',
      },
      {
        type: 'paragraph',
        text: 'Most of the difficulty in LiveOps UX comes from the intersection of business goals and player experience. The business wants maximum visibility for every offer. The player wants minimum interruption and maximum clarity. These goals are not always opposed, but they require someone in the room whose job is to hold the player experience as a design constraint — not just an afterthought.',
      },
      {
        type: 'paragraph',
        text: 'The second difficulty is velocity. LiveOps content ships constantly, which means the design patterns have to be robust enough that new content can be slotted in without requiring a full redesign every week. That is a systems problem as much as a visual design problem. The solution is a well-documented LiveOps UI system: defined templates, clear rules for what types of content get what types of treatment, and enough flexibility to handle edge cases without breaking the visual language.',
      },
    ],
    es: [
      {
        type: 'paragraph',
        text: 'El LiveOps UX es una de las disciplinas más específicas en el diseño de juegos, y una de las menos documentadas. La mayoría de la escritura sobre UX se centra en el onboarding: llevar a un nuevo jugador a la experiencia, reducir la curva de aprendizaje, construir confianza temprana. El LiveOps es el problema contrario. Tu audiencia ya conoce el juego. Tiene sus hábitos, su estilo de juego preferido, sus expectativas aprendidas sobre cómo funciona la interfaz. El desafío no es enseñarles. Es darles suficiente información nueva para actuar en una oportunidad sin romper la sesión en la que ya están.',
      },
      {
        type: 'heading',
        text: 'Qué es realmente el LiveOps UX',
      },
      {
        type: 'paragraph',
        text: 'El LiveOps cubre cualquier contenido de tiempo limitado o rotativo que aparece dentro de un juego en vivo: eventos de temporada, ofertas de tiempo limitado, pases de batalla, recompensas de inicio de sesión, desafíos, cosméticos limitados, ventas flash. Cada uno de estos es un problema de comunicación. El jugador necesita entender: qué está disponible, cuánto tiempo dura, cuánto cuesta y si le importa. Y necesita entender todo eso rápidamente, porque no está en la tienda para navegar. Está en el juego para jugar.',
      },
      {
        type: 'callout',
        text: 'El LiveOps UX no se trata de interrumpir al jugador. Se trata de hacer que las ofertas sean visibles en los momentos en que verlas causa la menor fricción y el mayor valor.',
      },
    ],
  },

  'player-decision-making-ux': {
    en: [
      {
        type: 'paragraph',
        text: 'Player decision-making is one of the central problems in game design, but it is rarely framed as a UX problem. When a player makes a bad call — takes the wrong path, wastes a resource, picks the wrong upgrade — the instinct is to attribute it to skill or experience. Sometimes that is correct. But more often, the interface did not give them what they needed to decide well. The question is not "why did the player make that choice?" The question is "what did the interface show them when they made it?"',
      },
      {
        type: 'heading',
        text: 'Information Available vs. Information Processed',
      },
      {
        type: 'paragraph',
        text: 'There is a difference between information that is technically present on the screen and information that the player actually processes. Both are the designer\'s responsibility. A tooltip that describes an item\'s effect is technically available. But if the player only sees it on hover, in a font that requires them to stop and read carefully, during a moment when they are under pressure to decide quickly, the information might as well not be there.',
      },
      {
        type: 'paragraph',
        text: 'Processing capacity is limited. When players are managing multiple inputs — reading the environment, tracking threats, managing resources — cognitive load is high. The less familiar the system, the higher the load. Interface decisions that look obvious during a calm design review can become invisible to a player mid-session. Good decision UX designs for the worst attentional state the player is likely to be in, not the best.',
      },
      {
        type: 'callout',
        text: 'Design for the player at their most distracted, not their most focused. The choice moment rarely arrives at a calm point in the session.',
      },
      {
        type: 'heading',
        text: 'Choice Architecture in Games',
      },
      {
        type: 'paragraph',
        text: 'Choice architecture is the design of how choices are presented. In games, every upgrade screen, skill tree, inventory panel, and branching dialogue is a choice architecture problem. The order options appear in, the visual weight of each option, the presence or absence of a recommended choice, the default selection — all of these influence what the player picks, often more than the actual content of the options.',
      },
      {
        type: 'list',
        items: [
          'Default selection: players disproportionately pick whatever is pre-selected or positioned first',
          'Visual salience: larger, brighter, or more central options get more attention regardless of value',
          'Comparison framing: relative values ("twice as fast") are processed more easily than absolute values',
          'Scarcity signals: "limited" labels shift behavior even when the restriction is arbitrary',
          'Confirmation friction: adding a confirmation step to irreversible choices reduces regret and support volume',
        ],
      },
      {
        type: 'heading',
        text: 'Feedback and the Decision Loop',
      },
      {
        type: 'paragraph',
        text: 'Decision quality improves with feedback. Players who understand the consequences of their past choices make better future choices. This sounds obvious, but many games fail to close this loop. A player chooses an upgrade, the upgrade fires silently during a chaotic fight, and they have no way to tell whether it made a difference. If they cannot evaluate the outcome, they cannot refine their decision model.',
      },
      {
        type: 'paragraph',
        text: 'Good decision UX makes consequences visible and legible. Not intrusive — not a pop-up that interrupts the flow every time an ability activates. But clear enough that an attentive player can trace cause and effect. A damage number that reflects the upgrade. A resource counter that shows the difference before and after. A post-run summary that attributes outcomes to choices. These are not just feedback elements. They are the interface\'s way of completing the learning cycle.',
      },
      {
        type: 'heading',
        text: 'Where Decision UX Breaks Down',
      },
      {
        type: 'paragraph',
        text: 'The most common breakdown is overwhelming the player with options before they have the context to evaluate them. A new player presented with a full talent tree before they have played enough to understand the mechanics is not making a decision. They are guessing. The interface has given them the form of choice without the substance of informed choice.',
      },
      {
        type: 'paragraph',
        text: 'The second breakdown is unclear option differentiation. When two choices look similar and their descriptions are abstract or asymmetric, players either pick arbitrarily or pick based on superficial cues — the one that sounds cooler, the one on the left, the one with the bigger icon. The design implication is that option descriptions need to be concrete, comparable, and specific to the player\'s current situation.',
      },
      {
        type: 'paragraph',
        text: 'The third breakdown is irreversibility without visibility. When players cannot tell that a choice is permanent, they treat it as exploratory. Then they discover the permanence later and feel punished for the interface\'s lack of clarity. The fix is not to make everything reversible. It is to make the permanence visible and legible before the choice is made, not after.',
      },
      {
        type: 'callout',
        text: 'The player is not bad at deciding. The interface is bad at informing. The gap between those two interpretations is where most game UX work lives.',
      },
      {
        type: 'heading',
        text: 'Designing for Better Decisions',
      },
      {
        type: 'paragraph',
        text: 'Better decision UX does not mean making choices easier by removing depth. It means aligning the information available to the player with what they need to make an informed choice at the moment they are making it. This requires understanding when choices happen in the session — not just what the choices are — and designing the interface for that specific moment.',
      },
      {
        type: 'paragraph',
        text: 'It also means testing. Watching players make decisions in real sessions, noting where they hesitate, where they pick wrong, and where they express confusion or regret afterward. Those moments are not evidence of player failure. They are evidence of an interface that did not do its job. The fix is almost never "the player needs to read the tooltip." The fix is almost always "the interface needs to surface that information without requiring the player to ask for it."',
      },
    ],
    es: [
      {
        type: 'paragraph',
        text: 'La toma de decisiones del jugador es uno de los problemas centrales en el diseño de juegos, pero rara vez se enmarca como un problema de UX. Cuando un jugador toma una mala decisión — elige el camino equivocado, desperdicia un recurso, selecciona la mejora incorrecta — el instinto es atribuirlo a su habilidad o experiencia. A veces eso es correcto. Pero más a menudo, la interfaz no le dio lo que necesitaba para decidir bien. La pregunta no es "¿por qué el jugador tomó esa decisión?" La pregunta es "¿qué le mostró la interfaz cuando la tomó?"',
      },
      {
        type: 'callout',
        text: 'El jugador no es malo tomando decisiones. La interfaz es mala informando. La brecha entre esas dos interpretaciones es donde vive la mayor parte del trabajo de UX en juegos.',
      },
    ],
  },
};
