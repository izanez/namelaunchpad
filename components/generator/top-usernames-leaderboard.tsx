"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getTrendingUsernames,
  TRENDING_USERNAMES_EVENT,
  type TrendingUsernameEntry,
} from "@/lib/trending-usernames";

export function TopUsernamesLeaderboard() {
  const [entries, setEntries] = useState<TrendingUsernameEntry[]>([]);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setEntries(getTrendingUsernames(100));

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<TrendingUsernameEntry[]>;
      if (Array.isArray(customEvent.detail) && customEvent.detail.length > 0) {
        setEntries(customEvent.detail.slice(0, 100));
        return;
      }

      setEntries(getTrendingUsernames(100));
    };

    window.addEventListener(TRENDING_USERNAMES_EVENT, handleUpdate);
    return () => window.removeEventListener(TRENDING_USERNAMES_EVENT, handleUpdate);
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
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Leaderboard</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">Top Usernames</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            The most popular usernames generated on NameLaunchpad in this browser. Rankings update automatically as new
            usernames are generated.
          </p>
        </div>

        <div className="p-6 md:p-8">
          {entries.length === 0 ? (
            <p className="text-sm text-slate-400">No leaderboard entries yet. Generate some usernames first.</p>
          ) : (
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {entries.map((entry, index) => (
                <Card key={entry.name} className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
                      <h2 className="mt-2 text-lg font-semibold text-white">{entry.name}</h2>
                    </div>
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                      {entry.count}x
                    </span>
                  </div>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onCopy(entry.name)}>
                      Copy Username
                    </Button>
                    <Link href={`/username-generator?keywords=${encodeURIComponent(entry.name)}`} className="sm:flex-1">
                      <Button variant="ghost" className="w-full px-3 py-2 text-xs">
                        Open Generator
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </Card>

      {toast ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 animate-fadeUp rounded-xl2 border border-cyan-300/35 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan-100 shadow-neon backdrop-blur-xl">
          {toast}
        </div>
      ) : null}
    </section>
  );
}
