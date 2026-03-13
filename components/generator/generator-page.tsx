"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { LoadingGrid } from "@/components/generator/loading-grid";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateTags, type GeneratorType } from "@/lib/generators";
import { trackGeneratorUsage, trackGlobalGenerationEvent } from "@/lib/generator-stats";

type GeneratorPageProps = {
  type: GeneratorType;
  title: string;
  description: string;
};

export function GeneratorPage({ type, title, description }: GeneratorPageProps) {
  const [seed, setSeed] = useState("");
  const [results, setResults] = useState<string[]>(() => generateTags(type));
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const canGenerate = useMemo(() => seed.trim().length <= 25, [seed]);
  const storageKey = useMemo(() => `namelaunchpad:favorites:${type}`, [type]);

  useEffect(() => {
    const cached = window.localStorage.getItem(storageKey);
    if (!cached) return;
    try {
      const parsed = JSON.parse(cached) as string[];
      if (Array.isArray(parsed)) setFavorites(parsed.slice(0, 24));
    } catch {
      setFavorites([]);
    }
  }, [storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  const onGenerate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      const next = generateTags(type, seed);
      startTransition(() => {
        setResults(next);
      });
      trackGeneratorUsage(`${type}-generator`, next.length);
      trackGlobalGenerationEvent({ generatorSlug: `${type}-generator`, amount: next.length, usernames: next });
      setIsGenerating(false);
    }, 120);
  };

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
      current.includes(value) ? current.filter((f) => f !== value) : [value, ...current].slice(0, 24)
    );
  };

  return (
    <section className="generator-shell mx-auto w-full max-w-6xl animate-fadeUp px-4 py-10 md:px-6">
      <AdSlot slot="top-banner" className="mb-7" />

      <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-7">
          <Card className="p-6 md:p-8">
            <Breadcrumbs
              items={[
                { label: "Home", href: "/" },
                { label: "Generators", href: "/all-generators" },
                { label: title },
              ]}
            />
            <h1 className="text-3xl font-black text-white md:text-4xl">{title}</h1>
            <p className="mt-2 max-w-2xl text-slate-300">{description}</p>

            <div className="mt-6 flex flex-col gap-3 md:flex-row">
              <input
                value={seed}
                onChange={(e) => setSeed(e.target.value)}
                placeholder="Optional keyword (e.g. Nova, Shadow, Wolf)"
                className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              />
              <Button onClick={onGenerate} disabled={!canGenerate || isGenerating} className="md:min-w-44">
                {isGenerating ? "Forging..." : "Generate Names"}
              </Button>
            </div>

            {isGenerating ? (
              <LoadingGrid count={6} />
            ) : (
              <>
                <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {results.slice(0, 3).map((name) => (
                    <Card key={name} className="group p-4">
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
                  {results.slice(3).map((name) => (
                    <Card key={name} className="group p-4">
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
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Favorites</h2>
              <span className="text-xs text-slate-400">{favorites.length} saved</span>
            </div>
            {favorites.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">No favorites yet. Save names you want to keep.</p>
            ) : (
              <div className="mt-4 flex flex-wrap gap-2">
                {favorites.map((fav) => (
                  <span
                    key={fav}
                    className="rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-sm text-cyan-100"
                  >
                    {fav}
                  </span>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <AdSlot slot="sidebar" />
        </div>
      </div>
    </section>
  );
}
