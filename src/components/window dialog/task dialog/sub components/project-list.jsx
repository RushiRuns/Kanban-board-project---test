import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { IoCheckmark } from "react-icons/io5";

import { useProjects } from "../../../../context/ProjectContext";

export default function ProjectsList({ selectedProject, onProjectChange }) {
  const { projects } = useProjects();
  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (projects.length > 0 && (!selectedProject || !projects.some(p => p.id === selectedProject.id))) {
      onProjectChange(projects[0]);
    } else if (projects.length === 0) {
      onProjectChange(null);
    }
  }, [projects, selectedProject, onProjectChange]);

  const filterBySearchQuery = projects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function renderSelectedProject() {
    return (
      <div className="flex items-center gap-2 ">
        <span>{selectedProject.name}</span>
      </div>
    );
  }

  function renderDropDownMenuItem(projectItem) {
    return (
      <div
        className="flex items-center gap-2 hover:bg-gray-100 cursor-pointer"
        onClick={() => {
          onProjectChange(projectItem);
          setIsOpen(false);
        }}
      >
        <span className="ml-2">{projectItem.name}</span>
        {selectedProject && projectItem.name === selectedProject.name && (
          <IoCheckmark className="ml-auto mr-2" />
        )}
      </div>
    );
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Label className="opacity-75 text-sm font-medium">Projects</Label>
      <div className="mt-1 w-full">
        <Button
          variant={"outline"}
          className="w-full h-11 flex justify-between items-center border glass-effect"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedProject ? renderSelectedProject() : "Select a project"}
          <IoIosArrowDown />
        </Button>
      </div>

      {isOpen && (
        <div className="absolute overflow-hidden w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg z-10 project-selection">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search"
            className="w-full border border-gray-300 rounded-md px-2 py-1"
          />

          <div className="max-h-60 overflow-y-auto my-2">
            {filterBySearchQuery.map((projectItem, index) => (
              <div key={index} className="text-sm">
                {renderDropDownMenuItem(projectItem)}
              </div>
            ))}
            {filterBySearchQuery.length === 0 && (
              <div className="text-sm text-gray-500 px-2 py-1">No projects found.</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
