'use client';
import { useState } from 'react';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import CustomEase from 'gsap/CustomEase';

gsap.registerPlugin(useGSAP, CustomEase);
const loaderEase = CustomEase.create('loader', '.87, 0,.13,1');

const Loader = ({ children }) => {
  const [loader, setLoader] = useState(true);

  useGSAP(() => {
    gsap.to('#loader-container', {
      clipPath: 'polygon(15% 47%, 0% 47%, 0% 53%, 15% 53%)',
      duration: 1.5,
      ease: loaderEase,
    });
    gsap.to('#loader-container', {
      clipPath: 'polygon(100% 47%, 0% 47%, 0% 53%, 100% 53%)',
      duration: 2,
      ease: loaderEase,
      delay: 2,
    });

    gsap.to('#loader', {
      width: '100%',
      duration: 2,
      ease: loaderEase,
      delay: 2,
    });

    gsap.to('#counter', {
      textContent: '100',
      roundProps: 'textContent',
      duration: 2,
      ease: loaderEase,
      delay: 2,
    });

    gsap.to('#loader-container', {
      clipPath: 'polygon(100% 0%, 0% 0%, 0% 100%, 100% 100%)',
      duration: 2,
      ease: loaderEase,
      delay: 4.5,
    });

    gsap.to('.loader-text', {
      opacity: 0,
      y: '100%',
      duration: 0.8,
      ease: loaderEase,
      delay: 4.2,
      stagger: 0.05,
      onComplete: () => {
        setLoader(false);
      },
    });

    const tl = gsap.timeline();
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
// style={{clipPath: 'polygon(0% 47%,0% 47%,0% 53%,0% 53%)'}}
