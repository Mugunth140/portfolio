'use client';

export default function SkillsMarquee() {
  const row1 = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Java', 'Spring Boot', 'PostgreSQL', 'MongoDB'];
  const row2 = ['Tailwind CSS', 'Docker', 'AWS', 'Git', 'Figma', 'REST APIs', 'GraphQL', 'CI/CD'];

  const renderTrack = (items: string[], reverse = false) => (
    <div
      className={`marquee-track flex gap-8 items-center ${reverse ? 'direction-reverse' : ''}`}
      style={{ animationDirection: reverse ? 'reverse' : 'normal' }}
    >
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex gap-8 items-center">
          {items.map((item, j) => (
            <span
              key={j}
              className="flex items-center gap-8 font-sans text-[var(--text-lg)] text-[var(--text-muted)] whitespace-nowrap"
            >
              {item}
              <span className="text-[var(--accent)] opacity-50">·</span>
            </span>
          ))}
        </div>
      ))}
    </div>
  );

  return (
    <section className="py-24 border-b border-[var(--border)] overflow-hidden relative">
      <div className="marquee-container relative">
        <div className="flex flex-col gap-6 w-[200vw] md:w-auto">
          {renderTrack(row1, false)}
          {renderTrack(row2, true)}
        </div>
      </div>
    </section>
  );
}
