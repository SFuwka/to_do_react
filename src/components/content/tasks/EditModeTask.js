import { Button, Card, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core'
import React, { useReducer } from 'react'
import SettingsIcon from '@material-ui/icons/Settings';
import { useDispatch } from 'react-redux'
import { turnEditModeOff, editTask } from '../../../features/task/tasksSlice'
import { useStyles } from './styles'

let initialState = {}

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



const EditModeTask = ({ projectId, task }) => {
    initialState = { ...task }
    const dispatch = useDispatch()
    const [state, dispatchLocal] = useReducer(reducer, initialState)
    const classes = useStyles()

    const setTaskName = (e) => {
        dispatchLocal({ type: 'clear_error' })
        dispatchLocal({ type: 'set_task_name', taskName: e.target.value })
    }

    const cancelEdit = (e) => {
        dispatch(turnEditModeOff(e.currentTarget.id))
    }

    const saveChanges = (e) => {
        if (!state.taskName) return dispatchLocal({ type: 'set_error', error: 'Field is required' })
        dispatch(editTask(projectId, task._id, state))
    }


    return (
        <Card className={classes.taskContainer}>
            <CardHeader
                title={
                    <TextField
                        onFocus={e => e.target.select()}
                        className={classes.newTaskInput}
                        error={Boolean(state.error)}
                        helperText={state.error}
                        label='Task'
                        multiline
                        onChange={setTaskName}
                        value={state.taskName} />
                }
                action={
                    <IconButton>
                        <SettingsIcon />
                    </IconButton>
                }
            />
            <CardContent>
                <>
                    <Button id={task._id} onClick={saveChanges} variant='contained' color='primary'>save</Button>
                    <Button id={task._id} onClick={cancelEdit} variant='contained' color='secondary'>cancel</Button>
                </>
            </CardContent>
        </Card>
    )
}

export default EditModeTask