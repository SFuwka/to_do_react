import { Card, CardHeader, Menu, IconButton, MenuItem } from '@material-ui/core'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useHistory } from 'react-router-dom'
import ConfirmWindow from '../../../commonComponents/ConfirmWindow';
import Modal from '../../../commonComponents/Modal';
import { isFetching, projectEditMode, removeProject, turnEditModeOn } from '../../../features/project/projectSlice';
import { getContrastColor } from '../../../pickers/contrastColor';
import { useStyles } from './styles';
import EditModeProject from './EditModeProject';

const Project = ({ project }) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const [projectToDelete, setProjectToDelete] = useState(null)
    const editMode = useSelector(projectEditMode)
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

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleEdit = (e) => {
        dispatch(turnEditModeOn(e.currentTarget.id))
        handleClose()
    }

    const closeConfirmWindow = () => setDeleteConfirmOpen(false)


    return (
        <>
            {!editMode.some(id => id === project._id) ? <Card className={classes.menuItem}>
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
                        <>
                            <IconButton onClick={handleOpen}>
                                <MoreVertIcon />
                            </IconButton>
                            <Menu
                                className={classes.projectMenu}
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                getContentAnchorEl={null}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                                <MenuItem onClick={handleEdit} id={project._id}>Edit <EditIcon /></MenuItem>
                                <MenuItem disabled={pending.delete.some(id => id === project._id)} id={project._id}
                                    onClick={handleDeleteProject}>Delete <DeleteForeverIcon /></MenuItem>
                            </Menu>
                        </>
                    }
                />
            </Card> : <EditModeProject project={project} />}
            <Modal open={deleteConfirmOpen} onClose={closeConfirmWindow}>
                <ConfirmWindow onConfirm={confirmDelete} onClose={closeConfirmWindow} />
            </Modal>
        </>

    )
}

export default Project