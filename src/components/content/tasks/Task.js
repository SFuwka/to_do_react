import { Card, CardHeader, IconButton, Menu, MenuItem } from '@material-ui/core'
import React, { useState } from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useStyles } from './styles';
import { getContrastColor } from '../../../pickers/contrastColor';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import Modal from '../../../commonComponents/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { isFetching, removeTask, taskEditMode, turnEditModeOn } from '../../../features/task/tasksSlice';
import ConfirmWindow from '../../../commonComponents/ConfirmWindow';
import EditModeTask from './EditModeTask';

const Task = ({ projectId, task }) => {
    const [anchorEl, setAnchorEl] = useState(null)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState(null)
    const editMode = useSelector(taskEditMode)
    const pending = useSelector(isFetching)
    const classes = useStyles()
    const dispatch = useDispatch()
    const bgColor = task.color ? getContrastColor(task.color) : ''

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDelete = (e) => {
        setTaskToDelete(e.currentTarget.id)
        setDeleteConfirmOpen(true)
        handleClose()
    }

    const confirmDelete = () => {
        dispatch(removeTask(projectId, taskToDelete))
        closeConfirmWindow()
    }

    const handleEdit = (e) => {
        dispatch(turnEditModeOn(e.currentTarget.id))
        handleClose()
    }

    const closeConfirmWindow = () => setDeleteConfirmOpen(false)

    return (
        <>
            {!editMode.some(id => id === task._id) ? <Card className={classes.taskContainer}>
                <CardHeader
                    style={{ backgroundColor: task.color, color: bgColor }}
                    title={task.taskName}
                    action={
                        <>
                            <IconButton onClick={handleOpen}>
                                <MoreVertIcon style={{ color: bgColor }} />
                            </IconButton>
                            <Menu
                                className={classes.taskMenu}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                getContentAnchorEl={null}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                                <MenuItem onClick={handleEdit} id={task._id}>Edit <EditIcon /></MenuItem>
                                <MenuItem disabled={pending.delete.some(id => id === task._id)} id={task._id}
                                    onClick={handleDelete}>Delete <DeleteForeverIcon /></MenuItem>
                                <MenuItem onClick={handleClose}>Complete <DoneIcon /></MenuItem>
                            </Menu>
                        </>
                    }
                />
            </Card> : <EditModeTask projectId={projectId} task={task} />}

            <Modal open={deleteConfirmOpen} onClose={closeConfirmWindow}>
                <ConfirmWindow onConfirm={confirmDelete} onClose={closeConfirmWindow} />
            </Modal>
        </>
    )
}

export default Task