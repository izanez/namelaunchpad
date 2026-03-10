"use client";

import { useEffect, useState } from "react";
import { getDailyGeneratedCount, LIVE_COUNTER_BASE, LIVE_COUNTER_EVENT } from "@/lib/live-counter";

function formatCount(value: number) {
  return new Intl.NumberFormat("en-US").format(value);
}

export function LiveCounter() {
  const [count, setCount] = useState(LIVE_COUNTER_BASE);

  useEffect(() => {
    setCount(getDailyGeneratedCount());

    const handleUpdate = (event: Event) => {
      const customEvent = event as CustomEvent<number>;
      if (typeof customEvent.detail === "number") {
        setCount(customEvent.detail);
        return;
      }
      setCount(getDailyGeneratedCount());
    };

    window.addEventListener(LIVE_COUNTER_EVENT, handleUpdate);
    return () => window.removeEventListener(LIVE_COUNTER_EVENT, handleUpdate);
  }, []);

  return (
    <div className="mt-6 inline-flex rounded-full border border-orange-300/25 bg-orange-400/10 px-4 py-2 text-sm font-semibold text-orange-100 shadow-[0_0_30px_rgba(251,146,60,0.15)]">
      {`\u{1F525} ${formatCount(count)} gamer names generated today`}
    </div>
  );
}
