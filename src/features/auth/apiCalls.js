import axiosInstance from '../axiosSettings'

const authApi = {

    authMe() {
        return axiosInstance.get('authme').then(response => response.data)
    },
    logout() {
        return axiosInstance.delete('login')
    },
    login(email, password, rememberMe) {
        return axiosInstance.post('login', { email, password, rememberMe }).then(response => response.data)
    },
    signUp(name, surname, alias, email, password) {
        return axiosInstance.post('signup', { name, surname, alias, email, password }, { withCredentials: false })
    },
    forgotPassword(email) {
        return axiosInstance.put('login/forgotPassword', {email})
    }
}

export default authApi