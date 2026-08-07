import {
  siFacebook,
  siGithub,
  siInstagram,
  siX,
} from "simple-icons";

export type SocialBrandName =
  | "facebook"
  | "github"
  | "instagram"
  | "linkedin"
  | "twitter";

const socialBrandMap = {
  facebook: siFacebook,
  github: siGithub,
  instagram: siInstagram,
  linkedin: {
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.447-2.136 2.942v5.664H9.351V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.368-1.85 3.602 0 4.267 2.371 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.124 2.062 2.062 0 0 1 0 4.124zM7.114 20.452H3.558V9h3.556v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
  twitter: siX,
} satisfies Record<SocialBrandName, { path: string }>;

export function isSocialBrandName(name: string): name is SocialBrandName {
  return name in socialBrandMap;
}

export function SocialBrandIcon({
  name,
  className = "size-5",
}: {
  name: string;
  className?: string;
}) {
  const socialBrand = socialBrandMap[name as SocialBrandName];

  if (!socialBrand) {
    return null;
  }

  return (
    <svg
      viewBox="0 0 24 24"
      className={`${className} social-brand-icon`}
      aria-hidden="true"
      focusable="false"
    >
      <path d={socialBrand.path} fill="currentColor" />
    </svg>
  );
}
