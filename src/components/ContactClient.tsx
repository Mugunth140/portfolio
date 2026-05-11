'use client';

import { useState } from 'react';
import MagneticButton from '@/components/MagneticButton';

const FAQ_ITEMS = [
  {
    question: "What's your availability?",
    answer:
      "I'm currently open to freelance projects, contract work, and full-time positions. I typically take on one major project at a time to ensure quality and focus.",
  },
  {
    question: 'Do you work with international clients?',
    answer:
      "Absolutely. I've worked with clients across different time zones and am comfortable with async communication, Slack, and regular video standups.",
  },
  {
    question: 'What does your typical process look like?',
    answer:
      'I start with architecture and planning (~30% of time), build in iterative phases with regular check-ins, and handle deployment and monitoring myself. No handoffs, no surprises.',
  },
];

export default function ContactClient() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* SECTION 1 — Opening */}
      <section
        style={{
          minHeight: '100svh',
          display: 'flex',
          alignItems: 'center',
          padding: '140px clamp(20px, 4vw, 60px) 80px',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'grid',
            gridTemplateColumns: '55% 45%',
            gap: 'clamp(32px, 5vw, 80px)',
            alignItems: 'center',
          }}
          className="contact-grid"
        >
          {/* Left Column */}
          <div style={{ minWidth: 0 }}>
            <span className="section-label" style={{ marginBottom: '20px', display: 'block' }}>
              — CONTACT
            </span>

            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(4rem, 9vw, 9rem)',
                letterSpacing: '0.01em',
                lineHeight: 0.9,
                color: 'var(--ink)',
              }}
            >
              LET&apos;S
              <br />
              BUILD
              <br />
              SOMETHING
              <br />
              <span style={{ color: 'var(--accent)' }}>REAL.</span>
            </h1>

            <p
              style={{
                fontFamily: "'PPNeueMontreal', sans-serif",
                fontWeight: 400,
                fontSize: '1rem',
                color: 'var(--text-muted)',
                marginTop: '32px',
                lineHeight: 1.6,
              }}
            >
              Open to freelance, contracts, and full-time roles.
            </p>

            <a
              href="mailto:hello@mugunth.dev"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.4rem, 3vw, 2.5rem)',
                color: 'var(--text)',
                textDecoration: 'none',
                display: 'block',
                marginTop: '24px',
                transition: 'color 0.2s ease',
                lineHeight: 1.2,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = 'var(--text)';
              }}
            >
              hello@mugunth.dev
            </a>

            <div style={{ marginTop: '28px' }}>
              <MagneticButton href="mailto:hello@mugunth.dev" variant="filled">
                Send a Message →
              </MagneticButton>
            </div>
          </div>

          {/* Right Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '40px',
              minWidth: 0,
            }}
          >
            {/* Availability Badge */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                width: 'fit-content',
                background: 'var(--surface)',
              }}
            >
              <div
                className="availability-dot"
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: '#22c55e',
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '10px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                }}
              >
                Available for Projects — 2025
              </span>
            </div>

            {/* Socials */}
            <div>
              <span className="section-label" style={{ marginBottom: '16px', display: 'block' }}>
                — SOCIALS
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {[
                  { name: 'GitHub ↗', url: 'https://github.com/mugunth140' },
                  { name: 'LinkedIn ↗', url: 'https://linkedin.com/in/mugunthrp' },
                  { name: 'Twitter ↗', url: 'https://twitter.com/mugunth140' },
                ].map((social) => (
                  <MagneticButton
                    key={social.name}
                    href={social.url}
                    variant="outlined"
                    className="w-full justify-center"
                  >
                    {social.name}
                  </MagneticButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — FAQ */}
      <section
        style={{
          padding: 'var(--section-py) var(--section-px)',
          borderTop: '1px solid var(--border)',
        }}
      >
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <span className="section-label" style={{ marginBottom: '32px', display: 'block' }}>
            — QUICK ANSWERS
          </span>

          {FAQ_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                borderTop: '1px solid var(--border)',
              }}
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '24px 0',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: "'PPNeueMontreal', sans-serif",
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  color: 'var(--text)',
                  textAlign: 'left',
                }}
              >
                {item.question}
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '18px',
                    color: 'var(--text-muted)',
                    transition: 'transform 0.3s ease',
                    transform: openFaq === i ? 'rotate(45deg)' : 'rotate(0deg)',
                    flexShrink: 0,
                    marginLeft: '16px',
                  }}
                >
                  +
                </span>
              </button>
              <div
                className={`faq-answer ${openFaq === i ? 'open' : ''}`}
                style={{
                  paddingBottom: openFaq === i ? '24px' : 0,
                }}
              >
                <p
                  style={{
                    fontFamily: "'PPNeueMontreal', sans-serif",
                    fontWeight: 400,
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.7,
                  }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <style jsx global>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
