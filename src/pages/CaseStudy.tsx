import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import { getProject, projects } from '../data/projects';
import FlowDiagram from '../components/FlowDiagram';
import Tags from '../components/Tags';
import { useMeta } from '../hooks/useMeta';
import { useReveal } from '../hooks/useReveal';
import NotFound from './NotFound';

const Section: React.FC<{ title: string; id: string; children: React.ReactNode }> = ({ title, id, children }) => (
  <section className="case-section reveal" aria-labelledby={id}>
    <h2 id={id} className="case-section-title label">{title}</h2>
    <div className="case-section-body prose">{children}</div>
  </section>
);

const CaseStudy: React.FC = () => {
  const { slug = '' } = useParams();
  const project = getProject(slug);

  useMeta({
    title: project?.title ?? 'Project not found',
    description: project ? `${project.summary} Case study by Mikias Abate.` : undefined,
    path: `/work/${slug}`,
  });
  useReveal(slug);

  if (!project) return <NotFound />;

  const { caseStudy: cs } = project;
  const index = projects.indexOf(project);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="container page case">
      <Link to="/work" className="back-link">
        <FiArrowLeft aria-hidden="true" /> All work
      </Link>

      <header className="case-header reveal">
        <p className="label">{project.category} · {project.year}</p>
        <h1 className="h1">{project.title}</h1>
        <p className="lead">{project.summary}</p>

        <dl className="case-meta">
          <div>
            <dt className="label">Role</dt>
            <dd>{project.role}</dd>
          </div>
          <div>
            <dt className="label">Year</dt>
            <dd>{project.year}</dd>
          </div>
          <div>
            <dt className="label">Stack</dt>
            <dd>{project.tags.join(', ')}</dd>
          </div>
          <div>
            <dt className="label">Links</dt>
            <dd className="case-links">
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <FiGithub aria-hidden="true" /> Source code
              </a>
              {project.demoLink && (
                <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <FiExternalLink aria-hidden="true" /> Live demo
                </a>
              )}
            </dd>
          </div>
        </dl>
      </header>

      <figure className="case-figure reveal">
        <FlowDiagram steps={cs.flow} variant="full" label={`${project.title} architecture flow`} />
        <figcaption className="mono">Architecture overview</figcaption>
      </figure>

      <div className="case-body">
        <Section title="Problem" id="problem">
          <p>{cs.problem}</p>
        </Section>

        <Section title="Approach" id="approach">
          <p>{cs.approach}</p>
        </Section>

        <Section title="Key features" id="features">
          <ul className="dash-list">
            {cs.features.map((f) => <li key={f}>{f}</li>)}
          </ul>
        </Section>

        <Section title="Stack" id="stack">
          <Tags items={cs.stack} />
        </Section>

        <Section title="Outcome" id="outcome">
          <p>{cs.result}</p>
          <h3 className="h4">What I learned</h3>
          <ul className="dash-list">
            {cs.learnings.map((l) => <li key={l}>{l}</li>)}
          </ul>
        </Section>
      </div>

      <nav className="case-next" aria-label="Next project">
        <p className="label">Next project</p>
        <Link to={`/work/${next.slug}`} className="case-next-link">
          <span className="h2">{next.title}</span>
          <FiArrowRight aria-hidden="true" />
        </Link>
        <p className="muted">{next.summary}</p>
      </nav>
    </article>
  );
};

export default CaseStudy;
