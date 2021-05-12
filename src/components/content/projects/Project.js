import { Card, CardHeader, IconButton } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import ConfirmWindow from '../../../commonComponents/ConfirmWindow';
import Modal from '../../../commonComponents/Modal';
import { isFetching, removeProject } from '../../../features/project/projectSlice';
import { getContrastColor } from '../../../pickers/contrastColor';
import { useStyles } from './styles';

const Project = ({ project }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [projectToDelete, setProjectToDelete] = useState(null)
    const pending = useSelector(isFetching)
    const history = useHistory()

    const handleDeleteProject = (e) => {
        setProjectToDelete(e.currentTarget.id)
        setDeleteConfirmOpen(true)
    }

    const confirmDelete = () => {
        dispatch(removeProject(projectToDelete))
        closeConfirmWindow()
        history.replace('/projects')
    }

    const closeConfirmWindow = () => setDeleteConfirmOpen(false)


    return (
        <>
            <Card className={classes.menuItem}>
                <CardHeader
                    title={history.location.pathname !== `/projects/${project._id}` ? // if pathName /projects/:id NavLink disabled ToDo
                        <NavLink style={{ backgroundColor: project.color, color: project.color ? getContrastColor(project.color) : '' }}
                            className={classes.projectLink} to={`/projects/${project._id}`}>
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
            <Modal open={deleteConfirmOpen} onClose={closeConfirmWindow}>
                <ConfirmWindow onConfirm={confirmDelete} onClose={closeConfirmWindow} />
            </Modal>
        </>

    )
}

export default Project