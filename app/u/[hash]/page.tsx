import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Card } from "@/components/ui/card";
import { ShareOutputClient } from "@/components/share/share-output-client";
import { parseShareHash } from "@/lib/share-output";
import { createSeoMetadata } from "@/lib/seo";
import { absoluteUrl } from "@/app/metadata";

type PageProps = {
  params: Promise<{
    hash: string;
  }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { hash } = await params;
  const payload = parseShareHash(hash);
  if (!payload) {
    return createSeoMetadata({
      title: "Shared Username List",
      description: "Shared username output from NameLaunchpad.",
      path: `/u/${hash}`,
      keywords: ["username list", "shared usernames"],
    });
  }

  const top = payload.n.slice(0, 3).join(", ");

  return createSeoMetadata({
    title: `Shared Username List - ${top}`,
    description: `Explore this shared username output: ${top}.`,
    path: `/u/${hash}`,
    keywords: ["shared username list", "username ideas", payload.s ?? "username generator"],
  });
}

export default async function SharedOutputPage({ params }: PageProps) {
  const { hash } = await params;
  const payload = parseShareHash(hash);
  if (!payload) notFound();

  const createdAt = new Date(payload.t);

  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <p className="text-xs uppercase tracking-wide text-cyan-300">Shared output</p>
        <h1 className="mt-2 text-3xl font-black text-white md:text-4xl">Top Username Picks</h1>
        <p className="mt-3 text-sm text-slate-300">
          Generated on {createdAt.toLocaleDateString("en-US")} {payload.s ? `• style: ${payload.s}` : ""}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          {payload.c ? `Category: ${payload.c.replace(/-/g, " ")}` : "General list"} {payload.k?.length ? `• Keywords: ${payload.k.join(", ")}` : ""}
        </p>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {payload.n.map((name, index) => (
          <Card key={`${name}-${index}`} className="p-4">
            <p className="text-xs uppercase tracking-wide text-cyan-300">#{index + 1}</p>
            <p className="mt-2 text-lg font-bold text-white">{name}</p>
          </Card>
        ))}
      </div>

      <ShareOutputClient payload={payload} />

      <Card className="mt-6 p-5">
        <h2 className="text-xl font-bold text-white">Next actions</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link href="/username-generator#generator" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            Generate new names {"->"}
          </Link>
          <Link href="/community" className="text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            View community picks {"->"}
          </Link>
          <a
            href={`${absoluteUrl(`/u/${hash}`)}`}
            target="_blank"
            rel="noreferrer"
            className="text-sm font-semibold text-cyan-300 hover:text-cyan-200"
          >
            Open canonical share link {"->"}
          </a>
        </div>
      </Card>
    </section>
  );
}
