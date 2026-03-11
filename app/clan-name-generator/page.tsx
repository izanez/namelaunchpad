import type { Metadata } from "next";
import { GeneratorPage } from "@/components/generator/generator-page";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Clan Name Generator - Team and Gaming Clan Names",
  description: "Generate powerful clan names for gaming teams, communities, squads, and esports groups.",
  keywords: ["clan name generator", "team name generator", "gaming clan names", "esports team names"],
  openGraph: {
    title: "Clan Name Generator - Team and Gaming Clan Names",
    description: "Generate powerful clan names for gaming teams, communities, and squads.",
    type: "website",
  },
  alternates: {
    canonical: "/clan-name-generator",
  },
};

export default function ClanGenerator() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Clan Name Generator",
          description: "Generate team names and clan names for squads, esports groups, and communities.",
          url: absoluteUrl("/clan-name-generator"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Clan Name Generator", path: "/clan-name-generator" },
        ])}
      />
      <GeneratorPage
        type="clan"
        title="Clan Name Generator"
        description="Create bold clan names that feel competitive, iconic, and team-ready."
      />
      <SeoContent
        title="Clan Name Generator for Teams and Communities"
        intro="A strong clan name gives your group a clear identity. Whether you are building a casual squad, competitive roster, or creator community, the right name should feel cohesive, memorable, and easy to repeat."
        sections={[
          {
            heading: "How to Choose a Clan Name",
            body: "Good clan names are usually short, high-contrast, and built around strong group nouns. Words like legion, syndicate, brotherhood, raiders, and wolves feel organized and competitive without being hard to remember.",
          },
          {
            heading: "Best Uses for Clan Names",
            body: "Clan names work across multiplayer teams, Discord servers, creator communities, and tournament rosters. A flexible name makes it easier to reuse the same branding across games and social platforms.",
          },
        ]}
        internalLinks={[
          { href: "/discord-name-generator", label: "Discord Name Generator" },
          { href: "/valorant-name-generator", label: "Valorant Name Generator" },
          { href: "/fortnite-name-generator", label: "Fortnite Name Generator" },
          { href: "/gamer-tag-generator", label: "NameLaunchpad" },
        ]}
      />
      <RelatedGenerators currentSlug="clan-name-generator" />
    </>
  );
}


