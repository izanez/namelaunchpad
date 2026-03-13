export type IntentLinkItem = {
  href: string;
  title: string;
  reason: string;
  intents: string[];
};

const intentLinks: IntentLinkItem[] = [
  {
    href: "/username-generator#generator",
    title: "Username Generator",
    reason: "Generate a fresh list with your own keywords and style.",
    intents: ["generate", "username", "ideas", "custom"],
  },
  {
    href: "/daily-top",
    title: "Daily Top 25 Names",
    reason: "Zero-click list for instant picks and fast sharing.",
    intents: ["daily", "top", "list", "share", "viral"],
  },
  {
    href: "/collections/short-valorant-names",
    title: "Short Valorant Names",
    reason: "Short, readable tags tuned for competitive lobbies.",
    intents: ["valorant", "short", "competitive", "clean"],
  },
  {
    href: "/collections/clean-fortnite-duo-names",
    title: "Clean Fortnite Duo Names",
    reason: "Paired names for duo identity and content clips.",
    intents: ["fortnite", "duo", "clean", "team"],
  },
  {
    href: "/collections/aesthetic-tiktok-usernames",
    title: "Aesthetic TikTok Usernames",
    reason: "Soft, creator-first handles with social recall.",
    intents: ["tiktok", "aesthetic", "creator", "social"],
  },
  {
    href: "/compare/fortnite-vs-valorant-username-styles",
    title: "Fortnite vs Valorant Styles",
    reason: "Choose the right style based on game intent.",
    intents: ["compare", "fortnite", "valorant", "style"],
  },
  {
    href: "/compare/short-vs-aesthetic-usernames",
    title: "Short vs Aesthetic Usernames",
    reason: "Pick between readability and aesthetic branding.",
    intents: ["compare", "short", "aesthetic", "branding"],
  },
  {
    href: "/community",
    title: "Community Picks",
    reason: "Vote and discover names with weekly momentum.",
    intents: ["community", "vote", "ugc", "leaderboard"],
  },
  {
    href: "/best-clan-names-2026",
    title: "100 Best Clan Names 2026",
    reason: "Instant zero-click list with direct generator CTA.",
    intents: ["clan", "best", "2026", "zero-click", "gaming"],
  },
  {
    href: "/assets",
    title: "Linkable Assets",
    reason: "Downloadable cheat sheets and trend packs for backlinks.",
    intents: ["assets", "download", "seo", "cheat", "matrix", "trends"],
  },
];

function tokenize(input: string) {
  return input
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

export function getIntentNextPages(intent: string[], currentPath?: string, limit = 6) {
  const tokens = new Set(intent.flatMap(tokenize));

  return intentLinks
    .filter((item) => item.href !== currentPath)
    .map((item) => {
      const score = item.intents.reduce((acc, tag) => (tokens.has(tag) ? acc + 2 : acc), 0);
      return { item, score };
    })
    .sort((left, right) => right.score - left.score || left.item.title.localeCompare(right.item.title))
    .slice(0, limit)
    .map((entry) => entry.item);
}
