import Btn from './Btn';
import Link from 'next/link';

const NavItems = () => {
  return (
    <>
      <ul className="hidden md:flex flex-row items-center gap-8">
        <li>
          <Link href={'/about'}>About</Link>
        </li>
        <li>
          <Link href={'/work'}>Work</Link>
        </li>
        {/* TODO: Add Blog */}
        <li>
          <Link href={'#'}>Blog</Link>
        </li>
      </ul>
      <div className="hidden md:inline-block">
        <Btn>
          <Link href={'/contact'}>Contact</Link>
        </Btn>
      </div>
    </>
  );
};

export default NavItems;
