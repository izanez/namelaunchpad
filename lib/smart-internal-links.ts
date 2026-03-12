import { blogCategorySummaries, blogArticleSummaries } from "@/lib/blog-hub";
import { generatorCategories, generatorDatabase, type GeneratorDirectoryEntry } from "@/lib/generators";
import { programmaticSeoPages } from "@/lib/programmatic-seo-pages";
import { usernameListingPages } from "@/lib/username-listing-pages";

type LinkKind = "generator" | "article" | "listing" | "category" | "database";
type PageType = "generator" | "article" | "listing" | "category" | "database";

export type SmartInternalLinkItem = {
  href: string;
  label: string;
  description: string;
  kind: LinkKind;
};

export type SmartInternalLinkSection = {
  title: string;
  items: SmartInternalLinkItem[];
};

export type SmartLinkContext = {
  pageType: PageType;
  slug: string;
  title: string;
  category?: string;
  style?: string;
  keywords?: string[];
};

type Candidate = SmartInternalLinkItem & {
  tokens: string[];
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

const databaseTargets: Candidate[] = [
  { href: "/username-database", label: "Username Database", description: "Search the full username database by style, category, rarity, and length.", kind: "database", tokens: ["username", "database", "search", "rare", "short", "anime", "gaming"] },
  { href: "/username-ideas", label: "Username Ideas", description: "Browse a large gallery of generated usernames grouped by style.", kind: "database", tokens: ["username", "ideas", "cool", "anime", "aesthetic", "dark"] },
  { href: "/all-generators", label: "All Generators", description: "Browse all generator tools and naming pages in one place.", kind: "database", tokens: ["generator", "discover", "browse", "gaming", "social"] },
  { href: "/explore-generators", label: "Explore Generators", description: "Explore generator categories and related naming tools.", kind: "database", tokens: ["generator", "explore", "category", "discover"] },
];

function resolveGeneratorHref(entry: GeneratorDirectoryEntry) {
  return directGeneratorPageSlugs.has(entry.slug) ? `/${entry.slug}` : `/generators/${entry.slug}`;
}

function tokenize(value: string) {
  return value
    .toLowerCase()
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

function uniq<T>(items: T[]) {
  return Array.from(new Set(items));
}

const generatorCandidates: Candidate[] = generatorDatabase.map((entry) => ({
  href: resolveGeneratorHref(entry),
  label: entry.title,
  description: entry.description,
  kind: "generator",
  tokens: uniq([...tokenize(entry.slug), ...tokenize(entry.title), ...tokenize(entry.category), ...entry.exampleNames.flatMap(tokenize)]),
}));

const blogCandidates: Candidate[] = blogArticleSummaries.map((article) => ({
  href: `/blog/${article.slug}`,
  label: article.title,
  description: article.description,
  kind: "article",
  tokens: uniq([...tokenize(article.slug), ...tokenize(article.title), ...tokenize(article.category), ...article.keywords.flatMap(tokenize)]),
}));

const seoPageCandidates: Candidate[] = programmaticSeoPages.map((page) => ({
  href: `/${page.slug}`,
  label: page.title,
  description: page.metaDescription,
  kind: "article",
  tokens: uniq([...tokenize(page.slug), ...tokenize(page.title), ...page.keywords.flatMap(tokenize)]),
}));

const listingCandidates: Candidate[] = usernameListingPages.map((page) => ({
  href: `/${page.slug}`,
  label: page.title,
  description: page.metaDescription,
  kind: "listing",
  tokens: uniq([...tokenize(page.slug), ...tokenize(page.title), ...page.generator.keywords.flatMap(tokenize)]),
}));

const generatorCategoryCandidates: Candidate[] = generatorCategories.map((category) => ({
  href: `/category/${category.slug}`,
  label: `${category.title} Generators`,
  description: category.description,
  kind: "category",
  tokens: uniq([...tokenize(category.slug), ...tokenize(category.title), ...tokenize(category.description)]),
}));

const articleCategoryCandidates: Candidate[] = blogCategorySummaries.map((category) => ({
  href: `/categories/${category.slug}`,
  label: `${category.label} Articles`,
  description: `Browse ${category.label.toLowerCase()} guides and SEO articles.`,
  kind: "category",
  tokens: uniq([...tokenize(category.slug), ...tokenize(category.label), "articles", "guides"]),
}));

const allCandidates: Candidate[] = [
  ...generatorCandidates,
  ...blogCandidates,
  ...seoPageCandidates,
  ...listingCandidates,
  ...generatorCategoryCandidates,
  ...articleCategoryCandidates,
  ...databaseTargets,
];

function buildContextTokens(context: SmartLinkContext) {
  return uniq([
    ...tokenize(context.slug),
    ...tokenize(context.title),
    ...(context.category ? tokenize(context.category) : []),
    ...(context.style ? tokenize(context.style) : []),
    ...((context.keywords ?? []).flatMap(tokenize)),
  ]);
}

function computeBoost(contextTokens: string[], candidate: Candidate, pageType: PageType) {
  let boost = 0;
  const href = candidate.href;
  const has = (token: string) => contextTokens.includes(token);

  if ((has("fortnite") || has("battle")) && /fortnite|cool-usernames|rare-user|clan/.test(href)) boost += 6;
  if (has("anime") && /anime|fantasy|rare-user|aesthetic-user/.test(href)) boost += 6;
  if ((has("4") || has("5") || has("6") || has("short") || has("letter")) && /og-username-finder|short-usernames|rare-usernames|4-letter|5-letter|6-letter/.test(href)) boost += 6;
  if ((has("rare") || has("legendary")) && /rare-user|legendary|og-username-finder|rare-gamertags/.test(href)) boost += 5;
  if ((has("roblox") || has("minecraft")) && /roblox|minecraft|cute-usernames|short-usernames/.test(href)) boost += 4;
  if ((has("discord") || has("twitch") || has("streamer")) && /discord|twitch|streamer|social-media/.test(href)) boost += 4;
  if ((has("fantasy") || has("clan")) && /fantasy|clan|duo|legendary/.test(href)) boost += 4;
  if (candidate.kind === "database" && pageType !== "database") boost += 1;

  return boost;
}

function rankCandidates(context: SmartLinkContext, kinds: LinkKind[], limit: number, excluded: Set<string>) {
  const contextTokens = buildContextTokens(context);

  return allCandidates
    .filter((candidate) => kinds.includes(candidate.kind))
    .filter((candidate) => candidate.href !== context.slug && candidate.href !== `/${context.slug}` && candidate.href !== `/blog/${context.slug}`)
    .filter((candidate) => !excluded.has(candidate.href))
    .map((candidate) => {
      const shared = candidate.tokens.filter((token) => contextTokens.includes(token)).length;
      const styleMatch = context.style && candidate.tokens.includes(context.style.toLowerCase()) ? 2 : 0;
      const categoryMatch = context.category ? candidate.tokens.some((token) => tokenize(context.category ?? "").includes(token)) ? 2 : 0 : 0;
      const score = shared * 3 + styleMatch + categoryMatch + computeBoost(contextTokens, candidate, context.pageType);
      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.candidate.label.localeCompare(right.candidate.label))
    .slice(0, limit)
    .map((entry) => entry.candidate);
}

export function getSmartInternalLinkSections(context: SmartLinkContext): SmartInternalLinkSection[] {
  const used = new Set<string>();
  const sections: SmartInternalLinkSection[] = [];

  const addSection = (title: string, kinds: LinkKind[], limit: number) => {
    const items = rankCandidates(context, kinds, limit, used);
    if (items.length === 0) return;
    items.forEach((item) => used.add(item.href));
    sections.push({ title, items });
  };

  if (context.pageType === "generator") {
    addSection("Related Articles", ["article"], 4);
    addSection("Related Username Ideas", ["listing"], 4);
    addSection("Related Generators", ["generator"], 4);
    addSection("Explore More", ["category", "database"], 3);
  } else if (context.pageType === "article") {
    addSection("Related Generators", ["generator"], 4);
    addSection("Related Username Ideas", ["listing"], 4);
    addSection("Related Articles", ["article"], 4);
    addSection("Explore More", ["category", "database"], 3);
  } else if (context.pageType === "listing") {
    addSection("Related Generators", ["generator"], 4);
    addSection("Related Articles", ["article"], 4);
    addSection("Related Username Ideas", ["listing"], 3);
    addSection("Explore More", ["database", "category"], 3);
  } else if (context.pageType === "category") {
    addSection("Related Generators", ["generator"], 4);
    addSection("Related Articles", ["article"], 4);
    addSection("Related Username Ideas", ["listing"], 4);
    addSection("Explore More", ["database", "category"], 3);
  } else {
    addSection("Popular Generator Pages", ["generator"], 4);
    addSection("Popular Articles", ["article"], 4);
    addSection("Popular Username Lists", ["listing"], 4);
    addSection("Explore More", ["category", "database"], 3);
  }

  return sections;
}

export function getSmartInternalLinks(context: SmartLinkContext, limit = 6) {
  return getSmartInternalLinkSections(context)
    .flatMap((section) => section.items)
    .slice(0, limit)
    .map((item) => ({ href: item.href, label: item.label }));
}
