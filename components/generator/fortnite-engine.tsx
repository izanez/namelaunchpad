"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { LoadingGrid } from "@/components/generator/loading-grid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateFortniteNames } from "@/lib/generators";

const featuredExamples = ["StormSniper", "VictoryVortex", "LootPhantom", "BattleNova", "ShieldBreaker"];

export function FortniteEngine() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const storageKey = useMemo(() => "gamertagforge:favorites:fortnite-engine", []);

  const onGenerate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      startTransition(() => {
        setResults(generateFortniteNames({ keyword, amount: 30 }));
      });
      setIsGenerating(false);
    }, 120);
  };

  useEffect(() => {
    setResults(generateFortniteNames({ amount: 30 }));
    const cached = window.localStorage.getItem(storageKey);
    if (!cached) return;
    try {
      const parsed = JSON.parse(cached) as string[];
      if (Array.isArray(parsed)) setFavorites(parsed.slice(0, 40));
    } catch {
      setFavorites([]);
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  const onCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  };

  const onToggleFavorite = (value: string) => {
    setFavorites((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [value, ...current].slice(0, 40)
    );
  };

  return (
    <section className="generator-shell mx-auto w-full max-w-6xl animate-fadeUp px-4 py-10 md:px-6">
      <AdSlot slot="top-banner" className="mb-7" />

      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="overflow-hidden border-blue-300/25 p-0">
          <div className="bg-gradient-to-r from-blue-600/30 via-sky-400/20 to-amber-300/20 p-6 md:p-8">
            <h1 className="text-3xl font-black text-white md:text-4xl">Fortnite Name Generator</h1>
            <p className="mt-2 max-w-3xl text-slate-200">
              Generate 30 Fortnite-style gamertags per click with battle-ready words, fast pacing, and victory vibes.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {featuredExamples.map((example) => (
                <span
                  key={example}
                  className="rounded-full border border-amber-300/35 bg-amber-300/10 px-3 py-1 text-xs font-semibold text-amber-100"
                >
                  {example}
                </span>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
                placeholder="Optional keyword (e.g. storm, clutch, sniper)"
                className="w-full rounded-xl2 border border-blue-300/30 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-amber-300/70"
              />
              <Button onClick={onGenerate} disabled={isGenerating} className="md:min-w-44">
                {isGenerating ? "Dropping..." : "Generate 30 Names"}
              </Button>
            </div>

            {isGenerating ? (
              <LoadingGrid count={6} />
            ) : (
              <>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {results.slice(0, 6).map((name) => (
                    <Card key={name} className="border-blue-300/25 bg-blue-500/5 p-4 hover:border-amber-300/50">
                      <p className="text-base font-semibold text-slate-100">{name}</p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                          {copied === name ? "Copied" : "Copy"}
                        </Button>
                        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onToggleFavorite(name)}>
                          {favorites.includes(name) ? "Favorited" : "Favorite"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <AdSlot slot="between-results" className="mt-6" />

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {results.slice(6).map((name) => (
                    <Card key={name} className="border-blue-300/25 bg-blue-500/5 p-4 hover:border-amber-300/50">
                      <p className="text-base font-semibold text-slate-100">{name}</p>
                      <div className="mt-3 flex gap-2">
                        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                          {copied === name ? "Copied" : "Copy"}
                        </Button>
                        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onToggleFavorite(name)}>
                          {favorites.includes(name) ? "Favorited" : "Favorite"}
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </Card>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <AdSlot slot="sidebar" />
        </div>
      </div>
    </section>
  );
}
