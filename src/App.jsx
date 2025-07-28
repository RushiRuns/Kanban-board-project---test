import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import ProjectsArea from "./components/project area/project-area.jsx";

import HomePage from "./components/home page/home-page.jsx";
export default function Home() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsArea />} />
      </Routes>
    </Router>
  );
}
