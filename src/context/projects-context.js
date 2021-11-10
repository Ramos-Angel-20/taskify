import { createContext } from 'react';


const ProjectsContext = createContext({
    projects: [],
    tasks: {},
    columns: {},
    columnOrder: [],
    selectedProjectId: '',
    changeColumnOrder: (newOrderArray) => {},
    addProject: (title) => {},
    deleteProject: (id) => {},
    addTask: (columnId, description) => {},
    deleteTask: (id) => {},
    getProjects: (userId) => {},
    getCurrentProject: (projectId) => {},
    setColumns: (newColumns, columnId) => {},
    setTasks: (newTasks) => {} ,
    setCurrentProjectId: (id) => {}
});

export default ProjectsContext;