import { Draggable } from 'react-beautiful-dnd';

const TaskCard = props => {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided, snapshot) => (
                <div
                    className={`${snapshot.isDragging ? 'task__container--isDragging' : 'task__container'}`}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                >
                    {props.task.content}
                </div>
            )}
        </Draggable>
    );
}

export default TaskCard;