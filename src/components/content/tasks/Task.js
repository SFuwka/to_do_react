import { Button, Card, CardHeader, IconButton, Menu, MenuItem, Paper, Typography } from '@material-ui/core'
import React, { useState } from 'react'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { useStyles } from './styles';
import { getContrastColor } from '../../../pickers/contrastColor';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DoneIcon from '@material-ui/icons/Done';
import Modal from '../../../commonComponents/Modal';

const Task = ({ task }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const classes = useStyles()
    const bgColor = task.color ? getContrastColor(task.color) : ''

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDelete = (e) => {
        console.log(e.currentTarget)
        setDeleteConfirmOpen(true)
        handleClose()
    }

    const closeConfirmWindow = () => setDeleteConfirmOpen(false)

    return (
        <>
            <Card className={classes.taskContainer}>
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
                                id="simple-menu"
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                getContentAnchorEl={null}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                                <MenuItem onClick={handleClose}>Edit <EditIcon /></MenuItem>
                                <MenuItem id={task._id} onClick={handleDelete}>Delete <DeleteForeverIcon /></MenuItem>
                                <MenuItem onClick={handleClose}>Complete <DoneIcon /></MenuItem>
                            </Menu>
                        </>
                    }
                />
            </Card>
            <Modal open={deleteConfirmOpen} onClose={closeConfirmWindow}>
                <div className={classes.confirmDeleteModal}>
                    <div><Typography align='center'>Are you sure?</Typography></div>
                    <div>
                        <Button variant='contained' color='primary'>yes</Button>
                        <Button variant='contained' color='secondary' onClick={closeConfirmWindow}>no</Button>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default Task