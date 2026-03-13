"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Card } from "@/components/ui/card";
import { GENERATOR_STATS_EVENT, getGeneratorStatsSnapshot } from "@/lib/generator-stats";
import { generatorDatabase, getGeneratorEntry, type GeneratorDirectoryEntry } from "@/lib/generators";

const directRoutes = new Set([
  "username-generator",
  "gamer-tag-generator",
  "fortnite-name-generator",
  "roblox-username-generator",
  "fantasy-name-generator",
  "clan-name-generator",
  "og-username-finder",
]);

const fallbackSlugs = [
  "fortnite-name-generator",
  "roblox-username-generator",
  "minecraft-name-generator",
  "valorant-name-generator",
  "clan-name-generator",
  "fantasy-name-generator",
];

function getGeneratorHref(slug: string) {
  return directRoutes.has(slug) ? `/${slug}` : `/generators/${slug}`;
}

function getFallbackGenerators(limit: number) {
  return fallbackSlugs
    .map((slug) => getGeneratorEntry(slug))
    .filter((entry): entry is GeneratorDirectoryEntry => Boolean(entry))
    .slice(0, limit)
    .map((entry) => ({ entry, count: 0 }));
}

function getTopGenerators(limit = 12) {
  const stats = getGeneratorStatsSnapshot();

  if (stats.generatorUsage.length === 0) {
    return getFallbackGenerators(limit);
  }

  const ranked = stats.generatorUsage
    .map((usage) => {
      const entry = getGeneratorEntry(usage.slug);
      if (!entry) return null;

      return {
        entry,
        count: usage.count,
      };
    })
    .filter((item): item is { entry: GeneratorDirectoryEntry; count: number } => Boolean(item))
    .slice(0, limit);

  if (ranked.length >= limit) {
    return ranked;
  }

  const existingSlugs = new Set(ranked.map((item) => item.entry.slug));
  const supplemental = generatorDatabase
    .filter((entry) => !existingSlugs.has(entry.slug))
    .slice(0, limit - ranked.length)
    .map((entry) => ({ entry, count: 0 }));

  return [...ranked, ...supplemental];
}

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function TopGeneratorsGrid() {
  const [items, setItems] = useState(() => getTopGenerators());

  useEffect(() => {
    setItems(getTopGenerators());

    const handleUpdate = () => {
      setItems(getTopGenerators());
    };

    window.addEventListener(GENERATOR_STATS_EVENT, handleUpdate);
    return () => window.removeEventListener(GENERATOR_STATS_EVENT, handleUpdate);
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Top Generators" },
        ]}
      />

      <Card className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Most Used</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">Top Generators</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Browse the most used generator pages on NameLaunchpad based on local generator activity in this browser.
          </p>
        </div>

        <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-3 md:p-8">
          {items.map(({ entry, count }, index) => (
            <Card key={entry.slug} className="p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
                  <h2 className="mt-2 text-lg font-semibold text-white">{entry.title}</h2>
                </div>
                <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                  {count > 0 ? `${formatCount(count)} runs` : "Popular"}
                </span>
              </div>
              <p className="mt-3 text-sm text-slate-300">{entry.description}</p>
              <Link
                href={getGeneratorHref(entry.slug)}
                className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Open Generator
              </Link>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}
