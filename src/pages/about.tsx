import React from 'react';
import { FaLinkedin, FaFacebook, FaGithub } from 'react-icons/fa';

const AboutMe: React.FC = () => {
  return (
    <section id="about" className="about-me-container section-padding">
      <div className="container">
        <h2 className="section-title">About Me</h2>

        <div className="about-details">
          <div className="about-card">
            <h3 className="card-title">Personal Info</h3>
            <ul className="info-list">
              <li><strong>Name:</strong> Mikias Abate</li>
              <li><strong>Education:</strong>  Degree in Information Systems at Addis Ababa University</li>
              <li><strong>Interests:</strong> Web Development, Networking, Data Science</li>
            </ul>
          </div>

          <div className="about-card">
            <h3 className="card-title">Skills</h3>
            <ul className="info-list">
              <li>Proficient in Python, Django, JavaScript (React, Node.js)</li>
              <li>Experience with responsive and dynamic web applications</li>
              <li>Knowledge in network systems and data analytics</li>
            </ul>
          </div>

          <div className="about-card">
            <h3 className="card-title">Professional Focus</h3>
            <ul className="info-list">
              <li>Building impactful applications that solve real-world problems</li>
              <li>Combining technical expertise with creativity to innovate</li>
              <li>Applying data-driven approaches in software development</li>
            </ul>
          </div>
        </div>

        <div className="social-section">
          <h3 className="social-title">Connect with Me</h3>
          <div className="social-icons">
            <a
              href="https://www.linkedin.com/in/mikiyas-abate/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100077164533916"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link facebook"
            >
              <FaFacebook />
            </a>
            <a
              href="https://github.com/mikias1219"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link github"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;