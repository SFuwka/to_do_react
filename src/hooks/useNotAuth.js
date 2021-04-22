import { useSelector } from "react-redux"
import { isAuthorized, isFetching } from "../features/auth/authSlice"

const useNotAuth = () => {
    const isAuth = useSelector(isAuthorized)
    const progress = useSelector(isFetching)

    if (!isAuth && !progress) {
        return true
    }
    return false
}

export default useNotAuth