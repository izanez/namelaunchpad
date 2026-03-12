import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Rajdhani, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { AdSenseScript } from "@/components/ads/adsense-script";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import type { ReactNode } from "react";
import { absoluteUrl, siteConfig } from "@/app/metadata";

const bodyFont = Rajdhani({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "NameLaunchpad",
    "username generator",
    "AI username generator",
    "gamer tag generator",
    "name generators",
    "fortnite name generator",
    "roblox username generator",
    "clan name generator",
    "social media usernames",
  ],
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    type: "website",
    url: absoluteUrl("/"),
    siteName: siteConfig.name,
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: "NameLaunchpad social preview",
      },
    ],
  },
  alternates: {
    canonical: "/",
  },
  verification: siteConfig.googleSiteVerification
    ? {
        google: siteConfig.googleSiteVerification,
      }
    : undefined,
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.description,
    images: [absoluteUrl("/twitter-image")],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${displayFont.variable} relative`}>
        <AdSenseScript />
        <div className="noise-overlay" />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
