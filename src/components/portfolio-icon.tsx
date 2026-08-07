import {
  ArrowRight,
  Atom,
  BookOpen,
  Braces,
  BriefcaseBusiness,
  Camera,
  Check,
  ChevronRight,
  Clapperboard,
  Code,
  Code2,
  CodeXml,
  Contact,
  Copy,
  Database,
  Download,
  FileCode2,
  GitBranch,
  Globe,
  Hammer,
  Headphones,
  House,
  Layers,
  Link,
  Mail,
  Menu,
  Music2,
  Paintbrush,
  PanelTop,
  Rocket,
  Search,
  Send,
  Share2,
  Sparkles,
  Terminal,
  TrendingUp,
  User,
  X as XIcon,
  type LucideIcon,
} from "lucide-react";

export type IconName =
  | "angle-right"
  | "arrow"
  | "book"
  | "briefcase"
  | "brush"
  | "camera"
  | "check"
  | "clapperboard"
  | "code"
  | "copy"
  | "css"
  | "dashboard"
  | "database"
  | "download"
  | "facebook"
  | "figma"
  | "git"
  | "github"
  | "globe"
  | "hammer"
  | "html"
  | "home"
  | "instagram"
  | "javascript"
  | "lifebuoy"
  | "link"
  | "linkedin"
  | "mail"
  | "menu"
  | "rocket"
  | "react"
  | "search"
  | "spark"
  | "terminal"
  | "tiktok"
  | "trending"
  | "twitter"
  | "user"
  | "x";

const iconMap: Record<IconName, LucideIcon> = {
  "angle-right": ChevronRight,
  arrow: ArrowRight,
  book: BookOpen,
  briefcase: BriefcaseBusiness,
  brush: Paintbrush,
  camera: Camera,
  check: Check,
  clapperboard: Clapperboard,
  code: Code2,
  copy: Copy,
  css: Braces,
  dashboard: PanelTop,
  database: Database,
  download: Download,
  facebook: Share2,
  figma: Layers,
  git: GitBranch,
  github: Code,
  globe: Globe,
  hammer: Hammer,
  html: FileCode2,
  home: House,
  instagram: Camera,
  javascript: CodeXml,
  lifebuoy: Headphones,
  link: Link,
  linkedin: Contact,
  mail: Mail,
  menu: Menu,
  react: Atom,
  rocket: Rocket,
  search: Search,
  spark: Sparkles,
  terminal: Terminal,
  tiktok: Music2,
  trending: TrendingUp,
  twitter: Send,
  user: User,
  x: XIcon,
};

export function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  const LucideIcon = iconMap[name];

  return (
    <LucideIcon
      className={`${className} portfolio-icon`}
      aria-hidden="true"
      focusable="false"
      strokeWidth={1.9}
    />
  );
}
