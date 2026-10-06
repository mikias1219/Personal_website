import React from 'react';
import { FiCpu, FiLayers, FiCloud, FiCheck } from 'react-icons/fi';

const services = [
  {
    icon: FiCpu,
    title: 'AI & RAG Systems',
    text: 'LLM features grounded in your own data — retrieval, chat, matching and document intelligence.',
    points: ['Azure OpenAI & AI Search', 'Multi-tenant RAG pipelines', 'NLP, speech & vision services'],
  },
  {
    icon: FiLayers,
    title: 'Full-Stack Products',
    text: 'End-to-end web and mobile apps with clean APIs, solid data models and interfaces people enjoy.',
    points: ['Next.js, React & Vue', 'NestJS, Django & FastAPI', 'Flutter & React Native'],
  },
  {
    icon: FiCloud,
    title: 'Cloud & DevOps',
    text: 'Reproducible environments and automated pipelines so every push can reach production safely.',
    points: ['Docker & Compose', 'Jenkins & GitHub Actions', 'Azure deployments & IaC'],
  },
];

const Services: React.FC = () => {
  return (
    <section id="services" className="section">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">02 · What I do</span>
          <h2 className="section-title">How I can help your team</h2>
          <p className="section-lead">Three areas where I deliver the most value — usually in combination.</p>
        </header>

        <div className="services-grid">
          {services.map(({ icon: Icon, title, text, points }, i) => (
            <article key={title} className="service-card reveal" style={{ transitionDelay: `${i * 80}ms` }}>
              <span className="service-icon" aria-hidden="true"><Icon /></span>
              <h3>{title}</h3>
              <p>{text}</p>
              <ul>
                {points.map((p) => (
                  <li key={p}><FiCheck aria-hidden="true" /> {p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
