"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const seedNames = [
  "ShadowNova",
  "KaoroRush",
  "NovaViper",
  "CyberDrift",
  "LunaGlow",
  "AceVyr",
  "RushTwin",
  "Vexor",
  "AuraLoop",
  "ClutchMate",
];

type VoteMap = Record<string, number>;

function getWeekKey() {
  const now = new Date();
  const oneJan = new Date(Date.UTC(now.getUTCFullYear(), 0, 1));
  const dayOfYear = Math.floor((now.getTime() - oneJan.getTime()) / 86400000) + 1;
  const week = Math.ceil(dayOfYear / 7);
  return `${now.getUTCFullYear()}-W${String(week).padStart(2, "0")}`;
}

export function CommunityPicks() {
  const storageKey = useMemo(() => `namelaunchpad:community-votes:${getWeekKey()}`, []);
  const [votes, setVotes] = useState<VoteMap>(() => {
    if (typeof window === "undefined") return {};
    const raw = window.localStorage.getItem(storageKey);
    if (!raw) return {};
    try {
      return JSON.parse(raw) as VoteMap;
    } catch {
      return {};
    }
  });

  const ranked = useMemo(() => {
    return seedNames
      .map((name) => ({ name, votes: votes[name] ?? 0 }))
      .sort((a, b) => b.votes - a.votes || a.name.localeCompare(b.name));
  }, [votes]);

  const topName = ranked[0]?.name ?? "ShadowNova";

  const onVote = (name: string) => {
    setVotes((current) => {
      const next = { ...current, [name]: (current[name] ?? 0) + 1 };
      window.localStorage.setItem(storageKey, JSON.stringify(next));
      return next;
    });
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wide text-cyan-300">UGC Loop</p>
        <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">Community Picks</h1>
        <p className="mt-3 text-sm text-slate-300">
          Upvote names, track the weekly leaderboard, and discover the name of the week.
        </p>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card className="p-5 md:col-span-2">
          <h2 className="text-xl font-bold text-white">Weekly Leaderboard</h2>
          <div className="mt-4 grid gap-2">
            {ranked.map((entry, index) => (
              <div
                key={entry.name}
                className="flex items-center justify-between rounded-xl border border-white/15 bg-white/5 px-3 py-2"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold text-cyan-300">#{index + 1}</span>
                  <span className="text-sm font-semibold text-white">{entry.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-300">{entry.votes} votes</span>
                  <Button variant="ghost" className="h-8 px-3 py-0 text-xs" onClick={() => onVote(entry.name)}>
                    Upvote
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-5">
          <h2 className="text-xl font-bold text-white">Name of the Week</h2>
          <p className="mt-4 text-2xl font-black text-cyan-200">{topName}</p>
          <p className="mt-2 text-xs text-slate-400">Top voted name this week.</p>
          <Link href={`/username-generator?keywords=${encodeURIComponent(topName)}#generator`}>
            <Button className="mt-4 h-10 px-4 py-0 text-xs">Generate Similar</Button>
          </Link>
        </Card>
      </div>
    </section>
  );
}
