import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Marquee = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);
  const xPercent = useRef(0); // Store xPercent in a useRef

  useEffect(() => {
    if (firstText.current && secondText.current) {
      gsap.set(secondText.current, {
        left: secondText.current.getBoundingClientRect().width,
      });

      const animate = () => {
        if (!firstText.current || !secondText.current) {
          return;
        }
        if (xPercent.current <= -100) {
          xPercent.current = 0;
        }
        gsap.set(firstText.current, { xPercent: xPercent.current });
        gsap.set(secondText.current, { xPercent: xPercent.current });
        xPercent.current -= 0.05; 
        requestAnimationFrame(animate);
      };

      animate();

      return () => {
        cancelAnimationFrame(animate);
      };
    }
  }, []); 

  return (
    <section className="marquee-container">
      <div className="sliderContainer">
        <div ref={slider} className="slider">
          <p ref={firstText}>Beyond the Screen, Crafting Experiences</p>
          <p ref={secondText}>Beyond the Screen, Crafting Experiences</p>
        </div>
      </div>
    </section>
  );
};

export default Marquee;
