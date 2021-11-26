import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
});


//TODO: Pasarle el userId de forma correcta
export const addProject = async title => {

    try {
        
        const response = await api.post('/projects', {
            projectTitle: title,
            userId: '553a5dfc-01c1-4064-b687-06d40eb4da3f'
        });

        if (response.status !== 201) {
            throw new Error('An error occurred while creating the new project');
        }

        const result = response.data;
        return result;
    
    } catch (error) {
        return error.message;
    }
}

export const getProjects = async userId => {
    try {

        const response = await api.get(`/projects/${userId}`);

        if (response.status !== 200) {
            throw new Error('Unable to get the projects');
        }

        const result = response.data;
        return result;

    } catch (error) {
        return error.message;
    }
}

export const getProjectData = async projectId => {
    try {

        const response = await api.get(`/project/${projectId}`);

        if (response.status !== 200) {
            throw new Error('Unable to get project data');
        }

        const result = response.data;
        return result;

    } catch (error) {
        return error.message;
    }
}

export const changeTaskFromList = async (taskId, columnId) => {

    try {
        
        const response = await api.put(`/task/${taskId}`, {
            body: {
                columnId: String(columnId)
            }
        });

        if (response.status !== 201) {
            throw new Error('Error while moving the task from column');
        }

        const result = response.data;
        return result;


    } catch (error) {
        return error.message;
    }
}

export const addTaskToList = async (columnId, description) => {
    try {
        
        const response = await api.post('/task', {
            columnId,
            description
        });

        if (response.status !== 201) {
            throw new Error('An error ocurred while creating the task');
        }

        const result = response.data;
        return result;

    } catch (error) {
        return error.message;
    }
}

export const deleteTaskFromList = async taskId => {
    
    try {
        
        const response = await api.delete(`/task/${taskId}`);

        if (response.status !== 201) {
            throw new Error('An error ocurred while deleting the task');
        }

        const result = response.data;
        return result;

    } catch (error) {
        return error.message;
    }

}

export const addListToProject = async (title, projectId) => {
    console.log(title, projectId);

    try {
        
        const response = await api.post(`/column/${projectId}`, {
            columnTitle: title
        });

        if (response.status !== 201) {
            throw new Error('An error ocurred while creating the new column');
        }
    
        const result = response.data;
        return result;

    } catch (error) {
        return error.message;    
    }
}

export const deleteColumnFromProject = async (columnId, tasksIds) => {
    
    console.log(tasksIds);
    try {

        //Usamos el metodo PUT en lugar de delete, esto porque delete no permite un body
        const response = await api.put(`/column/${columnId}`, {
            tasksIds
        });

        if (response.status !== 201) {
            throw new Error('Something went wrong while deleting the column');
        }

        const result = response.data;
        return result;
        

    } catch (error) {
        return error.message;
    }
}

export const changeColumnTitle = async (newTitle, columnId) => {
    
    try {
    
        const response = await api.patch(`/column/${columnId}`, {
            newTitle
        });

        
        
    } catch (error) {
        
    }
}