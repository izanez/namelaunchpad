import { absoluteUrl } from "@/app/metadata";
import { blogArticleSlugs } from "@/lib/blog-articles";
import { blogCategorySlugs } from "@/lib/blog-hub";
import { generatorCategories, generatorDatabase, generatorSlugs } from "@/lib/generators";
import { programmaticSeoSlugs } from "@/lib/programmatic-seo-pages";
import { usernameListingSlugs } from "@/lib/username-listing-pages";
import type { UsernameDatabaseCategory, UsernameDatabaseStyle, UsernameLengthBucket, UsernameRarity } from "@/lib/username-database";

export type SitemapEntry = {
  url: string;
  lastModified?: string;
  changeFrequency?: "daily" | "weekly" | "monthly";
  priority?: number;
};

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

const databaseCategories: UsernameDatabaseCategory[] = ["gaming", "social", "fantasy", "anime", "short", "rare", "clan", "duo", "edgy", "cute"];
const databaseStyles: UsernameDatabaseStyle[] = ["cool", "aesthetic", "dark", "funny", "fantasy", "hacker", "anime", "streamer"];
const databaseRarities: UsernameRarity[] = ["common", "rare", "epic", "legendary"];
const databaseLengths: UsernameLengthBucket[] = ["short", "medium", "long"];
const now = new Date().toISOString();

function makeEntries(paths: string[], changeFrequency: SitemapEntry["changeFrequency"], priority: number) {
  return paths.map((path) => ({
    url: absoluteUrl(path),
    lastModified: now,
    changeFrequency,
    priority,
  }));
}

export function getCoreSitemapEntries(): SitemapEntry[] {
  return makeEntries([
    "/",
    "/about",
    "/privacy-terms",
    "/search",
    "/stats",
    "/top-usernames",
    "/top-generators",
    "/username-ideas",
    "/all-generators",
    "/explore-generators",
    "/username-database",
    "/blog",
    "/guides",
    "/articles",
  ], "weekly", 0.8);
}

export function getGeneratorSitemapEntries(): SitemapEntry[] {
  const directRoutes = generatorDatabase
    .map((entry) => `/${entry.slug}`)
    .filter((route) => directGeneratorPageSlugs.has(route.slice(1)));

  const dynamicRoutes = generatorSlugs.map((slug) => `/generators/${slug}`);
  return makeEntries([...directRoutes, ...dynamicRoutes], "weekly", 0.8);
}

export function getArticleSitemapEntries(): SitemapEntry[] {
  return makeEntries([
    ...blogArticleSlugs.map((slug) => `/blog/${slug}`),
    ...programmaticSeoSlugs.map((slug) => `/${slug}`),
  ], "weekly", 0.75);
}

export function getUsernameSitemapEntries(): SitemapEntry[] {
  return makeEntries(usernameListingSlugs.map((slug) => `/${slug}`), "weekly", 0.75);
}

export function getCategorySitemapEntries(): SitemapEntry[] {
  return makeEntries([
    ...generatorCategories.map((category) => `/category/${category.slug}`),
    ...blogCategorySlugs.map((slug) => `/categories/${slug}`),
  ], "weekly", 0.7);
}

export function getDatabaseSitemapEntries(): SitemapEntry[] {
  const queryPaths = [
    ...databaseCategories.map((category) => `/username-database?categories=${category}`),
    ...databaseStyles.map((style) => `/username-database?styles=${style}`),
    ...databaseRarities.map((rarity) => `/username-database?rarities=${rarity}`),
    ...databaseLengths.map((length) => `/username-database?lengths=${length}`),
    "/username-database?categories=anime&styles=anime",
    "/username-database?categories=rare&rarities=legendary",
    "/username-database?categories=short&lengths=short",
    "/username-database?categories=gaming&styles=cool",
    "/username-database?categories=social&styles=streamer",
  ];

  return makeEntries(queryPaths, "weekly", 0.65);
}

export function getSitemapIndexEntries() {
  return [
    absoluteUrl("/sitemap-core.xml"),
    absoluteUrl("/sitemap-generators.xml"),
    absoluteUrl("/sitemap-articles.xml"),
    absoluteUrl("/sitemap-usernames.xml"),
    absoluteUrl("/sitemap-categories.xml"),
    absoluteUrl("/sitemap-database.xml"),
  ].map((url) => ({ url, lastModified: now }));
}

export function renderUrlSet(entries: SitemapEntry[]) {
  const body = entries
    .map(
      (entry) => `<url><loc>${entry.url}</loc><lastmod>${entry.lastModified ?? now}</lastmod><changefreq>${entry.changeFrequency ?? "weekly"}</changefreq><priority>${entry.priority ?? 0.7}</priority></url>`
    )
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</urlset>`;
}

export function renderSitemapIndex(entries: Array<{ url: string; lastModified: string }>) {
  const body = entries
    .map((entry) => `<sitemap><loc>${entry.url}</loc><lastmod>${entry.lastModified}</lastmod></sitemap>`)
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?><sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${body}</sitemapindex>`;
}
