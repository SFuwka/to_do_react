import axiosInstance from '../axiosSettings'

const authApi = {

    authMe() {
        return axiosInstance.get('authme').then(response => response.data)
    },
    logout() {
        return axiosInstance.delete('login')
    },
    login(email, password) {
        return axiosInstance.post('login', { email, password }).then(response => response.data)
    },
    signUp(name, surname, email, password) {
        return axiosInstance.post('signup', { name, surname, email, password }, { withCredentials: false })
    }
}

export default authApi