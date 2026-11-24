import Link from "next/link";
import { site, socials } from "@/data/profile";

export function Footer() {
  return (
    <footer className="container site-footer">
      <p>
        <strong>{site.name}</strong>
        <br />
        {site.role} in {site.location}
      </p>
      <nav className="footer-links" aria-label="Footer">
        <Link href="/#top">Back to top</Link>
        {socials.map((s) => (
          <a key={s.label} href={s.href}>
            {s.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
