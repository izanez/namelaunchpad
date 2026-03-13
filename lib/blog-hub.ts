import type { BlogArticle } from "@/lib/blog-articles";
import { blogArticles } from "@/lib/blog-articles";

export type BlogArticleSummary = BlogArticle & {
  categorySlug: string;
  readingTime: number;
  publishedAt: string;
  popularityScore: number;
  isFeatured: boolean;
};

export type BlogCategorySummary = {
  slug: string;
  label: string;
  count: number;
};

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function estimateReadingTime(article: BlogArticle) {
  const contentWords = 1150;
  const bonus = Math.round(article.usernameCount / 18) + article.relatedGenerators.length;
  return Math.max(4, Math.min(9, Math.round((contentWords + bonus * 35) / 220)));
}

function buildPublishedAt(index: number) {
  const start = new Date("2026-03-10T08:00:00.000Z");
  start.setDate(start.getDate() - index);
  return start.toISOString();
}

function buildPopularityScore(article: BlogArticle, index: number) {
  const base = article.usernameCount * 3 + article.relatedGenerators.length * 11 + article.keywords.length * 7;
  const topicBoost = /(fortnite|roblox|minecraft|valorant|discord|twitch)/i.test(article.title) ? 45 : 0;
  return base + topicBoost + Math.max(0, 60 - index);
}

const featuredTopicMatchers = [/fortnite/i, /roblox/i, /rare/i, /short/i, /aesthetic/i, /anime/i, /discord/i, /streamer/i];

export const blogArticleSummaries: BlogArticleSummary[] = blogArticles.map((article, index) => ({
  ...article,
  categorySlug: slugify(article.category),
  readingTime: estimateReadingTime(article),
  publishedAt: buildPublishedAt(index),
  popularityScore: buildPopularityScore(article, index),
  isFeatured: featuredTopicMatchers.some((matcher) => matcher.test(article.title)),
}));

export const blogCategorySummaries: BlogCategorySummary[] = Array.from(
  blogArticleSummaries.reduce((map, article) => {
    const current = map.get(article.categorySlug);
    if (current) {
      current.count += 1;
    } else {
      map.set(article.categorySlug, { slug: article.categorySlug, label: article.category, count: 1 });
    }
    return map;
  }, new Map<string, BlogCategorySummary>()).values()
).sort((left, right) => right.count - left.count || left.label.localeCompare(right.label));

export const blogCategorySlugs = blogCategorySummaries.map((category) => category.slug);

export function getBlogCategory(slug: string) {
  return blogCategorySummaries.find((category) => category.slug === slug);
}

export function getBlogArticlesByCategory(slug: string) {
  return blogArticleSummaries.filter((article) => article.categorySlug === slug);
}

export function getFeaturedBlogArticles(amount = 8) {
  return blogArticleSummaries.filter((article) => article.isFeatured).slice(0, amount);
}

export function getNewestBlogArticles(amount = 8) {
  return [...blogArticleSummaries]
    .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt))
    .slice(0, amount);
}

export function getPopularBlogArticles(amount = 8) {
  return [...blogArticleSummaries]
    .sort((left, right) => right.popularityScore - left.popularityScore)
    .slice(0, amount);
}

export function searchBlogArticles(query: string) {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return blogArticleSummaries;

  return [...blogArticleSummaries]
    .map((article) => {
      let score = 0;
      if (article.title.toLowerCase().includes(normalized)) score += 10;
      if (article.description.toLowerCase().includes(normalized)) score += 4;
      if (article.category.toLowerCase().includes(normalized)) score += 3;
      score += article.keywords.filter((keyword) => keyword.toLowerCase().includes(normalized)).length * 2;
      return { article, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.article.title.localeCompare(right.article.title))
    .map((entry) => entry.article);
}
