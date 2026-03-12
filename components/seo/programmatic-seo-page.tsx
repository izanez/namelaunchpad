"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { SmartInternalLinks } from "@/components/seo/smart-internal-links";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { generateUsernames } from "@/lib/generators";
import type { ProgrammaticSeoPage } from "@/lib/programmatic-seo-pages";
import { getSmartInternalLinkSections } from "@/lib/smart-internal-links";

function buildUsernameList(page: ProgrammaticSeoPage) {
  const output = new Set<string>();
  let attempts = 0;

  while (output.size < page.usernameCount && attempts < 18) {
    const names = generateUsernames({
      keywords: page.keywords,
      style: page.style,
      amount: page.usernameCount,
      length: page.length.max,
      minLength: page.length.min,
      maxLength: page.length.max,
    });

    names.forEach((name) => output.add(name));
    attempts += 1;
  }

  return Array.from(output).slice(0, page.usernameCount);
}

export function ProgrammaticSeoPageView({ page }: { page: ProgrammaticSeoPage }) {
  const [toast, setToast] = useState<string | null>(null);
  const usernames = useMemo(() => buildUsernameList(page), [page]);
  const internalLinkSections = useMemo(
    () =>
      getSmartInternalLinkSections({
        pageType: "article",
        slug: page.slug,
        title: page.title,
        style: page.style,
        keywords: page.keywords,
      }),
    [page]
  );

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
          { label: page.title },
        ]}
      />

      <div className="grid gap-6">
        <Card className="overflow-hidden p-0">
          <div className="bg-gradient-to-r from-cyan-500/18 via-blue-500/14 to-purple-500/18 p-6 md:p-8">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-200">Programmatic SEO</p>
            <h1 className="mt-3 text-3xl font-black text-white md:text-4xl">{page.title}</h1>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">{page.intro}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                {usernames.length} usernames
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-300">
                {page.style} style
              </span>
            </div>
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-2xl font-black text-white">Username Ideas</h2>
              <p className="mt-2 text-sm text-slate-400">
                Copy username ideas instantly and use the related generator pages for more variations.
              </p>
            </div>
            <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
              {page.usernameCount} ideas
            </span>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {usernames.map((name) => (
              <div key={name} className="rounded-xl2 border border-white/10 bg-white/5 px-4 py-3">
                <p className="break-words text-sm font-semibold text-slate-100">{name}</p>
                <Button variant="ghost" className="mt-3 w-full px-3 py-2 text-xs" onClick={() => onCopy(name)}>
                  Copy Username
                </Button>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">Generator Links</h2>
          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {page.generatorLinks.map((link) => (
              <Card key={link.href} className="p-5">
                <h3 className="text-lg font-semibold text-white">{link.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{link.description}</p>
                <Link
                  href={link.href}
                  className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Open Page
                </Link>
              </Card>
            ))}
          </div>
        </Card>

        {page.comparisonSection ? (
          <Card className="p-6 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black text-white">{page.comparisonSection.title}</h2>
                <p className="mt-2 max-w-3xl text-sm text-slate-400">{page.comparisonSection.intro}</p>
              </div>
              <span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
                {page.comparisonSection.generators.length} compared
              </span>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {page.comparisonSection.generators.map((generator) => (
                <Card key={generator.href} className="p-5">
                  <h3 className="text-lg font-semibold text-white">{generator.title}</h3>
                  <p className="mt-2 text-sm text-slate-300">{generator.description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {generator.examples.map((example) => (
                      <span
                        key={`${generator.title}-${example}`}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-semibold text-slate-200"
                      >
                        {example}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={generator.href}
                    className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
                  >
                    Open Generator
                  </Link>
                </Card>
              ))}
            </div>
          </Card>
        ) : null}

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">SEO Text</h2>
          <div className="mt-5 grid gap-6">
            {page.content.map((section) => (
              <div key={section.heading}>
                <h3 className="text-xl font-bold text-white">{section.heading}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{section.body}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 md:p-8">
          <h2 className="text-2xl font-black text-white">Why This Page Helps</h2>
          <div className="mt-5 grid gap-5 md:grid-cols-3">
            <div>
              <h3 className="text-lg font-bold text-white">Relevant examples</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The username list is generated from the same topic keywords and style as the page itself, so the examples stay close to the actual search intent.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Generator depth</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                Related generator links let users move from a static inspiration page into a live tool where they can keep refining style, tone, and length.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">Better discovery</h3>
              <p className="mt-3 text-sm leading-7 text-slate-300">
                The internal links connect this topic to adjacent naming pages, which improves crawl depth and makes the site more useful for comparison searches.
              </p>
            </div>
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
