export const siteConfig = {
  name: "NameLaunchpad",
  url: "https://namelaunchpad.com",
  defaultTitle: "NameLaunchpad - Username & Gamer Tag Generator",
  description: "Generate cool usernames for gaming, social media and streaming.",
  googleSiteVerification: process.env.GOOGLE_SITE_VERIFICATION ?? "",
} as const;

export function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}
