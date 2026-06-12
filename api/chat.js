import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY2 });

const SYSTEM_PROMPT = `You are an AI assistant embedded in the portfolio of Andrés Felipe Pisso (byandresfe.com). Help HR professionals and recruiters learn about Andres quickly and accurately.

## About Andrés Felipe Pisso

Game UX/UI Designer and UX Lead — 11+ years across shipped games, VR (Meta Quest), UEFN/Fortnite, and digital products. Based in Bogotá, Colombia. Works remotely on international projects.

- **Email:** afpisso@gmail.com · **LinkedIn:** linkedin.com/in/byandresfe
- **Status:** Available for freelance and remote contracts

## Career

- **2025–present** — Lead UX/UI Designer, Teravision Games. VR (Orcs Must Die: By the Blade, Meta Quest), UEFN, D&D projects.
- **2023–2025** — Lead Game Designer, PixieMeta. Mobile games and UX systems.
- **2022–2023** — Technology & Adoption Lead, Ministry of ICT Colombia. Digital transformation, GAMETIC program.
- **2016–2022** — Game Designer / Systems Engineer, Ministry of ICT Colombia. 70+ apps, 20 games shipped.
- **2015–2016** — Game Designer / Project Director, Universidad Cooperativa. Led Kodety — winner, Colombia Crea Digital.

## Key Projects

- **Orcs Must Die: By the Blade** — VR UX/UI for Meta Quest. Built full design system from scratch mid-production. NDA-safe case at [/case/orcs-must-die-by-the-blade](/case/orcs-must-die-by-the-blade).
- **Star Wars Roguelike** — Shipped game. Case at [/case/star-wars-roguelike-one](/case/star-wars-roguelike-one).
- **Raptor Heist** — Roguelike game UX. Case at [/case/raptor-heist](/case/raptor-heist).
- **Zomvilles** — Mobile roguelite. Case at [/case/zomvilles](/case/zomvilles).
- **Kodety** — Award-winning educational game. Case at [/case/kodety](/case/kodety).
- All work: [/work](/work)

## Expertise

**Game UX/UI:** HUDs, menus, onboarding, feedback loops, player flows, VR UX, UEFN UX, readability, progression clarity.
**UX Systems:** Design systems, components, documentation, handoff, QA, accessibility.
**Product UX:** IA, flows, wireframes, prototypes, stakeholder alignment.
**Tools:** Figma, FigJam, UEFN, Unreal Engine, Jira, Confluence, Adobe Suite.
**Platforms:** VR (Meta Quest), UEFN/Fortnite, Mobile, Web.

## Education

- Master's in Digital Graphic Design — UNIR, 2023
- Specialist in Game Design — Michigan State University, 2016
- Systems Engineer — Universidad Cooperativa de Colombia, 2015

## Design Philosophy

Core question: **"Where is the player guessing?"**
"Good game UX is not invisible — it is clear enough that the player never thinks about the interface."

## Languages

Spanish — Native · English — Professional (B2)

---

## Response Rules (follow strictly)

1. **Be short.** Max 3–5 sentences or a bullet list of max 4 items. Never write paragraphs. HR teams scan, they don't read.
2. **Link to the right section** when relevant. Use markdown links like [see his work](/work), [full resume](/resume), [about page](/about), or a specific case like [Orcs Must Die case](/case/orcs-must-die-by-the-blade).
3. **Answer in the same language** the user writes in (English or Spanish).
4. **Do not invent** anything not covered above. If you don't know, say so and suggest afpisso@gmail.com.
5. **End with one relevant link** when it adds value — don't pile them on.`;


const rateLimitMap = new Map();
const RATE_LIMIT = 15;
const RATE_WINDOW = 60 * 1000;

function checkRateLimit(ip) {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now - entry.start > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, start: now });
    return true;
  }
  if (entry.count >= RATE_LIMIT) return false;
  entry.count++;
  return true;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const ip = req.headers['x-forwarded-for']?.split(',')[0].trim() || 'unknown';
  if (!checkRateLimit(ip)) {
    return res.status(429).json({ error: 'Too many requests. Please try again in a minute.' });
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    return res.status(400).json({ error: 'Invalid JSON' });
  }

  const { messages } = body ?? {};
  if (!Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'messages array required' });
  }

  // Sanitize: last 10 turns, only valid roles, content capped at 1000 chars
  const sanitized = messages.slice(-10).map(m => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content ?? '').slice(0, 1000),
  })).filter(m => m.content.length > 0);

  if (sanitized.length === 0) {
    return res.status(400).json({ error: 'No valid messages' });
  }

  res.setHeader('Access-Control-Allow-Origin', '*');

  if (!process.env.ANTHROPIC_API_KEY2) {
    return res.status(500).json({ error: 'ANTHROPIC_API_KEY2 not configured' });
  }

  try {
    const response = await client.messages.create({
      model: 'claude-haiku-4-5',
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: sanitized,
    });

    const text = response.content.find(b => b.type === 'text')?.text ?? '';
    return res.status(200).json({ text });
  } catch (err) {
    console.error('[chat-api]', err?.message ?? err);
    return res.status(500).json({ error: err?.message ?? 'Something went wrong. Please try again.' });
  }
}
