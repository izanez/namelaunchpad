import { NextRequest, NextResponse } from "next/server";
import {
  getGeneratorPageUrls,
  hasGoogleIndexingConfig,
  isAuthorizedIndexingRequest,
  notifyGoogleIndexingApi,
  type IndexingNotificationType,
} from "@/lib/google-indexing";

type NotifyGeneratorsBody = {
  type?: IndexingNotificationType;
  secret?: string;
};

export async function POST(request: NextRequest) {
  if (!hasGoogleIndexingConfig()) {
    return NextResponse.json({ error: "Google Indexing API is not configured." }, { status: 500 });
  }

  const body = (await request.json().catch(() => ({}))) as NotifyGeneratorsBody;
  const secret = request.headers.get("x-indexing-secret") ?? body.secret ?? null;

  if (!isAuthorizedIndexingRequest(secret)) {
    return NextResponse.json({ error: "Unauthorized indexing request." }, { status: 401 });
  }

  const type = body.type ?? "URL_UPDATED";
  const urls = getGeneratorPageUrls();

  try {
    const result = await notifyGoogleIndexingApi(urls, type);

    return NextResponse.json({
      success: true,
      notified: result.length,
      type,
      urls,
      result,
      note: "Google officially limits the Indexing API to JobPosting and BroadcastEvent pages.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to notify generator pages." },
      { status: 500 }
    );
  }
}
