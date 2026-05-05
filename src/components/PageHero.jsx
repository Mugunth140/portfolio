'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import FooterNavigation from './FooterNavigation';

export default function PageHero({ title, subtitle, children, nextPage }) {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const contentRef = useRef(null);
  const [isFromTransition, setIsFromTransition] = useState(false);

  useEffect(() => {
    // Check if coming from scroll transition
    const transitionPath = sessionStorage.getItem('transitioning-to');
    if (transitionPath === window.location.pathname) {
      setIsFromTransition(true);
      sessionStorage.removeItem('transitioning-to');
      sessionStorage.removeItem('transition-title');
    }

    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      if (isFromTransition) {
        // Coming from transition - title already visible
        gsap.set(titleRef.current, { opacity: 1, y: 0 });
        if (subtitleRef.current) gsap.set(subtitleRef.current, { opacity: 0, y: 20 });
        gsap.set(contentRef.current, { opacity: 0, y: 30 });

        if (subtitleRef.current) {
          tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.1);
        }
        tl.to(contentRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.2);
      } else {
        // Normal entrance
        tl.from(titleRef.current, { y: 60, opacity: 0, duration: 0.8 });
        if (subtitleRef.current) {
          tl.from(subtitleRef.current, { y: 30, opacity: 0, duration: 0.6 }, '-=0.4');
        }
        tl.from(contentRef.current, { y: 40, opacity: 0, duration: 0.6 }, '-=0.3');
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isFromTransition]);

  return (
    <div>
      <div ref={containerRef} className="relative z-10 bg-primary">
        <div className="min-h-screen px-6 md:px-12 lg:px-20 pt-32 pb-20">
          <header className="mb-12">
            <h1
              ref={titleRef}
              className="text-[15vw] md:text-[12vw] lg:text-[10vw] font-humane uppercase leading-[0.85] tracking-tight"
            >
              {title}
            </h1>
            {subtitle && (
              <p ref={subtitleRef} className="text-sm md:text-base font-mono text-foreground/50 mt-4">
                {subtitle}
              </p>
            )}
          </header>
          <div ref={contentRef}>{children}</div>
        </div>
      </div>

      {nextPage && <FooterNavigation nextPage={nextPage} />}
    </div>
  );
}
