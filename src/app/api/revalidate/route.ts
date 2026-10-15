import { revalidateTag } from "next/cache";
import { DRIVE_TAG } from "@/lib/drive";

/**
 * Re-reads the Google Drive folder right away instead of waiting for the
 * automatic refresh. Visit /api/revalidate?secret=<REVALIDATE_SECRET>.
 */
export async function GET(request: Request) {
  const secret = new URL(request.url).searchParams.get("secret");
  if (!process.env.REVALIDATE_SECRET || secret !== process.env.REVALIDATE_SECRET) {
    return Response.json({ ok: false, error: "Invalid secret" }, { status: 401 });
  }
  revalidateTag(DRIVE_TAG, { expire: 0 });
  return Response.json({ ok: true, refreshed: DRIVE_TAG });
}
