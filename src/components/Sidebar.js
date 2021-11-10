import { FiPlusSquare } from 'react-icons/fi';

import { useContext } from 'react';

import ProjectListItem from './ProjectListItem';
import ProjectsContext from '../context/projects-context';

const Sidebar = () => {

    const { projects } = useContext(ProjectsContext);

    return (
        <div className='sidebar'>
            <div className="sidebar__username">
                <p>TaskUp</p>
                <p>Angel Ramos</p>
            </div>

            <div className="sidebar__projects">


                <div className="sidebar__projects__header">
                    <p>Proyects <span>({projects.length})</span></p>
                    <FiPlusSquare className='sidebar__projects__header__icon'/>
                </div>

                <div className="sidebar__projects__list">
                    {projects.map(project => (
                        <ProjectListItem key={project.id} title={project.title} id={project.id}/>
                    ))}
                </div>

            </div>

        </div>
    );
}

export default Sidebar;
