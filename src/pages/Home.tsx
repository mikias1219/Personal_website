import React from 'react';
import { FiDownload, FiExternalLink, FiGithub, FiMail, FiLinkedin, FiArrowRight } from 'react-icons/fi';
import Portrait from '../components/Portrait';
import SectionHeader from '../components/SectionHeader';
import ExperienceTimeline from '../components/ExperienceTimeline';
import ProjectCard from '../components/ProjectCard';
import ContactForm from '../components/ContactForm';
import ThemeToggle from '../components/ThemeToggle';
import SectionLink from '../components/SectionLink';
import { site, socials, skills, highlights } from '../data/profile';
import { certifications, cvFileName, cvUrl, education, experience } from '../data/experience';
import { projects } from '../data/projects';
import { useMeta } from '../hooks/useMeta';
import { useReveal } from '../hooks/useReveal';
import { useLocalTime } from '../hooks/useLocalTime';

/** Featured = the two SELECTED PROJECTS at the top of the CV. */
const FEATURED = ['Selamnew Workspace', 'Selamnew Collaboration'];
const featured = projects.filter((p) => FEATURED.includes(p.title));
const more = projects.filter((p) => !FEATURED.includes(p.title));

const iconFor = (label: string) => (label === 'GitHub' ? FiGithub : label === 'LinkedIn' ? FiLinkedin : FiMail);

