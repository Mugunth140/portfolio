"use client";
import Head from "next/head";
import {useEffect, useState} from "react";
import Transition from "@/components/Transitions/Transition";
import SplitType from "split-type";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { IoIosArrowRoundDown } from "react-icons/io";
import Magnetic from "@/components/Magnetic/magnetic";
//import Lenis from "lenis";
import Marquee from "@/components/Marquee/Marquee";
import Project from "@/components/Project/Project";
import ProjectMobile from "@/components/Project/ProjectMobile";
import "../styles/Home.module.scss";


gsap.registerPlugin(ScrollTrigger);

export default function Home() {

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  // added locomotive-scroll v5 beta for better compatability and added features

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

  useGSAP(() => {
    const split = new SplitType(".split", {
      types: "chars",
    });

    const mainSplit = new SplitType(".main-text", {
      types: "chars,words",
      charsClass: "char",
      wordsClass: "word",
    });

    gsap.ticker.lagSmoothing(0);

    const tl = gsap.timeline();
    tl.from(
      split.chars,
      {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.05,
        ease: "power4.out",
      },
      ">"
    )
      .from(".dot", {
        width: 0,
        duration: 1,
        ease: "power4.out",
      })
      .from(
        ".ball-container",
        {
          y: 400,
          opacity: 0,
          duration: 1,
          ease: "power4.out",
        },
        "<+0.5"
      );

    gsap.to(".ball-container", {
      scrollTrigger: {
        trigger: ".ball-container",
        start: "top 80%",
        end: "top 60%",
        //markers: true,
        scrub: true,
      },
      scale: 1,
      duration: 1,
      ease: "expo.out",
      borderRadius: "0px",
    });

    const mainText = gsap.timeline({
      defaults: { duration: 0.5, ease: "power3.out" },
    });

    mainText.from(mainSplit.chars, { opacity: 0, y: 30, stagger: 0.1 });

    ScrollTrigger.create({
      animation: mainText,
      trigger: ".chars",
      start: "70% center",
      end: "bottom center",
      scrub: true,
      //markers:true,
    });
  }, []);

  return (
    <>
    <Transition>
    <Head>
      <title>Mugunth | Portfolio</title>
      <meta name="description" content="I'm Mugunth, a passionate freelance developer based in India. I specialize in bridging the gap between design and functionality to deliver seamless user experiences." />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />

      <meta name="robots" content="index, follow" />
      <meta name="keywords" content="Mugunth portfolio, Freelance developer India, JavaScript developer, Python developer, Full-stack developer, Web developer India, React developer, Node.js developer, MongoDB developer, Frontend development, Backend development, API development, Freelance programming services, Custom web applications, Modern web design, Mobile-friendly websites" />
      <link rel="canonical" href="https://mugunth.me/" />

      <meta property="og:title" content="Mugunth | Freelance Developer Portfolio" />
      <meta property="og:description" content="I'm Mugunth, a passionate freelance developer based in India. I specialize in bridging the gap between design and functionality to deliver seamless user experiences." />
      <meta property="og:image" content="https://mugunth.me/about.jpg" />
      <meta property="og:url" content="https://mugunth.me/" />
      <meta property="og:type" content="website" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="Mugunth | Portfolio" />
      <meta name="twitter:description" content="I'm Mugunth, a passionate freelance developer based in India. I specialize in bridging the gap between design and functionality to deliver seamless user experiences." />
      <meta name="twitter:image" content="https://mugunth.me/about.jpg" />
    </Head>


      <div className="hero-wrapper">
        <div className="hero-text-wrapper">
          {/* <Hero /> */}
          <div data-scroll data-scroll-speed="0.1" className="hero-text">
            <h1 className="design split">design</h1>
            <span className="dot"></span>
            <h1 className="develop split">develop</h1>
          </div>
        </div>

        {/* hero ball container starts here  */}
        <div className="ball-container">
          <div className="pink-ball"></div>
          <div className="blue-ball"></div>
          <div className="ball-text">
            <h1 className="main-text">
              Hello There! I&apos;m Mugunth, a passionate freelance Developer based in
              India. I excel at bridging the gap between design and functionality, 
              ensuring seamless interactions and robust performance.
            </h1>
          </div>
          <Magnetic >
          <div className="scroll-down" href="#">
            Scroll down <IoIosArrowRoundDown className="down-arrow" />
          </div>
          </Magnetic>
        </div>
        <Marquee /> 
         {
          isMobile ? <ProjectMobile /> : <Project />
        }
      </div>
      </Transition>
    </>
  );
}
