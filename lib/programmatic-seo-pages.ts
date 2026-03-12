export type ProgrammaticSeoPage = {
  slug: string;
  title: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  style: "cool" | "aesthetic" | "dark" | "funny" | "fantasy" | "hacker" | "anime" | "streamer";
  keywords: string[];
  length: {
    min: number;
    max: number;
  };
  usernameCount: number;
  generatorLinks: Array<{
    title: string;
    href: string;
    description: string;
  }>;
  comparisonSection?: {
    title: string;
    intro: string;
    generators: Array<{
      title: string;
      href: string;
      description: string;
      examples: string[];
    }>;
  };
  content: Array<{
    heading: string;
    body: string;
  }>;
};

type Style = ProgrammaticSeoPage["style"];
type LinkCard = ProgrammaticSeoPage["generatorLinks"][number];

type SinglePageSeed = {
  slug: string;
  title: string;
  theme: string;
  audience: string;
  platform: string;
  style: Style;
  keywords: string[];
  length: { min: number; max: number };
  usernameCount: number;
  generatorLinks: LinkCard[];
  comparisonSection?: ProgrammaticSeoPage["comparisonSection"];
};

type TriplePageSeed = {
  slugBase: string;
  baseTitle: string;
  theme: string;
  audience: string;
  platform: string;
  style: Style;
  keywords: string[];
  length: { min: number; max: number };
  generatorLinks: LinkCard[];
};

const singlePageSeeds: SinglePageSeed[] = [
  {
    slug: "cool-usernames-for-gamers",
    title: "Cool Usernames for Gamers",
    theme: "modern, competitive, and reusable gamer handles",
    audience: "gamers who want cleaner cross-platform names",
    platform: "Gaming",
    style: "cool",
    keywords: ["nova", "cyber", "ghost"],
    length: { min: 7, max: 12 },
    usernameCount: 80,
    generatorLinks: [
      { title: "Username Generator", href: "/username-generator", description: "Generate more cool usernames with filters for style and length." },
      { title: "Gamer Tag Generator", href: "/gamer-tag-generator", description: "Create broader cross-platform gamer tags for console and PC." },
      { title: "Cool Username Generator", href: "/generators/cool-username-generator", description: "Open the dedicated cool username generator landing page." },
    ],
  },
  {
    slug: "best-fortnite-usernames",
    title: "Best Fortnite Usernames",
    theme: "battle-ready Fortnite tags that still work for clips and socials",
    audience: "Fortnite players and creators",
    platform: "Fortnite",
    style: "cool",
    keywords: ["storm", "loot", "victory"],
    length: { min: 7, max: 13 },
    usernameCount: 80,
    generatorLinks: [
      { title: "Fortnite Name Generator", href: "/fortnite-name-generator", description: "Generate more Fortnite-style usernames instantly." },
      { title: "Fortnite SEO Generator Page", href: "/generators/fortnite-name-generator", description: "Open the dedicated Fortnite landing page with more examples." },
      { title: "Clan Name Generator", href: "/clan-name-generator", description: "Create Fortnite squad and clan names." },
    ],
  },
  {
    slug: "rare-gamertags",
    title: "Rare Gamertags",
    theme: "shorter, cleaner, and rarer-looking gamer names",
    audience: "players chasing uncommon handles",
    platform: "Rare Names",
    style: "dark",
    keywords: ["void", "og", "shade"],
    length: { min: 4, max: 8 },
    usernameCount: 72,
    generatorLinks: [
      { title: "OG Username Finder", href: "/og-username-finder", description: "Find shorter 4 to 5 character usernames." },
      { title: "Username Generator", href: "/username-generator", description: "Generate more rare-style names using dark and short filters." },
      { title: "Rare Username Generator", href: "/generators/rare-username-generator", description: "Open the dedicated rare username landing page." },
    ],
  },
  {
    slug: "short-gamer-names",
    title: "Short Gamer Names",
    theme: "compact gamer tags that feel clean in overlays and scoreboards",
    audience: "players who want premium short names",
    platform: "Short Names",
    style: "cool",
    keywords: ["neo", "zyro", "xeno"],
    length: { min: 4, max: 6 },
    usernameCount: 72,
    generatorLinks: [
      { title: "Username Generator", href: "/username-generator", description: "Use the short length filter to generate compact names." },
      { title: "OG Username Finder", href: "/og-username-finder", description: "Browse short rare usernames focused on 4 to 5 characters." },
      { title: "Username Ideas", href: "/username-ideas", description: "Explore the larger username inspiration gallery for more styles." },
    ],
  },
  {
    slug: "unique-username-ideas",
    title: "Unique Username Ideas",
    theme: "fresh names that avoid repetitive and generic handle patterns",
    audience: "gamers and creators who want more distinct branding",
    platform: "General Usernames",
    style: "aesthetic",
    keywords: ["aura", "echo", "velvet"],
    length: { min: 7, max: 12 },
    usernameCount: 80,
    generatorLinks: [
      { title: "Username Generator", href: "/username-generator", description: "Generate unique usernames with style and keyword filters." },
      { title: "Search Generators", href: "/search", description: "Search related generator pages for more niche naming styles." },
      { title: "All Generators", href: "/all-generators", description: "Browse all available generator tools and naming pages." },
    ],
  },
];

