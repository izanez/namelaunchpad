import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/app/metadata";
import { BlogHub } from "@/components/blog/blog-hub";
import { JsonLd } from "@/components/seo/json-ld";
import {
  blogArticleSummaries,
  blogCategorySlugs,
  blogCategorySummaries,
  getBlogArticlesByCategory,
  getBlogCategory,
  getFeaturedBlogArticles,
  getNewestBlogArticles,
  getPopularBlogArticles,
} from "@/lib/blog-hub";
import { createBreadcrumbSchema } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogCategorySlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) return {};

  return {
    title: `${category.label} Articles - NameLaunchpad`,
    description: `Browse ${category.label.toLowerCase()} articles, guides, and naming tips on NameLaunchpad.`,
    alternates: {
      canonical: `/categories/${category.slug}`,
    },
    openGraph: {
      title: `${category.label} Articles - NameLaunchpad`,
      description: `Browse ${category.label.toLowerCase()} articles, guides, and naming tips on NameLaunchpad.`,
      type: "website",
      url: absoluteUrl(`/categories/${category.slug}`),
    },
  };
}

export default async function BlogCategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getBlogCategory(slug);
  if (!category) notFound();

  const categoryArticles = getBlogArticlesByCategory(slug);
  const featuredArticles = getFeaturedBlogArticles().filter((article) => article.categorySlug === slug);
  const newestArticles = getNewestBlogArticles().filter((article) => article.categorySlug === slug);
  const popularArticles = getPopularBlogArticles().filter((article) => article.categorySlug === slug);

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Categories", path: "/blog" },
          { name: category.label, path: `/categories/${category.slug}` },
        ])}
      />
      <BlogHub
        title={`${category.label} Articles`}
        eyebrow="Category"
        description={`Explore ${category.label.toLowerCase()} articles, guides, and platform-specific naming advice linked to the main generator tools.`}
        path={`/categories/${category.slug}`}
        articles={categoryArticles}
        featuredArticles={featuredArticles.length > 0 ? featuredArticles : getFeaturedBlogArticles(4)}
        newestArticles={newestArticles.length > 0 ? newestArticles : blogArticleSummaries.slice(0, 4)}
        popularArticles={popularArticles.length > 0 ? popularArticles : getPopularBlogArticles(4)}
        categories={blogCategorySummaries}
        activeCategory={slug}
      />
    </>
  );
}
