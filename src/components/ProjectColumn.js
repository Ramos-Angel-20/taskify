import { Droppable, Draggable } from 'react-beautiful-dnd';

import { useContext } from 'react';

import TaskCard from './TaskCard';
import AddTaskCard from './AddTaskCard';
import ProjectTitle from './ProjectTitle';
import ProjectsContext from '../context/projects-context';

const ProjectColumn = ({ column, tasks, index }) => {

    const { deleteTask, deleteColumn } = useContext(ProjectsContext);

    const taskDeletionHandler = (taskId) => {
        deleteTask(taskId, column.id);
    }

    const deleteColumnHandler = () => {
        deleteColumn(column.id, tasks);
    }

    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <div className='projectColumn' ref={provided.innerRef} {...provided.draggableProps}>

                    <ProjectTitle title={column.title} dragProps={provided.dragHandleProps} onDelete={deleteColumnHandler}/>
                    {/* <div className='projectColumn__header' {...provided.dragHandleProps}>
                        <p>{column.title}</p>
                    </div> */}

                    <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className='projectColumn__container'>
                                
                                {tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} onDelete={taskDeletionHandler}/>)}
                                
                                
                                {provided.placeholder}
                                
                                <AddTaskCard columnId={column.id}/>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}

        </Draggable>
    );
}

export default ProjectColumn;
