import { Card } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getUsers, isFetching, users } from '../../../features/users/usersSlice'

const Users = () => {
    const dispatch = useDispatch()
    const pending = useSelector(isFetching)
    const profiles = useSelector(users)
    console.log(profiles)

    useEffect(
        () => {
            if (!profiles.length && !pending.usersFetching) {
                dispatch(getUsers())
            }
        }, [profiles.length, pending.usersFetching, dispatch]
    )

    return (
        <>
            {profiles.map(profile => {
                console.log(profile)
                return <Card>
                    <h1>{profile.alias}</h1>
                    <h2>{profile.projectsCount}</h2>
                </Card>
            })}
        </>
    )
}

export default Users