import { NextRequest, NextResponse } from "next/server";
import { trackGlobalGenerationEvent } from "@/lib/global-stats";
import type { GlobalTrackGenerationPayload } from "@/lib/global-stats-types";

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => null)) as Partial<GlobalTrackGenerationPayload> | null;
  const generatorSlug = body?.generatorSlug?.trim();
  const amount = Number.isFinite(body?.amount) ? Math.floor(body?.amount as number) : 0;
  const usernames = Array.isArray(body?.usernames)
    ? body!.usernames.filter((entry): entry is string => typeof entry === "string").slice(0, 100)
    : [];

  if (!generatorSlug || amount <= 0 || usernames.length === 0) {
    return NextResponse.json(
      { error: "Invalid payload. Expected generatorSlug, amount, and usernames." },
      { status: 400 }
    );
  }

  try {
    const result = await trackGlobalGenerationEvent({
      generatorSlug,
      amount,
      usernames,
    });

    return NextResponse.json(result);
  } catch {
    return NextResponse.json({ error: "Unable to track generation event." }, { status: 500 });
  }
}
