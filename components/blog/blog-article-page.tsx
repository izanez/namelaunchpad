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
import { generateUsernames } from "@/lib/generators";

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

function buildTryGeneratorBatch(article: BlogArticle) {
  return generateUsernames({
    keywords: article.examplesSeed,
    style: article.style,
    amount: 12,
    length: article.maxLength,
    minLength: article.minLength,
    maxLength: article.maxLength,
  });
}

export function BlogArticlePage({ article }: { article: BlogArticle }) {
  const [toast, setToast] = useState<string | null>(null);
  const [generatorBatch, setGeneratorBatch] = useState<string[]>(() => buildTryGeneratorBatch(article));
  const sections = useMemo(() => buildBlogArticleSections(article), [article]);
  const examples = useMemo(() => buildBlogArticleExamples(article), [article]);
  const relatedArticles = useMemo(() => getRelatedBlogArticles(article, 6), [article]);

  const onCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast("Username copied.");
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }
  }, []);

  const regenerate = useCallback(() => {
    setGeneratorBatch(buildTryGeneratorBatch(article));
  }, [article]);

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
              <h2 className="text-2xl font-black text-white">Relevant Username Ideas</h2>
              <p className="mt-2 text-sm text-slate-400">Every article now includes a larger filtered list of relevant usernames for the exact topic.</p>
            </div>
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">{examples.length} ideas</span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-white">Try the Generator</h2>
              <p className="mt-2 text-sm text-slate-400">Quick in-article preview results let users test the naming style before opening the full generator tool.</p>
            </div>
            <Button onClick={regenerate} className="px-4 py-2 text-sm">
              Generate More
            </Button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {generatorBatch.map((name) => (
              <div key={name} className="rounded-2xl border border-cyan-300/20 bg-cyan-400/5 px-3 py-3">
                <p className="text-sm font-semibold text-white">{name}</p>
                <Button variant="ghost" className="mt-2 w-full px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                  Copy
                </Button>
              </div>
            ))}
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href={article.ctaHref} className="rounded-xl2 border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:border-cyan-200/60 hover:text-white">
              Open Full Generator
            </Link>
            <Link href="/username-generator" className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300/30 hover:text-cyan-200">
              Try Main Username Generator
            </Link>
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

        <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-white">Relevant Generator Pages</h2>
            <p className="mt-2 text-sm text-slate-400">Each article surfaces 3 to 8 closely related tools to improve crawl depth and user flow.</p>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {article.relatedGenerators.map((href) => (
                <Link key={href} href={href} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:text-cyan-200">
                  {getLinkLabel(href)}
                </Link>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-white">Related Username Ideas</h2>
            <p className="mt-2 text-sm text-slate-400">These filtered lists keep users inside the naming cluster around this article topic.</p>
            <div className="mt-5 grid gap-3">
              {article.relatedUsernameLists.map((href) => (
                <Link key={href} href={href} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/30 hover:text-cyan-200">
                  {getLinkLabel(href)}
                </Link>
              ))}
            </div>
          </Card>
        </div>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">Call to Action</h2>
          <div className="mt-5 rounded-3xl border border-cyan-300/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 p-6">
            <h3 className="text-xl font-bold text-white">Generate more names that match this style</h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              If this article narrowed your taste, the next step is to open the generator and keep iterating with clearer style and length filters. That gives you faster feedback than browsing generic name dumps.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link href={article.ctaHref} className="rounded-xl2 border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm font-semibold text-cyan-100 hover:border-cyan-200/60 hover:text-white">
                Try the Generator
              </Link>
              <Link href="/all-generators" className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-cyan-300/30 hover:text-cyan-200">
                Browse All Generators
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">Related Articles</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
