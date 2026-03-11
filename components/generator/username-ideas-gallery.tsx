"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateUsernames, type UsernameStyle } from "@/lib/generators";

const TOTAL_IDEAS = 500;
const INITIAL_VISIBLE = 60;
const LOAD_MORE_STEP = 40;

const styleGroups: Array<{
  style: UsernameStyle;
  title: string;
  keywords: string[];
  length: { min: number; max: number };
}> = [
  { style: "cool", title: "Cool", keywords: ["nova", "cyber"], length: { min: 7, max: 12 } },
  { style: "aesthetic", title: "Aesthetic", keywords: ["luna", "aura"], length: { min: 7, max: 12 } },
  { style: "dark", title: "Dark", keywords: ["void", "night"], length: { min: 7, max: 12 } },
  { style: "funny", title: "Funny", keywords: ["meme", "waffle"], length: { min: 7, max: 12 } },
  { style: "fantasy", title: "Fantasy", keywords: ["rune", "dragon"], length: { min: 8, max: 13 } },
  { style: "hacker", title: "Hacker", keywords: ["zero", "cipher"], length: { min: 7, max: 12 } },
  { style: "anime", title: "Anime", keywords: ["kage", "sakura"], length: { min: 7, max: 12 } },
  { style: "streamer", title: "Streamer", keywords: ["live", "prime"], length: { min: 7, max: 12 } },
];

type UsernameIdeaEntry = {
  name: string;
  style: UsernameStyle;
  label: string;
};

function buildIdeasForStyle(style: UsernameStyle, keywords: string[], min: number, max: number, amount: number) {
  const output = new Set<string>();
  let attempts = 0;

  while (output.size < amount && attempts < 18) {
    const names = generateUsernames({
      keywords,
      style,
      amount,
      length: max,
      minLength: min,
      maxLength: max,
    });

    names.forEach((name) => output.add(name));
    attempts += 1;
  }

  return Array.from(output).slice(0, amount);
}

function buildGalleryIdeas(total: number) {
  const perStyle = Math.ceil(total / styleGroups.length);
  const combined: UsernameIdeaEntry[] = [];

  for (const group of styleGroups) {
    const names = buildIdeasForStyle(group.style, group.keywords, group.length.min, group.length.max, perStyle);
    names.forEach((name) => {
      combined.push({
        name,
        style: group.style,
        label: group.title,
      });
    });
  }

  return combined
    .sort(() => Math.random() - 0.5)
    .slice(0, total);
}

export function UsernameIdeasGallery() {
  const [toast, setToast] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  const ideas = useMemo(() => buildGalleryIdeas(TOTAL_IDEAS), []);
  const visibleIdeas = useMemo(() => ideas.slice(0, visibleCount), [ideas, visibleCount]);
  const hasMore = visibleCount < ideas.length;

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry?.isIntersecting) return;

        setVisibleCount((current) => Math.min(current + LOAD_MORE_STEP, ideas.length));
      },
      {
        rootMargin: "240px 0px",
      }
    );

    observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [hasMore, ideas.length]);

  const onCopy = useCallback(async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast("Username copied.");
      window.setTimeout(() => setToast(null), 1800);
    } catch {
      setToast(null);
    }
  }, []);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Breadcrumbs
        items={[
          { label: "Home", href: "/" },
          { label: "Username Ideas" },
        ]}
      />

      <Card className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Dynamic Gallery</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">Username Ideas</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
            Browse a dynamic gallery of 500 usernames in one fast grid. The gallery reveals more names automatically
            while you scroll, so the page stays responsive while still giving you a large pool of ideas.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
              {ideas.length.toLocaleString("en-US")} usernames
            </span>
            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
              {visibleIdeas.length} visible
            </span>
            {styleGroups.map((group) => (
              <span
                key={group.style}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300"
              >
                {group.title}
              </span>
            ))}
          </div>
        </div>

        <div className="p-6 md:p-8">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visibleIdeas.map((idea) => (
              <div
                key={`${idea.style}-${idea.name}`}
                className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="break-words text-sm font-semibold text-slate-100">{idea.name}</p>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-cyan-100">
                    {idea.label}
                  </span>
                </div>
                <Button variant="ghost" className="mt-3 w-full px-3 py-2 text-xs" onClick={() => onCopy(idea.name)}>
                  Copy Username
                </Button>
              </div>
            ))}
          </div>

          {hasMore ? (
            <div ref={loadMoreRef} className="mt-8 flex justify-center">
              <div className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-slate-300">
                Loading more usernames...
              </div>
            </div>
          ) : (
            <div className="mt-8 flex justify-center">
              <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-cyan-100">
                All 500 usernames loaded
              </div>
            </div>
          )}
        </div>
      </Card>

      {toast ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 animate-fadeUp rounded-xl2 border border-cyan-300/35 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan-100 shadow-neon backdrop-blur-xl">
          {toast}
        </div>
      ) : null}
    </section>
  );
}
