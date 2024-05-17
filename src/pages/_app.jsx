import { StrictMode, useEffect, useState } from "react";
import "@/styles/globals.scss";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader/Loader";
import Nav from "@/components/Nav/Nav";
import Lenis from 'lenis';
import Cursor from "@/components/Cursor/Cursor";
import Footer from "@/components/Footer/Footer";
import Push from "@/components/Push/Push";

export default function App({ Component, pageProps, router }) {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleLoaderComplete = () => {
    setIsLoaderComplete(true);
    console.log("Loader completed");
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  }, []);

  return (
    <StrictMode>
      <div className="main">
        {!isLoaderComplete ? (
          <>
            <Nav isMobile={isMobile} />
            <AnimatePresence mode="wait">
              {!isMobile && <Cursor />}
              <Component key={router.route} {...pageProps} />
            </AnimatePresence>
            {router.route === "/" ? !isMobile && <Push /> : null}
            <Footer />
          </>
        ) : (
          <Loader animationComplete={handleLoaderComplete} />
        )}
      </div>
    </StrictMode>
  );
}
