import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiDownload } from 'react-icons/fi';
import Portrait from '../components/Portrait';
import Timeline from '../components/Timeline';
import StackList from '../components/StackList';
import SectionHeader from '../components/SectionHeader';
import { certifications, cvFileName, cvUrl, education, experience } from '../data/experience';
import { site } from '../data/profile';
import { useMeta } from '../hooks/useMeta';
import { useReveal } from '../hooks/useReveal';

const facts = [
  { label: 'Based in', value: site.location },
  { label: 'Currently', value: 'Software Developer, IE Network Solutions' },
  { label: 'Focus', value: 'RAG systems, AI integration, full-stack products' },
  { label: 'Open to', value: 'Full-time roles, contracts and collaborations' },
];

const About: React.FC = () => {
  useMeta({
    title: 'About',
    description: 'Background, experience, education and certifications of Mikias Abate, software developer and AI engineer in Addis Ababa.',
    path: '/about',
  });
  useReveal();

  return (
    <div className="container page">
      <header className="page-header reveal">
        <p className="label">About</p>
        <h1 className="h1">Software developer and AI engineer, building from Addis Ababa.</h1>
      </header>

      <div className="about-intro">
        <div className="prose about-story reveal">
          <p>
            I studied Information Systems at Addis Ababa University (2021–2024) and have spent the past two-plus
            years building software for real users — as a developer for a private company, as a freelance
            full-stack developer for Atlas Group, and since mid-2025 at IE Network Solutions.
          </p>
          <p>
            At IE Network Solutions I started as an AI &amp; data scientist, working on CV extraction, candidate
            scoring and job matching with Azure AI services, and moved into full-stack development of internal
            business applications with NestJS, Next.js, Python and PostgreSQL.
          </p>
          <p>
            Most of what I build sits where AI meets ordinary product engineering: retrieval that has to respect
            tenant boundaries, model output that needs structure before people can trust it, and the APIs,
            dashboards and mobile apps that make those capabilities usable. I care about clear data models, typed
            boundaries and deployments that are repeatable.
          </p>
          <p>
            Outside work I build in the open — more than 60 public repositories, from Azure AI-102 labs to complete
            products like <Link to="/work/techmarket-et">TechMarket ET</Link>.
          </p>
          <div className="actions">
            <a href={cvUrl} download={cvFileName} className="btn btn-primary">
              <FiDownload aria-hidden="true" /> Download CV
            </a>
            <Link to="/contact" className="btn btn-secondary">
              Get in touch <FiArrowRight aria-hidden="true" />
            </Link>
          </div>
        </div>

        <aside className="about-aside reveal" aria-label="Quick facts">
          <Portrait className="portrait--small" sizes="(min-width: 1024px) 280px, 60vw" />
          <dl className="facts">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="label">{f.label}</dt>
                <dd>{f.value}</dd>
              </div>
            ))}
          </dl>
        </aside>
      </div>

      <section className="section" aria-labelledby="experience-title">
        <SectionHeader id="experience-title" index="01" eyebrow="Experience" title="Roles" />
        <Timeline roles={experience} detailed />
      </section>

      <section className="section" aria-labelledby="creds-title">
        <SectionHeader id="creds-title" index="02" eyebrow="Credentials" title="Certifications & education" />
        <div className="creds">
          <ul className="cred-cards">
            {certifications.map((c) => (
              <li key={c.name} className="cred-card reveal">
                <p className="label">{c.issuer}{c.code ? ` · ${c.code}` : ''}</p>
                <p className="cred-name">
                  {c.url ? <a href={c.url} target="_blank" rel="noopener noreferrer">{c.name}</a> : c.name}
                </p>
              </li>
            ))}
            <li className="cred-card reveal">
              <p className="label">Education · {education.period}</p>
              <p className="cred-name">{education.degree}</p>
              <p className="muted">{education.school}</p>
            </li>
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="about-stack-title">
        <SectionHeader id="about-stack-title" index="03" eyebrow="Stack" title="Tools I use in production" />
        <StackList />
      </section>
    </div>
  );
};

export default About;
