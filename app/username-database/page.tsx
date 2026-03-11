import type { Metadata } from "next";
import { absoluteUrl } from "@/app/metadata";
import { UsernameDatabaseBrowser } from "@/components/username-database/username-database-browser";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Username Database",
  description:
    "Search the NameLaunchpad username database with more than 50,000 unique usernames filtered by category, style, rarity, and length.",
  alternates: {
    canonical: "/username-database",
  },
  openGraph: {
    title: "Username Database | NameLaunchpad",
    description:
      "Search more than 50,000 unique usernames on NameLaunchpad with filters for style, category, rarity, and length.",
    type: "website",
    url: absoluteUrl("/username-database"),
  },
};

export default function UsernameDatabasePage() {
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
      <UsernameDatabaseBrowser />
    </>
  );
}
