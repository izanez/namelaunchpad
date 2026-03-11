export type GeneratorType =
  | "username"
  | "roblox"
  | "fortnite"
  | "fantasy"
  | "clan";

export type GeneratorDirectoryEntry = {
  slug: string;
  title: string;
  description: string;
  exampleNames: string[];
  category: string;
};

export type GeneratorCategorySlug =
  | "gaming"
  | "social-media"
  | "fantasy"
  | "anime"
  | "cool"
  | "funny"
  | "rare"
  | "short"
  | "aesthetic"
  | "hacker"
  | "streamer"
  | "clan"
  | "duo"
  | "tech"
  | "dark";

export type GeneratorCategory = {
  slug: GeneratorCategorySlug;
  title: string;
  description: string;
};

export const generatorCategories: GeneratorCategory[] = [
  {
    slug: "gaming",
    title: "Gaming",
    description: "Generators for game-specific usernames, gamertags, team brands, and competitive aliases.",
  },
  {
    slug: "social-media",
    title: "Social Media",
    description: "Generators for usernames used on Discord, TikTok, Instagram, Reddit, X, YouTube, and creator platforms.",
  },
  {
    slug: "fantasy",
    title: "Fantasy",
    description: "Generators for RPG names, dragons, demons, elves, guilds, and fantasy-inspired identities.",
  },
  {
    slug: "anime",
    title: "Anime",
    description: "Generators for anime-inspired usernames, fandom handles, VTuber brands, and character-style identities.",
  },
  {
    slug: "cool",
    title: "Cool",
    description: "Generators for sharp, modern, premium, and cool username ideas for gaming and social media.",
  },
  {
    slug: "funny",
    title: "Funny",
    description: "Generators for playful, meme-friendly, silly, and lighthearted usernames and gamer tags.",
  },
  {
    slug: "rare",
    title: "Rare",
    description: "Generators focused on uncommon, clean, low-noise, and rare username patterns.",
  },
  {
    slug: "short",
    title: "Short",
    description: "Generators for short usernames, quick gamer tags, and compact handles with strong readability.",
  },
  {
    slug: "aesthetic",
    title: "Aesthetic",
    description: "Generators for soft, dreamy, stylish, and aesthetic usernames for creators and gamers.",
  },
  {
    slug: "hacker",
    title: "Hacker",
    description: "Generators for cyber, glitch, terminal, and hacker-style username ideas.",
  },
  {
    slug: "streamer",
    title: "Streamer",
    description: "Generators for Twitch, YouTube, Kick, VTuber, and creator-facing streaming brands.",
  },
  {
    slug: "clan",
    title: "Clan",
    description: "Generators for clan names, squad brands, team identities, and multiplayer group naming.",
  },
  {
    slug: "duo",
    title: "Duo",
    description: "Generators for duos, pairs, gaming partners, and two-player branding ideas.",
  },
  {
    slug: "tech",
    title: "Tech",
    description: "Generators for tech-inspired usernames with digital, futuristic, software, and cyber themes.",
  },
  {
    slug: "dark",
    title: "Dark",
    description: "Generators for dark usernames with void, gothic, shadow, and ominous naming styles.",
  },
];
export const generatorDatabase: GeneratorDirectoryEntry[] = [
  {
    slug: "fortnite-name-generator",
    title: "Fortnite Name Generator",
    description: "Generate cool Fortnite usernames and battle-ready name ideas.",
    exampleNames: ["StormSniper", "VictoryVortex", "LootPhantom", "BattleNova", "ShieldBreaker"],
    category: "gaming",
  },
  {
    slug: "minecraft-name-generator",
    title: "Minecraft Name Generator",
    description: "Create Minecraft usernames inspired by blocks, survival, PvP, and building.",
    exampleNames: ["BlockCrafter", "CreeperNova", "RedstoneRider", "DiamondWolf", "PixelMiner"],
    category: "gaming",
  },
  {
    slug: "roblox-username-generator",
    title: "Roblox Username Generator",
    description: "Generate safe and playful Roblox usernames for obbies, roleplay, and building games.",
    exampleNames: ["BlockyWarrior", "PixelBuilder", "NoobDestroyer", "ObbyMaster", "CubeChampion"],
    category: "gaming",
  },
  {
    slug: "valorant-name-generator",
    title: "Valorant Name Generator",
    description: "Generate tactical Valorant usernames for ranked, teams, and clips.",
    exampleNames: ["SpikeViper", "ClutchNova", "PhantomAim", "ValorRush", "SovaStrike"],
    category: "gaming",
  },
  {
    slug: "discord-username-generator",
    title: "Discord Username Generator",
    description: "Create clean Discord usernames for gaming servers, communities, and group chats.",
    exampleNames: ["GuildNova", "ChatGhost", "PulseRider", "ServerWolf", "EchoKnight"],
    category: "social",
  },
  {
    slug: "steam-gamertag-generator",
    title: "Steam Username Generator",
    description: "Generate stylish Steam usernames for PC players and profile branding.",
    exampleNames: ["SteamRogue", "PixelForge", "CyberLibrary", "ValveKnight", "NovaDeck"],
    category: "gaming",
  },
  {
    slug: "clan-name-generator",
    title: "Clan Name Generator",
    description: "Generate powerful clan names for squads, communities, and esports teams.",
    exampleNames: ["Iron Legion", "Shadow Syndicate", "Crimson Wolves", "Night Raiders", "Void Brotherhood"],
    category: "team",
  },
  {
    slug: "fantasy-name-generator",
    title: "Fantasy Name Generator",
    description: "Create fantasy names for RPG characters, guilds, and magical worlds.",
    exampleNames: ["Shadowbane", "DragonSlayerX", "Stormwarden", "Nightfang", "FrostKnight"],
    category: "fantasy",
  },
  {
    slug: "anime-username-generator",
    title: "Anime Username Generator",
    description: "Generate anime-inspired usernames with stylish, dramatic, and character-like energy.",
    exampleNames: ["OtakuNova", "KitsuneBlade", "ShinobiPulse", "SakuraGhost", "RamenKnight"],
    category: "fandom",
  },
  {
    slug: "og-username-finder",
    title: "OG Username Finder",
    description: "Generate rare short usernames with 4 to 5 characters for clean, original gamer tags.",
    exampleNames: ["Nova", "Zyro", "Xeno", "Vyre", "Kiro"],
    category: "style",
  },
  {
    slug: "twitch-username-generator",
    title: "Twitch Username Generator",
    description: "Generate Twitch usernames for streamers, live channels, and creator brands.",
    exampleNames: ["LiveNova", "ChatVortex", "ClipWolf", "StreamKnight", "RaidPhantom"],
    category: "streaming",
  },
  {
    slug: "youtube-username-generator",
    title: "YouTube Username Generator",
    description: "Generate YouTube channel usernames for gaming, creator, and content brands.",
    exampleNames: ["ClipNova", "CreatorWolf", "ChannelRider", "ViralGhost", "StudioKnight"],
    category: "streaming",
  },
  {
    slug: "tiktok-username-generator",
    title: "TikTok Username Generator",
    description: "Generate short and catchy TikTok usernames for creators and trend pages.",
    exampleNames: ["TrendNova", "LoopWolf", "ClipGhost", "VibeRider", "ShortsKnight"],
    category: "social",
  },
  {
    slug: "instagram-username-generator",
    title: "Instagram Username Generator",
    description: "Create stylish Instagram usernames for creators, gamers, and aesthetic profiles.",
    exampleNames: ["NovaFrame", "PixelMuse", "GlowGhost", "AuraRider", "InstaKnight"],
    category: "social",
  },
  {
    slug: "x-username-generator",
    title: "X Username Generator",
    description: "Generate short usernames for X profiles, gaming brands, and creators.",
    exampleNames: ["ByteNova", "PulseTag", "GhostFeed", "TrendWolf", "EchoX"],
    category: "social",
  },
  {
    slug: "reddit-username-generator",
    title: "Reddit Username Generator",
    description: "Generate Reddit usernames for communities, meme accounts, and niche interests.",
    exampleNames: ["ThreadNova", "SubWolf", "KarmaGhost", "PixelThread", "VaultRider"],
    category: "social",
  },
  {
    slug: "xbox-gamertag-generator",
    title: "Xbox Username Generator",
    description: "Generate Xbox usernames for console players, squads, and competitive profiles.",
    exampleNames: ["NovaUnlocked", "HaloGhost", "ForgeWolf", "AchievementRider", "PixelPad"],
    category: "gaming",
  },
  {
    slug: "playstation-name-generator",
    title: "PlayStation Name Generator",
    description: "Generate PlayStation usernames and tags for PS players and creators.",
    exampleNames: ["DualNova", "PadGhost", "ConsoleWolf", "TrophyKnight", "PixelShock"],
    category: "gaming",
  },
  {
    slug: "nintendo-username-generator",
    title: "Nintendo Username Generator",
    description: "Generate Nintendo-friendly usernames for Switch players and fan communities.",
    exampleNames: ["MushroomNova", "JoyWolf", "PixelPlumber", "KartGhost", "HyruleKnight"],
    category: "gaming",
  },
  {
    slug: "cod-name-generator",
    title: "Call of Duty Name Generator",
    description: "Generate tactical and aggressive Call of Duty usernames for multiplayer and Warzone.",
    exampleNames: ["WarzoneNova", "TacticalGhost", "LoadoutWolf", "RapidShot", "SniperLock"],
    category: "gaming",
  },
  {
    slug: "apex-name-generator",
    title: "Apex Name Generator",
    description: "Generate Apex Legends usernames with fast-paced and squad-ready style.",
    exampleNames: ["DropNova", "LegendGhost", "RingRunner", "ApexWolf", "LootDash"],
    category: "gaming",
  },
  {
    slug: "overwatch-name-generator",
    title: "Overwatch Name Generator",
    description: "Generate Overwatch usernames for heroes, support mains, and comp teams.",
    exampleNames: ["PayloadNova", "BlinkWolf", "HeroGhost", "UltKnight", "PulseHealer"],
    category: "gaming",
  },
  {
    slug: "league-of-legends-name-generator",
    title: "League of Legends Name Generator",
    description: "Generate LoL usernames for ranked players, mains, and team identities.",
    exampleNames: ["SummonerNova", "RiftWolf", "BaronGhost", "LaneKnight", "RuneRush"],
    category: "gaming",
  },
  {
    slug: "dota-name-generator",
    title: "Dota Name Generator",
    description: "Generate Dota usernames for carries, mids, supports, and stack play.",
    exampleNames: ["AncientNova", "RoshanWolf", "LaneGhost", "WardKnight", "AegisRush"],
    category: "gaming",
  },
  {
    slug: "cs2-name-generator",
    title: "CS2 Name Generator",
    description: "Generate Counter-Strike style usernames for comp matches and team play.",
    exampleNames: ["ClutchGhost", "AwpNova", "RushBWolf", "PixelCrosshair", "FragKnight"],
    category: "gaming",
  },
  {
    slug: "pubg-name-generator",
    title: "PUBG Name Generator",
    description: "Generate PUBG usernames for battle royale squads and solo grinders.",
    exampleNames: ["ZoneGhost", "DropKnight", "ChickenNova", "LootWolf", "CrateRider"],
    category: "gaming",
  },
  {
    slug: "free-fire-name-generator",
    title: "Free Fire Name Generator",
    description: "Generate Free Fire usernames with fast, stylish, mobile-friendly name ideas.",
    exampleNames: ["FireNova", "MobileGhost", "RushWolf", "TapKnight", "ZoneByte"],
    category: "gaming",
  },
  {
    slug: "ffxiv-name-generator",
    title: "FFXIV Name Generator",
    description: "Generate Final Fantasy XIV style names for characters, guilds, and roleplay.",
    exampleNames: ["EorzeaNova", "CrystalWolf", "AetherKnight", "LalafellGhost", "RaidRider"],
    category: "fantasy",
  },
  {
    slug: "wow-name-generator",
    title: "WoW Name Generator",
    description: "Generate World of Warcraft names for guilds, raids, and class mains.",
    exampleNames: ["AzerothNova", "RaidWolf", "MythicGhost", "FrostKnight", "ManaRider"],
    category: "fantasy",
  },
  {
    slug: "elden-ring-name-generator",
    title: "Elden Ring Name Generator",
    description: "Generate dark fantasy names for Elden Ring characters and builds.",
    exampleNames: ["RuneWarden", "TarnishedWolf", "ErdtreeGhost", "BladeNova", "AshKnight"],
    category: "fantasy",
  },
  {
    slug: "dnd-name-generator",
    title: "D&D Name Generator",
    description: "Generate names for Dungeons & Dragons characters, parties, and campaigns.",
    exampleNames: ["ElderRogue", "MysticNova", "DiceWolf", "ArcaneGhost", "QuestKnight"],
    category: "fantasy",
  },
  {
    slug: "pokemon-username-generator",
    title: "Pokemon Username Generator",
    description: "Generate Pokemon-inspired usernames for trainers, collectors, and fans.",
    exampleNames: ["PikaNova", "TrainerWolf", "PixelMon", "GhostBadge", "EliteKnight"],
    category: "fandom",
  },
  {
    slug: "dragon-ball-username-generator",
    title: "Dragon Ball Username Generator",
    description: "Generate Dragon Ball inspired usernames with anime and power-up energy.",
    exampleNames: ["SaiyanNova", "KameWolf", "UltraGhost", "KiRider", "CapsuleKnight"],
    category: "fandom",
  },
  {
    slug: "naruto-username-generator",
    title: "Naruto Username Generator",
    description: "Generate ninja-themed usernames inspired by Naruto style and anime energy.",
    exampleNames: ["LeafNova", "ShinobiWolf", "ShadowJutsu", "KageGhost", "KunaiKnight"],
    category: "fandom",
  },
  {
    slug: "one-piece-username-generator",
    title: "One Piece Username Generator",
    description: "Generate pirate-themed usernames inspired by One Piece adventures.",
    exampleNames: ["GrandNova", "PirateWolf", "MugiwaraGhost", "OceanRider", "BountyKnight"],
    category: "fandom",
  },
  {
    slug: "kpop-username-generator",
    title: "K-Pop Username Generator",
    description: "Generate stylish K-pop inspired usernames for fan accounts and creators.",
    exampleNames: ["SeoulNova", "StageWolf", "BiasGhost", "NeonAura", "IdolKnight"],
    category: "fandom",
  },
  {
    slug: "cute-username-generator",
    title: "Cute Username Generator",
    description: "Generate cute usernames for social media, gaming profiles, and aesthetic pages.",
    exampleNames: ["HoneyNova", "CloudyWolf", "PeachGhost", "BunnyRider", "SoftKnight"],
    category: "style",
  },
  {
    slug: "dark-username-generator",
    title: "Dark Username Generator",
    description: "Generate dark usernames with shadow, void, and gothic inspired naming styles.",
    exampleNames: ["VoidNova", "CryptWolf", "AbyssGhost", "NightRider", "DreadKnight"],
    category: "style",
  },
  {
    slug: "cool-username-generator",
    title: "Cool Username Generator",
    description: "Generate cool usernames for gaming, streaming, and social media branding.",
    exampleNames: ["NovaStrike", "CyberWolf", "GhostByte", "TurboRider", "PulseKnight"],
    category: "style",
  },
  {
    slug: "funny-username-generator",
    title: "Funny Username Generator",
    description: "Generate funny usernames for memes, gaming accounts, and community profiles.",
    exampleNames: ["WaffleNova", "BananaWolf", "DerpGhost", "NoodleRider", "PickleKnight"],
    category: "style",
  },
  {
    slug: "aesthetic-username-generator",
    title: "Aesthetic Username Generator",
    description: "Generate aesthetic usernames with soft, dreamy, and stylish vibes.",
    exampleNames: ["LunaGlow", "CloudMuse", "AuraNova", "VelvetGhost", "IrisWave"],
    category: "style",
  },
  {
    slug: "hacker-username-generator",
    title: "Hacker Username Generator",
    description: "Generate hacker-style usernames with cyber, glitch, and terminal-inspired energy.",
    exampleNames: ["ZeroHex", "ByteGhost", "KernelNova", "NullWolf", "CipherNode"],
    category: "style",
  },
  {
    slug: "streamer-name-generator",
    title: "Streamer Name Generator",
    description: "Generate streamer names for live channels, gaming creators, and content brands.",
    exampleNames: ["LiveRider", "ClipNova", "RaidWolf", "PrimeGhost", "HypeKnight"],
    category: "streaming",
  },
  {
    slug: "vtuber-name-generator",
    title: "VTuber Name Generator",
    description: "Generate VTuber-style names for virtual creators and anime-inspired channels.",
    exampleNames: ["NeoKitsune", "AuraNova", "StarGhost", "PixelMuse", "VTubeKnight"],
    category: "streaming",
  },
  {
    slug: "esports-team-name-generator",
    title: "Esports Team Name Generator",
    description: "Generate esports team names for organizations, squads, and amateur rosters.",
    exampleNames: ["Nova Legion", "Phantom Core", "Crimson Circuit", "Echo Vanguard", "Storm Dynasty"],
    category: "team",
  },
  {
    slug: "guild-name-generator",
    title: "Guild Name Generator",
    description: "Generate guild names for RPG groups, MMO rosters, and online communities.",
    exampleNames: ["Silver Covenant", "Rune Vanguard", "Shadow Order", "Stormkeepers", "Moonbound Circle"],
    category: "team",
  },
  {
    slug: "duo-name-generator",
    title: "Duo Name Generator",
    description: "Generate duo names for gaming partners, creators, and friends.",
    exampleNames: ["Nova & Ghost", "Pixel Pair", "Shadow Sync", "Twin Vortex", "Turbo Duo"],
    category: "team",
  },
  {
    slug: "squad-name-generator",
    title: "Squad Name Generator",
    description: "Generate squad names for shooters, battle royale teams, and gaming groups.",
    exampleNames: ["Night Unit", "Storm Pack", "Echo Squad", "Crimson Rush", "Void Crew"],
    category: "team",
  },
  {
    slug: "pet-name-generator",
    title: "Pet Name Generator",
    description: "Generate cute pet names for in-game companions, mascots, and avatars.",
    exampleNames: ["PixelPaw", "NovaFluff", "GhostBean", "WolfyByte", "SparkTail"],
    category: "fun",
  },
  {
    slug: "guild-tag-generator",
    title: "Guild Tag Generator",
    description: "Generate short guild tags and prefixes for online groups and clans.",
    exampleNames: ["NVA", "EKO", "VLD", "RNE", "GST"],
    category: "team",
  },
  {
    slug: "username-ideas-generator",
    title: "Username Ideas Generator",
    description: "Generate broad username ideas for games, social media, and creator branding.",
    exampleNames: ["NovaEcho", "PixelStrike", "GhostStorm", "TurboWolf", "KnightByte"],
    category: "style",
  },
  {
    slug: "gamer-tag-generator",
    title: "NameLaunchpad",
    description: "Generate cross-platform username ideas for console, PC, Discord, and creator use.",
    exampleNames: ["ShadowNova", "CyberWolf", "PixelGhost", "VoidRider", "NovaKnight"],
    category: "gaming",
  },
  {
    slug: "social-media-username-generator",
    title: "Social Media Username Generator",
    description: "Generate usernames for TikTok, Instagram, X, Discord, and creator profiles.",
    exampleNames: ["TrendNova", "AuraWolf", "ClipGhost", "SocialRider", "EchoHandle"],
    category: "social",
  },
  {
    slug: "fps-name-generator",
    title: "FPS Name Generator",
    description: "Generate sharp FPS usernames for comp shooters, montages, and ranked profiles.",
    exampleNames: ["QuickScope", "CrosshairNova", "RushGhost", "FragWolf", "SnapKnight"],
    category: "gaming",
  },
  {
    slug: "survival-game-name-generator",
    title: "Survival Game Name Generator",
    description: "Generate survival game usernames for crafting, hardcore, and exploration players.",
    exampleNames: ["WildernessNova", "StoneWolf", "AshGhost", "RaidRider", "CraftKnight"],
    category: "gaming",
  },
  ...buildAutoExpandedGenerators(),
];

