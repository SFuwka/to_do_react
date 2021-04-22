import { Button, Card, CardContent, InputBase, Paper, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import React, { useState } from 'react'
import { Redirect } from 'react-router'
import useNotAuth from '../../../hooks/useNotAuth'
import NewProject from './NewProject';
import { useStyles } from './styles'

const Projects = () => {
    const classes = useStyles()
    const redirect = useNotAuth()
    const [newProjectMenuOpen, setNewProjectMenuOpen] = useState(false)

    const toggleNewProject = () => {
        setNewProjectMenuOpen((prev) => {
            return !prev
        })
    }

    if (redirect) return <Redirect to='/login' />
    return (
        <>
            <Typography align='center' variant='h4' component='h1'>Projects</Typography>
            <Paper className={classes.topControll}>
                <Button onClick={toggleNewProject} color='primary' variant='contained' className={classes.newProjectButton}>
                    {newProjectMenuOpen ? 'new project' : 'projects'}</Button>
                <div className={classes.search}>
                    <div>
                        <div className={classes.searchIcon}><SearchIcon /></div>
                        <InputBase
                            disabled={!newProjectMenuOpen}
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                </div>
            </Paper>
            <div>
                <div className={classes.projectsContainer}>
                    <div className={`${classes.projects} ${!newProjectMenuOpen ? classes.hide : ''}`}>
                        <Card>
                            <CardContent>
                                <Typography> asda</Typography>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent>
                                <Typography> asda</Typography>
                            </CardContent>
                        </Card>
                    </div>


                    <div className={`${classes.newProject} ${newProjectMenuOpen ? classes.hide : ''}`}><NewProject /></div>
                </div>


            </div>
        </>
    )
}

export default Projects