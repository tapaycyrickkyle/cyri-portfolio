import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faArrowRight,
  faBars,
  faBookOpen,
  faCameraRetro,
  faCheck,
  faClapperboard,
  faCopy,
  faDatabase,
  faEnvelope,
  faFileArrowDown,
  faGlobe,
  faHammer,
  faHeadset,
  faLink,
  faMagnifyingGlass,
  faPalette,
  faRocket,
  faTableColumns,
  faTerminal,
  faArrowTrendUp,
  faWandMagicSparkles,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  faCss3Alt,
  faFacebook,
  faFigma,
  faGitAlt,
  faGithub,
  faHtml5,
  faInstagram,
  faJs,
  faLinkedin,
  faReact,
  faTiktok,
  faXTwitter,
} from "@fortawesome/free-brands-svg-icons";

export type IconName =
  | "arrow"
  | "book"
  | "brush"
  | "camera"
  | "check"
  | "clapperboard"
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
  | "x";

const iconMap: Record<IconName, IconDefinition> = {
  arrow: faArrowRight,
  book: faBookOpen,
  brush: faPalette,
  camera: faCameraRetro,
  check: faCheck,
  clapperboard: faClapperboard,
  copy: faCopy,
  css: faCss3Alt,
  dashboard: faTableColumns,
  database: faDatabase,
  download: faFileArrowDown,
  facebook: faFacebook,
  figma: faFigma,
  git: faGitAlt,
  github: faGithub,
  globe: faGlobe,
  hammer: faHammer,
  html: faHtml5,
  instagram: faInstagram,
  javascript: faJs,
  lifebuoy: faHeadset,
  link: faLink,
  linkedin: faLinkedin,
  mail: faEnvelope,
  menu: faBars,
  react: faReact,
  rocket: faRocket,
  search: faMagnifyingGlass,
  spark: faWandMagicSparkles,
  terminal: faTerminal,
  tiktok: faTiktok,
  trending: faArrowTrendUp,
  twitter: faXTwitter,
  x: faXmark,
};

export function Icon({
  name,
  className = "size-5",
}: {
  name: IconName;
  className?: string;
}) {
  return (
    <FontAwesomeIcon
      icon={iconMap[name]}
      className={`${className} portfolio-icon`}
      aria-hidden="true"
      fixedWidth
    />
  );
}
