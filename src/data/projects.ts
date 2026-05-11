export interface Project {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  coverImage: string;
  images: string[];
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  color: string;
  problem: string;
  approach: string;
  outcome: string;
}

export const projects: Project[] = [
  {
    id: 'portfolio-v3',
    index: '01',
    title: 'Portfolio V3',
    subtitle: 'High-performance personal platform',
    category: 'Design & Development',
    year: '2025',
    coverImage: '/images/projects/portfolio-v3.jpg',
    images: [],
    tags: ['Next.js', 'GSAP', 'Tailwind', 'DevOps'],
    liveUrl: 'https://mugunth.dev',
    featured: true,
    color: '#1a5cff',
    problem: 'Needed a portfolio that reflects senior-level craft.',
    approach: 'Built with Next.js SSG, GSAP animations, Lenis scroll.',
    outcome: 'Awwwards-quality personal site deployed on Caddy.',
  },
  {
    id: 'nexus-dashboard',
    index: '02',
    title: 'Nexus Dashboard',
    subtitle: 'Centralized analytics engine',
    category: 'Design & Development',
    year: '2024',
    coverImage: '/images/projects/nexus-dashboard.jpg',
    images: [],
    tags: ['React', 'Node.js', 'PostgreSQL'],
    featured: true,
    color: '#6c47ff',
    problem: 'Fragmented analytics across multiple platforms.',
    approach: 'Unified dashboard with real-time data pipeline.',
    outcome: '40% reduction in reporting time.',
  },
  {
    id: 'zephyrus',
    index: '03',
    title: 'Zephyrus',
    subtitle: 'Cross-platform social media app',
    category: 'Design & Development',
    year: '2024',
    coverImage: '/images/projects/zephyrus.jpg',
    images: [],
    tags: ['React Native', 'Node.js', 'MongoDB'],
    featured: true,
    color: '#ff4a1a',
    problem: 'Siloed social experiences across platforms.',
    approach: 'Cross-platform app with unified feed engine.',
    outcome: 'Shipped to 500+ early users.',
  },
  {
    id: 'mauth',
    index: '04',
    title: 'MAuth',
    subtitle: 'Auth microservice with JWT + OAuth',
    category: 'Development',
    year: '2023',
    coverImage: '/images/projects/mauth.jpg',
    images: [],
    tags: ['Node.js', 'JWT', 'OAuth2', 'Docker'],
    featured: true,
    color: '#1a9e5c',
    problem: 'Repeated auth logic across multiple services.',
    approach: 'Standalone auth microservice with OAuth2.',
    outcome: 'Reused across 3 production projects.',
  },
  {
    id: 'mingle',
    index: '05',
    title: 'Mingle',
    subtitle: 'Real-time event networking platform',
    category: 'Design & Development',
    year: '2023',
    coverImage: '/images/projects/mingle.jpg',
    images: [],
    tags: ['Next.js', 'Socket.io', 'PostgreSQL'],
    featured: false,
    color: '#e8a020',
    problem: 'Event networking is broken and forgettable.',
    approach: 'Real-time matching with Socket.io.',
    outcome: 'Tested at 2 college events.',
  },
  {
    id: 'forecaster',
    index: '06',
    title: 'Forecaster',
    subtitle: 'Weather intelligence dashboard',
    category: 'Design & Development',
    year: '2023',
    coverImage: '/images/projects/forecaster.jpg',
    images: [],
    tags: ['React', 'OpenWeather API', 'D3.js'],
    featured: false,
    color: '#0e9ce8',
    problem: 'Weather apps lack data depth.',
    approach: 'Visual forecast engine with D3 charts.',
    outcome: 'Open sourced, 120+ GitHub stars.',
  },
];
