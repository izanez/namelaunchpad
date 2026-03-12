import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { KeywordLandingGenerator } from "@/components/generator/keyword-landing-generator";
import { JsonLd } from "@/components/seo/json-ld";
import { ProgrammaticSeoPageView } from "@/components/seo/programmatic-seo-page";
import { UsernameListingPageView } from "@/components/seo/username-listing-page";
import { absoluteUrl } from "@/app/metadata";
import { createArticleSchema, createBreadcrumbSchema, createFaqSchema, createGeneratorSchema, createSeoMetadata } from "@/lib/seo";
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
    return createSeoMetadata({
      title: usernameListingPage.seoTitle,
      description: usernameListingPage.metaDescription,
      path: `/${usernameListingPage.slug}`,
      keywords: [
        usernameListingPage.slug.replace(/-/g, " "),
        usernameListingPage.title.toLowerCase(),
        "username list",
        "username database",
        "NameLaunchpad",
      ],
    });
  }

  if (seoPage) {
    return createSeoMetadata({
      title: seoPage.seoTitle,
      description: seoPage.metaDescription,
      path: `/${seoPage.slug}`,
      keywords: [
        slug.replace(/-/g, " "),
        seoPage.title.toLowerCase(),
        "username ideas",
        "gamer tags",
        "NameLaunchpad",
      ],
      type: "article",
    });
  }

  if (!page) return {};

  return createSeoMetadata({
    title: page.seoTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
    keywords: [
      `${page.platform.toLowerCase()} name generator`,
      `${page.platform.toLowerCase()} username generator`,
      `${page.platform.toLowerCase()} gamertags`,
      "username generator",
    ],
  });
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
        <JsonLd
          data={createFaqSchema([
            {
              question: `What are ${usernameListingPage.title.toLowerCase()} best for?`,
              answer:
                "These pages help users narrow the larger username database down to a more useful pattern such as length, rarity, starting letter, category, or style.",
            },
            {
              question: `How should you use ${usernameListingPage.title.toLowerCase()}?`,
              answer:
                "Use the filtered list to spot patterns you actually like, then use the generator widget and related pages to expand that direction instead of restarting from generic name ideas.",
            },
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
        <JsonLd
          data={createArticleSchema({
            title: seoPage.title,
            description: seoPage.metaDescription,
            path: `/${seoPage.slug}`,
            keywords: seoPage.keywords,
            section: "SEO Guides",
          })}
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


