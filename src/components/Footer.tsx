'use client';
import Link from 'next/link';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        width: '100%',
        background: 'var(--ink)',
        color: 'var(--bg)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Large Ghost Wordmark */}
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          padding: '80px 0 0',
          position: 'relative',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(5rem, 14vw, 14rem)',
            color: 'rgba(255,255,255,0.08)',
            lineHeight: 0.85,
            letterSpacing: '0.02em',
            display: 'block',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          MUGUNTH
        </span>
      </div>

      {/* Overlaid Content */}
      <div
        style={{
          padding: '40px clamp(20px, 4vw, 60px) 0',
          maxWidth: '1440px',
          margin: '0 auto',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.1em',
          }}
        >
          mugunth.dev — v3
        </span>
        <div
          style={{
            display: 'flex',
            gap: '24px',
            alignItems: 'center',
          }}
        >
          {[
            { name: 'About', path: '/about' },
            { name: 'Work', path: '/work' },
            { name: 'Blog', path: '/blog' },
            { name: 'Contact', path: '/contact' },
          ].map((link) => (
            <Link
              key={link.path}
              href={link.path}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                color: 'var(--bg)',
                textDecoration: 'none',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                transition: 'opacity 0.2s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '0.6';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.opacity = '1';
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          margin: '32px clamp(20px, 4vw, 60px) 0',
          padding: '20px 0 24px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.05em',
          }}
        >
          © {year} Mugunth. Crafted with intent.
        </span>
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '11px',
            color: 'rgba(255,255,255,0.4)',
            letterSpacing: '0.05em',
          }}
        >
          Built with Next.js + GSAP · Hosted on Caddy
        </span>
      </div>
    </footer>
  );
}
