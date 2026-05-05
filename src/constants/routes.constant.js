export const ROUTES = [
  {
    name: 'Home',
    path: '/',
  },
  {
    name: 'About',
    path: '/about',
  },
  {
    name: 'Work',
    path: '/work',
  },
  // Blog
  {
    name: 'Blog',
    path: '/blog',
  },
  {
    name: 'Contact',
    path: '/contact',
  },
];

export const PAGE_SEQUENCE = ROUTES;

export const getNextRoute = (path) => {
  const currentIndex = PAGE_SEQUENCE.findIndex((route) => route.path === path);

  if (currentIndex === -1) return null;

  return PAGE_SEQUENCE[(currentIndex + 1) % PAGE_SEQUENCE.length];
};

export const SOCIALS = [
  {
    name: 'Github',
    path: 'https://github.com/mugunth140/',
  },
  {
    name: 'LinkedIn',
    path: 'https://www.linkedin.com/in/mugunthrp/',
  },
  {
    name: 'Instagram',
    path: 'https://www.instagram.com/mugunth140/',
  },
  {
    name: 'Dribbble',
    path: 'https://dribbble.com/mugunth140',
  },
];
