import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ProjectsArea from "./components/project area/project-area.jsx";

import HomePage from "./components/home page/home-page.jsx";
import { ProjectProvider } from './context/ProjectContext';

export default function Home() {
  return (
    <ProjectProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<ProjectsArea />} />
        </Routes>
      </Router>
    </ProjectProvider>
  );
}
