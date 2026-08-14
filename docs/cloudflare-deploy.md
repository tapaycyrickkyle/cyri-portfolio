# Cloudflare Workers Deploy Prompt

Reusable prompt for deploying this Next.js site to Cloudflare Workers with automatic deployments from GitHub main, including auto-fixing issues with quality-preserved images.

> Deploy this existing Next.js site to Cloudflare Workers with automatic deployments from GitHub main. If you find any issue during setup, fix it rather than just reporting it.
>
> **Steps:**
> 1. Confirm the site works as a static export. If it needs SSR, API routes, middleware, or server actions, stop and tell me.
> 2. Configure Next.js static export and unoptimized images; set up `wrangler.jsonc` to serve the `out/` folder with a compatibility date; add the needed deploy scripts and dependencies. A `wrangler.jsonc` already exists — update it, don't recreate.
> 3. Run a production build, then scan `out/` for any file larger than Cloudflare's 25 MiB asset limit and list every offender.
> 4. Fix oversized files yourself: locate the source in `public/`, re-encode it in place (same filename, path, and dimensions) using quality-preserving compression (lossless/near-lossless PNG optimization, e.g. sharp, pngquant, or oxipng). Never downscale or convert to a lower quality/resolution — the images must not look pixelated. If a file cannot fit under 25 MiB without visible quality loss, stop and ask me before doing anything that degrades it.
> 5. Rebuild and re-scan until every asset is under the limit, and confirm all image references still resolve.
> 6. Add a permanent guard so this can't recur: a post-build check (e.g. `"postbuild": "node scripts/check-assets.mjs"`) that scans `out/` and fails with a clear file list if any asset exceeds 25 MiB.
> 7. Do not commit secrets — tell me which environment variables to add in Cloudflare (if any).
> 8. When everything passes: commit a concise change set and push to main to trigger the automatic deploy.
> 9. Confirm the deployment succeeded and tell me the live URL; if a deploy check failed, investigate, report, and fix it.
>
> If a tool is missing (compression, wrangler, etc.), install it as a devDependency and proceed.

## Deployment details

- Platform: Cloudflare Workers (static assets via `wrangler.jsonc`, `assets.directory = ./out`)
- Per-asset limit: **25 MiB** — enforced by `scripts/check-assets.mjs` via the `postbuild` hook
- Dashboard one-time setup: connect GitHub repo, trigger on `main`, build command `npm run build`, deploy command `npx wrangler deploy`