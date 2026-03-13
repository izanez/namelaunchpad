import { NextResponse } from "next/server";
import { getGlobalStatsSummary, hasGlobalStatsConfig } from "@/lib/global-stats";

export async function GET() {
  try {
    const summary = await getGlobalStatsSummary();
    return NextResponse.json({
      ...summary,
      configured: hasGlobalStatsConfig(),
    });
  } catch {
    return NextResponse.json(
      {
        error: "Unable to load global stats summary.",
        configured: hasGlobalStatsConfig(),
      },
      { status: 500 }
    );
  }
}
