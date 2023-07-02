import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

import NewStory from "@/components/NewStory";
import { redirect } from "next/navigation";
const URL = process.env.NEXT_PUBLIC_URL || "http://localhost:3000";

export default async function Player({ params }) {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/");
  const { user } = session;
  const playerId = params.player;
  let updatedUser = await fetch(`${URL}/api/user/${user.id}`);
  try {
    updatedUser = await updatedUser.json();
    updatedUser = updatedUser.data;
  } catch (err) {
    console.log(err.message);
  }
  let players = updatedUser.players || [];

  const player = players.find((player) => player._id === playerId);
  let characters = await fetch(`${URL}/api/character`);
  characters = await characters.json();
  characters = characters.data;

  return (
    <div className="row-span-1 bg-red-200 flex items-center justify-center flex-col mt-6">
      <NewStory player={player} characters={characters} />
    </div>
  );
}
