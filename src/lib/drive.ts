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
  videoMediaMetadata?: { width?: number; height?: number };
};

/**
 * Accepts the bare folder ID or the whole share link
 * ("https://drive.google.com/drive/folders/<id>?usp=sharing"), ignoring stray
 * quotes and spaces.
 */
function parseFolderId(value: string) {
  const cleaned = value.trim().replace(/^["']|["']$/g, "");
  return cleaned.match(/folders\/([\w-]+)/)?.[1] ?? cleaned.match(/[?&]id=([\w-]+)/)?.[1] ?? cleaned;
}

function config(folderVar = "GOOGLE_DRIVE_FOLDER_ID") {
  const apiKey = process.env.GOOGLE_DRIVE_API_KEY?.trim();
  const folderId = parseFolderId(process.env[folderVar] ?? "");
  return apiKey && folderId ? { apiKey, folderId } : null;
}

const siteConfig = () => config("GOOGLE_DRIVE_SITE_FOLDER_ID");

export function isDriveConfigured() {
  return config() !== null;
}

export function isDriveSiteConfigured() {
  return siteConfig() !== null;
}

/** URL that streams a Drive file's bytes (used only by the image proxy route). */
export function driveMediaUrl(fileId: string) {
  const cfg = config() ?? siteConfig();
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
        "nextPageToken, files(id, name, mimeType, imageMediaMetadata(width, height, rotation), videoMediaMetadata(width, height))",
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
      throw new Error(
        `Google Drive list failed (${res.status}) for folder "${parentId}": ${reason ?? res.statusText}`,
      );
    }
    const body = (await res.json()) as { files: DriveFile[]; nextPageToken?: string };
    files.push(...body.files);
    pageToken = body.nextPageToken;
  } while (pageToken);
  return files;
}

function toImage(f: DriveFile): DriveImage {
  const { width = 1200, height = 1600, rotation = 0 } = f.imageMediaMetadata ?? {};
  const turned = rotation % 2 === 1;
  return {
    id: f.id,
    name: f.name,
    src: `/api/drive/${f.id}`,
    width: turned ? height : width,
    height: turned ? width : height,
  };
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
        .map(toImage);
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

/*
 * The "Website" folder: the About photo and text and the home page video, so
 * Cheyenne can change them without a developer. Shared like the looks folder.
 *
 *   Website/
 *     About/          first image = About photo
 *                     any Google Doc          = full bio, one paragraph per line
 *                     Google Doc "Home Intro" = the home page's short intro
 *     Home Video/     first video = hero video; first image (optional) = poster
 *                     (the "Home Intro" Doc can live here instead)
 *
 * Anything missing falls back to the bundled copy in src/content/site.ts.
 */

const DOC_MIME = "application/vnd.google-apps.document";
const VIDEO_MIMES = new Set(["video/mp4", "video/quicktime", "video/webm"]);

export type DriveVideo = { id: string; src: string; width: number; height: number };
export type DriveSite = {
  aboutImage?: DriveImage;
  aboutText?: string[];
  homeIntro?: string[];
  video?: DriveVideo;
  poster?: DriveImage;
};
export type DriveSiteResult = { site: DriveSite; error?: never } | { site?: never; error: string };

/** The Website folder's content. Cached with the looks; errors come back as values. */
export async function getDriveSite(): Promise<DriveSiteResult> {
  "use cache";
  cacheTag(DRIVE_TAG);
  try {
    const site = await loadDriveSite();
    cacheLife({ stale: 300, revalidate: 300, expire: 60 * 60 * 24 * 30 });
    return { site };
  } catch (err) {
    cacheLife({ stale: 60, revalidate: 60, expire: 300 });
    return { error: (err as Error).message };
  }
}

/** Ids of the Website files the image/video route may serve. */
export function driveSiteFileIds(site: DriveSite) {
  return [site.aboutImage?.id, site.video?.id, site.poster?.id].filter(Boolean) as string[];
}

async function loadDriveSite(): Promise<DriveSite> {
  const cfg = siteConfig();
  if (!cfg) return {};

  const folders = (await listChildren(cfg.apiKey, cfg.folderId)).filter(
    (f) => f.mimeType === FOLDER_MIME,
  );
  const find = (pattern: RegExp) => folders.find((f) => pattern.test(f.name));
  const aboutFolder = find(/about/i);
  const videoFolder = find(/video|hero/i);

  const [aboutFiles, videoFiles] = await Promise.all([
    aboutFolder ? listChildren(cfg.apiKey, aboutFolder.id) : [],
    videoFolder ? listChildren(cfg.apiKey, videoFolder.id) : [],
  ]);
  aboutFiles.sort(byName);
  videoFiles.sort(byName);

  const site: DriveSite = {};

  const photo = aboutFiles.find((f) => IMAGE_MIMES.has(f.mimeType));
  if (photo) site.aboutImage = toImage(photo);

  // The home intro Doc may sit in either folder (it's home page content too).
  const isText = (f: DriveFile) => f.mimeType === DOC_MIME || f.mimeType === "text/plain";
  const isIntro = (f: DriveFile) => /home|intro/i.test(f.name);
  const introDoc = [...aboutFiles, ...videoFiles].find((f) => isText(f) && isIntro(f));
  const aboutDoc = aboutFiles.find((f) => isText(f) && !isIntro(f));
  const [aboutText, homeIntro] = await Promise.all([
    aboutDoc ? readText(cfg.apiKey, aboutDoc) : undefined,
    introDoc ? readText(cfg.apiKey, introDoc) : undefined,
  ]);
  if (aboutText?.length) site.aboutText = aboutText;
  if (homeIntro?.length) site.homeIntro = homeIntro;

  const video = videoFiles.find((f) => VIDEO_MIMES.has(f.mimeType));
  if (video) {
    // Drive fills in a video's size a little after upload; assume 16:9 until then.
    const { width = 1920, height = 1080 } = video.videoMediaMetadata ?? {};
    site.video = { id: video.id, src: `/api/drive/${video.id}`, width, height };
    const poster = videoFiles.find((f) => IMAGE_MIMES.has(f.mimeType));
    if (poster) site.poster = toImage(poster);
  }
  return site;
}

/** A Google Doc's (or .txt file's) text, as paragraphs. */
async function readText(apiKey: string, file: DriveFile): Promise<string[]> {
  const url =
    file.mimeType === DOC_MIME
      ? `${API}/${encodeURIComponent(file.id)}/export?mimeType=text/plain&key=${apiKey}`
      : `${API}/${encodeURIComponent(file.id)}?alt=media&supportsAllDrives=true&key=${apiKey}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Google Drive couldn't read "${file.name}" (${res.status})`);
  return (await res.text())
    .replace(/^\uFEFF/, "")
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);
}
