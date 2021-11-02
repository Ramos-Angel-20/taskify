import { DragDropContext } from 'react-beautiful-dnd';

import { useState } from 'react';

import Navbar from './components/Navbar';
import Column from './components/Column';
import initialData from './initialData';


const App = () => {

  const [state, setstate] = useState(initialData);

  const onDragEnd = result => {
    const { destination, source, draggableId } = result;
    
    if (!destination) {
      return;
    }

    //Por si se hace un dnd en la misma columna y en la misma posición.
    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    const column = state.columns[source.droppableId];
    const newTaskIds = Array.from(column.taskIds);
    newTaskIds.splice(source.index, 1); //Vamos a remover un taskId desde el indice de origen.
    newTaskIds.splice(destination.index, 0, draggableId);//En el indice de destino, agregamos el draggableId que viene siendo tambien un taskId
    
    // Recreamos la columna reemplazando el arreglo de taskIds con el nuevo.
    const newColumn = {
      ...column,
      taskIds: newTaskIds
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newColumn.id]: newColumn
      }
    }

    console.log(newState);

    setstate(newState);

  }

  return (
    <>
      <Navbar />
      <DragDropContext
        onDragEnd={(res) => onDragEnd(res)}
      >
        {
          state.columnOrder.map((columnId) => {
            const column = state.columns[columnId];
            const tasks = column.taskIds.map((taskId) => state.tasks[taskId])

            return (
              <>
                <Column key={column.id} column={column} tasks={tasks} />
              </>
            );
          })
        }
      </DragDropContext>
    </>
  );
}

export default App;
