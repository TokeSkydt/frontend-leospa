import React from 'react'
import Link from 'next/link';
import { LogOut } from 'lucide-react';
import LogoutButton from './logoutbtn';

type Routs = {
  label: string;
  href: string;
}

const adminList: Routs[] = [

  { label: "front page", href: "/" },
  { label: "admin user", href: "/adminuser" },
  { label: "treatment", href: "/admin/treatment" },
  { label: "about", href: "/admin/about" },
  { label: "Hero", href: "/admin/hero" },
  { label: "Footer", href: "/footer" },
  { label: "contact", href: "/contact" },
];

function AdminSidebar() {
  return (
    <nav className='w-[250px] pl-3 bg-gray-500 h-screen '>
      <div className=" text-white text-lg grid grid-cols-1">
        <h2 className='text-3xl'>Admin</h2>
        {adminList.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="pt-5 uppercase hover:text-pink-500"
          >
            {item.label}
          </Link>
        ))}
        <div>
          <LogoutButton />
        </div>

      </div>
    </nav>
  )
}

export default AdminSidebar