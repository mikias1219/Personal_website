import React from 'react';
import { FiCopy, FiDownload, FiGithub, FiLinkedin, FiMapPin } from 'react-icons/fi';
import ContactForm from '../components/ContactForm';
import { site, socials } from '../data/profile';
import { cvFileName, cvUrl } from '../data/experience';
import { useMeta } from '../hooks/useMeta';
import { useReveal } from '../hooks/useReveal';
import { useLocalTime } from '../hooks/useLocalTime';
import { copyEmail } from '../lib';

const Contact: React.FC = () => {
  useMeta({
    title: 'Contact',
    description: 'Get in touch with Mikias Abate about roles, projects and collaborations in AI and full-stack engineering.',
    path: '/contact',
  });
  useReveal();
  const time = useLocalTime();
  const github = socials.find((s) => s.label === 'GitHub')!;
  const linkedin = socials.find((s) => s.label === 'LinkedIn')!;

  return (
    <div className="container page">
      <header className="page-header reveal">
        <p className="label">Contact</p>
        <h1 className="h1">Let’s build something.</h1>
        <p className="lead">
          Tell me about the role, product or system you’re working on. I’m open to full-time roles, contracts and
          collaborations in AI and full-stack engineering.
        </p>
      </header>

      <div className="contact-layout">
        <div className="reveal">
          <ContactForm />
        </div>

        <aside className="contact-aside reveal" aria-label="Direct contact">
          <p className="label">Direct</p>
          <ul className="direct-list">
            <li>
              <a href={`mailto:${site.email}`} className="direct-main">{site.email}</a>
              <button type="button" className="icon-btn" onClick={() => void copyEmail()} aria-label="Copy email address">
                <FiCopy aria-hidden="true" />
              </button>
            </li>
            <li>
              <a href={linkedin.href} target="_blank" rel="noopener noreferrer">
                <FiLinkedin aria-hidden="true" /> LinkedIn
              </a>
            </li>
            <li>
              <a href={github.href} target="_blank" rel="noopener noreferrer">
                <FiGithub aria-hidden="true" /> GitHub — {github.handle}
              </a>
            </li>
            <li>
              <a href={cvUrl} download={cvFileName}>
                <FiDownload aria-hidden="true" /> Download CV (PDF)
              </a>
            </li>
          </ul>
          <p className="label">Location</p>
          <p className="contact-location">
            <FiMapPin aria-hidden="true" /> {site.location}
          </p>
          <p className="muted mono">Local time {time} (UTC+3)</p>
        </aside>
      </div>
    </div>
  );
};

export default Contact;
