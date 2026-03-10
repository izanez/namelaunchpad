import type { Metadata } from "next";
import { UsernameEngine } from "@/components/generator/username-engine";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Gamer Tag Generator - Cool Gamertags for Every Platform",
  description: "Generate gamer tags for Xbox, PlayStation, PC, Discord, Twitch, TikTok, and more.",
  keywords: ["gamer tag generator", "gamertag generator", "cool gamertags", "gaming name generator"],
  openGraph: {
    title: "Gamer Tag Generator - Cool Gamertags for Every Platform",
    description: "Generate gamer tags for Xbox, PlayStation, PC, Discord, Twitch, TikTok, and more.",
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
          title: "Gamer Tag Generator",
          description: "Generate cool gamer tags for games, social profiles, and streaming channels.",
          url: "https://gamertagforge.com/gamer-tag-generator",
          category: "UtilitiesApplication",
        })}
      />
      <UsernameEngine />
      <SeoContent
        title="Gamer Tag Generator for Cross-Platform Names"
        intro="This gamer tag generator is built for players who want one identity that works across games, social media, and creator platforms. It helps generate names that feel competitive, clean, and easy to remember."
        sections={[
          {
            heading: "What Is a Good Gamer Tag",
            body: "A good gamer tag should be readable in a lobby, searchable on social platforms, and flexible enough to use across multiple games. Short names with strong visual contrast tend to perform best.",
          },
          {
            heading: "Using One Tag Everywhere",
            body: "If you use the same handle on Discord, Twitch, TikTok, Instagram, and game profiles, it becomes much easier to build recognition. Use this page to test names before you commit to a full brand identity.",
          },
        ]}
        internalLinks={[
          { href: "/username-generator", label: "Username Generator" },
          { href: "/twitch-username-generator", label: "Twitch Username Generator" },
          { href: "/discord-name-generator", label: "Discord Name Generator" },
          { href: "/valorant-name-generator", label: "Valorant Name Generator" },
        ]}
      />
    </>
  );
}
