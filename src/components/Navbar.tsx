'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import HamMenu from '@/mobile/HamMenu';
import MagneticButton from './MagneticButton';

const NAV_LINKS = [
  { name: 'About', path: '/about' },
  { name: 'Work', path: '/work' },
  { name: 'Blog', path: '/blog' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 0,
        padding: '20px clamp(20px, 4vw, 60px)',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'all 0.4s cubic-bezier(0.16,1,0.3,1)',
        background: scrolled ? 'rgba(240,236,228,0.8)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
      }}
    >
      {/* Wordmark */}
      <Link
        href="/"
        style={{
          flexShrink: 0,
          fontFamily: 'var(--font-display)',
          fontSize: '20px',
          letterSpacing: '0.1em',
          textDecoration: 'none',
          color: 'var(--text)',
          fontWeight: 400,
        }}
      >
        MUGUNTH
      </Link>

      {/* Nav Links */}
      <div
        className="nav-links"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '32px',
          marginLeft: '48px',
        }}
      >
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
          return (
            <Link
              key={link.path}
              href={link.path}
              style={{
                display: 'none',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                textDecoration: 'none',
                color: isActive ? 'var(--accent)' : 'var(--text)',
                transition: 'color 0.2s ease',
              }}
              className="nav-link-item"
              onMouseEnter={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                if (!isActive) (e.currentTarget as HTMLElement).style.color = 'var(--text)';
              }}
            >
              <span
                style={{
                  fontFamily: "'PPNeueMontreal', sans-serif",
                  fontWeight: 500,
                  fontSize: '13px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                {link.name}
              </span>
              <div
                style={{
                  width: '3px',
                  height: '3px',
                  borderRadius: '50%',
                  background: 'var(--accent)',
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.2s ease',
                }}
              />
            </Link>
          );
        })}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Contact CTA */}
      <div style={{ flexShrink: 0 }} className="nav-cta-desktop">
        <MagneticButton href="/contact" variant="filled">
          Contact →
        </MagneticButton>
      </div>

      {/* Mobile Menu */}
      <HamMenu />

      <style jsx global>{`
        @media (min-width: 768px) {
          .nav-link-item {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .nav-cta-desktop {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
}
