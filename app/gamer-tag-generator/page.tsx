import type { Metadata } from "next";
import { Suspense } from "react";
import { absoluteUrl } from "@/app/metadata";
import { UsernameEngine } from "@/components/generator/username-engine";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "NameLaunchpad - Cross-Platform Username Ideas",
  description: "Use NameLaunchpad to generate cross-platform username ideas for Xbox, PlayStation, PC, Discord, Twitch, TikTok, and more.",
  keywords: ["NameLaunchpad", "username ideas", "gaming username generator", "cross-platform usernames"],
  openGraph: {
    title: "NameLaunchpad - Cross-Platform Username Ideas",
    description: "Use NameLaunchpad to generate cross-platform username ideas for games, creators, and social profiles.",
    type: "website",
  },
  alternates: {
    canonical: "/gamer-tag-generator",
  },
};

export default function GamerTagGeneratorPage() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "NameLaunchpad",
          description: "Generate cross-platform username ideas for games, social profiles, and streaming channels.",
          url: absoluteUrl("/gamer-tag-generator"),
          category: "UtilitiesApplication",
        })}
      />
      <Suspense fallback={null}>
        <UsernameEngine generatorKey="gamer-tag-generator" breadcrumbTitle="NameLaunchpad" />
      </Suspense>
      <SeoContent
        title="NameLaunchpad for Cross-Platform Username Ideas"
        intro="NameLaunchpad is built for players and creators who want one identity that works across games, social media, and creator platforms. It helps generate names that feel competitive, clean, and easy to remember."
        sections={[
          {
            heading: "What Makes a Strong Cross-Platform Name",
            body: "A strong cross-platform name should be readable in a lobby, searchable on social platforms, and flexible enough to use across multiple games. Short names with strong visual contrast tend to perform best.",
          },
          {
            heading: "Using NameLaunchpad Everywhere",
            body: "If you use the same handle on Discord, Twitch, TikTok, Instagram, and game profiles, it becomes much easier to build recognition. Use NameLaunchpad to test names before you commit to a full brand identity.",
          },
        ]}
        internalLinks={[
          { href: "/username-generator", label: "Username Generator" },
          { href: "/twitch-username-generator", label: "Twitch Username Generator" },
          { href: "/discord-name-generator", label: "Discord Name Generator" },
          { href: "/valorant-name-generator", label: "Valorant Name Generator" },
        ]}
      />
      <RelatedGenerators currentSlug="gamer-tag-generator" />
    </>
  );
}
