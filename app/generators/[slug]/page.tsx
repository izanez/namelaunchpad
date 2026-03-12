import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KeywordLandingGenerator } from "@/components/generator/keyword-landing-generator";
import { getGeneratorEntry, generatorSlugs } from "@/lib/generators";
import { JsonLd } from "@/components/seo/json-ld";
import { createBreadcrumbSchema, createFaqSchema, createGeneratorMetadata, createGeneratorSchema } from "@/lib/seo";
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
      <JsonLd
        data={createFaqSchema([
          {
            question: `What is the ${page.title.toLowerCase()} for?`,
            answer:
              "This page is built for users who want names that match a narrower topic than a general username generator, with example names, themed output, and related internal links.",
          },
          {
            question: `How do you get better results from the ${page.title.toLowerCase()}?`,
            answer:
              "Use a keyword that already fits the platform, game, or naming theme and compare whether the result still feels readable and reusable in a real profile or handle.",
          },
        ])}
      />
      <KeywordLandingGenerator page={page} />
    </>
  );
}


