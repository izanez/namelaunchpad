import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KeywordLandingGenerator } from "@/components/generator/keyword-landing-generator";
import { JsonLd } from "@/components/seo/json-ld";
import { createGeneratorSchema } from "@/lib/seo";
import { getKeywordLandingPage, landingPageSlugs } from "@/lib/keyword-landing-pages";
import type { GeneratorDirectoryEntry } from "@/lib/generators";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return landingPageSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getKeywordLandingPage(slug);
  if (!page) return {};

  return {
    title: page.seoTitle,
    description: page.metaDescription,
    keywords: [
      `${page.platform.toLowerCase()} name generator`,
      `${page.platform.toLowerCase()} username generator`,
      `${page.platform.toLowerCase()} gamertags`,
      "username generator",
    ],
    openGraph: {
      title: page.seoTitle,
      description: page.metaDescription,
      type: "website",
    },
    alternates: {
      canonical: `/${page.slug}`,
    },
  };
}

export default async function KeywordLandingPage({ params }: PageProps) {
  const { slug } = await params;
  const page = getKeywordLandingPage(slug);
  if (!page) notFound();

  const generatorPage: GeneratorDirectoryEntry = {
    slug: page.slug,
    title: page.pageTitle,
    description: page.metaDescription,
    exampleNames: page.examples,
    category: page.platform.toLowerCase(),
  };

  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: page.pageTitle,
          description: page.metaDescription,
          url: `https://gamertagforge.com/${page.slug}`,
          category: "UtilitiesApplication",
        })}
      />
      <KeywordLandingGenerator page={generatorPage} />
    </>
  );
}
