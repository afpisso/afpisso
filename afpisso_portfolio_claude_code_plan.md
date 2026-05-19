# AFpisso Portfolio Redesign - Claude Code Build Brief

## 0. How to use this file

Use this file as the main product, UX, content, and implementation brief for rebuilding `afpisso.com`.

The goal is not to create a generic portfolio template. The goal is to create a high-converting, bilingual, senior-level portfolio for Andres Felipe Pisso, focused on Game UX/UI, UX systems, digital product thinking, and real shipped work.

Build the site with the mindset of a product:
- Clear positioning in the first screen.
- Fast access to selected work.
- Strong case studies.
- NDA-safe storytelling.
- Good performance.
- Accessible, responsive, and easy to maintain.
- Premium visual identity without sacrificing clarity.

Do not invent claims, metrics, job titles, awards, studio names, or project details. If something is not confirmed, mark it as `TBD` or write it carefully.

## 1. Product goal

Rebuild `afpisso.com` from an outdated personal site into a conversion-focused portfolio for:

1. Game studios and hiring managers.
2. Recruiters looking for senior UX/UI or game UX/UI profiles.
3. Product teams looking for UX systems, interface clarity, and digital product thinking.
4. Potential freelance or consulting clients.

The site should communicate this in less than 90 seconds:

> Andres Felipe Pisso designs UX/UI systems for games, products, and interactive experiences, with a strong focus on clarity, feedback, decisions, player experience, and production-ready interfaces.

## 2. Positioning

### Main positioning

Andres Felipe Pisso is a UX Lead and Game UX/UI Designer who works across games, product design, interface systems, and digital experiences.

He should not be positioned only as a UI artist, only as a game designer, or only as a product designer.

The best framing is:

> Game UX/UI and product designer focused on clarity, feedback, systems, and better decisions.

### Strategic message

Good design reduces doubt, friction, and confusion.

Design is not decoration. It is clarity, control, feedback, systems, and decisions that help players and users understand what is happening, what comes next, and how to move forward.

### Brand territory

The brand can naturally talk about:
- Game UX/UI.
- UX systems.
- UI systems.
- Product thinking.
- Accessibility.
- Interface clarity.
- Feedback systems.
- HUD readability.
- Player decision-making.
- Digital experiences.
- UX documentation and handoff.
- Design for production.

### What makes the site different

The site should show that Andres:
- Has worked on real games and real product problems.
- Can explain complexity clearly.
- Connects design decisions with player and user consequences.
- Understands production, not only visuals.
- Can work across design, development, art, QA, product, and stakeholders.
- Has strong judgment, not only good taste.
- Can move between games, digital products, systems, and interactive experiences.

## 3. Current site problem

The current `afpisso.com` is outdated and does not fully represent the most important recent work.

Known problems to fix:
- It feels more like an archive than a conversion-focused portfolio.
- It separates work too early into older categories instead of telling a stronger senior story.
- It does not put recent high-profile work first.
- It needs clearer case study structure.
- It needs stronger bilingual support.
- It needs clearer calls to action.
- It needs better project hierarchy.
- It needs a stronger visual and content system.
- It should remove repeated or generic copy.
- It should make contact, resume, and selected work easier to reach.

## 4. Recent projects to prioritize

The new portfolio should put recent work first, especially projects from the last year.

Primary projects:
1. Orcs Must Die: By the Blade, VR.
2. Dungeons & Dragons experience inside Fortnite, UEFN.
3. The Walking Dead experience, exact public title TBD.
4. Raptor Heist, Fortnite / UEFN.
5. Havoc Hotel franchise, Fortnite / UEFN.

Secondary or legacy projects can exist, but should not compete with the main narrative.

Important:
- Some projects may be under NDA.
- Some visual material may not be publishable.
- Some project names or public titles need confirmation.
- Build a content model that supports public, partial, private, and password-protected cases.

## 5. Site strategy

The site should have one clear home page and two main work routes:

1. Games.
2. Digital Product.

Avoid making the visitor choose between internal labels too early.

Recommended site structure:

