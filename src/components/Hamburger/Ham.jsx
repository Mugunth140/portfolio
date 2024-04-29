'use client'
import { useState } from "react";
import Link  from "next/link";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="nav">
      <div className="navbar-container">
        <div className="navbar">
          <div className="menu" onClick={() => setMenuOpen(!menuOpen)}>
            <div className={menuOpen ? "hambox hamboxOpen" : "hambox"}>
              <span className={menuOpen ? "linetop spin" : "linetop"}></span>
              <span
                className={menuOpen ? "linebottom spin" : "linebottom"}
              ></span>
            </div>
          </div>
        </div>
        <div
          className="nav-overlay"
          style={{
            top: menuOpen ? "0" : "-100%",
            transitionDelay: menuOpen ? "0s" : "0s",
            transition: "all 2s cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          <ul className="nav-links">
            <li className="nav-item">
              <Link
                href="/"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  top: menuOpen ? "0" : "120px",
                  transition: menuOpen
                    ? "all 2s ease 0.6s"
                    : "all ease 0s",
                }}
              >
                Home
              </Link>
              <div className="nav-wrap"></div>
            </li>

            <li className="nav-item">
              <Link
                href="/work"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  top: menuOpen ? "0" : "120px",
                  transition: menuOpen
                    ? "all 2s ease 0.7s"
                    : "all 2s ease 0s",
                }}
              >
                Projects
              </Link>
              <div className="nav-wrap"></div>
            </li>

            <li className="nav-item">
              <Link
                href="/about"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  top: menuOpen ? "0" : "120px",
                  transition: menuOpen
                    ? "all 2s ease 0.8s"
                    : "all 2s ease 0s",
                }}
              >
                About
              </Link>
              <div className="nav-wrap"></div>
            </li>

            <li className="nav-item ">
              <Link
                href="/contact"
                onClick={() => setMenuOpen(!menuOpen)}
                style={{
                  top: menuOpen ? "0" : "120px",
                  transition: menuOpen
                    ? "all 2s ease 0.9s"
                    : "all 2s ease 0s",
                }}
              >
                Contact
              </Link>
              <div className="nav-wrap"></div>
            </li>
          </ul>
          <div className="nav-footer">
            <div
              className="location"
              style={{
                bottom: menuOpen ? "0" : "-20px",
                opacity: menuOpen ? "1" : "0",
                transition: menuOpen
                  ? "all 2s ease 1s"
                  : "all 2s ease 1s",
              }}
            >
              <span
                style={{
                  bottom: menuOpen ? "0" : "-20px",
                  opacity: menuOpen ? "1" : "0",
                  transitionDelay: menuOpen ? "1s" : "0s",
                }}
              >
                CBE, India
              </span>
            </div>
            <div className="nav-social">
              <ul>
                <li>
                  <a
                    href="#"
                    style={{
                      bottom: menuOpen ? "0" : "-20px",
                      opacity: menuOpen ? "1" : "0",
                      transitionDelay: menuOpen ? "1s" : "0s",
                    }}
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    style={{
                      bottom: menuOpen ? "0" : "-20px",
                      opacity: menuOpen ? "1" : "0",
                      transitionDelay: menuOpen ? "1s" : "0s",
                    }}
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

