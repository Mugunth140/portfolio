'use client';
import { MARQUEE_WORDS } from '../constants/data.constant';

const words = [...MARQUEE_WORDS, ...MARQUEE_WORDS];

export default function MarqueeText({ className = '' }) {
  return (
    <div
      className={`w-full overflow-hidden border-t border-b border-color-secondary py-4 ${className}`}
      aria-hidden="true"
    >
      <div className="flex gap-10 marquee-track whitespace-nowrap">
        {words.map((word, i) => (
          <span key={i} className="text-sm font-mono uppercase tracking-widest text-foreground/60 flex-shrink-0">
            {word}
            <span className="ml-10 text-tertiary">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
