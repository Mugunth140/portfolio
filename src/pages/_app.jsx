import { StrictMode, useEffect, useState } from "react";
import { Analytics } from '@vercel/analytics/react';
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader/Loader";
import Nav from "@/components/Nav/Nav";
import Cursor from "@/components/Cursor/Cursor";
import Push from "@/components/Push/Push";
import Footer from "@/components/Footer/Footer";
import "@/styles/globals.scss";

export default function App({ Component, pageProps, router }) {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleLoaderComplete = () => {
    setIsLoaderComplete(true);
  };

  // for reseting the scroll to (0.0) for every route
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    router.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  // function runs while resizing the screen
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

  // useEffect(() => {
  //   const lenis = new Lenis();
  //   function raf(time) {
  //     lenis.raf(time);
  //     requestAnimationFrame(raf);
  //   }
  //   requestAnimationFrame(raf);
  // }, []);

  // removed lenis scroll for scrolling issues caused by it....

  return (
    <StrictMode>
      <div className="main">
        {isLoaderComplete ? (
          <>
            <Nav isMobile={isMobile} />
            <AnimatePresence mode={"wait"}>
              {!isMobile && <Cursor />}
              <Component
                key={router.route}
                {...pageProps}
                isMobile={isMobile}
              />
              <Analytics />
            </AnimatePresence>
            {router.route === "/" ? !isMobile && <Push /> : null}
            {router.route === "/contact" ? null : router.route ===
              "/work/[id]" ? null : (
              <Footer />
            )}
          </>
        ) : (
          <Loader animationComplete={handleLoaderComplete} />
        )}
      </div>
    </StrictMode>
  );
}
