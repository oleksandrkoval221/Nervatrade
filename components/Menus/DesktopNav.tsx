"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Button from "../Button";

const DesktopNav = () => {
  const { data: session } = useSession();

  const links = [
    { label: "Features", path: "/" },
    { label: "Partners", path: "/" },
    { label: "Pricing", path: "/" },
    { label: "News", path: "/" },
    { label: "App", path: "/" },
  ];

  return (
    <nav
      className={`w-full max-w-container h-[88px] hidden lg:flex justify-between items-center px-16 mx-auto`}
    >
      <div className="w-full max-w-[242px]">
        <Link href="/">
          <img src="/images/logo-sm.png" alt="Logo" />
        </Link>
      </div>

      <ul className="flex gap-8 font-semibold text-base">
        {links.map((link, i) => (
          <li
            key={i}
            className="text-[#626D7C] text-sm hover:text-[#FFF] transition"
          >
            <Link href={link.path}>{link.label}</Link>
          </li>
        ))}
      </ul>

      <div>
        {session ? (
          <Link
            href="/profile"
            className="flex items-center gap-2 cursor-pointer"
          >
            <img src="/icons/user.svg" className="w-4 opacity-50" alt="" />
            <span className="font-medium text-xs text-[#626D7C]">
              {session.user?.email}
            </span>
          </Link>
        ) : (
          <div className="flex gap-5">
            <Link href="/login">
              <button className="h-8 px-4 font-semibold text-xs rounded-lg border border-gray-border text-[#FFF]">
                Sign In
              </button>
            </Link>
            <Link href="/register">
              <button className="h-8 px-4 font-semibold text-xs rounded-lg bg-[#00DC41] text-[#000]">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
