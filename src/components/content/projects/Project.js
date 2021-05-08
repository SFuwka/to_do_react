import { Card, CardHeader, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import { isFetching, removeProject } from '../../../features/project/projectSlice';
import { getContrastColor } from '../../../pickers/contrastColor';
import { useStyles } from './styles';

const Project = ({ project }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const pending = useSelector(isFetching)
    const history = useHistory()
    // console.log(history)

    const handleDeleteProject = (e) => {
        dispatch(removeProject(e.currentTarget.id))
        history.replace('/projects')
    }




    return (
        <Card className={classes.menuItem}>
            <CardHeader
                title={history.location.pathname !== `/projects/${project._id}` ? // if pathName /projects/:id NavLink disabled ToDo
                    <NavLink style={{ backgroundColor: project.color, color: project.color ? getContrastColor(project.color) : '' }} className={classes.projectLink} to={`/projects/${project._id}`}>
                        {project.projectName}
                    </NavLink> :
                    project.projectName
                }
                subheader={new Date(project.editDate).toUTCString()}
                action={
                    <IconButton disabled={pending.delete.some(id => id === project._id)} id={project._id} onClick={handleDeleteProject}>
                        <DeleteForeverIcon />
                    </IconButton>
                }
            />
        </Card>

    )
}

export default Project