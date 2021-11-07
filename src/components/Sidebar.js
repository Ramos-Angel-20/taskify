import { FiPlusSquare } from 'react-icons/fi';

import { useContext } from 'react';

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
                    <p>Proyects <span>(2)</span></p>
                    <FiPlusSquare className='sidebar__projects__header__icon'/>
                </div>

                <div className="sidebar__projects__list">
                    {projects.map(project => (
                        <div>
                            {project.description}
                        </div>
                    ))}
                </div>

            </div>

        </div>
    )
}

export default Sidebar;
