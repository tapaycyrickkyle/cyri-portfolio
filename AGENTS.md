<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Required Design System

For all frontend, UI, CSS, layout, component, and visual changes:

1. Read `DESIGN.md` first.
2. Follow its visual direction, palette, typography, and constraints.
3. Do not change layout, content, section order, images, or links unless the user explicitly asks.
4. If the user request conflicts with `DESIGN.md`, ask for clarification before editing.

## File boundaries

- The project root is the directory containing this AGENTS.md file.
- NEVER create or write files outside this project root.
- Temporary/scratch work goes only in `D:\Temp\opencode` (never `%TEMP%` or C: drive).
- If a build/tool wants to write elsewhere (logs, caches), keep it inside the project or ask the user first.
