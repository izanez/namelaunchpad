export const TRENDING_USERNAMES_STORAGE_KEY = "namelaunchpad:trending-usernames";
export const TRENDING_USERNAMES_EVENT = "namelaunchpad:trending-usernames-updated";

const defaultTrendingSeeds = [
  "ShadowNova",
  "CyberWolf",
  "DarkRider",
  "PixelKnight",
  "GhostSniper",
  "StormSlayer",
  "NeonPhantom",
  "VoidRider",
  "NovaKnight",
  "FrostPulse",
  "NightCipher",
  "BlazeRogue",
  "VortexRush",
  "GhostByte",
  "HyperEcho",
  "BattleNova",
  "VictoryVortex",
  "LootPhantom",
  "BlockyWarrior",
  "Stormwarden",
];

export type TrendingUsernameEntry = {
  name: string;
  count: number;
};

function getSeedEntries(): TrendingUsernameEntry[] {
  return defaultTrendingSeeds.map((name, index) => ({
    name,
    count: Math.max(1, defaultTrendingSeeds.length - index),
  }));
}

function sanitizeEntries(value: unknown): TrendingUsernameEntry[] {
  if (!Array.isArray(value)) {
    return getSeedEntries();
  }

  const entries = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const candidate = item as Partial<TrendingUsernameEntry>;
      if (typeof candidate.name !== "string" || typeof candidate.count !== "number") return null;
      return {
        name: candidate.name,
        count: Math.max(1, Math.floor(candidate.count)),
      };
    })
    .filter((item): item is TrendingUsernameEntry => item !== null);

  return entries.length > 0 ? entries : getSeedEntries();
}

function readStoredEntries(): TrendingUsernameEntry[] {
  if (typeof window === "undefined") {
    return getSeedEntries();
  }

  const raw = window.localStorage.getItem(TRENDING_USERNAMES_STORAGE_KEY);
  if (!raw) {
    const seed = getSeedEntries();
    window.localStorage.setItem(TRENDING_USERNAMES_STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  try {
    return sanitizeEntries(JSON.parse(raw));
  } catch {
    const seed = getSeedEntries();
    window.localStorage.setItem(TRENDING_USERNAMES_STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
}

function writeStoredEntries(entries: TrendingUsernameEntry[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(TRENDING_USERNAMES_STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent(TRENDING_USERNAMES_EVENT, { detail: entries }));
}

export function getTrendingUsernames(limit = 20) {
  return [...readStoredEntries()]
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, limit);
}

export function trackGeneratedUsernames(names: string[]) {
  if (typeof window === "undefined" || names.length === 0) {
    return getSeedEntries();
  }

  const counts = new Map(readStoredEntries().map((entry) => [entry.name, entry.count]));

  for (const name of names) {
    const cleanName = name.trim();
    if (!cleanName) continue;
    counts.set(cleanName, (counts.get(cleanName) ?? 0) + 1);
  }

  const nextEntries = Array.from(counts.entries())
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name))
    .slice(0, 100);

  writeStoredEntries(nextEntries);
  return nextEntries;
}
