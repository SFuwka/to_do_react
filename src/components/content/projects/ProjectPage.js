import { Button, Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { activeProject, clearError, error, getProject, getProjectById, setActiveProject } from '../../../features/project/projectSlice'
import Tasks from '../tasks/Tasks'
import Project from './Project'
import ProjectSkeleton from './ProjectSkeleton'
import LockIcon from '@material-ui/icons/Lock';
import { NavLink } from 'react-router-dom'
import { linkStyle } from '../../commonStyles'

const ProjectPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const project = useSelector(getProjectById(params.projectId))
    const projectError = useSelector(error)
    const selectedProject = useSelector(activeProject)
    // console.log(selectedProject, params)
    useEffect(
        () => {
            dispatch(setActiveProject(project))
            if (!project) dispatch(getProject(params.projectId))
        }, [params.projectId, project, dispatch]
    )

    useEffect(() => {
        return () => {
            dispatch(clearError())
        }
    }, [dispatch])

    if (projectError) return (
        <>
            <Typography>{projectError.message}</Typography>
            <LockIcon style={{ fontSize: 50 }} />
            <NavLink to='/home' style={linkStyle}><Button variant='contained'>Home</Button></NavLink>
        </>
    )
    if (!selectedProject) return <ProjectSkeleton />
    return (
        <>
            <Typography align='center' variant='h4' component='h1'>Complete this tasks</Typography>
            <Project project={selectedProject} />
            <Tasks projectId={selectedProject._id} />
        </>

    )
}

export default ProjectPage