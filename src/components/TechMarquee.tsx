import { skills } from "@/data/profile";

/** Decorative, motion-safe strip of the real stack from profile data. */
export function TechMarquee() {
  const items = Array.from(new Set(skills.flatMap((g) => g.items)));
  const track = (hidden: boolean) => (
    <ul className="marquee-track" aria-hidden={hidden || undefined}>
      {items.map((item) => (
        <li
          key={item}
          className="whitespace-nowrap rounded-full border border-line bg-surface/70 px-4 py-2 text-sm font-medium text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
  return (
    <div
      className="border-y border-line bg-surface/40 py-5"
      role="region"
      aria-label="Technologies used"
    >
      <div className="marquee">
        {track(false)}
        {track(true)}
      </div>
    </div>
  );
}
