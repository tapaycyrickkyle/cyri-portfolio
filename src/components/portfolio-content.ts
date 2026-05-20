import type { IconName } from "./portfolio-icon";

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
  alt: string;
  status: string;
  focus: string[];
  outcomes: string[];
};

export type LearningStep = {
  icon: IconName;
  title: string;
  description: string;
  step: string;
  badge: "building" | "learning" | null;
};

export type TechStackItem = {
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
  { label: "Work", href: "#work" },
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

export const projects: ProjectItem[] = [
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
    description: "Seeking internships and collaborating on real tools.",
    step: "Step 04",
    badge: null,
  },
];

export const techStackItems: TechStackItem[] = [
  {
    icon: "html",
    label: "HTML5",
  },
  {
    icon: "css",
    label: "CSS3",
  },
  {
    icon: "javascript",
    label: "JavaScript",
  },
  {
    icon: "react",
    label: "React",
  },
  {
    label: "Next.js",
    logoSrc: "/brand-icons/nextjs.svg",
    invertInDark: true,
  },
  {
    label: "Node.js",
    logoSrc: "/brand-icons/nodejs.svg",
    invertInDark: true,
  },
  {
    icon: "figma",
    label: "Figma",
  },
  {
    icon: "git",
    label: "Git",
  },
  {
    icon: "github",
    label: "GitHub",
  },
  {
    icon: "database",
    label: "SQL",
  },
  {
    label: "Supabase",
    logoSrc: "/brand-icons/supabase.svg",
    invertInDark: true,
  },
  {
    icon: "terminal",
    label: "AI Tools",
  },
  {
    icon: "camera",
    label: "Editing",
  },
  {
    label: "Photoshop",
    logoSrc: "/brand-icons/photoshop.svg",
    invertInDark: true,
  },
  {
    label: "Filmora",
    logoSrc: "/brand-icons/filmora.svg",
    invertInDark: true,
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
    icon: "globe",
    title: "Web Dev",
    description: "Creating responsive, fast-loading web apps.",
  },
  {
    icon: "brush",
    title: "Front-End",
    description: "Bridging the gap between design and code.",
  },
  {
    icon: "figma",
    title: "UI/UX",
    description: "Designing clearer interfaces and smoother user experiences.",
  },
  {
    icon: "lifebuoy",
    title: "System Support",
    description: "Troubleshooting and maintaining IT infrastructure.",
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

export const mediaEdits: MediaEditItem[] = [
  {
    title: "Portrait Retouch Study",
    label: "Photo Editing",
    description:
      "I enjoy refining portraits through cleaner tone balance, contrast control, and a more polished final presentation.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzkDu6EAuwiL4CvbvnEET9maquMsah0xt34Hdz6tpj3vlAK5aSI2mMnl3glw6ebY4HpKbXlvvvqtRauGg3RELnWt-koHZTGKHIzFpxXSAAaKJiWgcaBXd_Np6j3g9cwVIptAQYOLmEHfJCEqadc9S0stjg0yhKmTqKLinlaNLgZseWd__Go3WUeT1vWE7OopnR3wJyOfd352WE_6LCVcB34CwQQumhOnrNxq2Jn2BYNxhbO9L5H2wdbS1zZuGCAdiNOFL3FUeMcls",
    alt: "A portrait editing study with polished tones and a clean editorial feel.",
  },
  {
    title: "Visual Layout Polish",
    label: "Picture Editing",
    description:
      "I also work on presentation-focused edits where composition, clarity, and cleaner details help visuals feel stronger.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuColpyjhZdhX-RTLoHRuJsgmp7GksMBrW2gbkDXr0ftNe64eZgtJAJFf-15YZMfJwAXAWnwRpOYieZsM0ss6KfSHBT2LUk_C_yW-PIA9LJ4Y4bFDXH7nQpj5HTrbJ00PYRY_NuLjh0nyeAO0ae2Gg9NnekrSM9aCBplaC-ZZHbvSU1KNbTGaiTBtI9foY5Zin44TVNM7dvPCjeVhf5fRNK9CzIffMnknct-PqRibXxUF1TWvIz5eS4fXTs9_A2Evjbdx2MlWaT5feU",
    alt: "A polished visual editing study shown on a laptop display.",
  },
  {
    title: "Short-form Video Frames",
    label: "Video Editing",
    description:
      "For video work, I like shaping simple cuts, cleaner pacing, and stronger visual flow so the final edit feels more engaging.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIICtikNjKA2eTYibfRmS7H2-wETV8eeBylp3j_q-qmZAtFDS6yqLJhsHRk0gVe86k_tCM2LdUTX-uyXpc27h_34HRmhaH607vlVJv9lH-Fv3dgW3AU7LIwrrH-F2iyWx_8tM32z-n5zn1qDWqbmIRFEgphsO52VOqfcVG6hycYuQqHj4D6XuTKB_jfZEpRfAMNULt544qmB7UAgUCYR0hVDQ11ixZetQGc6Usk1_cNsET8mACi7uyy3PfEYkcgezv_yjyI3mJIO0",
    alt: "A visual study representing short-form video editing and polished presentation frames.",
  },
  {
    title: "Portrait Tone Cleanup",
    label: "Photo Editing",
    description:
      "A portrait-focused study where I refine tonal balance, edge cleanup, and overall presentation for a more polished result.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzkDu6EAuwiL4CvbvnEET9maquMsah0xt34Hdz6tpj3vlAK5aSI2mMnl3glw6ebY4HpKbXlvvvqtRauGg3RELnWt-koHZTGKHIzFpxXSAAaKJiWgcaBXd_Np6j3g9cwVIptAQYOLmEHfJCEqadc9S0stjg0yhKmTqKLinlaNLgZseWd__Go3WUeT1vWE7OopnR3wJyOfd352WE_6LCVcB34CwQQumhOnrNxq2Jn2BYNxhbO9L5H2wdbS1zZuGCAdiNOFL3FUeMcls",
    alt: "A portrait retouching study with balanced tones and a cleaner editorial finish.",
  },
  {
    title: "Interface Poster Treatment",
    label: "Picture Editing",
    description:
      "A presentation-oriented visual where composition, contrast, and framing are adjusted to make the interface feel more intentional.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuColpyjhZdhX-RTLoHRuJsgmp7GksMBrW2gbkDXr0ftNe64eZgtJAJFf-15YZMfJwAXAWnwRpOYieZsM0ss6KfSHBT2LUk_C_yW-PIA9LJ4Y4bFDXH7nQpj5HTrbJ00PYRY_NuLjh0nyeAO0ae2Gg9NnekrSM9aCBplaC-ZZHbvSU1KNbTGaiTBtI9foY5Zin44TVNM7dvPCjeVhf5fRNK9CzIffMnknct-PqRibXxUF1TWvIz5eS4fXTs9_A2Evjbdx2MlWaT5feU",
    alt: "An interface-focused visual edit with stronger framing and cleaner presentation.",
  },
  {
    title: "Motion Frame Polish",
    label: "Video Editing",
    description:
      "A short-form frame study where I shape visual pacing and more engaging composition for a cleaner final cut.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIICtikNjKA2eTYibfRmS7H2-wETV8eeBylp3j_q-qmZAtFDS6yqLJhsHRk0gVe86k_tCM2LdUTX-uyXpc27h_34HRmhaH607vlVJv9lH-Fv3dgW3AU7LIwrrH-F2iyWx_8tM32z-n5zn1qDWqbmIRFEgphsO52VOqfcVG6hycYuQqHj4D6XuTKB_jfZEpRfAMNULt544qmB7UAgUCYR0hVDQ11ixZetQGc6Usk1_cNsET8mACi7uyy3PfEYkcgezv_yjyI3mJIO0",
    alt: "A refined short-form video frame with polished composition and stronger visual rhythm.",
  },
  {
    title: "Editorial Portrait Pass",
    label: "Photo Editing",
    description:
      "A portrait edit where I focus on consistency, clarity, and small refinements that make the final visual feel more complete.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDzkDu6EAuwiL4CvbvnEET9maquMsah0xt34Hdz6tpj3vlAK5aSI2mMnl3glw6ebY4HpKbXlvvvqtRauGg3RELnWt-koHZTGKHIzFpxXSAAaKJiWgcaBXd_Np6j3g9cwVIptAQYOLmEHfJCEqadc9S0stjg0yhKmTqKLinlaNLgZseWd__Go3WUeT1vWE7OopnR3wJyOfd352WE_6LCVcB34CwQQumhOnrNxq2Jn2BYNxhbO9L5H2wdbS1zZuGCAdiNOFL3FUeMcls",
    alt: "An editorial-style portrait edit with a polished and consistent visual finish.",
  },
  {
    title: "Layout Presentation Study",
    label: "Picture Editing",
    description:
      "A visual polish exercise centered on stronger composition, spacing, and cleaner presentation for a more refined image.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuColpyjhZdhX-RTLoHRuJsgmp7GksMBrW2gbkDXr0ftNe64eZgtJAJFf-15YZMfJwAXAWnwRpOYieZsM0ss6KfSHBT2LUk_C_yW-PIA9LJ4Y4bFDXH7nQpj5HTrbJ00PYRY_NuLjh0nyeAO0ae2Gg9NnekrSM9aCBplaC-ZZHbvSU1KNbTGaiTBtI9foY5Zin44TVNM7dvPCjeVhf5fRNK9CzIffMnknct-PqRibXxUF1TWvIz5eS4fXTs9_A2Evjbdx2MlWaT5feU",
    alt: "A clean layout presentation study with stronger spacing and composition.",
  },
  {
    title: "Sequence Flow Refinement",
    label: "Video Editing",
    description:
      "A pacing-focused edit study where I improve frame flow, cut clarity, and the overall rhythm of the sequence.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBIICtikNjKA2eTYibfRmS7H2-wETV8eeBylp3j_q-qmZAtFDS6yqLJhsHRk0gVe86k_tCM2LdUTX-uyXpc27h_34HRmhaH607vlVJv9lH-Fv3dgW3AU7LIwrrH-F2iyWx_8tM32z-n5zn1qDWqbmIRFEgphsO52VOqfcVG6hycYuQqHj4D6XuTKB_jfZEpRfAMNULt544qmB7UAgUCYR0hVDQ11ixZetQGc6Usk1_cNsET8mACi7uyy3PfEYkcgezv_yjyI3mJIO0",
    alt: "A sequence refinement study with smoother pacing and clearer visual transitions.",
  },
  {
    title: "Creative Display Mockup",
    label: "Picture Editing",
    description:
      "A presentation-driven visual where I explore stronger contrast, hierarchy, and cleaner layout framing.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuColpyjhZdhX-RTLoHRuJsgmp7GksMBrW2gbkDXr0ftNe64eZgtJAJFf-15YZMfJwAXAWnwRpOYieZsM0ss6KfSHBT2LUk_C_yW-PIA9LJ4Y4bFDXH7nQpj5HTrbJ00PYRY_NuLjh0nyeAO0ae2Gg9NnekrSM9aCBplaC-ZZHbvSU1KNbTGaiTBtI9foY5Zin44TVNM7dvPCjeVhf5fRNK9CzIffMnknct-PqRibXxUF1TWvIz5eS4fXTs9_A2Evjbdx2MlWaT5feU",
    alt: "A creative display mockup with cleaner contrast and more intentional framing.",
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
