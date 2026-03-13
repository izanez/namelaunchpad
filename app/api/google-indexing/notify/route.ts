import { NextRequest, NextResponse } from "next/server";
import {
  hasGoogleIndexingConfig,
  isAuthorizedIndexingRequest,
  notifyGoogleIndexingApi,
  type IndexingNotificationType,
} from "@/lib/google-indexing";

type NotifyRequestBody = {
  url?: string;
  urls?: string[];
  type?: IndexingNotificationType;
  secret?: string;
};

export async function POST(request: NextRequest) {
  if (!hasGoogleIndexingConfig()) {
    return NextResponse.json({ error: "Google Indexing API is not configured." }, { status: 500 });
  }

  const body = (await request.json()) as NotifyRequestBody;
  const secret = request.headers.get("x-indexing-secret") ?? body.secret ?? null;

  if (!isAuthorizedIndexingRequest(secret)) {
    return NextResponse.json({ error: "Unauthorized indexing request." }, { status: 401 });
  }

  const urls = Array.isArray(body.urls) ? body.urls : body.url ? [body.url] : [];
  const type = body.type ?? "URL_UPDATED";

  if (urls.length === 0) {
    return NextResponse.json({ error: "Provide at least one url or urls entry." }, { status: 400 });
  }

  try {
    const result = await notifyGoogleIndexingApi(urls, type);

    return NextResponse.json({
      success: true,
      notified: result.length,
      type,
      result,
      note: "Google officially limits the Indexing API to JobPosting and BroadcastEvent pages.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to notify Google Indexing API." },
      { status: 500 }
    );
  }
}
