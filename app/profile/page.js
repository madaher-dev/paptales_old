"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { cache, use } from "react";
// import { getServerSession } from "next-auth";

const getUsers = cache(() =>
  fetch("https://jsonplaceholder.typicode.com/users").then((res) => res.json())
);

export default async function Profile() {
  // server side session
  // const session = await getServerSession(authOptions);

  // if (!session) {
  //   redirect("/api/auth/signin");
  // }

  // const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
  //   (res) => res.json()
  // );

  // client side session
  // const { status } = useSession({
  //   required: true,
  //   onUnauthenticated() {
  //     redirect("/api/auth/signin");
  //   },
  // });

  // if (status === "loading") {
  //   return <p>Loading....</p>;
  // }

  // let users = use(getUsers());

  // middleware session
  const users = await fetch("https://jsonplaceholder.typicode.com/users").then(
    (res) => res.json()
  );

  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        {users.map((user) => (
          <div
            key={user.id}
            style={{ border: "1px solid #ccc", textAlign: "center" }}
          >
            <img
              src={`https://robohash.org/${user.id}?set=set2&size=180x180`}
              alt={user.name}
              style={{ height: 180, width: 180 }}
            />
            <h3>{user.name}</h3>
          </div>
        ))}
      </div>
    </main>
  );
}
