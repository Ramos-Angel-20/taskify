import { useContext, useEffect } from 'react';

import ProjectsContext from '../context/projects-context';
import ProjectsList from '../components/ProjectsList';


const ProjectsPage = () => {

    const { getProjects, projects } = useContext(ProjectsContext)

    useEffect(() => {

        getProjects('1e89ca60-a25a-4d39-8f00-d5bd0123206e');

    }, []);

    return (
        <div className='page'>

            <div className='page__content container'>

                <div className='page__content__title'>
                    <p>Welcome back Angel!</p>
                </div>

                <ProjectsList projects={projects}/>
            </div>
        </div>
    )
}

export default ProjectsPage;