const triplePageSeeds: TriplePageSeed[] = [
  {
    slugBase: "minecraft-username",
    baseTitle: "Minecraft Username",
    theme: "blocky, creative, and survival-ready names",
    audience: "builders and survival players",
    platform: "Minecraft",
    style: "cool",
    keywords: ["minecraft", "block", "craft", "creeper"],
    length: { min: 6, max: 13 },
    generatorLinks: [
      { title: "Minecraft Name Generator", href: "/generators/minecraft-name-generator", description: "Generate more Minecraft-style usernames and block-themed handles." },
      { title: "Username Generator", href: "/username-generator", description: "Broaden the naming style with keywords and length filters." },
      { title: "Rare Username Generator", href: "/generators/rare-username-generator", description: "Compare Minecraft names with rarer and cleaner handle directions." },
    ],
  },
  {
    slugBase: "valorant-username",
    baseTitle: "Valorant Username",
    theme: "sharp, tactical, and ranked-ready tags",
    audience: "ranked and competitive players",
    platform: "Valorant",
    style: "dark",
    keywords: ["valorant", "ace", "viper", "phantom"],
    length: { min: 5, max: 11 },
    generatorLinks: [
      { title: "Valorant Name Generator", href: "/generators/valorant-name-generator", description: "Generate tactical Valorant-style names with cleaner shooter energy." },
      { title: "Gamer Tag Generator", href: "/gamer-tag-generator", description: "Find broader cross-platform gamertags that still fit Valorant." },
      { title: "Rare Username Generator", href: "/generators/rare-username-generator", description: "Compare sharper, more minimal rare-name directions." },
    ],
  },
  {
    slugBase: "discord-username",
    baseTitle: "Discord Username",
    theme: "server-friendly, readable names for community and social use",
    audience: "Discord users and community builders",
    platform: "Discord",
    style: "cool",
    keywords: ["discord", "server", "voice", "chat"],
    length: { min: 5, max: 12 },
    generatorLinks: [
      { title: "Discord Username Generator", href: "/generators/discord-username-generator", description: "Generate Discord-friendly usernames for chats and communities." },
      { title: "Clan Name Generator", href: "/clan-name-generator", description: "Create matching names for Discord clans and teams." },
      { title: "Username Generator", href: "/username-generator", description: "Generate more general social or gaming handles with filters." },
    ],
  },
  {
    slugBase: "tiktok-username",
    baseTitle: "TikTok Username",
    theme: "short, memorable, creator-friendly names for fast discovery",
    audience: "short-form creators",
    platform: "TikTok",
    style: "aesthetic",
    keywords: ["tiktok", "trend", "glow", "clip"],
    length: { min: 5, max: 11 },
    generatorLinks: [
      { title: "TikTok Username Generator", href: "/generators/tiktok-username-generator", description: "Generate TikTok-friendly handles for creator branding." },
      { title: "Aesthetic Username Generator", href: "/generators/aesthetic-username-generator", description: "Explore softer aesthetic naming directions." },
      { title: "Search Generators", href: "/search?q=tiktok", description: "Open more social-media naming pages instantly." },
    ],
  },
  {
    slugBase: "aesthetic-username",
    baseTitle: "Aesthetic Username",
    theme: "soft, stylish, and visually clean handle ideas",
    audience: "social and creator users",
    platform: "Aesthetic",
    style: "aesthetic",
    keywords: ["luna", "velvet", "glow", "echo"],
    length: { min: 6, max: 11 },
    generatorLinks: [
      { title: "Aesthetic Username Generator", href: "/generators/aesthetic-username-generator", description: "Generate softer and more visual username ideas." },
      { title: "Username Generator", href: "/username-generator", description: "Combine aesthetic words with the main generator filters." },
      { title: "Username Ideas", href: "/username-ideas", description: "Browse thousands of names grouped by style." },
    ],
  },
  {
    slugBase: "short-gamertag",
    baseTitle: "Short Gamertag",
    theme: "compact, premium-looking tags with stronger recall",
    audience: "players chasing clean short names",
    platform: "Short Names",
    style: "cool",
    keywords: ["short", "og", "nova", "kiro"],
    length: { min: 4, max: 6 },
    generatorLinks: [
      { title: "OG Username Finder", href: "/og-username-finder", description: "Find shorter 4 to 5 character names first." },
      { title: "Username Generator", href: "/username-generator", description: "Use the short length filter to generate more names." },
      { title: "Short Usernames", href: "/short-usernames", description: "Browse filtered short usernames from the database." },
    ],
  },
  {
    slugBase: "rare-username",
    baseTitle: "Rare Username",
    theme: "rarer-looking, cleaner names with premium visual weight",
    audience: "users chasing uncommon handles",
    platform: "Rare Names",
    style: "dark",
    keywords: ["rare", "void", "shade", "zen"],
    length: { min: 4, max: 8 },
    generatorLinks: [
      { title: "Rare Username Generator", href: "/generators/rare-username-generator", description: "Open the dedicated rare username page for deeper ideas." },
      { title: "Rare Usernames", href: "/rare-usernames", description: "Browse filtered rare usernames from the database." },
      { title: "OG Username Finder", href: "/og-username-finder", description: "Compare rare names with even shorter OG-style options." },
    ],
  },
  {
    slugBase: "cool-usernames",
    baseTitle: "Cool Usernames",
    theme: "clean, competitive, and widely reusable handles",
    audience: "gamers and creators",
    platform: "Cool Names",
    style: "cool",
    keywords: ["shadow", "nova", "ghost", "cyber"],
    length: { min: 6, max: 12 },
    generatorLinks: [
      { title: "Cool Username Generator", href: "/generators/cool-username-generator", description: "Generate cool usernames with sharper naming patterns." },
      { title: "Username Generator", href: "/username-generator", description: "Use the main generator for more style control." },
      { title: "Cool Usernames", href: "/cool-usernames", description: "Browse the filtered cool usernames listing page." },
    ],
  },
  {
    slugBase: "funny-gamer-tag",
    baseTitle: "Funny Gamer Tag",
    theme: "memorable, goofy, and intentionally playful tags",
    audience: "casual players and friend groups",
    platform: "Funny Names",
    style: "funny",
    keywords: ["funny", "meme", "goofy", "wobble"],
    length: { min: 6, max: 12 },
    generatorLinks: [
      { title: "Funny Gamer Tag Generator", href: "/generators/funny-gamer-tag-generator", description: "Open the funny gamer tag landing page for more playful names." },
      { title: "Username Generator", href: "/username-generator", description: "Mix funny seeds with the main username generator." },
      { title: "Funny Usernames", href: "/funny-usernames", description: "Browse filtered funny usernames from the database." },
    ],
  },
  {
    slugBase: "anime-username",
    baseTitle: "Anime Username",
    theme: "stylized handles with readable anime-inspired vocabulary",
    audience: "anime fans and stylized profile builders",
    platform: "Anime",
    style: "anime",
    keywords: ["anime", "ronin", "kitsune", "akira"],
    length: { min: 5, max: 12 },
    generatorLinks: [
      { title: "Anime Username Generator", href: "/generators/anime-username-generator", description: "Generate anime usernames with stylized naming patterns." },
      { title: "Fantasy Name Generator", href: "/fantasy-name-generator", description: "Compare anime directions with fantasy-style naming." },
      { title: "Anime Usernames", href: "/anime-usernames", description: "Browse filtered anime usernames from the database." },
    ],
  },
  {
    slugBase: "dragon-name",
    baseTitle: "Dragon Name",
    theme: "mythic fantasy names with larger, more dramatic energy",
    audience: "RPG players and fantasy fans",
    platform: "Fantasy",
    style: "fantasy",
    keywords: ["dragon", "wyrm", "ember", "scale"],
    length: { min: 7, max: 13 },
    generatorLinks: [
      { title: "Fantasy Name Generator", href: "/fantasy-name-generator", description: "Generate more fantasy-style names and RPG aliases." },
      { title: "Dragon Name Generator", href: "/generators/dragon-name-generator", description: "Open the dragon-specific generator landing page." },
      { title: "Fantasy Usernames", href: "/fantasy-usernames", description: "Browse filtered fantasy usernames from the database." },
    ],
  },
  {
    slugBase: "demon-name",
    baseTitle: "Demon Name",
    theme: "dark fantasy names with stronger menace and gothic tone",
    audience: "dark fantasy users",
    platform: "Dark Fantasy",
    style: "dark",
    keywords: ["demon", "abyss", "inferno", "fang"],
    length: { min: 6, max: 12 },
    generatorLinks: [
      { title: "Demon Name Generator", href: "/generators/demon-name-generator", description: "Generate demon-inspired names and darker fantasy aliases." },
      { title: "Fantasy Name Generator", href: "/fantasy-name-generator", description: "Compare demon names with broader fantasy results." },
      { title: "Dark Usernames", href: "/dark-usernames", description: "Browse dark usernames with similar tone." },
    ],
  },
  {
    slugBase: "elf-name",
    baseTitle: "Elf Name",
    theme: "elegant fantasy names with lighter, more graceful rhythm",
    audience: "RPG and fantasy roleplay users",
    platform: "Fantasy",
    style: "fantasy",
    keywords: ["elf", "luna", "ael", "rune"],
    length: { min: 6, max: 12 },
    generatorLinks: [
      { title: "Elf Name Generator", href: "/generators/elf-name-generator", description: "Generate elf-inspired names for RPG profiles and stories." },
      { title: "Fantasy Name Generator", href: "/fantasy-name-generator", description: "Generate more broad fantasy names and aliases." },
      { title: "Aesthetic Usernames", href: "/aesthetic-usernames", description: "Compare softer elegant handle styles." },
    ],
  },
  {
    slugBase: "duo-gamertag",
    baseTitle: "Duo Gamertag",
    theme: "paired tags for teammates, co-creators, and duos",
    audience: "duos and friend pairs",
    platform: "Duo Names",
    style: "cool",
    keywords: ["duo", "sync", "link", "pair"],
    length: { min: 7, max: 12 },
    generatorLinks: [
      { title: "Duo Gamertag Generator", href: "/generators/duo-gamertag-generator", description: "Generate names that fit duos, pairs, and linked gamer identities." },
      { title: "Clan Name Generator", href: "/clan-name-generator", description: "Move from duo names to wider team naming if needed." },
      { title: "Duo Usernames", href: "/duo-usernames", description: "Browse filtered duo usernames from the database." },
    ],
  },
  {
    slugBase: "clan-name",
    baseTitle: "Clan Name",
    theme: "group names that feel stronger, more cohesive, and reusable",
    audience: "teams, squads, and communities",
    platform: "Clan Names",
    style: "fantasy",
    keywords: ["clan", "legion", "syndicate", "wolves"],
    length: { min: 8, max: 15 },
    generatorLinks: [
      { title: "Clan Name Generator", href: "/clan-name-generator", description: "Generate clan and team names for squads and communities." },
      { title: "Clan Name Generator Landing Page", href: "/generators/clan-name-generator", description: "Open the SEO landing page for clan and team naming." },
      { title: "Clan Usernames", href: "/clan-usernames", description: "Browse filtered clan usernames with similar energy." },
    ],
  },
  {
    slugBase: "hacker-username",
    baseTitle: "Hacker Username",
    theme: "tech-heavy names with glitch, code, and terminal energy",
    audience: "tech users and darker branding fans",
    platform: "Hacker Style",
    style: "hacker",
    keywords: ["glitch", "byte", "cipher", "root"],
    length: { min: 6, max: 11 },
    generatorLinks: [
      { title: "Hacker Username Generator", href: "/generators/hacker-username-generator", description: "Generate hacker-style usernames with stronger tech vocabulary." },
      { title: "Username Generator", href: "/username-generator", description: "Use the main generator with hacker style enabled." },
      { title: "Hacker Usernames", href: "/hacker-usernames", description: "Browse filtered hacker usernames from the database." },
    ],
  },
];

