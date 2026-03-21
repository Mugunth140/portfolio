import Image from 'next/image';
import { useMemo } from 'react';
import styles from './Techstack.module.scss';

const ICONS = [
  'React Native.png',
  'icons8-adobe-lightroom-100.png',
  'icons8-adobe-photoshop-100.png',
  'icons8-adobe-premiere-pro-100.png',
  'icons8-adobe-xd-100.png',
  'icons8-angular-100.png',
  'icons8-blender-3d-100.png',
  'icons8-bootstrap-100.png',
  'icons8-canva-100.png',
  'icons8-cloudflare-provides-content-delivery-network-services,-ddos-mitigation.-100.png',
  'icons8-console-100.png',
  'icons8-css3-100.png',
  'icons8-expo-100.png',
  'icons8-express-js-100.png',
  'icons8-figma-100.png',
  "icons8-firebase-a-google's-mobile-platform-that-helps-you-quickly-develop-high-quality-apps-100.png",
  'icons8-git-100.png',
  'icons8-github-100.png',
  'icons8-google-colab-100.png',
  'icons8-html-5-100.png',
  'icons8-javascript-100.png',
  'icons8-json-100.png',
  'icons8-linux-100.png',
  'icons8-mongodb-a-cross-platform-document-oriented-database-program-100.png',
  'icons8-next.js-100.png',
  'icons8-node-js-100.png',
  'icons8-npm-100.png',
  'icons8-python-100.png',
  'icons8-react-a-javascript-library-for-building-user-interfaces-100.png',
  'icons8-sass-100.png',
  'icons8-tailwind-css-100.png',
  'icons8-typescript-100.png',
  'icons8-visual-studio-code-2019-100.png',
  'icons8-vue.js-an-open-source-javascript-framework-for-building-user-interfaces-and-single-page-applications-100.png',
  'icons8-webgl-100.png',
  'icons8-webpack-100.png',
  'three.png',
  'vercel.png'
];

const shuffleArray = (array) => [...array].sort(() => Math.random() - 0.6);

const Techstack = () => {
  const images = useMemo(() => shuffleArray(ICONS), []);

  return (
    <div className={styles.marqueeContainer}>
      <div className="marqueeOverlay"></div>
      <div className={`${styles.marquee} ${styles.leftToRight}`}>
        <div className={styles.marqueeContent}>
          {[...images, ...images].map((img, index) => (
            <div key={index}>
              <Image src={`/icons/${img}`} alt={`Icon ${index}`} width={100} height={100} />
            </div>
          ))}
        </div>
      </div>
      <div className={`${styles.marquee} ${styles.rightToLeft}`}>
        <div className={styles.marqueeContent}>
          {[...images, ...images].map((img, index) => (
            <div key={index}>
              <Image src={`/icons/${img}`} alt={`Icon ${index}`} width={100} height={100} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Techstack;
