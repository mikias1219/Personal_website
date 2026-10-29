import { Button } from "./ui";
import { site } from "@/data/profile";
export function ContactCTA() {
  return (
    <div className="closing-cta">
      <div>
        <p className="eyebrow">Have something in mind?</p>
        <h2>
          Let’s build
          <br />
          <span className="accent">something useful.</span>
        </h2>
        <p className="muted">
          {site.availability} · {site.location}, {site.utcOffset}
        </p>
      </div>
      <Button href="/contact">Start a conversation ↗</Button>
    </div>
  );
}
