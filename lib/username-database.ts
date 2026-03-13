export type UsernameDatabaseStyle =
  | "cool"
  | "aesthetic"
  | "dark"
  | "funny"
  | "fantasy"
  | "hacker"
  | "anime"
  | "streamer";

export type UsernameDatabaseCategory =
  | "gaming"
  | "social"
  | "fantasy"
  | "anime"
  | "short"
  | "rare"
  | "clan"
  | "duo"
  | "edgy"
  | "cute";

export type UsernameRarity = "common" | "rare" | "epic" | "legendary";
export type UsernameLengthBucket = "short" | "medium" | "long";

export type UsernameRecord = {
  name: string;
  slug: string;
  category: UsernameDatabaseCategory;
  style: UsernameDatabaseStyle;
  length: number;
  rarity: UsernameRarity;
  tags: string[];
};

type InternalUsernameRecord = UsernameRecord & {
  lengthBucket: UsernameLengthBucket;
  searchable: string;
};

type UsernameDatabaseCache = {
  records: InternalUsernameRecord[];
  byCategory: Record<UsernameDatabaseCategory, number[]>;
  byStyle: Record<UsernameDatabaseStyle, number[]>;
  byRarity: Record<UsernameRarity, number[]>;
  byLengthBucket: Record<UsernameLengthBucket, number[]>;
};

const TARGET_USERNAMES = 50000;

const styles: UsernameDatabaseStyle[] = ["cool", "aesthetic", "dark", "funny", "fantasy", "hacker", "anime", "streamer"];
const categories: UsernameDatabaseCategory[] = ["gaming", "social", "fantasy", "anime", "short", "rare", "clan", "duo", "edgy", "cute"];
const rarities: UsernameRarity[] = ["common", "rare", "epic", "legendary"];

