"use client";

import Hamburger from "hamburger-react";
import { useState } from "react";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { BsPersonFill } from "react-icons/bs";
import Button from '../Button';

const MobileNav = () => {
  const [isOpen, setOpen] = useState(false);
  const { data: session } = useSession();

  const links = [
    { label: "Features", path: "/" },
    { label: "Partners", path: "/" },
    { label: "Pricing", path: "/" },
    { label: "News", path: "/" },
  ];

  return (
    <nav className="block lg:hidden">
      <div className="w-full h-[88px] flex items-center gap-5 px-4">
        <div className="z-[100] relative">
          <Hamburger
            size={25}
            label="Show menu"
            toggled={isOpen}
            toggle={setOpen}
          />
        </div>
        <Link href="/">
          <img src="/images/logo-sm.png" alt="Logo" />
        </Link>
      </div>
      {isOpen && (
        <div className="flex absolute w-screen h-screen pt-[25%] bg-white z-50 inset-0 h-screen flex-col items-center cursor-pointer">
          <div className="w-full h-full bg-dark-main px-5">
            <ul className="flex flex-col gap-8 font-semibold text-base mb-8">
              {
                links.map((link, i) => <li key={i} className="text-[#626D7C] hover:text-[#FFF] transition text-center">
                  <Link href={link.path}>{link.label}</Link>
                </li>)
              }
            </ul>
            <div>
              {session ? (
                <>
                  <p className="my-4 ">
                    Signed in as {session.user?.email}
                  </p>
                  <p
                    onClick={() => signOut()}
                    className="bg-green-700 ml-6 my-4 rounded-md p-2 px-4 mx-2 text-white"
                  >
                    <BsPersonFill /> Logout
                  </p>
                </>
              ) : (
                <div className="flex flex-col gap-5">
                  <Link href="/login">
                    <Button className="w-full" color="dark">Sign In</Button>
                  </Link>
                  <Link href="/register">
                    <Button className="w-full" color="primary">Sign Up</Button>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default MobileNav;
