import { Code2, Globe, Mail } from "lucide-react";
import { socials } from "@/data/profile";

const icons = {
  GitHub: Code2,
  LinkedIn: Globe,
  Email: Mail,
} as const;

export function SocialLinks({
  className = "",
  includeEmail = true,
}: {
  className?: string;
  includeEmail?: boolean;
}) {
  const links = socials.filter((s) => includeEmail || s.label !== "Email");
  return (
    <ul className={`flex flex-wrap gap-2 ${className}`.trim()}>
      {links.map((s) => {
        const Icon = icons[s.label as keyof typeof icons];
        return (
          <li key={s.label}>
            <a
              href={s.href}
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line px-3.5 text-sm font-medium text-muted no-underline transition hover:border-accent hover:bg-accent-soft hover:text-text"
              {...(s.href.startsWith("http")
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              {Icon ? <Icon className="size-4" aria-hidden /> : null}
              {s.label}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
