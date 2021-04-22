import React from 'react'
import { Redirect } from 'react-router'
import useNotAuth from '../../../hooks/useNotAuth'

const MyProfile = ()=>{
    const redirect = useNotAuth()
    if (redirect) return <Redirect to='/login'/>
    return (
        <h1>My Profile</h1>
    )
}

export default MyProfile