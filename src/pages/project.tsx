import React from 'react';
import { FaGithub } from 'react-icons/fa';

const Projects: React.FC = () => {
  const projects = [
    {
    title: 'Music Management App',
    description: 'A full stack MERN app for managing songs and displaying statistics',
    githubLink: 'https://github.com/mikias1219/MusicApp.git'
  },
      {
    title: 'Student Study Portal',
    description: 'A comprehensive web application for students to manage notes, homework, YouTube searches, to-do lists, book browsing, dictionary lookups, Wikipedia searches, and expense tracking, all in one place.',
    githubLink: 'https://github.com/mikias1219/KM'
}
,
       {
    title: 'Student Management System',
    description: 'A full stack Django web application designed to assist students in managing their academic life. Features include user authentication, registration for admins, staff, and students, course management, and profile management.',
    githubLink: 'https://github.com/mikias1219/industry'
}
,
      {
    title: 'Student Catering System',
    description: 'A C# application designed to manage catering services for students at Addis Ababa University. The system allows users to place food orders, view available meals, manage their profiles, and track order history. It aims to streamline the catering process and enhance student satisfaction.',
    githubLink: 'https://github.com/mikias1219/C-'
}
,
         {
    title: 'To-Do List Application',
    description: 'A simple and efficient Python application that allows users to manage their tasks effectively. Users can create, read, update, and delete tasks, set deadlines, and mark tasks as complete. This project demonstrates the use of Python for building user-friendly applications with a focus on task management.',
    githubLink: 'https://github.com/mikias1219/Todolist-in-python'
}
,
      {
    title: 'PRODIGY_WD_01',
    description: 'A web development project focused on creating interactive and responsive user interfaces. The application showcases various web technologies and design principles, providing a hands-on approach to modern web development practices.',
    githubLink: 'https://github.com/mikias1219/PRODIGY_WD_01'
}
,
   {
    title: 'Saving Project in Django',
    description: 'A Django-based web application designed to help users manage and track their savings. The application allows users to create accounts, set saving goals, log transactions, and monitor their progress over time, promoting better financial management and planning.',
    githubLink: 'https://github.com/mikias1219/saving-project-in-django'
}
,  {
    title: 'Music Management App',
    description: 'A full stack MERN app for managing songs and displaying statistics',
    githubLink: 'https://github.com/mikias1219/MusicApp.git'
  },
  ];

  return (
    <section id="projects" className="projects-container section-padding">
      <div className="container">
        <h2>My Projects</h2>
        <div className="projects-grid">
          {projects.map((project, index) => (
            <div className="project-card" key={index}>
              <h3>{project.title}</h3>
              <p>{project.description}</p>
              <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
                <FaGithub /> View on GitHub
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