```text
/
├── /en/
│   ├── /en/work/
│   ├── /en/work/games/
│   ├── /en/work/digital-product/
│   ├── /en/case-studies/orcs-must-die-by-the-blade/
│   ├── /en/case-studies/dungeons-and-dragons-fortnite/
│   ├── /en/case-studies/the-walking-dead/
│   ├── /en/case-studies/raptor-heist/
│   ├── /en/case-studies/havoc-hotel/
│   ├── /en/about/
│   ├── /en/resume/
│   ├── /en/contact/
│   ├── /en/notes/
│   ├── /en/press/
│   └── /en/reel/
└── /es/
    ├── /es/proyectos/
    ├── /es/proyectos/juegos/
    ├── /es/proyectos/producto-digital/
    ├── /es/casos/orcs-must-die-by-the-blade/
    ├── /es/casos/dungeons-and-dragons-fortnite/
    ├── /es/casos/the-walking-dead/
    ├── /es/casos/raptor-heist/
    ├── /es/casos/havoc-hotel/
    ├── /es/sobre-mi/
    ├── /es/cv/
    ├── /es/contacto/
    ├── /es/notas/
    ├── /es/prensa/
    └── /es/reel/
```

Root behavior:
- Redirect `/` to the best locale.
- Preferred option: detect browser language and store user preference.
- If detection is not implemented in the first sprint, default to `/en/` for international hiring and keep a visible language switch.

## 6. Recommended stack

Use:

- Next.js App Router.
- TypeScript.
- Tailwind CSS.
- MDX or content collections for case studies and notes.
- Optional CMS later: Sanity.
- Deployment: Vercel.
- Domain and DNS: current domain provider or Cloudflare.
- Analytics: GA4 or Plausible.
- Accessibility checks: Lighthouse, axe, keyboard testing.
- Optional animation: Framer Motion, but only where it helps orientation.

Why this stack:
- Good SEO and metadata control.
- Strong routing for bilingual pages.
- Easy generation of Open Graph images.
- Good performance if implemented carefully.
- Easy to maintain case study content.
- Flexible enough for password-protected or NDA-safe pages.

Avoid:
- Heavy visual libraries that hurt performance.
- Full-screen animation that blocks access to work.
- Fancy transitions that make the site feel slower.
- Cursor effects that reduce usability.
- Text baked into images when the text should be accessible.

## 7. Visual identity

Use Andres' personal brand system.

### Core visual direction

The site should feel:
- Clean.
- Strong.
- Editorial-tech.
- Premium.
- Controlled.
- Senior.
- Slightly futuristic, but not gimmicky.
- Built for clarity, not decoration.

### Color system

Use a restrained palette:

```css
--color-black: #000000;
--color-white: #FFFFFF;
--color-red: #DC2626;
--color-gray-950: #0A0A0A;
--color-gray-900: #111111;
--color-gray-800: #1F1F1F;
--color-gray-500: #737373;
--color-gray-300: #D4D4D4;
```

Rules:
- Black or near-black backgrounds.
- White as the dominant text color.
- Red only for emphasis, active states, key data, and small signature moments.
- Avoid large red sections unless they serve a clear purpose.
- Do not add random gradients unless they are subtle and controlled.
- Keep enough contrast in all text and UI states.

### Typography

Preferred:
- Display: Unbounded or similar geometric bold type.
- Body: Rajdhani, Inter, or a clean readable sans serif.
- If custom fonts are not available, use safe fallbacks.
- Do not commit font files unless Andres provides licensed files.

Typography rules:
- Big, confident headings.
- Short paragraphs.
- Strong hierarchy.
- Avoid tiny body text.
- Keep line length comfortable.
- Make case studies easy to scan.

### Logo and brand mark

Use the existing geometric white monogram "A" style:
- Minimal.
- Angular.
- Strong on dark background.
- Use it in header, footer, favicon, Open Graph image, and subtle loading states.
- Do not redesign the logo unless explicitly requested.

### Layout principles

- Generous negative space.
- Strong grids.
- Large project cards.
- Clear visual hierarchy.
- Text and media should support each other.
- Avoid overloaded sections.
- Every visual element needs a job.

Signature principle:

> If the page becomes clearer by removing something, remove it.

## 8. Brand voice and copy rules

