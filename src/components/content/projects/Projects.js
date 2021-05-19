import { Typography } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router'
import { getProjects, isFetched, isFetching, projects as projectsSelector } from '../../../features/project/projectSlice';
import useNotAuth from '../../../hooks/useNotAuth'
import NewProject from './NewProject';
import { useStyles } from './styles'
import Project from './Project';
import ProjectSkeleton from './ProjectSkeleton';
import TopControll from '../../commonComponents/TopControll';

const Projects = () => {
    const classes = useStyles()
    const redirect = useNotAuth()
    const [newProjectMenuOpen, setNewProjectMenuOpen] = useState(false)
    const dispatch = useDispatch()
    const pending = useSelector(isFetching)
    const projects = useSelector(projectsSelector)
    const isFirstLoadComplete = useSelector(isFetched)



    useEffect(
        () => {
            if (projects.length === 0 && !pending.projectsLoading && !isFirstLoadComplete) {
                dispatch(getProjects())
            }
        }, [dispatch, pending.projectsLoading, projects.length, isFirstLoadComplete]
    )


    const toggleNewProject = () => {
        setNewProjectMenuOpen((prev) => {
            return !prev
        })
    }


    if (redirect) return <Redirect to='/login' />

    return (
        <>
            <Typography align='center' variant='h4' component='h1'>Projects</Typography>
            <TopControll context='projects' open={newProjectMenuOpen} toggleOpen={toggleNewProject}
                createNewText='New Project' listText='Projects' />

            <div className={classes.projectsContainer}>
                <div className={`${classes.projects} ${newProjectMenuOpen ? classes.hide : ''}`}>
                    {pending.projectsLoading ? <ProjectSkeleton />
                        : projects.length ? (projects.map((project, i) => {
                            return (
                                <Project key={i} project={project} />
                            )
                        })) : <h1>Create your first project</h1>}
                </div>
                <div className={`${classes.newProject} ${!newProjectMenuOpen ? classes.hide : ''}`}>
                    <NewProject setNewProjectMenuOpen={setNewProjectMenuOpen} /></div>
            </div>
        </>
    )
}

export default Projects