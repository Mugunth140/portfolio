import React, { useRef, useEffect } from "react";
import gsap from "gsap";

const Marquee = () => {
  const firstText = useRef(null);
  const secondText = useRef(null);
  const slider = useRef(null);

  let xPercent = 0;

  useEffect(() => {
    gsap.set(secondText.current, {
      left: secondText.current.getBoundingClientRect().width,
    });
    requestAnimationFrame(animate);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const animate = () => {
    if (xPercent > 0) {
      xPercent = -100;
    }
    gsap.set(firstText.current, { xPercent: xPercent });
    gsap.set(secondText.current, { xPercent: xPercent });
    requestAnimationFrame(animate);
    xPercent += 0.1;
  };

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
