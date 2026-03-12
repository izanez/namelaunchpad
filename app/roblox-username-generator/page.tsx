import type { Metadata } from "next";
import { RobloxEngine } from "@/components/generator/roblox-engine";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createFaqSchema, createGeneratorSchema, createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Roblox Username Generator - Kid Friendly Roblox Usernames",
  description:
    "Generate safe, kid-friendly, and playful Roblox usernames with creative name ideas for obbies, builders, adventure games, and Roblox profiles.",
  path: "/roblox-username-generator",
  keywords: [
    "Roblox username generator",
    "kid friendly Roblox usernames",
    "safe Roblox names",
    "Roblox gamertags",
    "Roblox username ideas",
  ],
});

export default function RobloxGenerator() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Roblox Username Generator",
          description: "Generate safe and kid-friendly Roblox usernames with playful name combinations.",
          url: absoluteUrl("/roblox-username-generator"),
          category: "GameApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Roblox Username Generator", path: "/roblox-username-generator" },
        ])}
      />
      <JsonLd
        data={createFaqSchema([
          {
            question: "What makes a good Roblox username?",
            answer:
              "A good Roblox username should be safe, readable, playful, and flexible enough to fit different game styles such as obbies, builders, adventure games, and social experiences.",
          },
          {
            question: "Why should Roblox usernames stay kid friendly?",
            answer:
              "Roblox communities often include younger players and public-facing social spaces, so safer names tend to be more reusable and more suitable across profiles, groups, and creator channels.",
          },
        ])}
      />
      <RobloxEngine />
      <SeoContent
        title="Roblox Username Generator for Safe Name Ideas"
        intro="This Roblox username generator focuses on playful and kid-friendly names that fit popular Roblox themes like obbies, builders, block worlds, and adventure games."
        sections={[
          {
            heading: "Kid Friendly Roblox Usernames",
            body: "Safe Roblox usernames should be simple, readable, and fun. Names that combine friendly action words with block-style themes are easier to remember and more suitable for broad audiences.",
          },
          {
            heading: "How to Pick a Good Roblox Name",
            body: "A strong Roblox username should match your favorite game style while staying flexible enough for future experiences. Try names based on building, exploring, jumping, and adventure rather than narrow one-off references.",
          },
        ]}
        internalLinks={[
          { href: "/minecraft-name-generator", label: "Minecraft Name Generator" },
          { href: "/username-generator", label: "Username Generator" },
          { href: "/discord-name-generator", label: "Discord Name Generator" },
          { href: "/fortnite-name-generator", label: "Fortnite Name Generator" },
        ]}
        faqItems={[
          {
            question: "Should a Roblox name be funny or clean?",
            answer:
              "Either can work, but clean playful names are usually more flexible across many Roblox game types and stay useful for longer.",
          },
          {
            question: "Can a Roblox username also work on YouTube or Discord?",
            answer:
              "Yes. The best Roblox usernames are clear enough to reuse on Discord, YouTube, TikTok, or Roblox group branding without needing major changes.",
          },
        ]}
      />
      <RelatedGenerators currentSlug="roblox-username-generator" />
    </>
  );
}


