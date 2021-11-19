import { Droppable, Draggable } from 'react-beautiful-dnd';

import TaskCard from './TaskCard';


const Column = props => {
    return (
        <Draggable draggableId={props.column.id} >
            {(provided) => (
                <div {...provided.draggableProps} ref={provided.innerRef}>
                    <h2 {...provided.dragHandleProps} >{props.column.title}</h2>
                    <Droppable droppableId={props.column.id}>
                        {(provided, snapshot) => (
                            <div
                                className="column__list"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {props.tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)}

                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </div>
            )}
        </Draggable>
    );

    //TODO: Solucionar como agregar un titulo a la lista

    // return (
    //     <div className='column__container'>

    //         <div className="column__title">{props.column.title}</div>


    //         <Droppable droppableId={props.column.id}>
    //             {provided => (
    //                 <div 
    //                     className="column__list"
    //                     ref={provided.innerRef} 
    //                     {...provided.droppableProps}
    //                 >
    //                     {props.tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)}

    //                     {provided.placeholder}
    //                 </div>
    //             )}
    //         </Droppable>
    //     </div>
    // );
}

export default Column;