import { HiHome } from 'react-icons/hi';
import { useHistory } from 'react-router';

import { useContext } from 'react';

import ProjectsContext from '../context/projects-context';

const ProjectNavbar = () => {
    
    const { selectedProjectTitle, resetSelectedProject } = useContext(ProjectsContext);
    const history = useHistory()

    const homeRedirectHandler = () => {
        history.replace('/projects');
        resetSelectedProject();
    }

    return (
        <div className='projectNavbar'>

            <div className='projectNavbar__content container'>
                <button className="projectNavbar__btn" onClick={homeRedirectHandler}>
                    <HiHome />
                </button>
                <p>{selectedProjectTitle}</p>
            </div>
        </div>
    );
}

export default ProjectNavbar;