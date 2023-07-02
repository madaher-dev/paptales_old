"use client";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const goToHome = () => {
    router.push("/dashboard");
  };
  const newPlayer = () => {
    router.push("/dashboard/new");
  };
  return (
    <div className="bg-red-200 flex items-center justify-center h-16">
      <button style={{ marginRight: 10 }} onClick={() => signOut()}>
        Sign Out
      </button>
      <button style={{ marginRight: 10 }} onClick={() => goToHome()}>
        Home
      </button>
      <button style={{ marginRight: 10 }} onClick={() => newPlayer()}>
        New Player
      </button>
    </div>
  );
}
