"use client";

import { memo, startTransition, useCallback, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
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
import { trackGeneratorUsage, trackGlobalGenerationEvent } from "@/lib/generator-stats";
import { trackRecentGeneratedUsernames } from "@/lib/recent-generated-usernames";
import { trackGeneratedUsernames } from "@/lib/trending-usernames";
import { buildUnverifiedAvailability, type AvailabilityRecord } from "@/lib/username-availability";
import { trackFunnelEvent } from "@/lib/funnel-analytics";
import { createShareHash } from "@/lib/share-output";
import { trackQueryInsight } from "@/lib/query-insights";
import { createCollectionSyncToken, parseCollectionSyncToken } from "@/lib/collection-sync";

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
type GuidedStep = "idle" | "generated" | "copied" | "checked";
type FavoriteCollection = "uncategorized" | "fortnite" | "clean" | "short";
type SessionContext = {
  keywordsInput: string;
  style: UsernameStyle;
  lengthFilter: UsernameLengthFilter;
  category: UsernameCategory;
  lastCopiedName: string | null;
  updatedAt: number;
};

const favoriteCollectionOptions: Array<{ value: FavoriteCollection; label: string }> = [
  { value: "uncategorized", label: "Unsorted" },
  { value: "fortnite", label: "Fortnite" },
  { value: "clean", label: "Clean" },
  { value: "short", label: "Short" },
];

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
  isSelectedForCheck: boolean;
  onCopy: (value: string) => void;
  onOpenShare: (value: string | null) => void;
  onShareAction: (platform: "copy-link" | "twitter" | "discord" | "reddit" | "download-card", value: string) => void;
  onGenerateSimilar: (value: string) => void;
  onToggleFavorite: (value: string) => void;
  onSelectForCheck: (value: string) => void;
};

