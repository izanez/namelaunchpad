"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AdSlot } from "@/components/ads/ad-slot";
import { LoadingGrid } from "@/components/generator/loading-grid";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SmartInternalLinks } from "@/components/seo/smart-internal-links";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { trackGeneratorUsage, trackGlobalGenerationEvent } from "@/lib/generator-stats";
import { getRelatedGenerators, type GeneratorDirectoryEntry } from "@/lib/generators";
import { getSmartInternalLinkSections } from "@/lib/smart-internal-links";

function randomFrom<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function sanitizeKeyword(value: string) {
  return value.replace(/[^a-zA-Z0-9]/g, "");
}

function toPascal(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function getGeneratorPath(slug: string) {
  return `/generators/${slug}`;
}

function getSeedWords(entry: GeneratorDirectoryEntry) {
  const titleWords = entry.title
    .replace(/Generator/gi, "")
    .split(/\s+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean);

  const exampleWords = entry.exampleNames
    .flatMap((example) => example.split(/(?=[A-Z])|[^a-zA-Z0-9]+/))
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter((word) => word.length > 2);

  const categoryWords = entry.category
    .split(/[^a-zA-Z0-9]+/)
    .map((word) => word.replace(/[^a-zA-Z0-9]/g, ""))
    .filter(Boolean);

  const uniqueWords = Array.from(new Set([...titleWords, ...exampleWords, ...categoryWords]));
  const prefixes = uniqueWords.slice(0, 10);
  const core = uniqueWords.slice(3, 18);
  const suffixes = uniqueWords.slice(6, 20);

  return {
    prefixes: prefixes.length > 0 ? prefixes : ["Nova", "Pixel", "Ghost", "Echo"],
    core: core.length > 0 ? core : ["Rider", "Knight", "Pulse", "Wolf"],
    suffixes: suffixes.length > 0 ? suffixes : ["Zone", "Byte", "Strike", "Wave"],
  };
}

function generateKeywordNames(entry: GeneratorDirectoryEntry, keyword: string, amount = 24) {
  const seeds = getSeedWords(entry);
  const safeKeyword = toPascal(sanitizeKeyword(keyword));
  const output = new Set<string>();
  let attempts = 0;
  const maxAttempts = amount * 120;

  while (output.size < amount && attempts < maxAttempts) {
    attempts += 1;
    const prefix = randomFrom(seeds.prefixes);
    const core = randomFrom(seeds.core);
    const suffix = randomFrom(seeds.suffixes);
    const token = safeKeyword && Math.random() > 0.45 ? safeKeyword : core;
    const includeNumber = Math.random() > 0.68;
    const number = Math.floor(10 + Math.random() * 90);

    const patterns = [
      `${prefix}${token}`,
      `${token}${suffix}`,
      `${prefix}${token}${suffix}`,
      `${prefix}${core}${includeNumber ? number : ""}`,
      `${token}${includeNumber ? number : ""}`,
    ];

    const candidate = randomFrom(patterns);
    if (candidate.length >= 6 && candidate.length <= 20) output.add(candidate);
  }

  while (output.size < amount) {
    output.add(`${randomFrom(seeds.prefixes)}${randomFrom(seeds.core)}${Math.floor(10 + Math.random() * 90)}`);
  }

  return Array.from(output);
}

function buildExampleGallery(entry: GeneratorDirectoryEntry) {
  return generateKeywordNames(entry, "", 50);
}

function getCategoryLabel(category: string) {
  if (category === "gaming") return "gaming profiles and multiplayer identities";
  if (category === "social") return "social handles and community usernames";
  if (category === "streaming") return "streaming brands and creator channels";
  if (category === "fantasy") return "RPG characters and fantasy-inspired aliases";
  if (category === "team") return "teams, clans, and group identities";
  if (category === "fandom") return "fan communities and themed usernames";
  if (category === "style") return "stylized personal branding";
  return "usernames and gamertags";
}

function buildSeoContent(entry: GeneratorDirectoryEntry) {
  const generatorName = entry.title;
  const categoryLabel = getCategoryLabel(entry.category);
  const examples = entry.exampleNames.slice(0, 3).join(", ");
  const keywordSeed = entry.exampleNames
    .flatMap((example) => example.split(/(?=[A-Z])|[^a-zA-Z0-9]+/))
    .filter((word) => word.length > 2)
    .slice(0, 5)
    .join(", ");
  const platformAngle = entry.slug.replace(/-generator$/i, "").replace(/-/g, " ");

  return [
    `${generatorName} is built for users who want name ideas tied to ${categoryLabel} rather than a generic batch of random handles. The page uses examples such as ${examples} to show the actual tone of the generator before you even click the button. That matters because someone searching for ${platformAngle} names usually wants output that already feels close to the platform, game, or style they care about.`,
    `The strongest names from this generator usually pull from themes such as ${keywordSeed}. Those words work because they already carry the mood the page is aiming for, so the results feel more believable in a profile, lobby, stream title, or community space. When comparing names, focus on whether the handle still sounds good out loud and whether it keeps its clarity when you imagine it outside the generator.`,
    `A good username should also stay useful after the first impression. If a name only looks interesting because it is unusual, it often becomes forgettable fast. Better results usually balance style with readability and make room for reuse across other channels later. This ${generatorName.toLowerCase()} page is designed to speed that up by combining a themed generator, example names, and related internal links in one workflow.`,
  ];
}

function buildGeneratorFaqs(entry: GeneratorDirectoryEntry) {
  const lowerTitle = entry.title.toLowerCase();
  return [
    {
      question: `What does the ${lowerTitle} do?`,
      answer: `The ${lowerTitle} creates themed name ideas based on the page topic, example naming patterns, and a small optional keyword input so users can get more targeted results than with a generic generator.`,
    },
    {
      question: `How do you choose better names from the ${lowerTitle}?`,
      answer:
        "Look for names that stay readable, fit the tone of the platform or game, and still sound natural when used outside the generator in a profile, lobby, or social handle.",
    },
    {
      question: `Why use a dedicated page instead of a general username generator?`,
      answer:
        "Dedicated generator pages keep the naming direction tighter, which usually produces examples and keyword combinations that feel more relevant to the exact search intent.",
    },
  ];
}

type KeywordLandingGeneratorProps = {
  page: GeneratorDirectoryEntry;
};

export function KeywordLandingGenerator({ page }: KeywordLandingGeneratorProps) {
  const [keyword, setKeyword] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const storageKey = useMemo(() => `namelaunchpad:landing:${page.slug}:favorites`, [page.slug]);
  const seoContent = useMemo(() => buildSeoContent(page), [page]);
  const exampleGallery = useMemo(() => buildExampleGallery(page), [page]);
  const internalLinkSections = useMemo(
    () =>
      getSmartInternalLinkSections({
        pageType: "generator",
        slug: page.slug,
        title: page.title,
        category: page.category,
        keywords: page.exampleNames,
      }),
    [page]
  );
  const faqItems = useMemo(() => buildGeneratorFaqs(page), [page]);

  useEffect(() => {
    setResults(generateKeywordNames(page, "", 24));
    const cached = window.localStorage.getItem(storageKey);
    if (!cached) return;
    try {
      const parsed = JSON.parse(cached) as string[];
      if (Array.isArray(parsed)) setFavorites(parsed.slice(0, 40));
    } catch {
      setFavorites([]);
    }
  }, [page, storageKey]);

  useEffect(() => {
    window.localStorage.setItem(storageKey, JSON.stringify(favorites));
  }, [favorites, storageKey]);

  const generate = () => {
    setIsGenerating(true);
    window.setTimeout(() => {
      const next = generateKeywordNames(page, keyword, 24);
      startTransition(() => {
        setResults(next);
      });
      trackGeneratorUsage(page.slug, next.length);
      trackGlobalGenerationEvent({ generatorSlug: page.slug, amount: next.length, usernames: next });
      setIsGenerating(false);
    }, 120);
  };

  const onCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(value);
      window.setTimeout(() => setCopied(null), 1200);
    } catch {
      setCopied(null);
    }
  };

  const onToggleFavorite = (value: string) => {
    setFavorites((current) =>
      current.includes(value) ? current.filter((item) => item !== value) : [value, ...current].slice(0, 40)
    );
  };

  return (
    <>
      <section className="generator-shell mx-auto w-full max-w-6xl animate-fadeUp px-4 py-10 md:px-6">
        <AdSlot slot="top-banner" className="mb-7" />

        <div className="grid gap-7 xl:grid-cols-[minmax(0,1fr)_300px]">
          <div className="space-y-7">
          <Card className="overflow-hidden p-0">
            <div className="bg-gradient-to-r from-cyan-500/20 via-blue-500/16 to-purple-500/16 p-6 md:p-8">
              <Breadcrumbs
                items={[
                  { label: "Home", href: "/" },
                  { label: "Generators", href: "/all-generators" },
                  { label: page.title },
                ]}
              />
              <h1 className="text-3xl font-black text-white md:text-4xl">{page.title}</h1>
              <p className="mt-3 max-w-3xl text-slate-200">{page.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {page.exampleNames.map((example) => (
                  <span
                    key={example}
                    className="rounded-full border border-cyan-300/35 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100"
                  >
                    {example}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="flex flex-col gap-3 md:flex-row">
                <input
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder={`Optional ${page.title.replace(/ Generator$/i, "")} keyword`}
                  className="w-full rounded-xl2 border border-white/15 bg-slate-900/65 px-4 py-3 text-slate-100 outline-none transition placeholder:text-slate-500 focus:border-cyan-300/70"
                />
                <Button onClick={generate} disabled={isGenerating} className="md:min-w-44">
                  {isGenerating ? "Generating..." : `Generate ${page.title.replace(/ Generator$/i, "")}`}
                </Button>
              </div>

              {isGenerating ? (
                <LoadingGrid count={8} />
              ) : (
                <>
                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {results.slice(0, 8).map((name) => (
                      <Card key={name} className="p-4">
                        <p className="break-words text-sm font-semibold text-slate-100">{name}</p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                            {copied === name ? "Copied" : "Copy"}
                          </Button>
                          <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onToggleFavorite(name)}>
                            {favorites.includes(name) ? "Favorited" : "Favorite"}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>

                  <AdSlot slot="between-results" className="mt-6" />

                  <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {results.slice(8).map((name) => (
                      <Card key={name} className="p-4">
                        <p className="break-words text-sm font-semibold text-slate-100">{name}</p>
                        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
                          <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                            {copied === name ? "Copied" : "Copy"}
                          </Button>
                          <Button variant="ghost" className="px-3 py-2 text-xs" onClick={() => onToggleFavorite(name)}>
                            {favorites.includes(name) ? "Favorited" : "Favorite"}
                          </Button>
                        </div>
                      </Card>
                    ))}
                  </div>
                </>
              )}
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-white md:text-3xl">What is a {page.title}?</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {seoContent.map((section, index) => (
                <div key={`${page.slug}-seo-${index}`}>
                  <h3 className="text-lg font-bold text-cyan-200">
                    {index === 0
                      ? `Why people use ${page.title}`
                      : index === 1
                        ? `How ${page.title.toLowerCase()} results are shaped`
                        : `Choosing better ${page.title.toLowerCase()} names`}
                  </h3>
                  <p className="mt-2 text-sm leading-7 text-slate-300">{section}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <h2 className="text-2xl font-black text-white md:text-3xl">Frequently Asked Questions</h2>
            <div className="mt-5 grid gap-5 md:grid-cols-3">
              {faqItems.map((item) => (
                <div key={item.question}>
                  <h3 className="text-lg font-bold text-white">{item.question}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.answer}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 md:p-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-black text-white md:text-3xl">Example Usernames Gallery</h2>
              <span className="text-xs uppercase tracking-wide text-slate-400">50 examples</span>
            </div>
            <p className="mt-2 text-sm leading-7 text-slate-300">
              Sample usernames generated for {page.title.toLowerCase()} searches. Use them for inspiration or copy one directly.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              {exampleGallery.map((name) => (
                <Card key={name} className="p-4">
                  <p className="break-words text-sm font-semibold text-slate-100">{name}</p>
                  <Button variant="ghost" className="mt-3 w-full px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                    {copied === name ? "Copied" : "Copy"}
                  </Button>
                </Card>
              ))}
            </div>
          </Card>

            <SmartInternalLinks sections={internalLinkSections} />
          </div>

          <div className="xl:sticky xl:top-24 xl:self-start">
            <AdSlot slot="sidebar" />
          </div>
        </div>
      </section>
      <RelatedGenerators currentSlug={page.slug} />
    </>
  );
}
