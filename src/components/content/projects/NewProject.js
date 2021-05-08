import { Button, Card, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core'
import React, { useEffect, useReducer, useState } from 'react'
import { useStyles } from './styles'
import SettingsIcon from '@material-ui/icons/Settings';
import ImageIcon from '@material-ui/icons/Image';
import SettingsMenu from './settings/SettingsMenu';
import { useDispatch, useSelector } from 'react-redux';
import { createProject, isFetching, projectCreated as projectCreationStatus, projectCreatedStatusToDefault } from '../../../features/project/projectSlice';

const initialState = {
    color: '',
    projectName: '',
    privacySettings: 'public',
    category: '',
    error: null,
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'set_color':
            return { ...state, color: action.color }
        case 'set_project_name':
            return { ...state, projectName: action.projectName }
        case 'clear_project_name':
            return { ...state, projectName: '' }
        case 'set_privacy_settings':
            return { ...state, privacySettings: action.privacySettings }
        case 'set_category':
            return { ...state, category: action.category }
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

const NewProject = (props) => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const pending = useSelector(isFetching)
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
    const [state, dispatchLocal] = useReducer(reducer, initialState)
    const projectCreated = useSelector(projectCreationStatus)

    useEffect(
        () => {
            if (projectCreated) {
                props.setNewProjectMenuOpen(false)
                dispatch(projectCreatedStatusToDefault())
                dispatchLocal({ type: 'clear_project_name' })
            }
        }
    )

    const toggleSettingsMenu = () => {
        setSettingsMenuOpen(prev => {
            return !prev
        })
    }

    const setProjectName = (e) => {
        dispatchLocal({ type: 'clear_error' })
        dispatchLocal({ type: 'set_project_name', projectName: e.target.value })
    }

    const sendNewProject = () => {
        if (!state.projectName) {
            return dispatchLocal({ type: 'set_error', error: 'Field is required' })
        }
        dispatch(createProject(state))
        dispatchLocal({ type: 'set_to_default' })
    }


    return (
        <Card >
            <CardHeader
                className={classes.newProjectHeader}
                action={
                    <>
                        <IconButton onClick={toggleSettingsMenu}>
                            <SettingsIcon />
                        </IconButton>
                        <IconButton>
                            <ImageIcon />
                        </IconButton>
                    </>
                }
                title='What is final result you want to achive?'
                titleTypographyProps={{ variant: 'h6', component: 'h3' }}
            >
            </CardHeader>
            <CardContent>
                {settingsMenuOpen ? <SettingsMenu state={state} dispatch={dispatchLocal} /> : ''}
                <div className={classes.createProjectWrapper}>
                    <TextField
                        onFocus={e => e.target.select()}
                        onChange={setProjectName}
                        value={state.projectName}
                        error={Boolean(state.error)}
                        helperText={state.error}
                        size='small'
                        className={classes.newProjectInput}
                        label='New Project' variant='outlined'
                        placeholder='type new project name'></TextField>
                    <Button disabled={pending.create} variant='contained' color='secondary' onClick={sendNewProject}>Create</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default NewProject