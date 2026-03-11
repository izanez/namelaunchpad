import type { Metadata } from "next";
import { absoluteUrl } from "@/app/metadata";
import { BlogHub } from "@/components/blog/blog-hub";
import { JsonLd } from "@/components/seo/json-ld";
import {
  blogArticleSummaries,
  blogCategorySummaries,
  getFeaturedBlogArticles,
  getNewestBlogArticles,
  getPopularBlogArticles,
} from "@/lib/blog-hub";
import { createBreadcrumbSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "NameLaunchpad Guides - Username Strategy and Naming Guides",
  description: "Browse NameLaunchpad guides for choosing better usernames, gamer tags, creator names, and platform-specific handles.",
  alternates: {
    canonical: "/guides",
  },
  openGraph: {
    title: "NameLaunchpad Guides - Username Strategy and Naming Guides",
    description: "Browse NameLaunchpad guides for choosing better usernames, gamer tags, creator names, and platform-specific handles.",
    type: "website",
    url: absoluteUrl("/guides"),
  },
};

export default function GuidesPage() {
  return (
    <>
      <JsonLd data={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Guides", path: "/guides" }])} />
      <BlogHub
        title="NameLaunchpad Guides"
        eyebrow="Guides"
        description="Read practical guides for finding names that work across games, creator branding, social handles, and streaming channels."
        path="/guides"
        articles={blogArticleSummaries}
        featuredArticles={getFeaturedBlogArticles()}
        newestArticles={getNewestBlogArticles()}
        popularArticles={getPopularBlogArticles()}
        categories={blogCategorySummaries}
      />
    </>
  );
}
