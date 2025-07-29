import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

import ProjectsAreaHeader from "./project-area-header/project-area-header";
import ProjectsAreaBoards from "./project-area-board/project-area-boards";

export default function ProjectsArea() {
  const navigate = useNavigate();
  const [boards, setBoards] = useState([
    {
      id: "board-1",
      name: "To Do",
      createdAt: new Date(),
      tasks: [
        { id: "task-1", name: "Task 1", description: "Description 1", priority: "Low" },
        { id: "task-2", name: "Task 2", description: "Description 2", priority: "Medium" },
      ],
    },
    {
      id: "board-2",
      name: "In progress",
      createdAt: new Date(),
      tasks: [{ id: "task-3", name: "Task 3", description: "Description 3", priority: "High" }],
    },
    { id: "board-3", name: "Done", createdAt: new Date(), tasks: [] },
  ]);

  const [projects, setProjects] = useState([
    {
      id: "1",
      name: "Project Creation",
      icon: null,
      createdAt: new Date(),
      tasks: [],
    },
    {
      id: "2",
      name: "Studying for Exam",
      icon: null,
      createdAt: new Date(),
      tasks: [],
    },
  ]);

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
        const taskToMove = newTasks.find(t => t.id === result.draggableId);
        const taskIndex = newTasks.findIndex(t => t.id === result.draggableId);
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
        const taskToMove = sourceTasks.find(t => t.id === result.draggableId);
        const taskIndex = sourceTasks.findIndex(t => t.id === result.draggableId);
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

  const handleAddTask = (taskName, taskDescription, boardId, priority) => {
    const newTask = {
      id: `task-${Date.now()}`,
      name: taskName,
      description: taskDescription,
      priority: priority,
    };

    setBoards((prevBoards) =>
      prevBoards.map((board) =>
        board.id === boardId
          ? { ...board, tasks: [...board.tasks, newTask] }
          : board
      )
    );
  };

  const handleUpdateTask = (taskId, newTaskName, newTaskDescription, newPriority) => {
    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        tasks: board.tasks.map((task) =>
          task.id === taskId
            ? { ...task, name: newTaskName, description: newTaskDescription, priority: newPriority }
            : task
        ),
      }))
    );
  };

  const handleDeleteTask = (taskId) => {
    console.log("Attempting to delete task with ID:", taskId);
    setBoards((prevBoards) => {
      console.log("Boards before deletion:", prevBoards);
      const updatedBoards = prevBoards.map((board) => ({
        ...board,
        tasks: board.tasks.filter((task) => task.id !== taskId),
      }));
      console.log("Boards after deletion:", updatedBoards);
      return updatedBoards;
    });
  };

  const handleAddProject = (projectName) => {
    const newProject = {
      id: `${Date.now()}`,
      name: projectName,
      icon: null,
      createdAt: new Date(),
      tasks: [],
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const handleEditProject = (projectId, newProjectName) => {
    setProjects((prevProjects) =>
      prevProjects.map((project) =>
        project.id === projectId
          ? { ...project, name: newProjectName }
          : project
      )
    );
  };

  const handleDeleteProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId)
    );
    // Also delete tasks associated with this project if necessary
    setBoards((prevBoards) =>
      prevBoards.map((board) => ({
        ...board,
        tasks: board.tasks.filter((task) => task.projectId !== projectId), // Assuming tasks have a projectId
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
            <span className="text-2xl font-bold inter text-white">Go</span>
          </a>
        </div>
        <button className="rounded h-10 shadow-none btn-font inter text-white">
          {" "}
          Log out
        </button>
      </div>
      <div className="kb-container inter">
        <ProjectsAreaHeader
          onAddTask={handleAddTask}
          onUpdateTask={handleUpdateTask}
          onDeleteTask={handleDeleteTask}
          projects={projects}
          onAddProject={handleAddProject}
          onEditProject={handleEditProject}
          onDeleteProject={handleDeleteProject}
        />
        <hr />
        <ProjectsAreaBoards boards={boards} onDragEnd={onDragEnd} onDeleteTask={handleDeleteTask} onUpdateTask={handleUpdateTask} />
      </div>
    </div>
  );
}
