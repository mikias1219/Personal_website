import React from 'react';
import type { FlowStep } from '../data/projects';

interface Props {
  steps: FlowStep[];
  /** compact: vertical, for cards. full: horizontal on wide screens, for case studies */
  variant?: 'compact' | 'full';
  label: string;
}

/** Architecture / data-flow diagram rendered as an ordered list. */
const FlowDiagram: React.FC<Props> = ({ steps, variant = 'compact', label }) => (
  <ol className={`flow flow--${variant}`} aria-label={label} style={{ '--steps': steps.length } as React.CSSProperties}>
    {steps.map((step, i) => (
      <li key={step.label} className="flow-step">
        <span className="flow-index" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
        <span className="flow-text">
          <span className="flow-label">{step.label}</span>
          <span className="flow-detail">{step.detail}</span>
        </span>
      </li>
    ))}
  </ol>
);

export default FlowDiagram;
