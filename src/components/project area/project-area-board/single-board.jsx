import SingleTask from "./single-task";
import { Draggable, Droppable } from "@hello-pangea/dnd";

export default function SingleBoard({ board, index, onDeleteTask, onUpdateTask }) {
  const { name: boardName, tasks } = board;
  const numberTasks = tasks.length;

  const priorityOrder = {
    "High": 1,
    "Medium": 2,
    "Low": 3,
  };

  const sortedTasks = [...tasks].sort((a, b) => {
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Draggable draggableId={board.id} index={index}>
      {(provided) => (
        <div
          className="w-full h-full p-4 rounded-2xl text-white board-task"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <div
            className=" flex justify-start items-center gap-3 column-header"
            {...provided.dragHandleProps}
          >
            <div className="board-badge-container rounded-2xl">
              <div className="size-3 rounded-full bg-[#9b9b9b] ml-2"></div>
              <span className="font-medium text-md board-badge-text">
                {boardName}
              </span>
            </div>
            <div className="size-6 rounded-full text-white flex items-center justify-center ">
              <span className="text-sm mt-[2px] text-[#5b5b5b]">
                {" "}
                {numberTasks}
              </span>
            </div>
          </div>
          <Droppable droppableId={board.id} type="task">
            {(provided) => (
              <div
                className="h-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {sortedTasks.map((task, index) => (
                  <SingleTask key={task.id} task={task} index={index} onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}
