import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "../Provider";
import SideMenubar from "./SideMenubar";

export const metadata: Metadata = {
  title: "Nervatrade",
  description: "Welcome to Financial Insights!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className="flex flex-col md:flex-row flex-1 p-3">
            <aside className="bg-dark-second w-full md:w-60 rounded-lg">
              <SideMenubar />
            </aside>
            <main className="flex-1">{children}</main>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
