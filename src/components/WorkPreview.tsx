'use client';
import { projects } from '@/data/projects';
import Link from 'next/link';
import MagneticButton from './MagneticButton';

export default function WorkPreview() {
  const featuredProjects = projects.filter((p) => p.featured).slice(0, 4);

  return (
    <section
      className="bg-[var(--bg-alt)] border-b border-[var(--border)]"
      style={{ padding: 'var(--section-py) var(--section-px)' }}
    >
      <div className="max-w-[1440px] mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-8">
          <div className="flex flex-col gap-4">
            <span className="section-label">— 03 WORK</span>
            <h2 className="font-display font-bold text-[var(--text-3xl)] tracking-[-0.03em] uppercase">
              Selected Work
            </h2>
          </div>
          <div className="hidden md:block">
            <MagneticButton href="/work" variant="outlined">
              View All <span className="ml-2">→</span>
            </MagneticButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-[clamp(12px,2vw,20px)]">
          {featuredProjects.map((project) => (
            <Link
              href={`/work/${project.id}/`}
              key={project.id}
              className="group block relative aspect-[4/3] overflow-hidden rounded-[8px] bg-[#e8e4de]"
            >
              {/* Image */}
              <img
                src={project.coverImage}
                alt={project.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 cubic-bezier(0.16,1,0.3,1) group-hover:scale-[1.04]"
              />

              {/* Overlay gradient for text legibility */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

              {/* Text content */}
              <div className="absolute inset-0 p-5 md:p-8 flex flex-col justify-between z-10">
                <span className="font-display font-normal text-[0.65rem] text-white/70 uppercase tracking-[0.15em]">
                  {project.index}
                </span>

                <div>
                  <h3 className="font-display font-bold text-[clamp(1rem,2vw,1.4rem)] text-white tracking-[-0.02em] mb-2 md:mb-3">
                    {project.title}
                  </h3>
                  <div className="flex flex-wrap gap-1.5 md:gap-2">
                    {project.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 md:px-3 md:py-1 bg-white/20 text-white text-[0.6rem] md:text-[0.65rem] font-display uppercase tracking-wider rounded-full backdrop-blur-sm"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 md:hidden flex justify-center">
          <MagneticButton href="/work" variant="outlined">
            View All <span className="ml-2">→</span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
