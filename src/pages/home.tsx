import React, { useEffect, useState } from 'react';
import { FiArrowRight, FiDownload, FiCopy, FiCheck, FiGithub, FiAward, FiMapPin } from 'react-icons/fi';
import { SiMicrosoftazure, SiPython, SiReact, SiNestjs } from 'react-icons/si';
import profilePic from '../photo/profile.jpg';
import cvFile from '../assets/mikias_Abate.pdf';
import { email } from '../data/socials';
import { useCopy } from '../hooks/useCopy';

const roles = ['AI Engineer', 'Full-Stack Developer', 'Azure Data Scientist', 'RAG Systems Builder'];

const Hero: React.FC = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const { copied, copy } = useCopy();

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => setRoleIndex((i) => (i + 1) % roles.length), 2600);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="home" className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <a href="#contact" className="badge reveal">
            <span className="badge-dot" aria-hidden="true" />
            Available for hire · AI &amp; full-stack roles
            <FiArrowRight aria-hidden="true" />
          </a>

          <p className="hero-role reveal">
            <span className="sr-only">AI Engineer, Full-Stack Developer, Azure Data Scientist</span>
            <span className="prompt" aria-hidden="true">~/mikias $</span>{' '}
            <span key={roleIndex} className="role-word" aria-hidden="true">{roles[roleIndex]}</span>
            <span className="caret" aria-hidden="true" />
          </p>

          <h1 className="hero-title reveal">
            I build <span className="gradient-text">AI products</span> and the full-stack apps that ship them.
          </h1>

          <p className="hero-lead reveal">
            I’m Mikias Abate — I turn data and LLMs into production software: RAG platforms on Azure
            OpenAI, intelligent APIs, and polished web and mobile apps with Next.js, NestJS and Django.
          </p>

          <div className="hero-actions reveal">
            <a href="#projects" className="btn btn-primary btn-lg">
              See my work <FiArrowRight aria-hidden="true" />
            </a>
            <a href={cvFile} download="Mikias_Abate_CV.pdf" className="btn btn-ghost btn-lg">
              <FiDownload aria-hidden="true" /> Download CV
            </a>
            <button type="button" className="btn btn-text" onClick={() => copy(email)}>
              {copied ? <FiCheck aria-hidden="true" /> : <FiCopy aria-hidden="true" />}
              <span aria-live="polite">{copied ? 'Email copied!' : 'Copy email'}</span>
            </button>
          </div>

          <ul className="proof-row reveal">
            <li><FiAward aria-hidden="true" /> <span><strong>Azure Certified</strong> Data Scientist</span></li>
            <li><FiGithub aria-hidden="true" /> <span><strong>60+</strong> public repos</span></li>
            <li><FiMapPin aria-hidden="true" /> <span><strong>Addis Ababa</strong> · UTC+3</span></li>
          </ul>
        </div>

        <div className="hero-visual reveal">
          <div className="portrait-glow" aria-hidden="true" />
          <div className="portrait">
            <img src={profilePic} alt="Portrait of Mikias Abate" width={960} height={1280} />
          </div>
          <span className="orbit orbit--1" aria-hidden="true"><SiMicrosoftazure /></span>
          <span className="orbit orbit--2" aria-hidden="true"><SiPython /></span>
          <span className="orbit orbit--3" aria-hidden="true"><SiReact /></span>
          <span className="orbit orbit--4" aria-hidden="true"><SiNestjs /></span>
          <div className="floating-card floating-card--bottom">
            <span className="status-dot" aria-hidden="true" />
            <div>
              <strong>Currently building</strong>
              <span>RAG systems &amp; LLM apps</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
