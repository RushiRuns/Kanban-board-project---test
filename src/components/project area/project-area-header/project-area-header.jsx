import ProjectSelectionDropDown from "../../drop downs/project drop down/project-selection";
import TaskDialog from "../../window dialog/task dialog/task-dialog";

export default function ProjectsAreaHeader({
  onAddTask,
  onUpdateTask,
  onDeleteTask,
  projects,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) {
  return (
    <div className="flex items-center justify-between ">
      <ProjectSelectionDropDown
        projects={projects}
        onAddProject={onAddProject}
        onEditProject={onEditProject}
        onDeleteProject={onDeleteProject}
      />
      <TaskDialog
        onAddTask={onAddTask}
        onUpdateTask={onUpdateTask}
        onDeleteTask={onDeleteTask}
      />
    </div>
  );
}
