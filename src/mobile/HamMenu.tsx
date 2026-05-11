'use client';
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { name: 'About', path: '/about' },
  { name: 'Work', path: '/work' },
  { name: 'Blog', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const SOCIALS = [
  { name: 'Github', path: 'https://github.com/mugunth140' },
  { name: 'LinkedIn', path: 'https://linkedin.com/in/mugunthrp' },
];

export default function HamMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to('#ham-overlay', { y: 0, duration: 0.8, ease: 'expo.inOut' });
      gsap.to('.ham-item', { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, delay: 0.4, ease: 'power3.out' });
    } else {
      document.body.style.overflow = 'unset';
      gsap.to('#ham-overlay', { y: '-100%', duration: 0.8, ease: 'expo.inOut' });
      gsap.to('.ham-item', { opacity: 0, y: 20, duration: 0.3, ease: 'power2.in' });
    }
  }, [isOpen]);

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'none',
          position: 'fixed',
          top: '20px',
          right: '20px',
          zIndex: 110,
          width: '48px',
          height: '48px',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '6px',
          background: 'var(--ink)',
          borderRadius: '50%',
          border: 'none',
          cursor: 'pointer',
          overflow: 'hidden',
        }}
        className="ham-button"
      >
        <span
          style={{
            width: '20px',
            height: '2px',
            background: 'var(--bg)',
            transition: 'transform 0.5s ease',
            transform: isOpen ? 'rotate(45deg) translateY(8px)' : 'none',
          }}
        />
        <span
          style={{
            width: '20px',
            height: '2px',
            background: 'var(--bg)',
            transition: 'transform 0.5s ease',
            transform: isOpen ? 'rotate(-45deg)' : 'none',
          }}
        />
      </button>

      <div
        id="ham-overlay"
        style={{
          position: 'fixed',
          inset: 0,
          background: 'var(--bg)',
          zIndex: 105,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transform: 'translateY(-100%)',
          padding: 'var(--section-py) var(--section-px)',
        }}
      >
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '60px' }}>
          <span className="section-label ham-item" style={{ opacity: 0 }}>
            — NAVIGATION
          </span>
          <ul
            style={{ display: 'flex', flexDirection: 'column', gap: '4px', listStyle: 'none', padding: 0, margin: 0 }}
          >
            {NAV_LINKS.map((link) => (
              <li key={link.path} className="ham-item" style={{ opacity: 0 }}>
                <Link
                  href={link.path}
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '18vw',
                    lineHeight: 0.95,
                    textTransform: 'uppercase',
                    color: 'var(--text)',
                    textDecoration: 'none',
                    transition: 'color 0.2s ease',
                    display: 'block',
                  }}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="ham-item" style={{ height: '1px', width: '100%', background: 'var(--border)', opacity: 0 }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <ul style={{ display: 'flex', gap: '24px', listStyle: 'none', padding: 0, margin: 0 }}>
              {SOCIALS.map((social) => (
                <li key={social.name} className="ham-item" style={{ opacity: 0 }}>
                  <a
                    href={social.path}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontFamily: "'PPNeueMontreal', sans-serif",
                      fontWeight: 500,
                      fontSize: '12px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.15em',
                      color: 'var(--text-muted)',
                      textDecoration: 'none',
                      transition: 'color 0.2s ease',
                    }}
                  >
                    {social.name}
                  </a>
                </li>
              ))}
            </ul>
            <span className="section-label ham-item" style={{ opacity: 0 }}>
              V3.0
            </span>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @media (max-width: 767px) {
          .ham-button {
            display: flex !important;
          }
        }
      `}</style>
    </>
  );
}
