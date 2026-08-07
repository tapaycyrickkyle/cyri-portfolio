import { open, readdir } from "node:fs/promises";
import path from "node:path";

import type { MediaEditItem } from "./portfolio-content";
import { formatEditedVisualTitle } from "./portfolio-content";

const EDITS_DIR = path.join(process.cwd(), "public", "images", "edits");
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const FALLBACK_SIZE = { width: 1200, height: 900 };
const JPEG_HEADER_BYTES = 256 * 1024;

function readPngDimensions(buffer: Buffer) {
  if (buffer.length < 24 || buffer.toString("ascii", 1, 4) !== "PNG") {
    return null;
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function readJpegDimensions(buffer: Buffer) {
  let offset = 2;

  while (offset + 4 < buffer.length) {
    if (buffer[offset] !== 0xff) {
      return null;
    }

    const marker = buffer[offset + 1];
    const length = buffer.readUInt16BE(offset + 2);

    if (offset + 2 + length > buffer.length) {
      return null;
    }

    if (marker >= 0xc0 && marker <= 0xc3) {
      return {
        height: buffer.readUInt16BE(offset + 5),
        width: buffer.readUInt16BE(offset + 7),
      };
    }

    offset += 2 + length;
  }

  return null;
}

async function readImageHeader(filePath: string, byteLength: number) {
  const file = await open(filePath, "r");

  try {
    const stats = await file.stat();
    const buffer = Buffer.alloc(Math.min(byteLength, stats.size));
    const { bytesRead } = await file.read(buffer, 0, buffer.length, 0);

    return buffer.subarray(0, bytesRead);
  } finally {
    await file.close();
  }
}

async function resolveImageDimensions(filePath: string) {
  const extension = path.extname(filePath).toLowerCase();
  const buffer = await readImageHeader(
    filePath,
    extension === ".png" ? 32 : JPEG_HEADER_BYTES,
  );

  if (extension === ".png") {
    return readPngDimensions(buffer) ?? FALLBACK_SIZE;
  }

  if (extension === ".jpg" || extension === ".jpeg") {
    return readJpegDimensions(buffer) ?? FALLBACK_SIZE;
  }

  return FALLBACK_SIZE;
}

async function toMediaEditItem(fileName: string): Promise<MediaEditItem> {
  const imagePath = `/images/edits/${fileName}`;
  const filePath = path.join(EDITS_DIR, fileName);
  const title = formatEditedVisualTitle(imagePath);
  const dimensions = await resolveImageDimensions(filePath);

  return {
    title,
    label: "Edited Visual",
    description:
      "A selected visual editing piece from my portfolio, focused on cleaner presentation, composition, and polish.",
    image: imagePath,
    alt: `${title} edited visual`,
    width: dimensions.width,
    height: dimensions.height,
  };
}

export async function getMediaEdits(): Promise<MediaEditItem[]> {
  try {
    const entries = await readdir(EDITS_DIR, { withFileTypes: true });

    const fileNames = entries
      .filter((entry) => entry.isFile())
      .map((entry) => entry.name)
      .filter((fileName) =>
        IMAGE_EXTENSIONS.has(path.extname(fileName).toLowerCase()),
      )
      .sort((left, right) => left.localeCompare(right, undefined, { numeric: true }));

    return Promise.all(fileNames.map(toMediaEditItem));
  } catch {
    return [];
  }
}
