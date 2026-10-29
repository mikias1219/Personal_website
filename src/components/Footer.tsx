import Link from "next/link";
import { site } from "@/data/profile";
import { SocialLinks } from "./SocialLinks";
import { Icon } from "./Icon";
export function Footer() {
  return (
    <footer className="site-footer container">
      <div>
        <Link
          className="wordmark"
          href="/#top"
          aria-label="Mikias Abate — back to top"
        >
          <span className="brand-symbol">
            m<span>.</span>
          </span>
        </Link>
        <p>
          {site.name}
          <br />
          <span className="muted">{site.role}</span>
        </p>
      </div>
      <nav aria-label="Social profiles">
        <Link href="/#top">
          Back to top <Icon name="arrow-up-right" />
        </Link>
        <SocialLinks />
      </nav>
      <p className="footer-note">
        Designed with purpose. Built in Addis Ababa.
        <br />
        <span className="mono">
          {site.utcOffset} · {site.availability}
        </span>
      </p>
    </footer>
  );
}
