import React from 'react';
import { FiArrowUp, FiDownload, FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import SectionLink from './SectionLink';
import { sections } from '../lib';
import { site, socials } from '../data/profile';
import { cvFileName, cvUrl } from '../data/experience';

const Footer: React.FC = () => (
  <footer className="site-footer">
    <div className="container">
      <div className="footer-grid">
        <div className="footer-brand">
          <p className="footer-name">{site.name}</p>
          <p className="footer-role">{site.role}</p>
          <p className="muted footer-statement">{site.statement}</p>
          <p className="footer-status">
            <span className="status-dot" aria-hidden="true" /> {site.availability}
          </p>
        </div>

        <nav aria-label="Footer" className="footer-col">
          <p className="label">Sections</p>
          <ul>
            {sections.map((s) => (
              <li key={s.id}><SectionLink to={s.id}>{s.label}</SectionLink></li>
            ))}
          </ul>
        </nav>

        <div className="footer-col">
          <p className="label">Connect</p>
          <ul>
            {socials.map(({ label, href }) => {
              const Icon = label === 'GitHub' ? FiGithub : label === 'LinkedIn' ? FiLinkedin : FiMail;
              return (
                <li key={label}>
                  <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    <Icon aria-hidden="true" /> {label === 'Email' ? site.email : label}
                  </a>
                </li>
              );
            })}
            <li>
              <a href={cvUrl} download={cvFileName}><FiDownload aria-hidden="true" /> Download CV (PDF)</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} {site.name}. Built with React and TypeScript.</p>
        <button type="button" className="to-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          Back to top <FiArrowUp aria-hidden="true" />
        </button>
      </div>
    </div>
  </footer>
);

export default Footer;
