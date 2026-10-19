import {
  driveMediaUrl,
  driveSiteFileIds,
  getDriveLooks,
  getDriveSite,
  isDriveConfigured,
  isDriveSiteConfigured,
} from "@/lib/drive";

/**
 * Streams a photo or video from the site's Google Drive folders (the looks and
 * the "Website" folder). Only files the site actually shows are served, so this
 * can't be used to fetch arbitrary Drive files with the site's API key.
 * next/image resizes and caches photos.
 *
 * Always answers with the whole file, never a byte range: Vercel's CDN only
 * caches whole responses, and once it has one it answers the browser's range
 * requests itself (Safari needs those to play video). So after the first
 * visitor, the hero video comes straight from the CDN instead of from Drive.
 */
export async function GET(_request: Request, { params }: RouteContext<"/api/drive/[id]">) {
  const { id } = await params;
  if (!(await isAllowed(id))) return new Response("Not found", { status: 404 });

  const upstream = await fetch(driveMediaUrl(id));
  if (!upstream.ok || !upstream.body) {
    return new Response("Media unavailable", { status: 502 });
  }

  const headers = new Headers({
    "Content-Type": contentType(upstream.headers.get("Content-Type")),
    "Accept-Ranges": "bytes",
    // Browsers keep it a day; Vercel's CDN a week.
    "Cache-Control": "public, max-age=86400, s-maxage=604800",
  });
  const length = upstream.headers.get("Content-Length");
  if (length) headers.set("Content-Length", length);
  return new Response(upstream.body, { headers });
}

async function isAllowed(id: string) {
  const [looks, site] = await Promise.all([
    isDriveConfigured() ? getDriveLooks() : null,
    isDriveSiteConfigured() ? getDriveSite() : null,
  ]);
  if (looks?.looks?.some((look) => look.images.some((img) => img.id === id))) return true;
  return site?.site ? driveSiteFileIds(site.site).includes(id) : false;
}

/**
 * iPhone .mov files are MP4 inside, but Chrome and Firefox won't play one that
 * is labeled video/quicktime, so label it video/mp4.
 */
function contentType(type: string | null) {
  if (!type) return "application/octet-stream";
  return type.startsWith("video/quicktime") ? "video/mp4" : type;
}
