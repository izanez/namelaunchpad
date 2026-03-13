import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getIntentNextPages } from "@/lib/intent-navigation";
import { getIntentTemplatePage, intentTemplateSlugs } from "@/lib/intent-template-pages";
import { createSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return intentTemplateSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getIntentTemplatePage(slug);
  if (!page) {
    return createSeoMetadata({
      title: "Intent Username Page",
      description: "Intent page for usernames.",
      path: `/intent/${slug}`,
    });
  }
  return createSeoMetadata({
    title: page.seoTitle,
    description: page.description,
    path: `/intent/${slug}`,
    keywords: page.keywords,
  });
}

export default async function IntentTemplateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getIntentTemplatePage(slug);
  if (!page) notFound();

  const nextPages = getIntentNextPages(page.keywords, `/intent/${page.slug}`, 6);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <h1 className="text-3xl font-black text-white md:text-4xl">{page.title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">{page.intro}</p>
        <Link href={`/username-generator?keywords=${encodeURIComponent(page.keywords.slice(0, 3).join(","))}#generator`} className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          Open in generator {"->"}
        </Link>
      </Card>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {page.examples.map((name, index) => (
          <Card key={`${name}-${index}`} className="p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
            <p className="mt-2 text-base font-bold text-white">{name}</p>
          </Card>
        ))}
      </div>

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
