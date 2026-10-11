import React from 'react';
import type { Role } from '../data/experience';
import Tags from './Tags';

const Timeline: React.FC<{ roles: Role[]; detailed?: boolean }> = ({ roles, detailed = false }) => (
  <ol className={`timeline${detailed ? ' timeline--detailed' : ''}`}>
    {roles.map((role) => (
      <li key={`${role.title}-${role.period}`} className={`timeline-item reveal${role.current ? ' is-current' : ''}`}>
        <p className="timeline-period mono">{role.period}</p>
        <div className="timeline-content">
          <h3 className="timeline-title">
            {role.title} <span className="timeline-org">· {role.org}</span>
          </h3>
          {detailed && (
            <>
              <p className="timeline-location mono">{role.location}</p>
              <ul className="timeline-points">
                {role.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              {role.tech && <Tags items={role.tech} />}
            </>
          )}
        </div>
      </li>
    ))}
  </ol>
);

export default Timeline;
