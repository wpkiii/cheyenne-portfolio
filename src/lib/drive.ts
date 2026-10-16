import { cacheLife, cacheTag } from "next/cache";

/**
 * Google Drive as the portfolio's content source.
 *
 * Cheyenne keeps one shared folder (shared as "Anyone with the link → Viewer").
 * Each subfolder is one look; its images are that look's photos.
 *
 *   Portfolio Looks/
 *     01 Fur Coat/        → title "Fur Coat", shown first
 *       01.jpg            → cover (first image by name)
 *       02.jpg
 *     02 Red Carpet/
 *
 * Folder and file names sort naturally ("2" before "10"), so number them to set
 * the order. The site re-checks Drive every few minutes (see DRIVE_CACHE) and
 * /api/revalidate refreshes it immediately.
 */

export const DRIVE_TAG = "drive-looks";

// Overridable only so the integration can be tested against a local mock.
const API = process.env.GOOGLE_DRIVE_API_URL ?? "https://www.googleapis.com/drive/v3/files";
const FOLDER_MIME = "application/vnd.google-apps.folder";
// Formats browsers and the image optimizer can all handle (iPhone HEIC is not one).
const IMAGE_MIMES = new Set(["image/jpeg", "image/png", "image/webp", "image/avif", "image/gif"]);

export type DriveImage = { id: string; src: string; width: number; height: number; name: string };
export type DriveLook = { slug: string; title: string; images: DriveImage[] };

type DriveFile = {
  id: string;
  name: string;
  mimeType: string;
  imageMediaMetadata?: { width?: number; height?: number; rotation?: number };
};

function config() {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY;
  const folderId = process.env.GOOGLE_DRIVE_FOLDER_ID;
  return apiKey && folderId ? { apiKey, folderId } : null;
}

export function isDriveConfigured() {
  return config() !== null;
}

/** URL that streams a Drive file's bytes (used only by the image proxy route). */
export function driveMediaUrl(fileId: string) {
  const cfg = config();
  if (!cfg) throw new Error("Google Drive is not configured");
  return `${API}/${encodeURIComponent(fileId)}?alt=media&supportsAllDrives=true&key=${cfg.apiKey}`;
}

async function listChildren(apiKey: string, parentId: string): Promise<DriveFile[]> {
  const files: DriveFile[] = [];
  let pageToken: string | undefined;
  do {
    const params = new URLSearchParams({
      q: `'${parentId}' in parents and trashed = false`,
      fields:
        "nextPageToken, files(id, name, mimeType, imageMediaMetadata(width, height, rotation))",
      pageSize: "1000",
      supportsAllDrives: "true",
      includeItemsFromAllDrives: "true",
      key: apiKey,
    });
    if (pageToken) params.set("pageToken", pageToken);
    const res = await fetch(`${API}?${params}`);
    if (!res.ok) {
      // Google's own explanation, e.g. "API key not valid" or "File not found".
      const reason = await res
        .json()
        .then((b: { error?: { message?: string } }) => b.error?.message)
        .catch(() => undefined);
      throw new Error(`Google Drive list failed (${res.status}): ${reason ?? res.statusText}`);
    }
    const body = (await res.json()) as { files: DriveFile[]; nextPageToken?: string };
    files.push(...body.files);
    pageToken = body.nextPageToken;
  } while (pageToken);
  return files;
}

const byName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: "base" });

/** "01 - Fur Coat" → "Fur Coat"; a folder without a number keeps its name. */
function titleFromFolder(name: string) {
  return name.replace(/^\s*\d+\s*[-–—.)_:]?\s*/, "").trim() || name.trim();
}

function slugify(text: string) {
  return (
    text
      .normalize("NFKD")
      .replace(/[̀-ͯ]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "look"
  );
}

export type DriveResult = { looks: DriveLook[]; error?: never } | { looks?: never; error: string };

/**
 * All looks in the shared folder, in display order. Cached; see DRIVE_TAG.
 * Errors come back as a value: an error thrown inside a cached function fails
 * the whole build, even if the caller catches it.
 */
export async function getDriveLooks(): Promise<DriveResult> {
  "use cache";
  cacheTag(DRIVE_TAG);
  try {
    const looks = await loadDriveLooks();
    // Check Drive at most every 5 minutes; keep serving the last good copy meanwhile.
    cacheLife({ stale: 300, revalidate: 300, expire: 60 * 60 * 24 * 30 });
    return { looks };
  } catch (err) {
    // Retry after a minute rather than remembering the failure for 5.
    cacheLife({ stale: 60, revalidate: 60, expire: 300 });
    return { error: (err as Error).message };
  }
}

async function loadDriveLooks(): Promise<DriveLook[]> {
  const cfg = config();
  if (!cfg) return [];

  const folders = (await listChildren(cfg.apiKey, cfg.folderId))
    .filter((f) => f.mimeType === FOLDER_MIME)
    .sort(byName);

  const used = new Set<string>();
  const looks = await Promise.all(
    folders.map(async (folder) => {
      const images = (await listChildren(cfg.apiKey, folder.id))
        .filter((f) => IMAGE_MIMES.has(f.mimeType))
        .sort(byName)
        .map((f): DriveImage => {
          const { width = 1200, height = 1600, rotation = 0 } = f.imageMediaMetadata ?? {};
          const turned = rotation % 2 === 1;
          return {
            id: f.id,
            name: f.name,
            src: `/api/drive/${f.id}`,
            width: turned ? height : width,
            height: turned ? width : height,
          };
        });
      return { folder, images };
    }),
  );

  return looks
    .filter(({ images }) => images.length > 0) // skip empty folders
    .map(({ folder, images }) => {
      const title = titleFromFolder(folder.name);
      let slug = slugify(title);
      for (let n = 2; used.has(slug); n++) slug = `${slugify(title)}-${n}`;
      used.add(slug);
      return { slug, title, images };
    });
}
