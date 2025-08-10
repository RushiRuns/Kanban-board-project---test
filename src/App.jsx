import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";

import ProjectsArea from "./components/project area/project-area.jsx";
import HomePage from "./components/home page/home-page.jsx";
import SignUp from "./components/Auth/signup/signup-container.jsx";
import Login from "./components/Auth/login/login-container.jsx";
import RefrshHandler from "./RefrshHandler";

import "./App.css";

import { ProjectProvider } from "./context/ProjectContext";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const PrivateRoute = ({ element }) => {
    return isAuthenticated ? element : <Navigate to="/login" />;
  };
  return (
    <div>
      <ProjectProvider>
        <Router>
          <RefrshHandler setIsAuthenticated={setIsAuthenticated} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/projects" element={<ProjectsArea />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </ProjectProvider>
    </div>
  );
}