function buildAutoExpandedGenerators(): GeneratorDirectoryEntry[] {
  const existingSlugs = new Set([
    "fortnite-name-generator",
    "minecraft-name-generator",
    "roblox-username-generator",
    "valorant-name-generator",
    "discord-username-generator",
    "steam-gamertag-generator",
    "clan-name-generator",
    "fantasy-name-generator",
    "anime-username-generator",
    "og-username-finder",
    "twitch-username-generator",
    "youtube-username-generator",
    "tiktok-username-generator",
    "instagram-username-generator",
    "x-username-generator",
    "reddit-username-generator",
    "xbox-gamertag-generator",
    "playstation-name-generator",
    "nintendo-username-generator",
    "cod-name-generator",
    "apex-name-generator",
    "overwatch-name-generator",
    "league-of-legends-name-generator",
    "dota-name-generator",
    "cs2-name-generator",
    "pubg-name-generator",
    "free-fire-name-generator",
    "ffxiv-name-generator",
    "wow-name-generator",
    "elden-ring-name-generator",
    "dnd-name-generator",
    "pokemon-username-generator",
    "dragon-ball-username-generator",
    "naruto-username-generator",
    "one-piece-username-generator",
    "kpop-username-generator",
    "cute-username-generator",
    "dark-username-generator",
    "cool-username-generator",
    "funny-username-generator",
    "aesthetic-username-generator",
    "hacker-username-generator",
    "streamer-name-generator",
    "vtuber-name-generator",
    "esports-team-name-generator",
    "guild-name-generator",
    "duo-name-generator",
    "squad-name-generator",
    "pet-name-generator",
    "guild-tag-generator",
    "username-ideas-generator",
    "gamer-tag-generator",
    "social-media-username-generator",
    "fps-name-generator",
    "survival-game-name-generator",
  ]);

  const themes: Array<{ slug: string; label: string; category: string; seed: string }> = [
    { slug: "minecraft", label: "Minecraft", category: "gaming", seed: "Block" },
    { slug: "valorant", label: "Valorant", category: "gaming", seed: "Clutch" },
    { slug: "apex", label: "Apex", category: "gaming", seed: "Legend" },
    { slug: "cod", label: "COD", category: "gaming", seed: "Tactical" },
    { slug: "pubg", label: "PUBG", category: "gaming", seed: "Drop" },
    { slug: "steam", label: "Steam", category: "gaming", seed: "Valve" },
    { slug: "xbox", label: "Xbox", category: "gaming", seed: "Halo" },
    { slug: "psn", label: "PSN", category: "gaming", seed: "Dual" },
    { slug: "playstation", label: "PlayStation", category: "gaming", seed: "Shock" },
    { slug: "nintendo", label: "Nintendo", category: "gaming", seed: "Joy" },
    { slug: "fortnite", label: "Fortnite", category: "gaming", seed: "Storm" },
    { slug: "roblox", label: "Roblox", category: "gaming", seed: "Obby" },
    { slug: "halo", label: "Halo", category: "gaming", seed: "Spartan" },
    { slug: "rocket-league", label: "Rocket League", category: "gaming", seed: "Boost" },
    { slug: "gta", label: "GTA", category: "gaming", seed: "Vice" },
    { slug: "rainbow-six", label: "Rainbow Six", category: "gaming", seed: "Siege" },
    { slug: "battlefield", label: "Battlefield", category: "gaming", seed: "Squad" },
    { slug: "fifa", label: "FIFA", category: "gaming", seed: "Goal" },
    { slug: "ea-fc", label: "EA FC", category: "gaming", seed: "Ultra" },
    { slug: "overwatch", label: "Overwatch", category: "gaming", seed: "Payload" },
    { slug: "league-of-legends", label: "League of Legends", category: "gaming", seed: "Rift" },
    { slug: "dota", label: "Dota", category: "gaming", seed: "Ancient" },
    { slug: "cs2", label: "CS2", category: "gaming", seed: "Frag" },
    { slug: "free-fire", label: "Free Fire", category: "gaming", seed: "Rush" },
    { slug: "twitch", label: "Twitch", category: "streaming", seed: "Live" },
    { slug: "youtube", label: "YouTube", category: "streaming", seed: "Clip" },
    { slug: "discord", label: "Discord", category: "social", seed: "Echo" },
    { slug: "tiktok", label: "TikTok", category: "social", seed: "Trend" },
    { slug: "instagram", label: "Instagram", category: "social", seed: "Aura" },
    { slug: "reddit", label: "Reddit", category: "social", seed: "Thread" },
    { slug: "kick", label: "Kick", category: "streaming", seed: "Prime" },
    { slug: "twitter", label: "Twitter", category: "social", seed: "Tweet" },
    { slug: "x", label: "X", category: "social", seed: "Pulse" },
    { slug: "pokemon", label: "Pokemon", category: "fandom", seed: "Trainer" },
    { slug: "naruto", label: "Naruto", category: "fandom", seed: "Shinobi" },
    { slug: "one-piece", label: "One Piece", category: "fandom", seed: "Pirate" },
    { slug: "dragon-ball", label: "Dragon Ball", category: "fandom", seed: "Saiyan" },
    { slug: "anime", label: "Anime", category: "fandom", seed: "Kitsune" },
    { slug: "dragon", label: "Dragon", category: "fantasy", seed: "Dragon" },
    { slug: "demon", label: "Demon", category: "fantasy", seed: "Demon" },
    { slug: "elf", label: "Elf", category: "fantasy", seed: "Elf" },
    { slug: "wizard", label: "Wizard", category: "fantasy", seed: "Wizard" },
    { slug: "knight", label: "Knight", category: "fantasy", seed: "Knight" },
    { slug: "dnd", label: "D&D", category: "fantasy", seed: "Arcane" },
    { slug: "elden-ring", label: "Elden Ring", category: "fantasy", seed: "Rune" },
    { slug: "wow", label: "WoW", category: "fantasy", seed: "Azeroth" },
    { slug: "fantasy", label: "Fantasy", category: "fantasy", seed: "Myth" },
    { slug: "cool", label: "Cool", category: "style", seed: "Nova" },
    { slug: "funny", label: "Funny", category: "style", seed: "Meme" },
    { slug: "rare", label: "Rare", category: "style", seed: "Vyre" },
    { slug: "short", label: "Short", category: "style", seed: "Zyro" },
    { slug: "aesthetic", label: "Aesthetic", category: "style", seed: "Luna" },
    { slug: "hacker", label: "Hacker", category: "style", seed: "Cipher" },
    { slug: "streamer", label: "Streamer", category: "streaming", seed: "Raid" },
    { slug: "clan", label: "Clan", category: "team", seed: "Legion" },
    { slug: "duo", label: "Duo", category: "team", seed: "Twin" },
    { slug: "tech", label: "Tech", category: "style", seed: "Byte" },
    { slug: "dark", label: "Dark", category: "style", seed: "Void" },
  ];

  const variants: Array<{ slugSuffix: string; titleSuffix: string; descriptionNoun: string }> = [
    { slugSuffix: "username-generator", titleSuffix: "Username Generator", descriptionNoun: "usernames" },
    { slugSuffix: "name-generator", titleSuffix: "Name Generator", descriptionNoun: "name ideas" },
    { slugSuffix: "gamertag-generator", titleSuffix: "Gamertag Generator", descriptionNoun: "gamertags" },
    { slugSuffix: "handle-generator", titleSuffix: "Handle Generator", descriptionNoun: "handles" },
    { slugSuffix: "alias-generator", titleSuffix: "Alias Generator", descriptionNoun: "aliases" },
    { slugSuffix: "tag-generator", titleSuffix: "Tag Generator", descriptionNoun: "tags" },
    { slugSuffix: "ideas-generator", titleSuffix: "Ideas Generator", descriptionNoun: "username ideas" },
    { slugSuffix: "clan-name-generator", titleSuffix: "Clan Name Generator", descriptionNoun: "clan names" },
    { slugSuffix: "duo-name-generator", titleSuffix: "Duo Name Generator", descriptionNoun: "duo names" },
    { slugSuffix: "team-name-generator", titleSuffix: "Team Name Generator", descriptionNoun: "team names" },
  ];

  const entries: GeneratorDirectoryEntry[] = [];

  for (const theme of themes) {
    for (const variant of variants) {
      const slug = `${theme.slug}-${variant.slugSuffix}`;
      if (existingSlugs.has(slug)) continue;
      existingSlugs.add(slug);

      entries.push({
        slug,
        title: `${theme.label} ${variant.titleSuffix}`,
        description: `Generate ${theme.label} ${variant.descriptionNoun} for gaming profiles, social handles, teams, and creator branding on NameLaunchpad.`,
        exampleNames: buildExpandedExamples(theme.seed, theme.label),
        category: theme.category,
      });
    }
  }

  return entries.slice(0, 520);
}

