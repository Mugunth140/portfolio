import React from 'react'
import  Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='flex flex-row justify-between items-center p-8 sticky top-0 left-0 filter-blur-xl z-50'>
      <Link href={"/"}>Mugunth</Link>
      <ul className='flex flex-row gap-8'>
        <li>
          <Link href={'/about'}>About</Link>
          </li>
        <li><Link href={'/work'}>Work</Link></li>
        <li><Link href={'/contact'}>Contact</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar