import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { comparisonIntentPages } from "@/lib/comparison-intents";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Username Comparisons",
  description: "Comparison-intent pages for choosing naming styles by platform, length, and branding goals.",
  path: "/compare",
  keywords: ["username comparison", "fortnite vs valorant usernames", "short vs aesthetic usernames"],
});

export default function CompareIndexPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <h1 className="text-3xl font-black text-white md:text-4xl">Comparison Intent Hub</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Choose naming direction faster with focused side-by-side comparisons. Each page includes practical fit guidance and direct next steps.
        </p>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {comparisonIntentPages.map((page) => (
          <Card key={page.slug} className="p-5">
            <h2 className="text-xl font-bold text-white">{page.title}</h2>
            <p className="mt-2 text-sm text-slate-300">{page.description}</p>
            <Link
              href={`/compare/${page.slug}`}
              className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
            >
              Open comparison {"->"}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
