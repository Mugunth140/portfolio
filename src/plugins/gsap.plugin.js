import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function useGSAPPlugin(plugin) {
  useGSAP(() => {
    gsap.registerPlugin(scrollTrigger);
  });
}
