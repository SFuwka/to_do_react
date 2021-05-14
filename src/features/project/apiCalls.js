import axiosInstance from '../axiosSettings'

const projectApi = {

    newProject(project) {
        return axiosInstance.post('projects', project).then(response => response.data)
    },
    getProjects(userId, page, count) {
        const path = `projects/?page=${page || 1}&count=${count || 20}`
        if (!userId) {
            return axiosInstance.get(path)
        }
        return axiosInstance.get(`${userId}/${path}`)
    },
    getProject(projectId) {
        return axiosInstance.get(`projects/${projectId}`)
    },
    deleteProject(projectId) {
        return axiosInstance.delete(`projects/${projectId}`)
    },
    editProject(project) {
        return axiosInstance.put(`projects/${project._id}`, project)
    },
}

export default projectApi