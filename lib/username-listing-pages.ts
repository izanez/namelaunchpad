import {
  getAllUsernameDatabaseRecords,
  type UsernameDatabaseCategory,
  type UsernameDatabaseStyle,
  type UsernameRarity,
  type UsernameRecord,
} from "@/lib/username-database";

export type UsernameListingPage = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  h1: string;
  filters: {
    startsWith?: string;
    exactLengths?: number[];
    maxLength?: number;
    styles?: UsernameDatabaseStyle[];
    rarities?: UsernameRarity[];
    categories?: UsernameDatabaseCategory[];
  };
  generator: {
    style: UsernameDatabaseStyle;
    keywords: string[];
    minLength: number;
    maxLength: number;
  };
  relatedLinks: Array<{
    title: string;
    href: string;
  }>;
};

const commonLinks = {
  usernameGenerator: { title: "Username Generator", href: "/username-generator" },
  usernameDatabase: { title: "Username Database", href: "/username-database" },
  usernameIdeas: { title: "Username Ideas", href: "/username-ideas" },
  exploreGenerators: { title: "Explore Generators", href: "/explore-generators" },
  animeGenerator: { title: "Anime Username Generator", href: "/generators/anime-username-generator" },
  darkGenerator: { title: "Dark Username Generator", href: "/generators/dark-username-generator" },
  aestheticGenerator: { title: "Aesthetic Username Generator", href: "/generators/aesthetic-username-generator" },
  fantasyGenerator: { title: "Fantasy Name Generator", href: "/fantasy-name-generator" },
  streamerGenerator: { title: "Streamer Name Generator", href: "/generators/streamer-name-generator" },
  clanGenerator: { title: "Clan Name Generator", href: "/clan-name-generator" },
  duoGenerator: { title: "Duo Name Generator", href: "/generators/duo-name-generator" },
  ogFinder: { title: "OG Username Finder", href: "/og-username-finder" },
  rareUsernames: { title: "Rare Usernames", href: "/rare-usernames" },
};

const letterKeywords: Record<string, string[]> = {
  a: ["alpha", "aero"],
  b: ["blaze", "byte"],
  c: ["cyber", "crimson"],
  d: ["dark", "drift"],
  e: ["echo", "ember"],
  f: ["frost", "flare"],
  g: ["ghost", "glow"],
  h: ["hex", "hunter"],
  i: ["iron", "ice"],
  j: ["jade", "jolt"],
  k: ["kiro", "knight"],
  l: ["luna", "legend"],
  m: ["myth", "morph"],
  n: ["nova", "night"],
  o: ["onyx", "orbit"],
  p: ["pixel", "pulse"],
  q: ["quartz", "quest"],
  r: ["rogue", "rune"],
  s: ["storm", "shadow"],
  t: ["turbo", "titan"],
  u: ["ultra", "umbra"],
  v: ["void", "viper"],
  w: ["wolf", "wave"],
  x: ["xeno", "xipho"],
  y: ["yurei", "yotta"],
  z: ["zyro", "zen"],
};

function createLetterPage(letter: string): UsernameListingPage {
  const upper = letter.toUpperCase();
  const keywords = letterKeywords[letter];

  return {
    slug: `usernames-starting-with-${letter}`,
    title: `Usernames Starting With ${upper}`,
    seoTitle: `Usernames Starting With ${upper} - ${upper} Letter Username Ideas`,
    metaDescription: `Browse usernames starting with ${upper} from the NameLaunchpad database with copy buttons, generator tools, and related links.`,
    intro: `This page lists usernames starting with ${upper} for users who want alphabetical username ideas that still feel usable for gaming, social media, and streaming.`,
    h1: `Usernames Starting With ${upper}`,
    filters: { startsWith: letter },
    generator: { style: "cool", keywords, minLength: 6, maxLength: 11 },
    relatedLinks: [commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.usernameIdeas, commonLinks.exploreGenerators],
  };
}

const specialListingPages: UsernameListingPage[] = [
  {
    slug: "4-letter-usernames",
    title: "4 Letter Usernames",
    seoTitle: "4 Letter Usernames - Short OG Username Ideas",
    metaDescription: "Browse 4 letter usernames from the NameLaunchpad database with copy buttons, generator tools, and SEO content for short names.",
    intro: "4 letter usernames are popular because they look cleaner, feel more premium, and are easier to remember in gaming and social profiles.",
    h1: "4 Letter Usernames",
    filters: { exactLengths: [4] },
    generator: { style: "cool", keywords: ["og", "zen"], minLength: 4, maxLength: 4 },
    relatedLinks: [commonLinks.ogFinder, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.usernameIdeas],
  },
  {
    slug: "5-letter-usernames",
    title: "5 Letter Usernames",
    seoTitle: "5 Letter Usernames - Clean Short Username Ideas",
    metaDescription: "Find 5 letter usernames from the NameLaunchpad database with filtered lists, generator widgets, and related internal links.",
    intro: "5 letter usernames balance readability and rarity, making them a strong choice for users who want compact but still expressive handles.",
    h1: "5 Letter Usernames",
    filters: { exactLengths: [5] },
    generator: { style: "cool", keywords: ["nova", "kiro"], minLength: 5, maxLength: 5 },
    relatedLinks: [commonLinks.ogFinder, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.usernameIdeas],
  },
  {
    slug: "6-letter-usernames",
    title: "6 Letter Usernames",
    seoTitle: "6 Letter Usernames - Short Brandable Username Ideas",
    metaDescription: "Browse 6 letter usernames from the NameLaunchpad database with copy buttons, related pages, and generator suggestions.",
    intro: "6 letter usernames give users more room for memorable branding while still staying short enough to feel clean across platforms.",
    h1: "6 Letter Usernames",
    filters: { exactLengths: [6] },
    generator: { style: "cool", keywords: ["ghost", "viper"], minLength: 6, maxLength: 6 },
    relatedLinks: [commonLinks.ogFinder, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.usernameIdeas],
  },
  {
    slug: "short-usernames",
    title: "Short Usernames",
    seoTitle: "Short Usernames - Compact Gamer Tags and Handle Ideas",
    metaDescription: "Browse short usernames from the NameLaunchpad database with filters, copy buttons, generator widgets, and SEO content.",
    intro: "Short usernames remain some of the most searched naming ideas because they look cleaner in profiles, overlays, and gaming scoreboards.",
    h1: "Short Usernames",
    filters: { categories: ["short"], maxLength: 6 },
    generator: { style: "cool", keywords: ["short", "neo"], minLength: 4, maxLength: 6 },
    relatedLinks: [commonLinks.ogFinder, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.exploreGenerators],
  },
  {
    slug: "rare-usernames",
    title: "Rare Usernames",
    seoTitle: "Rare Usernames - Rare, Clean, and Premium Username Ideas",
    metaDescription: "Explore rare usernames from the NameLaunchpad database with copy buttons, related tools, and long-form SEO content.",
    intro: "Rare usernames feel more premium, less generic, and more useful for long-term branding across gaming and creator platforms.",
    h1: "Rare Usernames",
    filters: { categories: ["rare"], rarities: ["rare", "epic", "legendary"] },
    generator: { style: "dark", keywords: ["rare", "void"], minLength: 4, maxLength: 8 },
    relatedLinks: [commonLinks.ogFinder, commonLinks.darkGenerator, commonLinks.usernameDatabase, commonLinks.usernameGenerator],
  },
  {
    slug: "legendary-usernames",
    title: "Legendary Usernames",
    seoTitle: "Legendary Usernames - Highest Rarity Username Ideas",
    metaDescription: "Browse legendary usernames from the NameLaunchpad database with copy buttons, related links, and SEO-driven naming guidance.",
    intro: "Legendary usernames surface the highest rarity results in the NameLaunchpad database for users who want standout names first.",
    h1: "Legendary Usernames",
    filters: { rarities: ["legendary"] },
    generator: { style: "fantasy", keywords: ["legend", "myth"], minLength: 4, maxLength: 9 },
    relatedLinks: [commonLinks.usernameDatabase, commonLinks.ogFinder, commonLinks.fantasyGenerator, commonLinks.usernameGenerator],
  },
  {
    slug: "epic-usernames",
    title: "Epic Usernames",
    seoTitle: "Epic Usernames - Epic Rarity Username Ideas",
    metaDescription: "Browse epic usernames from the NameLaunchpad database with copy buttons, generator widgets, and rarity-focused SEO content.",
    intro: "Epic usernames sit between common and legendary naming patterns, which makes them useful for users who want stronger names without losing readability.",
    h1: "Epic Usernames",
    filters: { rarities: ["epic"] },
    generator: { style: "fantasy", keywords: ["epic", "storm"], minLength: 5, maxLength: 10 },
    relatedLinks: [commonLinks.rareUsernames, commonLinks.usernameDatabase, commonLinks.fantasyGenerator, commonLinks.usernameGenerator],
  },
  {
    slug: "common-usernames",
    title: "Common Usernames",
    seoTitle: "Common Usernames - Familiar and Readable Username Ideas",
    metaDescription: "Browse common usernames from the NameLaunchpad database with copy buttons, generator suggestions, and practical naming guidance.",
    intro: "Common usernames are useful when you want names that feel familiar, readable, and broadly usable before refining into rarer directions.",
    h1: "Common Usernames",
    filters: { rarities: ["common"] },
    generator: { style: "cool", keywords: ["clean", "core"], minLength: 6, maxLength: 10 },
    relatedLinks: [commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.usernameIdeas, commonLinks.exploreGenerators],
  },
  {
    slug: "anime-usernames",
    title: "Anime Usernames",
    seoTitle: "Anime Usernames - Anime Style Username Ideas",
    metaDescription: "Browse anime usernames from the NameLaunchpad database with copy buttons, generator widgets, and related anime naming pages.",
    intro: "Anime usernames work best when they feel stylish, readable, and recognizable enough to function across both gaming and social profiles.",
    h1: "Anime Usernames",
    filters: { styles: ["anime"], categories: ["anime"] },
    generator: { style: "anime", keywords: ["kage", "sakura"], minLength: 6, maxLength: 11 },
    relatedLinks: [commonLinks.animeGenerator, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.exploreGenerators],
  },
  {
    slug: "dark-usernames",
    title: "Dark Usernames",
    seoTitle: "Dark Usernames - Edgy and Dark Username Ideas",
    metaDescription: "Find dark usernames from the NameLaunchpad database with filtered name lists, copy buttons, and internal links to related tools.",
    intro: "Dark usernames remain popular with gamers and creators who want names built around shadow, void, crypt, and ominous naming patterns.",
    h1: "Dark Usernames",
    filters: { styles: ["dark"], categories: ["edgy"] },
    generator: { style: "dark", keywords: ["void", "night"], minLength: 6, maxLength: 11 },
    relatedLinks: [commonLinks.darkGenerator, commonLinks.usernameGenerator, commonLinks.rareUsernames, commonLinks.exploreGenerators],
  },
  {
    slug: "aesthetic-usernames",
    title: "Aesthetic Usernames",
    seoTitle: "Aesthetic Usernames - Soft and Stylish Username Ideas",
    metaDescription: "Browse aesthetic usernames from the NameLaunchpad database with copy buttons, a generator widget, and related aesthetic pages.",
    intro: "Aesthetic usernames are useful for users who want names that feel softer, more visual, and more flexible across creator and gaming profiles.",
    h1: "Aesthetic Usernames",
    filters: { styles: ["aesthetic"] },
    generator: { style: "aesthetic", keywords: ["luna", "aura"], minLength: 6, maxLength: 11 },
    relatedLinks: [commonLinks.aestheticGenerator, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.usernameIdeas],
  },
  {
    slug: "fantasy-usernames",
    title: "Fantasy Usernames",
    seoTitle: "Fantasy Usernames - RPG and Fantasy Name Ideas",
    metaDescription: "Find fantasy usernames from the NameLaunchpad database with copy buttons, related links, and SEO text for RPG players.",
    intro: "Fantasy usernames are especially useful for RPG players, guild members, and users who want names with mythic, magical, or heroic energy.",
    h1: "Fantasy Usernames",
    filters: { styles: ["fantasy"], categories: ["fantasy"] },
    generator: { style: "fantasy", keywords: ["dragon", "rune"], minLength: 7, maxLength: 12 },
    relatedLinks: [commonLinks.fantasyGenerator, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.exploreGenerators],
  },
  {
    slug: "streamer-usernames",
    title: "Streamer Usernames",
    seoTitle: "Streamer Usernames - Twitch, YouTube, and Creator Name Ideas",
    metaDescription: "Browse streamer usernames from the NameLaunchpad database with copy buttons, generator widgets, and related creator pages.",
    intro: "Streamer usernames need to work in overlays, social bios, thumbnails, and chat callouts, which makes readability and rhythm especially important.",
    h1: "Streamer Usernames",
    filters: { styles: ["streamer"], categories: ["social", "gaming"] },
    generator: { style: "streamer", keywords: ["live", "raid"], minLength: 7, maxLength: 12 },
    relatedLinks: [commonLinks.streamerGenerator, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.exploreGenerators],
  },
  {
    slug: "clan-usernames",
    title: "Clan Usernames",
    seoTitle: "Clan Usernames - Team and Squad Username Ideas",
    metaDescription: "Find clan usernames from the NameLaunchpad database with copy buttons, generator tools, and related multiplayer naming pages.",
    intro: "Clan usernames help teams build a consistent identity across game lobbies, Discord communities, and social channels.",
    h1: "Clan Usernames",
    filters: { categories: ["clan"] },
    generator: { style: "cool", keywords: ["clan", "legion"], minLength: 7, maxLength: 12 },
    relatedLinks: [commonLinks.clanGenerator, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.exploreGenerators],
  },
  {
    slug: "duo-usernames",
    title: "Duo Usernames",
    seoTitle: "Duo Usernames - Duo and Pair Username Ideas",
    metaDescription: "Browse duo usernames from the NameLaunchpad database with copy buttons, related links, and duo naming guidance.",
    intro: "Duo usernames help friends, teammates, and creator pairs build names that feel connected without becoming too matching or repetitive.",
    h1: "Duo Usernames",
    filters: { categories: ["duo"] },
    generator: { style: "cool", keywords: ["duo", "sync"], minLength: 7, maxLength: 12 },
    relatedLinks: [commonLinks.duoGenerator, commonLinks.clanGenerator, commonLinks.usernameDatabase, commonLinks.usernameGenerator],
  },
  {
    slug: "cute-usernames",
    title: "Cute Usernames",
    seoTitle: "Cute Usernames - Soft, Cute, and Friendly Username Ideas",
    metaDescription: "Browse cute usernames from the NameLaunchpad database with copy buttons, generator widgets, and related soft-style pages.",
    intro: "Cute usernames are useful for users who want softer handles that still feel memorable and usable across social and gaming profiles.",
    h1: "Cute Usernames",
    filters: { categories: ["cute"], styles: ["aesthetic"] },
    generator: { style: "aesthetic", keywords: ["berry", "luna"], minLength: 5, maxLength: 11 },
    relatedLinks: [commonLinks.aestheticGenerator, commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.usernameIdeas],
  },
  {
    slug: "cool-usernames",
    title: "Cool Usernames",
    seoTitle: "Cool Usernames - Cool Gamer Tags and Username Ideas",
    metaDescription: "Browse cool usernames from the NameLaunchpad database with copy buttons, related generators, and strong naming patterns.",
    intro: "Cool usernames remain popular because they stay flexible across gaming, social media, and creator branding without feeling too niche.",
    h1: "Cool Usernames",
    filters: { styles: ["cool"], categories: ["gaming", "social"] },
    generator: { style: "cool", keywords: ["nova", "ghost"], minLength: 6, maxLength: 12 },
    relatedLinks: [commonLinks.usernameGenerator, commonLinks.usernameIdeas, commonLinks.usernameDatabase, commonLinks.exploreGenerators],
  },
  {
    slug: "funny-usernames",
    title: "Funny Usernames",
    seoTitle: "Funny Usernames - Funny and Playful Username Ideas",
    metaDescription: "Browse funny usernames from the NameLaunchpad database with copy buttons, related generators, and playful naming ideas.",
    intro: "Funny usernames are useful when the goal is memorability through humor rather than pure edge or rarity.",
    h1: "Funny Usernames",
    filters: { styles: ["funny"] },
    generator: { style: "funny", keywords: ["meme", "goofy"], minLength: 6, maxLength: 12 },
    relatedLinks: [commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.usernameIdeas, commonLinks.exploreGenerators],
  },
  {
    slug: "hacker-usernames",
    title: "Hacker Usernames",
    seoTitle: "Hacker Usernames - Tech and Glitch Username Ideas",
    metaDescription: "Browse hacker usernames from the NameLaunchpad database with copy buttons, generator links, and tech-style naming guidance.",
    intro: "Hacker usernames work best when they use glitch, code, and terminal-flavored words without collapsing into unreadable nonsense.",
    h1: "Hacker Usernames",
    filters: { styles: ["hacker"] },
    generator: { style: "hacker", keywords: ["glitch", "cipher"], minLength: 6, maxLength: 11 },
    relatedLinks: [commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.darkGenerator, commonLinks.exploreGenerators],
  },
  {
    slug: "gaming-usernames",
    title: "Gaming Usernames",
    seoTitle: "Gaming Usernames - Gaming Handle and Gamertag Ideas",
    metaDescription: "Browse gaming usernames from the NameLaunchpad database with copy buttons, related generators, and category-focused naming ideas.",
    intro: "Gaming usernames help users compare broader gamer-handle directions before narrowing into a specific game or platform.",
    h1: "Gaming Usernames",
    filters: { categories: ["gaming"] },
    generator: { style: "cool", keywords: ["gaming", "rider"], minLength: 6, maxLength: 12 },
    relatedLinks: [commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.usernameIdeas, commonLinks.exploreGenerators],
  },
  {
    slug: "social-usernames",
    title: "Social Usernames",
    seoTitle: "Social Usernames - Social Media Handle Ideas",
    metaDescription: "Browse social usernames from the NameLaunchpad database with copy buttons, related generators, and social-first naming ideas.",
    intro: "Social usernames prioritize readability, memorability, and visual clarity for bios, profiles, and creator handles.",
    h1: "Social Usernames",
    filters: { categories: ["social"] },
    generator: { style: "aesthetic", keywords: ["social", "glow"], minLength: 6, maxLength: 12 },
    relatedLinks: [commonLinks.usernameGenerator, commonLinks.usernameDatabase, commonLinks.streamerGenerator, commonLinks.exploreGenerators],
  },
];

