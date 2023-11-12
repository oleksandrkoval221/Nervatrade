import "./globals.css";
import type { Metadata } from "next";
import { NextAuthProvider } from "../Provider";
import Header from "../components/Header";

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
          <Header />
          {children}
        </NextAuthProvider>
      </body>
    </html>
  );
}
