import { DragDropContext } from 'react-beautiful-dnd';

import { useState, useEffect, useContext } from 'react';

import Navbar from './components/Navbar';
import Column from './components/Column';
import initialData from './initialData';
import Project from './components/Project';

const App = () => {

  // const [state, setState] = useState(initialData);


  // const onDragEnd = result => {
  //   const { destination, source, draggableId } = result;

  //   if (!destination) {
  //     return;
  //   }

  //   //Por si se hace un dnd en la misma columna y en la misma posición.
  //   if (destination.droppableId === source.droppableId && destination.index === source.index) {
  //     return;
  //   }

  //   const start = state.columns[source.droppableId];
  //   const finish = state.columns[destination.droppableId];

  //   if (start === finish) {
  //     const newTaskIds = Array.from(start.taskIds);
  //     newTaskIds.splice(source.index, 1);
  //     newTaskIds.splice(destination.index, 0, draggableId);


  //     // Recreamos la columna reemplazando el arreglo de taskIds con el nuevo.
  //     const newColumn = {
  //       ...start,
  //       taskIds: newTaskIds
  //     };

  //     const newState = {
  //       ...state,
  //       columns: {
  //         ...state.columns,
  //         [newColumn.id]: newColumn
  //       }
  //     }

  //     setState(newState);
  //     return;
  //   }

  //   //Mover de una lista a otra
  //   const startTaskIds = Array.from(start.taskIds);
  //   startTaskIds.splice(source.index, 1); //Quitamos un task en el indice de origen.

  //   const newStartColumn = {
  //     ...start,
  //     taskIds: startTaskIds
  //   };

  //   const finishedTaskIds = Array.from(finish.taskIds);
  //   finishedTaskIds.splice(destination.index, 0, draggableId);

  //   const newFinishColumn = {
  //     ...finish,
  //     taskIds: finishedTaskIds
  //   };

  //   const newState = {
  //     ...state,
  //     columns: {
  //       ...state.columns,
  //       [newStartColumn.id]: newStartColumn,
  //       [newFinishColumn.id]: newFinishColumn
  //     }
  //   };

  //   setState(newState);
  // }

  // return (
  //   <>
  //     <Navbar />
  //     <main>
  //       <DragDropContext
  //         onDragEnd={(res) => onDragEnd(res)}
  //       >
  //         {
  //           state.columnOrder.map((columnId) => {
  //             const column = state.columns[columnId];
  //             const tasks = column.taskIds.map((taskId) => state.tasks[taskId]);

  //             return (
  //               <>
  //                 <Column key={column.id} column={column} tasks={tasks} />
  //               </>
  //             );
  //           })
  //         }
  //       </DragDropContext>
  //     </main>
  //   </>
  // );

  return (
    <>
      <Navbar/>
      <Project/>
    </>
  );
  
}

export default App;
