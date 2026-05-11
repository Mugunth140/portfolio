import { blogPosts } from '@/data/blog';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
  };
}

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.id === slug);

  if (!post) {
    notFound();
  }

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Article Header */}
      <section
        style={{
          paddingTop: '140px',
          paddingBottom: '48px',
          paddingLeft: 'clamp(20px, 4vw, 60px)',
          paddingRight: 'clamp(20px, 4vw, 60px)',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          {/* Category badge */}
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '10px',
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'var(--accent)',
              background: 'var(--accent-tint)',
              padding: '4px 12px',
              borderRadius: '100px',
              display: 'inline-block',
              marginBottom: '24px',
            }}
          >
            {post.category}
          </span>

          {/* Title */}
          <h1
            style={{
              fontFamily: "'PPNeueMontreal', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2rem, 5vw, 4rem)',
              lineHeight: 1.1,
              color: 'var(--text)',
              letterSpacing: '-0.02em',
              marginBottom: '16px',
            }}
          >
            {post.title}
          </h1>

          {/* Excerpt */}
          <p
            style={{
              fontFamily: "'PPNeueMontreal', sans-serif",
              fontWeight: 400,
              fontSize: '1.1rem',
              color: 'var(--text-muted)',
              lineHeight: 1.6,
              marginBottom: '24px',
            }}
          >
            {post.excerpt}
          </p>

          {/* Meta */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              alignItems: 'center',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}
            >
              {formatDate(post.date)}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '11px',
                color: 'var(--text-muted)',
              }}
            >
              · {post.readTime}
            </span>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div
        style={{
          maxWidth: '680px',
          margin: '0 auto',
          borderTop: '1px solid var(--border)',
        }}
      />

      {/* Content */}
      <section
        style={{
          padding: '48px clamp(20px, 4vw, 60px)',
        }}
      >
        <div
          className="prose"
          style={{
            maxWidth: '680px',
            margin: '0 auto',
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </section>

      {/* Tags */}
      <section
        style={{
          padding: '0 clamp(20px, 4vw, 60px) 48px',
        }}
      >
        <div
          style={{
            maxWidth: '680px',
            margin: '0 auto',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '8px',
          }}
        >
          {post.tags.map((tag) => (
            <span
              key={tag}
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '10px',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--text-muted)',
                border: '1px solid var(--border)',
                borderRadius: '100px',
                padding: '6px 14px',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </section>

      {/* Back to Blog */}
      <section
        style={{
          padding: '0 clamp(20px, 4vw, 60px) 80px',
        }}
      >
        <div style={{ maxWidth: '680px', margin: '0 auto' }}>
          <Link
            href="/blog"
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              color: 'var(--accent)',
              textDecoration: 'none',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'opacity 0.2s ease',
            }}
          >
            ← Blog
          </Link>
        </div>
      </section>
    </main>
  );
}
