import { Button, Card, CardContent, CardHeader, IconButton, Menu, MenuItem, TextField } from '@material-ui/core'
import React, { useReducer, useState } from 'react'
import { useDispatch } from 'react-redux'
import { editProject, turnEditModeOff } from '../../../features/project/projectSlice'
import { useStyles } from './styles'
import SettingsIcon from '@material-ui/icons/Settings';
import SettingsMenu from './settings/SettingsMenu'

let initialState = {}

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

const EditModeProject = ({ project }) => {
    initialState = { ...project }
    const dispatch = useDispatch()
    const [state, dispatchLocal] = useReducer(reducer, initialState)
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
    const [anchorEl, setAnchorEl] = useState(null)
    const classes = useStyles()

    const setProjectName = (e) => {
        dispatchLocal({ type: 'clear_error' })
        dispatchLocal({ type: 'set_project_name', projectName: e.target.value })
    }

    const handleOpen = (event) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const expandSettings = () => {
        setSettingsMenuOpen(true)
        handleClose()
    }

    const cancelEdit = (e) => {
        dispatch(turnEditModeOff(e.currentTarget.id))
    }

    const saveChanges = (e) => {
        if (!state.projectName) return dispatchLocal({ type: 'set_error', error: 'Field is required' })
        dispatch(editProject(state))
    }


    return (
        <>
            <Card>
                <CardHeader
                    title={
                        <TextField
                            onFocus={e => e.target.select()}
                            className={classes.newProjectInput}
                            error={Boolean(state.error)}
                            helperText={state.error}
                            label='Project'
                            multiline
                            onChange={setProjectName}
                            value={state.projectName} />
                    }
                    action={
                        <>
                            <IconButton onClick={handleOpen}>
                                <SettingsIcon />
                            </IconButton>
                            <Menu
                                className={classes.projectMenu}
                                anchorEl={anchorEl}
                                keepMounted
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                                getContentAnchorEl={null}
                                anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
                                transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                            >
                                <MenuItem onClick={expandSettings}>Settings</MenuItem>
                                <MenuItem id={project._id} onClick={cancelEdit}>Cancel</MenuItem>
                            </Menu>
                        </>
                    }
                />
                <CardContent>
                    <>
                        {settingsMenuOpen
                            ? <SettingsMenu state={state} dispatch={dispatchLocal} />
                            : null}
                        <Button variant='contained' color='primary' id={project._id} onClick={saveChanges}>Save</Button>
                        <Button variant='contained' color='secondary' id={project._id} onClick={cancelEdit}>Cancel</Button>
                    </>
                </CardContent>
            </Card>
        </>
    )
}

export default EditModeProject