const Home: React.FC = () => {
  useMeta({ path: '/' });
  useReveal(true);
  const time = useLocalTime();

  return (
    <>
      {/* ------------------------------------------------------------ Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="status-pill">
              <span className="status-dot" aria-hidden="true" />
              {site.availability}
            </p>
            <h1 id="hero-title" className="display">
              {site.name}
              <span className="h1-sub">{site.role}</span>
            </h1>
            <p className="lead hero-lead">{site.statement}</p>

            <div className="actions">
              <a href={cvUrl} download={cvFileName} className="btn btn-primary btn-lg">
                <FiDownload aria-hidden="true" /> Download CV
              </a>
              <SectionLink to="projects" className="btn btn-secondary btn-lg">
                View projects <FiArrowRight aria-hidden="true" />
              </SectionLink>
            </div>

            <ul className="hero-links" aria-label="Contact and profiles">
              {socials.map(({ label, href }) => {
                const Icon = iconFor(label);
                const external = href.startsWith('http');
                return (
                  <li key={label}>
                    {external ? (
                      <a href={href} target="_blank" rel="noopener noreferrer" className="text-link">
                        <Icon aria-hidden="true" /> {label}
                      </a>
                    ) : (
                      <a href={href} className="text-link">
                        <Icon aria-hidden="true" /> Email
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          <figure className="hero-visual">
            <div className="hero-photo">
              <Portrait priority sizes="(min-width: 960px) 380px, 80vw" />
            </div>
            <figcaption className="sr-only">{site.name}, {site.location}</figcaption>
          </figure>
        </div>

        <div className="container">
          <dl className="glance">
            {[
              { dt: 'IE Network Solutions', dd: 'Full-stack software engineer · Jun 2025 — present' },
              { dt: 'AI Copilot for HR', dd: 'Natural-language answers over workforce data' },
              { dt: 'AI-102', dd: 'Microsoft Certified: Azure AI Engineer Associate' },
              { dt: 'B.Sc. IS', dd: 'Information Systems, Addis Ababa University' },
            ].map((f) => (
              <div key={f.dt}>
                <dt>{f.dt}</dt>
                <dd>{f.dd}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ About */}
      <section id="about" className="section container" aria-labelledby="about-title">
        <SectionHeader id="about-title" eyebrow="About" title="Who I am." />
        <div className="about-grid">
          <div className="prose about-story reveal">
            <p>
              I’m a full-stack AI engineer at IE Network Solutions in Addis Ababa. I build the application and the AI
              behind it — REST APIs, web and mobile apps, and Microsoft Azure AI services integrated into live business
              workflows.
            </p>
            <p>
              I started as a junior AI engineer, building CV extraction, candidate scoring and job matching on Azure AI.
              Since then I’ve designed and maintained full-stack internal business applications with NestJS, Next.js,
              PostgreSQL, Python and Docker, and shipped AI copilots that answer questions over workforce data.
            </p>
            <p>
              I’m Microsoft Certified as an Azure AI Engineer Associate (AI-102), with a B.Sc. in Information Systems
              from Addis Ababa University.
            </p>
          </div>
          <aside className="about-aside reveal" aria-label="Quick facts">
            <dl className="facts">
              {[
                { label: 'Currently', value: 'Software Engineer (Full-Stack), IE Network Solutions' },
                { label: 'Based in', value: `${site.location} (${site.utcOffset})` },
                { label: 'Education', value: `${education.degree}, ${education.school}` },
                { label: 'Open to', value: site.availability },
              ].map((f) => (
                <div key={f.label}>
                  <dt className="label">{f.label}</dt>
                  <dd>{f.value}</dd>
                </div>
              ))}
            </dl>
            <a href={cvUrl} download={cvFileName} className="btn btn-secondary btn-block">
              <FiDownload aria-hidden="true" /> Download CV (PDF)
            </a>
          </aside>
        </div>

        <ul className="highlights check-list reveal" aria-label="Highlights">
          {highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
      </section>

      {/* ------------------------------------------------------------ Skills */}
      <section id="skills" className="section container" aria-labelledby="skills-title">
        <SectionHeader id="skills-title" eyebrow="Skills" title="What I work with." />
        <div className="skill-groups">
          {skills.map((group) => (
            <div key={group.id} className="skill-group reveal">
              <h3 className="label">{group.title}</h3>
              <ul className="tags">
                {group.items.map((t) => <li key={t} className="tag">{t}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ------------------------------------------------------------ Experience */}
      <section id="experience" className="section container" aria-labelledby="experience-title">
        <SectionHeader
          id="experience-title"
          eyebrow="Experience"
          title="Where I’ve worked."
          action={<a href={cvUrl} download={cvFileName} className="text-link"><FiDownload aria-hidden="true" /> Full CV</a>}
        />
        <ExperienceTimeline roles={experience} />
      </section>

      {/* ------------------------------------------------------------ Projects */}
      <section id="projects" className="section container" aria-labelledby="projects-title">
        <SectionHeader
          id="projects-title"
          eyebrow="Projects"
          title="What I’ve built."
          lead="Selected work from the CV first, then full-source projects on GitHub."
        />
        <div className="featured-list">
          {featured.map((project) => (
            <div key={project.title} className="featured-card reveal">
              <p className="meta-row">
                {project.kind && <span className="badge">{project.kind}</span>}
                {project.stack && <span className="muted">{project.stack.join(' · ')}</span>}
              </p>
              <h3 className="featured-title">{project.title}</h3>
              <p className="lead">{project.summary}</p>
            </div>
          ))}
        </div>
        <div className="project-grid">
          {more.map((project) => <ProjectCard key={project.title} project={project} />)}
        </div>
      </section>

      {/* ------------------------------------------------------------ Certifications */}
      <section id="certifications" className="section container" aria-labelledby="certs-title">
        <SectionHeader id="certs-title" eyebrow="Certifications & Education" title="Credentials." />
        <ul className="cred-grid">
          {certifications.map((c) => (
            <li key={c.name} className="cred-card cred-card--cert reveal">
              <p className="label">{c.issuer}</p>
              <h3 className="cred-name">{c.code ? `${c.name}` : c.name}</h3>
              {c.code && <p className="muted mono">{c.code}</p>}
            </li>
          ))}
          <li className="cred-card reveal">
            <p className="label">Education</p>
            <h3 className="cred-name">{education.degree}</h3>
            <p className="muted">{education.school} · {education.period}</p>
          </li>
        </ul>
      </section>

      {/* ------------------------------------------------------------ Contact */}
      <section id="contact" className="section container" aria-labelledby="contact-title">
        <div className="contact-panel" id="chat">
          <div className="contact-intro reveal">
            <p className="label">Contact & AI assistant</p>
            <h2 id="contact-title" className="h1">Ask me anything — or just say hello.</h2>
            <p className="lead">
              Send a message directly — I reply by email. For quick questions about my experience, skills or projects,
              open the AI assistant: the chat bubble in the corner of every page answers from my CV.
            </p>
            <ul className="direct-list">
              <li>
                <FiMail aria-hidden="true" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
              <li>
                <FiGithub aria-hidden="true" />
                <a href="https://github.com/mikias1219" target="_blank" rel="noopener noreferrer">github.com/mikias1219</a>
              </li>
              <li>
                <FiLinkedin aria-hidden="true" />
                <a href="https://linkedin.com/in/mikiasabate" target="_blank" rel="noopener noreferrer">linkedin.com/in/mikiasabate</a>
              </li>
              <li>
                <FiExternalLink aria-hidden="true" />
                <a href={cvUrl} download={cvFileName}>Download CV (PDF)</a>
              </li>
              <li>
                <FiMail aria-hidden="true" />
                <span>{site.location} · <span className="mono">{time}</span> ({site.utcOffset})</span>
              </li>
            </ul>
            <div className="theme-inline"><ThemeToggle /></div>
          </div>
          <div className="contact-form-wrap reveal">
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
