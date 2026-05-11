'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { name: 'Work', path: '/work' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
];

export default function NavItems() {
  const pathname = usePathname();

  return (
    <ul className="flex items-center gap-8 md:gap-12">
      {NAV_LINKS.map((link) => {
        const isActive = pathname === link.path || (link.path !== '/' && pathname.startsWith(link.path));
        return (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`relative py-2 font-display font-medium text-[var(--text-sm)] uppercase tracking-[0.05em] transition-colors duration-200 ${
                isActive ? 'text-[var(--accent)]' : 'text-[var(--text)] hover:text-[var(--accent)]'
              }`}
            >
              {link.name}
              {isActive && (
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[var(--accent)]" />
              )}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