const ResultCard = memo(function ResultCard({
  name,
  favorite,
  availability,
  isShareOpen,
  isSelectedForCheck,
  onCopy,
  onOpenShare,
  onShareAction,
  onGenerateSimilar,
  onToggleFavorite,
  onSelectForCheck,
}: ResultCardProps) {
  return (
    <Card className="relative h-full p-4 md:p-5">
      <button
        type="button"
        onClick={() => onGenerateSimilar(name)}
        className="break-words text-left text-base font-bold leading-tight text-slate-100 transition hover:text-cyan-200"
      >
        {name}
      </button>
      <div className="mt-2 flex items-center justify-between">
        <span className={`text-[11px] font-semibold ${isSelectedForCheck ? "text-cyan-200" : "text-slate-500"}`}>
          {isSelectedForCheck ? "Selected for check" : "Not selected"}
        </span>
        <Button variant="ghost" className="h-7 px-2 py-0 text-[11px] font-semibold" onClick={() => onSelectForCheck(name)}>
          {isSelectedForCheck ? "Selected" : "Select"}
        </Button>
      </div>
      <div className="mt-3 space-y-1.5">
        {platforms.map((platform) => {
          const status = availability?.[platform] ?? "Unavailable";
          const statusClass =
            status === "Available"
              ? "border-emerald-300/35 bg-emerald-400/10 text-emerald-200"
              : status === "Possibly taken"
                ? "border-amber-300/35 bg-amber-400/10 text-amber-200"
                : "border-rose-300/30 bg-rose-500/10 text-rose-200";
          return (
            <div key={`${name}-${platform}`} className="flex items-center justify-between text-[11px]">
              <span className="font-medium text-slate-400">{platform}</span>
              <span className={`rounded-full border px-2.5 py-1 font-semibold leading-none ${statusClass}`}>{status}</span>
            </div>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        <Button variant="ghost" className="h-9 px-2 py-0 text-xs font-semibold" onClick={() => onCopy(name)}>
          Copy
        </Button>
        <Button variant="ghost" className="h-9 px-2 py-0 text-xs font-semibold" onClick={() => onToggleFavorite(name)}>
          {favorite ? "Saved" : "Save"}
        </Button>
        <Button
          variant="ghost"
          className="h-9 px-2 py-0 text-xs font-semibold"
          onClick={() => onOpenShare(isShareOpen ? null : name)}
        >
          Share
        </Button>
      </div>
      {isShareOpen ? (
        <div className="absolute right-4 top-[calc(100%-0.25rem)] z-20 w-44 rounded-xl2 border border-white/15 bg-slate-950/95 p-2 shadow-neon backdrop-blur-xl">
          <div className="grid gap-1">
            <button
              type="button"
              onClick={() => onShareAction("copy-link", name)}
              className="rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-200 transition hover:bg-white/8 hover:text-cyan-200"
            >
              Copy link
            </button>
            <button
              type="button"
              onClick={() => onShareAction("twitter", name)}
              className="rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-200 transition hover:bg-white/8 hover:text-cyan-200"
            >
              Twitter
            </button>
            <button
              type="button"
              onClick={() => onShareAction("reddit", name)}
              className="rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-200 transition hover:bg-white/8 hover:text-cyan-200"
            >
              Reddit
            </button>
            <button
              type="button"
              onClick={() => onShareAction("discord", name)}
              className="rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-200 transition hover:bg-white/8 hover:text-cyan-200"
            >
              Discord
            </button>
            <button
              type="button"
              onClick={() => onShareAction("download-card", name)}
              className="rounded-lg px-3 py-2 text-left text-xs font-medium text-slate-200 transition hover:bg-white/8 hover:text-cyan-200"
            >
              Download card
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
    <Card className="p-4">
      <p className="break-words text-sm font-semibold leading-5 text-slate-100">{name}</p>
      <Button variant="ghost" className="mt-3 h-10 w-full px-3 py-0 text-xs font-semibold" onClick={() => onCopy(name)}>
        Copy Username
      </Button>
    </Card>
  );
});

const FavoriteRow = memo(function FavoriteRow({
  value,
  collection,
  onCopy,
  onDelete,
  onSetCollection,
}: {
  value: string;
  collection: FavoriteCollection;
  onCopy: (value: string) => void;
  onDelete: (value: string) => void;
  onSetCollection: (value: string, collection: FavoriteCollection) => void;
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl2 border border-cyan-300/25 bg-cyan-400/5 px-3 py-2 md:flex-row md:items-center md:justify-between">
      <span className="text-sm text-cyan-100">{value}</span>
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={collection}
          onChange={(event) => onSetCollection(value, event.target.value as FavoriteCollection)}
          className="rounded-lg border border-cyan-300/30 bg-slate-900/70 px-2 py-1 text-xs text-cyan-100 outline-none transition focus:border-cyan-300/70"
        >
          {favoriteCollectionOptions.map((option) => (
            <option key={`${value}-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
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
  const [guidedStep, setGuidedStep] = useState<GuidedStep>("idle");
  const [lastCopiedName, setLastCopiedName] = useState<string | null>(null);
  const [selectedAvailabilityName, setSelectedAvailabilityName] = useState<string | null>(null);
  const storageKey = useMemo(() => "namelaunchpad:favorites:username-engine", []);
  const collectionsKey = useMemo(() => "namelaunchpad:favorites:collections", []);
  const recentGeneratedKey = useMemo(() => "namelaunchpad:recent-generated", []);
  const recentCopiedKey = useMemo(() => "namelaunchpad:recent-copied", []);
  const sessionContextKey = useMemo(() => "namelaunchpad:last-session-context", []);
  const [favoriteCollections, setFavoriteCollections] = useState<Record<string, FavoriteCollection>>({});
  const [recentGenerated, setRecentGenerated] = useState<string[]>([]);
  const [recentCopied, setRecentCopied] = useState<string[]>([]);
  const [resumeContext, setResumeContext] = useState<SessionContext | null>(null);
  const [availabilityNotice, setAvailabilityNotice] = useState<string | null>(null);
  const [lastAvailabilityCheckedAt, setLastAvailabilityCheckedAt] = useState<number | null>(null);
  const [autoCheckAfterCopy, setAutoCheckAfterCopy] = useState(true);
  const [syncEmail, setSyncEmail] = useState("");
  const [syncLink, setSyncLink] = useState<string | null>(null);
  const autoCheckKey = useMemo(() => "namelaunchpad:auto-check-after-copy", []);

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
  const personalizedTrending = useMemo(() => {
    const keywordSignals = selectedCategory.keywords.map((keyword) => keyword.toLowerCase());
    const boosted = trending.filter((name) => keywordSignals.some((signal) => name.toLowerCase().includes(signal)));
    return Array.from(new Set([...boosted, ...trending])).slice(0, 10);
  }, [selectedCategory.keywords, trending]);
  const collectionCounts = useMemo(() => {
    return favorites.reduce<Record<FavoriteCollection, number>>(
      (acc, fav) => {
        const key = favoriteCollections[fav] ?? "uncategorized";
        acc[key] += 1;
        return acc;
      },
      {
        uncategorized: 0,
        fortnite: 0,
        clean: 0,
        short: 0,
      }
    );
  }, [favoriteCollections, favorites]);
  const progressState = useMemo(() => {
    const generated = guidedStep !== "idle";
    const copied = Boolean(lastCopiedName);
    const checked = Boolean(lastAvailabilityCheckedAt);
    const saved = favorites.length > 0;
    const completed = [generated, copied, checked, saved].filter(Boolean).length;
    return {
      generated,
      copied,
      checked,
      saved,
      percent: Math.round((completed / 4) * 100),
    };
  }, [favorites.length, guidedStep, lastAvailabilityCheckedAt, lastCopiedName]);
  const currentAvailabilityTarget = selectedAvailabilityName ?? lastCopiedName;

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
      trackGlobalGenerationEvent({ generatorSlug: generatorKey, amount: names.length, usernames: names });
      trackGeneratedUsernames(names);
      trackRecentGeneratedUsernames(names);
      trackFunnelEvent("generate");
      trackQueryInsight({
        source: "generator",
        keywords: [...selectedCategory.keywords, ...parseKeywords(keywordsInput)],
        style: effectiveStyle,
        length: effectiveLengthRange.value,
        category,
      });
      setRecentGenerated((current) => Array.from(new Set([...names.slice(0, 5), ...current])).slice(0, 12));
      setGuidedStep("generated");
    },
    [category, effectiveLengthRange.value, effectiveStyle, generatorKey, keywordsInput, results, selectedCategory.keywords]
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
      trackGlobalGenerationEvent({ generatorSlug: generatorKey, amount: names.length, usernames: names });
      trackGeneratedUsernames(names);
      trackRecentGeneratedUsernames(names);
      trackQueryInsight({
        source: "mass",
        keywords: [massTheme],
        style: massStyle,
        length: activeMassLengthRange.value,
        category,
      });
      setIsMassGenerating(false);
    }, 120);
  }, [activeMassLengthRange.max, activeMassLengthRange.min, activeMassLengthRange.value, category, generatorKey, massStyle, massTheme]);

  useEffect(() => {
    trackFunnelEvent("landing");
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
    if (cached) {
      try {
        const parsed = JSON.parse(cached) as string[];
        if (Array.isArray(parsed)) setFavorites(parsed.slice(0, 40));
      } catch {
        setFavorites([]);
      }
    }

    const collectionsRaw = window.localStorage.getItem(collectionsKey);
    if (collectionsRaw) {
      try {
        const parsedCollections = JSON.parse(collectionsRaw) as Record<string, FavoriteCollection>;
        setFavoriteCollections(parsedCollections);
      } catch {
        setFavoriteCollections({});
      }
    }

    const recentGeneratedRaw = window.localStorage.getItem(recentGeneratedKey);
    if (recentGeneratedRaw) {
      try {
        const parsedRecentGenerated = JSON.parse(recentGeneratedRaw) as string[];
        if (Array.isArray(parsedRecentGenerated)) setRecentGenerated(parsedRecentGenerated.slice(0, 12));
      } catch {
        setRecentGenerated([]);
      }
    }

    const recentCopiedRaw = window.localStorage.getItem(recentCopiedKey);
    if (recentCopiedRaw) {
      try {
        const parsedRecentCopied = JSON.parse(recentCopiedRaw) as string[];
        if (Array.isArray(parsedRecentCopied)) setRecentCopied(parsedRecentCopied.slice(0, 12));
      } catch {
        setRecentCopied([]);
      }
    }

    const sessionRaw = window.localStorage.getItem(sessionContextKey);
    if (sessionRaw) {
      try {
        const parsedSession = JSON.parse(sessionRaw) as SessionContext;
        if (parsedSession?.updatedAt && Date.now() - parsedSession.updatedAt < 1000 * 60 * 60 * 24) {
          setResumeContext(parsedSession);
        }
      } catch {
        setResumeContext(null);
      }
    }

    const autoCheckRaw = window.localStorage.getItem(autoCheckKey);
    if (autoCheckRaw === "0") setAutoCheckAfterCopy(false);
  }, [autoCheckKey, collectionsKey, recentCopiedKey, recentGeneratedKey, sessionContextKey, storageKey]);

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
    const restoreToken = searchParams.get("restore");
    if (!restoreToken) return;
    const payload = parseCollectionSyncToken(restoreToken);
    if (!payload) {
      setToast("Invalid restore link.");
      window.setTimeout(() => setToast(null), 1800);
      return;
    }
    setFavorites(payload.f.slice(0, 40));
    setFavoriteCollections(payload.c as Record<string, FavoriteCollection>);
    if (payload.e) setSyncEmail(payload.e);
    setToast("Collections restored from magic link.");
    window.setTimeout(() => setToast(null), 1800);
  }, [searchParams]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  useEffect(() => {
    window.localStorage.setItem(collectionsKey, JSON.stringify(favoriteCollections));
  }, [collectionsKey, favoriteCollections]);

  useEffect(() => {
    window.localStorage.setItem(recentGeneratedKey, JSON.stringify(recentGenerated));
  }, [recentGenerated, recentGeneratedKey]);

  useEffect(() => {
    window.localStorage.setItem(recentCopiedKey, JSON.stringify(recentCopied));
  }, [recentCopied, recentCopiedKey]);

  useEffect(() => {
    window.localStorage.setItem(autoCheckKey, autoCheckAfterCopy ? "1" : "0");
  }, [autoCheckAfterCopy, autoCheckKey]);

  useEffect(() => {
    const context: SessionContext = {
      keywordsInput,
      style,
      lengthFilter,
      category,
      lastCopiedName,
      updatedAt: Date.now(),
    };
    window.localStorage.setItem(sessionContextKey, JSON.stringify(context));
  }, [category, keywordsInput, lastCopiedName, lengthFilter, sessionContextKey, style]);

  useEffect(() => {
    if (results.length === 0) return;
    const interval = window.setInterval(() => {
      setTrending(pickTrendingNames(results));
    }, 8000);
    return () => window.clearInterval(interval);
  }, [results]);

  useEffect(() => {
    if (results.length === 0) {
      setSelectedAvailabilityName(null);
      return;
    }

    setSelectedAvailabilityName((current) => {
      if (current && results.includes(current)) return current;
      return results[0] ?? null;
    });
  }, [results]);

  const checkAvailability = useCallback((targetName?: string) => {
    const usernameToCheck = targetName ?? selectedAvailabilityName ?? lastCopiedName;
    if (!usernameToCheck) {
      setToast("Select one username first.");
      window.setTimeout(() => setToast(null), 1800);
      return;
    }

    setIsCheckingAvailability(true);
    setAvailabilityNotice(`Checking availability for ${usernameToCheck}. Estimated from public profile responses.`);

    void fetch("/api/check-username-availability", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        usernames: [usernameToCheck],
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
          setLastAvailabilityCheckedAt(Date.now());
          trackFunnelEvent("availability");
          setGuidedStep("checked");
          setAvailabilityNotice(`${usernameToCheck}: availability updated (estimated).`);
          setToast(`Availability checked for ${usernameToCheck}.`);
          window.setTimeout(() => setToast(null), 1800);
        }
      })
      .catch(() => {
        setAvailabilityNotice("Availability check failed. Try again in a few seconds.");
        setToast("Availability check could not be completed.");
        window.setTimeout(() => setToast(null), 1800);
      })
      .finally(() => {
        setIsCheckingAvailability(false);
      });
  }, [lastCopiedName, selectedAvailabilityName]);

  const onCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setGuidedStep("copied");
      setLastCopiedName(value);
      setSelectedAvailabilityName(value);
      trackFunnelEvent("copy");
      setRecentCopied((current) => Array.from(new Set([value, ...current])).slice(0, 12));
      const similar = generateSimilarUsernames({
        baseName: value,
        style: effectiveStyle,
        amount: 10,
        minLength: effectiveLengthRange.min,
        maxLength: effectiveLengthRange.max,
      });
      setSelectedBaseName(value);
      setSimilarResults(similar);
      setToast("Username copied.");
      if (autoCheckAfterCopy) {
        window.setTimeout(() => {
          void checkAvailability(value);
        }, 300);
      }
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }
  }, [autoCheckAfterCopy, checkAvailability, effectiveLengthRange.max, effectiveLengthRange.min, effectiveStyle]);

  const nextStepCard = useMemo(() => {
    if (guidedStep === "generated") {
      return {
        title: "Next step: copy your favorite",
        description: "You generated fresh names. Copy one result to continue the flow.",
        cta: "Jump to Results",
        href: "#results",
      };
    }

    if (guidedStep === "copied") {
      return {
        title: "Next step: check availability",
        description: lastCopiedName
          ? `${lastCopiedName} is copied. Check availability to avoid conflicts before you publish.`
          : "You copied a username. Check availability before you publish.",
        cta: "Check Availability",
        href: "#availability",
      };
    }

    if (guidedStep === "checked") {
      return {
        title: "Next step: generate similar",
        description: "Availability is updated. Generate similar options to compare and keep the strongest one.",
        cta: "Generate More",
        href: "#generator",
      };
    }

    return {
      title: "Start flow",
      description: "Generate names first, then copy one and check availability.",
      cta: "Start Generating",
      href: "#generator",
    };
  }, [guidedStep, lastCopiedName]);

  const onShareAction = useCallback(async (platform: "copy-link" | "twitter" | "discord" | "reddit" | "download-card", value: string) => {
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

    if (platform === "download-card") {
      try {
        const response = await fetch(
          `/api/og?title=${encodeURIComponent(value)}&subtitle=${encodeURIComponent("Username pick from NameLaunchpad")}&eyebrow=Top Username&theme=listing`,
          { cache: "no-store" }
        );
        if (!response.ok) throw new Error("download failed");
        const blob = await response.blob();
        const objectUrl = URL.createObjectURL(blob);
        const anchor = document.createElement("a");
        anchor.href = objectUrl;
        anchor.download = `${value.toLowerCase()}-card.png`;
        anchor.click();
        URL.revokeObjectURL(objectUrl);
        setToast("Share card downloaded.");
      } catch {
        setToast("Could not download share card.");
      }
      window.setTimeout(() => setToast(null), 1800);
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
    setFavorites((current) => {
      const next = current.includes(value) ? current.filter((item) => item !== value) : [value, ...current].slice(0, 40);
      if (!current.includes(value)) {
        trackFunnelEvent("favorite");
        setFavoriteCollections((collections) => ({
          ...collections,
          [value]: collections[value] ?? "uncategorized",
        }));
      }
      if (current.includes(value)) {
        setFavoriteCollections((collections) => {
          const nextCollections = { ...collections };
          delete nextCollections[value];
          return nextCollections;
        });
      }
      return next;
    });
  }, []);

  const onSelectForAvailability = useCallback((value: string) => {
    setSelectedAvailabilityName(value);
    setToast(`${value} selected for availability check.`);
    window.setTimeout(() => setToast(null), 1400);
  }, []);

  const onShareList = useCallback(async () => {
    if (results.length === 0) return;
    const hash = createShareHash({
      n: results.slice(0, 20),
      s: effectiveStyle,
      c: category,
      k: parseKeywords(keywordsInput),
      t: Date.now(),
    });

    const url = typeof window === "undefined" ? `/u/${hash}` : `${window.location.origin}/u/${hash}`;

    try {
      await navigator.clipboard.writeText(url);
      setToast("Share page link copied.");
    } catch {
      setToast("Could not copy share page link.");
    }
    window.setTimeout(() => setToast(null), 1800);
  }, [category, effectiveStyle, keywordsInput, results]);

  const onCreateMagicLink = useCallback(async () => {
    if (favorites.length === 0) {
      setToast("Save at least one favorite first.");
      window.setTimeout(() => setToast(null), 1800);
      return;
    }

    const token = createCollectionSyncToken({
      f: favorites,
      c: favoriteCollections,
      e: syncEmail.trim() || undefined,
      t: Date.now(),
    });

    const url = typeof window === "undefined" ? `/username-generator?restore=${token}` : `${window.location.origin}/username-generator?restore=${token}`;
    setSyncLink(url);

    try {
      await navigator.clipboard.writeText(url);
      setToast("Magic link copied.");
    } catch {
      setToast("Magic link created.");
    }
    window.setTimeout(() => setToast(null), 1800);
  }, [favoriteCollections, favorites, syncEmail]);

  const onDeleteFavorite = useCallback((value: string) => {
    setFavorites((current) => current.filter((item) => item !== value));
    setFavoriteCollections((collections) => {
      const next = { ...collections };
      delete next[value];
      return next;
    });
  }, []);

  const onSetFavoriteCollection = useCallback((value: string, collection: FavoriteCollection) => {
    setFavoriteCollections((current) => ({
      ...current,
      [value]: collection,
    }));
  }, []);

  const onResumeLastSession = useCallback(() => {
    if (!resumeContext) return;
    setKeywordsInput(resumeContext.keywordsInput);
    setStyle(resumeContext.style);
    setLengthFilter(resumeContext.lengthFilter);
    setCategory(resumeContext.category);
    setLastCopiedName(resumeContext.lastCopiedName);
    setToast("Previous session restored.");
    window.setTimeout(() => setToast(null), 1800);
  }, [resumeContext]);

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
      trackGlobalGenerationEvent({ generatorSlug: `${generatorKey}-length-finder`, amount: names.length, usernames: names });
      trackGeneratedUsernames(names);
      trackRecentGeneratedUsernames(names);
      trackQueryInsight({
        source: "length-finder",
        keywords: [...selectedCategory.keywords, ...parseKeywords(keywordsInput)],
        style: lengthFinderStyle,
        length: `${lengthFinderMin}-${lengthFinderMax}`,
        category,
      });
      setIsLengthFinding(false);
    }, 120);
  }, [category, generateLengthFinderResults, generatorKey, keywordsInput, lengthFinderMax, lengthFinderMin, lengthFinderStyle, selectedCategory.keywords]);

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
        trackGlobalGenerationEvent({ generatorSlug: `${generatorKey}-length-finder`, amount: names.length, usernames: names });
        trackGeneratedUsernames(names);
        trackRecentGeneratedUsernames(names);
        trackQueryInsight({
          source: "length-finder",
          keywords: [...selectedCategory.keywords, ...parseKeywords(keywordsInput)],
          style: finderStyle,
          length: `${min}-${max}`,
          category,
        });
        setIsLengthFinding(false);
      }, 120);
    },
    [category, generateLengthFinderResults, generatorKey, keywordsInput, selectedCategory.keywords]
  );

  return (
    <section className="generator-shell mx-auto w-full max-w-6xl animate-fadeUp px-4 pb-28 pt-10 md:px-6 md:pb-10">
      <div className="grid gap-7">
        <div className="space-y-7">
          <Card id="generator" className="p-6 md:p-8">
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

            <div className="mt-4 rounded-xl2 border border-white/15 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Session Goal</p>
                <span className="text-xs font-semibold text-cyan-200">{progressState.percent}% complete</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800/80">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-500 to-cyan-400" style={{ width: `${progressState.percent}%` }} />
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-4 text-xs">
                <span className={progressState.generated ? "text-cyan-200" : "text-slate-400"}>1. Generated</span>
                <span className={progressState.copied ? "text-cyan-200" : "text-slate-400"}>2. Copied</span>
                <span className={progressState.checked ? "text-cyan-200" : "text-slate-400"}>3. Checked</span>
                <span className={progressState.saved ? "text-cyan-200" : "text-slate-400"}>4. Saved</span>
              </div>
            </div>

            {resumeContext ? (
              <div className="mt-4 rounded-xl2 border border-cyan-300/25 bg-cyan-400/10 p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-cyan-100">Continue where you left off</p>
                    <p className="mt-1 text-xs text-slate-300">
                      Last setup: {resumeContext.style} style, {resumeContext.lengthFilter} length, {resumeContext.category.replace(/-/g, " ")}.
                    </p>
                  </div>
                  <Button variant="ghost" className="px-3 py-2 text-xs" onClick={onResumeLastSession}>
                    Resume Session
                  </Button>
                </div>
              </div>
            ) : null}

            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl2 border border-white/15 bg-white/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Recently generated</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {recentGenerated.length === 0 ? (
                    <span className="text-xs text-slate-500">No recent generated names yet.</span>
                  ) : (
                    recentGenerated.slice(0, 6).map((name) => (
                      <button
                        key={`recent-generated-${name}`}
                        type="button"
                        onClick={() => onCopy(name)}
                        className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-1 text-xs text-cyan-100 hover:border-cyan-300/60"
                      >
                        {name}
                      </button>
                    ))
                  )}
                </div>
              </div>
              <div className="rounded-xl2 border border-white/15 bg-white/5 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Recently copied</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {recentCopied.length === 0 ? (
                    <span className="text-xs text-slate-500">No copied usernames yet.</span>
                  ) : (
                    recentCopied.slice(0, 6).map((name) => (
                      <button
                        key={`recent-copied-${name}`}
                        type="button"
                        onClick={() => onGenerateSimilar(name)}
                        className="rounded-full border border-emerald-300/30 bg-emerald-400/10 px-2 py-1 text-xs text-emerald-100 hover:border-emerald-300/60"
                      >
                        {name}
                      </button>
                    ))
                  )}
                </div>
              </div>
            </div>

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
            <div id="availability" className="mt-3">
              <div className="flex flex-col gap-3 md:flex-row">
                <Button
                  variant="ghost"
                  onClick={() => checkAvailability()}
                  disabled={isGenerating || isCheckingAvailability || !currentAvailabilityTarget}
                  className="w-full md:w-auto"
                >
                  {isCheckingAvailability ? "Checking..." : "Check Selected Availability"}
                </Button>
                <Button onClick={generateMore} disabled={isGenerating} className="w-full md:w-auto">
                  {isGenerating ? "Generating More..." : "Generate More"}
                </Button>
              </div>
              <label className="mt-2 inline-flex items-center gap-2 text-xs text-slate-300">
                <input
                  type="checkbox"
                  checked={autoCheckAfterCopy}
                  onChange={(event) => setAutoCheckAfterCopy(event.target.checked)}
                  className="h-4 w-4 rounded border-white/20 bg-slate-900/70"
                />
                Auto-check availability after copy
              </label>
              <p className="mt-2 text-xs text-slate-400">
                Availability is estimated from public profile responses and can change quickly.
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Selected: {currentAvailabilityTarget ?? "None"}
              </p>
              {lastAvailabilityCheckedAt ? (
                <p className="mt-1 text-xs text-slate-300">
                  Last checked: {new Date(lastAvailabilityCheckedAt).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })} (estimated)
                </p>
              ) : null}
              {availabilityNotice ? (
                <p className="mt-1 text-xs text-cyan-200">{availabilityNotice}</p>
              ) : null}
            </div>

            <div id="results" className="mt-6 flex items-center justify-between text-xs text-slate-400">
              <span>Output: {results.length} usernames</span>
              <div className="flex items-center gap-3">
                <span>
                  Category: {selectedCategory.label} | Style: {effectiveStyle} | Length: {effectiveLengthRange.label} ({effectiveLengthRange.description})
                </span>
                <Button variant="ghost" className="h-8 px-3 py-0 text-xs" onClick={onShareList}>
                  Share this list
                </Button>
              </div>
            </div>

            <div className="mt-4 rounded-xl2 border border-cyan-300/25 bg-cyan-400/10 p-4 md:p-5">
              <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-sm font-bold text-cyan-100">{nextStepCard.title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{nextStepCard.description}</p>
                </div>
                <Link href={nextStepCard.href}>
                  <Button variant="ghost" className="h-10 px-4 py-0 text-xs font-semibold">
                    {nextStepCard.cta}
                  </Button>
                </Link>
              </div>
            </div>

            {isGenerating ? (
              <LoadingGrid count={8} detailed />
            ) : (
              <>
                <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {topResults.map((name) => (
                    <ResultCard
                      key={name}
                      name={name}
                      favorite={favorites.includes(name)}
                      availability={availability[name]}
                      isShareOpen={activeShareName === name}
                      isSelectedForCheck={selectedAvailabilityName === name}
                      onCopy={onCopy}
                      onOpenShare={setActiveShareName}
                      onShareAction={onShareAction}
                      onGenerateSimilar={onGenerateSimilar}
                      onToggleFavorite={onToggleFavorite}
                      onSelectForCheck={onSelectForAvailability}
                    />
                  ))}
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {bottomResults.map((name) => (
                    <ResultCard
                      key={name}
                      name={name}
                      favorite={favorites.includes(name)}
                      availability={availability[name]}
                      isShareOpen={activeShareName === name}
                      isSelectedForCheck={selectedAvailabilityName === name}
                      onCopy={onCopy}
                      onOpenShare={setActiveShareName}
                      onShareAction={onShareAction}
                      onGenerateSimilar={onGenerateSimilar}
                      onToggleFavorite={onToggleFavorite}
                      onSelectForCheck={onSelectForAvailability}
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

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
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

          <Card className="p-5 md:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-white md:text-2xl">Mass Username Generator</h2>
                <p className="mt-1.5 text-sm leading-6 text-slate-400">
                  Generate 100 usernames at once with a focused style, target length, and theme.
                </p>
              </div>
              <span className="w-fit rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                100 names
              </span>
            </div>

            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <div className="rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">Style</label>
                <select
                  value={massStyle}
                  onChange={(event) => setMassStyle(event.target.value as UsernameStyle)}
                  className="mt-3 h-12 w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-0 text-slate-100 outline-none transition focus:border-cyan-300/70"
                >
                  {styleOptions.map((styleName) => (
                    <option key={`mass-${styleName}`} value={styleName}>
                      {styleName.charAt(0).toUpperCase() + styleName.slice(1)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
                <label className="text-xs font-semibold uppercase tracking-wide text-slate-300">Theme</label>
                <select
                  value={massTheme}
                  onChange={(event) => setMassTheme(event.target.value as (typeof themeOptions)[number])}
                  className="mt-3 h-12 w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-0 text-slate-100 outline-none transition focus:border-cyan-300/70"
                >
                  {themeOptions.map((themeName) => (
                    <option key={themeName} value={themeName}>
                      {themeName.charAt(0).toUpperCase() + themeName.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-3 rounded-xl2 border border-white/15 bg-slate-900/55 px-4 py-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-300">Username Length</p>
              <div className="mt-3 grid gap-2 sm:grid-cols-3">
                {lengthOptions.map((option) => (
                  <button
                    key={`mass-${option.value}`}
                    type="button"
                    onClick={() => setMassLengthFilter(option.value)}
                    className={`rounded-xl border px-3 py-2.5 text-left transition ${
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

            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              <Button onClick={generateMassUsernames} disabled={isMassGenerating} className="h-11 w-full px-4 py-0 text-sm font-semibold">
                {isMassGenerating ? "Generating 100..." : "Generate 100 Usernames"}
              </Button>
              <Button
                variant="ghost"
                onClick={generateMassUsernames}
                disabled={isMassGenerating}
                className="h-11 w-full px-4 py-0 text-sm font-semibold"
              >
                {isMassGenerating ? "Refreshing..." : "Regenerate Batch"}
              </Button>
            </div>

            <div className="mt-3 flex flex-col gap-1 text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Theme: {massTheme} | Length: {activeMassLengthRange.label} ({activeMassLengthRange.description})
              </span>
              <span>Scrollable batch grid with one-click copy</span>
            </div>

            {isMassGenerating ? (
              <div className="mt-5">
                <LoadingGrid count={12} />
              </div>
            ) : (
              <div className="mt-4 max-h-[40rem] overflow-y-auto rounded-[24px] border border-white/10 bg-slate-950/35 p-3 content-auto">
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
              <h2 className="text-xl font-bold text-white">Today Popular for {selectedCategory.label}</h2>
              <Button variant="ghost" className="px-3 py-1.5 text-xs" onClick={() => setTrending(pickTrendingNames(results))}>
                Refresh
              </Button>
            </div>
            <p className="mt-2 text-xs text-slate-400">Personalized by your selected category and refreshed from your latest generated results.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-5">
              {personalizedTrending.map((name, index) => (
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
            <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">Collections Sync (Magic Link)</h2>
                <p className="mt-1 text-xs text-slate-400">
                  Account-light sync: create a private restore link for your saved collections.
                </p>
              </div>
              <span className="rounded-full border border-cyan-300/25 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-200">
                Passwordless beta
              </span>
            </div>
            <div className="mt-4 grid gap-2 md:grid-cols-[1fr_auto]">
              <input
                value={syncEmail}
                onChange={(event) => setSyncEmail(event.target.value)}
                placeholder="Email (optional, for your own tracking)"
                className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-sm text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
              />
              <Button variant="ghost" className="h-11 px-4 py-0 text-sm font-semibold" onClick={onCreateMagicLink}>
                Create Magic Link
              </Button>
            </div>
            {syncLink ? (
              <div className="mt-3 rounded-xl border border-white/15 bg-white/5 px-3 py-2">
                <p className="truncate text-xs text-cyan-200">{syncLink}</p>
              </div>
            ) : null}
          </Card>

          <Card className="p-6">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div className="flex items-center justify-between gap-3">
                <h2 className="text-xl font-bold text-white">Favorites</h2>
                <span className="text-xs text-slate-400">{favorites.length} saved</span>
              </div>
              <div className="flex flex-wrap items-center gap-2 text-[11px]">
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-slate-300">
                  Unsorted: {collectionCounts.uncategorized}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-slate-300">
                  Fortnite: {collectionCounts.fortnite}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-slate-300">
                  Clean: {collectionCounts.clean}
                </span>
                <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-slate-300">
                  Short: {collectionCounts.short}
                </span>
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
                  <FavoriteRow
                    key={fav}
                    value={fav}
                    collection={favoriteCollections[fav] ?? "uncategorized"}
                    onSetCollection={onSetFavoriteCollection}
                    onCopy={onCopy}
                    onDelete={onDeleteFavorite}
                  />
                ))}
              </div>
            )}
          </Card>
        </div>

      </div>

      {toast ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 animate-fadeUp rounded-xl2 border border-cyan-300/35 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan-100 shadow-neon backdrop-blur-xl">
          {toast}
        </div>
      ) : null}

      <div className="fixed bottom-3 left-1/2 z-40 w-[calc(100%-1.5rem)] max-w-3xl -translate-x-1/2 rounded-2xl border border-white/15 bg-slate-950/92 p-2.5 shadow-neon backdrop-blur-xl md:hidden">
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={generate}
            disabled={isGenerating}
            className={`h-10 px-3 py-0 text-xs font-semibold ${guidedStep === "generated" ? "ring-2 ring-cyan-300/60" : ""}`}
          >
            {isGenerating ? "Generating..." : "1. Generate"}
          </Button>
          <Link href="#results" className="block">
            <Button
              variant="ghost"
              className={`h-10 w-full px-3 py-0 text-xs font-semibold ${guidedStep === "copied" ? "ring-2 ring-cyan-300/60" : ""}`}
            >
              2. Copy
            </Button>
          </Link>
          <Button
            variant="ghost"
            onClick={() => checkAvailability()}
            disabled={isCheckingAvailability || !currentAvailabilityTarget}
            className={`h-10 px-3 py-0 text-xs font-semibold ${guidedStep === "checked" ? "ring-2 ring-cyan-300/60" : ""}`}
          >
            {isCheckingAvailability ? "Checking..." : "3. Check"}
          </Button>
        </div>
      </div>
    </section>
  );
}
