import { Button, CircularProgress, Typography } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { isAuthorized, logout, isFetching } from '../../features/auth/authSlice';


const AuthButton = () => {
    const isAuth = useSelector(isAuthorized);
    const progress = useSelector(isFetching)
    const dispatch = useDispatch()
    const logoutJsx = <Typography color='textPrimary'>Logout</Typography>
    const loginJsx = <Typography color='textPrimary'>Login</Typography>
    const handleLogout = () => {
        if (!isAuth) {
            return
        }
        dispatch(logout())
    }

    return <>
        {progress ? <CircularProgress color='inherit' size={24} /> :
            <Button color='inherit' onClick={handleLogout}>{isAuth ? logoutJsx : loginJsx}</Button>}
    </>
}

export default AuthButton