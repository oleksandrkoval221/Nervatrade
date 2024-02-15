"use client";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { BsPersonFill } from "react-icons/bs";
import Button from '../Button';

const DesktopNav = () => {
  const { data: session } = useSession();

  const links = [
    { label: "Features", path: "/" },
    { label: "Partners", path: "/" },
    { label: "Pricing", path: "/" },
    { label: "News", path: "/" },
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
        {
          links.map((link, i) => <li key={i} className="text-[#626D7C] hover:text-[#FFF] transition">
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
          <div className="flex gap-5">
            <Link href="/login">
              <Button color="dark">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button color="primary">Sign Up</Button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default DesktopNav;
