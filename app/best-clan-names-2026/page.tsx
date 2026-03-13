import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getIntentNextPages } from "@/lib/intent-navigation";
import { createSeoMetadata } from "@/lib/seo";

const prefixes = [
  "Nova",
  "Ghost",
  "Iron",
  "Night",
  "Pulse",
  "Cipher",
  "Rogue",
  "Frost",
  "Storm",
  "Void",
  "Crimson",
  "Onyx",
  "Hyper",
  "Static",
  "Drift",
  "Shadow",
  "Lunar",
  "Steel",
  "Apex",
  "Prime",
];

const suffixes = [
  "Legion",
  "Unit",
  "Core",
  "Squad",
  "Protocol",
  "Order",
  "Division",
  "Collective",
  "Pack",
  "Alliance",
];

function buildTopClanNames() {
  const names: string[] = [];
  for (let i = 0; i < 100; i += 1) {
    const left = prefixes[i % prefixes.length];
    const right = suffixes[(i * 3) % suffixes.length];
    names.push(`${left} ${right}`);
  }
  return names;
}

export const metadata: Metadata = createSeoMetadata({
  title: "100 Best Clan Names 2026",
  description: "Zero-click list of 100 best clan names for gaming teams, content squads, and esports groups in 2026.",
  path: "/best-clan-names-2026",
  keywords: ["best clan names 2026", "gaming clan names", "esports team names"],
});

export default function BestClanNames2026Page() {
  const names = buildTopClanNames();
  const nextPages = getIntentNextPages(["clan", "gaming", "best", "list"], "/best-clan-names-2026", 6);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wide text-cyan-300">Zero-Click Magnet</p>
        <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">100 Best Clan Names 2026</h1>
        <p className="mt-3 text-sm leading-7 text-slate-300">
          Instant list for teams that need ideas without setup. Use this as a fast shortlist, then switch to the generator for personalized variants.
        </p>
        <Link href="/clan-name-generator#generator" className="mt-4 inline-block text-sm font-semibold text-cyan-300 hover:text-cyan-200">
          Personalize in Clan Name Generator {"->"}
        </Link>
      </Card>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {names.map((name, index) => (
          <Card key={`${name}-${index}`} className="p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
            <p className="mt-2 text-sm font-bold text-white">{name}</p>
          </Card>
        ))}
      </div>

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
