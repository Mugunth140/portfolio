'use client';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export default function ProjectCard({ project, index }) {
  const lineRef = useRef(null);

  const onEnter = () => gsap.to(lineRef.current, { scaleX: 1, duration: 0.5, ease: 'expo.out' });
  const onLeave = () => gsap.to(lineRef.current, { scaleX: 0, duration: 0.4, ease: 'expo.in' });

  return (
    <Link
      href={`/work/${project.slug}`}
      data-cursor="View"
      className="project-card group block py-7 relative cursor-pointer"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {/* Animated underline */}
      <div ref={lineRef} className="absolute bottom-0 left-0 h-px w-full bg-color-secondary origin-left scale-x-0" />

      {/* Top border */}
      <div className="absolute top-0 left-0 h-px w-full bg-color-secondary/20" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Left: index + name */}
        <div className="flex items-baseline gap-5">
          <span className="text-xs font-mono text-foreground/30 w-6">{String(index + 1).padStart(2, '0')}</span>
          <h3 className="text-2xl md:text-3xl font-medium font-primary group-hover:text-tertiary transition-colors duration-300">
            {project.name}
          </h3>
        </div>

        {/* Right: category + year + arrow */}
        <div className="flex items-center gap-6 md:gap-8 ml-11 md:ml-0">
          <span className="text-sm font-mono text-foreground/50 uppercase tracking-wider">{project.category}</span>
          <span className="text-sm font-mono text-foreground/30">{project.year}</span>
          <ArrowUpRight
            size={18}
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 text-tertiary"
          />
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3 ml-11">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-xs font-mono px-2 py-0.5 border border-color-secondary/30 rounded-full text-foreground/50"
          >
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}
