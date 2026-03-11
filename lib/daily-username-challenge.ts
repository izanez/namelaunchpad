export const DAILY_CHALLENGE_VOTES_KEY = "namelaunchpad:daily-challenge-votes";
export const DAILY_CHALLENGE_USER_VOTE_KEY = "namelaunchpad:daily-challenge-user-vote";

export type DailyChallengeVote = "like" | "pass";

type StoredVoteCounts = Record<string, { likes: number; passes: number }>;
type StoredUserVotes = Record<string, DailyChallengeVote>;

const prefixes = [
  "Shadow",
  "Nova",
  "Ghost",
  "Cyber",
  "Dark",
  "Storm",
  "Pixel",
  "Void",
  "Neon",
  "Blaze",
  "Night",
  "Frost",
];

const cores = [
  "Rider",
  "Knight",
  "Phantom",
  "Wolf",
  "Hunter",
  "Echo",
  "Pulse",
  "Vortex",
  "Samurai",
  "Cipher",
  "Warden",
  "Rogue",
];

const suffixes = ["X", "Prime", "Rush", "Zone", "Core", "Byte", "Strike", "GG", "TV", "HQ", "Ace", "Wave"];

function getTodayKey() {
  return new Date().toISOString().slice(0, 10);
}

function hashString(value: string) {
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = (hash << 5) - hash + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

export function getDailyChallengeName(dateKey = getTodayKey()) {
  const seed = hashString(dateKey);
  const prefix = prefixes[seed % prefixes.length];
  const core = cores[(seed * 7) % cores.length];
  const suffix = suffixes[(seed * 13) % suffixes.length];
  const includeSuffix = seed % 3 !== 0;
  return `${prefix}${core}${includeSuffix ? suffix : ""}`;
}

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getDailyChallengeVotes(dateKey = getTodayKey()) {
  const votes = readJson<StoredVoteCounts>(DAILY_CHALLENGE_VOTES_KEY, {});
  return votes[dateKey] ?? { likes: 0, passes: 0 };
}

export function getDailyChallengeUserVote(dateKey = getTodayKey()) {
  const votes = readJson<StoredUserVotes>(DAILY_CHALLENGE_USER_VOTE_KEY, {});
  return votes[dateKey] ?? null;
}

export function voteDailyChallenge(vote: DailyChallengeVote, dateKey = getTodayKey()) {
  const allVotes = readJson<StoredVoteCounts>(DAILY_CHALLENGE_VOTES_KEY, {});
  const userVotes = readJson<StoredUserVotes>(DAILY_CHALLENGE_USER_VOTE_KEY, {});
  const previousVote = userVotes[dateKey];
  const current = allVotes[dateKey] ?? { likes: 0, passes: 0 };

  if (previousVote === vote) {
    return { ...current, userVote: previousVote };
  }

  if (previousVote === "like") current.likes = Math.max(0, current.likes - 1);
  if (previousVote === "pass") current.passes = Math.max(0, current.passes - 1);

  if (vote === "like") current.likes += 1;
  if (vote === "pass") current.passes += 1;

  allVotes[dateKey] = current;
  userVotes[dateKey] = vote;

  writeJson(DAILY_CHALLENGE_VOTES_KEY, allVotes);
  writeJson(DAILY_CHALLENGE_USER_VOTE_KEY, userVotes);

  return { ...current, userVote: vote };
}
