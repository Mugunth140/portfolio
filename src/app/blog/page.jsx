'use client';

import { ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import NextPageTransition from '@/components/NextPageTransition';
import { BLOG_POSTS } from '../../constants/data.constant';

export default function Blog() {
  return (
    <main className="min-h-screen">
      <PageHero title="Blog." subtitle="Thoughts & writing">
        <div className="flex flex-col gap-0 mt-10">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.id}
              href={post.slug}
              className="group block py-8 border-b border-secondary/10 hover:border-tertiary transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1 max-w-2xl">
                  <h2 className="text-xl md:text-2xl font-medium font-primary group-hover:text-tertiary transition-colors duration-300 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-sm font-mono text-foreground/50 leading-relaxed">{post.excerpt}</p>
                </div>
                <div className="flex md:flex-col items-center md:items-end gap-4 shrink-0">
                  <span className="text-xs font-mono text-foreground/30">{post.date}</span>
                  <ArrowUpRight size={18} className="opacity-0 group-hover:opacity-100 transition-all text-tertiary" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </PageHero>
      <NextPageTransition nextRoute="/work" nextTitle="Work" />
    </main>
  );
}
