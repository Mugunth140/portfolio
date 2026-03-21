import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRef } from 'react';
import SplitType from 'split-type';

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

  return <span ref={containerRef}>{text}</span>;
};

export default SplitText;
