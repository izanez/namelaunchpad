"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type DailyTopClientProps = {
  names: string[];
  slugDate: string;
};

function downloadFile(filename: string, mimeType: string, content: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function DailyTopClient({ names, slugDate }: DailyTopClientProps) {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(null), 1600);
  };

  const onCopyAll = async () => {
    try {
      await navigator.clipboard.writeText(names.join("\n"));
      showToast("Daily list copied.");
    } catch {
      showToast("Copy failed.");
    }
  };

  const onCopyShareUrl = async () => {
    const url = `${window.location.origin}/daily-top?date=${slugDate}`;
    try {
      await navigator.clipboard.writeText(url);
      showToast("Share URL copied.");
    } catch {
      showToast("Could not copy URL.");
    }
  };

  const onDownloadCsv = () => {
    const csv = ["rank,username", ...names.map((name, index) => `${index + 1},"${name}"`)].join("\n");
    downloadFile(`daily-top-25-${slugDate}.csv`, "text/csv;charset=utf-8", csv);
    showToast("CSV downloaded.");
  };

  const onDownloadCard = async () => {
    const topFive = names.slice(0, 5).join(" | ");
    try {
      const response = await fetch(
        `/api/og?title=${encodeURIComponent("Daily Top 25 Usernames")}&subtitle=${encodeURIComponent(topFive)}&eyebrow=NameLaunchpad Daily&theme=listing`,
        { cache: "no-store" }
      );
      if (!response.ok) throw new Error("OG image failed");
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `daily-top-25-${slugDate}.png`;
      anchor.click();
      URL.revokeObjectURL(url);
      showToast("Image card downloaded.");
    } catch {
      showToast("Could not download image card.");
    }
  };

  return (
    <Card className="mt-6 p-5">
      <h2 className="text-xl font-bold text-white">Share-Ready Export</h2>
      <p className="mt-2 text-sm text-slate-300">Export this daily list as text, CSV, or image card.</p>
      <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
        <Button variant="ghost" className="h-10 px-3 py-0 text-xs" onClick={onCopyAll}>
          Copy Top 25
        </Button>
        <Button variant="ghost" className="h-10 px-3 py-0 text-xs" onClick={onCopyShareUrl}>
          Copy Share URL
        </Button>
        <Button variant="ghost" className="h-10 px-3 py-0 text-xs" onClick={onDownloadCsv}>
          Download CSV
        </Button>
        <Button variant="ghost" className="h-10 px-3 py-0 text-xs" onClick={onDownloadCard}>
          Download Image Card
        </Button>
      </div>
      {toast ? (
        <p className="mt-3 text-xs font-semibold text-cyan-200">{toast}</p>
      ) : null}
    </Card>
  );
}
