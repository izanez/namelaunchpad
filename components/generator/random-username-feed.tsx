"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import {
  getRecentGeneratedUsernames,
  RECENT_USERNAMES_EVENT,
  type RecentGeneratedUsername,
} from "@/lib/recent-generated-usernames";

export function RandomUsernameFeed() {
  const [entries, setEntries] = useState<RecentGeneratedUsername[]>([]);
  const [visibleEntries, setVisibleEntries] = useState<RecentGeneratedUsername[]>([]);

  useEffect(() => {
    const initial = getRecentGeneratedUsernames(24);
    setEntries(initial);
    setVisibleEntries(initial.slice(0, 10));

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<RecentGeneratedUsername[]>;
      if (Array.isArray(customEvent.detail) && customEvent.detail.length > 0) {
        setEntries(customEvent.detail.slice(0, 24));
        setVisibleEntries(customEvent.detail.slice(0, 10));
        return;
      }

      const latest = getRecentGeneratedUsernames(24);
      setEntries(latest);
      setVisibleEntries(latest.slice(0, 10));
    };

    window.addEventListener(RECENT_USERNAMES_EVENT, handleUpdate);
    return () => window.removeEventListener(RECENT_USERNAMES_EVENT, handleUpdate);
  }, []);

  useEffect(() => {
    if (entries.length <= 10) {
      setVisibleEntries(entries);
      return;
    }

    const interval = window.setInterval(() => {
      setVisibleEntries((current) => {
        if (current.length === 0) return entries.slice(0, 10);
        const firstVisible = current[0]?.name;
        const currentIndex = Math.max(
          0,
          entries.findIndex((entry) => entry.name === firstVisible)
        );
        const nextStart = (currentIndex + 1) % entries.length;
        const rotated = [...entries.slice(nextStart), ...entries.slice(0, nextStart)];
        return rotated.slice(0, 10);
      });
    }, 5000);

    return () => window.clearInterval(interval);
  }, [entries]);

  const feedItems = useMemo(() => visibleEntries, [visibleEntries]);

  return (
    <section className="content-auto mt-10">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">🔥 Recently Generated Usernames</h2>
          <p className="mt-2 text-sm text-slate-400">
            A continuously refreshing feed of the latest usernames generated in this browser.
          </p>
        </div>
        <span className="text-xs uppercase tracking-wide text-slate-400">Updates every few seconds</span>
      </div>

      <Card className="p-6">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {feedItems.map((entry, index) => (
            <div
              key={`${entry.name}-${entry.timestamp}-${index}`}
              className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-3"
            >
              <p className="text-xs uppercase tracking-wide text-cyan-300">Recent</p>
              <p className="mt-2 text-sm font-semibold text-slate-100">{entry.name}</p>
            </div>
          ))}
        </div>
      </Card>
    </section>
  );
}
