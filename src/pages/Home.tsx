import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiCopy, FiDownload } from 'react-icons/fi';
import Portrait from '../components/Portrait';
import SectionHeader from '../components/SectionHeader';
import FlagshipCard from '../components/FlagshipCard';
import StackList from '../components/StackList';
import Timeline from '../components/Timeline';
import { flagshipProjects } from '../data/projects';
import { practices, proof, site } from '../data/profile';
import { certifications, cvFileName, cvUrl, education, experience } from '../data/experience';
import { useMeta } from '../hooks/useMeta';
import { useReveal } from '../hooks/useReveal';
import { copyEmail } from '../lib';

const Home: React.FC = () => {
  useMeta({ path: '/' });
  useReveal();

  return (
    <>
      {/* Hero */}
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="status">
            <span className="status-dot" aria-hidden="true" />
            Open to opportunities · {site.location}
          </p>
          <p className="hero-name">Mikias Abate</p>
          <h1 id="hero-title" className="display">
            <span className="title-line">Software Developer</span>
            <span className="sr-only"> and </span>
            <span className="title-line">AI Engineer</span>
          </h1>
          <p className="lead">
            Software and AI engineer with 2+ years of experience building full-stack applications and
            AI-powered solutions using Python, modern web technologies and Microsoft Azure. Skilled in API
            development, AI integration and scalable software solutions.
          </p>
          <div className="actions">
            <Link to="/work" className="btn btn-primary">
              View work <FiArrowRight aria-hidden="true" />
            </Link>
            <a href={cvUrl} download={cvFileName} className="btn btn-secondary">
              <FiDownload aria-hidden="true" /> Download CV
            </a>
          </div>
        </div>
        <figure className="hero-portrait">
          <Portrait priority />
          <figcaption className="mono">Mikias Abate — Addis Ababa</figcaption>
        </figure>
      </section>

      {/* Proof strip */}
      <section className="container" aria-label="At a glance">
        <dl className="proof">
          {proof.map((p) => (
            <div key={p.label} className="proof-item">
              <dt className="label">{p.label}</dt>
              <dd>{p.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Flagship work */}
      <section className="section container" aria-labelledby="work-title">
        <SectionHeader
          id="work-title"
          index="01"
          eyebrow="Selected work"
          title="Systems I’ve designed and shipped"
          action={
            <Link to="/work" className="link-arrow">
              All projects <FiArrowRight aria-hidden="true" />
            </Link>
          }
        />
        <div className="flagship-list">
          {flagshipProjects.map((project, i) => (
            <FlagshipCard key={project.slug} project={project} index={i} />
          ))}
        </div>
      </section>

      {/* How I work */}
      <section className="section container" aria-labelledby="practice-title">
        <SectionHeader id="practice-title" index="02" eyebrow="How I work" title="Three areas, usually in combination" />
        <div className="practices">
          {practices.map((p, i) => (
            <article key={p.title} className="practice reveal">
              <p className="label">{String(i + 1).padStart(2, '0')}</p>
              <h3 className="h3">{p.title}</h3>
              <p className="muted">{p.text}</p>
              <ul className="dash-list">
                {p.points.map((point) => <li key={point}>{point}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {/* Stack */}
      <section className="section container" aria-labelledby="stack-title">
        <SectionHeader id="stack-title" index="03" eyebrow="Stack" title="Tools I use in production" />
        <StackList />
      </section>

      {/* Experience preview */}
      <section className="section container" aria-labelledby="exp-title">
        <SectionHeader
          id="exp-title"
          index="04"
          eyebrow="Experience"
          title="Where I’ve been building"
          action={
            <Link to="/about" className="link-arrow">
              Full background <FiArrowRight aria-hidden="true" />
            </Link>
          }
        />
        <div className="exp-preview">
          <Timeline roles={experience} />
          <div className="exp-aside reveal">
            <p className="label">Certifications</p>
            <ul className="cert-list">
              {certifications.slice(0, 2).map((c) => (
                <li key={c.name}>
                  <span>{c.name}</span>
                  <span className="mono muted">{c.code}</span>
                </li>
              ))}
            </ul>
            <p className="label">Education</p>
            <p>{education.degree}</p>
            <p className="muted">{education.school} · {education.period}</p>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="section container" aria-labelledby="cta-title">
        <div className="cta reveal">
          <h2 id="cta-title" className="h1">Let’s build something.</h2>
          <p className="lead">
            Have a role, a product or a system that needs AI in it? Tell me what you’re working on.
          </p>
          <div className="actions">
            <Link to="/contact" className="btn btn-primary">
              Start a conversation <FiArrowRight aria-hidden="true" />
            </Link>
            <button type="button" className="btn btn-secondary" onClick={() => void copyEmail()}>
              <FiCopy aria-hidden="true" /> Copy email
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
