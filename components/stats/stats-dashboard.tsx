"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getGeneratorStatsSnapshot, GENERATOR_STATS_EVENT, refreshGlobalGeneratorStats } from "@/lib/generator-stats";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

function formatGeneratorName(slug: string) {
  return slug
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function LeaderboardColumn({
  title,
  items,
}: {
  title: string;
  items: Array<{ slug: string; count: number }>;
}) {
  return (
    <Card className="p-6 md:p-8">
      <h2 className="text-2xl font-black text-white">{title}</h2>
      <div className="mt-5 grid gap-3">
        {items.length === 0 ? (
          <p className="text-sm text-slate-400">No generator usage tracked yet.</p>
        ) : (
          items.slice(0, 10).map((entry, index) => (
            <div
              key={`${title}-${entry.slug}-${entry.count}`}
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
  );
}

function getHeatLevel(count: number, maxCount: number) {
  if (maxCount <= 0 || count <= 0) {
    return {
      label: "Low usage",
      className: "border-white/10 bg-white/5 text-slate-300",
    };
  }

  const ratio = count / maxCount;

  if (ratio >= 0.67) {
    return {
      label: "Most used",
      className: "border-rose-300/35 bg-rose-500/15 text-rose-100",
    };
  }

  if (ratio >= 0.34) {
    return {
      label: "Medium used",
      className: "border-amber-300/35 bg-amber-500/15 text-amber-100",
    };
  }

  return {
    label: "Low usage",
    className: "border-cyan-300/30 bg-cyan-300/10 text-cyan-100",
  };
}

export function StatsDashboard() {
  const [stats, setStats] = useState(() => getGeneratorStatsSnapshot());

  useEffect(() => {
    setStats(getGeneratorStatsSnapshot());
    void refreshGlobalGeneratorStats();

    const handleUpdate = () => {
      setStats(getGeneratorStatsSnapshot());
    };

    window.addEventListener(GENERATOR_STATS_EVENT, handleUpdate);
    return () => window.removeEventListener(GENERATOR_STATS_EVENT, handleUpdate);
  }, []);

  const maxUsageCount = stats.generatorUsage[0]?.count ?? 0;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <div className="grid gap-6">
        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Statistics</p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">Generator Stats</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              {stats.source === "global"
                ? "Live global statistics sourced from server-side tracking."
                : "Local statistics for this browser. Configure Supabase to switch these cards to shared global data."}
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

        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Leaderboard</p>
            <h2 className="mt-3 text-3xl font-black text-white md:text-4xl">Generator Leaderboard</h2>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
              Live rankings of the top generators today, this week, and this month based on tracked generator usage.
            </p>
          </div>
          <div className="grid gap-6 p-6 xl:grid-cols-3 md:p-8">
            <LeaderboardColumn title="Top Generators Today" items={stats.topGeneratorsToday} />
            <LeaderboardColumn title="Top Generators This Week" items={stats.topGeneratorsThisWeek} />
            <LeaderboardColumn title="Top Generators This Month" items={stats.topGeneratorsThisMonth} />
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-white">Generator Popularity Heatmap</h2>
              <p className="mt-2 text-sm text-slate-400">
                Dynamic usage view of the most used, medium used, and low usage generators.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
              <span className="rounded-full border border-rose-300/35 bg-rose-500/15 px-3 py-1 text-rose-100">
                Most used
              </span>
              <span className="rounded-full border border-amber-300/35 bg-amber-500/15 px-3 py-1 text-amber-100">
                Medium used
              </span>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-cyan-100">
                Low usage
              </span>
            </div>
          </div>

          {stats.generatorUsage.length === 0 ? (
            <p className="mt-5 text-sm text-slate-400">No generator usage tracked yet.</p>
          ) : (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {stats.generatorUsage.map((entry) => {
                const heat = getHeatLevel(entry.count, maxUsageCount);

                return (
                  <div
                    key={`heat-${entry.slug}`}
                    className={`rounded-xl2 border px-4 py-4 transition ${heat.className}`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{formatGeneratorName(entry.slug)}</p>
                        <p className="mt-2 text-[11px] uppercase tracking-wide opacity-80">{heat.label}</p>
                      </div>
                      <span className="rounded-full border border-current/20 bg-black/10 px-2 py-0.5 text-[11px] font-semibold">
                        {entry.count}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>
    </section>
  );
}