Write in the voice of byandresfe:
- Human.
- Clear.
- Observant.
- Useful.
- Direct.
- Professionally grounded.
- Senior without sounding pretentious.
- Specific instead of generic.
- Practical instead of motivational.

Avoid:
- Generic UX slogans.
- Empty inspiration.
- Corporate fluff.
- Over-polished symmetrical AI-sounding phrases.
- Buzzwords without proof.
- Overclaiming impact.
- Words like "seamless", "amazing", "game changer", "revolutionary", "ultimate", "secret", unless they are part of a direct quote.

Use words that belong to the brand:
- Clarity.
- Friction.
- Feedback.
- Control.
- Systems.
- Hesitation.
- Next action.
- Guesswork.
- Player loop.
- Momentum.
- Signals.
- Decisions.
- States.
- Confusion.
- Clutter.
- Drop-off.
- Retention.
- Understanding.
- Digital experiences.

Recommended writing formula:

> Observation + consequence + judgment + usefulness.

Example tone:
- "When feedback is weak, players start guessing."
- "A clean interface is not always a clear one."
- "The next action should not feel hidden."
- "Good UI is not only what players see. It is what helps them decide."

Do not write like:
- "I create innovative and seamless experiences."
- "I transform ideas into amazing digital products."
- "This is the ultimate portfolio of a passionate designer."

## 9. Homepage structure

The home page must work as a conversion page.

### Home sections

1. Header.
2. Hero.
3. Selected work.
4. Trust and credibility.
5. What I do.
6. How I work.
7. Reel teaser.
8. Notes or thinking.
9. Final CTA.
10. Footer.

### Header

Include:
- Logo.
- Work.
- About.
- Resume.
- Notes.
- Contact.
- Language switch EN / ES.

Behavior:
- Sticky or semi-sticky on desktop.
- Simple mobile menu.
- Clear focus states.
- No hidden navigation.

### Hero

Goal:
Explain who Andres is and what he does in 5 seconds.

Suggested English copy:

```text
Game UX/UI and product design for clearer systems, faster decisions, and better player experiences.
```

Supporting line:

```text
I design interfaces, flows, and UX systems for games, digital products, and interactive experiences. My work sits between clarity, feedback, production, and player decision-making.
```

Primary CTA:

```text
View selected work
```

Secondary CTA:

```text
Download resume
```

Optional proof line:

```text
UX Lead. Game UX/UI Designer. 11+ years across games, products, and interactive experiences.
```

Do not use:
- "Let's create something epic together" as the main message.
- Generic "creative designer" copy.
- Long biography in the hero.

### Selected work

Show 3 to 5 primary cards first:
1. Orcs Must Die: By the Blade.
2. Dungeons & Dragons in Fortnite.
3. Raptor Heist.
4. Havoc Hotel.
5. The Walking Dead, if public material is available.

Card content:
- Project title.
- Role.
- Platform.
- One-sentence value.
- Status label: Public case, NDA-safe case, password-protected, or coming soon.
- Thumbnail or video loop.

Example card copy:

```text
Orcs Must Die: By the Blade
VR Game UX/UI
Designing clarity, spatial feedback, and interface systems for a tactical VR experience.
```

### Trust and credibility

Show only confirmed claims.

Possible items:
- 11+ years of experience.
- 80+ projects, if still accurate.
- 20+ clients, if still accurate.
- Experience across games, product, VR, UEFN, and interactive experiences.
- Recent work connected to large IPs, only if publicly safe.

Do not add logos unless allowed.

### What I do

Keep it practical:

```text
Game UX/UI
HUDs, menus, onboarding, feedback systems, player flows, readability, and progression clarity.

UX Systems
Reusable UI patterns, states, components, interaction rules, documentation, and handoff.

Digital Product
Information architecture, flows, prototypes, interface design, usability, and product clarity.
```

### How I work

Use a simple process:

```text
1. Understand the loop.
2. Find where hesitation starts.
3. Design the signal.
4. Test the decision.
5. Document the system.
```

### Final CTA

```text
If my work fits your team or project, reaching out should take less than a minute.
```

Buttons:
- Contact me.
- Download resume.
- View LinkedIn.

## 10. Work hub

