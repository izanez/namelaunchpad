import Link from "next/link";
import { Card } from "@/components/ui/card";
import { getRelatedGenerators } from "@/lib/generators";

const directGeneratorRoutes = new Set([
  "username-generator",
  "gamer-tag-generator",
  "fortnite-name-generator",
  "roblox-username-generator",
  "fantasy-name-generator",
  "clan-name-generator",
  "og-username-finder",
]);

function getGeneratorHref(slug: string) {
  if (directGeneratorRoutes.has(slug)) {
    return `/${slug}`;
  }

  return `/generators/${slug}`;
}

type RelatedGeneratorsProps = {
  currentSlug: string;
};

export function RelatedGenerators({ currentSlug }: RelatedGeneratorsProps) {
  const generators = getRelatedGenerators(currentSlug, 5);

  if (generators.length === 0) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-10 md:px-6">
      <Card className="p-6 md:p-8">
        <h2 className="text-2xl font-black text-white md:text-3xl">Related Generators</h2>
        <p className="mt-2 text-sm leading-7 text-slate-300">
          Explore more generator pages that match similar naming styles, platforms, games, and search intent.
        </p>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {generators.map((generator) => (
            <Link
              key={generator.slug}
              href={getGeneratorHref(generator.slug)}
              className="rounded-xl2 border border-white/15 bg-white/5 px-4 py-4 text-sm font-semibold text-slate-100 transition hover:border-cyan-300/70 hover:bg-cyan-300/10 hover:text-cyan-200"
            >
              {generator.title}
            </Link>
          ))}
        </div>
      </Card>
    </section>
  );
}
