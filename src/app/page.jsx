import React from 'react';
import Btn from '../components/Btn';
// import gsap from 'gsap'
// import { useGSAP } from '@gsap/react'

const Home = () => {
  return <>
  <div className='h-screen w-screen flex flex-col items-center justify-center'>
    <div className="">
      <p className='text-5xl font-{family-name:--font-primary}'>Design</p>
    <p className='text-5xl font-{family-name:--font-script}'>Neue Montreal</p>
    </div>
   <div className=" text-5xl p-3 font-medium">Hello Dev</div>
  <p className="text-lg">This is a paragraph text</p>
  <Btn>Button</Btn>
  </div>
  </>
};


export default Home;
