import { FaTimes } from 'react-icons/fa';
import { Draggable } from 'react-beautiful-dnd';


const TaskCard = (props) => {

    

    const creationDate = new Date(props.task.createdAt).toDateString();

    

    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <div ref={provided.innerRef} {...provided.dragHandleProps} {...provided.draggableProps} className={`${!snapshot.isDragging ? 'taskCard' : 'taskCard--isDragging'}`}>
                    <div className='taskCard__header'>
                        <FaTimes onClick={() => props.onDelete(props.task.id)} className='taskCard__header__icon' />
                    </div>
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