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
  title: "NameLaunchpad Blog - Username Ideas, Naming Tips, and SEO Guides",
  description:
    "Browse the NameLaunchpad blog for username ideas, gamer tag guides, naming tips, and SEO articles linked to the best generator pages.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "NameLaunchpad Blog - Username Ideas, Naming Tips, and SEO Guides",
    description:
      "Browse the NameLaunchpad blog for username ideas, gamer tag guides, naming tips, and SEO articles linked to the best generator pages.",
    type: "website",
    url: absoluteUrl("/blog"),
  },
};

export default function BlogIndexPage() {
  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
        ])}
      />
      <BlogHub
        title="NameLaunchpad Blog"
        eyebrow="Content Hub"
        description="Explore long-form guides for Fortnite usernames, Roblox names, rare gamer tags, aesthetic usernames, streamer branding, and practical username strategy across gaming and social platforms."
        path="/blog"
        articles={blogArticleSummaries}
        featuredArticles={getFeaturedBlogArticles()}
        newestArticles={getNewestBlogArticles()}
        popularArticles={getPopularBlogArticles()}
        categories={blogCategorySummaries}
      />
    </>
  );
}
