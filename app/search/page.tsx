import type { Metadata } from "next";
import { absoluteUrl } from "@/app/metadata";
import { GeneratorSearch } from "@/components/generator/generator-search";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createFaqSchema, createGeneratorSchema, createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Search Generators",
  description:
    "Search NameLaunchpad generator pages instantly for Fortnite, anime, cool usernames, short names, clan tags, and more.",
  path: "/search",
  keywords: ["search generators", "Fortnite generator", "anime usernames", "cool usernames", "clan names"],
});

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
      <JsonLd
        data={createFaqSchema([
          {
            question: "What can you search on NameLaunchpad?",
            answer:
              "You can search generator pages by game, platform, username style, name category, or niche themes such as short usernames, anime usernames, clan names, and streamer handles.",
          },
          {
            question: "Why use the global search page instead of browsing manually?",
            answer:
              "The search page helps you jump directly into the most relevant generator or landing page when you already know the topic you want, which is faster than browsing every category manually.",
          },
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
