'use client'
import { useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="nav">
      <div className="navbar-container">
        <div className="navbar">
          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={menuOpen ? "hambox hamboxOpen" : "hambox"}>
              <span className={menuOpen ? "linetop spin" : "linetop"}></span>
              <span className={menuOpen ? "linebottom spin" : "linebottom"}></span>
            </div>
          </div>
        </div>
        <div
          className="nav-overlay"
          style={{
            transform: menuOpen ? "translateY(0)" : "translateY(-100%)",
            transition: "transform 0.6s cubic-bezier(0.25, 0.1, 0.25, 1)",
            willChange: "transform",
          }}
        >
          <ul className="nav-links">
            {[
              { href: "/", text: "Home", delay: "0.1s" },
              { href: "/work", text: "Projects", delay: "0.2s" },
              { href: "/about", text: "About", delay: "0.3s" },
              { href: "/contact", text: "Contact", delay: "0.4s" },
            ].map((item) => (
              <li className="nav-item" key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(!menuOpen)}
                  style={{
                    transform: menuOpen ? "translateY(0)" : "translateY(100px)",
                    opacity: menuOpen ? 1 : 0,
                    transition: menuOpen
                      ? `transform 0.6s ease ${item.delay}, opacity 0.6s ease ${item.delay}`
                      : "transform 0.3s ease, opacity 0.1s ease",
                    willChange: "transform, opacity",
                  }}
                >
                  {item.text}
                </Link>
                <div className="nav-wrap"></div>
              </li>
            ))}
          </ul>
          <div className="nav-footer">
            <div
              className="location"
              style={{
                // transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                opacity: menuOpen ? 1 : 0,
                transition: menuOpen
                  ? "transform 0.6s ease 0.5s, opacity 0.6s ease 0.5s"
                  : "transform 0.3s ease, opacity 0.1s ease",
                willChange: "transform, opacity",
              }}
            >
              <span>CBE, India</span>
            </div>
            <div className="nav-social">
              <ul>
                {["LinkedIn", "GitHub"].map((social, index) => (
                  <li key={social}>
                    <a
                      href="#"
                      style={{
                        transform: menuOpen ? "translateY(0)" : "translateY(20px)",
                        opacity: menuOpen ? 1 : 0,
                        transition: menuOpen
                          ? "transform 0.6s ease 0.5s, opacity 0.6s ease 0.5s"
                          : "transform 0.3s ease, opacity 0.1s ease",
                        willChange: "transform, opacity",
                      }}
                    >
                      {social}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}