export const usernameListingPages: UsernameListingPage[] = [
  ...Object.keys(letterKeywords).map(createLetterPage),
  ...specialListingPages,
];

export const usernameListingSlugs = usernameListingPages.map((page) => page.slug);

export function getUsernameListingPage(slug: string) {
  return usernameListingPages.find((page) => page.slug === slug);
}

function matchesPage(record: UsernameRecord, page: UsernameListingPage) {
  const { filters } = page;
  if (filters.startsWith && !record.name.toLowerCase().startsWith(filters.startsWith.toLowerCase())) return false;
  if (filters.exactLengths && !filters.exactLengths.includes(record.length)) return false;
  if (typeof filters.maxLength === "number" && record.length > filters.maxLength) return false;
  if (filters.styles && !filters.styles.includes(record.style)) return false;
  if (filters.rarities && !filters.rarities.includes(record.rarity)) return false;
  if (filters.categories && !filters.categories.includes(record.category)) return false;
  return true;
}

export function getUsernameListingRecords(page: UsernameListingPage, limit = 120) {
  return getAllUsernameDatabaseRecords()
    .filter((record) => matchesPage(record, page))
    .sort((left, right) => {
      if (left.length !== right.length) return left.length - right.length;
      return left.name.localeCompare(right.name);
    })
    .slice(0, limit);
}

