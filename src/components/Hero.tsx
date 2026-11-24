import Image from "next/image";
import { Button } from "./ui";
import { Icon } from "./Icon";
import { SocialLinks } from "./SocialLinks";
import { LocalTime } from "./LocalTime";
import { PortfolioChat } from "./PortfolioChat";
import { site } from "@/data/profile";
import { experience, cv } from "@/data/experience";

export function Hero() {
  const current = experience[0];
  return (
    <div className="container" id="top">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-intro">
          <div className="hero-who">
            <Image
              className="avatar"
              src="/portraits/portrait-suit-480.webp"
              width={480}
              height={600}
              sizes="56px"
              alt="Portrait of Mikias Abate"
              priority
            />
            <div>
              <p className="hero-name">{site.name}</p>
              <p className="hero-role">{site.role}</p>
            </div>
          </div>
          <h1 id="hero-title">{site.headline}</h1>
          <p className="hero-lead">
            I’m a {current.title.toLowerCase()} at {current.org} in Addis Ababa.
            I work across NestJS, Next.js, PostgreSQL, Python and Azure AI, from
            the API to the interface to AI that answers from your data.
          </p>
          <div className="hero-actions">
            <Button href={`mailto:${site.email}`}>
              <Icon name="mail" /> Email me
            </Button>
            <Button href={cv.url} variant="secondary" download={cv.filename}>
              <Icon name="download" /> Download CV
            </Button>
          </div>
          <SocialLinks includeEmail={false} />
          <div className="hero-facts">
            <p>
              <span className="dot" aria-hidden="true" />
              {site.availability}
            </p>
            <p>
              <LocalTime />
            </p>
          </div>
        </div>
        <PortfolioChat variant="hero" />
      </section>
    </div>
  );
}
