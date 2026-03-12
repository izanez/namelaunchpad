"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SmartInternalLinks } from "@/components/seo/smart-internal-links";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateUsernames, type UsernameStyle } from "@/lib/generators";
import { getSmartInternalLinkSections } from "@/lib/smart-internal-links";
import type { UsernameRecord } from "@/lib/username-database";
import type { UsernameListingPage } from "@/lib/username-listing-pages";

type UsernameListingPageViewProps = {
  page: UsernameListingPage;
  usernames: UsernameRecord[];
  seoContent: string;
};

function splitContent(content: string) {
  const sentences = content.split(". ");
  const chunkSize = Math.ceil(sentences.length / 3);
  return [0, 1, 2]
    .map((index) => sentences.slice(index * chunkSize, (index + 1) * chunkSize).join(". ").trim())
    .filter(Boolean)
    .map((chunk) => (chunk.endsWith(".") ? chunk : `${chunk}.`));
}

export function UsernameListingPageView({ page, usernames, seoContent }: UsernameListingPageViewProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [generated, setGenerated] = useState<string[]>([]);
  const seoSections = useMemo(() => splitContent(seoContent), [seoContent]);
  const internalLinkSections = useMemo(
    () =>
      getSmartInternalLinkSections({
        pageType: "listing",
        slug: page.slug,
        title: page.title,
        style: page.generator.style,
        keywords: page.generator.keywords,
      }),
    [page]
  );

  const onCopy = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setToast("Username copied.");
      window.setTimeout(() => setToast(null), 1600);
    } catch {
      setToast(null);
    }
  };

  const onGenerate = () => {
    const next = generateUsernames({
      keywords: page.generator.keywords,
      style: page.generator.style as UsernameStyle,
      amount: 16,
      length: page.generator.maxLength,
      minLength: page.generator.minLength,
      maxLength: page.generator.maxLength,
    });
    setGenerated(next);
  };

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: page.title }]} />

      <div className="grid gap-6">
        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Username Listings</p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">{page.h1}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{page.intro}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                {usernames.length} usernames listed
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                style: {page.generator.style}
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-white">Filtered Username List</h2>
              <p className="mt-2 text-sm text-slate-400">Browse filtered results from the NameLaunchpad username database and copy any result instantly.</p>
            </div>
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
              Database source
            </span>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {usernames.map((item) => (
              <Card key={item.slug} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{item.name}</p>
                    <p className="mt-1 text-[11px] text-slate-500">{item.category} | {item.style}</p>
                  </div>
                  <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-2 py-0.5 text-[11px] font-semibold text-cyan-100">
                    {item.length}
                  </span>
                </div>
                <Button variant="ghost" className="mt-3 w-full px-3 py-2 text-xs" onClick={() => void onCopy(item.name)}>
                  Copy Username
                </Button>
              </Card>
            ))}
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-2xl font-black text-white">Generator Widget</h2>
              <p className="mt-2 text-sm text-slate-400">Generate more names with the same direction used for this page.</p>
            </div>
            <Button onClick={onGenerate}>Generate More Names</Button>
          </div>
          {generated.length > 0 ? (
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {generated.map((name) => (
                <Card key={name} className="p-4">
                  <p className="text-sm font-semibold text-slate-100">{name}</p>
                  <Button variant="ghost" className="mt-3 w-full px-3 py-2 text-xs" onClick={() => void onCopy(name)}>
                    Copy Username
                  </Button>
                </Card>
              ))}
            </div>
          ) : null}
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">SEO Content</h2>
          <div className="mt-5 grid gap-4">
            {seoSections.map((section, index) => (
              <div key={`${page.slug}-section-${index}`}>
                <h3 className="text-lg font-bold text-white">{index === 0 ? `What are ${page.title}?` : index === 1 ? `How to choose ${page.title.toLowerCase()}` : `Why ${page.title.toLowerCase()} work well`}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{section}</p>
              </div>
            ))}
          </div>
        </Card>

        <SmartInternalLinks sections={internalLinkSections} />
      </div>

      {toast ? (
        <div className="pointer-events-none fixed bottom-5 right-5 z-50 animate-fadeUp rounded-xl2 border border-cyan-300/35 bg-slate-950/90 px-4 py-3 text-sm font-medium text-cyan-100 shadow-neon backdrop-blur-xl">
          {toast}
        </div>
      ) : null}
    </section>
  );
}
