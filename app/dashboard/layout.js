import Header from "@/components/Header";
import Head from "next/head";

export default function DashboardLayout({ children }) {
  return (
    <div className="h-screen">
      <Head>
        <title>Paptales</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {children}
    </div>
  );
}
