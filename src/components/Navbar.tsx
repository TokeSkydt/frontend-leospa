"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import Image from "next/image";

const menuList = [
  { label: "home", href: "/" },
  { label: "about", href: "/about" },
  { label: "feature", href: "/feature" },
  { label: "Service", href: "/service" },
  { label: "contact", href: "/contact" },
];

const Navbar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="top-0 left-0 z-50 w-full">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex items-center justify-between h-20">

          <Image
            src="/img/logo.png"
            alt="Logo"
            width={100}
            height={100}
            className="ml-4"
          />

          <div className="hidden md:flex space-x-6 ml-auto pr-20 lg:pr-32">
            {menuList.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gray-700 hover:text-pink-200 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-pink-200 focus:outline-none"
            >
              {open ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-pink-100 shadow-lg border-t text-center">
          <div className="flex flex-col space-y-2 p-4">
            {menuList.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="text-gray-700 hover:text-pink-100 transition"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
