"use client";

import { useEffect, useMemo } from "react";
import { Card } from "@/components/ui/card";

type AdSlotProps = {
  slot: "top-banner" | "between-results" | "sidebar" | "footer";
  label?: string;
  className?: string;
};

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const slotStyles: Record<AdSlotProps["slot"], string> = {
  "top-banner": "min-h-28",
  "between-results": "min-h-24",
  sidebar: "min-h-80",
  footer: "min-h-32",
};

const adsenseSlotKeys: Record<AdSlotProps["slot"], string | undefined> = {
  "top-banner": process.env.NEXT_PUBLIC_ADSENSE_SLOT_TOP_BANNER,
  "between-results": process.env.NEXT_PUBLIC_ADSENSE_SLOT_BETWEEN_RESULTS,
  sidebar: process.env.NEXT_PUBLIC_ADSENSE_SLOT_SIDEBAR,
  footer: process.env.NEXT_PUBLIC_ADSENSE_SLOT_FOOTER,
};

export function AdSlot({ slot, label = "Google AdSense Placeholder", className = "" }: AdSlotProps) {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
  const slotId = adsenseSlotKeys[slot];
  const adKey = useMemo(() => `${slot}-${slotId ?? "placeholder"}`, [slot, slotId]);
  const isAdsenseReady = Boolean(client && slotId);

  useEffect(() => {
    if (!isAdsenseReady) return;

    try {
      window.adsbygoogle = window.adsbygoogle ?? [];
      window.adsbygoogle.push({});
    } catch {}
  }, [adKey, isAdsenseReady]);

  return (
    <Card
      className={`relative overflow-hidden border-dashed border-cyan-300/25 bg-slate-950/35 p-4 backdrop-blur-xl ${slotStyles[slot]} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.12),transparent_55%)]" />
      {isAdsenseReady ? (
        <div className="relative flex h-full min-h-inherit items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-2 py-2">
          <ins
            key={adKey}
            className="adsbygoogle block h-full w-full"
            style={{ display: "block" }}
            data-ad-client={client}
            data-ad-slot={slotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
            aria-label={`${slot} advertisement`}
          />
        </div>
      ) : (
        <div className="relative flex h-full min-h-inherit flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-6 text-center">
          <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-cyan-200">
            {slot.replace("-", " ")}
          </span>
          <p className="mt-3 text-sm font-semibold text-white">{label}</p>
          <p className="mt-1 text-xs text-slate-400">
            Set `NEXT_PUBLIC_ADSENSE_CLIENT` and the matching slot env var to render a live Google AdSense unit.
          </p>
        </div>
      )}
    </Card>
  );
}
