import HamMenu from '@/mobile/HamMenu';
import Link from 'next/link';
import NavItems from './NavItems';

const Navbar = () => {
  return (
    <>
      <nav className="nav-glass h-17 md:h-15 flex flex-row justify-between items-center px-6 md:px-12 lg:px-20 sticky top-0 left-0 z-50">
        <Link
          href="/"
          className="text-md font-medium uppercase text-foreground/80 hover:text-foreground transition-colors duration-200 align-bottom"
          style={{ fontFamily: 'var(--font-primary)' }}
        >
          Mugunth
        </Link>
        <NavItems />
        <HamMenu />
      </nav>
    </>
  );
};

export default Navbar;
