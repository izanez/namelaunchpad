import type { Metadata } from "next";
import { UsernameEngine } from "@/components/generator/username-engine";
import { SeoContent } from "@/components/seo/seo-content";
import { JsonLd } from "@/components/seo/json-ld";
import { createGeneratorSchema } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Username Generator - Cool Usernames for Gaming and Social Media",
  description: "Generate unique usernames for gaming, streaming, TikTok, Twitch, Discord, and social media.",
  keywords: ["username generator", "cool usernames", "gaming usernames", "social media usernames"],
  openGraph: {
    title: "Username Generator - Cool Usernames for Gaming and Social Media",
    description: "Generate unique usernames for gaming, streaming, Twitch, TikTok, Discord, and more.",
    type: "website",
  },
  alternates: {
    canonical: "/username-generator",
  },
};

export default function UsernameGenerator() {
  return (
    <>
      <JsonLd
        data={createGeneratorSchema({
          title: "Username Generator",
          description: "Generate cool usernames for gaming, streaming, and social media profiles.",
          url: "https://gamertagforge.com/username-generator",
          category: "UtilitiesApplication",
        })}
      />
      <UsernameEngine />
      <SeoContent
        title="Username Generator Ideas and Tips"
        intro="GamertagForge helps users generate memorable usernames with different styles, availability signals, and share tools. This page is designed for gamers, streamers, creators, and anyone who needs a clean, readable username."
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
          { href: "/gamer-tag-generator", label: "Gamer Tag Generator" },
          { href: "/fortnite-name-generator", label: "Fortnite Name Generator" },
          { href: "/roblox-username-generator", label: "Roblox Username Generator" },
          { href: "/discord-name-generator", label: "Discord Name Generator" },
        ]}
      />
    </>
  );
}
