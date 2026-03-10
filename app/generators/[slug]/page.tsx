import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KeywordLandingGenerator } from "@/components/generator/keyword-landing-generator";
import { getGeneratorEntry, generatorSlugs } from "@/lib/generators";
import { JsonLd } from "@/components/seo/json-ld";
import { createGeneratorMetadata, createGeneratorSchema } from "@/lib/seo";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getGeneratorPath(slug: string) {
  return `/generators/${slug}`;
}

export async function generateStaticParams() {
  return generatorSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getGeneratorEntry(slug);
  if (!page) return {};

  return createGeneratorMetadata(page, getGeneratorPath(page.slug));
}

export default async function GeneratorLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getGeneratorEntry(slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: page.title,
          description: page.description,
          url: `https://gamertagforge.com${getGeneratorPath(page.slug)}`,
          category: "UtilitiesApplication",
        })}
      />
      <KeywordLandingGenerator page={page} />
    </>
  );
}
