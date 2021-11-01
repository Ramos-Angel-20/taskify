import { createContext } from 'react';


const projectsContext = createContext({
    projects: [],
    tasks: [],
    lists: [],
    addProject: (title) => {},
    deleteProject: (id) => {},
    addTask: (title, body) => {},
    deleteTask: (id) => {}
});

export default projectsContext;