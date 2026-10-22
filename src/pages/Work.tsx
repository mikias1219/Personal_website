import React from 'react';
import { useSearchParams } from 'react-router-dom';
import SectionLink from '../components/SectionLink';
import { FiArrowLeft } from 'react-icons/fi';
import { categories, projects, type Category } from '../data/projects';
import ProjectCard from '../components/ProjectCard';
import { useMeta } from '../hooks/useMeta';
import { useReveal } from '../hooks/useReveal';

const filters: Array<'All' | Category> = ['All', ...categories];
const toParam = (c: string) => c.toLowerCase().replace(/[^a-z]+/g, '-');

const Work: React.FC = () => {
  const [params, setParams] = useSearchParams();
  const active = filters.find((f) => toParam(f) === params.get('category')) ?? 'All';
  const visible = active === 'All' ? projects : projects.filter((p) => p.category === active);

  useMeta({
    title: 'Projects',
    description: 'All projects and case studies by Mikias Abate: RAG platforms on Azure OpenAI, AI matching services, full-stack products, mobile apps and DevOps pipelines.',
    path: '/work',
  });
  useReveal(active);

  const count = (f: 'All' | Category) => (f === 'All' ? projects.length : projects.filter((p) => p.category === f).length);

  return (
    <div className="container page">
      <SectionLink to="projects" className="back-link">
        <FiArrowLeft aria-hidden="true" /> Back to featured work
      </SectionLink>
      <header className="page-header">
        <p className="label">Projects</p>
        <h1 className="h1">All projects &amp; case studies</h1>
        <p className="lead">
          {projects.length} projects from 2024 to today: AI systems on Azure, full-stack products, mobile apps and
          the pipelines that ship them. Each one has a case study and a link to its source code.
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

      <div className="project-grid project-grid--archive">
        {visible.map((p) => <ProjectCard key={p.slug} project={p} headingLevel="h2" />)}
      </div>
    </div>
  );
};

export default Work;
