import { generateUsernames } from "@/lib/generators";

type ArticleStyle = "cool" | "aesthetic" | "dark" | "funny" | "fantasy" | "hacker" | "anime" | "streamer";

export type BlogArticle = {
  slug: string;
  title: string;
  description: string;
  category: string;
  keywords: string[];
  relatedGenerators: string[];
  relatedUsernameLists: string[];
  style: ArticleStyle;
  minLength: number;
  maxLength: number;
  shortIntro: string;
  ctaHref: string;
  examplesSeed: string[];
  usernameCount: number;
  platform?: string;
  audience?: string;
};

type ArticleFamily = {
  topic: string;
  stem: string;
  primaryAdjective: string;
  secondaryAdjective: string;
  tertiaryAdjective: string;
  category: string;
  style: ArticleStyle;
  audienceOne: string;
  audienceTwo: string;
  keywords: string[];
  relatedGenerators: string[];
  relatedUsernameLists: string[];
  ctaHref: string;
  examplesSeed: string[];
  minLength: number;
  maxLength: number;
  usernameCount: number;
  platform?: string;
};

const articleFamilies: ArticleFamily[] = [
  { topic: "best fortnite usernames", stem: "Fortnite Usernames", primaryAdjective: "Best", secondaryAdjective: "Sweaty", tertiaryAdjective: "clean", category: "Gaming", style: "cool", audienceOne: "Battle Royale Players", audienceTwo: "Streamers", keywords: ["fortnite", "storm", "loot", "victory"], relatedGenerators: ["/fortnite-name-generator", "/generators/fortnite-name-generator", "/generators/cool-usernames-generator", "/generators/rare-username-generator", "/clan-name-generator"], relatedUsernameLists: ["/rare-usernames", "/short-usernames", "/legendary-usernames"], ctaHref: "/fortnite-name-generator", examplesSeed: ["storm", "victory", "sniper"], minLength: 6, maxLength: 13, usernameCount: 50, platform: "Fortnite" },
  { topic: "cool roblox usernames", stem: "Roblox Usernames", primaryAdjective: "Cool", secondaryAdjective: "Creative", tertiaryAdjective: "clean", category: "Gaming", style: "cool", audienceOne: "Builders", audienceTwo: "Younger Players", keywords: ["roblox", "obby", "block", "pixel"], relatedGenerators: ["/roblox-username-generator", "/generators/roblox-username-generator", "/generators/cool-usernames-generator", "/username-generator"], relatedUsernameLists: ["/short-usernames", "/cute-usernames", "/aesthetic-usernames"], ctaHref: "/roblox-username-generator", examplesSeed: ["block", "pixel", "obby"], minLength: 6, maxLength: 12, usernameCount: 48, platform: "Roblox" },
  { topic: "rare gamertags", stem: "Rare Gamertags", primaryAdjective: "Rare", secondaryAdjective: "Uncommon", tertiaryAdjective: "memorable", category: "Rare", style: "dark", audienceOne: "Competitive Players", audienceTwo: "Collectors", keywords: ["rare", "og", "void", "shade"], relatedGenerators: ["/og-username-finder", "/gamer-tag-generator", "/generators/rare-username-generator", "/username-generator"], relatedUsernameLists: ["/rare-usernames", "/legendary-usernames", "/4-letter-usernames"], ctaHref: "/og-username-finder", examplesSeed: ["void", "shade", "og"], minLength: 4, maxLength: 8, usernameCount: 40 },
  { topic: "short gamer names", stem: "Short Gamer Names", primaryAdjective: "Short", secondaryAdjective: "Clean", tertiaryAdjective: "compact", category: "Short", style: "cool", audienceOne: "Competitive Players", audienceTwo: "Creators", keywords: ["short", "og", "nova", "zyro"], relatedGenerators: ["/username-generator", "/og-username-finder", "/gamer-tag-generator", "/generators/short-gamertag-generator"], relatedUsernameLists: ["/4-letter-usernames", "/5-letter-usernames", "/6-letter-usernames"], ctaHref: "/username-generator", examplesSeed: ["nova", "zyro", "xeno"], minLength: 4, maxLength: 6, usernameCount: 36 },
  { topic: "aesthetic usernames", stem: "Aesthetic Usernames", primaryAdjective: "Aesthetic", secondaryAdjective: "Soft", tertiaryAdjective: "beautiful", category: "Aesthetic", style: "aesthetic", audienceOne: "Creators", audienceTwo: "TikTok Users", keywords: ["aesthetic", "luna", "velvet", "glow"], relatedGenerators: ["/username-generator", "/generators/aesthetic-username-generator", "/generators/cool-usernames-generator", "/search?q=aesthetic"], relatedUsernameLists: ["/aesthetic-usernames", "/cute-usernames", "/short-usernames"], ctaHref: "/username-generator", examplesSeed: ["luna", "velvet", "echo"], minLength: 6, maxLength: 12, usernameCount: 56 },
  { topic: "anime usernames", stem: "Anime Usernames", primaryAdjective: "Anime", secondaryAdjective: "Cool", tertiaryAdjective: "sharp", category: "Anime", style: "anime", audienceOne: "Anime Fans", audienceTwo: "Gamers", keywords: ["anime", "kitsune", "ronin", "sakura"], relatedGenerators: ["/generators/anime-username-generator", "/username-generator", "/fantasy-name-generator", "/generators/rare-username-generator"], relatedUsernameLists: ["/anime-usernames", "/rare-usernames", "/aesthetic-usernames"], ctaHref: "/username-generator", examplesSeed: ["kitsune", "ronin", "akira"], minLength: 5, maxLength: 12, usernameCount: 44 },
  { topic: "funny usernames", stem: "Funny Usernames", primaryAdjective: "Funny", secondaryAdjective: "Chaotic", tertiaryAdjective: "playful", category: "Funny", style: "funny", audienceOne: "Casual Players", audienceTwo: "Friend Groups", keywords: ["funny", "meme", "goofy", "clown"], relatedGenerators: ["/username-generator", "/generators/funny-gamer-tag-generator", "/clan-name-generator", "/generators/cool-usernames-generator"], relatedUsernameLists: ["/short-usernames", "/cute-usernames", "/duo-usernames"], ctaHref: "/username-generator", examplesSeed: ["meme", "goofy", "wobble"], minLength: 6, maxLength: 12, usernameCount: 40 },
  { topic: "dark usernames", stem: "Dark Usernames", primaryAdjective: "Dark", secondaryAdjective: "Edgy", tertiaryAdjective: "shadowy", category: "Dark", style: "dark", audienceOne: "FPS Players", audienceTwo: "Night Owls", keywords: ["dark", "shadow", "void", "reaper"], relatedGenerators: ["/username-generator", "/gamer-tag-generator", "/og-username-finder", "/generators/rare-username-generator"], relatedUsernameLists: ["/dark-usernames", "/rare-usernames", "/legendary-usernames"], ctaHref: "/username-generator", examplesSeed: ["shadow", "void", "reaper"], minLength: 5, maxLength: 11, usernameCount: 46 },
  { topic: "clan name ideas", stem: "Clan Name Ideas", primaryAdjective: "Strong", secondaryAdjective: "Competitive", tertiaryAdjective: "cohesive", category: "Clan", style: "fantasy", audienceOne: "Squads", audienceTwo: "Esports Teams", keywords: ["clan", "legion", "wolves", "syndicate"], relatedGenerators: ["/clan-name-generator", "/gamer-tag-generator", "/generators/clan-name-generator", "/generators/duo-gamertag-generator"], relatedUsernameLists: ["/clan-usernames", "/legendary-usernames", "/duo-usernames"], ctaHref: "/clan-name-generator", examplesSeed: ["iron", "wolf", "legion"], minLength: 8, maxLength: 15, usernameCount: 32 },
  { topic: "twitch usernames", stem: "Twitch Usernames", primaryAdjective: "Best", secondaryAdjective: "Memorable", tertiaryAdjective: "creator-friendly", category: "Streamer", style: "streamer", audienceOne: "New Streamers", audienceTwo: "Creators", keywords: ["twitch", "stream", "live", "clip"], relatedGenerators: ["/generators/twitch-username-generator", "/username-generator", "/generators/streamer-name-generator", "/search?q=twitch"], relatedUsernameLists: ["/streamer-usernames", "/short-usernames", "/rare-usernames"], ctaHref: "/generators/twitch-username-generator", examplesSeed: ["stream", "live", "clip"], minLength: 6, maxLength: 12, usernameCount: 52, platform: "Twitch" },
  { topic: "discord usernames", stem: "Discord Usernames", primaryAdjective: "Best", secondaryAdjective: "Clean", tertiaryAdjective: "server-ready", category: "Social Media", style: "cool", audienceOne: "Community Builders", audienceTwo: "Gamers", keywords: ["discord", "server", "chat", "voice"], relatedGenerators: ["/generators/discord-username-generator", "/username-generator", "/clan-name-generator", "/generators/cool-usernames-generator"], relatedUsernameLists: ["/short-usernames", "/anime-usernames", "/dark-usernames"], ctaHref: "/generators/discord-username-generator", examplesSeed: ["chat", "server", "echo"], minLength: 5, maxLength: 12, usernameCount: 45, platform: "Discord" },
  { topic: "minecraft usernames", stem: "Minecraft Usernames", primaryAdjective: "Best", secondaryAdjective: "Creative", tertiaryAdjective: "blocky", category: "Gaming", style: "cool", audienceOne: "Survival Players", audienceTwo: "Builders", keywords: ["minecraft", "block", "craft", "creeper"], relatedGenerators: ["/generators/minecraft-name-generator", "/username-generator", "/roblox-username-generator", "/generators/rare-username-generator"], relatedUsernameLists: ["/short-usernames", "/rare-usernames", "/cute-usernames"], ctaHref: "/generators/minecraft-name-generator", examplesSeed: ["craft", "block", "pixel"], minLength: 6, maxLength: 13, usernameCount: 50, platform: "Minecraft" },
  { topic: "valorant usernames", stem: "Valorant Usernames", primaryAdjective: "Best", secondaryAdjective: "Sharp", tertiaryAdjective: "tactical", category: "Gaming", style: "dark", audienceOne: "Ranked Players", audienceTwo: "Controller Mains", keywords: ["valorant", "ace", "phantom", "viper"], relatedGenerators: ["/generators/valorant-name-generator", "/username-generator", "/gamer-tag-generator", "/generators/rare-username-generator"], relatedUsernameLists: ["/dark-usernames", "/rare-usernames", "/legendary-usernames"], ctaHref: "/generators/valorant-name-generator", examplesSeed: ["ace", "viper", "phantom"], minLength: 5, maxLength: 11, usernameCount: 48, platform: "Valorant" },
  { topic: "streamer names", stem: "Streamer Names", primaryAdjective: "Best", secondaryAdjective: "Brandable", tertiaryAdjective: "memorable", category: "Streamer", style: "streamer", audienceOne: "New Creators", audienceTwo: "Gaming Channels", keywords: ["streamer", "live", "clip", "broadcast"], relatedGenerators: ["/generators/streamer-name-generator", "/username-generator", "/generators/twitch-streamer-name-generator", "/search?q=streamer"], relatedUsernameLists: ["/streamer-usernames", "/short-usernames", "/rare-usernames"], ctaHref: "/username-generator", examplesSeed: ["live", "echo", "stage"], minLength: 6, maxLength: 12, usernameCount: 42 },
  { topic: "unique gamer tag ideas", stem: "Unique Gamer Tag Ideas", primaryAdjective: "Unique", secondaryAdjective: "Fresh", tertiaryAdjective: "distinctive", category: "Gaming", style: "cool", audienceOne: "Competitive Players", audienceTwo: "Cross-Platform Gamers", keywords: ["unique", "gamertag", "nova", "rogue"], relatedGenerators: ["/gamer-tag-generator", "/username-generator", "/generators/rare-gamertag-generator", "/search?q=gamertag"], relatedUsernameLists: ["/rare-usernames", "/legendary-usernames", "/short-usernames"], ctaHref: "/gamer-tag-generator", examplesSeed: ["nova", "rogue", "viper"], minLength: 6, maxLength: 12, usernameCount: 50 },
  { topic: "username ideas for girls", stem: "Username Ideas for Girls", primaryAdjective: "Cute", secondaryAdjective: "Aesthetic", tertiaryAdjective: "memorable", category: "Social Media", style: "aesthetic", audienceOne: "Creators", audienceTwo: "Gamers", keywords: ["girls", "luna", "star", "soft"], relatedGenerators: ["/username-generator", "/generators/aesthetic-username-generator", "/search?q=cute", "/search?q=aesthetic"], relatedUsernameLists: ["/cute-usernames", "/aesthetic-usernames", "/short-usernames"], ctaHref: "/username-generator", examplesSeed: ["luna", "rose", "glow"], minLength: 5, maxLength: 12, usernameCount: 60 },
  { topic: "username ideas for boys", stem: "Username Ideas for Boys", primaryAdjective: "Cool", secondaryAdjective: "Strong", tertiaryAdjective: "clean", category: "Gaming", style: "cool", audienceOne: "FPS Players", audienceTwo: "Creators", keywords: ["boys", "shadow", "blaze", "storm"], relatedGenerators: ["/username-generator", "/gamer-tag-generator", "/generators/cool-usernames-generator", "/search?q=cool"], relatedUsernameLists: ["/short-usernames", "/dark-usernames", "/rare-usernames"], ctaHref: "/username-generator", examplesSeed: ["storm", "blaze", "rogue"], minLength: 5, maxLength: 12, usernameCount: 60 },
  { topic: "legendary usernames", stem: "Legendary Usernames", primaryAdjective: "Legendary", secondaryAdjective: "Epic", tertiaryAdjective: "premium", category: "Rare", style: "fantasy", audienceOne: "RPG Players", audienceTwo: "Collectors", keywords: ["legendary", "dragon", "myth", "storm"], relatedGenerators: ["/fantasy-name-generator", "/gamer-tag-generator", "/og-username-finder", "/generators/rare-username-generator"], relatedUsernameLists: ["/legendary-usernames", "/rare-usernames", "/fantasy-usernames"], ctaHref: "/fantasy-name-generator", examplesSeed: ["dragon", "myth", "storm"], minLength: 6, maxLength: 13, usernameCount: 40 },
  { topic: "cute usernames", stem: "Cute Usernames", primaryAdjective: "Cute", secondaryAdjective: "Soft", tertiaryAdjective: "charming", category: "Social Media", style: "aesthetic", audienceOne: "Creators", audienceTwo: "Friends", keywords: ["cute", "soft", "berry", "luna"], relatedGenerators: ["/username-generator", "/generators/aesthetic-username-generator", "/search?q=cute", "/roblox-username-generator"], relatedUsernameLists: ["/cute-usernames", "/aesthetic-usernames", "/short-usernames"], ctaHref: "/username-generator", examplesSeed: ["berry", "luna", "pearl"], minLength: 5, maxLength: 11, usernameCount: 54 },
  { topic: "edgy usernames", stem: "Edgy Usernames", primaryAdjective: "Edgy", secondaryAdjective: "Dark", tertiaryAdjective: "aggressive", category: "Dark", style: "dark", audienceOne: "Competitive Players", audienceTwo: "Night Creators", keywords: ["edgy", "venom", "fang", "reaper"], relatedGenerators: ["/username-generator", "/gamer-tag-generator", "/og-username-finder", "/generators/rare-username-generator"], relatedUsernameLists: ["/dark-usernames", "/rare-usernames", "/legendary-usernames"], ctaHref: "/username-generator", examplesSeed: ["venom", "fang", "reaper"], minLength: 5, maxLength: 11, usernameCount: 44 }
];

