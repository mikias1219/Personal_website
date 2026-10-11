import React from 'react';

const Tags: React.FC<{ items: string[]; label?: string }> = ({ items, label = 'Technologies' }) => (
  <ul className="tags" aria-label={label}>
    {items.map((t) => <li key={t} className="tag">{t}</li>)}
  </ul>
);

export default Tags;