const styleLibraries: Record<UsernameDatabaseStyle, { prefixes: string[]; cores: string[]; suffixes: string[]; tags: string[] }> = {
  cool: {
    prefixes: ["Shadow", "Nova", "Cyber", "Turbo", "Prime", "Hyper", "Ghost", "Storm", "Pixel", "Vortex", "Blaze", "Rapid"],
    cores: ["Wolf", "Knight", "Rider", "Strike", "Pulse", "Drift", "Echo", "Forge", "Rush", "Core", "Snare", "Bolt"],
    suffixes: ["X", "Ace", "Pro", "Mode", "Shift", "Shot", "Volt", "Wave", "Zone", "Dash"],
    tags: ["cool", "modern", "gaming"],
  },
  aesthetic: {
    prefixes: ["Luna", "Velvet", "Iris", "Aura", "Cloud", "Rose", "Dream", "Opal", "Echo", "Pearl", "Bloom", "Halo"],
    cores: ["Muse", "Glow", "Mist", "Skies", "Dawn", "Vibe", "Petal", "Whisper", "Dusk", "Nova", "Wave", "Charm"],
    suffixes: ["Glow", "Bloom", "Kiss", "Soft", "Flow", "Dust", "Light", "Vibe", "Mist", "Aura"],
    tags: ["aesthetic", "soft", "cute"],
  },
  dark: {
    prefixes: ["Void", "Night", "Abyss", "Crypt", "Dread", "Black", "Silent", "Phantom", "Grim", "Shade", "Hex", "Ruin"],
    cores: ["Fang", "Wraith", "Claw", "Lord", "Rogue", "Reaper", "Venom", "Ghost", "Noir", "Howl", "Crypt", "Shard"],
    suffixes: ["Hex", "Ruin", "Shade", "Night", "Bite", "Ash", "Dusk", "Mourn", "Vex", "Hollow"],
    tags: ["dark", "edgy", "shadow"],
  },
  funny: {
    prefixes: ["Waffle", "Banana", "Pickle", "Goblin", "Noodle", "Bouncy", "Sir", "Captain", "Tiny", "Goofy", "Derp", "Cheese"],
    cores: ["Pants", "Wizard", "Potato", "Toast", "Nugget", "Monkey", "Gremlin", "Muffin", "Toaster", "Pickles", "Bean", "Biscuit"],
    suffixes: ["LOL", "XD", "Boi", "Face", "Snack", "McGee", "Jr", "9000", "Mode", "Club"],
    tags: ["funny", "meme", "playful"],
  },
  fantasy: {
    prefixes: ["Dragon", "Rune", "Elder", "Storm", "Moon", "Crimson", "Frost", "Iron", "Mystic", "Silver", "Arcane", "Dawn"],
    cores: ["Warden", "Blade", "Knight", "Seer", "Mage", "Raven", "Fang", "Slayer", "Oracle", "Paladin", "Ember", "Titan"],
    suffixes: ["born", "bane", "weaver", "caller", "guard", "spire", "song", "crest", "brand", "helm"],
    tags: ["fantasy", "rpg", "mythic"],
  },
  hacker: {
    prefixes: ["Zero", "Null", "Cipher", "Root", "Byte", "Kernel", "Ghost", "Proxy", "Binary", "Quantum", "Silent", "Trace"],
    cores: ["Node", "Shell", "Hack", "Script", "Stack", "Packet", "Daemon", "Socket", "Matrix", "Cipher", "Inject", "Pulse"],
    suffixes: ["404", "Bit", "Hex", "Code", "Loop", "OS", "Ping", "Glitch", "Wire", "Trace"],
    tags: ["hacker", "cyber", "tech"],
  },
  anime: {
    prefixes: ["Kitsune", "Sakura", "Kage", "Ronin", "Akira", "Shinobi", "Neko", "Hikari", "Yokai", "Spirit", "Tokyo", "Lunar"],
    cores: ["Chan", "Kun", "Blade", "Soul", "Wave", "Pulse", "Fang", "Aura", "Sensei", "Kami", "Otaku", "Nova"],
    suffixes: ["X", "Kai", "Zen", "Soul", "Rush", "Moon", "Star", "Beat", "Spark", "Strike"],
    tags: ["anime", "fandom", "stylized"],
  },
  streamer: {
    prefixes: ["Live", "Clip", "Prime", "Chat", "Raid", "Hype", "Stage", "Neon", "Ultra", "Creator", "Top", "GG"],
    cores: ["Nova", "Caster", "Focus", "Channel", "Rush", "Raid", "Mic", "Pulse", "Show", "Stream", "Clips", "Studio"],
    suffixes: ["TV", "Live", "GG", "HQ", "Zone", "Show", "Pro", "Arena", "Plays", "Media"],
    tags: ["streamer", "creator", "social"],
  },
};

const categoryLibraries: Record<UsernameDatabaseCategory, { words: string[]; tags: string[] }> = {
  gaming: { words: ["Victory", "Arena", "Respawn", "Clutch", "Loot", "Ranked", "Quest", "Frag", "Zone", "Rush"], tags: ["gaming", "multiplayer"] },
  social: { words: ["Viral", "Trend", "Social", "Handle", "Profile", "Feed", "Story", "Loop", "Vibe", "Clip"], tags: ["social", "creator"] },
  fantasy: { words: ["Dragon", "Myth", "Rune", "Realm", "Quest", "Magic", "Elder", "Ember", "Fable", "Relic"], tags: ["fantasy", "mythic"] },
  anime: { words: ["Otaku", "Neko", "Kage", "Senpai", "Sakura", "Kami", "Soul", "Spirit", "Kai", "Yume"], tags: ["anime", "fandom"] },
  short: { words: ["Mini", "Swift", "Quick", "Snap", "Byte", "Zed", "Flux", "Nyx", "Vox", "Aero"], tags: ["short", "compact"] },
  rare: { words: ["OG", "Prime", "Alpha", "Void", "Nova", "Myth", "Ultra", "Rare", "Zen", "Vyre"], tags: ["rare", "clean"] },
  clan: { words: ["Legion", "Order", "Pack", "Unit", "Crew", "Guard", "Dynasty", "Core", "Raiders", "Squad"], tags: ["clan", "team"] },
  duo: { words: ["Twin", "Pair", "Sync", "Link", "Duo", "Double", "Mirror", "Bond", "Fusion", "Pulse"], tags: ["duo", "team"] },
  edgy: { words: ["Riot", "Savage", "Vex", "Ruin", "Rage", "Chaos", "Toxic", "Feral", "Brutal", "Venom"], tags: ["edgy", "aggressive"] },
  cute: { words: ["Bunny", "Peach", "Honey", "Star", "Cloud", "Kitty", "Mochi", "Berry", "Angel", "Panda"], tags: ["cute", "soft"] },
};

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "username";
}

