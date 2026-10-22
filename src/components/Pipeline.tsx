import React from 'react';

interface Step {
  label: string;
  detail: string;
}

interface Props {
  steps: Step[];
  /** Accessible name for the diagram */
  label: string;
  /** compact: labels only, for the hero card */
  compact?: boolean;
}

/**
 * A horizontal data-flow diagram with a pulse travelling along the line.
 * The motion is decorative and switches off under prefers-reduced-motion.
 */
const Pipeline: React.FC<Props> = ({ steps, label, compact = false }) => (
  <div className={`pipeline${compact ? ' pipeline--compact' : ''}`} style={{ '--steps': steps.length } as React.CSSProperties}>
    <span className="pipeline-track" aria-hidden="true"><span className="pipeline-pulse" /></span>
    <ol aria-label={label}>
      {steps.map((s, i) => (
        <li key={s.label} className="pipeline-step" style={{ '--i': i } as React.CSSProperties}>
          <span className="pipeline-node" aria-hidden="true" />
          <span className="pipeline-label">{s.label}</span>
          {!compact && <span className="pipeline-detail">{s.detail}</span>}
        </li>
      ))}
    </ol>
  </div>
);

export default Pipeline;
