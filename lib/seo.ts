import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/app/metadata";
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
    "@graph": [
      {
        "@type": "WebApplication",
        name: title,
        description,
        url,
        applicationCategory: category,
        operatingSystem: "Any",
        isAccessibleForFree: true,
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
      {
        "@type": "SoftwareApplication",
        name: title,
        description,
        url,
        applicationCategory: category,
        operatingSystem: "Any",
        isAccessibleForFree: true,
        publisher: {
          "@type": "Organization",
          name: siteConfig.name,
          url: siteConfig.url,
        },
      },
    ],
  };
}

function buildGeneratorSeoTitle(entry: GeneratorDirectoryEntry) {
  if (entry.slug === "fortnite-name-generator") {
    return "Fortnite Name Generator - Cool Fortnite Names";
  }

  if (entry.slug === "gamer-tag-generator") {
    return "NameLaunchpad - Cross-Platform Username Ideas";
  }

  if (entry.title.toLowerCase().includes("username generator")) {
    return `${entry.title} - Unique Username Ideas`;
  }

  return `${entry.title} - ${siteConfig.name}`;
}

export function createGeneratorMetadata(entry: GeneratorDirectoryEntry, path: string): Metadata {
  const url = absoluteUrl(path);
  const title = buildGeneratorSeoTitle(entry);

  return {
    title,
    description: entry.description,
    keywords: [
      entry.slug,
      entry.title.toLowerCase(),
      `${entry.category} username generator`,
      `${entry.category} name generator`,
      "NameLaunchpad",
      "username ideas",
    ],
    openGraph: {
      title,
      description: entry.description,
      type: "website",
      url,
      siteName: siteConfig.name,
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
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    potentialAction: {
      "@type": "SearchAction",
      target: `${absoluteUrl("/search")}?q={query}`,
      "query-input": "required name=query",
    },
  };
}

export function createWebApplicationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    isAccessibleForFree: true,
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  };
}

export function createBreadcrumbSchema(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
