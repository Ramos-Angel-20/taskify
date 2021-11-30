import { useHistory } from 'react-router-dom';
import Swal from 'sweetalert2';

import { useContext } from 'react';

import ProjectsContext from '../context/projects-context';


const ProjectItem = ({ project }) => {
    

    const { getCurrentProject, deleteProject } = useContext(ProjectsContext);
    const history = useHistory();

    const projectRedirectHandler = () => {

        getCurrentProject(project.id);
        history.push(`/project/${project.id}`);
    }

    const deleteProjectHandler = () => { //TODO: Agregar logica en el backend y logica del reducer
        
        Swal.fire({
            icon: 'warning',
            title: 'Are you sure you want to delete this projects?',
            confirmButtonText: 'Yes, delete it!',
            confirmButtonColor: 'red',
            showCancelButton: true,
            cancelButtonColor: 'gray',
            cancelButtonText: 'Cancel'
        }).then(res => {
            const { isConfirmed } = res;

            deleteProject(project.id);
        });

    }


    return (
        <div className='projectItem'>
            <div className='projectItem__image'>
                
            </div>
            
            <div className='projectItem__title'>
                {project.title}
            </div>
            <div className='projectItem__actions'>
                <button className='projectItem__actions__btn view' onClick={projectRedirectHandler}>View</button>
                <button className='projectItem__actions__btn delete' onClick={deleteProjectHandler}>Delete</button>
            </div>
        </div>
    )
}

export default ProjectItem;