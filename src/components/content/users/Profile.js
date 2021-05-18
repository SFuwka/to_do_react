import { Card } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { activeUser, clearActiveUser, getUser, isFetching } from '../../../features/users/usersSlice'

const Profile = () => {
    const { userId } = useParams()
    const profie = useSelector(activeUser)
    const pending = useSelector(isFetching)
    const dispatch = useDispatch()

    useEffect(
        () => {
            if (!profie && !pending.activeUserFetching) {
                dispatch(getUser(userId))
            }
        }, [dispatch, pending.activeUserFetching, profie, userId]

    )
    //Component unmount
    useEffect(() => {
        return () => {
            dispatch(clearActiveUser())
        }
    }, [dispatch])

    if (!profie) return <></>

    return (
        <>
            <h1>{profie.user.alias}</h1>
            {profie.projects.map(project => {
                console.log(project)
                return <Card style={{ marginTop: 10 }}>{project.projectName}</Card >
            })}
        </>
    )
}

export default Profile