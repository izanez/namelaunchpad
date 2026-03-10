export type KeywordLandingPage = {
  slug: string;
  platform: string;
  generatorLabel: string;
  pageTitle: string;
  seoTitle: string;
  metaDescription: string;
  intro: string;
  examples: string[];
  prefixes: string[];
  core: string[];
  suffixes: string[];
  contentTitle: string;
  contentIntro: string;
  contentSections: Array<{
    heading: string;
    body: string;
  }>;
};

export const keywordLandingPages: KeywordLandingPage[] = [
  {
    slug: "fortnite-name-generator",
    platform: "Fortnite",
    generatorLabel: "Fortnite Name Generator",
    pageTitle: "Fortnite Name Generator",
    seoTitle: "Fortnite Name Generator - Cool Fortnite Usernames and Gamertags",
    metaDescription:
      "Generate cool Fortnite usernames and gamertags with battle royale, storm, loot, and victory inspired ideas.",
    intro:
      "Create Fortnite-style usernames with clean, competitive, and battle-ready naming patterns.",
    examples: ["StormSniper", "VictoryVortex", "LootPhantom", "BattleNova", "ShieldBreaker"],
    prefixes: ["Storm", "Victory", "Loot", "Battle", "Shield", "Rapid", "Drop", "Zone", "Crank", "Tactical"],
    core: ["Sniper", "Vortex", "Phantom", "Nova", "Breaker", "Builder", "Rusher", "Hunter", "Raider", "Editor"],
    suffixes: ["Ace", "Rush", "Edit", "Shot", "Drop", "Zone", "Pro", "King", "GG", "Lock"],
    contentTitle: "Fortnite Name Generator for Battle Royale Players and Creators",
    contentIntro:
      "Fortnite usernames usually need to feel fast, recognizable, and competitive. Players searching for a Fortnite name generator are often looking for tags that fit battle royale gameplay, ranked intensity, clips, streams, and social media branding. This landing page is built for that search intent. The generator combines storm, loot, drop, victory, edits, and tactical language to produce names that feel native to Fortnite without relying on random generic words. That makes it useful for casual players, ranked grinders, montagers, and streamers who want one handle that works across lobbies and content platforms.",
    contentSections: [
      {
        heading: "What Makes a Good Fortnite Username",
        body: "A strong Fortnite name should be clear in a lobby, memorable in clips, and short enough to work in social profiles. Names that use competitive language such as storm, drop, ace, victory, and edit often feel more connected to the game than completely unrelated words. The best names also sound good when spoken by teammates or read aloud in a stream. If a tag is too long or visually noisy, it becomes harder to remember. This generator focuses on names that are sharp, readable, and appropriate for modern Fortnite identity building.",
      },
      {
        heading: "Using Fortnite Names Across Social Platforms",
        body: "Many players use one Fortnite identity on Twitch, TikTok, YouTube, Discord, and short-form clip channels. That means a username should not only work in-game, but also look clean as a creator handle. Strong names are flexible, easy to type, and recognizable in thumbnails or stream overlays. Before choosing a final tag, check whether it still feels good as a channel name, a Discord nickname, and a social handle. This generator helps surface names that stay useful beyond just a single game profile.",
      },
    ],
  },
  {
    slug: "roblox-username-generator",
    platform: "Roblox",
    generatorLabel: "Roblox Username Generator",
    pageTitle: "Roblox Username Generator",
    seoTitle: "Roblox Username Generator - Safe and Creative Roblox Usernames",
    metaDescription:
      "Generate safe and creative Roblox usernames with playful, block-inspired, kid-friendly name ideas.",
    intro:
      "Create playful Roblox usernames with safe, block-style patterns for games, obbies, and adventures.",
    examples: ["BlockyWarrior", "PixelBuilder", "NoobDestroyer", "ObbyMaster", "CubeChampion"],
    prefixes: ["Blocky", "Pixel", "Noob", "Obby", "Cube", "Brick", "Crafty", "Happy", "Mega", "Turbo"],
    core: ["Warrior", "Builder", "Master", "Champion", "Runner", "Jumper", "Crafter", "Explorer", "Hero", "Buddy"],
    suffixes: ["Kid", "Playz", "Quest", "Fun", "Star", "Spark", "Pro", "Legend", "Buddy", "Gamer"],
    contentTitle: "Roblox Username Generator for Safe, Fun, and Memorable Names",
    contentIntro:
      "Roblox usernames often need to feel playful, safe, and versatile across many types of games. Users searching for Roblox name ideas usually want something kid-friendly and creative enough to fit obbies, simulators, roleplay, building games, and adventure worlds. This landing page is designed around that search behavior. The generator uses cheerful naming patterns and block-style language so the results feel more native to Roblox culture. It is useful for new players, younger audiences, and creators who want a friendly brand identity that can work across multiple Roblox experiences and community spaces.",
    contentSections: [
      {
        heading: "Why Roblox Usernames Should Stay Friendly",
        body: "Roblox serves a broad audience, so usernames that are simple, upbeat, and easy to read usually work best. A playful name tends to fit more games and communities than a harsh or overly edgy one. Friendly words based on building, adventure, blocks, and exploration are flexible enough to work across different game modes and future updates. A safe username is also easier to use if you want the same identity on YouTube, Discord, or a Roblox group later. This generator is intentionally tuned toward that cleaner and more reusable style.",
      },
      {
        heading: "How to Pick a Good Roblox Username",
        body: "A good Roblox name should be memorable, easy to type, and broad enough to fit more than one experience. If your name is too tied to a single game trend, it can stop feeling useful later. Try options that sound natural in chat, look good in a profile header, and remain recognizable when shortened by friends or viewers. Strong Roblox usernames usually balance playful tone with clarity, especially if you want a handle that works for gaming and social content at the same time.",
      },
    ],
  },
  {
    slug: "minecraft-name-generator",
    platform: "Minecraft",
    generatorLabel: "Minecraft Name Generator",
    pageTitle: "Minecraft Name Generator",
    seoTitle: "Minecraft Name Generator - Cool Minecraft Usernames and Gamertags",
    metaDescription:
      "Generate cool Minecraft usernames and gamertags with blocky, survival, PvP, and building inspired name ideas.",
    intro:
      "Generate Minecraft-style usernames with survival, building, PvP, and adventure-inspired patterns.",
    examples: ["BlockCrafter", "CreeperNova", "RedstoneRider", "DiamondWolf", "PixelMiner"],
    prefixes: ["Block", "Craft", "Pixel", "Diamond", "Redstone", "Creeper", "Ender", "Nether", "Stone", "Mine"],
    core: ["Builder", "Miner", "Raider", "Crafter", "Rider", "Survivor", "Hunter", "Walker", "Knight", "Wizard"],
    suffixes: ["MC", "Craft", "Build", "PvP", "Realm", "Rush", "Stone", "Blade", "Fox", "Byte"],
    contentTitle: "Minecraft Name Generator for Builders, PvP Players, and Survival Fans",
    contentIntro:
      "A strong Minecraft username needs to fit a wide range of gameplay styles. Some players want names that sound technical and builder-focused, while others want tags that feel aggressive for PvP, factions, or speedrunning. This landing page is built around those search intents. The generator combines recognizable Minecraft themes such as crafting, mining, redstone, survival, and exploration so the output feels native to the game rather than random. That makes the page useful for players creating a brand new account, starting a YouTube series, or rebranding an old multiplayer identity.",
    contentSections: [
      {
        heading: "Why Minecraft Usernames Need Flexibility",
        body: "Minecraft is not one narrow game mode. A username might appear on survival servers, minigame hubs, modded SMPs, bedwars lobbies, Discord communities, YouTube thumbnails, and Twitch overlays. That means a good Minecraft name should be broad enough to work in multiple contexts while still sounding connected to the game. Names based on blocks, redstone, diamond gear, end worlds, or building culture tend to age well because they are recognizable to almost every kind of player. If a name is too tied to one temporary trend, it can feel stale quickly. This generator is designed to create names that stay useful across long-term play, content creation, and server communities.",
      },
      {
        heading: "How to Choose a Good Minecraft Gamertag",
        body: "Start with the style of player identity you want. If you focus on architecture and creative mode, names that hint at crafting, blocks, or worldbuilding usually fit best. If you prefer PvP or hardcore survival, sharper names with stronger motion or combat language can work better. The best Minecraft usernames are usually readable at a glance, not overloaded with symbols, and easy to say out loud in voice chat. They should also feel good when used as a YouTube handle, Discord nickname, or skin branding element. Try several generated options and compare how they look in a multiplayer list, a social bio, and a video title before choosing one.",
      },
    ],
  },
  {
    slug: "twitch-username-generator",
    platform: "Twitch",
    generatorLabel: "Twitch Username Generator",
    pageTitle: "Twitch Username Generator",
    seoTitle: "Twitch Username Generator - Streamer Names for Twitch Channels",
    metaDescription:
      "Generate Twitch usernames for streamers, gaming creators, and live channels with clean, memorable branding.",
    intro:
      "Create Twitch-friendly usernames that sound live, memorable, and easy to recognize on stream.",
    examples: ["LiveNova", "ChatVortex", "ClipWolf", "StreamKnight", "RaidPhantom"],
    prefixes: ["Live", "Stream", "Chat", "Clip", "Raid", "Prime", "Neon", "Turbo", "Hype", "GG"],
    core: ["Nova", "Vortex", "Knight", "Phantom", "Rider", "Pulse", "Ghost", "Arena", "Focus", "Echo"],
    suffixes: ["TV", "Live", "Plays", "GG", "HQ", "Zone", "Chat", "Cast", "Crew", "Arena"],
    contentTitle: "Twitch Username Generator for Streamers and Gaming Creators",
    contentIntro:
      "A Twitch username does more than identify an account. It becomes part of your branding, your on-screen overlays, your raid messages, your clip watermarks, and your audience memory. That is why search intent for Twitch username ideas is different from general gamer tags. Streamers need names that are readable at small sizes, easy to pronounce out loud, and strong enough to work across multiple platforms. This landing page targets that need with a generator focused on channel-ready names that sound active, live, and creator-friendly rather than generic. It is built for new streamers, VTubers, gaming creators, variety broadcasters, and anyone refining a live content identity.",
    contentSections: [
      {
        heading: "What Makes a Good Twitch Username",
        body: "A strong Twitch username is simple enough for viewers to remember after hearing it once, but distinctive enough to avoid blending into thousands of similar channels. Names with clean rhythm, recognizable words, and a strong gaming or creator tone usually perform better than cluttered tags full of numbers and special characters. A viewer should be able to type your name into Twitch, Discord, or social search without guessing. That matters for discovery, raids, clip sharing, and audience retention. The best Twitch names are also flexible enough to work if your content expands from one game into multiple categories over time.",
      },
      {
        heading: "Using Twitch Names Across Platforms",
        body: "Most streamers do not live only on Twitch. They also post on TikTok, YouTube Shorts, Instagram Reels, Discord, and X. Because of that, your Twitch username should ideally double as a creator handle across the rest of your social stack. A good name helps viewers move from a stream to a clip channel to a Discord server without confusion. That continuity improves branding and long-term growth. When testing name ideas, look for options that feel natural in chat messages, overlays, thumbnails, and short-form video captions. The generator on this page is designed to support that multi-platform use case.",
      },
    ],
  },
  {
    slug: "valorant-name-generator",
    platform: "Valorant",
    generatorLabel: "Valorant Name Generator",
    pageTitle: "Valorant Name Generator",
    seoTitle: "Valorant Name Generator - Cool Valorant Usernames and Tags",
    metaDescription:
      "Generate cool Valorant usernames and tags inspired by agents, aim, ranked play, and tactical shooter style.",
    intro:
      "Generate tactical shooter usernames with a sharp, competitive Valorant feel.",
    examples: ["SpikeViper", "ClutchNova", "PhantomAim", "ValorRush", "SovaStrike"],
    prefixes: ["Spike", "Clutch", "Phantom", "Valor", "Agent", "Viper", "Sova", "Neon", "Ace", "Rush"],
    core: ["Nova", "Aim", "Rider", "Ghost", "Snare", "Pulse", "Shade", "Hunter", "Blade", "Core"],
    suffixes: ["Tag", "Aim", "Shot", "Ace", "Rush", "Lock", "Zone", "Ghost", "Line", "Strike"],
    contentTitle: "Valorant Name Generator for Ranked, Competitive, and Creator Play",
    contentIntro:
      "Valorant usernames usually need to feel more tactical and precise than general gaming names. Players searching for Valorant name ideas often want something that sounds competitive, clean, and modern enough to fit ranked games, team play, montage clips, and social profiles. This page is built around that search behavior. The name generator uses tactical shooter language, agent-inspired tone, and sharp naming patterns that fit the style of Valorant without copying Riot branding directly. That makes the page useful for players creating a fresh alt, joining a team, building a clip identity, or searching for a better handle before pushing ranked or posting gameplay online.",
    contentSections: [
      {
        heading: "How Valorant Names Differ from General Usernames",
        body: "A Valorant handle usually benefits from a cleaner and more minimal tone than usernames used for sandbox or casual games. Tactical shooters are heavily tied to precision, callouts, team identity, and highlight clips, so names that sound fast, sharp, and readable often perform better. If your name is too long or overloaded with unrelated fantasy words, it can feel out of place next to more competitive player tags. Strong Valorant names often reference aim, pressure, clutch moments, agents, utility, or control without becoming noisy. The generator on this page is tuned to produce tags that feel closer to tactical play and modern esports naming patterns.",
      },
      {
        heading: "Choosing a Valorant Username for Long-Term Use",
        body: "If you play ranked seriously or post clips, a good Valorant username should be reusable across Discord, Twitch, TikTok, and tournament platforms. Consistency matters because viewers and teammates often recognize names from multiple places at once. A short tag that works on a scoreboard and in a social bio is stronger than a name that only looks good in one context. Try a few generated options and think about how they sound in comms, on a montage thumbnail, and in a team roster. The best names balance individual style with clarity, especially if you want to build a recognizable competitive identity over time.",
      },
    ],
  },
  {
    slug: "discord-name-generator",
    platform: "Discord",
    generatorLabel: "Discord Name Generator",
    pageTitle: "Discord Name Generator",
    seoTitle: "Discord Name Generator - Cool Discord Usernames and Nicknames",
    metaDescription:
      "Generate cool Discord usernames and nicknames for gaming servers, communities, creator groups, and chats.",
    intro:
      "Create Discord-ready usernames that work for gaming servers, creator communities, and friend groups.",
    examples: ["GuildNova", "ChatGhost", "PulseRider", "ServerWolf", "EchoKnight"],
    prefixes: ["Guild", "Chat", "Pulse", "Server", "Echo", "Neon", "Ghost", "Core", "Raid", "Pixel"],
    core: ["Nova", "Wolf", "Knight", "Byte", "Phantom", "Rider", "Drift", "Vortex", "Pulse", "Shade"],
    suffixes: ["Hub", "Chat", "Cord", "Zone", "Wave", "Byte", "Crew", "Room", "Nest", "Link"],
    contentTitle: "Discord Name Generator for Servers, Communities, and Creator Spaces",
    contentIntro:
      "Discord usernames are used in a different way from most gaming tags. They show up in direct messages, voice channels, moderator tools, gaming communities, fan servers, and creator ecosystems. Because of that, people searching for a Discord name generator often want names that are clean, social, and flexible rather than overly aggressive or niche. This page is designed around that search intent. The generator creates names that fit modern community culture while still feeling game-friendly. It works well for new accounts, rebrands, alt identities, and creator communities that need a consistent handle across private chats and public channels.",
    contentSections: [
      {
        heading: "What Makes a Good Discord Username",
        body: "A good Discord username should be readable in fast-moving chat, memorable in voice channels, and easy to recognize across multiple servers. Because Discord is used for both friendship circles and large communities, the best names tend to strike a balance between personality and clarity. If a name is too cluttered, it becomes harder to spot in chat or to reference in conversation. Cleaner handles also work better when linked to Twitch, YouTube, or gaming accounts. The generator on this page focuses on names that feel social, modern, and reusable without becoming bland.",
      },
      {
        heading: "Discord Names for Gaming and Creator Communities",
        body: "Many users need one Discord identity that works everywhere: game squads, moderation teams, fan servers, private groups, and creator spaces. That is why it helps to choose a username with enough personality to stand out but enough flexibility to stay useful long term. Try generated names that feel natural when spoken aloud and look clean in a member list. A good Discord handle should still make sense if you later join new communities, start streaming, or build content around the same identity. This page helps surface those broader, more durable naming options.",
      },
    ],
  },
];

export const landingPageSlugs = keywordLandingPages.map((page) => page.slug);

export function getKeywordLandingPage(slug: string) {
  return keywordLandingPages.find((page) => page.slug === slug);
}

export function getGeneratorPath(slug: string) {
  return `/generators/${slug}`;
}