The Work page should be a clear index, not a gallery dump.

### Filters

Include:
- All.
- Games.
- Digital Product.
- UX Systems.
- VR.
- UEFN.
- Case studies.
- NDA-safe.
- Legacy.

### Card fields

Each project card should include:
- Title.
- Short description.
- Role.
- Platform.
- Tools or engine.
- Year or range.
- Visibility status.
- Thumbnail.
- CTA.

### Visibility status labels

Use:
- Public Case Study.
- NDA-safe Breakdown.
- Password Protected.
- Coming Soon.
- Legacy Work.

## 11. Case study strategy

Publish 3 to 5 strong cases first. Depth matters more than quantity.

Each case should answer:
- What was the problem?
- What was Andres' role?
- What was the constraint?
- What design decisions were made?
- How did those decisions help players, users, or the team?
- What evidence can be shown?
- What was shipped, learned, improved, or validated?

### Case study template for games

Use this structure:

```markdown
# Project title

## Executive summary
3 to 5 lines explaining the project, role, platform, challenge, and outcome.

## Quick facts
- Role:
- Studio / client:
- Platform:
- Engine / tool:
- Team:
- Timeline:
- Status:
- Confidentiality:

## Context
What the project was and why it mattered.

## The challenge
What was hard about the player experience, production context, platform, IP, controls, or system complexity.

## My role
Be specific about what Andres owned, influenced, supported, and handed off.

## Constraints
Mention relevant constraints:
- IP rules.
- VR comfort.
- UEFN limitations.
- Performance.
- Input method.
- Readability.
- Production schedule.
- NDA.

## UX approach
Explain:
- Flows.
- Information architecture.
- HUD or screen logic.
- Feedback systems.
- Onboarding.
- Accessibility considerations.
- Design system or documentation.

## Key decisions
Use 3 to 5 decisions. Each should follow:
- Problem.
- Design decision.
- Why it mattered.
- Evidence or expected effect.

## Deliverables
List actual deliverables:
- Wireframes.
- User flows.
- HUD explorations.
- UI components.
- Interaction states.
- Figma prototypes.
- Documentation.
- Handoff specs.
- QA notes.

## Outcome
Use confirmed data only.
If exact metrics are not public, write:
- Shipped contribution.
- Improved clarity.
- Supported production handoff.
- Reduced ambiguity for the team.
- Learnings.

## What I would check next
A senior reflection. Keep it honest and useful.

## CTA
Invite the visitor to contact Andres or view another case.
```

### Case study template for digital product

```markdown
# Project title

## Executive summary

## Quick facts
- Role:
- Product type:
- Platform:
- Tools:
- Timeline:
- Team:
- Status:

## Problem

## Users and context

## My role

## Research or discovery

## Information architecture

## Flows and interaction design

## UI system

## Handoff and implementation

## Results or learnings

## CTA
```

## 12. NDA-safe storytelling

Some projects may not allow full disclosure. The site must support NDA-safe case studies.

### NDA-safe rules

When a case is protected:
- Do not show confidential assets.
- Do not reveal internal metrics.
- Do not reveal internal tools or unreleased features.
- Use abstracted diagrams.
- Use recreated interface logic only if allowed.
- Use public screenshots only when legally safe.
- Say "details redacted" where necessary.
- Keep the value focused on process, decisions, and constraints.

### NDA-safe wording

Use:

```text
Some details are intentionally simplified or redacted because of confidentiality. The focus here is the design problem, my role, and the type of decisions I helped shape.
```

Avoid:

```text
I cannot show anything because of NDA.
```

Better framing:

```text
Even when the final assets cannot be shown, the design thinking can still be explained: the problem, the constraint, the decision, and the production value.
```

## 13. Project copy drafts

Use these as starting copy. Do not treat them as final unless Andres approves.

### Orcs Must Die: By the Blade

```text
Headline:
Designing UX/UI for a tactical VR experience where clarity, spatial feedback, and player confidence matter every second.

Short description:
I worked on UX/UI systems, flows, and interface decisions for a VR adaptation of a trap-and-combat franchise. The focus was helping players read tactical information, understand what changed, and act without breaking immersion.

Role:
UX/UI systems, flow design, feedback, documentation, and cross-discipline collaboration.

CTA:
View VR UX/UI case study
```

