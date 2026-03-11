import { getDailyGeneratedCount } from "@/lib/live-counter";
import { getTrendingUsernames } from "@/lib/trending-usernames";

export const GENERATOR_STATS_EVENT = "namelaunchpad:generator-stats-updated";
const GENERATOR_TOTAL_STORAGE_KEY = "namelaunchpad:stats:total-generated";
const GENERATOR_USAGE_STORAGE_KEY = "namelaunchpad:stats:generator-usage";

export type GeneratorUsageEntry = {
  slug: string;
  count: number;
};

function readNumber(key: string, fallback = 0) {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  const parsed = Number.parseInt(raw, 10);
  return Number.isNaN(parsed) ? fallback : parsed;
}

function readUsageMap() {
  if (typeof window === "undefined") return {} as Record<string, number>;
  const raw = window.localStorage.getItem(GENERATOR_USAGE_STORAGE_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as Record<string, number>;
  } catch {
    return {};
  }
}

function writeUsageMap(value: Record<string, number>) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GENERATOR_USAGE_STORAGE_KEY, JSON.stringify(value));
}

export function trackGeneratorUsage(slug: string, amount: number) {
  if (typeof window === "undefined") return;

  const safeAmount = Math.max(0, Math.floor(amount));
  const nextTotal = readNumber(GENERATOR_TOTAL_STORAGE_KEY, 0) + safeAmount;
  window.localStorage.setItem(GENERATOR_TOTAL_STORAGE_KEY, String(nextTotal));

  const usage = readUsageMap();
  usage[slug] = (usage[slug] ?? 0) + 1;
  writeUsageMap(usage);

  window.dispatchEvent(
    new CustomEvent(GENERATOR_STATS_EVENT, {
      detail: getGeneratorStatsSnapshot(),
    })
  );
}

export function getGeneratorStatsSnapshot() {
  const usage = Object.entries(readUsageMap())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));

  return {
    totalUsernamesGenerated: readNumber(GENERATOR_TOTAL_STORAGE_KEY, 0),
    dailyGenerationCount: getDailyGeneratedCount(),
    mostPopularUsernames: getTrendingUsernames(10),
    generatorUsage: usage,
    mostUsedGenerator: usage[0] ?? null,
  };
}
