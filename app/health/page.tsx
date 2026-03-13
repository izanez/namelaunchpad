import type { Metadata } from "next";
import { HealthClient } from "@/app/health/health-client";

export const metadata: Metadata = {
  title: "Health Check",
  description: "Operational checks for icon assets, manifest, robots, sitemap, and AdSense script.",
  alternates: {
    canonical: "/health",
  },
};

export default function HealthPage() {
  return <HealthClient />;
}
