"use client"

import { useState } from "react";
import Link from "next/link";
import { usePathname } from 'next/navigation'
import menuItems from "./menuItems";
import { signOut } from "next-auth/react";
import { useToggle } from "@/context/SidebarContext";

const SidebarNav = () => {
  const pathname = usePathname();

  const { sidebarPin, toggleSidebar } = useToggle();
  const [menuOver, setMunuOver] = useState('');

  return (
    <aside className={`bg-dark-second w-full ${sidebarPin ? 'md:w-16' : 'md:w-60'} rounded-lg`}>
      <nav className="pb-2 min-h-[calc(100vh-30px)] flex flex-col justify-between">
        <ul>
          <div className='mx-2 my-4 relative'>
            <a href="/" className={`flex p-3 cursor-pointer relative z-10`}>
              {
                !sidebarPin ?
                <img src="/images/logo.png" className="mx-2" alt="logo" />
                :
                <img src="/images/logo-white-1.png" className="" alt="logo" />
              }
            </a>
            <button
              onClick={() => toggleSidebar()}
              className="absolute bg-dark-second top-0 -right-6 w-12 h-12 rounded-lg flex justify-center items-center">
              <img src="/icons/arrow-right.png" className={`w-2 ${!sidebarPin?'rotate-180':''} ml-5`} alt="arrow" />
            </button>
          </div>
          {menuItems.map(({ href, title, icon, iconHover }) => (
            <li className='m-2' key={title}>
              <Link
                href={href}
                className={`flex gap-2 py-3 px-4 200 rounded hover:bg-green-second cursor-pointer ${pathname===href?'bg-green-main text-black':'text-gray-second'}`}
                onMouseOver={() => setMunuOver(title)}
                onMouseLeave={() => setMunuOver('')}
              >
                <img src={`/icons/${pathname===href ? iconHover : icon}.svg`} alt={`${title}`} />
                {!sidebarPin && title}
              </Link>
            </li>
          ))}
        </ul>

        <div className='mx-2'>
          <a
            href="#"
            onClick={() => signOut()}
            className={`flex gap-2 py-3 px-4 200 rounded text-gray-second hover:bg-green-second hover:text-black cursor-pointer`}
            onMouseOver={() => setMunuOver('logout')}
            onMouseLeave={() => setMunuOver('')}
          >
            <img src={`/icons/${menuOver === 'logout' ? 'Turnoff-hover' : 'Turnoff'}.svg`} alt="logout" />
            {!sidebarPin && 'Logout'}
          </a>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarNav;
