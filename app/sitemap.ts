import type { MetadataRoute } from "next";
import { blogArticleSlugs } from "@/lib/blog-articles";
import { generatorCategories, generatorDatabase, generatorSlugs } from "@/lib/generators";
import { programmaticSeoSlugs } from "@/lib/programmatic-seo-pages";
import { usernameListingSlugs } from "@/lib/username-listing-pages";

const directGeneratorPageSlugs = new Set([
  "username-generator",
  "gamer-tag-generator",
  "fortnite-name-generator",
  "roblox-username-generator",
  "minecraft-name-generator",
  "twitch-username-generator",
  "valorant-name-generator",
  "fantasy-name-generator",
  "clan-name-generator",
  "anime-username-generator",
  "og-username-finder",
]);

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://www.namelaunchpad.com";
  const staticRoutes = [
    "",
    "/about",
    "/privacy-terms",
    "/top-usernames",
    "/top-generators",
    "/username-ideas",
    "/stats",
    "/search",
    "/all-generators",
    "/explore-generators",
    "/username-database",
    "/blog",
  ];

  const directGeneratorRoutes = generatorDatabase
    .map((entry) => `/${entry.slug}`)
    .filter((route) => directGeneratorPageSlugs.has(route.slice(1)));

  const generatorRoutes = generatorSlugs.map((slug) => `/generators/${slug}`);
  const categoryRoutes = generatorCategories.map((category) => `/category/${category.slug}`);
  const seoRoutes = programmaticSeoSlugs.map((slug) => `/${slug}`);
  const usernameListingRoutes = usernameListingSlugs.map((slug) => `/${slug}`);
  const blogRoutes = blogArticleSlugs.map((slug) => `/blog/${slug}`);
  const allRoutes = Array.from(
    new Set([
      ...staticRoutes,
      ...directGeneratorRoutes,
      ...generatorRoutes,
      ...categoryRoutes,
      ...seoRoutes,
      ...usernameListingRoutes,
      ...blogRoutes,
    ])
  );

  return allRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
