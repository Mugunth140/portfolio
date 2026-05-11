'use client';
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        let start: number | null = null;
        const duration = 1200;
        const step = (timestamp: number) => {
          if (!start) start = timestamp;
          const progress = Math.min((timestamp - start) / duration, 1);
          setCount(Math.floor(progress * target));
          if (progress < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      },
      { threshold: 0.5 },
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.from('.about-left', {
        x: -40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });

      gsap.from('.about-right', {
        x: 40,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="border-b border-[var(--border)] overflow-hidden"
      style={{ padding: 'var(--section-py) var(--section-px)' }}
    >
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-[60%_40%] gap-16 lg:gap-24">
        {/* Left Column */}
        <div className="about-left flex flex-col gap-8 min-w-0">
          <span className="section-label">— 02 ABOUT</span>
          <h2 className="font-display font-medium text-[var(--text-2xl)] leading-[1.3] text-[var(--text)] tracking-[-0.03em]">
            I&apos;m Mugunth — a full stack developer who owns the entire delivery cycle. From architecture decisions to
            production deployments, I build software that actually ships.
          </h2>
          <p className="font-sans font-normal text-[var(--text-base)] text-[var(--text-muted)] max-w-xl leading-[1.7]">
            Currently building mugunth.dev v3. Previously at Zoho. I work across React, Next.js, Node.js, Java Spring
            Boot, and whatever the problem demands.
          </p>
        </div>

        {/* Right Column */}
        <div className="about-right grid grid-cols-2 gap-x-8 gap-y-12 content-start min-w-0 overflow-hidden">
          <div className="flex flex-col gap-2">
            <span className="font-humane text-[var(--text-3xl)] text-[var(--accent)] leading-[0.9]">
              <CountUp target={3} suffix="+" />
            </span>
            <span className="section-label">Years Building</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-humane text-[var(--text-3xl)] text-[var(--accent)] leading-[0.9]">
              <CountUp target={8} suffix="+" />
            </span>
            <span className="section-label">Projects Shipped</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-humane text-[var(--text-3xl)] text-[var(--accent)] leading-[0.9]">
              <CountUp target={10} suffix="+" />
            </span>
            <span className="section-label">Technologies</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-humane text-[var(--text-3xl)] text-[var(--accent)] leading-[0.9]">
              <CountUp target={1} />
            </span>
            <span className="section-label">Focus: Quality</span>
          </div>
        </div>
      </div>
    </section>
  );
}
