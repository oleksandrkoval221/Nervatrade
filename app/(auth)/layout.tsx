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
          <main className="min-h-screen lg:flex">
            <div className="lg:w-5/12 flex items-center justify-center py-10 bg-dark-second bg-authbg-pattern bg-no-repeat bg-left-bottom relative min-h-screen">
              <img src="/images/logo.png" className="absolute top-10 left-12 md:top-16 md:left-20" alt="Logo" />
              <img src="/images/auth-star.png" className="absolute top-20 right-10" alt="auth-starpattern" />
              <div className="px-10 max-w-[490px]">
                <p>
                  Welcome to Financial Insights! Get ready to unlock the power of data-driven decision-making. Our platform offers real-time analytics, customizable dashboards, and comprehensive tools to help you make smarter financial choices.
                </p>
                <p className="mt-4">Nerva Trade Team</p>
              </div>
            </div>
            <div className="lg:w-7/12 flex items-center py-20">
              {children}
            </div>
          </main>
        </NextAuthProvider>
      </body>
    </html>
  );
}
