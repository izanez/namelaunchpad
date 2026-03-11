"use client";

import { memo, startTransition, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { AdSlot } from "@/components/ads/ad-slot";
import { LoadingGrid } from "@/components/generator/loading-grid";
import { LiveCounter } from "@/components/generator/live-counter";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  generateSimilarUsernames,
  generateUsernames,
  type UsernameLengthFilter,
  type UsernameStyle,
} from "@/lib/generators";
import { incrementDailyGeneratedCount } from "@/lib/live-counter";
import { trackGeneratorUsage } from "@/lib/generator-stats";
import { trackRecentGeneratedUsernames } from "@/lib/recent-generated-usernames";
import { trackGeneratedUsernames } from "@/lib/trending-usernames";
import { buildUnverifiedAvailability, type AvailabilityRecord } from "@/lib/username-availability";

const styleOptions: UsernameStyle[] = [
  "cool",
  "aesthetic",
  "dark",
  "funny",
  "fantasy",
  "hacker",
  "anime",
  "streamer",
];

type UsernameCategory =
  | "cool-usernames"
  | "funny-usernames"
  | "short-usernames"
  | "rare-usernames"
  | "aesthetic-usernames"
  | "anime-usernames"
  | "fantasy-usernames";

const categoryOptions: Array<{
  value: UsernameCategory;
  label: string;
  style: UsernameStyle;
  length?: UsernameLengthFilter;
  keywords: string[];
}> = [
  { value: "cool-usernames", label: "Cool Usernames", style: "cool", keywords: ["nova", "cyber"] },
  { value: "funny-usernames", label: "Funny Usernames", style: "funny", keywords: ["meme", "waffle"] },
  { value: "short-usernames", label: "Short Usernames", style: "cool", length: "short", keywords: ["neo", "zyro"] },
  { value: "rare-usernames", label: "Rare Usernames", style: "dark", length: "short", keywords: ["og", "void"] },
  { value: "aesthetic-usernames", label: "Aesthetic Usernames", style: "aesthetic", keywords: ["luna", "aura"] },
  { value: "anime-usernames", label: "Anime Usernames", style: "anime", keywords: ["kage", "sakura"] },
  { value: "fantasy-usernames", label: "Fantasy Usernames", style: "fantasy", keywords: ["rune", "dragon"] },
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

const lengthOptions: Array<{
  value: UsernameLengthFilter;
  label: string;
  description: string;
  min: number;
  max: number;
}> = [
  { value: "short", label: "Short", description: "4-6 characters", min: 4, max: 6 },
  { value: "medium", label: "Medium", description: "7-10 characters", min: 7, max: 10 },
  { value: "long", label: "Long", description: "11-15 characters", min: 11, max: 15 },
];

const lengthFinderQuickFilters = [
  { label: "4 letter usernames", min: 4, max: 4, style: "cool" as UsernameStyle },
  { label: "5 letter usernames", min: 5, max: 5, style: "cool" as UsernameStyle },
  { label: "6 letter usernames", min: 6, max: 6, style: "cool" as UsernameStyle },
  { label: "short gamer tags", min: 4, max: 6, style: "dark" as UsernameStyle },
];

function getLengthRange(filter: UsernameLengthFilter) {
  return lengthOptions.find((option) => option.value === filter) ?? lengthOptions[1];
}

function parseKeywords(input: string) {
  return input
    .split(/[,\s]+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .slice(0, 6);
}

type Platform = keyof AvailabilityRecord;

const platforms: Platform[] = ["Twitch", "TikTok", "Instagram"];

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

function pickTrendingNames(currentResults: string[]) {
  const combined = Array.from(new Set([...currentResults, ...trendingSeeds]));
  const shuffled = [...combined].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 10);
}

function createShareLink(value: string) {
  if (typeof window === "undefined") {
    return `/username-generator?keywords=${encodeURIComponent(value)}`;
  }

  return `${window.location.origin}/username-generator?keywords=${encodeURIComponent(value)}`;
}

function downloadTextFile(filename: string, content: string, mimeType: string) {
  if (typeof window === "undefined") return;

  const blob = new Blob([content], { type: mimeType });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  window.URL.revokeObjectURL(url);
}

type ResultCardProps = {
  name: string;
  favorite: boolean;
  availability?: AvailabilityRecord;
  isShareOpen: boolean;
  onCopy: (value: string) => void;
  onOpenShare: (value: string | null) => void;
  onShareAction: (platform: "copy-link" | "twitter" | "discord" | "reddit", value: string) => void;
  onGenerateSimilar: (value: string) => void;
  onToggleFavorite: (value: string) => void;
};

const ResultCard = memo(function ResultCard({
  name,
  favorite,
  availability,
  isShareOpen,
  onCopy,
  onOpenShare,
  onShareAction,
  onGenerateSimilar,
  onToggleFavorite,
}: ResultCardProps) {
  return (
    <Card className="relative p-4">
      <button
        type="button"
        onClick={() => onGenerateSimilar(name)}
        className="break-words text-left text-sm font-semibold text-slate-100 transition hover:text-cyan-200"
      >
        {name}
      </button>
      <div className="mt-3 space-y-1">
        {platforms.map((platform) => {
          const status = availability?.[platform] ?? "Unavailable";
          const statusClass =
            status === "Available"
              ? "border-emerald-300/35 bg-emerald-400/10 text-emerald-200"
              : status === "Possibly taken"
                ? "border-amber-300/35 bg-amber-400/10 text-amber-200"
                : "border-rose-300/30 bg-rose-500/10 text-rose-200";
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
          Copy Username
        </Button>
        <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onToggleFavorite(name)}>
          {favorite ? "Favorited" : "Favorite"}
        </Button>
        <Button
          variant="ghost"
          className="px-3 py-2 text-xs"
          onClick={() => onOpenShare(isShareOpen ? null : name)}
        >
          Share
        </Button>
      </div>
      {isShareOpen ? (
        <div className="absolute right-4 top-[calc(100%-0.5rem)] z-20 w-44 rounded-xl2 border border-white/15 bg-slate-950/95 p-2 shadow-neon backdrop-blur-xl">
          <div className="grid gap-1">
            <button
              type="button"
              onClick={() => onShareAction("copy-link", name)}
              className="rounded-lg px-3 py-2 text-left text-xs text-slate-200 transition hover:bg-white/8 hover:text-cyan-200"
            >
              Copy link
            </button>
            <button
              type="button"
              onClick={() => onShareAction("twitter", name)}
              className="rounded-lg px-3 py-2 text-left text-xs text-slate-200 transition hover:bg-white/8 hover:text-cyan-200"
            >
              Twitter
            </button>
            <button
              type="button"
              onClick={() => onShareAction("reddit", name)}
              className="rounded-lg px-3 py-2 text-left text-xs text-slate-200 transition hover:bg-white/8 hover:text-cyan-200"
            >
              Reddit
            </button>
            <button
              type="button"
              onClick={() => onShareAction("discord", name)}
              className="rounded-lg px-3 py-2 text-left text-xs text-slate-200 transition hover:bg-white/8 hover:text-cyan-200"
            >
              Discord
            </button>
          </div>
        </div>
      ) : null}
    </Card>
  );
});

const MassResultCard = memo(function MassResultCard({
  name,
  onCopy,
}: {
  name: string;
  onCopy: (value: string) => void;
}) {
  return (
    <Card className="p-3">
      <p className="break-words text-sm font-semibold text-slate-100">{name}</p>
      <Button variant="ghost" className="mt-3 w-full px-3 py-2 text-xs" onClick={() => onCopy(name)}>
        Copy Username
      </Button>
    </Card>
  );
});

const FavoriteRow = memo(function FavoriteRow({
  value,
  onCopy,
  onDelete,
}: {
  value: string;
  onCopy: (value: string) => void;
  onDelete: (value: string) => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl2 border border-cyan-300/25 bg-cyan-400/5 px-3 py-2">
      <span className="text-sm text-cyan-100">{value}</span>
      <div className="flex gap-2">
        <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => onCopy(value)}>
          Copy Username
        </Button>
        <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => onDelete(value)}>
          Delete
        </Button>
      </div>
    </div>
  );
});

export function UsernameEngine({
  generatorKey = "username-generator",
  breadcrumbTitle = "Username Generator",
}: {
  generatorKey?: string;
  breadcrumbTitle?: string;
}) {
  const searchParams = useSearchParams();
  const [keywordsInput, setKeywordsInput] = useState("");
  const [lengthFilter, setLengthFilter] = useState<UsernameLengthFilter>("medium");
  const [style, setStyle] = useState<UsernameStyle>("cool");
  const [category, setCategory] = useState<UsernameCategory>("cool-usernames");
  const [results, setResults] = useState<string[]>([]);
  const [lengthFinderMin, setLengthFinderMin] = useState(4);
  const [lengthFinderMax, setLengthFinderMax] = useState(6);
  const [lengthFinderResults, setLengthFinderResults] = useState<string[]>([]);
  const [lengthFinderStyle, setLengthFinderStyle] = useState<UsernameStyle>("cool");
  const [massStyle, setMassStyle] = useState<UsernameStyle>("cool");
  const [massLengthFilter, setMassLengthFilter] = useState<UsernameLengthFilter>("medium");
  const [massTheme, setMassTheme] = useState<(typeof themeOptions)[number]>("neon");
  const [massResults, setMassResults] = useState<string[]>([]);
  const [selectedBaseName, setSelectedBaseName] = useState<string | null>(null);
  const [similarResults, setSimilarResults] = useState<string[]>([]);
  const [activeShareName, setActiveShareName] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [availability, setAvailability] = useState<Record<string, AvailabilityRecord>>({});
  const [trending, setTrending] = useState<string[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);
  const [isLengthFinding, setIsLengthFinding] = useState(false);
  const [isMassGenerating, setIsMassGenerating] = useState(false);
  const storageKey = useMemo(() => "namelaunchpad:favorites:username-engine", []);

  const topResults = useMemo(() => results.slice(0, 8), [results]);
  const bottomResults = useMemo(() => results.slice(8), [results]);
  const selectedCategory = useMemo(
    () => categoryOptions.find((option) => option.value === category) ?? categoryOptions[0],
    [category]
  );
  const activeLengthRange = useMemo(() => getLengthRange(lengthFilter), [lengthFilter]);
  const activeMassLengthRange = useMemo(() => getLengthRange(massLengthFilter), [massLengthFilter]);
  const effectiveStyle = style;
  const effectiveLengthRange = activeLengthRange;

  const generateBatch = useCallback(
    (existingNames: string[] = [], amount = 20) => {
      const keywords = parseKeywords(keywordsInput);
      const combinedKeywords = Array.from(new Set([...selectedCategory.keywords, ...keywords]));
      const uniqueNames = new Set(existingNames);
      let attempts = 0;

      while (uniqueNames.size < existingNames.length + amount && attempts < 8) {
        const names = generateUsernames({
          keywords: combinedKeywords,
          length: effectiveLengthRange.max,
          minLength: effectiveLengthRange.min,
          maxLength: effectiveLengthRange.max,
          style: effectiveStyle,
          amount,
        });

        names.forEach((name) => uniqueNames.add(name));
        attempts += 1;
      }

      return Array.from(uniqueNames).slice(existingNames.length, existingNames.length + amount);
    },
    [effectiveLengthRange.max, effectiveLengthRange.min, effectiveStyle, keywordsInput, selectedCategory.keywords]
  );

  const generateLengthFinderResults = useCallback(
    (minLength: number, maxLength: number, finderStyle: UsernameStyle, amount = 24) => {
      const safeMin = Math.max(4, Math.min(15, Math.floor(minLength)));
      const safeMax = Math.max(safeMin, Math.min(15, Math.floor(maxLength)));
      const keywords = parseKeywords(keywordsInput);
      const combinedKeywords = Array.from(new Set([...selectedCategory.keywords, ...keywords]));
      const uniqueNames = new Set<string>();
      let attempts = 0;

      while (uniqueNames.size < amount && attempts < 10) {
        const names = generateUsernames({
          keywords: combinedKeywords,
          length: safeMax,
          minLength: safeMin,
          maxLength: safeMax,
          style: finderStyle,
          amount,
        });

        names.forEach((name) => uniqueNames.add(name));
        attempts += 1;
      }

      return Array.from(uniqueNames).slice(0, amount);
    },
    [keywordsInput, selectedCategory.keywords]
  );

  const applyGeneratedNames = useCallback(
    (names: string[], mode: "replace" | "append") => {
      const nextResults = mode === "append" ? [...results, ...names] : names;

      startTransition(() => {
        setResults(nextResults);
        setAvailability((current) => ({
          ...(mode === "append" ? current : {}),
          ...buildUnverifiedAvailability(names),
        }));
        setTrending(pickTrendingNames(nextResults));
      });

      incrementDailyGeneratedCount(names.length);
      trackGeneratorUsage(generatorKey, names.length);
      trackGeneratedUsernames(names);
      trackRecentGeneratedUsernames(names);
    },
    [generatorKey, results]
  );

  const generate = useCallback(() => {
    setIsGenerating(true);
    window.setTimeout(() => {
      const names = generateBatch([], 20);
      applyGeneratedNames(names, "replace");
      setIsGenerating(false);
    }, 120);
  }, [applyGeneratedNames, generateBatch]);

  const generateMore = useCallback(() => {
    setIsGenerating(true);
    window.setTimeout(() => {
      const names = generateBatch(results, 20);
      applyGeneratedNames(names, "append");
      setIsGenerating(false);
    }, 120);
  }, [applyGeneratedNames, generateBatch, results]);

  const generateMassUsernames = useCallback(() => {
    setIsMassGenerating(true);
    window.setTimeout(() => {
      const names = generateUsernames({
        keywords: [massTheme],
        length: activeMassLengthRange.max,
        minLength: activeMassLengthRange.min,
        maxLength: activeMassLengthRange.max,
        style: massStyle,
        amount: 100,
      });
      startTransition(() => {
        setMassResults(names);
      });
      incrementDailyGeneratedCount(names.length);
      trackGeneratorUsage(generatorKey, names.length);
      trackGeneratedUsernames(names);
      trackRecentGeneratedUsernames(names);
      setIsMassGenerating(false);
    }, 120);
  }, [activeMassLengthRange.max, activeMassLengthRange.min, generatorKey, massStyle, massTheme]);

  useEffect(() => {
    const initial = generateUsernames({ keywords: [], length: 10, minLength: 7, maxLength: 10, style: "cool", amount: 20 });
    const initialLengthFinder = generateUsernames({
      keywords: ["neo"],
      length: 6,
      minLength: 4,
      maxLength: 6,
      style: "cool",
      amount: 24,
    });
    const initialMass = generateUsernames({
      keywords: ["neon"],
      length: 10,
      minLength: 7,
      maxLength: 10,
      style: "cool",
      amount: 100,
    });
    setResults(initial);
    setLengthFinderResults(initialLengthFinder);
    setMassResults(initialMass);
    setAvailability(buildUnverifiedAvailability(initial));
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
    const keywordsFromUrl = searchParams.get("keywords");
    if (!keywordsFromUrl) return;

    const cleanedKeywords = keywordsFromUrl
      .split(/[,\s]+/)
      .map((token) => token.trim())
      .filter(Boolean)
      .slice(0, 6)
      .join(", ");

    if (!cleanedKeywords) return;

    setKeywordsInput(cleanedKeywords);
    const names = generateUsernames({
      keywords: Array.from(new Set([...selectedCategory.keywords, ...parseKeywords(cleanedKeywords)])),
      length: effectiveLengthRange.max,
      minLength: effectiveLengthRange.min,
      maxLength: effectiveLengthRange.max,
      style: effectiveStyle,
      amount: 20,
    });
    setResults(names);
    setAvailability(buildUnverifiedAvailability(names));
    setTrending(pickTrendingNames(names));
  }, [effectiveLengthRange.max, effectiveLengthRange.min, effectiveStyle, searchParams, selectedCategory.keywords]);

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

  const checkAvailability = useCallback(() => {
    if (results.length === 0) return;

    setIsCheckingAvailability(true);

    void fetch("/api/check-username-availability", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        usernames: results.slice(0, 20),
      }),
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Availability check failed.");
        }

        const data = (await response.json()) as {
          availability?: Record<string, AvailabilityRecord>;
        };

        if (data.availability) {
          setAvailability((current) => ({
            ...current,
            ...data.availability,
          }));
          setToast("Availability updated.");
          window.setTimeout(() => setToast(null), 1800);
        }
      })
      .catch(() => {
        setToast("Availability check could not be completed.");
        window.setTimeout(() => setToast(null), 1800);
      })
      .finally(() => {
        setIsCheckingAvailability(false);
      });
  }, [results]);

  const onCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast("Username copied.");
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }
  }, []);

  const onShareAction = useCallback(async (platform: "copy-link" | "twitter" | "discord" | "reddit", value: string) => {
    const shareLink = createShareLink(value);
    const encodedText = encodeURIComponent(`Check out this username: ${value}`);
    const encodedLink = encodeURIComponent(shareLink);

    if (platform === "copy-link") {
      try {
        await navigator.clipboard.writeText(shareLink);
        setToast("Share link copied.");
      } catch {
        setToast(null);
      }
      window.setTimeout(() => setToast(null), 1800);
      setActiveShareName(null);
      return;
    }

    if (platform === "twitter") {
      window.open(
        `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedLink}`,
        "_blank",
        "noopener,noreferrer"
      );
      setActiveShareName(null);
      return;
    }

    if (platform === "reddit") {
      window.open(
        `https://www.reddit.com/submit?title=${encodeURIComponent(`${value} username idea`)}&text=${encodedText}%20${encodedLink}`,
        "_blank",
        "noopener,noreferrer"
      );
      setActiveShareName(null);
      return;
    }

    try {
      await navigator.clipboard.writeText(shareLink);
      setToast("Share link copied.");
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }

    setActiveShareName(null);
    window.open(`https://discord.com/app`, "_blank", "noopener,noreferrer");
  }, []);

  const onToggleFavorite = useCallback((value: string) => {
    setFavorites((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [value, ...current].slice(0, 40)
    );
  }, []);

  const onDeleteFavorite = useCallback((value: string) => {
    setFavorites((current) => current.filter((item) => item !== value));
  }, []);

  const onExportFavoritesTxt = useCallback(() => {
    if (favorites.length === 0) return;
    downloadTextFile("namelaunchpad-favorites.txt", favorites.join("\n"), "text/plain;charset=utf-8");
    setToast("Favorites exported as TXT.");
    window.setTimeout(() => setToast(null), 1800);
  }, [favorites]);

  const onExportFavoritesCsv = useCallback(() => {
    if (favorites.length === 0) return;
    const csvContent = ["username", ...favorites.map((value) => `"${value.replace(/"/g, '""')}"`)].join("\n");
    downloadTextFile("namelaunchpad-favorites.csv", csvContent, "text/csv;charset=utf-8");
    setToast("Favorites exported as CSV.");
    window.setTimeout(() => setToast(null), 1800);
  }, [favorites]);

  const onCopyFavoritesList = useCallback(async () => {
    if (favorites.length === 0) return;

    try {
      await navigator.clipboard.writeText(favorites.join("\n"));
      setToast("Favorites list copied.");
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }
  }, [favorites]);

  const onGenerateSimilar = useCallback(
    (value: string) => {
      const similar = generateSimilarUsernames({
        baseName: value,
        style: effectiveStyle,
        amount: 10,
        minLength: effectiveLengthRange.min,
        maxLength: effectiveLengthRange.max,
      });
      setSelectedBaseName(value);
      setSimilarResults(similar);
    },
    [effectiveLengthRange.max, effectiveLengthRange.min, effectiveStyle]
  );

  const runLengthFinder = useCallback(() => {
    setIsLengthFinding(true);
    window.setTimeout(() => {
      const names = generateLengthFinderResults(lengthFinderMin, lengthFinderMax, lengthFinderStyle);
      startTransition(() => {
        setLengthFinderResults(names);
      });
      incrementDailyGeneratedCount(names.length);
      trackGeneratorUsage(`${generatorKey}-length-finder`, names.length);
      trackGeneratedUsernames(names);
      trackRecentGeneratedUsernames(names);
      setIsLengthFinding(false);
    }, 120);
  }, [generateLengthFinderResults, generatorKey, lengthFinderMax, lengthFinderMin, lengthFinderStyle]);

  const applyLengthQuickFilter = useCallback(
    (min: number, max: number, finderStyle: UsernameStyle) => {
      setLengthFinderMin(min);
      setLengthFinderMax(max);
      setLengthFinderStyle(finderStyle);
      setIsLengthFinding(true);
      window.setTimeout(() => {
        const names = generateLengthFinderResults(min, max, finderStyle);
        startTransition(() => {
          setLengthFinderResults(names);
        });
        incrementDailyGeneratedCount(names.length);
        trackGeneratorUsage(`${generatorKey}-length-finder`, names.length);
        trackGeneratedUsernames(names);
        trackRecentGeneratedUsernames(names);
        setIsLengthFinding(false);
      }, 120);
    },
    [generateLengthFinderResults, generatorKey]
  );

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
                { label: breadcrumbTitle },
              ]}
            />
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

            <div className="mt-3 rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Username Category</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
                {categoryOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setCategory(option.value);
                      setStyle(option.style);
                      if (option.length) setLengthFilter(option.length);
                    }}
                    className={`rounded-xl border px-3 py-2 text-left transition ${
                      category === option.value
                        ? "border-cyan-300/60 bg-cyan-300/12 text-cyan-100"
                        : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/35 hover:text-white"
                    }`}
                  >
                    <span className="block text-sm font-semibold">{option.label}</span>
                    <span className="block text-xs text-slate-400">
                      {option.length ? `${option.style} / ${option.length}` : option.style}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-3 grid items-center gap-3 md:grid-cols-[1fr_auto_auto]">
              <div className="rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Username Length</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  {lengthOptions.map((option) => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setLengthFilter(option.value)}
                      className={`rounded-xl border px-3 py-2 text-left transition ${
                        lengthFilter === option.value
                          ? "border-cyan-300/60 bg-cyan-300/12 text-cyan-100"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/35 hover:text-white"
                      }`}
                    >
                      <span className="block text-sm font-semibold">{option.label}</span>
                      <span className="block text-xs text-slate-400">{option.description}</span>
                    </button>
                  ))}
                </div>
              </div>
              <Button onClick={generate} disabled={isGenerating} className="md:min-w-40">
                {isGenerating ? "Generating..." : "Generate"}
              </Button>
              <Button variant="ghost" onClick={generate} disabled={isGenerating} className="md:min-w-40">
                {isGenerating ? "Refreshing..." : "Regenerate"}
              </Button>
            </div>
            <div className="mt-3">
              <div className="flex flex-col gap-3 md:flex-row">
                <Button
                  variant="ghost"
                  onClick={checkAvailability}
                  disabled={isGenerating || isCheckingAvailability}
                  className="w-full md:w-auto"
                >
                  {isCheckingAvailability ? "Checking..." : "Check Availability"}
                </Button>
                <Button onClick={generateMore} disabled={isGenerating} className="w-full md:w-auto">
                  {isGenerating ? "Generating More..." : "Generate More"}
                </Button>
              </div>
            </div>

            <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
              <span>Output: {results.length} usernames</span>
              <span>
                Category: {selectedCategory.label} | Style: {effectiveStyle} | Length: {effectiveLengthRange.label} ({effectiveLengthRange.description})
              </span>
            </div>

            {isGenerating ? (
              <LoadingGrid count={8} detailed />
            ) : (
              <>
                <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {topResults.map((name) => (
                    <ResultCard
                      key={name}
                      name={name}
                      favorite={favorites.includes(name)}
                      availability={availability[name]}
                      isShareOpen={activeShareName === name}
                      onCopy={onCopy}
                      onOpenShare={setActiveShareName}
                      onShareAction={onShareAction}
                      onGenerateSimilar={onGenerateSimilar}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>

                <AdSlot slot="between-results" className="mt-6" />

                <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {bottomResults.map((name) => (
                    <ResultCard
                      key={name}
                      name={name}
                      favorite={favorites.includes(name)}
                      availability={availability[name]}
                      isShareOpen={activeShareName === name}
                      onCopy={onCopy}
                      onOpenShare={setActiveShareName}
                      onShareAction={onShareAction}
                      onGenerateSimilar={onGenerateSimilar}
                      onToggleFavorite={onToggleFavorite}
                    />
                  ))}
                </div>
              </>
            )}
          </Card>

          {selectedBaseName && similarResults.length > 0 ? (
            <Card className="p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-white">Similar Usernames</h2>
                  <p className="mt-2 text-sm text-slate-400">
                    Click any generated username to create 10 similar variations based on its pattern.
                  </p>
                </div>
                <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                  Base: {selectedBaseName}
                </span>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {similarResults.map((name) => (
                  <Card key={`similar-${selectedBaseName}-${name}`} className="p-4">
                    <button
                      type="button"
                      onClick={() => onGenerateSimilar(name)}
                      className="break-words text-left text-sm font-semibold text-slate-100 transition hover:text-cyan-200"
                    >
                      {name}
                    </button>
                    <div className="mt-3 flex flex-col gap-2">
                      <Button variant="ghost" className="w-full px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                        Copy Username
                      </Button>
                      <Button
                        variant="ghost"
                        className="w-full px-3 py-2 text-xs"
                        onClick={() => onGenerateSimilar(name)}
                      >
                        Generate Similar
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          ) : null}

          <Card className="p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-white">Username Length Finder</h2>
                <p className="mt-2 text-sm text-slate-400">
                  Find usernames that match an exact minimum and maximum length range.
                </p>
              </div>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                {lengthFinderMin}-{lengthFinderMax} chars
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              <div className="rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">Minimum Length</label>
                <input
                  type="number"
                  min={4}
                  max={15}
                  value={lengthFinderMin}
                  onChange={(event) => setLengthFinderMin(Number(event.target.value))}
                  className="mt-3 w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
                />
              </div>
              <div className="rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">Maximum Length</label>
                <input
                  type="number"
                  min={4}
                  max={15}
                  value={lengthFinderMax}
                  onChange={(event) => setLengthFinderMax(Number(event.target.value))}
                  className="mt-3 w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
                />
              </div>
              <div className="rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">Style</label>
                <select
                  value={lengthFinderStyle}
                  onChange={(event) => setLengthFinderStyle(event.target.value as UsernameStyle)}
                  className="mt-3 w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/70"
                >
                  {styleOptions.map((styleName) => (
                    <option key={`finder-${styleName}`} value={styleName}>
                      {styleName.charAt(0).toUpperCase() + styleName.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              {lengthFinderQuickFilters.map((filter) => (
                <Button
                  key={filter.label}
                  variant="ghost"
                  className="px-3 py-2 text-xs"
                  onClick={() => applyLengthQuickFilter(filter.min, filter.max, filter.style)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>

            <div className="mt-4 flex flex-col gap-3 sm:flex-row">
              <Button onClick={runLengthFinder} disabled={isLengthFinding} className="sm:min-w-52">
                {isLengthFinding ? "Finding..." : "Find Usernames"}
              </Button>
              <span className="self-center text-xs text-slate-400">Returns names matching the selected length range</span>
            </div>

            {isLengthFinding ? (
              <div className="mt-5">
                <LoadingGrid count={8} />
              </div>
            ) : (
              <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {lengthFinderResults.map((name) => (
                  <Card key={`finder-${name}`} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <p className="break-words text-sm font-semibold text-slate-100">{name}</p>
                      <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold text-cyan-100">
                        {name.length}
                      </span>
                    </div>
                    <Button variant="ghost" className="mt-3 w-full px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                      Copy Username
                    </Button>
                  </Card>
                ))}
              </div>
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

              <div className="rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3 lg:col-span-1">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Username Length</p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
                  {lengthOptions.map((option) => (
                    <button
                      key={`mass-${option.value}`}
                      type="button"
                      onClick={() => setMassLengthFilter(option.value)}
                      className={`rounded-xl border px-3 py-2 text-left transition ${
                        massLengthFilter === option.value
                          ? "border-cyan-300/60 bg-cyan-300/12 text-cyan-100"
                          : "border-white/10 bg-white/5 text-slate-300 hover:border-cyan-300/35 hover:text-white"
                      }`}
                    >
                      <span className="block text-sm font-semibold">{option.label}</span>
                      <span className="block text-xs text-slate-400">{option.description}</span>
                    </button>
                  ))}
                </div>
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
              <span>
                Theme: {massTheme} • Length: {activeMassLengthRange.label} ({activeMassLengthRange.description})
              </span>
              <span>Scrollable batch grid with one-click copy</span>
            </div>

            {isMassGenerating ? (
              <div className="mt-5">
                <LoadingGrid count={12} />
              </div>
            ) : (
              <div className="mt-5 max-h-[40rem] overflow-y-auto rounded-[28px] border border-white/10 bg-slate-950/35 p-3 content-auto">
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {massResults.map((name) => (
                    <MassResultCard key={`mass-${name}`} name={name} onCopy={onCopy} />
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
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-white">Favorites</h2>
                <span className="text-xs text-slate-400">{favorites.length} saved</span>
              </div>
              {favorites.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  <Button variant="ghost" className="px-3 py-2 text-xs" onClick={onExportFavoritesTxt}>
                    Export TXT
                  </Button>
                  <Button variant="ghost" className="px-3 py-2 text-xs" onClick={onExportFavoritesCsv}>
                    Export CSV
                  </Button>
                  <Button variant="ghost" className="px-3 py-2 text-xs" onClick={onCopyFavoritesList}>
                    Copy List
                  </Button>
                </div>
              ) : null}
            </div>
            {favorites.length === 0 ? (
              <p className="mt-3 text-sm text-slate-400">No favorites yet. Star usernames you want to keep.</p>
            ) : (
              <div className="mt-4 grid gap-2">
                {favorites.map((fav) => (
                  <FavoriteRow key={fav} value={fav} onCopy={onCopy} onDelete={onDeleteFavorite} />
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

