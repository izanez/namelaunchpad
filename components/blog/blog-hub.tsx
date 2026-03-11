"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { BlogArticleCard } from "@/components/blog/blog-article-card";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { BlogArticleSummary, BlogCategorySummary } from "@/lib/blog-hub";

const PAGE_SIZE = 18;

type BlogHubProps = {
  title: string;
  eyebrow: string;
  description: string;
  path: string;
  articles: BlogArticleSummary[];
  featuredArticles: BlogArticleSummary[];
  newestArticles: BlogArticleSummary[];
  popularArticles: BlogArticleSummary[];
  categories: BlogCategorySummary[];
  activeCategory?: string;
};

export function BlogHub({
  title,
  eyebrow,
  description,
  path,
  articles,
  featuredArticles,
  newestArticles,
  popularArticles,
  categories,
  activeCategory = "all",
}: BlogHubProps) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(activeCategory);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filteredArticles = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory = selectedCategory === "all" || article.categorySlug === selectedCategory;
      if (!matchesCategory) return false;
      if (!normalized) return true;
      return (
        article.title.toLowerCase().includes(normalized) ||
        article.description.toLowerCase().includes(normalized) ||
        article.category.toLowerCase().includes(normalized) ||
        article.keywords.some((keyword) => keyword.toLowerCase().includes(normalized))
      );
    });
  }, [articles, query, selectedCategory]);

  const visibleArticles = filteredArticles.slice(0, visibleCount);
  const canLoadMore = visibleCount < filteredArticles.length;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: title }]} />

      <div className="grid gap-6">
        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-r from-cyan-500/16 via-blue-500/12 to-purple-500/16 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">{eyebrow}</p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">{title}</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">{description}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href="/blog" className="rounded-xl2 border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:border-cyan-200/60 hover:text-white">
                Blog
              </Link>
              <Link href="/guides" className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300/30 hover:text-cyan-200">
                Guides
              </Link>
              <Link href="/articles" className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300/30 hover:text-cyan-200">
                Articles
              </Link>
              {path !== "/blog" ? (
                <Link href="/blog" className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300/30 hover:text-cyan-200">
                  View Full Blog Hub
                </Link>
              ) : null}
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-3">
          <Card className="p-6">
            <h2 className="text-2xl font-black text-white">Featured Articles</h2>
            <div className="mt-5 grid gap-4">
              {featuredArticles.slice(0, 4).map((article) => (
                <BlogArticleCard key={`featured-${article.slug}`} article={article} />
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-black text-white">Newest Articles</h2>
            <div className="mt-5 grid gap-4">
              {newestArticles.slice(0, 4).map((article) => (
                <BlogArticleCard key={`new-${article.slug}`} article={article} />
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-black text-white">Popular Articles</h2>
            <div className="mt-5 grid gap-4">
              {popularArticles.slice(0, 4).map((article) => (
                <BlogArticleCard key={`popular-${article.slug}`} article={article} />
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6 md:p-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">All SEO Articles</h2>
              <p className="mt-2 text-sm text-slate-400">Search, filter by category, and load more without leaving the hub.</p>
            </div>
            <div className="w-full max-w-md">
              <input
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                placeholder="Search articles, topics, platforms, or keywords"
                className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              />
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedCategory("all");
                setVisibleCount(PAGE_SIZE);
              }}
              className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                selectedCategory === "all"
                  ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
                  : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/30 hover:text-cyan-200"
              }`}
            >
              All Categories
            </button>
            {categories.map((category) => (
              <button
                key={category.slug}
                type="button"
                onClick={() => {
                  setSelectedCategory(category.slug);
                  setVisibleCount(PAGE_SIZE);
                }}
                className={`rounded-full border px-3 py-1 text-xs font-semibold transition ${
                  selectedCategory === category.slug
                    ? "border-cyan-300/35 bg-cyan-300/10 text-cyan-100"
                    : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/30 hover:text-cyan-200"
                }`}
              >
                {category.label} ({category.count})
              </button>
            ))}
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {visibleArticles.map((article) => (
              <BlogArticleCard key={article.slug} article={article} />
            ))}
          </div>

          {filteredArticles.length === 0 ? <p className="mt-6 text-sm text-slate-400">No articles match the current search and category filter.</p> : null}

          {canLoadMore ? (
            <div className="mt-6 flex justify-center">
              <Button onClick={() => setVisibleCount((current) => current + PAGE_SIZE)} className="px-5 py-3 text-sm">
                Load More Articles
              </Button>
            </div>
          ) : null}
        </Card>
      </div>
    </section>
  );
}