const tripleVariants = [
  { slugSuffix: "ideas", titlePrefix: "", titleSuffix: " Ideas", seoSuffix: "Ideas, Examples, and Generator Links", lead: "Browse", introLead: "This page collects" },
  { slugSuffix: "list", titlePrefix: "Best ", titleSuffix: " List", seoSuffix: "List, Examples, and Naming Tips", lead: "Explore", introLead: "This page organizes" },
  { slugSuffix: "guide", titlePrefix: "Unique ", titleSuffix: " Guide", seoSuffix: "Guide, Tips, and Generator Paths", lead: "Find", introLead: "This page focuses on" },
] as const;

function buildContent(theme: string, audience: string, platform: string, keywords: string[], label: string) {
  return [
    {
      heading: `Why ${label.toLowerCase()} match real search intent`,
      body: `${label} pages work best when they stay close to what users actually want. People landing here are usually looking for ${theme}, not a generic dump of random names. This page is tuned for ${audience}, so the examples, keyword direction, and generator links all stay aligned with that practical goal.`,
    },
    {
      heading: `How to pick better ${platform.toLowerCase()} names`,
      body: `For ${platform.toLowerCase()} naming, the strongest results are readable first and distinctive second. That is why this page leans on topic words like ${keywords.join(", ")}. Those words already carry the right signal, so the generated examples feel more native to the niche.`,
    },
    {
      heading: `How this page supports deeper discovery`,
      body: `A useful SEO page should help users continue the journey, not dead-end them. This page connects topic-relevant username ideas with generator pages that push the same naming direction further. That improves usability and crawl depth at the same time.`,
    },
  ];
}

