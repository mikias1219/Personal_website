import React from 'react';
import Header from './components/header';
import Hero from './pages/home';
import TechMarquee from './components/TechMarquee';
import AboutMe from './pages/about';
import Services from './pages/services';
import Projects from './pages/project';
import Experience from './pages/experience';
import Contact from './pages/contact';
import Footer from './components/footer';
import { useReveal } from './hooks/useReveal';

const App: React.FC = () => {
  useReveal();

  return (
    <>
      <a href="#main" className="skip-link">Skip to content</a>
      <div className="bg-decor" aria-hidden="true">
        <div className="bg-grid" />
        <div className="bg-orb bg-orb--1" />
        <div className="bg-orb bg-orb--2" />
      </div>
      <Header />
      <main id="main">
        <Hero />
        <TechMarquee />
        <AboutMe />
        <Services />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default App;
