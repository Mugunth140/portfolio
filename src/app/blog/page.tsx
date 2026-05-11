import type { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/data/blog';
import BlogStyles from '@/components/BlogStyles';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Thoughts on engineering, design, and craft.',
};

function formatDate(dateStr: string) {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

// Simple color mapping based on category
function getCategoryColor(category: string): string {
  const map: Record<string, string> = {
    Engineering: '#1a5cff',
    Process: '#1a9e5c',
    Design: '#6c47ff',
  };
  return map[category] || '#1a5cff';
}

export default function BlogPage() {
  const featuredPosts = blogPosts.filter((p) => p.featured);
  const allPosts = blogPosts;

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Section 1 — Header */}
      <section
        style={{
          paddingTop: '140px',
          paddingBottom: '60px',
          paddingLeft: 'clamp(20px, 4vw, 60px)',
          paddingRight: 'clamp(20px, 4vw, 60px)',
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            flexWrap: 'wrap',
            gap: '24px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <span className="section-label">— BLOG</span>
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(5rem, 12vw, 11rem)',
                lineHeight: 0.9,
                letterSpacing: '0.02em',
                color: 'var(--ink)',
              }}
            >
              Writing
            </h1>
            <p
              style={{
                fontFamily: "'PPNeueMontreal', sans-serif",
                fontWeight: 400,
                fontSize: '1rem',
                color: 'var(--text-muted)',
                marginTop: '8px',
              }}
            >
              Thoughts on engineering, design, and craft.
            </p>
          </div>
        </div>
      </section>

      {/* Section 2 — Featured Post */}
      {featuredPosts.length > 0 && (
        <section
          style={{
            padding: 'var(--section-py) var(--section-px)',
            borderBottom: '1px solid var(--border)',
          }}
        >
          <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
            <Link href={`/blog/${featuredPosts[0].id}/`} style={{ textDecoration: 'none', display: 'block' }}>
              <div
                className="featured-post-card"
                style={{
                  background: 'var(--surface)',
                  border: '1px solid var(--border)',
                  borderRadius: '16px',
                  padding: '48px',
                  display: 'grid',
                  gridTemplateColumns: '60% 40%',
                  gap: '48px',
                  alignItems: 'center',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Left */}
                <div style={{ minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '10px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      color: getCategoryColor(featuredPosts[0].category),
                      background: 'var(--accent-tint)',
                      padding: '4px 12px',
                      borderRadius: '100px',
                      display: 'inline-block',
                      marginBottom: '16px',
                    }}
                  >
                    {featuredPosts[0].category}
                  </span>
                  <h2
                    style={{
                      fontFamily: "'PPNeueMontreal', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
                      color: 'var(--text)',
                      lineHeight: 1.2,
                      marginBottom: '12px',
                    }}
                  >
                    {featuredPosts[0].title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "'PPNeueMontreal', sans-serif",
                      fontWeight: 400,
                      fontSize: '1rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.6,
                      marginBottom: '16px',
                    }}
                  >
                    {featuredPosts[0].excerpt}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      gap: '16px',
                      alignItems: 'center',
                      marginBottom: '20px',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                      }}
                    >
                      {formatDate(featuredPosts[0].date)}
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        color: 'var(--text-muted)',
                      }}
                    >
                      · {featuredPosts[0].readTime}
                    </span>
                  </div>
                  <span
                    style={{
                      fontFamily: "'PPNeueMontreal', sans-serif",
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      color: 'var(--accent)',
                    }}
                  >
                    Read Article →
                  </span>
                </div>

                {/* Right — gradient block */}
                <div
                  style={{
                    width: '100%',
                    height: '240px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${getCategoryColor(featuredPosts[0].category)}22 0%, ${getCategoryColor(featuredPosts[0].category)}44 100%)`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '6rem',
                      color: getCategoryColor(featuredPosts[0].category),
                      opacity: 0.15,
                    }}
                  >
                    01
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* Section 3 — Post Grid */}
      <section
        style={{
          padding: 'var(--section-py) var(--section-px)',
        }}
      >
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '24px',
            }}
            className="blog-grid"
          >
            {allPosts.map((post) => (
              <Link key={post.id} href={`/blog/${post.id}/`} style={{ textDecoration: 'none' }}>
                <div
                  className="blog-card"
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'transform 0.3s cubic-bezier(0.16,1,0.3,1), border-color 0.3s ease',
                    minWidth: 0,
                  }}
                >
                  {/* Color block top */}
                  <div
                    style={{
                      height: '40px',
                      background: `linear-gradient(135deg, ${getCategoryColor(post.category)}33, ${getCategoryColor(post.category)}66)`,
                    }}
                  />
                  {/* Body */}
                  <div style={{ padding: '24px' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '10px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.12em',
                        color: getCategoryColor(post.category),
                        background: 'var(--accent-tint)',
                        padding: '3px 10px',
                        borderRadius: '100px',
                        display: 'inline-block',
                        marginBottom: '12px',
                      }}
                    >
                      {post.category}
                    </span>
                    <h3
                      style={{
                        fontFamily: "'PPNeueMontreal', sans-serif",
                        fontWeight: 700,
                        fontSize: '1rem',
                        color: 'var(--text)',
                        lineHeight: 1.3,
                        marginBottom: '8px',
                      }}
                    >
                      {post.title}
                    </h3>
                    <p
                      style={{
                        fontFamily: "'PPNeueMontreal', sans-serif",
                        fontWeight: 400,
                        fontSize: '0.875rem',
                        color: 'var(--text-muted)',
                        lineHeight: 1.5,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        marginBottom: '16px',
                      }}
                    >
                      {post.excerpt}
                    </p>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {formatDate(post.date)}
                      </span>
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '10px',
                          color: 'var(--text-muted)',
                        }}
                      >
                        {post.readTime}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <BlogStyles />
    </main>
  );
}
