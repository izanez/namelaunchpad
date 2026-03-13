import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { intentTemplatePages } from "@/lib/intent-template-pages";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Intent Username Pages",
  description: "High-intent username pages by platform, style, and length with examples and FAQs.",
  path: "/intent",
  keywords: ["platform style length usernames", "intent username pages", "username SEO pages"],
});

export default function IntentIndexPage() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <h1 className="text-3xl font-black text-white md:text-4xl">Intent Username Hub</h1>
        <p className="mt-3 text-sm text-slate-300">
          Platform + style + length pages with examples, FAQs, and generator links.
        </p>
      </Card>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {intentTemplatePages.map((page) => (
          <Card key={page.slug} className="p-4">
            <h2 className="text-base font-bold text-white">{page.title}</h2>
            <p className="mt-2 text-xs text-slate-400">{page.description}</p>
            <Link href={`/intent/${page.slug}`} className="mt-3 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">
              Open page {"->"}
            </Link>
          </Card>
        ))}
      </div>
    </section>
  );
}
