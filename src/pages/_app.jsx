import { StrictMode, useEffect, useState } from "react";
import "@/styles/globals.scss";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader/Loader";
import Nav from "@/components/Nav/Nav";
import Lenis from 'lenis'

export default function App({ Component, pageProps, router }) {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  const handleLoaderComplete = () => {
    setIsLoaderComplete(true);
  };


    useEffect(() => {
      const lenis = new Lenis()

      lenis.on('scroll', (e) => {
        console.log(e)
      })
      
      function raf(time) {
        lenis.raf(time)
        requestAnimationFrame(raf)
      }
      
      requestAnimationFrame(raf)
      }, []); // Empty dependency array to run effect only once on mount
    

  return (
    <StrictMode>
      <div className="main">
        {!isLoaderComplete ? 
        <>
        <Nav />
        <AnimatePresence mode="wait">
          <Component key={router.route} {...pageProps} />
        </AnimatePresence>
        </>
        : 
          <Loader animationComplete={handleLoaderComplete} />
        }
        
      </div>
    </StrictMode>
  )
}
