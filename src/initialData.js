// TODO: Manejar estos datos con Redux o con ContextAPI.


//Rellenaremos un sidebar con los proyectos por usuario.

const initialData = {
    tasks: {
        'task1': { id: 'task1', content: 'Crear el frontend' },
        'task2': { id: 'task2', content: 'Agregar la libreria react-beautiful-dnd' },
        'task3': { id: 'task3', content: 'Crear el backend' },
        'task4': { id: 'task4', content: 'Solucionar problemas de enlaces enlaces entre lista, tarea y proyecto' },
    },
    columns: {
        'column1': {
            id: 'column1',
            title: 'To do',
            taskIds: ['task1', 'task2', 'task3', 'task4']
        },
        'column2': {
            id: 'column2',
            title: 'In Progress',
            taskIds: []
        },
        'column3': {
            id: 'column3',
            title: 'Done',
            taskIds: []
        }
    },
    // Para facilitar el acomodo de las columnas
    columnOrder: ['column1', 'column2', 'column3']
};

export default initialData;