function buildSinglePage(seed: SinglePageSeed): ProgrammaticSeoPage {
  return {
    slug: seed.slug,
    title: seed.title,
    seoTitle: `${seed.title} - Name Ideas, Examples, and Generator Links`,
    metaDescription: `Browse ${seed.title.toLowerCase()} with ${seed.theme}, direct generator links, and practical naming advice for ${seed.audience}.`,
    intro: `This page focuses on ${seed.title.toLowerCase()} for users who want ${seed.theme}. The examples stay close to real naming intent instead of drifting into filler combinations.`,
    style: seed.style,
    keywords: [...seed.keywords, seed.platform.toLowerCase(), "NameLaunchpad"],
    length: seed.length,
    usernameCount: seed.usernameCount,
    generatorLinks: seed.generatorLinks,
    comparisonSection: seed.comparisonSection,
    content: buildContent(seed.theme, seed.audience, seed.platform, seed.keywords, seed.title),
  };
}

function buildTriplePages(seed: TriplePageSeed): ProgrammaticSeoPage[] {
  return tripleVariants.map((variant, index) => {
    const title = `${variant.titlePrefix}${seed.baseTitle}${variant.titleSuffix}`.replace(/\s+/g, " ").trim();

    return {
      slug: `${seed.slugBase}-${variant.slugSuffix}`,
      title,
      seoTitle: `${title} - ${variant.seoSuffix}`,
      metaDescription: `${variant.lead} ${seed.baseTitle.toLowerCase()} with ${seed.theme}, direct generator links, and practical naming advice for ${seed.audience}.`,
      intro: `${variant.introLead} ${seed.baseTitle.toLowerCase()} for users who want ${seed.theme}. The page is shaped for ${seed.audience}, so the examples stay close to real naming intent.`,
      style: seed.style,
      keywords: [...seed.keywords, seed.platform.toLowerCase(), seed.baseTitle.toLowerCase(), "NameLaunchpad"],
      length: seed.length,
      usernameCount: 56 + index * 8,
      generatorLinks: seed.generatorLinks,
      content: buildContent(seed.theme, seed.audience, seed.platform, seed.keywords, title),
    };
  });
}

export const programmaticSeoPages: ProgrammaticSeoPage[] = [
  ...singlePageSeeds.map(buildSinglePage),
  ...triplePageSeeds.flatMap(buildTriplePages),
];

export const programmaticSeoSlugs = programmaticSeoPages.map((page) => page.slug);

export function getProgrammaticSeoPage(slug: string) {
  return programmaticSeoPages.find((page) => page.slug === slug);
}
