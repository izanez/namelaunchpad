const WINDOW_MS = 60 * 60 * 1000;

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
  limit: number;
};

declare global {
  // eslint-disable-next-line no-var
  var __namelaunchpadRateLimits: Map<string, RateLimitEntry> | undefined;
}

function getStore() {
  if (!globalThis.__namelaunchpadRateLimits) {
    globalThis.__namelaunchpadRateLimits = new Map<string, RateLimitEntry>();
  }

  return globalThis.__namelaunchpadRateLimits;
}

function cleanupExpiredEntries(now: number) {
  const store = getStore();

  for (const [key, entry] of store.entries()) {
    if (entry.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function getClientIp(headers: Headers) {
  const forwardedFor = headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return headers.get("x-real-ip") || headers.get("cf-connecting-ip") || "unknown";
}

export function applyRateLimit({
  key,
  limit,
  now = Date.now(),
}: {
  key: string;
  limit: number;
  now?: number;
}): RateLimitResult {
  cleanupExpiredEntries(now);

  const store = getStore();
  const entry = store.get(key);

  if (!entry || entry.resetAt <= now) {
    const resetAt = now + WINDOW_MS;
    store.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: Math.max(0, limit - 1),
      resetAt,
      limit,
    };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.resetAt,
      limit,
    };
  }

  entry.count += 1;
  store.set(key, entry);

  return {
    allowed: true,
    remaining: Math.max(0, limit - entry.count),
    resetAt: entry.resetAt,
    limit,
  };
}
