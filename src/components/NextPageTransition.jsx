'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

gsap.registerPlugin(ScrollTrigger);

export default function NextPageTransition({ nextPage }) {
  const router = useRouter();
  const sectionRef = useRef(null);
  const progressRef = useRef(null);
  const titleRef = useRef(null);
  const eyebrowRef = useRef(null);
  const hintRef = useRef(null);
  const isNavigating = useRef(false);
  const [progress, setProgress] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const markTransitionIntent = useCallback(() => {
    if (!nextPage) return;

    try {
      sessionStorage.setItem('transitioning-to', nextPage.path);
      sessionStorage.setItem('transition-title', nextPage.name);
    } catch {
      // Storage can be blocked; navigation should still continue normally.
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
      if (!nextPage || !sectionRef.current) return;

      isNavigating.current = false;
      setProgress(0);
      gsap.set(progressRef.current, { scaleX: 0 });
      gsap.set([eyebrowRef.current, titleRef.current, hintRef.current], { y: 24, opacity: 0 });

      gsap.to([eyebrowRef.current, titleRef.current, hintRef.current], {
        y: 0,
        opacity: 1,
        duration: prefersReducedMotion ? 0.01 : 0.8,
        ease: 'power3.out',
        stagger: prefersReducedMotion ? 0 : 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 78%',
          once: true,
        },
      });

      if (prefersReducedMotion) return;

      const progressTrigger = ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          if (isNavigating.current) return;

          const nextProgress = Math.min(1, Math.max(0, self.progress));
          gsap.set(progressRef.current, { scaleX: nextProgress });
          setProgress(Math.round(nextProgress * 100));

          // Trigger navigation at 95% with scroll velocity check
          if (nextProgress >= 0.95 && self.getVelocity() > 0) {
            navigateToNextPage();
          }
        },
        onLeaveBack: () => {
          if (!isNavigating.current) {
            isNavigating.current = false;
            setProgress(0);
            gsap.set(progressRef.current, { scaleX: 0 });
          }
        },
      });

      return () => {
        progressTrigger.kill();
      };
    },
    { dependencies: [navigateToNextPage, nextPage, prefersReducedMotion], scope: sectionRef },
  );

  if (!nextPage) return null;

  return (
    <section
      ref={sectionRef}
      className="next-page-section relative min-h-[115svh] bg-secondary text-white"
      aria-label={`Scroll to navigate to ${nextPage.name}`}
    >
      <div className="sticky top-0 flex min-h-svh flex-col justify-between overflow-hidden px-6 py-8 md:px-12 lg:px-20">
        <div className="flex items-center justify-between gap-6">
          <p ref={eyebrowRef} className="text-xs font-mono uppercase tracking-[0.25em] text-white/45">
            Next page
          </p>
          <Link
            href={nextPage.path}
            data-cursor={nextPage.name}
            onClick={markTransitionIntent}
            className="group inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-medium text-white/75 transition-colors duration-300 hover:border-white/40 hover:text-white"
          >
            Open
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>

        <div className="grid items-end gap-10 md:grid-cols-[1fr_auto]">
          <div>
            <h2
              ref={titleRef}
              className="font-humane text-[24vw] uppercase leading-[0.78] tracking-normal text-white md:text-[18vw] lg:text-[15vw]"
            >
              {nextPage.name}.
            </h2>
            <div className="mt-8 max-w-2xl">
              <div
                className="relative h-[3px] overflow-hidden rounded-full bg-white/15"
                role="progressbar"
                aria-label={`Scroll progress to ${nextPage.name}`}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
              >
                <div
                  ref={progressRef}
                  className="absolute inset-y-0 left-0 w-full origin-left rounded-full bg-tertiary"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs font-mono uppercase tracking-[0.16em] text-white/40">
                <span>{prefersReducedMotion ? 'Open directly' : 'Scroll to continue'}</span>
                <span>{progress}%</span>
              </div>
            </div>
          </div>

          <div
            ref={hintRef}
            className="flex size-24 items-center justify-center rounded-full border border-white/15 bg-white/5 md:size-32"
            aria-hidden="true"
          >
            <ArrowDown size={28} className="text-tertiary" />
          </div>
        </div>

        <div className="grid gap-6 border-t border-white/10 pt-6 text-xs font-mono uppercase tracking-[0.18em] text-white/35 md:grid-cols-3">
          <p>{prefersReducedMotion ? 'Direct navigation' : 'Keep scrolling'}</p>
          <p className="md:text-center">{prefersReducedMotion ? 'Motion reduced' : 'Auto navigates at 96%'}</p>
          <p className="md:text-right">Tap open for direct access</p>
        </div>
      </div>
    </section>
  );
}
