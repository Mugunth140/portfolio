import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Btn from "../Btn/btn";
import Magnetic from "../Magnetic/magnetic";
import Ham from "@/components/Hamburger/Ham";

export default function Navbar() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (router.asPath !== "/") {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <div className="header">
      <Magnetic>
        <div className="nav-logo">
          <Link href="/">Mugunth</Link>
        </div>
      </Magnetic>
      {isMobile ? (
        <Ham />
      ) : (
        <div className="nav-items">
          <Btn>
            <div className="items">
              <Link href="/contact">
                <p>Get in touch</p>
              </Link>
            </div>
          </Btn>
          <Magnetic>
            <div className="items">
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