### Dungeons & Dragons in Fortnite

```text
Headline:
Designing readable progression and player decisions for a Dungeons & Dragons experience inside Fortnite.

Short description:
The challenge was balancing fantasy, combat, progression, and clarity inside the UEFN ecosystem. My focus was making choices, routes, rewards, and player feedback easier to understand during a fast-paced experience.

Role:
Game UX/UI, systems design, onboarding, progression clarity, and interface structure.

CTA:
View D&D Fortnite case study
```

### The Walking Dead

```text
Headline:
Designing UX/UI for tension, survival, and readable decisions under pressure.

Short description:
The focus was helping players understand threat, resources, actions, and cooperation without losing the mood of the experience.

Role:
UX/UI, flow design, HUD logic, and risk feedback.

Note:
Exact public title and publishable material TBD.

CTA:
View NDA-safe breakdown
```

### Raptor Heist

```text
Headline:
Designing the UX/UI layer for a heist roguelike inside the Havoc Hotel universe.

Short description:
My priority was making the risk, reward, and progression loop readable from run to run. The interface needed to support fast decisions, clear rewards, and repeated play.

Role:
Game UX/UI systems for orientation, rewards, progression, and pacing.

CTA:
View Raptor Heist case study
```

### Havoc Hotel

```text
Headline:
Designing UX/UI for a co-op roguelike in Fortnite focused on progression, readability, and replayability.

Short description:
The work focused on clarifying rewards, upgrades, difficulty scaling, and player choices across fast, repeatable runs.

Role:
Interface systems, visible economy, reward clarity, and combat readability.

CTA:
View Havoc Hotel case study
```

## 14. About page

The About page should be human, clear, and senior.

### Suggested English copy

```text
I am Andres Felipe Pisso, a UX Lead and Game UX/UI Designer working across games, digital products, and interactive experiences.

My work usually starts with one question: where does clarity break?

In games, that can show up as a HUD that pulls attention away from the action, a reward flow that creates hesitation, or a progression system that makes players guess what changed. In product, it often appears as unclear navigation, weak feedback, or screens that look clean but do not help people decide.

I care about interfaces that reduce doubt. Clear signals. Useful feedback. Systems that help teams move faster without losing consistency.

Over the last year, I have worked on large-scale game experiences including VR, UEFN, and projects connected to major IPs. My strongest work sits between design judgment, production constraints, and the player experience.
```

### Skills section

Group skills into categories:

```text
Game UX/UI
HUD, menus, onboarding, progression, reward flows, feedback, readability, player loops, VR UX, UEFN UX.

UX Systems
Design systems, components, states, patterns, documentation, handoff, QA support, accessibility checks.

Product UX/UI
Information architecture, flows, wireframes, prototypes, usability, interface design, stakeholder alignment.

Tools
Figma, FigJam, UEFN, Unreal context, Jira, Confluence, Adobe tools, prototyping tools, analytics context.
```

## 15. Resume page

Create both:
- HTML resume page.
- Downloadable PDF resume link.

The HTML resume should be concise and easy to scan.

Sections:
- Summary.
- Selected experience.
- Selected projects.
- Skills.
- Tools.
- Education.
- Languages.
- Contact.

Track:
- `resume_download`
- `resume_view`
- `linkedin_click`

## 16. Contact page

Keep it simple.

### Required content

- Email.
- LinkedIn.
- Location: Colombia, open to remote and international collaboration if true.
- Timezone.
- Short form:
  - Name.
  - Email.
  - Company.
  - Type of opportunity.
  - Message.
- Direct CTA.

### Copy

```text
If my work fits your team or project, reaching out should take less than a minute.
```

Opportunity types:
- Studio role.
- Product role.
- Freelance project.
- Consulting.
- Speaking or workshop.
- Other.

Track:
- `generate_lead`
- `contact_form_submit`
- `contact_form_error`
- `email_click`
- `linkedin_click`

## 17. Notes section

Notes are optional for launch, but useful for authority and SEO.

