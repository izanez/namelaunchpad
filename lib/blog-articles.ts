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

function buildDescription(family: ArticleFamily, title: string) {
  const theme = family.examplesSeed.slice(0, 2).join(" and ");
  const audience = family.audienceTwo.toLowerCase();
  return `Explore ${title.toLowerCase()} with practical naming advice, ${family.platform ?? family.category.toLowerCase()} examples, ${theme}-style ideas, and generator links for ${audience}.`;
}

function buildShortIntro(family: ArticleFamily, title: string) {
  const platformText = family.platform ? `for ${family.platform} players` : `for ${family.category.toLowerCase()} naming`;
  const seedPreview = family.examplesSeed.slice(0, 3).join(", ");
  return `${title} on NameLaunchpad focuses on names that feel usable in real profiles, not throwaway filler. The page is tuned ${platformText} and uses naming cues like ${seedPreview} so the ideas feel closer to what people actually search for.`;
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
  const examples = article.examplesSeed.join(", ");
  const audience = (article.audience ?? "players and creators").toLowerCase();
  const platform = article.platform ?? article.category;
  const styleAngle =
    article.style === "dark"
      ? "sharper, lower-noise wording with stronger contrast"
      : article.style === "aesthetic"
        ? "softer wording, cleaner pacing, and more visual vocabulary"
        : article.style === "anime"
          ? "stylized vocabulary that still sounds readable in English handles"
          : article.style === "fantasy"
            ? "heavier mythic language and more dramatic endings"
            : article.style === "streamer"
              ? "brandable words that still work in overlays and bios"
              : "clean gaming language with memorable rhythm";

  return [
    {
      heading: `Why ${article.title.toLowerCase()} keep getting searched`,
      body: `${article.title} stay relevant because users usually want a name that works immediately inside a recognizable theme. On NameLaunchpad, this page is tuned for ${audience}, which means the advice is not just about sounding cool in isolation. It is about whether the handle still fits in a lobby list, social bio, clip title, or server roster. A name with clean rhythm usually performs better than one that only looks unusual for a second.\n\nFor this topic, useful naming roots come from ${keywordPhrase}. Those words already carry a clear signal, so they do a lot of work before you even add a suffix or second concept. That makes it easier to build names that feel grounded in the page topic instead of random. The best results are usually readable first and distinctive second, not the other way around.`,
    },
    {
      heading: `Name patterns that fit ${platform.toLowerCase()}`,
      body: `Different themes need different structures. A name made for ${platform.toLowerCase()} can get away with vocabulary that would feel awkward on another page, because users already expect a certain tone. For this topic, the strongest patterns usually lean on ${styleAngle}. That is why names based on ${examples} feel more believable here than on a broader generator page.\n\nA practical way to judge the pattern is to strip it down to two parts: the anchor word and the finishing word. The anchor gives the name its theme. The finish gives it motion, status, or edge. If both parts point in the same direction, the name usually feels coherent. If they pull in different directions, the result looks invented rather than chosen.`,
    },
    {
      heading: "How to read the example list properly",
      body: `The example usernames on this page are more useful when you treat them as patterns instead of fixed answers. Look at which names feel direct, which feel more descriptive, and which feel like they could scale into a larger identity. Some users will want a clip-ready tag that is short and punchy. Others will want something slightly longer that leaves room for personality. That difference matters more than chasing a name that simply happens to be available.\n\nFor ${article.title.toLowerCase()}, the strongest examples tend to show one clear concept rather than stacking too many. If the base word already feels right, a light suffix or stylistic variation is usually enough. Once the name needs too many repairs to feel usable, it is probably the wrong starting point.`,
    },
    {
      heading: `Mistakes that make ${article.title.toLowerCase()} feel generic`,
      body: `The most common mistake is copying the surface vocabulary without matching the structure. Users often pick the right theme word and then bolt on a weak suffix, a random number, or a clumsy spelling change. That usually produces a name that technically fits the niche but still feels forgettable. Another mistake is using references that are too narrow or too trend-driven. If the reference expires, the name usually loses value with it.\n\nIt also helps to avoid handles that only make sense in one very specific context. A better name still works when you move from gameplay to chat, or from a username to a creator handle. If the identity collapses the moment you imagine it on another platform, it needs more refinement.`,
    },
    {
      heading: "How to use the generator without getting generic output",
      body: `The fastest way to improve quality is to give the generator a more opinionated direction. Instead of entering a vague keyword, lean into a word cluster that already belongs to the page topic. On this page, seeds such as ${examples} create stronger output because they already match the search intent. Then keep the length close to the kind of names you would actually use. Cleaner output usually comes from tighter length limits and fewer mixed themes.\n\nOnce you have a batch, compare the best three or four names side by side. Check whether they still feel natural in text, easy to say, and usable beyond one platform. Then open ${generatorCta} and keep iterating from the strongest pattern, not from scratch. That workflow is usually what turns a decent name into a keeper.`,
    },
    {
      heading: "Final check before you commit to one name",
      body: `Before locking in a final handle, test whether it still feels right without any context around it. If the name only works because you remember the article topic, it may not be strong enough on its own. Good names carry their tone even when someone sees them cold in a search result, a member list, or a highlight title. That is the test that usually separates useful names from disposable ones.\n\nUse this page as a narrowing tool. The examples, sections, and internal links should help you see which direction fits your taste, not trap you in one fixed list. Once you know the pattern you want, use the generator, compare a few clean candidates, and choose the one that still feels durable outside the trend of the moment.`,
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