function hash(input: string) {
  let value = 2166136261;
  for (let index = 0; index < input.length; index += 1) {
    value ^= input.charCodeAt(index);
    value = Math.imul(value, 16777619);
  }
  return value >>> 0;
}

function pick<T>(list: T[], seed: number, offset: number) {
  return list[(seed + offset) % list.length];
}

function buildName(style: UsernameDatabaseStyle, category: UsernameDatabaseCategory, serial: number) {
  const styleLibrary = styleLibraries[style];
  const categoryLibrary = categoryLibraries[category];
  const seed = hash(`${style}-${category}-${serial}`);
  const prefix = pick(styleLibrary.prefixes, seed, 0);
  const core = pick(styleLibrary.cores, seed, 3);
  const suffix = pick(styleLibrary.suffixes, seed, 7);
  const theme = pick(categoryLibrary.words, seed, 11);
  const microNumber = seed % 100;
  const serialToken = serial.toString(36).toUpperCase();
  const shortToken = serialToken.slice(-2);
  const styleToken = style.slice(0, 2).toUpperCase();
  const categoryToken = category.slice(0, 2).toUpperCase();
  const pattern = seed % 8;

  if (category === "short") {
    const shortName = `${prefix.slice(0, 2)}${theme.slice(0, 1)}${core.slice(0, 1)}${shortToken}`.replace(/[^A-Za-z0-9]/g, "");
    return shortName.slice(0, 6) || `${prefix.slice(0, 2)}${core.slice(0, 2)}${shortToken}`.slice(0, 6);
  }

  switch (pattern) {
    case 0:
      return `${prefix}${theme}${shortToken}`;
    case 1:
      return `${theme}${core}${shortToken}`;
    case 2:
      return `${prefix}${core}${suffix}${serialToken.slice(-1)}`;
    case 3:
      return `${prefix}${theme}${microNumber}`;
    case 4:
      return `${theme}${suffix}${serialToken.slice(-1)}`;
    case 5:
      return `${prefix}${core}${microNumber}${serial % 2 === 0 ? styleToken.slice(0, 1) : ""}`;
    case 6:
      return `${theme}${core}${suffix}${categoryToken.slice(0, 1)}`;
    default:
      return `${prefix}${theme}${suffix}${shortToken}`;
  }
}

function getLengthBucket(length: number): UsernameLengthBucket {
  if (length <= 6) return "short";
  if (length <= 10) return "medium";
  return "long";
}

function getRarity(name: string, category: UsernameDatabaseCategory, style: UsernameDatabaseStyle, serial: number): UsernameRarity {
  const cleanLength = name.replace(/[^A-Za-z0-9]/g, "").length;
  const score = (cleanLength <= 5 ? 5 : cleanLength <= 7 ? 4 : cleanLength <= 9 ? 3 : 2) + (serial % 7 === 0 ? 2 : 0) + (category === "rare" ? 3 : 0) + (category === "short" ? 2 : 0) + (style === "hacker" || style === "anime" ? 1 : 0);

  if (score >= 9) return "legendary";
  if (score >= 7) return "epic";
  if (score >= 5) return "rare";
  return "common";
}

