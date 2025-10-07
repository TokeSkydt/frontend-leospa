import React from 'react'
import { getFooterData } from '@/data/FooterData';
import Link from 'next/link';
import Image from 'next/image';

const menuList = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "feature", href: "/feature" },
  { label: "Service", href: "/service" },
  { label: "contact", href: "/contact" },
];

const Footer = async () => {
  const FoterData = await getFooterData();

  return (

    <footer className='bg-pink-50'>
      <div className='flex justify-center mt-5'>
        <Image src="/img/logo.png" alt="logo" height={100} width={100} className='' />
      </div>
      <div className="flex flex-wrap justify-center space-x-6 ml-auto mt-5">
        {menuList.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="text-gray-700 hover:text-pink-200 transition uppercase "
          >
            {item.label}
          </Link>
        ))}
      </div>
      <div className='uppercase text-center text-sm text-gray-400 py-5'>
        <p>copyright 2019 <span className='text-pink-400 cursor-pointer hover:underline'>themeies.com. </span>all rights reserved </p>
      </div>


    </footer>
  )
}

export default Footer