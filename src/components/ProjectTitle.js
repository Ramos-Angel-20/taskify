import toast, { Toaster } from 'react-hot-toast';
import { HiDotsHorizontal } from 'react-icons/hi';
import { GoAlert } from 'react-icons/go';


import { useState } from 'react';


const ProjectTitle = ({ title, dragProps, onDelete }) => {

    const [menuIsOpened, setMenuIsOpened] = useState(false);

    const openMenuChangeHandler = () => {
        setMenuIsOpened(prevState => !prevState);
    }

    const columnDeleteHandler = () => {
        toast.dismiss();
        onDelete();
    }

    const launchWarning = () => {
        setMenuIsOpened(false); //FIXME: Hace muchos renders.

        const toastId = toast((t) => (
            <div className='toast__warning'>
                <p className='toast__warning__title'> <span> <GoAlert /> </span>Warning</p>
                <p>This will delete all the tasks within the selected column</p>
                <div className='toast__warning__actions'>
                    <button className='toast__warning__delete' onClick={() => columnDeleteHandler()}>Delete</button>
                    <button className='toast__warning__cancel' onClick={() => toast.dismiss(toastId)}>Cancel</button>
                </div>
            </div>
        ), {
            style: {
                background: 'rgb(233, 227, 200)'
            }
        });


    }

    return (
        <>
            <div {...dragProps} className='projectTitle'>
                <p>{title}</p>
                <HiDotsHorizontal className='projectTitle__dots' onClick={() => openMenuChangeHandler()} />
                {menuIsOpened && (
                    <div className='projectTitle__menu'>
                        <p className='projectTitle__menu__title-opt'>Change title</p>
                        <p className='projectTitle__menu__delete-opt' onClick={() => launchWarning()}>Delete</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default ProjectTitle
