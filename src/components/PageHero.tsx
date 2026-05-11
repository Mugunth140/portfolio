'use client';
import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle: string;
}

export default function PageHero({ title, subtitle }: PageHeroProps) {
  return (
    <section className="px-[var(--section-px)] pt-48 pb-20 bg-[var(--bg)] border-b border-[var(--border)] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <span className="section-label">— COLLECTION</span>
        </motion.div>

        <h1 className="font-display font-bold text-[var(--text-hero)] tracking-[-0.04em] uppercase mb-12 overflow-hidden">
          <motion.span
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="inline-block"
          >
            {title}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-[var(--text-xl)] text-[var(--text-muted)] max-w-2xl font-normal leading-[1.4]"
        >
          {subtitle}
        </motion.p>
      </div>
    </section>
  );
}
