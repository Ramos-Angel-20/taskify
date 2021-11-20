import { createPortal } from 'react-dom';

const BackdropOverlay = props => {
    return (
        <div className='backdrop' onClick={() => props.onClose()}>
            
        </div>
    )
}

const Backdrop = (props) => createPortal(<BackdropOverlay onClose={props.onClose}/>, document.getElementById('backdrop-overlay'));

export default Backdrop;
