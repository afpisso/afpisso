---
timestamp: 2026-05-21T10-51-40Z
slug: afpisso-src-components-hero-jsx
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 4 | Boot + SIGNAL ACTIVE + scroll bar solid |
| 2 | Match System / Real World | 3 | Thematic naming; one beat of recognition |
| 3 | User Control and Freedom | 3 | Skip button, no forced flows |
| 4 | Consistency and Standards | 4 | Bebas Neue + JetBrains Mono + red consistent |
| 5 | Error Prevention | 3 | Low interactive surface |
| 6 | Recognition Rather Than Recall | 2 | Primary CTA below the fold |
| 7 | Flexibility and Efficiency | 2 | CTA at y:1048, fold at y:900 |
| 8 | Aesthetic and Minimalist Design | 2 | Right 22% empty; first fold name-only |
| 9 | Error Recovery | 3 | Static content |
| 10 | Help and Documentation | 2 | Subtitle and copy below fold |
| **Total** | | **28/40** | Good foundation, clear layout issues |

## Priority Issues
**[P1]** First fold name-only: CTAs/subtitle at y:1048+, below 900px fold.
**[P1]** offsetX=0.18 puts cloud center at 59%; 320px dead space right (22%).
**[P2]** Text and cloud share 40-48% zone: reads accidental, not architectural.
**[P2]** AFP logo shape underplayed: reads as texture, not identity statement.
