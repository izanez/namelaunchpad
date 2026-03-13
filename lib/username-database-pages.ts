import type {
  UsernameDatabaseCategory,
  UsernameDatabaseStyle,
  UsernameLengthBucket,
  UsernameRarity,
} from "@/lib/username-database";

export type UsernameDatabasePageDefinition = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  keywords: string[];
  categories?: UsernameDatabaseCategory[];
  styles?: UsernameDatabaseStyle[];
  rarities?: UsernameRarity[];
  lengths?: UsernameLengthBucket[];
  featuredLinks: Array<{
    title: string;
    href: string;
    description: string;
  }>;
};

function createPage(definition: UsernameDatabasePageDefinition): UsernameDatabasePageDefinition {
  return definition;
}

export const usernameDatabasePages: UsernameDatabasePageDefinition[] = [
  createPage({
    slug: "gaming-usernames",
    title: "Gaming Usernames Database",
    seoTitle: "Gaming Usernames Database - Gaming Handle and Gamertag Ideas",
    description: "Browse gaming usernames from the NameLaunchpad database with category filters, copy buttons, and gaming-first naming ideas.",
    intro: "This fixed database page narrows the 50,000-name library down to gaming usernames so users can compare broader gamer-handle patterns before moving into specific game generators.",
    keywords: ["gaming usernames", "gamer handles", "gaming database", "gamertag ideas"],
    categories: ["gaming"],
    featuredLinks: [
      { title: "Username Generator", href: "/username-generator", description: "Generate more gaming usernames with style and length filters." },
      { title: "Gamer Tag Generator", href: "/gamer-tag-generator", description: "Create broader cross-platform gamer tags for console and PC." },
      { title: "Top Generators", href: "/top-generators", description: "Compare the most used generator pages across the site." },
      { title: "Rare Usernames", href: "/username-database/rare-usernames", description: "Move into rarer gaming handle directions without leaving the database." },
    ],
  }),
  createPage({
    slug: "social-usernames",
    title: "Social Usernames Database",
    seoTitle: "Social Usernames Database - Social Media Handle Ideas",
    description: "Browse social usernames from the NameLaunchpad database with copy buttons, filters, and social-first naming patterns.",
    intro: "This page focuses the username database on social-first handles for profiles, creator accounts, and multi-platform naming research.",
    keywords: ["social usernames", "social media handles", "creator usernames", "username database"],
    categories: ["social"],
    featuredLinks: [
      { title: "Username Generator", href: "/username-generator", description: "Generate more social-ready usernames with style presets." },
      { title: "Streamer Usernames", href: "/username-database/streamer-usernames", description: "Browse more creator-focused names inside the database." },
      { title: "TikTok Username Ideas", href: "/tiktok-username-ideas", description: "Jump into TikTok-focused programmatic SEO pages." },
      { title: "Search Generators", href: "/search?q=social", description: "Search related social and creator generator pages." },
    ],
  }),
  createPage({
    slug: "anime-usernames",
    title: "Anime Usernames Database",
    seoTitle: "Anime Usernames Database - Anime Style Username Ideas",
    description: "Browse anime usernames from the NameLaunchpad database with anime style filters, copy buttons, and related anime naming pages.",
    intro: "This fixed database page is built for anime-inspired names that stay readable as real usernames instead of collapsing into random stylized filler.",
    keywords: ["anime usernames", "anime username database", "stylized usernames", "anime handle ideas"],
    categories: ["anime"],
    styles: ["anime"],
    featuredLinks: [
      { title: "Anime Username Generator", href: "/generators/anime-username-generator", description: "Generate more anime usernames with stylized naming patterns." },
      { title: "Fantasy Name Generator", href: "/fantasy-name-generator", description: "Compare anime directions with broader fantasy naming." },
      { title: "Aesthetic Usernames", href: "/username-database/aesthetic-usernames", description: "Move into softer adjacent styles without losing readability." },
      { title: "Anime Username Guide", href: "/anime-username-guide", description: "Open a dedicated SEO page for anime username ideas and examples." },
    ],
  }),
  createPage({
    slug: "rare-usernames",
    title: "Rare Usernames Database",
    seoTitle: "Rare Usernames Database - Rare, Clean, and Premium Username Ideas",
    description: "Browse rare usernames from the NameLaunchpad database with rarity filters, copy buttons, and related rare-name tools.",
    intro: "This page narrows the full username database down to rarer results so users can compare cleaner and more premium-looking name directions without generic noise.",
    keywords: ["rare usernames", "rare username database", "clean usernames", "premium usernames"],
    categories: ["rare"],
    rarities: ["rare", "epic", "legendary"],
    featuredLinks: [
      { title: "OG Username Finder", href: "/og-username-finder", description: "Find shorter rare names with 4 to 5 character bias." },
      { title: "Rare Username Generator", href: "/generators/rare-username-generator", description: "Open the dedicated rare username generator page." },
      { title: "Legendary Usernames", href: "/username-database/legendary-usernames", description: "Jump into the highest-rarity filter page." },
      { title: "Rare Gamertags", href: "/rare-gamertags", description: "Open a rare-name SEO page with more examples and links." },
    ],
  }),
  createPage({
    slug: "legendary-usernames",
    title: "Legendary Usernames Database",
    seoTitle: "Legendary Usernames Database - Highest Rarity Username Ideas",
    description: "Browse legendary usernames from the NameLaunchpad database with copy buttons, rarity filters, and related rare-name pages.",
    intro: "This page surfaces the highest-rarity names in the database for users who want the most standout handles first.",
    keywords: ["legendary usernames", "legendary username database", "rare handles", "premium usernames"],
    rarities: ["legendary"],
    featuredLinks: [
      { title: "Rare Usernames", href: "/username-database/rare-usernames", description: "Step back into broader rare-name results." },
      { title: "Fantasy Usernames", href: "/username-database/fantasy-usernames", description: "Compare legendary naming with mythic fantasy directions." },
      { title: "OG Username Finder", href: "/og-username-finder", description: "Compare legendary names with shorter premium-looking handles." },
      { title: "Legendary Usernames Guide", href: "/blog/legendary-usernames", description: "Read a long-form article about legendary username ideas." },
    ],
  }),
  createPage({
    slug: "short-usernames",
    title: "Short Usernames Database",
    seoTitle: "Short Usernames Database - Short Username and Gamertag Ideas",
    description: "Browse short usernames from the NameLaunchpad database with copy buttons, short-length filters, and OG-style naming pages.",
    intro: "This page narrows the database down to short usernames for users who care more about compact, cleaner naming than longer descriptive handles.",
    keywords: ["short usernames", "short username database", "short gamertags", "og usernames"],
    categories: ["short"],
    lengths: ["short"],
    featuredLinks: [
      { title: "OG Username Finder", href: "/og-username-finder", description: "Find even cleaner 4 to 5 character names." },
      { title: "Short Gamer Names", href: "/short-gamer-names", description: "Open the short-name SEO page with more examples." },
      { title: "4 Letter Usernames", href: "/4-letter-usernames", description: "Jump into the stricter 4-character listing page." },
      { title: "Short Gamertag Ideas", href: "/short-gamertag-ideas", description: "See programmatic pages focused on short gamertags." },
    ],
  }),
  createPage({
    slug: "cool-usernames",
    title: "Cool Usernames Database",
    seoTitle: "Cool Usernames Database - Cool Gamer Tags and Username Ideas",
    description: "Browse cool usernames from the NameLaunchpad database with cool-style filters, copy buttons, and related generator pages.",
    intro: "This fixed database page focuses on cool usernames that stay flexible across gaming, streaming, and social profiles without drifting into cluttered naming.",
    keywords: ["cool usernames", "cool username database", "cool gamer tags", "clean handles"],
    styles: ["cool"],
    featuredLinks: [
      { title: "Cool Username Generator", href: "/generators/cool-username-generator", description: "Generate more cool usernames with sharper naming patterns." },
      { title: "Cool Usernames for Gamers", href: "/cool-usernames-for-gamers", description: "Open the SEO page with more cool examples and generator links." },
      { title: "Gaming Usernames", href: "/username-database/gaming-usernames", description: "Move into broader gaming-focused database results." },
      { title: "Username Ideas", href: "/username-ideas", description: "Browse a large visual gallery of generated username ideas." },
    ],
  }),
  createPage({
    slug: "aesthetic-usernames",
    title: "Aesthetic Usernames Database",
    seoTitle: "Aesthetic Usernames Database - Soft and Stylish Username Ideas",
    description: "Browse aesthetic usernames from the NameLaunchpad database with copy buttons, style filters, and related aesthetic naming pages.",
    intro: "This page narrows the full database into aesthetic-style names for users who want softer and more visual handles across social and creator contexts.",
    keywords: ["aesthetic usernames", "aesthetic username database", "soft handles", "stylish usernames"],
    styles: ["aesthetic"],
    featuredLinks: [
      { title: "Aesthetic Username Generator", href: "/generators/aesthetic-username-generator", description: "Generate more soft and stylish username ideas." },
      { title: "Cute Usernames", href: "/username-database/cute-usernames", description: "Move into the softer cute-name side of the database." },
      { title: "Aesthetic Username Ideas", href: "/aesthetic-username-ideas", description: "Open the programmatic SEO page for more aesthetic naming ideas." },
      { title: "Username Ideas for Girls", href: "/blog/username-ideas-for-girls", description: "Read a related long-form article with examples." },
    ],
  }),
  createPage({
    slug: "dark-usernames",
    title: "Dark Usernames Database",
    seoTitle: "Dark Usernames Database - Dark and Edgy Username Ideas",
    description: "Browse dark usernames from the NameLaunchpad database with copy buttons, style filters, and related dark-name pages.",
    intro: "This page narrows the database into darker naming patterns built around shadow, void, crypt, and more ominous visual tone.",
    keywords: ["dark usernames", "dark username database", "edgy usernames", "shadow names"],
    styles: ["dark"],
    categories: ["edgy"],
    featuredLinks: [
      { title: "Dark Username Generator", href: "/generators/dark-username-generator", description: "Generate more dark and edgy usernames." },
      { title: "Rare Usernames", href: "/username-database/rare-usernames", description: "Move into rarer dark-adjacent names without losing tone." },
      { title: "Dark Usernames Article", href: "/blog/dark-usernames", description: "Read the related long-form dark username guide." },
      { title: "Demon Name Guide", href: "/demon-name-guide", description: "Open a darker fantasy SEO page for adjacent naming ideas." },
    ],
  }),
  createPage({
    slug: "fantasy-usernames",
    title: "Fantasy Usernames Database",
    seoTitle: "Fantasy Usernames Database - RPG and Fantasy Username Ideas",
    description: "Browse fantasy usernames from the NameLaunchpad database with copy buttons, fantasy filters, and related RPG naming pages.",
    intro: "This fixed database page helps RPG players and fantasy fans compare mythic, magical, and heroic usernames without leaving the main database system.",
    keywords: ["fantasy usernames", "fantasy username database", "rpg usernames", "mythic names"],
    styles: ["fantasy"],
    categories: ["fantasy"],
    featuredLinks: [
      { title: "Fantasy Name Generator", href: "/fantasy-name-generator", description: "Generate more RPG and fantasy-style names directly." },
      { title: "Dragon Name Ideas", href: "/dragon-name-ideas", description: "Open a dragon-focused fantasy SEO page." },
      { title: "Elf Name Guide", href: "/elf-name-guide", description: "See a softer fantasy naming page with elf-style ideas." },
      { title: "Legendary Usernames", href: "/username-database/legendary-usernames", description: "Compare mythic fantasy names with the highest-rarity usernames." },
    ],
  }),
  createPage({
    slug: "streamer-usernames",
    title: "Streamer Usernames Database",
    seoTitle: "Streamer Usernames Database - Twitch, YouTube, and Creator Name Ideas",
    description: "Browse streamer usernames from the NameLaunchpad database with copy buttons, creator filters, and related streamer naming pages.",
    intro: "This page narrows the database into streamer-style usernames for users who care about overlays, channel names, clip titles, and creator branding.",
    keywords: ["streamer usernames", "creator usernames", "twitch handles", "youtube gaming names"],
    styles: ["streamer"],
    featuredLinks: [
      { title: "Streamer Name Generator", href: "/generators/streamer-name-generator", description: "Generate more creator-friendly names and live handles." },
      { title: "Twitch Streamer Name Ideas", href: "/twitch-streamer-name-ideas", description: "Open a Twitch-focused programmatic SEO page." },
      { title: "YouTube Gaming Name Guide", href: "/youtube-gaming-name-guide", description: "See a creator-first SEO page for channel branding." },
      { title: "Top Generators", href: "/top-generators", description: "Compare the most used naming tools across the site." },
    ],
  }),
  createPage({
    slug: "cute-usernames",
    title: "Cute Usernames Database",
    seoTitle: "Cute Usernames Database - Cute, Soft, and Friendly Username Ideas",
    description: "Browse cute usernames from the NameLaunchpad database with copy buttons, soft-style filters, and related cute naming pages.",
    intro: "This page narrows the username database into cute and softer handles for users who want more friendly and visually lighter naming patterns.",
    keywords: ["cute usernames", "cute username database", "soft usernames", "friendly handles"],
    categories: ["cute"],
    styles: ["aesthetic"],
    featuredLinks: [
      { title: "Aesthetic Username Generator", href: "/generators/aesthetic-username-generator", description: "Generate more soft and cute-adjacent names." },
      { title: "Aesthetic Usernames", href: "/username-database/aesthetic-usernames", description: "Move into broader aesthetic name ideas." },
      { title: "Cool Roblox Usernames", href: "/blog/cool-roblox-usernames", description: "Read a related article with softer and playful naming examples." },
      { title: "Cute Usernames Article", href: "/blog/cute-usernames", description: "Open the dedicated article for cute username ideas." },
    ],
  }),
];

export const usernameDatabasePageSlugs = usernameDatabasePages.map((page) => page.slug);

export function getUsernameDatabasePage(slug: string) {
  return usernameDatabasePages.find((page) => page.slug === slug);
}
