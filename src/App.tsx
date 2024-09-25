import React from 'react';
import Header from './components/header';
import Home from './pages/home';
import AboutMe from './pages/about';
import Projects from './pages/project';
import Contact from './pages/contact';
import Footer from './components/footer';
import './styles/global.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
 // Includes Popper.js


const App: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Home />
        <AboutMe />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
};
export default App;
