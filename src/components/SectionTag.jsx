import { useState } from 'react';
import { useScramble } from '../hooks/useScramble';
import { useReducedMotion } from 'framer-motion';

/**
 * SectionTag — section identifier chip from the design file handoff.
 *
 * Shows a chamfer-clipped red label box + mono page number to the right.
 * The label scrambles on hover.
 *
 * Usage:
 *   <SectionTag label="Case Files" page="003" />
 */

function chamferClip(n, corners = ['tr', 'bl']) {
  const tr = corners.includes('tr');
  const bl = corners.includes('bl');
  const tl = corners.includes('tl');
  const br = corners.includes('br');
  const parts = [];
  parts.push(tl ? `0 ${n}px` : '0 0');
  if (tl) parts.push(`${n}px 0`);
  parts.push(tr ? `calc(100% - ${n}px) 0` : '100% 0');
  if (tr) parts.push(`100% ${n}px`);
  parts.push(br ? `100% calc(100% - ${n}px)` : '100% 100%');
  if (br) parts.push(`calc(100% - ${n}px) 100%`);
  parts.push(bl ? `${n}px 100%` : '0 100%');
  if (bl) parts.push(`0 calc(100% - ${n}px)`);
  return `polygon(${parts.join(', ')})`;
}

function ScrambleLabel({ text }) {
  const [trigger, setTrigger] = useState(0);
  const shouldReduce = useReducedMotion();
  const displayed = useScramble(text, { duration: 320, trigger, enabled: !shouldReduce });
  return (
    <span
      onMouseEnter={() => setTrigger(t => t + 1)}
      aria-label={text}
      style={{ display: 'block' }}
    >
      {displayed}
    </span>
  );
}

export default function SectionTag({ label, page, className, style }) {
  return (
    <span
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 10, ...style }}
    >
      {/* Red chamfer-clipped label box */}
      <span
        style={{
          background: 'var(--color-accent)',
          color: '#0a0a0a',
          clipPath: chamferClip(8, ['tr', 'bl']),
          padding: '3px 10px 2px',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '9px',
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          lineHeight: 1.6,
          whiteSpace: 'nowrap',
        }}
      >
        <ScrambleLabel text={label} />
      </span>

      {/* Page number */}
      {page && (
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '9px',
            letterSpacing: '0.14em',
            color: 'var(--color-fg-mute)',
            opacity: 0.7,
          }}
        >
          {page}
        </span>
      )}
    </span>
  );
}
