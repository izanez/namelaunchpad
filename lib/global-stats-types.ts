export type GlobalTrendingUsernameEntry = {
  name: string;
  count: number;
};

export type GlobalGeneratorUsageEntry = {
  slug: string;
  count: number;
};

export type GlobalStatsSummary = {
  totalUsernamesGenerated: number;
  dailyGenerationCount: number;
  mostPopularUsernames: GlobalTrendingUsernameEntry[];
  generatorUsage: GlobalGeneratorUsageEntry[];
  mostUsedGenerator: GlobalGeneratorUsageEntry | null;
  topGeneratorsToday: GlobalGeneratorUsageEntry[];
  topGeneratorsThisWeek: GlobalGeneratorUsageEntry[];
  topGeneratorsThisMonth: GlobalGeneratorUsageEntry[];
  source: "global" | "local";
};

export type GlobalTrackGenerationPayload = {
  generatorSlug: string;
  amount: number;
  usernames: string[];
};
