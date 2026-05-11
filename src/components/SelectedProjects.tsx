'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { projects, type Project } from '@/data/projects';

interface SelectedProjectsProps {
  showAll?: boolean;
}

export default function SelectedProjects({ showAll = false }: SelectedProjectsProps) {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const displayProjects = showAll ? projects : projects.filter((p) => p.featured);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.project-row', {
        opacity: 0,
        y: 30,
        stagger: 0.08,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: 'grid',
        gridTemplateColumns: '55% 45%',
        gap: 0,
        position: 'relative',
        alignItems: 'start',
      }}
      className="selected-projects-grid"
    >
      {/* Left — Project List */}
      <div>
        {displayProjects.map((project, i) => (
          <Link href={`/work/${project.id}/`} key={project.id} style={{ textDecoration: 'none', display: 'block' }}>
            <div
              className="project-row"
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '28px 0 28px 8px',
                borderBottom: '1px solid var(--border)',
                borderTop: i === 0 ? '1px solid var(--border)' : 'none',
                cursor: 'pointer',
                transition: 'background 0.2s ease',
                background: hoveredProject === project.id ? 'rgba(0,0,0,0.025)' : 'transparent',
              }}
            >
              {/* Left group */}
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '24px', minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.1em',
                    flexShrink: 0,
                  }}
                >
                  {project.index}
                </span>
                <span
                  style={{
                    fontFamily: "'PPNeueMontreal', sans-serif",
                    fontWeight: 400,
                    fontSize: 'clamp(1.6rem, 3vw, 2.5rem)',
                    color: hoveredProject === project.id ? 'var(--accent)' : 'var(--text)',
                    letterSpacing: '-0.02em',
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {project.title}
                </span>
              </div>

              {/* Right group */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexShrink: 0 }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    letterSpacing: '0.05em',
                    textTransform: 'uppercase',
                  }}
                  className="project-category"
                >
                  {project.category}
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    color: 'var(--text-muted)',
                    transition: 'opacity 0.2s ease',
                    opacity: hoveredProject === project.id && showAll ? 0 : 1,
                  }}
                >
                  {project.year}
                </span>
                {showAll && (
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '11px',
                      color: 'var(--accent)',
                      letterSpacing: '0.05em',
                      opacity: hoveredProject === project.id ? 1 : 0,
                      transition: 'opacity 0.2s ease',
                      position: hoveredProject === project.id ? 'relative' : 'absolute',
                      right: hoveredProject === project.id ? 'auto' : '-9999px',
                    }}
                  >
                    View →
                  </span>
                )}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Right — Sticky Image Panel */}
      <div
        style={{
          position: 'sticky',
          top: '80px',
          height: 'calc(100svh - 160px)',
          overflow: 'hidden',
          borderRadius: '12px',
          marginLeft: '40px',
          background: 'var(--bg-alt)',
        }}
        className="image-panel"
      >
        {displayProjects.map((project) => (
          <div
            key={project.id}
            style={{
              position: 'absolute',
              inset: 0,
              opacity: hoveredProject === project.id ? 1 : 0,
              transition: 'opacity 0.5s cubic-bezier(0.16,1,0.3,1)',
            }}
          >
            <img
              src={project.coverImage}
              alt={project.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center top',
                transform: hoveredProject === project.id ? 'scale(1)' : 'scale(1.03)',
                transition: 'transform 0.6s cubic-bezier(0.16,1,0.3,1)',
              }}
            />
          </div>
        ))}

        {/* Default state */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: hoveredProject ? 0 : 1,
            transition: 'opacity 0.4s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
            }}
          >
            Hover a project
          </span>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 900px) {
          .selected-projects-grid {
            grid-template-columns: 1fr !important;
          }
          .image-panel {
            display: none !important;
          }
          .project-category {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
