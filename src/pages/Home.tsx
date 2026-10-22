import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiArrowRight, FiArrowUpRight, FiAward, FiBookOpen, FiCheck, FiCopy, FiDownload, FiExternalLink, FiMail, FiMapPin,
} from 'react-icons/fi';
import Portrait from '../components/Portrait';
import SectionHeader from '../components/SectionHeader';
import SectionLink from '../components/SectionLink';
import FeaturedProject from '../components/FeaturedProject';
import ProjectCard from '../components/ProjectCard';
import ExperienceTimeline from '../components/ExperienceTimeline';
import SkillGrid from '../components/SkillGrid';
import Pipeline from '../components/Pipeline';
import ContactForm from '../components/ContactForm';
import { featuredProjects, getProject, projects, type Project, type Track } from '../data/projects';
import { about, aiCapabilities, coreStack, getSocial, highlights, ragPipeline, site, socials } from '../data/profile';
import { certifications, cvFileName, cvUrl, education, experience, training } from '../data/experience';
import { useMeta } from '../hooks/useMeta';
import { useReveal } from '../hooks/useReveal';
import { useLocalTime } from '../hooks/useLocalTime';
import { usePositioning } from '../hooks/usePositioning';
import { copyEmail } from '../lib';

/** Renders "text [highlighted] text" with the bracketed part emphasised. */
const Headline: React.FC<{ text: string }> = ({ text }) => {
  const [before, highlighted, after] = text.split(/\[|\]/);
  return (
    <>
      {before}
      {highlighted && <span className="accent-text">{highlighted}</span>}
      {after}
    </>
  );
};

const trackCopy: Record<Track, { title: string; lead: string }> = {
  software: {
    title: 'Software engineering',
    lead: 'Products and backends where the engineering is the point: data rules, real-time systems, mobile and delivery.',
  },
  ai: {
    title: 'AI engineering',
    lead: 'Complete applications built around models: retrieval, conversational AI and multi-tenant AI platforms.',
  },
};

const resolve = (slugs: string[]) => slugs.map(getProject).filter((p): p is Project => p !== undefined);

