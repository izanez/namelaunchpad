import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { LinkableAssetsClient } from "@/components/share/linkable-assets-client";
import { getIntentNextPages } from "@/lib/intent-navigation";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Linkable Username Assets",
  description: "Free downloadable assets: username style cheat sheet, name length matrix, and gamer naming trends 2026.",
  path: "/assets",
  keywords: ["username style cheat sheet", "gamer name trends 2026", "name length matrix"],
});

export default function AssetsPage() {
  const nextPages = getIntentNextPages(["assets", "seo", "download", "username"], "/assets", 6);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wide text-cyan-300">Linkable Assets</p>
        <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">Free Downloads</h1>
        <p className="mt-3 text-sm text-slate-300">
          Use these assets in creator workflows, blog posts, and forum resources. They are designed to be easy to reference and share.
        </p>
      </Card>

      <LinkableAssetsClient />

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-bold text-white">Next Best Pages</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {nextPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/45 hover:text-cyan-100"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
