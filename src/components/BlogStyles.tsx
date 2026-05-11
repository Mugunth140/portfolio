'use client';

export default function BlogStyles() {
  return (
    <style jsx global>{`
      .featured-post-card:hover {
        border-color: var(--accent) !important;
      }
      .blog-card:hover {
        transform: translateY(-4px);
        border-color: var(--accent) !important;
      }
      @media (max-width: 900px) {
        .blog-grid {
          grid-template-columns: repeat(2, 1fr) !important;
        }
        .featured-post-card {
          grid-template-columns: 1fr !important;
        }
        .featured-post-card > div:last-child {
          display: none !important;
        }
      }
      @media (max-width: 600px) {
        .blog-grid {
          grid-template-columns: 1fr !important;
        }
      }
    `}</style>
  );
}
