import { readdir } from "node:fs/promises";
import path from "node:path";

import type { MediaEditItem } from "./portfolio-content";
import { formatEditedVisualTitle } from "./portfolio-content";

const EDITS_DIR = path.join(process.cwd(), "public", "images", "edits");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);

function toMediaEditItem(fileName: string): MediaEditItem {
  const imagePath = `/images/edits/${fileName}`;
  const title = formatEditedVisualTitle(imagePath);

  return {
    title,
    label: "Edited Visual",
    description:
      "A selected visual editing piece from my portfolio, focused on cleaner presentation, composition, and polish.",
    image: imagePath,
    alt: `${title} edited visual`,
  };
}

export async function getMediaEdits(): Promise<MediaEditItem[]> {
  try {
    const entries = await readdir(EDITS_DIR, { withFileTypes: true });

    return entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) =>
        IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()),
      )
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }))
      .map(toMediaEditItem);
  } catch {
    return [];
  }
}
