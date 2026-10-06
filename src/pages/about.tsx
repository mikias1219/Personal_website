import React, { useEffect, useState } from 'react';
import { FiAward, FiBookOpen, FiClock, FiZap } from 'react-icons/fi';
import { SiMicrosoftazure } from 'react-icons/si';

const focus = ['RAG & LLM apps', 'Azure ML / MLOps', 'NestJS & Next.js', 'CI/CD & Docker'];

function useAddisTime() {
  const format = () =>
    new Intl.DateTimeFormat('en-US', {
      timeZone: 'Africa/Addis_Ababa',
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  const [time, setTime] = useState(format);
  useEffect(() => {
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

const AboutMe: React.FC = () => {
  const time = useAddisTime();

  return (
    <section id="about" className="section">
      <div className="container">
        <header className="section-head reveal">
          <span className="eyebrow">01 · About</span>
          <h2 className="section-title">Engineer with a data brain and a product eye</h2>
        </header>

        <div className="bento">
          <article className="bento-card bento-intro reveal">
            <p className="bento-quote">
              “I care about clean architecture, reliable delivery, and software that solves real problems.”
            </p>
            <p>
              I’m a software engineer from Addis Ababa building <strong>AI systems</strong>,{' '}
              <strong>data products</strong> and <strong>production-grade web applications</strong>. My
              work spans the full lifecycle — modelling data, designing APIs, crafting interfaces and
              automating deployments — so ideas reach users, not just notebooks.
            </p>
          </article>

          <article className="bento-card bento-cert reveal">
            <span className="cert-logo" aria-hidden="true"><SiMicrosoftazure /></span>
            <span className="bento-label"><FiAward aria-hidden="true" /> Certification</span>
            <h3>Azure Data Scientist Associate</h3>
            <p>Microsoft Certified</p>
          </article>

          <article className="bento-card reveal">
            <span className="bento-label"><FiBookOpen aria-hidden="true" /> Education</span>
            <h3>BSc, Information Systems</h3>
            <p>Addis Ababa University · 2021–2024</p>
            <p className="big-stat">3.65 <small>GPA</small></p>
          </article>

          <article className="bento-card reveal">
            <span className="bento-label"><FiClock aria-hidden="true" /> Local time</span>
            <p className="big-stat">{time}</p>
            <p>Addis Ababa, Ethiopia (UTC+3) — happy to work across time zones.</p>
          </article>

          <article className="bento-card bento-focus reveal">
            <span className="bento-label"><FiZap aria-hidden="true" /> Currently focused on</span>
            <ul className="chip-list">
              {focus.map((f) => <li key={f} className="chip chip--accent">{f}</li>)}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
