import type { IconName } from "./portfolio-icon";
import type { SkillBrandName } from "./skill-brand-icon";

export type NavigationItem = {
  label: string;
  href: `#${string}`;
};

export type IntroCard = {
  icon: IconName;
  title: string;
  description: string;
};

export type ProjectItem = {
  title: string;
  description: string;
  summary: string;
  tags: string[];
  image: string;
  images?: string[];
  alt: string;
  status: string;
  role?: string;
  projectType?: string;
  year?: string;
  focus: string[];
  outcomes: string[];
  githubLink?: string;
};

export type LearningStep = {
  icon: IconName;
  title: string;
  description: string;
  step: string;
  badge: "building" | "learning" | null;
};

export type TechStackItem = {
  brandIcon?: SkillBrandName;
  icon?: IconName;
  label: string;
  logoSrc?: string;
  invertInDark?: boolean;
  wideLogo?: boolean;
};

export type FutureArea = {
  icon: IconName;
  title: string;
  description: string;
};

export type MediaEditItem = {
  title: string;
  label: string;
  description: string;
  image: string;
  alt: string;
  width: number;
  height: number;
};

export type ClientWebsiteItem = {
  title: string;
  category: string;
  href: string;
  image?: string;
  alt: string;
};

export type SocialLink = {
  icon: IconName;
  label: string;
  href: string;
  brandColor?: string;
  external?: boolean;
};

export const heroSocialLinks: SocialLink[] = [
  {
    icon: "github",
    label: "GitHub",
    href: "https://github.com/tapaycyrickkyle",
    brandColor: "#181717",
    external: true,
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tapay-cyrick-3593b032b/",
    brandColor: "#0A66C2",
    external: true,
  },
  {
    icon: "twitter",
    label: "Twitter / X",
    href: "https://x.com/cyrix0801",
    brandColor: "#111111",
    external: true,
  },
  {
    icon: "facebook",
    label: "Facebook",
    href: "https://web.facebook.com/cyrick.kyle.tapay.2024",
    brandColor: "#1877F2",
    external: true,
  },
  {
    icon: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/cyrick3/",
    brandColor: "#E4405F",
    external: true,
  },
];

export const navigation: NavigationItem[] = [
  { label: "Websites", href: "#client-websites" },
  { label: "Projects", href: "#work" },
  { label: "Learning", href: "#learning" },
  { label: "Skills", href: "#skills" },
  { label: "Profile", href: "#profile" },
  { label: "Contact", href: "#contact" },
];

export const introCards: IntroCard[] = [
  {
    icon: "terminal",
    title: "What I Build",
    description:
      "Functional web applications and system prototypes using modern frameworks and practical database tools.",
  },
  {
    icon: "book",
    title: "What I Am Learning",
    description:
      "React, TypeScript, and backend architecture patterns that make interfaces more resilient and easier to maintain.",
  },
  {
    icon: "trending",
    title: "How I Grow",
    description:
      "By building, breaking, refining, and turning school exercises into projects that feel closer to real product work.",
  },
];

