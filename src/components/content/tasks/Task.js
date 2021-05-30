import { Card, CardHeader, IconButton, Menu, MenuItem, Typography } from '@material-ui/core'
import React, { useEffect, useRef, useState } from 'react'
import { useStyles } from './styles'
import { getContrastColor } from '../../../pickers/contrastColor'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import RestoreIcon from '@material-ui/icons/Restore'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import EditIcon from '@material-ui/icons/Edit'
import DoneIcon from '@material-ui/icons/Done'
import Modal from '../../../commonComponents/Modal'
import { useDispatch, useSelector } from 'react-redux'
import { changeCompleteStatus, isFetching, removeTask, taskEditMode, turnEditModeOn } from '../../../features/task/tasksSlice'
import ConfirmWindow from '../../../commonComponents/ConfirmWindow'
import EditModeTask from './EditModeTask'
import { GreenCheckbox, IndigoAvatar } from '../../commonComponents/StyledComponents'
import { useHistory } from 'react-router'



const Task = ({ projectId, task }) => {
    const history = useHistory()
    const scrollToRef = useRef(null)
    const [anchorEl, setAnchorEl] = useState(null)
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false)
    const [taskToDelete, setTaskToDelete] = useState(null)
    const editMode = useSelector(taskEditMode)
    const pending = useSelector(isFetching)
    const classes = useStyles()
    const dispatch = useDispatch()
    const bgColor = task.color ? getContrastColor(task.color) : ''


    useEffect(
        () => {
            scrollToRef && scrollToRef.current && scrollToRef.current.scrollIntoView({ behavior: 'smooth' })
        }, [history.location.state, scrollToRef] 
    )


    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleDelete = (e) => {
        setTaskToDelete(task._id)
        setDeleteConfirmOpen(true)
        handleClose()
    }

    const confirmDelete = () => {
        dispatch(removeTask(projectId, taskToDelete))
        closeConfirmWindow()
    }

    const handleEdit = () => {
        dispatch(turnEditModeOn(task._id))
        handleClose()
    }

    const handleTaskComplete = () => {
        toggleTaskComplete()
        handleClose()
    }

    const closeConfirmWindow = () => setDeleteConfirmOpen(false)

    const toggleTaskComplete = () => {
        dispatch(changeCompleteStatus(projectId, task._id, !task.finished))
    }

    return (
        <div className={classes.taskWrapper}>

            {!editMode.some(id => id === task._id) ? <Card className={classes.taskContainer}>
                <CardHeader
                    id={task._id}
                    style={{ backgroundColor: task.color, color: bgColor }}
                    title={
                        <div className={classes.taskHeader}>
                            <IndigoAvatar>
                                <GreenCheckbox
                                    disabled={pending.completeStatus.some(id => id === task._id)}
                                    id={task._id}
                                    onChange={toggleTaskComplete}
                                    checked={task.finished}
                                    checkedIcon={<DoneIcon />}></GreenCheckbox>
                            </IndigoAvatar>
                            <Typography>{task.taskName}</Typography>
                        </div>
                    }
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
                                <MenuItem onClick={handleEdit}>Edit <EditIcon /></MenuItem>
                                <MenuItem disabled={pending.delete.some(id => id === task._id)} id={task._id}
                                    onClick={handleDelete}>Delete <DeleteForeverIcon /></MenuItem>
                                <MenuItem disabled={pending.completeStatus.some(id => id === task._id)}
                                    onClick={handleTaskComplete} >{task.finished
                                        ? <>Uncomplete <RestoreIcon /> </>
                                        : <>Complete <DoneIcon /></>} </MenuItem>
                            </Menu>
                        </>
                    }
                />
                <div className={classes.taskAnchor} ref={history.location.state && history.location.state.taskId === task._id ? scrollToRef : null}></div>
            </Card> : <EditModeTask projectId={projectId} task={task} />}

            <Modal open={deleteConfirmOpen} onClose={closeConfirmWindow}>
                <ConfirmWindow onConfirm={confirmDelete} onClose={closeConfirmWindow} />
            </Modal>
        </div>
    )
}

export default Task