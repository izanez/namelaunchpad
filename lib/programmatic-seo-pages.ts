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
  content: Array<{
    heading: string;
    body: string;
  }>;
};

export const programmaticSeoPages: ProgrammaticSeoPage[] = [
  {
    slug: "cool-usernames-for-gamers",
    title: "Cool Usernames for Gamers",
    seoTitle: "Cool Usernames for Gamers - Name Ideas and Generator Links",
    metaDescription:
      "Browse cool usernames for gamers with stylish name ideas, generator links, and SEO-focused naming tips.",
    intro:
      "This page collects cool usernames for gamers who want names that feel modern, competitive, and easy to remember across gaming and social profiles.",
    style: "cool",
    keywords: ["nova", "cyber", "ghost"],
    length: { min: 7, max: 12 },
    usernameCount: 80,
    generatorLinks: [
      {
        title: "Username Generator",
        href: "/username-generator",
        description: "Generate more cool usernames with filters for style, length, and keywords.",
      },
      {
        title: "Gamer Tag Generator",
        href: "/gamer-tag-generator",
        description: "Create broader cross-platform gamer tags for console, PC, and creator branding.",
      },
      {
        title: "Cool Username Generator",
        href: "/generators/cool-username-generator",
        description: "Open the dedicated cool username generator landing page.",
      },
    ],
    content: [
      {
        heading: "Why Cool Usernames Work Well for Gamers",
        body: "Cool usernames tend to perform well because they balance style with clarity. A strong gaming username should feel recognizable at a glance, fit the tone of competitive lobbies, and still look good on Discord, Twitch, or TikTok. Names built from sharp words, clean prefixes, and readable endings often age better than names that rely only on random symbols or hard-to-read spelling. If you want a username that feels modern and usable long term, a cooler naming style is usually the safest starting point.",
      },
      {
        heading: "How to Choose the Best Cool Gamer Name",
        body: "Look for names that are short enough to remember but distinctive enough to stand out in a scoreboard or profile list. Good gamer names usually have a clear rhythm, a strong visual shape, and a tone that matches the kinds of games or content you enjoy. Before locking one in, check whether it still feels good as a creator handle, a social media username, and a voice-chat identity. That extra flexibility is what turns a cool-looking name into a useful long-term brand asset.",
      },
    ],
  },
  {
    slug: "best-fortnite-usernames",
    title: "Best Fortnite Usernames",
    seoTitle: "Best Fortnite Usernames - Name Ideas, Lists, and Generator Links",
    metaDescription:
      "Discover the best Fortnite usernames with battle-ready name ideas, generator links, and tips for choosing a strong tag.",
    intro:
      "This page is built for players searching for the best Fortnite usernames, from sweaty tags and clean battle royale names to creator-friendly handles.",
    style: "cool",
    keywords: ["storm", "loot", "victory"],
    length: { min: 7, max: 13 },
    usernameCount: 80,
    generatorLinks: [
      {
        title: "Fortnite Name Generator",
        href: "/fortnite-name-generator",
        description: "Generate more Fortnite-style usernames instantly.",
      },
      {
        title: "Fortnite SEO Generator Page",
        href: "/generators/fortnite-name-generator",
        description: "Open the dedicated Fortnite SEO landing page with examples and links.",
      },
      {
        title: "Clan Name Generator",
        href: "/clan-name-generator",
        description: "Create squad, trio, and clan names for Fortnite teams and communities.",
      },
    ],
    content: [
      {
        heading: "What Makes a Fortnite Username Stand Out",
        body: "The best Fortnite usernames usually feel fast, confident, and readable. Fortnite is heavily tied to clips, social content, and recognizable in-game identity, so your name has to work beyond the lobby itself. Strong tags often use storm, drop, loot, edits, victory, or movement language because those patterns feel native to the game. They also tend to be simple enough to look clean in a stream title, montage thumbnail, or teammate callout.",
      },
      {
        heading: "Choosing a Fortnite Name for Gaming and Content",
        body: "If you post clips or stream, pick a Fortnite username that still works well on Twitch, TikTok, YouTube, and Discord. Avoid tags that are overloaded with numbers or too tied to a short-term meme. The strongest names are memorable, easy to type, and flexible enough to keep using even if your content broadens later. A good Fortnite name is not just a tag for one match. It can become the handle people remember you by across platforms.",
      },
    ],
  },
  {
    slug: "rare-gamertags",
    title: "Rare Gamertags",
    seoTitle: "Rare Gamertags - Unique, Rare-Looking Gamer Name Ideas",
    metaDescription:
      "Browse rare gamertags with short, dark, and uncommon-looking username ideas plus related generator links.",
    intro:
      "Rare gamertags usually feel clean, short, or slightly mysterious. This page collects rare-looking gamer name ideas built to stand out without looking messy.",
    style: "dark",
    keywords: ["void", "og", "shade"],
    length: { min: 4, max: 8 },
    usernameCount: 80,
    generatorLinks: [
      {
        title: "OG Username Finder",
        href: "/og-username-finder",
        description: "Find shorter, rarer 4 to 5 character usernames.",
      },
      {
        title: "Username Generator",
        href: "/username-generator",
        description: "Generate more rare-style usernames using dark and short filters.",
      },
      {
        title: "Cool Username Generator",
        href: "/generators/cool-username-generator",
        description: "Compare rare names with broader cool username ideas.",
      },
    ],
    content: [
      {
        heading: "Why Rare Gamertags Appeal to Players",
        body: "Rare gamertags feel valuable because they look less generic than standard usernames. Players often associate rarity with short length, cleaner structure, and unusual combinations that still remain readable. A rare-looking tag can feel more premium, especially on platforms where simple names are harder to find. That is why many users search specifically for rare gamer names instead of broader username ideas. The goal is not randomness. It is distinctiveness with restraint.",
      },
      {
        heading: "How to Spot a Strong Rare Username",
        body: "A strong rare name often avoids overused patterns, extra symbols, or filler numbers. It may be short, it may use darker or sharper word choices, or it may simply have better rhythm than most usernames in the same category. If you want a rare gamertag that still works in real use, focus on names that are easy to say, easy to type, and visually balanced. That keeps the name valuable instead of just strange.",
      },
    ],
  },
  {
    slug: "short-gamer-names",
    title: "Short Gamer Names",
    seoTitle: "Short Gamer Names - Short Username Ideas for Gaming Profiles",
    metaDescription:
      "Find short gamer names with compact username ideas, generator links, and tips for choosing memorable short tags.",
    intro:
      "Short gamer names are popular because they are easier to remember, cleaner in overlays, and stronger for cross-platform branding.",
    style: "cool",
    keywords: ["neo", "zyro", "xeno"],
    length: { min: 4, max: 6 },
    usernameCount: 80,
    generatorLinks: [
      {
        title: "Username Generator",
        href: "/username-generator",
        description: "Use the short length filter to generate more compact usernames.",
      },
      {
        title: "OG Username Finder",
        href: "/og-username-finder",
        description: "Browse short rare usernames focused on 4 to 5 characters.",
      },
      {
        title: "Username Ideas",
        href: "/username-ideas",
        description: "Explore the larger username inspiration gallery for more styles.",
      },
    ],
    content: [
      {
        heading: "Why Short Gamer Names Perform So Well",
        body: "Short gamer names are easier to read in-game, easier to remember after one match, and often look cleaner on social platforms. They also work better in UI spaces where names can be truncated, such as overlays, sidebars, scoreboards, or chat lists. Because short names tend to look more premium, many players actively search for them even when longer names are still available. The challenge is finding short names that still feel original instead of empty or overly random.",
      },
      {
        heading: "Picking a Short Name Without Losing Identity",
        body: "A short name should still say something about your style. Compact usernames with a good visual rhythm often outperform longer tags because they feel cleaner and more intentional. That said, not every short name is strong. Focus on options that sound natural, are easy to type, and still feel like they could represent you on more than one platform. If a short gamer tag also works as a creator handle, it becomes much more valuable over time.",
      },
    ],
  },
  {
    slug: "unique-username-ideas",
    title: "Unique Username Ideas",
    seoTitle: "Unique Username Ideas - Fresh Name Inspiration for Gamers and Creators",
    metaDescription:
      "Browse unique username ideas with fresh name lists, generator links, and SEO-focused advice for choosing a better handle.",
    intro:
      "Unique username ideas help players and creators avoid repetitive tags and build a handle that feels more personal, memorable, and reusable.",
    style: "aesthetic",
    keywords: ["aura", "echo", "velvet"],
    length: { min: 7, max: 12 },
    usernameCount: 80,
    generatorLinks: [
      {
        title: "Username Generator",
        href: "/username-generator",
        description: "Generate unique usernames with style and keyword filters.",
      },
      {
        title: "Search Generators",
        href: "/search",
        description: "Search related generator pages for more niche naming styles.",
      },
      {
        title: "All Generators",
        href: "/all-generators",
        description: "Browse all available generator tools and naming pages.",
      },
    ],
    content: [
      {
        heading: "What Makes a Username Feel Unique",
        body: "A unique username does not need to be complicated. In most cases, it just needs to avoid the same tired combinations that appear everywhere else. Distinctive names usually have a clearer voice, better rhythm, and a more consistent visual shape than average usernames. That makes them easier to remember and more useful in long-term branding. If you are trying to stand out on gaming platforms or social media, uniqueness comes from taste and structure more than randomness.",
      },
      {
        heading: "Using Unique Username Ideas Across Platforms",
        body: "The best unique username ideas are flexible enough to use across gaming, streaming, and social media. That means the name should look good in a profile header, feel natural in a Discord server, and remain recognizable in a video title or clip caption. A strong unique handle is not just different. It is reusable. That is why it helps to compare ideas in multiple contexts before committing to one final username.",
      },
    ],
  },
];

export const programmaticSeoSlugs = programmaticSeoPages.map((page) => page.slug);

export function getProgrammaticSeoPage(slug: string) {
  return programmaticSeoPages.find((page) => page.slug === slug);
}
