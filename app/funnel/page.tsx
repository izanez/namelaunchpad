import type { Metadata } from "next";
import { FunnelDashboard } from "@/components/stats/funnel-dashboard";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Funnel Metrics Dashboard",
  description: "Track landing, generate, copy, availability check, favorite rate, and estimated 24h return.",
  path: "/funnel",
  keywords: ["funnel metrics", "conversion metrics", "username generator analytics"],
});

export default function FunnelPage() {
  return <FunnelDashboard />;
}
