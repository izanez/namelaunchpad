import type { Metadata } from "next";
import { RobloxEngine } from "@/components/generator/roblox-engine";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Roblox Username Generator - Kid Friendly Roblox Usernames",
  description:
    "Generate kid friendly Roblox usernames with safe, playful name ideas. Create unique Roblox gamertags instantly.",
  keywords: [
    "Roblox username generator",
    "kid friendly Roblox usernames",
    "safe Roblox names",
    "Roblox gamertags",
  ],
  openGraph: {
    title: "Roblox Username Generator - Kid Friendly Roblox Usernames",
    description: "Build fun, creative, and safe Roblox usernames with one click.",
    type: "website",
  },
  alternates: {
    canonical: "/roblox-username-generator",
  },
};

export default function RobloxGenerator() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Roblox Username Generator",
          description: "Generate safe and kid-friendly Roblox usernames with playful name combinations.",
          url: "https://gamertagforge.com/roblox-username-generator",
          category: "GameApplication",
        })}
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
      />
    </>
  );
}
