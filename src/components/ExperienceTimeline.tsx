import { experience } from "@/data/experience";
export function ExperienceTimeline({ compact = false }: { compact?: boolean }) {
  return (
    <ol className="timeline">
      {(compact ? experience.slice(0, 3) : experience).map((role) => (
        <li key={role.title}>
          <div className="timeline-meta">
            <span className="mono">{role.period}</span>
            {role.current && <span className="current-label">Current</span>}
          </div>
          <div className="timeline-content">
            <h3>{role.title}</h3>
            <p className="timeline-org">
              {role.org}
              {role.location && (
                <span className="muted"> · {role.location}</span>
              )}
            </p>
            {!compact && role.points.length > 0 && (
              <ul>
                {role.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            )}
            {role.confirmation && (
              <p className="confirmation">To confirm: {role.confirmation}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
