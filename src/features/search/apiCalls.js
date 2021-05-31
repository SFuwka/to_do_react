import axiosInstance from '../axiosSettings'

const searchApi = {
    search(context, text) {
        return axiosInstance.get(`search/?where=${context}&text=${text}`)
    }
}

export default searchApi