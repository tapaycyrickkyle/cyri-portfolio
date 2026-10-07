export type ServiceSlug =
  | "web-development-philippines"
  | "ai-automation-philippines";

export type ServiceOffering = {
  title: string;
  description: string;
};

export type ServiceProcessStep = {
  number: string;
  title: string;
  description: string;
};

export type RelatedServiceProject = {
  title: string;
  href: string;
  description: string;
};

export type ServicePageData = {
  slug: ServiceSlug;
  eyebrow: string;
  title: string;
  metaTitle: string;
  description: string;
  intro: string;
  serviceType: string;
  offerings: ServiceOffering[];
  bestFor: string[];
  capabilities: string[];
  process: ServiceProcessStep[];
  relatedProjects: RelatedServiceProject[];
};

export const services: ServicePageData[] = [
  {
    slug: "web-development-philippines",
    eyebrow: "Web development services / Philippines",
    title: "Websites and web systems built around the way your business works.",
    metaTitle: "Web Developer in the Philippines | Websites and Web Systems",
    description:
      "Freelance web development in the Philippines by Cyrick Kyle B. Tapay: practical business websites, dashboards, and web systems built around real workflows.",
    intro:
      "I build clear, responsive websites and practical web systems for business owners, teams, and organizations that need a stronger online presence or a better way to manage information.",
    serviceType: "Freelance web development",
    offerings: [
      {
        title: "Business websites",
        description:
          "Responsive websites and landing pages that explain what you do, build trust, and make it easy for people to contact you.",
      },
      {
        title: "Web applications and dashboards",
        description:
          "Role-aware interfaces, dashboards, and internal tools that organize records, tasks, and business information.",
      },
      {
        title: "Workflow-focused systems",
        description:
          "Custom web experiences that connect forms, records, reviews, and recurring operational steps into a clearer flow.",
      },
      {
        title: "Existing website improvements",
        description:
          "Focused improvements to structure, responsiveness, content clarity, accessibility, and maintainability.",
      },
    ],
    bestFor: [
      "Small and growing Philippine businesses",
      "Service providers and local organizations",
      "Teams replacing manual or scattered processes",
      "Founders validating a practical digital product",
    ],
    capabilities: [
      "Next.js and React",
      "TypeScript and JavaScript",
      "Supabase and PostgreSQL",
      "Responsive interface development",
      "Forms, dashboards, and role-based workflows",
    ],
    process: [
      {
        number: "01",
        title: "Understand the problem",
        description:
          "We clarify the audience, business goal, content, workflow, and constraints before deciding what to build.",
      },
      {
        number: "02",
        title: "Map the experience",
        description:
          "I organize the information and user flow so the website or system has a clear structure before implementation.",
      },
      {
        number: "03",
        title: "Build and refine",
        description:
          "I develop the agreed experience, check it across screen sizes, and refine the details that affect clarity and usability.",
      },
    ],
    relatedProjects: [
      {
        title: "TESDA E-Assess",
        href: "/work/tesda-e-assess",
        description:
          "A workflow-focused assessment application with role-based interfaces and structured records.",
      },
      {
        title: "Alpha Nova Kids",
        href: "/work/alpha-nova-kids",
        description:
          "A learning application supported by a web-based content management portal.",
      },
      {
        title: "Bayanihan",
        href: "/work/bayanihan",
        description:
          "A community issue reporting and monitoring system with resident and administrator workflows.",
      },
    ],
  },
  {
    slug: "ai-automation-philippines",
    eyebrow: "AI automation services / Philippines",
    title: "AI-assisted workflows that reduce repetitive business work.",
    metaTitle: "AI Automation Specialist in the Philippines | Workflow Automation",
    description:
      "Freelance AI automation services in the Philippines by Cyrick Kyle B. Tapay: practical AI-assisted workflows, chatbot systems, and internal tools for businesses.",
    intro:
      "I help businesses turn repetitive tasks, scattered information, and manual follow-ups into clearer AI-assisted workflows and practical internal tools.",
    serviceType: "AI workflow automation",
    offerings: [
      {
        title: "AI-assisted business workflows",
        description:
          "Workflows that use AI where it is useful, while keeping human review and business judgment in the right places.",
      },
      {
        title: "Chatbot and FAQ systems",
        description:
          "Structured tools for managing FAQs, conversation rules, and chatbot content connected to business needs.",
      },
      {
        title: "Information and task automation",
        description:
          "Practical ways to route information, prepare responses, organize records, and reduce repetitive coordination.",
      },
      {
        title: "Automation-ready internal tools",
        description:
          "Dashboards and admin tools that give teams visibility into the data and workflow behind an automated process.",
      },
    ],
    bestFor: [
      "Businesses handling repetitive inquiries or requests",
      "Teams managing FAQs, leads, or operational records",
      "Owners who want practical automation before a larger system",
      "Organizations that need a human-reviewed AI workflow",
    ],
    capabilities: [
      "AI-assisted workflow design",
      "Chatbot and FAQ management systems",
      "API-connected web applications",
      "Supabase-backed records and dashboards",
      "Human review and operational safeguards",
    ],
    process: [
      {
        number: "01",
        title: "Find the repeated work",
        description:
          "We identify what is repetitive, slow, inconsistent, or difficult to track before choosing an automation approach.",
      },
      {
        number: "02",
        title: "Design the boundaries",
        description:
          "I separate tasks that can be assisted by AI from decisions that should remain with a person or an existing business rule.",
      },
      {
        number: "03",
        title: "Build and review",
        description:
          "I build the workflow or supporting tool, then refine its handling of real inputs, exceptions, and human review.",
      },
    ],
    relatedProjects: [
      {
        title: "Business Chatbot AI",
        href: "/work/business-chatbot-ai",
        description:
          "An administrative dashboard for chatbot clients, FAQ content, and AI- and keyword-based conversation workflows.",
      },
      {
        title: "Huswell Trading website",
        href: "/#client-websites",
        description:
          "A business website project connected to practical digital and operational needs.",
      },
    ],
  },
];

export const serviceLinks = [
  {
    label: "Web development",
    href: "/services/web-development-philippines",
  },
  {
    label: "AI automation",
    href: "/services/ai-automation-philippines",
  },
] as const;

export function getService(slug: string) {
  return services.find((service) => service.slug === slug) ?? null;
}
