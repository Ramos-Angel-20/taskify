// TODO: Manejar estos datos con Redux o con ContextAPI.

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
        }
    },
    // Para facilitar el acomodo de las columnas
    columnOrder: ['column1']
};

export default initialData;