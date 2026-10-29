import Link from "next/link";
import { site, socials } from "@/data/profile";
export function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <Link className="wordmark" href="/">
          MA
          <span className="signal" />
        </Link>
        <p>
          {site.name}
          <br />
          <span className="muted">{site.role}</span>
        </p>
      </div>
      <nav aria-label="Social profiles">
        <Link href="/#top">Back to top ↑</Link>
        {socials.map((s) => (
          <a key={s.label} href={s.href}>
            {s.label} <span aria-hidden="true">↗</span>
          </a>
        ))}
      </nav>
      <p className="footer-note">
        Built with care in Addis Ababa.
        <br />
        <span className="mono">
          {site.utcOffset} · {site.availability}
        </span>
      </p>
    </footer>
  );
}
