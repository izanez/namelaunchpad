import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogArticlePage } from "@/components/blog/blog-article-page";
import { JsonLd } from "@/components/seo/json-ld";
import { blogArticleSlugs, getBlogArticle } from "@/lib/blog-articles";
import { createArticleSchema, createBreadcrumbSchema, createFaqSchema, createSeoMetadata } from "@/lib/seo";

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

  return createSeoMetadata({
    title: `${article.title} - ${article.category} Ideas by NameLaunchpad`,
    description: article.description,
    path: `/blog/${article.slug}`,
    keywords: article.keywords,
    type: "article",
  });
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
      <JsonLd
        data={createArticleSchema({
          title: article.title,
          description: article.description,
          path: `/blog/${article.slug}`,
          keywords: article.keywords,
          section: article.category,
        })}
      />
      <JsonLd
        data={createFaqSchema([
          {
            question: `What makes ${article.title.toLowerCase()} useful?`,
            answer:
              "The best article pages do more than list names. They explain which naming patterns fit the topic, show relevant examples, and link directly to generators and related pages for deeper exploration.",
          },
          {
            question: `How should you pick a name from ${article.title.toLowerCase()}?`,
            answer:
              "Focus on readability, tone, and reuse. A strong name should still work in a profile, stream title, chat list, or social handle instead of only looking good inside one article list.",
          },
        ])}
      />
      <BlogArticlePage article={article} />
    </>
  );
}