function buildExpandedExamples(seed: string, label: string) {
  const shortLabel = label.replace(/[^A-Za-z0-9]/g, "").slice(0, 8) || "Nova";
  return [
    `${seed}Nova`,
    `${shortLabel}Wolf`,
    `${seed}Ghost`,
    `${shortLabel}Knight`,
    `${seed}Rider`,
  ];
}

export const generatorSlugs = generatorDatabase.map((entry) => entry.slug);

export function getGeneratorEntry(slug: string) {
  return generatorDatabase.find((entry) => entry.slug === slug);
}

export function getGeneratorCategory(slug: GeneratorCategorySlug) {
  return generatorCategories.find((category) => category.slug === slug);
}

export function getEntryCategorySlugs(entry: GeneratorDirectoryEntry): GeneratorCategorySlug[] {
  const matches = new Set<GeneratorCategorySlug>();
  const combined = `${entry.slug} ${entry.title} ${entry.category}`.toLowerCase();

  if (
    entry.category === "gaming" ||
    entry.category === "team" ||
    combined.includes("gamertag") ||
    combined.includes("fortnite") ||
    combined.includes("minecraft") ||
    combined.includes("valorant") ||
    combined.includes("steam") ||
    combined.includes("xbox") ||
    combined.includes("playstation") ||
    combined.includes("psn") ||
    combined.includes("nintendo") ||
    combined.includes("apex") ||
    combined.includes("overwatch") ||
    combined.includes("league") ||
    combined.includes("dota") ||
    combined.includes("cs2") ||
    combined.includes("pubg") ||
    combined.includes("free fire") ||
    combined.includes("halo") ||
    combined.includes("rocket league") ||
    combined.includes("gta") ||
    combined.includes("rainbow six") ||
    combined.includes("battlefield") ||
    combined.includes("fifa") ||
    combined.includes("ea fc") ||
    combined.includes("fps") ||
    combined.includes("survival game")
  ) {
    matches.add("gaming");
  }

  if (
    entry.category === "social" ||
    combined.includes("discord") ||
    combined.includes("instagram") ||
    combined.includes("reddit") ||
    combined.includes("social media") ||
    combined.includes("tiktok") ||
    combined.includes("twitter") ||
    combined.includes("x username") ||
    combined.includes("handle")
  ) {
    matches.add("social-media");
  }

  if (
    entry.category === "fantasy" ||
    combined.includes("fantasy") ||
    combined.includes("guild") ||
    combined.includes("d&d") ||
    combined.includes("dragon") ||
    combined.includes("demon") ||
    combined.includes("elf") ||
    combined.includes("wizard") ||
    combined.includes("knight") ||
    combined.includes("elden ring") ||
    combined.includes("wow")
  ) {
    matches.add("fantasy");
  }

  if (
    combined.includes("anime") ||
    combined.includes("naruto") ||
    combined.includes("dragon ball") ||
    combined.includes("one piece") ||
    combined.includes("pokemon") ||
    combined.includes("vtuber")
  ) {
    matches.add("anime");
  }

  if (combined.includes("cool") || combined.includes("nova") || combined.includes("premium")) {
    matches.add("cool");
  }

  if (combined.includes("funny") || combined.includes("pet") || combined.includes("meme")) {
    matches.add("funny");
  }

  if (combined.includes("rare") || combined.includes("og") || combined.includes("original")) {
    matches.add("rare");
  }

  if (combined.includes("short") || combined.includes("4 letter") || combined.includes("5 letter")) {
    matches.add("short");
  }

  if (combined.includes("aesthetic") || combined.includes("cute") || combined.includes("soft") || combined.includes("dream")) {
    matches.add("aesthetic");
  }

  if (entry.category === "streaming" || combined.includes("twitch") || combined.includes("youtube") || combined.includes("streamer") || combined.includes("kick")) {
    matches.add("streamer");
  }

  if (entry.category === "team" || combined.includes("clan") || combined.includes("guild tag") || combined.includes("squad")) {
    matches.add("clan");
  }

  if (combined.includes("duo") || combined.includes("pair") || combined.includes("twin")) {
    matches.add("duo");
  }

  if (combined.includes("tech") || combined.includes("byte") || combined.includes("cyber") || combined.includes("digital") || combined.includes("software")) {
    matches.add("tech");
  }

  if (combined.includes("dark") || combined.includes("void") || combined.includes("shadow") || combined.includes("abyss")) {
    matches.add("dark");
  }

  if (combined.includes("hacker") || combined.includes("cipher") || combined.includes("glitch") || combined.includes("terminal")) {
    matches.add("hacker");
  }

  return Array.from(matches);
}

