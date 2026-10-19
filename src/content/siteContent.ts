import { getDriveSite, isDriveSiteConfigured, type DriveSite } from "@/lib/drive";
import { site } from "./site";

/**
 * About and hero content: the "Website" Drive folder when it's connected
 * (GOOGLE_DRIVE_SITE_FOLDER_ID, see src/lib/drive.ts), with each piece falling
 * back to the bundled copy in site.ts when it's missing.
 */

async function driveSite(): Promise<DriveSite> {
  if (!isDriveSiteConfigured()) return {};
  const result = await getDriveSite();
  if (result.site) return result.site;
  // Unlike the looks, a Drive problem here just means the bundled About copy and
  // video show until it's fixed, so log it rather than fail the page.
  console.error(`⚠ Google Drive "Website" folder unavailable, using bundled content — ${result.error}`);
  return {};
}

export type HeroMedia = {
  video: string | null;
  /** Shown before the video plays, or on its own when there's no video. */
  image: string | null;
  width: number;
  height: number;
};

export async function getHeroMedia(): Promise<HeroMedia> {
  const drive = await driveSite();
  if (drive.video) {
    return {
      video: drive.video.src,
      image: drive.poster?.src ?? null,
      width: drive.video.width,
      height: drive.video.height,
    };
  }
  const { video, poster, image, width, height } = site.hero;
  return { video, image: video ? poster : image, width, height };
}

export type About = { image: string | null; intro: string[]; bio: string[] };

export async function getAbout(): Promise<About> {
  const drive = await driveSite();
  return {
    image: drive.aboutImage?.src ?? site.about.image,
    intro: drive.homeIntro ?? [site.about.intro],
    bio: drive.aboutText ?? [...site.about.long],
  };
}
