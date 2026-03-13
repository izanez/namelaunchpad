"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

type UsernameDatabaseCategory = "gaming" | "social" | "fantasy" | "anime" | "short" | "rare" | "clan" | "duo" | "edgy" | "cute";
type UsernameDatabaseStyle = "cool" | "aesthetic" | "dark" | "funny" | "fantasy" | "hacker" | "anime" | "streamer";
type UsernameRarity = "common" | "rare" | "epic" | "legendary";
type UsernameLengthBucket = "short" | "medium" | "long";

type UsernameRecord = {
  name: string;
  slug: string;
  category: UsernameDatabaseCategory;
  style: UsernameDatabaseStyle;
  length: number;
  rarity: UsernameRarity;
  tags: string[];
};

type UsernameDatabaseResponse = {
  items: UsernameRecord[];
  total: number;
  hasMore: boolean;
  facets: {
    total: number;
    styles: UsernameDatabaseStyle[];
    categories: UsernameDatabaseCategory[];
    rarities: UsernameRarity[];
    lengths: UsernameLengthBucket[];
  };
};

type BrowserBreadcrumbItem = {
  label: string;
  href?: string;
};

type FeaturedLink = {
  title: string;
  href: string;
  description: string;
};

const PAGE_SIZE = 60;
const categoryLabels: Record<UsernameDatabaseCategory, string> = {
  gaming: "Gaming",
  social: "Social",
  fantasy: "Fantasy",
  anime: "Anime",
  short: "Short",
  rare: "Rare",
  clan: "Clan",
  duo: "Duo",
  edgy: "Edgy",
  cute: "Cute",
};
const styleLabels: Record<UsernameDatabaseStyle, string> = {
  cool: "Cool",
  aesthetic: "Aesthetic",
  dark: "Dark",
  funny: "Funny",
  fantasy: "Fantasy",
  hacker: "Hacker",
  anime: "Anime",
  streamer: "Streamer",
};
const rarityLabels: Record<UsernameRarity, string> = {
  common: "Common",
  rare: "Rare",
  epic: "Epic",
  legendary: "Legendary",
};
const lengthLabels: Record<UsernameLengthBucket, string> = {
  short: "Short 4-6",
  medium: "Medium 7-10",
  long: "Long 11-15",
};

