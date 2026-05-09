'use client';

import { useGSAP } from '@gsap/react';
import { gsap, ScrollTrigger } from '@/plugins/gsap.plugin';
import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function NextPageTransition({ nextRoute, nextTitle }) {
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const contentRef = useRef(null);
  const [progress, setProgress] = useState(0);
  const router = useRouter();
  const isNavigating = useRef(false);

  useEffect(() => {
    if (nextRoute) {
      router.prefetch(nextRoute);
    }
  }, [nextRoute, router]);

  useGSAP(
    () => {
      if (!containerRef.current || !nextRoute) return;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=100%', // Scroll for 100% of viewport height to "unlock"
        pin: contentRef.current,
        scrub: true,
        onUpdate: (self) => {
          if (isNavigating.current) return;

          const p = Math.min(1, Math.max(0, self.progress));
          setProgress(Math.round(p * 100));
          gsap.set(progressRef.current, { scaleX: p });

          // If we reach 100% and we are scrolling down, navigate to next page
          if (p >= 0.99 && self.direction === 1) {
            if (isNavigating.current) return;
            isNavigating.current = true;

            // Visual feedback: ensure bar is full
            gsap.set(progressRef.current, { scaleX: 1 });

            // Store transition intent
            sessionStorage.setItem('transitioning-to', nextRoute);

            // Small delay for psychological "hit" of reaching 100%
            setTimeout(() => {
              router.push(nextRoute);
            }, 100);
          }
        },
      });

      return () => {
        trigger.kill();
        isNavigating.current = false;
      };
    },
    { dependencies: [nextRoute], scope: containerRef },
  );

  if (!nextRoute) return null;

  return (
    <div
      ref={containerRef}
      className="relative h-[150vh] w-full bg-primary overflow-hidden border-t border-foreground/5"
    >
      <div
        ref={contentRef}
        className="flex h-screen w-full flex-col items-center justify-center px-6 md:px-12 lg:px-20"
      >
        <p className="text-xs font-mono uppercase tracking-[0.3em] text-foreground/30 mb-20">Next Section</p>

        <div className="relative w-full flex items-center justify-center gap-12 mb-20">
          <div className="hidden md:block h-px flex-1 bg-foreground/10" />

          <h2 className="font-humane text-[22vw] md:text-[18vw] lg:text-[15vw] uppercase leading-[0.8] tracking-tight text-foreground">
            {nextTitle}
          </h2>

          <div className="hidden md:block h-px flex-1 bg-foreground/10" />
        </div>

        <div className="w-full max-w-lg text-center">
          <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-foreground/40 mb-6">Keep Scrolling</p>
          <div className="relative h-[1.5px] w-full bg-foreground/5 overflow-hidden rounded-full">
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full origin-left bg-tertiary"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
