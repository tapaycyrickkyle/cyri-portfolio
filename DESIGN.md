# Client-Ready Enterprise Design System (Anti-AI Template Specification)
**Version:** 2.0.0  
**Target:** Bespoke, High-End Client Deliverables  
**Objective:** Elimination of the "vibe-coded" SaaS aesthetic (purple gradients, bento grids, glassmorphism, emoji overuse) in favor of architecturally disciplined, editorial, and human-centered user interfaces.

---

## 1. Architectural Layout & Spatial Systems

### 1.1 Layout Philosophy
* **Structural Intent:** Abandon repetitive grid matrices and box-in-box containment. Use asymmetrical layouts, structural split-screens, and structural whitespace to establish visual hierarchy.
* **The Anti-Box Rule:** Information must be organized through typographic scale, solid background transitions, or structural borders—never by trapping every content module inside a separate rounded card.

### 1.2 Grid & Content Containment
* **Max Width Strategy:** Standardize on a strict desktop grid constraint. Use `max-w-7xl` (1280px) for standard marketing sections and `max-w-5xl` (1024px) for high-density, editorial prose sections to maximize focus.
* **Section Transitions:** Separate content blocks using raw structural whitespace or solid, hard-edged background color shifts. Do not use floating cards over ambient gradient backdrops.

### 1.3 Margins and Padding System (Mathematical Scales)
* **Macro-Spacing (Section-to-Section):** Enforce wide vertical breathing room. A minimum desktop vertical padding of `py-24` (96px) to `py-32` (128px) must be applied across alternating content components.
* **Micro-Spacing (Inline Elements):** Maintain proportional geometric lockups. Use a strict 4:1 scale ratio for structural elements (e.g., if paragraph block padding is `p-8`, accompanying internal elements must map cleanly to `p-2`).

---

## 2. Typographic Discipline & Scale

### 2.1 Font Selection & Pairing Matrix
* **Primary Display Serif:** Use high-contrast, editorial serif typefaces for all headings (H1, H2, H3). Suggested choices include *Playfair Display*, *Clash Display*, or *Cormorant Garamond*.
* **Secondary Interface Sans:** Use high-legibility, geometric sans-serif typefaces for user interface controls, body copy, and secondary metadata. Suggested choices include *Inter*, *SF Pro*, or *Instrument Sans*.

### 2.2 Strict Proportional Typography Scale
```text
[Element]      [Size]          [Weight]        [Line Height]   [Tracking]
Hero H1        4.5rem (72px)   Bold (700)      1.05 (Tight)    -0.03em
Section H2     3.0rem (48px)   Medium (500)    1.15            -0.02em
Subhead H3     1.5rem (24px)   Regular (400)   1.25            Normal
Body Copy      1.0rem (16px)   Regular (400)   1.60 (Wide)     Normal
UI Metadata    0.875rem (14px) Medium (500)    1.40            +0.05em
```

### 2.3 Typographic Rules
* **No Extremes:** Do not mix maximum bold display titles with ultra-thin, hard-to-read line weights in adjacent body copy blocks.
* **Container Bounds:** All long-form text elements must be explicitly constrained to a line length of 45 to 75 characters per line (`max-w-2xl` to `max-w-3xl`) to maximize scannability.

---

## 3. Sophisticated Color Budgets & Chromatic Restraint

### 3.1 The 60-30-10 Architecture Rule
* **60% Dominant (Canvas):** Limited to architectural neutrals. Use deep charcoal (`#0C0F12`), structured stone (`#1C1F22`), stark gallery white (`#FAFAFA`), or rich cream (`#FDFBF7`).
* **30% Secondary (Structure):** Used for typography, structural borders, subtle containers, and navigation foundations.
* **10% Accent (Intent):** Reserved purely for interactive cues, primary calls-to-action, or critical highlights.

### 3.2 Chromatic Restrictions & Outlawed Assets
* **Absolute Gradients Ban:** Radial background light-blooms, indigo-to-purple blurs, and shifting multicolour header text are strictly prohibited.
* **Neon Suppression:** High-chroma cyan, magenta, and electric lime green are banned. Brand accents must utilize organic, historically grounded color tones (e.g., deep burgundy, olive drab, terracotta, or midnight blue).

---

## 4. UI Elements & Functional Micro-Interactions

### 4.1 Structural Edges & Borders
* **Border Radius Lock:** Container border radius must be limited to crisp, sharp adjustments. Use a maximum of `rounded-md` (6px) or completely square `rounded-none` edges to imply precise architectural discipline.
* **Dividers:** Horizontal and vertical dividing lines must be thin, solid, and subtly contrasted against the canvas background (e.g., `border-neutral-200` on light or `border-neutral-800` on dark). No decorative multi-colored rules.

### 4.2 Buttons and Interactive Controls
* **States and Affordance:** Every actionable button component must have four distinct visual states explicitly mapped in code:
  1. `Default`: Solid neutral color blocks or sharply defined structural wireframe boxes.
  2. `Hover`: Smooth, elegant color weight shifts or intentional background fills.
  3. `Focus`: High-visibility outline focus rings (`focus-visible:ring-2 focus-visible:ring-offset-2`).
  4. `Disabled`: Clearly dimmed opacity accompanied by `cursor-not-allowed` system mappings.
* **Micro-Animations:** Replace aggressive, instantaneous snap transitions with smooth CSS animations. Enforce a standard duration using cubic-bezier easing formulas:  
  `transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]`

---

## 5. Asset Standards & System Integrity

### 5.1 Graphic Iconography
* **Zero Emoji Tolerance:** Emojis are strictly banned as UI components, navigation anchors, decorative header accents, or bullet points.
* **Bespoke SVGs Only:** Use unified, pixel-perfect monochrome SVG icon systems (e.g., *Lucide*, *Phosphor Icons*, or *Remix Icon* configured to uniform light or regular stroke weights).

### 5.2 Real Data vs. Mock Placeholders
* **System Status Integrity:** Do not use artificial green flashing indicators or mock live-metric counters unless they tie directly to real-time, functional API telemetry.
* **High-Fidelity Social Proof:** Remove generic one-letter profile placeholders. Customer reviews must feature real typography, clean typography-driven monogram identifiers, or fully validated asset paths.
