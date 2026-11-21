import { getNoteSummary, getNoteTitle } from '../data/fieldNotes.js';

const BASE = 'https://byandresfe.com';
export const NOTE_SCHEMA_ID = 'ld-json-note-schema';

export function buildNoteSchema(note, language = note.language || 'en') {
  const url = `${BASE}/notes/${note.slug}`;
  const author = { '@id': `${BASE}/#person` };
  const title = getNoteTitle(note, language);
  const spanish = language === 'es';
  const image = note.ogImage || note.cover;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: spanish ? 'Inicio' : 'Home', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: spanish ? 'Notas de campo' : 'Field Notes', item: `${BASE}/notes` },
        { '@type': 'ListItem', position: 3, name: title, item: url },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      '@id': `${url}#article`,
      headline: title,
      description: getNoteSummary(note, language),
      url,
      datePublished: note.date,
      dateModified: note.dateModified || note.date,
      inLanguage: language,
      keywords: note.keywords || [note.category, 'Game UX', 'Game UI', 'UX Design'].join(', '),
      author,
      publisher: author,
      isPartOf: { '@id': `${BASE}/notes#blog` },
      mainEntityOfPage: { '@type': 'WebPage', '@id': url },
      ...(image && { image: `${BASE}${image}` }),
    },
  ];
}
