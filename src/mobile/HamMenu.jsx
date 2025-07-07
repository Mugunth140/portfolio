'use client';
import { useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import  Link  from 'next/link';
import { ROUTES, SOCIALS } from '@/constants/routes.constant';

gsap.registerPlugin(useGSAP);
const HamMenu = () => {
  const [isActive, setIsActive] = useState(true);
  const toggleMenu = () => {
    setIsActive((prev) => !prev);
  };

  useGSAP(() => {
    const hamTl = gsap.timeline({
      defaults: {
        duration: 0.35,
        ease: 'power1.inOut',
      },
    });

    hamTl.to('#ham-menu', {
      backgroundColor: isActive ? 'lch(10.75 2.24 272.76)' : 'lch(44.13 80.66 290.69)',
      borderColor: isActive ? 'lch(10.75 2.24 272.76)' : 'lch(44.13 80.66 290.69)',
      delay: isActive ? 0.26 : 0.1,
      duration: 0.25,
      ease: 'circ.in',
    });

    hamTl.to(
      '#ham-item-1',
      {
        rotation: isActive ? 0 : 45,
        y: isActive ? 0 : 3,
        transformOrigin: 'center',
      },
      0,
    );

    hamTl.to(
      '#ham-item-2',
      {
        rotation: isActive ? 0 : -45,
        y: isActive ? 0 : -3,
        transformOrigin: 'center',
      },
      0,
    );

    hamTl.to(
      '#ham-overlay',
      {
        y: isActive ? '-100%' : 0,
        ease: [0.25, 0.1, 0.25, 1],
        duration: 0.6,
        delay: 0.15,
      },
      0,
    );
  }, [isActive]);

  return (
    <>
      <div
        className="md:hidden border rounded-4xl border-color-secondary bg-secondary will-change-auto size-[65px] flex items-center justify-center flex-col gap-1 z-50 cursor-pointer"
        id="ham-menu"
        onClick={toggleMenu}
      >
        <p className="bg-white h-[1px] w-7 relative rotate-0" id="ham-item-1"></p>
        <p className=" bg-white h-[1px] w-7 relative rotate-0" id="ham-item-2"></p>
      </div>
      <div
        id="ham-overlay"
        className="md:hidden absolute h-dvh w-full bg-secondary -translate-y-full will-change-auto top-0 left-0 z-40 flex flex-col items-center justify-center gap-8 ">
        <section className=' w-screen'>
          <p className='text-primary-light font-mono'>Nav links</p>
          <ul className='text-primary flex flex-col pl-10'>
            {
              ROUTES.map((route) => (
                <li key={route.path} className='text-primary text-6xl font-semibold font-primary'>
                  <Link href={route.path}>{route.name}</Link>
                </li>
              ))
            }
          </ul>
        </section>
        <div className=" w-full h-[150px]">
          <p className='text-primary-light bg-secondary-color font-mono'>Social links</p>
          <ul className='flex items-center-safe justify-around '>
            {
              SOCIALS.map((social) => (
                <li key={social.path} className='text-primary font-primary'>
                  <Link href={social.path}>{social.name}</Link>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </>
  );
};

export default HamMenu;
