export const RECENT_USERNAMES_STORAGE_KEY = "namelaunchpad:recent-generated-usernames";
export const RECENT_USERNAMES_EVENT = "namelaunchpad:recent-generated-usernames-updated";

export type RecentGeneratedUsername = {
  name: string;
  timestamp: number;
};

const seedNames = [
  "ShadowNova",
  "CyberWolf",
  "PixelGhost",
  "VoidRider",
  "NovaKnight",
  "StormReaper",
  "GhostByte",
  "DarkVortex",
  "FrostPulse",
  "NeonPhantom",
];

function getSeedEntries(): RecentGeneratedUsername[] {
  const now = Date.now();
  return seedNames.map((name, index) => ({
    name,
    timestamp: now - index * 5000,
  }));
}

function sanitizeEntries(value: unknown): RecentGeneratedUsername[] {
  if (!Array.isArray(value)) {
    return getSeedEntries();
  }

  const entries = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const candidate = item as Partial<RecentGeneratedUsername>;
      if (typeof candidate.name !== "string" || typeof candidate.timestamp !== "number") return null;
      return {
        name: candidate.name,
        timestamp: candidate.timestamp,
      };
    })
    .filter((entry): entry is RecentGeneratedUsername => entry !== null);

  return entries.length > 0 ? entries : getSeedEntries();
}

function readStoredEntries() {
  if (typeof window === "undefined") {
    return getSeedEntries();
  }

  const raw = window.localStorage.getItem(RECENT_USERNAMES_STORAGE_KEY);
  if (!raw) {
    const seed = getSeedEntries();
    window.localStorage.setItem(RECENT_USERNAMES_STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  try {
    return sanitizeEntries(JSON.parse(raw));
  } catch {
    const seed = getSeedEntries();
    window.localStorage.setItem(RECENT_USERNAMES_STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }
}

function writeStoredEntries(entries: RecentGeneratedUsername[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(RECENT_USERNAMES_STORAGE_KEY, JSON.stringify(entries));
  window.dispatchEvent(new CustomEvent(RECENT_USERNAMES_EVENT, { detail: entries }));
}

export function getRecentGeneratedUsernames(limit = 20) {
  return [...readStoredEntries()]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, limit);
}

export function trackRecentGeneratedUsernames(names: string[]) {
  if (typeof window === "undefined" || names.length === 0) {
    return getSeedEntries();
  }

  const now = Date.now();
  const entries = names
    .map((name, index) => {
      const cleanName = name.trim();
      if (!cleanName) return null;
      return {
        name: cleanName,
        timestamp: now - index,
      };
    })
    .filter((entry): entry is RecentGeneratedUsername => entry !== null);

  const nextEntries = [...entries, ...readStoredEntries()]
    .sort((a, b) => b.timestamp - a.timestamp)
    .slice(0, 120);

  writeStoredEntries(nextEntries);
  return nextEntries;
}
