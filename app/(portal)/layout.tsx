import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "../Provider";
import SidebarContext from "@/context/SidebarContext";
import SideMenubar from "./SidebarNav";

export const metadata: Metadata = {
  title: "Nervatrade | Dashboard",
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
            <SidebarContext>
              <SideMenubar />
            </SidebarContext>
            <main className="flex-1">{children}</main>
          </div>
        </NextAuthProvider>
      </body>
    </html>
  );
}
