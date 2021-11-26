import Swal from 'sweetalert2';
import { HiDotsHorizontal } from 'react-icons/hi';
import { GoPencil } from 'react-icons/go';
import { BsTrashFill } from 'react-icons/bs';

import { useState, useContext } from 'react';

import ProjectsContext from '../context/projects-context';
import Backdrop from './Backdrop';

const ColumnTitle = ({ title, dragProps, onDelete, columnId }) => {

    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [titleOptionSelected, setTitleOptionSelected] = useState(false);

    const { changeColumnTitle } = useContext(ProjectsContext);




    const launchWarning = () => {

        setMenuIsOpened(false);

        Swal.fire({
            title: 'Warning',
            text: 'This will delete all the tasks within the selected column',
            icon: 'warning',
            showConfirmButton: true,
            confirmButtonColor: 'red',
            confirmButtonText: 'Yes, delete it!',
            showCancelButton: true,
            cancelButtonColor: 'gray',
            cancelButtonText: 'Cancel'
        }).then(res => {
            const { isConfirmed } = res;

            if (isConfirmed) {
                onDelete();
            }
        })
    }





    // const toggleTitleBox = () => {
    //     setTitleOptionSelected(prevState => !prevState);
    // }


    const launchChangeTitle = () => {
        setMenuIsOpened(false);

        Swal.fire({
            title: 'Set a new title',
            input: 'text',
            inputAutoTrim: true,
            inputValue: title,
            confirmButtonText: 'Change!',
            confirmButtonColor: '#38c938',
            showCancelButton: true,
            cancelButtonColor: 'gray',
            cancelButtonText: 'Cancel'
        }).then(res => {
            
            const {isConfirmed, value} = res;
            
            if (isConfirmed) {

                if (value.length <= 3) {


                    Swal.fire({
                        title: 'Titles need to have at least 4 characters...',
                        icon: 'error',
                        timer: 3500,
                        showConfirmButton: false,
                    });
                    
                    return;
                }


                changeColumnTitle(value, columnId);
            }

            

        });
    }

    
    return (
        <>
            <div {...dragProps} className='projectTitle'>

                <p>{title}</p>

                <HiDotsHorizontal className='projectTitle__dots' onClick={() => setMenuIsOpened(prev => !prev)} />

                {menuIsOpened && (
                    <div className='projectTitle__menu'>
                        {/* <p className='projectTitle__menu__title-opt' onClick={() => {
                            setMenuIsOpened(false);
                            setTitleOptionSelected(true);

                        }}>Change title <span><GoPencil /></span></p> */}
                        <p className='projectTitle__menu__title-opt' onClick={() => launchChangeTitle()}>Change title <span><GoPencil /></span></p>
                        <p className='projectTitle__menu__delete-opt' onClick={() => launchWarning()}>Delete <span><BsTrashFill /></span></p>
                    </div>
                )}
            </div>
            {/* {titleOptionSelected && (
                <>
                    <Backdrop onClose={toggleTitleBox} />

                    <div className='projectTitle__change__menu'>
                        <p>Change the title for this column</p>
                        <input type="text" value={newTitle} onChange={newTitleChangeHandler} />
                        <div className='projectTitle__change__menu__actions'>
                            <button onClick={confirmTitleChange}>Change</button>
                            <button onClick={toggleTitleBox}>Cancel</button>
                        </div>
                    </div>
                </>
            )} */}
        </>
    )
}

export default ColumnTitle;
