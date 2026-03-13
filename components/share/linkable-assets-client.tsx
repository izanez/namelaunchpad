"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

function download(filename: string, mimeType: string, content: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

const cheatSheet = [
  "Username Style Cheat Sheet",
  "",
  "Clean: short words, no symbols, high readability.",
  "Dark: heavy consonants, tactical endings.",
  "Aesthetic: soft words, balanced rhythm.",
  "Streamer: memorable + pronounceable on voice.",
  "Short: 4-6 chars for fast in-game recognition.",
];

const lengthMatrix = [
  "Platform,Recommended Length,Reason",
  "Valorant,4-8,Fast readability in killfeed",
  "Fortnite,6-11,Supports expressive duo/clan style",
  "Discord,5-12,Flexible for communities",
  "TikTok,6-12,Handle recall and style fit",
  "Twitch,6-10,Easy pronunciation on stream",
];

const trends2026 = [
  "Top Gamer Name Trends 2026",
  "",
  "1. Short tactical names keep growing for competitive games.",
  "2. Duo and paired naming patterns are rising with team content.",
  "3. Aesthetic creator handles trend with soft and minimal wording.",
  "4. Cross-platform handle consistency is a stronger conversion factor.",
  "5. Shareable list pages perform better than hidden generator states.",
];

export function LinkableAssetsClient() {
  const [message, setMessage] = useState<string | null>(null);

  const done = (text: string) => {
    setMessage(text);
    window.setTimeout(() => setMessage(null), 1600);
  };

  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <Card className="p-5">
        <h2 className="text-xl font-bold text-white">Username Style Cheat Sheet</h2>
        <p className="mt-2 text-sm text-slate-300">Quick style guide for creators and gamers.</p>
        <Button
          variant="ghost"
          className="mt-4 h-10 px-3 py-0 text-xs"
          onClick={() => {
            download("username-style-cheat-sheet.txt", "text/plain;charset=utf-8", cheatSheet.join("\n"));
            done("Cheat sheet downloaded.");
          }}
        >
          Download TXT
        </Button>
      </Card>

      <Card className="p-5">
        <h2 className="text-xl font-bold text-white">Name Length Matrix</h2>
        <p className="mt-2 text-sm text-slate-300">Platform-specific length guidance in CSV.</p>
        <Button
          variant="ghost"
          className="mt-4 h-10 px-3 py-0 text-xs"
          onClick={() => {
            download("name-length-matrix.csv", "text/csv;charset=utf-8", lengthMatrix.join("\n"));
            done("Length matrix downloaded.");
          }}
        >
          Download CSV
        </Button>
      </Card>

      <Card className="p-5">
        <h2 className="text-xl font-bold text-white">Top Gamer Name Trends 2026</h2>
        <p className="mt-2 text-sm text-slate-300">Short report for blogs, forums, and creators.</p>
        <Button
          variant="ghost"
          className="mt-4 h-10 px-3 py-0 text-xs"
          onClick={() => {
            download("top-gamer-name-trends-2026.txt", "text/plain;charset=utf-8", trends2026.join("\n"));
            done("Trends report downloaded.");
          }}
        >
          Download TXT
        </Button>
      </Card>

      {message ? <p className="text-xs font-semibold text-cyan-200 md:col-span-3">{message}</p> : null}
    </div>
  );
}
