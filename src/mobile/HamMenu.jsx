'use client'
import { useState } from 'react'
import gsap from 'gsap';
import { useGSAP } from '@gsap/react'

gsap.registerPlugin(useGSAP);
const HamMenu = () => {

  const [isActive, setIsActive] = useState(false);
  const toggleMenu = () => {
    setIsActive(!isActive);
  };

  useGSAP(() => {
    const hamItemTl = gsap.timeline({
      defaults: {
        duration: 0.35,
        ease: 'power1.inOut',
      },
    });

   const hamOverlayTl = gsap.timeline({})

    hamItemTl.fromTo('#ham-item-1',
      {
        rotation: isActive ? 45 : 0,
        y: isActive ? 3 : 0,
        transformOrigin: "center"
      },
      {
        rotation: isActive ? 0 : 45,
        y: isActive ? 0 : 3,
        transformOrigin: "center"
      },
    )
    .fromTo('#ham-item-2', {
      rotation: isActive ? -45 : 0,
      y: isActive ? -3 : 0,
      transformOrigin: "center"
    },{
      rotation: isActive ? 0 : -45,
      y: isActive ? 0 : -3,
      transformOrigin: "center"
    }, "<");

    hamOverlayTl.to('#ham-overlay-container', {
      y: isActive ? "-100%" : 0,
      duration: 0.35,
      ease: 'circle.out',
    })
    .to('#ham-overlay', {
      y: isActive ? "-100%" : 0,
      duration: 0.35,
      ease: 'power2.inOut',
      delay: 0.05,
    })

  }, [isActive])

  return (
  <>
   <div className='md:hidden border rounded-4xl bg-gray-900 h-[65px] w-[65px] flex-center flex-col gap-1 z-50' onClick={toggleMenu}>
     <p className={` bg-white h-[1px] w-7 relative`} id='ham-item-1'></p>
     <p className={` bg-white h-[1px] w-7 relative`} id='ham-item-2' ></p>
   </div>
   <div id="ham-overlay-container" className='absolute h-dvh w-full bg-blue-950 top-0 left-0 z-40 flex flex-col items-center justify-center gap-8 '>
    <div id="ham-overlay" className='h-dvh w-full bg-black'></div>
   </div>
   </>
  )
}

export default HamMenu