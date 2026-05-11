import { projects } from '@/data/projects';
import Link from 'next/link';
import MagneticButton from '@/components/MagneticButton';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.id,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.id === slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.subtitle,
    openGraph: {
      images: [{ url: project.coverImage }],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const projectIndex = projects.findIndex((p) => p.id === slug);
  const project = projects[projectIndex];

  if (!project) {
    notFound();
  }

  const nextProject = projects[(projectIndex + 1) % projects.length];
  const prevProject = projects[(projectIndex - 1 + projects.length) % projects.length];

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* 1. HERO — Full bleed cover */}
      <section
        style={{
          position: 'relative',
          width: '100%',
          height: '100svh',
          overflow: 'hidden',
        }}
      >
        {/* Cover Image */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `url(${project.coverImage}) center/cover no-repeat`,
          }}
        />
        {/* Dark overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />

        {/* Bottom content */}
        <div
          style={{
            position: 'absolute',
            bottom: '60px',
            left: 0,
            right: 0,
            padding: '0 clamp(20px, 4vw, 60px)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            zIndex: 10,
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          {/* Title */}
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(3rem, 8vw, 8rem)',
              color: '#ffffff',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
            }}
          >
            {project.title}
          </h1>

          {/* Meta pill */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              color: 'rgba(255,255,255,0.7)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(10px)',
              padding: '10px 20px',
              borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {project.year} · {project.category} · {project.tags.slice(0, 3).join(' · ')}
          </span>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
          }}
        >
          <div className="scroll-indicator" style={{ background: 'rgba(255,255,255,0.5)' }} />
        </div>
      </section>

      {/* 2. META BAR */}
      <section
        style={{
          background: 'var(--surface)',
          borderTop: '1px solid var(--border)',
          borderBottom: '1px solid var(--border)',
          padding: '32px clamp(20px, 4vw, 60px)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '32px',
          }}
        >
          <div>
            <span className="section-label" style={{ display: 'block', marginBottom: '8px' }}>
              Year
            </span>
            <span style={{ fontFamily: "'PPNeueMontreal', sans-serif", fontWeight: 500, fontSize: '14px' }}>
              {project.year}
            </span>
          </div>
          <div>
            <span className="section-label" style={{ display: 'block', marginBottom: '8px' }}>
              Role
            </span>
            <span style={{ fontFamily: "'PPNeueMontreal', sans-serif", fontWeight: 500, fontSize: '14px' }}>
              Full Stack
            </span>
          </div>
          <div>
            <span className="section-label" style={{ display: 'block', marginBottom: '8px' }}>
              Stack
            </span>
            <span style={{ fontFamily: "'PPNeueMontreal', sans-serif", fontWeight: 500, fontSize: '14px' }}>
              {project.tags.join(', ')}
            </span>
          </div>
          <div>
            <span className="section-label" style={{ display: 'block', marginBottom: '8px' }}>
              Live
            </span>
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'PPNeueMontreal', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  border: '1px solid var(--accent)',
                  borderRadius: '100px',
                  padding: '4px 14px',
                  display: 'inline-block',
                }}
              >
                Visit ↗
              </a>
            ) : (
              <span
                style={{
                  fontFamily: "'PPNeueMontreal', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                }}
              >
                —
              </span>
            )}
          </div>
          <div>
            <span className="section-label" style={{ display: 'block', marginBottom: '8px' }}>
              GitHub
            </span>
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  fontFamily: "'PPNeueMontreal', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'var(--accent)',
                  textDecoration: 'none',
                  border: '1px solid var(--accent)',
                  borderRadius: '100px',
                  padding: '4px 14px',
                  display: 'inline-block',
                }}
              >
                Code ↗
              </a>
            ) : (
              <span
                style={{
                  fontFamily: "'PPNeueMontreal', sans-serif",
                  fontWeight: 500,
                  fontSize: '14px',
                  color: 'var(--text-muted)',
                }}
              >
                Private
              </span>
            )}
          </div>
        </div>
      </section>

      {/* 3. CONTENT SECTIONS */}
      <div style={{ maxWidth: '1440px', margin: '0 auto', padding: '0 clamp(20px, 4vw, 60px)' }}>
        {/* Problem */}
        <section style={{ padding: '80px 0', borderBottom: '1px solid var(--border)', position: 'relative' }}>
          <span className="ghost-index" style={{ fontSize: '8vw', opacity: 0.06, top: '20px', right: 0 }}>
            01
          </span>
          <div>
            <span className="section-label" style={{ marginBottom: '16px', display: 'block' }}>
              — THE PROBLEM
            </span>
            <p
              style={{
                fontFamily: "'PPNeueMontreal', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                lineHeight: 1.6,
                color: 'var(--text)',
                maxWidth: '800px',
              }}
            >
              {project.problem}
            </p>
          </div>
        </section>

        {/* Approach */}
        <section
          style={{
            padding: '80px 0',
            borderBottom: '1px solid var(--border)',
            display: 'grid',
            gridTemplateColumns: '1fr auto',
            gap: '40px',
            alignItems: 'start',
            position: 'relative',
          }}
        >
          <div>
            <span className="section-label" style={{ marginBottom: '16px', display: 'block' }}>
              — THE APPROACH
            </span>
            <p
              style={{
                fontFamily: "'PPNeueMontreal', sans-serif",
                fontWeight: 500,
                fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
                lineHeight: 1.6,
                color: 'var(--text)',
                maxWidth: '800px',
              }}
            >
              {project.approach}
            </p>
          </div>
          <span
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '8vw',
              opacity: 0.06,
              lineHeight: 0.85,
              color: 'var(--ink)',
              userSelect: 'none',
            }}
          >
            02
          </span>
        </section>

        {/* Outcome */}
        <section
          style={{
            margin: '80px 0',
            background: 'var(--accent-tint)',
            borderLeft: '4px solid var(--accent)',
            padding: '40px 48px',
            borderRadius: '0 12px 12px 0',
          }}
        >
          <span className="section-label" style={{ marginBottom: '16px', display: 'block', color: 'var(--accent)' }}>
            — THE OUTCOME
          </span>
          <p
            style={{
              fontFamily: "'PPNeueMontreal', sans-serif",
              fontWeight: 500,
              fontSize: 'clamp(1.2rem, 2vw, 1.6rem)',
              lineHeight: 1.6,
              color: 'var(--text)',
            }}
          >
            {project.outcome}
          </p>
          {project.liveUrl && (
            <div style={{ marginTop: '32px' }}>
              <MagneticButton href={project.liveUrl} variant="filled">
                View Live Project →
              </MagneticButton>
            </div>
          )}
        </section>

        {/* Images (masonry) */}
        {project.images.length > 0 && (
          <section style={{ paddingBottom: '80px' }}>
            <div
              style={{
                columnCount: 2,
                columnGap: '16px',
              }}
            >
              {project.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`${project.title} screenshot ${i + 1}`}
                  style={{
                    width: '100%',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    display: 'block',
                  }}
                />
              ))}
            </div>
          </section>
        )}

        {/* Next/Prev Navigation */}
        <section
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            borderTop: '1px solid var(--border)',
          }}
        >
          <div
            style={{
              padding: '48px 24px 48px 0',
              borderRight: '1px solid var(--border)',
            }}
          >
            <Link
              href={`/work/${prevProject.id}/`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'var(--text)',
              }}
            >
              <span
                className="section-label"
                style={{
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                ← Previous
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                  lineHeight: 0.9,
                  letterSpacing: '0.02em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {prevProject.title}
              </h3>
            </Link>
          </div>
          <div
            style={{
              padding: '48px 0 48px 24px',
              textAlign: 'right',
            }}
          >
            <Link
              href={`/work/${nextProject.id}/`}
              style={{
                display: 'block',
                textDecoration: 'none',
                color: 'var(--text)',
              }}
            >
              <span
                className="section-label"
                style={{
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                Next →
              </span>
              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(1.5rem, 4vw, 3rem)',
                  lineHeight: 0.9,
                  letterSpacing: '0.02em',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {nextProject.title}
              </h3>
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