Topics:
- Game UI systems.
- HUD readability.
- Game UX heuristics.
- Accessibility in games.
- Re-onboarding.
- Feedback and player decisions.
- UX documentation.
- UEFN UX lessons.
- VR interface clarity.
- UI terminology for game teams.

Notes should be short and useful, not academic.

Suggested first notes:
1. What is a Game UI System?
2. A clean HUD is not always a clear HUD.
3. Why feedback reduces guesswork.
4. How shared UI terminology improves production clarity.
5. What game teams can learn from accessibility settings.

## 18. Reel page

The reel page can launch in phase 2 if assets are not ready.

Requirements:
- 45 to 90 second video.
- Captions or transcript.
- Short project chapters.
- CTA to selected work and contact.
- Accessible controls.
- Respect reduced motion.

Track:
- `reel_play_25`
- `reel_play_50`
- `reel_play_100`
- `reel_cta_click`

## 19. SEO requirements

Every page needs:
- Unique title.
- Unique meta description.
- Open Graph image.
- Canonical URL.
- Language tag.
- Hreflang alternatives.
- Clean URL.
- Descriptive alt text.
- Structured data where appropriate.

Use:
- `BreadcrumbList` for case studies.
- `Article` for notes.
- `VideoObject` for reel.
- `Person` or `ProfilePage` for About if appropriate.
- `WebSite` for the root.

Do not use meta keywords.

### Suggested title patterns

```text
Home:
Andres Felipe Pisso - Game UX/UI Designer and UX Lead

Work:
Selected Work - Game UX/UI, UX Systems, and Product Design

Case:
Orcs Must Die: By the Blade - VR Game UX/UI Case Study

About:
About Andres Felipe Pisso - UX Lead and Game UX/UI Designer

Contact:
Contact Andres Felipe Pisso
```

### Suggested meta description for home

```text
Portfolio of Andres Felipe Pisso, UX Lead and Game UX/UI Designer focused on clarity, feedback, systems, and better player experiences across games, products, VR, and interactive media.
```

## 20. Accessibility requirements

The site should aim for WCAG 2.2 AA level behavior.

Checklist:
- One clear H1 per page.
- Correct heading hierarchy.
- Keyboard navigation works everywhere.
- Visible focus states.
- Sufficient color contrast.
- Do not rely on color alone for meaning.
- All interactive elements have accessible names.
- Alt text for meaningful images.
- Decorative images should be ignored by screen readers.
- Forms have labels, errors, and success messages.
- Motion respects `prefers-reduced-motion`.
- Videos have captions or transcripts.
- No hover-only critical content.
- No tiny text over noisy images.
- Project cards are accessible by keyboard.
- Language switch is clear to screen readers.

## 21. Performance requirements

Target:
- LCP less than or equal to 2.5 seconds.
- INP less than or equal to 200 ms.
- CLS less than or equal to 0.1.
- Lighthouse Performance 90+ on key pages.
- Lighthouse Accessibility 95+.
- Lighthouse SEO 95+.

Implementation rules:
- Optimize images.
- Use `next/image`.
- Use responsive sizes.
- Lazy load below-the-fold media.
- Avoid autoplay video unless muted, lightweight, and non-blocking.
- Use static generation where possible.
- Avoid loading full animation libraries globally.
- Keep JavaScript minimal.
- Use skeletons carefully.
- Avoid layout shifts in project cards and media blocks.

## 22. Analytics events

Set up events:

```text
hero_cta_click
case_card_click
filter_use
language_switch
resume_download
resume_view
reel_play_25
reel_play_50
reel_play_100
contact_cta_click
generate_lead
contact_form_submit
contact_form_error
case_25
case_50
case_75
case_complete
external_link_click
linkedin_click
email_click
```

The goal is to learn:
- Which projects attract clicks.
- Which language is used more.
- Whether visitors reach case study depth.
- Whether the resume is downloaded.
- Whether the contact path is clear.
- Which traffic sources convert.

## 23. Content model

Use a content model that can support MDX or a CMS later.

### Project fields

