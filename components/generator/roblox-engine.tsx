"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { LoadingGrid } from "@/components/generator/loading-grid";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateRobloxNames } from "@/lib/generators";
import { trackGeneratorUsage } from "@/lib/generator-stats";

const examples = ["BlockyWarrior", "PixelBuilder", "NoobDestroyer", "ObbyMaster", "CubeChampion"];

export function RobloxEngine() {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const storageKey = useMemo(() => "namelaunchpad:favorites:roblox-engine", []);

  const onGenerate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      startTransition(() => {
        const next = generateRobloxNames({ keyword, amount: 30 });
        setResults(next);
        trackGeneratorUsage("roblox-username-generator", next.length);
      });
      setIsGenerating(false);
    }, 120);
  };

  useEffect(() => {
    setResults(generateRobloxNames({ amount: 30 }));
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
        <Card className="overflow-hidden border-cyan-300/25 p-0">
          <div className="bg-gradient-to-r from-cyan-500/25 via-blue-500/20 to-emerald-400/20 p-6 md:p-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Generators", href: "/all-generators" },
                { label: "Roblox Username Generator" },
              ]}
            />
            <h1 className="text-3xl font-black text-white md:text-4xl">Roblox Username Generator</h1>
            <p className="mt-2 max-w-3xl text-slate-200">
              Create kid-friendly Roblox usernames with playful block-style words. All suggestions are filtered to avoid
              offensive terms.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {examples.map((example) => (
                <span
                  key={example}
                  className="rounded-full border border-emerald-300/35 bg-emerald-300/10 px-3 py-1 text-xs font-semibold text-emerald-100"
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
                placeholder="Optional keyword (e.g. block, obby, cube)"
                className="w-full rounded-xl2 border border-cyan-300/30 bg-slate-900/70 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-emerald-300/70"
              />
              <Button onClick={onGenerate} disabled={isGenerating} className="md:min-w-44">
                {isGenerating ? "Building..." : "Generate 30 Names"}
              </Button>
            </div>

            {isGenerating ? (
              <LoadingGrid count={6} />
            ) : (
              <>
                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {results.slice(0, 6).map((name) => (
                    <Card key={name} className="border-cyan-300/20 bg-cyan-500/5 p-4 hover:border-emerald-300/55">
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
                    <Card key={name} className="border-cyan-300/20 bg-cyan-500/5 p-4 hover:border-emerald-300/55">
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

