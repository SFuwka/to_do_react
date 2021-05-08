import { Button, Grid, IconButton, Paper, TextField } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useReducer, useState } from 'react'
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

const NewTask = ({ open }) => {
    const classes = useStyles()
    const [state, dispatchLocal] = useReducer(reducer, initialState)
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)


    const setTaskName = (e) => {
        dispatchLocal({ type: 'clear_error' })
        dispatchLocal({ type: 'set_task_name', taskName: e.target.value })
    }

    const toggleSettingsMenu = () => {
        setSettingsMenuOpen(prev => {
            return !prev
        })
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
                            variant='outlined'
                            label='Task'
                            placeholder='type new task'></TextField>

                        <div className={classes.buttonWrapper}>
                            <Button className={classes.newTaskButton} variant='contained'>Create</Button>
                        </div>
                    </div>
                    <div>
                        <IconButton onClick={toggleSettingsMenu}>
                            <SettingsIcon />
                        </IconButton>
                    </div>
                </Grid>
                {settingsMenuOpen ? <Paper><h1>TEST</h1></Paper> : null}
            </Paper>
        </div >

    )
}

export default NewTask