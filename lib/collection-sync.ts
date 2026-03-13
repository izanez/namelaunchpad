export type CollectionSyncPayload = {
  f: string[];
  c: Record<string, string>;
  e?: string;
  t: number;
};

function toBase64Url(value: string) {
  if (typeof window === "undefined") {
    return Buffer.from(value, "utf8").toString("base64url");
  }
  const encoded = btoa(unescape(encodeURIComponent(value)));
  return encoded.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string) {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = normalized.length % 4 === 0 ? "" : "=".repeat(4 - (normalized.length % 4));
  if (typeof window === "undefined") {
    return Buffer.from(normalized + padding, "base64").toString("utf8");
  }
  return decodeURIComponent(escape(atob(normalized + padding)));
}

export function createCollectionSyncToken(payload: CollectionSyncPayload) {
  const safe: CollectionSyncPayload = {
    f: payload.f.slice(0, 80),
    c: payload.c,
    e: payload.e?.trim() || undefined,
    t: payload.t,
  };
  return toBase64Url(JSON.stringify(safe));
}

export function parseCollectionSyncToken(token: string): CollectionSyncPayload | null {
  try {
    const parsed = JSON.parse(fromBase64Url(token)) as Partial<CollectionSyncPayload>;
    if (!Array.isArray(parsed.f) || typeof parsed.t !== "number") return null;
    return {
      f: parsed.f.filter((entry): entry is string => typeof entry === "string").slice(0, 80),
      c: typeof parsed.c === "object" && parsed.c !== null ? parsed.c as Record<string, string> : {},
      e: typeof parsed.e === "string" ? parsed.e : undefined,
      t: parsed.t,
    };
  } catch {
    return null;
  }
}