```ts
type Project = {
  slug: string;
  locale: "en" | "es";
  title: string;
  subtitle: string;
  shortDescription: string;
  category: "games" | "digital-product" | "ux-systems" | "legacy";
  featured: boolean;
  role: string;
  platform: string[];
  tools: string[];
  engine?: string;
  year?: string;
  clientOrStudio?: string;
  visibility: "public" | "nda-safe" | "password-protected" | "coming-soon" | "legacy";
  thumbnail: string;
  heroMedia?: string;
  caseStudyUrl?: string;
  externalUrl?: string;
  tags: string[];
  metrics?: string[];
  order: number;
};
```

### Case study fields

```ts
type CaseStudy = {
  slug: string;
  locale: "en" | "es";
  title: string;
  summary: string;
  quickFacts: {
    role: string;
    studio?: string;
    platform?: string;
    tools?: string[];
    engine?: string;
    timeline?: string;
    team?: string;
    status?: string;
    confidentiality?: string;
  };
  sections: CaseStudySection[];
  relatedProjects: string[];
  seo: SEOFields;
};
```

### Note fields

```ts
type Note = {
  slug: string;
  locale: "en" | "es";
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
  content: string;
  seo: SEOFields;
};
```

## 24. Component system

Build reusable components:

### Global

- `SiteHeader`
- `MobileNav`
- `LanguageSwitcher`
- `SiteFooter`
- `Container`
- `Section`
- `Button`
- `Tag`
- `Badge`
- `Card`
- `MediaFrame`
- `LogoMark`

### Portfolio

- `HeroSection`
- `FeaturedWorkGrid`
- `ProjectCard`
- `ProjectFilters`
- `CaseStudyHeader`
- `QuickFacts`
- `CaseStudySection`
- `BeforeAfterBlock`
- `DecisionBlock`
- `MediaGallery`
- `RelatedWork`
- `CTASection`

### Content

- `NoteCard`
- `MarkdownContent`
- `SEOJsonLd`
- `ResumeDownload`
- `ContactForm`

### UX details

- Use project cards with strong hierarchy.
- Use tags, but do not overload.
- Make the full card clickable only if accessibility is handled correctly.
- Use visible hover and focus states.
- Use red for focus and active state only where it helps.

## 25. Suggested design patterns

### Project card

Structure:
- Thumbnail or short loop.
- Visibility badge.
- Title.
- Role and platform.
- Short description.
- Tags.
- CTA.

Example:

```text
[Thumbnail]

NDA-safe Breakdown

Orcs Must Die: By the Blade
VR Game UX/UI

Tactical clarity, spatial feedback, and interface systems for a VR combat experience.

VR / UX Systems / Feedback / Interface Design

View case
```

### Case header

Structure:
- Eyebrow: Game UX/UI Case Study.
- Title.
- Summary.
- Quick facts.
- Hero media.
- Confidentiality note if needed.

### Decision block

Use this component inside cases:

```text
Problem
Players needed to understand X without losing focus on Y.

Decision
I designed Z to make the signal clearer.

Why it mattered
This reduced guesswork and supported faster decisions during the loop.
```

## 26. Implementation roadmap

### Phase 1 - Foundation

Deliver:
- Next.js project setup.
- TypeScript.
- Tailwind.
- Routing with `/en` and `/es`.
- Base layout.
- Header.
- Footer.
- Design tokens.
- SEO utilities.
- Content structure.

Acceptance:
- Both locales work.
- Header and footer are responsive.
- Theme matches brand direction.
- No console errors.
- Basic metadata works.

### Phase 2 - Core pages

Deliver:
- Home.
- Work hub.
- Project cards.
- About.
- Resume.
- Contact.

Acceptance:
- Visitor can understand positioning in the first screen.
- Visitor can reach selected work in one click.
- Visitor can contact Andres in less than 90 seconds.
- Mobile experience works well.

### Phase 3 - Case studies

Deliver:
- Case study template.
- 3 initial case pages.
- NDA-safe label system.
- Related projects.
- Media gallery.

Initial cases:
1. Orcs Must Die: By the Blade.
2. Dungeons & Dragons in Fortnite.
3. Raptor Heist or Havoc Hotel.

Acceptance:
- Case pages are readable and structured.
- No confidential claims are exposed.
- Each case explains role, problem, decisions, and value.

### Phase 4 - SEO, analytics, accessibility

