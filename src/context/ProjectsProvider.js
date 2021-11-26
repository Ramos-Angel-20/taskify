import { useReducer, useCallback } from 'react';

import ProjectsContext from './projects-context';
import {
    getProjects,
    getProjectData,
    addTaskToList,
    deleteTaskFromList,
    addListToProject,
    deleteColumnFromProject,
    changeColumnTitle,
    addProject
} from '../lib/apiService';
import Swal from 'sweetalert2';

//Actions constants.
const ADD_PROJECT = 'ADD_PROJECT';
const ADD_TO_PROJECT_TASK = 'ADD_TO_PROJECT_TASK';
const DELETE_PROJECT = 'DELETE_PROJECT';
const DELETE_PROJECT_TASK = 'DELETE_PROJECT_TASK';
const GET_PROJECTS = 'GET_PROJECTS';
const GET_CURRENT_PROJECT = 'GET_CURRENT_PROJECT';
const CHANGE_COLUMN_ORDER = 'CHANGE_COLUMN_ORDER';
const SET_COLUMNS = 'SET_COLUMNS';
const SET_TASKS = 'SET_TASKS';
const SET_CURRENT_PROJECT_ID = 'SET_CURRENT_PROJECT_ID';
const ADD_COLUMN = 'ADD_COLUMN';
const DELETE_COLUMN = 'DELETE_COLUMN';
const CHANGE_COLUMN_TITLE = 'CHANGE_COLUMN_TITLE';
const RESET_SELECTED_PROJECT = 'RESET_SELECTED_PROJECT';


const defaultProjectsState = {
    projects: [],
    tasks: {},
    columns: {},
    columnOrder: [],
    selectedProjectId: '',
    selectedProjectTitle: '',
    projectsQty: 0,
};

