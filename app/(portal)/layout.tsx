import "./globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { NextAuthProvider } from "../Provider";
import SidebarContext from "@/context/SidebarContext";
import DashboardContext from "@/context/DashboardContext";
import SideMenubar from "./SidebarNav";

import { authOptions } from "@/utilities/auth";

export const metadata: Metadata = {
  title: "Nervatrade | Dashboard",
  description: "Welcome to Financial Insights!",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session)
    redirect("/login");

  return (
    <html lang="en">
      <body>
        <NextAuthProvider>
          <div className="min-h-screen flex flex-col md:flex-row flex-1 overflow-clip">
            <SidebarContext>
              <SideMenubar />
            </SidebarContext>
            <main className="flex-1">
              <DashboardContext>
                {children}
              </DashboardContext>
            </main>
          </div>
        </NextAuthProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