export function getGeneratorsByCategory(slug: GeneratorCategorySlug): GeneratorDirectoryEntry[] {
  return generatorDatabase.filter((entry) => getEntryCategorySlugs(entry).includes(slug));
}

const relatedGeneratorFallbacks: Record<string, string[]> = {
  "fortnite-name-generator": [
    "gamer-tag-generator",
    "clan-name-generator",
    "streamer-name-generator",
    "twitch-username-generator",
    "cool-username-generator",
  ],
  "roblox-username-generator": [
    "minecraft-name-generator",
    "discord-username-generator",
    "cute-username-generator",
    "gamer-tag-generator",
    "anime-username-generator",
  ],
  "minecraft-name-generator": [
    "roblox-username-generator",
    "fantasy-name-generator",
    "survival-game-name-generator",
    "discord-username-generator",
    "gamer-tag-generator",
  ],
  "valorant-name-generator": [
    "fps-name-generator",
    "twitch-username-generator",
    "clan-name-generator",
    "cool-username-generator",
    "gamer-tag-generator",
  ],
  "discord-username-generator": [
    "twitch-username-generator",
    "streamer-name-generator",
    "clan-name-generator",
    "social-media-username-generator",
    "cool-username-generator",
  ],
};

export function getRelatedGenerators(slug: string, amount = 5): GeneratorDirectoryEntry[] {
  const current = getGeneratorEntry(slug);
  if (!current) return [];

  const fallbackSlugs = relatedGeneratorFallbacks[slug] ?? [];
  const fallbackEntries = fallbackSlugs
    .map((relatedSlug) => getGeneratorEntry(relatedSlug))
    .filter((entry): entry is GeneratorDirectoryEntry => entry !== undefined)
    .filter((entry) => entry.slug !== slug);

  const categoryEntries = generatorDatabase.filter(
    (entry) => entry.slug !== slug && entry.category === current.category && !fallbackSlugs.includes(entry.slug)
  );

  const mixedEntries = generatorDatabase.filter(
    (entry) =>
      entry.slug !== slug &&
      entry.category !== current.category &&
      !fallbackSlugs.includes(entry.slug) &&
      !categoryEntries.some((categoryEntry) => categoryEntry.slug === entry.slug)
  );

  return [...fallbackEntries, ...categoryEntries, ...mixedEntries].slice(0, amount);
}

