'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';
import { useRef } from 'react';
import Btn from './Btn';

export default function Hero({ about }) {
  const containerRef = useRef(null);
  const lineRef = useRef(null);
  const designRef = useRef(null);
  const developRef = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Initial state setup
      gsap.set([designRef.current, developRef.current], { xPercent: 0 });
      gsap.set(lineRef.current, { scaleX: 0 });

      // Split the text for "Design" into characters for a stagger effect
      const designChars = designRef.current.querySelectorAll('.char');
      gsap.set(designChars, { yPercent: 120, rotation: 15, opacity: 0 });

      // Split the text for "Develop" into characters for a different stagger effect
      const developChars = developRef.current.querySelectorAll('.char');
      gsap.set(developChars, { yPercent: -120, opacity: 0, scale: 0.8 });

      // 1. Text animation for "Design" (Characters rotating and rising up)
      tl.to(
        designChars,
        {
          yPercent: 0,
          rotation: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.05,
        },
        '+=0.2',
      )

        // 2. Text animation for "Develop" (Characters scaling and dropping down)
        .to(
          developChars,
          {
            yPercent: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            stagger: -0.05,
          },
          '<',
        )

        // 3. The line appears in the center
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.8,
            ease: 'power4.inOut',
          },
          '-=0.3',
        )

        // 4. Pushing them apart (The line expands while the words move away)
        .to(
          designRef.current,
          {
            xPercent: -4, // pushes left slightly
            duration: 1.2,
            ease: 'expo.out',
          },
          '-=0.2',
        )
        .to(
          developRef.current,
          {
            xPercent: 4, // pushes right slightly
            duration: 1.2,
            ease: 'expo.out',
          },
          '<',
        )
        // Expanding the line further
        .to(
          lineRef.current,
          {
            width: '12vw',
            scaleX: 1,
            duration: 1.2,
            ease: 'expo.out',
          },
          '<',
        );
    },
    { scope: containerRef },
  );

  // Helper to wrap characters for staggering
  const wrapChars = (text) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block whitespace-pre">
        {char}
      </span>
    ));
  };

  return (
    <section
      ref={containerRef}
      className="relative min-h-[92vh] flex flex-col justify-center px-6 md:px-12 lg:px-20 pb-16 pt-32"
    >
      {/* Centered single row with pushing animation */}
      <div className="flex flex-row items-center justify-center w-full overflow-hidden mb-6 flex-nowrap whitespace-nowrap">
        {/* DESIGN text */}
        <div ref={designRef} className="flex">
          <h1 className="font-humane text-[13vw] md:text-[10vw] leading-none uppercase tracking-normal text-foreground">
            {wrapChars('Design')}
          </h1>
        </div>

        {/* Tiny line between them */}
        <div
          ref={lineRef}
          className="h-0.8 md:h-1 bg-secondary mx-3 md:mx-6 origin-center w-0 shrink-0 rounded-2xl"
          style={{ width: '0px' }}
        />

        {/* DEVELOP text */}
        <div ref={developRef} className="flex">
          <h1 className="font-humane text-[13vw] md:text-[10vw] leading-none tracking-normal uppercase bg-linear-to-tl from-slate-50 via-blue-600 to-slate-50 bg-clip-text text-transparent">
            {wrapChars('Develop')}
          </h1>
        </div>
      </div>

      {/* Sub-row */}
      <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
        <p className="max-w-xs text-lg font-primary leading-relaxed font-medium text-foreground">
          Hi, I'm <span className="text-foreground font-medium font-primary">Mugunth</span> — a{' '}
          {about?.role?.toLowerCase() || 'developer'} crafting digital experiences that are both beautiful and
          functional.
        </p>
        <Btn backgroundColor="lch(44.13 80.66 290.69)">
          <Link href="/work">View Work</Link>
        </Btn>
      </div>
    </section>
  );
}
