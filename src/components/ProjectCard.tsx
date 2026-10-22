import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import type { Project } from '../data/projects';
import Tags from './Tags';

/** Compact, fully clickable card for secondary projects. */
const ProjectCard: React.FC<{ project: Project; headingLevel?: 'h3' | 'h2' }> = ({ project, headingLevel: H = 'h3' }) => (
  <article className="project-card reveal">
    <p className="meta-row">
      <span>{project.category}</span>
      <span>{project.year}</span>
      {project.flagship && <span className="badge">Featured</span>}
      {project.demoLink && <span className="live-badge"><span className="status-dot" aria-hidden="true" /> Live</span>}
    </p>
    <H className="project-card-title">
      <Link to={`/work/${project.slug}`} className="stretched-link">{project.title}</Link>
    </H>
    <p className="muted">{project.summary}</p>
    <Tags items={project.tags} />
    <FiArrowUpRight className="project-card-arrow" aria-hidden="true" />
  </article>
);

export default ProjectCard;
