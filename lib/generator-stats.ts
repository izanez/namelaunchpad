import { getDailyGeneratedCount } from "@/lib/live-counter";
import { getTrendingUsernames } from "@/lib/trending-usernames";

export const GENERATOR_STATS_EVENT = "namelaunchpad:generator-stats-updated";
const GENERATOR_TOTAL_STORAGE_KEY = "namelaunchpad:stats:total-generated";
const GENERATOR_USAGE_STORAGE_KEY = "namelaunchpad:stats:generator-usage";
const GENERATOR_PERIOD_USAGE_STORAGE_KEY = "namelaunchpad:stats:generator-usage-periods";

export type GeneratorUsageEntry = {
  slug: string;
  count: number;
};

type PeriodKey = "today" | "week" | "month";

type GeneratorPeriodUsageMap = Record<PeriodKey, Record<string, Record<string, number>>>;

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

function getDateParts(date = new Date()) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  const firstDayOfYear = new Date(Date.UTC(year, 0, 1));
  const dayOfYear = Math.floor((date.getTime() - firstDayOfYear.getTime()) / 86400000) + 1;
  const week = String(Math.ceil(dayOfYear / 7)).padStart(2, "0");

  return {
    today: `${year}-${month}-${day}`,
    week: `${year}-W${week}`,
    month: `${year}-${month}`,
  };
}

function readPeriodUsageMap(): GeneratorPeriodUsageMap {
  if (typeof window === "undefined") {
    return { today: {}, week: {}, month: {} };
  }

  const raw = window.localStorage.getItem(GENERATOR_PERIOD_USAGE_STORAGE_KEY);
  if (!raw) return { today: {}, week: {}, month: {} };

  try {
    const parsed = JSON.parse(raw) as Partial<GeneratorPeriodUsageMap>;
    return {
      today: parsed.today ?? {},
      week: parsed.week ?? {},
      month: parsed.month ?? {},
    };
  } catch {
    return { today: {}, week: {}, month: {} };
  }
}

function writePeriodUsageMap(value: GeneratorPeriodUsageMap) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(GENERATOR_PERIOD_USAGE_STORAGE_KEY, JSON.stringify(value));
}

function incrementPeriodUsage(slug: string) {
  const periodUsage = readPeriodUsageMap();
  const dateParts = getDateParts();

  (Object.keys(dateParts) as PeriodKey[]).forEach((period) => {
    const key = dateParts[period];
    const existingPeriodMap = periodUsage[period];
    const nextPeriodMap = Object.fromEntries(Object.entries(existingPeriodMap).filter(([entryKey]) => entryKey === key));
    const bucket = { ...(nextPeriodMap[key] ?? {}) };
    bucket[slug] = (bucket[slug] ?? 0) + 1;
    nextPeriodMap[key] = bucket;
    periodUsage[period] = nextPeriodMap;
  });

  writePeriodUsageMap(periodUsage);
}

function getRankedPeriodUsage(period: PeriodKey): GeneratorUsageEntry[] {
  const periodUsage = readPeriodUsageMap();
  const activeKey = getDateParts()[period];
  const bucket = periodUsage[period][activeKey] ?? {};

  return Object.entries(bucket)
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count || a.slug.localeCompare(b.slug));
}

export function trackGeneratorUsage(slug: string, amount: number) {
  if (typeof window === "undefined") return;

  const safeAmount = Math.max(0, Math.floor(amount));
  const nextTotal = readNumber(GENERATOR_TOTAL_STORAGE_KEY, 0) + safeAmount;
  window.localStorage.setItem(GENERATOR_TOTAL_STORAGE_KEY, String(nextTotal));

  const usage = readUsageMap();
  usage[slug] = (usage[slug] ?? 0) + 1;
  writeUsageMap(usage);
  incrementPeriodUsage(slug);

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

  const topGeneratorsToday = getRankedPeriodUsage("today");
  const topGeneratorsThisWeek = getRankedPeriodUsage("week");
  const topGeneratorsThisMonth = getRankedPeriodUsage("month");

  return {
    totalUsernamesGenerated: readNumber(GENERATOR_TOTAL_STORAGE_KEY, 0),
    dailyGenerationCount: getDailyGeneratedCount(),
    mostPopularUsernames: getTrendingUsernames(10),
    generatorUsage: usage,
    mostUsedGenerator: usage[0] ?? null,
    topGeneratorsToday,
    topGeneratorsThisWeek,
    topGeneratorsThisMonth,
  };
}
