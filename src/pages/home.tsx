import React from 'react';
import profilePic from '../photo/photo_2024-04-04_13-32-35.jpg'; // Corrected path
// Corrected path (use lowercase if needed)
// Add more images for gallery as necessary

const Home: React.FC = () => {
  return (
    <section id="home" className="home-container section-padding">
      <div className="container home-layout">
        <div className="intro-section">
          <h1>Hello, I'm Mikias Abate</h1>
          <p>
            I'm a passionate developer skilled in modern web technologies. 
            Welcome to my portfolio, where you can explore my work and learn more about me.
          </p>
          <a href="#projects" className="btn-primary">Explore My Work</a>
        </div>
        <div className="profile-section">
          <img src={profilePic} alt="Profile" className="profile-img" />
        </div>
      </div>

      
    </section>
  );
};

export default Home;
