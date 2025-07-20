'use client';
import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const Loader = ({ children }) => {
  const [loader, setLoader] = useState(true);

  useGSAP(() => {
    const loaderTl = gsap.timeline({
      onComplete: () => {
        setLoader(false);
      },
      defaults: {
        duration: 2,
        ease: "expo.inOut"
      }
    });

    loaderTl.to('#loader-container', {
      clipPath: 'polygon(15% 47%, 0% 47%, 0% 53%, 15% 53%)',
      duration: 1.5,
    }).to('#loader-container', {
      clipPath: 'polygon(100% 47%, 0% 47%, 0% 53%, 100% 53%)',
    }, 2).to('#loader', {
      width: '100%',
    }, 2).to('#counter', {
      textContent: '100',
      roundProps: 'textContent',
    }, 2).to('#loader-container', {
      clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)',
    }, 4.5).to('.loader-text', {
      opacity: 0,
      y: '100%',
      duration: 0.8,
      stagger: 0.05
    }, 4);

  });

  if (!loader) return <>{children}</>;

  return (
    <>
      <div
        id="loader-container"
        className="absolute top-0 left-0 w-full h-full z-50"
        style={{ clipPath: 'polygon(0% 47%, 0% 47%, 0% 53%, 0% 53%)' }}
      >
        <div id="loader" className="h-full w-[15%] flex justify-between items-center px-5  text-primary bg-secondary">
          <p className="">
            <span className="loader-text">L</span>
            <span className="loader-text">O</span>
            <span className="loader-text">A</span>
            <span className="loader-text">D</span>
            <span className="loader-text">I</span>
            <span className="loader-text">N</span>
            <span className="loader-text">G</span>
          </p>
          <p className="loader-text">
            / <span id="counter">0</span>
          </p>

          <div
            id="after-loader-text"
            className="absolute -translate-x-2/4 -translate-y-2/4 left-2/4 top-2/4 text-9xl opacity-0"
          >
            Hey There
          </div>
        </div>
      </div>
    </>
  );
};

export default Loader;
