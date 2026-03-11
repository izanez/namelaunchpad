import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/app/metadata";
import { BlogArticlePage } from "@/components/blog/blog-article-page";
import { JsonLd } from "@/components/seo/json-ld";
import { blogArticleSlugs, getBlogArticle } from "@/lib/blog-articles";
import { createBreadcrumbSchema } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return blogArticleSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) return {};

  return {
    title: `${article.title} - NameLaunchpad`,
    description: article.description,
    keywords: article.keywords,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: `${article.title} - NameLaunchpad`,
      description: article.description,
      type: "article",
      url: absoluteUrl(`/blog/${article.slug}`),
    },
  };
}

export default async function BlogArticleRoute({ params }: PageProps) {
  const { slug } = await params;
  const article = getBlogArticle(slug);

  if (!article) notFound();

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: article.title, path: `/blog/${article.slug}` },
        ])}
      />
      <BlogArticlePage article={article} />
    </>
  );
}