export type UsernameStyle =
  | "cool"
  | "aesthetic"
  | "dark"
  | "funny"
  | "fantasy"
  | "hacker"
  | "anime"
  | "streamer";

export type UsernameLengthFilter = "short" | "medium" | "long";

const prefixes = [
  "Shadow",
  "Cyber",
  "Nova",
  "Ghost",
  "Pixel",
  "Void",
  "Storm",
  "Dark",
  "Neon",
  "Alpha",
  "Omega",
  "Hyper",
  "Turbo",
  "Blaze",
  "Frost",
  "Crimson",
  "Iron",
  "Silent",
  "Rapid",
  "Night",
  "Phantom",
  "Titan",
  "Aero",
  "Solar",
  "Lunar",
  "Quantum",
  "Viral",
  "Savage",
  "Fatal",
  "Arc",
  "Zero",
  "Prime",
  "Steel",
  "Venom",
  "Obsidian",
  "Inferno",
  "Thunder",
  "Mystic",
  "Rune",
  "Drift",
  "Pulse",
  "Nova",
  "Vortex",
  "Echo",
  "Glitch",
  "Spectral",
  "Rogue",
  "Astral",
  "Chrome",
  "Velocity",
  "Warden",
];

const suffixes = [
  "Strike",
  "Slayer",
  "Knight",
  "Hunter",
  "Rider",
  "Phantom",
  "Sniper",
  "Lord",
  "Wolf",
  "Storm",
  "Pulse",
  "Echo",
  "Rush",
  "Drift",
  "Rogue",
  "Byte",
  "Blade",
  "Vortex",
  "Shadow",
  "Ghost",
  "Fang",
  "Core",
  "Nova",
  "Breaker",
  "Warden",
  "Reaper",
  "Ranger",
  "Havoc",
  "Blitz",
  "Cipher",
  "Mancer",
  "Master",
  "Sentinel",
  "Legend",
  "Assassin",
  "Raider",
  "Champion",
  "Operator",
  "Crusher",
  "Samurai",
  "Titan",
  "Spark",
  "Glitch",
  "Shade",
  "Caster",
  "Seeker",
  "Specter",
  "Guardian",
  "Claw",
  "Fury",
];

