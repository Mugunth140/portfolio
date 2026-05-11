export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  tags: string[];
  category: string;
  content: string;
  coverImage?: string;
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: 'building-awwwards-portfolio',
    title: 'How I built an Awwwards-level portfolio with Next.js',
    excerpt: 'A deep dive into the architecture, animations, and design decisions behind mugunth.dev v3.',
    date: '2025-05-01',
    readTime: '8 min read',
    tags: ['Next.js', 'GSAP', 'Design'],
    category: 'Engineering',
    featured: true,
    content: `
## Introduction

Building a portfolio that stands out requires more than good code. It demands an obsessive attention to detail — from the grain overlay texture to the precise easing curve on every scroll animation.

## The Architecture

I chose Next.js with static export (SSG) for maximum performance. Every page is pre-rendered at build time, resulting in sub-100ms load times when served through Caddy.

## Animation Strategy

GSAP powers all animations with ScrollTrigger for scroll-driven effects. Lenis provides smooth scrolling that integrates directly with GSAP's ticker for frame-perfect synchronization.

## Design Decisions

The warm cream palette (\`#f0ece4\`) was chosen to avoid the sterile feel of pure white. Combined with a subtle grain overlay and dot grid backgrounds, it creates depth without visual clutter.

## Outcome

The result is a portfolio that communicates senior-level craft through every interaction — from the magnetic buttons to the kinetic hero typography.
    `,
  },
  {
    id: 'gsap-scroll-animations',
    title: 'Mastering GSAP ScrollTrigger for production sites',
    excerpt: 'Everything I learned shipping scroll-driven animations that actually perform.',
    date: '2025-04-10',
    readTime: '6 min read',
    tags: ['GSAP', 'Animation', 'Performance'],
    category: 'Engineering',
    featured: true,
    content: `
## The Problem With Most Scroll Animations

Most scroll animations are janky because they fight the browser's rendering pipeline. The key is working with it, not against it.

## Setting Up ScrollTrigger

The first rule is to always clean up your ScrollTriggers on component unmount. Memory leaks from orphaned triggers are the #1 cause of performance degradation in SPA scroll animations.

## Performance Tips

1. Prefer \`transform\` and \`opacity\` — they're GPU-composited
2. Use \`will-change\` sparingly and remove it after animation
3. Batch your ScrollTrigger.refresh() calls
4. Use \`toggleActions\` instead of continuous scrub where possible

## Integration with Lenis

Lenis smooth scrolling needs to be connected to GSAP's ticker for proper ScrollTrigger behavior. Without this connection, scroll positions will be out of sync.
    `,
  },
  {
    id: 'full-sdlc-solo',
    title: 'Running the full SDLC as a solo developer',
    excerpt: 'How I handle architecture, QA, deployment, and monitoring without a team.',
    date: '2025-03-20',
    readTime: '7 min read',
    tags: ['SDLC', 'DevOps', 'Process'],
    category: 'Process',
    featured: false,
    content: `
## Wearing Every Hat

As a solo developer, you don't have the luxury of specialists. You are the architect, the developer, the QA engineer, and the DevOps team. This is both a challenge and an advantage.

## My Process

1. **Architecture First**: I spend 30% of project time on design and architecture decisions
2. **Build in Phases**: MVP → iterate → polish. Never try to ship everything at once
3. **Automate Everything**: CI/CD pipelines, linting, formatting — if it can be automated, it should be
4. **Monitor Proactively**: Set up logging and monitoring before you need it

## Tools of the Trade

Docker for consistent environments, GitHub Actions for CI/CD, Caddy for zero-config HTTPS, and PostgreSQL for data that matters.
    `,
  },
];
