import { after } from "next/server";
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
 * Videos: Vercel's CDN only caches whole-file responses, and once it has one it
 * answers the browser's byte-range requests itself (~0.1s instead of 1-5s from
 * Drive). So a whole-file request gets the whole file. A request for a specific
 * range (Safari asks for "bytes=0-1" first and won't play a video answered any
 * other way) gets exactly that range, and the CDN is then warmed with the whole
 * file in the background for the next visitor.
 */
export async function GET(request: Request, { params }: RouteContext<"/api/drive/[id]">) {
  const { id } = await params;
  if (!(await isAllowed(id))) return new Response("Not found", { status: 404 });

  const range = request.headers.get("range")?.trim();
  const partial = Boolean(range) && range !== "bytes=0-";
  const upstream = await fetch(driveMediaUrl(id), partial ? { headers: { range: range! } } : undefined);
  if (!upstream.ok || !upstream.body) {
    return new Response("Media unavailable", { status: upstream.status === 416 ? 416 : 502 });
  }
  if (partial) after(() => fetch(request.url).then((res) => res.arrayBuffer()));

  const headers = new Headers({
    "Content-Type": contentType(upstream.headers.get("Content-Type")),
    "Accept-Ranges": "bytes",
    // Browsers keep it a day; Vercel's CDN a week.
    "Cache-Control": "public, max-age=86400, s-maxage=604800",
  });
  for (const name of ["Content-Length", "Content-Range"]) {
    const value = upstream.headers.get(name);
    if (value) headers.set(name, value);
  }
  return new Response(upstream.body, { status: upstream.status, headers });
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
