import { mkdir, readdir, copyFile, unlink } from "node:fs/promises";
import { statSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.join(process.cwd(), "public", "images");
const BACKUP_DIR = path.join(process.cwd(), "design-assets", "originals");
const TARGETS = ["edits", "client-websites"];
const IMAGE_EXTENSIONS = new Set([".png", ".jpg", ".jpeg", ".webp", ".avif"]);
const MAX_DIMENSION = 2560;
const QUALITY = 92;

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else if (IMAGE_EXTENSIONS.has(path.extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }

  return files;
}

async function optimizeFile(filePath) {
  const dir = path.dirname(filePath);
  const parsed = path.parse(filePath);
  const outputPath = path.join(dir, `${parsed.name}.webp`);

  if (parsed.ext.toLowerCase() === ".webp" || filePath === outputPath) {
    return { filePath, skipped: true, reason: "already webp" };
  }

  const backupPath = path.join(
    BACKUP_DIR,
    path.relative(PUBLIC_DIR, filePath),
  );

  await mkdir(path.dirname(backupPath), { recursive: true });

  const image = sharp(filePath);
  const metadata = await image.metadata();

  const longestSide = Math.max(metadata.width ?? 0, metadata.height ?? 0);
  if (longestSide > MAX_DIMENSION) {
    image.resize({
      width: longestSide === metadata.width ? MAX_DIMENSION : undefined,
      height: longestSide === metadata.height ? MAX_DIMENSION : undefined,
      fit: "inside",
      withoutEnlargement: true,
    });
  }

  const resized = await image
    .rotate()
    .webp({ quality: QUALITY })
    .toFile(outputPath);

  await copyFile(filePath, backupPath);
  await unlink(filePath);

  return {
    filePath,
    backupPath,
    outputPath,
    width: resized.width,
    height: resized.height,
    bytes: resized.size,
  };
}

const allFiles = (
  await Promise.all(TARGETS.map((target) => walk(path.join(PUBLIC_DIR, target))))
).flat();

const results = [];
for (const file of allFiles) {
  try {
    results.push(await optimizeFile(file));
  } catch (error) {
    console.error(`FAILED ${file}: ${error.message}`);
  }
}

const converted = results.filter((r) => !r.skipped);
const skipped = results.filter((r) => r.skipped);

let originalBytes = 0;
let optimizedBytes = 0;
for (const result of converted) {
  originalBytes += statSync(result.backupPath).size;
  optimizedBytes += result.bytes;
}

console.log(`Converted ${converted.length} images (${skipped.length} already webp)`);
if (converted.length > 0) {
  console.log(
    `  ${(originalBytes / 1024 / 1024).toFixed(1)} MB -> ${(optimizedBytes / 1024 / 1024).toFixed(1)} MB ` +
      `(${Math.max(0, Math.round(100 - (optimizedBytes / originalBytes) * 100))}% smaller)`,
  );
  for (const result of converted) {
    console.log(
      `  ${path.relative(process.cwd(), result.filePath)} -> ${path.relative(process.cwd(), result.outputPath)} ` +
        `(${(result.bytes / 1024).toFixed(0)} KB, ${result.width}x${result.height})`,
    );
  }
}
