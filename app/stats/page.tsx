import type { Metadata } from "next";
import { StatsDashboard } from "@/components/stats/stats-dashboard";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Generator Statistics",
  description: "View total usernames generated, most popular usernames, most used generators, and daily generation count.",
  alternates: {
    canonical: "/stats",
  },
};

export default function StatsPage() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Generator Statistics",
          description: "View generator statistics and username generation trends on NameLaunchpad.",
          url: absoluteUrl("/stats"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Stats", path: "/stats" },
        ])}
      />
      <StatsDashboard />
    </>
  );
}
