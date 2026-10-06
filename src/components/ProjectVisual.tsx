import React from 'react';

// Illustrative mock UIs for featured projects (decorative only).
const ProjectVisual: React.FC<{ kind: 'chat' | 'market' | 'match' }> = ({ kind }) => {
  if (kind === 'chat') {
    return (
      <div className="mock mock-window" aria-hidden="true">
        <div className="mock-bar"><i /><i /><i /><span>knowledge-hub · Chat</span></div>
        <div className="mock-body">
          <div className="bubble bubble--user">What does our onboarding policy say about laptops?</div>
          <div className="bubble bubble--ai">
            New hires receive a laptop on day one; requests go through IT within 48 hours.
            <span className="sources"><em>onboarding.pdf · p.3</em><em>it-guide.docx</em></span>
          </div>
          <div className="mock-input">Ask your workspace…<b>↵</b></div>
        </div>
      </div>
    );
  }
  if (kind === 'market') {
    const items = [
      ['MacBook Air M1', '58,000'],
      ['iPhone 13', '42,500'],
      ['Galaxy Tab S7', '27,000'],
      ['Dell XPS 13', '49,900'],
    ];
    return (
      <div className="mock mock-phone" aria-hidden="true">
        <div className="phone-notch" />
        <div className="phone-head"><strong>TechMarket ET</strong><span>Used tech · Addis</span></div>
        <div className="phone-search">Search laptops, phones…</div>
        <div className="phone-grid">
          {items.map(([name, price], i) => (
            <div className="phone-item" key={name}>
              <div className={`thumb thumb--${i}`} />
              <span>{name}</span>
              <b>{price} ETB</b>
            </div>
          ))}
        </div>
      </div>
    );
  }
  const rows = [
    ['Candidate A', 92],
    ['Candidate B', 81],
    ['Candidate C', 67],
  ] as const;
  return (
    <div className="mock mock-window" aria-hidden="true">
      <div className="mock-bar"><i /><i /><i /><span>POST /job-matching/analyze</span></div>
      <div className="mock-body">
        <div className="match-head"><span>Senior Backend Engineer</span><em>GPT-4o</em></div>
        {rows.map(([name, score]) => (
          <div className="match-row" key={name}>
            <span>{name}</span>
            <div className="match-bar"><div style={{ width: `${score}%` }} /></div>
            <b>{score}%</b>
          </div>
        ))}
        <div className="match-note">✓ Strengths: NestJS, PostgreSQL · ⚠ Concern: limited Kubernetes</div>
      </div>
    </div>
  );
};

export default ProjectVisual;
