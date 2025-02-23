import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Music Management App',
      description: 'A full stack MERN app for managing songs and displaying statistics',
      githubLink: 'https://github.com/mikias1219/MusicApp.git',
    },
    {
      title: 'Student Study Portal',
      description: 'A comprehensive web application for students to manage notes, homework, and more.',
      githubLink: 'https://github.com/mikias1219/KM',
    },
    {
      title: 'Student Management System',
      description: 'A full stack Django web app designed to assist students in managing their academic life.',
      githubLink: 'https://github.com/mikias1219/industry',
    },
    {
      title: 'Student Catering System',
      description: 'A C# application designed to manage catering services for students at Addis Ababa University.',
      githubLink: 'https://github.com/mikias1219/C-',
    },
    {
      title: 'To-Do List Application',
      description: 'A simple Python application to manage tasks effectively, allowing users to create, update, delete, and manage tasks.',
      githubLink: 'https://github.com/mikias1219/Todolist-in-python',
    },
    {
      title: 'PRODIGY_WD_01',
      description: 'A web development project focused on creating interactive and responsive user interfaces.',
      githubLink: 'https://github.com/mikias1219/PRODIGY_WD_01',
    },
    {
      title: 'Saving Project in Django',
      description: 'A Django-based web app to help users track their savings by logging transactions and monitoring goals.',
      githubLink: 'https://github.com/mikias1219/saving-project-in-django',
    },
  ];

  return (
    <section id="projects" className="projects-container section-padding">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <div className="card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="github-link"
                >
                  <FaGithub className="github-icon" />
                  <span>View on GitHub</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;