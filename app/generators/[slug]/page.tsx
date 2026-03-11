import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KeywordLandingGenerator } from "@/components/generator/keyword-landing-generator";
import { getGeneratorEntry, generatorSlugs } from "@/lib/generators";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createGeneratorMetadata, createGeneratorSchema } from "@/lib/seo";
import { absoluteUrl } from "@/app/metadata";

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
          url: absoluteUrl(getGeneratorPath(page.slug)),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Generators", path: getGeneratorPath(page.slug) },
          { name: page.title, path: getGeneratorPath(page.slug) },
        ])}
      />
      <KeywordLandingGenerator page={page} />
    </>
  );
}


