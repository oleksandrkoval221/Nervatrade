import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nervatrade | Home page",
  description: "Welcome to Financial Insights!",
};


export default async function Home() {

  return (
    <main className="mx-auto mt-4 max-w-5xl px-6">
      <div className="text-3xl mt-5 text-center font-bold">Coming Soon!!!</div>
      <h1 className="text-xl font-semibold text-center mt-10">
        Welcome! This is landing page
      </h1>
      <div className="text-2xl mt-5 text-center font-bold underline">
        <a href="/dashboard">Go to dashboard</a>
      </div>
    </main>
  );
}
