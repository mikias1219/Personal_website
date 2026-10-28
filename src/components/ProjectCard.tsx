import React from 'react';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';
import type { Project } from '../data/projects';

/** Compact card for portfolio projects: links out to GitHub or a live demo when available. */
const ProjectCard: React.FC<{ project: Project; headingLevel?: 'h3' | 'h2' }> = ({ project, headingLevel: H = 'h3' }) => {
  const href = project.githubLink ?? project.demoLink;
  const title = (
    <H className="project-card-title">
      <span className="stretched-link">{project.title}</span>
    </H>
  );
  return (
    <article className="project-card reveal">
      {project.kind && <p className="meta-row"><span className="badge">{project.kind}</span></p>}
      {href ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="project-card-link">
          {title}
        </a>
      ) : (
        title
      )}
      <p className="muted">{project.summary}</p>
      {project.stack && <ul className="tags">{project.stack.map((t) => <li key={t} className="tag">{t}</li>)}</ul>}
      {href && (
        <p className="project-card-arrow" aria-hidden="true">
          {project.githubLink ? <FiGithub /> : <FiArrowUpRight />}
        </p>
      )}
    </article>
  );
};

export default ProjectCard;
