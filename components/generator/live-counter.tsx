"use client";

import { useEffect, useState } from "react";
import { GENERATOR_STATS_EVENT, getGeneratorStatsSnapshot, refreshGlobalGeneratorStats } from "@/lib/generator-stats";
import { getDailyGeneratedCount, LIVE_COUNTER_BASE, LIVE_COUNTER_EVENT } from "@/lib/live-counter";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function LiveCounter() {
  const [count, setCount] = useState(LIVE_COUNTER_BASE);

  useEffect(() => {
    const initialStats = getGeneratorStatsSnapshot();
    setCount(initialStats.dailyGenerationCount || getDailyGeneratedCount());
    void refreshGlobalGeneratorStats();

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        setCount(customEvent.detail);
        return;
      }
      setCount(getDailyGeneratedCount());
    };

    const handleStatsUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<{ dailyGenerationCount?: number }>;
      if (typeof customEvent.detail?.dailyGenerationCount === "number") {
        setCount(customEvent.detail.dailyGenerationCount);
        return;
      }
      setCount(getGeneratorStatsSnapshot().dailyGenerationCount || getDailyGeneratedCount());
    };

    window.addEventListener(LIVE_COUNTER_EVENT, handleUpdate);
    window.addEventListener(GENERATOR_STATS_EVENT, handleStatsUpdate);
    return () => {
      window.removeEventListener(LIVE_COUNTER_EVENT, handleUpdate);
      window.removeEventListener(GENERATOR_STATS_EVENT, handleStatsUpdate);
    };
  }, []);

  return (
    <div className="mt-6 inline-flex rounded-full border border-orange-300/25 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-100 shadow-[0_0_30px_rgba(251,146,60,0.15)]">
      {`\u{1F525} ${formatCount(count)} gamer names generated today`}
    </div>
  );
}
