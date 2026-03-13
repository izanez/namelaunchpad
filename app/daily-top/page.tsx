import type { Metadata } from "next";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { DailyTopClient } from "@/components/daily/daily-top-client";
import { getDailyTopNames } from "@/lib/daily-top-names";
import { getIntentNextPages } from "@/lib/intent-navigation";
import { createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Daily Top 25 Usernames",
  description: "Daily shareable list of top 25 username ideas with export options for social posting.",
  path: "/daily-top",
  keywords: ["daily username ideas", "top usernames today", "shareable username list"],
});

export default function DailyTopPage() {
  const daily = getDailyTopNames();
  const nextPages = getIntentNextPages(["daily", "share", "username", "top"], "/daily-top", 6);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wide text-cyan-300">Daily List</p>
        <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">Daily Top 25 Names</h1>
        <p className="mt-3 text-sm text-slate-300">
          Date: {daily.dateLabel}. Zero-click list for instant picks and creator sharing.
        </p>
      </Card>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {daily.names.map((name, index) => (
          <Card key={`${name}-${index}`} className="p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
            <p className="mt-2 text-base font-bold text-white">{name}</p>
          </Card>
        ))}
      </div>

      <DailyTopClient names={daily.names} slugDate={daily.slugDate} />

      <Card className="mt-6 p-6">
        <h2 className="text-xl font-bold text-white">Next Best Pages</h2>
        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {nextPages.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-cyan-200 transition hover:border-cyan-300/45 hover:text-cyan-100"
            >
              {item.title}
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