function ToggleGroup<T extends string>({
  label,
  options,
  selected,
  labels,
  onToggle,
}: {
  label: string;
  options: T[];
  selected: T[];
  labels: Record<T, string>;
  onToggle: (value: T) => void;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-300">{label}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option);
          return (
            <button
              key={option}
              type="button"
              onClick={() => onToggle(option)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                active
                  ? "border-cyan-300/60 bg-cyan-300/12 text-cyan-100"
                  : "border-white/15 bg-white/5 text-slate-300 hover:border-cyan-300/40 hover:text-white"
              }`}
            >
              {labels[option]}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function UsernameDatabaseBrowser({
  title = "Username Database",
  intro,
  breadcrumbs = [{ label: "Home", href: "/" }, { label: "Username Database" }],
  heroEyebrow = "Database",
  initialQuery = "",
  initialCategories = [],
  initialStyles = [],
  initialRarities = [],
  initialLengths = [],
  featuredLinks = [],
}: {
  title?: string;
  intro?: string;
  breadcrumbs?: BrowserBreadcrumbItem[];
  heroEyebrow?: string;
  initialQuery?: string;
  initialCategories?: UsernameDatabaseCategory[];
  initialStyles?: UsernameDatabaseStyle[];
  initialRarities?: UsernameRarity[];
  initialLengths?: UsernameLengthBucket[];
  featuredLinks?: FeaturedLink[];
}) {
  const [query, setQuery] = useState(initialQuery);
  const [selectedCategories, setSelectedCategories] = useState<UsernameDatabaseCategory[]>(initialCategories);
  const [selectedStyles, setSelectedStyles] = useState<UsernameDatabaseStyle[]>(initialStyles);
  const [selectedRarities, setSelectedRarities] = useState<UsernameRarity[]>(initialRarities);
  const [selectedLengths, setSelectedLengths] = useState<UsernameLengthBucket[]>(initialLengths);
  const [items, setItems] = useState<UsernameRecord[]>([]);
  const [total, setTotal] = useState(0);
  const [databaseTotal, setDatabaseTotal] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const [facets, setFacets] = useState<UsernameDatabaseResponse["facets"] | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const buildUrl = useCallback(
    (offset: number) => {
      const params = new URLSearchParams();
      if (query.trim()) params.set("q", query.trim());
      if (selectedCategories.length > 0) params.set("categories", selectedCategories.join(","));
      if (selectedStyles.length > 0) params.set("styles", selectedStyles.join(","));
      if (selectedRarities.length > 0) params.set("rarities", selectedRarities.join(","));
      if (selectedLengths.length > 0) params.set("lengths", selectedLengths.join(","));
      params.set("offset", String(offset));
      params.set("limit", String(PAGE_SIZE));
      return `/api/username-database?${params.toString()}`;
    },
    [query, selectedCategories, selectedLengths, selectedRarities, selectedStyles]
  );

  const loadPage = useCallback(
    async (offset: number, mode: "replace" | "append") => {
      setLoading(true);
      try {
        const response = await fetch(buildUrl(offset));
        if (!response.ok) throw new Error("Failed to load username database.");
        const data = (await response.json()) as UsernameDatabaseResponse;
        setItems((current) => (mode === "append" ? [...current, ...data.items] : data.items));
        setTotal(data.total);
        setDatabaseTotal(data.facets.total);
        setHasMore(data.hasMore);
        setFacets(data.facets);
      } finally {
        setLoading(false);
      }
    },
    [buildUrl]
  );

  useEffect(() => {
    void loadPage(0, "replace");
  }, [loadPage]);

  useEffect(() => {
    const node = sentinelRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry?.isIntersecting || loading || !hasMore) return;
        void loadPage(items.length, "append");
      },
      { rootMargin: "240px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [hasMore, items.length, loadPage, loading]);

  const onToggle = <T extends string,>(value: T, current: T[], setter: (next: T[]) => void) => {
    setter(current.includes(value) ? current.filter((item) => item !== value) : [...current, value]);
  };

  const clearFilters = () => {
    setQuery(initialQuery);
    setSelectedCategories(initialCategories);
    setSelectedStyles(initialStyles);
    setSelectedRarities(initialRarities);
    setSelectedLengths(initialLengths);
  };

  const onCopy = async (name: string) => {
    await navigator.clipboard.writeText(name);
    setCopied(name);
    window.setTimeout(() => setCopied(null), 1400);
  };

  const activeFilterCount = useMemo(
    () => selectedCategories.length + selectedStyles.length + selectedRarities.length + selectedLengths.length,
    [selectedCategories.length, selectedLengths.length, selectedRarities.length, selectedStyles.length]
  );

  const heroDescription =
    intro ??
    `Search more than ${databaseTotal.toLocaleString("en-US")} programmatically generated usernames across style, category, rarity, and length filters.`;

  const facetValues = facets ?? {
    total: 0,
    categories: Object.keys(categoryLabels) as UsernameDatabaseCategory[],
    styles: Object.keys(styleLabels) as UsernameDatabaseStyle[],
    rarities: Object.keys(rarityLabels) as UsernameRarity[],
    lengths: Object.keys(lengthLabels) as UsernameLengthBucket[],
  };

  return (
    <section className="mx-auto w-full max-w-6xl animate-fadeUp px-4 py-10 md:px-6">
      <Breadcrumbs items={breadcrumbs} />

      <Card className="overflow-hidden p-0">
        <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">{heroEyebrow}</p>
          <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">{title}</h1>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{heroDescription}</p>
        </div>

        <div className="p-6 md:p-8">
          {featuredLinks.length > 0 ? (
            <div className="mb-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {featuredLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-3xl border border-white/10 bg-white/5 p-5 transition hover:border-cyan-300/30"
                >
                  <h2 className="text-base font-semibold text-white">{link.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{link.description}</p>
                </Link>
              ))}
            </div>
          ) : null}

          <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_auto]">
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search usernames, tags, styles, rarity..."
              className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
            />
            <Button variant="ghost" onClick={clearFilters} className="lg:min-w-36">
              Reset Filters
            </Button>
          </div>

          <div className="mt-6 grid gap-4 xl:grid-cols-2">
            <ToggleGroup
              label="Categories"
              options={facetValues.categories}
              selected={selectedCategories}
              labels={categoryLabels}
              onToggle={(value) => onToggle(value, selectedCategories, setSelectedCategories)}
            />
            <ToggleGroup
              label="Styles"
              options={facetValues.styles}
              selected={selectedStyles}
              labels={styleLabels}
              onToggle={(value) => onToggle(value, selectedStyles, setSelectedStyles)}
            />
            <ToggleGroup
              label="Rarity"
              options={facetValues.rarities}
              selected={selectedRarities}
              labels={rarityLabels}
              onToggle={(value) => onToggle(value, selectedRarities, setSelectedRarities)}
            />
            <ToggleGroup
              label="Length"
              options={facetValues.lengths}
              selected={selectedLengths}
              labels={lengthLabels}
              onToggle={(value) => onToggle(value, selectedLengths, setSelectedLengths)}
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs uppercase tracking-wide text-slate-400">
            <span>{total.toLocaleString("en-US")} matches</span>
            <span>{activeFilterCount} active filters</span>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {items.map((item) => (
              <Card key={item.slug} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link href={`/usernames/${item.slug}`} className="text-base font-semibold text-white transition hover:text-cyan-200">
                      {item.name}
                    </Link>
                    <p className="mt-1 text-xs text-slate-400">/{item.slug}</p>
                  </div>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-100">
                    {item.length}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-wide">
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-slate-200">{categoryLabels[item.category]}</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-slate-200">{styleLabels[item.style]}</span>
                  <span className="rounded-full border border-white/15 bg-white/5 px-2 py-1 text-slate-200">{rarityLabels[item.rarity]}</span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span key={`${item.slug}-${tag}`} className="rounded-full border border-white/10 bg-slate-950/35 px-2 py-1 text-[11px] text-slate-400">
                      {tag}
                    </span>
                  ))}
                </div>
                <Button variant="ghost" className="mt-4 w-full px-3 py-2 text-xs" onClick={() => void onCopy(item.name)}>
                  {copied === item.name ? "Copied" : "Copy Username"}
                </Button>
              </Card>
            ))}
          </div>

          {loading ? <div className="mt-6 text-sm text-slate-400">Loading usernames...</div> : null}
          {!loading && items.length === 0 ? <div className="mt-6 text-sm text-slate-400">No usernames matched the current filters.</div> : null}
          <div ref={sentinelRef} className="h-10" />
        </div>
      </Card>
    </section>
  );
}
