import Link from "next/link";

export default function PlayerList({ players }) {
  return (
    <div className="flex flex-col items-center justify-center mt-32">
      <h1 className="text-2xl">Player List</h1>
      <div className="flex flex-col items-center justify-center">
        {players.map((player) => (
          <div
            className="flex flex-col items-center justify-center"
            key={player._id}
          >
            <div className="flex flex-col items-center justify-center">
              <div className="flex flex-col items-center justify-center">
                <Link href={`/dashboard/${player._id}`}>{player.name}</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
