import React, { useEffect, useState } from 'react';
import styles from './Techstack.module.scss';
import Image from 'next/image';

const Techstack = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const loadImages = async () => {
      const res = await fetch('/api/images');
      const data = await res.json();
      setImages(shuffleArray(data));
    };
    loadImages();
  }, []);

  // Shuffle function
  const shuffleArray = (array) => {
    return array.sort(() => Math.random() - 0.6);
  };

  return (
    <div className={styles.marqueeContainer}>
      <div className="marqueeOverlay"></div>
      <div className={`${styles.marquee} ${styles.leftToRight}`}>
        <div className={styles.marqueeContent}>
          {[...images, ...images].map((img, index) => (
            <div key={index}>
              <Image src={`/icons/${img}`} alt={`Icon ${index}`} width={100} height={100} quality={100} />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.marquee} ${styles.rightToLeft}`}>
        <div className={styles.marqueeContent}>
          {[...images, ...images].map((img, index) => (
            <div key={index}>
              <Image src={`/icons/${img}`} alt={`Icon ${index}`} width={100} height={100} quality={100} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Techstack;
