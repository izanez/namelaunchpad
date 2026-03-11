import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KeywordLandingGenerator } from "@/components/generator/keyword-landing-generator";
import { JsonLd } from "@/components/seo/json-ld";
import { ProgrammaticSeoPageView } from "@/components/seo/programmatic-seo-page";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";
import { getKeywordLandingPage, landingPageSlugs } from "@/lib/keyword-landing-pages";
import { getProgrammaticSeoPage, programmaticSeoSlugs } from "@/lib/programmatic-seo-pages";
import type { GeneratorDirectoryEntry } from "@/lib/generators";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return [...landingPageSlugs, ...programmaticSeoSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getKeywordLandingPage(slug);
  const seoPage = getProgrammaticSeoPage(slug);
  if (!page && !seoPage) return {};

  if (seoPage) {
    return {
      title: seoPage.seoTitle,
      description: seoPage.metaDescription,
      keywords: [
        slug.replace(/-/g, " "),
        seoPage.title.toLowerCase(),
        "username ideas",
        "gamer tags",
        "NameLaunchpad",
      ],
      openGraph: {
        title: seoPage.seoTitle,
        description: seoPage.metaDescription,
        type: "website",
      },
      alternates: {
        canonical: `/${seoPage.slug}`,
      },
    };
  }

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
  const seoPage = getProgrammaticSeoPage(slug);
  if (!page && !seoPage) notFound();

  if (seoPage) {
    return (
      <>
        <JsonLd
          data={createGeneratorSchema({
            title: seoPage.title,
            description: seoPage.metaDescription,
            url: absoluteUrl(`/${seoPage.slug}`),
            category: "UtilitiesApplication",
          })}
        />
        <JsonLd
          data={createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: seoPage.title, path: `/${seoPage.slug}` },
          ])}
        />
        <ProgrammaticSeoPageView page={seoPage} />
      </>
    );
  }

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
          url: absoluteUrl(`/${page.slug}`),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: page.pageTitle, path: `/${page.slug}` },
        ])}
      />
      <KeywordLandingGenerator page={generatorPage} />
    </>
  );
}


