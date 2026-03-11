"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getGeneratorStatsSnapshot, GENERATOR_STATS_EVENT } from "@/lib/generator-stats";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatGeneratorName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export function StatsDashboard() {
  const [stats, setStats] = useState(() => getGeneratorStatsSnapshot());

  useEffect(() => {
    setStats(getGeneratorStatsSnapshot());

    const handleUpdate = () => {
      setStats(getGeneratorStatsSnapshot());
    };

    window.addEventListener(GENERATOR_STATS_EVENT, handleUpdate);
    return () => window.removeEventListener(GENERATOR_STATS_EVENT, handleUpdate);
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <div className="grid gap-6">
        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Statistics</p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">Generator Stats</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Live local statistics for username generation activity in this browser session and stored history.
            </p>
          </div>
          <div className="grid gap-4 p-6 md:grid-cols-2 xl:grid-cols-4 md:p-8">
            <Card className="p-5">
              <p className="text-xs uppercase tracking-wide text-cyan-300">Total usernames generated</p>
              <p className="mt-3 text-3xl font-black text-white">{formatCount(stats.totalUsernamesGenerated)}</p>
            </Card>
            <Card className="p-5">
              <p className="text-xs uppercase tracking-wide text-cyan-300">Daily generation count</p>
              <p className="mt-3 text-3xl font-black text-white">{formatCount(stats.dailyGenerationCount)}</p>
            </Card>
            <Card className="p-5">
              <p className="text-xs uppercase tracking-wide text-cyan-300">Most used generator</p>
              <p className="mt-3 text-xl font-black text-white">
                {stats.mostUsedGenerator ? formatGeneratorName(stats.mostUsedGenerator.slug) : "No data yet"}
              </p>
            </Card>
            <Card className="p-5">
              <p className="text-xs uppercase tracking-wide text-cyan-300">Generator runs</p>
              <p className="mt-3 text-3xl font-black text-white">
                {formatCount(stats.generatorUsage.reduce((sum, entry) => sum + entry.count, 0))}
              </p>
            </Card>
          </div>
        </Card>

        <div className="grid gap-6 xl:grid-cols-2">
          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-white">Most Popular Usernames</h2>
            <div className="mt-5 grid gap-3">
              {stats.mostPopularUsernames.map((entry, index) => (
                <div
                  key={`${entry.name}-${entry.count}`}
                  className="flex items-center justify-between rounded-xl2 border border-white/10 bg-white/5 px-4 py-3"
                >
                  <div>
                    <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-100">{entry.name}</p>
                  </div>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                    {entry.count}x
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-white">Most Used Generators</h2>
            <div className="mt-5 grid gap-3">
              {stats.generatorUsage.length === 0 ? (
                <p className="text-sm text-slate-400">No generator usage tracked yet.</p>
              ) : (
                stats.generatorUsage.slice(0, 10).map((entry, index) => (
                  <div
                    key={`${entry.slug}-${entry.count}`}
                    className="flex items-center justify-between rounded-xl2 border border-white/10 bg-white/5 px-4 py-3"
                  >
                    <div>
                      <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-100">{formatGeneratorName(entry.slug)}</p>
                    </div>
                    <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                      {entry.count} runs
                    </span>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
