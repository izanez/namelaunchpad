export type QueryInsightEvent = {
  keywords: string[];
  style: string;
  length: string;
  category?: string;
  source: "generator" | "mass" | "length-finder";
  timestamp: number;
};

export type QueryInsightsSnapshot = {
  totalEvents: number;
  dailyEvents: number;
  weeklyEvents: number;
  topKeywords: Array<{ value: string; count: number }>;
  topStyles: Array<{ value: string; count: number }>;
};

const STORAGE_KEY = "namelaunchpad:query-insights:v1";
const MAX_EVENTS = 2000;

function toTokenList(input: string[]) {
  return input
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean)
    .slice(0, 8);
}

function readEvents(): QueryInsightEvent[] {
  if (typeof window === "undefined") return [];
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as QueryInsightEvent[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeEvents(events: QueryInsightEvent[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(events.slice(-MAX_EVENTS)));
}

function rank(values: string[], limit = 8) {
  const counts = new Map<string, number>();
  values.forEach((value) => counts.set(value, (counts.get(value) ?? 0) + 1));
  return Array.from(counts.entries())
    .sort((left, right) => right[1] - left[1] || left[0].localeCompare(right[0]))
    .slice(0, limit)
    .map(([value, count]) => ({ value, count }));
}

export function trackQueryInsight(event: Omit<QueryInsightEvent, "timestamp" | "keywords"> & { keywords: string[] }) {
  if (typeof window === "undefined") return;
  const events = readEvents();
  events.push({
    ...event,
    keywords: toTokenList(event.keywords),
    timestamp: Date.now(),
  });
  writeEvents(events);
}

export function getQueryInsightsSnapshot(): QueryInsightsSnapshot {
  const events = readEvents();
  const now = Date.now();
  const dayMs = 1000 * 60 * 60 * 24;
  const weekMs = dayMs * 7;

  const daily = events.filter((event) => now - event.timestamp <= dayMs);
  const weekly = events.filter((event) => now - event.timestamp <= weekMs);

  return {
    totalEvents: events.length,
    dailyEvents: daily.length,
    weeklyEvents: weekly.length,
    topKeywords: rank(weekly.flatMap((event) => event.keywords)),
    topStyles: rank(weekly.map((event) => event.style.toLowerCase())),
  };
}