const robloxWords = [
  "Block",
  "Craft",
  "Pixel",
  "Tycoon",
  "Quest",
  "Build",
  "Tower",
  "Realm",
];

const fortniteWords = [
  "Victory",
  "Drop",
  "Zone",
  "Squad",
  "Edit",
  "Crank",
  "Sniper",
  "Loot",
];

const fortnitePrefixes = [
  "Storm",
  "Victory",
  "Loot",
  "Battle",
  "Shield",
  "Turbo",
  "Rapid",
  "Tactical",
  "Drop",
  "Zone",
];

const fortniteCore = [
  "Sniper",
  "Vortex",
  "Phantom",
  "Nova",
  "Breaker",
  "Builder",
  "Rusher",
  "Ranger",
  "Hunter",
  "Raider",
];

const fortniteSuffixes = [
  "X",
  "GG",
  "Rush",
  "Edit",
  "Shot",
  "Drop",
  "Zone",
  "King",
  "Ace",
  "Pro",
];

const fantasyWords = [
  "Dragon",
  "Raven",
  "Arcane",
  "Rune",
  "Elder",
  "Mystic",
  "Ember",
  "Warden",
];

const fantasyPrefixes = [
  "Shadow",
  "Dragon",
  "Storm",
  "Night",
  "Frost",
  "Iron",
  "Rune",
  "Blood",
  "Moon",
  "Dawn",
];

const fantasySuffixes = [
  "bane",
  "slayer",
  "warden",
  "fang",
  "knight",
  "blade",
  "seer",
  "weaver",
  "caller",
  "born",
];

const ogShortNames = [
  "Nova",
  "Zyro",
  "Xeno",
  "Vyre",
  "Kiro",
  "Sora",
  "Zeki",
  "Nexo",
  "Aero",
  "Kyro",
  "Raze",
  "Vexo",
  "Taro",
  "Nyro",
  "Kova",
  "Luvo",
  "Zaro",
  "Varo",
  "Xyro",
  "Kyzen",
  "Drex",
  "Nyx",
  "Rivo",
  "Zeph",
  "Aven",
  "Koda",
  "Vexa",
  "Zuno",
  "Rynx",
  "Tyro",
];

const clanWords = [
  "Legion",
  "Guard",
  "Dynasty",
  "Order",
  "Syndicate",
  "Collective",
  "Vanguard",
  "Faction",
];

const robloxPrefixes = [
  "Blocky",
  "Pixel",
  "Noob",
  "Obby",
  "Cube",
  "Crafty",
  "Brick",
  "Mega",
  "Happy",
  "Turbo",
];

const robloxCoreWords = [
  "Warrior",
  "Builder",
  "Destroyer",
  "Master",
  "Champion",
  "Runner",
  "Jumper",
  "Crafter",
  "Explorer",
  "Hero",
];

const robloxSuffixes = [
  "Kid",
  "Playz",
  "Quest",
  "Fun",
  "Star",
  "Buddy",
  "Spark",
  "Pro",
  "Legend",
  "Gamer",
];

const offensiveBlocklist = [
  "kill",
  "hate",
  "nazi",
  "sex",
  "slur",
  "drug",
  "suicide",
  "terror",
  "racist",
  "abuse",
];

const styleProfiles: Record<
  UsernameStyle,
  { core: string[]; prefix: string[]; suffix: string[]; numberRate: number }
> = {
  cool: {
    core: [
      "Nova",
      "Cyber",
      "Phantom",
      "Pixel",
      "Vortex",
      "Turbo",
      "Pulse",
      "Blitz",
      "Chrome",
      "Velocity",
      "Arcade",
      "Drift",
      "Echo",
      "Savage",
      "Nitro",
      "Reactor",
    ],
    prefix: ["Shadow", "Neon", "Hyper", "Omega", "Aero", "Frost", "Prime", "Rapid", "Solar", "Quantum"],
    suffix: ["Wolf", "Knight", "Rider", "Strike", "Drift", "Storm", "Blaze", "Legend", "Breaker", "Core"],
    numberRate: 0.32,
  },
  funny: {
    core: ["Meme", "Waffle", "Noodle", "Banana", "Goblin", "Pickle", "Derp", "Giggle", "Biscuit", "Muffin", "Taco", "Toaster"],
    prefix: ["Sir", "Captain", "Bouncy", "Sneaky", "Loopy", "Chunky", "Wobbly", "Goofy", "Captain", "Tiny"],
    suffix: ["Pants", "Face", "Nugget", "Wizard", "Chimp", "Potato", "Toast", "Boi", "Pickles", "McGee"],
    numberRate: 0.25,
  },
  dark: {
    core: ["Abyss", "Reaper", "Night", "Venom", "Obsidian", "Grim", "Nocturne", "Dread", "Crypt", "Shade", "Ruin", "Hollow"],
    prefix: ["Shadow", "Void", "Black", "Crypt", "Silent", "Blood", "Dark", "Night", "Phantom", "Obsidian"],
    suffix: ["Fang", "Ruin", "Wraith", "Rogue", "Hex", "Hunter", "Reaper", "Shade", "Lord", "Claw"],
    numberRate: 0.2,
  },
  aesthetic: {
    core: ["Luna", "Velvet", "Halo", "Iris", "Opal", "Aura", "Cloud", "Echo", "Blush", "Satin", "Muse", "Pearl"],
    prefix: ["Neo", "Soft", "Pastel", "Astral", "Moon", "Dream", "Velvet", "Glimmer", "Cotton", "Rose"],
    suffix: ["Glow", "Bloom", "Wave", "Muse", "Mist", "Vibe", "Dusk", "Dawn", "Skies", "Aura"],
    numberRate: 0.12,
  },
  fantasy: {
    core: ["Dragon", "Arcane", "Rune", "Elder", "Myth", "Phoenix", "Titan", "Warden", "Ember", "Griffin", "Mystic", "Paladin"],
    prefix: ["Iron", "Storm", "Silver", "Eternal", "Ancient", "Crimson", "Rune", "Shadow", "Moon", "Dawn"],
    suffix: ["Blade", "Mage", "King", "Raven", "Oracle", "Knight", "Warden", "Seer", "Slayer", "Caller"],
    numberRate: 0.18,
  },
  hacker: {
    core: ["Cipher", "Null", "Root", "Glitch", "Hex", "Kernel", "Ghost", "Proxy", "Byte", "Socket", "Packet", "Daemon"],
    prefix: ["Zero", "Byte", "Cyber", "Dark", "Silent", "Quantum", "Root", "Null", "Ghost", "Binary"],
    suffix: ["Script", "Inject", "Node", "Bit", "Shell", "Trace", "Hack", "Code", "Cipher", "Stack"],
    numberRate: 0.45,
  },
  anime: {
    core: ["Kitsune", "Shinobi", "Sakura", "Otaku", "Ronin", "Senpai", "Neko", "Yokai", "Kage", "Kami", "Akira", "Hikari"],
    prefix: ["Neo", "Shadow", "Crimson", "Lunar", "Ghost", "Silver", "Storm", "Nova", "Tokyo", "Spirit"],
    suffix: ["Chan", "Kun", "Blade", "Pulse", "Soul", "Wave", "Fang", "Aura", "X", "Sensei"],
    numberRate: 0.22,
  },
  streamer: {
    core: ["Live", "Clip", "Hype", "Chat", "Prime", "Epic", "Focus", "Raid", "Cast", "Stage", "Channel", "Creator"],
    prefix: ["Pro", "Ultra", "Neon", "GG", "Turbo", "Real", "Live", "Prime", "Top", "Next"],
    suffix: ["TV", "Plays", "Live", "GG", "Stream", "Arena", "HQ", "Clips", "Show", "Zone"],
    numberRate: 0.4,
  },
};

