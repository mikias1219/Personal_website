import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiExternalLink, FiGithub } from 'react-icons/fi';
import type { Project } from '../data/projects';
import FlowDiagram from './FlowDiagram';
import Tags from './Tags';

/** Large case-study card for the home page's featured projects. */
const FeaturedProject: React.FC<{ project: Project; index: number }> = ({ project, index }) => {
  const titleId = `featured-${project.slug}`;
  return (
    <article className="featured reveal" aria-labelledby={titleId}>
      <div className="featured-body">
        <p className="meta-row">
          <span className="meta-index">{String(index + 1).padStart(2, '0')}</span>
          <span>{project.category}</span>
          <span>{project.year}</span>
          {project.demoLink && <span className="live-badge"><span className="status-dot" aria-hidden="true" /> Live</span>}
        </p>
        <h3 id={titleId} className="featured-title">
          <Link to={`/work/${project.slug}`}>{project.title}</Link>
        </h3>
        <p className="featured-summary">{project.summary}</p>

        <dl className="featured-points">
          {project.brief && (
            <div>
              <dt>Problem</dt>
              <dd>{project.brief}</dd>
            </div>
          )}
          <div>
            <dt>Outcome</dt>
            <dd>{project.outcome}</dd>
          </div>
          {project.caseStudy.learnings[0] && (
            <div>
              <dt>Key decision</dt>
              <dd>{project.caseStudy.learnings[0]}</dd>
            </div>
          )}
          <div>
            <dt>My role</dt>
            <dd>{project.role}</dd>
          </div>
        </dl>

        <Tags items={project.tags} />

        <div className="featured-links">
          <Link to={`/work/${project.slug}`} className="btn btn-primary btn-sm">
            Read case study <FiArrowRight aria-hidden="true" />
          </Link>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
            <FiGithub aria-hidden="true" /> Source<span className="sr-only"> code for {project.title} (opens in a new tab)</span>
          </a>
          {project.moreLinks?.map((l) => (
            <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <FiGithub aria-hidden="true" /> {l.label}<span className="sr-only"> (opens in a new tab)</span>
            </a>
          ))}
          {project.demoLink && (
            <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
              <FiExternalLink aria-hidden="true" /> Live demo<span className="sr-only"> of {project.title} (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>

      <figure className="featured-visual">
        <figcaption className="featured-visual-label">
          <span>Architecture</span>
          <span className="mono">{project.caseStudy.flow.length} stages</span>
        </figcaption>
        <FlowDiagram steps={project.caseStudy.flow} label={`${project.title} architecture`} />
      </figure>
    </article>
  );
};

export default FeaturedProject;
