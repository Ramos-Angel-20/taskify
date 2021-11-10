import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import AddTaskCard from './AddTaskCard';


const ProjectColumn = ({ column, tasks, index }) => {
    return (
        <Draggable draggableId={column.id} index={index}>
            {(provided) => (
                <div className='projectColumn' ref={provided.innerRef} {...provided.draggableProps}>

                    <div className='projectColumn__header' {...provided.dragHandleProps}>
                        <p>{column.title}</p>
                    </div>

                    <Droppable droppableId={column.id}>
                        {(provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className='projectColumn__container'>
                                
                                {tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index}/>)}
                                
                                
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
