import SingleBoard from "./single-board";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export default function ProjectsAreaTasksBoard({ boards, onDragEnd, onDeleteTask, onUpdateTask }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-boards" direction="horizontal" type="board">
        {(provided) => (
          <div
            className="h-full rounded-2xl flex items-stretch mt-4 gap-3 "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {boards.map((board, index) => (
              <SingleBoard key={board.id} board={board} index={index} onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
