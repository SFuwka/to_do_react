import { Typography } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { activeProject, getProject, getProjectById, setActiveProject } from '../../../features/project/projectSlice'
import Tasks from '../tasks/Tasks'
import Project from './Project'
import ProjectSkeleton from './ProjectSkeleton'

const ProjectPage = () => {
    const params = useParams()
    const dispatch = useDispatch()
    const project = useSelector(getProjectById(params.projectId))
    const selectedProject = useSelector(activeProject)
    // console.log(selectedProject, params)
    useEffect(
        () => {
            dispatch(setActiveProject(project))
            if (!project) dispatch(getProject(params.projectId))
        }, [params.projectId, project, dispatch]
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