function randomFrom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function withNumber(name: string) {
  return Math.random() > 0.55 ? `${name}${Math.floor(10 + Math.random() * 890)}` : name;
}

function sanitizeToken(token: string) {
  return token.replace(/[^a-zA-Z0-9]/g, "");
}

function splitNameTokens(value: string) {
  return value
    .split(/(?=[A-Z])|[^a-zA-Z0-9]+/)
    .map((token) => toPascal(sanitizeToken(token)))
    .filter(Boolean);
}

function clampLength(length: number) {
  return Math.min(20, Math.max(6, Math.round(length)));
}

function toPascal(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

function applyHackerTransform(value: string) {
  return value
    .replace(/a/gi, "@")
    .replace(/e/gi, "3")
    .replace(/i/gi, "1")
    .replace(/o/gi, "0")
    .replace(/s/gi, "5");
}

function uniqueMerge(...lists: string[][]) {
  return Array.from(new Set(lists.flat()));
}

function generateNumberToken() {
  const roll = Math.random();
  if (roll < 0.15) return String(Math.floor(1 + Math.random() * 9));
  if (roll < 0.45) return String(Math.floor(10 + Math.random() * 90));
  if (roll < 0.85) return String(Math.floor(100 + Math.random() * 900));
  return String(Math.floor(1000 + Math.random() * 9000));
}

function capitalizeFirst(value: string) {
  if (!value) return "";
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function buildPatternCandidate({
  prefixesPool,
  corePool,
  suffixesPool,
  keywordPool,
  numberRate,
}: {
  prefixesPool: string[];
  corePool: string[];
  suffixesPool: string[];
  keywordPool: string[];
  numberRate: number;
}) {
  const prefix = randomFrom(prefixesPool);
  const core = randomFrom(corePool);
  const keyword = keywordPool.length > 0 && Math.random() > 0.4 ? randomFrom(keywordPool) : core;
  const suffix = randomFrom(suffixesPool);
  const number = generateNumberToken();
  const includeNumber = Math.random() < numberRate;

  const structures = [
    `${prefix}${keyword}`,
    `${core}${suffix}`,
    `${prefix}${core}${includeNumber ? number : ""}`,
    `${prefix}${core}${suffix}`,
    `${keyword}${suffix}${includeNumber ? number : ""}`,
    `${core}${includeNumber ? number : ""}`,
  ];

  return capitalizeFirst(randomFrom(structures));
}

function normalizeLengthRange(length: number, minLength?: number, maxLength?: number) {
  if (typeof minLength === "number" && typeof maxLength === "number") {
    const safeMin = Math.max(4, Math.min(15, Math.round(minLength)));
    const safeMax = Math.max(safeMin, Math.min(15, Math.round(maxLength)));
    return { minLength: safeMin, maxLength: safeMax };
  }

  const targetLength = clampLength(length);
  return {
    minLength: Math.max(6, targetLength - 3),
    maxLength: targetLength + 3,
  };
}

function fitCandidateLength(candidate: string, minLength: number, maxLength: number, fallbackPool: string[]) {
  if (candidate.length >= minLength && candidate.length <= maxLength) return candidate;

  if (candidate.length < minLength) {
    let grown = candidate;
    while (grown.length < minLength) {
      grown += randomFrom(fallbackPool);
    }
    if (grown.length > maxLength) return null;
    return grown;
  }

  return null;
}

export function generateUsernames({
  keywords,
  length,
  style,
  amount = 20,
  minLength,
  maxLength,
}: {
  keywords: string[];
  length: number;
  style: UsernameStyle;
  amount?: number;
  minLength?: number;
  maxLength?: number;
}): string[] {
  const safeAmount = Math.max(1, amount);
  const range = normalizeLengthRange(length, minLength, maxLength);
  const profile = styleProfiles[style];
  const normalizedKeywords = keywords.map((k) => toPascal(sanitizeToken(k))).filter(Boolean);
  const prefixesPool = uniqueMerge(prefixes, profile.prefix);
  const corePool = uniqueMerge(profile.core, normalizedKeywords);
  const suffixesPool = uniqueMerge(suffixes, profile.suffix);
  const output = new Set<string>();
  let attempts = 0;
  const maxAttempts = safeAmount * 150;

  while (output.size < safeAmount && attempts < maxAttempts) {
    attempts += 1;
    let candidate = buildPatternCandidate({
      prefixesPool,
      corePool,
      suffixesPool,
      keywordPool: normalizedKeywords,
      numberRate: profile.numberRate,
    });

    if (style === "hacker" && Math.random() > 0.3) {
      candidate = applyHackerTransform(candidate);
    }

    const fitted = fitCandidateLength(candidate, range.minLength, range.maxLength, suffixesPool);
    if (!fitted) continue;

    if (/^[A-Za-z0-9@]+$/.test(fitted)) {
      output.add(fitted);
    }
  }

  while (output.size < safeAmount && attempts < maxAttempts * 2) {
    attempts += 1;
    let fallback = `${randomFrom(prefixesPool)}${randomFrom(corePool)}${generateNumberToken()}`;
    if (style === "hacker") fallback = applyHackerTransform(fallback);
    const fittedFallback = fitCandidateLength(fallback, range.minLength, range.maxLength, suffixesPool);
    if (fittedFallback && /^[A-Za-z0-9@]+$/.test(fittedFallback)) {
      output.add(fittedFallback);
    }
  }

  return Array.from(output);
}

export function generateSimilarUsernames({
  baseName,
  style,
  amount = 10,
  minLength,
  maxLength,
}: {
  baseName: string;
  style: UsernameStyle;
  amount?: number;
  minLength?: number;
  maxLength?: number;
}) {
  const safeAmount = Math.max(1, amount);
  const profile = styleProfiles[style];
  const baseTokens = splitNameTokens(baseName);
  const keywordPool = baseTokens.length > 0 ? baseTokens : [toPascal(sanitizeToken(baseName))].filter(Boolean);
  const prefixesPool = uniqueMerge(prefixes, profile.prefix, keywordPool);
  const corePool = uniqueMerge(profile.core, keywordPool);
  const suffixesPool = uniqueMerge(suffixes, profile.suffix, keywordPool);
  const range = normalizeLengthRange(maxLength ?? 10, minLength, maxLength);
  const output = new Set<string>();
  let attempts = 0;
  const maxAttempts = safeAmount * 160;

  while (output.size < safeAmount && attempts < maxAttempts) {
    attempts += 1;
    const first = randomFrom(keywordPool.length > 0 ? keywordPool : corePool);
    const second = randomFrom(corePool);
    const prefix = randomFrom(prefixesPool);
    const suffix = randomFrom(suffixesPool);
    const includeNumber = Math.random() < Math.max(0.12, profile.numberRate * 0.6);
    const number = includeNumber ? generateNumberToken() : "";
    const structures = [
      `${first}${suffix}`,
      `${prefix}${first}`,
      `${first}${second}`,
      `${second}${first}`,
      `${prefix}${second}`,
      `${first}${suffix}${number}`,
    ];

    let candidate = capitalizeFirst(randomFrom(structures));
    if (style === "hacker" && Math.random() > 0.35) {
      candidate = applyHackerTransform(candidate);
    }

    if (candidate === baseName) continue;
    const fitted = fitCandidateLength(candidate, range.minLength, range.maxLength, suffixesPool);
    if (!fitted || fitted === baseName) continue;
    if (/^[A-Za-z0-9@]+$/.test(fitted)) {
      output.add(fitted);
    }
  }

  return Array.from(output);
}

export function generateFortniteNames({ keyword = "", amount = 30 }: { keyword?: string; amount?: number }): string[] {
  const safeAmount = Math.max(1, amount);
  const safeKeyword = toPascal(sanitizeToken(keyword));
  const output = new Set<string>();
  let attempts = 0;
  const maxAttempts = safeAmount * 120;

  while (output.size < safeAmount && attempts < maxAttempts) {
    attempts += 1;
    const prefix = randomFrom(fortnitePrefixes);
    const core = randomFrom(fortniteCore);
    const suffix = randomFrom(fortniteSuffixes);
    const number = generateNumberToken();
    const includeKeyword = Boolean(safeKeyword) && Math.random() > 0.45;
    const includeNumber = Math.random() > 0.62;
    const withKeyword = includeKeyword ? safeKeyword : core;

    const structures = [
      `${prefix}${withKeyword}`,
      `${withKeyword}${suffix}`,
      `${prefix}${withKeyword}${includeNumber ? number : ""}`,
      `${prefix}${core}${suffix}`,
      `${core}${includeNumber ? number : ""}`,
    ];

    const candidate = randomFrom(structures);
    if (/^[A-Za-z0-9]+$/.test(candidate) && candidate.length >= 6 && candidate.length <= 18) {
      output.add(candidate);
    }
  }

  while (output.size < safeAmount) {
    output.add(`${randomFrom(fortnitePrefixes)}${randomFrom(fortniteCore)}${Math.floor(10 + Math.random() * 90)}`);
  }

  return Array.from(output);
}

function containsBlockedTerm(value: string) {
  const lower = value.toLowerCase();
  return offensiveBlocklist.some((term) => lower.includes(term));
}

export function generateRobloxNames({ keyword = "", amount = 30 }: { keyword?: string; amount?: number }): string[] {
  const safeAmount = Math.max(1, amount);
  const safeKeyword = toPascal(sanitizeToken(keyword));
  const output = new Set<string>();
  let attempts = 0;
  const maxAttempts = safeAmount * 150;

  while (output.size < safeAmount && attempts < maxAttempts) {
    attempts += 1;
    const prefix = randomFrom(robloxPrefixes);
    const core = randomFrom(robloxCoreWords);
    const suffix = randomFrom(robloxSuffixes);
    const includeKeyword = Boolean(safeKeyword) && Math.random() > 0.5;
    const includeNumber = Math.random() > 0.7;
    const number = Math.floor(10 + Math.random() * 90);
    const token = includeKeyword ? safeKeyword : core;

    const structures = [
      `${prefix}${token}`,
      `${token}${suffix}`,
      `${prefix}${core}${includeNumber ? number : ""}`,
      `${prefix}${suffix}${includeNumber ? number : ""}`,
      `${token}${includeNumber ? number : ""}`,
    ];

    const candidate = randomFrom(structures);
    if (candidate.length < 6 || candidate.length > 18) continue;
    if (!/^[A-Za-z0-9]+$/.test(candidate)) continue;
    if (containsBlockedTerm(candidate)) continue;
    output.add(candidate);
  }

  while (output.size < safeAmount) {
    const fallback = `${randomFrom(robloxPrefixes)}${randomFrom(robloxCoreWords)}${Math.floor(10 + Math.random() * 90)}`;
    if (!containsBlockedTerm(fallback)) output.add(fallback);
  }

  return Array.from(output);
}

export function generateFantasyNames({ keyword = "", amount = 30 }: { keyword?: string; amount?: number }): string[] {
  const safeAmount = Math.max(1, amount);
  const safeKeyword = toPascal(sanitizeToken(keyword));
  const output = new Set<string>();
  let attempts = 0;
  const maxAttempts = safeAmount * 120;

  while (output.size < safeAmount && attempts < maxAttempts) {
    attempts += 1;
    const prefix = randomFrom(fantasyPrefixes);
    const suffix = randomFrom(fantasySuffixes);
    const altCore = randomFrom(fantasyWords);
    const includeKeyword = Boolean(safeKeyword) && Math.random() > 0.45;
    const core = includeKeyword ? safeKeyword : altCore;
    const includeX = Math.random() > 0.83;
    const includeNumber = Math.random() > 0.7;
    const number = Math.floor(10 + Math.random() * 90);

    const structures = [
      `${prefix}${toPascal(suffix)}`,
      `${prefix}${toPascal(suffix)}${includeX ? "X" : ""}`,
      `${core}${toPascal(suffix)}`,
      `${prefix}${core}`,
      `${prefix}${toPascal(suffix)}${includeNumber ? number : ""}`,
    ];

    const candidate = randomFrom(structures);
    if (!/^[A-Za-z0-9]+$/.test(candidate)) continue;
    if (candidate.length < 6 || candidate.length > 18) continue;
    output.add(candidate);
  }

  while (output.size < safeAmount) {
    const fallback = `${randomFrom(fantasyPrefixes)}${toPascal(randomFrom(fantasySuffixes))}`;
    output.add(fallback);
  }

  return Array.from(output);
}

export function generateOgUsernames({ keyword = "", amount = 24 }: { keyword?: string; amount?: number }) {
  const safeAmount = Math.max(1, amount);
  const safeKeyword = toPascal(sanitizeToken(keyword));
  const keywordBase = safeKeyword.slice(0, 5);
  const output = new Set<string>();
  let attempts = 0;
  const maxAttempts = safeAmount * 140;

  while (output.size < safeAmount && attempts < maxAttempts) {
    attempts += 1;
    const base = randomFrom(ogShortNames);
    const alt = randomFrom(ogShortNames);
    const useKeyword = Boolean(keywordBase) && Math.random() > 0.45;

    const structures = [
      base,
      alt,
      `${base.slice(0, 2)}${alt.slice(0, 2)}`,
      `${alt.slice(0, 2)}${base.slice(2, 4)}`,
      `${base.slice(0, 3)}${alt.slice(0, 1)}`,
      `${alt.slice(0, 3)}${base.slice(0, 1)}`,
      useKeyword ? keywordBase : base,
      useKeyword ? `${keywordBase.slice(0, 2)}${base.slice(0, 2)}` : base,
    ].filter(Boolean);

    const candidate = capitalizeFirst(randomFrom(structures)).slice(0, 5);
    if (!/^[A-Za-z0-9]+$/.test(candidate)) continue;
    if (candidate.length < 4 || candidate.length > 5) continue;
    output.add(candidate);
  }

  while (output.size < safeAmount) {
    const fallback = randomFrom(ogShortNames);
    if (fallback.length >= 4 && fallback.length <= 5) {
      output.add(fallback);
    }
  }

  return Array.from(output);
}

export function generateTags(type: GeneratorType, seed = "", amount = 8): string[] {
  const trimmed = seed.trim().replace(/\s+/g, "");
  const pool = new Set<string>();

  while (pool.size < amount) {
    const pre = randomFrom(prefixes);
    const suf = randomFrom(suffixes);
    const seedPart = trimmed ? `${trimmed}${Math.random() > 0.5 ? "_" : ""}` : "";

    let candidate = "";
    if (type === "username") {
      candidate = withNumber(`${seedPart}${pre}${suf}`);
    }
    if (type === "roblox") {
      candidate = withNumber(`${seedPart}${randomFrom(robloxWords)}${suf}`);
    }
    if (type === "fortnite") {
      candidate = withNumber(`${seedPart}${pre}${randomFrom(fortniteWords)}`);
    }
    if (type === "fantasy") {
      candidate = withNumber(`${seedPart}${randomFrom(fantasyWords)}${randomFrom(suffixes)}`);
    }
    if (type === "clan") {
      candidate = withNumber(`${pre}${randomFrom(clanWords)}`);
    }

    pool.add(candidate);
  }

  return Array.from(pool);
}
