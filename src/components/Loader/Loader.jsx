import Head from "next/head";
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
    const tl = gsap.timeline();

    document.body.style.overflow = 'hidden';

    gsap.to(wordGroupsRef.current, {
      yPercent: -81,
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
      .to(
        loaderRef.current,
        {
          "clip-path": "polygon(0% 50%, 100% 50%, 100% 50%, 0% 50%)",
          duration: 4,
          ease: "expo.inOut",
          onComplete: () => {
            document.body.style.overflow = '';
            animationComplete();
          },
        },
        "<"
      )
      .to(progressWrapperRef.current, {
        opacity: 0,
        duration: 1,
      })
      .to(
        wordGroupsRef.current,
        {
          opacity: 0,
          duration: 1,
        },
        "<"
      );

      return () => {
        document.body.style.overflow = ''; // Cleanup in case of component unmount
      };
  
  }, [animationComplete]);

  return (
    <>
    <Head>
    <title>Mugunth | Freelance Developer Portfolio</title>
    <meta name="description" content="Welcome to Mugunth's portfolio. A passionate freelance developer specialized in JavaScript, Python, and full-stack development. Discover my projects and expertise." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="icon" href="/favicon.ico" />

    <meta name="robots" content="index, follow" />
    <meta name="keywords" content="Mugunth portfolio, Freelance developer India, JavaScript developer, Python developer, Full-stack developer, React developer, Node.js developer, MongoDB developer, Web development, Portfolio website" />
    <link rel="canonical" href="https://mugunth.me/" />

    <meta property="og:title" content="Mugunth | Freelance Developer Portfolio" />
    <meta property="og:description" content="Explore the portfolio of Mugunth, a freelance developer skilled in JavaScript, Python, and full-stack web development." />
    <meta property="og:image" content="https://mugunth.me/about.jpg" />
    <meta property="og:url" content="https://mugunth.me/" />
    <meta property="og:type" content="website" />

    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="Mugunth | Portfolio" />
    <meta name="twitter:description" content="Explore Mugunth's portfolio, a freelance developer skilled in JavaScript, Python, and full-stack development." />
    <meta name="twitter:image" content="https://mugunth.me/about.jpg" />
  </Head>
  
    <div className={styles.loader__wrapper} >
      <div className={styles.loader__progressWrapper} ref={progressWrapperRef}>
        <div className={styles.loader__progress} ref={progressRef}></div>
        <span className={styles.loader__progressNumber} ref={progressNumberRef}>
          0
        </span>
      </div>
      <div className={styles.loader} ref={loaderRef}>
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
    </>
  );
};

Loader.propTypes = {
  animationComplete: PropTypes.func.isRequired,
};

export default Loader;
