import { ImageResponse } from "next/og";
import { SocialImage, socialImageContentType, socialImageSize } from "@/components/brand/social-image";

function pickParam(value: string | null, fallback: string) {
  return value && value.trim().length > 0 ? value.trim() : fallback;
}

function pickTheme(value: string | null): "default" | "generator" | "article" | "listing" | "database" {
  if (value === "generator" || value === "article" || value === "listing" || value === "database") return value;
  return "default";
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = pickParam(searchParams.get("title"), "NameLaunchpad");
  const subtitle = pickParam(
    searchParams.get("subtitle"),
    "Generate cool usernames for gaming, social media and streaming."
  );
  const eyebrow = pickParam(searchParams.get("eyebrow"), "NameLaunchpad");
  const theme = pickTheme(searchParams.get("theme"));
  const chips = (searchParams.get("chips") ?? "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 4);

  return new ImageResponse(<SocialImage title={title} subtitle={subtitle} eyebrow={eyebrow} chips={chips} theme={theme} />, {
    ...socialImageSize,
    headers: {
      "Content-Type": socialImageContentType,
    },
  });
}
