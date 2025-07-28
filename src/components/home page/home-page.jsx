import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import Navbar from "./nav-bar/navbar.jsx";

export default function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="border min-h-screen w-full bg-homepage ">
      <Navbar />

      <main className="container-center text-center gap-5">
        <h1 className="heading dm-sans">
          Kanban Made Easy – <br />
          Just for You.
        </h1>
        <p className="sub-heading inter">
          A clean, simple Kanban board designed for individuals — drag, drop,
          and <br />
          organize tasks effortlessly without any unnecessary features.
        </p>
        <Button
          className="rounded h-10 shadow-none btn-font mt-4 mb-3 inter"
          onClick={() => navigate("/projects")}
        >
          Get Started
        </Button>
      </main>
    </div>
  );
}
