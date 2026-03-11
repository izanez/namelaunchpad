import { NextRequest, NextResponse } from "next/server";
import { checkUsernameAvailability } from "@/lib/username-availability";

type RequestBody = {
  usernames?: string[];
};

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as RequestBody;
  const usernames = Array.isArray(body.usernames) ? body.usernames.slice(0, 20) : [];

  if (usernames.length === 0) {
    return NextResponse.json({ error: "Provide at least one username." }, { status: 400 });
  }

  const entries = await Promise.all(
    usernames.map(async (username) => {
      const availability = await checkUsernameAvailability(username);
      return [username, availability] as const;
    })
  );

  return NextResponse.json({
    availability: Object.fromEntries(entries),
    note: "Status is inferred from public profile URL responses. Ambiguous responses are marked as Possibly taken.",
  });
}
