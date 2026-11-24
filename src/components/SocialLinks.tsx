import { socials } from "@/data/profile";
import { SocialIcon } from "./Icon";

export function SocialLinks({
  className = "",
  includeEmail = true,
}: {
  className?: string;
  includeEmail?: boolean;
}) {
  return (
    <div className={`hero-links ${className}`.trim()}>
      {socials
        .filter((s) => includeEmail || s.label !== "Email")
        .map((s) => (
          <a key={s.label} href={s.href}>
            <SocialIcon label={s.label} />
            {s.label}
          </a>
        ))}
    </div>
  );
}
