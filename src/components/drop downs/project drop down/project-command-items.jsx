import { useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandList,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";

import SingleProjectCommandItem from "./single-project-item";
import CreateProjectDialog from "@/components/window dialog/create project dialog/create-project-dialog";

import { FaCirclePlus } from "react-icons/fa6";

export default function ProjectCommandItems({
  projects,
  selectedProject,
  setSelectedProject,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) {
  const [open, setOpen] = useState(false);

  function handleProjectSelect(project) {
    setSelectedProject(project);
  }

  function handleCreateProject(projectName) {
    onAddProject(projectName);
    setOpen(false);
  }

  return (
    <Command className="text-white command-container inter">
      <CommandInput placeholder="Search project..." />
      <CommandList className="my-3 ">
        <CommandEmpty>No project found.</CommandEmpty>
      </CommandList>
      <div className="flex flex-col gap-3 mx-2">
        {projects.map((project) => (
          <SingleProjectCommandItem
            key={project.id}
            project={project}
            onSelectedItem={handleProjectSelect}
            isSelected={selectedProject?.id === project.id}
            onEditProject={onEditProject}
            onDeleteProject={onDeleteProject}
          />
        ))}
        <div className="flex items-center justify-center gap-3 mt-1 mb-3">
          <div className="flex flex-col">
            <Button className="btn-plus" onClick={() => setOpen(true)}>
              <FaCirclePlus />
            </Button>
          </div>
        </div>
      </div>
      <CreateProjectDialog
        open={open}
        onOpenChange={setOpen}
        onCreate={handleCreateProject}
      />
    </Command>
  );
}
