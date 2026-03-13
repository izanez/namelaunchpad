import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { comparisonIntentSlugs, getComparisonIntentPage } from "@/lib/comparison-intents";
import { getIntentNextPages } from "@/lib/intent-navigation";
import { createSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return comparisonIntentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getComparisonIntentPage(slug);

  if (!page) {
    return createSeoMetadata({
      title: "Username Comparison",
      description: "Comparison-intent page.",
      path: `/compare/${slug}`,
      keywords: ["username comparison"],
    });
  }

  return createSeoMetadata({
    title: page.seoTitle,
    description: page.description,
    path: `/compare/${page.slug}`,
    keywords: [page.title, "comparison intent", "username strategy", "NameLaunchpad"],
  });
}

export default async function ComparisonDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getComparisonIntentPage(slug);
  if (!page) notFound();

  const nextPages = getIntentNextPages(page.intent, `/compare/${page.slug}`, 6);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wide text-cyan-300">Comparison</p>
        <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">{page.title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">{page.intro}</p>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white">{page.left.label}</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-200">
            {page.left.strengths.map((item) => (
              <li key={`${page.left.label}-${item}`} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-300">{page.left.fit}</p>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-white">{page.right.label}</h2>
          <ul className="mt-4 grid gap-2 text-sm text-slate-200">
            {page.right.strengths.map((item) => (
              <li key={`${page.right.label}-${item}`} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-4 text-sm text-slate-300">{page.right.fit}</p>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-bold text-white">Verdict</h2>
        <p className="mt-3 text-sm leading-7 text-slate-300">{page.verdict}</p>
        <Link href="/username-generator#generator" className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          Test this directly in the generator {"->"}
        </Link>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-bold text-white">FAQ</h2>
        <div className="mt-4 grid gap-4">
          {page.faq.map((item) => (
            <div key={item.q}>
              <h3 className="text-sm font-semibold text-white">{item.q}</h3>
              <p className="mt-1 text-sm text-slate-300">{item.a}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-bold text-white">Next Best Pages</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {nextPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/45 hover:text-cyan-100"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
