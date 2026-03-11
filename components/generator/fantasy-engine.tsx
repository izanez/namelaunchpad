"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LoadingGrid } from "@/components/generator/loading-grid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateFantasyNames } from "@/lib/generators";
import { trackGeneratorUsage } from "@/lib/generator-stats";

const examples = ["Shadowbane", "DragonSlayerX", "Stormwarden", "Nightfang", "FrostKnight"];

export function FantasyEngine() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const storageKey = useMemo(() => "namelaunchpad:favorites:fantasy-engine", []);

  const onGenerate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      startTransition(() => {
        const next = generateFantasyNames({ keyword, amount: 30 });
        setResults(next);
        trackGeneratorUsage("fantasy-name-generator", next.length);
      });
      setIsGenerating(false);
    }, 120);
  };

  useEffect(() => {
    setResults(generateFantasyNames({ amount: 30 }));
    const cached = window.localStorage.getItem(storageKey);
    if (!cached) return;
    try {
      const parsed = JSON.parse(cached) as string[];
      if (Array.isArray(parsed)) setFavorites(parsed.slice(0, 50));
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
      current.includes(value) ? current.filter((item) => item !== value) : [value, ...current].slice(0, 50)
    );
  };

  return (
    <section className="generator-shell mx-auto w-full max-w-6xl animate-fadeUp px-4 py-10 md:px-6">
      <AdSlot slot="top-banner" className="mb-7" />

      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_300px]">
        <Card className="overflow-hidden border-purple-300/25 p-0">
          <div className="bg-gradient-to-r from-purple-600/30 via-indigo-500/20 to-cyan-400/15 p-6 md:p-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Generators", href: "/all-generators" },
                { label: "Fantasy Name Generator" },
              ]}
            />
            <h1 className="text-3xl font-black text-white md:text-4xl">Fantasy Name Generator</h1>
            <p className="mt-2 max-w-3xl text-slate-200">
              Craft heroic RPG names with fantasy-inspired prefixes and suffixes for knights, mages, rogues, and guild
              champions.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <span
                  key={example}
                  className="rounded-full border border-purple-300/35 bg-purple-300/10 px-3 py-1 text-xs font-semibold text-purple-100"
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
                placeholder="Optional keyword (e.g. rune, dragon, knight)"
                className="w-full rounded-xl2 border border-purple-300/30 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              />
              <Button onClick={onGenerate} disabled={isGenerating} className="md:min-w-44">
                {isGenerating ? "Summoning..." : "Generate 30 Names"}
              </Button>
            </div>

            {isGenerating ? (
              <LoadingGrid count={6} />
            ) : (
              <>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {results.slice(0, 6).map((name) => (
                    <Card key={name} className="border-purple-300/20 bg-purple-500/5 p-4 hover:border-cyan-300/55">
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
                    <Card key={name} className="border-purple-300/20 bg-purple-500/5 p-4 hover:border-cyan-300/55">
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

