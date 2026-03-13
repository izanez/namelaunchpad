import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/app/metadata";
import { UsernameDatabaseBrowser } from "@/components/username-database/username-database-browser";
import { JsonLd } from "@/components/seo/json-ld";
import { SmartInternalLinks } from "@/components/seo/smart-internal-links";
import { createBreadcrumbSchema, createFaqSchema, createGeneratorSchema, createSeoMetadata } from "@/lib/seo";
import { getSmartInternalLinkSections } from "@/lib/smart-internal-links";
import { getUsernameDatabasePage, usernameDatabasePageSlugs } from "@/lib/username-database-pages";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return usernameDatabasePageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getUsernameDatabasePage(slug);
  if (!page) return {};

  return createSeoMetadata({
    title: page.seoTitle,
    description: page.description,
    path: `/username-database/${page.slug}`,
    keywords: [...page.keywords, "username database", "NameLaunchpad"],
  });
}

export default async function UsernameDatabaseFilterPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getUsernameDatabasePage(slug);
  if (!page) notFound();

  const internalLinkSections = getSmartInternalLinkSections({
    pageType: "database",
    slug: `username-database/${page.slug}`,
    title: page.title,
    category: page.categories?.join(" "),
    style: page.styles?.[0],
    keywords: [...page.keywords, ...(page.categories ?? []), ...(page.styles ?? []), ...(page.rarities ?? []), ...(page.lengths ?? [])],
  });

  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: page.title,
          description: page.description,
          url: absoluteUrl(`/username-database/${page.slug}`),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Username Database", path: "/username-database" },
          { name: page.title, path: `/username-database/${page.slug}` },
        ])}
      />
      <JsonLd
        data={createFaqSchema([
          {
            question: `What does the ${page.title.toLowerCase()} page show?`,
            answer:
              "It turns the main username database into a fixed SEO filter page with a narrower set of usernames, stronger internal links, and a clearer naming pattern.",
          },
          {
            question: `Why use ${page.title.toLowerCase()} instead of the full database page?`,
            answer:
              "The fixed filter page is better when you already know the naming direction you want, because it removes unrelated results and makes comparison faster.",
          },
        ])}
      />

      <UsernameDatabaseBrowser
        title={page.title}
        intro={page.intro}
        heroEyebrow="Database Filter"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Username Database", href: "/username-database" },
          { label: page.title },
        ]}
        initialCategories={page.categories}
        initialStyles={page.styles}
        initialRarities={page.rarities}
        initialLengths={page.lengths}
        featuredLinks={page.featuredLinks}
      />

      <section className="mx-auto mt-8 w-full max-w-6xl px-4 pb-6 md:px-6">
        <SmartInternalLinks sections={internalLinkSections} />
      </section>
    </>
  );
}
