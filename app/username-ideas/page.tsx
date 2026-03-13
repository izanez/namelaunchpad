import type { Metadata } from "next";
import { absoluteUrl } from "@/app/metadata";
import { UsernameIdeasGallery } from "@/components/generator/username-ideas-gallery";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Username Ideas",
  description: "Browse thousands of username ideas grouped by style and copy cool, funny, dark, fantasy, anime, and streamer names instantly.",
  alternates: {
    canonical: "/username-ideas",
  },
};

export default function UsernameIdeasPage() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Username Ideas",
          description: "Browse thousands of grouped username ideas on NameLaunchpad.",
          url: absoluteUrl("/username-ideas"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Username Ideas", path: "/username-ideas" },
        ])}
      />
      <UsernameIdeasGallery />
    </>
  );
}
