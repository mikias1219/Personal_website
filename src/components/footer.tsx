import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer>
      <p>&copy; {new Date().getFullYear()} My Portfolio</p>
      <p>
        <a href="https://www.linkedin.com/in/mikiyas-abate/" target="_blank" rel="noopener noreferrer">LinkedIn</a> | 
        <a href="https://github.com/mikias1219" target="_blank" rel="noopener noreferrer">GitHub</a> |
        <a href="https://www.facebook.com/profile.php?id=100077164533916" target="_blank" rel="noopener noreferrer">Facebook</a>
      </p>
    </footer>
  );
};

export default Footer;
