import {
  siCss,
  siDavinciresolve,
  siFigma,
  siFlutter,
  siGit,
  siGithub,
  siGooglegemini,
  siHtml5,
  siJavascript,
  siKrita,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siReact,
  siSupabase,
  siTauri,
  siWondersharefilmora,
} from "simple-icons";

export type SkillBrandName =
  | "css"
  | "davinci-resolve"
  | "figma"
  | "filmora"
  | "flutter"
  | "gemini"
  | "git"
  | "github"
  | "html5"
  | "javascript"
  | "krita"
  | "nextjs"
  | "nodejs"
  | "postgresql"
  | "react"
  | "supabase"
  | "tauri";

const skillBrandMap = {
  css: siCss,
  "davinci-resolve": siDavinciresolve,
  figma: siFigma,
  filmora: siWondersharefilmora,
  flutter: siFlutter,
  gemini: siGooglegemini,
  git: siGit,
  github: siGithub,
  html5: siHtml5,
  javascript: siJavascript,
  krita: siKrita,
  nextjs: siNextdotjs,
  nodejs: siNodedotjs,
  postgresql: siPostgresql,
  react: siReact,
  supabase: siSupabase,
  tauri: siTauri,
} satisfies Record<SkillBrandName, { path: string }>;

export function SkillBrandIcon({
  name,
  className = "size-5",
}: {
  name: SkillBrandName;
  className?: string;
}) {
  const skillBrand = skillBrandMap[name];

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} skill-brand-icon`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={skillBrand.path} fill="currentColor" />
    </svg>
  );
}
