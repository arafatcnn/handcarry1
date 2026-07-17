import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "CarryBridge — Trusted Peer-to-Peer Hand-Carry Logistics",
  description: "The world's first structured, legal-first marketplace for peer-to-peer hand-carry logistics, travel sponsorship, and international item delivery. Connect travelers with senders across 180+ countries.",
  keywords: "peer to peer shipping, hand carry, travel courier, luggage space, travel sponsorship, international delivery, CarryBridge",
  openGraph: {
    title: "CarryBridge — Trusted Peer-to-Peer Hand-Carry Logistics",
    description: "Send items internationally through verified travelers. Find travelers. Get sponsored tickets. Legal, safe, global.",
    type: "website",
    url: "https://carrybridge.com",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-white text-gray-900">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
