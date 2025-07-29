import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import ProjectCommandItems from "./project-command-items";
import { useState, useEffect } from "react";
import { useProjects } from "../../../context/ProjectContext";

export default function ProjectSelectionDropDown({
  onAddProject,
  onEditProject,
  onDeleteProject,
}) {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    if (projects.length > 0 && !selectedProject) {
      setSelectedProject(projects[0]);
    } else if (projects.length === 0) {
      setSelectedProject(null);
    }
  }, [projects, selectedProject]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"ghost"}
          className="w-10 flex justify-between py-9 rounded-xl bg-gray-50 text-white project-dropdown"
        >
          <div className="flex items-start flex-col text-[16px] gap-1 ">
            <p className="text-[13px] text-gray-300 ">SELECTED PROJECT</p>
            <p className="font-bold  hover-stop">
              {selectedProject ? selectedProject.name : "No Project Selected"}
            </p>
          </div>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0  rounded-xl command-container ">
        <ProjectCommandItems
          projects={projects}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
          onAddProject={onAddProject}
          onEditProject={onEditProject}
          onDeleteProject={onDeleteProject}
        />
      </PopoverContent>
    </Popover>
  );
}
