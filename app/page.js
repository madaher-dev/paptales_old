import Signup from "@/components/Signup";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = session?.user ?? null;
  if (session) {
    console.log("session", session);
    redirect("/dashboard");
  }
  return (
    <div className="min-h-screen bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400">
      <div className="h-40 flex items-center justify-center rounded-lg">
        <div>
          <h1 className="text-4xl font-bold text-center md:text-left text-white">
            Paptales
          </h1>
          <h3 className="text-2xl text-center md:text-left text-white">
            Stories about us!
          </h3>
        </div>
      </div>

      <div className="flex-grow flex items-start justify-center py-20">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <Signup />
        </div>
      </div>
    </div>
  );
}
