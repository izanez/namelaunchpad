"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import { AdSlot } from "@/components/ads/ad-slot";
import { LoadingGrid } from "@/components/generator/loading-grid";
import { LiveCounter } from "@/components/generator/live-counter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateUsernames, type UsernameStyle } from "@/lib/generators";
import { incrementDailyGeneratedCount } from "@/lib/live-counter";

const styleOptions: UsernameStyle[] = [
  "cool",
  "funny",
  "dark",
  "aesthetic",
  "fantasy",
  "hacker",
  "streamer",
];

const themeOptions = [
  "neon",
  "shadow",
  "cyber",
  "fantasy",
  "clan",
  "anime",
  "space",
  "speed",
  "glitch",
  "stream",
] as const;

function parseKeywords(input: string) {
  return input
    .split(/[,\s]+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .slice(0, 6);
}

type AvailabilityStatus = "Available" | "Possibly taken" | "Unknown";
type Platform = "Twitch" | "TikTok" | "Instagram" | "Discord";

const platforms: Platform[] = ["Twitch", "TikTok", "Instagram", "Discord"];

type AvailabilityRecord = Record<Platform, AvailabilityStatus>;

const trendingSeeds = [
  "ShadowNova",
  "PixelGhost",
  "CyberWolf",
  "VoidRider",
  "NeonPhantom",
  "DarkVortex",
  "NovaKnight",
  "GhostByte",
  "StormReaper",
  "FrostPulse",
  "TurboDrift",
  "NightCipher",
  "BlazeRogue",
  "HyperEcho",
  "VortexRush",
];

function randomAvailability(): AvailabilityStatus {
  const roll = Math.random();
  if (roll < 0.42) return "Available";
  if (roll < 0.8) return "Possibly taken";
  return "Unknown";
}

function buildAvailability(names: string[]): Record<string, AvailabilityRecord> {
  const entries = names.map((name) => {
    const status = platforms.reduce(
      (acc, platform) => ({ ...acc, [platform]: randomAvailability() }),
      {} as AvailabilityRecord
    );
    return [name, status] as const;
  });
  return Object.fromEntries(entries);
}

function pickTrendingNames(currentResults: string[]) {
  const combined = Array.from(new Set([...currentResults, ...trendingSeeds]));
  const shuffled = [...combined].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}

export function UsernameEngine() {
  const [keywordsInput, setKeywordsInput] = useState("");
  const [targetLength, setTargetLength] = useState(12);
  const [style, setStyle] = useState<UsernameStyle>("cool");
  const [results, setResults] = useState<string[]>([]);
  const [massStyle, setMassStyle] = useState<UsernameStyle>("cool");
  const [massLength, setMassLength] = useState(12);
  const [massTheme, setMassTheme] = useState<(typeof themeOptions)[number]>("neon");
  const [massResults, setMassResults] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [availability, setAvailability] = useState<Record<string, AvailabilityRecord>>({});
  const [trending, setTrending] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isMassGenerating, setIsMassGenerating] = useState(false);
  const storageKey = useMemo(() => "gamertagforge:favorites:username-engine", []);

  const generate = () => {
    setIsGenerating(true);
    const keywords = parseKeywords(keywordsInput);
    window.setTimeout(() => {
      const names = generateUsernames({ keywords, length: targetLength, style, amount: 20 });
      startTransition(() => {
        setResults(names);
        setAvailability(buildAvailability(names));
        setTrending(pickTrendingNames(names));
      });
      incrementDailyGeneratedCount(names.length);
      setIsGenerating(false);
    }, 120);
  };

  const generateMassUsernames = () => {
    setIsMassGenerating(true);
    window.setTimeout(() => {
      const names = generateUsernames({
        keywords: [massTheme],
        length: massLength,
        style: massStyle,
        amount: 100,
      });
      startTransition(() => {
        setMassResults(names);
      });
      incrementDailyGeneratedCount(names.length);
      setIsMassGenerating(false);
    }, 120);
  };

  useEffect(() => {
    const initial = generateUsernames({ keywords: [], length: 12, style: "cool", amount: 20 });
    const initialMass = generateUsernames({ keywords: ["neon"], length: 12, style: "cool", amount: 100 });
    setResults(initial);
    setMassResults(initialMass);
    setAvailability(buildAvailability(initial));
    setTrending(pickTrendingNames(initial));
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

  useEffect(() => {
    if (results.length === 0) return;
    const interval = window.setInterval(() => {
      setTrending(pickTrendingNames(results));
    }, 8000);
    return () => window.clearInterval(interval);
  }, [results]);

  const checkAvailability = () => {
    setAvailability(buildAvailability(results));
  };

  const onCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      setToast("Username copied.");
      window.setTimeout(() => setCopied(null), 1200);
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setCopied(null);
    }
  };

  const openShare = async (platform: "twitter" | "discord" | "reddit", value: string) => {
    const encodedText = encodeURIComponent(`Check out this username: ${value}`);

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodedText}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    if (platform === "reddit") {
      window.open(
        `https://www.reddit.com/submit?title=${encodeURIComponent(`${value} username idea`)}&text=${encodedText}`,
        "_blank",
        "noopener,noreferrer"
      );
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setToast("Username copied.");
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }

    window.open(`https://discord.com/app`, "_blank", "noopener,noreferrer");
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
        <div className="space-y-7">
          <Card className="p-6 md:p-8">
            <h1 className="text-3xl font-black text-white md:text-4xl">Username Generator</h1>
            <p className="mt-2 max-w-2xl text-slate-300">
              Generate 20 powerful usernames instantly. Mix keywords, pick style, and tune the exact name length.
            </p>
            <LiveCounter />

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <input
                value={keywordsInput}
                onChange={(event) => setKeywordsInput(event.target.value)}
                placeholder="Keywords (e.g. shadow, neon, wolf)"
                className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70 md:col-span-2"
              />
              <select
                value={style}
                onChange={(event) => setStyle(event.target.value as UsernameStyle)}
                className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
              >
                {styleOptions.map((styleName) => (
                  <option key={styleName} value={styleName}>
                    {styleName.charAt(0).toUpperCase() + styleName.slice(1)}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-3 grid items-center gap-3 md:grid-cols-[1fr_auto_auto]">
              <div className="rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
                <label htmlFor="targetLength" className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Length: {targetLength}
                </label>
                <input
                  id="targetLength"
                  type="range"
                  min={6}
                  max={20}
                  value={targetLength}
                  onChange={(event) => setTargetLength(Number(event.target.value))}
                  className="mt-2 w-full accent-cyan-300"
                />
              </div>
              <Button onClick={generate} disabled={isGenerating} className="md:min-w-40">
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
              <Button variant="ghost" onClick={generate} disabled={isGenerating} className="md:min-w-40">
                {isGenerating ? "Refreshing..." : "Regenerate"}
              </Button>
            </div>
            <div className="mt-3">
              <Button variant="ghost" onClick={checkAvailability} disabled={isGenerating} className="w-full md:w-auto">
                Check Availability
              </Button>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
              <span>Output: 20 usernames</span>
              <span>Style: {style}</span>
            </div>

            {isGenerating ? (
              <LoadingGrid count={8} detailed />
            ) : (
              <>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {results.slice(0, 8).map((name) => (
                    <Card key={name} className="p-4">
                      <p className="break-words text-sm font-semibold text-slate-100">{name}</p>
                      <div className="mt-3 space-y-1">
                        {platforms.map((platform) => {
                          const status = availability[name]?.[platform] ?? "Unknown";
                          const statusClass =
                            status === "Available"
                              ? "border-emerald-300/35 bg-emerald-400/10 text-emerald-200"
                              : status === "Possibly taken"
                                ? "border-amber-300/35 bg-amber-400/10 text-amber-200"
                                : "border-slate-300/25 bg-slate-500/10 text-slate-300";
                          return (
                            <div key={`${name}-${platform}`} className="flex items-center justify-between text-xs">
                              <span className="text-slate-400">{platform}</span>
                              <span className={`rounded-full border px-2 py-0.5 ${statusClass}`}>{status}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                          {copied === name ? "Copied" : "Copy Username"}
                        </Button>
                        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onToggleFavorite(name)}>
                          {favorites.includes(name) ? "Favorited" : "Favorite"}
                        </Button>
                      </div>
                      <div className="mt-2 grid gap-2 sm:grid-cols-3">
                        <Button variant="ghost" className="px-2 py-2 text-[11px]" onClick={() => openShare("twitter", name)}>
                          Share on Twitter
                        </Button>
                        <Button variant="ghost" className="px-2 py-2 text-[11px]" onClick={() => openShare("discord", name)}>
                          Share on Discord
                        </Button>
                        <Button variant="ghost" className="px-2 py-2 text-[11px]" onClick={() => openShare("reddit", name)}>
                          Share on Reddit
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>

                <AdSlot slot="between-results" className="mt-6" />

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {results.slice(8).map((name) => (
                    <Card key={name} className="p-4">
                      <p className="break-words text-sm font-semibold text-slate-100">{name}</p>
                      <div className="mt-3 space-y-1">
                        {platforms.map((platform) => {
                          const status = availability[name]?.[platform] ?? "Unknown";
                          const statusClass =
                            status === "Available"
                              ? "border-emerald-300/35 bg-emerald-400/10 text-emerald-200"
                              : status === "Possibly taken"
                                ? "border-amber-300/35 bg-amber-400/10 text-amber-200"
                                : "border-slate-300/25 bg-slate-500/10 text-slate-300";
                          return (
                            <div key={`${name}-${platform}`} className="flex items-center justify-between text-xs">
                              <span className="text-slate-400">{platform}</span>
                              <span className={`rounded-full border px-2 py-0.5 ${statusClass}`}>{status}</span>
                            </div>
                          );
                        })}
                      </div>
                      <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                          {copied === name ? "Copied" : "Copy Username"}
                        </Button>
                        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onToggleFavorite(name)}>
                          {favorites.includes(name) ? "Favorited" : "Favorite"}
                        </Button>
                      </div>
                      <div className="mt-2 grid gap-2 sm:grid-cols-3">
                        <Button variant="ghost" className="px-2 py-2 text-[11px]" onClick={() => openShare("twitter", name)}>
                          Share on Twitter
                        </Button>
                        <Button variant="ghost" className="px-2 py-2 text-[11px]" onClick={() => openShare("discord", name)}>
                          Share on Discord
                        </Button>
                        <Button variant="ghost" className="px-2 py-2 text-[11px]" onClick={() => openShare("reddit", name)}>
                          Share on Reddit
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-white">Mass Username Generator</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Generate 100 usernames at once with a focused style, target length, and theme.
                </p>
              </div>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                100 names
              </span>
            </div>

            <div className="mt-5 grid gap-3 lg:grid-cols-3">
              <select
                value={massStyle}
                onChange={(event) => setMassStyle(event.target.value as UsernameStyle)}
                className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
              >
                {styleOptions.map((styleName) => (
                  <option key={`mass-${styleName}`} value={styleName}>
                    {styleName.charAt(0).toUpperCase() + styleName.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={massTheme}
                onChange={(event) => setMassTheme(event.target.value as (typeof themeOptions)[number])}
                className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
              >
                {themeOptions.map((themeName) => (
                  <option key={themeName} value={themeName}>
                    {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                  </option>
                ))}
              </select>

              <div className="rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
                <label htmlFor="massLength" className="text-xs font-semibold uppercase tracking-wide text-slate-300">
                  Length: {massLength}
                </label>
                <input
                  id="massLength"
                  type="range"
                  min={6}
                  max={20}
                  value={massLength}
                  onChange={(event) => setMassLength(Number(event.target.value))}
                  className="mt-2 w-full accent-cyan-300"
                />
              </div>
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button onClick={generateMassUsernames} disabled={isMassGenerating} className="sm:min-w-52">
                {isMassGenerating ? "Generating 100..." : "Generate 100 Usernames"}
              </Button>
              <Button
                variant="ghost"
                onClick={generateMassUsernames}
                disabled={isMassGenerating}
                className="sm:min-w-52"
              >
                {isMassGenerating ? "Refreshing..." : "Regenerate Batch"}
              </Button>
            </div>

            <div className="mt-4 flex items-center justify-between text-xs text-slate-400">
              <span>Theme: {massTheme}</span>
              <span>Scrollable batch grid with one-click copy</span>
            </div>

            {isMassGenerating ? (
              <div className="mt-5">
                <LoadingGrid count={12} />
              </div>
            ) : (
              <div className="mt-5 max-h-[40rem] overflow-y-auto rounded-[28px] border border-white/10 bg-slate-950/35 p-3">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {massResults.map((name) => (
                    <Card key={`mass-${name}`} className="p-3">
                      <p className="break-words text-sm font-semibold text-slate-100">{name}</p>
                      <Button variant="ghost" className="mt-3 w-full px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                        {copied === name ? "Copied" : "Copy Username"}
                      </Button>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Trending Usernames</h2>
              <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => setTrending(pickTrendingNames(results))}>
                Refresh
              </Button>
            </div>
            <p className="mt-2 text-xs text-slate-400">Live popular picks. Auto-updates every few seconds.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {trending.map((name, index) => (
                <div
                  key={`${name}-${index}`}
                  className="flex items-center justify-between rounded-xl2 border border-white/15 bg-white/5 px-3 py-2"
                >
                  <span className="text-xs text-cyan-300">#{index + 1}</span>
                  <span className="text-sm font-semibold text-slate-100">{name}</span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-white">Favorites</h2>
              <span className="text-xs text-slate-400">{favorites.length} saved</span>
            </div>
            {favorites.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">No favorites yet. Star usernames you want to keep.</p>
            ) : (
              <div className="mt-4 grid gap-2">
                {favorites.map((fav) => (
                  <div
                    key={fav}
                    className="flex items-center justify-between rounded-xl2 border border-cyan-300/25 bg-cyan-400/5 px-3 py-2"
                  >
                    <span className="text-sm text-cyan-100">{fav}</span>
                    <div className="flex gap-2">
                      <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => onCopy(fav)}>
                        {copied === fav ? "Copied" : "Copy Username"}
                      </Button>
                      <Button
                        variant="ghost"
                        className="px-3 py-1.5 text-xs"
                        onClick={() => setFavorites((current) => current.filter((item) => item !== fav))}
                      >
                        Delete
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        <div className="xl:sticky xl:top-24 xl:self-start">
          <AdSlot slot="sidebar" />
        </div>
      </div>

      {toast ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 animate-fadeUp rounded-xl2 border border-cyan-300/35 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan-100 shadow-neon backdrop-blur-xl">
          {toast}
        </div>
      ) : null}
    </section>
  );
}
