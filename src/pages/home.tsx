import React, { useEffect, useState } from 'react';
import profilePic from '../photo/photo_2024-04-04_13-32-35.jpg'; // Ensure this path is correct
import cvFile from '../assets/mikias_Abate.pdf'; // Adjust the path to your CV file

const Home: React.FC = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = "Hello, I’m Mikias Abate";

  // Typing animation effect
  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        setTypedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(typingInterval);
      }
    }, 100); // Adjust typing speed here (lower = faster)
    return () => clearInterval(typingInterval);
  }, []);

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = cvFile;
    link.download = 'Mikias_Abate_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="home" className="home-container section-padding">
      <div className="container home-layout">
        <div className="intro-section">
          <h1 className="intro-title">{typedText}<span className="cursor">|</span></h1>
          <p className="intro-text">
            I’m a passionate developer skilled in modern web technologies. Welcome to my portfolio, where you can explore my work and learn more about me.
          </p>
          <div className="button-group">
            <a href="#projects" className="btn-primary">Explore My Work</a>
            <button onClick={handleDownloadCV} className="btn-secondary">Download My CV</button>
          </div>
        </div>
        <div className="profile-section">
          <img src={profilePic} alt="Mikias Abate" className="profile-img" />
        </div>
      </div>
      <div className="scroll-indicator">
        <span className="scroll-text">Scroll Down</span>
        <div className="scroll-arrow"></div>
      </div>
    </section>
  );
};

export default Home;