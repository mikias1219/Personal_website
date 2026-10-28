import React from 'react';
import type { Role } from '../data/experience';

const ExperienceTimeline: React.FC<{ roles: Role[] }> = ({ roles }) => (
  <ol className="timeline">
    {roles.map((role) => (
      <li key={`${role.title}-${role.period}`} className={`timeline-item reveal${role.current ? ' is-current' : ''}`}>
        <div className="timeline-when">
          <p className="timeline-period">{role.period}</p>
          <p className="timeline-location">{role.location}{role.type ? ` · ${role.type}` : ''}</p>
        </div>
        <div className="timeline-card">
          <header className="timeline-head">
            <h3 className="timeline-title">{role.title}</h3>
            <p className="timeline-org">
              {role.org}
              {role.current && <span className="badge badge--accent">Current</span>}
            </p>
            {role.summary && <p className="muted">{role.summary}</p>}
          </header>
          <ul className="check-list">
            {role.points.map((p) => <li key={p}>{p}</li>)}
          </ul>
        </div>
      </li>
    ))}
  </ol>
);

export default ExperienceTimeline;
