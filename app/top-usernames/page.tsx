import type { Metadata } from "next";
import { TopUsernamesLeaderboard } from "@/components/generator/top-usernames-leaderboard";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Top Usernames Leaderboard",
  description: "Browse the most popular usernames generated on NameLaunchpad and copy your favorites instantly.",
  alternates: {
    canonical: "/top-usernames",
  },
};

export default function TopUsernamesPage() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Top Usernames Leaderboard",
          description: "Browse the most popular usernames generated on NameLaunchpad.",
          url: absoluteUrl("/top-usernames"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Top Usernames", path: "/top-usernames" },
        ])}
      />
      <TopUsernamesLeaderboard />
    </>
  );
}
