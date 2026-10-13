import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiAward, FiCopy, FiDownload, FiMapPin } from 'react-icons/fi';
import Portrait from '../components/Portrait';
import SectionHeader from '../components/SectionHeader';
import FlagshipCard from '../components/FlagshipCard';
import StackList from '../components/StackList';
import Timeline from '../components/Timeline';
import { flagshipProjects } from '../data/projects';
import { practices, proof, site, socials, stack } from '../data/profile';
import { certifications, cvFileName, cvUrl, education, experience } from '../data/experience';
import { useMeta } from '../hooks/useMeta';
import { useReveal } from '../hooks/useReveal';
import { useLocalTime } from '../hooks/useLocalTime';
import { copyEmail } from '../lib';

const marqueeItems = stack.flatMap((group) => group.items);

const Home: React.FC = () => {
  useMeta({ path: '/' });
  useReveal();
  const time = useLocalTime();

  return (
    <>
      {/* Hero */}
      <section className="hero container" aria-labelledby="hero-title">
        <div className="hero-copy">
          <p className="status status--pill">
            <span className="status-dot" aria-hidden="true" />
            Open to opportunities<span className="status-extra"> · {site.location}</span>
          </p>
          <p className="hero-name">Mikias Abate</p>
          <h1 id="hero-title" className="display">
            <span className="title-line">Software Developer</span>
            <span className="sr-only"> and </span>
            <span className="title-line">
              <span className="title-amp" aria-hidden="true">&amp;</span>
              <span className="accent-text">AI Engineer</span>
            </span>
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
          <ul className="hero-socials" aria-label="Profiles">
            <li className="label" aria-hidden="true">Find me</li>
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} aria-label={label} title={label} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  <Icon aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <figure className="hero-portrait">
          <div className="portrait-frame">
            <Portrait priority sizes="(min-width: 900px) 400px, 82vw" />
          </div>
          <p className="float-chip float-chip--top">
            <FiAward aria-hidden="true" />
            <span>
              <strong>Azure certified</strong>
              <small>AI-102 · DP-100</small>
            </span>
          </p>
          <p className="float-chip float-chip--bottom">
            <FiMapPin aria-hidden="true" />
            <span>
              <strong>Addis Ababa</strong>
              <small>{time} local · UTC+3</small>
            </span>
          </p>
          <figcaption className="sr-only">Mikias Abate — Addis Ababa</figcaption>
        </figure>
      </section>

      {/* Stack marquee: decorative, the full list is in the Stack section below */}
      <div className="marquee" aria-hidden="true">
        <div className="marquee-track">
          {[0, 1].map((copy) => (
            <ul key={copy}>
              {marqueeItems.map((item) => <li key={item}>{item}</li>)}
            </ul>
          ))}
        </div>
      </div>

      {/* At a glance */}
      <section className="container" aria-label="At a glance">
        <dl className="stats">
          {proof.map((p) => (
            <div key={p.label} className="stat spot reveal">
              <dt>
                <span className="stat-figure">{p.figure}</span>
                <span className="label">{p.label}</span>
              </dt>
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
            <article key={p.title} className="practice spot reveal">
              <p className="practice-head">
                <span className="practice-icon" aria-hidden="true"><p.icon /></span>
                <span className="label" aria-hidden="true">{String(i + 1).padStart(2, '0')} / {String(practices.length).padStart(2, '0')}</span>
              </p>
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
          <h2 id="cta-title" className="h1">Let’s build <span className="accent-text">something.</span></h2>
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
