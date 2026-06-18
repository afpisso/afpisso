import { cases, CASE_ORDER } from './src/data/cases.js';
import { writeFileSync } from 'fs';

const meta = cases.map(c => ({
  id: c.id,
  slug: c.slug,
  title: c.title,
  visibility: c.visibility,
  status: c.status,
  role: c.role,
  year: c.year,
  tags: c.tags,
  platform: c.platform,
  featured: c.featured,
}));

const out = `export const CASE_ORDER = ${JSON.stringify(CASE_ORDER, null, 2)};\n\nexport const casesMeta = ${JSON.stringify(meta, null, 2)};\n`;

writeFileSync('./src/data/caseMeta.js', out);
console.log('caseMeta.js written —', meta.length, 'cases');
