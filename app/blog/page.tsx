import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Card } from "@/components/ui/card";
import { absoluteUrl } from "@/app/metadata";
import { JsonLd } from "@/components/seo/json-ld";
import { blogArticles } from "@/lib/blog-articles";
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
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
        <div className="grid gap-6">
          <Card className="overflow-hidden p-0">
            <div className="bg-gradient-to-r from-cyan-500/16 via-blue-500/12 to-purple-500/16 p-6 md:p-8">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Content Hub</p>
              <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">NameLaunchpad Blog</h1>
              <p className="mt-4 max-w-4xl text-sm leading-7 text-slate-300">
                Explore long-form guides for Fortnite usernames, Roblox names, rare gamer tags, aesthetic usernames,
                streamer branding, and practical username strategy across gaming and social platforms.
              </p>
            </div>
          </Card>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {blogArticles.map((article) => (
              <Link key={article.slug} href={`/blog/${article.slug}`}>
                <Card className="h-full p-5 transition hover:border-cyan-300/30">
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">{article.category}</p>
                  <h2 className="mt-3 text-xl font-bold text-white">{article.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{article.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {article.keywords.slice(0, 4).map((keyword) => (
                      <span key={`${article.slug}-${keyword}`} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
