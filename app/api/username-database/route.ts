import { NextResponse } from "next/server";
import {
  queryUsernameDatabase,
  type UsernameDatabaseCategory,
  type UsernameDatabaseStyle,
  type UsernameLengthBucket,
  type UsernameRarity,
} from "@/lib/username-database";

function parseList<T extends string>(value: string | null) {
  if (!value) return [] as T[];
  return value
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean) as T[];
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q") ?? "";
  const offset = Number.parseInt(searchParams.get("offset") ?? "0", 10);
  const limit = Number.parseInt(searchParams.get("limit") ?? "60", 10);

  const response = queryUsernameDatabase({
    q,
    offset: Number.isNaN(offset) ? 0 : offset,
    limit: Number.isNaN(limit) ? 60 : limit,
    categories: parseList<UsernameDatabaseCategory>(searchParams.get("categories")),
    styles: parseList<UsernameDatabaseStyle>(searchParams.get("styles")),
    rarities: parseList<UsernameRarity>(searchParams.get("rarities")),
    lengths: parseList<UsernameLengthBucket>(searchParams.get("lengths")),
  });

  return NextResponse.json(response, {
    headers: {
      "cache-control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
