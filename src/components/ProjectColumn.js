import { Droppable, Draggable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';


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
                                <h2>Add a new task Component</h2>
                            </div>
                        )}
                    </Droppable>
                </div>
            )}

        </Draggable>
    );
}

export default ProjectColumn;
