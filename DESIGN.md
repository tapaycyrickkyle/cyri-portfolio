# Design Direction

Use the uploaded dashboard screenshot only as a visual style reference.

Redesign only the visual skin of the existing website. Do not change the layout.

## Strict Rules

- Do not change the website layout.
- Do not change section order.
- Do not move components.
- Do not add new sections.
- Do not remove sections.
- Do not rewrite content.
- Do not change images.
- Do not change links.
- Do not add a sidebar or topbar unless one already exists or the user explicitly requests it.
- Do not change the page flow or structure.

## Allowed Updates

Only update:

- Colors
- Font family
- Font sizes
- Font weights
- Line heights
- Letter spacing
- Backgrounds
- Borders
- Border radius
- Card styling
- Button styling
- Hover states
- Shadows
- Spacing polish inside existing components

## Visual Target

Make the existing website visually feel like the uploaded dashboard screenshot: clean, light, modern SaaS/dashboard UI.

## Style Direction

- Light mode default
- Soft gray page background
- White card/surface backgrounds
- Subtle gray borders
- Minimal or no shadows
- Rounded corners around 8-16px
- Clean Inter-style typography
- Normal letter spacing
- Calm 400-600 font weights
- Restrained spacing
- Professional dashboard-like UI

## Palette

Before applying this design direction to any website, ask the user for the two main brand/theme colors they want to use. These are the primary identity colors, not the only colors allowed in the UI.

Required question:

```text
What are the two main brand/theme colors you want for this website?
Please provide hex codes if you have them.
```

Use the user's two colors as:

- Primary accent: user color 1
- Link/action accent: user color 2

Supporting neutral colors for backgrounds, cards, borders, text, muted text, hover states, and status states may still be used as needed. Choose or derive these supporting colors so they fit the clean, light SaaS/dashboard style.

Current selected palette for this website:

- Primary brand/theme color: `#F3F6FA`
- Link/action brand color: `#0C1220`

Because `#F3F6FA` is very light, use it primarily for the page background and soft brand surfaces. Use `#0C1220` for visible actions, links, focus states, icons, and high-contrast accents.

If the user does not provide two colors and asks to proceed, use this default reference palette:

- Primary accent: `#5B5CF6`
- Link/action accent: `#1688FF`
- Page background: `#F3F6FA`
- Surface: `#FFFFFF`
- Soft surface: `#F3F5F8`
- Text primary: `#101827`
- Text secondary: `#53627A`
- Text muted: `#8A97AE`
- Border: `#D9E0EA`
- Hover/active surface: `#DEE4ED`

## Typography

Use Inter or the closest modern SaaS font stack:

```css
font-family: Inter, "Segoe UI", "SF Pro Text", system-ui, sans-serif;
```

Typography rules:

- Body text: 14-15px, weight 400, line-height 22px
- Headings: 18-24px, weight 600
- Card titles: 18-20px, weight 600
- Buttons: 14px, weight 600
- Captions/labels: 11-12px, weight 500-600
- Letter spacing: 0px
- Avoid monospace fonts unless the text is actual code.

## Buttons

- Use rounded pill buttons when appropriate.
- Primary buttons may use dark navy `#111827` or the chosen primary accent.
- Secondary buttons should be subtle, bordered, or transparent.
- Hover states should be soft and minimal.

## Cards And Surfaces

- Use white cards.
- Use thin `#D9E0EA` borders.
- Use 8-16px border radius.
- Use minimal shadow or no shadow.
- Use soft gray inner panels where needed.

## Do Not Use

- Gradients
- Decorative blobs
- Glassmorphism
- Heavy shadows
- Oversized hero typography
- Extreme bold weights
- Uppercase styling unless already present

## Goal

Keep the website exactly the same structurally, but make the visual skin match the uploaded dashboard screenshot as closely as possible.