export const fallbackProjects: ProjectItem[] = [
  {
    title: "TESDA E-Forms",
    description:
      "A student system prototype for digital government service forms, focused on clearer enrollment flow, form UX, and data structure.",
    summary:
      "A student prototype exploring how a digital form system could simplify enrollment flow and make administrative tasks easier to manage.",
    tags: ["NEXT.JS", "SUPABASE"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuA33dgn9XLyGSuzZr4EFyjoPRQadd_jgY-uZdURXJkr_bkNWbBi6b2c531CG5Mw0_bgbb7Kxe17QRx4YSrjc5lOs_DKJCZp6IogYQmRDPydPOxWTrk_ScSQjLzeaxXKAgDygK1hUvVvN485TlYt1z_PNASwl8Qm-T6pDR6aypM5x36CvRNjkYtcEcdtdz_tYvR8Icg9lEpnG1-hNS5uTzCSaR7raa8wJn5MN3ZmlhJsZotQiX2HH_R7C1YuRV9mpsTwhqbnEqz0gjY",
    alt: "A clean analytics dashboard for a public service office with crisp typography and subtle dividers.",
    status: "Student system prototype",
    focus: ["Form UX", "Data structure", "Service workflow"],
    outcomes: [
      "Reduced repetitive manual entry in the proposed flow",
      "Clarified the enrollment journey for applicants and staff",
      "Practiced connecting interface decisions to real administrative needs",
    ],
  },
  {
    title: "Learning App Interface",
    description:
      "A UI concept for a peer-to-peer tutoring app, focused on mobile responsiveness, structure, and visual hierarchy.",
    summary:
      "A UI-first exploration of how a student-centered learning product could feel approachable, structured, and easy to navigate.",
    tags: ["FIGMA", "UI DESIGN"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIICtikNjKA2eTYibfRmS7H2-wETV8eeBylp3j_q-qmZAtFDS6yqLJhsHRk0gVe86k_tCM2LdUTX-uyXpc27h_34HRmhaH607vlVJv9lH-Fv3dgW3AU7LIwrrH-F2iyWx_8tM32z-n5zn1qDWqbmIRFEgphsO52VOqfcVG6hycYuQqHj4D6XuTKB_jfZEpRfAMNULt544qmB7UAgUCYR0hVDQ11ixZetQGc6Usk1_cNsET8mACi7uyy3PfEYkcgezv_yjyI3mJIO0",
    alt: "A mobile learning product UI with progress bars, structured cards, and soft shadows.",
    status: "Interface concept",
    focus: ["Mobile clarity", "Information hierarchy", "Peer-learning flows"],
    outcomes: [
      "Explored card systems and progress indicators for learning UX",
      "Practiced designing for small screens without crowding the layout",
      "Improved confidence in visual rhythm and component consistency",
    ],
  },
  {
    title: "Admin Dashboard",
    description:
      "A dashboard workflow prototype focused on information density, data grouping, and clearer admin-side task flow.",
    summary:
      "A dashboard study aimed at balancing dense data with legibility, structure, and faster operator decision-making.",
    tags: ["WEB UI", "STRUCTURE"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD5yjVJPvZcjLybBh6ZpbkNLsSNOAWmB9_KfGQG3P2SLGiTXUDkyRpSmDeuzbBFV6r5U_AbAiwkzEtFlWRIWNBu3RPpDYu5nIljSiJhtfC2fMDWxOf9hR_veaUhOSKEpsw2aof-D6fRzgg-biQN-9Y1efEDdxsVxD2VAZ1nDONTd8_ONISPa9rn_StN8cCikZYQ7oWJj8QGjKZRi40-z2r_ir22TobW-QpbH4MRuxo9PDM2U_gnR6YQ481tvqmp37S3yc-vokItIME",
    alt: "A complex web admin dashboard with dense data panels, clear hierarchy, and strong structure.",
    status: "Workflow prototype",
    focus: ["Admin flows", "Data grouping", "Navigation structure"],
    outcomes: [
      "Tested layouts for high-information screens",
      "Improved separation between summary panels and task panels",
      "Learned how spacing and contrast affect operational interfaces",
    ],
  },
  {
    title: "Personal Portfolio",
    description:
      "My first portfolio practice build, where I focused on semantic HTML and custom CSS layouts without frameworks.",
    summary:
      "The project that kicked off a lot of my current UI interest by forcing me to care about structure, spacing, and readability.",
    tags: ["HTML", "CSS"],
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuColpyjhZdhX-RTLoHRuJsgmp7GksMBrW2gbkDXr0ftNe64eZgtJAJFf-15YZMfJwAXAWnwRpOYieZsM0ss6KfSHBT2LUk_C_yW-PIA9LJ4Y4bFDXH7nQpj5HTrbJ00PYRY_NuLjh0nyeAO0ae2Gg9NnekrSM9aCBplaC-ZZHbvSU1KNbTGaiTBtI9foY5Zin44TVNM7dvPCjeVhf5fRNK9CzIffMnknct-PqRibXxUF1TWvIz5eS4fXTs9_A2Evjbdx2MlWaT5feU",
    alt: "A minimalist personal portfolio displayed on a laptop screen with a structured grayscale layout.",
    status: "Foundational build",
    focus: ["Semantic HTML", "Layout basics", "Personal branding"],
    outcomes: [
      "Built confidence with raw HTML and CSS",
      "Learned the value of clean markup before adding tooling",
      "Created the base that this newer portfolio improves on",
    ],
  },
];

export const learningSteps: LearningStep[] = [
  {
    icon: "search",
    title: "Exploring",
    description:
      "Discovering interests in web development and systems thinking.",
    step: "Step 01",
    badge: null,
  },
  {
    icon: "hammer",
    title: "Practicing",
    description: "Building local projects and learning through failure.",
    step: "Step 02",
    badge: "building",
  },
  {
    icon: "spark",
    title: "Improving",
    description: "Refining code quality and UI design principles.",
    step: "Step 03",
    badge: "learning",
  },
  {
    icon: "rocket",
    title: "Preparing",
    description: "Building practical websites and improving through real client needs.",
    step: "Step 04",
    badge: null,
  },
];

export const techStackItems: TechStackItem[] = [
  {
    brandIcon: "html5",
    label: "HTML5",
  },
  {
    brandIcon: "css",
    label: "CSS3",
  },
  {
    brandIcon: "javascript",
    label: "JavaScript",
  },
  {
    brandIcon: "react",
    label: "React",
  },
  {
    brandIcon: "flutter",
    label: "Flutter",
  },
  {
    brandIcon: "nextjs",
    label: "Next.js",
  },
  {
    brandIcon: "nodejs",
    label: "Node.js",
  },
  {
    brandIcon: "figma",
    label: "Figma",
  },
  {
    brandIcon: "git",
    label: "Git",
  },
  {
    brandIcon: "github",
    label: "GitHub",
  },
  {
    brandIcon: "postgresql",
    label: "SQL",
  },
  {
    brandIcon: "supabase",
    label: "Supabase",
  },
  {
    brandIcon: "tauri",
    label: "Tauri",
  },
  {
    brandIcon: "gemini",
    label: "AI Tools",
  },
  {
    brandIcon: "davinci-resolve",
    label: "Editing",
  },
  {
    brandIcon: "krita",
    label: "Drawing",
  },
  {
    label: "Photoshop",
    logoSrc: "/brand-icons/photoshop.svg",
    invertInDark: true,
  },
  {
    brandIcon: "filmora",
    label: "Filmora",
  },
  {
    label: "CapCut",
    logoSrc: "/brand-icons/capcut.svg",
    invertInDark: true,
    wideLogo: true,
  },
];

export const futureAreas: FutureArea[] = [
  {
    icon: "code",
    title: "Web Dev",
    description: "Creating responsive, fast-loading web apps.",
  },
  {
    icon: "figma",
    title: "UI/UX",
    description: "Designing clearer interfaces and smoother user experiences.",
  },
  {
    icon: "database",
    title: "Database",
    description: "Structuring and managing data efficiently.",
  },
  {
    icon: "spark",
    title: "AI and Automation",
    description:
      "Using intelligent tools and practical system workflows to solve real business problems more efficiently.",
  },
  {
    icon: "terminal",
    title: "Agentic Development",
    description:
      "Designing AI-assisted workflows and system behaviors that can help plan, execute, and improve work more intentionally.",
  },
];

export function formatEditedVisualTitle(imagePath: string) {
  const fileName = imagePath.split("/").pop() ?? imagePath;
  const baseName = fileName.replace(/\.[^.]+$/, "");

  return baseName
    .replace(/[._-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

export const clientWebsites: ClientWebsiteItem[] = [
  {
    title: "Huswell Trading",
    category: "Custom packaging supplier business website",
    href: "https://www.huswelltrading.com/",
    image: "/images/client-websites/huswell-trading.webp",
    alt: "Screenshot preview of the Huswell Trading business website.",
  },
  {
    title: "Arkylite",
    category: "Architecture and design-build business website",
    href: "http://arkylite.com/",
    image: "/images/client-websites/arkylite.webp",
    alt: "Screenshot preview of the Arkylite business website.",
  },
  {
    title: "Mariquina Travel",
    category: "Van and car rental business website",
    href: "https://mariquinatravel.com/",
    image: "/images/client-websites/mariquina-travel.webp",
    alt: "Screenshot preview of the Mariquina Travel business website.",
  },
  {
    title: "North Grove at Pristina",
    category: "Real estate landing page",
    href: "https://northgroveatpristina.com/",
    alt: "Live preview link for the North Grove at Pristina landing page.",
  },
];

export const contactLinks: SocialLink[] = [
  {
    icon: "mail",
    label: "tapaycyrickkyle@gmail.com",
    href: "mailto:tapaycyrickkyle@gmail.com",
  },
  {
    icon: "github",
    label: "github.com/tapaycyrickkyle",
    href: "https://github.com/tapaycyrickkyle",
    external: true,
  },
  {
    icon: "linkedin",
    label: "linkedin.com/in/tapay-cyrick-3593b032b",
    href: "https://www.linkedin.com/in/tapay-cyrick-3593b032b/",
    external: true,
  },
];

export const footerLinks: SocialLink[] = [
  {
    icon: "github",
    label: "GitHub",
    href: "https://github.com/tapaycyrickkyle",
    external: true,
  },
  {
    icon: "linkedin",
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tapay-cyrick-3593b032b/",
    external: true,
  },
  {
    icon: "facebook",
    label: "Facebook",
    href: "https://web.facebook.com/cyrick.kyle.tapay.2024",
    external: true,
  },
  {
    icon: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/cyrick3/",
    external: true,
  },
  {
    icon: "twitter",
    label: "Twitter",
    href: "https://x.com/cyrix0801",
    external: true,
  },
];
