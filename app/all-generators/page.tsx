import type { Metadata } from "next";
import { AllGeneratorsGrid } from "@/components/generator/all-generators-grid";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "All Generators",
  description: "Browse all generator pages on NameLaunchpad including gaming, social, fantasy, streamer, and clan tools.",
  alternates: {
    canonical: "/all-generators",
  },
};

export default function AllGeneratorsPage() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "All Generators",
          description: "Browse all generator pages on NameLaunchpad.",
          url: absoluteUrl("/all-generators"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "All Generators", path: "/all-generators" },
        ])}
      />
      <AllGeneratorsGrid />
    </>
  );
}
