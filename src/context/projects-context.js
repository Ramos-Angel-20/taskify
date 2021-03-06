import { createContext } from 'react';


const ProjectsContext = createContext({
    projects: [],
    tasks: {},
    columns: {},
    columnOrder: [],
    selectedProjectId: '',
    selectedProjectTitle: '',
    projectsQty: 0,
    changeColumnOrder: (newOrderArray) => {},
    addProject: (title) => {},
    deleteProject: (id) => {},
    addTask: (columnId, description) => {},
    deleteTask: (taskId, columnId, index) => {},
    getProjects: (userId) => {},
    getCurrentProject: (projectId) => {},
    setColumns: (newColumns, columnId) => {},
    setTasks: (newTasks) => {} ,
    setCurrentProjectId: (id) => {},
    addColumn: (title) => {},
    deleteColumn: (columnId, tasksIds) => {},
    changeColumnTitle: (title) => {},
    resetSelectedProject: () => {},
});

export default ProjectsContext;