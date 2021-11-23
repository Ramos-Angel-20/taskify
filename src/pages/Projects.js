import { useContext, useEffect } from 'react';

import ProjectsContext from '../context/projects-context';
import ProjectItem from '../components/ProjectItem';

const Projects = () => {

    const { getProjects, projects } = useContext(ProjectsContext)

    useEffect(() => {

        getProjects('c2b667d4-5e8f-4118-b055-d39835e6c965');

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