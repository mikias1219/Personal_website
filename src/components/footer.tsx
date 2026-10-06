import React from 'react';
import { FiArrowUp } from 'react-icons/fi';
import { socials } from '../data/socials';
import { externalProps } from '../data/links';

const Footer: React.FC = () => {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <a href="#home" className="brand">
          <span className="brand-mark">MA</span>
          <span>
            <strong>Mikias Abate</strong>
            <small>AI Engineer · Full-Stack Developer</small>
          </span>
        </a>
        <p className="footer-copy">© {new Date().getFullYear()} Mikias Abate. Designed &amp; built with React.</p>
        <div className="footer-right">
          <ul className="social-row">
            {socials.map(({ label, href, icon: Icon }) => (
              <li key={label}>
                <a href={href} {...externalProps(href)} aria-label={label} className="icon-btn">
                  <Icon />
                </a>
              </li>
            ))}
          </ul>
          <a href="#home" className="icon-btn" aria-label="Back to top">
            <FiArrowUp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
