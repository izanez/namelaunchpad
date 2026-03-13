import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { absoluteUrl } from "@/app/metadata";
import { UsernameDetailPage } from "@/components/username-database/username-detail-page";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createFaqSchema, createSeoMetadata } from "@/lib/seo";
import { getSmartInternalLinkSections } from "@/lib/smart-internal-links";
import { getRelatedUsernameRecords, getUsernameRecordBySlug } from "@/lib/username-database";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const record = getUsernameRecordBySlug(slug);
  if (!record) return {};

  return createSeoMetadata({
    title: `${record.name} - Username Meaning, Similar Ideas, and Generator Links`,
    description: `Explore ${record.name} on NameLaunchpad with similar usernames, copy options, related generators, and category-based naming ideas.`,
    path: `/usernames/${record.slug}`,
    keywords: [
      record.name.toLowerCase(),
      `${record.style} username`,
      `${record.category} username`,
      `${record.rarity} username`,
      "username ideas",
      "NameLaunchpad",
    ],
  });
}

export default async function UsernameDetailRoute({ params }: PageProps) {
  const { slug } = await params;
  const record = getUsernameRecordBySlug(slug);
  if (!record) notFound();

  const related = getRelatedUsernameRecords(record, 20);
  const internalLinkSections = getSmartInternalLinkSections({
    pageType: "database",
    slug: `usernames/${record.slug}`,
    title: record.name,
    category: record.category,
    style: record.style,
    keywords: [record.name, ...record.tags, record.rarity, String(record.length)],
  });

  return (
    <>
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Username Database", path: "/username-database" },
          { name: record.name, path: `/usernames/${record.slug}` },
        ])}
      />
      <JsonLd
        data={createFaqSchema([
          {
            question: `What kind of username is ${record.name}?`,
            answer: `${record.name} is categorized as a ${record.style} ${record.category} username with ${record.rarity} rarity and a ${record.length}-character structure.`,
          },
          {
            question: `How should you use ${record.name} on NameLaunchpad?`,
            answer:
              "Use the detail page to compare similar names, copy the username, and jump into related generators or database filters that match the same naming direction.",
          },
        ])}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "CreativeWork",
          name: record.name,
          description: `Username detail page for ${record.name} on NameLaunchpad.`,
          url: absoluteUrl(`/usernames/${record.slug}`),
          keywords: record.tags.join(", "),
        }}
      />
      <UsernameDetailPage record={record} related={related} internalLinkSections={internalLinkSections} />
    </>
  );
}
