import React from 'react';


const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <p>© {new Date().getFullYear()} My Portfolio</p>
        </div>
        <div className="footer-links">
          <a
            href="https://www.linkedin.com/in/mikiyas-abate/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/mikias1219"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.facebook.com/profile.php?id=100077164533916"
            target="_blank"
            rel="noopener noreferrer"
          >
            Facebook
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;