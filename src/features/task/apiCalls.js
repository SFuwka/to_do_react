import axiosInstance from '../axiosSettings'

//const tasksPath = id => `projects/${id}/tasks/`

const taskApi = {

    newTask(projectId, task) {
        return axiosInstance.post(`projects/${projectId}/tasks`, task).then(response => response.data)
    },
    getTasks(projectId, page, count) {
        const path = `tasks?page=${page || 1}&count=${count || 20}`
        return axiosInstance.get(`projects/${projectId}/${path}`)
    },
    editTask(projectId, taskId, task) {
        return axiosInstance.put(`projects/${projectId}/tasks/${taskId}`, task)
    },
    deleteTask(projectId, taskId) {
        return axiosInstance.delete(`projects/${projectId}/tasks/${taskId}`)
    }
}

export default taskApi