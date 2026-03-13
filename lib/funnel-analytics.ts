export type FunnelEventName = "landing" | "generate" | "copy" | "availability" | "favorite";

export type FunnelSnapshot = {
  counts: Record<FunnelEventName, number>;
  lastUpdatedAt: number;
};

const FUNNEL_STORAGE_KEY = "namelaunchpad:funnel:v1";

function getDefaultSnapshot(): FunnelSnapshot {
  return {
    counts: {
      landing: 0,
      generate: 0,
      copy: 0,
      availability: 0,
      favorite: 0,
    },
    lastUpdatedAt: Date.now(),
  };
}

function readSnapshot(): FunnelSnapshot {
  if (typeof window === "undefined") return getDefaultSnapshot();
  const raw = window.localStorage.getItem(FUNNEL_STORAGE_KEY);
  if (!raw) return getDefaultSnapshot();
  try {
    const parsed = JSON.parse(raw) as FunnelSnapshot;
    return {
      counts: {
        landing: parsed.counts?.landing ?? 0,
        generate: parsed.counts?.generate ?? 0,
        copy: parsed.counts?.copy ?? 0,
        availability: parsed.counts?.availability ?? 0,
        favorite: parsed.counts?.favorite ?? 0,
      },
      lastUpdatedAt: parsed.lastUpdatedAt ?? Date.now(),
    };
  } catch {
    return getDefaultSnapshot();
  }
}

function writeSnapshot(snapshot: FunnelSnapshot) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FUNNEL_STORAGE_KEY, JSON.stringify(snapshot));
}

export function trackFunnelEvent(event: FunnelEventName) {
  if (typeof window === "undefined") return getDefaultSnapshot();
  const snapshot = readSnapshot();
  snapshot.counts[event] = (snapshot.counts[event] ?? 0) + 1;
  snapshot.lastUpdatedAt = Date.now();
  writeSnapshot(snapshot);
  return snapshot;
}

export function getFunnelSnapshot() {
  return readSnapshot();
}
