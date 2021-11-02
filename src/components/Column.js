import { Droppable } from 'react-beautiful-dnd';

import TaskCard from './TaskCard';

const Column = props => {
    return (
        <Droppable droppableId={props.column.id}>
            {(provided, snapshot) => (
                <div
                    className="column__list"
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                >
                    <h2>{props.column.title}</h2>
                    {props.tasks.map((task, index) => <TaskCard key={task.id} task={task} index={index} />)}

                    {provided.placeholder}
                </div>
            )}
        </Droppable>
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