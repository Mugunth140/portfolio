import Link from 'next/link';
import { ROUTES } from '../constants/routes.constant';
import Btn from './Btn';

const NavItems = () => {
  const navLinks = ROUTES.filter((r) => r.path !== '/' && r.path !== '/contact');

  return (
    <>
      <ul className="hidden md:flex flex-row items-center gap-10">
        {navLinks.map((route) => (
          <li key={route.path}>
            <Link
              href={route.path}
              className="text-md font-medium tracking-[0.06em] text-gray-500 hover:text-black/90 transition-colors duration-300"
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
