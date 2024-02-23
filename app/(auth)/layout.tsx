import Link from "next/link";
import { NextAuthProvider } from "../Provider";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <main className="min-h-screen px-3 bg-black">
            <div className="w-full max-w-container h-[88px] flex items-center mx-auto lg:px-16 border-b border-b-[#22262E]">
              <Link href="/">
                <img src="/images/logo-sm.png" alt="" />
              </Link>
            </div>
            <div style={{ minHeight: 'calc(100vh - 160px)' }} className="flex flex-col items-center justify-center px-5 py-10">
              {children}
            </div>
            <div className="w-full max-w-container h-[72px] flex items-center mx-auto lg:px-16 border-t border-t-[#22262E]">
              <p className="font-medium text-sm text-[#626D7C]">Copyright © 2024 | NERVATRADE. <span className="hidden lg:inline">All rights reserved.</span></p>
            </div>
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
