"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  buildBlogArticleExamples,
  buildBlogArticleSections,
  getRelatedBlogArticles,
  type BlogArticle,
} from "@/lib/blog-articles";

function renderParagraphs(body: string) {
  return body.split("\n\n").map((paragraph) => (
    <p key={paragraph.slice(0, 32)} className="text-sm leading-7 text-slate-300">
      {paragraph}
    </p>
  ));
}

function getLinkLabel(href: string) {
  return href.replace(/^\//, "").replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  const [toast, setToast] = useState<string | null>(null);
  const sections = useMemo(() => buildBlogArticleSections(article), [article]);
  const examples = useMemo(() => buildBlogArticleExamples(article), [article]);
  const relatedArticles = useMemo(() => getRelatedBlogArticles(article), [article]);

  const onCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast("Username copied.");
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: article.title }]} />

      <div className="grid gap-6">
        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-r from-cyan-500/16 via-blue-500/12 to-purple-500/16 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">{article.category}</p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">{article.title}</h1>
            <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">{article.shortIntro}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {article.keywords.slice(0, 5).map((keyword) => (
                <span key={keyword} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                  {keyword}
                </span>
              ))}
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-white">Username Examples</h2>
              <p className="mt-2 text-sm text-slate-400">Copy any example and use the linked generator pages to build more variations.</p>
            </div>
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{examples.length} ideas</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {examples.map((name) => (
              <div key={name} className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-3">
                <p className="text-sm font-semibold text-slate-100">{name}</p>
                <Button variant="ghost" className="mt-3 w-full px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                  Copy Username
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">Article Guide</h2>
          <div className="mt-6 grid gap-6">
            {sections.map((section) => (
              <div key={section.heading} className="grid gap-3">
                <h2 className="text-xl font-bold text-white">{section.heading}</h2>
                {renderParagraphs(section.body)}
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">Tips and Tools</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-cyan-300/20 bg-cyan-400/5 p-5">
              <h3 className="text-lg font-semibold text-white">Use the Generator</h3>
              <p className="mt-2 text-sm leading-7 text-slate-300">Open the related generator to create new username ideas with filters for style, length, and keywords.</p>
              <Link href={article.ctaHref} className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">Open Generator</Link>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <h3 className="text-lg font-semibold text-white">Quick naming tips</h3>
              <ul className="mt-3 grid gap-2 text-sm leading-7 text-slate-300">
                <li>Keep the base name readable before adding numbers or symbols.</li>
                <li>Prefer names that still look good in game lobbies, Discord, and social handles.</li>
                <li>Choose a style first, then tighten the length range for cleaner results.</li>
                <li>Compare a few strong options instead of committing to the first acceptable name.</li>
              </ul>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-white">Related Generators</h2>
            <div className="mt-5 grid gap-3">
              {article.relatedGenerators.map((href) => (
                <Link key={href} href={href} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:text-cyan-200">
                  {getLinkLabel(href)}
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-white">Related Username Lists</h2>
            <div className="mt-5 grid gap-3">
              {article.relatedUsernameLists.map((href) => (
                <Link key={href} href={href} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:text-cyan-200">
                  {getLinkLabel(href)}
                </Link>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">Related Articles</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {relatedArticles.map((relatedArticle) => (
              <Link key={relatedArticle.slug} href={`/blog/${relatedArticle.slug}`} className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/30">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{relatedArticle.category}</p>
                <h3 className="mt-3 text-lg font-semibold text-white">{relatedArticle.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{relatedArticle.description}</p>
              </Link>
            ))}
          </div>
        </Card>
      </div>

      {toast ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 animate-fadeUp rounded-xl2 border border-cyan-300/35 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan-100 shadow-neon backdrop-blur-xl">
          {toast}
        </div>
      ) : null}
    </section>
  );
}
