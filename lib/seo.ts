import type { Metadata } from "next";
import type { GeneratorDirectoryEntry } from "@/lib/generators";

export function createGeneratorSchema({
  title,
  description,
  url,
  category,
}: {
  title: string;
  description: string;
  url: string;
  category: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: title,
    description,
    url,
    applicationCategory: category,
    operatingSystem: "Any",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: "GamertagForge",
      url: "https://gamertagforge.com",
    },
  };
}

function buildGeneratorSeoTitle(entry: GeneratorDirectoryEntry) {
  if (entry.slug === "fortnite-name-generator") {
    return "Fortnite Name Generator - Cool Fortnite Gamertags";
  }

  if (entry.title.toLowerCase().includes("username generator")) {
    return `${entry.title} - Unique Username Ideas`;
  }

  if (entry.title.toLowerCase().includes("gamertag")) {
    return `${entry.title} - Gamer Tags for Every Platform`;
  }

  return `${entry.title} - GamertagForge`;
}

export function createGeneratorMetadata(entry: GeneratorDirectoryEntry, path: string): Metadata {
  const absoluteUrl = `https://gamertagforge.com${path}`;
  const title = buildGeneratorSeoTitle(entry);

  return {
    title,
    description: entry.description,
    keywords: [
      entry.slug,
      entry.title.toLowerCase(),
      `${entry.category} username generator`,
      `${entry.category} name generator`,
      "gamertag generator",
      "username ideas",
    ],
    openGraph: {
      title,
      description: entry.description,
      type: "website",
      url: absoluteUrl,
      siteName: "GamertagForge",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: entry.description,
    },
    alternates: {
      canonical: path,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-snippet": -1,
        "max-image-preview": "large",
        "max-video-preview": -1,
      },
    },
  };
}

export function createWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "GamertagForge",
    url: "https://gamertagforge.com",
    description:
      "GamertagForge helps gamers generate usernames, gamer tags, clan names, and fantasy names for social media and games.",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://gamertagforge.com/username-generator",
      "query-input": "required name=query",
    },
  };
}