const projectsReducer = (state, action) => {

    //TODO: Probar que todo funcione bien con if-else y cambiar los nombres de las variables, para que sean menos enredosos.


    if (action.type === RESET_SELECTED_PROJECT) {
        return {
            ...state,
            tasks: {},
            columns: {},
            columnOrder: [],
            selectedProjectId: '',
            selectedProjectTitle: ''
        };
    }

    if (action.type === ADD_PROJECT) {

        const newProject = {
            id: action.payload.id,
            title: action.payload.title
        }

        const newProjects = [ ...state.projects ];
        newProjects.push(newProject);


        const newProjectsQty = state.projectsQty + 1;

        return {
            ...state,
            projects: newProjects,
            projectsQty: newProjectsQty
        };
    }

    if (action.type === ADD_COLUMN) {

        const newColumnsBeforeAdd = {
            ...state.columns,
            [action.payload.columnId]: {
                id: action.payload.columnId,
                title: action.payload.title,
                tasksIds: []
            }
        }

        const newColumnOrder = [...state.columnOrder, action.payload.columnId];

        return {
            ...state,
            columns: newColumnsBeforeAdd,
            columnOrder: newColumnOrder

        };
    }


    if (action.type === ADD_TO_PROJECT_TASK) {
        const newTask = {
            id: action.payload.id,
            description: action.payload.description,
            createdAt: action.payload.createdAt
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
    }


    if (action.type === DELETE_PROJECT) {

        return {
            ...state
        }

    }

    if (action.type === DELETE_PROJECT_TASK) {

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

    }

    if (action.type === DELETE_COLUMN) {

        const targetdDeleteColumnId = action.payload.columnId;

        // Borrar la columna.
        const newColumnsBeforeDelete = {
            ...state.columns
        };
        delete newColumnsBeforeDelete[targetdDeleteColumnId];

        // Borrar las tasks.
        const newTasksBeforeColumnDelete = { ...state.tasks };

        for (const id of action.payload.tasksIds) {
            delete newTasksBeforeColumnDelete[id];
        }

        //Borrar la columna del arreglo de columnOrder...
        const newColumnOrderBeforeDelete = state.columnOrder.filter(id => id !== targetdDeleteColumnId);

        return {
            ...state,
            columns: newColumnsBeforeDelete,
            tasks: newTasksBeforeColumnDelete,
            columnOrder: newColumnOrderBeforeDelete
        };

    }

    if (action.type === CHANGE_COLUMN_TITLE) {

        const { newTitle, targetColumnId } = action.payload;

        const newColumnsBeforeUpdatedTitle = { ...state.columns };
        const targetColumnToChangeTitle = newColumnsBeforeUpdatedTitle[targetColumnId];
        targetColumnToChangeTitle.title = newTitle;



        return {
            ...state,
            columns: newColumnsBeforeUpdatedTitle
        };

    }

    if (action.type === GET_PROJECTS) {

        const projectsQty = action.payload.length;
        return {
            ...state,
            projects: action.payload,
            projectsQty: projectsQty
        };

    }

    if (action.type === GET_CURRENT_PROJECT) {
        return {
            ...state,
            selectedProjectTitle: action.payload.projectTitle,
            tasks: action.payload.tasks,
            columns: action.payload.columns,
            columnOrder: action.payload.columnOrder
        };
    }

    if (action.type === CHANGE_COLUMN_ORDER) {

        return {
            ...state,
            columnOrder: action.payload.columnOrder
        };

    }

    if (action.type === SET_COLUMNS) {
        const { columnId, newColumn } = action.payload;

        const newColumns = {
            ...state.columns,
            [columnId]: newColumn
        };

        return {
            ...state,
            columns: newColumns
        };
    }

    if (action.type === SET_TASKS) {

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

    }

    if (action.type === SET_CURRENT_PROJECT_ID) {

        return {
            ...state,
            selectedProjectId: action.payload
        };
    }

    return {
        ...state
    };


    // switch (action.type) {

    // case ADD_PROJECT:
    //     return {
    //         ...state
    //     };

    // case ADD_COLUMN:

    //     const newColumnsBeforeAdd = {
    //         ...state.columns,
    //         [action.payload.columnId]: {
    //             id: action.payload.columnId,
    //             title: action.payload.title,
    //             tasksIds: []
    //         }
    //     }

    //     const newColumnOrder = [...state.columnOrder, action.payload.columnId];

    //     return {
    //         ...state,
    //         columns: newColumnsBeforeAdd,
    //         columnOrder: newColumnOrder

    //     };

    // case ADD_TO_PROJECT_TASK:

    //     const newTask = {
    //         id: action.payload.id,
    //         description: action.payload.description,
    //         createdAt: action.payload.createdAt
    //     };

    //     // Se actualizan las tasks.
    //     const newTasks = {
    //         ...state.tasks,
    //         [action.payload.id]: newTask
    //     };


    //     const mutatedColumn = state.columns[action.payload.columnId];
    //     mutatedColumn.tasksIds.push(action.payload.id);

    //     // Se actualizan las columnas
    //     const mutatedColumns = {
    //         ...state.columns,
    //         [action.payload.columnId]: mutatedColumn
    //     };


    //     return {
    //         ...state,
    //         tasks: newTasks,
    //         columns: mutatedColumns
    //     };

    // case DELETE_PROJECT:
    //     return {
    //         ...state
    //     };

    // case DELETE_PROJECT_TASK:

    //     const { fromColumnId, deleteTaskId } = action.payload;

    //     const newTasksDelete = { ...state.tasks };
    //     delete newTasksDelete[deleteTaskId];


    //     //FIXME: FUNCIONA, PERO HAY QUE LIMPIAR ESTE CODIGO HEDIONDO...
    //     const actualColumns = { ...state.columns };
    //     const targetColumn = actualColumns[fromColumnId];
    //     const newTasksIdsArray = targetColumn.tasksIds.filter(id => id !== deleteTaskId);

    //     const updatedColumns = {
    //         ...state.columns,
    //         [fromColumnId]: {
    //             ...targetColumn,
    //             tasksIds: newTasksIdsArray
    //         }
    //     };


    //     return {
    //         ...state,
    //         tasks: newTasksDelete,
    //         columns: updatedColumns
    //     };

    // case DELETE_COLUMN:
    //     const targetdDeleteColumnId = action.payload.columnId;

    //     // Borrar la columna.
    //     const newColumnsBeforeDelete = {
    //         ...state.columns
    //     };
    //     delete newColumnsBeforeDelete[targetdDeleteColumnId];

    //     // Borrar las tasks.
    //     const newTasksBeforeColumnDelete = { ...state.tasks };

    //     for (const id of action.payload.tasksIds) {
    //         delete newTasksBeforeColumnDelete[id];
    //     }

    //     //Borrar la columna del arreglo de columnOrder...
    //     const newColumnOrderBeforeDelete = state.columnOrder.filter(id => id !== targetdDeleteColumnId);

    //     return {
    //         ...state,
    //         columns: newColumnsBeforeDelete,
    //         tasks: newTasksBeforeColumnDelete,
    //         columnOrder: newColumnOrderBeforeDelete
    //     };

    // case CHANGE_COLUMN_TITLE: //TODO: VAMOS AQUI

    //     const { newTitle, targetColumnId } = action.payload;

    //     const newColumnsBeforeUpdatedTitle = { ...state.columns };
    //     const targetColumnToChangeTitle = newColumnsBeforeUpdatedTitle[targetColumnId];
    //     targetColumnToChangeTitle.title = newTitle;



    //     return {
    //         ...state,
    //         columns: newColumnsBeforeUpdatedTitle
    //     };

    // case GET_PROJECTS:
    //     return {
    //         ...state,
    //         projects: action.payload
    //     };

    // case GET_CURRENT_PROJECT:
    //     return {
    //         ...state,
    //         selectedProjectTitle: action.payload.projectTitle,
    //         tasks: action.payload.tasks,
    //         columns: action.payload.columns,
    //         columnOrder: action.payload.columnOrder
    //     };

    // case CHANGE_COLUMN_ORDER:
    //     return {
    //         ...state,
    //         columnOrder: action.payload.columnOrder
    //     };

    // case SET_COLUMNS:
    //     const { columnId, newColumn } = action.payload;

    //     const newColumns = {
    //         ...state.columns,
    //         [columnId]: newColumn
    //     };

    //     return {
    //         ...state,
    //         columns: newColumns
    //     };

    // case SET_TASKS:
    //     const { startColumn, finishColumn } = action.payload;

    //     // const reorderedColumn = {
    //     //     ...state.columns,
    //     //     [startColumn.id]: startColumn,
    //     //     [finishColumn.id]: finishColumn
    //     // };

    //     return {
    //         ...state,
    //         columns: {
    //             ...state.columns,
    //             [startColumn.id]: startColumn,
    //             [finishColumn.id]: finishColumn
    //         }
    //     };

    // case SET_CURRENT_PROJECT_ID:
    //     return {
    //         ...state,
    //         selectedProjectId: action.payload
    //     }

    //     default:
    //         return state;
    // }
}

const ProjectsProvider = props => {

    const [projectState, dispatchProjectsAction] = useReducer(projectsReducer, defaultProjectsState);

    const resetSelectedProjectHandler = () => {
        dispatchProjectsAction({ type: RESET_SELECTED_PROJECT });
    }

    const addProjectHandler = (title) => {

        addProject(title).then(res => {

            if (res.createdProject) {

                dispatchProjectsAction({ type: ADD_PROJECT, payload: res.createdProject });

                Swal.fire({
                    title: `Project ${title} succesfully added`,
                    icon: 'success',
                    timer: 2500,
                    showConfirmButton: false,

                });

                return;
            }

            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                showConfirmButton: false,
                timer: 3000
            });


        }).catch(err => {
            console.log(err);

            Swal.fire({
                icon: 'error',
                title: 'Something went wrong',
                showConfirmButton: false,
                timer: 3000
            });
        });
    }

    const deleteProjectHandler = (id) => {

    }

    const addTaskHandler = (columnId, description) => {


        addTaskToList(columnId, description).then(res => {
            console.log(res);

            const { id, description, columnId, createdAt } = res;
            dispatchProjectsAction({
                type: ADD_TO_PROJECT_TASK, payload: {
                    id,
                    description,
                    columnId,
                    createdAt
                }
            });

        }).catch(err => {
            return;
        })
    }

    const deleteTaskHandler = (deleteTaskId, fromColumnId) => {

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
                    projectTitle: res.project.title,
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

    const addColumnHandler = title => {
        addListToProject(title, projectState.selectedProjectId).then(res => {
            console.log(res);
            dispatchProjectsAction({
                type: ADD_COLUMN, payload: {
                    columnId: res.id,
                    title: res.title
                }
            });


        }).catch(err => {
            console.log(err);

            return;
        });
    }

    const deleteColumnHandler = (columnId, tasks) => {

        const tasksIds = tasks.map(task => task.id);



        deleteColumnFromProject(columnId, tasksIds).then(res => {

            dispatchProjectsAction({
                type: DELETE_COLUMN, payload: {
                    columnId,
                    tasksIds
                }
            });

        }).catch(err => {

            console.log(err);

        });
    }

    const changeColumnTitleHandler = (title, columnId) => { //TODO: VAMOS AQUI...

        changeColumnTitle(title, columnId).then(res => {


            dispatchProjectsAction({
                type: CHANGE_COLUMN_TITLE, payload: {
                    newTitle: title,
                    targetColumnId: columnId
                }
            });


        }).catch(err => {
            console.log(err);
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
        addColumn: addColumnHandler,
        deleteColumn: deleteColumnHandler,
        changeColumnTitle: changeColumnTitleHandler,
        addProject: addProjectHandler,
        resetSelectedProject: resetSelectedProjectHandler,
        deleteProject: deleteProjectHandler,
    };

    return (
        <ProjectsContext.Provider value={context}>
            {props.children}
        </ProjectsContext.Provider>
    );
}

export default ProjectsProvider;