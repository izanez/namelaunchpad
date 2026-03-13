"use client";

import { useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SmartInternalLinks } from "@/components/seo/smart-internal-links";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { SmartInternalLinkSection } from "@/lib/smart-internal-links";
import type { UsernameRecord } from "@/lib/username-database";

const categoryLabels: Record<UsernameRecord["category"], string> = {
  gaming: "Gaming",
  social: "Social",
  fantasy: "Fantasy",
  anime: "Anime",
  short: "Short",
  rare: "Rare",
  clan: "Clan",
  duo: "Duo",
  edgy: "Edgy",
  cute: "Cute",
};

const styleLabels: Record<UsernameRecord["style"], string> = {
  cool: "Cool",
  aesthetic: "Aesthetic",
  dark: "Dark",
  funny: "Funny",
  fantasy: "Fantasy",
  hacker: "Hacker",
  anime: "Anime",
  streamer: "Streamer",
};

const rarityLabels: Record<UsernameRecord["rarity"], string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};

export function UsernameDetailPage({
  record,
  related,
  internalLinkSections,
}: {
  record: UsernameRecord;
  related: UsernameRecord[];
  internalLinkSections: SmartInternalLinkSection[];
}) {
  const [toast, setToast] = useState<string | null>(null);

  const onCopy = async (value: string) => {
    await navigator.clipboard.writeText(value);
    setToast("Username copied.");
    window.setTimeout(() => setToast(null), 1600);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Username Database", href: "/username-database" },
          { label: record.name },
        ]}
      />

      <div className="grid gap-6">
        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Username Detail</p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">{record.name}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              {record.name} is a {styleLabels[record.style].toLowerCase()} {categoryLabels[record.category].toLowerCase()} username with{" "}
              {rarityLabels[record.rarity].toLowerCase()} rarity and a {record.length}-character structure. Use this page to copy the name,
              compare similar ideas, and move into the most relevant generators.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                {categoryLabels[record.category]}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                {styleLabels[record.style]}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                {rarityLabels[record.rarity]}
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                {record.length} chars
              </span>
            </div>
            <div className="mt-5 flex flex-wrap gap-3">
              <Button onClick={() => void onCopy(record.name)}>Copy Username</Button>
              <Link
                href={`/username-generator?keywords=${encodeURIComponent(record.name)}`}
                className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 transition hover:border-cyan-300/30 hover:text-cyan-200"
              >
                Generate Similar
              </Link>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">Why This Username Works</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold text-white">Clear category fit</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                This username fits the {categoryLabels[record.category].toLowerCase()} category, which makes it easier to compare against adjacent handles with the same use case.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Useful style direction</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The {styleLabels[record.style].toLowerCase()} style gives the name a more consistent tone than a fully random combination.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Practical rarity signal</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The {rarityLabels[record.rarity].toLowerCase()} rarity label helps users judge whether the name feels broad, premium, or more standout.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">Related Username Ideas</h2>
          <p className="mt-2 text-sm text-slate-400">
            These nearby names share category, style, rarity, or structure with {record.name}.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {related.map((item) => (
              <Card key={item.slug} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/usernames/${item.slug}`} className="text-base font-semibold text-white transition hover:text-cyan-200">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-slate-400">
                      {categoryLabels[item.category]} | {styleLabels[item.style]}
                    </p>
                  </div>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-100">
                    {item.length}
                  </span>
                </div>
                <Button variant="ghost" className="mt-4 w-full px-3 py-2 text-xs" onClick={() => void onCopy(item.name)}>
                  Copy Username
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        <SmartInternalLinks sections={internalLinkSections} />
      </div>

      {toast ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 animate-fadeUp rounded-xl2 border border-cyan-300/35 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan-100 shadow-neon backdrop-blur-xl">
          {toast}
        </div>
      ) : null}
    </section>
  );
}
