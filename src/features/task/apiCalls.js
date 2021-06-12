import axiosInstance from '../axiosSettings'

//const tasksPath = id => `projects/${id}/tasks/`

const taskApi = {

    newTask(projectId, task) {
        return axiosInstance.post(`projects/${projectId}/tasks`, task).then(response => response.data)
    },
    getTasks(projectId,skip) {
        const path = `tasks?skip=${skip || 0}`
        return axiosInstance.get(`projects/${projectId}/${path}`)
    },
    editTask(projectId, taskId, task) {
        return axiosInstance.put(`projects/${projectId}/tasks/${taskId}`, task)
    },
    changeCompleteStatus(projectId, taskId, status) {
        return axiosInstance.put(`projects/${projectId}/tasks/${taskId}/status`, status)
    },
    deleteTask(projectId, taskId) {
        return axiosInstance.delete(`projects/${projectId}/tasks/${taskId}`)
    }
}

export default taskApi