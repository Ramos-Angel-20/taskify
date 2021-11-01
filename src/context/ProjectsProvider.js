import { useReducer } from 'react';

//Actions constants.
const ADD_PROJECT = 'ADD_PROJECT';
const ADD_PROJECT_TASK = 'ADD_PROJECT_TASK';
const DELETE_PROJECT = 'DELETE_PROJECT';
const DELETE_PROJECT_TASK = 'DELETE_PROJECT_TASK';



/*

    project: [
        lists: [
            {
                listTitle: 'To Do',
                listId: '435-t35-hrt-mhkl8'
            },
            {
                listTitle: 'Under development',
                listId: ''435-t35-hrt-mhkl8 
            }
        ]
    ]

    {
        taskTitle: 'Crear login',
        taskBody: 'Crear la pantalla del login con OAuth2',
        taskId: '2e1r13f-f1ff-f31f13',
        projectId: 'listId',
    }
*/

const defaultProjectsState = {
    projects: []
};

const projectsReducer = (state, action) => {
    switch (action.type) {

        case ADD_PROJECT:
            return {
                ...state
            };
        /*
            El listGroup es el nombre de la lista, se la pasaremos a cada componente
            que contenga un ReactSortable, el action.payload sera todo el arreglo que
            recibe el ReactSortable en su atributo setList
            return {
                ...state,
                [listGroup]: action.payload
            }
        */
        case ADD_PROJECT_TASK:
            return {
                ...state
            };

        case DELETE_PROJECT:
            return {
                ...state
            };

        case DELETE_PROJECT_TASK: 
            return {
                ...state
            };


        default:
            return state;
    }
}

const ProjectsProvider = () => {

    const [projectState, dispatchProjectsAction] = useReducer(projectsReducer, defaultProjectsState);

    const addProjectHandler = (title) => {

    }

    const deleteProjectHandler = (id) => {

    }

    const addTaskHandler = (title, body, projectId) => {
        
    }

    const deleteTaskHandler = () => {

    }

    return {
        projects: projectState.projects
    }

}

export default ProjectsProvider;
