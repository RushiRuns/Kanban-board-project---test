import SingleBoard from "./single-board";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

export default function ProjectsAreaTasksBoard({ boards, onDragEnd, onDeleteTask, onUpdateTask, selectedProject }) {
  const filteredBoards = boards.map(board => ({
    ...board,
    tasks: selectedProject ? board.tasks.filter(task => task.projectId === selectedProject.id) : board.tasks
  }));

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-boards" direction="horizontal" type="board">
        {(provided) => (
          <div
            className="h-full rounded-2xl flex items-stretch mt-4 gap-3 "
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {filteredBoards.map((board, index) => (
              <SingleBoard key={board.id} board={board} index={index} onDeleteTask={onDeleteTask} onUpdateTask={onUpdateTask} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

