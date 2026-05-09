import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { Observer } from 'gsap/Observer';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, Observer, useGSAP);

export { gsap, ScrollTrigger, ScrollToPlugin, Observer };
