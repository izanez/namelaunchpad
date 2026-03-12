import { ImageResponse } from "next/og";
import { SocialImage, socialImageContentType, socialImageSize } from "@/components/brand/social-image";

function pickParam(value: string | null, fallback: string) {
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = pickParam(searchParams.get("title"), "NameLaunchpad");
  const subtitle = pickParam(
    searchParams.get("subtitle"),
    "Generate cool usernames for gaming, social media and streaming."
  );
  const eyebrow = pickParam(searchParams.get("eyebrow"), "NameLaunchpad");
  const chips = (searchParams.get("chips") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);

  return new ImageResponse(<SocialImage title={title} subtitle={subtitle} eyebrow={eyebrow} chips={chips} />, {
    ...socialImageSize,
    headers: {
      "Content-Type": socialImageContentType,
    },
  });
}
