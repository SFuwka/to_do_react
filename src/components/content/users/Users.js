import { Card } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { getUsers, isFetching, users } from '../../../features/users/usersSlice'
import { linkStyle } from '../../commonStyles'

const Users = () => {
    const dispatch = useDispatch()
    const pending = useSelector(isFetching)
    const profiles = useSelector(users)

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
                return <Card key={profile._id}>
                    <NavLink style={linkStyle} to={`users/${profile._id}`}><h1>{profile.alias}</h1></NavLink>
                    <h2>Projects count: {profile.projectsCount}</h2>
                </Card>
            })}
        </>
    )
}

export default Users