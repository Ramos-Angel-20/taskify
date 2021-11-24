import Swal from 'sweetalert2';
import { MdAddCircle } from 'react-icons/md';

import { useContext, useEffect } from 'react';

import ProjectsContext from '../context/projects-context';
import ProjectsList from '../components/ProjectsList';



const ProjectsPage = () => {

    const { getProjects, projects, projectsQty, addProject } = useContext(ProjectsContext);


    useEffect(() => {

        getProjects('74792b3b-ab74-4d03-a6e9-e9dd02881217');

    }, []);

    const addProjectsHandler = () => {
        Swal.fire({
            title: 'Project title',
            input: 'text',
            inputAutoTrim: true,
            inputPlaceholder: 'An awesome title...',
            confirmButtonText: 'Add',
            confirmButtonColor: '#38c938',
            showCancelButton: true,
            cancelButtonText: 'Cancel',
            customClass: {
                title: 'genericModal__title',


            },
            buttonsStyling: true
        }).then(res => {

            const { isConfirmed, isDenied, isDismissed, value } = res;
        
            if (isConfirmed) {
                
                if (value !== '') {

                    addProject(value);
                    return;
                }

                Swal.fire({
                    title: 'Empty titles are not allowed',
                    icon: 'error',
                    confirmButtonColor: 'red'
                });
            }
        });
    }

    return (
        <div className='projectsPage'>

            <div className='projectsPage__content container'>

                <div className='projectsPage__content__title'>
                    <p>Welcome back, Angel!</p>

                    <div className='projectsPage__content__actions'>
                        <MdAddCircle className='projectsPage__content__actions__icon' onClick={addProjectsHandler} />
                        <p>Projects<span>({projectsQty})</span></p>
                    </div>
                </div>

                <ProjectsList projects={projects} />
            </div>
        </div>
    )
}

export default ProjectsPage;