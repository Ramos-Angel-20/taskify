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
            <div className='projectItem__title'>
                {project.title}
            </div>
        </div>
    )
}

export default ProjectItem;