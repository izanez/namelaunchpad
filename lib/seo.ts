import type { Metadata } from "next";
import { absoluteUrl, siteConfig } from "@/app/metadata";
import type { GeneratorDirectoryEntry } from "@/lib/generators";

type SeoMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  type?: "website" | "article";
};

type FaqItem = {
  question: string;
  answer: string;
};

function buildSocialImageUrl({
  title,
  description,
  type,
  keywords = [],
}: {
  title: string;
  description: string;
  type: "website" | "article";
  keywords?: string[];
}) {
  const params = new URLSearchParams({
    title,
    subtitle: description,
    eyebrow: type === "article" ? "NameLaunchpad Guide" : "NameLaunchpad Generator",
  });

  if (keywords.length > 0) {
    params.set("chips", keywords.slice(0, 4).join(","));
  }

  return absoluteUrl(`/api/og?${params.toString()}`);
}

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

export function createSeoMetadata({
  title,
  description,
  path,
  keywords = [],
  type = "website",
}: SeoMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = buildSocialImageUrl({ title, description, type, keywords });

  return {
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      type,
      url,
      siteName: siteConfig.name,
      locale: "en_US",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} social preview`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
  const title = buildGeneratorSeoTitle(entry);

  return createSeoMetadata({
    title,
    description: entry.description,
    path,
    keywords: [
      entry.slug,
      entry.title.toLowerCase(),
      `${entry.category} username generator`,
      `${entry.category} name generator`,
      "NameLaunchpad",
      "username ideas",
    ],
  });
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

export function createFaqSchema(items: FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function createArticleSchema({
  title,
  description,
  path,
  keywords = [],
  section,
}: {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  section?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: absoluteUrl(path),
    mainEntityOfPage: absoluteUrl(path),
    articleSection: section,
    keywords: keywords.join(", "),
    isAccessibleForFree: true,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    image: [absoluteUrl("/opengraph-image")],
  };
}
