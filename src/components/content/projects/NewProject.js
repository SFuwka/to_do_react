import { Button, Card, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core'
import React, { useReducer, useState } from 'react'
import { useStyles } from './styles'
import SettingsIcon from '@material-ui/icons/Settings';
import ImageIcon from '@material-ui/icons/Image';
import SettingsMenu from './settings/SettingsMenu';

const initialState = {
    color: '',
    projectName: '',
    privacySettings: 'public',
    category: '',
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'set_color':
            return { ...state, color: action.color }
        case 'set_project_name':
            return { ...state, projectName: action.projectName }
        case 'set_privacy_settings':
            return { ...state, privacySettings: action.privacySettings }
        case 'set_category':
            return { ...state, category: action.category }
        default:
            return state
    }
}

const NewProject = () => {
    const classes = useStyles()
    const [settingsMenuOpen, setSettingsMenuOpen] = useState(false)
    const [state, dispatchLocal] = useReducer(reducer, initialState)
    const toggleSettingsMenu = () => {
        setSettingsMenuOpen(prev => {
            return !prev
        })
    }

    const setProjectName = (e) => {
        dispatchLocal({ type: 'set_project_name', projectName: e.target.value })
    }

    const sendNewProject = () => {
        console.log(state)
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
                title='What is final result?'
                titleTypographyProps={{ variant: 'h6', component: 'h3' }}
            >
            </CardHeader>
            <CardContent>
                {settingsMenuOpen ? <SettingsMenu state={state} dispatch={dispatchLocal} /> : ''}
                <div className={classes.createProjectWrapper}>
                    <TextField
                        onChange={setProjectName}
                        size='small'
                        className={classes.newProjectInput}
                        label='New Project' variant='outlined'
                        placeholder='type new project name'></TextField>
                    <Button variant='contained' color='secondary' onClick={sendNewProject}>Create</Button>
                </div>
            </CardContent>
        </Card>
    )
}

export default NewProject