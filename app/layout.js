import "./globals.css";
import { Inter } from "next/font/google";
import { NextAuthProvider } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Paptales",
  description: "Stories about us!",
  image: "/logo.png",
  url: "https://paptales.vercel.app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>{children}</NextAuthProvider>
      </body>
    </html>
  );
}
