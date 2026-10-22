import React from 'react';
import { skills, type SkillGroup } from '../data/profile';

const SkillGrid: React.FC<{ order: string[] }> = ({ order }) => {
  const groups = order
    .map((id) => skills.find((g) => g.id === id))
    .filter((g): g is SkillGroup => g !== undefined);

  return (
    <ul className="skill-grid">
      {groups.map(({ id, title, icon: Icon, items }) => (
        <li key={id} className="skill-card reveal">
          <h3 className="skill-title">
            <span className="skill-icon" aria-hidden="true"><Icon /></span>
            {title}
          </h3>
          <ul className="tags" aria-label={title}>
            {items.map((item) => <li key={item} className="tag">{item}</li>)}
          </ul>
        </li>
      ))}
    </ul>
  );
};

export default SkillGrid;
