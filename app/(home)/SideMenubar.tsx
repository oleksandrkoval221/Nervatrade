"use client"

import { useState } from "react";
import Link from "next/link";
import menuItems from "./menuItems";
import { signOut } from "next-auth/react";

const SideMenubar = () => {
  const [menuOver, setMunuOver] = useState('');

  return (
    <nav className="pb-2 min-h-[calc(100vh-30px)] flex flex-col justify-between">
      <ul>
        <div className='mx-2 my-4'>
          <a href="/" className={`flex p-3 cursor-pointer`}>
            <img src="/images/logo.png" className="mx-2" alt="logo" />
          </a>
        </div>
        {menuItems.map(({ href, title, icon, iconHover }) => (
          <li className='m-2' key={title}>
            <Link
              href={href}
              className={`flex gap-2 py-3 px-4 200 rounded text-gray-second hover:bg-green-second hover:text-black cursor-pointer`}
              onMouseOver={() => setMunuOver(title)}
              onMouseLeave={() => setMunuOver('')}
            >
              <img src={`/icons/${menuOver === title ? iconHover : icon}.svg`} alt={`${title}`} />
              {title}
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
          Logout
        </a>
      </div>
    </nav>
  );
};

export default SideMenubar;
