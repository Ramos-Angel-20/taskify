import { Draggable } from 'react-beautiful-dnd';

const TaskCard = (props) => {
    
    //TODO: Agregar la fecha de creacion de la task...
    const creationDate = new Date(props.task.createdAt).toDateString();
    
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className={`${!snapshot.isDragging ? 'taskCard' : 'taskCard--isDragging'}`}>
                    <div className='taskCard__description'>
                        {props.task.description}
                    </div>
                    <div className='taskCard__date'>
                        {creationDate}
                    </div>
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;