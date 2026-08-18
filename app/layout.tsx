import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import { Dancing_Script } from "next/font/google";
import Navbar from "@/components/layout/Navbar";
import Constellation from "@/components/effects/Constellation";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "Pragati Portfolio",
  icons:{
    icon: "/icon.png",
  },
  description: "Portfolio Website",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
   <html lang="en" className="overflow-x-hidden">
      <body>
        <Constellation />

        <Navbar />

        <main className="relative z-10">
          {children}
          
<Footer />
        </main>
      </body>
    </html>
  );
}