import { useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { words } from "./data";
import styles from "./Loader.module.scss";
import gsap from "gsap";


const Loader = ({ animationComplete }) => {
  const loaderRef = useRef(null);
  const progressRef = useRef(null);
  const progressNumberRef = useRef(null);
  const wordGroupsRef = useRef(null);
  const progressWrapperRef = useRef(null);

  
    useEffect(() => {

      const tl = gsap.timeline(
      );

      gsap.to(wordGroupsRef.current, {
        yPercent: -79,
        duration: 5,
        ease: "power3.inOut",
      });
      

  tl.to(progressRef.current, {
    scaleX: 1,
    duration: 5,
    ease: "power3.inOut",
  })
    .to(
      progressNumberRef.current,
      {
        textContent: "100%",
        duration: 5,
        roundProps: "textContent",
      },
      "<"
    )
    .to(progressNumberRef.current, {
      duration: 4,
      opacity: 0,
    })
    .to(loaderRef.current, {
      "clip-path": "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
      duration: 4,
      ease: "expo.inOut",
      onComplete: () => {
        animationComplete();
      }
    },"<");

      
      
   }, [animationComplete]);

  return (  
    <div className={styles.loader__wrapper}ref={loaderRef}>
      <div className={styles.loader__progressWrapper} ref={progressWrapperRef}>
        <div className={styles.loader__progress} ref={progressRef}></div>
        <span className={styles.loader__progressNumber} ref={progressNumberRef}>
          0
        </span>
      </div>
      <div className={styles.loader} >
        <div className={styles.loader__words}>
          <div className={styles.loader__overlay}></div>
          <div ref={wordGroupsRef} className={styles.loader__wordsGroup}>
            {words.map((word, index) => {
              return (
                <span key={index} className={styles.loader__word}>
                  {word}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

Loader.propTypes = {
  animationComplete: PropTypes.func.isRequired,
};

export default Loader;
