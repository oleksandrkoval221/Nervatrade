import { authOptions } from "@/utilities/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  return (
    <main className="mx-auto mt-4 max-w-5xl px-6">
      <div className="text-2xl">
        This is Newsterminal page
      </div>
    </main>
  );
}
