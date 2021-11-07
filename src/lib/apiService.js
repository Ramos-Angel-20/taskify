import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:4000/api/v1',
});


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