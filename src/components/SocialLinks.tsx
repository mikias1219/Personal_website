import { socials } from "@/data/profile";
import { Icon, SocialIcon } from "./Icon";
export function SocialLinks({
  className = "",
  includeEmail = true,
}: {
  className?: string;
  includeEmail?: boolean;
}) {
  return (
    <div className={`social-links ${className}`}>
      {socials
        .filter((s) => includeEmail || s.label !== "Email")
        .map((s) => (
          <a key={s.label} href={s.href} className="social-link">
            <SocialIcon label={s.label} />
            <span>{s.label}</span>
            <Icon name="arrow-up-right" className="social-arrow" />
          </a>
        ))}
    </div>
  );
}
