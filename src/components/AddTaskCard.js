import { useState, useContext } from 'react';

import ProjectsContext from '../context/projects-context';

const AddTaskCard = ({ columnId }) => {

    const [inputIsOpen, setInputIsOpen] = useState(false);
    const [taskDescription, setTaskDescription] = useState('');
    const { addTask } = useContext(ProjectsContext);


    const openInputHandler = () => {
        setInputIsOpen(true);
    }

    const closeIputHandler = () => {
        setInputIsOpen(false);
        setTaskDescription('');
    }

    const taskDescriptionChangeHandler = e => {
        setTaskDescription(e.target.value);
    }

    const addTaskHandler = () => {

        if (taskDescription && taskDescription.length > 10) {
            addTask(columnId, taskDescription);
        }

        return;
    }


    return (
        <div className='addTaskCard'>
            {
                inputIsOpen ? (
                    <div className="addTaskCard__input-field">
                        <input type="text" placeholder='description...' onChange={taskDescriptionChangeHandler} value={taskDescription} />

                        <div className="addTaskCard__input-field__actions">
                            <button onClick={addTaskHandler}>Add</button>
                            <button onClick={closeIputHandler}>Cancel</button>
                        </div>

                    </div>
                ) : (
                    <p className='addTaskCard__label' onClick={openInputHandler}>Add a new task...</p>
                )

            }
        </div>
    )
}

export default AddTaskCard;
