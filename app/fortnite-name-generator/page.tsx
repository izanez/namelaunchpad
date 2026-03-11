import type { Metadata } from "next";
import { FortniteEngine } from "@/components/generator/fortnite-engine";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fortnite Name Generator - Cool Fortnite Gamertags",
  description: "Generate cool Fortnite gamertags with 30 unique names per click.",
  keywords: ["Fortnite name generator", "Fortnite gamertags", "cool Fortnite names", "Fortnite usernames"],
  openGraph: {
    title: "Fortnite Name Generator - Cool Fortnite Gamertags",
    description: "Generate cool Fortnite gamertags with battle-ready name ideas.",
    type: "website",
  },
  alternates: {
    canonical: "/fortnite-name-generator",
  },
};

export default function FortniteGenerator() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Fortnite Name Generator",
          description: "Generate cool Fortnite gamertags, sweaty usernames, and battle-ready aliases.",
          url: absoluteUrl("/fortnite-name-generator"),
          category: "GameApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Fortnite Name Generator", path: "/fortnite-name-generator" },
        ])}
      />
      <FortniteEngine />
      <SeoContent
        title="Fortnite Name Generator for Sweaty and Clean Tags"
        intro="Fortnite players often want short, sharp names that feel competitive in-game and readable on clips, streams, and social profiles. This generator creates battle-ready ideas using familiar Fortnite terms and naming patterns."
        sections={[
          {
            heading: "What Makes a Good Fortnite Name",
            body: "The best Fortnite names are easy to read and instantly recognizable in a lobby, montage, or stream title. Strong names usually lean into themes like storm, loot, victory, edits, sniping, and movement.",
          },
          {
            heading: "How to Choose a Fortnite Gamertag",
            body: "Pick a name that works both in-game and on creator platforms. If you post clips or stream, a short and memorable tag will be easier for other players to remember and search for later.",
          },
        ]}
        internalLinks={[
          { href: "/valorant-name-generator", label: "Valorant Name Generator" },
          { href: "/twitch-username-generator", label: "Twitch Username Generator" },
          { href: "/username-generator", label: "Username Generator" },
          { href: "/gamer-tag-generator", label: "NameLaunchpad" },
        ]}
      />
      <RelatedGenerators currentSlug="fortnite-name-generator" />
    </>
  );
}


