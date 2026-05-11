import MagneticButton from '@/components/MagneticButton';
import AboutStyles from '@/components/AboutStyles';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About',
  description: 'Full stack engineer with a focus on delivering high-quality, scalable software solutions.',
};

const SKILLS = [
  'Next.js',
  'TypeScript',
  'React',
  'Node.js',
  'PostgreSQL',
  'Docker',
  'AWS',
  'GSAP',
  'Framer Motion',
  'Tailwind CSS',
  'Redis',
  'Caddy',
  'Git',
  'Figma',
  'Python',
  'Go',
  'Java',
  'Spring Boot',
  'MongoDB',
];

const SERVICES = [
  {
    title: 'Full Stack Development',
    body: 'End-to-end application development from database architecture to polished frontends. React, Next.js, Node.js, and beyond.',
  },
  {
    title: 'UI/UX Engineering',
    body: 'Pixel-perfect implementations with GSAP animations, responsive design systems, and accessibility-first thinking.',
  },
  {
    title: 'DevOps & Deployment',
    body: 'Docker containerization, CI/CD pipelines, server configuration with Caddy, and production monitoring.',
  },
];

export default function AboutPage() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <AboutStyles />

      {/* SECTION 1 — Opening Statement */}
      <section
        className="dot-grid"
        style={{
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '140px clamp(20px, 4vw, 60px) 80px',
          position: 'relative',
        }}
      >
        <div style={{ maxWidth: '800px' }}>
          <span className="section-label" style={{ marginBottom: '20px', display: 'block' }}>
            — ABOUT
          </span>
          <h1
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(4rem, 10vw, 10rem)',
              lineHeight: 0.9,
              letterSpacing: '0.02em',
              color: 'var(--ink)',
              marginBottom: '24px',
            }}
          >
            ENGINEERING
            <br />
            WITH INTENT.
          </h1>
          <p
            style={{
              fontFamily: "'PPNeueMontreal', sans-serif",
              fontWeight: 400,
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              maxWidth: '480px',
              margin: '0 auto',
              lineHeight: 1.7,
            }}
          >
            I&apos;m Mugunth — a full stack developer based in India. I own the full delivery cycle, from architecture
            to production.
          </p>
        </div>
      </section>

      {/* SECTION 2 — Two Column Story */}
      <section
        style={{
          padding: 'var(--section-py) var(--section-px)',
          borderTop: '1px solid var(--border)',
          position: 'relative',
        }}
      >
        <span className="ghost-index">02</span>
        <div
          className="about-two-col"
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'start',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Left Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', minWidth: 0 }}>
            <span className="section-label">— STORY</span>
            <h2
              style={{
                fontFamily: "'PPNeueMontreal', sans-serif",
                fontWeight: 700,
                fontSize: '1.8rem',
                lineHeight: 1.3,
                color: 'var(--text)',
                letterSpacing: '-0.02em',
              }}
            >
              Engineering with precision.
              <br />
              Designing with intent.
            </h2>
            <p
              style={{
                fontFamily: "'PPNeueMontreal', sans-serif",
                fontWeight: 400,
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
              }}
            >
              I believe the best products are built at the intersection of robust engineering and thoughtful design.
              With over 3 years of experience, I&apos;ve delivered solutions ranging from centralized analytics engines
              to high-performance e-commerce architectures.
            </p>
            <p
              style={{
                fontFamily: "'PPNeueMontreal', sans-serif",
                fontWeight: 400,
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
              }}
            >
              Currently based in India, I work across the full stack — React, Next.js, Node.js, and Java. My focus is
              always on maintainability, scalability, and operational excellence.
            </p>

            {/* Stats Row */}
            <div
              className="stats-row"
              style={{
                display: 'flex',
                gap: '0',
                marginTop: '32px',
              }}
            >
              {[
                { number: '3+', label: 'Years' },
                { number: '8+', label: 'Projects' },
                { number: '10+', label: 'Technologies' },
              ].map((stat, i) => (
                <div
                  key={stat.label}
                  style={{
                    flex: 1,
                    borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                    paddingRight: i < 2 ? '24px' : 0,
                    paddingLeft: i > 0 ? '24px' : 0,
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      color: 'var(--accent)',
                      lineHeight: 1,
                      display: 'block',
                    }}
                  >
                    {stat.number}
                  </span>
                  <span className="section-label" style={{ marginTop: '8px', display: 'block' }}>
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px', minWidth: 0 }}>
            <span className="section-label">— CORE STACK</span>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px',
              }}
            >
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="skill-pill"
                  style={{
                    border: '1px solid var(--border)',
                    background: 'var(--surface)',
                    padding: '8px 18px',
                    borderRadius: '100px',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--text)',
                    transition: 'border-color 0.2s ease, color 0.2s ease',
                    cursor: 'default',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* Availability Card */}
            <div
              style={{
                background: 'var(--accent-tint)',
                border: '1px solid rgba(26,92,255,0.2)',
                borderRadius: '12px',
                padding: '24px 28px',
                boxSizing: 'border-box',
                width: '100%',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  color: 'var(--accent)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  display: 'block',
                  marginBottom: '12px',
                }}
              >
                AVAILABILITY
              </span>
              <p
                style={{
                  fontFamily: "'PPNeueMontreal', sans-serif",
                  fontWeight: 400,
                  fontSize: '0.95rem',
                  color: 'var(--text)',
                  lineHeight: 1.6,
                  marginBottom: '20px',
                }}
              >
                Open for senior roles and high-impact freelance collaborations.
              </p>
              <MagneticButton href="/contact" variant="filled">
                Get in Touch →
              </MagneticButton>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — Services */}
      <section
        style={{
          background: 'var(--bg-alt)',
          padding: 'var(--section-py) var(--section-px)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div style={{ marginBottom: '48px' }}>
            <span className="section-label">— WHAT I DO</span>
          </div>
          <div
            className="services-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
          >
            {SERVICES.map((service) => (
              <div
                key={service.title}
                className="service-card"
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '12px',
                  padding: '32px 28px',
                  background: 'var(--surface)',
                  transition: 'border-color 0.3s cubic-bezier(0.16,1,0.3,1), transform 0.3s cubic-bezier(0.16,1,0.3,1)',
                  minWidth: 0,
                }}
              >
                <div
                  style={{
                    borderLeft: '2px solid var(--accent)',
                    paddingLeft: '12px',
                    marginBottom: '20px',
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "'PPNeueMontreal', sans-serif",
                      fontWeight: 700,
                      fontSize: '1.1rem',
                      color: 'var(--text)',
                    }}
                  >
                    {service.title}
                  </h3>
                </div>
                <p
                  style={{
                    fontFamily: "'PPNeueMontreal', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.9rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                  }}
                >
                  {service.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
