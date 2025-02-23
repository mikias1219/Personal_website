import React from 'react';
import profilePic from '../photo/photo_2024-04-04_13-32-35.jpg'; // Ensure this path is correct relative to your project structure

const Home: React.FC = () => {
  return (
    <section id="home" className="home-container section-padding">
      <div className="container home-layout">
        <div className="intro-section">
          <h1 className="intro-title">Hello, I’m Mikias Abate</h1>
          <p className="intro-text">
            I’m a passionate developer skilled in modern web technologies. Welcome to my portfolio, where you can explore my work and learn more about me.
          </p>
          <a href="#projects" className="btn-primary">Explore My Work</a>
        </div>
        <div className="profile-section">
          <img src={profilePic} alt="Mikias Abate" className="profile-img" />
        </div>
      </div>
    </section>
  );
};

export default Home;