import { StrictMode, useState } from "react";
import "@/styles/globals.scss";
import { AnimatePresence } from "framer-motion";
import Loader from "@/components/Loader/Loader";
import Nav from "@/components/Nav/Nav";

export default function App({ Component, pageProps, router }) {
  const [isLoaderComplete, setIsLoaderComplete] = useState(false);

  const handleLoaderComplete = () => {
    setIsLoaderComplete(true);
  };

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
