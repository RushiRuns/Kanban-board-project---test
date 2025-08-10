import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleSuccess } from "../../lib/utils";
import { ToastContainer } from "react-toastify";

import ProjectsAreaHeader from "./project-area-header/project-area-header";
import ProjectsAreaBoards from "./project-area-board/project-area-boards";
import { useProjects } from "../../context/ProjectContext";

export default function ProjectsArea() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("loggedInUser");
    handleSuccess("User Loggedout");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const {
    projects,
    addProject,
    updateProject,
    deleteProject,
    updateTaskCount,
  } = useProjects();
  const [boards, setBoards] = useState([
    {
      id: "board-1",
      name: "To Do",
      createdAt: new Date(),
      tasks: [],
    },
    {
      id: "board-2",
      name: "In progress",
      createdAt: new Date(),
      tasks: [],
    },
    { id: "board-3", name: "Done", createdAt: new Date(), tasks: [] },
  ]);
  const [selectedProject, setSelectedProject] = useState(null);

  const onDragEnd = (result) => {
    const { source, destination, type } = result;

    if (!destination) return;

    if (type === "board") {
      const newBoards = Array.from(boards);
      const [reorderedBoard] = newBoards.splice(source.index, 1);
      newBoards.splice(destination.index, 0, reorderedBoard);
      setBoards(newBoards);
    } else {
      const sourceBoard = boards.find(
        (board) => board.id === source.droppableId
      );
      const destBoard = boards.find(
        (board) => board.id === destination.droppableId
      );

      if (!sourceBoard || !destBoard) return;

      if (source.droppableId === destination.droppableId) {
        const newTasks = Array.from(sourceBoard.tasks);
        const taskToMove = newTasks.find((t) => t.id === result.draggableId);
        const taskIndex = newTasks.findIndex(
          (t) => t.id === result.draggableId
        );
        if (taskIndex === -1) return;
        newTasks.splice(taskIndex, 1);
        newTasks.splice(destination.index, 0, taskToMove);

        const newBoards = boards.map((board) =>
          board.id === source.droppableId
            ? { ...board, tasks: newTasks }
            : board
        );
        setBoards(newBoards);
      } else {
        const sourceTasks = Array.from(sourceBoard.tasks);
        const taskToMove = sourceTasks.find((t) => t.id === result.draggableId);
        const taskIndex = sourceTasks.findIndex(
          (t) => t.id === result.draggableId
        );
        if (taskIndex === -1) return;
        sourceTasks.splice(taskIndex, 1);

        const destTasks = Array.from(destBoard.tasks);
        destTasks.splice(destination.index, 0, taskToMove);

        const newBoards = boards.map((board) => {
          if (board.id === source.droppableId) {
            return { ...board, tasks: sourceTasks };
          } else if (board.id === destination.droppableId) {
            return { ...board, tasks: destTasks };
          }
          return board;
        });
        setBoards(newBoards);
      }
    }
  };

  const handleAddTask = (
    taskName,
    taskDescription,
    boardId,
    priority,
    projectId
  ) => {
    const newTask = {
      id: `task-${Date.now()}`,
      name: taskName,
      description: taskDescription,
      priority: priority,
      projectId: projectId,
    };

    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? { ...board, tasks: [...board.tasks, newTask] }
          : board
      )
    );
    updateTaskCount(projectId);
  };

  const handleUpdateTask = (
    taskId,
    newTaskName,
    newTaskDescription,
    newPriority,
    newProjectId
  ) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        tasks: board.tasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                name: newTaskName,
                description: newTaskDescription,
                priority: newPriority,
                projectId: newProjectId,
              }
            : task
        ),
      }))
    );

    const oldProjectId = boards
      .flatMap((board) => board.tasks)
      .find((task) => task.id === taskId)?.projectId;
    if (oldProjectId !== newProjectId) {
      updateTaskCount(newProjectId, oldProjectId);
    }
  };

  const handleDeleteTask = (taskId) => {
    const taskToDelete = boards
      .flatMap((board) => board.tasks)
      .find((task) => task.id === taskId);
    if (taskToDelete && taskToDelete.projectId) {
      updateTaskCount(null, taskToDelete.projectId);
    }

    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        tasks: board.tasks.filter((task) => task.id !== taskId),
      }))
    );
  };

  return (
    <div id="container">
      <div className="p-6 flex justify-between items-center w-nav m-auto nav">
        <div className="flex items-center gap-16">
          <a
            className="flex items-center text-xl cursor-pointer"
            onClick={() => navigate("/")}
          >
            <span className="text-2xl inter text-white ">Kanban</span>
            <span className="text-2xl font-bold inter text-white">Flow</span>
          </a>
        </div>
        <button
          className="rounded h-10 shadow-none btn-font inter text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div className="kb-container inter">
        <ProjectsAreaHeader
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          projects={projects}
          onAddProject={addProject}
          onEditProject={updateProject}
          onDeleteProject={deleteProject}
          selectedProject={selectedProject}
          setSelectedProject={setSelectedProject}
        />
        <hr />
        <ProjectsAreaBoards
          boards={boards}
          onDragEnd={onDragEnd}
          onDeleteTask={handleDeleteTask}
          onUpdateTask={handleUpdateTask}
          selectedProject={selectedProject}
        />
      </div>
       <ToastContainer />
    </div>
  );
}
