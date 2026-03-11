import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KeywordLandingGenerator } from "@/components/generator/keyword-landing-generator";
import { JsonLd } from "@/components/seo/json-ld";
import { ProgrammaticSeoPageView } from "@/components/seo/programmatic-seo-page";
import { UsernameListingPageView } from "@/components/seo/username-listing-page";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createGeneratorSchema } from "@/lib/seo";
import { getKeywordLandingPage, landingPageSlugs } from "@/lib/keyword-landing-pages";
import { getProgrammaticSeoPage, programmaticSeoSlugs } from "@/lib/programmatic-seo-pages";
import {
  buildUsernameListingSeoContent,
  getUsernameListingPage,
  getUsernameListingRecords,
  usernameListingSlugs,
} from "@/lib/username-listing-pages";
import type { GeneratorDirectoryEntry } from "@/lib/generators";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateStaticParams() {
  return [...landingPageSlugs, ...programmaticSeoSlugs, ...usernameListingSlugs].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getKeywordLandingPage(slug);
  const seoPage = getProgrammaticSeoPage(slug);
  const usernameListingPage = getUsernameListingPage(slug);
  if (!page && !seoPage && !usernameListingPage) return {};

  if (usernameListingPage) {
    return {
      title: usernameListingPage.seoTitle,
      description: usernameListingPage.metaDescription,
      keywords: [
        usernameListingPage.slug.replace(/-/g, " "),
        usernameListingPage.title.toLowerCase(),
        "username list",
        "username database",
        "NameLaunchpad",
      ],
      openGraph: {
        title: usernameListingPage.seoTitle,
        description: usernameListingPage.metaDescription,
        type: "website",
        url: absoluteUrl(`/${usernameListingPage.slug}`),
      },
      alternates: {
        canonical: `/${usernameListingPage.slug}`,
      },
    };
  }

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
  const usernameListingPage = getUsernameListingPage(slug);
  if (!page && !seoPage && !usernameListingPage) notFound();

  if (usernameListingPage) {
    const usernames = getUsernameListingRecords(usernameListingPage, 120);
    const seoContent = buildUsernameListingSeoContent(usernameListingPage);

    return (
      <>
        <JsonLd
          data={createGeneratorSchema({
            title: usernameListingPage.title,
            description: usernameListingPage.metaDescription,
            url: absoluteUrl(`/${usernameListingPage.slug}`),
            category: "UtilitiesApplication",
          })}
        />
        <JsonLd
          data={createBreadcrumbSchema([
            { name: "Home", path: "/" },
            { name: usernameListingPage.title, path: `/${usernameListingPage.slug}` },
          ])}
        />
        <UsernameListingPageView page={usernameListingPage} usernames={usernames} seoContent={seoContent} />
      </>
    );
  }

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


