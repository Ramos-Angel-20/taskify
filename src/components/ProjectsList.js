import ProjectItem from '../components/ProjectItem';

const ProjectsList = ({ projects }) => {  

    return (
        <div className='projectsList'>
            {
                projects.map(project => <ProjectItem key={project.id} project={project} />)
            }
        </div>
    );
}

export default ProjectsList;