function slugify(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function buildArticleVariants(family: ArticleFamily) {
  return [
    `${family.primaryAdjective} ${family.stem}`,
    `${family.secondaryAdjective} ${family.stem} for ${family.audienceOne}`,
    `${family.stem} Ideas for ${family.audienceTwo}`,
    `How to Choose ${family.tertiaryAdjective} ${family.stem}`,
    `${family.stem}: Tips, Examples, and Generator Ideas`,
  ];
}

function buildDescription(_family: ArticleFamily, title: string) {
  return `Explore ${title.toLowerCase()} with examples, tips, related generators, and practical advice for choosing a stronger username on NameLaunchpad.`;
}

function buildShortIntro(family: ArticleFamily, title: string) {
  return `${title} on NameLaunchpad is built for users who want names that feel usable, memorable, and aligned with ${family.category.toLowerCase()} naming trends instead of random filler combinations.`;
}

function buildArticleKeywords(family: ArticleFamily, title: string, index: number) {
  return Array.from(new Set([family.topic, title.toLowerCase(), ...family.keywords, family.category.toLowerCase(), index % 2 === 0 ? "username ideas" : "gamer tag ideas", "NameLaunchpad"]));
}

const generatedArticles = articleFamilies.flatMap((family) =>
  buildArticleVariants(family).map((title, index) => ({
    slug: slugify(title),
    title,
    description: buildDescription(family, title),
    category: family.category,
    keywords: buildArticleKeywords(family, title, index),
    relatedGenerators: family.relatedGenerators.slice(0, 8),
    relatedUsernameLists: family.relatedUsernameLists,
    style: family.style,
    minLength: family.minLength,
    maxLength: family.maxLength,
    shortIntro: buildShortIntro(family, title),
    ctaHref: family.ctaHref,
    examplesSeed: family.examplesSeed,
    usernameCount: family.usernameCount,
    platform: family.platform,
    audience: index < 2 ? family.audienceOne : family.audienceTwo,
  }))
);

export const blogArticles: BlogArticle[] = generatedArticles;
export const blogArticleSlugs = blogArticles.map((article) => article.slug);

export function getBlogArticle(slug: string) {
  return blogArticles.find((article) => article.slug === slug);
}

export function getRelatedBlogArticles(article: BlogArticle, amount = 4) {
  return blogArticles
    .filter((candidate) => candidate.slug !== article.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === article.category) score += 3;
      if (candidate.style === article.style) score += 2;
      score += candidate.keywords.filter((keyword) => article.keywords.includes(keyword)).length;
      return { candidate, score };
    })
    .sort((left, right) => right.score - left.score || left.candidate.title.localeCompare(right.candidate.title))
    .slice(0, amount)
    .map(({ candidate }) => candidate);
}

