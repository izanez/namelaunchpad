import type { Metadata } from "next";
import { absoluteUrl } from "@/app/metadata";
import { TopGeneratorsGrid } from "@/components/generator/top-generators-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Top Generators",
  description: "View the most used generator pages on NameLaunchpad including gaming, social, fantasy, and clan tools.",
  alternates: {
    canonical: "/top-generators",
  },
};

export default function TopGeneratorsPage() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Top Generators",
          description: "Browse the most used generator pages on NameLaunchpad.",
          url: absoluteUrl("/top-generators"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Top Generators", path: "/top-generators" },
        ])}
      />
      <TopGeneratorsGrid />
    </>
  );
}
