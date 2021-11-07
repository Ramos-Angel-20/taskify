import { useState } from 'react';

const AddTaskCard = () => {
    
    const [inputIsOpen, setInputIsOpen] = useState(false);
    const [taskDescription, setTaskDescription] = useState('');
    
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
    

    return (
        <div className='addTaskCard'>
            {
                inputIsOpen ? (
                    <div className="addTaskCard__input-field">
                        <input type="text" placeholder='description...'  onChange={taskDescriptionChangeHandler} value={taskDescription}/>
                        
                        <div className="addTaskCard__input-field__actions">
                            <button>Add</button>
                            <button onClick={closeIputHandler}>Cancel</button>
                        </div>
                        
                    </div>
                ) : (
                    <p onClick={openInputHandler}>Add a new task...</p>
                )
        
        }
        </div>
    )
}

export default AddTaskCard;
