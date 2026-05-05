import { ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';
import PageHero from '@/components/PageHero';
import { BLOG_POSTS } from '../../constants/data.constant';
import { getNextRoute } from '../../constants/routes.constant';

export const metadata = {
  title: 'Blog | Mugunth',
  description: 'Thoughts on design, development, and motion',
};

const nextPage = getNextRoute('/blog');

export default function Blog() {
  return (
    <main className="min-h-screen">
      <PageHero title="Blog." subtitle="Thoughts & writing" nextPage={nextPage}>
        {/* ── Posts ── */}
        <div className="flex flex-col gap-0 mt-10">
          {BLOG_POSTS.map((post, i) => (
            <Link
              key={post.id}
              href={post.slug}
              className="group block py-8 border-b border-color-secondary/20 hover:border-tertiary transition-colors duration-200"
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                {/* Left */}
                <div className="flex-1 max-w-2xl">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-2 py-0.5 border border-color-secondary/30 rounded-full text-foreground/50"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-xl md:text-2xl font-medium font-primary group-hover:text-tertiary transition-colors duration-300 mb-3">
                    {post.title}
                  </h2>
                  <p className="text-sm font-mono text-foreground/50 leading-relaxed">{post.excerpt}</p>
                </div>

                {/* Right */}
                <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-3 shrink-0 md:pt-1">
                  <span className="text-xs font-mono text-foreground/30">{post.date}</span>
                  <span className="flex items-center gap-1 text-xs font-mono text-foreground/30">
                    <Clock size={11} />
                    {post.readTime}
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 text-tertiary"
                  />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Coming soon note */}
        <p className="mt-16 text-xs font-mono text-foreground/30 text-center">More posts coming soon. Stay tuned.</p>
      </PageHero>
    </main>
  );
}