function createTags(style: UsernameDatabaseStyle, category: UsernameDatabaseCategory, rarity: UsernameRarity, lengthBucket: UsernameLengthBucket, name: string) {
  return Array.from(
    new Set([
      style,
      category,
      rarity,
      lengthBucket,
      ...styleLibraries[style].tags,
      ...categoryLibraries[category].tags,
      ...(name.length <= 5 ? ["og", "compact"] : []),
      ...(name.match(/\d/) ? ["numbered"] : ["clean"]),
    ])
  );
}

function buildDatabase(): UsernameDatabaseCache {
  const records: InternalUsernameRecord[] = [];
  const seenNames = new Set<string>();
  const seenSlugs = new Set<string>();

  for (let serial = 0; records.length < TARGET_USERNAMES && serial < TARGET_USERNAMES * 8; serial += 1) {
    for (const style of styles) {
      for (const category of categories) {
        const candidate = buildName(style, category, serial);
        const normalizedName = candidate.replace(/[^A-Za-z0-9]/g, "");
        const length = normalizedName.length;
        if (length < 4 || length > 15) continue;
        if (seenNames.has(candidate)) continue;
        const slug = slugify(candidate);
        if (seenSlugs.has(slug)) continue;

        const lengthBucket = getLengthBucket(length);
        const rarity = getRarity(candidate, category, style, serial);
        const tags = createTags(style, category, rarity, lengthBucket, candidate);
        const searchable = [candidate, slug, style, category, rarity, lengthBucket, ...tags].join(" ").toLowerCase();

        seenNames.add(candidate);
        seenSlugs.add(slug);
        records.push({
          name: candidate,
          slug,
          category,
          style,
          length,
          rarity,
          tags,
          lengthBucket,
          searchable,
        });

        if (records.length >= TARGET_USERNAMES) break;
      }
      if (records.length >= TARGET_USERNAMES) break;
    }
  }

  const byCategory: Record<UsernameDatabaseCategory, number[]> = {
    gaming: [],
    social: [],
    fantasy: [],
    anime: [],
    short: [],
    rare: [],
    clan: [],
    duo: [],
    edgy: [],
    cute: [],
  };
  const byStyle: Record<UsernameDatabaseStyle, number[]> = {
    cool: [],
    aesthetic: [],
    dark: [],
    funny: [],
    fantasy: [],
    hacker: [],
    anime: [],
    streamer: [],
  };
  const byRarity: Record<UsernameRarity, number[]> = {
    common: [],
    rare: [],
    epic: [],
    legendary: [],
  };
  const byLengthBucket: Record<UsernameLengthBucket, number[]> = {
    short: [],
    medium: [],
    long: [],
  };

  records.forEach((record, index) => {
    byCategory[record.category].push(index);
    byStyle[record.style].push(index);
    byRarity[record.rarity].push(index);
    byLengthBucket[record.lengthBucket].push(index);
  });

  return { records, byCategory, byStyle, byRarity, byLengthBucket };
}

let usernameDatabaseCache: UsernameDatabaseCache | null = null;

function getDatabaseCache() {
  if (!usernameDatabaseCache) {
    usernameDatabaseCache = buildDatabase();
  }
  return usernameDatabaseCache;
}

function intersect(base: number[] | null, next: number[]) {
  if (!base) return [...next];
  const nextSet = new Set(next);
  return base.filter((value) => nextSet.has(value));
}

export function getUsernameDatabaseStats() {
  const cache = getDatabaseCache();
  return {
    total: cache.records.length,
    styles,
    categories,
    rarities,
    lengths: ["short", "medium", "long"] as UsernameLengthBucket[],
  };
}

export function getAllUsernameDatabaseRecords(): UsernameRecord[] {
  return getDatabaseCache().records.map(({ searchable, lengthBucket, ...record }) => record);
}

