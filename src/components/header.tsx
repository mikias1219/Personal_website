import React from 'react';
import { Link } from 'react-scroll'; // Correct import

const Header: React.FC = () => {
  return (
    <header className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    
        <a className="navbar-brand" href="/">My Portfolio</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="home"
                smooth={true}
                duration={500}
                className="nav-link btn btn-primary me-2" // Updated to button style
                offset={-70}
                activeClass="active"
              >
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="about"
                smooth={true}
                duration={500}
                className="nav-link btn btn-primary me-2"
                offset={-70}
                activeClass="active"
              >
                About Me
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="projects"
                smooth={true}
                duration={500}
                className="nav-link btn btn-primary me-2"
                offset={-70}
                activeClass="active"
              >
                Projects
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="contact"
                smooth={true}
                duration={500}
                className="nav-link btn btn-primary me-2"
                offset={-70}
                activeClass="active"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>
    
    </header>
  );
};

export default Header;
