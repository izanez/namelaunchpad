import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { getIntentCluster, intentClusterSlugs } from "@/lib/intent-clusters";
import { createSeoMetadata } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export function generateStaticParams() {
  return intentClusterSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const cluster = getIntentCluster(slug);
  if (!cluster) {
    return createSeoMetadata({
      title: "Collection",
      description: "Collection page",
      path: `/collections/${slug}`,
      keywords: ["username collection"],
    });
  }

  return createSeoMetadata({
    title: cluster.seoTitle,
    description: cluster.description,
    path: `/collections/${cluster.slug}`,
    keywords: [cluster.title, "username collection", "name ideas", "username generator"],
  });
}

export default async function CollectionDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const cluster = getIntentCluster(slug);
  if (!cluster) notFound();

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <h1 className="text-3xl font-black text-white md:text-4xl">{cluster.title}</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">{cluster.intro}</p>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-bold text-white">Examples</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {cluster.examples.map((name) => (
              <span
                key={name}
                className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100"
              >
                {name}
              </span>
            ))}
          </div>
          <Link href={cluster.generatorLink} className="mt-5 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            Open Generator {"->"}
          </Link>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-bold text-white">FAQ</h2>
          <div className="mt-4 grid gap-4">
            {cluster.faq.map((item) => (
              <div key={item.q}>
                <h3 className="text-sm font-semibold text-white">{item.q}</h3>
                <p className="mt-1 text-sm text-slate-300">{item.a}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-bold text-white">Related Paths</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-3">
          {cluster.relatedLinks.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/45 hover:text-cyan-100"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
