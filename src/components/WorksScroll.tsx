'use client';
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects } from '@/data/projects';
import Link from 'next/link';

export default function WorksScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: () => `+=${projects.length * 100}vh`,
        pin: true,
        scrub: 1,
      });

      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        if (i === 0) return; // First panel is already in place

        gsap.fromTo(
          panel,
          { y: '100vh' },
          {
            y: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: () => `top -${(i - 1) * 100}vh`,
              end: () => `top -${i * 100}vh`,
              scrub: 1,
            },
          },
        );
      });

      // Parallax for images within panels
      panelsRef.current.forEach((panel, i) => {
        if (!panel) return;
        const img = panel.querySelector('.work-image');
        if (img) {
          gsap.to(img, {
            yPercent: 20,
            ease: 'none',
            scrollTrigger: {
              trigger: containerRef.current,
              start: () => `top -${i * 100}vh`,
              end: () => `top -${(i + 1) * 100}vh`,
              scrub: 1,
            },
          });
        }
      });

      // Progress line
      gsap.to('.progress-bar', {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: () => `+=${projects.length * 100}vh`,
          scrub: 1,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="works-container relative w-full h-[100svh] overflow-hidden bg-[var(--bg)]">
      {projects.map((project, i) => (
        <div
          key={project.id}
          ref={(el) => {
            panelsRef.current[i] = el;
          }}
          className="absolute top-0 left-0 w-full h-full grid grid-cols-1 lg:grid-cols-2 bg-[var(--bg)]"
          style={{ zIndex: i }}
        >
          {/* Left Metadata */}
          <div
            className="w-full h-1/2 lg:h-full flex flex-col justify-center border-r border-[var(--border)]"
            style={{ padding: 'var(--section-px)' }}
          >
            <span className="font-humane text-[var(--text-hero)] text-[var(--border)] leading-none mb-8">
              {project.index}
            </span>
            <h2 className="font-display font-bold text-[var(--text-3xl)] uppercase tracking-[-0.03em] mb-4">
              {project.title}
            </h2>
            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[var(--accent-light)] text-[var(--accent)] text-[var(--text-xs)] font-display uppercase tracking-wider rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <p className="text-[var(--text-lg)] text-[var(--text-muted)] max-w-md mb-12 leading-[1.6]">
              {project.subtitle}
            </p>
            <Link
              href={`/work/${project.id}`}
              className="inline-flex items-center gap-4 text-[var(--text)] font-display font-medium uppercase tracking-widest text-[var(--text-sm)] hover:text-[var(--accent)] transition-colors"
            >
              View All Details <span className="w-8 h-[1px] bg-current" />
            </Link>
          </div>

          {/* Right Image */}
          <div className="w-full h-1/2 lg:h-full relative overflow-hidden bg-[var(--surface)]">
            <Link href={`/work/${project.id}`} className="block w-full h-full relative overflow-hidden">
              <div className="absolute -top-[10%] left-0 w-full h-[120%]">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="work-image w-full h-full object-cover block"
                />
              </div>
            </Link>
          </div>
        </div>
      ))}

      {/* Progress Indicator */}
      <div className="absolute right-0 top-0 h-full w-[2px] bg-[var(--border)] z-[100]">
        <div className="progress-bar w-full bg-[var(--accent)] origin-top scale-y-0 h-full" />
      </div>
    </div>
  );
}
