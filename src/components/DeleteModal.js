import { FaTimes } from 'react-icons/fa';

import { createPortal } from 'react-dom';


const DeleteModalOverlay = () => {
    return (
        <div className='deleteModal'>
            <div className='deleteModal__actions'>
                <FaTimes/>
            </div>
            <p>Are you sure you want to delete this column?</p>
            <p>This will also delete all the tasks within the column</p>            
        </div>
    );
}

const DeleteModal = () => createPortal(<DeleteModalOverlay/> ,document.getElementById('overlay'));

export default DeleteModal;