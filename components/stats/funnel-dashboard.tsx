"use client";

import { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { getFunnelSnapshot, type FunnelEventName } from "@/lib/funnel-analytics";

const steps: FunnelEventName[] = ["landing", "generate", "copy", "availability", "favorite"];

const stepLabels: Record<FunnelEventName, string> = {
  landing: "Landing",
  generate: "Generate",
  copy: "Copy",
  availability: "Availability",
  favorite: "Favorite",
};

type ReturnStats = {
  totalVisits: number;
  returnedWithin24h: number;
};

const VISIT_KEY = "namelaunchpad:visits:v1";

function formatPercent(value: number) {
  return `${Math.round(value * 100)}%`;
}

function readReturnStats(): ReturnStats {
  if (typeof window === "undefined") {
    return { totalVisits: 0, returnedWithin24h: 0 };
  }

  const now = Date.now();
  const raw = window.localStorage.getItem(VISIT_KEY);
  let visits: number[] = [];

  if (raw) {
    try {
      visits = (JSON.parse(raw) as number[]).filter((value) => Number.isFinite(value));
    } catch {
      visits = [];
    }
  }

  const kept = visits.filter((value) => now - value <= 1000 * 60 * 60 * 24 * 30);
  const returnedWithin24h = kept.reduce((count, value, index) => {
    if (index === 0) return count;
    const previous = kept[index - 1]!;
    return value - previous <= 1000 * 60 * 60 * 24 ? count + 1 : count;
  }, 0);

  kept.push(now);
  window.localStorage.setItem(VISIT_KEY, JSON.stringify(kept));

  return { totalVisits: kept.length, returnedWithin24h };
}

export function FunnelDashboard() {
  const [snapshot, setSnapshot] = useState(() => getFunnelSnapshot());
  const [returnStats, setReturnStats] = useState<ReturnStats>({ totalVisits: 0, returnedWithin24h: 0 });

  useEffect(() => {
    setSnapshot(getFunnelSnapshot());
    setReturnStats(readReturnStats());
  }, []);

  const landingCount = snapshot.counts.landing || 1;
  const generateRate = snapshot.counts.generate / landingCount;
  const copyRate = snapshot.counts.copy / Math.max(1, snapshot.counts.generate);
  const checkRate = snapshot.counts.availability / Math.max(1, snapshot.counts.copy);
  const favoriteRate = snapshot.counts.favorite / Math.max(1, snapshot.counts.copy);
  const returnRate = returnStats.totalVisits > 1 ? returnStats.returnedWithin24h / (returnStats.totalVisits - 1) : 0;

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wide text-cyan-300">Metrics</p>
        <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">Funnel Dashboard</h1>
        <p className="mt-3 text-sm text-slate-300">Local funnel tracking for landing, generate, copy, availability, and favorites.</p>
      </Card>

      <div className="mt-6 grid gap-3 md:grid-cols-5">
        {steps.map((step) => (
          <Card key={step} className="p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-300">{stepLabels[step]}</p>
            <p className="mt-2 text-2xl font-black text-white">{snapshot.counts[step]}</p>
          </Card>
        ))}
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-cyan-300">Landing to Generate</p>
          <p className="mt-2 text-xl font-black text-white">{formatPercent(generateRate)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-cyan-300">Generate to Copy</p>
          <p className="mt-2 text-xl font-black text-white">{formatPercent(copyRate)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-cyan-300">Copy to Availability</p>
          <p className="mt-2 text-xl font-black text-white">{formatPercent(checkRate)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-cyan-300">Favorite Rate</p>
          <p className="mt-2 text-xl font-black text-white">{formatPercent(favoriteRate)}</p>
        </Card>
        <Card className="p-5">
          <p className="text-xs uppercase tracking-wide text-cyan-300">24h Return</p>
          <p className="mt-2 text-xl font-black text-white">{formatPercent(returnRate)}</p>
        </Card>
      </div>
    </section>
  );
}
