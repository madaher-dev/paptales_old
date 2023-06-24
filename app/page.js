import Head from "next/head";
import Signup from "@/components/Signup";
import { getServerSession } from "next-auth";
import { authOptions } from "@/utils/auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  // console.log(session);
  // a function that returns today for am time and tonight for pm time
  const time = new Date().getHours() < 12 ? "today" : "tonight";
  return (
    <div className="h-screen grid grid-rows-3">
      <Head>
        <title>Paptales</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="row-span-1 bg-red-200 flex items-center justify-center">
        <div className="w-64 h-32 bg-white p-4 rounded shadow-lg flex items-center justify-center flex-col">
          <h1 className="text-xl font-bold text-center">Papa Tales</h1>
          <h3 className="text-sm text-center">Stories about us!</h3>
        </div>
      </div>

      <div className="row-span-3 bg-blue-200 flex items-center justify-center flex-col">
        <div className="bg-white p-16 rounded shadow-lg flex items-center justify-center flex-col">
          <h1 className="text-xl font-bold text-center">
            Who are we reading for {time}?
          </h1>
          <Signup />
        </div>
      </div>
    </div>
  );
}
