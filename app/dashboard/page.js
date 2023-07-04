import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

import PlayerList from "@/components/PlayerList";
const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export default async function Welcome() {
  const session = await getServerSession(authOptions);
  const { user } = session;
  let updatedUser = {};
  let players = [];
  try {
    updatedUser = await fetch(`${URL}/api/user/${user.id}`);
    updatedUser = await updatedUser.json();
    updatedUser = updatedUser.data;
    players = updatedUser.players || [];
  } catch (e) {
    console.log(e);
  }

  return (
    <div className="row-span-1 bg-red-200 flex items-center justify-center flex-col mt-6">
      <div>Welcome {user?.email ?? "Guest"}</div>
      <PlayerList players={players} />
    </div>
  );
}
