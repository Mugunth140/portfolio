'use client';

import Hero from '../components/Hero';
import NextPageTransition from '../components/NextPageTransition';
import { ABOUT } from '../constants/data.constant';

export default function Home() {
  return (
    <div className="bg-primary">
      <main className="min-h-screen relative z-10">
        <Hero about={ABOUT} />
      </main>
      <NextPageTransition nextRoute="/about" nextTitle="About" />
    </div>
  );
}
