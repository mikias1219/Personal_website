import Image from "next/image";
import Link from "next/link";
import { Icon } from "./Icon";
export function HeroVisual() {
  return (
    <div className="hero-visual">
      <div className="portrait-frame">
        <div className="portrait-topline mono">
          <span>
            <span className="signal" /> SOFTWARE × INTELLIGENCE
          </span>
          <Icon name="code" />
        </div>
        <picture>
          <source
            srcSet="/portraits/portrait-hero-800.avif"
            type="image/avif"
          />
          <Image
            src="/portraits/portrait-casual-800.webp"
            width={800}
            height={1000}
            sizes="(max-width: 760px) 90vw, 480px"
            alt="Mikias Abate, software developer and AI engineer"
            loading="eager"
            fetchPriority="high"
            unoptimized
            className="hero-portrait"
          />
        </picture>
        <div className="portrait-caption">
          <div>
            <strong>
              Mikias Abate<span className="accent">.</span>
            </strong>
            <span>Software Developer & AI Engineer</span>
          </div>
          <span className="portrait-location mono">
            <Icon name="globe" /> Addis Ababa, ET
          </span>
        </div>
      </div>
      <div className="hero-build-card">
        <div className="build-card-heading">
          <span className="mono">IDEA → WORKING PRODUCT</span>
          <span className="signal" />
        </div>
        <div className="build-flow">
          <span>
            <Icon name="layers" /> Interface
          </span>
          <Icon name="arrow-right" />
          <span>
            <Icon name="code" /> API
          </span>
          <Icon name="arrow-right" />
          <span>
            <Icon name="brain" /> AI
          </span>
        </div>
        <p>Thoughtful interfaces. Connected systems.</p>
      </div>
      <Link className="hero-cert-chip" href="/#credentials">
        <Icon name="award" />
        <span>
          Microsoft Certified<strong>Azure AI Engineer</strong>
        </span>
        <Icon name="arrow-up-right" />
      </Link>
    </div>
  );
}
