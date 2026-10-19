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
 * next/image resizes and caches photos; videos are streamed in byte ranges,
 * which Safari needs to play them.
 */
export async function GET(request: Request, { params }: RouteContext<"/api/drive/[id]">) {
  const { id } = await params;
  if (!(await isAllowed(id))) return new Response("Not found", { status: 404 });

  const range = request.headers.get("range");
  const upstream = await fetch(driveMediaUrl(id), range ? { headers: { range } } : undefined);
  if (!upstream.ok || !upstream.body) {
    return new Response("Media unavailable", { status: upstream.status === 416 ? 416 : 502 });
  }

  const headers = new Headers({
    "Content-Type": upstream.headers.get("Content-Type") ?? "application/octet-stream",
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
