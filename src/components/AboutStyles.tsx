'use client';

export default function AboutStyles() {
  return (
    <style jsx global>{`
      .skill-pill:hover {
        border-color: var(--accent) !important;
        color: var(--accent) !important;
      }
      .service-card:hover {
        border-color: var(--accent) !important;
        transform: translateY(-4px);
      }
      @media (max-width: 900px) {
        .about-two-col {
          grid-template-columns: 1fr !important;
        }
        .services-grid {
          grid-template-columns: 1fr !important;
        }
      }
      @media (max-width: 600px) {
        .stats-row {
          flex-direction: column !important;
          gap: 24px !important;
        }
        .stats-row > div {
          border-right: none !important;
          border-bottom: 1px solid var(--border);
          padding: 0 0 24px 0 !important;
        }
        .stats-row > div:last-child {
          border-bottom: none;
        }
      }
    `}</style>
  );
}