const Home: React.FC = () => {
  useMeta({ path: '/' });
  const position = usePositioning();
  useReveal(position.key);
  const time = useLocalTime();

  const tracks: Track[] = position.projectsFirst === 'ai' ? ['ai', 'software'] : ['software', 'ai'];
  const featured = tracks.flatMap((t) => resolve(featuredProjects[t]));
  const more = projects.filter((p) => !featured.includes(p));
  const github = getSocial('GitHub');
  const linkedin = getSocial('LinkedIn');
  const currentRole = experience.find((r) => r.current);

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
            <p className="hero-name">
              {site.name} <span aria-hidden="true">—</span> <span className="hero-focus">{position.focus}</span>
            </p>
            <h1 id="hero-title" className="display">
              <Headline text={position.headline} />
            </h1>
            <p className="lead hero-lead">{position.lead}</p>

            <div className="actions">
              <SectionLink to="projects" className="btn btn-primary btn-lg">
                Explore my work <FiArrowRight aria-hidden="true" />
              </SectionLink>
              <a href={cvUrl} download={cvFileName} className="btn btn-secondary btn-lg">
                <FiDownload aria-hidden="true" /> Download CV
              </a>
            </div>

            <ul className="hero-links" aria-label="Contact and profiles">
              <li>
                <SectionLink to="contact" className="text-link">
                  <FiMail aria-hidden="true" /> Let’s connect
                </SectionLink>
              </li>
              <li>
                <a href={github.href} target="_blank" rel="noopener noreferrer" className="text-link">
                  <github.icon aria-hidden="true" /> GitHub
                </a>
              </li>
              <li>
                <a href={linkedin.href} target="_blank" rel="noopener noreferrer" className="text-link">
                  <linkedin.icon aria-hidden="true" /> LinkedIn
                </a>
              </li>
            </ul>
          </div>

          <figure className="hero-visual">
            <div className="hero-photo">
              <Portrait priority sizes="(min-width: 960px) 380px, 80vw" />
            </div>
            <div className="hero-system">
              <p className="hero-system-head">
                <span className="label">Featured system</span>
                <Link to="/work/knowledge-hub-rag" className="hero-system-link">
                  Knowledge Hub · RAG on Azure <FiArrowUpRight aria-hidden="true" />
                </Link>
              </p>
              <Pipeline steps={ragPipeline} label="Knowledge Hub retrieval pipeline" compact />
            </div>
            <figcaption className="sr-only">{site.name}, {site.location}</figcaption>
          </figure>
        </div>

        {/* At a glance: every figure here is backed by the CV or the projects below */}
        <div className="container">
          <dl className="glance">
            <div>
              <dt>2+ years</dt>
              <dd>Building full-stack and AI software professionally</dd>
            </div>
            <div>
              <dt>AI-102 · DP-100</dt>
              <dd>Microsoft Certified: Azure AI Engineer & Data Scientist</dd>
            </div>
            <div>
              <dt>{currentRole ? currentRole.org : 'Currently'}</dt>
              <dd>{currentRole ? `${currentRole.title} since ${currentRole.period.split(' — ')[0]}` : site.availability}</dd>
            </div>
            <div>
              <dt>{projects.length} case studies</dt>
              <dd>From RAG platforms to mobile apps, each with source code</dd>
            </div>
          </dl>
        </div>
      </section>

      {/* ------------------------------------------------------------ About */}
      <section id="about" className="section container" aria-labelledby="about-title">
        <SectionHeader id="about-title" eyebrow="About" title="Software engineer first, with AI as a core tool." />
        <div className="about-grid">
          <div className="prose about-story reveal">
            {about.paragraphs.map((p) => <p key={p.slice(0, 24)}>{p}</p>)}
          </div>
          <aside className="about-aside reveal" aria-label="Quick facts">
            <dl className="facts">
              {about.facts.map((f) => (
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

        <ul className="strengths">
          {about.strengths.map((s) => (
            <li key={s.title} className="strength reveal">
              <h3 className="h4">{s.title}</h3>
              <p className="muted">{s.text}</p>
            </li>
          ))}
        </ul>

        <div className="highlights reveal">
          <h3 className="label">Highlights</h3>
          <ul className="check-list">
            {highlights.map((h) => <li key={h}>{h}</li>)}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------ Applied AI */}
      <section id="ai" className="section container" aria-labelledby="ai-title">
        <div className="ai-panel">
          <SectionHeader
            id="ai-title"
            eyebrow="Applied AI"
            title="I engineer complete applications around AI — not just prompts."
            lead="Each capability below links to the project where I built it. The diagram is the retrieval pipeline behind Knowledge Hub."
          />
          <div className="ai-diagram reveal">
            <Pipeline steps={ragPipeline} label="Retrieval-augmented generation pipeline in Knowledge Hub" />
          </div>
          <ul className="ai-grid">
            {aiCapabilities.map((c) => (
              <li key={c.title} className="ai-card reveal">
                <h3 className="h4">{c.title}</h3>
                <p className="muted">{c.text}</p>
                <p className="ai-evidence">
                  <span className="label">Built in</span>
                  {c.evidence.map((slug) => {
                    const p = getProject(slug);
                    return p ? <Link key={slug} to={`/work/${slug}`}>{p.title}</Link> : null;
                  })}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ------------------------------------------------------------ Skills */}
      <section id="skills" className="section container" aria-labelledby="skills-title">
        <SectionHeader
          id="skills-title"
          eyebrow="Skills"
          title="Technologies I use to ship."
          lead="Every item here appears in my professional work or in a project on this page."
        />
        <div className="core-stack reveal">
          <p className="label">Core stack</p>
          <ul className="tags tags--lg" aria-label="Core stack">
            {coreStack.map((t) => <li key={t} className="tag tag--strong">{t}</li>)}
          </ul>
        </div>
        <SkillGrid order={position.skillOrder} />
      </section>

      {/* ------------------------------------------------------------ Experience */}
      <section id="experience" className="section container" aria-labelledby="experience-title">
        <SectionHeader
          id="experience-title"
          eyebrow="Experience"
          title="Where I’ve built software."
          action={
            <a href={cvUrl} download={cvFileName} className="text-link">
              <FiDownload aria-hidden="true" /> Full CV
            </a>
          }
        />
        <ExperienceTimeline roles={experience} />
      </section>

      {/* ------------------------------------------------------------ Projects */}
      <section id="projects" className="section container" aria-labelledby="projects-title">
        <SectionHeader
          id="projects-title"
          eyebrow="Projects"
          title="Products and systems I’ve built."
          lead={`${featuredProjects.software.length} software and ${featuredProjects.ai.length} AI projects, each with the problem, the architecture and the decisions behind it. Every project links to its source code.`}
          action={
            <Link to="/work" className="text-link">
              All {projects.length} projects <FiArrowRight aria-hidden="true" />
            </Link>
          }
        />
        {tracks.map((track) => (
          <section key={track} className="track" aria-labelledby={`track-${track}`}>
            <header className="track-header">
              <h3 id={`track-${track}`} className="track-title">
                {trackCopy[track].title}
                <span className="track-count">{featuredProjects[track].length}</span>
              </h3>
              <p className="muted">{trackCopy[track].lead}</p>
            </header>
            <div className="featured-list">
              {resolve(featuredProjects[track]).map((project, i) => (
                <FeaturedProject key={project.slug} project={project} index={i} />
              ))}
            </div>
          </section>
        ))}

        <h3 className="subhead">More projects <span className="track-count">{more.length}</span></h3>
        <div className="project-grid">
          {more.map((project) => <ProjectCard key={project.slug} project={project} />)}
        </div>
        <p className="center-action">
          <Link to="/work" className="btn btn-secondary">
            Browse all {projects.length} projects <FiArrowRight aria-hidden="true" />
          </Link>
        </p>
      </section>

      {/* ------------------------------------------------------------ Certifications */}
      <section id="certifications" className="section container" aria-labelledby="certs-title">
        <SectionHeader id="certs-title" eyebrow="Certifications & Education" title="Microsoft certified on Azure AI and data science." />
        <ul className="cred-grid">
          {certifications.map((c) => (
            <li key={c.name} className="cred-card cred-card--cert reveal">
              <p className="cred-top">
                <span className="cred-icon" aria-hidden="true"><FiAward /></span>
                {c.code && <span className="cred-code">{c.code}</span>}
              </p>
              <p className="label">{c.issuer}</p>
              <h3 className="cred-name">{c.name}</h3>
              {c.scope && <p className="muted">{c.scope}</p>}
              {c.url && (
                <a href={c.url} target="_blank" rel="noopener noreferrer" className="text-link">
                  Verify credential <FiExternalLink aria-hidden="true" />
                </a>
              )}
            </li>
          ))}
          <li className="cred-card reveal">
            <p className="cred-top">
              <span className="cred-icon" aria-hidden="true"><FiBookOpen /></span>
              <span className="cred-code">{education.period}</span>
            </p>
            <p className="label">Education</p>
            <h3 className="cred-name">{education.degree}</h3>
            <p className="muted">{education.school}, {education.location}</p>
            {training.map((t) => (
              <p key={t.name} className="cred-extra">
                <FiCheck aria-hidden="true" /> <span><strong>{t.name}</strong> · {t.issuer}</span>
              </p>
            ))}
          </li>
        </ul>
      </section>

      {/* ------------------------------------------------------------ Contact */}
      <section id="contact" className="section container" aria-labelledby="contact-title">
        <div className="contact-panel">
          <div className="contact-intro reveal">
            <p className="label">Contact</p>
            <h2 id="contact-title" className="h1">Hiring for software or AI engineering? Let’s talk.</h2>
            <p className="lead">
              I’m open to full-time roles and contract work in software development, backend engineering and applied AI.
              Send a message about the role or project and I’ll reply by email.
            </p>
            <ul className="direct-list">
              <li>
                <FiMail aria-hidden="true" />
                <a href={`mailto:${site.email}`}>{site.email}</a>
                <button type="button" className="icon-btn icon-btn--sm" onClick={() => void copyEmail()} aria-label="Copy email address">
                  <FiCopy aria-hidden="true" />
                </button>
              </li>
              {socials.filter((s) => s.label !== 'Email').map(({ label, href, handle, icon: Icon }) => (
                <li key={label}>
                  <Icon aria-hidden="true" />
                  <a href={href} target="_blank" rel="noopener noreferrer">{label} <span className="muted">/{handle}</span></a>
                </li>
              ))}
              <li>
                <FiDownload aria-hidden="true" />
                <a href={cvUrl} download={cvFileName}>Download CV (PDF)</a>
              </li>
              <li>
                <FiMapPin aria-hidden="true" />
                <span>{site.location} · <span className="mono">{time}</span> local ({site.utcOffset})</span>
              </li>
            </ul>
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
