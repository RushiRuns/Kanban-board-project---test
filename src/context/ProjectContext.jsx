import React, { createContext, useState, useContext } from "react";

const ProjectContext = createContext();

export const useProjects = () => useContext(ProjectContext);

export const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState([]);

  const addProject = (projectName) => {
    const newProject = {
      id: `${Date.now()}`,
      name: projectName,
      tasks: [],
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const updateProject = (projectId, newProjectName) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, name: newProjectName }
          : project
      )
    );
  };

  const deleteProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
  };

  const updateTaskCount = (projectId, oldProjectId) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) => {
        if (project.id === projectId) {
          return { ...project, tasks: [...project.tasks, 1] };
        }
        if (project.id === oldProjectId) {
          return { ...project, tasks: project.tasks.slice(1) };
        }
        return project;
      })
    );
  };

  const value = {
    projects,
    addProject,
    updateProject,
    deleteProject,
    updateTaskCount,
  };

  return (
    <ProjectContext.Provider value={value}>{children}</ProjectContext.Provider>
  );
};
