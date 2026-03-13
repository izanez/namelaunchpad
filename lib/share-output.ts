export type SharedOutputPayload = {
  n: string[];
  s?: string;
  c?: string;
  k?: string[];
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

export function createShareHash(payload: SharedOutputPayload) {
  const normalized: SharedOutputPayload = {
    n: payload.n.map((entry) => entry.trim()).filter(Boolean).slice(0, 20),
    s: payload.s,
    c: payload.c,
    k: payload.k?.map((entry) => entry.trim()).filter(Boolean).slice(0, 6),
    t: payload.t,
  };

  return toBase64Url(JSON.stringify(normalized));
}

export function parseShareHash(hash: string): SharedOutputPayload | null {
  try {
    const parsed = JSON.parse(fromBase64Url(hash)) as Partial<SharedOutputPayload>;
    if (!Array.isArray(parsed.n) || parsed.n.length === 0) return null;
    if (typeof parsed.t !== "number") return null;

    return {
      n: parsed.n.filter((entry): entry is string => typeof entry === "string").slice(0, 20),
      s: typeof parsed.s === "string" ? parsed.s : undefined,
      c: typeof parsed.c === "string" ? parsed.c : undefined,
      k: Array.isArray(parsed.k) ? parsed.k.filter((entry): entry is string => typeof entry === "string").slice(0, 6) : undefined,
      t: parsed.t,
    };
  } catch {
    return null;
  }
}
