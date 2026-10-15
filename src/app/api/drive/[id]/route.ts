import { driveMediaUrl, getDriveLooks, isDriveConfigured } from "@/lib/drive";

/**
 * Streams an image from the portfolio's Google Drive folder. Only files that
 * belong to a look are served, so this can't be used to fetch arbitrary Drive
 * files with the site's API key. next/image resizes and caches the result.
 */
export async function GET(_request: Request, { params }: RouteContext<"/api/drive/[id]">) {
  const { id } = await params;
  if (!isDriveConfigured()) return new Response("Not found", { status: 404 });

  const looks = await getDriveLooks();
  const image = looks.flatMap((look) => look.images).find((img) => img.id === id);
  if (!image) return new Response("Not found", { status: 404 });

  const upstream = await fetch(driveMediaUrl(id));
  if (!upstream.ok || !upstream.body) {
    return new Response("Image unavailable", { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": upstream.headers.get("Content-Type") ?? "application/octet-stream",
      // Browsers keep it a day; Vercel's CDN a week.
      "Cache-Control": "public, max-age=86400, s-maxage=604800",
    },
  });
}
