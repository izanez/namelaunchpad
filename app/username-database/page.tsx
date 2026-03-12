import type { Metadata } from "next";
import { absoluteUrl } from "@/app/metadata";
import { UsernameDatabaseBrowser } from "@/components/username-database/username-database-browser";
import { JsonLd } from "@/components/seo/json-ld";
import { SmartInternalLinks } from "@/components/seo/smart-internal-links";
import { createBreadcrumbSchema, createFaqSchema, createGeneratorSchema, createSeoMetadata } from "@/lib/seo";
import { getSmartInternalLinkSections } from "@/lib/smart-internal-links";

export const metadata: Metadata = createSeoMetadata({
  title: "Username Database",
  description:
    "Search the NameLaunchpad username database with more than 50,000 unique usernames filtered by category, style, rarity, and length.",
  path: "/username-database",
  keywords: ["username database", "50,000 usernames", "rare usernames", "short usernames", "anime usernames"],
});

export default function UsernameDatabasePage() {
  const internalLinkSections = getSmartInternalLinkSections({
    pageType: "database",
    slug: "username-database",
    title: "Username Database",
    category: "database",
    keywords: ["username", "database", "rare", "short", "anime", "gaming"],
  });

  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "NameLaunchpad Username Database",
          description: "Search a large username database with filters for category, style, rarity, and length.",
          url: absoluteUrl("/username-database"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Username Database", path: "/username-database" },
        ])}
      />
      <JsonLd
        data={createFaqSchema([
          {
            question: "What is the NameLaunchpad username database?",
            answer:
              "It is a searchable database of more than 50,000 usernames classified by category, style, rarity, and length so users can browse names with much tighter filters than a generic generator.",
          },
          {
            question: "When should you use the username database instead of a generator?",
            answer:
              "The database is best when you want to browse and compare patterns first. The generator is better when you already know the style or theme you want to expand.",
          },
        ])}
      />
      <UsernameDatabaseBrowser />
      <section className="mx-auto mt-8 w-full max-w-6xl px-4 pb-6 md:px-6">
        <SmartInternalLinks sections={internalLinkSections} />
      </section>
    </>
  );
}
