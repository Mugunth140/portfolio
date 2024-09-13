import { useEffect } from "react";
import { gsap } from "gsap";

const Cursor = () => {
  useEffect(() => {
    const cursor = document.getElementById('custom-cursor')
    const cursorText = document.querySelector('.cursor-text');
    const links = document.querySelectorAll('a');

    const onMouseMove = (event) => {
      const { clientX, clientY } = event;
      gsap.to(cursor, {
        x: clientX,
        y: clientY,
        duration: 0.6,
        ease: "power3.out"
      });
    };

    const onMouseEnterLink = (event) => {
      const link = event.target;
      if (link.classList.contains('view')) {
        cursor.classList.remove('blend-mode');
        gsap.to(cursor, { scale: 4, duration: 0.3, ease: "power3.out" });
        cursorText.style.display = 'block';
      } else {
        cursor.classList.add('blend-mode');
        gsap.to(cursor, { scale: 4, duration: 0.3, ease: "power3.out" });
      }
    };

    const onMouseLeaveLink = (event) => {
      cursor.classList.add('blend-mode');
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });
      cursorText.style.display = 'none';
    };

    const onMouseClick = () => {
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.1,
        ease: "power3.out",
        onComplete: () => {
          gsap.to(cursor, { scale: 1, duration: 0.3, ease: "power3.out" });
        }
      });
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('click', onMouseClick);
    links.forEach((link) => {
      link.addEventListener('mouseenter', onMouseEnterLink);
      link.addEventListener('mouseleave', onMouseLeaveLink);
    });

    // Cleanup function to remove event listeners
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('click', onMouseClick);
      links.forEach((link) => {
        link.removeEventListener('mouseenter', onMouseEnterLink);
        link.removeEventListener('mouseleave', onMouseLeaveLink);
      });
    };
  }, []);

  return (
    <div id="custom-cursor" className="blend-mode">
      <span className="cursor-text">View</span>
    </div>
  );
}

export default Cursor;
