import { authOptions } from "@/utilities/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto max-w-7xl md:pl-5">
      <div className="flex justify-between items-center bg-dark-second rounded-lg h-20 px-6">
        <div className="font-bold">Dashboards</div>
        <div className="flex gap-3">
          <button className="bg-green-main px-3 py-2 rounded text-dark-main hover:scale-105 duration-300">Create a dashboard</button>
        </div>
      </div>
    </main>
  );
}
