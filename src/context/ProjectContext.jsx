
import React, { createContext, useState, useContext } from 'react';

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([
    { id: '1', name: 'Project Creation' },
    { id: '2', name: 'Studying for Exam' },
  ]);

  const addProject = (projectName) => {
    const newProject = {
      id: `${Date.now()}`,
      name: projectName,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const updateProject = (projectId, newProjectName) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId ? { ...project, name: newProjectName } : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
  };

  return (
    <ProjectContext.Provider value={value}>
      {children}
    </ProjectContext.Provider>
  );
};
