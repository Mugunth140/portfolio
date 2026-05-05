'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRef, useEffect } from 'react';

export default function ProjectDetail({ project, nextProject, prevProject, projectIndex, totalProjects }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const metaRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [project.slug]);

  useGSAP(
    () => {
      if (!titleRef.current) return;

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      gsap.set(titleRef.current, { opacity: 0, y: 60 });
      gsap.set(metaRef.current, { opacity: 0, y: 30 });
      gsap.set(contentRef.current, { opacity: 0, y: 40 });

      tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0)
        .to(metaRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.2)
        .to(contentRef.current, { opacity: 1, y: 0, duration: 0.8 }, 0.3);
    },
    { scope: containerRef, dependencies: [project.slug] },
  );

  return (
    <div ref={containerRef}>
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="min-h-[70vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pt-32 pb-16">
          {/* Navigation */}
          <div ref={metaRef} className="flex items-center justify-between mb-8" style={{ opacity: 0 }}>
            <Link
              href="/work"
              className="flex items-center gap-2 text-sm font-mono text-foreground/50 hover:text-foreground transition-colors"
            >
              <ArrowLeft size={14} />
              All Projects
            </Link>
            <div className="flex items-center gap-4">
              {prevProject && (
                <Link
                  href={`/work/${prevProject.slug}`}
                  className="flex items-center gap-2 text-sm font-mono text-foreground/50 hover:text-foreground transition-colors"
                >
                  <ArrowLeft size={14} />
                  Previous
                </Link>
              )}
              {nextProject && (
                <Link
                  href={`/work/${nextProject.slug}`}
                  className="flex items-center gap-2 text-sm font-mono text-foreground/50 hover:text-foreground transition-colors"
                >
                  Next
                  <ArrowRight size={14} />
                </Link>
              )}
            </div>
          </div>

          {/* Title */}
          <h1
            ref={titleRef}
            className="text-[14vw] md:text-[10vw] lg:text-[8vw] font-humane uppercase leading-[0.85] tracking-tight text-foreground mb-8"
            style={{ opacity: 0 }}
          >
            {project.name}
          </h1>

          {/* Meta info */}
          <div className="flex flex-wrap items-center gap-6 text-sm font-mono text-foreground/50">
            <span className="uppercase tracking-wider">{project.category}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span>{project.year}</span>
            <span className="w-1 h-1 rounded-full bg-foreground/30" />
            <span
              className={`px-2 py-0.5 rounded-full text-xs ${
                project.status === 'Live' ? 'bg-green-500/10 text-green-600' : 'bg-secondary/10 text-foreground/50'
              }`}
            >
              {project.status}
            </span>
          </div>
        </section>

        {/* Content Section */}
        <section ref={contentRef} className="px-6 md:px-12 lg:px-20 pb-32" style={{ opacity: 0 }}>
          {/* Description */}
          <div className="max-w-3xl mb-16">
            <p className="text-xl md:text-2xl font-primary leading-relaxed text-foreground/80">{project.description}</p>
          </div>

          {/* Tags */}
          <div className="mb-16">
            <p className="text-xs font-mono text-foreground/40 uppercase tracking-widest mb-4">Technologies</p>
            <div className="flex flex-wrap gap-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-mono border border-secondary/20 rounded-full text-foreground/70 hover:border-tertiary hover:text-foreground transition-colors"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* External Link */}
          {project.link && project.link !== '#' && (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-foreground text-primary font-mono text-sm rounded-full hover:bg-tertiary transition-colors"
            >
              View Live Project
              <ExternalLink size={14} />
            </a>
          )}

          {/* Project images placeholder */}
          <div className="mt-24 grid gap-8">
            <div className="aspect-video bg-secondary/5 rounded-2xl flex items-center justify-center">
              <p className="text-foreground/20 font-mono text-sm">Project visuals coming soon</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="aspect-square bg-secondary/5 rounded-2xl flex items-center justify-center">
                <p className="text-foreground/20 font-mono text-sm">Image</p>
              </div>
              <div className="aspect-square bg-secondary/5 rounded-2xl flex items-center justify-center">
                <p className="text-foreground/20 font-mono text-sm">Image</p>
              </div>
            </div>
          </div>

          {/* Navigation at bottom */}
          <div className="mt-24 pt-12 border-t border-secondary/20 flex items-center justify-between">
            {prevProject ? (
              <Link href={`/work/${prevProject.slug}`} className="group flex flex-col gap-1">
                <span className="text-xs font-mono text-foreground/40 flex items-center gap-2">
                  <ArrowLeft size={12} /> Previous
                </span>
                <span className="font-primary text-foreground/70 group-hover:text-foreground transition-colors">
                  {prevProject.name}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextProject ? (
              <Link href={`/work/${nextProject.slug}`} className="group flex flex-col gap-1 text-right">
                <span className="text-xs font-mono text-foreground/40 flex items-center gap-2 justify-end">
                  Next <ArrowRight size={12} />
                </span>
                <span className="font-primary text-foreground/70 group-hover:text-foreground transition-colors">
                  {nextProject.name}
                </span>
              </Link>
            ) : (
              <Link href="/work" className="group flex flex-col gap-1 text-right">
                <span className="text-xs font-mono text-foreground/40">End of projects</span>
                <span className="font-primary text-foreground/70 group-hover:text-foreground transition-colors">
                  Back to all work
                </span>
              </Link>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
