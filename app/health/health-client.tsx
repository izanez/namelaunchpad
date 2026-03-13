"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type CheckStatus = "ok" | "error" | "checking";

type HealthCheck = {
  label: string;
  path: string;
  expectedStatuses: number[];
  status: CheckStatus;
  httpStatus?: number;
  note?: string;
};

const initialChecks: HealthCheck[] = [
  { label: "Manifest", path: "/manifest.webmanifest", expectedStatuses: [200], status: "checking" },
  { label: "Robots", path: "/robots.txt", expectedStatuses: [200], status: "checking" },
  { label: "Sitemap", path: "/sitemap.xml", expectedStatuses: [200], status: "checking" },
  { label: "Ads.txt", path: "/ads.txt", expectedStatuses: [200], status: "checking" },
  { label: "Icon 192", path: "/icon-192.png", expectedStatuses: [200], status: "checking" },
  { label: "Icon 512", path: "/icon-512.png", expectedStatuses: [200], status: "checking" },
  { label: "Apple Icon", path: "/apple-icon.png", expectedStatuses: [200], status: "checking" },
  { label: "AdSense Script", path: "/", expectedStatuses: [200], status: "checking" },
];

function statusPill(status: CheckStatus) {
  if (status === "ok") return "border-emerald-300/30 bg-emerald-400/15 text-emerald-100";
  if (status === "error") return "border-rose-300/30 bg-rose-500/15 text-rose-100";
  return "border-amber-300/30 bg-amber-400/15 text-amber-100";
}

export function HealthClient() {
  const [checks, setChecks] = useState<HealthCheck[]>(initialChecks);

  useEffect(() => {
    let active = true;

    async function run() {
      const results = await Promise.all(
        initialChecks.map(async (check) => {
          if (check.label === "AdSense Script") {
            try {
              const response = await fetch(check.path, { cache: "no-store" });
              const html = await response.text();
              const hasScript = html.includes("pagead2.googlesyndication.com/pagead/js/adsbygoogle.js");
              return {
                ...check,
                status: hasScript ? ("ok" as const) : ("error" as const),
                httpStatus: response.status,
                note: hasScript ? "AdSense script found in page source." : "AdSense script missing from page source.",
              };
            } catch {
              return { ...check, status: "error" as const, note: "Request failed." };
            }
          }

          try {
            const response = await fetch(check.path, { cache: "no-store" });
            const ok = check.expectedStatuses.includes(response.status);
            return {
              ...check,
              status: ok ? ("ok" as const) : ("error" as const),
              httpStatus: response.status,
              note: ok ? "OK" : `Expected ${check.expectedStatuses.join(", ")}`,
            };
          } catch {
            return { ...check, status: "error" as const, note: "Request failed." };
          }
        })
      );

      if (active) setChecks(results);
    }

    void run();

    return () => {
      active = false;
    };
  }, []);

  const failed = checks.filter((entry) => entry.status === "error").length;
  const passed = checks.filter((entry) => entry.status === "ok").length;

  return (
    <section className="mx-auto w-full max-w-5xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <h1 className="text-3xl font-black text-white md:text-4xl">Site Health</h1>
        <p className="mt-3 text-sm text-slate-300">
          Quick operational checks for ads.txt, icons, manifest, robots, sitemap, and AdSense tag presence.
        </p>
        <div className="mt-5 flex flex-wrap gap-3 text-xs">
          <span className="rounded-full border border-emerald-300/30 bg-emerald-400/15 px-3 py-1 text-emerald-100">
            Passed: {passed}
          </span>
          <span className="rounded-full border border-rose-300/30 bg-rose-500/15 px-3 py-1 text-rose-100">
            Failed: {failed}
          </span>
          <Link href="/">
            <Button variant="ghost" className="px-3 py-1.5 text-xs">
              Back to Home
            </Button>
          </Link>
        </div>
      </Card>

      <div className="mt-6 grid gap-3">
        {checks.map((check) => (
          <Card key={check.label} className="p-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-sm font-semibold text-white">{check.label}</p>
                <p className="mt-1 text-xs text-slate-400">{check.path}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase ${statusPill(check.status)}`}>
                  {check.status}
                </span>
                <span className="text-xs text-slate-300">{typeof check.httpStatus === "number" ? check.httpStatus : "-"}</span>
              </div>
            </div>
            <p className="mt-2 text-xs text-slate-400">{check.note ?? "Running..."}</p>
          </Card>
        ))}
      </div>
    </section>
  );
}
