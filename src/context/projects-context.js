import { createContext } from 'react';


const ProjectsContext = createContext({
    projects: [],
    tasks: {},
    columns: {},
    columnOrder: [],
    changeColumnOrder: (newOrderArray) => {},
    addProject: (title) => {},
    deleteProject: (id) => {},
    addTask: (title, body) => {},
    deleteTask: (id) => {},
    getProjects: (userId) => {},
    getCurrentProject: (projectId) => {},
    setColumns: (newColumns, columnId) => {},
    setTasks: (newTasks) => {} 
});

export default ProjectsContext;