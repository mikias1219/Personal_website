import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { FiArrowUpRight } from 'react-icons/fi';
import { categories, projects, type Category } from '../data/projects';
import Tags from '../components/Tags';
import { useMeta } from '../hooks/useMeta';
import { useReveal } from '../hooks/useReveal';

const filters: Array<'All' | Category> = ['All', ...categories];
const toParam = (c: string) => c.toLowerCase().replace(/[^a-z]+/g, '-');

const Work: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const active = filters.find((f) => toParam(f) === params.get('category')) ?? 'All';
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active);

  useMeta({
    title: 'Work',
    description: 'Projects and case studies by Mikias Abate: RAG platforms on Azure, full-stack products, mobile apps and DevOps pipelines.',
    path: '/work',
  });
  useReveal(active);

  const count = (f: 'All' | Category) => (f === 'All' ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <div className="container page">
      <header className="page-header reveal">
        <p className="label">Work</p>
        <h1 className="h1">Projects &amp; case studies</h1>
        <p className="lead">
          A selection of {projects.length} projects from 2024 to today — AI systems on Azure, full-stack products,
          mobile apps and the pipelines that ship them. Each links to a short case study.
        </p>
      </header>

      <div className="filters" role="group" aria-label="Filter by category">
        {filters.map((f) => (
          <button
            key={f}
            type="button"
            className="filter"
            aria-pressed={active === f}
            onClick={() => setParams(f === 'All' ? {} : { category: toParam(f) }, { replace: true })}
          >
            {f} <span className="filter-count mono">{count(f)}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">Showing {visible.length} projects</p>

      <ul className="project-list">
        {visible.map((p) => (
          <li key={p.slug} className="project-row">
            <span className="project-year mono">{p.year}</span>
            <div className="project-main">
              <h2 className="project-title">
                <Link to={`/work/${p.slug}`} className="stretched-link">{p.title}</Link>
                {p.flagship && <span className="badge mono">Flagship</span>}
              </h2>
              <p className="muted">{p.summary}</p>
              <Tags items={p.tags} />
            </div>
            <span className="project-category mono">{p.category}</span>
            <FiArrowUpRight className="project-arrow" aria-hidden="true" />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Work;
