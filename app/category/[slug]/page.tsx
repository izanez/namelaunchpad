import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { SmartInternalLinks } from "@/components/seo/smart-internal-links";
import {
  generatorCategories,
  getGeneratorCategory,
  getGeneratorsByCategory,
  type GeneratorCategorySlug,
} from "@/lib/generators";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema } from "@/lib/seo";
import { getSmartInternalLinkSections } from "@/lib/smart-internal-links";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getCategoryPath(slug: string) {
  return `/category/${slug}`;
}

function getGeneratorPath(slug: string) {
  return `/generators/${slug}`;
}

export async function generateStaticParams() {
  return generatorCategories.map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = getGeneratorCategory(slug as GeneratorCategorySlug);
  if (!category) return {};

  return {
    title: `${category.title} Username Generators`,
    description: category.description,
    openGraph: {
      title: `${category.title} Username Generators`,
      description: category.description,
      type: "website",
      url: absoluteUrl(getCategoryPath(category.slug)),
    },
    alternates: {
      canonical: getCategoryPath(category.slug),
    },
  };
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = getGeneratorCategory(slug as GeneratorCategorySlug);
  if (!category) notFound();

  const entries = getGeneratorsByCategory(category.slug);
  const internalLinkSections = getSmartInternalLinkSections({
    pageType: "category",
    slug: category.slug,
    title: category.title,
    category: category.title,
    keywords: entries.slice(0, 5).map((entry) => entry.title),
  });

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: `${category.title} Username Generators`,
          description: category.description,
          url: absoluteUrl(getCategoryPath(category.slug)),
        }}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Categories", path: getCategoryPath(category.slug) },
          { name: category.title, path: getCategoryPath(category.slug) },
        ])}
      />
      <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-7 backdrop-blur-xl md:p-10">
          <p className="inline-flex rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-cyan-200">
            Generator Category
          </p>
          <h1 className="mt-4 text-4xl font-black text-white md:text-5xl">{category.title} Generators</h1>
          <p className="mt-4 max-w-3xl text-base leading-7 text-slate-300">{category.description}</p>
        </div>

        <section className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white md:text-3xl">Browse {category.title} Generator Pages</h2>
            <span className="text-xs uppercase tracking-wide text-slate-400">{entries.length} pages</span>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {entries.map((entry) => (
              <Card key={entry.slug} className="p-5">
                <h3 className="text-lg font-semibold text-white">{entry.title}</h3>
                <p className="mt-2 text-sm leading-7 text-slate-300">{entry.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {entry.exampleNames.slice(0, 3).map((example) => (
                    <span
                      key={example}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs text-cyan-100"
                    >
                      {example}
                    </span>
                  ))}
                </div>
                <Link
                  href={getGeneratorPath(entry.slug)}
                  className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  {"Open Generator ->"}
                </Link>
              </Card>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <SmartInternalLinks sections={internalLinkSections} />
        </section>
      </section>
    </>
  );
}


