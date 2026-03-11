import type { Metadata } from "next";
import { OgUsernameEngine } from "@/components/generator/og-username-engine";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "OG Username Finder - Rare Short Usernames",
  description: "Find rare short usernames with 4 to 5 characters for clean OG-style gamer tags and social handles.",
  keywords: ["OG username finder", "rare usernames", "short usernames", "4 letter usernames", "5 letter usernames"],
  openGraph: {
    title: "OG Username Finder - Rare Short Usernames",
    description: "Generate rare short usernames with 4 to 5 characters.",
    type: "website",
  },
  alternates: {
    canonical: "/og-username-finder",
  },
};

export default function OgUsernameFinderPage() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "OG Username Finder",
          description: "Generate rare short usernames with 4 to 5 characters for clean OG-style handles.",
          url: absoluteUrl("/og-username-finder"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "OG Username Finder", path: "/og-username-finder" },
        ])}
      />
      <OgUsernameEngine />
      <SeoContent
        title="OG Username Finder for Rare Short Names"
        intro="Short usernames are some of the hardest names to find because clean 4 and 5 character handles are memorable, flexible, and visually strong across gaming and social platforms. This tool focuses on ultra-short OG-style naming patterns instead of long combined words."
        sections={[
          {
            heading: "Why Short Usernames Feel Premium",
            body: "Rare short usernames stand out because they are easy to scan, easy to remember, and look clean in profiles, lobbies, clips, and bios. Names like Nova, Zyro, Xeno, Vyre, and Kiro feel compact without looking random or cluttered.",
          },
          {
            heading: "How to Pick a Good OG Name",
            body: "The best OG-style usernames usually balance readability with rarity. Aim for 4 to 5 characters, avoid extra numbers when possible, and choose names that still sound natural when spoken out loud.",
          },
        ]}
        internalLinks={[
          { href: "/username-generator", label: "Username Generator" },
          { href: "/gamer-tag-generator", label: "NameLaunchpad" },
          { href: "/generators/cool-username-generator", label: "Cool Username Generator" },
          { href: "/top-usernames", label: "Top Usernames" },
        ]}
      />
      <RelatedGenerators currentSlug="og-username-finder" />
    </>
  );
}
