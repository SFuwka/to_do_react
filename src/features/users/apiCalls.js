import axiosInstance from '../axiosSettings'


const usersApi = {

    getMyProfile() {
        return axiosInstance.get(`user/home`).then(response => response.data)
    },
    getUsers() {
        return axiosInstance.get(`user/`).then(response => response.data)
    },
    getUser(userId) {
        return axiosInstance.get(`user/${userId}`).then(response => response.data)
    }

}

export default usersApi