'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function FooterNavigation({ nextPage }) {
  const router = useRouter();
  const containerRef = useRef(null);
  const progressRef = useRef(null);
  const textRef = useRef(null);
  const isNavigating = useRef(false);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const markTransitionIntent = useCallback(() => {
    if (!nextPage) return;

    try {
      sessionStorage.setItem('transitioning-to', nextPage.path);
      sessionStorage.setItem('transition-title', nextPage.name);
    } catch {
      // Storage can be blocked
    }
  }, [nextPage]);

  const navigateToNextPage = useCallback(() => {
    if (!nextPage || isNavigating.current) return;

    isNavigating.current = true;
    markTransitionIntent();
    router.push(nextPage.path);
  }, [markTransitionIntent, nextPage, router]);

  useEffect(() => {
    if (!nextPage) return;
    router.prefetch(nextPage.path);
  }, [nextPage, router]);

  useEffect(() => {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const syncMotionPreference = () => setPrefersReducedMotion(motionQuery.matches);

    syncMotionPreference();
    motionQuery.addEventListener('change', syncMotionPreference);

    return () => motionQuery.removeEventListener('change', syncMotionPreference);
  }, []);

  useGSAP(
    () => {
      if (!nextPage || !containerRef.current) return;

      isNavigating.current = false;
      setProgress(0);
      gsap.set(progressRef.current, { scaleX: 0 });

      // Create a trigger that spans the entire scrollable area
      const progressTrigger = ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          if (isNavigating.current) return;

          const nextProgress = Math.min(1, Math.max(0, self.progress));
          gsap.set(progressRef.current, { scaleX: nextProgress });
          setProgress(Math.round(nextProgress * 100));

          // Trigger navigation only at 100% scroll
          if (nextProgress >= 1) {
            navigateToNextPage();
          }
        },
      });

      return () => {
        progressTrigger.kill();
      };
    },
    { dependencies: [navigateToNextPage, nextPage, prefersReducedMotion], scope: containerRef },
  );

  if (!nextPage) return null;

  return (
    <div
      ref={containerRef}
      className="border-t border-color-secondary/20 bg-primary py-6 md:py-8"
      aria-label={`Scroll to navigate to ${nextPage.name}`}
    >
      <div className="px-6 md:px-12 lg:px-20">
        {/* Progress bar */}
        <div className="mb-6 md:mb-8">
          <div
            className="relative h-1 md:h-1.5 overflow-hidden rounded-full bg-foreground/10"
            role="progressbar"
            aria-label={`Scroll progress to ${nextPage.name}`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <div
              ref={progressRef}
              className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-tertiary transition-all duration-300"
              style={{ transform: 'scaleX(0)' }}
            />
          </div>
        </div>

        {/* Navigation content */}
        <div className="flex items-center justify-between gap-4">
          {/* Left: Next page info */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] md:text-xs font-mono uppercase tracking-[0.18em] text-foreground/40 mb-2">
              Next Page
            </p>
            <h3 className="text-sm md:text-base lg:text-lg font-humane uppercase leading-tight text-foreground truncate">
              {nextPage.name}
            </h3>
          </div>

          {/* Center: Progress text */}
          <div className="text-right hidden sm:block">
            <p className="text-xs md:text-sm font-mono text-foreground/50">
              {prefersReducedMotion ? 'Direct' : 'Scroll'} {progress}%
            </p>
          </div>

          {/* Right: Open button */}
          <Link
            href={nextPage.path}
            data-cursor={nextPage.name}
            onClick={markTransitionIntent}
            className="group shrink-0 inline-flex items-center gap-1.5 md:gap-2 rounded-full border border-foreground/20 px-3 md:px-4 py-1.5 md:py-2 text-xs md:text-sm font-medium text-foreground/70 hover:text-foreground hover:border-foreground/40 transition-all duration-300"
          >
            <span className="hidden sm:inline">Open</span>
            <ArrowUpRight
              size={14}
              className="md:w-4 md:h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        {/* Mobile hint */}
        {!prefersReducedMotion && (
          <p className="mt-4 text-[10px] md:text-xs font-mono text-foreground/30 sm:hidden">
            Scroll to 100% to navigate
          </p>
        )}
      </div>
    </div>
  );
}
