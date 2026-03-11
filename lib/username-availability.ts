export type AvailabilityStatus = "Available" | "Possibly taken" | "Taken";
export type AvailabilityPlatform = "Twitch" | "TikTok" | "Instagram";
export type AvailabilityRecord = Record<AvailabilityPlatform, AvailabilityStatus>;

const platformUrls: Record<AvailabilityPlatform, (username: string) => string> = {
  Twitch: (username) => `https://www.twitch.tv/${username}`,
  TikTok: (username) => `https://www.tiktok.com/@${username}`,
  Instagram: (username) => `https://www.instagram.com/${username}/`,
};

function sanitizeUsername(username: string) {
  return username.trim().replace(/^@+/, "").replace(/[^a-zA-Z0-9._]/g, "");
}

async function fetchWithTimeout(url: string, init?: RequestInit, timeoutMs = 4500) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, {
      ...init,
      signal: controller.signal,
      cache: "no-store",
      headers: {
        "user-agent": "Mozilla/5.0 (compatible; NameLaunchpadBot/1.0; +https://www.namelaunchpad.com)",
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "accept-language": "en-US,en;q=0.9",
        ...init?.headers,
      },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function checkUrl(url: string) {
  try {
    const headResponse = await fetchWithTimeout(url, { method: "HEAD", redirect: "follow" });
    if (headResponse.status === 404 || headResponse.status === 410) return "Available" as const;
    if (headResponse.ok) return "Taken" as const;
  } catch {
    // Fall through to GET check.
  }

  try {
    const getResponse = await fetchWithTimeout(url, { method: "GET", redirect: "follow" });
    if (getResponse.status === 404 || getResponse.status === 410) return "Available" as const;
    if (getResponse.ok) return "Taken" as const;
    return "Possibly taken" as const;
  } catch {
    return "Possibly taken" as const;
  }
}

export async function checkUsernameAvailability(username: string): Promise<AvailabilityRecord> {
  const safeUsername = sanitizeUsername(username);

  if (!safeUsername) {
    return {
      Twitch: "Possibly taken",
      TikTok: "Possibly taken",
      Instagram: "Possibly taken",
    };
  }

  const results = await Promise.all(
    (Object.keys(platformUrls) as AvailabilityPlatform[]).map(async (platform) => {
      const status = await checkUrl(platformUrls[platform](safeUsername));
      return [platform, status] as const;
    })
  );

  return Object.fromEntries(results) as AvailabilityRecord;
}

export function buildUnverifiedAvailability(names: string[]) {
  const initialRecord: AvailabilityRecord = {
    Twitch: "Possibly taken",
    TikTok: "Possibly taken",
    Instagram: "Possibly taken",
  };

  return Object.fromEntries(names.map((name) => [name, { ...initialRecord }])) as Record<string, AvailabilityRecord>;
}
