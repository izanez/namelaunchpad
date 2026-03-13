import type { Metadata } from "next";
import { AllGeneratorsGrid } from "@/components/generator/all-generators-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Explore Generators",
  description:
    "Explore hundreds of generator pages on NameLaunchpad across gaming, social media, fantasy, anime, clan, rare, short, dark, and streamer categories.",
  alternates: {
    canonical: "/explore-generators",
  },
  openGraph: {
    title: "Explore Generators | NameLaunchpad",
    description:
      "Explore hundreds of generator pages on NameLaunchpad across gaming, social media, fantasy, anime, clan, rare, short, dark, and streamer categories.",
    type: "website",
    url: absoluteUrl("/explore-generators"),
  },
};

export default function ExploreGeneratorsPage() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Explore Generators",
          description: "Explore the full NameLaunchpad generator directory across all categories and naming styles.",
          url: absoluteUrl("/explore-generators"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Explore Generators", path: "/explore-generators" },
        ])}
      />
      <AllGeneratorsGrid
        title="Explore Generators"
        description="Explore the full NameLaunchpad directory of programmatic generator pages across Gaming, Social Media, Fantasy, Anime, Cool, Funny, Rare, Short, Aesthetic, Hacker, Streamer, Clan, Duo, Tech, and Dark categories."
      />
    </>
  );
}
