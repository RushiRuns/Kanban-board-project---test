import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import {
  MdKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowUp,
} from "react-icons/md";
import { RiArrowDownDoubleFill } from "react-icons/ri";

import { BiTask } from "react-icons/bi";
import TaskName from "./sub components/task-name";
import TaskDescription from "./sub components/task-description";
import ProjectsList from "./sub components/project-list";
import PriorityList from "./sub components/priority-list";

const PriorityListArray = [
  {
    name: "Low",
    icon: RiArrowDownDoubleFill,
    textColor: "text-green-700",
    backgroundColor: "bg-green-500/10",
  },
  {
    name: "Medium",
    icon: MdKeyboardDoubleArrowRight,
    textColor: "text-yellow-700",
    backgroundColor: "bg-yellow-500/10",
  },
  {
    name: "High",
    icon: MdOutlineKeyboardDoubleArrowUp,
    textColor: "text-red-700",
    backgroundColor: "bg-red-500/10",
  },
];

export default function TaskDialog({
  open,
  onOpenChange,
  task,
  onAddTask,
  onUpdateTask,
}) {
  console.log("TaskDialog received onUpdateTask:", onUpdateTask);
  const [taskName, setTaskName] = useState(task?.name || "");
  const [taskDescription, setTaskDescription] = useState(
    task?.description || ""
  );
  const [selectedPriority, setSelectedPriority] = useState(
    task
      ? PriorityListArray.find((p) => p.name === task.priority)
      : PriorityListArray[0]
  );

  const title = task ? "Edit Task" : "New Task";
  const buttonText = task ? "Update Task" : "Add New Task";

  const handleCreateOrUpdateTask = () => {
    if (task) {
      onUpdateTask(task.id, taskName, taskDescription, selectedPriority.name);
    } else {
      // For now, default to the first board (To Do)
      onAddTask(taskName, taskDescription, "board-1", selectedPriority.name);
    }
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {!task && (
        <DialogTrigger asChild>
          <Button className="rounded px-5 btn-task inter">
            <span>New Task</span>
          </Button>
        </DialogTrigger>
      )}
      <DialogContent className="dialog-container max-w-3xl inter text-white">
        <DialogHeader className="">
          <div className="size-10 bg-gray-200 rounded-full flex items-center justify-center">
            <BiTask className="text-xl text-gray-700" />
          </div>

          <div className="pt-2">
            <DialogTitle className="text-lg p-0 h-7">{title}</DialogTitle>
            <DialogDescription className="p-0 text-[#acaaaa]">
              Fill in the form below to create or to modify a task
            </DialogDescription>
          </div>

          <div className="  ">
            <Separator className="mt-4 left-0 absolute" />
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 mt-8">
          <div className="flex flex-col gap-3">
            <TaskName value={taskName} onChange={setTaskName} />
            <TaskDescription
              value={taskDescription}
              onChange={setTaskDescription}
            />
          </div>

          <div className="flex flex-col gap-[53px] ">
            <ProjectsList />
            <PriorityList
              selectedPriority={selectedPriority}
              onPriorityChange={setSelectedPriority}
            />
          </div>
        </div>

        <div className="  ">
          <Separator className="mt-4 left-0 absolute" />
        </div>
        <div className="flex gap-1 justify-end mt-6">
          <Button className="ml-5 px-5" onClick={handleCreateOrUpdateTask}>
            {buttonText}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
