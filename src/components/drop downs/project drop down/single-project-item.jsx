import { useState } from "react";
import { CommandItem } from "@/components/ui/command";
import { IoMdCheckmark } from "react-icons/io";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import EditProjectDialog from "@/components/window dialog/edit project dialog/edit-project-dialog";
import DeleteProjectDialog from "@/components/window dialog/delete project dialog/delete-project-dialog";

export default function SingleProjectCommandItem({
  project,
  isSelected,
  onSelectedItem,
  onEditProject,
  onDeleteProject,
}) {
  const { name: projectName, tasks, icon: ProjectIcon } = project;
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleEdit(newProjectName) {
    onEditProject(project.id, newProjectName);
    setEditOpen(false);
  }

  function handleDelete() {
    onDeleteProject(project.id);
    setDeleteOpen(false);
  }

  return (
    <CommandItem
      value={projectName}
      onSelect={() => {
        onSelectedItem(project);
      }}
      className="cursor-pointer command-item rounded-lg p-2 inter"
    >
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <div className="flex flex-col pl-1 command-item-text">
            <span className="font-medium">{projectName}</span>
            <span className="text-[12px] text-gray-300">
              {tasks.length} Tasks
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isSelected && (
            <div className="text-primary">
              <IoMdCheckmark size={12} />
            </div>
          )}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <BsThreeDotsVertical />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setEditOpen(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setDeleteOpen(true)}>
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <EditProjectDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        onEdit={handleEdit}
        project={project}
      />
      <DeleteProjectDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        onDelete={handleDelete}
      />
    </CommandItem>
  );
}
