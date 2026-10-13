import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import type { Project } from '../data/projects';
import FlowDiagram from './FlowDiagram';
import Tags from './Tags';

const FlagshipCard: React.FC<{ project: Project; index: number }> = ({ project, index }) => (
  <article className="flagship-card spot reveal">
    <div className="flagship-body">
      <p className="meta-row mono">
        <span>{String(index + 1).padStart(2, '0')}</span>
        <span>{project.category}</span>
        <span>{project.year}</span>
      </p>
      <h3 className="h3">
        <Link to={`/work/${project.slug}`} className="stretched-link">{project.title}</Link>
      </h3>
      <p className="flagship-summary">{project.summary}</p>
      <p className="flagship-outcome">{project.outcome}</p>
      <Tags items={project.tags} />
      <span className="link-arrow" aria-hidden="true">
        Read case study <FiArrowRight />
      </span>
    </div>
    <div className="flagship-visual">
      <p className="visual-bar mono" aria-hidden="true">
        <i /><i /><i />
        <span>{project.slug} / architecture</span>
      </p>
      <FlowDiagram steps={project.caseStudy.flow} label={`${project.title} architecture`} />
    </div>
  </article>
);

export default FlagshipCard;
