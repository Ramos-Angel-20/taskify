import { useState } from 'react';


const AddColumn = ({ onAddColumn }) => {

    const [columnTitle, setColumnTitle] = useState('');
    
    const columnTitleChangeHandler = e => {
        setColumnTitle(e.target.value);
    }

    const addColumnHandler = () => {
        if (columnTitle) {
            onAddColumn(columnTitle)
            setColumnTitle('');
        }

        return;
        
    }

    return (
        <div className='addColumn'>
            <p>Add a new list</p>
            <input type="text" value={columnTitle} onChange={columnTitleChangeHandler}/>
            <div className="addColumn__actions">
                <button onClick={addColumnHandler}>Add</button>
            </div>
        </div>
    );
}

export default AddColumn;