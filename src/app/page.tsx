import HeroSection from '@/components/HeroSection';
import SelectedProjects from '@/components/SelectedProjects';

export default function Home() {
  return (
    <main>
      <HeroSection />

      {/* Selected Work Section */}
      <section
        style={{
          padding: 'var(--section-py) var(--section-px)',
          borderTop: '1px solid var(--border)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Ghost index */}
        <span className="ghost-index">02</span>

        <div style={{ maxWidth: '1440px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: '48px',
              flexWrap: 'wrap',
              gap: '16px',
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <span className="section-label">— SELECTED WORK</span>
              <h2
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(3rem, 8vw, 7rem)',
                  letterSpacing: '0.02em',
                  lineHeight: 0.9,
                  color: 'var(--ink)',
                }}
              >
                PROJECTS
              </h2>
            </div>
          </div>

          <SelectedProjects />
        </div>
      </section>
    </main>
  );
}
