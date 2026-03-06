'use client';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useRef } from 'react';

gsap.registerPlugin(ScrollTrigger);

/**
 * Splits text into word-spans and animates them up on scroll.
 * @param {string} text  — the copy to animate
 * @param {string} tag   — wrapper element (h1, h2, p, span…)
 * @param {string} className — extra classes on the wrapper
 */
export default function AnimatedText({ text, tag: Tag = 'p', className = '', once = true }) {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      const words = containerRef.current.querySelectorAll('.anim-word');
      gsap.fromTo(
        words,
        { y: '110%', opacity: 0 },
        {
          y: '0%',
          opacity: 1,
          duration: 0.9,
          ease: 'expo.out',
          stagger: 0.06,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 88%',
            toggleActions: once ? 'play none none none' : 'play none none reverse',
          },
        },
      );
    },
    { scope: containerRef },
  );

  const wordList = text.split(' ');

  return (
    <Tag ref={containerRef} className={`overflow-visible ${className}`}>
      {wordList.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden mr-[0.25em] last:mr-0">
          <span className="anim-word inline-block">{word}</span>
        </span>
      ))}
    </Tag>
  );
}
