import type { Metadata } from "next";
import { GeneratorPage } from "@/components/generator/generator-page";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createFaqSchema, createGeneratorSchema, createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Clan Name Generator - Team and Gaming Clan Names",
  description:
    "Generate powerful clan names for gaming teams, communities, squads, esports groups, and Discord communities with NameLaunchpad.",
  path: "/clan-name-generator",
  keywords: ["clan name generator", "team name generator", "gaming clan names", "esports team names", "squad name ideas"],
});

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
      <JsonLd
        data={createFaqSchema([
          {
            question: "What makes a strong clan name?",
            answer:
              "A strong clan name is easy to repeat, looks organized, and gives the group a shared identity that can work in game lobbies, Discord servers, tournament lists, and social bios.",
          },
          {
            question: "Should clan names be short or dramatic?",
            answer:
              "Both can work, but the best clan names usually balance force and readability so they are memorable without becoming hard to say or type.",
          },
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
        faqItems={[
          {
            question: "Can a clan name also work as a creator community name?",
            answer:
              "Yes. The strongest clan names are flexible enough to work for gaming teams, Discord communities, social profiles, and creator-led squads.",
          },
          {
            question: "How do you avoid a generic team name?",
            answer:
              "Use a clear group identity, avoid overused filler words, and choose a name that still sounds distinct when you see it outside the generator.",
          },
        ]}
      />
      <RelatedGenerators currentSlug="clan-name-generator" />
    </>
  );
}


