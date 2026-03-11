"use client";

import { useDeferredValue, useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { generatorDatabase } from "@/lib/generators";

function normalize(value: string) {
  return value.toLowerCase().trim();
}

const directGeneratorPageSlugs = new Set([
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

function getGeneratorHref(slug: string) {
  return directGeneratorPageSlugs.has(slug) ? `/${slug}` : `/generators/${slug}`;
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

const searchableGenerators = generatorDatabase.map((entry) => {
  const slugTokens = tokenize(entry.slug);
  const titleTokens = tokenize(entry.title);
  const categoryTokens = tokenize(entry.category);
  const exampleTokens = entry.exampleNames.flatMap((example) => tokenize(example));
  const searchTokens = Array.from(
    new Set([
      ...slugTokens,
      ...titleTokens,
      ...categoryTokens,
      ...exampleTokens,
      ...tokenize(entry.description),
      "generator",
      "username",
      "gamertag",
      "name",
      ...(entry.description.toLowerCase().includes("short") ? ["short"] : []),
      ...(entry.description.toLowerCase().includes("cool") ? ["cool"] : []),
      ...(entry.description.toLowerCase().includes("rare") ? ["rare", "og"] : []),
    ])
  );

  return {
    entry,
    href: getGeneratorHref(entry.slug),
    searchIndex: [entry.slug, entry.title, entry.description, entry.category, ...entry.exampleNames, ...searchTokens]
      .join(" ")
      .toLowerCase(),
    searchTokens,
  };
});

function getSearchScore(searchIndex: string, searchTokens: string[], query: string) {
  if (!query) return 0;

  let score = 0;
  if (searchIndex.includes(query)) score += 2;
  if (searchIndex.startsWith(query)) score += 3;

  for (const token of searchTokens) {
    if (token === query) score += 8;
    else if (token.startsWith(query)) score += 4;
    else if (token.includes(query)) score += 1;
  }

  return score;
}

type GeneratorSearchProps = {
  initialQuery?: string;
  title?: string;
  description?: string;
  maxResults?: number;
};

export function GeneratorSearch({
  initialQuery = "",
  title = "Search Generators",
  description = "Find generator pages instantly for Fortnite, Roblox, anime, Twitch, fantasy, and more.",
  maxResults = 12,
}: GeneratorSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const deferredQuery = useDeferredValue(query);

  const results = useMemo(() => {
    const normalizedQuery = normalize(deferredQuery);
    if (!normalizedQuery) return searchableGenerators.slice(0, maxResults);

    return searchableGenerators
      .map((item) => ({
        ...item,
        score: getSearchScore(item.searchIndex, item.searchTokens, normalizedQuery),
      }))
      .filter((item) => item.score > 0)
      .sort((left, right) => right.score - left.score || left.entry.title.localeCompare(right.entry.title))
      .slice(0, maxResults);
  }, [deferredQuery, maxResults]);

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">{title}</h2>
          <p className="mt-2 text-sm text-slate-400">{description}</p>
        </div>
        <span className="text-xs uppercase tracking-wide text-slate-400">
          {normalize(deferredQuery) ? `${results.length} matches` : "Instant results"}
        </span>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search generators: fortnite, anime, cool, short, clan..."
          className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map(({ entry, href }) => (
            <Card key={entry.slug} className="p-5">
              <p className="text-xs uppercase tracking-wide text-cyan-300">{entry.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{entry.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{entry.description}</p>
              <Link
                href={href}
                className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                {"Open Generator Page ->"}
              </Link>
            </Card>
          ))}
        </div>

        {results.length === 0 ? (
          <div className="mt-5 rounded-xl2 border border-white/10 bg-slate-950/35 px-4 py-5 text-sm text-slate-400">
            No generator pages matched that search yet.
          </div>
        ) : null}
      </div>
    </section>
  );
}
