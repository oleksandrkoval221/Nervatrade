"use client";

import Link from "next/link";

const Footer = () => {
  const links = [
    { label: "Features", path: "" },
    { label: "Gallery", path: "" },
    { label: "Testimonials", path: "" },
    { label: "Pricing", path: "" },
  ];

  return (
    <div>
      <div className="w-full max-w-container mx-auto px-3 lg:px-16 text-[#626D7C]">
        <div className="flex flex-col items-center gap-10 py-8 border-b border-b-[#22262E]">
          <ul className="flex flex-col lg:flex-row items-center gap-6 lg:gap-8 text-base font-semibold">
            {
              links.map((link, i) => <li key={i}>
                <Link href={link.path}>{link.label}</Link>
              </li>)
            }
          </ul>
          <div className="flex flex-col items-center gap-6">
            <img src="/images/logo-text.png" alt="Logo" />
            <p className="font-medium">Professional Trading Made Simple</p>
            <ul className="flex items-center gap-3">
              <li>
                <Link href="https://dribbble.com">
                  <img src="/icons/dribbble.svg" alt="" />
                </Link>
              </li>
              <li>
                <Link href="https://twitter.com">
                  <img src="/icons/twitter.svg" alt="" />
                </Link>
              </li>
              <li>
                <Link href="https://youtube.com">
                  <img src="/icons/youtube.svg" alt="" />
                </Link>
              </li>
              <li>
                <Link href="https://messenger.com">
                  <img src="/icons/messenger.svg" alt="" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="h-[72px] flex items-center justify-center font-medium text-sm">
          Copyright © 2024 | NERVATRADE. <span className="hidden lg:inline">All rights reserved.</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
