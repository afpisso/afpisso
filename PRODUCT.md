# Product

## Register

brand

## Users

**Primary:** Game studio hiring managers, creative directors, and producers at small-to-mid sized studios looking to fill a Game UX/UI Designer or UX Lead role — remote or contract. They arrive with a specific problem ("we need someone who understands VR UX", "we're building UEFN experiences", "our HUDs are unclear") and scan the site in under two minutes to decide whether to reach out.

**Secondary:** Product design teams and indie developers who need a UX/UI contractor for a shipped product or game. They know what UX is but may not have worked with a game-specialist before.

**Context:** Visitors arrive from LinkedIn, job boards, or a referral. They are evaluating multiple candidates. They want evidence of real problems solved — not aspirational visuals or generic portfolio copy. They are skeptical of "passionate" language and respond to specificity: platforms, constraints, roles, decisions.

## Product Purpose

byandresfe.com is the primary client-conversion surface for Andres Felipe Pisso — UX Lead and Game UX/UI Designer, 11+ years, based in Bogota, Colombia (remote, global). The site exists to answer one question for the visitor: "Can this person solve my UX problem?"

Success looks like: visitor reads one case study, understands the type of problem Andres solves, and sends a message or saves the contact. The site is not a showreel. It is a documented argument for a specific kind of design expertise.

Key differentiators the site must communicate:
- UEFN / Fortnite Creative UX specialization
- VR UX (shipped: Orcs Must Die: By the Blade)
- LiveOps UX and player retention loops
- Systematic approach: design principles, UI systems, documentation, handoff
- 11+ years across games, mobile, and product — not just visual polish

## Brand Personality

**Three words:** Systematic. Precise. Grounded.

**Voice:** Senior professional who has solved real design problems. Writes like someone who has been in production. No hype, no "passionate about design", no aspirational language. Specificity over adjectives. Problems over outcomes. Questions over claims.

**Tone:** Controlled and direct. Technical where it earns trust. Dry wit at the edges. Never loud. The aesthetic carries the personality — the copy does not need to perform it.

**Emotional goal for the visitor:** Confidence. "This person knows what they're doing and has the receipts." Not awe, not entertainment — quiet authority.

**Core question the site keeps asking (from the design itself):** "Where is the player guessing?"

## Anti-references

**Aesthetic to avoid:**
- Hacker terminal / cyberpunk / neon overload — the UX Console aesthetic is controlled, not chaotic
- NFT/crypto portfolio aesthetic — no generative art grids, no rainbow palette, no "drop" language
- Generic creative-agency portfolio — full-bleed hero images, soft gradients, "Hello, I'm a designer" H1
- Dribbble-optimized shot dump — pretty mockups with no problem framing or context
- SaaS landing page template — metric hero blocks, testimonial carousels, pricing tables

**Copy to never write:**
- "Passionate about", "innovative solutions", "seamless experience", "game-changing", "revolutionary"
- Em dashes (—) as punctuation
- Generic AI portfolio phrasing ("I specialize in crafting experiences that...")
- First-person overuse — the work should speak; the designer contextualizes it

**References that are close but wrong:**
- Linear.app — excellent product UI, wrong register; too app-UI, not enough editorial weight
- Awwwards case study portfolios — too performance-focused, motion-heavy without substance
- Game studio websites — built for players, not for hiring; wrong audience framing

## Design Principles

**1. Clarity before polish**
The site must answer the visitor's question before it impresses them visually. If a section requires reading twice to understand the designer's role, the visual treatment is irrelevant. Applied literally: the same principle the work applies to game UX applies to the portfolio itself.

**2. Show the problem, not just the output**
Each case study frames a real design problem — constraint, role, decision, outcome. Screenshots and visuals without context are decorative. The most credible thing on the site is a documented problem that a visitor recognizes from their own work.

**3. The system is the signal**
Design consistency across every component, page, and interaction demonstrates the same systematic thinking described in the case studies. If the portfolio looks improvised, the claim of "systems thinking" is undermined.

**4. Substance earns the aesthetic**
The dark, technical, precise aesthetic is earned by what it contains — not applied as a style layer. The UX Console visual direction works because the content (principles, documented cases, field notes) gives it weight. The same visual applied to generic copy would read as costume.

**5. No noise**
Motion, color, detail, copy — every element must carry a signal. Decorative elements that add no information are removed. Red is used sparingly: status, emphasis, hover activation. Not atmosphere. This extends to copy: no filler sentences, no intros that repeat the heading.

## Accessibility & Inclusion

- **Language:** Bilingual EN/ES. All user-facing strings are localized. Spanish content targets Latin American Spanish.
- **Reduced motion:** Full support via `useReducedMotion()` (Framer Motion) throughout. All entrance animations and interactive effects have reduced-motion fallbacks. `MotionConfig reducedMotion="user"` covers all animated components globally.
- **Color contrast:** Target WCAG AA on all body text. Accent red (#ff2540) used only on large text, labels, and UI chrome — not as the primary text color on dark backgrounds.
- **Keyboard navigation:** All interactive elements reachable and operable via keyboard. `tabIndex` managed on conditionally visible CTAs (e.g., CaseCard overlay link).
- **Screen readers:** `aria-label` on icon-only controls, `aria-hidden` on decorative elements, semantic HTML structure throughout.
- **Known constraints:** The site is optimized for desktop hiring workflows. Mobile experience is supported but secondary — the primary conversion path happens on a work laptop.
