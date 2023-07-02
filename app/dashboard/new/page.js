import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";
import { redirect } from "next/navigation";
import NewPlayer from "@/components/NewPlayer";

export default async function New() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }

  return (
    <div className="row-span-1 bg-red-200 flex items-center justify-center flex-col">
      <div>Welcome {session?.user?.email ?? "Guest"}</div>
      <NewPlayer />
    </div>
  );
}
