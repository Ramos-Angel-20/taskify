import { useState } from 'react';

const AddTaskCard = () => {
    console.log('AddTaskCard');
    const [inputIsOpen, setInputIsOpen] = useState(false);
    
    const openInputHandler = () => {
        setInputIsOpen(true);
    }

    const closeIputHandler = () => {
        setInputIsOpen(false);
    }
    

    return (
        <div className='addTaskCard'>
            {
                inputIsOpen ? (
                    <div className="addTaskCard__input-field">
                        <input type="text" placeholder='description...'/>
                        
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
