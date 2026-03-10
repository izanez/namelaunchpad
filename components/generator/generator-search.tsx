"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { generatorDatabase } from "@/lib/generators";

function normalize(value: string) {
  return value.toLowerCase().trim();
}

export function GeneratorSearch() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const normalizedQuery = normalize(query);
    if (!normalizedQuery) return generatorDatabase.slice(0, 8);

    return generatorDatabase
      .filter((entry) => {
        const searchable = [entry.slug, entry.title, entry.description, entry.category, ...entry.exampleNames]
          .join(" ")
          .toLowerCase();
        return searchable.includes(normalizedQuery);
      })
      .slice(0, 12);
  }, [query]);

  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">Search Generators</h2>
          <p className="mt-2 text-sm text-slate-400">
            Find generator pages instantly for Fortnite, Roblox, anime, Twitch, fantasy, and more.
          </p>
        </div>
        <span className="text-xs uppercase tracking-wide text-slate-400">Instant results</span>
      </div>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search generators: fortnite, roblox, anime, twitch, fantasy..."
          className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
        />

        <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {results.map((entry) => (
            <Card key={entry.slug} className="p-5">
              <p className="text-xs uppercase tracking-wide text-cyan-300">{entry.category}</p>
              <h3 className="mt-2 text-lg font-semibold text-white">{entry.title}</h3>
              <p className="mt-2 text-sm text-slate-300">{entry.description}</p>
              <Link
                href={`/generators/${entry.slug}`}
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
