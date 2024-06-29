import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import SplitType from 'split-type';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ text }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    
    // Initialize SplitType
    const splitContact = new SplitType(container, {
      types: "chars,words",
      charsClass: "char",
      wordsClass: "word",
    });

    const tl = gsap.timeline({
      defaults: { duration: 0.3, ease: 'power4.out' },
    });

    tl.from(splitContact.chars, { opacity: 0, y: 20, stagger: 0.1 });

    ScrollTrigger.create({
      animation: tl,
      trigger: container,
      start: 'top 70%',
      //end: 'bottom center',
      scrub: false,
      once: true, // Ensure the animation only runs once
      // markers: true,
    });
  }, []);

  return <p ref={containerRef}>{text}</p>;
};

export default SplitText;
