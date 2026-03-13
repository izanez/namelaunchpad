import type { Metadata } from "next";
import { CommunityPicks } from "@/components/community/community-picks";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Community Picks",
  description: "Upvote username ideas, watch the weekly leaderboard, and discover the name of the week.",
  path: "/community",
  keywords: ["community username picks", "username leaderboard", "name of the week"],
});

export default function CommunityPage() {
  return <CommunityPicks />;
}
