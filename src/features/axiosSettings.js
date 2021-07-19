import * as axios from 'axios'

const axiosInstance = process.env.NODE_ENV === 'production'
    ? axios.create({
        withCredentials: true,
        baseURL: `${process.env.REACT_APP_API_ADRESS}/api/`
    })
    : axios.create({
        withCredentials: true,
        baseURL: `${process.env.REACT_APP_API_ADRESS_DEV}/api/`
    })

export default axiosInstance