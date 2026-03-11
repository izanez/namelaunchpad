import { NextResponse } from "next/server";
import { generateUsernames, type UsernameLengthFilter, type UsernameStyle } from "@/lib/generators";

const validStyles: UsernameStyle[] = ["cool", "aesthetic", "dark", "funny", "fantasy", "hacker", "anime", "streamer"];
const validLengthFilters: UsernameLengthFilter[] = ["short", "medium", "long"];

const lengthRanges: Record<UsernameLengthFilter, { min: number; max: number }> = {
  short: { min: 4, max: 6 },
  medium: { min: 7, max: 10 },
  long: { min: 11, max: 15 },
};

function parseKeywords(value: string | null) {
  if (!value) return [];
  return value
    .split(/[,\s]+/)
    .map((token) => token.trim())
    .filter(Boolean)
    .slice(0, 6);
}

function parseStyle(value: string | null): UsernameStyle {
  return validStyles.includes(value as UsernameStyle) ? (value as UsernameStyle) : "cool";
}

function parseLengthFilter(value: string | null): UsernameLengthFilter {
  return validLengthFilters.includes(value as UsernameLengthFilter) ? (value as UsernameLengthFilter) : "medium";
}

function parseAmount(value: string | null) {
  const parsed = Number.parseInt(value ?? "20", 10);
  if (Number.isNaN(parsed)) return 20;
  return Math.min(100, Math.max(1, parsed));
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const style = parseStyle(searchParams.get("style"));
  const lengthFilter = parseLengthFilter(searchParams.get("lengthFilter"));
  const amount = parseAmount(searchParams.get("amount"));
  const keywords = parseKeywords(searchParams.get("keywords"));
  const range = lengthRanges[lengthFilter];

  const usernames = generateUsernames({
    keywords,
    style,
    amount,
    length: range.max,
    minLength: range.min,
    maxLength: range.max,
  });

  return NextResponse.json({ usernames });
}
