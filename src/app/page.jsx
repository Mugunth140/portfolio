import Link from 'next/link';
import Btn from '../components/Btn';
import Hero from '../components/Hero';
import MarqueeText from '../components/MarqueeText';
import { ABOUT } from '../constants/data.constant';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero about={ABOUT} />
    </main>
  );
}
