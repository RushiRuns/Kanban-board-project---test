import ProjectSelectionDropDown from "../../drop downs/project drop down/project-selection";
import TaskDialog from "../../window dialog/task dialog/task-dialog";
import { useState } from "react";

export default function ProjectsAreaHeader({
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  projects,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center justify-between ">
      <ProjectSelectionDropDown
        projects={projects}
        onAddProject={onAddProject}
        onEditProject={onEditProject}
        onDeleteProject={onDeleteProject}
      />
      <TaskDialog
        open={open}
        onOpenChange={setOpen}
        onAddTask={onAddTask}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
}
