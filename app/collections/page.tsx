import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { intentClusters } from "@/lib/intent-clusters";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Username Collections",
  description: "Intent-focused username collections for gaming, social, and creator naming paths.",
  path: "/collections",
  keywords: ["username collections", "short valorant names", "fortnite duo names", "aesthetic tiktok usernames"],
});

export default function CollectionsPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl md:p-8">
        <h1 className="text-3xl font-black text-white md:text-4xl">Intent Collections</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Focused collection pages with clear naming intent, examples, FAQs, and direct generator integration.
        </p>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {intentClusters.map((cluster) => (
          <Card key={cluster.slug} className="p-5">
            <h2 className="text-lg font-bold text-white">{cluster.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{cluster.description}</p>
            <Link
              href={`/collections/${cluster.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Open Collection {"->"}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
