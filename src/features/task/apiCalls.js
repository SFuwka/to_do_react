import axiosInstance from '../axiosSettings'

const taskApi = {

    newTask(projectId, task) {
        return axiosInstance.post(`projects/${projectId}/tasks`, task).then(response => response.data)
    },
    // getTasks(userId, page, count) {
    //     const path = `projects/?page=${page || 1}&count=${count || 20}`
    //     if (!userId) {
    //         return axiosInstance.get(path)
    //     }
    //     return axiosInstance.get(`${userId}/${path}`)
    // },
    // getProject(projectId) {
    //     return axiosInstance.get(`projects/${projectId}`)
    // },
    // deleteProject(projectId) {
    //     return axiosInstance.delete(`projects/${projectId}`)
    // }
}

export default taskApi