import Link from 'next/link';
import Btn from '../components/Btn';
import MarqueeText from '../components/MarqueeText';
import { ABOUT } from '../constants/data.constant';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex flex-col justify-end px-6 md:px-12 lg:px-20 pb-16 pt-32">
        {/* Headline */}
        <div className="overflow-hidden">
          <h1 className="font-humane text-[14vw] md:text-[12vw] leading-none uppercase tracking-normal mb-2 text-foreground">
            Design
          </h1>
        </div>
        <div className="overflow-hidden">
          <h1 className="font-humane text-[14vw] md:text-[12vw] leading-none tracking-normal uppercase text-tertiary">
            Develop
          </h1>
        </div>

        {/* Sub-row */}
        <div className="mt-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-6">
          <p className="max-w-xs text-lg font-primary leading-relaxed font-medium text-foreground">
            Hi, I'm <span className="text-foreground font-medium font-primary">Mugunth</span> — a{' '}
            {ABOUT.role.toLowerCase()} crafting digital experiences that are both beautiful and functional.
          </p>
          <Btn backgroundColor="lch(44.13 80.66 290.69)">
            <Link href="/work">View Work</Link>
          </Btn>
        </div>
      </section>

      {/* ── Marquee ── */}
      <MarqueeText className="my-4" />

      {/* ── Intro blurb ── */}
      <section className="px-6 md:px-12 lg:px-20 py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-xs font-mono uppercase tracking-widest text-foreground/40 mb-4">[ About me ]</p>
          <h2 className="text-3xl md:text-4xl font-medium font-primary leading-snug">{ABOUT.bio}</h2>
        </div>
        <div className="flex flex-col gap-6">
          <p className="text-sm font-mono text-foreground/60 leading-relaxed">{ABOUT.bio2}</p>
          <Btn>
            <Link href="/about">More about me</Link>
          </Btn>
        </div>
      </section>
    </main>
  );
}
