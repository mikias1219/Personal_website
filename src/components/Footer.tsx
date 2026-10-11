import React from 'react';
import { Link } from 'react-router-dom';
import { FiDownload } from 'react-icons/fi';
import { site, socials } from '../data/profile';
import { cvFileName, cvUrl } from '../data/experience';
import { useLocalTime } from '../hooks/useLocalTime';

const Footer: React.FC = () => {
  const time = useLocalTime();

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-intro">
            <p className="footer-name">{site.name}</p>
            <p className="muted">{site.role}</p>
            <p className="footer-time mono">
              <span className="status-dot" aria-hidden="true" />
              <time>{time}</time> in Addis Ababa (UTC+3)
            </p>
          </div>

          <nav aria-label="Footer" className="footer-col">
            <p className="label">Site</p>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/work">Work</Link></li>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </nav>

          <div className="footer-col">
            <p className="label">Elsewhere</p>
            <ul>
              {socials.map(({ label, href, icon: Icon }) => (
                <li key={label}>
                  <a href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                    <Icon aria-hidden="true" /> {label}
                  </a>
                </li>
              ))}
              <li><a href={cvUrl} download={cvFileName}><FiDownload aria-hidden="true" /> Download CV</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
