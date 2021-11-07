import { Draggable } from 'react-beautiful-dnd';

const TaskCard = (props) => {
    
    //TODO: Agregar la fecha de creacion de la task...
    
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className={`${!snapshot.isDragging ? 'taskCard' : 'taskCard--isDragging'}`}>
                    <p>{props.task.description}</p>
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;