'use client';
import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import Magnetic from './Magnetic';

export default function RoundedButton({ children, backgroundColor = '#455CE9', ...attributes }) {
  const circle = useRef(null);
  const timeline = useRef(null);
  let timeoutId = null;

  useEffect(() => {
    timeline.current = gsap.timeline({ paused: true });
    timeline.current
      .to(circle.current, { top: '-25%', width: '150%', duration: 0.5, ease: 'power3.in' }, 'enter')
      .to(circle.current, { top: '-150%', width: '125%', duration: 0.25 }, 'exit');

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (timeline.current) timeline.current.kill();
    };
  }, []);

  const manageMouseEnter = () => {
    if (timeoutId) clearTimeout(timeoutId);
    timeline.current.tweenFromTo('enter', 'exit');
  };

  const manageMouseLeave = () => {
    timeoutId = setTimeout(() => {
      timeline.current.play();
    }, 300);
  };

  return (
    <Magnetic>
      <div
        className="relative flex items-center justify-center rounded-3xl border border-gray-500 cursor-pointer px-7 py-2 overflow-hidden"
        onMouseEnter={manageMouseEnter}
        onMouseLeave={manageMouseLeave}
        {...attributes}
      >
        <p className="relative z-[1] transition-colors duration-300 ease-linear group-hover:text-white hover:text-white subpixel-antialiased">
          {children}
        </p>
        <div ref={circle} className="absolute w-full h-[150%] rounded-full top-full" style={{ backgroundColor }}></div>
      </div>
    </Magnetic>
  );
}
