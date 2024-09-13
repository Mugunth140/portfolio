import {motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRouter } from 'next/router';

const Transition = ({children}) => {
   const router = useRouter();
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

  return (
    <>
      <motion.div className="slide-in"
      initial={{scaleY:0}}
      animate={{scaleY:0}}
      exit={{scaleY:1}}
      transition={{duration:1, ease:[0.22,1,0.36,1]}}
      ></motion.div>
      <main>{children}</main>
      <motion.div className="slide-out" 
      initial={{scaleY:1}}
      animate={{scaleY:0}}
      exit={{scaleY:0}}
      transition={{duration:1, ease:[0.22,1,0.36,1]}}></motion.div>
    </>
  )
}

export default Transition
