import SingleTask from "./single-task";
import { Draggable, Droppable } from "@hello-pangea/dnd";

export default function SingleBoard({ board, index, onDeleteTask, onUpdateTask }) {
  const { name: boardName, tasks } = board;
  const numberTasks = tasks.length;

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
                {tasks.map((task, index) => (
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
