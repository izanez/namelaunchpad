"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GENERATOR_STATS_EVENT } from "@/lib/generator-stats";
import {
  getTrendingUsernames,
  TRENDING_USERNAMES_EVENT,
  type TrendingUsernameEntry,
} from "@/lib/trending-usernames";

export function TrendingUsernamesSection() {
  const [entries, setEntries] = useState<TrendingUsernameEntry[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const loadGlobalTrending = async () => {
      try {
        const response = await fetch("/api/stats/summary", {
          method: "GET",
          cache: "no-store",
        });

        if (!response.ok) return;
        const data = (await response.json()) as { mostPopularUsernames?: TrendingUsernameEntry[]; source?: string };
        if (data.source === "global" && Array.isArray(data.mostPopularUsernames)) {
          setEntries(data.mostPopularUsernames.slice(0, 20));
          return;
        }
      } catch {
        // Local trending remains visible.
      }

      setEntries(getTrendingUsernames(20));
    };

    void loadGlobalTrending();

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<TrendingUsernameEntry[]>;
      if (Array.isArray(customEvent.detail) && customEvent.detail.length > 0) {
        setEntries(customEvent.detail.slice(0, 20));
        return;
      }

      setEntries(getTrendingUsernames(20));
    };

    const handleStatsUpdate = () => {
      void loadGlobalTrending();
    };

    window.addEventListener(TRENDING_USERNAMES_EVENT, handleUpdate);
    window.addEventListener(GENERATOR_STATS_EVENT, handleStatsUpdate);

    return () => {
      window.removeEventListener(TRENDING_USERNAMES_EVENT, handleUpdate);
      window.removeEventListener(GENERATOR_STATS_EVENT, handleStatsUpdate);
    };
  }, []);

  const onCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast("Username copied.");
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }
  }, []);

  return (
    <section className="content-auto mt-10">
      <div className="mb-4 flex items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">Trending Usernames</h2>
          <p className="mt-2 text-sm text-slate-400">
            Top 20 usernames based on generated name frequency. Falls back to local browser data when global stats are unavailable.
          </p>
        </div>
        <span className="text-xs uppercase tracking-wide text-slate-400">Top 20</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {entries.map((entry, index) => (
          <Card key={entry.name} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
                <h3 className="mt-2 text-lg font-semibold text-white">{entry.name}</h3>
              </div>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                {entry.count}x
              </span>
            </div>

            <div className="mt-4 flex flex-col gap-2">
              <Button variant="ghost" className="w-full px-3 py-2 text-xs" onClick={() => onCopy(entry.name)}>
                Copy Username
              </Button>
              <Link href={`/username-generator?keywords=${encodeURIComponent(entry.name)}`} className="block">
                <Button variant="ghost" className="w-full px-3 py-2 text-xs">
                  Generate Similar
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>

      {toast ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 animate-fadeUp rounded-xl2 border border-cyan-300/35 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan-100 shadow-neon backdrop-blur-xl">
          {toast}
        </div>
      ) : null}
    </section>
  );
}
