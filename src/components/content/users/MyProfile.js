import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Redirect } from 'react-router'
import { authUser, getMyProfile, isFetching } from '../../../features/users/usersSlice'
import useNotAuth from '../../../hooks/useNotAuth'
import ProfilePreloader from './ProfilePreloader'


const MyProfile = () => {
    const dispatch = useDispatch()
    const redirect = useNotAuth()
    const profile = useSelector(authUser)
    const pending = useSelector(isFetching)
    console.log(profile)
    useEffect(
        () => {
            if (!profile && !pending.myProfileFetching) {
                dispatch(getMyProfile())
            }
        }, [profile, dispatch, pending.myProfileFetching]
    )
    if (redirect) return <Redirect to='/login' />
    if (pending.myProfileFetch) return <ProfilePreloader />
    if (!profile) return <></>
    return (
        <>
            <h1>{profile.alias}</h1>
            <h2>{profile.name} {profile.surname}</h2>
            <h2>{profile.email}</h2>
            <h3>Projects count: {profile.projectsCount}/{profile.projectsLimit} </h3>
        </>)
}

export default MyProfile