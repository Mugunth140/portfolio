import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import Link from "next/link";
import Btn from "../Btn/btn";
import Magnetic from "../Magnetic/magnetic";
import Ham from "@/components/Hamburger/Ham";

export default function Nav({isMobile}) {
  const router = useRouter();

  useEffect(() => {
    // if (router.asPath !== "/") {
    //   router.push("/");
    // }

    gsap.to(".nav-logo", {
      duration: 2,
      opacity: 1,
      y: 0,
      ease: "back.out",
    });

    gsap.to(".items", {
      duration: 2,
      opacity: 1,
      y: 0,
      ease: "back.out",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header">
      <Magnetic>
        <div className="nav-logo view">
          <Link href="/">Mugunth</Link>
        </div>
      </Magnetic>
      {isMobile ? (
        <Ham />
      ) : (
        <div className="nav-items">
          <Btn>
            <div className="item-contact">
              <Link href="/contact">
                <p>Get in touch</p>
              </Link>
            </div>
          </Btn>
          <Magnetic>
            <div className="items ">
              <Link href="/about">About</Link>
            </div>
          </Magnetic>
          <Magnetic>
            <div className="items">
              <Link href="/work">Work</Link>
            </div>
          </Magnetic>
        </div>
      )}
    </div>
  );
}
