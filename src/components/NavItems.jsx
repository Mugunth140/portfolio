import Btn from './Btn'
import Link from 'next/link'

const NavItems = () => {
  return (
    <ul className='hidden md:flex flex-row items-center gap-8'>
      <li><Link href={'/about'}>About</Link></li>
      <li><Link href={'/work'}>Work</Link></li>
      <Btn><Link href={'/contact'}>Contact</Link></Btn>
    </ul>
  )
}

export default NavItems;