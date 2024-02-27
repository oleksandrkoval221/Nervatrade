"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import menuItems from "./menuItems";
import { signOut } from "next-auth/react";
import { useToggle } from "@/context/SidebarContext";

const SidebarNav = () => {
  const pathname = usePathname();
  // @ts-ignore
  const { sidebarPin, toggleSidebar } = useToggle();
  const [menuOver, setMunuOver] = useState("");

  return (
    <aside
      className={`hidden md:block bg-black w-full border-r border-r-gray-border transition-all ${
        sidebarPin ? "md:w-[91px]" : "md:w-60"
      }`}
    >
      <nav className="h-full flex flex-col justify-between">
        <div className="flex flex-col gap-10 px-4 py-14">
          <a href="/" className={`flex cursor-pointer relative z-10`}>
            {!sidebarPin ? (
              <img src="/images/logo-sm.png" className="h-6" alt="logo" />
            ) : (
              <img
                src="/images/logo-white-1.png"
                className="mx-auto h-6"
                alt="logo"
              />
            )}
          </a>
          <ul>
            {menuItems.map(({ href, title, icon, iconHover }) => (
              <li key={title}>
                <Link
                  href={href}
                  className={`flex items-center w-full h-14 gap-2 px-4 rounded-lg hover:bg-gray-active cursor-pointer ${
                    pathname === href
                      ? "bg-gray-active text-[#FFF]"
                      : "text-gray-second"
                  }`}
                  onMouseOver={() => setMunuOver(title)}
                  onMouseLeave={() => setMunuOver("")}
                >
                  <img
                    src={`/icons/${pathname === href ? iconHover : icon}.svg`}
                    alt={`${title}`}
                  />
                  {!sidebarPin && title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center gap-10 px-4 pt-10 pb-14 border-t border-t-gray-border">
          <button
            onClick={toggleSidebar}
            className="w-6 h-6 flex justify-center items-center rounded"
          >
            <img
              src="/icons/arrow-right.png"
              className={`h-3 transition ${
                !sidebarPin ? "rotate-180" : "rotate-0"
              }`}
              alt="arrow"
            />
          </button>
          <a
            href="#"
            onClick={() => signOut()}
            className={`flex items-center w-full h-14 gap-2 px-4 rounded-lg hover:bg-gray-active cursor-pointer`}
            onMouseOver={() => setMunuOver("logout")}
            onMouseLeave={() => setMunuOver("")}
          >
            <img
              src={`/icons/${
                menuOver === "logout" ? "Turnoff-hover" : "Turnoff"
              }.svg`}
              alt="logout"
            />
            {!sidebarPin && "Logout"}
          </a>
        </div>
      </nav>
    </aside>
  );
};

export default SidebarNav;