Deliver:
- Sitemap.
- Robots.
- Hreflang.
- Open Graph images.
- Structured data.
- Analytics events.
- Accessibility QA.
- Performance optimization.

Acceptance:
- Lighthouse targets pass on key pages.
- Sitemap is valid.
- Metadata is unique.
- Keyboard testing passes.
- Forms work.

### Phase 5 - Launch and polish

Deliver:
- Redirects from old URLs.
- Final QA.
- Vercel deployment.
- Domain configuration.
- Search Console setup.
- Launch checklist.

Acceptance:
- Old important URLs redirect.
- Site is live.
- Contact works.
- Resume downloads.
- No broken links.
- Key pages are indexed or excluded intentionally.

## 27. Redirect plan

Map old pages to new pages.

Examples:

```text
/index.html -> /en/
/about.html -> /en/about/
/work/gameworks.html -> /en/work/games/
/work/uxworks.html -> /en/work/digital-product/
/work/gameworks/zomvilles.html -> /en/case-studies/zomvilles/ or /en/work/
```

Use permanent redirects for changed URLs.

For private or NDA pages:
- Use `noindex`.
- Use password protection if needed.
- Do not rely only on `robots.txt` for privacy.

## 28. Launch checklist

Do not launch until these are done:

- Home EN complete.
- Home ES complete or clearly planned if launching EN first.
- Work hub complete.
- At least 3 strong project cards.
- At least 2 to 3 case studies complete enough to be useful.
- About page complete.
- Resume page complete.
- Resume PDF linked.
- Contact page and form working.
- Header and footer complete.
- Mobile navigation tested.
- Language switch tested.
- SEO metadata complete.
- Open Graph images generated.
- Sitemap generated.
- Robots configured.
- Redirects configured.
- Accessibility tested.
- Performance tested.
- Analytics events tested.
- No false claims.
- No confidential material published by mistake.

## 29. Claude Code execution instructions

When implementing, follow this order:

1. Inspect the existing repository if available.
2. Identify the current stack.
3. If the current stack is not worth keeping, propose a clean migration to Next.js.
4. Create the project structure.
5. Add design tokens.
6. Build layout components.
7. Build content model.
8. Build pages.
9. Add case study templates.
10. Add metadata and SEO.
11. Add accessibility and performance improvements.
12. Add analytics events.
13. Add redirects.
14. Run QA.

Do not:
- Rewrite the brand into generic UX language.
- Add unverified achievements.
- Add fake metrics.
- Add excessive animation.
- Use red as decoration everywhere.
- Hide the work behind vague storytelling.
- Create a site that looks good but is hard to scan.
- Ship pages with lorem ipsum in visible sections.
- Add confidential details.

## 30. First Claude Code prompt

Use this prompt to start the build:

```text
Read this markdown file as the source of truth for rebuilding afpisso.com.

Create a senior-level bilingual portfolio site for Andres Felipe Pisso, focused on Game UX/UI, UX systems, and digital product design.

Use Next.js App Router, TypeScript, and Tailwind CSS unless the current repository strongly suggests a better path.

Start by auditing the current project structure. Then propose a short implementation plan and begin building the foundation:
- locale routing for /en and /es
- design tokens
- global layout
- header and footer
- home page structure
- reusable project card component
- content model for projects and case studies
- SEO utilities

Keep the visual direction dark, editorial-tech, premium, and clear:
black background, white typography, red accent #DC2626, generous negative space, strong hierarchy, minimal visual noise.

Write copy in Andres' voice:
human, clear, useful, senior, grounded, specific, and focused on clarity, feedback, systems, friction, decisions, and player experience.

Do not invent claims. Use TBD where details are missing.
Do not expose NDA-sensitive details.
Prioritize accessibility, performance, SEO, and maintainability.
```

## 31. Final quality bar

The site is successful if a recruiter, studio lead, or product leader can quickly understand:

- Who Andres is.
- What kind of work he does.
- Why his experience is relevant now.
- Which projects best represent his current level.
- How he thinks through UX/UI problems.
- How to contact him.
- How to download his resume.

The portfolio should not try to impress through noise.

It should make the work easier to understand.

Clarity first. Useful before polished. Better signals, better decisions.
