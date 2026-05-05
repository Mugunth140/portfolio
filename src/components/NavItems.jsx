'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ROUTES } from '../constants/routes.constant';
import Btn from './Btn';

const NavItems = () => {
  const pathname = usePathname();
  const navLinks = ROUTES.filter((r) => r.path !== '/' && r.path !== '/contact');
  const isActiveRoute = (path) => pathname === path || pathname.startsWith(`${path}/`);
  const isContactActive = isActiveRoute('/contact');

  return (
    <>
      <ul className="hidden md:flex flex-row items-center gap-2 rounded-full border border-secondary/10 bg-primary/75 p-1 shadow-[0_18px_70px_rgba(23,23,23,0.07)] backdrop-blur-xl">
        {navLinks.map((route) => (
          <li key={route.path}>
            <Link
              href={route.path}
              data-cursor={route.name}
              aria-current={isActiveRoute(route.path) ? 'page' : undefined}
              className={`relative block rounded-full px-4 py-2 text-sm font-medium transition-colors duration-300 ${
                isActiveRoute(route.path)
                  ? 'bg-secondary text-white'
                  : 'text-foreground/50 hover:bg-white/70 hover:text-foreground'
              }`}
              style={{ fontFamily: 'var(--font-primary)' }}
            >
              {route.name}
            </Link>
          </li>
        ))}
      </ul>
      <div className="hidden md:inline-block">
        <Btn>
          <Link
            href="/contact"
            data-cursor="Contact"
            aria-current={isContactActive ? 'page' : undefined}
            className="text-md font-medium tracking-[0.04em]"
            style={{ fontFamily: 'var(--font-primary)' }}
          >
            Contact
          </Link>
        </Btn>
      </div>
    </>
  );
};

export default NavItems;
