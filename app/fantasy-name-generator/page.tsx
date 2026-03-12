import type { Metadata } from "next";
import { FantasyEngine } from "@/components/generator/fantasy-engine";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createFaqSchema, createGeneratorSchema, createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Fantasy Name Generator - RPG, Guild, and Character Names",
  description:
    "Generate fantasy RPG names with magical prefixes and suffixes for characters, guilds, classes, campaigns, and roleplaying profiles.",
  path: "/fantasy-name-generator",
  keywords: ["fantasy name generator", "RPG names", "fantasy character names", "guild name ideas", "RPG username ideas"],
});

export default function FantasyGenerator() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Fantasy Name Generator",
          description: "Generate fantasy RPG names with magical prefixes and suffixes for heroes, guilds, and classes.",
          url: absoluteUrl("/fantasy-name-generator"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Fantasy Name Generator", path: "/fantasy-name-generator" },
        ])}
      />
      <JsonLd
        data={createFaqSchema([
          {
            question: "What makes a good fantasy name?",
            answer:
              "A good fantasy name sounds natural inside an RPG or fictional world and usually combines a strong theme word with a magical, medieval, or mythic ending.",
          },
          {
            question: "Can fantasy names work for usernames too?",
            answer:
              "Yes. Fantasy-style names work well for RPG profiles, guild rosters, character lists, and gaming usernames when the result stays readable and not overly complicated.",
          },
        ])}
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
          { href: "/gamer-tag-generator", label: "NameLaunchpad" },
        ]}
        faqItems={[
          {
            question: "Should a fantasy name be long or short?",
            answer:
              "It depends on the setting, but shorter fantasy names often work better when you want something memorable enough for an RPG profile or public username.",
          },
          {
            question: "How do you make a fantasy name feel less generic?",
            answer:
              "Use names that have one strong mythic idea instead of stacking too many magical words into the same handle.",
          },
        ]}
      />
      <RelatedGenerators currentSlug="fantasy-name-generator" />
    </>
  );
}


