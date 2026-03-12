import type { Metadata } from "next";
import { FortniteEngine } from "@/components/generator/fortnite-engine";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createFaqSchema, createGeneratorSchema, createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Fortnite Name Generator - Cool Fortnite Gamertags",
  description:
    "Generate cool Fortnite gamertags, sweaty usernames, and battle-ready name ideas with 30 unique names per click on NameLaunchpad.",
  path: "/fortnite-name-generator",
  keywords: ["Fortnite name generator", "Fortnite gamertags", "cool Fortnite names", "Fortnite usernames", "sweaty Fortnite names"],
});

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
      <JsonLd
        data={createFaqSchema([
          {
            question: "What makes a good Fortnite username?",
            answer:
              "Good Fortnite usernames feel quick, competitive, and readable. They often use battle royale language like storm, loot, edits, sniper, victory, or movement themes.",
          },
          {
            question: "Should a Fortnite name also work on Twitch or TikTok?",
            answer:
              "Yes. If you stream or post clips, a Fortnite name is stronger when it still works as a creator handle on Twitch, TikTok, Discord, or YouTube.",
          },
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
        faqItems={[
          {
            question: "Are sweaty Fortnite names better than clean ones?",
            answer:
              "Not always. Sweaty names can feel competitive, but clean names often age better and work more easily across gaming and creator platforms.",
          },
          {
            question: "How do you choose a Fortnite gamertag you can keep?",
            answer:
              "Pick a name that still looks strong in a clip title, a squad list, and a creator profile instead of only sounding good for one season or meme.",
          },
        ]}
      />
      <RelatedGenerators currentSlug="fortnite-name-generator" />
    </>
  );
}


