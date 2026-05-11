'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Project } from '@/data/projects';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const displayIndex = (index + 1).toString().padStart(2, '0');

  return (
    <Link href={`/work/${project.id}`} className="group block">
      <motion.div
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
        className="relative aspect-[4/3] bg-[var(--surface)] border border-[var(--border)] overflow-hidden mb-8 group-hover:border-[var(--accent)]"
      >
        <div className="absolute top-8 left-8 z-10 font-humane text-[var(--text-xl)] text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-500">
          {project.index}
        </div>

        <img
          src={project.coverImage}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />

        <div className="absolute bottom-8 left-8 opacity-0 transform translate-y-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0 z-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 bg-[var(--surface)] text-[var(--text)] font-display font-medium text-[var(--text-xs)] uppercase tracking-widest rounded-full">
            View Project <span className="text-[var(--accent)]">→</span>
          </span>
        </div>
      </motion.div>

      <div className="flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <h3 className="font-display font-bold text-[var(--text-2xl)] tracking-[-0.02em] group-hover:text-[var(--accent)] transition-colors">
            {project.title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-[var(--accent-light)] text-[var(--accent)] text-[var(--text-xs)] font-display uppercase tracking-wider rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <div className="text-[var(--text-muted)] group-hover:text-[var(--accent)] transition-colors duration-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7 17L17 7M17 7H7M17 7V17"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>
    </Link>
  );
}
