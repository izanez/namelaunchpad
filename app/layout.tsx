import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  metadataBase: new URL("https://gamertagforge.com"),
  title: {
    default: "GamertagForge | Premium Username & Gamer Tag Generator",
    template: "%s | GamertagForge",
  },
  description:
    "Generate unique gamer tags and usernames for Roblox, Fortnite, fantasy RPGs, and clan identities with GamertagForge.",
  keywords: [
    "gamertag generator",
    "username generator",
    "fortnite name generator",
    "roblox username generator",
    "clan name generator",
    "fantasy name generator",
  ],
  openGraph: {
    title: "GamertagForge",
    description: "Create unique gamer tags for games, streaming, and social media.",
    type: "website",
    url: "https://gamertagforge.com",
    siteName: "GamertagForge",
  },
  alternates: {
    canonical: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "GamertagForge",
    description: "Create unique gamer tags for games, streaming, and social media.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className="relative">
        <div className="noise-overlay" />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
