import axiosInstance from '../axiosSettings'

const searchApi = {
    search(context, pattern) {
        return axiosInstance.get(`search/?where=${context}&pattern=${pattern}`)
    }
}

export default searchApi