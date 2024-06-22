import { useState } from "react";
import Btn from "../Btn/btn";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import SplitText from '../SplitText/SplitText';

const Footer = () => {
  const phoneNumber = '+916384761234';
  const email = "mugunth140@gmail.com"
  const footerText = "Let's Colab Together";
  
  const [linkText, setLinkText] = useState('+916384761234');

  const copyPhone = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(phoneNumber)
      .then(() => {
        setLinkText('Copied!');
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  const emailRoute = (e) => {
    e.preventDefault();
    window.location.href = `mailto:${email}`;
  };

  return (
    <div className="footer-container">
      <div className="footer">
        <p className="footer-text" >
          <SplitText text={footerText} />
        </p>
      </div>

      <div className="footer-btn-container">
        <div className="footer-details">
          <h3>Contact</h3>
          <a href="#" onClick={copyPhone}>
            <FaArrowRight /> <span>{linkText}</span>
          </a>
          <a href={`mailto:${email}`} target="_blank" rel="noopener noreferrer">
            <FaArrowRight />
            <span>mugunth140@gmail.com</span>
          </a>
        </div>
        <div className="footer-btn">
          <Btn>
            <Link href="/contact">
              <p>Let&apos;s Talk</p>
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
            <p>
              <a href="https://github.com/Mugunth140/portfolio">Github</a>
            </p>
          </span>
        </div>
        <div className="footer-copywrite">
          <p>All rights reserved © 2023</p>
        </div>
        <div className="footer-contact-social">
          <div className="social-title" id='title'>
            <h4>Connect</h4>
          </div>
          <span className="social-links">
            <ul>
              <a href="https://www.instagram.com/mux._pvt/?utm_source=ig_web_button_share_sheet">instagram</a>
              <a href="https://wa.me/916384761234">whatsapp</a>
              <a href="https://www.linkedin.com/in/mugunth-31765028a?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app">linkedin</a>
            </ul>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
