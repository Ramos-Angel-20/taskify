import toast from 'react-hot-toast';
import { HiDotsHorizontal } from 'react-icons/hi';
import { GoAlert, GoPencil } from 'react-icons/go';
import { BsTrashFill } from 'react-icons/bs';

import { useState, useContext } from 'react';

import ProjectsContext from '../context/projects-context';
import Backdrop from './Backdrop';

const ColumnTitle = ({ title, dragProps, onDelete, columnId }) => {

    const [menuIsOpened, setMenuIsOpened] = useState(false);
    const [newTitle, setNewTitle] = useState(title);
    const [titleOptionSelected, setTitleOptionSelected] = useState(false);

    const { changeColumnTitle } = useContext(ProjectsContext);




    const columnDeleteHandler = () => {
        toast.dismiss();
        onDelete();
    }




    const launchWarning = () => {

        toast.dismiss(); // Limpiamos los toasts que esten en pantalla.

        setMenuIsOpened(false);

        const toastId = toast(t => (
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






    const newTitleChangeHandler = e => {
        setNewTitle(e.target.value);
    }





    const toggleTitleBox = () => {
        setTitleOptionSelected(prevState => !prevState);
    }






    const confirmTitleChange = () => {
        if (newTitle.length < 1) { // TODO: Agregar validación... 
            return;
        }

        changeColumnTitle(newTitle, columnId);
        toggleTitleBox();
    }


    /*
        REVISAR QUE EL BOTON DE "DOTS" NO TENGA BUGS.
        AGREGAR UN BACKDROP INVISIBLE PARA SIMULAR UN BLUR DEL MENU QUE SALE DEL BOTON DOTS.
    */
    return (
        <>
            <div {...dragProps} className='projectTitle'>

                <p>{title}</p>

                <HiDotsHorizontal className='projectTitle__dots' onClick={() => setMenuIsOpened(prev => !prev)} />

                {menuIsOpened && (
                    <div className='projectTitle__menu'>
                        <p className='projectTitle__menu__title-opt' onClick={() => {
                            setMenuIsOpened(false);
                            setTitleOptionSelected(true);
                            toast.dismiss();
                        }}>Change title <span><GoPencil /></span></p>
                        <p className='projectTitle__menu__delete-opt' onClick={() => launchWarning()}>Delete <span><BsTrashFill /></span></p>
                    </div>
                )}
            </div>
            {titleOptionSelected && (
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
            )}
        </>
    )
}

export default ColumnTitle;
