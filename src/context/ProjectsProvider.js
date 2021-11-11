import { useReducer, useCallback } from 'react';

import ProjectsContext from './projects-context';
import { getProjects, getProjectData, addTaskToList, deleteTaskFromList } from '../lib/apiService';

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
const SET_CURRENT_PROJECT_ID = 'SET_CURRENT_PROJECT_ID';


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

        case ADD_PROJECT_TASK:

            const newTask = {
                id: action.payload.id,
                description: action.payload.description
            };

            // Se actualizan las tasks.
            const newTasks = {
                ...state.tasks,
                [action.payload.id]: newTask
            };


            const mutatedColumn = state.columns[action.payload.columnId];
            mutatedColumn.tasksIds.push(action.payload.id);

            // Se actualizan las columnas
            const mutatedColumns = {
                ...state.columns,
                [action.payload.columnId]: mutatedColumn
            };


            return {
                ...state,
                tasks: newTasks,
                columns: mutatedColumns
            };

        case DELETE_PROJECT:
            return {
                ...state
            };

        case DELETE_PROJECT_TASK:   //TODO: Aqui vamos

            const { fromColumnId, deleteTaskId } = action.payload;

            const newTasksDelete = { ...state.tasks };
            delete newTasksDelete[deleteTaskId];


            //FIXME: FUNCIONA, PERO HAY QUE LIMPIAR ESTE CODIGO HEDIONDO...
            const actualColumns = { ...state.columns };
            const targetColumn = actualColumns[fromColumnId];
            const newTasksIdsArray = targetColumn.tasksIds.filter(id => id !== deleteTaskId);
            
            const updatedColumns = {
                ...state.columns,
                [fromColumnId]: {
                    ...targetColumn,
                    tasksIds: newTasksIdsArray
                }
            };


            return {
                ...state,
                tasks: newTasksDelete,
                columns: updatedColumns
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

            // const reorderedColumn = {
            //     ...state.columns,
            //     [startColumn.id]: startColumn,
            //     [finishColumn.id]: finishColumn
            // };

            return {
                ...state,
                columns: {
                    ...state.columns,
                    [startColumn.id]: startColumn,
                    [finishColumn.id]: finishColumn
                }
            };

        case SET_CURRENT_PROJECT_ID:
            return {
                ...state,
                selectedProjectId: action.payload
            }

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

    const addTaskHandler = (columnId, description) => {


        addTaskToList(columnId, description).then(res => {

            const { id, description, columnId } = res;
            dispatchProjectsAction({
                type: ADD_PROJECT_TASK, payload: {
                    id,
                    description,
                    columnId
                }
            });

        }).catch(err => {
            return;
        })
    }

    const deleteTaskHandler = (deleteTaskId, fromColumnId) => { //TODO: Aqui vamos

        deleteTaskFromList(deleteTaskId).then(res => {

            dispatchProjectsAction({ type: DELETE_PROJECT_TASK, payload: { deleteTaskId, fromColumnId } });

        }).catch(err => {
            return;
        });
    }

    const getCurrentProjectIdHandler = id => {
        dispatchProjectsAction({ type: SET_CURRENT_PROJECT_ID, payload: id });
    }

    const getProjectsHandler = userId => {

        getProjects(userId).then(res => {

            dispatchProjectsAction({ type: GET_PROJECTS, payload: res });

        }).catch(err => {

            dispatchProjectsAction({ type: GET_PROJECTS, payload: [] });

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
            }

            // Convertir la respuesta de tasks al formato que necesitamos...
            for (const task of res.tasks) {
                tasksList[task.id] = task;
            }

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

    const setColumnsHandler = (newColumn, columnId) => {
        dispatchProjectsAction({
            type: SET_COLUMNS, payload: {
                columnId: columnId,
                newColumn: newColumn
            }
        });
    }

    const setTasksHandler = (startColumn, finishColumn) => {

        dispatchProjectsAction({
            type: SET_TASKS, payload: {
                startColumn: startColumn,
                finishColumn: finishColumn
            }
        });
    }

    const context = {
        ...projectState,
        getProjects: getProjectsHandler,
        getCurrentProject: getCurrentProjectHandler,
        changeColumnOrder: columnOrderChangeHandler,
        setColumns: setColumnsHandler,
        setTasks: setTasksHandler,
        setCurrentProjectId: getCurrentProjectIdHandler,
        addTask: addTaskHandler,
        deleteTask: deleteTaskHandler,

    };

    return (
        <ProjectsContext.Provider value={context}>
            {props.children}
        </ProjectsContext.Provider>
    );
}

export default ProjectsProvider;
