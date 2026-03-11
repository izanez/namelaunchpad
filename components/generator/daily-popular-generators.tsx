"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { GENERATOR_STATS_EVENT, getGeneratorStatsSnapshot } from "@/lib/generator-stats";
import { getGeneratorEntry, type GeneratorDirectoryEntry } from "@/lib/generators";

const directRoutes = new Set([
  "username-generator",
  "gamer-tag-generator",
  "fortnite-name-generator",
  "roblox-username-generator",
  "minecraft-name-generator",
  "twitch-username-generator",
  "valorant-name-generator",
  "fantasy-name-generator",
  "clan-name-generator",
  "anime-username-generator",
  "og-username-finder",
]);

const fallbackSlugs = [
  "fortnite-name-generator",
  "roblox-username-generator",
  "anime-username-generator",
  "clan-name-generator",
];

function getGeneratorHref(slug: string) {
  return directRoutes.has(slug) ? `/${slug}` : `/generators/${slug}`;
}

function getFallbackEntries() {
  return fallbackSlugs
    .map((slug) => getGeneratorEntry(slug))
    .filter((entry): entry is GeneratorDirectoryEntry => Boolean(entry))
    .map((entry) => ({
      entry,
      count: 0,
    }));
}

function getPopularEntries() {
  const usage = getGeneratorStatsSnapshot().generatorUsage;

  if (usage.length === 0) {
    return getFallbackEntries();
  }

  const mapped = usage
    .map((item) => {
      const entry = getGeneratorEntry(item.slug);
      if (!entry) return null;
      return {
        entry,
        count: item.count,
      };
    })
    .filter((item): item is { entry: GeneratorDirectoryEntry; count: number } => Boolean(item))
    .slice(0, 4);

  return mapped.length > 0 ? mapped : getFallbackEntries();
}

export function DailyPopularGenerators() {
  const [entries, setEntries] = useState(() => getPopularEntries());

  useEffect(() => {
    setEntries(getPopularEntries());

    const handleUpdate = () => {
      setEntries(getPopularEntries());
    };

    window.addEventListener(GENERATOR_STATS_EVENT, handleUpdate);
    return () => window.removeEventListener(GENERATOR_STATS_EVENT, handleUpdate);
  }, []);

  const totalRuns = useMemo(() => entries.reduce((sum, entry) => sum + entry.count, 0), [entries]);

  return (
    <section className="content-auto mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">🔥 Popular Today</h2>
          <p className="mt-2 text-sm text-slate-400">
            Daily popular generators based on recent local usage in this browser.
          </p>
        </div>
        <span className="text-xs uppercase tracking-wide text-slate-400">
          {totalRuns > 0 ? `${totalRuns} tracked runs` : "Trending picks"}
        </span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {entries.map(({ entry, count }, index) => (
          <Card key={entry.slug} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{entry.title}</h3>
              </div>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                {count > 0 ? `${count} runs` : "Popular"}
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
    </section>
  );
}