export function buildBlogArticleSections(article: BlogArticle) {
  const keywordPhrase = article.keywords.slice(0, 4).join(", ");
  const generatorCta = article.ctaHref;

  return [
    {
      heading: `What makes ${article.title.toLowerCase()} work`,
      body: `Good ${article.title.toLowerCase()} are usually built around clarity, tone, and consistency. A strong name should feel like it belongs in the spaces where you actually use it, whether that is a game lobby, a Discord server, a TikTok bio, or a Twitch overlay. That is why NameLaunchpad leans on patterns that feel readable and brandable instead of stacking random syllables together. Names with clear visual rhythm are easier to remember after a single match or stream, and they usually hold up better when you want to reuse them across multiple platforms.\n\nFor this topic, the most useful patterns usually come from combinations around ${keywordPhrase}. Those roots are recognizable, but they still leave room for variation in pacing, mood, and uniqueness. A better username is not just unusual. It is usable. If a name sounds awkward when you say it out loud, looks cluttered in a profile header, or needs too many symbols to feel distinctive, it usually will not age well. The goal is a clean identity that still has enough edge to stand out.`,
    },
    {
      heading: "How to choose a username that fits your use case",
      body: `The right name depends on where you plan to use it. If your main goal is gaming, readability under pressure matters more than decorative flair. If the name is meant for content or streaming, it also needs to look clean in thumbnails, titles, and overlays. This is why users often overvalue novelty and undervalue flexibility. A flexible username is one that can work in gameplay, in social handles, and in creator branding without feeling like it belongs to a different persona each time.\n\nWhen building options, it helps to think in layers. Start with a mood, then a theme, then a format. Mood covers whether the name should feel cool, dark, funny, aesthetic, or fantasy-driven. Theme covers the vocabulary you want to borrow from, like storm, pixel, shadow, rogue, or luna. Format controls whether the final name should be short and premium, longer and more descriptive, or balanced somewhere in between. That is the logic behind the generator and also the easiest way to judge whether a username actually fits you.`,
    },
    {
      heading: "Username examples and naming patterns",
      body: `High-quality examples are useful because they show the structure behind good names. Some names work because a strong prefix creates immediate tone. Others work because the ending gives motion, rank, or impact. In practice, the best combinations are often simple. They use one recognisable anchor and one supporting word rather than three unrelated ideas fighting for attention. That is why names generated around this article topic often feel cleaner than the average list you find online.\n\nA practical rule is to test whether the name still feels natural when you remove numbers and symbols. If the base version is already strong, the name has a better chance of staying memorable. If it only works once you add random digits, underscores, or extra letters, it is probably not the best candidate. That applies to ${article.title.toLowerCase()} especially, because users searching for this topic usually want names that feel intentional rather than improvised.`,
    },
    {
      heading: "Common mistakes to avoid",
      body: `One of the biggest mistakes is making a name too complicated in an attempt to look unique. Overloaded spellings, stacked symbols, or mismatched themes usually make the username weaker, not stronger. Another issue is chasing short-term trends too aggressively. A meme-based name can feel fresh today, but it may look dated after a few weeks. If you are building a tag you want to keep, you should bias toward words and structures that still feel solid after the current trend cycle fades.\n\nAnother frequent problem is ignoring availability and portability. A name that only works on one platform is often less useful than a slightly less perfect option that can follow you across multiple profiles. That is where NameLaunchpad helps. Instead of just giving a random batch, it makes it easier to compare styles, lengths, and related generator pages so you can keep iterating without losing direction.`,
    },
    {
      heading: "Tips for getting better results from the generator",
      body: `Use the generator like a direction tool, not just a one-click answer. Start with a theme or a keyword that reflects the kind of identity you want. Then adjust style and length until the results start clustering around the tone you actually like. If you want cleaner names, reduce complexity and keep the length tighter. If you want more expressive names, allow slightly longer combinations with stronger fantasy, dark, or streamer cues. The best results usually come from two or three focused iterations, not a single blind batch.\n\nIt also helps to compare your generated names against other nearby article topics and username list pages. That is why this article links to related generators and related username collections. If one category is too broad, a nearby list can narrow your taste quickly. Once you find a pattern you like, open ${generatorCta} and iterate from there with better constraints. That workflow produces stronger names than copying the first thing that looks acceptable.`,
    },
    {
      heading: "Final advice before you lock in a name",
      body: `Before you settle on a final username, test it in the exact contexts where you plan to use it. Read it as a teammate would read it in voice chat. Picture it in a Twitch title, in a Discord member list, or in an in-game kill feed. Good names survive context changes. Weak names fall apart once you move them outside the one setting where they first looked interesting. That final stress test is usually enough to separate a throwaway idea from a username you can actually keep.\n\nIf you are still undecided, use this article as a starting point rather than a final verdict. The examples and tips here are meant to narrow your taste and sharpen your filters. From there, the fastest next move is to open the linked generator, generate another batch with clearer inputs, and compare the strongest options side by side. That is the practical path to finding a username that feels both original and usable.`,
    },
  ];
}

export function buildBlogArticleExamples(article: BlogArticle, amount = article.usernameCount) {
  const output = new Set<string>();
  let attempts = 0;

  while (output.size < amount && attempts < 16) {
    const names = generateUsernames({
      keywords: article.examplesSeed,
      style: article.style,
      amount,
      length: article.maxLength,
      minLength: article.minLength,
      maxLength: article.maxLength,
    });

    names.forEach((name) => output.add(name));
    attempts += 1;
  }

  return Array.from(output).slice(0, amount);
}
