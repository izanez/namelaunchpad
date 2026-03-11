import Link from "next/link";
import { Card } from "@/components/ui/card";
import { generatorDatabase } from "@/lib/generators";

function getGeneratorHref(slug: string) {
  const directRoutes = new Set([
    "username-generator",
    "gamer-tag-generator",
    "fortnite-name-generator",
    "roblox-username-generator",
    "fantasy-name-generator",
    "clan-name-generator",
    "og-username-finder",
  ]);

  if (directRoutes.has(slug)) {
    return `/${slug}`;
  }

  return `/generators/${slug}`;
}

export function AllGeneratorsGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 py-12 md:px-6">
      <Card className="p-6 md:p-8">
        <h1 className="text-3xl font-black text-white md:text-4xl">All Generators</h1>
        <p className="mt-3 max-w-3xl text-sm leading-7 text-slate-300">
          Browse every available generator page on NameLaunchpad. Each page includes a generator tool, example usernames,
          SEO content, and internal links to related generators.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {generatorDatabase.map((generator) => (
            <Card key={generator.slug} className="p-5">
              <p className="text-xs uppercase tracking-wide text-cyan-300">{generator.category}</p>
              <h2 className="mt-2 text-lg font-semibold text-white">{generator.title}</h2>
              <p className="mt-2 text-sm text-slate-300">{generator.description}</p>
              <Link
                href={getGeneratorHref(generator.slug)}
                className="mt-4 inline-block text-sm font-semibold text-cyan-300 transition hover:text-cyan-200"
              >
                Open Generator
              </Link>
            </Card>
          ))}
        </div>
      </Card>
    </section>
  );
}
