import React, { useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FiExternalLink, FiCpu, FiLayers, FiSmartphone, FiServer, FiChevronDown, FiCheck } from 'react-icons/fi';
import { IconType } from 'react-icons';
import { projects, Category } from '../data/projects';
import ProjectVisual from '../components/ProjectVisual';

const categoryIcon: Record<Category, IconType> = {
  'AI & Data': FiCpu,
  'Full-stack': FiLayers,
  Mobile: FiSmartphone,
  DevOps: FiServer,
};

const featured = projects.filter((p) => p.featured);
const others = projects.filter((p) => !p.featured);
const filters: Array<'All' | Category> = ['All', 'AI & Data', 'Full-stack', 'Mobile', 'DevOps'];
const INITIAL_COUNT = 6;

const Projects: React.FC = () => {
  const [filter, setFilter] = useState<'All' | Category>('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = filter === 'All' ? others : others.filter((p) => p.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, INITIAL_COUNT);
  const count = (f: 'All' | Category) =>
    f === 'All' ? others.length : others.filter((p) => p.category === f).length;

  return (
    <section id="projects" className="section">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">03 · Selected work</span>
          <h2 className="section-title">Projects that show how I think</h2>
          <p className="section-lead">
            Real systems with real constraints — multi-tenancy, payments, AI evaluation. Picked from my{' '}
            <a href="https://github.com/mikias1219?tab=repositories" target="_blank" rel="noopener noreferrer" className="text-link">
              60+ public repositories
            </a>.
          </p>
        </header>

        <div className="featured-list">
          {featured.map((project, i) => (
            <article key={project.title} className={`featured-card reveal${i % 2 ? ' is-reversed' : ''}`}>
              <div className="featured-visual">
                <ProjectVisual kind={project.featured!.visual} />
              </div>
              <div className="featured-body">
                <span className="project-category">
                  <span className="featured-index">0{i + 1}</span> {project.category}
                </span>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <ul className="highlights">
                  {project.featured!.highlights.map((h) => (
                    <li key={h}><FiCheck aria-hidden="true" /> {h}</li>
                  ))}
                </ul>
                <ul className="tag-list">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="featured-links">
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
                      <FiExternalLink aria-hidden="true" /> Live demo
                    </a>
                  )}
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                    <FaGithub aria-hidden="true" /> Source code
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="more-head reveal">
          <h3>More projects</h3>
          <div className="filter-bar" role="group" aria-label="Filter projects">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className={`filter-btn${filter === f ? ' is-active' : ''}`}
                aria-pressed={filter === f}
                onClick={() => {
                  setFilter(f);
                  setShowAll(false);
                }}
              >
                {f} <span className="filter-count">{count(f)}</span>
              </button>
            ))}
          </div>
        </div>

        <ul className="projects-grid">
          {visible.map((project) => {
            const Icon = categoryIcon[project.category];
            return (
              <li key={project.title} className="project-card">
                <div className="project-top">
                  <span className="card-icon" aria-hidden="true"><Icon /></span>
                  <span className="project-category">{project.category}</span>
                </div>
                <h4>{project.title}</h4>
                <p>{project.description}</p>
                <ul className="tag-list">
                  {project.tags.map((tag) => <li key={tag}>{tag}</li>)}
                </ul>
                <div className="project-links">
                  <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                    <FaGithub aria-hidden="true" /> Code
                  </a>
                  {project.demoLink && (
                    <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
                      <FiExternalLink aria-hidden="true" /> Live demo
                    </a>
                  )}
                </div>
              </li>
            );
          })}
        </ul>

        {filtered.length > INITIAL_COUNT && (
          <div className="show-more">
            <button type="button" className="btn btn-ghost" onClick={() => setShowAll((s) => !s)} aria-expanded={showAll}>
              {showAll ? 'Show fewer' : `Show all ${filtered.length} projects`}
              <FiChevronDown aria-hidden="true" className={showAll ? 'flip' : undefined} />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
