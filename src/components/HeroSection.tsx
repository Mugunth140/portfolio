'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from './MagneticButton';

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const handler = () => setReady(true);
    window.addEventListener('preloader:done', handler);

    // Fallback if event never fires
    const fallback = setTimeout(() => setReady(true), 4000);

    return () => {
      window.removeEventListener('preloader:done', handler);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // Hero words animate in
      gsap.from('.hero-word', {
        yPercent: 120,
        duration: 1.1,
        stagger: 0.12,
        ease: 'expo.out',
        delay: 0.2,
      });

      // Blue rule lines
      gsap.from('.hero-rule', {
        scaleX: 0,
        duration: 1.4,
        stagger: 0.1,
        delay: 0.5,
        ease: 'expo.inOut',
      });

      // Badge fade in
      gsap.from('.hero-badge', {
        opacity: 0,
        y: 10,
        duration: 0.8,
        delay: 0.8,
        ease: 'power3.out',
      });

      // Bottom bar
      gsap.from('.hero-bottom', {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 1.0,
        ease: 'power3.out',
      });

      // Scroll indicator
      gsap.from('.scroll-indicator', {
        opacity: 0,
        duration: 0.6,
        delay: 1.4,
        ease: 'power2.out',
      });

      // Parallax on scroll
      gsap.to('.hero-kinetic', {
        yPercent: -15,
        ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [ready]);

  return (
    <section
      ref={containerRef}
      className="dot-grid"
      style={{
        position: 'relative',
        width: '100%',
        height: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Top-left badge */}
      <div
        className="hero-badge accent-border-left"
        style={{
          position: 'absolute',
          top: '100px',
          left: 'clamp(20px, 4vw, 60px)',
          zIndex: 10,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '0.15em',
            color: 'var(--text-muted)',
            textTransform: 'uppercase',
          }}
        >
          Available for Work · 2025
        </span>
      </div>

      {/* Center Kinetic Text */}
      <div
        className="hero-kinetic"
        style={{
          width: '100%',
          padding: '0 clamp(20px, 4vw, 60px)',
          position: 'relative',
          zIndex: 10,
        }}
      >
        {/* Line 1: DESIGN + rule */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ overflow: 'hidden' }}>
            <span className="hero-word" style={{ display: 'block' }}>
              DESIGN
            </span>
          </div>
          <span
            className="hero-rule"
            style={{
              flex: 1,
              margin: '0 16px',
              borderTop: '2.5px solid var(--accent)',
              display: 'block',
              transformOrigin: 'left',
            }}
          />
        </div>

        {/* Line 2: rule + DEVELOP */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span
            className="hero-rule"
            style={{
              flex: 1,
              margin: '0 16px',
              borderTop: '2.5px solid var(--accent)',
              display: 'block',
              transformOrigin: 'right',
            }}
          />
          <div style={{ overflow: 'hidden' }}>
            <span className="hero-word" style={{ display: 'block' }}>
              DEVELOP
            </span>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        style={{
          position: 'absolute',
          bottom: '100px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
        }}
      >
        <div className="scroll-indicator" />
      </div>

      {/* Bottom Bar */}
      <div
        className="hero-bottom"
        style={{
          position: 'absolute',
          bottom: '40px',
          left: 0,
          right: 0,
          padding: '0 clamp(20px, 4vw, 60px)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          zIndex: 20,
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <p
          style={{
            fontFamily: "'PPNeueMontreal', sans-serif",
            fontWeight: 400,
            fontSize: 'clamp(0.9rem, 1.5vw, 1.1rem)',
            color: 'var(--text-muted)',
            maxWidth: '400px',
            lineHeight: 1.5,
          }}
        >
          Full stack engineer. End-to-end. No handoffs.
        </p>
        <MagneticButton href="/work" variant="outlined">
          View Work →
        </MagneticButton>
      </div>
    </section>
  );
}
