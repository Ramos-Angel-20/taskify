import { useContext, useEffect } from 'react';

import ProjectsContext from '../context/projects-context';
import ProjectItem from '../components/ProjectItem';

const Projects = () => {

    const { getProjects, projects } = useContext(ProjectsContext)

    useEffect(() => {

        getProjects('768e9997-b1dc-4534-81d3-e293a8ebd5c5');

    }, []);

    return (
        <div className='projects'>
            <div className='projects__content container'>
                {
                    projects.map(project => <ProjectItem key={project.id} project={project} />)
                }
            </div>
        </div>
    )
}

export default Projects;