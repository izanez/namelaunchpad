import type { Metadata } from "next";
import { Suspense } from "react";
import { UsernameEngine } from "@/components/generator/username-engine";
import { RelatedGenerators } from "@/components/seo/related-generators";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { absoluteUrl } from "@/app/metadata";
import { createBreadcrumbSchema, createFaqSchema, createGeneratorSchema, createSeoMetadata } from "@/lib/seo";

export const metadata: Metadata = createSeoMetadata({
  title: "Username Generator - Cool Usernames for Gaming and Social Media",
  description:
    "Generate unique usernames for gaming, streaming, TikTok, Twitch, Discord, YouTube, and social media with filters for style, length, and category.",
  path: "/username-generator",
  keywords: ["username generator", "cool usernames", "gaming usernames", "social media usernames", "streamer usernames"],
});

export default function UsernameGenerator() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Username Generator",
          description: "Generate cool usernames for gaming, streaming, and social media profiles.",
          url: absoluteUrl("/username-generator"),
          category: "UtilitiesApplication",
        })}
      />
      <JsonLd
        data={createBreadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Username Generator", path: "/username-generator" },
        ])}
      />
      <JsonLd
        data={createFaqSchema([
          {
            question: "How does the NameLaunchpad username generator work?",
            answer:
              "The username generator combines style, category, keyword, and length filters so users can create names that match gaming, streaming, and social media use cases more closely.",
          },
          {
            question: "What makes a good username for gaming and social media?",
            answer:
              "The strongest usernames are readable, memorable, and flexible across platforms. They should still look natural in a profile, stream title, Discord member list, or social handle.",
          },
        ])}
      />
      <Suspense fallback={null}>
        <UsernameEngine generatorKey="username-generator" breadcrumbTitle="Username Generator" />
      </Suspense>
      <SeoContent
        title="Username Generator Ideas and Tips"
        intro="NameLaunchpad helps users generate memorable usernames with different styles, availability signals, and share tools. This page is designed for gamers, streamers, creators, and anyone who needs a clean, readable username."
        sections={[
          {
            heading: "Why Use a Username Generator",
            body: "A good username should be short, recognizable, and flexible across platforms. Using a generator helps you explore combinations that are easier to remember and more likely to fit gaming, creator, and social profiles.",
          },
          {
            heading: "Best Username Styles",
            body: "Cool, dark, aesthetic, hacker, fantasy, and streamer styles give different brand signals. Try a few keyword combinations and compare the tone before picking a final identity for your profile.",
          },
        ]}
        internalLinks={[
          { href: "/gamer-tag-generator", label: "NameLaunchpad" },
          { href: "/fortnite-name-generator", label: "Fortnite Name Generator" },
          { href: "/roblox-username-generator", label: "Roblox Username Generator" },
          { href: "/discord-name-generator", label: "Discord Name Generator" },
        ]}
        faqItems={[
          {
            question: "Should a username be short or descriptive?",
            answer:
              "Short usernames are easier to remember, but descriptive usernames can be stronger when they fit your game, creator style, or audience more clearly.",
          },
          {
            question: "Can one username work across multiple platforms?",
            answer:
              "Yes. A strong cross-platform username usually avoids narrow references and keeps enough clarity to work on Twitch, Discord, TikTok, YouTube, and gaming profiles.",
          },
        ]}
      />
      <RelatedGenerators currentSlug="username-generator" />
    </>
  );
}


