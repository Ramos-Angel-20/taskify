import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useEffect, useContext } from 'react';

import ProjectColumn from './ProjectColumn';
import ProjectsContext from '../context/projects-context';
import { changeTaskFromList } from '../lib/apiService';


//Al parecer esta madre ya es funcional...
const Project = (props) => {

    const { getCurrentProject, columnOrder, columns, tasks, changeColumnOrder, setColumns, setTasks } = useContext(ProjectsContext);

    useEffect(() => {
        getCurrentProject('05c940c2-f23e-4222-b5d0-078c9c799d83');

    }, [getCurrentProject]);

    const onDragEndHandler = (res) => {
        //draggableId es la task que arrastramos.
        const { destination, source, draggableId, type } = res;
        
        // Primero manejamos todos los edge-cases...
        if (!destination) {
            return;
        }

        if (source.index === destination.index &&
            source.droppableId === destination.droppableId) {
            return;
        }

        //Cambiar de posición las listas de un mismo proyecto.
        if (type === 'list') {
            
            const newColumnOrder = columnOrder;

            const startIndex = source.index;
            const finishIndex = destination.index;

            newColumnOrder.splice(startIndex, 1);
            newColumnOrder.splice(finishIndex, 0, draggableId);

            changeColumnOrder(newColumnOrder);
            return;
        }

        const start = columns[source.droppableId];
        const finish = columns[destination.droppableId];
        
        // Si movemos un task y lo reacomodamos dentro de la misma lista...
        if (start === finish) {
            const newTasksIds = Array.from(start.tasksIds);
            newTasksIds.splice(source.index, 1);
            newTasksIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                tasksIds: newTasksIds
            };
            
            setColumns(newColumn, newColumn.id);
            return;
        }

    


        // Cambiar un task de lista...

        // const startTasksIds = Array.from(start.tasksIds);
        //     startTasksIds.splice(source.index, 1);
            
        //     // Como queda la coumna origen ya que sacamos un task de ella
        //     const newStart = {
        //         ...start,
        //         tasksIds: startTasksIds
        //     };

            
            
        //     const finishTaskIds = Array.from(finish.tasksIds);
        //     finishTaskIds.splice(destination.index, 0, draggableId);
            
        //     // Como queda la columna destino ya que introducimos un nuevo task en ella
        //     const newFinish = {
        //         ...finish,
        //         tasksIds: finishTaskIds
        //     };

        //     console.log(newFinish);
        //     console.log(columns);





        changeTaskFromList(draggableId, destination.droppableId).then(res => {
            
            const startTasksIds = Array.from(start.tasksIds);
            startTasksIds.splice(source.index, 1);
            
            // Como queda la coumna origen ya que sacamos un task de ella
            const newStart = {
                ...start,
                tasksIds: startTasksIds
            };

            
            
            const finishTaskIds = Array.from(finish.tasksIds);
            finishTaskIds.splice(destination.index, 0, draggableId);
            
            // Como queda la columna destino ya que introducimos un nuevo task en ella
            const newFinish = {
                ...finish,
                tasksIds: finishTaskIds
            };

            setTasks(newStart, newFinish);
            return;


        }).catch(err => {
            
            console.log(err);
            return;
        });
                
    }

    return (
        <DragDropContext onDragEnd={(e) => onDragEndHandler(e)} >
            <Droppable droppableId='current-projectId' type='list' direction='horizontal'>
                {(provided, snapshot) => (
                    <div className='project' ref={provided.innerRef} {...provided.droppableProps}>
                        {columnOrder.map((columnId, index) => {
                            
                            const column = columns[columnId];
                            const relatedTasks = column.tasksIds.map(id => tasks[id]);
                            

                            return (
                                <ProjectColumn key={column.id} column={column} tasks={relatedTasks} index={index} />
                            );

                        })}
                        {provided.placeholder}
                        <h3>Add column (list) component</h3>
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}

export default Project