export function getUsernameRecordBySlug(slug: string): UsernameRecord | null {
  const record = getDatabaseCache().records.find((entry) => entry.slug === slug);
  if (!record) return null;
  const { searchable, lengthBucket, ...publicRecord } = record;
  return publicRecord;
}

export function getRelatedUsernameRecords(record: UsernameRecord, limit = 24): UsernameRecord[] {
  const cache = getDatabaseCache();

  return cache.records
    .filter((candidate) => candidate.slug !== record.slug)
    .map((candidate) => {
      let score = 0;
      if (candidate.category === record.category) score += 4;
      if (candidate.style === record.style) score += 3;
      if (candidate.rarity === record.rarity) score += 2;
      if (Math.abs(candidate.length - record.length) <= 1) score += 2;
      score += candidate.tags.filter((tag) => record.tags.includes(tag)).length;

      return { candidate, score };
    })
    .filter((entry) => entry.score > 0)
    .sort((left, right) => right.score - left.score || left.candidate.name.localeCompare(right.candidate.name))
    .slice(0, limit)
    .map(({ candidate }) => {
      const { searchable, lengthBucket, ...publicRecord } = candidate;
      return publicRecord;
    });
}

export function queryUsernameDatabase({
  q,
  categories: selectedCategories = [],
  styles: selectedStyles = [],
  rarities: selectedRarities = [],
  lengths: selectedLengths = [],
  offset = 0,
  limit = 60,
}: {
  q?: string;
  categories?: UsernameDatabaseCategory[];
  styles?: UsernameDatabaseStyle[];
  rarities?: UsernameRarity[];
  lengths?: UsernameLengthBucket[];
  offset?: number;
  limit?: number;
}) {
  const cache = getDatabaseCache();
  let candidateIndices: number[] | null = null;

  if (selectedCategories.length > 0) {
    const indices = Array.from(new Set(selectedCategories.flatMap((value) => cache.byCategory[value] ?? []))).sort((a, b) => a - b);
    candidateIndices = intersect(candidateIndices, indices);
  }

  if (selectedStyles.length > 0) {
    const indices = Array.from(new Set(selectedStyles.flatMap((value) => cache.byStyle[value] ?? []))).sort((a, b) => a - b);
    candidateIndices = intersect(candidateIndices, indices);
  }

  if (selectedRarities.length > 0) {
    const indices = Array.from(new Set(selectedRarities.flatMap((value) => cache.byRarity[value] ?? []))).sort((a, b) => a - b);
    candidateIndices = intersect(candidateIndices, indices);
  }

  if (selectedLengths.length > 0) {
    const indices = Array.from(new Set(selectedLengths.flatMap((value) => cache.byLengthBucket[value] ?? []))).sort((a, b) => a - b);
    candidateIndices = intersect(candidateIndices, indices);
  }

  const baseRecords = (candidateIndices ?? cache.records.map((_, index) => index)).map((index) => cache.records[index]);
  const normalizedQuery = q?.trim().toLowerCase() ?? "";

  const filtered = normalizedQuery
    ? baseRecords.filter((record) => record.searchable.includes(normalizedQuery))
    : baseRecords;

  const sorted = [...filtered].sort((left, right) => {
    const rarityDelta = rarities.indexOf(right.rarity) - rarities.indexOf(left.rarity);
    if (rarityDelta !== 0) return rarityDelta;
    if (left.length !== right.length) return left.length - right.length;
    return left.name.localeCompare(right.name);
  });

  const safeOffset = Math.max(0, offset);
  const safeLimit = Math.min(120, Math.max(1, limit));
  const items = sorted.slice(safeOffset, safeOffset + safeLimit).map(({ searchable, lengthBucket, ...record }) => record);

  return {
    items,
    total: sorted.length,
    hasMore: safeOffset + safeLimit < sorted.length,
    facets: getUsernameDatabaseStats(),
  };
}
