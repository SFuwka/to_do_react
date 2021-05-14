import { Button, Grid, IconButton, Paper, TextField } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import CloseIcon from '@material-ui/icons/Close'
import React, { useReducer, useState } from 'react'
import { useDispatch } from 'react-redux';
import { createTask } from '../../../features/task/tasksSlice';
import SettingsMenu from './settings/SettingsMenu';
import { useStyles } from './styles'

const initialState = {
    color: '',
    taskName: '',
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'set_color':
            return { ...state, color: action.color }
        case 'set_task_name':
            return { ...state, taskName: action.taskName }
        case 'clear_task_name':
            return { ...state, taskName: '' }
        case 'set_error':
            return { ...state, error: action.error }
        case 'clear_error':
            return { ...state, error: null }
        case 'set_to_default':
            return initialState
        default:
            return state
    }
}

const NewTask = ({ projectId, open }) => {
    const classes = useStyles()
    const [state, dispatchLocal] = useReducer(reducer, initialState)
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
    const dispatch = useDispatch()


    const setTaskName = (e) => {
        dispatchLocal({ type: 'clear_error' })
        dispatchLocal({ type: 'set_task_name', taskName: e.target.value })
    }

    const toggleSettingsMenu = () => {
        setSettingsMenuOpen(prev => {
            return !prev
        })
    }

    const sendNewTask = () => {
        if (!state.taskName) {
            return dispatchLocal({ type: 'set_error', error: 'Field is required' })
        }
        dispatch(createTask(projectId, state))
        dispatchLocal({ type: 'set_to_default' })
    }

    return (
        <div className={classes.wrapper}>
            <Paper className={`${!open ? classes.hide : classes.newTaskMenu}`}>
                <Grid container>
                    <div className={classes.inputWrapper}>
                        <TextField
                            onFocus={e => e.target.select()}
                            className={classes.newTaskInput}
                            onChange={setTaskName}
                            value={state.taskName}
                            error={Boolean(state.error)}
                            helperText={state.error}
                            variant='outlined'
                            label='Task'
                            placeholder='type new task'></TextField>

                        <div className={classes.buttonWrapper}>
                            <Button onClick={sendNewTask} variant='contained'>Create</Button>
                        </div>

                    </div>
                    <div>
                        <IconButton onClick={toggleSettingsMenu}>
                            {settingsMenuOpen ? <CloseIcon /> : <SettingsIcon />}
                        </IconButton>
                    </div>
                </Grid>
                <div className={classes.settings}>
                    {settingsMenuOpen ? <SettingsMenu state={state} dispatch={dispatchLocal} /> : null}
                </div>
            </Paper>
        </div >

    )
}

export default NewTask