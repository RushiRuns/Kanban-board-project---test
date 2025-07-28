import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import TasksDropDown from "../../drop downs/task-dropdown";

import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import TaskDialog from "@/components/window dialog/task dialog/task-dialog";
import DeleteTaskDialog from "@/components/window dialog/delete task dialog/delete-task-dialog";

export default function SingleTask({
  task,
  index,
  onDeleteTask,
  onUpdateTask,
}) {
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  function handleDelete() {
    console.log("Deleting task with ID:", task.id);
    onDeleteTask(task.id);
    setDeleteOpen(false);
  }

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <div
          className="board-task-container bg-[#2f2f2f] rounded-2xl p-4 mt-3 text-white"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <div className="flex justify-between items-center">
            <p className="font-medium text-md">{task.name}</p>
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
          <p className="text-sm text-[#949494] mt-1">{task.description}</p>
          <div className="text-xs mt-2">
            <span
              className={`inline-block px-2 py-1 rounded-full ${
                task.priority === "High"
                  ? "bg-red-500 text-white"
                  : task.priority === "Medium"
                  ? "bg-yellow-500 text-black"
                  : "bg-green-500 text-white"
              }`}
            >
              {task.priority}
            </span>
          </div>
          <TaskDialog
            open={editOpen}
            onOpenChange={setEditOpen}
            task={task}
            onUpdateTask={onUpdateTask}
          />
          <DeleteTaskDialog
            open={deleteOpen}
            onOpenChange={setDeleteOpen}
            onDelete={handleDelete}
          />
        </div>
      )}
    </Draggable>
  );
}
