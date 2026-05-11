import type { Metadata } from 'next';
import { projects } from '@/data/projects';
import SelectedProjects from '@/components/SelectedProjects';

export const metadata: Metadata = {
  title: 'Work',
  description: 'Selected projects spanning frontend, backend, and full-stack architecture.',
};

export default function WorkPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Page Header */}
      <section
        style={{
          paddingTop: '140px',
          paddingBottom: '60px',
          paddingLeft: 'clamp(20px, 4vw, 60px)',
          paddingRight: 'clamp(20px, 4vw, 60px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="section-label">— ALL WORK</span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 12vw, 11rem)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: 'var(--ink)',
              }}
            >
              Projects
            </h1>
            <p
              style={{
                fontFamily: "'PPNeueMontreal', sans-serif",
                fontWeight: 400,
                fontSize: '1rem',
                color: 'var(--text-muted)',
                marginTop: '8px',
              }}
            >
              Handcrafted from architecture to deployment.
            </p>
          </div>

          {/* Project count badge */}
          <div
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '11px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--text-muted)',
              border: '1px solid var(--border)',
              borderRadius: '100px',
              padding: '8px 18px',
            }}
          >
            {String(projects.length).padStart(2, '0')} Projects
          </div>
        </div>
      </section>

      {/* Project List */}
      <section
        style={{
          padding: 'var(--section-py) var(--section-px)',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <SelectedProjects showAll />

          {/* More coming soon */}
          <div
            style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '32px',
              marginTop: '48px',
              textAlign: 'center',
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
              More coming soon.
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
