import { readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";
import { fileURLToPath } from "node:url";

const OUT_DIR = fileURLToPath(new URL("../out/", import.meta.url));
const MAX_BYTES = 25 * 1024 * 1024;
const WARN_BYTES = 20 * 1024 * 1024;

const offenders = [];
const warnings = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      walk(full);
    } else if (stat.size > MAX_BYTES) {
      offenders.push({ file: relative(OUT_DIR, full), size: stat.size });
    } else if (stat.size > WARN_BYTES) {
      warnings.push({ file: relative(OUT_DIR, full), size: stat.size });
    }
  }
}

walk(OUT_DIR);

for (const w of warnings) {
  console.warn(`[warn] ${w.file}: ${(w.size / 1024 / 1024).toFixed(1)} MiB (approaching 25 MiB limit)`);
}

if (offenders.length > 0) {
  console.error("Cloudflare Workers asset check FAILED. These files exceed the 25 MiB per-asset limit:");
  for (const o of offenders) {
    console.error(`  - ${o.file}: ${(o.size / 1024 / 1024).toFixed(1)} MiB`);
  }
  console.error("Fix: re-encode the source file in public/ (same filename, dimensions, quality preserved), rebuild, then redeploy.");
  process.exit(1);
}

console.log(`Cloudflare asset check passed (${(warnings.length === 0 ? "no oversized assets" : `${warnings.length} near-limit`)})`);
