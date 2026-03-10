import type { MetadataRoute } from "next";
import { generatorCategories, generatorSlugs } from "@/lib/generators";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://gamertagforge.com";
  const staticRoutes = [
    "",
    "/gamer-tag-generator",
    "/username-generator",
    "/roblox-username-generator",
    "/fortnite-name-generator",
    "/minecraft-name-generator",
    "/twitch-username-generator",
    "/valorant-name-generator",
    "/discord-name-generator",
    "/fantasy-name-generator",
    "/clan-name-generator",
    "/about",
    "/privacy-terms",
  ];

  const generatorRoutes = generatorSlugs.map((slug) => `/generators/${slug}`);
  const categoryRoutes = generatorCategories.map((category) => `/category/${category.slug}`);
  const allRoutes = Array.from(new Set([...staticRoutes, ...generatorRoutes, ...categoryRoutes]));

  return allRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: route === "" ? 1 : 0.8,
  }));
}
