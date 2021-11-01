import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useState } from 'react';

const tasksFromBackend = [
    {
        taskId: '1',
        title: 'Desarrollar Taskify (frontend)'
    },
    {
        taskId: '2',
        title: 'Pensar en un mejor nombre para la app'
    },
    {
        taskId: '3',
        title: 'Desarrollar el backend'
    },
    {
        taskId: '4',
        title: 'Resolver problema de actualización de listas'
    }
];


const DragList = (props) => {

    const [tasks, seTasks] = useState(tasksFromBackend);

    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }

    const dragEndHandler = (res) => {
        
        const { source, destination } = res;
    
        if (!destination) { //Lo soltamos en un NO droppable.
            return;
        }

        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        ) { //Arrastramos y soltamos el elemento en su misma posición.
            
            return;
        }

        seTasks(prevTasks => reorder(prevTasks, source.index, destination.index));

    }

    return (
        <div>
            <DragDropContext onDragEnd={res => dragEndHandler(res)}>
                <div>
                    <h1>Tasks</h1>
                    <Droppable droppableId='0314-fra4-5gsgwr-21'>
                        {(droppableProvided) => (
                            <ul {...droppableProvided.droppableProps} ref={droppableProvided.innerRef}>

                                {
                                    tasks.map((item, index) => (
                                        <Draggable key={item.taskId} draggableId={item.taskId} index={index}>
                                            {
                                                (draggableProvided) => (
                                                    <li {...draggableProvided.draggableProps} ref={draggableProvided.innerRef} {...draggableProvided.dragHandleProps}>
                                                        <p>{item.title}</p>
                                                    </li>
                                                )
                                            }
                                        </Draggable>
                                    ))
                                }
                                {droppableProvided.placeholder}
                            </ul>
                        )}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    );
}

export default DragList;