import React from 'react';
import Btn from "../Btn/btn";
import Link from 'next/link';
import { FaArrowRight } from "react-icons/fa6";



const Footer = () => {

  return (
    <div className="footer-container">
      <div className="footer">
        <p className="footer-text">Let&apos;s Colab together</p>
      </div>

      <div className="footer-btn-container">
        <div className="footer-details">
          <a href="">Send email <FaArrowRight /></a>
          <a href="">Call me <FaArrowRight /></a>
        </div>
        <div className="footer-btn">
          <Btn>
          <Link href="/contact">
                <p>Contact &#8594;</p>
              </Link>
          </Btn>
        </div>
      </div>

      <div className="footer-contact">
        <div className="footer-contact-info">
          <span>
            <h4>Version</h4>
            <p>2024</p>
          </span>
          <span>
            <h4>Source code</h4>
            <p><a href="#">Github</a></p>
          </span>
        </div>
        <div className="footer-contact-social">
          <div className="social-title">
            <h4>Connect</h4>
          </div>
          <span className="social-links">
            <ul>
              <a href="#">instagram</a>
              <a href="#">whatsapp</a>
              <a href="#">linkedin</a>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
}


export default Footer
