import React from 'react';

interface Props {
  index?: string;
  eyebrow: string;
  title: string;
  lead?: React.ReactNode;
  action?: React.ReactNode;
  id?: string;
}

const SectionHeader: React.FC<Props> = ({ index, eyebrow, title, lead, action, id }) => (
  <header className="section-header reveal">
    <div>
      <p className="label">
        {index && <span className="label-index">{index}</span>}
        {eyebrow}
      </p>
      <h2 id={id} className="h2">{title}</h2>
      {lead && <p className="section-lead">{lead}</p>}
    </div>
    {action && <div className="section-action">{action}</div>}
  </header>
);

export default SectionHeader;
