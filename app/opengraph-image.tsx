import { ImageResponse } from "next/og";
import { SocialImage, socialImageContentType, socialImageSize } from "@/components/brand/social-image";

export const alt = "NameLaunchpad social preview";
export const size = socialImageSize;
export const contentType = socialImageContentType;

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <SocialImage
        title="Launch a stronger username identity"
        subtitle="NameLaunchpad generates gamer tags, social handles, clan names and platform-ready usernames with a premium neon gaming brand."
        eyebrow="AI Username Platform"
        chips={["Gaming", "Social Media", "Fantasy", "Streaming"]}
      />
    ),
    size
  );
}
