/**
 * chamferClip — generates a CSS polygon() clip-path with chamfered corners.
 * @param {number} n  — chamfer size in px
 * @param {string[]} corners — which corners to chamfer: 'tl' | 'tr' | 'bl' | 'br'
 */
export function chamferClip(n, corners = ['tr', 'bl']) {
  const tr = corners.includes('tr');
  const bl = corners.includes('bl');
  const tl = corners.includes('tl');
  const br = corners.includes('br');
  const parts = [];
  parts.push(tl ? `0 ${n}px` : `0 0`);
  if (tl) parts.push(`${n}px 0`);
  parts.push(tr ? `calc(100% - ${n}px) 0` : `100% 0`);
  if (tr) parts.push(`100% ${n}px`);
  parts.push(br ? `100% calc(100% - ${n}px)` : `100% 100%`);
  if (br) parts.push(`calc(100% - ${n}px) 100%`);
  parts.push(bl ? `${n}px 100%` : `0 100%`);
  if (bl) parts.push(`0 calc(100% - ${n}px)`);
  return `polygon(${parts.join(', ')})`;
}
