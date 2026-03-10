import type { Metadata } from "next";
import { FantasyEngine } from "@/components/generator/fantasy-engine";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fantasy Name Generator",
  description: "Generate fantasy RPG names with magical prefixes and suffixes for characters and guilds.",
  keywords: ["fantasy name generator", "RPG names", "fantasy character names", "guild name ideas"],
  openGraph: {
    title: "Fantasy Name Generator",
    description: "Generate fantasy RPG names with magical prefixes and suffixes.",
    type: "website",
  },
  alternates: {
    canonical: "/fantasy-name-generator",
  },
};

export default function FantasyGenerator() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Fantasy Name Generator",
          description: "Generate fantasy RPG names with magical prefixes and suffixes for heroes, guilds, and classes.",
          url: "https://gamertagforge.com/fantasy-name-generator",
          category: "UtilitiesApplication",
        })}
      />
      <FantasyEngine />
      <SeoContent
        title="Fantasy Name Generator for RPG Characters"
        intro="Fantasy RPG players often need names that feel strong, mystical, and lore-friendly. This generator creates names built around classic fantasy themes such as frost, storm, shadow, dragon, wardens, and blades."
        sections={[
          {
            heading: "Fantasy Naming Patterns",
            body: "Fantasy names often combine a dramatic prefix with a medieval or magical suffix. This creates names that sound like warriors, mages, assassins, or guild leaders without feeling too generic.",
          },
          {
            heading: "Using Fantasy Names in RPGs",
            body: "A good fantasy name works across MMOs, tabletop campaigns, guild rosters, and story projects. Try names that are distinct enough to stand out while still sounding natural in a fantasy setting.",
          },
        ]}
        internalLinks={[
          { href: "/clan-name-generator", label: "Clan Name Generator" },
          { href: "/username-generator", label: "Username Generator" },
          { href: "/minecraft-name-generator", label: "Minecraft Name Generator" },
          { href: "/gamer-tag-generator", label: "Gamer Tag Generator" },
        ]}
      />
    </>
  );
}
