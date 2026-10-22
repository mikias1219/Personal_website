import React from 'react';
import { Link } from 'react-router-dom';
import type { Role } from '../data/experience';
import { getProject } from '../data/projects';
import Tags from './Tags';

const ExperienceTimeline: React.FC<{ roles: Role[] }> = ({ roles }) => (
  <ol className="timeline">
    {roles.map((role) => {
      const related = (role.projects ?? []).map(getProject).filter((p) => p !== undefined);
      return (
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
            <div className="timeline-foot">
              {role.tech && <Tags items={role.tech} label={`Technologies used at ${role.org}`} />}
              {related.length > 0 && (
                <p className="timeline-related">
                  <span className="label">Related work</span>
                  {related.map((p) => (
                    <Link key={p.slug} to={`/work/${p.slug}`}>{p.title}</Link>
                  ))}
                </p>
              )}
            </div>
          </div>
        </li>
      );
    })}
  </ol>
);

export default ExperienceTimeline;
