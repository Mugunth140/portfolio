import { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Btn from "../Btn/btn";
import Magnetic from "../Magnetic/magnetic";

export default function Navbar() {
  const router = useRouter();

  useEffect(() => {
    if (router.asPath !== "/") {
      router.push("/"); 
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="header">
      <Magnetic>
        <div className="nav-logo">
          <Link href="/">Mugunth</Link>
        </div>
      </Magnetic>
      <div className="nav-items">
        <Btn>
          <div className="items">
            <Link href="/about">Get in Touch</Link>
          </div>
        </Btn>
        <Magnetic>
          <div className="items">
            <Link href="/about">About</Link>
          </div>
        </Magnetic>
        <Magnetic>
          <div className="items">
            <Link href="/work ">Work</Link>
          </div>
        </Magnetic>
      </div>
    </div>
  );
}
