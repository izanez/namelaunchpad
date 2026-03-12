import type { Metadata } from "next";
import { Suspense } from "react";
import { absoluteUrl } from "@/app/metadata";
import { UsernameEngine } from "@/components/generator/username-engine";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createGeneratorSchema } from "@/lib/seo";
import { createBreadcrumbSchema, createFaqSchema, createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Gamer Tag Generator - Cross-Platform Username Ideas",
  description:
    "Generate cross-platform gamer tags and username ideas for Xbox, PlayStation, PC, Discord, Twitch, TikTok, YouTube, and social profiles.",
  path: "/gamer-tag-generator",
  keywords: ["gamer tag generator", "cross-platform usernames", "gaming username generator", "NameLaunchpad", "console gamertags"],
});

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
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Gamer Tag Generator", path: "/gamer-tag-generator" },
        ])}
      />
      <JsonLd
        data={createFaqSchema([
          {
            question: "What makes a strong cross-platform gamer tag?",
            answer:
              "A strong cross-platform gamer tag should be readable, memorable, and flexible enough to work across console profiles, Discord, streaming platforms, and social media.",
          },
          {
            question: "Why use one gamer tag across platforms?",
            answer:
              "Using one identity across platforms makes you easier to recognize and helps your gaming, creator, and social profiles feel more consistent over time.",
          },
        ])}
      />
      <Suspense fallback={null}>
        <UsernameEngine generatorKey="gamer-tag-generator" breadcrumbTitle="Gamer Tag Generator" />
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
        faqItems={[
          {
            question: "Should a gamer tag match one game or stay broader?",
            answer:
              "Broader gamer tags are usually better if you play multiple games or post content, because they stay usable when your focus changes.",
          },
          {
            question: "How do you test if a gamer tag is strong enough?",
            answer:
              "Check whether it still looks good in a lobby, sounds natural out loud, and feels usable on Discord, Twitch, TikTok, or YouTube before committing to it.",
          },
        ]}
      />
      <RelatedGenerators currentSlug="gamer-tag-generator" />
    </>
  );
}
