
import React, { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'; // Import ScrollTrigger
import { useGSAP } from '@gsap/react';
gsap.registerPlugin(ScrollTrigger);

const SplitText = ({ text }) => {
  const containerRef = useRef(null);

  useGSAP(() => {
    const container = containerRef.current;
    const letters = Array.from(container.children);

    gsap.from(letters, {
        opacity: 0,
        y: 50,
        duration: 1,
        stagger: 0.05, 
        ease: "power4.out",

        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "bottom 20%",
          toggleActions: "play pause resume reset",
          markers: false
        },
      });
  }, [text]);


  const letters = text.split('');

  return (
    <p ref={containerRef}>
      {letters.map((letter, index) => (
        <span key={index}>{letter}</span>
      ))}
    </p>
  );
};

export default SplitText;
