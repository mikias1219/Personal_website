import React from 'react';
import { timeline } from '../data/experience';

const Experience: React.FC = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">04 · Experience</span>
          <h2 className="section-title">The path so far</h2>
        </header>

        <ol className="timeline">
          {timeline.map((item) => (
            <li key={item.title} className={`timeline-item reveal${item.current ? ' is-current' : ''}`}>
              <span className="timeline-dot" aria-hidden="true" />
              <span className="timeline-period">{item.period}</span>
              <div className="timeline-card">
                <h3>{item.title}</h3>
                <p className="timeline-org">{item.org}</p>
                <ul>
                  {item.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};

export default Experience;
