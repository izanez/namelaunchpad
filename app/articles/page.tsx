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
  title: "NameLaunchpad Articles - SEO Articles for Usernames and Gamer Tags",
  description: "Browse NameLaunchpad articles covering gamer tags, rare usernames, platform-specific names, and naming tips for creators.",
  alternates: {
    canonical: "/articles",
  },
  openGraph: {
    title: "NameLaunchpad Articles - SEO Articles for Usernames and Gamer Tags",
    description: "Browse NameLaunchpad articles covering gamer tags, rare usernames, platform-specific names, and naming tips for creators.",
    type: "website",
    url: absoluteUrl("/articles"),
  },
};

export default function ArticlesPage() {
  return (
    <>
      <JsonLd data={createBreadcrumbSchema([{ name: "Home", path: "/" }, { name: "Articles", path: "/articles" }])} />
      <BlogHub
        title="NameLaunchpad Articles"
        eyebrow="Articles"
        description="Browse SEO-focused articles covering platform names, cool usernames, clan names, rare tags, and naming strategy for long-term branding."
        path="/articles"
        articles={blogArticleSummaries}
        featuredArticles={getFeaturedBlogArticles()}
        newestArticles={getNewestBlogArticles()}
        popularArticles={getPopularBlogArticles()}
        categories={blogCategorySummaries}
      />
    </>
  );
}
