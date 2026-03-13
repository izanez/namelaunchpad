export const LIVE_COUNTER_STORAGE_KEY = "namelaunchpad:daily-generated-count";
export const LIVE_COUNTER_EVENT = "namelaunchpad:counter-updated";
export const LIVE_COUNTER_BASE = 154328;

type StoredCounter = {
  date: string;
  count: number;
};

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function readStoredCounter(): StoredCounter {
  if (typeof window === "undefined") {
    return { date: getTodayKey(), count: LIVE_COUNTER_BASE };
  }

  const today = getTodayKey();
  const raw = window.localStorage.getItem(LIVE_COUNTER_STORAGE_KEY);

  if (!raw) {
    const initial = { date: today, count: LIVE_COUNTER_BASE };
    window.localStorage.setItem(LIVE_COUNTER_STORAGE_KEY, JSON.stringify(initial));
    return initial;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<StoredCounter>;
    if (parsed.date === today && typeof parsed.count === "number") {
      return { date: today, count: parsed.count };
    }
  } catch {}

  const reset = { date: today, count: LIVE_COUNTER_BASE };
  window.localStorage.setItem(LIVE_COUNTER_STORAGE_KEY, JSON.stringify(reset));
  return reset;
}

export function getDailyGeneratedCount() {
  return readStoredCounter().count;
}

export function incrementDailyGeneratedCount(amount: number) {
  if (typeof window === "undefined") return LIVE_COUNTER_BASE;

  const safeAmount = Math.max(0, Math.floor(amount));
  const current = readStoredCounter();
  const next = {
    date: current.date,
    count: current.count + safeAmount,
  };

  window.localStorage.setItem(LIVE_COUNTER_STORAGE_KEY, JSON.stringify(next));
  window.dispatchEvent(new CustomEvent(LIVE_COUNTER_EVENT, { detail: next.count }));
  return next.count;
}

