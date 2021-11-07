import { useReducer, useCallback } from 'react';

import ProjectsContext from './projects-context';
import { getProjects, getProjectData } from '../lib/apiService';

//Actions constants.
const ADD_PROJECT = 'ADD_PROJECT';
const ADD_PROJECT_TASK = 'ADD_PROJECT_TASK';
const DELETE_PROJECT = 'DELETE_PROJECT';
const DELETE_PROJECT_TASK = 'DELETE_PROJECT_TASK';
const GET_PROJECTS = 'GET_PROJECTS';
const GET_CURRENT_PROJECT = 'GET_CURRENT_PROJECT';
const CHANGE_COLUMN_ORDER = 'CHANGE_COLUMN_ORDER';
const SET_COLUMNS = 'SET_COLUMNS';
const SET_TASKS = 'SET_TASKS';


const defaultProjectsState = {
    projects: [],
    tasks: {},
    columns: {},
    columnOrder: [],
    selectedProjectId: ''
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

        case GET_PROJECTS:
            return {
                ...state,
                projects: action.payload
            }

        case GET_CURRENT_PROJECT:
            return {
                ...state,
                tasks: action.payload.tasks,
                columns: action.payload.columns,
                columnOrder: action.payload.columnOrder
            };

        case CHANGE_COLUMN_ORDER:
            return {
                ...state,
                columnOrder: action.payload.columnOrder
            };

        case SET_COLUMNS:
            const { columnId, newColumn } = action.payload;

            const newColumns = {
                ...state.columns,
                [columnId]: newColumn
            };  

            return {
                ...state,
                columns: newColumns
            };

        case SET_TASKS:
            const { startColumn, finishColumn } = action.payload;

            const reorderedColumn = {
                ...state.columns,
                [startColumn.id]: startColumn,
                [finishColumn.id]: finishColumn
            };

            console.log(reorderedColumn);            

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [startColumn.id]: startColumn,
                    [finishColumn.id]: finishColumn
                }
            };

        default:
            return state;
    }
}

const ProjectsProvider = props => {

    const [projectState, dispatchProjectsAction] = useReducer(projectsReducer, defaultProjectsState);

    const addProjectHandler = (title) => {

    }

    const deleteProjectHandler = (id) => {

    }

    const addTaskHandler = (title, body, projectId) => {

    }

    const deleteTaskHandler = () => {

    }



    const getProjectsHandler = userId => {

        getProjects(userId).then(res => {

            console.log(res);

        }).catch(err => {

            console.log(err);

        });
    }

    const getCurrentProjectHandler = useCallback((projectId) => {

        getProjectData(projectId).then(res => {
            
            const taskColumns = {};
            const tasksList = {};
            const columnOrder = [];

            
            for (const column of res.columns) {

                const columnId = column.id;
                columnOrder.push(columnId);

                let tasksIds = res.tasks.filter((task) => {

                    if (task.columnId === columnId) {
                        return task;
                    }

                });

                if (!tasksIds[0]) {
                    tasksIds = [];
                }

                const relatedTasks = tasksIds.map(item => item.id);

                taskColumns[columnId] = {
                    id: columnId,
                    title: column.title,
                    tasksIds: relatedTasks
                };
                // taskColumns[columnId] = {
                //     id: columnId,
                //     title: column.title,
                //     tasksIds: tasksIds
                // };
            }

            // Convertir la respuesta de tasks al formato que necesitamos...
            for (const task of res.tasks) {
                tasksList[task.id] = task;
            }

            console.log({...taskColumns})

            console.log({...tasksList});
            console.log({...taskColumns}); //FIXME: NO TRAE TODAS LAS TASKS DE TODAS LAS COLUMAS.
            console.log(columnOrder);
            
            

            dispatchProjectsAction({
                type: GET_CURRENT_PROJECT, payload: {
                    tasks: { ...tasksList },
                    columns: { ...taskColumns },
                    columnOrder: columnOrder
                }
            });

        }).catch(err => {
            console.log(err);
        });
    }, []);


    const columnOrderChangeHandler = (newColumnOrderArray) => {
        if (newColumnOrderArray.length < 1) {
            return;
        }

        dispatchProjectsAction({
            type: CHANGE_COLUMN_ORDER, payload: {
                columnOrder: newColumnOrderArray
            }
        });
    }
    //TODO: VAMOS AQUI
    const setColumnsHandler = (newColumn, columnId) => {
        dispatchProjectsAction({
            type: SET_COLUMNS, payload: {
                columnId: columnId,
                newColumn: newColumn
            }
        });
    }

    const setTasksHandler = (startColumn, finishColumn) => {

        dispatchProjectsAction({type: SET_TASKS, payload: {
            startColumn: startColumn,
            finishColumn: finishColumn
        }});
    }

    const context = {
        ...projectState,
        getProjects: getProjectsHandler,
        getCurrentProject: getCurrentProjectHandler,
        changeColumnOrder: columnOrderChangeHandler,
        setColumns: setColumnsHandler,
        setTasks: setTasksHandler
    };

    return (
        <ProjectsContext.Provider value={context}>
            {props.children}
        </ProjectsContext.Provider>
    );
}

export default ProjectsProvider;
