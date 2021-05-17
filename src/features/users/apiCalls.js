import axiosInstance from '../axiosSettings'


const usersApi = {

    getMyProfile() {
        return axiosInstance.get(`user/home`).then(response => response.data)
    },

}

export default usersApi