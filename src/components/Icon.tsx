import type { SVGProps } from "react";
export type IconName =
  | "github"
  | "linkedin"
  | "mail"
  | "arrow-up-right"
  | "arrow-right"
  | "arrow-down"
  | "download"
  | "code"
  | "brain"
  | "cloud"
  | "layers"
  | "briefcase"
  | "award"
  | "user"
  | "globe"
  | "message"
  | "menu"
  | "close"
  | "check";
const paths: Record<IconName, string> = {
  github:
    "M9 19c-4.3 1.3-4.3-2.2-6-2.7M15 22v-3.4c.1-1-.3-1.7-.8-2.1 2.8-.3 5.8-1.4 5.8-6.3 0-1.4-.5-2.5-1.3-3.4.1-.4.6-1.7-.1-3.4 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6.3 0C6.4 3.1 5.3 3.4 5.3 3.4c-.7 1.7-.2 3-.1 3.4C4.4 7.7 4 8.8 4 10.2c0 4.9 3 6 5.8 6.3-.4.4-.8 1.1-.8 2.1V22",
  linkedin: "M5 9v11M5 4v.01M10 20V9h4v2c1-3 6-3 6 2v7M14 20v-7M3 9h4M3 20h4",
  mail: "M3 5h18v14H3zM3 6l9 7 9-7",
  "arrow-up-right": "M6 18 18 6M6 6h12v12",
  "arrow-right": "M4 12h16m-6-6 6 6-6 6",
  "arrow-down": "M12 4v16m-6-6 6 6 6-6",
  download: "M12 3v12m-5-5 5 5 5-5M4 16v5h16v-5",
  code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
  brain:
    "M12 4c-3-4-8 0-6 3-4 0-5 6-2 7-2 4 2 8 5 6l3-2m0-14c3-4 8 0 6 3 4 0 5 6 2 7 2 4-2 8-5 6l-3-2V4M7 9l5 3 5-3M7 16l5-4 5 4",
  cloud: "M6 18a5 5 0 0 1-1-10 7 7 0 0 1 13-1 5.5 5.5 0 0 1 0 11H6",
  layers: "m12 3 10 5-10 5L2 8l10-5M2 12l10 5 10-5M2 16l10 5 10-5",
  briefcase: "M8 7V3h8v4M3 7h18v14H3zM3 11l9 4 9-4M10 14h4",
  award: "M16 13l2 9-6-3-6 3 2-9M19 8a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z",
  user: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2",
  globe:
    "M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0ZM3 12h18M12 3a19 19 0 0 1 0 18 19 19 0 0 1 0-18Z",
  message: "M21 4H3v13h5l4 4 4-4h5V4ZM7 9h10M7 13h6",
  menu: "M4 6h16M4 12h16M4 18h16",
  close: "m6 6 12 12M6 18 18 6",
  check: "m5 12 4 4L19 6",
};
export function Icon({
  name,
  className = "",
  ...props
}: SVGProps<SVGSVGElement> & { name: IconName }) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.65"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={`icon ${className}`}
      {...props}
    >
      <path d={paths[name]} />
    </svg>
  );
}
export function SocialIcon({ label }: { label: string }) {
  return (
    <Icon
      name={
        label === "GitHub"
          ? "github"
          : label === "LinkedIn"
            ? "linkedin"
            : "mail"
      }
    />
  );
}
