import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Projects: React.FC = () => {
  const projects = [
    {
      title: 'Music Management App',
      description: 'A full stack MERN app for managing songs and displaying statistics',
      githubLink: 'https://github.com/mikias1219/MusicApp.git',
      image: 'https://via.placeholder.com/300?text=Music+App', // Replace with actual image URL
    },
    {
      title: 'Student Study Portal',
      description: 'A comprehensive web application for students to manage notes, homework, and more.',
      githubLink: 'https://github.com/mikias1219/KM',
      image: 'https://via.placeholder.com/300?text=Study+Portal', // Replace with actual image URL
    },
    {
      title: 'Student Management System',
      description: 'A full stack Django web app designed to assist students in managing their academic life.',
      githubLink: 'https://github.com/mikias1219/industry',
      image: 'https://via.placeholder.com/300?text=Student+System', // Replace with actual image URL
    },
    {
      title: 'Student Catering System',
      description: 'A C# application designed to manage catering services for students at Addis Ababa University.',
      githubLink: 'https://github.com/mikias1219/C-',
      image: 'https://via.placeholder.com/300?text=Student+Catering', // Replace with actual image URL
    },
    {
      title: 'To-Do List Application',
      description: 'A simple Python application to manage tasks effectively, allowing users to create, update, delete, and manage tasks.',
      githubLink: 'https://github.com/mikias1219/Todolist-in-python',
      image: 'https://via.placeholder.com/300?text=To-Do+List', // Replace with actual image URL
    },
    {
      title: 'PRODIGY_WD_01',
      description: 'A web development project focused on creating interactive and responsive user interfaces.',
      githubLink: 'https://github.com/mikias1219/PRODIGY_WD_01',
      image: 'https://via.placeholder.com/300?text=PRODIGY_WD_01', // Replace with actual image URL
    },
    {
      title: 'Saving Project in Django',
      description: 'A Django-based web app to help users track their savings by logging transactions and monitoring goals.',
      githubLink: 'https://github.com/mikias1219/saving-project-in-django',
      image: 'https://via.placeholder.com/300?text=Saving+Project', // Replace with actual image URL
    },
  ];

  return (
    <section id="projects" className="projects-container section-padding">
      <div className="container">
        <h2 className="section-title">My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <div className="project-image-container">
                  <img src={project.image} alt={`${project.title} preview`} className="project-image" />
                  <div className="image-overlay">
                    <FaGithub className="github-icon" />
                  </div>
                </div>
              </a>
              <div className="card-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
