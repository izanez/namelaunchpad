export type IntentCluster = {
  slug: string;
  title: string;
  seoTitle: string;
  description: string;
  intro: string;
  examples: string[];
  faq: Array<{ q: string; a: string }>;
  generatorLink: string;
  relatedLinks: Array<{ label: string; href: string }>;
};

export const intentClusters: IntentCluster[] = [
  {
    slug: "short-valorant-names",
    title: "Short Valorant Names",
    seoTitle: "Short Valorant Names - Clean Ranked-Ready Ideas",
    description: "Short Valorant names with cleaner readability for ranked and scrim lobbies.",
    intro:
      "This cluster targets users who want short, fast-readable Valorant names that still look premium in match overlays and killfeed moments.",
    examples: ["AceVyr", "Clixon", "RazeX", "Vexor", "Jettix", "Tapzr"],
    faq: [
      {
        q: "What length works best for Valorant names?",
        a: "Short to medium lengths usually read best during fast rounds and spectator moments.",
      },
      {
        q: "Should I use symbols in Valorant names?",
        a: "Keep symbols minimal. Cleaner names are easier to remember and search.",
      },
    ],
    generatorLink: "/username-generator?keywords=valorant,ace,clutch#generator",
    relatedLinks: [
      { label: "Valorant Name Generator", href: "/generators/valorant-name-generator" },
      { label: "Rare Usernames", href: "/rare-usernames" },
      { label: "Short Gamer Names", href: "/short-gamer-names" },
    ],
  },
  {
    slug: "clean-fortnite-duo-names",
    title: "Clean Fortnite Duo Names",
    seoTitle: "Clean Fortnite Duo Names - Pair Ideas for Ranked and Content",
    description: "Clean Fortnite duo name ideas for teammate branding and creator clips.",
    intro:
      "This cluster is built for duo players who want names that pair together cleanly across Fortnite, Discord, and social clips.",
    examples: ["NovaPair", "RushTwin", "DriftSync", "ClutchMate", "ZoneLink", "EchoDuo"],
    faq: [
      {
        q: "How do duo names stay consistent?",
        a: "Use the same theme root and vary only the suffix so both names feel linked.",
      },
      {
        q: "What is a clean duo style?",
        a: "Short words, no cluttered symbols, and high readability on stream overlays.",
      },
    ],
    generatorLink: "/username-generator?keywords=fortnite,duo,clean#generator",
    relatedLinks: [
      { label: "Fortnite Name Generator", href: "/fortnite-name-generator" },
      { label: "Duo Gamertag Generator", href: "/generators/duo-gamertag-generator" },
      { label: "Clan Name Generator", href: "/clan-name-generator" },
    ],
  },
  {
    slug: "aesthetic-tiktok-usernames",
    title: "Aesthetic TikTok Usernames",
    seoTitle: "Aesthetic TikTok Usernames - Soft and Brandable Handle Ideas",
    description: "Aesthetic TikTok username ideas with soft, stylish, creator-friendly style.",
    intro:
      "This cluster focuses on aesthetic TikTok handles with softer vocabulary, better memorability, and cleaner cross-platform reuse.",
    examples: ["LunaGlow", "VelvetMuse", "CloudAri", "RoseVibe", "AuraLoop", "DawnEdit"],
    faq: [
      {
        q: "What makes a TikTok username aesthetic?",
        a: "Soft visual words, smoother rhythm, and shorter handles that are easy to remember.",
      },
      {
        q: "Should TikTok names match Instagram?",
        a: "Yes, matching or near-matching handles improves discoverability and brand recall.",
      },
    ],
    generatorLink: "/username-generator?keywords=tiktok,aesthetic,soft#generator",
    relatedLinks: [
      { label: "TikTok Username Generator", href: "/generators/tiktok-username-generator" },
      { label: "Aesthetic Username Generator", href: "/generators/aesthetic-username-generator" },
      { label: "Social Media Category", href: "/category/social-media" },
    ],
  },
];

export const intentClusterSlugs = intentClusters.map((cluster) => cluster.slug);

export function getIntentCluster(slug: string) {
  return intentClusters.find((cluster) => cluster.slug === slug);
}
