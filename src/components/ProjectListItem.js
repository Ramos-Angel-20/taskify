import { useContext } from 'react';

import ProjectsContext from '../context/projects-context';

const ProjectListItem = ({ title, id }) => {

    const { setCurrentProjectId, selectedProjectId } = useContext(ProjectsContext);

    return (
        <div className={`${selectedProjectId === id ? 'projectListItem-selected' : 'projectListItem'}`} onClick={() => setCurrentProjectId(id)}>
            <div className='projectItem__title'>
                <p>{title}</p>
            </div>
        </div>
    );
}

export default ProjectListItem;