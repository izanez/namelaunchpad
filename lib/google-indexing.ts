import { google } from "googleapis";
import { absoluteUrl } from "@/app/metadata";
import { generatorDatabase, generatorSlugs } from "@/lib/generators";

const INDEXING_SCOPE = "https://www.googleapis.com/auth/indexing";

const directGeneratorPageSlugs = new Set([
  "username-generator",
  "gamer-tag-generator",
  "fortnite-name-generator",
  "roblox-username-generator",
  "minecraft-name-generator",
  "twitch-username-generator",
  "valorant-name-generator",
  "fantasy-name-generator",
  "clan-name-generator",
  "anime-username-generator",
  "og-username-finder",
]);

export type IndexingNotificationType = "URL_UPDATED" | "URL_DELETED";

function getGoogleIndexingConfig() {
  const clientEmail = process.env.GOOGLE_INDEXING_API_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_API_PRIVATE_KEY?.replace(/\\n/g, "\n");
  const notifySecret = process.env.GOOGLE_INDEXING_API_NOTIFY_SECRET;

  return {
    clientEmail,
    privateKey,
    notifySecret,
  };
}

export function hasGoogleIndexingConfig() {
  const { clientEmail, privateKey } = getGoogleIndexingConfig();
  return Boolean(clientEmail && privateKey);
}

export function isAuthorizedIndexingRequest(secret: string | null) {
  const { notifySecret } = getGoogleIndexingConfig();
  if (!notifySecret) return true;
  return secret === notifySecret;
}

function getIndexingClient() {
  const { clientEmail, privateKey } = getGoogleIndexingConfig();

  if (!clientEmail || !privateKey) {
    throw new Error("Google Indexing API credentials are not configured.");
  }

  return new google.auth.JWT({
    email: clientEmail,
    key: privateKey,
    scopes: [INDEXING_SCOPE],
  });
}

export async function notifyGoogleIndexingApi(urls: string[], type: IndexingNotificationType = "URL_UPDATED") {
  const auth = getIndexingClient();
  const indexing = google.indexing({
    version: "v3",
    auth,
  });

  const uniqueUrls = Array.from(new Set(urls)).filter(Boolean);

  return Promise.all(
    uniqueUrls.map(async (url) => {
      const response = await indexing.urlNotifications.publish({
        requestBody: {
          url,
          type,
        },
      });

      return {
        url,
        type,
        response: response.data,
      };
    })
  );
}

export function getGeneratorPageUrls() {
  const directRoutes = generatorDatabase
    .filter((entry) => directGeneratorPageSlugs.has(entry.slug))
    .map((entry) => absoluteUrl(`/${entry.slug}`));

  const dynamicRoutes = generatorSlugs.map((slug) => absoluteUrl(`/generators/${slug}`));

  return Array.from(new Set([...directRoutes, ...dynamicRoutes]));
}
