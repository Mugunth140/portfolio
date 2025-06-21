import HamMenu from '@/mobile/HamMenu'
import NavItems from './NavItems'
import  Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex flex-row justify-between items-center p-8 sticky top-0 left-0 filter-blur-xl z-50'>
      <Link href={"/"}>Mugunth</Link>
      <NavItems />
      <HamMenu />
    </nav>
  )
}

export default Navbar