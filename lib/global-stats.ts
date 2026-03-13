import "server-only";

import type { GlobalStatsSummary, GlobalTrackGenerationPayload } from "@/lib/global-stats-types";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function getSupabaseHeaders() {
  return {
    apikey: SUPABASE_SERVICE_ROLE_KEY as string,
    Authorization: `Bearer ${SUPABASE_SERVICE_ROLE_KEY as string}`,
    "Content-Type": "application/json",
  };
}

function createFallbackSummary(): GlobalStatsSummary {
  return {
    totalUsernamesGenerated: 0,
    dailyGenerationCount: 0,
    mostPopularUsernames: [],
    generatorUsage: [],
    mostUsedGenerator: null,
    topGeneratorsToday: [],
    topGeneratorsThisWeek: [],
    topGeneratorsThisMonth: [],
    source: "local",
  };
}

export function hasGlobalStatsConfig() {
  return Boolean(SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY);
}

async function callSupabaseRpc<T>(fn: string, body?: Record<string, unknown>): Promise<T> {
  if (!hasGlobalStatsConfig()) {
    throw new Error("Global stats are not configured.");
  }

  const response = await fetch(`${SUPABASE_URL}/rest/v1/rpc/${fn}`, {
    method: "POST",
    headers: getSupabaseHeaders(),
    cache: "no-store",
    body: JSON.stringify(body ?? {}),
  });

  if (!response.ok) {
    throw new Error(`Supabase RPC ${fn} failed with status ${response.status}.`);
  }

  return (await response.json()) as T;
}

export async function trackGlobalGenerationEvent(payload: GlobalTrackGenerationPayload) {
  if (!hasGlobalStatsConfig()) return { ok: false as const, source: "local" as const };

  const safeUsernames = payload.usernames
    .map((entry) => entry.trim())
    .filter(Boolean)
    .slice(0, Math.min(100, Math.max(1, payload.amount)));

  await callSupabaseRpc("nl_track_generation_event", {
    p_generator_slug: payload.generatorSlug,
    p_amount: Math.max(1, Math.floor(payload.amount)),
    p_usernames: safeUsernames,
  });

  return { ok: true as const, source: "global" as const };
}

export async function getGlobalStatsSummary(): Promise<GlobalStatsSummary> {
  if (!hasGlobalStatsConfig()) {
    return createFallbackSummary();
  }

  const result = await callSupabaseRpc<GlobalStatsSummary[] | GlobalStatsSummary>("nl_get_stats_summary");
  const summary = Array.isArray(result) ? result[0] : result;

  if (!summary) {
    return createFallbackSummary();
  }

  return {
    totalUsernamesGenerated: summary.totalUsernamesGenerated ?? 0,
    dailyGenerationCount: summary.dailyGenerationCount ?? 0,
    mostPopularUsernames: summary.mostPopularUsernames ?? [],
    generatorUsage: summary.generatorUsage ?? [],
    mostUsedGenerator: summary.mostUsedGenerator ?? null,
    topGeneratorsToday: summary.topGeneratorsToday ?? [],
    topGeneratorsThisWeek: summary.topGeneratorsThisWeek ?? [],
    topGeneratorsThisMonth: summary.topGeneratorsThisMonth ?? [],
    source: "global",
  };
}
