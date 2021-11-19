import { createPortal } from 'react-dom';

const BackdropOverlay = ({ children }) => {
    return (
        <div className='backdrop'>
            {children}
        </div>
    )
}

const Backdrop = ({ children }) => createPortal(<BackdropOverlay>{children}</BackdropOverlay>, document.getElementById('backdrop-overlay'));

export default Backdrop;
