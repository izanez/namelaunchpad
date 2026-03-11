import type { Metadata } from "next";
import { absoluteUrl } from "@/app/metadata";
import { GeneratorSearch } from "@/components/generator/generator-search";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Search Generators",
  description:
    "Search NameLaunchpad generator pages instantly for Fortnite, anime, cool usernames, short names, clan tags, and more.",
  alternates: {
    canonical: "/search",
  },
};

type SearchPageProps = {
  searchParams?: Promise<{
    q?: string;
  }>;
};

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const resolvedSearchParams = await searchParams;
  const initialQuery = typeof resolvedSearchParams?.q === "string" ? resolvedSearchParams.q : "";

  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "NameLaunchpad Generator Search",
          description: "Search generator pages instantly across gaming, social, fantasy, and streamer username tools.",
          url: absoluteUrl("/search"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Search", path: "/search" },
        ])}
      />

      <section className="mx-auto w-full max-w-6xl animate-fadeUp px-4 py-10 md:px-6">
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Search" },
          ]}
        />
        <GeneratorSearch
          initialQuery={initialQuery}
          title="Search All Generators"
          description="Search every NameLaunchpad generator page instantly by game, style, platform, or naming theme."
          maxResults={18}
        />
      </section>
    </>
  );
}
