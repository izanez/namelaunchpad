import { getUsernameSitemapEntries, renderUrlSet } from "@/lib/sitemaps";

export function GET() {
  return new Response(renderUrlSet(getUsernameSitemapEntries()), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
