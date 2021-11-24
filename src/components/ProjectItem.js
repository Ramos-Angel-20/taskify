import { useHistory } from 'react-router-dom';

import { useContext } from 'react';

import ProjectsContext from '../context/projects-context';




const ProjectItem = ({ project }) => {
    

    const { getCurrentProject } = useContext(ProjectsContext);
    const history = useHistory();

    const projectRedirectHandler = () => {

        getCurrentProject(project.id);
        history.push(`/project/${project.id}`);


    }


    return (
        <div className='projectItem' onClick={projectRedirectHandler}>
            <div className='projectItem__image'>
                
            </div>
            
            <div className='projectItem__title'>
                {project.title}
            </div>
            <div className='projectItem__actions'>
                <button className='projectItem__actions__btn view'>View</button>
                <button className='projectItem__actions__btn delete'>Delete</button>
            </div>
        </div>
    )
}

export default ProjectItem;