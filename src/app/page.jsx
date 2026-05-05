'use client';

import Hero from '../components/Hero';
import FooterNavigation from '../components/FooterNavigation';
import { ABOUT } from '../constants/data.constant';
import { getNextRoute } from '../constants/routes.constant';

const nextPage = getNextRoute('/');

export default function Home() {
  return (
    <div>
      <main className="min-h-screen relative z-10 bg-primary">
        <Hero about={ABOUT} />
      </main>
      <FooterNavigation nextPage={nextPage} />
    </div>
  );
}
