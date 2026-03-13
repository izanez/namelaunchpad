export const siteConfig = {
  name: "NameLaunchpad",
  url: "https://namelaunchpad.com",
  defaultTitle: "NameLaunchpad 2026 - Username & Gamer Tag Generator",
  description: "Generate usernames in seconds and check availability for gaming, social media, and streaming.",
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION ?? "",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