export function buildUsernameListingSeoContent(page: UsernameListingPage) {
  const filterSummary = [
    page.filters.startsWith ? `names starting with ${page.filters.startsWith.toUpperCase()}` : null,
    page.filters.exactLengths ? `${page.filters.exactLengths.join(" or ")} character usernames` : null,
    typeof page.filters.maxLength === "number" ? `names up to ${page.filters.maxLength} characters` : null,
    page.filters.styles?.length ? `${page.filters.styles.join(", ")} style usernames` : null,
    page.filters.rarities?.length ? `${page.filters.rarities.join(", ")} rarity results` : null,
    page.filters.categories?.length ? `${page.filters.categories.join(", ")} category names` : null,
  ]
    .filter(Boolean)
    .join(", ");
  const keywordSummary = page.generator.keywords.join(", ");
  const relatedSummary = page.relatedLinks.map((link) => link.title).slice(0, 3).join(", ");

  return [
    `${page.title} pages are most useful when the filter itself is the reason you are searching. This page narrows the larger NameLaunchpad database down to ${filterSummary || "one clear naming pattern"}, which makes the results more practical than a broad dump of unrelated usernames. Users looking for this kind of page usually already know something about the shape they want.`,
    `When comparing ${page.title.toLowerCase()}, look at how the names behave in real contexts, not just in a list. The strongest options still read cleanly in profile headers, overlays, friend lists, and chat panels. This page leans on generator seeds such as ${keywordSummary}, so the names feel closer to the intent behind the filter instead of drifting into generic combinations.`,
    `This page also works best as part of a workflow. You can use the filtered list to identify the pattern you actually like, then use the built-in generator widget to expand from that direction. If the current list is too narrow, the related pages such as ${relatedSummary} help you step sideways into adjacent naming styles without starting over.`,
  ].join(" ");
}
